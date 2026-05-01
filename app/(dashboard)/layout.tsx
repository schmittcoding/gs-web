 
import DashboardHeader from "@/components/dashboard/header.dashboard";
import DashboardSidebar from "@/components/dashboard/sidebar.dashboard";
import { CartProvider } from "@/components/providers/cart.provider";
import { SessionProvider } from "@/components/providers/session.provider";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getSession } from "@/lib/auth/session.auth";
import { AUTH_CONFIG } from "@/lib/constants";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { getClientDownloadLink } from "./actions";

type LayoutProps = {
  children: ReactNode;
};

export default async function Layout({ children }: LayoutProps) {
  const [session, downloadLink] = await Promise.all([
    getSession(),
    getClientDownloadLink(),
  ]);

  if (!session) {
    redirect(AUTH_CONFIG.loginPath);
  }

  return (
    <SessionProvider expiresAt={session.expires_at} user={session.user}>
      <CartProvider>
        <SidebarProvider className="bg-transparent overflow-hidden h-svh relative gap-4">
          {/* <section className="grid h-svh w-full grid-col-[max-content_1fr]"> */}
          <DashboardSidebar />
          <SidebarInset className="bg-transparent overflow-auto">
            <DashboardHeader downloadLink={downloadLink} />
            {children}
          </SidebarInset>
          {/* </section> */}
        </SidebarProvider>
      </CartProvider>
    </SessionProvider>
  );
}
