import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "Your Ran Online GS dashboard. View your account overview, characters, and server announcements.",
  robots: { index: false, follow: false },
};

export default function DashboardPage() {
  return (
    <main className="space-y-4">
      {/* <section className="flex items-center gap-2">
        <GameButton size="xs">Button XS</GameButton>
        <GameButton size="sm">Button SM</GameButton>
        <GameButton size="default">Button BS</GameButton>
        <GameButton size="lg">Button LG</GameButton>
        <GameButton size="icon-lg">
          <IconShoppingBag />
        </GameButton>
        <GameButton size="icon">
          <IconShoppingBag />
        </GameButton>
        <GameButton size="icon-sm">
          <IconShoppingBag />
        </GameButton>
        <GameButton size="icon-xs">
          <IconShoppingBag />
        </GameButton>
      </section>
      <section className="flex items-center gap-2">
        <GameButton variant="outline" size="xs">
          Button XS
        </GameButton>
        <GameButton variant="outline" size="sm">
          Button SM
        </GameButton>
        <GameButton variant="outline" size="default">
          Button BS
        </GameButton>
        <GameButton variant="outline" size="lg">
          Button LG
        </GameButton>
        <GameButton variant="outline" size="icon-lg">
          <IconShoppingBag />
        </GameButton>
        <GameButton variant="outline" size="icon">
          <IconShoppingBag />
        </GameButton>
        <GameButton variant="outline" size="icon-sm">
          <IconShoppingBag />
        </GameButton>
        <GameButton variant="outline" size="icon-xs">
          <IconShoppingBag />
        </GameButton>
      </section>
      <section className="flex items-center gap-2">
        <GameButton variant="ghost" size="xs">
          Button XS
        </GameButton>
        <GameButton variant="ghost" size="sm">
          Button SM
        </GameButton>
        <GameButton variant="ghost" size="default">
          Button BS
        </GameButton>
        <GameButton variant="ghost" size="lg">
          Button LG
        </GameButton>
        <GameButton variant="ghost" size="icon-lg">
          <IconShoppingBag />
        </GameButton>
        <GameButton variant="ghost" size="icon">
          <IconShoppingBag />
        </GameButton>
        <GameButton variant="ghost" size="icon-sm">
          <IconShoppingBag />
        </GameButton>
        <GameButton variant="ghost" size="icon-xs">
          <IconShoppingBag />
        </GameButton>
      </section> */}
    </main>
  );
}
