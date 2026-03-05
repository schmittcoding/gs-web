"use client";

import { cn } from "@/lib/utils";
import {
  IconCircleCheck,
  IconCircleX,
  IconEye,
  IconEyeOff,
} from "@tabler/icons-react";
import { ChangeEvent, useState } from "react";
import { Field, FieldError, FieldLabel } from "../field";
import { Input } from "../input";

const passwordRequirements = [
  { regex: /.{8,}/, text: "At least 8 characters" },
  { regex: /[A-Z]/, text: "At least one uppercase letter" },
  { regex: /[a-z]/, text: "At least one lowercase letter" },
  { regex: /\d/, text: "At least one number" },
  {
    regex: /[#?!@$^*-]/,
    text: "At least one special character (# ? ! @ $ ^ * -)",
  },
];

type FormPasswordInputProps = Omit<
  React.ComponentProps<typeof Input>,
  "type"
> & {
  error?: string;
  label?: string;
  startIcon?: React.ElementType;
  withValidation?: boolean;
};

export function FormPasswordInput({
  error,
  label,
  id,
  name,
  startIcon: StartIcon,
  withValidation,
  defaultValue,
  onChange,
  ...props
}: FormPasswordInputProps) {
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState<string>(
    (props.value ?? defaultValue ?? "") as string,
  );

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    onChange?.(e);
    setValue(e.target.value);
  }

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
          type={visible ? "text" : "password"}
          className={cn(
            "h-10 pl-9 pr-10 bg-gray-800 border-gray-700 text-gray-100 placeholder:text-gray-600 focus-visible:border-primary",
            !!error && "border-destructive",
          )}
          aria-invalid={!!error}
          onChange={handleChange}
          value={value}
          {...props}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
          aria-label={visible ? "Hide password" : "Show password"}
        >
          {visible ? (
            <IconEye className="size-4" />
          ) : (
            <IconEyeOff className="size-4" />
          )}
        </button>
      </div>
      {error && <FieldError errors={[{ message: error }]} />}

      {withValidation && !!value && (
        <ul className="space-y-1.5">
          {passwordRequirements.map((req, index) => {
            const isValid = req.regex.test(value);
            return (
              <li
                key={index}
                data-valid={isValid}
                className="flex items-center gap-2 text-base lg:text-sm text-white/35 [&_svg]:size-5 lg:[&_svg]:size-4 data-[valid=true]:text-white group"
              >
                {isValid ? (
                  <IconCircleCheck className="group-data-[valid=true]:text-primary" />
                ) : (
                  <IconCircleX />
                )}
                {req.text}
              </li>
            );
          })}
        </ul>
      )}
    </Field>
  );
}
