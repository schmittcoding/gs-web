"use client";

import type { EventSnapshotWithSchedule } from "@/types/event";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

export type SnapshotFilterType = "guild" | "koth";

type SnapshotContextProps = {
  snapshots: EventSnapshotWithSchedule[];
  selectedSnapshotId: string;
   
  setSelectedSnapshotId: (id: string) => void;
  filterType: SnapshotFilterType;
   
  setFilterType: (type: SnapshotFilterType) => void;
  selectedClass: number | null;
   
  setSelectedClass: (classId: number | null) => void;
};

const SnapshotContext = createContext<SnapshotContextProps | null>(null);

type EventSnapshotProviderProps = PropsWithChildren<{
  snapshots: EventSnapshotWithSchedule[];
  initialFilterType?: SnapshotFilterType;
}>;

export function EventSnapshotProvider({
  children,
  snapshots,
  initialFilterType = "guild",
}: EventSnapshotProviderProps) {
  const [selectedSnapshotId, setSelectedSnapshotId] = useState<string>(
    snapshots[0]?.snapshot_id ?? "",
  );
  const [filterType, setFilterTypeState] =
    useState<SnapshotFilterType>(initialFilterType);
  const [selectedClass, setSelectedClassState] = useState<number | null>(1);

  const setFilterType = useCallback((type: SnapshotFilterType) => {
    setFilterTypeState(type);
    if (type === "guild") setSelectedClassState(1);
  }, []);

  const setSelectedClass = useCallback((classId: number | null) => {
    setSelectedClassState(classId);
  }, []);

  const value = useMemo<SnapshotContextProps>(
    () => ({
      snapshots,
      selectedSnapshotId,
      setSelectedSnapshotId,
      filterType,
      setFilterType,
      selectedClass,
      setSelectedClass,
    }),
    [
      snapshots,
      selectedSnapshotId,
      filterType,
      setFilterType,
      selectedClass,
      setSelectedClass,
    ],
  );

  return (
    <SnapshotContext.Provider value={value}>
      {children}
    </SnapshotContext.Provider>
  );
}

export function useSnapshot(): SnapshotContextProps {
  const ctx = useContext(SnapshotContext);
  if (!ctx) {
    throw new Error(
      "useSnapshot() must be used within an EventSnapshotProvider.",
    );
  }
  return ctx;
}
