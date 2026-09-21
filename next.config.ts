import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "*.savana.com",
      },
      {
        protocol: "https",
        hostname: "*.mfrcdn.com",
      },
      {
        protocol: "https",
        hostname: "drip-hunter.vercel.app",
      },
    ],
  },
};

export default nextConfig;
