"use client";

import GameButton from "@/components/common/game.button";
import { copyText } from "@/lib/utils";
import { EligibleCharacter } from "@/types/referral";
import { IconAffiliateFilled, IconCopy } from "@tabler/icons-react";
import { useState } from "react";
import { sileo } from "sileo";
import { GenerateCodeDialog } from "./generate-dialog.referrals";
import { ReferralHowItWorks } from "./how-it-works.referrals";

type ReferralCodeDisplayProps = {
  initialCode: string | null;
  canRefer: boolean;
  characters: EligibleCharacter[];
};

export function ReferralCodeDisplay({
  initialCode,
  canRefer,
  characters,
}: ReferralCodeDisplayProps) {
  const [currentCode, setCurrentCode] = useState(initialCode);

  async function handleCopy() {
    if (!currentCode) return;
    await copyText(currentCode);
    sileo.success({ description: "Referral code copied!" });
  }

  return (
    <section className="flex-1 space-y-6 lg:space-y-10">
      <section className="flex flex-col lg:flex-row gap-6 lg:gap-4 justify-between lg:items-center">
        {/* Header */}
        <section className="flex items-start gap-3">
          <IconAffiliateFilled className="text-primary size-8 mt-0.5 shrink-0" />
          <section>
            <p className="uppercase text-base font-black text-primary tracking-wide">
              Your Referral Code
            </p>
            <p className="text-muted-foreground text-xs mt-0.5">
              Share your code with your friends and earn amazing rewards!
            </p>
          </section>
        </section>

        {/* Code area */}
        {currentCode ? (
          <section className="space-y-3">
            {/* Code box */}
            <section className="shape-main flex items-center justify-between gap-4 px-5 py-3 bg-gray-950 border border-primary/40">
              <p className="text-2xl md:text-3xl font-black tabular-nums tracking-[0.2em] text-foreground">
                {currentCode}
              </p>
              <button
                type="button"
                onClick={handleCopy}
                aria-label="Copy referral code"
                className="shape-main p-2 transition-colors bg-gray-900 hover:bg-primary/20 hover:border-primary/40 border border-transparent cursor-pointer group shrink-0"
              >
                <IconCopy className="size-5 text-gray-500 group-hover:text-primary transition-colors" />
              </button>
            </section>
          </section>
        ) : canRefer ? (
          <GenerateCodeDialog
            characters={characters}
            onSuccess={setCurrentCode}
          >
            <GameButton className="ran-pulse">
              Generate Referral Code
            </GameButton>
          </GenerateCodeDialog>
        ) : null}
      </section>

      <ReferralHowItWorks />
    </section>
  );
}
