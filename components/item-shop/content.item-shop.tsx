"use client";

import { FilterDialog } from "@/components/item-shop/filter-dialog.item-shop";
import ItemShopFilters, {
  type ItemFilters,
} from "@/components/item-shop/filters.item-shop";
import { ItemCard } from "@/components/item-shop/item-card.item-shop";
import { IconSearch, IconX } from "@tabler/icons-react";
import { useEffect, useMemo, useState } from "react";

import { useCart } from "../providers/cart.provider";
import { default as GameButton } from "../common/game.button";
import FormInput from "../ui/form/input.form";
import { EItemCategory, ShopItem } from "./types.item-shop";

type ItemShopContentProps = {
  items: Partial<Record<string, ShopItem[]>>;
};

export default function ItemShopContent({ items }: ItemShopContentProps) {
  const { syncCartFromShopData } = useCart();

  // Sync cart prices/stock from the already-fetched shop data (no extra request)
  useEffect(() => {
    const allItems = Object.values(items).flat().filter(Boolean) as ShopItem[];
    syncCartFromShopData(allItems);
  }, [items, syncCartFromShopData]);

  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<ItemFilters>({
    category: EItemCategory.All,
    availableOnly: false,
    discountedOnly: false,
  });

  const filterItem = (item: ShopItem) => {
    const {
      item_name,
      item_description,
      item_category,
      item_stock,
      remaining_purchase_limit,
      item_discount,
    } = item;

    if (
      search &&
      !item_name.toLowerCase().includes(search.toLowerCase()) &&
      !item_description.toLowerCase().includes(search.toLowerCase())
    ) {
      return false;
    }

    if (
      filters.category !== EItemCategory.All &&
      item_category !== filters.category
    ) {
      return false;
    }

    if (
      filters.availableOnly &&
      (item_stock === 0 ||
        (typeof remaining_purchase_limit === "number" &&
          remaining_purchase_limit === 0))
    ) {
      return false;
    }

    if (
      filters.discountedOnly &&
      (typeof item_discount !== "number" || item_discount <= 0)
    ) {
      return false;
    }

    return true;
  };

  const filteredGroups = useMemo(() => {
    const result: [string, ShopItem[]][] = [];
    for (const [category, groupItems] of Object.entries(items)) {
      if (!groupItems) continue;
      const filtered = groupItems.filter(filterItem);
      if (filtered.length > 0) {
        result.push([category, filtered]);
      }
    }
    return result;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, filters, items]);

  const availableCategories = useMemo(() => {
    const categories = new Set<EItemCategory>();
    for (const groupItems of Object.values(items)) {
      if (!groupItems) continue;
      for (const item of groupItems) {
        categories.add(item.item_category);
      }
    }
    return categories;
  }, [items]);

  const activeFilterCount = [
    filters.category !== EItemCategory.All,
    filters.availableOnly,
    filters.discountedOnly,
  ].filter(Boolean).length;

  return (
    <div className="flex h-full flex-col gap-4">
      {/* Top bar */}
      <div className="flex items-center justify-between gap-3  w-full">
        <div className="relative flex-1 max-w-xl">
          <FormInput
            id="search"
            placeholder="Search items..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            startIcon={IconSearch}
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <IconX className="size-3.5" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 ml-auto">
          {/* Mobile filter toggle */}
          <FilterDialog
            filters={filters}
            onFiltersChange={setFilters}
            availableCategories={availableCategories}
            activeFilterCount={activeFilterCount}
          />
        </div>
      </div>

      {/* 2-column layout */}
      <div className="flex min-h-0 flex-1 gap-4">
        {/* Left - Item grid (dominant) */}
        <section className="flex-1 min-w-0 overflow-y-auto pr-1">
          {filteredGroups.length > 0 ? (
            <div className="flex flex-col gap-6 pb-4">
              {filteredGroups.map(([category, groupItems]) => (
                <div key={category}>
                  <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    {category}
                  </h2>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                    {groupItems.map((item) => (
                      <ItemCard key={item.product_num} item={item} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex h-64 flex-col items-center justify-center gap-2 text-muted-foreground">
              <IconSearch className="size-8 opacity-30" />
              <p className="text-sm">No items match your filters</p>
              <GameButton
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSearch("");
                  setFilters({
                    category: EItemCategory.All,
                    availableOnly: false,
                    discountedOnly: false,
                  });
                }}
              >
                Clear all filters
              </GameButton>
            </div>
          )}
        </section>

        {/* Right - Filters sidebar (desktop) */}
        <div className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-0">
            <ItemShopFilters
              filters={filters}
              onFiltersChange={setFilters}
              availableCategories={availableCategories}
            />
          </div>
        </div>
      </div>

    </div>
  );
}
