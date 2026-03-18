/* eslint-disable @next/next/no-img-element */
"use client";

import { loginAction, type LoginState } from "@/app/(public)/(auth)/actions";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import FormInput from "@/components/ui/form/input.form";
import { FormPasswordInput } from "@/components/ui/form/password-input.form";
import { IconLoader2, IconLock, IconUser } from "@tabler/icons-react";
import Link from "next/link";
import { useActionState } from "react";

export default function Page() {
  const [state, action, isPending] = useActionState<LoginState, FormData>(
    loginAction,
    {},
  );

  const fieldErrors = typeof state.error === "object" ? state.error : undefined;
  const globalError = typeof state.error === "string" ? state.error : undefined;

  return (
    <>
      {/* Brand */}
      <div className="mb-10">
        <img
          className="mb-6 w-25"
          src="/logo.png"
          alt="Ran Online GS"
          title="Ran Online GS"
        />
        <h1 className="mb-2 text-2xl font-bold text-gray-50">Welcome back</h1>
        <p className="text-sm text-gray-400">Sign in to access your account</p>
      </div>

      {/* Form */}
      <form action={action} className="flex flex-col gap-5">
        <FieldGroup>
          <FormInput
            id="username"
            label="Username"
            name="username"
            placeholder="Enter your username"
            startIcon={IconUser}
            error={fieldErrors?.username?.[0]}
          />
          <div className="flex flex-col gap-1">
            <FormPasswordInput
              id="password"
              label="Password"
              name="password"
              placeholder="Enter your password"
              startIcon={IconLock}
              error={fieldErrors?.password?.[0]}
            />
            <Link
              className="text-sm font-medium text-primary hover:underline self-end"
              href="/forgot-password"
            >
              Forgot password?
            </Link>
          </div>
        </FieldGroup>

        {globalError && (
          <div
            role="alert"
            className="rounded-lg border border-destructive/25 bg-destructive/10 px-3 py-2 text-sm text-destructive"
          >
            {globalError}
          </div>
        )}

        <Button
          type="submit"
          size="lg"
          className="mt-1 w-full"
          disabled={isPending}
        >
          {isPending && <IconLoader2 className="animate-spin" />}
          {isPending ? "Signing in…" : "Sign in"}
        </Button>
      </form>

      {/* Sign up link */}
      <p className="mt-6 text-center text-sm text-gray-500">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="font-medium text-primary hover:underline"
          replace
        >
          Sign up
        </Link>
      </p>
    </>
  );
}
