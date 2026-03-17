import { ShopItem } from "./types.item-shop";

export function isItemUnavailable(item: ShopItem): boolean {
  return (
    (typeof item.remaining_purchase_limit === "number" &&
      item.remaining_purchase_limit === 0) ||
    item.item_stock <= 0
  );
}

export function getItemMeta(item: ShopItem) {
  let tag: string | null = null;
  let variant: "primary" | "secondary" | "accent" | "destructive" | "default" =
    "default";
  let state: "sold" | "limit-reached" | undefined;

  // Determine tag & variant
  if (item.item_tag) {
    tag = item.item_tag;
    variant = "primary";
  } else if (typeof item.item_discount === "number") {
    tag = `${item.discount_percent}% OFF`;
    variant = "destructive";
  } else if (item.item_purchase_limit) {
    tag = "Limited";
    variant = "accent";
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
