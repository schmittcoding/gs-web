"use client";

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
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import FormInput from "@/components/ui/form/input.form";
import { Textarea } from "@/components/ui/textarea";
import {
    applyAsStreamer,
    ApplyStreamerState,
} from "@/app/(dashboard)/sas/actions";
import { CreatorApplicationStatusResponse } from "@/types/creator";
import {
    IconBrandDiscord,
    IconBrandFacebook,
    IconCheck,
    IconClipboardList,
    IconLink,
} from "@tabler/icons-react";
import { PropsWithChildren, useActionState, useState } from "react";
import { cn } from "@/lib/utils";

const STATUS_LABEL: Record<number, { label: string; color: string }> = {
  0: { label: "Pending Review", color: "text-amber-400" },
  1: { label: "Approved", color: "text-emerald-400" },
  2: { label: "Rejected", color: "text-destructive" },
};

type ApplyDialogProps = PropsWithChildren<{
  application: CreatorApplicationStatusResponse | null;
}>;

export function ApplyStreamerDialog({
  children,
  application,
}: ApplyDialogProps) {
  const [open, setOpen] = useState(false);

  const [state, action, pending] = useActionState<ApplyStreamerState, FormData>(
    applyAsStreamer,
    { success: false },
  );

  const statusInfo = application
    ? (STATUS_LABEL[application.status] ?? {
        label: "Unknown",
        color: "text-gray-400",
      })
    : null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <IconClipboardList className="size-4 text-primary" />
            Apply as Streamer
          </DialogTitle>
          <DialogDescription>
            Join the Support-a-Streamer program and earn commissions.
          </DialogDescription>
        </DialogHeader>

        {state.success ? (
          <div className="px-4 py-6 flex flex-col items-center gap-3 text-center">
            <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center">
              <IconCheck className="size-6 text-primary" />
            </div>
            <p className="font-semibold">Application Submitted!</p>
            <p className="text-xs text-gray-400">
              Your application is under review. We will notify you once a
              decision has been made.
            </p>
            <GameButton
              variant="outline"
              className="mt-2"
              onClick={() => setOpen(false)}
            >
              Close
            </GameButton>
          </div>
        ) : application ? (
          <div className="px-4 py-4 space-y-4">
            <div className="space-y-1">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-500">
                Application Status
              </p>
              <p className={cn("text-sm font-semibold", statusInfo?.color)}>
                {statusInfo?.label}
              </p>
            </div>

            {application.assigned_creator_code && (
              <div className="space-y-1">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-500">
                  Your Streamer Code
                </p>
                <p className="font-bold text-primary text-lg tracking-widest">
                  {application.assigned_creator_code}
                </p>
              </div>
            )}

            {application.decision_notes && (
              <div className="space-y-1">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-500">
                  Notes
                </p>
                <p className="text-sm text-gray-300">
                  {application.decision_notes}
                </p>
              </div>
            )}

            <p className="text-xs text-gray-500">
              Applied on{" "}
              {new Date(application.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        ) : (
          <form action={action} className="space-y-4">
            <div className="px-4 py-2 space-y-4">
              <FormInput
                id="personal_facebook_url"
                name="personal_facebook_url"
                label="Facebook Profile URL"
                placeholder="https://facebook.com/yourpage"
                startIcon={IconBrandFacebook}
              />
              <FormInput
                id="discord_account"
                name="discord_account"
                label="Discord Account"
                placeholder="username#0000"
                startIcon={IconBrandDiscord}
              />
              <Field>
                <FieldLabel
                  htmlFor="content_links"
                  className="text-xs font-medium uppercase tracking-wider text-gray-400"
                >
                  Content Links
                </FieldLabel>
                <div className="relative">
                  <IconLink className="pointer-events-none absolute left-3 top-3 size-4 text-gray-500" />
                  <Textarea
                    id="content_links"
                    name="content_links"
                    placeholder="Paste links to your streams, videos, or posts..."
                    className="pl-9 bg-gray-800 border-gray-700 text-gray-100 placeholder:text-gray-600 focus-visible:border-primary shape-main min-h-24 resize-none"
                  />
                </div>
              </Field>

              {!state.success && state.error && (
                <FieldError errors={[{ message: state.error }]} />
              )}
            </div>
            <DialogFooter showCloseButton>
              <GameButton
                type="submit"
                loading={pending}
                className="w-full sm:w-auto"
              >
                Submit Application
              </GameButton>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
