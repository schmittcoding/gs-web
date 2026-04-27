/* eslint-disable @next/next/no-img-element */
import { getGuildLeaderboard } from "@/app/(dashboard)/events/[eventSlug]/leaderboard/actions";
import { RANK_STYLES } from "@/components/events/constants.events";
import ReadOnlyField from "@/components/ui/input/read-only";
import { cn } from "@/lib/utils";

type EventGuildLeaderboardProps = {
  eventSlug: string;
};

export default async function EventGuildLeaderboard({
  eventSlug,
}: EventGuildLeaderboardProps) {
  const { rankings = [] } = await getGuildLeaderboard(eventSlug);

  return (
    <section className="space-y-8 pt-4">
      <h3 className="text-xl font-bold">GvG Leaderboard</h3>
      <section className="space-y-4">
        {rankings.map((ranking) => {
          const style = RANK_STYLES[ranking.rank];

          return (
            <div
              key={ranking.guild_num}
              className={cn(
                "relative flex items-center gap-6 lg:gap-10 px-4 sm:px-6 lg:px-8 py-3 max-lg:py-6 max-lg:flex-col overflow-hidden shape-main w-full max-lg:divide-y max-lg:divide-gray-800 max-lg:gap-6",
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
                <ReadOnlyField
                  className="**:data-[slot=read-only-value]:text-lg **:data-[slot=read-only-value]:font-semibold text-left"
                  label="Guild"
                >
                  {ranking.guild_name}
                </ReadOnlyField>
              </section>
              <section className="flex gap-6 sm:gap-8 lg:gap-10 flex-wrap justify-center">
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
                  className="**:data-[slot=read-only-value]:text-2xl **:data-[slot=read-only-value]:font-semibold **:data-[slot=read-only-value]:tabular-nums text-center"
                  label="Tower Points"
                >
                  {ranking.tower_points}
                </ReadOnlyField>
                <ReadOnlyField
                  className="**:data-[slot=read-only-value]:text-2xl **:data-[slot=read-only-value]:font-semibold **:data-[slot=read-only-value]:tabular-nums text-center"
                  label="Penalties"
                >
                  {ranking.deduction}
                </ReadOnlyField>
                <ReadOnlyField
                  className={cn(
                    "**:data-[slot=read-only-value]:text-2xl **:data-[slot=read-only-value]:font-semibold **:data-[slot=read-only-value]:tabular-nums text-center",
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
    </section>
  );
}
