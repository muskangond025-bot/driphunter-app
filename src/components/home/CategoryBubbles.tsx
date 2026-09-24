"use client";
import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { SectionHeading } from "@/components/ui/SectionHeading";

const categories = [
  { name: "Tshirts", image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500&q=80", href: "/shop?category=tshirts" },
  { name: "Eyewear", image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&q=80", href: "/shop?category=eyewear" },
  { name: "Headwear", image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500&q=80", href: "/shop?category=headwear" },
  { name: "Bottoms", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&q=80", href: "/shop?category=bottoms" },
  { name: "Accessories", image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&q=80", href: "/shop?category=accessories" },
  { name: "Clothing", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&q=80", href: "/shop?category=clothing" },
  { name: "Backpacks", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80", href: "/shop?category=backpacks" },
  { name: "Wallets", image: "https://drip-hunter.vercel.app/images/urban-essentials/bifold_wallet.png", href: "/shop?category=wallets" },
  { name: "Shirts", image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&q=80", href: "/shop?category=shirts" },
  { name: "Hoodies", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&q=80", href: "/shop?category=hoodies" },
  { name: "Skateboards", image: "https://images.unsplash.com/photo-1547447134-cd3f5c716030?w=500&q=80", href: "/shop?category=skateboards" },
];

export default function CategoryBubbles({ basePath = "" }: { basePath?: string }) {
  const { ref, isVisible } = useScrollAnimation();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);
  const resumeTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Smooth continuous non-stop auto-scroll using requestAnimationFrame
  useEffect(() => {
    let animationFrameId: number;
    const speed = 0.85; // smooth continuous pixels per frame

    const autoScroll = () => {
      const el = scrollContainerRef.current;
      if (el && !isDragging && !isPaused) {
        el.scrollLeft += speed;
        // Infinite seamless wraparound loop forward & backward
        const halfWidth = el.scrollWidth / 3;
        if (el.scrollLeft >= halfWidth * 2) {
          el.scrollLeft -= halfWidth;
        } else if (el.scrollLeft <= 0) {
          el.scrollLeft += halfWidth;
        }
      }
      animationFrameId = requestAnimationFrame(autoScroll);
    };

    animationFrameId = requestAnimationFrame(autoScroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isDragging, isPaused]);

  // Mouse Drag-to-Scroll
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsPaused(true);
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    const el = scrollContainerRef.current;
    if (!el) return;
    setIsDragging(true);
    setStartX(e.pageX - el.offsetLeft);
    setScrollLeftState(el.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const el = scrollContainerRef.current;
    if (!el) return;
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startX) * 1.5;
    el.scrollLeft = scrollLeftState - walk;
  };

  const handleMouseUpOrLeave = () => {
    if (isDragging) {
      setIsDragging(false);
    }
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 2000);
  };

  const handleTouchStart = () => {
    setIsPaused(true);
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
  };

  const handleTouchEnd = () => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 2000);
  };

  const scrollByAmount = (amount: number) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  return (
    <section
      ref={ref}
      className={`w-full py-10 sm:py-12 bg-gradient-to-b from-white via-zinc-50/20 to-white dark:from-zinc-950 dark:via-zinc-950 dark:to-zinc-950 select-none overflow-hidden border-y border-zinc-100/60 dark:border-zinc-900 transition-all duration-1000 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {/* Premium Editorial Header */}
      <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-12 md:px-16 lg:px-20 mb-6 md:mb-8">
        <div className="border-b border-zinc-100 dark:border-zinc-800/80 pb-4 md:pb-5">
          <SectionHeading
            variant="playfair"
            className="text-zinc-900 dark:text-zinc-100"
            title={<>Shop <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280]">by Category</span></>}
            eyebrow={
              <span className="text-[10px] md:text-xs font-semibold tracking-[0.3em] text-[#6F4E37] dark:text-[#E6C280] uppercase block font-mono">
                EXPLORE
              </span>
            }
            action={
              <div className="flex items-center justify-between md:justify-end gap-4 w-full">
                <p className="text-xs md:text-sm text-zinc-400 font-sans font-light leading-relaxed max-w-xs hidden lg:block">
                  Meticulously cataloged collections from leading streetwear brands.
                </p>
                {basePath === "/mobile" && (
                  <Link href={`${basePath}/categories`} className="text-[10px] sm:text-xs font-bold text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 uppercase tracking-widest flex items-center gap-1 md:hidden">
                    View All <ArrowRight className="w-3 h-3" />
                  </Link>
                )}
              </div>
            }
          />
        </div>
      </div>

      {/* Full-width continuous scrolling marquee track with interactive manual drag & scroll */}
      <div className="w-full relative group">
        <div
          ref={scrollContainerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
          className={`flex gap-3 md:gap-5 py-4 px-4 sm:px-8 overflow-x-auto scrollbar-none select-none snap-x snap-mandatory ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
          style={{
            WebkitOverflowScrolling: "touch",
          }}
        >
          {[...categories, ...categories, ...categories].map((cat, idx) => (
            <Link
              key={`${cat.name}-${idx}`}
              href={`${basePath}${cat.href}`}
              draggable={false}
              className="flex flex-col items-center group/card shrink-0 snap-start cursor-pointer w-[115px] sm:w-[125px] md:w-44 focus:outline-none transform-gpu"
              onClick={(e) => {
                if (isDragging) {
                  e.preventDefault();
                }
              }}
            >
              <div className="w-full aspect-[3/4] md:aspect-[4/5] relative bg-zinc-100 dark:bg-zinc-900 rounded-[18px] sm:rounded-[20px] md:rounded-[2rem] overflow-hidden shadow-[0_4px_15px_rgba(0,0,0,0.01)] group-hover/card:shadow-[0_12px_28px_rgba(111,78,55,0.15)] border border-zinc-200/60 dark:border-zinc-800 group-hover/card:border-[#6F4E37]/40 dark:group-hover/card:border-[#E6C280]/40 transition-all duration-300 transform group-hover/card:-translate-y-1">
                <Image
                  alt={cat.name}
                  src={cat.image}
                  fill
                  draggable={false}
                  className="object-cover group-hover/card:scale-105 transition-transform duration-500 ease-out"
                  sizes="(max-width: 640px) 115px, (max-width: 768px) 125px, 180px"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-65 group-hover/card:opacity-85 transition-opacity duration-300" />
                
                {/* Text overlay at the bottom */}
                <div className="absolute inset-x-0 bottom-0 p-3 md:p-5 flex flex-col justify-end">
                  <span className="text-[11px] md:text-[13px] sm:text-xs font-medium md:font-bold text-white uppercase tracking-widest font-mono md:mb-1.5 text-shadow-sm px-1">
                    {cat.name}
                  </span>
                  <span className="hidden md:flex text-[10px] font-medium text-white/80 uppercase tracking-widest font-mono opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 items-center gap-1.5 px-1">
                    Explore
                    <svg className="w-3 h-3 transform group-hover/card:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
