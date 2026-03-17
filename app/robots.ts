import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/profile",
        "/cart",
        "/item-shop",
        "/checkout",
        "/recharge",
      ],
    },
    sitemap: "https://ranonlinegs.com/sitemap.xml",
  };
}
