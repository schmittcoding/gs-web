import {
  getEligibleCharacters,
  getGuildMembers,
  getRegistrationStatus,
} from "@/app/(dashboard)/events/actions";
import GameButton from "@/components/common/game.button";
import type { EventCategory } from "@/types/event";
import EventRegistrationDialog from "./dialog.registration";

type EventRegistrationProps = {
  eventId: string;
  minLevel: number;
  canRegister: boolean;
  eventCategory: EventCategory;
  eventSlug: string;
};

export default async function EventRegistration({
  eventId,
  minLevel,
  canRegister,
  eventCategory,
  eventSlug,
}: EventRegistrationProps) {
  if (!canRegister) {
    return (
      <span className="font-black leading-none text-destructive">
        REGISTRATION CLOSED
      </span>
    );
  }

  const [{ registrations }, { characters }, guildMembersData] =
    eventCategory === "gvg"
      ? await Promise.all([
          getRegistrationStatus(eventId),
          getEligibleCharacters(eventId),
          getGuildMembers(eventSlug),
        ])
      : [
          await getRegistrationStatus(eventId),
          await getEligibleCharacters(eventId),
          null,
        ];

  return (
    <EventRegistrationDialog
      characters={characters}
      existingRegistrations={registrations}
      eventId={eventId}
      minLevel={minLevel}
      eventCategory={eventCategory}
      eventSlug={eventSlug}
      guildNum={guildMembersData?.guild_num}
      guildMembers={guildMembersData?.members}
    >
      <GameButton size="default" className="w-full">
        {registrations.length > 0 ? "Update participation" : "Participate Now"}
      </GameButton>
    </EventRegistrationDialog>
  );
}
