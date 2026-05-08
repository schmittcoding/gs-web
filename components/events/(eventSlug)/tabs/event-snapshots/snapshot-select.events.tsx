"use client";

import { useSnapshot } from "@/components/events/(eventSlug)/tabs/event-snapshots/snapshot-context.events";
import {
  GameSelect,
  GameSelectContent,
  GameSelectItem,
  GameSelectTrigger,
} from "@/components/ui/game.select";
import ReadOnlyField from "@/components/ui/input/read-only";
import { formatShortDate, formatShortTime } from "@/lib/formatters";
import { useMemo } from "react";

export function SnapshotSelect() {
  const { snapshots, selectedSnapshotId, setSelectedSnapshotId } =
    useSnapshot();

  const selected = useMemo(
    () => snapshots.find((s) => s.snapshot_id === selectedSnapshotId),
    [selectedSnapshotId, snapshots],
  );

  return (
    <GameSelect value={selectedSnapshotId} onValueChange={setSelectedSnapshotId}>
      <GameSelectTrigger className="relative w-full items-start whitespace-normal px-5 py-3">
        <section className="space-y-2" key={selected?.snapshot_id}>
          <p>{selected?.label}</p>
          {selected?.match_schedule && (
            <section className="grid grid-cols-3">
              <ReadOnlyField
                className="tabular-nums"
                label="Event Date"
                size="sm"
              >
                {formatShortDate(selected.match_schedule.event_date as string)}
              </ReadOnlyField>
              <ReadOnlyField label="Event Time" size="sm">
                {`${formatShortTime(selected.match_schedule.start_time)} - ${formatShortTime(selected.match_schedule.end_time)}`}
              </ReadOnlyField>
              <ReadOnlyField
                className="tabular-nums"
                label="Total Kills"
                size="sm"
              >
                {selected.match_schedule.total_kills}
              </ReadOnlyField>
            </section>
          )}
        </section>
      </GameSelectTrigger>

      <GameSelectContent>
        {snapshots.map((snapshot) => (
          <GameSelectItem
            key={snapshot.snapshot_id}
            value={snapshot.snapshot_id}
            className="space-y-2"
          >
            <p>{snapshot.label}</p>
            {snapshot?.match_schedule && (
              <section className="grid grid-cols-3 gap-4">
                <ReadOnlyField
                  className="tabular-nums"
                  label="Event Date"
                  size="sm"
                >
                  {formatShortDate(
                    snapshot.match_schedule.event_date as string,
                  )}
                </ReadOnlyField>
                <ReadOnlyField label="Event Time" size="sm">
                  {`${formatShortTime(snapshot.match_schedule.start_time)} - ${formatShortTime(snapshot.match_schedule.end_time)}`}
                </ReadOnlyField>
                <ReadOnlyField
                  className="tabular-nums"
                  label="Total Kills"
                  size="sm"
                >
                  {snapshot.match_schedule.total_kills}
                </ReadOnlyField>
              </section>
            )}
          </GameSelectItem>
        ))}
      </GameSelectContent>
    </GameSelect>
  );
}
