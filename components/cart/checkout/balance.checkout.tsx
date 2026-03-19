import Coin from "@/components/common/coin";
import ReadOnlyField from "@/components/ui/input/read-only";
import { formatCurrency } from "@/lib/formatters";

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
    <section className="px-4 space-y-3">
      <h2 className="mb-2 text-sm font-semibold tracking-wider uppercase text-muted-foreground">
        Balance
      </h2>
      <ReadOnlyField
        className="flex items-center justify-between"
        label="Available R-Coins"
      >
        <Coin className="flex-row-reverse" size="lg" value={balance} />
      </ReadOnlyField>
      <ReadOnlyField
        className="flex items-center justify-between text-destructive"
        label="Order Total"
      >
        <Coin
          className="**:data-[slot='coin-value']:font-medium flex-row-reverse"
          size="lg"
          value={-totalPrice}
        />
      </ReadOnlyField>
      <ReadOnlyField
        className="flex items-center justify-between"
        label="After Purchase"
      >
        <Coin className="flex-row-reverse" size="lg" value={remainingBalance} />
      </ReadOnlyField>
      {!canAfford && (
        <p className="text-xs text-destructive">
          {`Insufficient R-Coin balance. You need ${formatCurrency(Math.abs(remainingBalance))} more to complete this purchase.`}
        </p>
      )}
    </section>
  );
}
