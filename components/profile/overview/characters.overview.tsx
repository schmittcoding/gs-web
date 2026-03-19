/* eslint-disable @next/next/no-img-element */
"use client";

import { getCharacters } from "@/app/(dashboard)/profile/actions";
import {
  getClassName,
  getSchoolColor,
  getSchoolName,
} from "@/components/rankings/types.rankings";
import { DataGrid, type DataGridColumn } from "@/components/ui/data-grid";
import { cn } from "@/lib/utils";
import { IconUsers } from "@tabler/icons-react";
import { useCallback, useState, useTransition } from "react";
import {
  type CharacterInfo,
  type CharactersResponse,
} from "./types.characters";

const ITEMS_PER_PAGE = 10;

const columns: DataGridColumn<CharacterInfo>[] = [
  {
    key: "name",
    header: "Character",
    render: (row) => (
      <div className="flex items-center gap-2">
        <img
          className="size-6.25 md:hidden"
          alt={`Ran Online GS | ${getSchoolName(row.cha_school)}`}
          src={`https://images.ranonlinegs.com/assets/campus/${getSchoolName(row.cha_school)}.png`}
        />
        <img
          className="size-6.25 rounded-full"
          alt={`Ran Online GS | ${getClassName(row.cha_class)}`}
          src={`https://images.ranonlinegs.com/assets/emblems/${getClassName(row.cha_class).toLowerCase()}.webp`}
        />
        <span className="text-sm font-semibold truncate text-foreground max-w-40">
          {row.cha_name}
        </span>
      </div>
    ),
  },
  {
    key: "class",
    header: "Class",
    headerClassName: "hidden sm:table-cell",
    cellClassName: "hidden sm:table-cell",
    render: (row) => (
      <span className="text-sm">{getClassName(row.cha_class)}</span>
    ),
  },
  {
    key: "school",
    header: "School",
    headerClassName: "hidden md:table-cell",
    cellClassName: "hidden md:table-cell",
    render: (row) => (
      <div className="flex items-center gap-1.5">
        <img
          className="size-5"
          alt={`Ran Online GS | ${getSchoolName(row.cha_school)}`}
          src={`https://images.ranonlinegs.com/assets/campus/${getSchoolName(row.cha_school)}.png`}
        />
        <span
          className={cn(
            "text-sm font-medium uppercase",
            getSchoolColor(row.cha_school),
          )}
        >
          {getSchoolName(row.cha_school)}
        </span>
      </div>
    ),
  },
  {
    key: "level",
    header: "Level",
    headerClassName: "text-center",
    cellClassName: "text-center",
    render: (row) => (
      <span className="text-sm font-medium tabular-nums">{row.cha_level}</span>
    ),
  },
  {
    key: "money",
    header: "Gold",
    headerClassName: "text-right hidden lg:table-cell",
    cellClassName: "text-right hidden lg:table-cell",
    render: (row) => (
      <span className="text-sm font-bold text-yellow-400 tabular-nums">
        {row.cha_money.toLocaleString()}
      </span>
    ),
  },
  {
    key: "status",
    header: "Status",
    headerClassName: "text-center",
    cellClassName: "text-center",
    render: (row) => (
      <span
        className={cn(
          "inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full",
          row.cha_online === 1
            ? "bg-green-500/10 text-green-400"
            : "bg-gray-500/10 text-gray-400",
        )}
      >
        {row.cha_online === 1 ? "Online" : "Offline"}
      </span>
    ),
  },
];

type ProfileCharactersProps = {
  initialData: CharactersResponse;
};

function ProfileCharacters({ initialData }: ProfileCharactersProps) {
  const [data, setData] = useState<CharacterInfo[]>(initialData.data);
  const [page, setPage] = useState(initialData.page);
  const [totalPages, setTotalPages] = useState(initialData.total_pages);
  const [isPending, startTransition] = useTransition();

  const fetchData = useCallback((newPage: number) => {
    setPage(newPage);
    startTransition(async () => {
      const result = await getCharacters(newPage, ITEMS_PER_PAGE);
      setData(result.data);
      setTotalPages(result.total_pages);
    });
  }, []);

  return (
    <DataGrid
      columns={columns}
      data={data}
      rowKey={(row) => row.cha_num}
      icon={<IconUsers className="size-4 text-primary" />}
      title="Characters"
      loading={isPending}
      emptyMessage="No characters found"
      pagination={{
        page,
        totalPages,
        onPageChange: fetchData,
        disabled: isPending,
      }}
    />
  );
}

export { ProfileCharacters };
