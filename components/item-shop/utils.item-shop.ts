import { ShopItem } from "./types.item-shop";

export function getItemMeta(item: ShopItem) {
  let tag: string | null = null;
  let variant: "basic" | "limited" | "promo" | "special" = "basic";
  let state: "sold" | "limit-reached" | undefined;

  // Determine tag & variant
  if (item.item_tag) {
    tag = item.item_tag;
    variant = "special";
  } else if (typeof item.item_discount === "number") {
    tag = `${item.discount_percent}% OFF`;
    variant = "promo";
  } else if (item.item_purchase_limit) {
    tag = "Limited";
    variant = "limited";
  }

  // Determine state
  if (item.item_stock <= 0) {
    state = "sold";
  } else if (
    typeof item.remaining_purchase_limit === "number" &&
    item.remaining_purchase_limit === 0
  ) {
    state = "limit-reached";
  }

  return { tag, variant, state };
}
