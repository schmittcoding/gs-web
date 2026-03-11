/* eslint-disable @next/next/no-img-element */
"use client";

import { CartItem } from "@/lib/cart/types.cart";
import {
  IconMinus,
  IconPlus,
  IconShoppingCart,
  IconTrash,
} from "@tabler/icons-react";
import Coin from "../common/coin";
import GameButton from "../common/game.button";
import { useCart } from "../providers/cart.provider";

type CartContentProps = {
  items: CartItem[];
  totalPrice: number;
};

export function CartContent({
  items: initialItems,
  totalPrice: initialTotalPrice,
}: CartContentProps) {
  const {
    items: cartItems,
    totalPrice: cartTotalPrice,
    removeItem,
    updateQuantity,
    clearCart,
  } = useCart();

  const items =
    cartItems.length > 0 || initialItems.length === 0
      ? cartItems
      : initialItems;
  const totalPrice =
    cartItems.length > 0 || initialItems.length === 0
      ? cartTotalPrice
      : initialTotalPrice;

  if (items.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-3 text-muted-foreground">
        <IconShoppingCart className="size-12 opacity-20" />
        <p className="text-sm">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="flex-1 overflow-y-auto space-y-3">
        {items.map((item) => (
          <div
            key={item.product_num}
            className="flex items-center gap-3 rounded-lg border border-gray-700 bg-gray-900/30 p-3"
          >
            <div className="relative size-12 shrink-0 rounded bg-gray-800 overflow-hidden">
              <img
                alt={item.item_name}
                src={item.item_image}
                className="object-contain size-full"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{item.item_name}</p>
              <Coin
                className="**:data-[slot='coin-value']:text-primary"
                size="sm"
                value={item.final_price}
              />
            </div>
            <div className="flex items-center gap-1">
              <GameButton
                variant="ghost"
                size="icon-xs"
                onClick={() =>
                  updateQuantity(item.product_num, item.quantity - 1)
                }
              >
                <IconMinus />
              </GameButton>
              <span className="w-6 text-center text-sm tabular-nums">
                {item.quantity}
              </span>
              <GameButton
                variant="ghost"
                size="icon-xs"
                onClick={() =>
                  updateQuantity(item.product_num, item.quantity + 1)
                }
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

      <div className="border-t border-gray-700 pt-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Total</span>
          <Coin
            className="**:data-[slot='coin-value']:text-lg **:data-[slot='coin-value']:font-bold **:data-[slot='coin-value']:text-primary"
            value={totalPrice}
          />
        </div>
        <div className="flex gap-2">
          <GameButton
            variant="ghost"
            size="sm"
            className="flex-1"
            onClick={clearCart}
          >
            Clear Cart
          </GameButton>
        </div>
      </div>
    </div>
  );
}
