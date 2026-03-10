"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { IconFilter, IconX } from "@tabler/icons-react";
import { EItemCategory } from "./types.item-shop";

type ItemFilters = {
  category: EItemCategory;
  priceMin: string;
  priceMax: string;
  availableOnly: boolean;
  discountedOnly: boolean;
};

type ItemFiltersProps = {
  filters: ItemFilters;
  onFiltersChange: (filters: ItemFilters) => void;
  availableCategories: Set<EItemCategory>;
};

export default function ItemShopFilters({
  filters,
  onFiltersChange,
  availableCategories,
}: ItemFiltersProps) {
  const categories = [
    EItemCategory.All,
    ...Object.values(EItemCategory).filter(
      (v): v is EItemCategory =>
        typeof v === "number" &&
        v !== EItemCategory.All &&
        availableCategories.has(v),
    ),
  ];
  const hasActiveFilters =
    filters.category !== EItemCategory.All ||
    filters.priceMin !== "" ||
    filters.priceMax !== "" ||
    filters.availableOnly ||
    filters.discountedOnly;

  function resetFilters() {
    onFiltersChange({
      category: EItemCategory.All,
      priceMin: "",
      priceMax: "",
      availableOnly: false,
      discountedOnly: false,
    });
  }

  return (
    <aside className="flex flex-col gap-6 rounded-xl ring-1 ring-foreground/10 bg-card p-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <IconFilter className="size-4 text-primary" />
          <span className="text-sm font-semibold uppercase tracking-wider">
            Filters
          </span>
        </div>
        {hasActiveFilters && (
          <Button variant="ghost" size="xs" onClick={resetFilters}>
            <IconX data-icon="inline-start" />
            Clear
          </Button>
        )}
      </div>

      <Separator />

      {/* Category */}
      <div className="flex flex-col gap-3">
        <Label className="text-xs uppercase tracking-wider text-muted-foreground">
          Item Category
        </Label>
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onFiltersChange({ ...filters, category: cat })}
              className={cn(
                "rounded-lg border px-3 py-1.5 text-xs font-medium transition-all",
                filters.category === cat
                  ? "border-primary/50 bg-primary/15 text-primary"
                  : "border-foreground/10 bg-transparent text-muted-foreground hover:border-foreground/20 hover:text-foreground",
              )}
            >
              {EItemCategory[cat]}
            </button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Price Range */}
      <div className="flex flex-col gap-3">
        <Label className="text-xs uppercase tracking-wider text-muted-foreground">
          Price Range
        </Label>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            placeholder="Min"
            value={filters.priceMin}
            onChange={(e) =>
              onFiltersChange({ ...filters, priceMin: e.target.value })
            }
            className="text-center"
          />
          <span className="text-muted-foreground text-xs shrink-0">to</span>
          <Input
            type="number"
            placeholder="Max"
            value={filters.priceMax}
            onChange={(e) =>
              onFiltersChange({ ...filters, priceMax: e.target.value })
            }
            className="text-center"
          />
        </div>
      </div>

      <Separator />

      {/* Toggles */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-0.5">
            <Label htmlFor="available-only" className="text-sm">
              Available Only
            </Label>
            <span className="text-xs text-muted-foreground">
              Hide sold-out items
            </span>
          </div>
          <Switch
            id="available-only"
            checked={filters.availableOnly}
            onCheckedChange={(checked) =>
              onFiltersChange({
                ...filters,
                availableOnly: checked === true,
              })
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-0.5">
            <Label htmlFor="discounted-only" className="text-sm">
              Discounted
            </Label>
            <span className="text-xs text-muted-foreground">
              Show sale items only
            </span>
          </div>
          <Switch
            id="discounted-only"
            checked={filters.discountedOnly}
            onCheckedChange={(checked) =>
              onFiltersChange({
                ...filters,
                discountedOnly: checked === true,
              })
            }
          />
        </div>
      </div>

      {/* Active filter count */}
      {hasActiveFilters && (
        <>
          <Separator />
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              {
                [
                  filters.category !== EItemCategory.All &&
                    EItemCategory[filters.category],
                  filters.priceMin && `Min: ${filters.priceMin}`,
                  filters.priceMax && `Max: ${filters.priceMax}`,
                  filters.availableOnly && "In Stock",
                  filters.discountedOnly && "On Sale",
                ].filter(Boolean).length
              }{" "}
              active
            </Badge>
          </div>
        </>
      )}
    </aside>
  );
}

export type { ItemFilters };
