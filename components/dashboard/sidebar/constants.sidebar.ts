import { IconRankings, IconStreamer, IconUser } from "@/components/icons";
import {
  IconBasketFilled,
  IconCrown,
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
      id: "events",
      icon: IconCrown,
      path: "/events",
      label: "Events",
    },
    {
      id: "support-a-streamer",
      icon: IconStreamer,
      path: "/sas",
      label: "Support a Streamer",
      isAdminOnly: true,
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
