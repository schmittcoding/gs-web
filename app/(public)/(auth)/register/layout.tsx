import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Register",
  description:
    "Create your free Ran Online GS account. Join the battlefield — competitive PvP, faction wars, and custom events await.",
  robots: { index: false, follow: true },
  openGraph: {
    title: "Register | Ran Online GS",
    description:
      "Create your free Ran Online GS account. Join the battlefield — competitive PvP, faction wars, and custom events await.",
  },
};

export default function RegisterLayout({ children }: { children: ReactNode }) {
  return children;
}
