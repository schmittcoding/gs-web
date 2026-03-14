"use client";

import { cn } from "@/lib/utils";
import { Field, FieldError, FieldLabel } from "../field";
import { Input } from "../input";

type FormInputProps = React.ComponentProps<typeof Input> & {
  error?: string;
  label?: string;
  startIcon?: React.ElementType;
};

export default function FormInput({
  error,
  label,
  id,
  name,
  startIcon: StartIcon,
  ...props
}: FormInputProps) {
  return (
    <Field>
      {label && (
        <FieldLabel
          htmlFor={id ?? name}
          className="text-xs font-medium uppercase tracking-wider text-gray-400"
        >
          {label}
        </FieldLabel>
      )}

      <div className="relative">
        {StartIcon && (
          <StartIcon
            data-slot="start-icon"
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-500"
          />
        )}
        <Input
          id={id}
          name={name}
          className={cn(
            "h-10 pl-9 bg-gray-800 border-gray-700 text-gray-100 placeholder:text-gray-600 focus-visible:border-primary shape-main",
            !!error && "border-destructive",
          )}
          aria-invalid={!!error}
          {...props}
        />
      </div>
      {error && <FieldError errors={[{ message: error }]} />}
    </Field>
  );
}
