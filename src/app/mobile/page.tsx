"use client";

import React from "react";
import MobileHomeHeader from "@/components/mobile/MobileHomeHeader";
import HeroSection from "@/components/home/HeroSection";
import CategoryBubbles from "@/components/home/CategoryBubbles";
import NewArrivals from "@/components/home/NewArrivals";
import LimitedDrops from "@/components/home/LimitedDrops";
import BrandShowcase from "@/components/home/BrandShowcase";
import CuratedForYou from "@/components/home/CuratedForYou";
import RecentlyViewed from "@/components/RecentlyViewed";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function MobileHomePage() {
  const basePath = "/mobile";

  return (
    <div className="flex flex-col w-full min-h-screen pb-6">
      {/* Quick-commerce style header */}
      <MobileHomeHeader />

      {/* 1. Hero Section Banner / Slideshow */}
      <HeroSection />

      {/* 2. Category Bubbles - touch-friendly browsing */}
      <CategoryBubbles basePath={basePath} />

      {/* 3. New Arrivals Grid - horizontal product browsing */}
      <NewArrivals basePath={basePath} />

      {/* 4. Deals of the Day Split Grid */}
      <LimitedDrops basePath={basePath} />

      {/* 5. Curated For You */}
      <CuratedForYou basePath={basePath} />

      {/* 6. Brand Grid / Showcase */}
      <BrandShowcase basePath={basePath} />

      {/* 7. Recently Viewed Products */}
      <RecentlyViewed basePath={basePath} />

      {/* 8. Closing CTA */}
      <div className="px-6 py-12 flex flex-col items-center justify-center text-center mt-4">
        <h2 className="text-2xl font-light tracking-tight text-zinc-950 dark:text-zinc-50 font-playfair mb-3">
          Explore <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280]">More</span>
        </h2>
        <p className="text-sm text-zinc-500 font-sans max-w-[280px] mb-8">
          Discover the full DripHunter collection, featuring exclusive drops and premium apparel.
        </p>
        <Link 
          href="/mobile/shop"
          className="group flex items-center justify-center gap-3 bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-950 px-8 py-4 rounded-full font-mono text-xs font-bold uppercase tracking-[0.2em] w-full active:scale-95 transition-all duration-300"
        >
          <span>View All Products</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
