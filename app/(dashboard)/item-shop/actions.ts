"use server";

import {
  EItemCategory,
  EPurchaseLimitType,
  ShopItem,
} from "@/components/item-shop/types.item-shop";
import { AUTH_CONFIG } from "@/lib/constants";
import { fetcherPrivate } from "@/lib/fetcher";
import { redirect } from "next/navigation";

// Map purchase limit types to display category names
const getLimitedCategoryName = (limitType: number): string => {
  switch (limitType) {
    case EPurchaseLimitType.Lifetime:
      return "Lifetime";
    case EPurchaseLimitType.Yearly:
      return "Yearly";
    case EPurchaseLimitType.Monthly:
      return "Monthly";
    case EPurchaseLimitType.Daily:
      return "Daily";
    default:
      return "Limited";
  }
};

export async function getItemShop(): Promise<
  Partial<Record<string, ShopItem[]>>
> {
  const res = await fetcherPrivate("/v1/item-shop");

  if (!res.ok) {
    if (res.status === 401) {
      redirect(AUTH_CONFIG.loginPath);
    }

    return {};
  }

  const data: ShopItem[] = await res.json();

  const grouped = Object.groupBy(
    data,
    ({ item_category, item_purchase_limit, item_purchase_limit_type }) => {
      // Check if item has a purchase limit
      if (
        typeof item_purchase_limit === "number" &&
        item_purchase_limit_type !== undefined
      ) {
        // Map purchase limit type to display category name
        return getLimitedCategoryName(item_purchase_limit_type);
      }

      // Map regular categories using the enum
      return EItemCategory[item_category] || "Misc";
    },
  );

  // Build result with limited categories at the top
  const result: Partial<Record<string, ShopItem[]>> = {};

  // Add limited categories in order
  const limitedCategories = ["Lifetime", "Yearly", "Monthly", "Daily"];

  limitedCategories.forEach((category) => {
    if (grouped[category]?.length) {
      result[category] = grouped[category];
    }
  });

  // Add remaining categories
  Object.entries(grouped).forEach(([key, value]) => {
    if (!limitedCategories.includes(key) && value && value.length > 0) {
      result[key] = value;
    }
  });
  return result;
}
