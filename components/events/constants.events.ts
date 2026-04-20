import { GimmickType } from "@/types/event";

export const RANK_STYLES: Record<
  number,
  { badge: string; color: string; bg: string }
> = {
  1: { badge: "gold", color: "text-yellow-400", bg: "from-yellow-500/10" },
  2: { badge: "silver", color: "text-gray-300", bg: "from-gray-400/10" },
  3: { badge: "bronze", color: "text-amber-600", bg: "from-amber-600/10" },
};

export const GIMMICK_LABELS: Record<GimmickType, string> = {
  DoublePoints: "Double Points",
  NullDeaths: "No Deaths",
} as const;
