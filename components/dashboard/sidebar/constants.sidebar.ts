import { IconRankings, IconUser } from "@/components/icons";
import {
  IconAffiliateFilled,
  IconBasketFilled,
  IconCrownFilled,
  IconExchangeFilled,
  IconLayoutDashboardFilled,
} from "@tabler/icons-react";
import { MenuItem } from "./types.sidebar";

export const sidebarMenu: Record<string, MenuItem[]> = {
  main: [
    {
      id: "dashboard",
      icon: IconLayoutDashboardFilled,
      path: "/",
      label: "Dashboard",
    },
    {
      id: "item-shop",
      icon: IconBasketFilled,
      path: "/item-shop",
      label: "Item Shop",
    },
    {
      id: "rankings",
      icon: IconRankings,
      path: "/rankings",
      label: "Rankings",
    },
  ],
  game: [
    {
      id: "referrals",
      icon: IconAffiliateFilled,
      path: "/referrals",
      label: "Referrals",
      className:
        "before:absolute before:top-2 before:right-0 before:size-2.5 before:rounded-full before:bg-primary before:z-1 before:animate-pulse",
    },
    {
      id: "events",
      icon: IconCrownFilled,
      path: "/events",
      label: "Events",
      className:
        "before:absolute before:top-2 before:right-0 before:size-2.5 before:rounded-full before:bg-primary before:z-1 before:animate-pulse",
    },
  ],
  account: [
    {
      id: "recharge",
      icon: IconExchangeFilled,
      path: "/recharge",
      label: "Recharge",
    },
    {
      id: "profile",
      icon: IconUser,
      path: "/profile",
      label: "My Profile",
    },
  ],
};
