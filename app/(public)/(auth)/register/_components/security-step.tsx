"use client";

import { FieldGroup } from "@/components/ui/field";
import FormInput from "@/components/ui/form/input.form";
import { FormPasswordInput } from "@/components/ui/form/password-input.form";
import { RegisterStep2, registerStep2Schema } from "@/lib/validations/auth";
import { IconLock } from "@tabler/icons-react";
import { useEffect, useRef } from "react";

type SecurityStepProps = {
  data: RegisterStep2;
  onChange: (data: RegisterStep2) => void;
  onValidChange: (valid: boolean) => void;
};

function SecurityStep({ data, onChange, onValidChange }: SecurityStepProps) {
  const firstInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    firstInputRef.current?.focus();
  }, []);

  function handleChange(field: keyof RegisterStep2, value: string) {
    if (field === "pincode") {
      value = value.replace(/\D/g, "").slice(0, 6);
    }
    const next = { ...data, [field]: value };
    onChange(next);
    onValidChange(registerStep2Schema.safeParse(next).success);
  }

  return (
    <FieldGroup>
      <FormPasswordInput
        id="password"
        label="Password"
        name="password"
        startIcon={IconLock}
        withValidation
        value={data.password}
        placeholder="Create a password"
        onChange={(e) => handleChange("password", e.target.value)}
        autoComplete="new-password"
        showValidation
      />

      <FormInput
        id="pin"
        label="PIN Code"
        name="pin"
        type="password"
        inputMode="numeric"
        placeholder="6 digit PIN"
        startIcon={IconLock}
        value={data.pincode}
        onChange={(e) => handleChange("pincode", e.target.value)}
        maxLength={6}
        autoComplete="off"
      />
    </FieldGroup>
  );
}

export { SecurityStep };
