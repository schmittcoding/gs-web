/* eslint-disable @next/next/no-img-element */
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { formatDate } from "@/lib/formatters";
import type {
  EventDefinition,
  GvgConfig,
  GvgKothConfig,
  LevelCapRaceConfig,
} from "@/types/event";
import { IconArrowUpRight } from "@tabler/icons-react";
import Link from "next/link";
import GameButton from "../common/game.button";
import ReadOnlyField from "../ui/input/read-only";
import { EVENT_CATEGORY } from "./constants.events";

interface EventCardProps {
  event: EventDefinition;
}

function CategoryFields({ event }: { event: EventDefinition }) {
  const fieldClass =
    "tabular-nums **:data-[slot='read-only-value']:font-semibold";

  if (event.event_category === "gvg" || event.event_category === "gvg_koth") {
    const config = event.category_config as GvgConfig | GvgKothConfig | null;
    return (
      <>
        <ReadOnlyField className={fieldClass} label="Min. Level" size="sm">
          {event.min_level.toString()}
        </ReadOnlyField>
        <ReadOnlyField className={fieldClass} label="Min. Members" size="sm">
          {config?.min_guild_members?.toString() ?? "-"}
        </ReadOnlyField>
      </>
    );
  }

  if (event.event_category === "level_cap_race") {
    const config = event.category_config as LevelCapRaceConfig | null;
    return (
      <>
        <ReadOnlyField className={fieldClass} label="Min. Level" size="sm">
          {event.min_level.toString()}
        </ReadOnlyField>
        <ReadOnlyField className={fieldClass} label="Max. Age" size="sm">
          {config?.max_account_age_days != null
            ? `${config.max_account_age_days}d`
            : "-"}
        </ReadOnlyField>
        <ReadOnlyField className={fieldClass} label="Target Lv." size="sm">
          {config?.target_level?.toString() ?? "-"}
        </ReadOnlyField>
      </>
    );
  }

  // koth + fallback
  return (
    <ReadOnlyField className={fieldClass} label="Min. Level" size="sm">
      {event.min_level.toString()}
    </ReadOnlyField>
  );
}

export function EventCard({ event }: EventCardProps) {
  return (
    <Card variant="accent">
      <CardContent className="p-2 space-y-4">
        <section className="relative">
          <img
            src="/images/events/War_of_Three_Crowns_Header.png"
            alt={`Ran Online GS | ${event.event_name} banner`}
            className="w-full object-cover h-40 object-top shape-main border border-gray-800"
          />
          <span className="absolute left-4 -bottom-4 text-xs font-medium text-white bg-gray-900 backdrop-blur-sm px-4 py-1.5 uppercase border border-gray-700 shape-main">
            {EVENT_CATEGORY[event.event_category]}
          </span>
        </section>
        <section className="py-2 px-4">
          <span className="text-xs font-normal">
            Ends {formatDate(event.event_end)}
          </span>
          <p className="text-lg font-bold">{event.event_name}</p>
        </section>
      </CardContent>
      <CardFooter className="px-4 sm:px-6 py-4 justify-between">
        <section className="flex gap-4 sm:gap-6 lg:gap-10">
          <CategoryFields event={event} />
        </section>
        <Link href={`/events/${event.event_slug}`}>
          <GameButton size="icon-lg">
            <IconArrowUpRight />
          </GameButton>
        </Link>
      </CardFooter>
    </Card>
  );
  //   return (
  //     <Card variant={event.is_active ? "accent" : "default"}>
  //       <CardHeader>
  //         <CardTitle className="text-sm font-semibold text-white line-clamp-1">
  //           {event.event_name}
  //         </CardTitle>
  //         <CardAction>
  //           <Badge variant={event.is_active ? "default" : "outline"}>
  //             {event.is_active ? "Active" : "Inactive"}
  //           </Badge>
  //         </CardAction>
  //       </CardHeader>
  //       <CardContent className="p-0">
  //         <img
  //           src="/images/events/War_of_Three_Crowns_Header.png"
  //           alt={`Ran Online GS | ${event.event_name} banner`}
  //           className="w-full object-cover max-h-40 object-top"
  //         />
  //         <section className="p-4 space-y-2">
  //           <div className="space-y-0.5">
  //             <p className="text-xs text-gray-400/80">Event period</p>
  //             <p className="text-xs text-gray-400">
  //               <span className="text-gray-300">
  //                 {formatDate(event.event_start)}
  //               </span>
  //               {" – "}
  //               <span className="text-gray-300">
  //                 {formatDate(event.event_end)}
  //               </span>
  //             </p>
  //           </div>
  //           <div className="space-y-0.5">
  //             <p className="text-xs text-gray-400/80">Season</p>
  //             <p className="text-xs text-gray-300 font-medium">
  //               Season {event.season}
  //             </p>
  //           </div>
  //         </section>
  //       </CardContent>
  //     </Card>
  //   );
}
