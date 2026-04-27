/* eslint-disable @next/next/no-img-element */
import EventTabNav from "@/components/events/(eventSlug)/tabs/tab-nav.events";
import EventRegistration from "@/components/events/registration/registration.events";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ReadOnlyField from "@/components/ui/input/read-only";
import { formatDate, formatShortDate } from "@/lib/formatters";
import { cn } from "@/lib/utils";
import type {
  CategoryConfig,
  GvgConfig,
  GvgKothConfig,
  KothConfig,
  LevelCapRaceConfig,
} from "@/types/event";
import { redirect } from "next/navigation";
import { ReactNode, Suspense } from "react";
import { getEventDetails } from "./actions";

export const dynamic = "force-dynamic";

type LayoutProps = {
  children: ReactNode;
  params: Promise<{ eventSlug: string }>;
};

function EventDetailsFields({ config }: { config: CategoryConfig | null }) {
  if (!config) return null;

  switch (config.type) {
    case "gvg":
    case "koth":
    case "gvg_koth": {
      const c = config as GvgConfig | KothConfig | GvgKothConfig;
      return (
        <>
          <ReadOnlyField
            label="Match duration"
            className="text-gray-300 font-medium"
          >
            {`${c.match_duration_min} minutes`}
          </ReadOnlyField>
          {"min_guild_members" in c && (
            <ReadOnlyField
              label="Min. guild members"
              className="text-gray-300 font-medium"
            >
              {String(c.min_guild_members)}
            </ReadOnlyField>
          )}
        </>
      );
    }
    case "level_cap_race": {
      const c = config as LevelCapRaceConfig;
      return (
        <section className="grid grid-cols-2">
          <ReadOnlyField
            label="Target level"
            className="text-gray-300 font-medium"
          >
            {`Lv. ${c.target_level}`}
          </ReadOnlyField>
          <ReadOnlyField
            label="Max. account age"
            className="text-gray-300 font-medium"
          >
            {`${c.max_account_age_days} days`}
          </ReadOnlyField>
        </section>
      );
    }
    default:
      return null;
  }
}

export default async function EventSlugLayout({
  children,
  params,
}: LayoutProps) {
  const { eventSlug } = await params;
  const { event, is_registration_available } = await getEventDetails(eventSlug);

  if (!event) {
    return redirect("/events");
  }

  const showTabs =
    event.event_category === "gvg" ||
    event.event_category === "koth" ||
    event.event_category === "gvg_koth";

  return (
    <main className="min-h-0 size-full relative overflow-auto p-4 space-y-4">
      <section
        data-slot="event-header"
        className="flex flex-col lg:flex-row gap-4"
      >
        <Card className="w-full h-48 sm:h-64 lg:h-87.5 overflow-hidden relative flex-1">
          <img
            src="/images/events/War_of_Three_Crowns_Header.png"
            alt="Ran Online GS | Tournament"
            className="object-cover size-full object-center"
          />
          <section className="absolute left-4 sm:left-7 bottom-4 sm:bottom-7">
            <h2 className="text-xl sm:text-3xl font-bold text-white">
              {event.event_name}
            </h2>
            <p className="text-gray-400">
              <span className="text-gray-300 font-medium">
                {formatShortDate(event.event_start)}
              </span>{" "}
              to{" "}
              <span className="text-gray-300 font-medium">
                {formatShortDate(event.event_end)}
              </span>
            </p>
          </section>
        </Card>
        <Card className="w-full lg:max-w-100 lg:h-87.5">
          <CardHeader>
            <CardTitle className="text-normal text-lg">Event Details</CardTitle>
          </CardHeader>
          <CardContent className="py-4 space-y-2">
            <EventDetailsFields config={event.category_config} />
            <ReadOnlyField
              label="Minimum level"
              className="text-gray-300 font-medium"
            >
              {`Lv. ${event.min_level}`}
            </ReadOnlyField>
            <ReadOnlyField label="Registration date">
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
          </CardContent>
          <CardFooter
            className={cn(
              "flex items-center justify-center",
              !is_registration_available && "py-4",
            )}
          >
            <Suspense>
              <EventRegistration
                canRegister={is_registration_available}
                eventId={eventSlug}
                minLevel={event.min_level}
                eventCategory={event.event_category}
                eventSlug={eventSlug}
              />
            </Suspense>
          </CardFooter>
        </Card>
      </section>
      <section>
        {showTabs && (
          <Suspense>
            <EventTabNav
              eventSlug={eventSlug}
              eventCategory={event.event_category}
            />
          </Suspense>
        )}
        {children}
      </section>
    </main>
  );
}
