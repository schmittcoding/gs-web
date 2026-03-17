"use client";

import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { IconFilter, IconX } from "@tabler/icons-react";
import GameButton from "../common/game.button";
import { Card, CardContent } from "../ui/card";
import { EItemCategory } from "./types.item-shop";

type ItemFilters = {
  category: EItemCategory;
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
    filters.availableOnly ||
    filters.discountedOnly;

  function resetFilters() {
    onFiltersChange({
      category: EItemCategory.All,
      availableOnly: false,
      discountedOnly: false,
    });
  }

  return (
    <Card>
      <CardContent className="py-4 space-y-4">
        <section className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <IconFilter className="size-4 text-primary" />
            <span className="text-sm font-semibold uppercase tracking-wider">
              Filters
            </span>
          </div>
          {hasActiveFilters && (
            <GameButton
              className="hover:bg-transparent hover:text-destructive"
              variant="ghost"
              size="xs"
              onClick={resetFilters}
              data-slot="filters-clear"
            >
              <IconX data-icon="inline-start" />
              Clear
            </GameButton>
          )}
        </section>
        <Separator />
        <section className="flex flex-col gap-3">
          <Label className="text-xs uppercase tracking-wider text-muted-foreground">
            Item Category
          </Label>
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => onFiltersChange({ ...filters, category: cat })}
                className={cn(
                  "border px-3 py-1.5 text-xs font-medium transition-all shape-main",
                  filters.category === cat
                    ? "border-primary/50 bg-primary/15 text-primary"
                    : "border-foreground/10 bg-transparent text-muted-foreground hover:border-foreground/20 hover:text-foreground",
                )}
              >
                {EItemCategory[cat]}
              </button>
            ))}
          </div>
        </section>
        <Separator />

        {/* Toggles */}
        <section className="flex flex-col gap-4">
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
        </section>
      </CardContent>
    </Card>
  );
}

export type { ItemFilters };
