/* eslint-disable @next/next/no-img-element */
"use client";

import { cn } from "@/lib/utils";
import type { GuildRanking } from "@/types/event";
import {
  IconGrave,
  IconSword,
  IconTower,
  IconTrophy,
} from "@tabler/icons-react";
import Link from "next/link";
import GameButton from "../common/game.button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { RANK_STYLES } from "./constants.events";

type GvgStandingsDialogProps = {
  eventId: string;
  eventName: string;
  season: number;
  rankings: GuildRanking[];
};

export function GvgStandingsDialog({
  eventId,
  eventName,
  season,
  rankings,
}: GvgStandingsDialogProps) {
  return (
    <Dialog defaultOpen>
      <DialogContent
        className="sm:max-w-4xl p-0 overflow-hidden shape-main border border-gray-800 **:data-[slot=dialog-close]:[&_svg]:text-gray-500 **:data-[slot=dialog-close]:hover:[&_svg]:text-gray-300"
        showCloseButton
      >
        <DialogHeader className="sr-only">
          <DialogTitle>{eventName} — GvG Standings</DialogTitle>
        </DialogHeader>

        {/* Banner */}
        <section className="relative overflow-hidden">
          <img
            src="/images/events/War_of_Three_Crowns_Header.png"
            alt={`Ran Online GS | ${eventName}`}
            className="w-full object-cover max-h-40 object-top"
          />
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-[var(--card,#1a1a1a)]" />
          <div className="absolute bottom-3 left-5 flex items-center gap-3">
            <div className="flex size-8 shrink-0 items-center justify-center rounded bg-primary/20 border border-primary/30 backdrop-blur-sm">
              <IconTrophy className="size-4 text-primary" />
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 drop-shadow">
                Season {season} · Live Standings
              </p>
              <h2 className="font-black uppercase tracking-tight text-sm leading-tight drop-shadow">
                {eventName}
              </h2>
            </div>
          </div>
        </section>

        {/* Column headers */}
        <div className="grid grid-cols-[2rem_1fr_3.5rem_3.5rem_3.5rem_4.5rem] gap-x-2 px-5 pt-3 pb-1">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-500 text-center">
            #
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-500">
            Guild
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-500 text-center flex items-center justify-center gap-0.5">
            <IconSword className="size-3" /> Kills
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-500 text-center flex items-center justify-center gap-0.5">
            <IconGrave className="size-3" /> Deaths
          </span>

          <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-500 text-center flex items-center justify-center gap-0.5">
            <IconTower className="size-3" /> Tower
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-500 text-center">
            Score
          </span>
        </div>

        {/* Rankings */}
        <section className="px-3 pb-3 space-y-0.5">
          {rankings.length === 0 ? (
            <p className="py-6 text-center text-sm text-gray-500">
              No standings yet. Check back after the first match.
            </p>
          ) : (
            rankings.map((row) => {
              const style = RANK_STYLES[row.rank];
              return (
                <div
                  key={row.guild_num}
                  className={cn(
                    "leaderboard-cell grid grid-cols-[2rem_1fr_3.5rem_3.5rem_3.5rem_4.5rem] gap-x-2 items-center px-2 py-2.5",
                    "rounded-sm bg-gray-900/60 hover:bg-gray-900 transition-colors duration-150",
                    row.rank === 1 && "bg-primary/5 hover:bg-primary/10",
                  )}
                >
                  {/* Rank */}
                  <div className="flex items-center justify-center">
                    {style?.badge ? (
                      <img
                        className="size-6"
                        src={`https://images.ranonlinegs.com/assets/badges/${style.badge}.webp`}
                        alt={`Rank ${row.rank}`}
                      />
                    ) : (
                      <span className="font-black tabular-nums text-sm text-gray-500">
                        {row.rank}
                      </span>
                    )}
                  </div>

                  {/* Guild name */}
                  <span
                    className={cn(
                      "font-bold text-sm truncate",
                      style?.color ?? "text-gray-100",
                    )}
                  >
                    {row.guild_name}
                  </span>

                  {/* Kills */}
                  <span className="tabular-nums text-sm text-center text-gray-300">
                    {row.total_kills.toLocaleString()}
                  </span>

                  {/* Deaths */}
                  <span className="tabular-nums text-sm text-center text-destructive">
                    {row.total_deaths.toLocaleString()}
                  </span>

                  {/* Tower Points */}
                  <span className="tabular-nums text-sm text-center text-gray-300">
                    {row.tower_points.toLocaleString()}
                  </span>

                  {/* Total score */}
                  <span
                    className={cn(
                      "tabular-nums text-sm text-center font-bold",
                      row.computed_score < 0
                        ? "text-destructive"
                        : "text-primary",
                    )}
                  >
                    {row.computed_score.toLocaleString()}
                  </span>
                </div>
              );
            })
          )}
        </section>

        {/* Footer CTA */}
        <section className="px-5 pb-5 pt-2.5 flex items-center justify-between gap-3 border-t border-gray-800">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-500">
            Top {rankings.length} of all guilds
          </p>
          <Link href={`/events/${eventId}`}>
            <GameButton size="sm">View Full Standings</GameButton>
          </Link>
        </section>
      </DialogContent>
    </Dialog>
  );
}
