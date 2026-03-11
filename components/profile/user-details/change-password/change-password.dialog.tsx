"use client";

import { changePassword } from "@/app/(dashboard)/profile/actions";
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
import { FormPasswordInput } from "@/components/ui/form/password-input.form";
import { IconKey, IconLock, IconLockOpen } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useActionState, useState } from "react";
import { sileo } from "sileo";

type ChangePasswordDialogProps = {
  children: React.ReactNode;
};

export function ChangePasswordDialog({ children }: ChangePasswordDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [state, action, pending] = useActionState(
    async (
      _prev: { error?: string; success?: boolean },
      formData: FormData,
    ) => {
      const result = await changePassword(_prev, formData);
      if (result.success) {
        setOpen(false);
        sileo.success({
          title: "Password updated successfully.",
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
          <DialogTitle>Change Password</DialogTitle>
          <DialogDescription>
            Enter your current password and set a new one.
          </DialogDescription>
        </DialogHeader>
        <form action={action}>
          <div className="px-4 pb-4 space-y-3">
            <FormPasswordInput
              label="Old Password"
              id="old_password"
              name="old_password"
              startIcon={IconLockOpen}
              placeholder="Enter current password"
              error={fieldErrors?.oldPassword?.[0]}
            />
            <FormPasswordInput
              label="New Password"
              id="new_password"
              name="new_password"
              startIcon={IconLock}
              placeholder="Enter new password"
              withValidation
              maxLength={20}
              error={fieldErrors?.newPassword?.[0]}
            />
            <FormPasswordInput
              label="Account PIN"
              id="account_pin"
              name="account_pin"
              startIcon={IconKey}
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
              size="sm"
              className="w-full sm:w-auto"
              loading={pending}
            >
              Update Password
            </GameButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
