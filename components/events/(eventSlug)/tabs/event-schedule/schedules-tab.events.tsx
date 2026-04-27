import { getEventMatches } from "@/app/(dashboard)/events/[eventSlug]/actions";
import MatchScheduleEvents from "@/components/events/match-schedule.events";
import { MatchWithGimmicks } from "@/types/event";

type EventSchedulesTabProps = {
  eventSlug: string;
};

function splitByClosestDate(matches: MatchWithGimmicks[]) {
  const today = new Date().toISOString().split("T")[0];

  const todayMatches = matches.filter((m) => m.match_date === today);
  if (todayMatches.length > 0) {
    return {
      featured: todayMatches,
      label: "Today",
      rest: matches.filter((m) => m.match_date !== today),
    };
  }

  const nextDate = matches
    .map((m) => m.match_date)
    .filter((d) => d > today)
    .sort()[0];

  if (nextDate) {
    return {
      featured: matches.filter((m) => m.match_date === nextDate),
      label: "Next Up",
      rest: matches.filter((m) => m.match_date !== nextDate),
    };
  }

  return { featured: [], label: null, rest: matches };
}

export default async function EventSchedulesTab({
  eventSlug,
}: EventSchedulesTabProps) {
  const { matches } = await getEventMatches(eventSlug);
  const { featured, label, rest } = splitByClosestDate(matches);

  return (
    <section className="grid lg:grid-cols-[1fr_400px] gap-4">
      <section className="space-y-8 pt-4">
        <h3 className="text-xl font-bold">Event Schedule</h3>
        {featured.length > 0 && (
          <section className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent">
              {label}
            </p>
            {featured.map((match) => (
              <MatchScheduleEvents key={match.match_id} match={match} />
            ))}
          </section>
        )}
        {rest.length > 0 && (
          <section className="space-y-4">
            {featured.length > 0 && (
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                All Matches
              </p>
            )}
            {rest.map((match) => (
              <MatchScheduleEvents key={match.match_id} match={match} />
            ))}
          </section>
        )}
      </section>
    </section>
  );
}
