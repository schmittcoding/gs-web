/* eslint-disable @next/next/no-img-element */
"use client";

import { registerAction } from "@/app/(public)/(auth)/actions";
import GameButton from "@/components/common/game.button";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  IconArrowLeft,
  IconCheck,
  IconFileText,
  IconLock,
  IconUser,
} from "@tabler/icons-react";
import Link from "next/link";
import {
  Activity,
  startTransition,
  useActionState,
  useCallback,
  useState,
} from "react";
import { AccountStep } from "./_components/account-step";
import { SecurityStep } from "./_components/security-step";
import { TermsStep } from "./_components/terms-step";

const STEPS = [
  { label: "Account", icon: IconUser },
  { label: "Security", icon: IconLock },
  { label: "Terms", icon: IconFileText },
] as const;

export default function Page() {
  const [step, setStep] = useState(0);
  const [stepValid, setStepValid] = useState(false);

  // Form data persists across steps
  const [accountData, setAccountData] = useState({
    full_name: "",
    username: "",
    email: "",
  });
  const [securityData, setSecurityData] = useState({
    password: "",
    pincode: "",
  });

  const [state, submitAction, isPending] = useActionState(registerAction, {});

  const isComplete = state.success === true;

  const handleValidChange = useCallback((valid: boolean) => {
    setStepValid(valid);
  }, []);

  function goNext() {
    if (!stepValid || step >= STEPS.length - 1) return;
    setStepValid(false);
    setStep((s) => s + 1);
  }

  function goBack() {
    if (step <= 0) return;
    setStepValid(true); // previous steps are already valid
    setStep((s) => s - 1);
  }

  function handleSubmit() {
    if (!stepValid || isPending) return;
    startTransition(() => {
      submitAction({ ...accountData, ...securityData });
    });
  }

  const isLastStep = step === STEPS.length - 1;

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
        {!isComplete ? (
          <>
            <h1 className="mb-2 text-2xl font-bold text-gray-50">
              Create your account
            </h1>
            <p className="text-sm text-gray-400">
              Join the battlefield — set up your account
            </p>
          </>
        ) : (
          <>
            <h1 className="mb-2 text-2xl font-bold text-gray-50">
              Welcome, {accountData.username}
            </h1>
            <p className="text-sm text-gray-400">
              Your account has been created successfully
            </p>
          </>
        )}
      </div>

      {!isComplete ? (
        <>
          {/* ── Stepper ────────────────────────────────── */}
          <div className="mb-8 flex items-center gap-0" role="list">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              const completed = i < step;
              const active = i === step;
              return (
                <div
                  key={s.label}
                  className="flex flex-1 items-center"
                  role="listitem"
                >
                  <div className="flex flex-col items-center gap-1.5">
                    <div
                      className={cn(
                        "flex size-9 items-center justify-center rounded-full border-2 transition-all",
                        completed &&
                          "border-primary bg-primary text-primary-foreground",
                        active && "border-primary bg-primary/10 text-primary",
                        !completed &&
                          !active &&
                          "border-gray-700 text-gray-600",
                      )}
                    >
                      {completed ? (
                        <IconCheck className="size-4" />
                      ) : (
                        <Icon className="size-4" />
                      )}
                    </div>
                    <span
                      className={cn(
                        "text-[10px] font-semibold uppercase tracking-wider",
                        active ? "text-primary" : "text-gray-500",
                        completed && "text-gray-400",
                      )}
                    >
                      {s.label}
                    </span>
                  </div>
                  {/* Connector line */}
                  {i < STEPS.length - 1 && (
                    <div
                      className={cn(
                        "mb-5 h-px flex-1 transition-colors",
                        i < step ? "bg-primary" : "bg-gray-700",
                      )}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* ── Step content ───────────────────────────── */}
          <div className="min-h-50">
            <div
              key={step}
              className="animate-in fade-in slide-in-from-right-4 duration-300"
            >
              <Activity mode={step === 0 ? "visible" : "hidden"}>
                <AccountStep
                  data={accountData}
                  onChange={setAccountData}
                  onValidChange={handleValidChange}
                />
              </Activity>
              <Activity mode={step === 1 ? "visible" : "hidden"}>
                <SecurityStep
                  data={securityData}
                  onChange={setSecurityData}
                  onValidChange={handleValidChange}
                />
              </Activity>
              <Activity mode={step === 2 ? "visible" : "hidden"}>
                <TermsStep onValidChange={handleValidChange} />
              </Activity>
            </div>
          </div>

          {state.error && (
            <div
              role="alert"
              className="mt-4 rounded-lg border border-destructive/25 bg-destructive/10 px-3 py-2 text-sm text-destructive"
            >
              {state.error}
            </div>
          )}

          {/* ── Navigation buttons ─────────────────────── */}
          <div className="mt-6 flex gap-3">
            {step > 0 && (
              <Button
                type="button"
                variant="outline"
                size="lg"
                className="gap-1.5"
                onClick={goBack}
              >
                <IconArrowLeft className="size-4" />
                Back
              </Button>
            )}
            {isLastStep ? (
              <GameButton
                type="button"
                className="flex-1"
                disabled={!stepValid}
                onClick={handleSubmit}
                loading={isPending}
              >
                {isPending ? "Creating account…" : "Register"}
              </GameButton>
            ) : (
              <Button
                type="button"
                size="lg"
                className="flex-1"
                disabled={!stepValid}
                onClick={goNext}
              >
                Next
              </Button>
            )}
          </div>

          {/* Sign in link */}
          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-primary hover:underline"
            >
              Sign in
            </Link>
          </p>
        </>
      ) : (
        /* ── Success state ──────────────────────────── */
        <div className="animate-in fade-in zoom-in-95 flex flex-col items-center gap-4 py-8 text-center duration-500">
          <div className="flex size-16 items-center justify-center rounded-full border-2 border-green-500 bg-green-500/10">
            <IconCheck className="size-8 text-green-500" />
          </div>
          <p className="text-sm text-gray-400">
            You can now sign in with your credentials and start your journey.
          </p>
          <Button asChild size="lg" className="mt-2 w-full">
            <Link href="/login" replace>
              Continue to Sign In
            </Link>
          </Button>
        </div>
      )}
    </>
  );
}
