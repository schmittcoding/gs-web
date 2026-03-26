/* eslint-disable @next/next/no-img-element */
"use client";

import {
  getKothParticipants,
  KothParticipant,
} from "@/app/(dashboard)/events/actions";
import EventsLeaderboardTable from "@/components/events/leaderboard-table.events";
import { getSchoolAbbr } from "@/components/rankings/types.rankings";
import { DataGridColumn } from "@/components/ui/data-grid";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CLASSES } from "@/lib/events/constants";
import { useCallback, useEffect, useState, useTransition } from "react";

type KothParticipantsTabProps = {
  eventId: string;
};

export const columns: DataGridColumn<KothParticipant>[] = [
  {
    key: "cha_name",
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
    key: "guild_name",
    header: "Guild Name",
    headerClassName: "w-[250px]",
    render: (row) => row.guild_name ?? "-",
  },
  {
    key: "join_gvg",
    header: "Joined GVG?",
    headerClassName: "text-center w-20",
    cellClassName: "text-center",
    render: (row) => (row.join_gvg ? "Yes" : "No"),
  },
  {
    key: "join_koth",
    header: "Joined KOTH?",
    headerClassName: "text-center w-20",
    cellClassName: "text-center",
    render: (row) => (row.join_koth ? "Yes" : "No"),
  },
];

export function KothParticipantsTab({ eventId }: KothParticipantsTabProps) {
  const [activeClass, setActiveClass] = useState(CLASSES[0].chaClass);
  const [data, setData] = useState<KothParticipant[]>([]);
  const [isPending, startTransition] = useTransition();

  const fetchRankings = useCallback(() => {
    startTransition(async () => {
      const res = await getKothParticipants(eventId, activeClass);

      if (res.success) {
        setData(res.participants);
      }
    });
  }, [activeClass, eventId]);

  useEffect(() => {
    fetchRankings();
  }, [fetchRankings]);

  function handleTabChange(value: string) {
    const chaClass = Number(value);
    setActiveClass(chaClass);
  }

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
            data={data ?? []}
            rowKey={(row) => row.cha_num}
            loading={isPending}
            emptyMessage="No guild rankings available yet"
          />
        </TabsContent>
      ))}
    </Tabs>
  );
}
