import EventCapRaceLeaderboard from "@/components/events/(eventSlug)/tabs/event-leaderboard/caprace-leaderboard.events";
import EventSchedulesTab from "@/components/events/(eventSlug)/tabs/event-schedule/schedules-tab.events";
import { EventScheduleSkeleton } from "@/components/events/(eventSlug)/tabs/skeletons";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { getEventDetails } from "./actions";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ eventSlug: string }>;
  searchParams: Promise<{ class?: string }>;
};

export default async function Page({ params, searchParams }: PageProps) {
  const [{ eventSlug }, { class: activeClass = "" }] = await Promise.all([
    params,
    searchParams,
  ]);
  const { event } = await getEventDetails(eventSlug);

  if (!event) {
    return redirect("/events");
  }

  if (event.event_category === "level_cap_race") {
    return (
      <Suspense>
        <EventCapRaceLeaderboard
          activeClass={activeClass}
          eventSlug={eventSlug}
        />
      </Suspense>
    );
  }

  return (
    <Suspense fallback={<EventScheduleSkeleton />}>
      <EventSchedulesTab eventSlug={eventSlug} />
    </Suspense>
  );
}
