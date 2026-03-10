import ItemShopContent from "@/components/item-shop/content.item-shop";
import { getItemShop } from "./actions";

export default async function ItemShopPage() {
  const items = await getItemShop();

  return (
    <main className="h-full p-4 pb-0 overflow-hidden flex flex-col">
      <ItemShopContent items={items} />
    </main>
  );
}
