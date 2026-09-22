"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { BRANDS_DIRECTORY } from "@/data/mockData";
import AppHeader from "@/components/app-shell/AppHeader";
import AppPageLayout from "@/components/app-shell/AppPageLayout";
import { MapPin } from "lucide-react";

export default function MobileBrandsPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const CATEGORY_TABS = [
    { id: "all", label: "All" },
    { id: "luxury", label: "Luxury" },
    { id: "underground", label: "Underground" },
    { id: "heritage", label: "Heritage" },
    { id: "techwear", label: "Techwear" },
    { id: "footwear", label: "Footwear" },
  ];

  const filteredBrands = useMemo(() => {
    if (activeCategory === "all") return BRANDS_DIRECTORY;
    return BRANDS_DIRECTORY.filter((brand) => brand.category === activeCategory);
  }, [activeCategory]);

  return (
    <AppPageLayout hasBottomNav={true}>
      <AppHeader variant="contextual" title="Featured Labels" showActions={true} />
      
      <div className="flex flex-col min-h-screen bg-zinc-50 pb-24 pt-2">
        
        {/* Categories Tabs */}
        <div className="px-4 pb-4">
          <div className="flex overflow-x-auto hide-scrollbar gap-2 pb-1 items-center -mx-4 px-4">
            {CATEGORY_TABS.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-[11px] font-mono transition-colors ${
                  activeCategory === cat.id
                    ? "bg-[#6F4E37] text-white font-bold shadow-sm"
                    : "bg-white border border-zinc-200 text-zinc-600 active:bg-zinc-50"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Directory List */}
        <div className="px-4 flex flex-col gap-3">
          {filteredBrands.map((brand) => (
            <Link 
              key={brand.id}
              href={`/mobile/brands/${brand.slug}`}
              className="bg-white border border-zinc-200 rounded-2xl p-4 flex flex-col gap-2 shadow-sm active:scale-[0.98] transition-transform"
            >
              <div className="flex justify-between items-start">
                <h3 className="font-black uppercase text-lg text-zinc-900">{brand.name}</h3>
                <span className="px-2 py-1 bg-zinc-100 rounded-md text-[9px] font-mono font-bold text-zinc-500 uppercase">
                  {brand.category}
                </span>
              </div>
              <p className="text-[11px] font-serif italic text-zinc-500 line-clamp-1">
                &quot;{brand.tagline}&quot;
              </p>
              <div className="flex items-center gap-1 text-[10px] font-mono text-zinc-400 mt-1">
                <MapPin className="w-3 h-3" />
                <span>{brand.city}</span>
              </div>
            </Link>
          ))}
          
          {filteredBrands.length === 0 && (
            <div className="text-center py-10 text-zinc-500 font-mono text-xs">
              No brands found in this category.
            </div>
          )}
        </div>
      </div>
    </AppPageLayout>
  );
}
