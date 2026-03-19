/* eslint-disable @next/next/no-img-element */
import DashboardHeader from "@/components/dashboard/header.dashboard";
import DashboardSidebar from "@/components/dashboard/sidebar.dashboard";
import { CartProvider } from "@/components/providers/cart.provider";
import { SessionProvider } from "@/components/providers/session.provider";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getSession } from "@/lib/auth/session.auth";
import { getCartFromCookiesServer } from "@/lib/cart/actions.cart";
import { AUTH_CONFIG } from "@/lib/constants";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
  header: ReactNode;
};

export default async function Layout({ children, header }: LayoutProps) {
  const [session, cartItems] = await Promise.all([
    getSession(),
    getCartFromCookiesServer(),
  ]);

  if (!session) {
    redirect(AUTH_CONFIG.loginPath);
  }

  return (
    <SessionProvider expiresAt={session.expires_at} user={session.user}>
      <CartProvider initialItems={cartItems}>
        <SidebarProvider className="bg-transparent">
          <div className="relative grid h-svh w-full grid-rows-[var(--header-size)_1fr]">
            <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
              <img
                src="https://images.ranonlinegs.com/assets/background/bg-main.webp"
                alt=""
                className="object-cover object-top opacity-5 size-full"
              />
              <div className="absolute inset-0 bg-linear-to-t from-background from-10% to-85%" />
            </div>
            <DashboardHeader pageHeader={header} />
            <div className="flex min-w-0 min-h-0">
              <DashboardSidebar />
              <SidebarInset className="overflow-hidden bg-transparent">
                {children}
              </SidebarInset>
            </div>
          </div>
        </SidebarProvider>
      </CartProvider>
    </SessionProvider>
  );
}
