/* eslint-disable @next/next/no-img-element */
"use client";

import { getEffectiveLimit } from "@/lib/cart/utils.cart";
import { cn } from "@/lib/utils";
import { IconShoppingCartPlus } from "@tabler/icons-react";
import { sileo } from "sileo";
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
import ReadOnlyField from "../ui/input/read-only";
import { Separator } from "../ui/separator";
import { PURCHASE_LIMIT_LABELS } from "./constants.item-shop";
import { EItemCategory, ShopItem } from "./types.item-shop";
import { getItemMeta } from "./utils.item-shop";

type ItemDetailDialogProps = {
  item: ShopItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function ItemDetailDialog({
  item,
  open,
  onOpenChange,
}: ItemDetailDialogProps) {
  const { addItem } = useCart();

  if (!item) return null;

  const { state, tag, variant } = getItemMeta(item);

  const isUnavailable =
    (typeof item.remaining_purchase_limit === "number" &&
      item.remaining_purchase_limit === 0) ||
    item.item_stock <= 0;

  const handleAddToCart = () => {
    if (isUnavailable) return;

    const added = addItem({
      product_num: item.product_num,
      item_name: item.item_name,
      item_image: item.item_image,
      final_price: item.final_price,
      item_price: item.item_price,
      remaining_purchase_limit: item.remaining_purchase_limit,
      item_stock: item.item_stock,
    });

    if (!added) {
      const limit = getEffectiveLimit(item.remaining_purchase_limit, item.item_stock);
      sileo.warning({
        description: `You can only add up to ${limit} of ${item.item_name}.`,
      });
      return;
    }

    onOpenChange(false);

    sileo.success({
      description: `${item.item_name} has been added to your cart.`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md lg:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex-1 truncate">
            {item.item_name}
          </DialogTitle>
          <DialogDescription>
            {EItemCategory[item.item_category]}
          </DialogDescription>
        </DialogHeader>
        <section
          className={cn(
            "px-4 grid grid-cols-1 gap-4",
            // "md:grid-cols-[200px_max-content_1fr]"
          )}
        >
          {/* <section className="max-sm:hidden"></section>
          <Separator className="max-sm:hidden" orientation="vertical" /> */}
          <section className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <img
                  alt={item.item_name}
                  src={item.item_image}
                  className="object-fill size-12.5"
                />
                <div>
                  <div className="flex gap-2 items-center">
                    <p className="text-lg font-semibold">{item.item_name}</p>
                    <Badge
                      className={cn(
                        "text-[10px]",
                        "data-[variant='limited']:bg-primary data-[variant='limited']:text-primary-foreground",
                        "data-[variant='promo']:bg-destructive data-[variant='promo']:text-white",
                        "data-[variant='special']:bg-accent data-[variant='special']:text-background",
                      )}
                      data-variant={variant}
                    >
                      {tag}
                    </Badge>
                  </div>
                  <p className="text-gray-400/80">
                    {EItemCategory[item.item_category]}
                  </p>
                </div>
              </div>
              <Coin
                className="**:data-[slot='coin-value']:font-semibold **:data-[slot='coin-value']:text-primary"
                size="lg"
                value={item.final_price}
                {...(item.final_price < item.item_price && {
                  prevValue: item.item_price,
                })}
              />
            </div>
            <Separator />
            <div className="space-y-2">
              <div className="space-y-1">
                <ReadOnlyField label="Item Description">
                  {item.item_description ? (
                    <ul>
                      {item.item_description.split("\n").map((desc, i) => (
                        <li className="list-inside" key={i}>
                          <span>{desc}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </ReadOnlyField>
              </div>
              <div className="space-y-2">
                <ReadOnlyField label="Available Stock">
                  {item.item_stock}
                </ReadOnlyField>
                {typeof item.item_purchase_limit === "number" && (
                  <>
                    <ReadOnlyField label="Purchase Limit / Purchase Limit Type">
                      {`${item.item_purchase_limit} / ${
                        PURCHASE_LIMIT_LABELS[
                          item.purchase_limit_text as keyof typeof PURCHASE_LIMIT_LABELS
                        ]
                      }`}
                    </ReadOnlyField>
                    <ReadOnlyField label="Remaining Purchase Limit">
                      {item.remaining_purchase_limit}
                    </ReadOnlyField>
                  </>
                )}
              </div>
            </div>
          </section>
        </section>
        <DialogFooter>
          {!isUnavailable && !state ? (
            <GameButton disabled={isUnavailable} onClick={handleAddToCart}>
              <IconShoppingCartPlus />
              Add to cart
            </GameButton>
          ) : (
            <GameButton disabled>
              {state === "sold" ? "Sold Out" : "Limit Reached"}
            </GameButton>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
