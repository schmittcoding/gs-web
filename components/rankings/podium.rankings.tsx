/* eslint-disable @next/next/no-img-element */
"use client";

import { cn } from "@/lib/utils";
import { IconTrophy } from "@tabler/icons-react";
import ReadOnlyField from "../ui/input/read-only";
import { Separator } from "../ui/separator";
import {
  formatGold,
  getClassName,
  getSchoolName,
  type GoldRankingEntry,
} from "./types.rankings";

type PodiumCardProps = {
  entry: GoldRankingEntry;
  position: 1 | 2 | 3;
};

const podiumConfig = {
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

function PodiumCard({ entry, position }: PodiumCardProps) {
  const config = podiumConfig[position];

  return (
    <div
      className={cn(
        "group relative",
        "data-[position=1]:min-h-44",
        "data-[position=2]:min-h-38",
        "data-[position=3]:min-h-36",
        config.order,
        config.scale,
        config.delay,
      )}
      data-position={position}
    >
      <div
        className={cn(
          "relative size-full p-2 lg:p-4 overflow-hidden border shape-main bg-gray-950 space-y-2 flex flex-col",
          "group-data-[position=1]:border-primary/50 group-data-[position=1]:ring-primary/30 ",
          "group-data-[position=2]:border-gray-400/40 group-data-[position=2]:ring-gray-400/20",
          "group-data-[position=3]:border-amber-600/40 group-data-[position=3]:ring-amber-600/20",
          config.glowColor,
        )}
      >
        <img
          className="absolute top-10 right-0 scale-270 opacity-5 blur-[1px] -rotate-12"
          alt={`Ran Online GS | Rankings | ${getSchoolName(entry.cha_school)}`}
          src={`https://images.ranonlinegs.com/assets/campus/${getSchoolName(entry.cha_school)}.png`}
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
          <div className="flex flex-col text-center">
            <h3 className="max-w-full text-base font-bold truncate text-foreground">
              {entry.cha_name}
            </h3>
            <span className="text-xs font-medium text-gray-400 tabular-nums">
              Lv. {entry.cha_level}
            </span>
          </div>
        </section>
        <Separator />
        <section className="flex flex-col items-center justify-between gap-2 lg:gap-6 size-full lg:flex-row">
          <ReadOnlyField
            className="**:data-[slot='read-only-label']:text-xs text-center lg:text-left"
            label="Class"
          >
            <div className="flex items-center gap-2">
              <img
                className="rounded-full size-6"
                alt={`Ran Online GS | ${getClassName(entry.cha_class)}`}
                src={`https://images.ranonlinegs.com/assets/emblems/${getClassName(entry.cha_class).toLowerCase()}.webp`}
              />
              <span className="text-sm font-medium">
                {getClassName(entry.cha_class)}
              </span>
            </div>
          </ReadOnlyField>
          <ReadOnlyField
            className="**:data-[slot='read-only-label']:text-xs text-center lg:text-left"
            label="Gold"
          >
            <p className="text-lg font-bold text-yellow-400 lg:text-base tabular-nums ran-glow-pulse">
              {formatGold(entry.cha_money)}
            </p>
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
    </div>
  );
}

type RankingsPodiumProps = {
  entries: GoldRankingEntry[];
};

function RankingsPodium({ entries }: RankingsPodiumProps) {
  if (entries.length < 3) return null;

  return (
    <div className="w-full">
      {/* Section title */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 h-px bg-linear-to-l from-primary/30 to-transparent" />
        <IconTrophy className="size-5 text-primary" />
        <h2 className="text-sm font-semibold tracking-wider uppercase text-primary">
          Top Players
        </h2>
        <div className="flex-1 h-px bg-linear-to-r from-primary/30 to-transparent" />
      </div>

      {/* Podium grid — center (1st) is taller */}
      <div className="grid items-end max-w-4xl grid-cols-3 gap-3 mx-auto">
        <PodiumCard entry={entries[1]} position={2} />
        <PodiumCard entry={entries[0]} position={1} />
        <PodiumCard entry={entries[2]} position={3} />
      </div>
    </div>
  );
}

export { RankingsPodium };
