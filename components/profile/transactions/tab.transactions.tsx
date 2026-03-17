"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";

import { getTransactions } from "@/app/(dashboard)/profile/actions";
import Coin from "@/components/common/coin";
import { DataGrid, type DataGridColumn } from "@/components/ui/data-grid";
import { formatCurrency, formatDate } from "@/lib/formatters";
import { copyText } from "@/lib/utils";
import { type Transaction } from "@/types/transaction";
import { IconReceipt } from "@tabler/icons-react";
import { sileo } from "sileo";
import { TRANSACTION_TYPE_MAP } from "./constants.transactions";
import TransactionStatusBadge from "./status-badge.transactions";

function useTransactionColumns() {
  return useMemo<DataGridColumn<Transaction>[]>(
    () => [
      {
        key: "id",
        header: (
          <div className="[&_span]:block pt-2 pb-1">
            Transaction ID
            <span className="text-xs text-muted-foreground">
              Reference Number
            </span>
          </div>
        ),
        headerClassName: "w-[320px]",
        render: (tx) => (
          <div className="[&_span]:block">
            {tx.transaction_id}
            <span className="text-xs text-muted-foreground">
              {tx.reference_code ?? "-"}
            </span>
          </div>
        ),
      },
      {
        key: "type",
        header: "Type",
        render: (tx) => {
          const { label } = TRANSACTION_TYPE_MAP[tx.transaction_type] ?? {
            label: "Other",
          };
          return label;
        },
      },
      {
        key: "amount",
        header: "Amount",
        headerClassName: "text-right",
        cellClassName: "text-right tabular-nums",
        render: (tx) => (
          <Coin
            className="text-[14px] flex-row-reverse"
            value={tx.transaction_amount}
          />
        ),
      },
      {
        key: "price",
        header: "Price",
        headerClassName: "text-right",
        cellClassName: "text-right tabular-nums",
        render: (tx) => {
          const { currency } = TRANSACTION_TYPE_MAP[tx.transaction_type] ?? {
            currency: "PHP",
          };
          return formatCurrency(tx.transaction_price, 2, currency);
        },
      },
      {
        key: "status",
        header: "Status",
        render: (tx) => (
          <TransactionStatusBadge status={tx.transaction_status} />
        ),
      },
      {
        key: "date",
        header: "Date",
        cellClassName: "text-muted-foreground",
        render: (tx) => formatDate(tx.transaction_time),
      },
    ],
    [],
  );
}

export function ProfileTransactionsTab() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [isPending, startTransition] = useTransition();
  const columns = useTransactionColumns();

  const totalPages = Math.max(1, Math.ceil(total / 10));

  const fetchPage = useCallback((targetPage: number) => {
    startTransition(async () => {
      const result = await getTransactions(targetPage);
      if (result.success && result.data) {
        setTransactions(result.data.data);
        setTotal(result.data.total_items);
        setPage(result.data.page);
      }
    });
  }, []);

  useEffect(() => {
    fetchPage(1);
  }, [fetchPage]);

  const handleRowClick = useCallback((row: Transaction) => {
    copyText(row.transaction_id).then(() => {
      sileo.info({
        title: "Transaction ID copied to clipboard.",
        description:
          "Paste it in the Discord server when doing a follow-up on this transaction.",
      });
    });
  }, []);

  return (
    <DataGrid
      columns={columns}
      data={transactions}
      rowKey={(tx) => tx.transaction_id}
      icon={<IconReceipt className="text-muted-foreground size-4" />}
      title="Transaction / Recharge History"
      loading={isPending}
      emptyMessage="No transactions yet"
      pagination={{
        page,
        totalPages,
        onPageChange: fetchPage,
        disabled: isPending,
      }}
      onRowClick={handleRowClick}
    />
  );
}
