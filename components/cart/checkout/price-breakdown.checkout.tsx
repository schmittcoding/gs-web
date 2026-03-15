import Coin from "@/components/common/coin";

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
    <section className="space-y-3">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        Price Breakdown
      </h2>
      <div className="shape-main border border-gray-700 bg-gray-950 overflow-hidden">
        <div className="space-y-3 p-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <Coin
              className="**:data-[slot='coin-value']:font-medium"
              size="sm"
              value={totalOriginalPrice}
            />
          </div>
          {totalDiscount > 0 && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-destructive">Discount</span>
              <span className="text-destructive text-xs font-medium">
                -{new Intl.NumberFormat("en-US").format(totalDiscount)}
              </span>
            </div>
          )}
        </div>
        <div className="flex items-center justify-between bg-gray-800 py-2 px-4">
          <span className="font-semibold">Total</span>
          <Coin
            className="**:data-[slot='coin-value']:text-lg **:data-[slot='coin-value']:font-bold **:data-[slot='coin-value']:text-primary"
            value={totalPrice}
          />
        </div>
      </div>
    </section>
  );
}
