"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { SectionHeading } from "@/components/ui/SectionHeading";

const allBrands = [
  {
    name: "Nike",
    slug: "nike",
    svg: (
      <svg className="h-8 sm:h-9 w-auto overflow-visible" viewBox="0 0 120 45" fill="currentColor">
        <path d="M117.8 0.6c-22.3 16.8-48.2 27.6-77 29.5-9.6.6-19.5-1.6-26.3-8.4-5.9-6-7.3-15.5-3.1-21.8C6.1 0 1.5 1.5 1.5 1.5c-.3.4-.4.7-.4 1.1 0 .5.1.8.4 1.1 1.2 14.9 10 27.6 23.5 33.3 8.5 3.6 18.4 4 27.6 1.7C76.9 32.2 100.1 16.3 119.6 0c.1-.1.1-.2.1-.4 0-.2-.2-.4-.5-.4-.4 0-1 .8-1.4 1.4z" />
      </svg>
    ),
  },
  {
    name: "Adidas",
    slug: "adidas",
    svg: (
      <svg className="h-9 sm:h-10 w-auto overflow-visible" viewBox="0 0 120 84" fill="currentColor">
        <path d="M60 0c-3.7 11.4-9.8 21.6-17.8 29.9 4.3-9.4 6.8-19.8 7.2-30.6-2.3.4-4.6.8-6.7 1.6-.5 12.4-3.5 24.4-8.6 35-6.5-9.6-10.9-20.5-12.8-32.2-2.2.8-4.1 2-6 3.2 2.5 13.4 7.8 25.9 15.4 36.8-15.5-2.2-25.2-4.8-35.7-4.8.4 2.4 1.2 4.7 2.3 6.8 10.4.2 20.3 3 29.2 7.9-5.5 7.2-12.8 12.7-21.2 16.2 1.6 1.8 3.4 3.4 5.3 4.7 8.2-3.7 15.4-9.4 21-16.6 2.4 2.6 5.2 4.9 8.2 6.8v15.3h7.7V62c3-1.9 5.8-4.2 8.2-6.8 5.6 7.2 12.8 12.9 21 16.6 1.9-1.3 3.7-2.9 5.3-4.7-8.4-3.5-15.7-9-21.2-16.2 8.9-4.9 18.8-7.7 29.2-7.9 1.1-2.1 1.9-4.4 2.3-6.8-10.5 0-20.2 2.6-35.7 4.8 7.6-10.9 12.9-23.4 15.4-36.8-1.9-1.2-3.8-2.4-6-3.2-1.9 11.7-6.3 22.6-12.8 32.2-5.1-10.6-8.1-22.6-8.6-35-2.1-.8-4.4-1.2-6.7-1.6.4 10.8 2.9 21.2 7.2 30.6C69.8 21.6 63.7 11.4 60 0z" />
        <text x="50%" y="81" textAnchor="middle" fontFamily="sans-serif" fontSize="11" fontWeight="900" letterSpacing="3px">adidas</text>
      </svg>
    ),
  },
  {
    name: "Puma",
    slug: "puma",
    svg: (
      <svg className="h-8 sm:h-9 w-auto overflow-visible" viewBox="0 0 110 52" fill="currentColor">
        <path d="M91 7.9c-2.5-2.3-6-4.1-10.5-4-6.4.1-11.7 3.4-16.3 7.6-4.5 4.2-9 8.5-15.2 10.5-3.9 1.2-7.9 1.4-11.9.7-5.1-1-9.6-3.9-14-6.8-4.2-2.9-8.9-5.2-14-5.3-3 0-5.8.9-8.4 2.4 4.5 1.9 9 4 13.1 6.8 4.2 2.9 8.1 6.3 12.9 8.3 6.1 2.5 12.8 2.9 19.3 1.2 7.2-1.9 13.4-6.2 19.1-10.8 4.6-3.7 9.5-7.5 15.2-8.7 3.5-.8 7.3-.4 10.6 1.1 2.5 1.2 4.6 3.2 6.4 5.4.4.6 1.2.2 1.2-.4 0-2.5-2.9-5.6-7.6-7.9zm16.3 2.3c-.9-.8-2.1-1.2-3.2-1.3-2-.1-4 .8-5.3 2.2-2.3 2.5-3.7 5.8-5.3 8.9-3 6.1-6.7 11.7-11.6 16.3-5.4 5.2-11.9 9.1-18.9 11.4-5.8 1.9-12.1 2.3-18.2 1.4-7.5-1.1-14.5-4.7-20.7-9.4-4.6-3.5-8.8-7.6-13.6-10.8-3.7-2.5-7.9-4.5-12.3-5.6-.7-.2-1.4.3-1.3 1 .9 4.3 3.6 8 7.3 10.7 5.5 4 11.8 7 18.4 9 7.2 2.2 14.7 2.6 22.1 1.3 8.5-1.5 16.5-5.4 23.2-10.9 6.1-5 11-11.1 15.1-17.9 1.9-3.2 3.5-6.5 5.5-9.6 1.4-2.2 4.2-4.6 7.4-4.5.8 0 1.3.8.8 1.3-.6.6-1.2 1.2-1.8 2-.3.4.1 1 .7.8 2-.9 3.6-2.3 4.4-4.4.2-.9-.2-2.1-.9-2.9z" />
      </svg>
    ),
  },
  {
    name: "ZARA",
    slug: "zara",
    svg: (
      <svg className="h-7 sm:h-8 w-auto overflow-visible" viewBox="0 0 150 40" fill="currentColor">
        <text x="50%" y="32" textAnchor="middle" fontFamily="Didot, 'Bodoni MT', 'Playfair Display', serif" fontSize="40" fontWeight="900" letterSpacing="-4px">
          ZARA
        </text>
      </svg>
    ),
  },
  {
    name: "BALENCIAGA",
    slug: "balenciaga",
    svg: (
      <svg className="h-5 sm:h-6 w-auto overflow-visible" viewBox="0 0 220 26" fill="currentColor">
        <text x="50%" y="19" textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif" fontSize="20" fontWeight="900" letterSpacing="5px">
          BALENCIAGA
        </text>
      </svg>
    ),
  },
  {
    name: "SUPREME",
    slug: "supreme",
    svg: (
      <svg className="h-7 sm:h-8 w-auto overflow-visible" viewBox="0 0 150 40" fill="none">
        <rect width="150" height="40" rx="4" fill="#DA291C" />
        <text x="50%" y="29" textAnchor="middle" fill="white" fontFamily="'Futura Bold', 'Arial Black', sans-serif" fontSize="26" fontStyle="italic" fontWeight="900" letterSpacing="-1px">
          Supreme
        </text>
      </svg>
    ),
  },
  {
    name: "OFF-WHITE",
    slug: "off-white",
    svg: (
      <svg className="h-8 sm:h-9 w-auto overflow-visible" viewBox="0 0 84 84" fill="currentColor">
        <path d="M12 12h20v8H20v12h-8V12zm40 0h20v20h-8V20H52v-8zM12 52h8v12h12v8H12V52zm60 12H52v8h20V52h-8v12z" />
        <path d="M22 22l40 40m0-40L22 62" stroke="currentColor" strokeWidth="7" strokeLinecap="square" />
      </svg>
    ),
  },
  {
    name: "STÜSSY",
    slug: "stussy",
    svg: (
      <svg className="h-8 sm:h-9 w-auto overflow-visible" viewBox="0 0 180 44" fill="currentColor">
        <text
          x="50%"
          y="33"
          textAnchor="middle"
          fontFamily="system-ui, -apple-system, 'Arial Black', Impact, sans-serif"
          fontSize="30"
          fontWeight="900"
          letterSpacing="4px"
        >
          STÜSSY
        </text>
      </svg>
    ),
  },
  {
    name: "FEAR OF GOD",
    slug: "fear-of-god",
    svg: (
      <svg className="h-7 sm:h-8 w-auto overflow-visible" viewBox="0 0 200 38" fill="currentColor">
        <text x="50%" y="18" textAnchor="middle" fontFamily="'Playfair Display', serif" fontSize="16" fontWeight="400" letterSpacing="6px">
          FEAR OF GOD
        </text>
        <text x="50%" y="33" textAnchor="middle" fontFamily="sans-serif" fontSize="10" fontWeight="900" letterSpacing="5px">
          ESSENTIALS
        </text>
      </svg>
    ),
  },
  {
    name: "POLO",
    slug: "polo",
    svg: (
      <svg className="h-8 sm:h-9 w-auto overflow-visible" viewBox="0 0 170 40" fill="currentColor">
        <text x="50%" y="22" textAnchor="middle" fontFamily="Georgia, serif" fontSize="24" fontStyle="italic" fontWeight="700" letterSpacing="4px">
          POLO
        </text>
        <text x="50%" y="34" textAnchor="middle" fontFamily="sans-serif" fontSize="8" fontWeight="800" letterSpacing="3.5px">
          RALPH LAUREN
        </text>
      </svg>
    ),
  },
  {
    name: "JORDAN",
    slug: "jordan",
    svg: (
      <svg className="h-9 sm:h-10 w-auto overflow-visible" viewBox="0 0 80 80" fill="currentColor">
        <path d="M48.7 13.5c1.8 0 3.3-1.5 3.3-3.3s-1.5-3.3-3.3-3.3-3.3 1.5-3.3 3.3 1.5 3.3 3.3 3.3zm20.8 19.9l-16-7.8-2.6-9.1c-.5-1.8-2.4-2.8-4.2-2.3-1.8.5-2.8 2.4-2.3 4.2l2.3 8.1-9.9 8.1-17.6-5.8c-1.3-.4-2.7.3-3.1 1.6-.4 1.3.3 2.7 1.6 3.1l18.4 6.1 4.5 12.2-16.5 14.8c-1 .9-1.1 2.5-.2 3.5.9 1 2.5 1.1 3.5.2l17.7-15.9 3.2 8.6-8.2 13.8c-.7 1.2-.4 2.8.8 3.5 1.2.7 2.8.4 3.5-.8l9.4-15.8c.4-.7.5-1.5.3-2.3l-4.5-12.2 4.1-3.4 12.8 6.2c.4.2.8.3 1.2.3.9 0 1.8-.5 2.2-1.4.7-1.2.2-2.8-1-3.5z" />
      </svg>
    ),
  },
  {
    name: "REPRESENT",
    slug: "represent",
    svg: (
      <svg className="h-6 sm:h-7 w-auto overflow-visible" viewBox="0 0 200 30" fill="currentColor">
        <text x="50%" y="21" textAnchor="middle" fontFamily="sans-serif" fontSize="19" fontWeight="900" letterSpacing="6px">
          REPRESENT
        </text>
      </svg>
    ),
  },
];

