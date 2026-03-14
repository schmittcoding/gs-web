/* eslint-disable @next/next/no-img-element */
"use client";

import { getEffectiveLimit } from "@/lib/cart/utils.cart";
import {
  IconMinus,
  IconPlus,
  IconShoppingCart,
  IconTrash,
} from "@tabler/icons-react";
import Link from "next/link";
import { sileo } from "sileo";
import Coin from "../common/coin";
import GameButton from "../common/game.button";
import { useCart } from "../providers/cart.provider";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";

type CartSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function CartSheet({ open, onOpenChange }: CartSheetProps) {
  const {
    items,
    totalItems,
    totalPrice,
    removeItem,
    updateQuantity,
    clearCart,
  } = useCart();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex flex-col shape-main max-h-[calc(100%-32px)] my-auto mr-4 border border-gray-800 overflow-hidden">
        <SheetHeader className="shape-main bg-gray-900">
          <SheetTitle>Cart ({totalItems})</SheetTitle>
          <SheetDescription>
            Review your items before checkout.
          </SheetDescription>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 text-muted-foreground">
            <IconShoppingCart className="size-12 opacity-20" />
            <p className="text-sm">Your cart is empty</p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-4 space-y-2">
              {items.map((item) => (
                <div
                  key={item.product_num}
                  className="flex items-center gap-3 shape-main border border-gray-700 bg-gray-900/30 p-2.5"
                >
                  <div className="relative size-10 shrink-0 rounded bg-gray-800 overflow-hidden">
                    <img
                      alt={item.item_name}
                      src={item.item_image}
                      className="object-contain size-full"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate">
                      {item.item_name}
                    </p>
                    <Coin
                      className="**:data-[slot='coin-value']:text-primary"
                      size="sm"
                      value={item.final_price * item.quantity}
                    />
                  </div>
                  <div className="flex items-center gap-0.5">
                    <GameButton
                      variant="ghost"
                      size="icon-xs"
                      onClick={() =>
                        updateQuantity(item.product_num, item.quantity - 1)
                      }
                    >
                      <IconMinus />
                    </GameButton>
                    <span className="w-5 text-center text-xs tabular-nums">
                      {item.quantity}
                    </span>
                    <GameButton
                      variant="ghost"
                      size="icon-xs"
                      onClick={() => {
                        const updated = updateQuantity(
                          item.product_num,
                          item.quantity + 1,
                        );
                        if (!updated) {
                          const limit = getEffectiveLimit(
                            item.remaining_purchase_limit,
                            item.item_stock,
                          );
                          sileo.warning({
                            description: `You can only add up to ${limit} of ${item.item_name}.`,
                          });
                        }
                      }}
                    >
                      <IconPlus />
                    </GameButton>
                  </div>
                  <GameButton
                    variant="ghost"
                    size="icon-xs"
                    className="text-muted-foreground hover:text-destructive"
                    onClick={() => removeItem(item.product_num)}
                  >
                    <IconTrash />
                  </GameButton>
                </div>
              ))}
            </div>

            <SheetFooter className="bg-gray-800">
              <div className="flex items-center justify-between w-full">
                <span className="text-sm text-muted-foreground">Total</span>
                <Coin
                  className="**:data-[slot='coin-value']:text-base **:data-[slot='coin-value']:font-bold **:data-[slot='coin-value']:text-primary"
                  value={totalPrice}
                />
              </div>
              <div className="flex gap-2 w-full">
                <GameButton variant="ghost" size="sm" onClick={clearCart}>
                  Clear
                </GameButton>

                <GameButton
                  asChild
                  size="sm"
                  className="flex-1"
                  onClick={() => onOpenChange(false)}
                >
                  <Link href="/checkout">Proceed to Checkout</Link>
                </GameButton>
              </div>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
