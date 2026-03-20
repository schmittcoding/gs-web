"use server";

import { ShopItem } from "@/components/item-shop/types.item-shop";
import { fetcherPrivate } from "@/lib/fetcher";
import { CartCookieItem, CartItem } from "./types.cart";

export type SyncedCartItem = CartItem & {
  is_removed: boolean;
};

/**
 * Fetch fresh item data from the API and merge with current cart quantities.
 * Returns synced items with up-to-date prices, stock, and limits.
 * Items no longer in the shop are flagged with `is_removed: true`.
 */
export async function getCartItemsFresh(
  cartItems: CartCookieItem[],
): Promise<SyncedCartItem[]> {
  if (cartItems.length === 0) return [];

  const res = await fetcherPrivate("/v1/item-shop");

  if (!res.ok) {
    return cartItems.map((item) => ({
      ...item,
      item_price: item.final_price,
      item_stock: 0,
      is_removed: false,
    }));
  }

  let shopItems: ShopItem[];
  try {
    shopItems = await res.json();
  } catch {
    return cartItems.map((item) => ({
      ...item,
      item_price: item.final_price,
      item_stock: 0,
      is_removed: false,
    }));
  }

  const shopMap = new Map(shopItems.map((s) => [s.product_num, s]));

  return cartItems.map((cartItem) => {
    const fresh = shopMap.get(cartItem.product_num);

    if (!fresh) {
      return {
        ...cartItem,
        item_price: cartItem.final_price,
        item_stock: 0,
        is_removed: true,
      };
    }

    return {
      product_num: cartItem.product_num,
      quantity: cartItem.quantity,
      item_name: fresh.item_name,
      item_image: fresh.item_image,
      item_price: fresh.item_price,
      final_price: fresh.final_price,
      remaining_purchase_limit: fresh.remaining_purchase_limit,
      item_stock: fresh.item_stock,
      is_removed: false,
    };
  });
}
