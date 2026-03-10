import ProfileOverviewTab from "@/components/profile/overview/tab.overview";
import { ProfileTransactionsTab } from "@/components/profile/transactions/tab.transactions";
import ProfileDetails from "@/components/profile/user-details/details.profile";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { requireSession } from "@/lib/auth/session.auth";

import { IconDeviceGamepad2, IconReceipt } from "@tabler/icons-react";
import { getProfile } from "./actions";

export default async function ProfilePage() {
  const [, profile] = await Promise.all([requireSession(), getProfile()]);

  return (
    <main className="h-full p-4 overflow-auto lg:overflow-hidden">
      <div className="grid h-full gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
        {/* Left column - User details */}
        <aside className="lg:overflow-y-auto">
          <ProfileDetails user={profile.data!} />
        </aside>

        {/* Right column - Tabs content */}
        <section className="min-w-0 lg:min-h-0 lg:overflow-hidden">
          <Tabs
            className="gap-4 lg:h-full lg:grid lg:grid-rows-[auto_1fr] lg:overflow-hidden"
            defaultValue="overview"
          >
            <TabsList
              variant="line"
              className="justify-start w-full overflow-x-auto shrink-0"
            >
              <TabsTrigger value="overview" className="gap-1.5">
                <IconDeviceGamepad2 className="size-3.5" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="transactions" className="gap-1.5">
                <IconReceipt className="size-3.5" />
                Transactions
              </TabsTrigger>
              {/* <TabsTrigger value="item-shop" className="gap-1.5">
                <IconShoppingCart className="size-3.5" />
                Item Shop
              </TabsTrigger> */}
            </TabsList>

            <section className="pb-4 lg:pb-0 lg:h-full lg:min-h-0 lg:overflow-auto">
              <TabsContent value="overview">
                <ProfileOverviewTab />
              </TabsContent>
              <TabsContent
                value="transactions"
                forceMount
                className="data-[state=inactive]:hidden"
              >
                <ProfileTransactionsTab />
              </TabsContent>
            </section>
            {/* <TabsContent value="item-shop">
              <ItemShopHistoryTab />
            </TabsContent>
            <TabsContent value="achievements">
              <AchievementsTab />
            </TabsContent> */}
          </Tabs>
        </section>
      </div>
    </main>
  );
}
