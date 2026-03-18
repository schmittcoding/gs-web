/* eslint-disable @next/next/no-img-element */
"use client";

import {
  forgotPasswordAction,
  type ForgotPasswordState,
} from "@/app/(public)/(auth)/actions";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import FormInput from "@/components/ui/form/input.form";
import {
  IconCheck,
  IconLoader2,
  IconMail,
  IconUser,
} from "@tabler/icons-react";
import Link from "next/link";
import { useActionState } from "react";

export default function Page() {
  const [state, action, isPending] = useActionState<
    ForgotPasswordState,
    FormData
  >(forgotPasswordAction, {});

  const fieldErrors = typeof state.error === "object" ? state.error : undefined;

  return (
    <>
      {/* Brand */}
      <div className="mb-8">
        <img
          className="mb-6 w-25"
          src="/logo.png"
          alt="Ran Online GS"
          title="Ran Online GS"
        />
        <h1 className="mb-2 text-2xl font-bold text-gray-50">
          Forgot password
        </h1>
        <p className="text-sm text-gray-400">
          Enter your email and username to reset your password
        </p>
      </div>

      {state.success ? (
        <div className="animate-in fade-in zoom-in-95 flex flex-col items-center gap-4 py-8 text-center duration-500">
          <div className="flex size-16 items-center justify-center rounded-full border-2 border-green-500 bg-green-500/10">
            <IconCheck className="size-8 text-green-500" />
          </div>
          <p className="text-sm text-gray-400">
            If an account with those details exists, a temporary password and
            reset instruction has been sent.
          </p>
          <Button asChild size="lg" className="mt-8 w-full">
            <Link href="/login" replace>
              Continue to Sign In
            </Link>
          </Button>
        </div>
      ) : (
        <>
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
              <FormInput
                id="email"
                label="Email Address"
                name="email"
                type="email"
                placeholder="Enter your email address"
                startIcon={IconMail}
                error={fieldErrors?.email?.[0]}
              />
            </FieldGroup>

            <Button
              type="submit"
              size="lg"
              className="mt-1 w-full"
              disabled={isPending}
            >
              {isPending && <IconLoader2 className="animate-spin" />}
              {isPending ? "Submitting…" : "Reset password"}
            </Button>
          </form>
          {/* Back to login */}
          <p className="mt-6 text-center text-sm text-gray-500">
            Remember your password?{" "}
            <Link
              href="/login"
              className="font-medium text-primary hover:underline"
            >
              Sign in
            </Link>
          </p>
        </>
      )}
    </>
  );
}
