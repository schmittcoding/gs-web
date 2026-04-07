import {
  getEligibleCharacters,
  getRegistrationStatus,
} from "@/app/(dashboard)/events/actions";
import GameButton from "@/components/common/game.button";
import EventRegistrationDialog from "./dialog.registration";

type EventRegistrationProps = {
  eventId: string;
  minLevel: number;
  canRegister: boolean;
};

export default async function EventRegistration({
  eventId,
  minLevel,
  canRegister,
}: EventRegistrationProps) {
  if (!canRegister) {
    console.log("Server hit here");
    return (
      <span className="font-black leading-none text-destructive">
        REGISTRATION CLOSED
      </span>
    );
  }

  const [{ registrations }, { characters }] = await Promise.all([
    getRegistrationStatus(eventId),
    getEligibleCharacters(eventId),
  ]);

  console.log("registrations", registrations);
  console.log("characters", characters);

  return (
    <EventRegistrationDialog
      characters={characters}
      existingRegistrations={registrations}
      eventId={eventId}
      minLevel={minLevel}
    >
      <GameButton size="default">
        {registrations.length > 0 ? "Update participation" : "Participate Now"}
      </GameButton>
    </EventRegistrationDialog>
  );
}
