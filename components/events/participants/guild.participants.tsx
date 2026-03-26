/* eslint-disable @next/next/no-img-element */
"use client";

import {
  getGuildParticipants,
  GuildParticipant,
} from "@/app/(dashboard)/events/actions";
import EventsLeaderboardTable from "@/components/events/leaderboard-table.events";
import { getSchoolAbbr } from "@/components/rankings/types.rankings";
import { DataGridColumn } from "@/components/ui/data-grid";
import { useCallback, useEffect, useState, useTransition } from "react";

type GuildParticipantsTabProps = {
  eventId: string;
};

export const columns: DataGridColumn<GuildParticipant>[] = [
  {
    key: "guild_name",
    header: "Guild Name",
    headerClassName: "w-[250px]",
    render: (row) => {
      const schoolAbrr = getSchoolAbbr(row.cha_school);

      return (
        <section className="flex gap-1 items-center">
          <img
            className="size-7"
            alt={`Ran Online GS | ${schoolAbrr}`}
            src={`https://images.ranonlinegs.com/assets/campus/${schoolAbrr}.png`}
          />
          <span className="font-bold">{row.guild_name}</span>
        </section>
      );
    },
  },
  {
    key: "gvg_count",
    header: "GVG Count",
    headerClassName: "text-center w-20",
    cellClassName: "text-center tabular-nums",
    render: (row) => row.gvg_count.toLocaleString(),
  },
  {
    key: "koth_count",
    header: "KOTH Count",
    headerClassName: "text-center w-20",
    cellClassName: "text-center tabular-nums",
    render: (row) => row.koth_count.toLocaleString(),
  },
  {
    key: "member_count",
    header: "Total Members",
    headerClassName: "text-center w-20",
    cellClassName: "text-center tabular-nums",
    render: (row) => row.member_count.toLocaleString(),
  },
];

export function GuildParticipantsTab({ eventId }: GuildParticipantsTabProps) {
  const [data, setData] = useState<GuildParticipant[]>([]);
  const [isPending, startTransition] = useTransition();

  const fetchRankings = useCallback(() => {
    startTransition(async () => {
      const res = await getGuildParticipants(eventId);

      if (res.success) {
        setData(res.participants);
      }
    });
  }, [eventId]);

  useEffect(() => {
    fetchRankings();
  }, [fetchRankings]);

  return (
    <EventsLeaderboardTable
      columns={columns}
      data={data ?? []}
      rowKey={(row) => row.guild_num}
      loading={isPending}
      emptyMessage="No guild rankings available yet"
    />
  );
}
