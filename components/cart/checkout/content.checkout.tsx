"use client";

import { purchaseItems } from "@/app/(dashboard)/item-shop/actions";
import GameButton from "@/components/common/game.button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { isCartItemUnavailable } from "@/lib/cart/utils.cart";
import { IconReceipt, IconShoppingCart } from "@tabler/icons-react";
import Link from "next/link";
import { useMemo, useTransition } from "react";
import { sileo } from "sileo";
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
    startTransition(async () => {
      const payload = availableItems.map((item) => ({
        product_num: item.product_num,
        quantity: item.quantity,
      }));

      const result = await purchaseItems(payload);

      if (!result.success) {
        sileo.error({
          title: "Transaction failed!",
          description: result.message,
        });
        return;
      }

      setUser((prev) => ({
        ...prev,
        web_points: prev.web_points - totalPrice,
      }));
      clearCart();
      sileo.success({
        title: "Thank you for your purchase!",
        description: "Your items have been sent to your item bank.",
      });
    });
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-2 text-gray-400 text-center">
        <IconShoppingCart className="size-12 opacity-50" />
        <p className="text-xl">No items in your cart</p>
        <p className="mb-4">
          Ready to shop? Check out what’s waiting in the store.
        </p>
        <Link href="/item-shop">
          <GameButton size="lg">Visit item shop</GameButton>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex w-full min-w-0 flex-1 flex-col gap-4 lg:flex-row lg:overflow-hidden">
      {/* Left column — scrollable item list */}
      <div className="min-w-0 flex-1 space-y-6 lg:overflow-y-auto pt-4 lg:pb-4">
        {isSyncing && (
          <p className="text-xs text-muted-foreground animate-pulse">
            Syncing item availability…
          </p>
        )}
        <UnavailableSection items={unavailableItems} />
        <OrderSummarySection syncing={isSyncing} items={availableItems} />
      </div>

      {/* Right column — sticky purchase summary */}
      {availableItems.length > 0 && (
        <div className="w-full lg:w-80 pb-4 lg:pt-4">
          <Card variant="accent">
            <CardHeader>
              <CardTitle>
                <IconReceipt className="size-4" /> Checkout Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="py-4 px-0 space-y-4">
              <PriceBreakdown
                totalOriginalPrice={totalOriginalPrice}
                totalDiscount={totalDiscount}
                totalPrice={totalPrice}
              />
              <Separator />
              <BalanceSection
                balance={balance}
                totalPrice={totalPrice}
                remainingBalance={remainingBalance}
                canAfford={canAfford}
              />
            </CardContent>
            <CardFooter>
              <GameButton
                className="w-full"
                size="default"
                onClick={handleCheckout}
                disabled={!canAfford || isPending || isSyncing}
                loading={isPending}
              >
                {isPending ? "Processing…" : "Checkout"}
              </GameButton>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
}
