"use client";

import { purchaseItems } from "@/app/(dashboard)/item-shop/actions";
import { isCartItemUnavailable } from "@/lib/cart/utils.cart";
import { IconShoppingCart } from "@tabler/icons-react";
import { useMemo, useState, useTransition } from "react";
import GameButton from "../../common/game.button";
import { useCart } from "../../providers/cart.provider";
import { useSession } from "../../providers/session.provider";
import BalanceSection from "./balance.checkout";
import OrderSummarySection from "./order-summary.checkout";
import PriceBreakdown from "./price-breakdown.checkout";
import UnavailableSection from "./unavailable.checkout";

export function CheckoutContent() {
  const { items, isSyncing, clearCart } = useCart();
  const { user, setUser } = useSession();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

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

  const handleCheckout = () => {
    setError(null);
    startTransition(async () => {
      const payload = availableItems.map((item) => ({
        product_num: item.product_num,
        quantity: item.quantity,
      }));

      const result = await purchaseItems(payload);

      if (!result.success) {
        setError(result.message);
        return;
      }

      setUser((prev) => ({
        ...prev,
        web_points: prev.web_points - totalPrice,
      }));
      clearCart();
    });
  };

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
        <UnavailableSection items={unavailableItems} />
        <OrderSummarySection items={availableItems} />
      </div>

      {/* Right column — sticky purchase summary */}
      {availableItems.length > 0 && (
        <div className="w-full shrink-0 space-y-6 lg:w-80">
          <PriceBreakdown
            totalOriginalPrice={totalOriginalPrice}
            totalDiscount={totalDiscount}
            totalPrice={totalPrice}
          />
          <BalanceSection
            balance={balance}
            totalPrice={totalPrice}
            remainingBalance={remainingBalance}
            canAfford={canAfford}
          />
          {error && <p className="text-sm text-destructive">{error}</p>}
          <GameButton
            className="w-full"
            onClick={handleCheckout}
            disabled={!canAfford || isPending || isSyncing}
            loading={isPending || isSyncing}
          >
            {isPending ? "Processing…" : "Checkout"}
          </GameButton>
        </div>
      )}
    </div>
  );
}
