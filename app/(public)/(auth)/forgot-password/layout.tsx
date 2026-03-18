import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Forgot Password",
  description:
    "Reset your Ran Online GS account password. Enter your username and email to receive reset instructions.",
  robots: { index: false, follow: true },
  openGraph: {
    title: "Forgot Password | Ran Online GS",
    description:
      "Reset your Ran Online GS account password. Enter your username and email to receive reset instructions.",
  },
};

export default function ForgotPasswordLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
