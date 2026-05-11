import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,

  //   cacheComponents: true,

  experimental: {
    serverActions: {
      allowedOrigins: [
        "dashboard.ranonlinegs.com",
        // Allow localhost in development only
        ...(process.env.NODE_ENV !== "production"
          ? ["localhost:3000", "ranonlinegs.local:3000"]
          : []),
      ],
      bodySizeLimit: "5mb",
    },
  },

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
