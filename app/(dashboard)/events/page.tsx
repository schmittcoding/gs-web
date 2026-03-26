/* eslint-disable @next/next/no-img-element */
import GameButton from "@/components/common/game.button";
import { MATCHES } from "@/components/events/constants.events";
import EventRegistration from "@/components/events/registration/registration.events";
import { Card, CardContent } from "@/components/ui/card";
import ReadOnlyField from "@/components/ui/input/read-only";
import { Skeleton } from "@/components/ui/skeleton";
import { getSession } from "@/lib/auth/session.auth";
import { formatDate, formatShortDate, formatShortTime } from "@/lib/formatters";
import { cn } from "@/lib/utils";
import { IconLink } from "@tabler/icons-react";
import Link from "next/link";
import { Suspense } from "react";
import { getCurrentEvent } from "./actions";

export default async function EventsPage() {
  const [{ event, is_registration_available }, session] = await Promise.all([
    getCurrentEvent(),
    getSession(),
  ]);

  if (!event) {
    return (
      <main className="min-h-0 size-full bg-gray-950 relative overflow-auto p-4">
        <section className="container mx-auto flex items-center justify-center h-full">
          <p className="text-gray-400 text-lg">No active event at this time.</p>
        </section>
      </main>
    );
  }

  //   const { matches } = await getEventMatches(event.event_id);

  return (
    <main className="min-h-0 size-full bg-gray-950 relative overflow-auto p-4">
      <section className="container mx-auto h-max">
        <img
          className="w-full"
          src="/images/events/War_of_Three_Crowns_Header.png"
          alt={`Ran Online GS | Events | ${event.event_name}`}
        />
        <section className="h-full relative w-full max-w-4xl mx-auto space-y-4">
          <section className="-mt-15 relative">
            <Card variant="primary">
              <CardContent className="flex flex-col md:flex-row p-0">
                <section className="flex-1 p-4 md:py-6 md:pl-6 space-y-2">
                  <h2 className="text-2xl font-bold text-accent">
                    {event.event_name}
                  </h2>
                  <ReadOnlyField label="Event date" className="font-medium">
                    <p className="text-gray-400">
                      <span className="text-gray-300 font-medium">
                        {formatDate(event.event_start)}
                      </span>{" "}
                      to{" "}
                      <span className="text-gray-300 font-medium">
                        {formatDate(event.event_end)}
                      </span>
                    </p>
                  </ReadOnlyField>
                  <ReadOnlyField
                    label="Event map"
                    className="text-gray-300 font-medium"
                  >
                    Tyranny Map
                  </ReadOnlyField>
                  <ReadOnlyField
                    label="Event duration"
                    className="text-gray-300 font-medium"
                  >
                    {`${event.match_duration_min} minutes`}
                  </ReadOnlyField>
                  <ReadOnlyField
                    label="Event minimum level"
                    className="text-gray-300 font-medium"
                  >
                    {`Lv. ${event.min_level}`}
                  </ReadOnlyField>
                  <ReadOnlyField
                    label="Event mechanics"
                    className="text-gray-300 font-medium"
                  >
                    <Link
                      href="https://discord.com/channels/1156515646264315905/1156515647350644789/1483142252346998935"
                      target="_blank"
                    >
                      <GameButton size="xs" variant="outline">
                        Full Mechanics <IconLink />
                      </GameButton>
                    </Link>
                  </ReadOnlyField>
                </section>
                <section className="w-full md:w-[40%] bg-gray-900/60 p-6 border-t md:border-t-0 md:border-l border-dashed border-gray-700 flex flex-col">
                  <section className="space-y-4 flex-1">
                    <div className="space-y-2">
                      <h2 className="text-lg font-medium">Registration</h2>
                      <Suspense fallback={<Skeleton className="h-5 w-32" />}>
                        <EventRegistration
                          eventId={event.event_id}
                          minLevel={event.min_level}
                          canRegister={is_registration_available}
                        />
                      </Suspense>
                    </div>
                    <ReadOnlyField
                      label="Registration date"
                      className="text-gray-300 font-medium"
                    >
                      <p className="text-gray-400">
                        <span className="text-gray-300 font-medium">
                          {formatDate(event.registration_open)}
                        </span>{" "}
                        to
                        <br />
                        <span className="text-gray-300 font-medium">
                          {formatDate(event.registration_close)}
                        </span>
                      </p>
                    </ReadOnlyField>
                  </section>
                  {is_registration_available && (
                    <Link href={`/events/${event.event_id}/participants`}>
                      <GameButton
                        className="w-full"
                        size="default"
                        variant="outline"
                      >
                        View Participants
                      </GameButton>
                    </Link>
                  )}
                  {session?.user.user_role === "admin" && (
                    <Link href={`/events/${event.event_id}`}>
                      <GameButton
                        className="w-full"
                        size="default"
                        variant="outline"
                      >
                        View Leaderboard
                      </GameButton>
                    </Link>
                  )}
                </section>
              </CardContent>
            </Card>
          </section>
          {/* <Suspense>
            <MatchStatusBanner eventId={event.event_id} />
          </Suspense> */}
          <section className="space-y-2">
            <h3 className="text-xl font-bold">Event Schedule</h3>
            <div className="space-y-1.5">
              {MATCHES.map((match) => (
                <div
                  key={match.match_id}
                  className={cn(
                    "group/row relative flex flex-wrap items-center gap-3 px-3 py-2.5 rounded-sm overflow-hidden",
                    "hover:bg-gray-900/80 transition-colors duration-200 odd:bg-gray-900/80",
                  )}
                >
                  <section className="flex gap-3">
                    <div className="min-w-16 lg:w-50 pr-4">
                      <span>{match.match_label}</span>
                      <p className="text-[9px] font-semibold uppercase tracking-widest text-gray-500">
                        Match
                      </p>
                    </div>
                    <section className="flex-1 min-w-0 flex gap-4 sm:divide-x divide-gray-700">
                      <div className="pr-4">
                        <span className="font-medium">
                          {formatShortDate(match.match_date)}
                        </span>
                        <p className="text-[9px] font-semibold uppercase tracking-widest text-gray-500">
                          Match Date
                        </p>
                      </div>
                      <div>
                        <span className="font-medium">
                          {formatShortTime(match.start_time)}
                        </span>
                        <p className="text-[9px] font-semibold uppercase tracking-widest text-gray-500">
                          Server Time
                        </p>
                      </div>
                    </section>
                  </section>
                  <section className="flex-1 flex gap-3 items-center justify-between md:justify-end">
                    <section className="flex gap-2 sm:gap-4 sm:divide-x divide-gray-700">
                      <div className="pr-4 text-center">
                        <span className="font-medium">
                          {match.tower_points_th ?? 0}
                        </span>
                        <p className="text-[9px] font-semibold uppercase tracking-widest text-gray-500">
                          TH
                        </p>
                      </div>
                      <div className="pr-4 text-center">
                        <span className="font-medium">
                          {match.tower_points_faci ?? 0}
                        </span>
                        <p className="text-[9px] font-semibold uppercase tracking-widest text-gray-500">
                          Faci
                        </p>
                      </div>
                      <div className="text-center">
                        <span className="font-medium">
                          {match.tower_points_nuc ?? 0}
                        </span>
                        <p className="text-[9px] font-semibold uppercase tracking-widest text-gray-500">
                          Nuc
                        </p>
                      </div>
                    </section>
                    <div>
                      <span
                        className={cn(
                          "font-black leading-none",
                          "data-[status=Pending]:text-gray-500",
                          "data-[status=Processing]:text-gray-300",
                          "data-[status=Completed]:text-accent/80",
                        )}
                        data-status={match.tally_status}
                      >
                        {match.tally_status}
                      </span>
                    </div>
                  </section>
                </div>
              ))}
            </div>
          </section>
        </section>
      </section>
    </main>
  );
}
