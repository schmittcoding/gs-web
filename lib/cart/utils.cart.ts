import { CartCookieItem, CartItem } from "./types.cart";

const CART_COOKIE_KEY = process.env.NEXT_PUBLIC_CART_COOKIE_KEY ?? "gs_cart";
const CART_COOKIE_MAX_AGE = Number(
  process.env.NEXT_PUBLIC_CART_COOKIE_MAX_AGE ?? 2592000,
);

/**
 * Client-side: read cart from `document.cookie`.
 * Returns only cookie-safe fields; server-authoritative data
 * must be populated via `getCartItemsFresh`.
 */
export function getCartFromCookiesClient(): CartCookieItem[] {
  if (typeof document === "undefined") return [];

  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${CART_COOKIE_KEY}=`));

  if (!match) return [];

  try {
    const parsed: unknown[] = JSON.parse(
      decodeURIComponent(match.split("=").slice(1).join("=")),
    );
    return parsed.map((raw) => {
      const r = raw as Record<string, unknown>;
      return {
        product_num: Number(r.product_num),
        quantity: Number(r.quantity),
        item_name: String(r.item_name ?? ""),
        item_image: String(r.item_image ?? ""),
      };
    });
  } catch {
    return [];
  }
}

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
  if (typeof remainingPurchaseLimit === "number") limits.push(remainingPurchaseLimit);
  if (typeof itemStock === "number") limits.push(itemStock);
  return limits.length > 0 ? Math.min(...limits) : null;
}

/**
 * Client-side: write cart to `document.cookie`.
 * Only persists user intent + display fields — never prices, limits, or stock.
 */
export function saveCartToCookiesClient(items: CartItem[]) {
  const cookieItems: CartCookieItem[] = items.map((item) => ({
    product_num: item.product_num,
    quantity: item.quantity,
    item_name: item.item_name,
    item_image: item.item_image,
  }));
  const value = encodeURIComponent(JSON.stringify(cookieItems));
  document.cookie = `${CART_COOKIE_KEY}=${value}; path=/; max-age=${CART_COOKIE_MAX_AGE}; SameSite=Lax`;
}
