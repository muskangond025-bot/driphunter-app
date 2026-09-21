"use client";

import React from "react";
import Link from "next/link";

const shopCategories = [
  { label: "OG", href: "/shop" },
  { label: "Bags", href: "/shop?category=Bags" },
  { label: "Headwear", href: "/shop?category=Headwear" },
  { label: "Clothing", href: "/shop?category=Clothing" },
  { label: "Wallets", href: "/shop?category=Wallets" },
  { label: "Accessories", href: "/shop?category=Accessories" },
  { label: "Blog", href: "/blog" },
  { label: "SALE ⚡", href: "/shop?sale=true", isSale: true },
];

export default function ShopCategoryBar() {
  return (
    <div className="border-y border-zinc-200 bg-[#f5f0eb]/90 sticky top-[72px] z-30 select-none">
      <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-12 md:px-16 lg:px-20py-2.5 flex items-center justify-center gap-6 text-xs font-bold font-mono overflow-x-auto scrollbar-none snap-x snap-mandatory scroll-smooth scroll-p-6">
        <span className="text-zinc-400 uppercase tracking-widest font-black shrink-0">
          SHOP &gt;
        </span>
        {shopCategories.map((cat) => (
          <Link
            key={cat.label}
            href={cat.href}
            className={`uppercase tracking-wider cursor-pointer transition-colors shrink-0 snap-center hover:text-black ${
              cat.isSale
                ? "text-[#6F4E37] font-extrabold"
                : "text-zinc-600 hover:text-zinc-950"
            }`}
          >
            {cat.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
