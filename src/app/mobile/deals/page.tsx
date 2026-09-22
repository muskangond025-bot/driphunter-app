"use client";

import React, { useState } from "react";
import AppHeader from "@/components/app-shell/AppHeader";
import AppPageLayout from "@/components/app-shell/AppPageLayout";
import ProductCard from "@/components/product/ProductCard";
import { 
  SNEAKERS_SALE, 
  APPAREL_SALE, 
  ACCESSORIES_SALE, 
  BIGGEST_DISCOUNTS, 
  LAST_CHANCE, 
  SALE_CATEGORIES 
} from "@/app/deals/page";
import { Tag, Timer } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function MobileDealsPage() {
  const [activeTab, setActiveTab] = useState("all");

  const renderProductGrid = (products: any[]) => (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 px-4 pb-8">
      {products.map((product) => (
        <div key={product.id} className="w-full">
          <ProductCard
            id={product.id || product.title}
            name={product.title}
            brand={product.brand}
            price={`₹${product.price}`}
            originalPrice={`₹${product.originalPrice}`}
            image={product.image}
            badge={product.stock ? `Only ${product.stock} Left` : undefined}
            basePath="/mobile"
          />
        </div>
      ))}
    </div>
  );

  return (
    <AppPageLayout hasBottomNav={true}>
      <AppHeader variant="contextual" title="Deals" showActions={true} />
      
      <div className="flex flex-col min-h-screen bg-zinc-50 pb-24 pt-2">
        {/* Mobile Flash Sale Banner */}
        <div className="px-4 mb-6">
          <div className="rounded-[24px] p-6 overflow-hidden relative shadow-lg border border-zinc-800 bg-zinc-950">
            <div className="absolute inset-0 z-0 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1571216300188-d67b2d56d11f?auto=format&fit=crop&w=800&q=80"
                alt="Flash Sale Banner"
                className="absolute inset-0 w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent mix-blend-multiply" />
            </div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/20 text-red-400 font-mono text-[10px] font-bold uppercase tracking-widest mb-3">
                <Timer className="w-3.5 h-3.5" />
                48-Hour Flash
              </div>
              <h2 className="text-2xl font-chaney-title uppercase text-white mb-2">Extra 20% <span className="text-[#E6C280]">Off</span></h2>
              <p className="text-zinc-300 text-[11px] font-sans mb-4">Use code <strong className="text-white">FLASH20</strong></p>
            </div>
          </div>
        </div>

        {/* Categories Tabs */}
        <div className="px-4 pb-4">
          <div className="flex overflow-x-auto hide-scrollbar gap-2 pb-1 items-center -mx-4 px-4">
            <button
              onClick={() => setActiveTab("all")}
              className={cn("whitespace-nowrap px-4 py-2 rounded-full text-[11px] font-mono transition-colors", activeTab === "all" ? "bg-[#6F4E37] text-white font-bold shadow-sm" : "bg-white border border-zinc-200 text-zinc-600 active:bg-zinc-50")}
            >
              Biggest Discounts
            </button>
            {SALE_CATEGORIES.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(cat.title)}
                className={cn("whitespace-nowrap px-4 py-2 rounded-full text-[11px] font-mono transition-colors", activeTab === cat.title ? "bg-[#6F4E37] text-white font-bold shadow-sm" : "bg-white border border-zinc-200 text-zinc-600 active:bg-zinc-50")}
              >
                {cat.title}
              </button>
            ))}
            <button
              onClick={() => setActiveTab("last_chance")}
              className={cn("whitespace-nowrap px-4 py-2 rounded-full text-[11px] font-mono transition-colors", activeTab === "last_chance" ? "bg-[#6F4E37] text-white font-bold shadow-sm" : "bg-white border border-zinc-200 text-zinc-600 active:bg-zinc-50")}
            >
              Last Chance
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="mt-2">
          {activeTab === "all" && (
            <>
              <div className="px-4 mb-4 flex items-center gap-2">
                <Tag className="w-4 h-4 text-[#6F4E37]" />
                <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-900">50%+ Off</h3>
              </div>
              {renderProductGrid(BIGGEST_DISCOUNTS)}
            </>
          )}

          {activeTab === "last_chance" && (
            <>
              <div className="px-4 mb-4 flex items-center gap-2">
                <Tag className="w-4 h-4 text-red-600" />
                <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-900">Almost Gone</h3>
              </div>
              {renderProductGrid(LAST_CHANCE)}
            </>
          )}

          {SALE_CATEGORIES.map((cat, idx) => (
            activeTab === cat.title && (
              <div key={idx}>
                <div className="px-4 mb-4 flex items-center gap-2">
                  <Tag className="w-4 h-4 text-[#6F4E37]" />
                  <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-900">{cat.title}</h3>
                </div>
                {renderProductGrid(cat.data)}
              </div>
            )
          ))}
        </div>
      </div>
    </AppPageLayout>
  );
}
