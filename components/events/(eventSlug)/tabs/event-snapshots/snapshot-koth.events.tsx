/* eslint-disable @next/next/no-img-element */
"use client";

import { getKOTHSnapshot } from "@/app/(dashboard)/events/[eventSlug]/snapshots/actions";
import { RANK_STYLES } from "@/components/events/constants.events";
import ReadOnlyField from "@/components/ui/input/read-only";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";
import { useSnapshot } from "./snapshot-context.events";
import { useCallback, useEffect, useState, useTransition } from "react";
import { SnapshotKOTHScore } from "@/types/event";
import { getSchoolAbbr } from "@/components/rankings/types.rankings";

function KOTHRowSkeleton() {
  return (
    <div className="relative flex items-center gap-6 lg:gap-10 px-4 sm:px-6 py-3 max-lg:py-6 max-lg:flex-col overflow-hidden shape-main w-full max-lg:divide-y max-lg:divide-gray-800 max-lg:gap-6 bg-gray-900/40 animate-pulse">
      <section className="flex items-center">
        <section className="flex items-center text-center gap-2 w-max xl:w-12">
          <div className="size-10 rounded-full bg-gray-800" />
        </section>
        <section className="flex gap-2 items-center xl:w-60">
          <div className="size-10 rounded bg-gray-800" />
          <div className="flex flex-col gap-1.5">
            <div className="w-28 h-5 rounded bg-gray-800" />
            <div className="w-16 h-3.5 rounded bg-gray-800" />
          </div>
        </section>
      </section>
      <section className="flex gap-8 w-full justify-end text-right">
        {Array.from({ length: 3 }).map((_, j) => (
          <div key={j} className="flex flex-col items-center gap-1.5">
            <div className="w-16 h-3 rounded bg-gray-800" />
            <div className="w-14 h-7 rounded bg-gray-800" />
          </div>
        ))}
      </section>
    </div>
  );
}

export default function EventClassSnapshot() {
  const { eventSlug } = useParams<{ eventSlug: string }>();
  const { selectedSnapshotId, selectedClass } = useSnapshot();

  const [rankings, setRankings] = useState<SnapshotKOTHScore[]>([]);
  const [isPending, startTransition] = useTransition();

  const fetchRankings = useCallback(() => {
    startTransition(async () => {
      const res = await getKOTHSnapshot(
        eventSlug,
        selectedSnapshotId,
        selectedClass ?? 1,
      );

      if (res.success) {
        setRankings(res.rankings);
      }
    });
  }, [eventSlug, selectedClass, selectedSnapshotId]);

  useEffect(() => {
    if (selectedSnapshotId) {
      fetchRankings();
    }
  }, [fetchRankings, selectedSnapshotId, selectedClass]);

  if (isPending && rankings.length === 0) {
    return (
      <section className="space-y-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <KOTHRowSkeleton key={i} />
        ))}
      </section>
    );
  }

  return (
    <section className="space-y-4">
      {rankings.map((ranking) => {
        const style = RANK_STYLES[ranking.rank];
        const schoolAbrr = getSchoolAbbr(ranking.cha_school as number);
        const score =
          ranking.total_kills - ranking.total_deaths - ranking.deduction;

        return (
          <div
            key={ranking.cha_num}
            className={cn(
              "relative flex items-center gap-6 lg:gap-10 px-4 sm:px-6 py-3 max-lg:py-6 max-lg:flex-col overflow-hidden shape-main w-full max-lg:divide-y max-lg:divide-gray-800 max-lg:gap-6",
              style
                ? `bg-linear-to-r ${style.bg} to-transparent`
                : "bg-gray-900/40",
            )}
          >
            <section className="flex items-center">
              <section
                className={cn(
                  "flex items-center text-center gap-2 w-max xl:w-12",
                  !style?.badge && "justify-center",
                )}
              >
                {style && style.badge && (
                  <img
                    className="size-10"
                    src={`https://images.ranonlinegs.com/assets/badges/${style.badge}.webp`}
                    alt={`Ran Online | Events | Rank ${ranking.rank}`}
                  />
                )}
              </section>
              <section className="flex gap-2 items-center xl:w-60">
                <img
                  className="size-10"
                  alt={`Ran Online GS | ${schoolAbrr}`}
                  src={`https://images.ranonlinegs.com/assets/campus/${schoolAbrr}.png`}
                />
                <p className="text-lg font-semibold text-left">
                  {ranking.cha_name}
                  {ranking.guild_name && (
                    <span className="text-base opacity-50">
                      {" "}
                      ({ranking.guild_name})
                    </span>
                  )}
                </p>
              </section>
            </section>
            <section className="flex gap-8 w-full justify-end text-right">
              <ReadOnlyField
                className="**:data-[slot=read-only-value]:text-2xl **:data-[slot=read-only-value]:font-semibold **:data-[slot=read-only-value]:tabular-nums text-center"
                label="Total Kills"
              >
                {ranking.total_kills}
              </ReadOnlyField>
              <ReadOnlyField
                className="**:data-[slot=read-only-value]:text-2xl **:data-[slot=read-only-value]:font-semibold **:data-[slot=read-only-value]:text-destructive/70 **:data-[slot=read-only-value]:tabular-nums text-center"
                label="Total Deaths"
              >
                {ranking.total_deaths}
              </ReadOnlyField>
              <ReadOnlyField
                className={cn(
                  "**:data-[slot=read-only-value]:text-2xl **:data-[slot=read-only-value]:font-semibold **:data-[slot=read-only-value]:tabular-nums text-center",
                  score < 0 ? "text-destructive/70" : "text-accent",
                )}
                label="Total Score"
              >
                {score.toLocaleString()}
              </ReadOnlyField>
            </section>
          </div>
        );
      })}
    </section>
  );
}
