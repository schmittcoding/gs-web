import { getEffectiveLimit } from "@/lib/cart/utils.cart";
import { useCallback } from "react";
import { sileo } from "sileo";
import { useCart } from "../providers/cart.provider";
import { ShopItem } from "./types.item-shop";

export function useAddToCart() {
  const { addItem } = useCart();

  const addToCart = useCallback(
    (item: ShopItem): boolean => {
      const added = addItem({
        product_num: item.product_num,
        item_name: item.item_name,
        item_image: item.item_image,
        final_price: item.final_price,
        item_price: item.item_price,
        remaining_purchase_limit: item.remaining_purchase_limit,
        item_stock: item.item_stock,
      });

      if (!added) {
        const limit = getEffectiveLimit(
          item.remaining_purchase_limit,
          item.item_stock,
        );
        sileo.warning({
          description: `You can only add up to ${limit} of ${item.item_name}.`,
        });
        return false;
      }

      sileo.success({
        description: `${item.item_name} has been added to your cart.`,
      });
      return true;
    },
    [addItem],
  );

  return { addToCart };
}
