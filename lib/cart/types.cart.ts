/**
 * Minimal shape persisted in localStorage.
 * User intent + display fields + last-known price for offline display.
 */
export type CartCookieItem = {
  product_num: number;
  quantity: number;
  item_name: string;
  item_image: string;
  final_price: number;
};

/**
 * Full runtime item used by the cart provider and UI.
 * Server-authoritative fields are populated after sync and
 * are `undefined` until `getCartItemsFresh` resolves.
 */
export type CartItem = CartCookieItem & {
  final_price: number;
  item_price: number;
  remaining_purchase_limit?: number | null;
  item_stock?: number;
  item_description?: string;
};

/**
 * A cart item that failed checkout validation, with a reason explaining why.
 * For split items (quantity exceeded), `quantity` reflects the excess amount.
 */
export type UnavailableCartItem = CartItem & {
  unavailable_reason: "sold_out" | "limit_reached" | "quantity_exceeded";
  /** The maximum purchasable quantity (only set for quantity_exceeded) */
  effective_limit?: number;
};
