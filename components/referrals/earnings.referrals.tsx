import GameButton from "@/components/common/game.button";
import { IconGift, IconUsers } from "@tabler/icons-react";

type ReferralEarningsProps = {
  referralUsage: number;
};

export function ReferralEarnings({ referralUsage }: ReferralEarningsProps) {
  return (
    <section className="border-t lg:border-t-0 lg:border-l border-dashed border-primary/30 pt-5 lg:pt-0 lg:pl-8 lg:w-64 xl:w-72 shrink-0">
      <section className="shape-main border border-primary/30 bg-gray-950/80 overflow-hidden h-full flex flex-col">
        {/* Header */}
        <section className="px-5 py-3 bg-gray-900/60 border-b border-primary/20 flex items-center gap-2">
          <IconGift className="text-primary size-4 shrink-0" />
          <p className="text-[10px] font-semibold uppercase tracking-widest text-primary">
            Your Rewards
          </p>
        </section>

        {/* Visual */}
        <section className="flex-1 flex flex-col items-center justify-center gap-4 px-5 py-6 relative">
          {/* Ambient glow */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, var(--color-orange-peel-500), transparent 70%)",
            }}
          />

          {/* Treasure chest icon cluster */}
          <section className="relative">
            <div className="size-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
              <IconGift className="size-8 text-primary" />
            </div>
            <div className="absolute -top-1 -right-1 size-5 rounded-full bg-primary flex items-center justify-center">
              <span className="text-[9px] font-black text-gray-950">4</span>
            </div>
          </section>

          <section className="text-center space-y-0.5">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              Claimable Rewards
            </p>
            <p className="text-3xl font-black tabular-nums text-foreground">
              4
            </p>
          </section>

          <GameButton size="sm" className="w-full" disabled>
            View Rewards
          </GameButton>
        </section>

        {/* Total referrals stat */}
        <section className="border-t border-primary/20 px-5 py-3 flex items-center gap-2.5">
          <IconUsers className="text-primary size-4 shrink-0" />
          <section>
            <p className="tabular-nums text-base font-bold leading-none">
              {referralUsage}
            </p>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mt-0.5">
              Total Referrals
            </p>
          </section>
        </section>
      </section>
    </section>
  );
}
