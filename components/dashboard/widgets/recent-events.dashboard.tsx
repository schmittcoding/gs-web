import { getAllEvents } from "@/app/(dashboard)/events/actions";
import { EVENT_CATEGORY } from "@/components/events/constants.events";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatFullDate } from "@/lib/formatters";
import { cn } from "@/lib/utils";

function fmtDMY(dateString: string) {
  const d = new Date(dateString);
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}
import { IconCalendarEvent, IconChevronRight } from "@tabler/icons-react";
import Link from "next/link";
import { PropsWithChildren } from "react";

function RecentEventsShell({ children }: PropsWithChildren) {
  return (
    <Card className="h-max">
      <CardHeader className="items-center flex justify-between">
        <CardTitle className="text-sm font-bold uppercase tracking-wider">
          Recent Events
        </CardTitle>
        <CardAction>
          <Link
            href="/events"
            className="text-xs font-semibold text-primary hover:underline uppercase tracking-wider"
          >
            View All
          </Link>
        </CardAction>
      </CardHeader>
      {children}
    </Card>
  );
}

export function RecentEventsSkeleton() {
  return (
    <RecentEventsShell>
      <CardContent className="p-2">
        <section className="divide-y divide-gray-900">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 px-3 py-2.5">
              <Skeleton className="shrink-0 size-9 rounded-full" />
              <div className="flex-1 min-w-0 space-y-1.5">
                <Skeleton className="h-3.5 w-2/5 rounded-sm" />
                <Skeleton className="h-2.5 w-3/5 rounded-sm" />
              </div>
              <Skeleton className="shrink-0 size-4 rounded-sm" />
            </div>
          ))}
        </section>
      </CardContent>
    </RecentEventsShell>
  );
}

export default async function RecentEventsWidget() {
  const { events } = await getAllEvents();

  const now = new Date();

  const recent = [...events]
    .sort(
      (a, b) =>
        new Date(b.event_start).getTime() - new Date(a.event_start).getTime(),
    )
    .slice(0, 5);

  return (
    <RecentEventsShell>
      <CardContent className="p-2">
        {recent.length === 0 ? (
          <p className="text-sm text-gray-500 py-8 text-center">
            No events found
          </p>
        ) : (
          <section className="divide-y divide-gray-900">
            {recent.map((event) => {
              const regOpen = new Date(event.registration_open);
              const regClose = new Date(event.registration_close);
              const isRegistrationOngoing = now >= regOpen && now <= regClose;
              const categoryLabel =
                EVENT_CATEGORY[event.event_category] ?? event.event_category;

              return (
                <Link
                  key={event.event_id}
                  href={`/events/${event.event_slug}`}
                  title={`${event.event_name} · ${formatFullDate(event.event_start)} – ${formatFullDate(event.event_end)}`}
                  className={cn(
                    "group/row relative flex items-center gap-3 px-3 py-2.5 overflow-hidden",
                    "hover:bg-gray-900/80 transition-colors duration-200",
                  )}
                >
                  <div className="shrink-0 flex items-center justify-center size-9 rounded-full bg-gray-800 ring-1 ring-gray-700">
                    <IconCalendarEvent className="size-4 text-gray-400" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      {isRegistrationOngoing && (
                        <span
                          className="shrink-0 size-2 rounded-full bg-primary"
                          title="Registration Ongoing"
                        />
                      )}
                      <span className="text-sm font-bold truncate">
                        {event.event_name}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-500">
                        {categoryLabel}
                      </span>
                      <span className="text-[10px] text-gray-700">·</span>
                      <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-500">
                        {fmtDMY(event.event_start)}
                        {" – "}
                        {fmtDMY(event.event_end)}
                      </span>
                    </div>
                  </div>

                  <IconChevronRight className="size-4 text-gray-600 shrink-0 group-hover/row:text-primary transition-colors duration-200" />
                </Link>
              );
            })}
          </section>
        )}
      </CardContent>
    </RecentEventsShell>
  );
}
