import PromoBannerWidget from "@/components/dashboard/widgets/promo-banner.dashboard";
import RecentTransactions from "@/components/dashboard/widgets/recent-transactions.dashboard";
import GoldRankingsWidget, {
  GoldRankingsSkeleton,
} from "@/components/dashboard/widgets/gold-rankings.dashboard";
import WalletBalanceWidget from "@/components/dashboard/widgets/wallet-balance.dashboard";
import type { Metadata } from "next";
import { Suspense } from "react";
import CharacterListWidget, {
  CharacterListSkeleton,
} from "@/components/dashboard/widgets/character-list.dashboard";
import RecentEventsWidget, {
  RecentEventsSkeleton,
} from "@/components/dashboard/widgets/recent-events.dashboard";
import { requireSession } from "@/lib/auth/session.auth";
import ComingSoonWidget from "@/components/dashboard/widgets/coming-soon.dashboard";

const PROMO_SLIDES = [
  {
    src: "https://images.ranonlinegs.com/banners/main-banner.webp",
    alt: "Where warriors rise",
  },
  {
    src: "https://images.ranonlinegs.com/banners/wot3c-match-week4.webp",
    alt: "War of the Three Crowns",
    label: "WOT3C Week 4",
    href: "/events/war-of-the-three-crown",
  },
];

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "Your Ran Online GS dashboard. View your account overview, characters, and server announcements.",
  robots: { index: false, follow: false },
};

export default async function DashboardPage() {
  await requireSession();

  return (
    <main className="h-max p-4 space-y-2 md:pl-0 md:pt-4 md:pb-6 md:pr-6 md:space-y-4">
      <section className="dashboard-layout">
        <section className="col-span-full lg:col-span-4 grid gap-4 grid-cols-4">
          <section className="col-span-full aspect-16/7">
            <PromoBannerWidget slides={PROMO_SLIDES} interval={4500} />
          </section>
          <section className="col-span-full lg:hidden">
            <WalletBalanceWidget />
          </section>
          <section className="hidden lg:block lg:col-span-1 opacity-70 pointer-events-none! select-none">
            <ComingSoonWidget />
          </section>
          <section className="col-span-full lg:col-span-2">
            <Suspense fallback={<GoldRankingsSkeleton />}>
              <GoldRankingsWidget />
            </Suspense>
          </section>
          <section className="col-span-full lg:col-span-1">
            <Suspense fallback={<RecentEventsSkeleton />}>
              <RecentEventsWidget />
            </Suspense>
          </section>
        </section>
        <section className="lg:col-span-1 space-y-4">
          <div className="hidden lg:block">
            <WalletBalanceWidget />
          </div>
          <RecentTransactions />
          <Suspense fallback={<CharacterListSkeleton />}>
            <CharacterListWidget />
          </Suspense>
        </section>
      </section>
    </main>
  );
}
