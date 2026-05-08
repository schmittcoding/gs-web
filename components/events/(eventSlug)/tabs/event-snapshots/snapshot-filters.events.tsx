"use client";

import {
  SnapshotFilterType,
  useSnapshot,
} from "@/components/events/(eventSlug)/tabs/event-snapshots/snapshot-context.events";
import {
  GameSelect,
  GameSelectContent,
  GameSelectItem,
  GameSelectTrigger,
} from "@/components/ui/game.select";
import { CLASSES } from "@/lib/events/constants";

const ALL_CLASSES_VALUE = "__all__";

export function SnapshotFilters() {
  const { filterType, setFilterType, selectedClass, setSelectedClass } =
    useSnapshot();

  const selectedClassName =
    CLASSES.find((c) => c.chaClass === selectedClass)?.name ?? "All Classes";

  return (
    <div className="flex flex-wrap gap-4">
      <div className="space-y-1.5 flex-1 max-w-1/2">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-500">
          Filter Type
        </p>
        <GameSelect
          compact
          value={filterType}
          onValueChange={(v) => setFilterType(v as SnapshotFilterType)}
        >
          <GameSelectTrigger className="w-full h-9 items-center">
            <span className="text-sm">
              {filterType === "guild" ? "Guild" : "KOTH"}
            </span>
          </GameSelectTrigger>
          <GameSelectContent className="w-40">
            <GameSelectItem value="guild" className="px-4 py-2.5 text-sm">
              Guild
            </GameSelectItem>
            <GameSelectItem value="koth" className="px-4 py-2.5 text-sm">
              KOTH
            </GameSelectItem>
          </GameSelectContent>
        </GameSelect>
      </div>

      {filterType === "koth" && (
        <div className="space-y-1.5 flex-1">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-500">
            Class
          </p>
          <GameSelect
            compact
            value={selectedClass?.toString() ?? ALL_CLASSES_VALUE}
            onValueChange={(v) =>
              setSelectedClass(v === ALL_CLASSES_VALUE ? null : Number(v))
            }
          >
            <GameSelectTrigger className="w-full h-9 items-center">
              <span className="text-sm">{selectedClassName}</span>
            </GameSelectTrigger>
            <GameSelectContent className="w-44">
              {CLASSES.map(({ chaClass, name }) => (
                <GameSelectItem
                  key={chaClass}
                  value={chaClass.toString()}
                  className="px-4 py-2.5 text-sm"
                >
                  {name}
                </GameSelectItem>
              ))}
            </GameSelectContent>
          </GameSelect>
        </div>
      )}
    </div>
  );
}
