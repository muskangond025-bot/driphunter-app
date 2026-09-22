"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Tag, Heart, Timer } from "lucide-react";
import DealOfTheDay from "@/components/DealOfTheDay";
import PromoBlock from "@/components/PromoBlock";
import Newsletter from "@/components/Newsletter";
import Navbar from "@/components/layout/Navbar";
import ProductCard from "@/components/product/ProductCard";
import Footer from "@/components/layout/Footer";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

// Mock Data for Sale Grids
export const SNEAKERS_SALE = [
  { id: "s1", brand: "Neo-Step", title: "Midnight Eclipse Low", price: 8999, originalPrice: 11999, image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=400&q=80" },
  { id: "s2", brand: "Air Retro", title: "Crimson High 1s", price: 12999, originalPrice: 16999, image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=400&q=80" },
  { id: "s3", brand: "Urban Runner", title: "Cloud-knit Stealth", price: 5999, originalPrice: 7999, image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=400&q=80" },
  { id: "s4", brand: "Y-Project", title: "Sculpted Runners", price: 14999, originalPrice: 19999, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80" },
];

export const APPAREL_SALE = [
  { id: "a1", brand: "Guerilla Culture", title: "400GSM Stealth Hoodie", price: 3999, originalPrice: 5499, image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=400&q=80" },
  { id: "a2", brand: "Urban Combat", title: "Parachute Combat Pants", price: 2999, originalPrice: 4299, image: "https://images.unsplash.com/photo-1517462964-21fdcec3f25b?auto=format&fit=crop&w=400&q=80" },
  { id: "a3", brand: "Outkast Lab", title: "Oversized Cyber-Drip Tee", price: 1799, originalPrice: 2499, image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=400&q=80" },
  { id: "a4", brand: "Tokyo Techwear", title: "Utility Cargo Vest", price: 3499, originalPrice: 4999, image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=400&q=80" },
];

export const ACCESSORIES_SALE = [
  { id: "ac1", brand: "DripHunter Originals", title: "Shibuya Blackout Cap", price: 1299, originalPrice: 1899, image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=400&q=80" },
  { id: "ac2", brand: "Neo-Step", title: "Reflective Crossbody", price: 1899, originalPrice: 2699, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=400&q=80" },
  { id: "ac3", brand: "Guerilla Culture", title: "Steel Chain Necklace", price: 899, originalPrice: 1499, image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=400&q=80" },
  { id: "ac4", brand: "Urban Combat", title: "Tactical Tech Gloves", price: 1499, originalPrice: 2199, image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=400&q=80" },
];

export const BIGGEST_DISCOUNTS = [
  { id: "bd1", brand: "Urban Runner", title: "Cloud-knit Stealth", price: 2999, originalPrice: 7999, image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=400&q=80" },
  { id: "bd2", brand: "Air Retro", title: "Crimson High 1s", price: 5999, originalPrice: 16999, image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=400&q=80" },
  { id: "bd3", brand: "Tokyo Techwear", title: "Utility Cargo Vest", price: 1499, originalPrice: 4999, image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=400&q=80" },
  { id: "bd4", brand: "Guerilla Culture", title: "400GSM Stealth Hoodie", price: 1499, originalPrice: 5499, image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=400&q=80" },
];

export const LAST_CHANCE = [
  { id: "lc1", brand: "Neo-Step", title: "Midnight Eclipse Low", price: 8999, originalPrice: 11999, image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=400&q=80", stock: 1 },
  { id: "lc2", brand: "DripHunter Originals", title: "Shibuya Blackout Cap", price: 1299, originalPrice: 1899, image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=400&q=80", stock: 3 },
  { id: "lc3", brand: "Outkast Lab", title: "Oversized Cyber-Drip Tee", price: 1799, originalPrice: 2499, image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=400&q=80", stock: 2 },
  { id: "lc4", brand: "Y-Project", title: "Sculpted Runners", price: 14999, originalPrice: 19999, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80", stock: 1 },
];

export const SALE_CATEGORIES = [
  { title: "Sneakers on Sale", data: SNEAKERS_SALE, link: "/shop?category=sneakers&sale=true" },
  { title: "Apparel on Sale", data: APPAREL_SALE, link: "/shop?category=apparel&sale=true" },
  { title: "Accessories on Sale", data: ACCESSORIES_SALE, link: "/shop?category=accessories&sale=true" }
];

export default function DealsPage() {
  const { ref: heroRef, isVisible: isHeroVisible } = useScrollAnimation();
  const { ref: flashSaleRef, isVisible: isFlashSaleVisible } = useScrollAnimation();
  const { ref: catsRef, isVisible: isCatsVisible } = useScrollAnimation();
  const { ref: biggestRef, isVisible: isBiggestVisible } = useScrollAnimation();
  const { ref: bundleRef, isVisible: isBundleVisible } = useScrollAnimation();
  const { ref: lastChanceRef, isVisible: isLastChanceVisible } = useScrollAnimation();

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Navbar onSearchClick={() => setIsSearchOpen(true)} />
      
      <main className="flex-grow bg-white dark:bg-zinc-950 pb-10">
      {/* 1. HERO SECTION */}
      <section className="relative w-full min-h-[70vh] flex flex-col justify-center overflow-hidden bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1555529771-835f59bfc50c?auto=format&fit=crop&w=1920&q=80"
            alt="Deals Background"
            fill
            className="object-cover opacity-[0.05] dark:opacity-[0.15] mix-blend-multiply dark:mix-blend-lighten"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/80 to-white dark:via-zinc-950/80 dark:to-zinc-950" />
        </div>

        <div ref={heroRef} className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <div className={`transition-all duration-1000 transform ${isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 font-mono text-xs font-bold uppercase tracking-widest mb-6">
              <Tag className="w-4 h-4" />
              Archive Clearance
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-chaney-title uppercase tracking-tight text-zinc-950 dark:text-white mb-6 leading-[0.9]">
              The Best Drops. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6F4E37] to-[#8C6B52]">Better Prices.</span>
            </h1>
            <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 font-sans max-w-2xl mx-auto leading-relaxed">
              Score premium streetwear, rare grails, and essential pieces at unbeatable prices. Limited stock. When they're gone, they're gone.
            </p>
          </div>
        </div>
      </section>

      {/* 2. DEAL OF THE DAY */}
      <div className="relative z-20 -mt-10 max-w-7xl mx-auto px-4 sm:px-6">
        <DealOfTheDay />
      </div>

      {/* 3. LIMITED TIME OFFERS BANNER */}
      <section ref={flashSaleRef} className="py-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className={cn("rounded-[32px] p-8 md:p-12 overflow-hidden relative shadow-2xl border border-zinc-800 bg-zinc-950 transition-all duration-1000 transform", isFlashSaleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12")}>
          {/* Background Image */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1571216300188-d67b2d56d11f?auto=format&fit=crop&w=1200&q=80"
              alt="Flash Sale Banner"
              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/60 to-transparent mix-blend-multiply" />
            <div className="absolute inset-0 bg-black/20" />
          </div>

          <div className="absolute top-0 right-0 p-8 opacity-10 z-0">
            <Timer className="w-64 h-64 text-white" />
          </div>
          
          <div className="relative z-10 max-w-xl">
            <h2 className="text-3xl md:text-5xl font-chaney-title uppercase text-white mb-4">48-Hour <span className="text-[#E6C280]">Flash Sale</span></h2>
            <p className="text-zinc-300 font-sans mb-8">Take an extra 20% off all sale items with code <strong className="text-white px-2 py-1 bg-zinc-800/80 backdrop-blur-sm rounded font-mono">FLASH20</strong> at checkout.</p>
            <div className="flex gap-4">
              <Link href="/shop?sale=true" className="bg-[#E6C280] hover:bg-white text-zinc-950 px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-xs transition-colors shadow-xl inline-block">
                Shop Flash Sale
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4, 5, 6. SALE CATEGORIES GRIDS */}
      <div ref={catsRef}>
        {SALE_CATEGORIES.map((category, idx) => (
          <section key={idx} className="py-10 border-t border-zinc-100 dark:border-zinc-900">
            <div className="max-w-[1600px] mx-auto px-6 sm:px-12 md:px-16 lg:px-20">
              <div className={cn("flex items-end justify-between mb-10 transition-all duration-700", isCatsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
              <h2 className="text-2xl md:text-4xl font-chaney-title uppercase tracking-tight text-zinc-950 dark:text-white">
                {category.title}
              </h2>
              <Link href={category.link} className="hidden sm:flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-[#6F4E37] dark:hover:text-[#E6C280] transition-colors group">
                View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
                {category.data.map((product, pIdx) => (
                  <div 
                    key={product.id} 
                    className={cn("h-full transition-all duration-700", isCatsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12")}
                    style={{ transitionDelay: `${pIdx * 150}ms` }}
                  >
                  <ProductCard
                    id={product.title}
                    name={product.title}
                    brand={product.brand}
                    price={`₹${product.price}`}
                    originalPrice={`₹${product.originalPrice}`}
                    image={product.image}
                  />
                </div>
              ))}
            </div>
            
            <Link href={category.link} className={cn("sm:hidden mt-8 w-full flex items-center justify-center gap-2 py-4 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs font-bold uppercase tracking-widest text-zinc-950 dark:text-white hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors duration-700", isCatsVisible ? "opacity-100" : "opacity-0")}>
              View All {category.title}
            </Link>
          </div>
        </section>
      ))}
      </div>

      {/* 7. BIGGEST DISCOUNTS (50%+ OFF) */}
      <section ref={biggestRef} className="py-16 border-t border-zinc-100 dark:border-zinc-900 bg-zinc-50 dark:bg-zinc-900/50">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-12 md:px-16 lg:px-20">
          <div className={cn("flex items-end justify-between mb-10 transition-all duration-700", isBiggestVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
            <div>
              <h2 className="text-3xl md:text-5xl font-chaney-title uppercase tracking-tight text-zinc-950 dark:text-white flex items-center gap-3">
                Biggest Discounts <span className="text-xl bg-red-600 text-white px-3 py-1 rounded-full font-sans tracking-widest hidden sm:inline-block">50%+ OFF</span>
              </h2>
            </div>
            <Link href="/shop?sale=clearance" className="hidden sm:flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-[#6F4E37] dark:hover:text-[#E6C280] transition-colors group">
              Shop Clearance <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {BIGGEST_DISCOUNTS.map((product, idx) => (
              <div 
                key={product.id} 
                className={cn("h-full transition-all duration-700", isBiggestVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12")}
                style={{ transitionDelay: `${idx * 150}ms` }}
              >
                <ProductCard
                  id={product.title}
                  name={product.title}
                  brand={product.brand}
                  price={`₹${product.price}`}
                  originalPrice={`₹${product.originalPrice}`}
                  image={product.image}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. BUNDLE DEALS */}
      <section ref={bundleRef} className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-auto md:h-[400px]">
          {/* Bundle 1 */}
          <Link href="/shop?bundle=street-pack" className={cn("relative group rounded-3xl overflow-hidden shadow-xl border border-zinc-200 dark:border-zinc-800 flex flex-col justify-end p-8 bg-zinc-100 dark:bg-zinc-900 transition-all duration-1000", isBundleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12")}>
            <div className="absolute inset-0 z-0">
              <img src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=800&q=80" alt="Apparel Bundle" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
            </div>
            <div className="relative z-10">
              <span className="inline-block px-3 py-1 bg-white text-black font-bold uppercase tracking-widest text-[10px] rounded mb-3">Bundle Offer</span>
              <h3 className="text-2xl md:text-3xl font-chaney-title uppercase text-white mb-2 leading-tight">The Essentials Kit</h3>
              <p className="text-zinc-300 font-sans text-sm mb-4">Cop any 3 premium basic tees and get a free tote bag.</p>
              <span className="font-bold uppercase tracking-widest text-xs text-[#E6C280] group-hover:text-white transition-colors flex items-center gap-2">
                Shop Bundle <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </Link>

          {/* Bundle 2 */}
          <Link 
            href="/shop?bundle=full-fit" 
            className={cn("relative group rounded-3xl overflow-hidden shadow-xl border border-zinc-200 dark:border-zinc-800 flex flex-col justify-end p-8 bg-zinc-100 dark:bg-zinc-900 transition-all duration-1000", isBundleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12")}
            style={{ transitionDelay: "200ms" }}
          >
            <div className="absolute inset-0 z-0">
              <img src="https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80" alt="Sneaker Bundle" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
            </div>
            <div className="relative z-10">
              <span className="inline-block px-3 py-1 bg-[#6F4E37] text-white font-bold uppercase tracking-widest text-[10px] rounded mb-3">Extra 15% Off</span>
              <h3 className="text-2xl md:text-3xl font-chaney-title uppercase text-white mb-2 leading-tight">Full Fit Discount</h3>
              <p className="text-zinc-300 font-sans text-sm mb-4">Pair any sneaker with an apparel piece for instant 15% off.</p>
              <span className="font-bold uppercase tracking-widest text-xs text-[#E6C280] group-hover:text-white transition-colors flex items-center gap-2">
                Unlock Offer <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* 9. LAST CHANCE TO BUY */}
      <section ref={lastChanceRef} className="py-16 border-t border-zinc-100 dark:border-zinc-900">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-12 md:px-16 lg:px-20">
          <div className={cn("flex items-end justify-between mb-10 transition-all duration-700", isLastChanceVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
            <h2 className="text-2xl md:text-4xl font-chaney-title uppercase tracking-tight text-zinc-950 dark:text-white flex items-center gap-3">
              Last Chance <span className="text-sm font-sans tracking-widest text-zinc-500 normal-case hidden sm:inline-block">Almost Sold Out</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {LAST_CHANCE.map((product, idx) => (
              <div 
                key={product.id} 
                className={cn("h-full transition-all duration-700", isLastChanceVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12")}
                style={{ transitionDelay: `${idx * 150}ms` }}
              >
                <ProductCard
                  id={product.title}
                  name={product.title}
                  brand={product.brand}
                  price={`₹${product.price}`}
                  originalPrice={`₹${product.originalPrice}`}
                  image={product.image}
                  badge={`Only ${product.stock} Left`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. COUPON CTA */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 rounded-[32px] p-8 md:p-16 border border-zinc-800 text-center shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[#6F4E37]/5 mix-blend-screen" />
          <div className="relative z-10 flex flex-col items-center justify-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-chaney-title uppercase text-white mb-4">Want 10% Extra Off?</h2>
            <p className="text-zinc-400 text-sm md:text-base font-sans mb-8">
              Apply code at checkout on any order above ₹4999. Includes already discounted archive items.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="flex items-center bg-zinc-950 border border-zinc-700 rounded-xl px-6 py-4 font-mono text-xl font-bold tracking-widest text-[#E6C280] select-all cursor-pointer hover:border-[#E6C280] transition-colors group">
                DRIP10
                <span className="ml-4 text-[10px] text-zinc-500 uppercase tracking-widest group-hover:text-[#E6C280] transition-colors hidden sm:block">Click to Copy</span>
              </div>
              <Link href="/shop?sale=true" className="w-full sm:w-auto bg-white hover:bg-zinc-200 text-zinc-950 px-8 py-5 rounded-xl font-bold uppercase tracking-widest text-xs transition-colors text-center shadow-xl">
                Shop Collection
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* EXCLUSIVE OFFERS / PROMO BLOCK */}
      <PromoBlock />

      {/* 8. NEWSLETTER */}
      <div className="pt-10">
        <Newsletter />
      </div>
      </main>
      
      <Footer />
    </div>
  );
}
