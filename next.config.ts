import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,

  cacheComponents: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.ranonlinegs.com",
      },
    ],
  },

  logging: {
    fetches: {
      fullUrl: true,
      hmrRefreshes: true,
    },
  },
};

export default nextConfig;
