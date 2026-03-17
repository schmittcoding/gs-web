"use client";

import * as React from "react";

import GameButton from "@/components/common/game.button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import {
  IconChevronLeft,
  IconChevronRight,
  IconLoader2,
} from "@tabler/icons-react";

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

type DataGridProps<T> = {
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

function DataGrid<T>({
  columns,
  data,
  rowKey,
  icon,
  title,
  loading = false,
  pagination,
  emptyMessage = "No data found",
  className,
  onRowClick,
}: DataGridProps<T>) {
  return (
    <Card className={cn("h-full max-w-full overflow-hidden", className)}>
      {title && (
        <CardHeader className="border-b border-gray-800">
          <CardTitle>
            {icon}
            {title}
          </CardTitle>
        </CardHeader>
      )}

      <CardContent className="px-0 min-h-0 overflow-y-hidden overflow-x-auto">
        {loading && data.length === 0 ? (
          <div className="flex items-center justify-center py-12">
            <IconLoader2 className="size-5 animate-spin text-muted-foreground" />
          </div>
        ) : data.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-sm text-muted-foreground">
            <p>{emptyMessage}</p>
          </div>
        ) : (
          <div className="relative h-full overflow-x-auto">
            {loading && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-card/60">
                <IconLoader2 className="size-5 animate-spin text-muted-foreground" />
              </div>
            )}
            <Table>
              <TableHeader>
                <TableRow>
                  {columns.map((col) => (
                    <TableHead key={col.key} className={col.headerClassName}>
                      {col.header}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((row) => (
                  <TableRow
                    key={rowKey(row)}
                    onClick={onRowClick ? () => onRowClick(row) : undefined}
                    className={onRowClick ? "cursor-pointer" : undefined}
                  >
                    {columns.map((col) => (
                      <TableCell key={col.key} className={col.cellClassName}>
                        {col.render(row)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>

      {pagination && pagination.totalPages > 0 && (
        <CardFooter className="justify-between bg-gray-800 border-none rounded-none shrink-0">
          <p className="text-xs text-muted-foreground tabular-nums">
            Page {pagination.page} of {pagination.totalPages}
          </p>
          <div className="flex items-center gap-1">
            <GameButton
              variant="outline"
              size="icon-sm"
              disabled={pagination.page <= 1 || pagination.disabled}
              onClick={() => pagination.onPageChange(pagination.page - 1)}
            >
              <IconChevronLeft />
            </GameButton>
            <GameButton
              variant="outline"
              size="icon-sm"
              disabled={
                pagination.page >= pagination.totalPages || pagination.disabled
              }
              onClick={() => pagination.onPageChange(pagination.page + 1)}
            >
              <IconChevronRight />
            </GameButton>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}

export { DataGrid };
export type { DataGridColumn, DataGridPagination, DataGridProps };
