import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Sign In",
  description:
    "Sign in to your Ran Online GS account. Access your characters, item shop, and community features.",
  robots: { index: false, follow: true },
  openGraph: {
    title: "Sign In | Ran Online GS",
    description:
      "Sign in to your Ran Online GS account. Access your characters, item shop, and community features.",
  },
};

export default function LoginLayout({ children }: { children: ReactNode }) {
  return children;
}
