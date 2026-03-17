import { Card, CardContent } from "@/components/ui/card";
import { CartItem } from "@/lib/cart/types.cart";
import { IconAlertTriangle } from "@tabler/icons-react";
import { getUnavailableReason } from "../utils.cart";
import ItemCheckoutThumbnail from "./thumbnail.checkout";
import { pluralizeItem } from "./utils.checkout";

export default function UnavailableSection({ items }: { items: CartItem[] }) {
  if (items.length === 0) return null;

  return (
    <section className="space-y-2">
      <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-destructive">
        <IconAlertTriangle className="size-4" />
        <h2>
          Unavailable ({items.length} {pluralizeItem(items.length)})
        </h2>
      </div>
      <p className="text-xs text-muted-foreground">
        These items will not be included in your order.
      </p>
      <Card variant="destructive">
        <CardContent className="px-0 divide-y divide-gray-700">
          {items.map((item) => (
            <div
              key={item.product_num}
              className="flex items-center gap-3 bg-gray-900/30 p-3 opacity-80 grayscale"
            >
              <ItemCheckoutThumbnail
                name={item.item_name}
                src={item.item_image}
              />
              <div className="flex-1 min-w-0 flex flex-col">
                <p className="text-sm font-medium truncate">{item.item_name}</p>
                <span className="text-xs font-semibold text-destructive">
                  {getUnavailableReason(item)}
                </span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </section>
  );
}
