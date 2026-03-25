"use client";

import {
  MATCH_STATUS_FAST_POLL_INTERVAL,
  MATCH_STATUS_POLL_INTERVAL,
} from "@/lib/events/constants";
import type { DisplayStatus, MatchStatus } from "@/types/event";
import { useCallback, useEffect, useRef, useState } from "react";

type UseMatchStatusOptions = {
  eventId: string;
  enabled?: boolean;
};

type UseMatchStatusReturn = {
  status: MatchStatus | null;
  displayStatus: DisplayStatus | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
};

export function useMatchStatus({
  eventId,
  enabled = true,
}: UseMatchStatusOptions): UseMatchStatusReturn {
  const [status, setStatus] = useState<MatchStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const previousStatusRef = useRef<DisplayStatus | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchStatus = useCallback(async () => {
    try {
      const res = await fetch(`/api/events/${eventId}/match/status`);

      if (!res.ok) {
        setError(`Failed to fetch match status: ${res.status}`);
        return;
      }

      const data: MatchStatus = await res.json();
      const previousDisplayStatus = previousStatusRef.current;
      const currentDisplayStatus =
        data.currentMatch?.displayStatus ?? "IDLE";

      // Detect TALLYING_NOW → IDLE transition for "Updated!" notification
      if (
        previousDisplayStatus === "TALLYING_NOW" &&
        currentDisplayStatus === "IDLE"
      ) {
        window.dispatchEvent(new CustomEvent("leaderboard:updated"));
      }

      previousStatusRef.current = currentDisplayStatus;
      setStatus(data);
      setError(null);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch match status",
      );
    } finally {
      setIsLoading(false);
    }
  }, [eventId]);

  useEffect(() => {
    if (!enabled || !eventId) return;

    fetchStatus();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [enabled, eventId, fetchStatus]);

  // Dynamic polling interval based on displayStatus
  useEffect(() => {
    if (!enabled || !eventId) return;

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    const displayStatus = status?.currentMatch?.displayStatus ?? "IDLE";
    const interval =
      displayStatus === "TALLYING_NOW"
        ? MATCH_STATUS_FAST_POLL_INTERVAL
        : MATCH_STATUS_POLL_INTERVAL;

    intervalRef.current = setInterval(fetchStatus, interval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [enabled, eventId, fetchStatus, status?.currentMatch?.displayStatus]);

  const displayStatus = status?.currentMatch?.displayStatus ?? null;

  return {
    status,
    displayStatus,
    isLoading,
    error,
    refetch: fetchStatus,
  };
}
