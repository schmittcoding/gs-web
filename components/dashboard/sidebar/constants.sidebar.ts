import { IconRankings, IconUser } from "@/components/icons";
import {
  IconAffiliateFilled,
  IconDownload,
  IconExchangeFilled,
  IconLayoutDashboardFilled,
  IconTagsFilled,
} from "@tabler/icons-react";
import { MenuItem } from "./types.sidebar";

export const sidebarMenu: Record<string, MenuItem[]> = {
  main: [
    {
      id: "dashboard",
      icon: IconLayoutDashboardFilled,
      path: "/",
    },
    {
      id: "item-shop",
      icon: IconTagsFilled,
      path: "/item-shop",
    },
    {
      id: "rankings",
      icon: IconRankings,
      path: "/rankings",
    },
  ],
  game: [
    {
      id: "referral",
      icon: IconAffiliateFilled,
      path: "/referral",
    },
    {
      id: "downloads",
      icon: IconDownload,
      path: "/downloads",
    },
  ],
  account: [
    {
      id: "transactions",
      icon: IconExchangeFilled,
      path: "/transactions",
    },
    {
      id: "profile",
      icon: IconUser,
      path: "/profile",
    },
  ],
};
