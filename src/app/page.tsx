"use client";

import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import CategoryBubbles from "@/components/home/CategoryBubbles";
import HeroSection from "@/components/home/HeroSection";
import NewArrivals from "@/components/home/NewArrivals";
import LimitedDrops from "@/components/home/LimitedDrops";
import BrandShowcase from "@/components/home/BrandShowcase";
import BrandTeasers from "@/components/home/BrandTeasers";
import RecentlyViewed from "@/components/RecentlyViewed";
import CommunityFeed from "@/components/home/CommunityFeed";
import LiveEvents from "@/components/home/LiveEvents";
import CuratedForYou from "@/components/home/CuratedForYou";
import InstagramFeed from "@/components/InstagramFeed";
import Footer from "@/components/layout/Footer";
import SearchOverlay from "@/components/layout/SearchOverlay";

export default function Home() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* 2. Primary Navigation Header */}
      <Navbar onSearchClick={() => setIsSearchOpen(true)} />

      {/* Search overlay component */}
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      <main className="flex-grow">
        {/* 4. Hero Section Banner / Slideshow */}
        <HeroSection />

        {/* 3. Category Bubbles */}
        <CategoryBubbles />

        {/* 5. New Arrivals Grid */}
        <NewArrivals />

        {/* 6. Deals of the Day Split Grid */}
        <LimitedDrops />

        {/* 7. Brand Grid / Showcase */}
        <BrandShowcase />

        {/* Brand Teasers */}
        <BrandTeasers />

        {/* Recently Viewed Products */}
        <RecentlyViewed />

        {/* 9. Community Fit Outfits */}
        <CommunityFeed />

        {/* Live Events */}
        <LiveEvents />

        {/* Curated For You */}
        <CuratedForYou />

        {/* 15. Instagram sliding Outfit Feed */}
        <InstagramFeed />
      </main>

      {/* 17. Footers */}
      <Footer />
    </div>
  );
}
