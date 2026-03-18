"use client";

import {
  checkEmailAvailability,
  checkUsernameAvailability,
} from "@/app/(public)/(auth)/actions";
import { FieldGroup } from "@/components/ui/field";
import FormInput from "@/components/ui/form/input.form";
import {
  registerStep1Schema,
  type RegisterStep1,
} from "@/lib/validations/auth";
import {
  IconAt,
  IconCheck,
  IconId,
  IconLoader2,
  IconUser,
} from "@tabler/icons-react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";

type AccountStepProps = {
  data: RegisterStep1;
  onChange: (data: RegisterStep1) => void;
  onValidChange: (valid: boolean) => void;
};

function AccountStep({ data, onChange, onValidChange }: AccountStepProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [checking, setChecking] = useState<Record<string, boolean>>({});
  const [available, setAvailable] = useState<Record<string, boolean>>({});
  const firstInputRef = useRef<HTMLInputElement>(null);
  const [, startTransition] = useTransition();

  // Track the last value we successfully checked to skip duplicate calls
  const lastChecked = useRef<Record<string, string>>({});
  // Debounce timers so rapid blur/focus cycles don't spam the API
  const debounceTimers = useRef<Record<string, ReturnType<typeof setTimeout>>>(
    {},
  );

  // Keep a ref to the latest data so async callbacks can check for staleness
  const dataRef = useRef(data);
  useEffect(() => {
    dataRef.current = data;
  }, [data]);

  useEffect(() => {
    firstInputRef.current?.focus();
  }, []);

  // Cleanup debounce timers on unmount
  useEffect(() => {
    const timers = debounceTimers.current;
    return () => {
      Object.values(timers).forEach(clearTimeout);
    };
  }, []);

  // Schema validation runs on every change to gate the Next button,
  // but errors are only surfaced after availability checks on blur.
  const schemaValid = useCallback((values: typeof data) => {
    return registerStep1Schema.safeParse(values).success;
  }, []);

  // Valid only when schema passes, no errors, not checking, and both confirmed available
  useEffect(() => {
    const hasErrors = Object.values(errors).some(Boolean);
    const isChecking = Object.values(checking).some(Boolean);
    const bothAvailable = available.username === true && available.email === true;
    onValidChange(
      !hasErrors && !isChecking && bothAvailable && schemaValid(data),
    );
  }, [errors, checking, available, data, onValidChange, schemaValid]);

  function handleChange(field: keyof RegisterStep1, value: string) {
    onChange({ ...data, [field]: value });
    // Clear error and availability status while typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
    if (available[field]) {
      setAvailable((prev) => ({ ...prev, [field]: false }));
    }
    // Invalidate cache so the next blur re-checks
    delete lastChecked.current[field];
    onValidChange(false);
  }

  // Shared debounced availability checker — skips if value unchanged,
  // discards stale responses if value changed while request was in flight.
  function checkAvailability(
    field: "username" | "email",
    value: string,
    checkFn: (v: string) => Promise<{ available: boolean; error?: string }>,
    fallbackError: string,
  ) {
    // Clear any pending debounce for this field
    if (debounceTimers.current[field]) {
      clearTimeout(debounceTimers.current[field]);
    }

    // Schema-validate first
    const result = registerStep1Schema.safeParse({ ...data, [field]: value });
    if (!result.success) {
      const issue = result.error.issues.find((i) => i.path[0] === field);
      if (issue) {
        setErrors((prev) => ({ ...prev, [field]: issue.message }));
        return;
      }
    }

    // Skip if we already checked this exact value
    if (lastChecked.current[field] === value) return;

    // Debounce 300ms to avoid rapid blur/focus spam
    debounceTimers.current[field] = setTimeout(() => {
      setChecking((prev) => ({ ...prev, [field]: true }));
      startTransition(async () => {
        const res = await checkFn(value);
        // Discard stale response — value may have changed while awaiting
        if (dataRef.current[field] !== value) {
          setChecking((prev) => ({ ...prev, [field]: false }));
          return;
        }
        lastChecked.current[field] = value;
        setChecking((prev) => ({ ...prev, [field]: false }));
        if (!res.available) {
          setErrors((prev) => ({
            ...prev,
            [field]: res.error ?? fallbackError,
          }));
          setAvailable((prev) => ({ ...prev, [field]: false }));
        } else {
          setErrors((prev) => ({ ...prev, [field]: "" }));
          setAvailable((prev) => ({ ...prev, [field]: true }));
        }
      });
    }, 300);
  }

  function handleUsernameBlur() {
    checkAvailability(
      "username",
      data.username,
      checkUsernameAvailability,
      "Username is already taken",
    );
  }

  function handleEmailBlur() {
    checkAvailability(
      "email",
      data.email,
      checkEmailAvailability,
      "Email is already registered",
    );
  }

  function fieldSuffix(field: "username" | "email") {
    if (checking[field]) {
      return (
        <IconLoader2 className="size-4 animate-spin text-gray-400" />
      );
    }
    if (available[field]) {
      return <IconCheck className="size-4 text-emerald-400" />;
    }
    return null;
  }

  return (
    <FieldGroup>
      <FormInput
        ref={firstInputRef}
        id="full_name"
        label="Full Name"
        name="full_name"
        placeholder="Enter your full name"
        startIcon={IconId}
        value={data.full_name}
        onChange={(e) => handleChange("full_name", e.target.value)}
        autoComplete="name"
      />
      <FormInput
        id="username"
        label="Username"
        name="username"
        placeholder="Choose a username"
        startIcon={IconUser}
        value={data.username}
        onChange={(e) => handleChange("username", e.target.value)}
        onBlur={handleUsernameBlur}
        error={errors.username || undefined}
        suffix={fieldSuffix("username")}
        autoComplete="username"
      />
      <FormInput
        id="email"
        label="Email Address"
        name="email"
        type="email"
        placeholder="Enter your email"
        startIcon={IconAt}
        value={data.email}
        onChange={(e) => handleChange("email", e.target.value)}
        onBlur={handleEmailBlur}
        error={errors.email || undefined}
        suffix={fieldSuffix("email")}
        autoComplete="email"
      />
    </FieldGroup>
  );
}

export { AccountStep };
