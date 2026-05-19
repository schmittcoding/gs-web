/* eslint-disable @next/next/no-img-element */
"use client";

import { logoutAction } from "@/app/(dashboard)/profile/actions";
import { IconLogout2 } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { Fragment, useCallback, useTransition } from "react";
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
import { useSession } from "../providers/session.provider";

function SidebarMenuContent() {
  const router = useRouter();
  const { user } = useSession();
  const [isPending, startTransition] = useTransition();

  const handleLogout = useCallback(() => {
    router.push("/login");
    startTransition(() => logoutAction());
  }, [router]);

  return (
    <>
      <SidebarContent className="bg-transparent lg:bg-gray-900 max-h-max py-2 rounded-3xl m-auto w-max">
        {Object.entries(sidebarMenu).map(([group, menuItems], i, a) => (
          <Fragment key={group}>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu className="space-y-2">
                  {menuItems
                    .filter(
                      (item) => !item.isAdminOnly || user.user_role === "admin",
                    )
                    .map((item) => (
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
                <SidebarMenuButton
                  onClick={handleLogout}
                  disabled={isPending}
                  className="justify-center [&_svg]:size-8 py-5 text-gray-500 not-data-active:hover:text-gray-400 hover:bg-transparent data-active:text-foreground data-active:bg-transparent fill-gray-400"
                >
                  <IconLogout2 />
                  <span className="hidden max-sm:block text-lg">Logout</span>
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
        className="bg-sidebar border-gray-800 text-sidebar-foreground w-18 p-0 [&>button]:hidden"
        showCloseButton={false}
      >
        <SheetHeader className="sr-only">
          <SheetTitle>Navigation</SheetTitle>
          <SheetDescription>Main navigation menu</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}


export default function DashboardSidebar() {
  return (
    <>
      <MobileSidebar />
      <Sidebar
        className="relative h-svh border-none hidden w-max md:flex md:ml-5 bg-transparent py-4"
        collapsible="none"
        variant="inset"
      >
        <img src="/logo.png" alt="Ran Online GS" className="w-30" />
        <SidebarMenuContent />
      </Sidebar>
    </>
  );
}
