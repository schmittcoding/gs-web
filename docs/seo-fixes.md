# SEO Fixes - Step-by-Step Implementation

**Date:** 2026-03-18
**Framework:** Next.js 16 (App Router)

---

## HIGH Priority Fixes

### Fix 1: Create Public Homepage with SEO Content

**File:** `app/(public)/page.tsx` (new public landing page)

The current homepage redirects to the dashboard (requires auth). A public-facing landing page is needed to rank for primary keywords.

**Target keywords:** "ran online private server", "ran online gs", "best ran online private server"

```tsx
// app/(public)/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ran Online GS — #1 Free Private MMORPG Server 2026",
  description:
    "Play Ran Online GS, the best free private MMORPG server in 2026. Competitive PvP, faction wars, custom events, and an active community. Download and play now!",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Ran Online GS — #1 Free Private MMORPG Server 2026",
    description:
      "The best Ran Online private server with competitive PvP, faction wars, and active events. Free to play.",
    images: [{ url: "/og/home.png", width: 1200, height: 630 }],
  },
};
```

**Key elements:**
- H1 with primary keyword: "The Best Ran Online Private Server"
- Hero section with CTA (Download + Register)
- Server features grid
- Community stats (players online, Discord members)
- FAQ section with schema markup

---

### Fix 2: Create Download Page

**File:** `app/(public)/download/page.tsx`

**Target keywords:** "ran online download", "ran online private server download", "how to download ran online gs"

```tsx
export const metadata: Metadata = {
  title: "Download Ran Online GS — Free MMORPG Private Server",
  description:
    "Download Ran Online GS for free. Step-by-step installation guide for the best Ran Online private server. Windows PC compatible. Play in minutes!",
  alternates: { canonical: "/download" },
  openGraph: {
    title: "Download Ran Online GS — Play for Free",
    description: "Download the best Ran Online private server. Quick setup, free to play.",
    images: [{ url: "/og/download.png", width: 1200, height: 630 }],
  },
};
```

**Page must include:**
- H1: "Download Ran Online GS"
- System requirements table
- Step-by-step installation guide
- Download button (prominent CTA)
- FAQ schema: "How to download Ran Online GS?", "What are the system requirements?", "Is Ran Online GS free?"
- SoftwareApplication schema markup

---

### Fix 3: Create Registration Page

**File:** `app/(public)/register/page.tsx`

**Target keywords:** "ran online register", "ran online gs create account"

```tsx
export const metadata: Metadata = {
  title: "Register — Create Your Ran Online GS Account",
  description:
    "Create a free Ran Online GS account. Register now to download the game, join faction wars, and compete in PvP. Takes less than a minute!",
  alternates: { canonical: "/register" },
};
```

---

### Fix 4: Expand Sitemap

**File:** `app/sitemap.ts`

```tsx
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://ranonlinegs.com";

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/download`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/register`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/features`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    // Add news/guide pages dynamically as they're created
  ];
}
```

---

### Fix 5: Add OG Images to Root Metadata

**File:** `app/layout.tsx`

Add to the existing metadata object:

```tsx
openGraph: {
  type: "website",
  siteName: "Ran Online GS",
  title: "Ran Online GS — Free Private MMORPG Server",
  description: "Classic Ran Online experience with modern improvements...",
  images: [
    {
      url: "/og/home.png",
      width: 1200,
      height: 630,
      alt: "Ran Online GS - Free Private MMORPG Server",
    },
  ],
},
twitter: {
  card: "summary_large_image",
  title: "Ran Online GS — Free Private MMORPG Server",
  description: "Classic Ran Online experience with modern improvements...",
  images: ["/og/home.png"],
},
```

---

### Fix 6: Update robots.ts

**File:** `app/robots.ts`

```tsx
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/profile", "/cart", "/item-shop", "/checkout", "/recharge", "/dashboard"],
    },
    sitemap: "https://ranonlinegs.com/sitemap.xml",
  };
}
```

---

### Fix 7: Enhance Schema Markup

**File:** `app/layout.tsx`

Update the JSON-LD to include SearchAction and more complete VideoGame data:

```tsx
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: "Ran Online GS",
      url: "https://ranonlinegs.com",
      potentialAction: {
        "@type": "SearchAction",
        target: "https://ranonlinegs.com/search?q={search_term_string}",
        "query-input": "required name=search_term_string",
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
      description: "A free private MMORPG server based on the classic Ran Online...",
      genre: ["MMORPG", "PvP", "Free-to-play"],
      gamePlatform: "PC",
      applicationCategory: "Game",
      operatingSystem: "Windows",
      publisher: {
        "@type": "Organization",
        name: "Ran Online GS",
      },
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
      },
    },
  ],
}
```

---

## MEDIUM Priority Fixes

### Fix 8: Create Features Page

**File:** `app/(public)/features/page.tsx`

**Target keywords:** "best ran online private server", "ran online gs features"

- H1: "Why Ran Online GS is the Best Private Server"
- Feature comparison table vs other servers
- FAQ schema with comparison questions

### Fix 9: Add FAQ Schema to Download Page

```tsx
// Add as additional JSON-LD on the download page
{
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I download Ran Online GS?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Visit our download page, click the download button..."
      }
    },
    {
      "@type": "Question",
      name: "Is Ran Online GS free to play?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, Ran Online GS is completely free to play..."
      }
    },
    {
      "@type": "Question",
      name: "What are the system requirements for Ran Online GS?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Minimum: Windows 7/8/10/11, 2GB RAM, 4GB storage..."
      }
    }
  ]
}
```

### Fix 10: Add SoftwareApplication Schema to Download Page

```tsx
{
  "@type": "SoftwareApplication",
  name: "Ran Online GS",
  operatingSystem: "Windows",
  applicationCategory: "GameApplication",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD"
  },
  downloadUrl: "https://ranonlinegs.com/download"
}
```

---

## LOW Priority Fixes

### Fix 11: Add Breadcrumb Schema

For subpages, add BreadcrumbList schema:

```tsx
{
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://ranonlinegs.com" },
    { "@type": "ListItem", position: 2, name: "Download", item: "https://ranonlinegs.com/download" }
  ]
}
```

### Fix 12: Web App Manifest

**File:** `app/manifest.ts`

```tsx
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Ran Online GS",
    short_name: "RanGS",
    description: "The best Ran Online private server",
    start_url: "/",
    display: "standalone",
    background_color: "#0f0f0f",
    theme_color: "#f59e0b",
  };
}
```
