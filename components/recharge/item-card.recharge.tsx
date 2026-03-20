"use client";

import { formatCurrency } from "@/lib/formatters";
import GameButton from "../common/game.button";
import { IconGameCoins } from "../icons";
import { Card, CardContent } from "../ui/card";
import RechargeDialog from "./dialog.recharge";
import { RechargeDenomination, RechargeGateway } from "./types.recharge";

type RechargeItemCardProps = {
  denomination: RechargeDenomination;
  gateway?: RechargeGateway;
};

export default function RechargeItemCard({
  denomination,
  gateway,
}: RechargeItemCardProps) {
  return (
    <Card className="aspect-square item-card">
      <CardContent className="flex flex-col items-center justify-center gap-2">
        <IconGameCoins className="size-16 md:size-24" />
        <div className="text-center">
          <p className="text-2xl font-bold leading-5">
            {formatCurrency(denomination.amount)}
          </p>
          <p className="text-xl font-semibold text-gray-500">R-Coins</p>
        </div>
      </CardContent>
      <section className="w-full">
        <RechargeDialog denomination={denomination} gateway={gateway}>
          <GameButton className="w-full">
            {formatCurrency(denomination.price, 2, denomination.currency)}
          </GameButton>
        </RechargeDialog>
      </section>
    </Card>
  );
}
