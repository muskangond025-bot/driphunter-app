"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SearchOverlay from "@/components/layout/SearchOverlay";
import { Wallet, CheckCircle2, Search, Plus, ArrowLeft } from "lucide-react";

export default function RedeemGiftCardPage() {
  const router = useRouter();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const [balanceCardNumber, setBalanceCardNumber] = useState("");
  const [balancePin, setBalancePin] = useState("");
  const [isCheckingBalance, setIsCheckingBalance] = useState(false);

  const handleCheckBalance = (e: React.FormEvent) => {
    if (e?.preventDefault) e.preventDefault();
    setIsCheckingBalance(true);
    setTimeout(() => {
      router.push(`/gift-cards/balance?card=${balanceCardNumber}`);
    }, 1000);
  };

  const handleDirectAddToWallet = () => {
    setIsCheckingBalance(true);
    setTimeout(() => {
      router.push(`/profile/wallet?added=${balanceCardNumber}`);
    }, 1000);
  };

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
              <Link href="/gift-cards" className="inline-flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-zinc-500 hover:text-[#E6C280] mb-4 transition-colors group">
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" /> Back to Gift Cards
              </Link>
              
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-zinc-900/80 border border-zinc-800/80 text-white font-mono text-[10px] font-bold uppercase tracking-widest backdrop-blur-xl shadow-lg">
                  <Wallet className="w-3.5 h-3.5 text-[#E6C280]" />
                  Wallet Integration
                </div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-white font-playfair leading-[1.05] uppercase">
                  Add / <span className="font-serif italic font-normal text-[#E6C280] lowercase">Redeem</span>
                </h1>
                <p className="text-sm sm:text-base text-zinc-400 font-sans leading-relaxed max-w-md">
                  Received a DripHunter Gift Card? Check your remaining balance instantly or link it to your account wallet for frictionless checkout on future drops.
                </p>
              </div>

              {/* FLOATING DIGITAL CARD MOCKUP */}
              <div className="pt-8 hidden md:block perspective-1000">
                <div className="relative w-80 h-48 rounded-2xl bg-gradient-to-br from-zinc-800 via-zinc-900 to-black border border-zinc-700/50 shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-6 overflow-hidden transform -rotate-3 hover:rotate-0 transition-all duration-700 hover:scale-[1.02] hover:shadow-[0_30px_60px_rgba(230,194,128,0.1)] cursor-pointer group">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-[#E6C280]/10 blur-3xl rounded-full group-hover:bg-[#E6C280]/20 transition-colors duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="relative z-10 h-full flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <span className="font-playfair text-xl tracking-widest text-white">DRIPHUNTER</span>
                      <Wallet className="w-5 h-5 text-[#E6C280]" />
                    </div>
                    <div className="space-y-1 text-zinc-300">
                      <div className="text-[9px] font-mono tracking-[0.3em] uppercase text-zinc-500">Digital Gift Card</div>
                      <div className="font-mono tracking-widest text-lg text-zinc-200">**** **** **** 4920</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - THE FORM */}
          <div className="w-full lg:w-1/2 bg-white dark:bg-zinc-950 p-8 sm:p-12 lg:p-20 xl:p-24 flex flex-col justify-center relative">
            <div className="max-w-md w-full mx-auto relative z-10">
              
              <form onSubmit={handleCheckBalance} className="space-y-8 animate-fade-in">
                
                <div className="space-y-8">
                  {/* Floating Label Style Inputs */}
                  <div className="relative group">
                    <input
                      type="text"
                      required
                      placeholder=" "
                      value={balanceCardNumber}
                      onChange={(e) => setBalanceCardNumber(e.target.value)}
                      className="peer w-full bg-transparent border-0 border-b-2 border-zinc-200 dark:border-zinc-800 focus:border-[#6F4E37] dark:focus:border-[#E6C280] px-0 py-3 text-xl font-mono font-bold text-zinc-900 dark:text-white outline-none transition-all focus:ring-0 uppercase"
                    />
                    <label className="absolute left-0 top-3 text-xs font-mono font-bold uppercase tracking-[0.2em] text-zinc-400 peer-focus:-translate-y-7 peer-focus:text-[10px] peer-focus:text-[#6F4E37] dark:peer-focus:text-[#E6C280] peer-valid:-translate-y-7 peer-valid:text-[10px] transition-all duration-300 pointer-events-none">
                      Gift Card Number
                    </label>
                  </div>

                  <div className="relative group pt-4">
                    <input
                      type="text"
                      required
                      placeholder=" "
                      value={balancePin}
                      onChange={(e) => setBalancePin(e.target.value)}
                      className="peer w-full bg-transparent border-0 border-b-2 border-zinc-200 dark:border-zinc-800 focus:border-[#6F4E37] dark:focus:border-[#E6C280] px-0 py-3 text-xl font-mono font-bold tracking-[0.5em] text-zinc-900 dark:text-white outline-none transition-all focus:ring-0 uppercase"
                    />
                    <label className="absolute left-0 top-5 text-xs font-mono font-bold uppercase tracking-[0.2em] text-zinc-400 peer-focus:-translate-y-7 peer-focus:text-[10px] peer-focus:text-[#6F4E37] dark:peer-focus:text-[#E6C280] peer-valid:-translate-y-7 peer-valid:text-[10px] transition-all duration-300 pointer-events-none">
                      Security PIN
                    </label>
                  </div>
                </div>

                <div className="flex flex-col gap-4 pt-8">
                  <button
                    type="submit"
                    disabled={isCheckingBalance}
                    className="w-full bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 py-5 rounded-none text-[11px] font-mono font-black uppercase tracking-[0.2em] transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 disabled:opacity-50 disabled:hover:translate-y-0 flex justify-center items-center gap-3 cursor-pointer"
                  >
                    {isCheckingBalance ? <div className="w-4 h-4 border-2 border-white/20 dark:border-zinc-950/20 border-t-white dark:border-t-zinc-950 rounded-full animate-spin" /> : <Search className="w-4 h-4" />}
                    Check Balance
                  </button>
                  <button
                    type="button"
                    onClick={handleDirectAddToWallet}
                    disabled={isCheckingBalance}
                    className="w-full bg-transparent border-2 border-zinc-950 dark:border-white text-zinc-950 dark:text-white py-4.5 rounded-none text-[11px] font-mono font-black uppercase tracking-[0.2em] transition-all hover:bg-zinc-950 hover:text-white dark:hover:bg-white dark:hover:text-zinc-950 disabled:opacity-50 flex justify-center items-center gap-3 cursor-pointer"
                  >
                    {isCheckingBalance ? <div className="w-4 h-4 border-2 border-zinc-950/20 dark:border-white/20 border-t-zinc-950 dark:border-t-white rounded-full animate-spin" /> : <Plus className="w-4 h-4" />}
                    Add to Wallet Directly
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* HELP SECTIONS */}
        <section className="bg-zinc-50 dark:bg-zinc-950/50 border-t border-zinc-200 dark:border-zinc-900/50 py-24">
          <div className="max-w-[1200px] mx-auto px-6 sm:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 text-left">
              <div className="space-y-6 group">
                <div className="w-12 h-12 rounded-full bg-zinc-200/50 dark:bg-zinc-900 flex items-center justify-center text-zinc-500 transition-colors group-hover:bg-[#6F4E37]/10 dark:group-hover:bg-[#E6C280]/10 group-hover:text-[#6F4E37] dark:group-hover:text-[#E6C280]">
                  <Search className="w-5 h-5" />
                </div>
                <h3 className="text-2xl font-playfair tracking-wide text-zinc-950 dark:text-white">
                  Where is my PIN?
                </h3>
                <div className="space-y-4 pb-2">
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed">
                    <strong className="text-zinc-900 dark:text-zinc-200 font-medium">Physical Cards:</strong> Gently scratch off the silver panel on the back of your card to reveal your 6-digit Security PIN.
                  </p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed">
                    <strong className="text-zinc-900 dark:text-zinc-200 font-medium">Digital Cards:</strong> Your 6-digit Security PIN is included in the delivery email right below your 16-digit Gift Card Number.
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#6F4E37] dark:text-[#E6C280] hover:text-zinc-950 dark:hover:text-white transition-colors"
                >
                  Contact Support &rarr;
                </Link>
              </div>
              
              <div className="space-y-6 group">
                <div className="w-12 h-12 rounded-full bg-zinc-200/50 dark:bg-zinc-900 flex items-center justify-center text-zinc-500 transition-colors group-hover:bg-[#6F4E37]/10 dark:group-hover:bg-[#E6C280]/10 group-hover:text-[#6F4E37] dark:group-hover:text-[#E6C280]">
                  <Wallet className="w-5 h-5" />
                </div>
                <h3 className="text-2xl font-playfair tracking-wide text-zinc-950 dark:text-white">
                  How to Redeem Offline?
                </h3>
                <div className="space-y-4 pb-2">
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed">
                    You can use your DripHunter gift card at any of our physical flagship archive locations. Simply present the physical card or the digital email barcode to the cashier at checkout.
                  </p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed">
                    If you have already added the card to your digital wallet here, you can just tap your phone at the terminal to pay!
                  </p>
                </div>
                <Link
                  href="/store-locator"
                  className="inline-flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#6F4E37] dark:text-[#E6C280] hover:text-zinc-950 dark:hover:text-white transition-colors"
                >
                  Find a Store &rarr;
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />

      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </div>
  );
}
