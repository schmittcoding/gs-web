/* eslint-disable @next/next/no-img-element */
import { getCapRaceLeaderboard } from "@/app/(dashboard)/events/[eventSlug]/actions";
import { RANK_STYLES } from "@/components/events/constants.events";
import { getSchoolAbbr } from "@/components/rankings/types.rankings";
import ReadOnlyField from "@/components/ui/input/read-only";
import { getEventClassName, OVERALL_CLASS_MAP } from "@/lib/events/constants";
import { formatFullDate } from "@/lib/formatters";
import { cn } from "@/lib/utils";
import Link from "next/link";

type EventCapRaceLeaderboard = {
  eventSlug: string;
  activeClass: string;
};

export default async function EventCapRaceLeaderboard({
  eventSlug,
  activeClass = "",
}: EventCapRaceLeaderboard) {
  const { rankings = [] } = await getCapRaceLeaderboard(eventSlug, activeClass);

  return (
    <section className="space-y-8 pt-4">
      <h3 className="text-xl font-bold">Cap Race Leaderboard</h3>
      <section className="space-y-4 divide-y divide-gray-800">
        <nav className="flex flex-wrap gap-2 pb-4">
          {Object.entries(OVERALL_CLASS_MAP).map(([key, name]) => {
            const chaClass = Number(key);
            const fullHref =
              chaClass === 0
                ? `/events/${eventSlug}`
                : `/events/${eventSlug}?class=${name.toLowerCase()}`;
            const isActive =
              (chaClass === 0 && !activeClass) ||
              activeClass.toLowerCase() === name.toLowerCase();

            return (
              <Link
                key={chaClass}
                href={fullHref}
                className={cn(
                  "relative inline-flex items-center gap-2 py-2 px-6 text-sm cursor-pointer outline-none whitespace-nowrap shape-main transition-colors duration-300",
                  isActive
                    ? "bg-accent text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent/90 hover:text-primary-foreground",
                )}
              >
                {name}
              </Link>
            );
          })}
        </nav>
        <section className="space-y-4">
          {rankings.map((ranking) => {
            const style = RANK_STYLES[ranking.rank];
            const schoolAbrr = getSchoolAbbr(ranking.cha_school as number);
            const clsName = getEventClassName(ranking.cha_class);

            return (
              <div
                key={ranking.cha_num}
                className={cn(
                  "relative flex items-center gap-6 lg:gap-10 px-4 sm:px-6 lg:px-8 py-3 max-lg:py-6 max-lg:flex-col overflow-hidden shape-main w-full max-lg:divide-y max-lg:divide-gray-800 max-lg:gap-6",
                  style
                    ? `bg-linear-to-r ${style.bg} to-transparent`
                    : "bg-gray-900/40",
                )}
              >
                <section className="flex flex-1 w-full max-lg:pb-4 items-center max-lg:justify-center text-center gap-4 sm:gap-6 lg:gap-10">
                  <section className="flex items-center justify-center text-center gap-2 w-max xl:w-20">
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
                        style ? style.color : "text-xl",
                      )}
                    >
                      {ranking.rank}
                    </span>
                  </section>
                  <section className="flex gap-2 items-center xl:w-80">
                    <img
                      className="size-10"
                      alt={`Ran Online GS | ${schoolAbrr}`}
                      src={`https://images.ranonlinegs.com/assets/campus/${schoolAbrr}.png`}
                    />
                    <ReadOnlyField
                      className="**:data-[slot=read-only-value]:text-lg **:data-[slot=read-only-value]:font-semibold text-left"
                      label="Name"
                    >
                      {ranking.cha_name}
                    </ReadOnlyField>
                  </section>
                  <section className="flex gap-2 items-center xl:w-80">
                    <img
                      className="size-9 rounded-full mr-2"
                      alt={clsName}
                      src={`https://images.ranonlinegs.com/assets/emblems/${clsName.toLowerCase()}.webp`}
                    />
                    <ReadOnlyField
                      className="**:data-[slot=read-only-value]:text-lg **:data-[slot=read-only-value]:font-semibold text-left"
                      label="Class"
                    >
                      {clsName}
                    </ReadOnlyField>
                  </section>
                </section>
                <section className="flex gap-6 sm:gap-8 lg:gap-14 flex-wrap justify-center">
                  <ReadOnlyField
                    className="**:data-[slot=read-only-value]:text-2xl **:data-[slot=read-only-value]:font-semibold **:data-[slot=read-only-value]:tabular-nums text-center"
                    label="Last Level Date"
                  >
                    {ranking.level_up_date
                      ? formatFullDate(ranking.level_up_date)
                      : "-"}
                  </ReadOnlyField>
                  <ReadOnlyField
                    className="**:data-[slot=read-only-value]:text-2xl **:data-[slot=read-only-value]:font-semibold **:data-[slot=read-only-value]:tabular-nums text-center"
                    label="Level"
                  >
                    {ranking.current_level}
                  </ReadOnlyField>
                </section>
              </div>
            );
          })}
        </section>
      </section>
    </section>
  );
}
