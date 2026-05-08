/* eslint-disable @next/next/no-img-element */
"use client";

import { getGuildSnapshots } from "@/app/(dashboard)/events/[eventSlug]/snapshots/actions";
import { RANK_STYLES } from "@/components/events/constants.events";
import ReadOnlyField from "@/components/ui/input/read-only";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";
import { useSnapshot } from "./snapshot-context.events";
import {
  useCallback,
  useEffect,
  useState,
  useTransition,
} from "react";
import { SnapshotGuildScore } from "@/types/event";
import { IconTrendingDown } from "@tabler/icons-react";

function GuildRowSkeleton() {
  return (
    <div className="relative flex items-center gap-6 lg:gap-10 px-4 sm:px-6 py-3 max-lg:py-6 max-lg:flex-col overflow-hidden shape-main w-full max-lg:divide-y max-lg:divide-gray-800 max-lg:gap-6 bg-gray-900/40 animate-pulse">
      <section className="flex flex-1 w-full max-lg:pb-4 items-center max-lg:justify-center text-center gap-6 lg:gap-10">
        <section className="flex items-center justify-center text-center gap-2">
          <div className="size-10 rounded-full bg-gray-800" />
          <div className="w-6 h-5 rounded bg-gray-800" />
        </section>
        <section className="flex gap-1 items-center">
          <div className="w-36 h-5 rounded bg-gray-800" />
        </section>
      </section>
      <section className="flex gap-4 sm:gap-8 lg:gap-10 flex-wrap justify-center">
        {Array.from({ length: 5 }).map((_, j) => (
          <div key={j} className="flex flex-col items-center gap-1.5">
            <div className="w-16 h-3 rounded bg-gray-800" />
            <div className="w-14 h-6 rounded bg-gray-800" />
          </div>
        ))}
      </section>
    </div>
  );
}

export default function EventGuildSnapshot() {
  const { eventSlug } = useParams<{ eventSlug: string }>();
  const { selectedSnapshotId } = useSnapshot();

  const [rankings, setRankings] = useState<SnapshotGuildScore[]>([]);
  const [isPending, startTransition] = useTransition();

  const fetchRankings = useCallback(() => {
    startTransition(async () => {
      const res = await getGuildSnapshots(eventSlug, selectedSnapshotId);

      if (res.success) {
        setRankings(res.rankings);
      }
    });
  }, [eventSlug, selectedSnapshotId]);

  useEffect(() => {
    if (selectedSnapshotId) {
      fetchRankings();
    }
  }, [fetchRankings, selectedSnapshotId]);

  if (isPending && rankings.length === 0) {
    return (
      <section className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <GuildRowSkeleton key={i} />
        ))}
      </section>
    );
  }

  return (
    <section className="space-y-4">
      {rankings.map((ranking) => {
        const style = RANK_STYLES[ranking.rank];

        return (
          <div
            key={ranking.guild_num}
            className={cn(
              "relative flex items-center gap-6 lg:gap-10 px-4 sm:px-6 py-3 max-lg:py-6 max-lg:flex-col overflow-hidden shape-main w-full max-lg:divide-y max-lg:divide-gray-800 max-lg:gap-6",
              style && `bg-linear-to-r ${style.bg} to-transparent`,
            )}
          >
            <section className="flex flex-1 w-full max-lg:pb-4 items-center max-lg:justify-center text-center gap-6 lg:gap-10">
              <section className="flex items-center justify-center text-center gap-2">
                {style && style.badge && (
                  <img
                    className="size-10"
                    src={`https://images.ranonlinegs.com/assets/badges/${style.badge}.webp`}
                    alt={`Ran Online | Events | Rank ${ranking.rank}`}
                  />
                )}
                <span
                  className={cn(
                    "font-black text-gray-500 tabular-nums text-lg",
                    style && style.color,
                  )}
                >
                  {ranking.rank}
                </span>
              </section>
              <section className="flex gap-1 items-center">
                <p className="text-lg font-semibold text-left">
                  {ranking.guild_name}
                </p>
                {typeof ranking.rank_change === "number" &&
                  ranking.rank_change !== 0 && (
                    <div
                      data-trend={ranking.rank_change > 0 ? "up" : "down"}
                      className="rounded-full p-0.5 bg-destructive group"
                    >
                      <IconTrendingDown className="size-4 group-data-[trend=up]:text-green" />
                    </div>
                  )}
              </section>
            </section>
            <section className="flex gap-4 sm:gap-8 lg:gap-10 flex-wrap justify-center">
              <ReadOnlyField
                className="**:data-[slot=read-only-value]:text-lg **:data-[slot=read-only-value]:font-semibold **:data-[slot=read-only-value]:tabular-nums text-center"
                label="Total Kills"
              >
                {ranking.total_kills}
              </ReadOnlyField>
              <ReadOnlyField
                className="**:data-[slot=read-only-value]:text-lg **:data-[slot=read-only-value]:font-semibold **:data-[slot=read-only-value]:text-destructive/70 **:data-[slot=read-only-value]:tabular-nums text-center"
                label="Total Deaths"
              >
                {ranking.total_deaths}
              </ReadOnlyField>
              <ReadOnlyField
                className="**:data-[slot=read-only-value]:text-lg **:data-[slot=read-only-value]:font-semibold **:data-[slot=read-only-value]:tabular-nums text-center"
                label="Tower Points"
              >
                {ranking.tower_points}
              </ReadOnlyField>
              <ReadOnlyField
                className="**:data-[slot=read-only-value]:text-lg **:data-[slot=read-only-value]:font-semibold **:data-[slot=read-only-value]:tabular-nums text-center"
                label="Penalties"
              >
                {ranking.deduction}
              </ReadOnlyField>
              <ReadOnlyField
                className={cn(
                  "**:data-[slot=read-only-value]:text-lg **:data-[slot=read-only-value]:font-semibold **:data-[slot=read-only-value]:tabular-nums text-center",
                  ranking.computed_score < 0
                    ? "text-destructive/70"
                    : "text-accent",
                )}
                label="Total Score"
              >
                {ranking.computed_score}
              </ReadOnlyField>
            </section>
          </div>
        );
      })}
    </section>
  );
}
