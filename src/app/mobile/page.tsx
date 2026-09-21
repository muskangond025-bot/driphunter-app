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
import LiveEvents from "@/components/home/LiveEvents";
import CommunityFeed from "@/components/home/CommunityFeed";
import InstagramFeed from "@/components/InstagramFeed";

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

      {/* 5. Brand Grid / Showcase */}
      <BrandShowcase basePath={basePath} />

      {/* 6. Live Events */}
      <LiveEvents />

      {/* 7. Curated For You */}
      <CuratedForYou basePath={basePath} />

      {/* 8. Community Fit Outfits */}
      <CommunityFeed basePath={basePath} />

      {/* 9. Recently Viewed Products */}
      <RecentlyViewed basePath={basePath} />

      {/* 10. Instagram sliding Outfit Feed */}
      <InstagramFeed basePath={basePath} />
    </div>
  );
}
