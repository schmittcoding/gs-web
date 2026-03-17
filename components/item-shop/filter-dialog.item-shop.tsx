"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IconFilter } from "@tabler/icons-react";
import { default as GameButton } from "../common/game.button";
import ItemShopFilters, { type ItemFilters } from "./filters.item-shop";
import { EItemCategory } from "./types.item-shop";

type FilterDialogProps = {
  filters: ItemFilters;
  onFiltersChange: (filters: ItemFilters) => void;
  availableCategories: Set<EItemCategory>;
  activeFilterCount: number;
};

function FilterDialog({
  filters,
  onFiltersChange,
  availableCategories,
  activeFilterCount,
}: FilterDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <GameButton variant="outline" size="default" className="lg:hidden">
          <IconFilter />
          {activeFilterCount > 0 && activeFilterCount}
        </GameButton>
      </DialogTrigger>
      <DialogContent className="gap-0 border-none" showCloseButton>
        <DialogHeader className="sr-only">
          <DialogTitle>Filters</DialogTitle>
        </DialogHeader>
        <div className="**:data-[slot='filters-clear']:mr-4!">
          <ItemShopFilters
            filters={filters}
            onFiltersChange={onFiltersChange}
            availableCategories={availableCategories}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export { FilterDialog };
