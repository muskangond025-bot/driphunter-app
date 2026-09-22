"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Flame, Sparkles, Clock, MapPin, Search } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { SectionHeading } from "@/components/ui/SectionHeading";
import ProductCard from "@/components/product/ProductCard";
import { LIMITED_DROPS, MOCK_PRODUCTS } from "@/data/mockData";

const dealCards = [
  {
    id: "deal-1",
    tag: "Today Only",
    titleLine1: "Deal",
    titleLine2: "of the",
    titleLine3: "Day",
    offer: "40% Off Today",
    description: "Use code DAY40 at checkout. Applicable on all new collections.",
    gradientClass: "from-indigo-50/60 via-white to-purple-50/60 border-indigo-150/50 hover:border-indigo-300/40",
    btnLabel: "Shop Now",
    footerText: "EXPIRES MIDNIGHT",
    href: "/deals",
    image: "/deal_day_new_collection.png"
  },
  {
    id: "deal-2",
    tag: "Weekly Special",
    titleLine1: "Deal",
    titleLine2: "of the",
    titleLine3: "Week",
    offer: "Free Accessories",
    description: "Get a complimentary leather belt or cap with orders above ₹9,999.",
    gradientClass: "from-red-50/60 via-white to-stone-50 border-red-150/50 hover:border-red-300/40",
    btnLabel: "Claim Gift",
    footerText: "ENDS SUNDAY",
    href: "/deals",
    image: "/deal_week_accessories.png"
  },
  {
    id: "deal-3",
    tag: "Limited Archive",
    titleLine1: "Best",
    titleLine2: "Deal",
    titleLine3: "Big Offer",
    offer: "Up to 50% Off",
    description: "Exclusive archive sale on classic outerwear and saddlebags.",
    gradientClass: "from-amber-50/60 via-white to-zinc-50 border-amber-150/50 hover:border-amber-300/40",
    btnLabel: "Explore Deals",
    footerText: "LIMITED STOCK",
    href: "/deals",
    image: "/deal_archive_outerwear.png"
  }
];

