import Coin from "@/components/common/coin";
import ReadOnlyField from "@/components/ui/input/read-only";

export default function PriceBreakdown({
  totalOriginalPrice,
  totalDiscount,
  totalPrice,
}: {
  totalOriginalPrice: number;
  totalDiscount: number;
  totalPrice: number;
}) {
  return (
    <section className="space-y-3 px-4">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2">
        Price Breakdown
      </h2>
      <ReadOnlyField
        className="flex items-center justify-between"
        label="Sub total"
      >
        <Coin
          className="flex-row-reverse"
          size="lg"
          value={totalOriginalPrice}
        />
      </ReadOnlyField>
      {totalDiscount > 0 && (
        <ReadOnlyField
          className="flex items-center justify-between text-destructive"
          label="Discount"
        >
          <Coin
            className="**:data-[slot='coin-value']:font-medium flex-row-reverse"
            size="lg"
            value={-totalDiscount}
          />
        </ReadOnlyField>
      )}
      <ReadOnlyField
        className="flex items-center justify-between"
        label="Total"
      >
        <Coin
          className="flex-row-reverse **:data-[slot='coin-value']:font-bold"
          size="lg"
          value={totalPrice}
        />
      </ReadOnlyField>
    </section>
  );
}
