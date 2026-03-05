"use client";

import { IconLogout2, IconSettingsFilled } from "@tabler/icons-react";
import { Fragment } from "react/jsx-runtime";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
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
  useSidebar,
} from "../ui/sidebar";
import { sidebarMenu } from "./sidebar/constants.sidebar";
import SidebarItem from "./sidebar/item.sidebar";

function SidebarMenuContent() {
  return (
    <>
      <SidebarContent>
        {Object.entries(sidebarMenu).map(([group, menuItems], i, a) => (
          <Fragment key={group}>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu className="space-y-2">
                  {menuItems.map((item) => (
                    <SidebarItem key={item.id} {...item} />
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
    </>
  );
}

function MobileSidebar() {
  const { openMobile, setOpenMobile } = useSidebar();

  return (
    <Sheet open={openMobile} onOpenChange={setOpenMobile}>
      <SheetContent
        side="left"
        className="bg-sidebar text-sidebar-foreground w-18 p-0 [&>button]:hidden"
        showCloseButton={false}
      >
        <SheetHeader className="sr-only">
          <SheetTitle>Navigation</SheetTitle>
          <SheetDescription>Main navigation menu</SheetDescription>
        </SheetHeader>
        <div className="flex h-full w-full flex-col px-2 py-4">
          <SidebarMenuContent />
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default function DashboardSidebar() {
  return (
    <>
      <MobileSidebar />
      <Sidebar
        className="relative h-full px-2 py-4 border-none w-18 hidden md:flex bg-transparent"
        collapsible="none"
        variant="inset"
      >
        <SidebarMenuContent />
      </Sidebar>
    </>
  );
}
