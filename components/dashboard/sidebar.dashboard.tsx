import { Sidebar, SidebarContent } from "../ui/sidebar";

export default function DashboardSidebar() {
  return (
    <Sidebar className="h-[calc(100svh-64px)] relative">
      <SidebarContent></SidebarContent>
    </Sidebar>
  );
}
