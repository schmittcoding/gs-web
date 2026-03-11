"use client";

import { changePincode } from "@/app/(dashboard)/profile/actions";
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

type ChangePinDialogProps = {
  children: React.ReactNode;
};

export function ChangePinDialog({ children }: ChangePinDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [state, action, pending] = useActionState(
    async (
      _prev: { error?: string; success?: boolean },
      formData: FormData,
    ) => {
      const result = await changePincode(_prev, formData);
      if (result.success) {
        setOpen(false);
        sileo.success({
          title: "Account pincode updated successfully.",
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
          <DialogTitle>Change Account Pin</DialogTitle>
          <DialogDescription>
            Enter your current account pin and set a new one.
          </DialogDescription>
        </DialogHeader>
        <form action={action}>
          <div className="px-4 pb-4 space-y-3">
            <FormPasswordInput
              label="Old Pincode"
              id="old_pincode"
              name="old_pincode"
              startIcon={IconLockOpen}
              placeholder="Enter current pincode"
              error={fieldErrors?.oldPincode?.[0]}
            />
            <FormPasswordInput
              label="New Pincode"
              id="new_pincode"
              name="new_pincode"
              startIcon={IconLock}
              placeholder="Enter new pincode"
              maxLength={6}
              error={fieldErrors?.newPincode?.[0]}
            />
            <FormPasswordInput
              label="Confirm Pincode"
              id="confirm_pincode"
              name="confirm_pincode"
              startIcon={IconKey}
              placeholder="Confirm pincode"
              maxLength={6}
              error={fieldErrors?.confirmPincode?.[0]}
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
              Update Pincode
            </GameButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
