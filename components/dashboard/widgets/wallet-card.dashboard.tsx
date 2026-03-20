import Coin from "@/components/common/coin";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { type User } from "@/lib/auth/api.auth";
import { IconCoinFilled } from "@tabler/icons-react";
import Link from "next/link";

type WalletCardProps = {
  user: User;
};

function WalletCard({ user }: WalletCardProps) {
  return (
    <Card className="col-span-1 relative overflow-hidden shape-main border border-primary/40 h-full min-h-48">
      {/* Glow background */}
      <div className="absolute inset-0 bg-gray-950" />
      <div className="absolute inset-0 bg-linear-to-b from-primary/10 via-primary/5 to-transparent" />
      <div
        className="absolute -top-6 -right-6 h-25 w-25 rounded-full opacity-[0.12] ran-glow-pulse"
        style={{
          background:
            "radial-gradient(circle, var(--color-orange-peel-500), transparent 70%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "url('/images/patterns/diagmonds.png')",
        }}
      />

      {/* Content */}
      <CardContent className="relative flex flex-col justify-between p-4 gap-4">
        <div className="space-y-4">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-primary/70">
            Wallet Balance
          </p>
          <div className="space-y-2">
            <Coin variant="rcoin" value={user.web_points} size="lg" />
            <Coin variant="mcoin" value={user.mileage_points} size="lg" />
          </div>
        </div>

        <Button variant="default" size="sm" className="w-full gap-2" asChild>
          <Link href="/recharge">
            <IconCoinFilled className="size-4" />
            Recharge Now
          </Link>
        </Button>
      </CardContent>

      {/* Bottom accent */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-0.5 bg-primary" />
    </Card>
  );
}

export { WalletCard };
