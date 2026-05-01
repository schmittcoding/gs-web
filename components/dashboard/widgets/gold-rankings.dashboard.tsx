/* eslint-disable @next/next/no-img-element */
import { getGoldRankings } from "@/app/(dashboard)/rankings/actions";
import {
  formatGold,
  getClassName,
  getSchoolAbbr,
  getSchoolColor,
} from "@/components/rankings/types.rankings";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { PropsWithChildren } from "react";

const RANK_STYLES: Record<
  number,
  { badge: string; color: string; bg: string }
> = {
  1: { badge: "gold", color: "text-yellow-400", bg: "from-yellow-500/10" },
  2: { badge: "silver", color: "text-gray-300", bg: "from-gray-400/10" },
  3: { badge: "bronze", color: "text-amber-600", bg: "from-amber-600/10" },
};

export function GoldRankingsShell({ children }: PropsWithChildren) {
  return (
    <Card className="h-max">
      <CardHeader className="items-center flex justify-between">
        <CardTitle className="text-sm font-bold uppercase tracking-wider">
          Gold Rankings
        </CardTitle>
        <CardAction>
          <Link
            href="/rankings"
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

export function GoldRankingsSkeleton() {
  return (
    <GoldRankingsShell>
      <div className="p-2 grid gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 px-3 py-2.5">
            <Skeleton className="w-8 shrink-0 size-7 rounded-sm" />
            <Skeleton className="size-7 shrink-0 rounded-full" />
            <div className="flex-1 min-w-0 space-y-1.5">
              <Skeleton className="h-3.5 w-2/5 rounded-sm" />
              <Skeleton className="h-2.5 w-1/3 rounded-sm" />
            </div>
            <Skeleton className="h-4 w-14 rounded-sm" />
          </div>
        ))}
      </div>
    </GoldRankingsShell>
  );
}

export default async function GoldRankingsWidget() {
  const rankings = await getGoldRankings(1, 5);

  return (
    <GoldRankingsShell>
      <CardContent className="p-2">
        {rankings.data.length === 0 ? (
          <p className="text-sm text-gray-500 py-8 text-center">
            No rankings available
          </p>
        ) : (
          <div className="grid gap-1">
            {rankings.data.map((entry) => {
              const style = RANK_STYLES[entry.rank_number];
              return (
                <div
                  key={entry.rank_number}
                  className={cn(
                    "relative flex items-center gap-3 px-3 py-2.5 rounded-sm overflow-hidden",
                    style && `bg-linear-to-r ${style.bg} to-transparent`,
                  )}
                >
                  <div className="w-8 shrink-0 flex justify-center">
                    {style ? (
                      <img
                        className="size-7"
                        src={`https://images.ranonlinegs.com/assets/badges/${style.badge}.webp`}
                        alt={`Rank ${entry.rank_number}`}
                      />
                    ) : (
                      <span className="text-sm font-black text-gray-500 tabular-nums">
                        {entry.rank_number}
                      </span>
                    )}
                  </div>

                  <img
                    className="size-7 rounded-full ring-1 ring-gray-800 shrink-0"
                    alt={getClassName(entry.cha_class)}
                    src={`https://images.ranonlinegs.com/assets/emblems/${getClassName(entry.cha_class).toLowerCase()}.webp`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold truncate">
                      {entry.cha_name}
                    </p>
                    <div className="flex items-center gap-1.5">
                      <span
                        className={cn(
                          "text-[10px] font-semibold uppercase tracking-wider",
                          getSchoolColor(entry.cha_school),
                        )}
                      >
                        {getSchoolAbbr(entry.cha_school)}
                      </span>
                      <span className="text-[10px] text-gray-600">
                        &middot;
                      </span>
                      <span className="text-[10px] text-gray-500 tabular-nums">
                        Lv. {entry.cha_level}
                      </span>
                    </div>
                  </div>

                  <span
                    className={cn(
                      "text-sm font-black tabular-nums",
                      style?.color ?? "text-yellow-400/70",
                    )}
                  >
                    {formatGold(entry.cha_money)}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </GoldRankingsShell>
  );
}
