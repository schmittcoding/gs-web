import { RankingsContent } from "@/components/rankings/content.rankings";
import type { Metadata } from "next";
import { getGoldRankings } from "./actions";

const ITEMS_PER_PAGE = process.env.NEXT_PUBLIC_DEFAULT_RANKINGS_LIMIT || 10;

export const metadata: Metadata = {
  title: "Rankings",
  description:
    "View the top players in Ran Online GS. Gold rankings, level rankings, and more.",
  robots: { index: false, follow: false },
};

export default async function RankingsPage() {
  const [topThree, firstPage] = await Promise.all([
    getGoldRankings(1, 3),
    getGoldRankings(1, Number(ITEMS_PER_PAGE)),
  ]);

  return (
    <main className="h-full p-4 overflow-auto">
      <RankingsContent initialTopThree={topThree} initialPage={firstPage} />
    </main>
  );
}
