"use client";

import { getStreamerCommissions } from "@/app/(dashboard)/sas/actions";
import { DataGrid, DataGridColumn } from "@/components/ui/data-grid";
import { CreatorCommissionEntry } from "@/types/creator";
import { formatCurrency, formatShortDate } from "@/lib/formatters";
import { IconCoin } from "@tabler/icons-react";
import { useCallback, useState, useTransition } from "react";

const PAGE_SIZE = 10;

const COLUMNS: DataGridColumn<CreatorCommissionEntry>[] = [
  {
    key: "supporter",
    header: "Supporter",
    render: (row) => (
      <span className="font-medium text-gray-200">
        {row.supporter_user_name}
      </span>
    ),
  },
  {
    key: "recharge",
    header: "Recharge",
    headerClassName: "text-right",
    cellClassName: "text-right tabular-nums text-gray-300",
    render: (row) => formatCurrency(row.recharge_amount),
  },
  {
    key: "rate",
    header: "Rate",
    headerClassName: "text-right",
    cellClassName: "text-right tabular-nums text-amber-400",
    render: (row) => `${row.commission_percent}%`,
  },
  {
    key: "earned",
    header: "Earned",
    headerClassName: "text-right",
    cellClassName: "text-right tabular-nums font-semibold text-primary",
    render: (row) => formatCurrency(row.commission_amount),
  },
  {
    key: "date",
    header: "Date",
    headerClassName: "text-right",
    cellClassName: "text-right text-gray-500 text-xs",
    render: (row) => formatShortDate(row.created_at),
  },
];

type CommissionsTableProps = {
  initialData: CreatorCommissionEntry[];
  initialTotal: number;
};

export function CommissionsTable({
  initialData,
  initialTotal,
}: CommissionsTableProps) {
  const [page, setPage] = useState(1);
  const [data, setData] = useState(initialData);
  const [total, setTotal] = useState(initialTotal);
  const [isPending, startTransition] = useTransition();

  const totalPages = Math.ceil(total / PAGE_SIZE);

  const handlePageChange = useCallback((nextPage: number) => {
    startTransition(async () => {
      const result = await getStreamerCommissions(nextPage, PAGE_SIZE);
      if (result.success) {
        setData(result.data);
        setTotal(result.total);
        setPage(nextPage);
      }
    });
  }, []);

  return (
    <DataGrid
      icon={<IconCoin className="size-4 text-primary" />}
      title="Commission History"
      columns={COLUMNS}
      data={data}
      rowKey={(row) => row.commission_id}
      loading={isPending}
      emptyMessage="No commissions yet. Share your streamer code to start earning."
      pagination={{
        page,
        totalPages,
        onPageChange: handlePageChange,
        disabled: isPending,
      }}
    />
  );
}
