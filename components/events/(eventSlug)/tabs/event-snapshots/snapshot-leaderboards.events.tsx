"use client";

import { useSnapshot } from "./snapshot-context.events";
import EventGuildSnapshot from "./snapshot-guild.events";
import EventClassSnapshot from "./snapshot-koth.events";

export default function EventSnapshotLeaderboards() {
  const { filterType } = useSnapshot();

  if (filterType === "guild") {
    return <EventGuildSnapshot />;
  }

  return <EventClassSnapshot />;
}
