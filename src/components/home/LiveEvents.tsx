"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Play, Radio, Calendar, ArrowRight, User, MapPin, Check, ShoppingBag } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useCart } from "@/context/CartContext";

const events = [
  {
    id: "e1",
    num: "01",
    cityCode: "BCN",
    name: "Barcelona Simorra Runway",
    date: "12 - 15 Oct 2026",
    venue: "Fira de Barcelona, Spain",
    video: "https://www.shutterstock.com/shutterstock/videos/3478836745/preview/stock-footage-simorra-show-runway-080-barcelona-fashion-week.webm",
    spotsLeft: 4
  },
  {
    id: "e2",
    num: "02",
    cityCode: "MOW",
    name: "Mercedes-Benz Fashion Russia",
    date: "22 - 26 Oct 2026",
    venue: "Museum of Moscow, Russia",
    video: "https://www.shutterstock.com/shutterstock/videos/1081344254/preview/stock-footage-22-october-2021-moscow-russia-mercedes-benz-fashion.webm",
    spotsLeft: 2
  },
  {
    id: "e3",
    num: "03",
    cityCode: "BOM",
    name: "Lakmé Fashion Week Mumbai",
    date: "04 - 08 Nov 2026",
    venue: "Jio World Centre, Mumbai",
    video: "https://assets.mixkit.co/videos/preview/mixkit-fashion-model-showing-off-a-streetwear-outfit-40019-large.mp4",
    spotsLeft: 6
  },
  {
    id: "e4",
    num: "04",
    cityCode: "JKT",
    name: "Ethereal Couture Runway",
    date: "18 - 22 Nov 2026",
    venue: "Traditional Craft Pavilion, Jakarta",
    video: "https://www.shutterstock.com/shutterstock/videos/4109302715/preview/stock-footage-attractive-young-asian-woman-wearing-indonesian-traditional.webm",
    spotsLeft: 3
  }
];

