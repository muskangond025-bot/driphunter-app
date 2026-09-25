"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight, ArrowUpRight, Star } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { SectionHeading } from "@/components/ui/SectionHeading";

const featuredSlides = [
  {
    title: "Traditional Grace",
    season: "SEASON RUNWAY '26",
    tagline: "EDITORIAL CAPSULE 01",
    description: "Architectural draping and sheer silk overlays reimagined for modern haute silhouettes.",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=900&q=85",
    video: "https://www.shutterstock.com/shutterstock/videos/4109302715/preview/stock-footage-attractive-young-asian-woman-wearing-indonesian-traditional.webm",
    link: "/shop?category=dresses"
  },
  {
    title: "Summer Knitwear",
    season: "RESORT COLLECTION",
    tagline: "EDITORIAL CAPSULE 02",
    description: "Bespoke cropped knits and relaxed cardigans cast in monochromatic earthy pigments.",
    image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=85",
    link: "/shop?category=outerwear"
  },
  {
    title: "Satin Elegance",
    season: "SPRING ARCHIVE",
    tagline: "EDITORIAL CAPSULE 03",
    description: "Fluid bias-cut satin slip dresses paired with structured sartorial tailoring.",
    image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=900&q=85",
    link: "/shop?category=sets"
  },
];

