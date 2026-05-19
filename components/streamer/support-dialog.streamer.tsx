"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PropsWithChildren, useState } from "react";
import SupportStreamerForm from "./form.support-dialog.streamer";

type SupportDialogProps = PropsWithChildren<{
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}>;

export function SupportStreamerDialog({
  children,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
}: SupportDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);

  const open = controlledOpen ?? internalOpen;
  const setOpen = controlledOnOpenChange ?? setInternalOpen;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent className="sm:max-w-md" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle className="text-lg">Support a Streamer</DialogTitle>
        </DialogHeader>
        {open && <SupportStreamerForm />}
      </DialogContent>
    </Dialog>
  );
}
