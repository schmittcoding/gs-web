"use client";

import { useCallback, useEffect, useState, useTransition } from "react";

import { getTransactions } from "@/app/(dashboard)/profile/actions";
import Coin from "@/components/common/coin";
import { TRANSACTION_TYPE_MAP } from "@/components/profile/transactions/constants.transactions";
import TransactionStatusBadge from "@/components/profile/transactions/status-badge.transactions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate } from "@/lib/formatters";
import { type Transaction } from "@/types/transaction";
import Link from "next/link";

export default function RecentTransactions() {
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
      <CardHeader className="pt-4 items-center flex justify-between">
        <CardTitle>
          <span className="text-sm font-bold uppercase tracking-wider">
            Recent Transactions
          </span>
        </CardTitle>
        <Link
          href="/profile"
          className="text-xs font-semibold text-primary hover:underline uppercase tracking-wider"
        >
          View All
        </Link>
      </CardHeader>
      <CardContent className="p-2 bg-gray-900!">
        {isPending ? (
          <div className="divide-y divide-gray-800">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3 px-3 py-2.5">
                <div className="flex-1 min-w-0 space-y-1.5">
                  <Skeleton className="h-4 w-24 rounded-sm" />
                  <Skeleton className="h-2.5 w-2/5 rounded-sm" />
                </div>
                <Skeleton className="h-5 w-16 rounded-sm" />
              </div>
            ))}
          </div>
        ) : transactions.length === 0 ? (
          <p className="text-sm text-gray-500 py-8 text-center">
            No transactions yet
          </p>
        ) : (
          <div className="divide-y divide-gray-800">
            {transactions.map((tx) => {
              const typeInfo = TRANSACTION_TYPE_MAP[tx.transaction_type] ?? {
                label: "Other",
              };
              return (
                <div
                  key={tx.transaction_id}
                  className="flex items-center gap-3 px-3 py-2.5 hover:bg-gray-800/80 transition-colors duration-200"
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
