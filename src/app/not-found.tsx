"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ShoppingBag, Settings } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SearchOverlay from "@/components/layout/SearchOverlay";

export default function NotFound() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5] dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans selection:bg-[#6F4E37]/20 dark:selection:bg-[#E6C280]/20 selection:text-[#6F4E37] dark:selection:text-[#E6C280]">
      <Navbar onSearchClick={() => setIsSearchOpen(true)} />
      
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      <main className="flex-grow flex flex-col items-center justify-center relative overflow-hidden py-24 sm:py-32">
        {/* Minimal Premium Background Visuals */}
        <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center">
          <div className="absolute w-[600px] h-[600px] bg-white dark:bg-[#6F4E37]/10 rounded-full blur-[100px] opacity-80" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-full border border-stone-200/50 dark:border-zinc-800/50 rounded-full opacity-30" style={{ transform: 'translate(-50%, -50%) scale(1.5)' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-full border border-stone-200/50 dark:border-zinc-800/50 rounded-full opacity-50" style={{ transform: 'translate(-50%, -50%) scale(1.2)' }} />
        </div>

        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 flex flex-col items-center text-center">
          
          {/* Top Label */}
          <span className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-mono font-bold tracking-[0.3em] text-[#6F4E37] dark:text-[#E6C280] uppercase mb-10 border border-[#6F4E37]/15 dark:border-[#E6C280]/15 bg-white/60 dark:bg-zinc-900/60 px-4 py-2 rounded-full shadow-sm backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-[#6F4E37] dark:bg-[#E6C280] animate-pulse" />
            System Notice
          </span>

          {/* Interactive Rotating Gear Tool */}
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-[#6F4E37]/5 dark:bg-[#E6C280]/5 rounded-full blur-2xl" />
            <Settings className="w-24 h-24 sm:w-32 sm:h-32 text-stone-300 dark:text-zinc-800 drop-shadow-md animate-[spin_15s_linear_infinite]" strokeWidth={1} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#FAF8F5] dark:bg-zinc-950 rounded-full shadow-inner border border-stone-200 dark:border-zinc-800" />
            </div>
          </div>

          {/* Typography */}
          <h1 className="text-7xl sm:text-8xl md:text-9xl font-chaney-title leading-none text-zinc-950 dark:text-white mb-2 drop-shadow-sm">
            404
          </h1>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-light font-playfair tracking-tight mb-6 uppercase text-zinc-800 dark:text-zinc-200">
            Path <span className="font-serif italic text-[#6F4E37] dark:text-[#E6C280] normal-case">Not Found</span>
          </h2>
          
          <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400 font-sans max-w-md mx-auto mb-12 leading-relaxed">
            The page you're trying to reach seems to be missing. It may have been moved to a different archive or the link is broken.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md">
            <Link 
              href="/"
              className="w-full flex items-center justify-center gap-3 bg-white dark:bg-zinc-900 hover:bg-stone-50 dark:hover:bg-zinc-800 border border-stone-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 px-8 py-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-all shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Home Base
            </Link>
            <Link 
              href="/shop"
              className="w-full flex items-center justify-center gap-3 bg-zinc-950 dark:bg-white hover:bg-[#6F4E37] dark:hover:bg-zinc-200 text-white dark:text-zinc-900 px-8 py-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              <ShoppingBag className="w-4 h-4" />
              Explore Shop
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
