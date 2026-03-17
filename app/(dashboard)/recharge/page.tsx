import RechargeCallbackToast from "@/components/recharge/callback-toast.recharge";
import RechargeItemCard from "@/components/recharge/item-card.recharge";
import { Suspense } from "react";
import { getRechargeDetails } from "./actions";

export default async function RechargePage() {
  const data = await getRechargeDetails();

  return (
    <main className="h-full overflow-y-auto p-4 space-y-8">
      <Suspense>
        <RechargeCallbackToast />
      </Suspense>
      {Object.entries(data).map(([gateway, { denomination, details }]) => (
        <section key={gateway} className="space-y-2">
          <p className="text-2xl font-semibold">{gateway}</p>
          <section className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {denomination?.map((item) => (
              <RechargeItemCard
                key={item.id}
                denomination={item}
                gateway={details}
              />
            ))}
          </section>
        </section>
      ))}
    </main>
  );
}
