/* eslint-disable @next/next/no-img-element */
"use client";

import { cn } from "@/lib/utils";
import Coin from "../common/coin";
import { STATE_LABELS } from "./constants.item-shop";
import { ShopItem } from "./types.item-shop";
import { getItemMeta } from "./utils.item-shop";

type ItemCardProps = {
  item: ShopItem;
};

export default function ItemCard({ item }: ItemCardProps) {
  const { state, tag, variant } = getItemMeta(item);

  return (
    <div
      className={cn(
        "group/item shape-main",
        "item-card relative rounded-lg aspect-auto md:aspect-square border border-gray-700 overflow-hidden p-px group",
        "before:absolute before:-inset-1 before:bg-linear-to-tr before:via-50% before:via-transparent before:shadow-[0_0_0_20px_var(--background)] before:-z-1",
        "after:absolute after:-inset-1 after:bg-linear-to-tr after:via-50% after:via-transparent after:shadow-[0_0_0_20px_var(--background)] after:-z-1 after:blur-xl",
        "data-[variant='basic']:before:from-gray-600 data-[variant='basic']:after:from-gray-600 data-[variant='basic']:before:to-gray-600/50 data-[variant='basic']:after:to-gray-600/50",
        "data-[variant='limited']:before:from-primary data-[variant='limited']:after:from-primary data-[variant='limited']:before:to-primary/30 data-[variant='limited']:after:to-primary/30",
        "data-[variant='promo']:before:from-destructive data-[variant='promo']:after:from-destructive data-[variant='promo']:before:to-destructive/30 data-[variant='promo']:after:to-destructive/30",
        "data-[variant='special']:before:from-accent data-[variant='special']:after:from-accent data-[variant='special']:before:to-accent/30 data-[variant='special']:after:to-accent/30",
        "data-[unavailable=true]:grayscale-100",
      )}
      data-state={state}
      data-unavailable={
        (typeof item.remaining_purchase_limit === "number" &&
          item.remaining_purchase_limit === 0) ||
        item.item_stock <= 0
      }
      data-variant={variant}
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
            "item-tag absolute top-[12%] -left-[6%] md:top-[10%] md:-left-[10%] w-38 md:w-40 lg:w-38 xl:w-34 min-h-4 z-1 -rotate-45 text-center",
            "group-data-[variant='limited']:bg-primary group-data-[variant='limited']:text-primary-foreground",
            "group-data-[variant='promo']:bg-destructive group-data-[variant='promo']:text-white",
            "group-data-[variant='special']:bg-accent group-data-[variant='special']:text-background",
          )}
          data-slot="item-tag"
        >
          <span className="text-xs font-semibold select-none">{tag}</span>
        </div>
      )}
      <div
        data-slot="item-content"
        className="size-full shape-main overflow-hidden"
      >
        <section className="size-full flex flex-col justify-between">
          <section className="flex-1 flex flex-col gap-8 items-center justify-center pt-8 pb-4">
            <div className="relative size-18.75 before:absolute before:size-full before:rounded-sm before:-translate-1/2 before:top-1/2 before:left-1/2 before:bg-pattern-concrete before:rotate-45 before:border before:border-gray-800 before:shadow-[inset_4px_4px_8px_var(--background)] [&_img]:scale-60">
              <img
                alt={item.item_name}
                src={item.item_image}
                className="object-fill size-full"
              />
            </div>
            <div className="flex flex-col gap-1 w-full items-center text-center">
              <p className="text-xs md:text-[clamp(12px,5vw,14px)] line-clamp-2 w-[90%] md:w-[85%]">
                {item.item_name}
              </p>
            </div>
          </section>
          <section className="py-4 px-6 bg-gray-900/30">
            <Coin
              className="**:data-[slot='coin-value']:font-semibold **:data-[slot='coin-value']:text-primary"
              value={item.final_price}
              {...(item.final_price < item.item_price && {
                prevValue: item.item_price,
              })}
            />
          </section>
        </section>
      </div>
    </div>
    // <div
    //   className={cn(
    //     "group/item relative flex flex-col overflow-hidden rounded-xl ring-1 ring-foreground/10 bg-card transition-all duration-300",
    //     "hover:ring-foreground/20 hover:shadow-lg hover:-translate-y-0.5",
    //     RARITY_GLOW[item.rarity],
    //     !item.available && "opacity-60 grayscale-[40%]"
    //   )}
    // >
    //   {/* Image area */}
    //   <div className="relative aspect-square overflow-hidden bg-background/50">
    //     {/* Placeholder pattern */}
    //     <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-card to-background">
    //       <div className="flex flex-col items-center gap-2 text-muted-foreground/30">
    //         <IconStar className="size-10" />
    //         <span className="text-[10px] uppercase tracking-widest">
    //           {item.category}
    //         </span>
    //       </div>
    //     </div>

    //     {/* Discount badge */}
    //     {isDiscounted && (
    //       <div className="absolute top-2 left-2 z-10">
    //         <Badge className="bg-destructive text-white border-none text-[10px] font-bold">
    //           -{discountPercent}%
    //         </Badge>
    //       </div>
    //     )}

    //     {/* Rarity indicator line */}
    //     <div
    //       className={cn(
    //         "absolute bottom-0 left-0 right-0 h-0.5 transition-all duration-300",
    //         item.rarity === "Common" && "bg-gray-500/40",
    //         item.rarity === "Uncommon" && "bg-green-500/60",
    //         item.rarity === "Rare" && "bg-blue-500/60",
    //         item.rarity === "Epic" && "bg-purple-500/60",
    //         item.rarity === "Legendary" &&
    //           "bg-primary/80 shadow-[0_0_12px] shadow-primary/30"
    //       )}
    //     />

    //     {/* Sold out overlay */}
    //     {!item.available && (
    //       <div className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-[1px]">
    //         <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
    //           Sold Out
    //         </span>
    //       </div>
    //     )}
    //   </div>

    //   {/* Info */}
    //   <div className="flex flex-1 flex-col gap-2 p-3">
    //     <div className="flex items-start justify-between gap-2">
    //       <h3 className="text-sm font-semibold leading-tight line-clamp-1">
    //         {item.name}
    //       </h3>
    //       <Badge
    //         variant="outline"
    //         className={cn(
    //           "shrink-0 text-[10px] border",
    //           RARITY_STYLES[item.rarity]
    //         )}
    //       >
    //         {item.rarity}
    //       </Badge>
    //     </div>

    //     <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
    //       {item.description}
    //     </p>

    //     <div className="mt-auto flex items-center justify-between pt-2">
    //       <div className="flex items-baseline gap-1.5">
    //         <span className="text-base font-bold text-primary">
    //           {item.price.toLocaleString()}
    //         </span>
    //         {isDiscounted && (
    //           <span className="text-xs text-muted-foreground line-through">
    //             {item.originalPrice!.toLocaleString()}
    //           </span>
    //         )}
    //         <span className="text-[10px] text-muted-foreground uppercase">
    //           RC
    //         </span>
    //       </div>

    //       <Button
    //         size="icon-sm"
    //         variant={item.available ? "default" : "destructive"}
    //         disabled={!item.available}
    //         className="shrink-0"
    //       >
    //         <IconShoppingCart className="size-3.5" />
    //       </Button>
    //     </div>
    //   </div>
    // </div>
  );
}
