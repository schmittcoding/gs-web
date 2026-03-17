import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "Your Ran Online GS dashboard. View your account overview, characters, and server announcements.",
  robots: { index: false, follow: false },
};

export default function DashboardPage() {
  return <main className="space-y-4 grid grid-cols-6 p-4 gap-4"></main>;
}