const products = [
  { 
    id: "201", 
    name: "Linen Open-Back Midi Dress", 
    brand: "Zara", 
    price: "₹89.00", 
    originalPrice: "₹120.00", 
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=85", 
    hoverImage: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=85", 
    badge: "Just Dropped", 
    buttonLabel: "Add to Bag",
    rating: 4.9,
    colors: [
      { name: "Sand", hex: "#D4C5B9", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=85", hoverImage: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=85" },
      { name: "Olive", hex: "#5C604D", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=85", hoverImage: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=85" },
      { name: "Charcoal", hex: "#27272A", image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=85", hoverImage: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=85" }
    ]
  },
  { 
    id: "202", 
    name: "Cropped Cable Knitwear Cardigan", 
    brand: "REPRESENT", 
    price: "₹110.00", 
    originalPrice: "₹145.00", 
    image: "https://images.unsplash.com/photo-1574169208507-84376144848b?auto=format&fit=crop&w=600&q=85", 
    hoverImage: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=85", 
    badge: "Limited Run", 
    buttonLabel: "Pre-Order",
    rating: 5.0,
    colors: [
      { name: "Oat", hex: "#E8D8C8", image: "https://images.unsplash.com/photo-1574169208507-84376144848b?auto=format&fit=crop&w=600&q=85", hoverImage: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=85" },
      { name: "Powder Blue", hex: "#A5B4CB", image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=600&q=85", hoverImage: "https://images.unsplash.com/photo-1574169208507-84376144848b?auto=format&fit=crop&w=600&q=85" },
      { name: "Charcoal", hex: "#27272A", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=600&q=85", hoverImage: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=85" }
    ]
  },
  { 
    id: "203", 
    name: "Silk Wrap Blouse", 
    brand: "ESSENTIALS", 
    price: "₹145.00", 
    originalPrice: "₹180.00", 
    image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=600&q=85", 
    hoverImage: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=600&q=85", 
    badge: "Verified", 
    buttonLabel: "Add to Bag",
    rating: 4.8,
    colors: [
      { name: "Champagne", hex: "#E6C280", image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=600&q=85", hoverImage: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=600&q=85" },
      { name: "Pearl White", hex: "#FAF8F5", image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=600&q=85", hoverImage: "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=600&q=85" },
      { name: "Obsidian", hex: "#18181B", image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=600&q=85", hoverImage: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=85" }
    ]
  },
  { 
    id: "204", 
    name: "Satin Slip Midi Skirt", 
    brand: "Zara", 
    price: "₹65.00", 
    originalPrice: "₹90.00", 
    image: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?auto=format&fit=crop&w=600&q=85", 
    hoverImage: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=85", 
    badge: "Archive", 
    buttonLabel: "Add to Bag",
    rating: 4.7,
    colors: [
      { name: "Emerald", hex: "#2E5339", image: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?auto=format&fit=crop&w=600&q=85", hoverImage: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=85" },
      { name: "Coffee", hex: "#6F4E37", image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=85", hoverImage: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?auto=format&fit=crop&w=600&q=85" },
      { name: "Black", hex: "#000000", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=85", hoverImage: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=85" }
    ]
  },
  { 
    id: "205", 
    name: "Structured Tailored Blazer", 
    brand: "BALENCIAGA", 
    price: "₹290.00", 
    originalPrice: "₹380.00", 
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=600&q=85", 
    hoverImage: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=85", 
    badge: "Grail", 
    buttonLabel: "Add to Bag",
    rating: 4.9,
    colors: [
      { name: "Charcoal Black", hex: "#1C1917", image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=600&q=85", hoverImage: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=85" },
      { name: "Camel", hex: "#C19A6B", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=85", hoverImage: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=600&q=85" }
    ]
  },
  { 
    id: "206", 
    name: "Ribbed Crop Performance Top", 
    brand: "Nike", 
    price: "₹40.00", 
    originalPrice: "₹55.00", 
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=85", 
    hoverImage: "https://images.unsplash.com/photo-1574169208507-84376144848b?auto=format&fit=crop&w=600&q=85", 
    badge: "Essential", 
    buttonLabel: "Add to Bag",
    rating: 4.6,
    colors: [
      { name: "Matcha Green", hex: "#87A96B", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=85", hoverImage: "https://images.unsplash.com/photo-1574169208507-84376144848b?auto=format&fit=crop&w=600&q=85" },
      { name: "Sand", hex: "#D4C5B9", image: "https://images.unsplash.com/photo-1574169208507-84376144848b?auto=format&fit=crop&w=600&q=85", hoverImage: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=85" }
    ]
  },
  { 
    id: "207", 
    name: "Wide-Leg Pleated Trousers", 
    brand: "Zara", 
    price: "₹85.00", 
    originalPrice: "₹115.00", 
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=85", 
    hoverImage: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=85", 
    badge: "Trending", 
    buttonLabel: "Add to Bag",
    rating: 4.8,
    colors: [
      { name: "Warm Taupe", hex: "#8B7D6B", image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=85", hoverImage: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=85" },
      { name: "Obsidian", hex: "#18181B", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=85", hoverImage: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=85" }
    ]
  },
  { 
    id: "208", 
    name: "Knitted Halter Neck Dress", 
    brand: "REPRESENT", 
    price: "₹125.00", 
    originalPrice: "₹165.00", 
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=85", 
    hoverImage: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=600&q=85", 
    badge: "Runway", 
    buttonLabel: "Add to Bag",
    rating: 4.9,
    colors: [
      { name: "Cream", hex: "#FFFDD0", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=85", hoverImage: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=600&q=85" },
      { name: "Rust Clay", hex: "#B7410E", image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=600&q=85", hoverImage: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=85" }
    ]
  },
  { 
    id: "209", 
    name: "Leather Saddle Shoulder Bag", 
    brand: "BALENCIAGA", 
    price: "₹195.00", 
    originalPrice: "₹260.00", 
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=85", 
    hoverImage: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=600&q=85", 
    badge: "Archive", 
    buttonLabel: "Add to Bag",
    rating: 5.0,
    colors: [
      { name: "Cognac Brown", hex: "#834333", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=85", hoverImage: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=600&q=85" },
      { name: "Black", hex: "#000000", image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=600&q=85", hoverImage: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=85" }
    ]
  }
];

export default function NewArrivals({ basePath = "" }: { basePath?: string }) {
  const { ref, isVisible } = useScrollAnimation();
  const [slideIdx, setSlideIdx] = useState(0);
  const [videoErrors, setVideoErrors] = useState<Record<number, boolean>>({});
  const scrollRef = useRef<HTMLDivElement>(null);

  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const maxScroll = scrollWidth - clientWidth;
      if (maxScroll > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (scrollLeft / maxScroll) * 100)));
      }
    }
  };

  const nextSlide = useCallback(() => {
    setSlideIdx((p) => (p + 1) % featuredSlides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setSlideIdx((p) => (p - 1 + featuredSlides.length) % featuredSlides.length);
  }, []);

  useEffect(() => {
    const t = setInterval(nextSlide, 6000);
    return () => clearInterval(t);
  }, [nextSlide]);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft } = scrollRef.current;
      const cardWidth = 270 + 20; // approximate width of card + gap
      const scrollTo = direction === "left" ? scrollLeft - cardWidth * 1.5 : scrollLeft + cardWidth * 1.5;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  const featured = featuredSlides[slideIdx];

  const lookbookCardContent = (
    <>
          {/* Background Slides with Ken-Burns Transition */}
          <div className="absolute inset-0 z-0 select-none">
            {featuredSlides.map((s, i) => (
              <div
                key={i}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  i === slideIdx ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                }`}
              >
                {s.video && !videoErrors[i] ? (
                  <video
                    src={s.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    onError={() => setVideoErrors((prev) => ({ ...prev, [i]: true }))}
                    className={`w-full h-full object-cover transition-transform duration-[2000ms] ease-out ${
                      i === slideIdx ? "scale-105" : "scale-100"
                    }`}
                  />
                ) : (
                  <Image
                    alt={s.title}
                    src={s.image}
                    fill
                    className={`object-cover transition-transform duration-[2000ms] ease-out ${
                      i === slideIdx ? "scale-105" : "scale-100"
                    }`}
                    sizes="(max-width: 1024px) 100vw, 32vw"
                    priority={i === 0}
                  />
                )}
                {/* Vignette & Gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/25" />
              </div>
            ))}
          </div>

          {/* Top Magazine Header */}
          <div className="relative z-20 flex items-center justify-between w-full">
            <div className="backdrop-blur-md bg-black/40 border border-white/15 px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E6C280] animate-pulse" />
              <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-zinc-200 truncate max-w-[120px] sm:max-w-none">
                {featured.tagline}
              </span>
            </div>

            {/* Slide Index Counter */}
            <div className="text-[11px] font-mono font-bold text-white/80 tracking-widest backdrop-blur-md bg-black/30 border border-white/10 px-2.5 py-0.5 rounded-full shrink-0">
              0{slideIdx + 1} <span className="text-white/40">/</span> 0{featuredSlides.length}
            </div>
          </div>

          {/* Slider Arrow Controls */}
          <div className="absolute inset-y-0 inset-x-4 flex items-center justify-between z-30 pointer-events-none">
            <button
              onClick={prevSlide}
              className="w-9 h-9 rounded-full bg-black/40 hover:bg-black/80 text-white backdrop-blur-md flex items-center justify-center border border-white/15 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 active:scale-90 cursor-pointer shadow-lg pointer-events-auto"
              aria-label="Previous editorial"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextSlide}
              className="w-9 h-9 rounded-full bg-black/40 hover:bg-black/80 text-white backdrop-blur-md flex items-center justify-center border border-white/15 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 active:scale-90 cursor-pointer shadow-lg pointer-events-auto"
              aria-label="Next editorial"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Bottom Luxury Lookbook Card */}
          <div className="relative z-20 w-full backdrop-blur-xl bg-zinc-950/70 border border-white/15 rounded-[16px] lg:rounded-[22px] p-4 sm:p-5 lg:p-6 shadow-2xl transition-all duration-500 text-white mt-auto">
            <div className="flex items-center gap-2 mb-1 lg:mb-2">
              <span className="text-[8px] lg:text-[9px] font-semibold font-mono text-[#E6C280] uppercase tracking-widest">
                {featured.season}
              </span>
            </div>

            <h3 className="text-lg lg:text-2xl font-light leading-tight text-white tracking-tight font-playfair pr-4">
              {featured.title}
            </h3>

            <p className="text-[11px] lg:text-xs text-zinc-300 mt-1.5 lg:mt-2.5 font-sans font-light leading-relaxed hidden lg:block">
              {featured.description}
            </p>

            <div className="mt-3 lg:mt-4 pt-3 lg:pt-3.5 border-t border-white/10 flex items-center justify-between">
              <Link
                href={`${basePath}${featured.link}`}
                className="inline-flex h-9 lg:h-11 px-3 lg:px-4 bg-white/10 rounded-full items-center justify-center gap-2 text-[10px] lg:text-xs font-mono font-bold tracking-wider text-white hover:bg-white/20 transition-colors group/link active:scale-[0.98]"
              >
                <span>EXPLORE</span>
                <ArrowRight className="w-3 h-3 lg:w-3.5 lg:h-3.5 group-hover/link:translate-x-1 transition-transform text-[#E6C280]" />
              </Link>

              {/* Dynamic Dots */}
              <div className="flex gap-1.5">
                {featuredSlides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSlideIdx(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                      i === slideIdx ? "w-5 bg-[#E6C280]" : "w-1.5 bg-white/40 hover:bg-white/70"
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
    </>
  );

  return (
    <section className="bg-[#FAF8F5] dark:bg-zinc-950 text-black dark:text-white py-6 md:py-10 border-b border-zinc-200/60 dark:border-zinc-900 overflow-hidden flex flex-col">
      {/* Editorial Luxury Header (Desktop Only) */}
      <div className="hidden lg:block w-full max-w-[1600px] mx-auto px-6 sm:px-12 md:px-16 lg:px-20 mb-8">
        <div className="border-b border-zinc-200/70 dark:border-zinc-800/80 pb-6">
          <SectionHeading
            variant="playfair"
            className="text-zinc-950 dark:text-zinc-50"
            title={<>New <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280]">Arrivals</span></>}
            eyebrow={
              <div className="flex items-center gap-2.5 mb-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#6F4E37] dark:bg-[#E6C280] animate-pulse" />
                <span className="text-xs font-semibold tracking-[0.25em] text-[#6F4E37] dark:text-[#E6C280] uppercase font-mono">
                  Archive Release &apos;26
                </span>
              </div>
            }
            action={
              <div className="flex flex-col items-end gap-3 max-w-md w-auto">
                <p className="text-[13px] text-zinc-500 dark:text-zinc-400 font-sans font-light leading-relaxed text-right">
                  Curated luxury wardrobe additions. Explore flowing silks, sculptural tailoring, and premium everyday couture.
                </p>
                <Link
                  href={basePath === "/mobile" ? `${basePath}/categories` : `${basePath}/explore`}
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-bold tracking-wider text-zinc-900 dark:text-zinc-100 hover:text-[#6F4E37] dark:hover:text-[#E6C280] transition-colors group"
                >
                  <span>EXPLORE ALL DROPS</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
            }
          />
        </div>
      </div>

      {/* Split Hero Layout: Left Lookbook Hero Slide & Right Culture-Circle Horizontal Scroller */}
      <div
        ref={ref}
        className={`w-full px-4 sm:px-8 md:px-12 lg:pl-16 lg:pr-0 xl:pl-24 flex flex-col lg:flex-row gap-6 lg:gap-8 items-stretch transition-all duration-1000 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Left Editorial Lookbook Card (Desktop Only) */}
        <div className="hidden lg:flex w-full lg:w-[32%] xl:w-[30%] shrink-0 relative bg-zinc-950 rounded-[20px] lg:rounded-[28px] overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.06)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.4)] group flex-col justify-between p-4 sm:p-5 lg:p-7 aspect-[4/5] sm:aspect-[16/10] lg:aspect-auto lg:min-h-[480px] border border-zinc-200/50 dark:border-zinc-800/80 order-1">
          {lookbookCardContent}
        </div>

        {/* Mobile Header (Hidden on Desktop) */}
        <div className="lg:hidden w-full order-2 mt-4 px-1">
          <SectionHeading
            variant="playfair"
            className="text-zinc-950 dark:text-zinc-50"
            title={<>NEW <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280]">ARRIVALS</span></>}
            eyebrow={
              <div className="flex items-center gap-2.5 mb-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#6F4E37] dark:bg-[#E6C280] animate-pulse" />
                <span className="text-[10px] font-semibold tracking-[0.25em] text-[#6F4E37] dark:text-[#E6C280] uppercase font-mono">
                  Fresh drops, just in
                </span>
              </div>
            }
            action={
              <Link
                href={`${basePath}/explore`}
                className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold tracking-wider text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors mt-2"
              >
                <span>VIEW ALL</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            }
          />
        </div>

        {/* Right Culture-Circle Horizontal Scroller */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="w-full lg:flex-1 flex items-stretch overflow-x-auto scrollbar-none py-2 gap-3 lg:gap-5 select-none scroll-smooth flex-nowrap px-1 snap-x snap-mandatory md:snap-none pb-6 order-3"
        >
          {/* Mobile Lookbook Card (Hidden on Desktop) */}
          <div className="lg:hidden w-[280px] sm:w-[320px] shrink-0 relative bg-zinc-950 rounded-[20px] overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.06)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.4)] group flex flex-col justify-between p-4 sm:p-5 aspect-[4/5] sm:aspect-[16/10] border border-zinc-200/50 dark:border-zinc-800/80 snap-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
            {lookbookCardContent}
          </div>

          {products.slice(0, 6).map((p, i) => (
            <div 
              key={p.id} 
              className={`w-[155px] sm:w-[170px] lg:w-[240px] shrink-0 flex flex-col justify-between snap-start md:snap-align-none transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-95"
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <ProductCard {...p} rating={undefined} basePath={basePath} />
            </div>
          ))}
          {/* Spacer to prevent clipping on right edge */}
          <div className="w-6 sm:w-12 shrink-0 pointer-events-none" />
        </div>
      </div>

      {/* Bottom Bar: Centered Navigation Buttons with Interactive Progress Bar */}
      <div className="hidden lg:block w-full max-w-[1600px] mx-auto px-6 sm:px-12 md:px-16 lg:px-20 mt-10">
        <div className="flex items-center justify-between gap-6 max-w-xl mx-auto">
          {/* Left Arrow Button */}
          <button
            onClick={() => scroll("left")}
            className="w-10 h-10 shrink-0 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-950 hover:text-white dark:hover:bg-white dark:hover:text-zinc-950 text-zinc-800 dark:text-zinc-200 flex items-center justify-center transition-all duration-300 cursor-pointer active:scale-95 shadow-xs"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Progress Indicator */}
          <div className="flex-1 flex items-center gap-3">
            <span className="text-[10px] font-mono text-zinc-400 font-bold">01</span>
            <div className="flex-1 h-[2px] bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden relative">
              <div
                className="absolute top-0 left-0 bottom-0 bg-[#6F4E37] dark:bg-[#E6C280] transition-all duration-300 rounded-full"
                style={{ width: `${Math.max(15, scrollProgress)}%` }}
              />
            </div>
            <span className="text-[10px] font-mono text-zinc-400 font-bold">
              0{Math.min(6, products.length)}
            </span>
          </div>

          {/* Right Arrow Button */}
          <button
            onClick={() => scroll("right")}
            className="w-10 h-10 shrink-0 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-950 hover:text-white dark:hover:bg-white dark:hover:text-zinc-950 text-zinc-800 dark:text-zinc-200 flex items-center justify-center transition-all duration-300 cursor-pointer active:scale-95 shadow-xs"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

