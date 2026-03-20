"use client";

import { useCallback, useEffect, useState, useTransition } from "react";

import { getTransactions } from "@/app/(dashboard)/profile/actions";
import Coin from "@/components/common/coin";
import { TRANSACTION_TYPE_MAP } from "@/components/profile/transactions/constants.transactions";
import TransactionStatusBadge from "@/components/profile/transactions/status-badge.transactions";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate } from "@/lib/formatters";
import { type Transaction } from "@/types/transaction";
import { IconReceipt } from "@tabler/icons-react";
import Link from "next/link";

function RecentTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isPending, startTransition] = useTransition();

  const fetchData = useCallback(() => {
    startTransition(async () => {
      const result = await getTransactions(1);
      if (result.success && result.data) {
        setTransactions(result.data.data.slice(0, 5));
      }
    });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Card className="h-max">
      <CardHeader>
        <CardTitle>
          <IconReceipt className="size-4 text-primary" />
          <span className="text-sm font-bold uppercase tracking-wider">
            Recent Transactions
          </span>
        </CardTitle>
        <CardAction>
          <Link
            href="/profile"
            className="text-xs font-semibold text-primary hover:underline uppercase tracking-wider"
          >
            View All
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent className="p-2">
        {isPending ? (
          <div className="space-y-2 p-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-14 w-full rounded-sm" />
            ))}
          </div>
        ) : transactions.length === 0 ? (
          <p className="text-sm text-gray-500 py-8 text-center">
            No transactions yet
          </p>
        ) : (
          <div className="grid gap-1">
            {transactions.map((tx) => {
              const typeInfo = TRANSACTION_TYPE_MAP[tx.transaction_type] ?? {
                label: "Other",
              };
              return (
                <div
                  key={tx.transaction_id}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-sm hover:bg-gray-900/80 transition-colors duration-200"
                >
                  {/* Amount */}
                  <div className="flex-1 min-w-0">
                    <Coin
                      variant="rcoin"
                      value={tx.transaction_amount}
                      size="sm"
                    />
                    <p className="text-[10px] text-gray-500 mt-0.5">
                      {typeInfo.label} &middot;{" "}
                      {formatDate(tx.transaction_time)}
                    </p>
                  </div>

                  {/* Status */}
                  <TransactionStatusBadge status={tx.transaction_status} />
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export { RecentTransactions };
