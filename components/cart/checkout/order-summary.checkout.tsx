import { CartItem } from "@/lib/cart/types.cart";
import OrderItemRow from "./order-row.checkout";
import { pluralizeItem } from "./utils.checkout";

type OrderSummarySectionProps = {
  items: CartItem[];
};

export default function OrderSummarySection({
  items,
}: OrderSummarySectionProps) {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 py-6 text-muted-foreground">
        <p className="text-sm">All items in your cart are unavailable.</p>
      </div>
    );
  }

  return (
    <section className="space-y-2">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        Order Summary ({items.length} {pluralizeItem(items.length)})
      </h2>
      <div className="rounded-lg border border-gray-700 overflow-hidden divide-y divide-gray-700 shape-main">
        {items.map((item) => (
          <OrderItemRow key={item.product_num} item={item} />
        ))}
      </div>
    </section>
  );
}