export default function LimitedDrops({ basePath = "" }: { basePath?: string }) {
  const { ref, isVisible } = useScrollAnimation();
  const [timeLeft, setTimeLeft] = useState("04h 28m 15s");

  useEffect(() => {
    const target = new Date();
    target.setHours(target.getHours() + 4);
    target.setMinutes(target.getMinutes() + 28);
    target.setSeconds(target.getSeconds() + 15);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = target.getTime() - now;

      if (difference <= 0) {
        clearInterval(timer);
        setTimeLeft("00h 00m 00s");
        return;
      }

      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      const pad = (num: number) => String(num).padStart(2, "0");
      setTimeLeft(`${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section ref={ref} className="bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white py-10 border-y border-zinc-100 dark:border-zinc-900 select-none overflow-hidden relative">
      
      {/* Premium Editorial Header */}
      <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 mb-6 md:mb-8">
        <div className="border-b border-zinc-100 dark:border-zinc-800/80 pb-5">
          {/* Desktop Header */}
          <div className="hidden md:block">
            <SectionHeading
              variant="playfair-sm"
              className="text-zinc-900 dark:text-zinc-100"
              title={<>Deals <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280]">of the Day</span></>}
              eyebrow={
                <div className="flex items-center gap-2 mb-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-xs font-semibold tracking-[0.3em] text-[#6F4E37] dark:text-[#E6C280] uppercase block font-mono">
                    Today's Specials
                  </span>
                </div>
              }
              action={
                <div className="flex flex-col items-end gap-3 max-w-md w-auto">
                  {/* Live countdown */}
                  <div className="flex items-center gap-2.5 text-xs font-mono text-[#6F4E37] dark:text-[#E6C280] bg-[#6F4E37]/5 dark:bg-[#E6C280]/5 border border-[#6F4E37]/20 dark:border-[#E6C280]/20 pl-3.5 pr-1.5 py-1 rounded-full select-none self-end shadow-[0_2px_10px_rgba(111,78,55,0.06)] dark:shadow-[0_2px_10px_rgba(230,194,128,0.04)] hover:shadow-[0_4px_15px_rgba(111,78,55,0.12)] dark:hover:shadow-[0_4px_15px_rgba(230,194,128,0.08)] transition-all duration-300 backdrop-blur-[2px]">
                    <Clock className="w-3.5 h-3.5 text-[#6F4E37] dark:text-[#E6C280] animate-pulse" />
                    <span className="uppercase tracking-wider font-semibold">Ends In</span>
                    <span className="bg-white/95 dark:bg-zinc-900 border border-[#6F4E37]/15 dark:border-[#E6C280]/15 px-2.5 py-1 rounded-full text-zinc-950 dark:text-zinc-50 font-bold font-mono shadow-[0_1px_3px_rgba(0,0,0,0.05)] select-all tracking-wider text-xs">
                      {timeLeft}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-400 font-sans font-light leading-relaxed text-right">
                    Exclusive daily promotions on selected premium collections. Deals expire at midnight.
                  </p>
                </div>
              }
            />
          </div>

          {/* Mobile Header */}
          <div className="md:hidden">
            <SectionHeading
              variant="playfair"
              className="text-zinc-950 dark:text-zinc-50"
              title={<>LIMITED <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280]">DROPS</span></>}
              eyebrow={
                <div className="flex items-center gap-2 mb-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#6F4E37] dark:bg-[#E6C280] animate-pulse" />
                  <span className="text-[10px] font-semibold tracking-[0.25em] text-[#6F4E37] dark:text-[#E6C280] uppercase font-mono">
                    Exclusive pieces. Limited availability.
                  </span>
                </div>
              }
              action={
                <div className="flex flex-col mt-2 gap-2">
                  <div className="flex items-center gap-2 text-[10px] font-mono text-[#6F4E37] dark:text-[#E6C280] bg-[#6F4E37]/5 dark:bg-[#E6C280]/5 border border-[#6F4E37]/20 dark:border-[#E6C280]/20 pl-2.5 pr-1 py-0.5 rounded-full self-start backdrop-blur-[2px]">
                    <Clock className="w-3 h-3 animate-pulse" />
                    <span className="uppercase tracking-wider font-semibold">Ends In</span>
                    <span className="bg-white/95 dark:bg-zinc-900 border border-[#6F4E37]/15 dark:border-[#E6C280]/15 px-1.5 py-0.5 rounded-full text-zinc-950 dark:text-zinc-50 font-bold shadow-[0_1px_3px_rgba(0,0,0,0.05)] tracking-wider">
                      {timeLeft}
                    </span>
                  </div>
                  <Link
                    href={`${basePath}/shop`}
                    className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold tracking-wider text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                  >
                    <span>VIEW ALL</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              }
            />
          </div>
        </div>
      </div>

      {/* 3-Column Premium Deals Grid (Desktop Only) */}
      <div
        className={`hidden md:block w-full transition-all duration-1000 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div 
          className="grid md:grid-cols-3 gap-4 md:gap-8 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 scrollbar-none pb-6 md:pb-0" 
        >
          {dealCards.map((card) => (
            <div
              key={card.id}
              className="w-auto shrink-0 border border-zinc-800 rounded-3xl overflow-hidden flex flex-col justify-between shadow-md hover:shadow-[0_20px_50px_rgba(111,78,55,0.15)] transition-all duration-500 hover:-translate-y-1.5 group p-6 min-h-[380px] relative bg-zinc-950"
            >
              {/* Background Image */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <img
                  src={card.image}
                  alt={card.tag}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {/* Premium dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/65 to-zinc-950/20 z-10" />
              </div>

              {/* Header block */}
              <div className="relative z-20">
                <span className="text-[10px] font-bold tracking-[0.2em] text-amber-400 uppercase font-mono block">
                  {card.tag}
                </span>
              </div>

              {/* Centered Main Typographical Banner */}
              <div className="my-auto flex flex-col items-start text-left pt-4 pb-6 relative z-20">
                <h3 className="text-2xl sm:text-3xl font-light uppercase tracking-tight text-white font-playfair leading-none">
                  {card.titleLine1} <span className="font-serif italic font-normal text-amber-100 inline">{card.titleLine2}</span> {card.titleLine3}
                </h3>
                <p className="text-lg font-bold text-amber-400 mt-3 uppercase tracking-wider font-mono">
                  {card.offer}
                </p>
                <p className="text-xs text-zinc-300 font-sans font-light mt-2 max-w-[240px] leading-relaxed">
                  {card.description}
                </p>
              </div>

              {/* Footer action block */}
              <div className="border-t border-zinc-800/80 pt-4 w-full flex items-center justify-between mt-auto relative z-20">
                <span className="text-[9px] font-mono text-zinc-400 tracking-wider">
                  {card.footerText}
                </span>
                
                <Link
                  href={basePath === "/mobile" ? `/mobile${card.href}` : `${basePath}${card.href}`}
                  className="inline-flex items-center gap-1.5 bg-white hover:bg-[#6F4E37] text-zinc-950 hover:text-white text-[9px] font-bold uppercase tracking-widest py-2 px-4 rounded-xl transition-all duration-300 shadow-md active:scale-95 border-none font-sans"
                >
                  {card.btnLabel}
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Horizontal Product Carousel (Mobile Only) */}
      <div 
        className={`md:hidden w-full flex items-stretch overflow-x-auto scrollbar-none py-2 gap-3 select-none scroll-smooth flex-nowrap px-4 snap-x snap-mandatory pb-6 transition-all duration-700 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {[...LIMITED_DROPS, ...MOCK_PRODUCTS.filter(p => p.isLimited)].slice(0, 6).map((p, i) => (
          <div 
            key={p.id} 
            className="w-[155px] sm:w-[170px] shrink-0 flex flex-col justify-between snap-start"
          >
            <ProductCard 
              id={p.id}
              name={p.title}
              brand={p.brand}
              price={`₹${p.price}`}
              originalPrice={p.originalPrice ? `₹${p.originalPrice}` : undefined}
              image={p.image}
              hoverImage={p.hoverImage}
              inStock={p.inStock !== false}
              badge={p.isLimited ? "Limited Drop" : undefined}
              rating={undefined} 
              basePath={basePath} 
            />
          </div>
        ))}
        {/* Spacer to prevent clipping */}
        <div className="w-4 shrink-0 pointer-events-none" />
      </div>
    </section>
  );
}
