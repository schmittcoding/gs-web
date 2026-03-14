import { TooltipProvider } from "@/components/ui/tooltip";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Suspense } from "react";
import { Toaster } from "sileo";
import "./globals.css";

const oxanium = localFont({
  src: "./fonts/Oxanium.ttf",
  style: "normal",
  variable: "--font-oxanium",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ranonlinegs.com"),
  title: {
    default: "Ran Online GS — Free Private MMORPG Server",
    template: "%s | Ran Online GS",
  },
  description:
    "Play Ran Online GS, a free private MMORPG server with competitive PvP, faction wars, custom events, and an active community. Download and play now.",
  keywords: [
    "ran online private server",
    "ran online gs",
    "ran online download",
    "best ran online private server",
    "free mmorpg private server",
    "ran online pvp server",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Ran Online GS",
    title: "Ran Online GS — Free Private MMORPG Server",
    description:
      "Classic Ran Online experience with modern improvements. Competitive PvP, faction wars, and an active community. Free to play.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ran Online GS — Free Private MMORPG Server",
    description:
      "Classic Ran Online experience with modern improvements. Competitive PvP, faction wars, and an active community. Free to play.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={oxanium.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  name: "Ran Online GS",
                  url: "https://ranonlinegs.com",
                },
                {
                  "@type": "Organization",
                  name: "Ran Online GS",
                  url: "https://ranonlinegs.com",
                  logo: "https://ranonlinegs.com/logo.png",
                },
                {
                  "@type": "VideoGame",
                  name: "Ran Online GS",
                  description:
                    "A free private MMORPG server based on the classic Ran Online with competitive PvP, faction wars, and custom events.",
                  genre: ["MMORPG", "PvP", "Free-to-play"],
                  gamePlatform: "PC",
                  applicationCategory: "Game",
                  operatingSystem: "Windows",
                  offers: {
                    "@type": "Offer",
                    price: "0",
                    priceCurrency: "USD",
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body className={`${oxanium.variable} antialiased`}>
        <Suspense>
          <TooltipProvider>{children}</TooltipProvider>
        </Suspense>
        <Toaster
          position="top-center"
          options={{
            fill: "var(--color-cod-gray-800)",
            styles: {
              description: "text-muted",
            },
          }}
        />
      </body>
    </html>
  );
}
