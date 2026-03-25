/* eslint-disable @next/next/no-img-element */
"use client";

import { getGuildLeaderboard } from "@/app/(dashboard)/events/actions";
import type { DataGridColumn } from "@/components/ui/data-grid";
import { cn } from "@/lib/utils";
import type { GuildRanking } from "@/types/event";
import { useCallback, useEffect, useState, useTransition } from "react";
import { RANK_STYLES } from "./constants.events";
import EventsLeaderboardTable from "./leaderboard-table.events";

type GuildLeaderboardTableProps = {
  eventId: string;
};

export function GuildLeaderboardTable({ eventId }: GuildLeaderboardTableProps) {
  const [rankings, setRankings] = useState<GuildRanking[]>([]);
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [isPending, startTransition] = useTransition();

  const fetchRankings = useCallback(
    (page = 1) => {
      startTransition(async () => {
        const res = await getGuildLeaderboard(eventId, page, 10);

        if (res.success) {
          setRankings(res.rankings);
          setTotalItems(res.pagination.total_items);
          setPage(res.pagination.page);
        }
      });
    },
    [eventId],
  );

  function handlePageChange(newPage: number) {
    fetchRankings(newPage);
  }

  useEffect(() => {
    fetchRankings(1);
  }, [fetchRankings]);

  const columns: DataGridColumn<GuildRanking>[] = [
    {
      key: "rank",
      header: "#",
      headerClassName: "w-10 text-center",
      render: (row) => {
        const style = RANK_STYLES[row.rank];
        return (
          <section className="flex items-center justify-center text-center gap-1">
            {style && style.badge && (
              <img
                className="size-7"
                src={`https://images.ranonlinegs.com/assets/badges/${style.badge}.webp`}
                alt={`Ran Online | Events | Rank ${row.rank}`}
              />
            )}
            <span
              className={cn(
                "font-black text-gray-500 tabular-nums",
                style && style.color,
              )}
            >
              {row.rank}
            </span>
          </section>
        );
      },
    },
    {
      key: "guild_name",
      header: "Guild",
      headerClassName: "w-[250px]",
      cellClassName: "font-bold",
      render: (row) => row.guild_name,
    },
    {
      key: "kills",
      header: "Kills",
      headerClassName: "text-center w-20",
      cellClassName: "text-center tabular-nums",
      render: (row) => row.total_kills.toLocaleString(),
    },
    {
      key: "deaths",
      header: "Deaths",
      headerClassName: "text-center w-20",
      cellClassName: "text-center tabular-nums",
      render: (row) => row.total_deaths.toLocaleString(),
    },
    {
      key: "tower_points",
      header: "Tower Points",
      headerClassName: "text-center w-20",
      cellClassName: "text-center tabular-nums",
      render: (row) => row.tower_points.toLocaleString(),
    },
    {
      key: "deduction",
      header: "Deductions",
      headerClassName: "text-center w-20",
      cellClassName: "text-center tabular-nums text-destructive",
      render: (row) => (row.deduction > 0 ? `-${row.deduction}` : "0"),
    },
    {
      key: "total_score",
      header: "Total Score",
      headerClassName: "text-center w-20",
      cellClassName: cn(
        "text-center tabular-nums **:data-[negative=true]:text-destructive",
      ),
      render: (row) => (
        <span data-negative={row.computed_score < 0}>{row.computed_score}</span>
      ),
    },
  ];

  return (
    <EventsLeaderboardTable
      columns={columns}
      data={rankings ?? []}
      rowKey={(row) => row.guild_num}
      loading={isPending}
      emptyMessage="No guild rankings available yet"
      pagination={{
        page,
        totalPages: Math.ceil(totalItems / 10),
        onPageChange: handlePageChange,
        disabled: isPending,
      }}
    />
  );
}
