"use client";

import { cn } from "@/lib/utils";
import { IconLoader2 } from "@tabler/icons-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

type DataGridColumn<T> = {
  key: string;
  header: React.ReactNode;
  headerClassName?: string;
  cellClassName?: string;
  render: (row: T) => React.ReactNode;
};

type DataGridPagination = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
};

type EventsLeaderboardTableProps<T> = {
  columns: DataGridColumn<T>[];
  data: T[];
  rowKey: (row: T) => string | number;
  icon?: React.ReactNode;
  title?: React.ReactNode;
  loading?: boolean;
  pagination?: DataGridPagination;
  emptyMessage?: string;
  className?: string;
  onRowClick?: (row: T) => void;
};

export default function EventsLeaderboardTable<T>({
  columns,
  data,
  rowKey,
  loading = false,
  emptyMessage = "No data found",
}: EventsLeaderboardTableProps<T>) {
  return (
    <Table className="border-separate border-spacing-y-2!">
      <TableHeader className="[&_tr]:border-none! bg-transparent [&_tr]:pb-2">
        <TableRow>
          {columns.map((col) => (
            <TableHead
              key={col.key}
              className={cn("h-12", col.headerClassName)}
            >
              {col.header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading ? (
          <TableRow>
            <TableCell className="h-80" colSpan={columns.length}>
              <IconLoader2 className="animate-spin m-auto" />
            </TableCell>
          </TableRow>
        ) : data.length > 0 ? (
          data.map((row) => (
            <TableRow
              className="rounded-2xl [&_td]:bg-gray-900"
              key={rowKey(row)}
            >
              {columns.map((col) => (
                <TableCell
                  key={col.key}
                  className={cn("h-12 leaderboard-cell", col.cellClassName)}
                >
                  {col.render(row)}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell className="h-40 text-center" colSpan={columns.length}>
              <span className="text-gray-400">{emptyMessage}</span>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
