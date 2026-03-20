import { CartCookieItem, CartItem } from "./types.cart";

const CART_STORAGE_KEY = process.env.NEXT_PUBLIC_CART_COOKIE_KEY ?? "gs_cart";

/**
 * Returns true when an item cannot be purchased:
 * - purchase limit reached (`remaining_purchase_limit === 0`)
 * - out of stock (`item_stock <= 0`)
 */
export function isCartItemUnavailable(item: CartItem): boolean {
  return (
    (typeof item.remaining_purchase_limit === "number" &&
      item.remaining_purchase_limit === 0) ||
    (typeof item.item_stock === "number" && item.item_stock <= 0)
  );
}

/**
 * Returns the effective maximum quantity a user can add for an item,
 * taking into account both the remaining purchase limit and available stock.
 * Returns `null` if neither constraint is defined.
 */
export function getEffectiveLimit(
  remainingPurchaseLimit?: number | null,
  itemStock?: number,
): number | null {
  const limits: number[] = [];
  if (typeof remainingPurchaseLimit === "number")
    limits.push(remainingPurchaseLimit);
  if (typeof itemStock === "number") limits.push(itemStock);
  return limits.length > 0 ? Math.min(...limits) : null;
}

/**
 * Client-side: read cart from localStorage.
 */
export function getCartFromStorage(): CartCookieItem[] {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as CartCookieItem[];
  } catch {
    return [];
  }
}

/**
 * Client-side: write cart to localStorage.
 * Persists user intent + display fields + last-known price for offline display.
 */
export function saveCartToStorage(items: CartItem[]) {
  const cookieItems: CartCookieItem[] = items.map((item) => ({
    product_num: item.product_num,
    quantity: item.quantity,
    item_name: item.item_name,
    item_image: item.item_image,
    final_price: item.final_price,
  }));
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cookieItems));
}
