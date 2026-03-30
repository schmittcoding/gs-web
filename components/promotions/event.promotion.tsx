/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import GameButton from "../common/game.button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

export default function EventPromotion() {
  return (
    <Dialog defaultOpen>
      <DialogContent
        className="sm:max-w-2xl **:data-[slot=dialog-close]:[&_svg]:text-gray-500 **:data-[slot=dialog-close]:hover:[&_svg]:text-gray-300"
        showCloseButton
      >
        <DialogHeader className="sr-only">
          <DialogTitle>Event Promotion</DialogTitle>
        </DialogHeader>
        <section className="relative size-full">
          <img
            src="https://images.ranonlinegs.com/promotions/wo3c.webp"
            alt="Ran Online GS | Events | War of the Three Crown"
          />
          <Link href="/events" className="absolute bottom-10 right-10">
            <GameButton>Check event mechanics</GameButton>
          </Link>
        </section>
      </DialogContent>
    </Dialog>
  );
}
