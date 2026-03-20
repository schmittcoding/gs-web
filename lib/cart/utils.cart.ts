import { CartCookieItem, CartItem, UnavailableCartItem } from "./types.cart";

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
 * Classifies cart items into available and unavailable for checkout.
 *
 * Handles three scenarios:
 * 1. Fully unavailable — stock is 0 or purchase limit is 0
 * 2. Quantity exceeded — cart quantity exceeds the effective limit (stock or
 *    purchase limit). The item is split: available portion gets clamped,
 *    excess goes to unavailable.
 * 3. Fully available — passes validation as-is
 */
export function classifyCartItems(items: CartItem[]): {
  availableItems: CartItem[];
  unavailableItems: UnavailableCartItem[];
} {
  const availableItems: CartItem[] = [];
  const unavailableItems: UnavailableCartItem[] = [];

  for (const item of items) {
    if (isCartItemUnavailable(item)) {
      unavailableItems.push({
        ...item,
        unavailable_reason:
          typeof item.item_stock === "number" && item.item_stock <= 0
            ? "sold_out"
            : "limit_reached",
      });
      continue;
    }

    const limit = getEffectiveLimit(
      item.remaining_purchase_limit,
      item.item_stock,
    );

    if (limit !== null && item.quantity > limit) {
      if (limit > 0) {
        availableItems.push({ ...item, quantity: limit });
      }
      unavailableItems.push({
        ...item,
        quantity: limit > 0 ? item.quantity - limit : item.quantity,
        unavailable_reason:
          limit <= 0
            ? typeof item.item_stock === "number" && item.item_stock <= 0
              ? "sold_out"
              : "limit_reached"
            : "quantity_exceeded",
        effective_limit: limit,
      });
      continue;
    }

    availableItems.push(item);
  }

  return { availableItems, unavailableItems };
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
