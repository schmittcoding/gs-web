import EventClassLeaderboard from "@/components/events/(eventSlug)/tabs/event-leaderboard/class-leaderboard.events";
import EventGuildLeaderboard from "@/components/events/(eventSlug)/tabs/event-leaderboard/guild-leaderboard.events";
import {
  EventClassLeaderboardSkeleton,
  EventGuildLeaderboardSkeleton,
} from "@/components/events/(eventSlug)/tabs/skeletons";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ eventSlug: string }>;
  searchParams: Promise<{ type?: string; class?: string }>;
};

export default async function LeaderboardPage({
  params,
  searchParams,
}: PageProps) {
  const [
    { eventSlug },
    { class: activeClass = "shaman", type: eventType = "gvg" },
  ] = await Promise.all([params, searchParams]);

  if (eventType === "koth") {
    return (
      <Suspense fallback={<EventClassLeaderboardSkeleton />}>
        <EventClassLeaderboard
          eventSlug={eventSlug}
          activeClass={activeClass}
        />
      </Suspense>
    );
  }

  return (
    <Suspense fallback={<EventGuildLeaderboardSkeleton />}>
      <EventGuildLeaderboard eventSlug={eventSlug} />
    </Suspense>
  );
}
