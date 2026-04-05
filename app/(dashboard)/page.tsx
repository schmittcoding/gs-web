import { CharacterStats } from "@/components/dashboard/widgets/dashboard-stats.dashboard";
import { RecentTransactions } from "@/components/dashboard/widgets/recent-transactions.dashboard";
import { StatCard } from "@/components/dashboard/widgets/stat-card.dashboard";
import {
  TopRankings,
  TopRankingsSkeleton,
} from "@/components/dashboard/widgets/top-rankings.dashboard";
import { WalletCard } from "@/components/dashboard/widgets/wallet-card.dashboard";
import { WelcomeCard } from "@/components/dashboard/widgets/welcome-card.dashboard";
import { GvgStandingsDialog } from "@/components/events/dialog.gvg-standings";
import EventPromotion from "@/components/promotions/event.promotion";
import { requireSession } from "@/lib/auth/session.auth";
import {
  IconArrowBigUpLinesFilled,
  IconDeviceGamepad2,
  IconWifi,
} from "@tabler/icons-react";
import type { Metadata } from "next";
import { Suspense } from "react";
import { getCurrentEvent, getGuildLeaderboard } from "./events/actions";
import { getCharacters, getProfile } from "./profile/actions";

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "Your Ran Online GS dashboard. View your account overview, characters, and server announcements.",
  robots: { index: false, follow: false },
};

export default async function DashboardPage() {
  const [session, profile, characters, { event, is_registration_available }] =
    await Promise.all([
      requireSession(),
      getProfile(),
      getCharacters(1, 50),
      getCurrentEvent(),
    ]);

  const gvgRankings = event?.event_id
    ? await getGuildLeaderboard(event.event_id, 1, 5)
    : null;

  const activeCharacters = characters.data.filter((c) => c.cha_deleted === 0);
  const highestLevel = activeCharacters.reduce(
    (max, char) => Math.max(max, char.cha_level),
    0,
  );
  const onlineCount = characters.data.filter(
    (char) => char.cha_online === 1,
  ).length;

  return (
    <main className="h-full p-4 overflow-auto space-y-3">
      <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <WelcomeCard
          user={session.user}
          characters={characters}
          profile={profile.data!}
        />
        <WalletCard user={session.user} />

        <StatCard
          icon={<IconDeviceGamepad2 className="size-6" />}
          label="Characters"
          value={characters.total_items}
        />
        <StatCard
          icon={<IconArrowBigUpLinesFilled className="size-6" />}
          label="Highest Level"
          value={highestLevel > 0 ? highestLevel : "—"}
          accentColor="text-yellow-400"
        />
        <StatCard
          icon={<IconWifi className="size-6" />}
          label="Online Now"
          value={onlineCount}
          accentColor="text-green-400"
        />
      </section>
      <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <section className="col-span-1 md:col-span-3 lg:col-span-4 space-y-3">
          <CharacterStats characters={characters} />
          <RecentTransactions />
        </section>
        <section className=" col-span-2">
          <Suspense fallback={<TopRankingsSkeleton />}>
            <TopRankings />
          </Suspense>
        </section>
      </section>
      {event?.event_id && is_registration_available && <EventPromotion />}
      {event?.event_id &&
        !is_registration_available &&
        gvgRankings &&
        gvgRankings.rankings.length > 0 && (
          <GvgStandingsDialog
            eventId={event.event_id}
            eventName={event.event_name}
            season={event.season}
            rankings={gvgRankings.rankings}
          />
        )}
    </main>
  );
}
