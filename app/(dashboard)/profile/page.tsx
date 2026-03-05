import ProfileOverviewTab from "@/components/profile/overview/tab.overview";
import { ProfileTransactionsTab } from "@/components/profile/transactions/tab.transactions";
import ProfileDetails from "@/components/profile/user-details/details.profile";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { requireSession } from "@/lib/auth/session.auth";

import { UserProfile } from "@/types/profile";
import {
  IconDeviceGamepad2,
  IconReceipt,
  IconShoppingCart,
  IconTrophy,
} from "@tabler/icons-react";

// function ProfileUserCard() {
//   const { user } = useSession();

//   return (
//     <Card>
//       <CardContent className="flex flex-col items-center gap-4 pt-6">
//         <Avatar size="lg" className="size-20">
//           <AvatarFallback className="text-xl font-bold shape-hexagon">
//             {initials}
//           </AvatarFallback>
//         </Avatar>
//         <div className="flex flex-col items-center gap-1 text-center">
//           <h2 className="text-lg font-semibold">{user.user_name}</h2>
//           <div className="text-muted-foreground flex items-center gap-1.5 text-sm">
//             <IconMail className="size-3.5" />
//             <span>{user.user_email}</span>
//           </div>
//           <Badge variant="secondary" className="mt-1 capitalize">
//             {user.user_role}
//           </Badge>
//         </div>
//       </CardContent>

//       <Separator />

//       <CardContent className="space-y-3">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-2 text-sm text-muted-foreground">
//             <IconCoin className="text-amber-500 size-4" />
//             <span>R-Coins</span>
//           </div>
//           <span className="font-semibold tabular-nums">
//             {user.web_points.toLocaleString()}
//           </span>
//         </div>
//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-2 text-sm text-muted-foreground">
//             <IconStarFilled className="text-purple-500 size-4" />
//             <span>Mileage</span>
//           </div>
//           <span className="font-semibold tabular-nums">
//             {user.mileage_points.toLocaleString()}
//           </span>
//         </div>
//       </CardContent>

//       <Separator />

//       <CardContent className="space-y-2">
//         <h3 className="mb-2 text-xs font-medium tracking-wider uppercase text-muted-foreground">
//           Account Actions
//         </h3>
//         <Button variant="outline" className="justify-start w-full gap-2">
//           <IconLock data-icon="inline-start" />
//           Change Password
//         </Button>
//         <Button variant="outline" className="justify-start w-full gap-2">
//           <IconKey data-icon="inline-start" />
//           Change Pincode
//         </Button>
//       </CardContent>
//     </Card>
//   );
// }

// function TransactionHistoryTab() {
//   return (
//     <Card size="sm">
//       <CardHeader>
//         <CardTitle className="flex items-center gap-2">
//           <IconReceipt className="text-muted-foreground size-4" />
//           Transaction / Recharge History
//         </CardTitle>
//       </CardHeader>
//       <CardContent>
//         <EmptyState message="No transactions yet" />
//       </CardContent>
//     </Card>
//   );
// }

// function ItemShopHistoryTab() {
//   return (
//     <Card size="sm">
//       <CardHeader>
//         <CardTitle className="flex items-center gap-2">
//           <IconShoppingCart className="text-muted-foreground size-4" />
//           Item Shop History
//         </CardTitle>
//       </CardHeader>
//       <CardContent>
//         <EmptyState message="No item shop purchases yet" />
//       </CardContent>
//     </Card>
//   );
// }

// function AchievementsTab() {
//   return (
//     <Card size="sm">
//       <CardHeader>
//         <CardTitle className="flex items-center gap-2">
//           <IconTrophy className="text-muted-foreground size-4" />
//           Achievements
//         </CardTitle>
//       </CardHeader>
//       <CardContent>
//         <EmptyState message="No achievements unlocked yet" />
//       </CardContent>
//     </Card>
//   );
// }

// function EmptyState({ message }: { message: string }) {
//   return (
//     <div className="flex flex-col items-center justify-center py-8 text-sm text-muted-foreground">
//       <p>{message}</p>
//     </div>
//   );
// }

export default async function ProfilePage() {
  const session = await requireSession();
  //   const profile = await getProfile();

  return (
    <main className="h-full p-4 lg:overflow-hidden md:py-4">
      <div className="grid h-full gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
        {/* Left column - User details */}
        <aside className="lg:overflow-y-auto">
          <ProfileDetails user={session.user as UserProfile} />
        </aside>

        {/* Right column - Tabs content */}
        <section className="min-w-0 min-h-0">
          <Tabs
            className="h-full gap-4 grid grid-rows-[auto_1fr] overflow-hidden"
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
              <TabsTrigger value="item-shop" className="gap-1.5">
                <IconShoppingCart className="size-3.5" />
                Item Shop
              </TabsTrigger>
              <TabsTrigger value="achievements" className="gap-1.5">
                <IconTrophy className="size-3.5" />
                Achievements
              </TabsTrigger>
            </TabsList>

            <section className="h-full min-h-0 pb-4 lg:overflow-auto">
              <TabsContent value="overview">
                <ProfileOverviewTab />
              </TabsContent>
              <TabsContent value="transactions">
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
