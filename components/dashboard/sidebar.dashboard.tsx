"use client";

import { logoutAction } from "@/app/(dashboard)/profile/actions";
import {
  IconBrandDiscordFilled,
  IconBrandFacebookFilled,
  IconBrandYoutubeFilled,
  IconLogout2,
} from "@tabler/icons-react";
import Link from "next/link";
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

function SidebarMenuContent() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleLogout = useCallback(() => {
    router.push("/login");
    startTransition(() => logoutAction());
  }, [router]);

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
                <SidebarMenuButton
                  className="justify-center [&_svg]:size-8 py-5 text-[#cc181e] hover:text-[#cc181e]/80 hover:bg-transparent active:bg-transparent"
                  asChild
                >
                  <Link
                    href={process.env.NEXT_PUBLIC_YOUTUBE_LINK!}
                    target="_blank"
                  >
                    <IconBrandYoutubeFilled />
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  className="justify-center [&_svg]:size-8 py-5 text-[#7289da] hover:text-[#7289da]/80 hover:bg-transparent active:bg-transparent"
                  asChild
                >
                  <Link
                    href={process.env.NEXT_PUBLIC_DISCORD_LINK!}
                    target="_blank"
                  >
                    <IconBrandDiscordFilled />
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  className="justify-center [&_svg]:size-8 py-5 text-[#3b5998] hover:text-[#3b5998]/80 hover:bg-transparent active:bg-transparent"
                  asChild
                >
                  <Link
                    href={process.env.NEXT_PUBLIC_FACEBOOK_LINK!}
                    target="_blank"
                  >
                    <IconBrandFacebookFilled />
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {/* <SidebarMenuItem>
                <SidebarMenuButton className="justify-center [&_svg]:size-8 py-5 text-gray-500 not-data-active:hover:text-gray-400 hover:bg-transparent data-active:text-foreground data-active:bg-transparent fill-gray-400">
                  <IconSettingsFilled />
                </SidebarMenuButton>
              </SidebarMenuItem> */}
              <SidebarSeparator className="my-2" />
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
        <div className="flex h-full w-full flex-col px-2 py-4 space-y-10">
          <img
            className="mx-auto w-[150px]"
            src="/logo.png"
            alt="Ran Online GS"
          />
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
        className="relative h-full px-2 py-4 border-r border-gray-900 w-18 hidden md:flex bg-gray-950"
        collapsible="none"
        variant="inset"
      >
        <SidebarMenuContent />
      </Sidebar>
    </>
  );
}
