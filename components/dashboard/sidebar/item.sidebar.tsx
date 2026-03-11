"use client";

import {
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuItem } from "./types.sidebar";

export default function SidebarItem(item: MenuItem) {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();

  return (
    <SidebarMenuItem data-id={item.id}>
      <SidebarMenuButton
        className="justify-center [&_svg]:size-8 py-5 text-gray-500 not-data-active:hover:text-gray-400 hover:bg-transparent data-active:text-foreground data-active:bg-transparent fill-gray-400"
        data-active={
          item.id === "dashboard"
            ? pathname === item.path
            : pathname.startsWith(item.path)
        }
        asChild
      >
        <Link href={item.path} onClick={() => setOpenMobile(false)}>
          <item.icon />
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
