"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SearchOverlay from "@/components/layout/SearchOverlay";
import { ArrowLeft, Wallet, CheckCircle2 } from "lucide-react";

export default function GiftCardBalancePage() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-950 dark:text-zinc-50 flex flex-col font-sans selection:bg-[#6F4E37]/20 selection:text-[#6F4E37]">
      <Navbar onSearchClick={() => setIsSearchOpen(true)} />

      <main className="flex-grow flex flex-col">
        <div className="flex flex-col lg:flex-row min-h-[calc(100vh-80px)]">
          {/* LEFT SIDE - VISUAL & COPY */}
          <div className="w-full lg:w-1/2 bg-gradient-to-br from-zinc-950 via-black to-zinc-950 p-8 sm:p-12 lg:p-20 xl:p-24 flex flex-col justify-center relative overflow-hidden border-r border-zinc-900 shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]">
            {/* Ambient Background Warm Glow */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#E6C280]/5 blur-[150px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-rose-900/10 blur-[150px] rounded-full pointer-events-none" />
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none mix-blend-overlay" />

            <div className="relative z-10 space-y-10 max-w-xl">
              <Link href="/gift-cards/redeem" className="inline-flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-zinc-500 hover:text-[#E6C280] mb-4 transition-colors group">
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" /> Back to Redeem
              </Link>
              
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-zinc-900/80 border border-zinc-800/80 text-white font-mono text-[10px] font-bold uppercase tracking-widest backdrop-blur-xl shadow-lg">
                  <Wallet className="w-3.5 h-3.5 text-[#E6C280]" />
                  Card Status
                </div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-white font-playfair leading-[1.05] uppercase">
                  Available <span className="font-serif italic font-normal text-[#E6C280] lowercase">Balance</span>
                </h1>
                <p className="text-sm sm:text-base text-zinc-400 font-sans leading-relaxed max-w-md">
                  Your DripHunter Gift Card is valid and ready to use. You can apply it during checkout or add the funds directly to your wallet for a faster experience.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - BALANCE INFO */}
          <div className="w-full lg:w-1/2 bg-white dark:bg-zinc-950 p-8 sm:p-12 lg:p-20 xl:p-24 flex flex-col justify-center relative">
            <div className="max-w-md w-full mx-auto relative z-10">
              
              <div className="text-center space-y-8 animate-fade-in-up">
                <div className="w-24 h-24 rounded-full bg-[#6F4E37]/10 dark:bg-[#E6C280]/10 border border-[#6F4E37]/30 dark:border-[#E6C280]/30 flex items-center justify-center mx-auto shadow-[0_0_50px_rgba(230,194,128,0.15)]">
                  <CheckCircle2 className="w-12 h-12 text-[#6F4E37] dark:text-[#E6C280]" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-[#6F4E37] dark:text-[#E6C280] uppercase tracking-[0.3em] font-bold block mb-4">
                    Card Verified
                  </span>
                  <h4 className="text-[10px] font-mono font-bold text-zinc-500 dark:text-zinc-400 mb-2 uppercase tracking-[0.2em]">
                    Available Balance
                  </h4>
                  <p className="text-6xl sm:text-7xl font-chaney-title text-zinc-950 dark:text-white drop-shadow-sm">
                    ₹2,500
                  </p>
                </div>
                <div className="flex flex-col gap-4 pt-6">
                  <Link
                    href="/profile/wallet?added=true"
                    className="w-full bg-[#6F4E37] dark:bg-[#E6C280] text-white dark:text-zinc-950 py-5 rounded-none text-[11px] font-mono font-black uppercase tracking-[0.2em] transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 cursor-pointer flex justify-center items-center"
                  >
                    Add ₹2,500 to Wallet
                  </Link>
                  <Link
                    href="/gift-cards/redeem"
                    className="text-[10px] font-mono font-bold text-zinc-400 hover:text-zinc-950 dark:hover:text-white uppercase tracking-[0.2em] transition-colors cursor-pointer pt-2 flex justify-center"
                  >
                    Check Another Card
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>

      <Footer />
      
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
}
