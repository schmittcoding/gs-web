import { getAllEvents } from "@/app/(dashboard)/events/actions";
import { EventCard } from "./event-card.events";

export async function EventsGrid() {
  const { success, events } = await getAllEvents();

  if (!success || events.length === 0) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-gray-400 text-lg">
          No events available at this time.
        </p>
      </div>
    );
  }

  return events.map((event) => (
    <EventCard key={event.event_id} event={event} />
  ));
}
