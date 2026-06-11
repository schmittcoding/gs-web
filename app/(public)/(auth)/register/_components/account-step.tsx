"use client";

import { FieldGroup } from "@/components/ui/field";
import FormInput from "@/components/ui/form/input.form";
import {
  registerStep1Schema,
  type RegisterStep1,
} from "@/lib/validations/auth";
import { IconAt, IconId, IconUser } from "@tabler/icons-react";
import { useCallback, useEffect, useRef } from "react";

type AccountStepProps = {
  data: RegisterStep1;
  onChange: (data: RegisterStep1) => void;
  onValidChange: (valid: boolean) => void;
  errors?: Record<string, string>;
};

function AccountStep({
  data,
  onChange,
  onValidChange,
  errors: externalErrors,
}: AccountStepProps) {
  const firstInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    firstInputRef.current?.focus();
  }, []);

  const schemaValid = useCallback((values: typeof data) => {
    return registerStep1Schema.safeParse(values).success;
  }, []);

  useEffect(() => {
    onValidChange(schemaValid(data));
  }, [data, onValidChange, schemaValid]);

  function handleChange(field: keyof RegisterStep1, value: string) {
    onChange({ ...data, [field]: value });
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
        error={externalErrors?.username || undefined}
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
        error={externalErrors?.email || undefined}
        autoComplete="email"
      />
    </FieldGroup>
  );
}

export { AccountStep };
