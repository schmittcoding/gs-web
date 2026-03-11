import { CartItem } from "./types.cart";

const CART_COOKIE_KEY = process.env.NEXT_PUBLIC_CART_COOKIE_KEY ?? "gs_cart";
const CART_COOKIE_MAX_AGE = Number(
  process.env.NEXT_PUBLIC_CART_COOKIE_MAX_AGE ?? 2592000,
);

/**
 * Client-side: read cart from `document.cookie`.
 */
export function getCartFromCookiesClient(): CartItem[] {
  if (typeof document === "undefined") return [];

  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${CART_COOKIE_KEY}=`));

  if (!match) return [];

  try {
    return JSON.parse(decodeURIComponent(match.split("=").slice(1).join("=")));
  } catch {
    return [];
  }
}

/**
 * Client-side: write cart to `document.cookie`.
 */
export function saveCartToCookiesClient(items: CartItem[]) {
  const value = encodeURIComponent(JSON.stringify(items));
  document.cookie = `${CART_COOKIE_KEY}=${value}; path=/; max-age=${CART_COOKIE_MAX_AGE}; SameSite=Lax`;
}
