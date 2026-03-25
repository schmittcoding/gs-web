/* eslint-disable @next/next/no-img-element */
"use client";

import { getSchoolLeaderboard } from "@/app/(dashboard)/events/actions";
import { cn } from "@/lib/utils";
import { SchoolRanking } from "@/types/event";
import { IconLoader2 } from "@tabler/icons-react";
import { useCallback, useEffect, useState, useTransition } from "react";
import { getSchoolAbbr, getSchoolFullName } from "../rankings/types.rankings";
import ReadOnlyField from "../ui/input/read-only";
import { Separator } from "../ui/separator";

type SchoolLeaderboardProps = {
  eventId: string;
};

const rankConfig: Record<number, Record<string, string>> = {
  1: {
    badge: "gold",
    height: "h-44",
    iconColor: "text-yellow-400",
    glowColor: "shadow-yellow-500/20",
    borderColor: "border-yellow-500/50",
    bgGradient: "from-yellow-500/10 via-yellow-500/5 to-transparent",
    delay: "ran-fade-up-2",
    order: "order-2",
    scale: "lg:scale-110 lg:z-10",
  },
  2: {
    badge: "silver",
    height: "h-36",
    iconColor: "text-gray-300",
    glowColor: "shadow-gray-400/15",
    borderColor: "border-gray-400/40",
    bgGradient: "from-gray-400/10 via-gray-400/5 to-transparent",
    label: "2nd",
    delay: "ran-fade-up-1",
    ringColor: "ring-gray-400/20",
    order: "order-1",
    scale: "",
  },
  3: {
    badge: "bronze",
    height: "h-32",
    iconColor: "text-amber-600",
    glowColor: "shadow-amber-600/15",
    borderColor: "border-amber-600/40",
    bgGradient: "from-amber-600/10 via-amber-600/5 to-transparent",
    label: "3rd",
    delay: "ran-fade-up-3",
    ringColor: "ring-amber-600/20",
    order: "order-3",
    scale: "",
  },
} as const;

export default function SchoolLeaderboard({ eventId }: SchoolLeaderboardProps) {
  const [rankings, setRankings] = useState<SchoolRanking[]>([]);
  const [isPending, startTransition] = useTransition();

  const fetchRankings = useCallback(() => {
    startTransition(async () => {
      const res = await getSchoolLeaderboard(eventId);

      if (res.success) {
        setRankings(res.rankings);
      }
    });
  }, [eventId]);

  useEffect(() => {
    fetchRankings();
  }, [fetchRankings]);

  if (isPending) {
    return (
      <section className="size-full flex items-center justify-center">
        <IconLoader2 className="animate-spin" />
      </section>
    );
  }

  if (!isPending && rankings.length <= 0) {
    return (
      <section className="size-full flex items-center justify-center">
        <span className="text-gray-400">No school rankings available yet.</span>
      </section>
    );
  }

  return (
    <section className="grid items-end grid-cols-3 gap-3 mx-auto">
      {rankings.map(
        ({
          cha_school,
          rank,
          computed_score,
          deduction,
          total_deaths,
          total_kills,
          total_tower,
        }) => {
          const config = rankConfig[rank];

          return (
            <section
              key={cha_school}
              className={cn("group relative", config.order, config.delay)}
              data-position={rank}
            >
              <div
                className={cn(
                  "relative size-full p-2 lg:p-4 overflow-hidden border shape-main bg-gray-950 space-y-4 flex flex-col",
                  "group-data-[position=1]:border-primary/50 group-data-[position=1]:ring-primary/30 ",
                  "group-data-[position=2]:border-gray-400/40 group-data-[position=2]:ring-gray-400/20",
                  "group-data-[position=3]:border-amber-600/40 group-data-[position=3]:ring-amber-600/20",
                  //   config.glowColor,
                )}
              >
                <img
                  className="absolute top-10 right-0 scale-270 opacity-5 blur-[1px] -rotate-12"
                  alt={`Ran Online GS | Rankings | ${getSchoolAbbr(cha_school)}`}
                  src={`https://images.ranonlinegs.com/assets/campus/${getSchoolAbbr(cha_school)}.png`}
                />
                <div
                  className={cn(
                    "absolute inset-0 bg-linear-to-b opacity-60",
                    config.bgGradient,
                  )}
                />
                <section className="flex flex-col items-center justify-center w-full gap-0.5">
                  <img
                    className="size-12.5"
                    src={`https://images.ranonlinegs.com/assets/badges/${config.badge}.webp`}
                    alt="Ran Online GS | Rankings"
                  />
                  <h3 className="max-w-full text-base font-bold truncate text-foreground">
                    {getSchoolFullName(cha_school)}
                  </h3>
                  <p
                    className={cn(
                      "text-2xl font-bold",
                      computed_score < 0 ? "text-destructive" : "text-accent",
                    )}
                  >
                    {computed_score}
                  </p>
                </section>
                <Separator />
                <section className="flex items-center justify-between gap-2 lg:gap-6 size-full">
                  <ReadOnlyField
                    className="**:data-[slot='read-only-label']:font-medium text-lg font-bold text-center"
                    label="Kill/Death"
                  >
                    <p>
                      {total_kills} /{" "}
                      <span className="text-destructive">{total_deaths}</span>
                    </p>
                  </ReadOnlyField>
                  <ReadOnlyField
                    className="**:data-[slot='read-only-label']:font-medium text-lg font-bold text-center"
                    label="Tower Points"
                  >
                    {total_tower}
                  </ReadOnlyField>
                  <ReadOnlyField
                    className="**:data-[slot='read-only-label']:font-medium text-lg font-bold text-center"
                    label="Deductions"
                  >
                    {deduction}
                  </ReadOnlyField>
                </section>
              </div>

              <div
                className={cn(
                  "absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-0.5 ",
                  "group-data-[position=1]:bg-primary",
                  "group-data-[position=2]:bg-gray-400",
                  "group-data-[position=3]:bg-amber-600",
                )}
              />
            </section>
          );
        },
      )}
    </section>
  );
}
