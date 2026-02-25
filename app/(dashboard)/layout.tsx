import DashboardHeader from "@/components/dashboard/header.dashboard";
import DashboardSidebar from "@/components/dashboard/sidebar.dashboard";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="relative grid grid-rows-[105px_calc(100svh-105px)]">
      <DashboardHeader />
      <SidebarProvider className="h-full">
        <DashboardSidebar />
        <SidebarInset>{children}</SidebarInset>
      </SidebarProvider>
    </div>
  );
}
