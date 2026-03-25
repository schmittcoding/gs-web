/* eslint-disable @next/next/no-img-element */
"use client";

import { getKothLeaderboard } from "@/app/(dashboard)/events/actions";
import type { DataGridColumn } from "@/components/ui/data-grid";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CLASSES } from "@/lib/events/constants";
import { cn } from "@/lib/utils";
import type { KothRanking } from "@/types/event";
import { useCallback, useEffect, useState, useTransition } from "react";
import { getSchoolAbbr } from "../rankings/types.rankings";
import { RANK_STYLES } from "./constants.events";
import EventsLeaderboardTable from "./leaderboard-table.events";

type KothLeaderboardTableProps = {
  eventId: string;
};

export function KothLeaderboardTable({ eventId }: KothLeaderboardTableProps) {
  const [activeClass, setActiveClass] = useState(CLASSES[0].chaClass);
  const [rankings, setRankings] = useState<KothRanking[]>([]);
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [isPending, startTransition] = useTransition();

  const fetchClassData = useCallback(
    (chaClass: number, page = 1) => {
      startTransition(async () => {
        const res = await getKothLeaderboard(eventId, chaClass, page, 20);

        if (res.success) {
          setRankings(res.rankings);
          setTotalItems(res.pagination.total_items);
          setPage(res.pagination.page);
        }
      });
    },
    [eventId],
  );

  function handleTabChange(value: string) {
    const chaClass = Number(value);
    setActiveClass(chaClass);
  }

  function handlePageChange(chaClass: number, newPage: number) {
    fetchClassData(chaClass, newPage);
  }

  useEffect(() => {
    fetchClassData(activeClass, 1);
  }, [activeClass, fetchClassData]);

  const columns: DataGridColumn<KothRanking>[] = [
    {
      key: "rank",
      header: "#",
      headerClassName: "w-20 text-center",
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
      key: "name",
      header: "Name",
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
            <span className="font-bold">{row.cha_name}</span>
          </section>
        );
      },
    },
    {
      key: "cha_guild",
      header: "Guild",
      headerClassName: "w-[250px] hidden sm:table-cell",
      cellClassName: "hidden sm:table-cell",
      render: (row) => row.guild_name ?? "-",
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
      render: (row) => {
        const score = row.total_kills - row.total_deaths - row.deduction;
        return <span data-negative={score < 0}>{score}</span>;
      },
    },
  ];

  return (
    <Tabs
      onValueChange={handleTabChange}
      defaultValue={CLASSES[0].chaClass.toString()}
    >
      <TabsList className="flex-wrap">
        {CLASSES.map((cls) => (
          <TabsTrigger key={cls.chaClass} value={String(cls.chaClass)}>
            {cls.name}
          </TabsTrigger>
        ))}
      </TabsList>

      {CLASSES.map((cls) => (
        <TabsContent key={cls.chaClass} value={String(cls.chaClass)}>
          <EventsLeaderboardTable
            columns={columns}
            data={rankings ?? []}
            rowKey={(row) => row.cha_num}
            loading={isPending && activeClass === cls.chaClass}
            emptyMessage={`No ${cls.name} rankings available yet`}
            pagination={{
              page,
              totalPages: Math.ceil(totalItems / 10),
              onPageChange: (p) => handlePageChange(cls.chaClass, p),
              disabled: isPending,
            }}
          />
        </TabsContent>
      ))}
    </Tabs>
  );
}
