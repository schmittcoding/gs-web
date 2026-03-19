/* eslint-disable @next/next/no-img-element */
"use client";

import { getGoldRankings } from "@/app/(dashboard)/rankings/actions";
import { DataGrid, type DataGridColumn } from "@/components/ui/data-grid";
import { IconCoins, IconSearch, IconTrophy } from "@tabler/icons-react";
import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import { RankingsPodium } from "./podium.rankings";
import {
  getClassName,
  getSchoolName,
  type GoldRankingEntry,
  type GoldRankingsResponse,
} from "./types.rankings";

const ITEMS_PER_PAGE = process.env.NEXT_PUBLIC_DEFAULT_RANKINGS_LIMIT || 10;

const columns: DataGridColumn<GoldRankingEntry>[] = [
  {
    key: "rank",
    header: "#",
    headerClassName: "w-12 text-center",
    cellClassName: "text-center",
    render: (row) => (
      <span className="text-sm font-bold tabular-nums text-muted-foreground">
        #{row.rank_number}
      </span>
    ),
  },
  {
    key: "name",
    header: "Player",
    render: (row) => (
      <div className="flex items-center gap-1.5">
        <img
          className="size-6.25 rounded-full block lg:hidden"
          alt={`Ran Online GS | ${getClassName(row.cha_class)}`}
          src={`https://images.ranonlinegs.com/assets/emblems/${getClassName(row.cha_class).toLowerCase()}.webp`}
        />
        <img
          className="size-6.25"
          alt={`Ran Online GS | ${getSchoolName(row.cha_school)}`}
          src={`https://images.ranonlinegs.com/assets/campus/${getSchoolName(row.cha_school)}.png`}
        />
        <span className="font-semibold truncate text-foreground max-w-45">
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
      <div className="flex items-center gap-1.5">
        <img
          className="size-6.25 rounded-full"
          alt={`Ran Online GS | ${getClassName(row.cha_class)}`}
          src={`https://images.ranonlinegs.com/assets/emblems/${getClassName(row.cha_class).toLowerCase()}.webp`}
        />
        <span className="font-semibold truncate text-foreground max-w-45">
          {getClassName(row.cha_class)}
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
    key: "gold",
    header: "Gold",
    headerClassName: "text-right",
    cellClassName: "text-right",
    render: (row) => (
      <span className="text-sm font-bold text-yellow-400 tabular-nums">
        {row.cha_money.toLocaleString()}
      </span>
    ),
  },
];

type RankingsContentProps = {
  initialTopThree: GoldRankingsResponse;
  initialPage: GoldRankingsResponse;
};

function RankingsContent({
  initialTopThree,
  initialPage,
}: RankingsContentProps) {
  const [topThree] = useState<GoldRankingEntry[]>(initialTopThree.data);
  const [gridData, setGridData] = useState<GoldRankingEntry[]>(
    initialPage.data,
  );
  const [page, setPage] = useState(initialPage.page);
  const [totalPages, setTotalPages] = useState(initialPage.total_pages);
  const [totalItems, setTotalItems] = useState(initialPage.total_items);
  const [searchQuery, setSearchQuery] = useState("");
  const [isPending, startTransition] = useTransition();

  const searchRef = useRef(searchQuery);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(null);

  const fetchData = useCallback((newPage: number, search: string) => {
    setPage(newPage);
    startTransition(async () => {
      const result = await getGoldRankings(
        newPage,
        Number(ITEMS_PER_PAGE),
        search,
      );
      setGridData(result.data);
      setTotalPages(result.total_pages);
      setTotalItems(result.total_items);
    });
  }, []);

  const handlePageChange = useCallback(
    (newPage: number) => {
      fetchData(newPage, searchRef.current);
    },
    [fetchData],
  );

  const handleSearchChange = useCallback(
    (value: string) => {
      setSearchQuery(value);
      searchRef.current = value;

      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      debounceRef.current = setTimeout(() => {
        fetchData(1, value);
      }, 400);
    },
    [fetchData],
  );

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  return (
    <div className="flex flex-col gap-6 h-max">
      {/* Podium for top 3 */}
      <RankingsPodium entries={topThree} />

      {/* Search bar + stats */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <IconSearch className="absolute -translate-y-1/2 left-3 top-1/2 size-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search player..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full pr-3 text-sm transition-colors bg-gray-900 border border-gray-800 outline-none h-9 pl-9 shape-main placeholder:text-muted-foreground focus:border-primary/50"
          />
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <IconCoins className="size-3.5 text-yellow-400" />
          <span>{totalItems} players ranked</span>
        </div>
      </div>

      {/* DataGrid with server-side pagination */}
      <DataGrid
        columns={columns}
        data={gridData}
        rowKey={(row) => row.rank_number}
        icon={<IconTrophy className="size-4 text-primary" />}
        title="Gold Rankings"
        loading={isPending}
        emptyMessage="No players found"
        pagination={{
          page,
          totalPages,
          onPageChange: handlePageChange,
          disabled: isPending,
        }}
      />
    </div>
  );
}

export { RankingsContent };
