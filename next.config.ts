import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/mobile",
        permanent: false, // use false so we don't aggressively cache a redirect on the live project during transition
      },
    ];
  },
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
