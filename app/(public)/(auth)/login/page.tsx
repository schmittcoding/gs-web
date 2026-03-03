"use client";

import { loginAction, type LoginState } from "@/app/(public)/(auth)/actions";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import FormInput from "@/components/ui/form/input.form";
import { IconLoader2, IconLock, IconUser } from "@tabler/icons-react";
import { useActionState } from "react";

export default function Page() {
  const [state, action, isPending] = useActionState<LoginState, FormData>(
    loginAction,
    {},
  );

  const fieldErrors = typeof state.error === "object" ? state.error : undefined;
  const globalError = typeof state.error === "string" ? state.error : undefined;

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-950 p-4 sm:p-6">
      <div
        className="grid w-full max-w-5xl grid-cols-1 overflow-hidden rounded-3xl shadow-2xl lg:grid-cols-[1fr_1.15fr]"
        style={{ minHeight: "600px" }}
      >
        {/* ── Left: form panel ─────────────────────────────── */}
        <div className="flex flex-col justify-center bg-gray-900 px-10 py-12 lg:px-14">
          {/* Brand */}
          <div className="mb-10">
            <img
              className="w-[100px] mb-6"
              src="/logo.png"
              alt="Ran Online GS"
              title="Ran Online GS"
            />
            <h1 className="mb-2 text-2xl font-bold text-gray-50">
              Welcome back
            </h1>
            <p className="text-sm text-gray-400">
              Sign in to access your account
            </p>
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
              <FormInput
                id="password"
                label="Password"
                name="password"
                placeholder="Enter your password"
                startIcon={IconLock}
                type="password"
                error={fieldErrors?.password?.[0]}
              />
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
        </div>

        {/* ── Right: illustration panel ─────────────────────── */}
        <div className="relative hidden overflow-hidden bg-gray-950 lg:flex items-center justify-center">
          <div
            className="absolute inset-0 bg-no-repeat bg-cover bg-center"
            style={{
              backgroundImage: "url('/images/background/bg-auth.png')",
            }}
          />

          {/* Corner brackets */}
          {(
            [
              "left-5 top-5",
              "right-5 top-5",
              "bottom-5 left-5",
              "bottom-5 right-5",
            ] as const
          ).map((pos, i) => {
            const d = [
              "M16 4H4v12",
              "M16 4h12v12",
              "M16 28H4V16",
              "M16 28h12V16",
            ][i];
            return (
              <svg
                key={pos}
                className={`pointer-events-none absolute ${pos} size-8 text-primary`}
                viewBox="0 0 32 32"
                fill="none"
              >
                <path
                  d={d}
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            );
          })}
        </div>
      </div>
    </main>
  );
}
