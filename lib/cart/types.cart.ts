/**
 * Minimal shape persisted in the cookie.
 * Only user intent + display fields — never prices, limits, or stock.
 */
export type CartCookieItem = {
  product_num: number;
  quantity: number;
  item_name: string;
  item_image: string;
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
