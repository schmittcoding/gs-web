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
  EventCategory,
  EventCharacter,
  EventRegistration,
  GuildMember,
} from "@/types/event";
import { PropsWithChildren, useState } from "react";
import { RegistrationForm } from "./registration-form";

type EventRegistrationDialogProps = {
  characters: EventCharacter[];
  existingRegistrations: EventRegistration[];
  eventId: string;
  minLevel: number;
  eventCategory: EventCategory;
  eventSlug: string;
  guildNum?: number;
  guildMembers?: GuildMember[];
};

export default function EventRegistrationDialog({
  eventId,
  minLevel,
  characters,
  existingRegistrations,
  eventCategory,
  eventSlug,
  guildNum,
  guildMembers,
  children,
}: PropsWithChildren<EventRegistrationDialogProps>) {
  const [open, setOpen] = useState(false);

  const dialogDescription =
    eventCategory === "gvg"
      ? "Select guild members to participate."
      : "Select a character to register.";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Event Registration</DialogTitle>
          <DialogDescription>{dialogDescription}</DialogDescription>
        </DialogHeader>
        <RegistrationForm
          eventId={eventId}
          minLevel={minLevel}
          characters={characters}
          existingRegistrations={existingRegistrations}
          eventCategory={eventCategory}
          eventSlug={eventSlug}
          guildNum={guildNum}
          guildMembers={guildMembers}
          onClose={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
