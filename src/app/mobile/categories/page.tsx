"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Sparkles } from "lucide-react";
import AppHeader from "@/components/app-shell/AppHeader";
import AppPageLayout from "@/components/app-shell/AppPageLayout";

const PREMIUM_CATEGORIES = [
  {
    id: "sneakers",
    label: "SNEAKERS",
    tagline: "Holy grails & daily beaters.",
    image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80",
    items: [
      { label: "Air Jordan", href: "/mobile/brands/Jordan" },
      { label: "Nike", href: "/mobile/brands/Nike" },
      { label: "Adidas", href: "/mobile/brands/Adidas" },
      { label: "Yeezy", href: "/mobile/brands/Yeezy" },
      { label: "Samba", href: "/mobile/brands/Samba" },
    ]
  },
  {
    id: "apparel",
    label: "APPAREL",
    tagline: "Elevated silhouettes.",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80",
    items: [
      { label: "T-Shirts", href: "/mobile/brands/T-Shirts" },
      { label: "Hoodies", href: "/mobile/brands/Hoodies" },
      { label: "Jackets", href: "/mobile/brands/Jackets" },
      { label: "Bottoms", href: "/mobile/brands/Bottoms" },
    ]
  },
  {
    id: "accessories",
    label: "ACCESSORIES",
    tagline: "The final touch.",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80",
    items: [
      { label: "Sling Bags", href: "/mobile/brands/Bags" },
      { label: "Wallets", href: "/mobile/brands/Wallets" },
      { label: "Headwear", href: "/mobile/brands/Headwear" },
      { label: "Eyewear", href: "/mobile/brands/Eyewear" },
    ]
  }
];

export default function MobileCategoriesPage() {
  const [activeTab, setActiveTab] = useState(PREMIUM_CATEGORIES[0].id);

  return (
    <AppPageLayout hasBottomNav={true}>
      <AppHeader title="Directory" variant="contextual" showActions={false} />
      
      <div className="flex flex-col h-[calc(100vh-120px)] bg-[#FAF8F5] dark:bg-[#0C0B0A] overflow-hidden">
        
        {/* Search Bar & Header */}
        <div className="px-4 py-4 shrink-0">
          <Link href="/mobile/search" className="flex items-center w-full bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 rounded-2xl px-4 py-3.5 text-zinc-500 dark:text-zinc-400 gap-3 shadow-[0_2px_10px_rgba(0,0,0,0.02)] active:scale-[0.98] transition-transform mb-4">
            <Search className="w-5 h-5 text-[#6F4E37] dark:text-[#E6C280]" />
            <span className="text-[13px] font-sans">Search the archive...</span>
          </Link>
          
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-3.5 h-3.5 text-[#6F4E37] dark:text-[#E6C280]" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#6F4E37] dark:text-[#E6C280]">
              Curated Index
            </span>
          </div>
          <h1 className="text-4xl font-playfair font-black text-zinc-900 dark:text-white uppercase tracking-tighter">
            Explore
          </h1>
        </div>

        {/* Dynamic Flex-Grow Accordion */}
        <div className="flex-1 flex flex-col gap-2 px-4 pb-4 overflow-hidden">
          {PREMIUM_CATEGORIES.map((cat, idx) => {
            const isActive = activeTab === cat.id;
            
            return (
              <div 
                key={cat.id} 
                onClick={() => setActiveTab(cat.id)}
                className={`relative w-full rounded-[32px] overflow-hidden cursor-pointer transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] shadow-lg ${
                  isActive ? "flex-[5]" : "flex-[1] active:scale-[0.98]"
                }`}
              >
                {/* Image Background */}
                <div className="absolute inset-0 w-full h-full">
                  <img 
                    src={cat.image} 
                    alt={cat.label} 
                    className={`absolute inset-0 w-full h-full object-cover transition-transform duration-[2000ms] ease-out ${
                      isActive ? "scale-105" : "scale-100"
                    }`}
                  />
                  {/* Dynamic Dark Gradient based on active state */}
                  <div className={`absolute inset-0 transition-colors duration-700 ${
                    isActive 
                      ? "bg-gradient-to-t from-black/95 via-black/40 to-transparent" 
                      : "bg-black/60 hover:bg-black/50"
                  }`} />
                </div>
                
                {/* Collapsed State Title (Centered) */}
                <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
                  isActive ? "opacity-0 pointer-events-none" : "opacity-100 delay-200"
                }`}>
                  <h2 className="text-2xl font-black text-white/90 uppercase tracking-widest">
                    {cat.label}
                  </h2>
                </div>
                
                {/* Expanded Content (Bottom Aligned) */}
                <div className={`absolute inset-0 p-6 flex flex-col justify-end transition-all duration-700 ${
                  isActive ? "opacity-100 translate-y-0 delay-200" : "opacity-0 translate-y-8 pointer-events-none"
                }`}>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-[#E6C280] mb-1">
                    0{idx + 1}
                  </span>
                  <h2 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-tighter leading-none mb-1">
                    {cat.label}
                  </h2>
                  <p className="text-zinc-300 font-serif italic text-sm mb-6">
                    {cat.tagline}
                  </p>

                  {/* Glassmorphic Grid for Subcategories */}
                  <div className="grid grid-cols-2 gap-2">
                    {cat.items.map((sub, i) => (
                      <Link 
                        key={i} 
                        href={sub.href}
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center justify-center py-3.5 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-2xl transition-colors active:bg-white/30"
                      >
                        <span className="text-[11px] font-bold text-white tracking-wider uppercase">{sub.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </AppPageLayout>
  );
}