export default function LiveEvents() {
  const { ref, isVisible } = useScrollAnimation();
  const scrollRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();
  const [videoErrors, setVideoErrors] = useState<Record<string, boolean>>({});
  const [addedEvents, setAddedEvents] = useState<Record<string, boolean>>({});

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.75;
      const scrollTo = direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  const handlePreOrder = (event: typeof events[0]) => {
    setAddedEvents((prev) => ({ ...prev, [event.id]: true }));
    setTimeout(() => {
      setAddedEvents((prev) => ({ ...prev, [event.id]: false }));
    }, 1800);

    addToCart({
      id: event.id,
      name: `${event.name} Exclusive Piece`,
      price: 12500,
      image: "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=400&q=80",
      brand: "Runway Exclusive",
      size: "M",
      color: "Runway Original"
    });
  };

  return (
    <section className="bg-[#FAF8F5]/60 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 py-16 border-t border-zinc-200/80 dark:border-zinc-800/80 select-none overflow-hidden relative">
      
      {/* Background Ambient Luxury Light */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] max-w-full h-[250px] bg-[#6F4E37]/5 dark:bg-[#E6C280]/5 blur-[140px] rounded-full pointer-events-none" />

      {/* Header Container */}
      <div className="w-full max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-6 mb-6 relative z-10">
        <div className="border-b border-zinc-200/80 dark:border-zinc-800/80 pb-4">
          <SectionHeading
            variant="playfair-sm"
            className="text-zinc-900 dark:text-zinc-100"
            title={<>Live <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280]">Events</span></>}
            eyebrow={
              <div className="flex items-center gap-2 mb-1">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-mono tracking-widest uppercase font-bold bg-[#6F4E37]/10 text-[#6F4E37] dark:bg-[#E6C280]/15 dark:text-[#E6C280] border border-[#6F4E37]/20">
                  <Radio className="w-3 h-3 text-red-500 animate-pulse" />
                  Live Stream Access
                </span>
                <span className="text-zinc-400 font-mono text-[9px]">• SS26 CALENDAR</span>
              </div>
            }
            action={
              <div className="flex flex-col md:items-end gap-2 md:max-w-md w-full md:w-auto">
                {/* Navigation Controls on Mobile/Tablet */}
                <div className="flex gap-2 self-start md:self-end lg:hidden">
                  <button
                    onClick={() => scroll("left")}
                    className="w-8 h-8 rounded-full border border-zinc-300 dark:border-zinc-700 flex items-center justify-center transition-all cursor-pointer active:scale-95 bg-white dark:bg-zinc-900 hover:border-zinc-900 text-zinc-800 dark:text-zinc-200 shadow-sm"
                    aria-label="Scroll left"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => scroll("right")}
                    className="w-8 h-8 rounded-full border border-zinc-300 dark:border-zinc-700 flex items-center justify-center transition-all cursor-pointer active:scale-95 bg-white dark:bg-zinc-900 hover:border-zinc-900 text-zinc-800 dark:text-zinc-200 shadow-sm"
                    aria-label="Scroll right"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                {/* Desktop Navigation */}
                <div className="hidden lg:flex gap-2 self-end">
                  <button
                    onClick={() => scroll("left")}
                    className="w-10 h-10 rounded-full border border-zinc-300 dark:border-zinc-700 flex items-center justify-center transition-all cursor-pointer active:scale-95 bg-white dark:bg-zinc-900 hover:border-zinc-900 dark:hover:border-zinc-500 text-zinc-800 dark:text-zinc-200 shadow-sm hover:shadow-md"
                    aria-label="Scroll left"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => scroll("right")}
                    className="w-10 h-10 rounded-full border border-zinc-300 dark:border-zinc-700 flex items-center justify-center transition-all cursor-pointer active:scale-95 bg-white dark:bg-zinc-900 hover:border-zinc-900 dark:hover:border-zinc-500 text-zinc-800 dark:text-zinc-200 shadow-sm hover:shadow-md"
                    aria-label="Scroll right"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            }
          />
        </div>
        <div className="pt-2">
          <p className="text-[11px] sm:text-xs text-zinc-500 dark:text-zinc-400 font-sans font-light leading-relaxed md:text-right">
            Pre-order upcoming seasonal collections directly from the runway. Selected pieces available for a limited time.
          </p>
        </div>
      </div>

      {/* Award-Style Cinema Runway Cards Grid */}
      <div
        ref={ref}
        className={`w-full max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-6 transition-all duration-1000 ease-out relative z-10 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div
          ref={scrollRef}
          className="w-full flex lg:grid lg:grid-cols-4 flex-nowrap lg:flex-wrap overflow-x-auto lg:overflow-visible scrollbar-none gap-4 lg:gap-5 scroll-smooth py-1 px-4 sm:px-6 lg:px-0 snap-x snap-mandatory scroll-p-4 sm:scroll-p-6 lg:snap-none"
        >
          {events.map((event) => (
            <div
              key={event.id}
              className="w-[280px] sm:w-[320px] lg:w-auto shrink-0 snap-center lg:snap-align-none flex flex-col justify-between bg-white dark:bg-zinc-900/90 rounded-[28px] border border-zinc-200/80 dark:border-zinc-800/80 p-3.5 sm:p-4 shadow-[0_4px_25px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_45px_rgba(111,78,55,0.12)] transition-all duration-500 hover:border-[#6F4E37]/50 dark:hover:border-[#E6C280]/50 group hover:-translate-y-1.5"
            >
              {/* Runway Cinema Video Viewport */}
              <div className="relative w-full aspect-[4/3] bg-zinc-950 overflow-hidden rounded-2xl select-none group/video">
                {!videoErrors[event.id] ? (
                  <video
                    src={event.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    disablePictureInPicture
                    disableRemotePlayback
                    controlsList="nodownload nofullscreen noremoteplayback"
                    onError={() => setVideoErrors((prev: Record<string, boolean>) => ({ ...prev, [event.id]: true }))}
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out pointer-events-none"
                  />
                ) : (
                  <div className="w-full h-full bg-zinc-900 flex flex-col items-center justify-center text-zinc-500 text-[10px] font-mono gap-2">
                    <span className="font-bold tracking-widest text-[#E6C280] uppercase">DH RUNWAY</span>
                    <span>Live Stream Active</span>
                  </div>
                )}

                {/* Cinematic Glass Gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30 pointer-events-none" />

                {/* Top Floating Badges */}
                <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10 pointer-events-none">
                  <div className="bg-black/60 backdrop-blur-md text-white text-[8px] font-mono font-bold tracking-widest px-2.5 py-1 rounded-full uppercase flex items-center gap-1.5 border border-white/15">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                    LIVE RUNWAY
                  </div>

                  <span className="text-[10px] font-mono font-bold text-white/90 bg-black/50 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/10">
                    {event.num} // {event.cityCode}
                  </span>
                </div>

                {/* Bottom Overlay Pill on Video */}
                <div className="absolute bottom-3 left-3 z-10 pointer-events-none">
                  <span className="text-[9px] font-mono text-[#E6C280] bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-xl border border-white/10 font-bold uppercase tracking-wider">
                    {event.spotsLeft} VIP Pre-Orders Left
                  </span>
                </div>
              </div>

              {/* Event Content Details */}
              <div className="mt-3 flex flex-col justify-between flex-grow gap-3">
                <div className="space-y-2">
                  <div>
                    <span className="text-[8px] font-mono text-[#6F4E37] dark:text-[#E6C280] uppercase font-bold tracking-[0.2em] block mb-0.5">
                      Exclusive Runway
                    </span>
                    <h3 className="text-sm sm:text-base font-light text-zinc-900 dark:text-zinc-100 tracking-tight font-playfair group-hover:text-[#6F4E37] dark:group-hover:text-[#E6C280] transition-colors duration-300 leading-snug">
                      {event.name}
                    </h3>
                  </div>

                  {/* Metadata Chips: Date & Venue */}
                  <div className="space-y-1.5 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                    <div className="flex items-center gap-2 text-[11px] text-zinc-600 dark:text-zinc-400 font-sans">
                      <Calendar className="w-3.5 h-3.5 text-[#6F4E37] dark:text-[#E6C280] shrink-0" />
                      <span className="font-mono text-[10.5px] font-medium">{event.date}</span>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] text-zinc-600 dark:text-zinc-400 font-sans">
                      <MapPin className="w-3.5 h-3.5 text-[#6F4E37] dark:text-[#E6C280] shrink-0" />
                      <span className="truncate text-[10.5px] leading-tight">{event.venue}</span>
                    </div>
                  </div>
                </div>

                {/* Pricing & Pre-Order Action */}
                <div className="pt-2.5 border-t border-zinc-150 dark:border-zinc-800">
                  <div className="flex items-center justify-between mb-2 font-mono">
                    <span className="text-[9.5px] uppercase tracking-wider text-zinc-400">
                      Pre-Order Price
                    </span>
                    <span className="text-xs font-bold text-zinc-950 dark:text-white">
                      ₹12,500
                    </span>
                  </div>

                  <button
                    onClick={() => handlePreOrder(event)}
                    className={`w-full py-3 rounded-xl flex items-center justify-center gap-2 text-[10px] font-mono font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer shadow-sm active:scale-[0.98] ${
                      addedEvents[event.id]
                        ? "bg-emerald-600 text-white"
                        : "bg-zinc-950 hover:bg-[#6F4E37] text-[#D4AF37] hover:text-white dark:bg-white dark:text-zinc-950 dark:hover:bg-[#E6C280] dark:hover:text-zinc-950"
                    }`}
                  >
                    {addedEvents[event.id] ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-white" />
                        Added to Bag!
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-3.5 h-3.5" />
                        Pre Order
                      </>
                    )}
                  </button>
                </div>
              </div>

            </div>
          ))}
          {/* Spacer on mobile */}
          <div className="w-3 shrink-0 pointer-events-none lg:hidden" />
        </div>
      </div>
    </section>
  );
}
