"use client";

import { changeEmail } from "@/app/(dashboard)/profile/actions";
import GameButton from "@/components/common/game.button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import FormInput from "@/components/ui/form/input.form";
import { FormPasswordInput } from "@/components/ui/form/password-input.form";
import { IconLock, IconMail } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useActionState, useState } from "react";
import { sileo } from "sileo";

type ChangeEmailDialogProps = {
  children: React.ReactNode;
};

export function ChangeEmailDialog({ children }: ChangeEmailDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [state, action, pending] = useActionState(
    async (
      _prev: { error?: string; success?: boolean },
      formData: FormData,
    ) => {
      const result = await changeEmail(_prev, formData);
      if (result.success) {
        setOpen(false);
        sileo.success({
          title: "Account email address updated successfully.",
        });
        router.refresh();
      }
      return result;
    },
    { success: false, error: undefined },
  );

  const fieldErrors = typeof state.error === "object" ? state.error : undefined;
  const globalError = typeof state.error === "string" ? state.error : undefined;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Email Address</DialogTitle>
          <DialogDescription>
            Please verify the details below before proceeding.
          </DialogDescription>
        </DialogHeader>
        <form action={action}>
          <div className="px-4 pb-4 space-y-3">
            <FormInput
              label="Email Address"
              id="email_address"
              name="email_address"
              startIcon={IconMail}
              placeholder="Enter new email address"
              error={fieldErrors?.emailAddress?.[0]}
            />
            <FormPasswordInput
              label="Account PIN"
              id="account_pin"
              name="account_pin"
              startIcon={IconLock}
              placeholder="Enter account PIN"
              maxLength={6}
              error={fieldErrors?.accountPin?.[0]}
            />
            {globalError && (
              <div
                role="alert"
                className="rounded-lg border border-destructive/25 bg-destructive/10 px-3 py-2 text-sm text-destructive"
              >
                {globalError}
              </div>
            )}
          </div>
          <DialogFooter>
            <GameButton
              type="submit"
              size="xs"
              className="w-full sm:w-auto"
              loading={pending}
            >
              Update Email Address
            </GameButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
