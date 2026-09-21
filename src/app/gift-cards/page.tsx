"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SearchOverlay from "@/components/layout/SearchOverlay";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";
import { Gift, ArrowRight, Zap, RefreshCcw, ChevronDown, ChevronUp, Briefcase, Package, Smartphone, Share2, Copy } from "lucide-react";

export default function GiftCardsPage() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [isCopied, setIsCopied] = useState(false);

  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation({ threshold: 0.1 });
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation({ threshold: 0.1 });
  const { ref: vaultRef, isVisible: vaultVisible } = useScrollAnimation({ threshold: 0.1 });
  const { ref: bannerRef, isVisible: bannerVisible } = useScrollAnimation({ threshold: 0.1 });
  const { ref: howRef, isVisible: howVisible } = useScrollAnimation({ threshold: 0.1 });
  const { ref: faqRef, isVisible: faqVisible } = useScrollAnimation({ threshold: 0.1 });

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const faqs = [
    { q: "Does the gift card expire?", a: "No, DripHunter gift cards never expire. You can cop the latest drops whenever you're ready." },
    { q: "Can I use it on sale items?", a: "Yes, gift cards act as store credit and can be used on any item, including archive clearance and limited-time sales." },
    { q: "How is it delivered?", a: "Gift cards are delivered instantly via email to the recipient's inbox. You can also schedule delivery for a future date." },
    { q: "Can I get a refund for a gift card?", a: "Gift cards are non-refundable and cannot be exchanged for cash, except where required by law." },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-950 dark:text-zinc-50 flex flex-col font-sans selection:bg-[#E6C280]/30 selection:text-[#E6C280]">
      <Navbar onSearchClick={() => setIsSearchOpen(true)} />

      <main className="flex-grow">
        


        {/* 1. HERO SECTION - HIGH VISUAL IMPACT */}
        <section ref={heroRef} className="relative w-full min-h-[70vh] flex flex-col justify-center overflow-hidden bg-zinc-950 select-none border-b border-zinc-800">
          {/* Background Image & Effects */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1920&q=80" 
              alt="Premium Gift Background" 
              className="w-full h-full object-cover opacity-30 mix-blend-overlay scale-105 animate-[pulse_10s_ease-in-out_infinite]"
            />
            {/* Glossy gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-950/90 via-zinc-900/60 to-black/95 mix-blend-multiply" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#E6C280]/20 via-transparent to-transparent opacity-60" />
          </div>

          <div className={cn("relative z-10 max-w-[1600px] mx-auto px-4 sm:px-12 md:px-16 lg:px-20 flex flex-col items-center text-center pb-20 sm:pb-40 transition-all duration-1000 ease-out", heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
            



            
            <h1 className="text-4xl sm:text-7xl md:text-8xl lg:text-[100px] font-chaney-title uppercase tracking-tighter mb-4 leading-none text-white drop-shadow-2xl">
              GIVE THEM <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E6C280] via-[#f7e0a8] to-[#6F4E37] inline-block mt-2 sm:mt-0">THE DRIP.</span>
            </h1>
            <p className="text-sm md:text-lg text-zinc-300 font-sans leading-relaxed max-w-2xl mx-auto drop-shadow-md">
              Let them choose their own grails with a premium DripHunter digital gift card. Sent instantly, zero hassle.
            </p>
          </div>
        </section>

        {/* 2. THE 4-CARD CREATIVE GRID (Reference Style) */}
        <section ref={gridRef} className="relative z-20 max-w-[1600px] mx-auto px-4 sm:px-12 md:px-16 lg:px-20 -mt-10 sm:-mt-28 mb-16 sm:mb-24">
          <div className={cn("grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 lg:gap-8 transition-all duration-1000 delay-200 ease-out", gridVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12")}>
            
            {[
              { title: "Occasion Gift Cards", icon: <Gift className="w-10 h-10 text-white" />, iconBg: "bg-blue-500", cardBg: "bg-[#FFF6E5]", href: "/gift-cards/buy", highlight: "★" },
              { title: "Physical Gift Cards", icon: <Package className="w-10 h-10 text-white" />, iconBg: "bg-purple-500", cardBg: "bg-[#FFF6E5]", href: "/gift-cards/physical", highlight: "✉" },
              { title: "Bulk Order", icon: <Briefcase className="w-10 h-10 text-white" />, iconBg: "bg-zinc-900", cardBg: "bg-[#FFF6E5]", href: "/gift-cards/bulk", highlight: "✦" },
              { title: "Add / Redeem", icon: <Smartphone className="w-10 h-10 text-white" />, iconBg: "bg-emerald-500", cardBg: "bg-[#FFF6E5]", href: "/gift-cards/redeem", highlight: "＋" },
            ].map((card, idx) => (
              <Link 
                key={idx}
                href={card.href}
                className={`group relative flex flex-col items-center justify-between p-4 sm:p-8 rounded-2xl sm:rounded-[36px] overflow-hidden cursor-pointer shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${card.cardBg} border-2 border-transparent hover:border-[#F59E0B] isolate`}
              >
                {/* Decorative Top Pattern overlay */}
                <div className="absolute top-0 left-0 w-full h-32 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-10 pointer-events-none" />
                <div className="absolute top-0 w-full h-full bg-gradient-to-b from-white/60 to-transparent z-0 pointer-events-none" />
                
                {/* Graphic Box */}
                <div className="relative z-10 w-full aspect-[4/3] sm:aspect-[4/3] rounded-xl sm:rounded-2xl bg-white/50 shadow-inner flex items-center justify-center mb-4 sm:mb-6 overflow-hidden border border-white/80 p-1.5 sm:p-2 group-hover:bg-white transition-colors">
                  <div className={`w-full h-full ${card.iconBg} rounded-lg sm:rounded-xl shadow-md flex items-center justify-center relative overflow-hidden transform group-hover:scale-105 transition-transform duration-500`}>
                    <div className="absolute top-1 sm:top-2 right-1 sm:right-2 text-white/50 font-black text-sm sm:text-xl">{card.highlight}</div>
                    <div className="scale-75 sm:scale-100">{card.icon}</div>
                  </div>
                </div>

                <h3 className="relative z-10 text-xs sm:text-lg font-chaney-title uppercase tracking-wider text-zinc-900 text-center leading-tight min-h-[40px] sm:min-h-[48px] flex items-center mb-3 sm:mb-4">
                  {card.title}
                </h3>

                {/* Circular Arrow Button */}
                <div className="relative z-10 w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-[#F59E0B] text-white flex items-center justify-center shadow-lg transform group-hover:bg-[#D97706] group-hover:scale-110 transition-all duration-300">
                  <ArrowRight className="w-4 h-4 sm:w-6 sm:h-6" strokeWidth={3} />
                </div>
              </Link>
            ))}

          </div>
        </section>

        {/* 3. SOMETHING FOR EVERY PRICE RANGE (THE VAULT GRAPHIC) */}
        <section ref={vaultRef} className="py-8 bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-900 overflow-hidden relative">
          <div className={cn("max-w-[1600px] mx-auto px-4 sm:px-12 md:px-16 lg:px-20 text-center transition-all duration-1000 ease-out", vaultVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
            
            <h2 className="text-3xl md:text-5xl font-chaney-title uppercase tracking-tight text-zinc-950 dark:text-white mb-2">
              Something for <br className="sm:hidden"/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6F4E37] to-[#E6C280]">Every Range</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 font-sans mb-6 max-w-2xl mx-auto text-sm">From essential accessories to ultra-rare archive pieces, we've got a gift card bracket for every budget.</p>

            {/* The Huge Visual Graphic Layout */}
            <div className="relative max-w-3xl w-full mx-auto aspect-[4/5] sm:aspect-[16/9] bg-zinc-950 rounded-2xl sm:rounded-[32px] border border-zinc-800 shadow-2xl overflow-hidden p-2 sm:p-3 group">
              
              {/* Center Decorative Element (The "Gift" Ribbon/Lock) */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none">
                <div className="relative flex items-center justify-center">
                  <div className="absolute inset-0 bg-[#E6C280] blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-1000" />
                  <div className="w-16 h-16 sm:w-32 sm:h-32 bg-zinc-900 rounded-full border-[2px] sm:border-[4px] border-[#E6C280] flex items-center justify-center shadow-[0_0_50px_rgba(230,194,128,0.3)] z-10">
                    <Gift className="w-6 h-6 sm:w-12 sm:h-12 text-[#E6C280]" />
                  </div>
                  {/* Ribbons */}
                  <div className="absolute w-1 h-[200vh] bg-[#E6C280]/20 z-0" />
                  <div className="absolute w-[200vw] h-1 bg-[#E6C280]/20 z-0" />
                </div>
              </div>

              {/* 4 Quadrants Grid */}
              <div className="grid grid-cols-2 grid-rows-2 h-full w-full gap-2 sm:gap-4 relative z-10">
                
                {/* Q1: 10,000+ */}
                <Link href="/gift-cards/buy?amount=10000" className="relative rounded-xl sm:rounded-[32px] overflow-hidden group/quad block bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 hover:border-[#E6C280]/50 transition-colors">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800')] bg-cover bg-center opacity-30 group-hover/quad:scale-110 group-hover/quad:opacity-50 transition-all duration-700 mix-blend-luminosity" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-3 sm:p-8 w-full flex justify-between items-end">
                    <div className="text-left">
                      <span className="text-[7px] sm:text-[9px] font-mono text-[#E6C280] uppercase tracking-widest block mb-0.5 sm:mb-1">The Grail Vault</span>
                      <h3 className="text-sm sm:text-3xl font-chaney-title text-white">₹10,001<span className="text-xs sm:text-xl text-zinc-500">+</span></h3>
                    </div>
                    <div className="w-6 h-6 sm:w-10 sm:h-10 rounded-full bg-white text-black flex items-center justify-center group-hover/quad:bg-[#E6C280] transition-colors shadow-xl shrink-0">
                      <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                    </div>
                  </div>
                </Link>

                {/* Q2: 5001 to 10000 */}
                <Link href="/gift-cards/buy?amount=5000" className="relative rounded-xl sm:rounded-[32px] overflow-hidden group/quad block bg-gradient-to-bl from-zinc-800 to-zinc-950 border border-zinc-800 hover:border-blue-500/50 transition-colors">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800')] bg-cover bg-center opacity-30 group-hover/quad:scale-110 group-hover/quad:opacity-50 transition-all duration-700 mix-blend-luminosity" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-3 sm:p-8 w-full flex justify-between items-end">
                    <div className="text-left">
                      <span className="text-[7px] sm:text-[9px] font-mono text-blue-400 uppercase tracking-widest block mb-0.5 sm:mb-1">Premium Archive</span>
                      <h3 className="text-sm sm:text-2xl font-chaney-title text-white">₹5,001 <br className="hidden sm:block"/><span className="text-zinc-500 text-xs sm:text-lg">to</span><br className="sm:hidden" /> ₹10,000</h3>
                    </div>
                    <div className="w-6 h-6 sm:w-10 sm:h-10 rounded-full bg-white text-black flex items-center justify-center group-hover/quad:bg-blue-500 group-hover/quad:text-white transition-colors shadow-xl shrink-0">
                      <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                    </div>
                  </div>
                </Link>

                {/* Q3: 2000 to 5000 */}
                <Link href="/gift-cards/buy?amount=2000" className="relative rounded-xl sm:rounded-[32px] overflow-hidden group/quad block bg-gradient-to-tr from-zinc-900 to-black border border-zinc-800 hover:border-orange-500/50 transition-colors">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800')] bg-cover bg-center opacity-30 group-hover/quad:scale-110 group-hover/quad:opacity-50 transition-all duration-700 mix-blend-luminosity" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-3 sm:p-8 w-full flex justify-between items-end">
                    <div className="text-left">
                      <span className="text-[7px] sm:text-[9px] font-mono text-orange-400 uppercase tracking-widest block mb-0.5 sm:mb-1">Cult Classics</span>
                      <h3 className="text-sm sm:text-2xl font-chaney-title text-white">₹2,000 <br className="hidden sm:block"/><span className="text-zinc-500 text-xs sm:text-lg">to</span><br className="sm:hidden" /> ₹5,000</h3>
                    </div>
                    <div className="w-6 h-6 sm:w-10 sm:h-10 rounded-full bg-white text-black flex items-center justify-center group-hover/quad:bg-orange-500 group-hover/quad:text-white transition-colors shadow-xl shrink-0">
                      <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                    </div>
                  </div>
                </Link>

                {/* Q4: Under 2000 */}
                <Link href="/gift-cards/buy?amount=1000" className="relative rounded-xl sm:rounded-[32px] overflow-hidden group/quad block bg-gradient-to-tl from-zinc-800 to-zinc-950 border border-zinc-800 hover:border-rose-500/50 transition-colors">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800')] bg-cover bg-center opacity-30 group-hover/quad:scale-110 group-hover/quad:opacity-50 transition-all duration-700 mix-blend-luminosity" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-3 sm:p-8 w-full flex justify-between items-end">
                    <div className="text-left">
                      <span className="text-[7px] sm:text-[9px] font-mono text-rose-400 uppercase tracking-widest block mb-0.5 sm:mb-1">Stocking Stuffers</span>
                      <h3 className="text-sm sm:text-2xl font-chaney-title text-white">Under <br className="hidden sm:block"/>₹2,000</h3>
                    </div>
                    <div className="w-6 h-6 sm:w-10 sm:h-10 rounded-full bg-white text-black flex items-center justify-center group-hover/quad:bg-rose-500 group-hover/quad:text-white transition-colors shadow-xl shrink-0">
                      <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                    </div>
                  </div>
                </Link>

              </div>
            </div>

          </div>
        </section>

        {/* 4. SHARE NOW BANNER CTA */}
        <section ref={bannerRef} className="py-12 bg-white dark:bg-zinc-950 pb-24">
          <div className={cn("max-w-[1600px] mx-auto px-6 sm:px-12 md:px-16 lg:px-20 transition-all duration-1000 delay-200 ease-out", bannerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
            <div className="rounded-[40px] bg-gradient-to-r from-[#6F4E37] via-[#8B674B] to-[#6F4E37] p-8 sm:p-12 shadow-2xl relative overflow-hidden flex flex-col sm:flex-row items-center justify-between text-center sm:text-left gap-8">
              {/* Background texture */}
              <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
              
              <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-chaney-title text-white uppercase tracking-tight mb-2">Spread the Drip</h2>
                <p className="text-white/80 font-sans text-sm md:text-base max-w-md">Drop a hint or send a gift directly. Share this page with your friends, family, or squad instantly.</p>
              </div>

              <div className="relative z-10 flex gap-4 w-full sm:w-auto flex-col sm:flex-row">
                <button 
                  onClick={handleShare}
                  className="bg-white hover:bg-zinc-100 text-[#6F4E37] px-8 py-5 rounded-2xl font-bold uppercase tracking-widest text-xs transition-colors shadow-xl flex items-center justify-center gap-3 w-full sm:w-auto active:scale-95 cursor-pointer"
                >
                  {isCopied ? <Copy className="w-5 h-5" /> : <Share2 className="w-5 h-5" />}
                  {isCopied ? "Link Copied!" : "Share Now"}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS SECTION */}
        <section ref={howRef} className="py-12 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/50">
          <div className={cn("max-w-[1600px] mx-auto px-6 sm:px-12 md:px-16 lg:px-20 text-center transition-all duration-1000 ease-out", howVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
            <h2 className="text-3xl md:text-5xl font-chaney-title uppercase tracking-tight text-zinc-950 dark:text-white mb-10">
              How It <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280] lowercase">Works</span>
            </h2>
            <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-12 transition-all duration-1000 delay-200 ease-out", howVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl flex items-center justify-center mb-8 transform hover:scale-110 hover:-rotate-3 transition-transform">
                  <Zap className="w-8 h-8 text-[#6F4E37] dark:text-[#E6C280]" />
                </div>
                <h3 className="text-xl font-bold font-chaney-title uppercase tracking-wider mb-3 dark:text-white">1. Select</h3>
                <p className="text-zinc-500 font-sans text-sm max-w-xs mx-auto leading-relaxed">Choose your amount and pick a premium design that matches their vibe.</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl flex items-center justify-center mb-8 transform hover:scale-110 hover:rotate-3 transition-transform">
                  <Gift className="w-8 h-8 text-[#6F4E37] dark:text-[#E6C280]" />
                </div>
                <h3 className="text-xl font-bold font-chaney-title uppercase tracking-wider mb-3 dark:text-white">2. Personalize</h3>
                <p className="text-zinc-500 font-sans text-sm max-w-xs mx-auto leading-relaxed">Add a custom message and schedule it to arrive exactly when you want.</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl flex items-center justify-center mb-8 transform hover:scale-110 hover:-rotate-3 transition-transform">
                  <RefreshCcw className="w-8 h-8 text-[#6F4E37] dark:text-[#E6C280]" />
                </div>
                <h3 className="text-xl font-bold font-chaney-title uppercase tracking-wider mb-3 dark:text-white">3. Cop</h3>
                <p className="text-zinc-500 font-sans text-sm max-w-xs mx-auto leading-relaxed">They receive the digital card and use it instantly to cop archive drops.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section id="faq-section" ref={faqRef} className="py-12 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
          <div className={cn("max-w-[1600px] mx-auto px-6 sm:px-12 md:px-16 lg:px-20 transition-all duration-1000 ease-out", faqVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
              
              <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit space-y-6">
                <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-[#6F4E37] dark:text-[#E6C280] uppercase">
                  COMMON INQUIRIES
                </span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-zinc-950 dark:text-white font-playfair leading-[1.05]">
                  Answers to <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280]">Everything</span>
                </h2>
                <div className="w-12 h-[2px] bg-[#6F4E37] dark:bg-[#E6C280] rounded-full" />
                <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed">
                  Have questions about our gift cards, expiration, or delivery methods? Find quick answers here to ensure a seamless gifting experience.
                </p>
                <div className="pt-2">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-100 hover:text-[#6F4E37] dark:hover:text-[#E6C280] transition-colors group"
                  >
                    <span>Contact Support</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-8 space-y-4">
                {faqs.map((faq, index) => (
                  <div 
                    key={index} 
                    className="group border border-stone-200 dark:border-zinc-800 rounded-3xl overflow-hidden bg-white dark:bg-zinc-900/50 hover:border-[#6F4E37]/30 dark:hover:border-[#E6C280]/30 transition-all duration-300 shadow-sm hover:shadow-md"
                  >
                    <button 
                      onClick={() => toggleFaq(index)}
                      className="w-full text-left p-6 sm:p-8 flex justify-between items-center transition-colors cursor-pointer outline-none"
                    >
                      <span className="font-sans font-bold text-base sm:text-lg tracking-wide text-zinc-900 dark:text-zinc-100 pr-6 group-hover:text-[#6F4E37] dark:group-hover:text-[#E6C280] transition-colors">{faq.q}</span>
                      <div className={`shrink-0 w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${openFaq === index ? 'bg-[#6F4E37] dark:bg-[#E6C280] border-transparent text-white dark:text-zinc-900 rotate-180' : 'border-stone-200 dark:border-zinc-700 bg-stone-50 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 group-hover:border-[#6F4E37]/30 dark:group-hover:border-[#E6C280]/30'}`}>
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </button>
                    <div 
                      className={`overflow-hidden transition-all duration-500 ease-in-out ${openFaq === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                    >
                      <div className="px-6 sm:px-8 pb-8 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed">
                        {faq.a}
                      </div>
                    </div>
                  </div>
                ))}
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

function SparkleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/>
    </svg>
  );
}
