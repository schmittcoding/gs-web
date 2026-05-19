"use client";

import GameButton from "@/components/common/game.button";
import { ApplyStreamerDialog } from "./apply-dialog.streamer";
import { CreatorApplicationStatusResponse } from "@/types/creator";
import { IconAffiliate, IconChevronRight } from "@tabler/icons-react";

type StreamerHeroProps = {
  application: CreatorApplicationStatusResponse | null;
  isStreamer: boolean;
};

export function StreamerHeroSection({
  application,
  isStreamer,
}: StreamerHeroProps) {
  const hasApplied = !!application;

  return (
    <section className="w-full h-48 sm:h-64 md:h-80 overflow-hidden relative shape-main border border-gray-800">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://images.ranonlinegs.com/banners/sas-banner.webp"
        alt="Support a Streamer — Ran Online GS"
        className="object-cover size-full object-top"
      />
      <div className="absolute inset-0 bg-linear-to-r from-background/95 via-background/70 to-transparent" />
      <div
        className="absolute -left-20 top-0 h-full w-64 opacity-[0.08]"
        style={{
          background:
            "radial-gradient(ellipse, var(--color-orange-peel-500), transparent 70%)",
        }}
      />
      <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-10 gap-3 max-w-xl">
        <div className="flex items-center gap-2">
          <IconAffiliate className="size-5 text-primary" />
          <p className="text-[10px] font-semibold uppercase tracking-widest text-primary">
            Support-a-Streamer Program
          </p>
        </div>
        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight leading-tight">
          Earn Commissions <br />
          <span className="text-primary">Playing What You Love</span>
        </h2>
        <p className="text-xs text-gray-400 max-w-xs leading-relaxed">
          Stream, share, and earn. Join Ran Online GS&apos;s streamer program
          and receive commissions when your community supports you.
        </p>
        {!isStreamer && (
          <div className="flex items-center gap-3 mt-1">
            <ApplyStreamerDialog application={application}>
              <GameButton size="sm" className="gap-1.5">
                {hasApplied ? "View Application" : "Apply as Streamer"}
                <IconChevronRight className="size-4" />
              </GameButton>
            </ApplyStreamerDialog>
          </div>
        )}
      </div>
    </section>
  );
}
