"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type {
  EventRegistrationCharacterData,
  EventRegistrationData,
} from "@/types/event";
import { PropsWithChildren, useState } from "react";
import { RegistrationForm } from "./registration-form";

type EventRegistrationDialogProps = {
  characters: EventRegistrationCharacterData[];
  existingRegistrations: EventRegistrationData[];
  eventId: string;
  minLevel: number;
};

export default function EventRegistrationDialog({
  eventId,
  minLevel,
  characters,
  existingRegistrations,
  children,
}: PropsWithChildren<EventRegistrationDialogProps>) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Event Registration</DialogTitle>
          <DialogDescription>
            Select a character and choose your categories.
          </DialogDescription>
        </DialogHeader>
        <RegistrationForm
          eventId={eventId}
          minLevel={minLevel}
          characters={characters}
          existingRegistrations={existingRegistrations}
          onClose={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
