/* eslint-disable @next/next/no-img-element */
import DashboardHeader from "@/components/dashboard/header.dashboard";
import DashboardSidebar from "@/components/dashboard/sidebar.dashboard";
import { SessionProvider } from "@/components/providers/session.provider";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getSession } from "@/lib/auth/session.auth";
import { AUTH_CONFIG } from "@/lib/constants";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
  header: ReactNode;
};

export default async function Layout({ children, header }: LayoutProps) {
  const session = await getSession();

  if (!session) {
    redirect(AUTH_CONFIG.loginPath);
  }

  return (
    <SessionProvider expiresAt={session.expires_at} user={session.user}>
      <SidebarProvider className="bg-transparent">
        <div className="relative grid h-svh w-full grid-rows-[var(--header-size)_1fr]">
          <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
            <img
              src="/images/background/bg-main.png"
              alt=""
              className="object-cover object-top opacity-5 size-full"
            />
            <div className="absolute inset-0 bg-linear-to-t from-background from-10% to-85%" />
          </div>
          <DashboardHeader user={session.user} pageHeader={header} />
          <div className="flex min-h-0">
            <DashboardSidebar />
            <SidebarInset className="overflow-hidden bg-transparent">
              {children}
            </SidebarInset>
          </div>
        </div>
      </SidebarProvider>
    </SessionProvider>
  );
}
