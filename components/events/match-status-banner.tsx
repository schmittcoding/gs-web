"use client";

import { useMatchStatus } from "@/components/events/hooks/use-match-status";
import { cn } from "@/lib/utils";
import { IconLoader2, IconSwords } from "@tabler/icons-react";

type MatchStatusBannerProps = {
  eventId: string;
};

export function MatchStatusBanner({ eventId }: MatchStatusBannerProps) {
  const { status, displayStatus, isLoading } = useMatchStatus({
    eventId,
    enabled: !!eventId,
  });

  if (isLoading || !status || !displayStatus || displayStatus === "IDLE") {
    return null;
  }

  const match = status.currentMatch;
  if (!match) return null;

  return (
    <div
      role="alert"
      className={cn(
        "flex items-center gap-3 rounded-sm px-4 py-3 text-sm font-medium",
        displayStatus === "LIVE" &&
          "bg-amber-500/10 border border-amber-500/30 text-amber-400",
        displayStatus === "TALLYING_SOON" &&
          "bg-blue-500/10 border border-blue-500/30 text-blue-400",
        displayStatus === "TALLYING_NOW" &&
          "bg-primary/10 border border-primary/30 text-primary",
      )}
    >
      {displayStatus === "LIVE" && <IconSwords className="size-5 shrink-0" />}
      {displayStatus === "TALLYING_NOW" && (
        <IconLoader2 className="size-5 shrink-0 animate-spin" />
      )}
      <span>{match.message}</span>
    </div>
  );
}