// Repeat brands 4 times for a seamless infinite loop buffer in both directions
const repeatedBrands = [...allBrands, ...allBrands, ...allBrands, ...allBrands];

export default function BrandShowcase({ basePath = "" }: { basePath?: string }) {
  const { ref, isVisible } = useScrollAnimation();
  const containerRef = useRef<HTMLDivElement>(null);
  const isHovered = useRef(false);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startScrollLeft = useRef(0);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Set initial scroll position to 1/4 into the track to allow immediate leftward scroll
    const initPos = container.scrollWidth / 4;
    container.scrollLeft = initPos;

    const scrollSpeed = 0.8; // Smooth auto-scroll speed in px per frame

    const autoScrollLoop = () => {
      if (container && !isHovered.current && !isDragging.current) {
        container.scrollLeft += scrollSpeed;
        handleWrap(container);
      }
      rafId.current = requestAnimationFrame(autoScrollLoop);
    };

    rafId.current = requestAnimationFrame(autoScrollLoop);

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  const handleWrap = (container: HTMLDivElement) => {
    const singleSetWidth = container.scrollWidth / 2;
    if (singleSetWidth <= 0) return;

    // Seamlessly wrap position without any jump or blank white space
    if (container.scrollLeft >= singleSetWidth * 1.5) {
      container.scrollLeft -= singleSetWidth;
    } else if (container.scrollLeft <= 50) {
      container.scrollLeft += singleSetWidth;
    }
  };

  const handleScroll = () => {
    if (containerRef.current) {
      handleWrap(containerRef.current);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    if (containerRef.current) {
      startX.current = e.pageX - containerRef.current.offsetLeft;
      startScrollLeft.current = containerRef.current.scrollLeft;
    }
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
    isHovered.current = false;
  };

  const handleMouseEnter = () => {
    isHovered.current = true;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    containerRef.current.scrollLeft = startScrollLeft.current - walk;
    handleWrap(containerRef.current);
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (delta !== 0) {
        containerRef.current.scrollLeft += delta;
        handleWrap(containerRef.current);
      }
    }
  };

  return (
    <section ref={ref} className="bg-white dark:bg-zinc-950 pt-10 pb-6 sm:pt-14 sm:pb-8 border-t border-zinc-100 dark:border-zinc-900 select-none overflow-hidden relative">
      {/* Desktop Editorial Header */}
      <div className="hidden md:block w-full max-w-[1600px] mx-auto px-6 sm:px-12 md:px-16 lg:px-20 mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-100 dark:border-zinc-800/80 pb-5">
          <div>
            <span className="text-[10px] md:text-xs font-semibold tracking-[0.3em] text-[#6F4E37] dark:text-[#E6C280] uppercase block mb-3 font-mono">
              Brand Partners
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-zinc-900 dark:text-zinc-100 font-playfair leading-none">
              Featured <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280]">Labels</span>
            </h2>
          </div>
          <div className="flex flex-col gap-2 md:max-w-xs lg:max-w-md">
            <div className="h-[1px] w-12 bg-[#6F4E37] hidden md:block mb-2" />
            <p className="text-xs md:text-sm text-zinc-400 font-sans font-light leading-relaxed">
              Partnering with top global designers and everyday streetwear mainstays to offer a curated, premium catalog.
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Editorial Header */}
      <div className="md:hidden border-b border-zinc-100 dark:border-zinc-800/80 pb-5 mx-4 mb-4">
        <SectionHeading
          variant="playfair"
          className="text-zinc-950 dark:text-zinc-50"
          title={<>FEATURED <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280]">LABELS</span></>}
          eyebrow={
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#6F4E37] dark:text-[#E6C280]" />
              <span className="text-[10px] font-semibold tracking-[0.25em] text-[#6F4E37] dark:text-[#E6C280] uppercase font-mono">
                Discover the labels behind the drip.
              </span>
            </div>
          }
          action={
            <Link
              href={`${basePath}/brands`}
              className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold tracking-wider text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors mt-2"
            >
              <span>VIEW ALL</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          }
        />
      </div>

      {/* Desktop Seamless Bi-Directional Infinite Looper */}
      <div
        className={`hidden md:flex w-full flex-col transition-all duration-1000 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div
          ref={containerRef}
          onScroll={handleScroll}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onWheel={handleWheel}
          className="overflow-x-auto scrollbar-none w-full flex py-4 items-center cursor-grab active:cursor-grabbing select-none"
        >
          <div className="flex gap-6 sm:gap-8 items-center shrink-0 px-4">
            {repeatedBrands.map((brand, idx) => (
              <Link
                key={`${brand.name}-logo-${idx}`}
                href={`${basePath}/brands/${brand.slug}`}
                aria-label={brand.name}
                draggable={false}
                className="shrink-0 h-16 sm:h-20 px-8 flex items-center justify-center rounded-2xl bg-zinc-50/90 dark:bg-zinc-900/80 border border-zinc-200/60 dark:border-zinc-800/80 text-zinc-900 dark:text-zinc-100 hover:text-[#6F4E37] dark:hover:text-[#E6C280] shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(111,78,55,0.12)] hover:border-[#6F4E37]/50 dark:hover:border-[#E6C280]/50 hover:bg-white dark:hover:bg-zinc-900 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 group"
              >
                <div className="transition-transform duration-300 group-hover:scale-105 pointer-events-none">
                  {brand.svg}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Horizontal Carousel Container */}
      <div 
        className={`md:hidden w-full flex items-stretch overflow-x-auto scrollbar-none py-2 gap-3 select-none scroll-smooth flex-nowrap px-4 snap-x snap-mandatory pb-6 transition-all duration-700 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {allBrands.map((brand) => (
          <Link
            key={`mobile-${brand.slug}`}
            href={`${basePath}/brands/${brand.slug}`}
            className="w-[140px] shrink-0 h-24 flex items-center justify-center rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 text-zinc-900 dark:text-zinc-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] snap-start px-6 transition-transform active:scale-95"
            aria-label={brand.name}
          >
            {brand.svg}
          </Link>
        ))}
        <div className="w-4 shrink-0 pointer-events-none" />
      </div>
    </section>
  );
}
