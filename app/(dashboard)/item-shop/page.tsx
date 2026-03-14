import ItemShopContent from "@/components/item-shop/content.item-shop";
import type { Metadata } from "next";
import { getItemShop } from "./actions";

export const metadata: Metadata = {
  title: "Item Shop",
  description:
    "Browse and purchase in-game items for Ran Online GS. Weapons, armor, potions, and exclusive gear.",
  robots: { index: false, follow: false },
};

export default async function ItemShopPage() {
  const items = await getItemShop();

  return (
    <main className="h-full p-4 pb-0 overflow-hidden flex flex-col">
      <ItemShopContent items={items} />
    </main>
  );
}
