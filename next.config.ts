import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/mobile",
        permanent: false,
      },
    ];
  },
  async rewrites() {
    return [
      { source: "/account", destination: "/mobile/account" },
      { source: "/cart", destination: "/mobile/cart" },
      { source: "/categories", destination: "/mobile/categories" },
      { source: "/search", destination: "/mobile/search" },
      { source: "/wishlist", destination: "/mobile/wishlist" },
      { source: "/profile", destination: "/mobile/profile" },
      { source: "/orders", destination: "/mobile/orders" },
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
