export function getUnavailableReason(item: {
  remaining_purchase_limit?: number | null;
  item_stock?: number;
}): string {
  if (typeof item.item_stock === "number" && item.item_stock <= 0) {
    return "Sold Out";
  }
  if (
    typeof item.remaining_purchase_limit === "number" &&
    item.remaining_purchase_limit === 0
  ) {
    return "Limit Reached";
  }
  return "Unavailable";
}
