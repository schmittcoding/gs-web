/* eslint-disable @next/next/no-img-element */
"use client";

import { cn } from "@/lib/utils";
import { IconShoppingCartPlus } from "@tabler/icons-react";
import { useCallback } from "react";
import Coin from "../common/coin";
import GameButton from "../common/game.button";
import ImageGallery from "../common/image/gallery.image";
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
import { PURCHASE_LIMIT_LABELS, STATE_LABELS } from "./constants.item-shop";
import { useAddToCart } from "./hooks.item-shop";
import { EItemCategory, ShopItem } from "./types.item-shop";
import { getItemMeta, isItemUnavailable } from "./utils.item-shop";

type ItemDetailsDialogProps = {
  item: ShopItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function ItemDetailsDialog({
  item,
  open,
  onOpenChange,
}: ItemDetailsDialogProps) {
  const { addToCart } = useAddToCart();

  const handleAddToCart = useCallback(() => {
    if (!item) return;
    const added = addToCart(item);
    if (added) onOpenChange(false);
  }, [item, addToCart, onOpenChange]);

  if (!item) return null;

  const { state, tag, variant } = getItemMeta(item);
  const unavailable = isItemUnavailable(item);
  const galleryUrls = item.item_gallery.map(({ image_url }) => image_url);
  const hasGallery = galleryUrls.length > 0;
  const hasDiscount = item.final_price < item.item_price;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        data-gallery={hasGallery}
        className="sm:max-w-lg lg:max-w-3xl group data-gallery:lg:max-w-4xl"
      >
        <DialogHeader>
          <DialogTitle className="flex-1 truncate">
            {item.item_name}
          </DialogTitle>
          <DialogDescription>
            {EItemCategory[item.item_category]}
          </DialogDescription>
        </DialogHeader>
        <section className="px-4 flex flex-col gap-4 max-md:flex-col-reverse md:flex-row">
          {hasGallery && (
            <>
              <section className="">
                <ImageGallery
                  className="max-md:**:data-[slot='image-gallery-preview']:w-1/3 mx-auto md:w-50 md:shrink-0 group-data-gallery:md:w-62.5"
                  images={galleryUrls}
                />
              </section>
              <Separator className="max-sm:hidden" orientation="vertical" />
            </>
          )}
          <section className="flex-1 space-y-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <img
                  alt={item.item_name}
                  src={item.item_image}
                  width={50}
                  height={50}
                  className="object-fill size-12.5"
                />
                <div>
                  <div className="flex gap-2 items-center">
                    <p className="text-lg font-semibold">{item.item_name}</p>
                    {!!tag && (
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
                    )}
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
                {...(hasDiscount && { prevValue: item.item_price })}
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
          {!unavailable && !state ? (
            <GameButton onClick={handleAddToCart}>
              <IconShoppingCartPlus />
              Add to cart
            </GameButton>
          ) : (
            <GameButton disabled>
              {state ? STATE_LABELS[state] : "Unavailable"}
            </GameButton>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { ItemDetailsDialog };
