/* eslint-disable @next/next/no-img-element */
"use client";

import { cn } from "@/lib/utils";
import { IconShoppingCartPlus } from "@tabler/icons-react";
import { useCallback, useState } from "react";
import Coin from "../common/coin";
import GameButton from "../common/game.button";
import { STATE_LABELS } from "./constants.item-shop";
import { useAddToCart } from "./hooks.item-shop";
import { ItemDetailsDialog } from "./item-details.item-shop";
import { ShopItem } from "./types.item-shop";
import { getItemMeta, isItemUnavailable } from "./utils.item-shop";

type ItemCardProps = {
  item: ShopItem;
};

function ItemCard({ item }: ItemCardProps) {
  const { state, tag, variant } = getItemMeta(item);
  const { addToCart } = useAddToCart();
  const [detailOpen, setDetailOpen] = useState(false);

  const unavailable = isItemUnavailable(item);

  const handleAddToCart = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      addToCart(item);
    },
    [addToCart, item],
  );

  return (
    <>
      <div
        className={cn(
          "group/item shape-main cursor-pointer",
          "item-card relative rounded-lg aspect-auto md:aspect-square border border-gray-700 overflow-hidden p-px group",
          "transition-all duration-300 ease-out hover:border-gray-500 hover:shadow-lg hover:shadow-black/30",
          "before:absolute before:-inset-1 before:bg-linear-to-tr before:via-50% before:via-transparent before:shadow-[0_0_0_20px_var(--background)] before:-z-1",
          "after:absolute after:-inset-1 after:bg-linear-to-tr after:via-50% after:via-transparent after:shadow-[0_0_0_20px_var(--background)] after:-z-1 after:blur-xl",
          "data-[variant='basic']:before:from-gray-600 data-[variant='basic']:after:from-gray-600 data-[variant='basic']:before:to-gray-600/50 data-[variant='basic']:after:to-gray-600/50",
          "data-[variant='limited']:before:from-primary data-[variant='limited']:after:from-primary data-[variant='limited']:before:to-primary/30 data-[variant='limited']:after:to-primary/30",
          "data-[variant='promo']:before:from-destructive data-[variant='promo']:after:from-destructive data-[variant='promo']:before:to-destructive/30 data-[variant='promo']:after:to-destructive/30",
          "data-[variant='special']:before:from-accent data-[variant='special']:after:from-accent data-[variant='special']:before:to-accent/30 data-[variant='special']:after:to-accent/30",
          "data-[unavailable=true]:grayscale-100",
        )}
        data-state={state}
        data-unavailable={unavailable}
        data-variant={variant}
        onClick={() => setDetailOpen(true)}
      >
        {state && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/70 backdrop-blur-[1.5px]">
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              {STATE_LABELS[state]}
            </span>
          </div>
        )}

        {tag && (
          <div
            className={cn(
              "absolute -left-12 top-6 z-1 w-40 text-center inline-flex justify-center py-1 -rotate-45 origin-center",
              "group-data-[variant='limited']:bg-primary group-data-[variant='limited']:text-primary-foreground",
              "group-data-[variant='promo']:bg-destructive group-data-[variant='promo']:text-white",
              "group-data-[variant='special']:bg-accent group-data-[variant='special']:text-background",
            )}
            data-slot="item-tag"
          >
            <span className="text-[10px] leading-3 font-semibold select-none">
              {tag}
            </span>
          </div>
        )}
        <div
          data-slot="item-content"
          className="size-full shape-main overflow-hidden"
        >
          <section className="size-full flex flex-col justify-between">
            <section className="flex-1 flex flex-col gap-8 items-center justify-center pt-8 pb-4">
              <div className="relative size-18.75 transition-transform duration-200 ease-out group-hover:-translate-y-1 before:absolute before:size-full before:rounded-sm before:-translate-1/2 before:top-1/2 before:left-1/2 before:bg-pattern-concrete before:rotate-45 before:border before:border-gray-800 before:shadow-[inset_4px_4px_8px_var(--background)] [&_img]:scale-60">
                <img
                  alt={item.item_name}
                  src={item.item_image}
                  width={75}
                  height={75}
                  className="object-fill size-full"
                />
              </div>
              <div className="flex flex-col gap-1 w-full items-center text-center">
                <p className="text-xs md:text-[clamp(12px,5vw,14px)] line-clamp-2 w-[90%] md:w-[85%]">
                  {item.item_name}
                </p>
              </div>
            </section>
            <section className="py-4 px-6 bg-gray-900/30 flex items-center justify-between">
              <Coin
                className="**:data-[slot='coin-value']:font-semibold **:data-[slot='coin-value']:text-primary"
                value={item.final_price}
                {...(item.final_price < item.item_price && {
                  prevValue: item.item_price,
                })}
              />
              {!unavailable && !state && (
                <GameButton
                  size="icon-sm"
                  variant="ghost"
                  disabled={unavailable}
                  onClick={handleAddToCart}
                >
                  <IconShoppingCartPlus />
                  <span className="sr-only">Add to cart</span>
                </GameButton>
              )}
            </section>
          </section>
        </div>
      </div>
      <ItemDetailsDialog
        item={item}
        open={detailOpen}
        onOpenChange={setDetailOpen}
      />
    </>
  );
}

export { ItemCard };
