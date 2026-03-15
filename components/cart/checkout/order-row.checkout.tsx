import Coin from "@/components/common/coin";
import { CartItem } from "@/lib/cart/types.cart";
import ItemCheckoutThumbnail from "./thumbnail.checkout";

type OrderItemRowProps = {
  item: CartItem;
};

export default function OrderItemRow({ item }: OrderItemRowProps) {
  const hasDiscount = item.final_price < item.item_price;
  const subtotal = item.final_price * item.quantity;

  return (
    <div className="flex gap-3 bg-gray-900 p-3">
      <ItemCheckoutThumbnail name={item.item_name} src={item.item_image} />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{item.item_name}</p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>Qty: {item.quantity}</span>
          {hasDiscount && (
            <span className="text-destructive">
              -
              {Math.round(
                ((item.item_price - item.final_price) / item.item_price) * 100,
              )}
              %
            </span>
          )}
        </div>
        {item.item_description && (
          <ul>
            {item.item_description.split("\n").map((desc, i) => (
              <li className="list-inside" key={i}>
                <span>{desc}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="text-right shrink-0">
        <Coin
          className="justify-end **:data-[slot='coin-value']:font-medium **:data-[slot='coin-value']:text-primary"
          size="sm"
          value={subtotal}
        />
        {hasDiscount && (
          <Coin
            className="justify-end **:data-[slot='coin-value']:line-through **:data-[slot='coin-value']:text-muted-foreground [&_svg]:hidden"
            size="sm"
            value={item.item_price * item.quantity}
          />
        )}
      </div>
    </div>
  );
}
