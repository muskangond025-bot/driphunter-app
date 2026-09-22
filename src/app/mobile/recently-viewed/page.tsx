"use client";

import React from "react";
import AppHeader from "@/components/app-shell/AppHeader";
import AppPageLayout from "@/components/app-shell/AppPageLayout";
import ProductCard from "@/components/product/ProductCard";
import { recentlyViewedHistory } from "@/app/recently-viewed/page";
import { Clock } from "lucide-react";
import Link from "next/link";

export default function MobileRecentlyViewedPage() {
  return (
    <AppPageLayout hasBottomNav={true}>
      <AppHeader variant="contextual" title="Recently Viewed" showActions={true} />
      <div className="flex flex-col min-h-screen bg-zinc-50 dark:bg-zinc-950 pb-24 pt-4">
        <div className="px-4 mb-6">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-3.5 h-3.5 text-[#6F4E37] dark:text-[#E6C280]" />
            <span className="text-[10px] font-semibold tracking-[0.25em] text-[#6F4E37] dark:text-[#E6C280] uppercase font-mono">
              Your Archive
            </span>
          </div>
          <p className="text-xs text-zinc-500 font-sans font-light">
            A complete history of the pieces you've interacted with.
          </p>
        </div>

        <div className="px-4">
          {recentlyViewedHistory.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {recentlyViewedHistory.map((product) => (
                <div key={product.id} className="w-full">
                  <ProductCard
                    id={product.id}
                    name={product.name}
                    brand={product.brand}
                    price={product.price}
                    originalPrice={product.originalPrice}
                    image={product.image}
                    hoverImage={product.hoverImage}
                    rating={product.rating}
                    basePath="/mobile"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm mt-4 px-4">
              <Clock className="w-8 h-8 text-zinc-300 dark:text-zinc-700 mb-3" />
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white mb-2">Your history is empty</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-6">
                You haven't viewed any products recently.
              </p>
              <Link 
                href="/mobile/shop" 
                className="text-[11px] font-bold uppercase tracking-widest text-white dark:text-zinc-950 bg-zinc-950 dark:bg-white px-6 py-2.5 rounded-full"
              >
                Explore Shop
              </Link>
            </div>
          )}
        </div>
      </div>
    </AppPageLayout>
  );
}
