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
    default:
      "Ran Online GS — #1 Free Ran Online Private Server 2026 | Download & Play",
    template: "%s | Ran Online GS",
  },
  description:
    "Play Ran Online GS, the best free Ran Online private server in 2026. Competitive PvP, faction wars, custom events, and an active community. Download now and join thousands of players!",
  keywords: [
    "ran online private server",
    "ran online gs",
    "ran online download",
    "best ran online private server",
    "ran online private server philippines",
    "free mmorpg private server",
    "ran online pvp server",
    "ran online private server 2026",
    "classic ran online server",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Ran Online GS",
    title: "Ran Online GS — #1 Free Ran Online Private Server 2026",
    description:
      "The best Ran Online private server with competitive PvP, faction wars, custom events, and an active community. Free to play — download now!",
    images: [
      {
        url: "/og/home.png",
        width: 1200,
        height: 630,
        alt: "Ran Online GS - Free Private MMORPG Server",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ran Online GS — #1 Free Ran Online Private Server 2026",
    description:
      "The best Ran Online private server with competitive PvP, faction wars, and active events. Free to play — download now!",
    images: [
      {
        url: "/og/home.png",
        alt: "Ran Online GS - Free Private MMORPG Server",
      },
    ],
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
                  potentialAction: {
                    "@type": "SearchAction",
                    target:
                      "https://ranonlinegs.com/search?q={search_term_string}",
                    "query-input":
                      "required name=search_term_string",
                  },
                },
                {
                  "@type": "Organization",
                  name: "Ran Online GS",
                  url: "https://ranonlinegs.com",
                  logo: "https://ranonlinegs.com/logo.png",
                  sameAs: [
                    "https://discord.gg/ranonlinegs",
                    "https://facebook.com/ranonlinegs",
                  ],
                },
                {
                  "@type": "VideoGame",
                  name: "Ran Online GS",
                  url: "https://ranonlinegs.com",
                  description:
                    "A free private MMORPG server based on the classic Ran Online with competitive PvP, faction wars, and custom events. Download and play for free.",
                  genre: ["MMORPG", "PvP", "Free-to-play"],
                  gamePlatform: "PC",
                  applicationCategory: "Game",
                  operatingSystem: "Windows",
                  publisher: {
                    "@type": "Organization",
                    name: "Ran Online GS",
                    url: "https://ranonlinegs.com",
                  },
                  offers: {
                    "@type": "Offer",
                    price: "0",
                    priceCurrency: "USD",
                    availability: "https://schema.org/InStock",
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
