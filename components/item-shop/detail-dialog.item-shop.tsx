/* eslint-disable @next/next/no-img-element */
"use client";

import { cn } from "@/lib/utils";
import { IconShoppingCartPlus } from "@tabler/icons-react";
import Coin from "../common/coin";
import GameButton from "../common/game.button";
import { useCart } from "../providers/cart.provider";
import { Badge } from "../ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Separator } from "../ui/separator";
import { EItemCategory, EPurchaseLimitType, ShopItem } from "./types.item-shop";
import { getItemMeta } from "./utils.item-shop";

type ItemDetailDialogProps = {
  item: ShopItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const CATEGORY_LABELS: Record<number, string> = {
  [EItemCategory.Bundle]: "Bundle",
  [EItemCategory.Box]: "Box",
  [EItemCategory.Costume]: "Costume",
  [EItemCategory.Pet]: "Pet",
  [EItemCategory.Mount]: "Mount",
  [EItemCategory.Supply]: "Supply",
  [EItemCategory.Enhancer]: "Enhancer",
  [EItemCategory.Skill]: "Skill",
  [EItemCategory.Accessories]: "Accessories",
  [EItemCategory.Exp]: "Exp",
  [EItemCategory.Misc]: "Misc",
};

const LIMIT_TYPE_LABELS: Record<number, string> = {
  [EPurchaseLimitType.Lifetime]: "Lifetime",
  [EPurchaseLimitType.Yearly]: "Yearly",
  [EPurchaseLimitType.Monthly]: "Monthly",
  [EPurchaseLimitType.Daily]: "Daily",
};

export function ItemDetailDialog({
  item,
  open,
  onOpenChange,
}: ItemDetailDialogProps) {
  const { addItem } = useCart();

  if (!item) return null;

  const { state, variant } = getItemMeta(item);

  const isUnavailable =
    (typeof item.remaining_purchase_limit === "number" &&
      item.remaining_purchase_limit === 0) ||
    item.item_stock <= 0;

  const hasDiscount = item.final_price < item.item_price;
  const categoryLabel = CATEGORY_LABELS[item.item_category] ?? "Misc";

  const handleAddToCart = () => {
    addItem({
      product_num: item.product_num,
      item_name: item.item_name,
      item_image: item.item_image,
      final_price: item.final_price,
      item_price: item.item_price,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <DialogTitle className="flex-1 truncate">
              {item.item_name}
            </DialogTitle>
            <Badge variant="outline" className="shrink-0 text-[10px]">
              {categoryLabel}
            </Badge>
          </div>
          <DialogDescription>{item.item_description}</DialogDescription>
        </DialogHeader>

        <div className="px-4 space-y-4">
          {/* Item image */}
          <div
            className={cn(
              "relative mx-auto size-32 before:absolute before:size-full before:rounded-sm before:-translate-1/2 before:top-1/2 before:left-1/2 before:bg-pattern-concrete before:rotate-45 before:border before:border-gray-800 before:shadow-[inset_4px_4px_8px_var(--background)] [&_img]:scale-60",
              isUnavailable && "grayscale",
            )}
          >
            <img
              alt={item.item_name}
              src={item.item_image}
              className="object-fill size-full"
            />
          </div>

          <Separator />

          {/* Details grid */}
          <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            <dt className="text-muted-foreground">Price</dt>
            <dd className="text-right">
              <Coin
                className="justify-end **:data-[slot='coin-value']:font-semibold **:data-[slot='coin-value']:text-primary"
                size="sm"
                value={item.final_price}
                {...(hasDiscount && { prevValue: item.item_price })}
              />
            </dd>

            {hasDiscount && (
              <>
                <dt className="text-muted-foreground">Discount</dt>
                <dd className="text-right text-destructive font-medium">
                  {item.discount_percent}% OFF
                </dd>
              </>
            )}

            <dt className="text-muted-foreground">Stock</dt>
            <dd
              className={cn(
                "text-right font-medium",
                item.item_stock <= 0 && "text-destructive",
              )}
            >
              {item.item_stock > 0
                ? item.item_stock.toLocaleString()
                : "Sold Out"}
            </dd>

            {typeof item.item_purchase_limit === "number" && (
              <>
                <dt className="text-muted-foreground">Purchase Limit</dt>
                <dd className="text-right">
                  {item.item_purchase_limit}
                  {item.item_purchase_limit_type !== undefined && (
                    <span className="text-muted-foreground text-xs ml-1">
                      / {LIMIT_TYPE_LABELS[item.item_purchase_limit_type] ?? ""}
                    </span>
                  )}
                </dd>
              </>
            )}

            {typeof item.remaining_purchase_limit === "number" && (
              <>
                <dt className="text-muted-foreground">Remaining</dt>
                <dd
                  className={cn(
                    "text-right font-medium",
                    item.remaining_purchase_limit === 0 && "text-destructive",
                  )}
                >
                  {item.remaining_purchase_limit}
                </dd>
              </>
            )}

            {item.item_tag && (
              <>
                <dt className="text-muted-foreground">Tag</dt>
                <dd className="text-right">
                  <Badge
                    className={cn(
                      "text-[10px]",
                      variant === "special" && "bg-accent text-background",
                    )}
                  >
                    {item.item_tag}
                  </Badge>
                </dd>
              </>
            )}
          </dl>
        </div>

        <DialogFooter className="sm:flex-row">
          {!isUnavailable && !state ? (
            <GameButton
              className="flex-1"
              disabled={isUnavailable}
              onClick={handleAddToCart}
            >
              <IconShoppingCartPlus data-icon="inline-start" />
              Add to Cart
            </GameButton>
          ) : (
            <GameButton className="flex-1" disabled>
              {state === "sold" ? "Sold Out" : "Limit Reached"}
            </GameButton>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
