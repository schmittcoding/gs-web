"use client";

import { resetPin } from "@/app/(dashboard)/profile/actions";
import GameButton from "@/components/common/game.button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { PropsWithChildren, useActionState, useState } from "react";
import { sileo } from "sileo";

export function ResetPinDialog({ children }: PropsWithChildren) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [, action, pending] = useActionState(
    async () => {
      const result = await resetPin();
      if (result.success) {
        setOpen(false);
        sileo.success({
          title: "Account PIN reset successfully.",
          description:
            "A temporary PIN has been sent to your email. Please check your inbox and update your PIN once you're logged in.",
        });
        router.refresh();
      }
      return result;
    },
    { success: false, error: undefined },
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reset Account PIN</DialogTitle>
        </DialogHeader>
        <form action={action}>
          <div className="px-4 pb-4 space-y-2">
            <p className="font-semibold">
              Are you sure you want to reset your account PIN?
            </p>
            <p>
              A system-generated PIN will be sent to your registered email
              address. Use this PIN to access sensitive areas of your account or
              update it later from your profile settings.
            </p>
          </div>
          <DialogFooter>
            <GameButton
              type="submit"
              size="sm"
              className="w-full sm:w-auto"
              loading={pending}
            >
              Reset Pincode
            </GameButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
