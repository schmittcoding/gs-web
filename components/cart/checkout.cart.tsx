/* eslint-disable @next/next/no-img-element */
"use client";

import { isCartItemUnavailable } from "@/lib/cart/utils.cart";
import { formatCurrency } from "@/lib/formatters";
import { cn } from "@/lib/utils";
import { IconAlertTriangle, IconShoppingCart } from "@tabler/icons-react";
import { useMemo } from "react";
import Coin from "../common/coin";
import { useCart } from "../providers/cart.provider";
import { useSession } from "../providers/session.provider";
import { getUnavailableReason } from "./utils.cart";

export function CheckoutContent() {
  const { items, isSyncing } = useCart();
  const { user } = useSession();

  const { availableItems, unavailableItems } = useMemo(() => {
    const available: typeof items = [];
    const unavailable: typeof items = [];
    for (const item of items) {
      if (isCartItemUnavailable(item)) {
        unavailable.push(item);
      } else {
        available.push(item);
      }
    }
    return { availableItems: available, unavailableItems: unavailable };
  }, [items]);

  const totalPrice = useMemo(
    () =>
      availableItems.reduce((sum, i) => sum + i.final_price * i.quantity, 0),
    [availableItems],
  );

  const totalOriginalPrice = useMemo(
    () => availableItems.reduce((sum, i) => sum + i.item_price * i.quantity, 0),
    [availableItems],
  );

  const totalDiscount = totalOriginalPrice - totalPrice;
  const balance = user.web_points;
  const remainingBalance = balance - totalPrice;
  const canAfford = remainingBalance >= 0;

  if (items.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-3 text-muted-foreground">
        <IconShoppingCart className="size-12 opacity-20" />
        <p className="text-sm">Your cart is empty</p>
        <p className="text-xs">Add items from the Item Shop to get started.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-6 overflow-y-auto lg:flex-row lg:overflow-hidden">
      {/* Left column — scrollable item list */}
      <div className="min-w-0 flex-1 space-y-6 lg:overflow-y-auto lg:pr-2">
        {isSyncing && (
          <p className="text-xs text-muted-foreground animate-pulse">
            Syncing item availability…
          </p>
        )}

        {/* Unavailable items */}
        {unavailableItems.length > 0 && (
          <section className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-destructive">
              <IconAlertTriangle className="size-4" />
              <h2>
                Unavailable ({unavailableItems.length}{" "}
                {unavailableItems.length === 1 ? "item" : "items"})
              </h2>
            </div>
            <p className="text-xs text-muted-foreground">
              These items will not be included in your order.
            </p>
            <div className="rounded-lg border border-destructive/30 overflow-hidden divide-y divide-gray-700 shape-main bg-gray-900">
              {unavailableItems.map((item) => (
                <div
                  key={item.product_num}
                  className="flex items-center gap-3 bg-gray-900/30 p-3 opacity-80 grayscale"
                >
                  <div className="relative size-10 shrink-0 rounded bg-gray-800 overflow-hidden">
                    <img
                      alt={item.item_name}
                      src={item.item_image}
                      className="object-contain size-full"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {item.item_name}
                    </p>
                    <span className="text-xs font-semibold text-destructive">
                      {getUnavailableReason(item)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Available item list */}
        {availableItems.length > 0 ? (
          <section className="space-y-2">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Order Summary ({availableItems.length}{" "}
              {availableItems.length === 1 ? "item" : "items"})
            </h2>
            <div className="rounded-lg border border-gray-700 overflow-hidden divide-y divide-gray-700 shape-main">
              {availableItems.map((item) => {
                const hasDiscount = item.final_price < item.item_price;
                const subtotal = item.final_price * item.quantity;

                return (
                  <div
                    key={item.product_num}
                    className="flex gap-3 bg-gray-900 p-3"
                  >
                    <div className="relative size-10 shrink-0 rounded bg-gray-800 overflow-hidden">
                      <img
                        alt={item.item_name}
                        src={item.item_image}
                        className="object-contain size-full"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {item.item_name}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>Qty: {item.quantity}</span>
                        {hasDiscount && (
                          <span className="text-destructive">
                            -
                            {Math.round(
                              ((item.item_price - item.final_price) /
                                item.item_price) *
                                100,
                            )}
                            %
                          </span>
                        )}
                      </div>
                      <div>
                        {item.item_description ? (
                          <ul>
                            {item.item_description
                              .split("\n")
                              .map((desc, i) => (
                                <li className="list-inside" key={i}>
                                  <span>{desc}</span>
                                </li>
                              ))}
                          </ul>
                        ) : null}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <Coin
                        className="justify-end **:data-[slot='coin-value']:font-medium **:data-[slot='coin-value']:text-primary"
                        size="sm"
                        value={subtotal}
                      />
                      {hasDiscount && (
                        <Coin
                          className="justify-end **:data-[slot='coin-value']:line-through **:data-[slot='coin-value']:text-muted-foreground [&_svg]:hidden"
                          size="sm"
                          value={item.item_price * item.quantity}
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 py-6 text-muted-foreground">
            <p className="text-sm">All items in your cart are unavailable.</p>
          </div>
        )}
      </div>

      {/* Right column — sticky purchase summary */}
      {availableItems.length > 0 && (
        <div className="w-full shrink-0 space-y-6 lg:w-80">
          <section className="space-y-3">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Price Breakdown
            </h2>
            <div className="shape-main border border-gray-700 bg-gray-950 overflow-hidden">
              <div className="space-y-3 p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <Coin
                    className="**:data-[slot='coin-value']:font-medium"
                    size="sm"
                    value={totalOriginalPrice}
                  />
                </div>

                {totalDiscount > 0 && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-destructive">Discount</span>
                    <span className="text-destructive text-xs font-medium">
                      -{new Intl.NumberFormat("en-US").format(totalDiscount)}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between bg-gray-800 py-2 px-4">
                <span className="font-semibold">Total</span>
                <Coin
                  className="**:data-[slot='coin-value']:text-lg **:data-[slot='coin-value']:font-bold **:data-[slot='coin-value']:text-primary"
                  value={totalPrice}
                />
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Balance
            </h2>
            <div className="shape-main border border-gray-700 bg-gray-950 overflow-hidden">
              <div className="space-y-3 p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    Available R-Coin
                  </span>
                  <Coin
                    className="**:data-[slot='coin-value']:font-medium"
                    size="sm"
                    value={balance}
                  />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Order Total</span>
                  <span className="text-xs font-medium">
                    -{new Intl.NumberFormat("en-US").format(totalPrice)}
                  </span>
                </div>
              </div>
              <div className="bg-gray-800 py-2 px-4">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">After Purchase</span>
                  <Coin
                    className={cn(
                      "**:data-[slot='coin-value']:text-base **:data-[slot='coin-value']:font-bold",
                      canAfford
                        ? "**:data-[slot='coin-value']:text-primary"
                        : "**:data-[slot='coin-value']:text-destructive",
                    )}
                    value={remainingBalance}
                  />
                </div>
                {!canAfford && (
                  <p className="text-xs text-destructive">
                    Insufficient R-Coin balance. You need{" "}
                    {formatCurrency(Math.abs(remainingBalance))} more to
                    complete this purchase.
                  </p>
                )}
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
