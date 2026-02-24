import DashboardHeader from "@/components/dashboard/header.dashboard";
import DashboardSidebar from "@/components/dashboard/sidebar.dashboard";
import { SidebarProvider } from "@/components/ui/sidebar";
import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="relative grid grid-rows-[64px_calc(100svh-64px)]">
      <DashboardHeader />
      <SidebarProvider className="h-[calc(100svh-64px)] min-h-max">
        <DashboardSidebar />
        {children}
      </SidebarProvider>
    </div>
  );
}
