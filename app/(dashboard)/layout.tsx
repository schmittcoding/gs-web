import DashboardHeader from "@/components/dashboard/header.dashboard";
import DashboardSidebar from "@/components/dashboard/sidebar.dashboard";
import { SessionProvider } from "@/components/providers/session.provider";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getSession } from "@/lib/auth/session.auth";
import { AUTH_CONFIG } from "@/lib/constants";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

export default async function Layout({ children }: PropsWithChildren) {
  const session = await getSession();

  if (!session) {
    redirect(AUTH_CONFIG.loginPath);
  }

  return (
    <SessionProvider expiresAt={session.expires_at} user={session.user}>
      <SidebarProvider>
        <div className="relative grid h-svh w-full grid-rows-[var(--header-size)_1fr]">
          <DashboardHeader user={session.user} />
          <div className="flex min-h-0">
            <DashboardSidebar />
            <SidebarInset className="overflow-hidden">
              {children}
            </SidebarInset>
          </div>
        </div>
      </SidebarProvider>
    </SessionProvider>
  );
}
