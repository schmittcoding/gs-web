import {
  IconAffiliateFilled,
  IconDownload,
  IconExchangeFilled,
  IconLayoutDashboardFilled,
  IconLogout2,
  IconSettingsFilled,
  IconTagsFilled,
} from "@tabler/icons-react";
import { Fragment } from "react/jsx-runtime";
import { IconRankings, IconUser } from "../icons";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "../ui/sidebar";

const menu = {
  main: [
    {
      id: "dashboard",
      icon: IconLayoutDashboardFilled,
      path: "/dashboard",
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
      path: "/profiles",
    },
  ],
};

export default function DashboardSidebar() {
  return (
    <Sidebar
      className="h-[calc(100svh-105px)] w-18 relative border-none px-2 py-4"
      collapsible="none"
      variant="inset"
    >
      <SidebarContent>
        {Object.entries(menu).map(([group, menuItems], i, a) => (
          <Fragment key={group}>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu className="space-y-2">
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton className="justify-center [&_svg]:size-8 py-5 text-gray-500 not-data-active:hover:text-gray-400 hover:bg-transparent data-active:text-foreground data-active:bg-transparent fill-gray-400">
                        <item.icon />
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            {i !== a.length - 1 && <SidebarSeparator className="my-2" />}
          </Fragment>
        ))}
      </SidebarContent>
      <SidebarFooter className="p-0">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              <SidebarMenuItem>
                <SidebarMenuButton className="justify-center [&_svg]:size-8 py-5 text-gray-500 not-data-active:hover:text-gray-400 hover:bg-transparent data-active:text-foreground data-active:bg-transparent fill-gray-400">
                  <IconSettingsFilled />
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarSeparator className="my-2" />
              <SidebarMenuItem>
                <SidebarMenuButton className="justify-center [&_svg]:size-8 py-5 text-gray-500 not-data-active:hover:text-gray-400 hover:bg-transparent data-active:text-foreground data-active:bg-transparent fill-gray-400">
                  <IconLogout2 />
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
}
