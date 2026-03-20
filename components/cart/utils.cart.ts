import type { UnavailableCartItem } from "@/lib/cart/types.cart";

export function getUnavailableReason(item: UnavailableCartItem): string {
  switch (item.unavailable_reason) {
    case "sold_out":
      return "Sold Out";
    case "limit_reached":
      return "Limit Reached";
    case "quantity_exceeded":
      return `Exceeds Limit (max ${item.effective_limit})`;
    default:
      return "Unavailable";
  }
}
