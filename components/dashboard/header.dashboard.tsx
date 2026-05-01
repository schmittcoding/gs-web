"use client";

import {
  IconBrandDiscordFilled,
  IconBrandFacebookFilled,
  IconBrandYoutubeFilled,
  IconDownload,
  IconMenu2,
  IconShoppingCart,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CartSheet } from "../cart/sheet.cart";
import Coin from "../common/coin";
import GameButton from "../common/game.button";
import { useCart } from "../providers/cart.provider";
import { useSession } from "../providers/session.provider";
import { Badge } from "../ui/badge";
import { useSidebar } from "../ui/sidebar";
import { cn } from "@/lib/utils";

type DashboardHeaderProps = {
  downloadLink: string | null;
};

export default function DashboardHeader({
  downloadLink,
}: DashboardHeaderProps) {
  const { toggleSidebar } = useSidebar();
  const { totalItems: cartItemCount } = useCart();
  const { user } = useSession();
  const [cartOpen, setCartOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const container = headerRef.current?.parentElement;
    if (!container) return;
    const onScroll = () => setScrolled(container.scrollTop > 0);
    container.addEventListener("scroll", onScroll, { passive: true });
    return () => container.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      ref={headerRef}
      className={cn(
        "flex items-center justify-between w-full px-5 py-5 md:pl-0 h-max sticky top-0 z-10 transition-all duration-200 md:static md:bg-transparent",
        scrolled && "bg-gray-900 py-2 px-4",
      )}
    >
      <GameButton
        variant="ghost"
        size="icon-sm"
        className="md:hidden"
        onClick={toggleSidebar}
      >
        <IconMenu2 />
        <span className="sr-only">Open menu</span>
      </GameButton>
      <Image
        src="/logo.png"
        alt="Ran Online GS"
        width={scrolled ? 80 : 120}
        height={scrolled ? 48 : 72}
        className={cn(
          "md:hidden transition-all duration-200",
          scrolled && "opacity-80",
        )}
      />
      <section className="hidden md:flex gap-2 items-center">
        <GameButton className="mr-4 hidden" variant="outline">
          Game Guide
        </GameButton>
        <section className="flex gap-4">
          <GameButton
            className="justify-center p-0 min-w-0! size-max hover:bg-transparent active:bg-transparent text-[#cc181e] hover:text-[#cc181e]/90"
            variant="ghost"
            size="icon-lg"
          >
            <Link href={process.env.NEXT_PUBLIC_YOUTUBE_LINK!} target="_blank">
              <IconBrandYoutubeFilled className="size-9" />
            </Link>
          </GameButton>
          <GameButton
            className="justify-center p-0 min-w-0! size-max hover:bg-transparent active:bg-transparent text-[#7289da] hover:text-[#7289da]/90"
            variant="ghost"
            size="icon-lg"
          >
            <Link href={process.env.NEXT_PUBLIC_DISCORD_LINK!} target="_blank">
              <IconBrandDiscordFilled className="size-9" />
            </Link>
          </GameButton>
          <GameButton
            className="justify-center p-0 min-w-0! size-max hover:bg-transparent active:bg-transparent text-[#3b5998] hover:text-[#3b5998]/90"
            variant="ghost"
            size="icon-lg"
          >
            <Link href={process.env.NEXT_PUBLIC_FACEBOOK_LINK!} target="_blank">
              <IconBrandFacebookFilled className="size-9" />
            </Link>
          </GameButton>
        </section>
      </section>
      <section className="flex items-center gap-4">
        {downloadLink && (
          <GameButton
            variant="default"
            size="lg"
            className="hidden lg:inline-flex ran-btn-pulse"
            asChild
          >
            <Link
              className="flex gap-1.5"
              href={downloadLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconDownload className="size-5" />
              <span>Download Client</span>
            </Link>
          </GameButton>
        )}
        <GameButton
          variant="secondary"
          size="icon-lg"
          className="relative transition-all duration-200 max-sm:bg-transparent max-sm:before:hidden max-sm:after:hidden"
          onClick={() => setCartOpen(true)}
        >
          <IconShoppingCart className={cn("size-8", scrolled && "size-6! md:size-8")} />
          {cartItemCount > 0 && (
            <Badge className="absolute top-1 right-1 md:top-2 md:right-1.5 size-4 p-0 text-[10px] justify-center">
              {cartItemCount > 99 ? "9+" : cartItemCount}
            </Badge>
          )}
          <span className="sr-only">Cart</span>
        </GameButton>

        <section className="flex items-center gap-2 max-md:hidden">
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
        </section>

        <CartSheet open={cartOpen} onOpenChange={setCartOpen} />
      </section>
    </header>
  );
}
