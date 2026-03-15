import Coin from "@/components/common/coin";
import { formatCurrency } from "@/lib/formatters";
import { cn } from "@/lib/utils";

type BalanceSectionProps = {
  balance: number;
  totalPrice: number;
  remainingBalance: number;
  canAfford: boolean;
};

export default function BalanceSection({
  balance,
  totalPrice,
  remainingBalance,
  canAfford,
}: BalanceSectionProps) {
  return (
    <section className="space-y-3">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        Balance
      </h2>
      <div className="shape-main border border-gray-700 bg-gray-950 overflow-hidden">
        <div className="space-y-3 p-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Available R-Coin</span>
            <Coin
              className="**:data-[slot='coin-value']:font-medium"
              size="sm"
              value={balance}
            />
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Order Total</span>
            <span className="text-xs font-medium">
              -{new Intl.NumberFormat("en-US").format(totalPrice)}
            </span>
          </div>
        </div>
        <div className="bg-gray-800 py-2 px-4">
          <div className="flex items-center justify-between">
            <span className="font-semibold">After Purchase</span>
            <Coin
              className={cn(
                "**:data-[slot='coin-value']:text-base **:data-[slot='coin-value']:font-bold",
                canAfford
                  ? "**:data-[slot='coin-value']:text-primary"
                  : "**:data-[slot='coin-value']:text-destructive",
              )}
              value={remainingBalance}
            />
          </div>
          {!canAfford && (
            <p className="text-xs text-destructive">
              Insufficient R-Coin balance. You need{" "}
              {formatCurrency(Math.abs(remainingBalance))} more to complete this
              purchase.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
