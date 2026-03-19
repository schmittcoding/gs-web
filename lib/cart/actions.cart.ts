"use server";

import { ShopItem } from "@/components/item-shop/types.item-shop";
import { fetcherPrivate } from "@/lib/fetcher";
import { cookies } from "next/headers";
import { CartCookieItem, CartItem } from "./types.cart";

const CART_COOKIE_KEY = process.env.NEXT_PUBLIC_CART_COOKIE_KEY ?? "gs_cart";

/**
 * Server-side: read cart from cookies using `next/headers`.
 * Returns only cookie-safe fields; server-authoritative data
 * must be populated via `getCartItemsFresh`.
 */
export async function getCartFromCookiesServer(): Promise<CartCookieItem[]> {
  const cookieStore = await cookies();
  const raw = cookieStore.get(CART_COOKIE_KEY)?.value;

  if (!raw) return [];

  try {
    const parsed: unknown[] = JSON.parse(raw);
    return parsed.map((r) => {
      const item = r as Record<string, unknown>;
      return {
        product_num: Number(item.product_num),
        quantity: Number(item.quantity),
        item_name: String(item.item_name ?? ""),
        item_image: String(item.item_image ?? ""),
      };
    });
  } catch {
    return [];
  }
}

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
    // On failure, return cookie data with zeroed prices so UI shows "syncing"
    // state rather than trusting any client-provided values
    return cartItems.map((item) => ({
      ...item,
      final_price: 0,
      item_price: 0,
      item_stock: 0,
      is_removed: false,
    }));
  }

  console.log({ res });

  let shopItems: ShopItem[];
  try {
    shopItems = await res.json();
    console.log({ shopItems });
  } catch {
    return cartItems.map((item) => ({
      ...item,
      final_price: 0,
      item_price: 0,
      item_stock: 0,
      is_removed: false,
    }));
  }
  const shopMap = new Map(shopItems.map((s) => [s.product_num, s]));
  console.log({ shopMap });

  return cartItems.map((cartItem) => {
    const fresh = shopMap.get(cartItem.product_num);

    if (!fresh) {
      return {
        ...cartItem,
        final_price: 0,
        item_price: 0,
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
