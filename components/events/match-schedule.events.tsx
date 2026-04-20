/* eslint-disable @next/next/no-img-element */
import { formatShortDate, formatShortTime } from "@/lib/formatters";
import { cn } from "@/lib/utils";
import { EventMatchData } from "@/types/event";
import { getSchoolAbbr } from "../rankings/types.rankings";
import { GIMMICK_LABELS } from "./constants.events";

type MatchScheduleEventsProps = {
  match: EventMatchData;
};

export default function MatchScheduleEvents({
  match,
}: MatchScheduleEventsProps) {
  const renderTowerPoints = (label: string, points: number) => {
    return (
      <p className="space-y-1 flex flex-col items-center text-center w-15 text-2xl font-black tabular-nums">
        {points}
        <span className="text-sm font-semibold uppercase tracking-widest text-gray-500">
          {label}
        </span>
      </p>
    );
  };

  const renderTowerWinners = (
    label: string,
    points: number,
    winner: number | null,
  ) => {
    if (winner === null) return null;

    return (
      <p className="space-y-1 flex flex-col items-center text-center w-25 text-xl">
        <img
          className="size-10"
          alt={getSchoolAbbr(winner)}
          src={`https://images.ranonlinegs.com/assets/campus/${getSchoolAbbr(winner)}.png`}
        />
        <span className="text-sm font-semibold uppercase tracking-widest text-gray-500">
          {`${label} (${points})`}
        </span>
      </p>
    );
  };

  return (
    <div
      key={match.match_id}
      className={cn(
        "group/row relative rounded-sm overflow-hidden p-6 space-y-4 ran-diagmonds shape-main border border-gray-800",
      )}
    >
      <section className="flex gap-4 justify-center mb-8">
        {match.tally_status === "Completed" ? (
          <div className="flex gap-2 divide-x divide-gray-700">
            {renderTowerWinners(
              "TH",
              match.tower_points_th ?? 0,
              match.tower_winner_th,
            )}
            {renderTowerWinners(
              "FACI",
              match.tower_points_faci ?? 0,
              match.tower_winner_faci,
            )}
            {renderTowerWinners(
              "NUC",
              match.tower_points_nuc ?? 0,
              match.tower_winner_nuc,
            )}
          </div>
        ) : (
          <div className="flex gap-2 divide-x divide-gray-700 [&>p]:not-last:pr-2">
            {renderTowerPoints("TH", match.tower_points_th ?? 0)}
            {renderTowerPoints("FACI", match.tower_points_faci ?? 0)}
            {renderTowerPoints("NUC", match.tower_points_nuc ?? 0)}
          </div>
        )}

        {/* {match.tally_status === "Completed" && (
          <div className="space-y-1">
            <div className="flex gap-2 divide-x divide-gray-700 [&>p]:not-last:pr-2">
              {renderTowerWinners("TH", match.tower_winner_th ?? null)}
              {renderTowerWinners("FACI", match.tower_winner_faci ?? null)}
              {renderTowerWinners("NUC", match.tower_winner_nuc ?? null)}
            </div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
              Tower Winners
            </p>
          </div>
        )} */}
      </section>
      <section className="flex justify-between gap-4">
        <div className="space-y-1">
          {match.match_label}
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
            Match
          </p>
        </div>
        <div className="space-y-1">
          {formatShortDate(match.match_date)}
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
            Match Date
          </p>
        </div>
        <div className="space-y-1">
          {formatShortTime(match.start_time)}
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
            Server Time
          </p>
        </div>
        <div className="space-y-1">
          <span
            className={cn(
              "font-black leading-none",
              "data-[status=Pending]:text-gray-500",
              "data-[status=Processing]:text-gray-300",
              "data-[status=Completed]:text-accent/80",
            )}
            data-status={match.tally_status}
          >
            {match.tally_status}
          </span>
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 text-right">
            Status
          </p>
        </div>
      </section>
      {match.gimmicks.length > 0 && (
        <section className="bg-gray-800 py-4 px-8 rounded-md space-y-4">
          {match.gimmicks.map(
            ({
              gimmick_id,
              gimmick_type,
              gimmick_start_time,
              gimmick_end_time,
            }) => (
              <section key={gimmick_id} className="flex justify-between gap-4">
                <div className="space-y-1">
                  {GIMMICK_LABELS[gimmick_type]}
                  <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                    Event Modifier
                  </p>
                </div>
                <div className="space-y-1">
                  {formatShortTime(gimmick_start_time)}
                  <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                    Start Time
                  </p>
                </div>
                <div className="space-y-1">
                  {formatShortTime(gimmick_end_time)}
                  <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                    End Time
                  </p>
                </div>
              </section>
            ),
          )}
        </section>
      )}
    </div>
  );
}
