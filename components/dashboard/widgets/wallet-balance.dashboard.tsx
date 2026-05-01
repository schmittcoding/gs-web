"use client";

import Coin from "@/components/common/coin";
import GameButton from "@/components/common/game.button";
import { useSession } from "@/components/providers/session.provider";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function WalletBalanceWidget() {
  const { user } = useSession();

  return (
    <Card className="h-max" variant="primary">
      <CardContent className="py-4 flex flex-col gap-4">
        <h3 className="font-semibold uppercase text-lg">Wallet Balance</h3>
        <section className="space-y-2">
          <Coin value={user.web_points} size="lg" />
          <Coin value={user.mileage_points} size="lg" variant="mcoin" />
        </section>

        <GameButton size="lg" className="w-full gap-2 flex" asChild>
          <Link href="/recharge">Recharge Now</Link>
        </GameButton>
      </CardContent>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-0.5 bg-primary" />
    </Card>
  );
}
