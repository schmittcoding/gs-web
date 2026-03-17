"use client";

import { IconMenu2, IconShoppingCart } from "@tabler/icons-react";
import Image from "next/image";
import { useState } from "react";
import { CartSheet } from "../cart/sheet.cart";
import Coin from "../common/coin";
import GameButton from "../common/game.button";
import { useCart } from "../providers/cart.provider";
import { useSession } from "../providers/session.provider";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { useSidebar } from "../ui/sidebar";

type DashboardHeaderProps = {
  pageHeader: React.ReactNode;
};

export default function DashboardHeader({ pageHeader }: DashboardHeaderProps) {
  const { toggleSidebar } = useSidebar();
  const { totalItems: cartItemCount } = useCart();
  const { user } = useSession();
  const [cartOpen, setCartOpen] = useState(false);

  const initials = user.user_name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <header className="flex items-center justify-between w-full px-5 py-2 h-max border-b border-gray-900 bg-gray-950">
      <GameButton
        variant="ghost"
        size="icon-sm"
        className="md:hidden"
        onClick={toggleSidebar}
      >
        <IconMenu2 />
        <span className="sr-only">Open menu</span>
      </GameButton>
      <section className="flex items-center gap-3 max-md:hidden">
        <Image src="/logo.png" alt="Ran Online GS" width={120} height={72} />
        {pageHeader && <div>{pageHeader}</div>}
      </section>
      <Image
        src="/logo.png"
        alt="Ran Online GS"
        width={120}
        height={72}
        className="md:hidden"
      />
      <section className="flex items-center gap-4">
        <GameButton
          variant="ghost"
          size="icon"
          className="relative"
          onClick={() => setCartOpen(true)}
        >
          <IconShoppingCart />
          {cartItemCount > 0 && (
            <Badge className="absolute -top-1 -right-1 size-4 p-0 text-[10px] justify-center">
              {cartItemCount > 99 ? "9+" : cartItemCount}
            </Badge>
          )}
          <span className="sr-only">Cart</span>
        </GameButton>
        <CartSheet open={cartOpen} onOpenChange={setCartOpen} />
        <div className="flex items-center gap-2 max-md:hidden">
          <Avatar size="lg">
            <AvatarFallback className="shape-hexagon bg-primary text-primary-foreground">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-semibold text-gray-400 uppercase">
              {user.user_name}
            </p>
            <Coin
              className="flex-row-reverse gap-1"
              size="sm"
              value={user.web_points}
            />
          </div>
        </div>
      </section>
    </header>
  );
}
