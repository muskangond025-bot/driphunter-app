"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const teasers = [
  {
    brand: "NIKE",
    tagline: "Performance Engineered",
    description: "Where athletic performance meets high-street subculture. Disruptive designs engineered for the city skyline.",
    image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80",
    gridClass: "col-span-12 lg:col-span-7 aspect-[16/10] lg:aspect-auto lg:h-[340px]",
    href: "/brands/nike"
  },
  {
    brand: "ZARA",
    tagline: "Modern Minimalism",
    description: "Sleek, fluid silhouettes and contemporary palettes curated for the progressive urban uniform.",
    image: "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=800&q=80",
    gridClass: "col-span-12 lg:col-span-5 aspect-[4/5] lg:aspect-auto lg:h-[340px]",
    href: "/brands/zara"
  },
  {
    brand: "FEAR OF GOD",
    tagline: "Ethereal Gradients",
    description: "Quiet luxury and draped proportions. Reimagining American classics with a soulful, refined lens.",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80",
    gridClass: "col-span-12 lg:col-span-5 aspect-[4/5] lg:aspect-auto lg:h-[340px]",
    href: "/brands/fear-of-god"
  },
  {
    brand: "BALENCIAGA",
    tagline: "Avant-Garde Couture",
    description: "Deconstructed shapes and boundary-pushing volumes. Redefining the rules of high fashion and street archive.",
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80",
    gridClass: "col-span-12 lg:col-span-7 aspect-[16/10] lg:aspect-auto lg:h-[340px]",
    href: "/brands/balenciaga"
  }
];

export default function BrandTeasers() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="bg-white dark:bg-zinc-950 pt-4 pb-10 sm:pt-6 sm:pb-12 border-t border-zinc-100 dark:border-zinc-900 select-none overflow-hidden relative">
      <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-12 md:px-16 lg:px-20">
        
        {/* Premium Editorial Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-100 dark:border-zinc-800/80 pb-5">
            <div>
              <span className="text-[10px] md:text-xs font-semibold tracking-[0.3em] text-[#6F4E37] dark:text-[#E6C280] uppercase block mb-3 font-mono">
                Brand Spotlights
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-zinc-900 dark:text-zinc-100 font-playfair leading-none">
                Label <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280]">Teasers</span>
              </h2>
            </div>
            <div className="flex flex-col gap-2 md:max-w-xs lg:max-w-md">
              <div className="h-[1px] w-12 bg-[#6F4E37] hidden md:block mb-2" />
              <p className="text-xs md:text-sm text-zinc-400 font-sans font-light leading-relaxed">
                A visual showcase exploring the design philosophies and distinct aesthetics of our premier labels.
              </p>
            </div>
          </div>
        </div>

        {/* Asymmetrical Collage Rows with Hover Accordion Width Expansion */}
        <div
          ref={ref}
          className={`flex flex-col gap-6 w-full transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Row 1: Nike & Zara */}
          <div className="flex flex-col lg:flex-row gap-6 w-full">
            {/* Card 1: Nike (flex-7, expands on hover) */}
            <Link
              href={teasers[0].href}
              className="group overflow-hidden rounded-[28px] relative flex flex-col justify-end p-4 sm:p-5 border border-zinc-200/50 shadow-sm hover:shadow-[0_20px_45px_rgba(111,78,55,0.12)] hover:-translate-y-0.5 w-full aspect-[16/10] lg:aspect-auto lg:h-[340px] lg:flex-[7] lg:hover:flex-[8.5] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer"
            >
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <Image
                  alt={teasers[0].brand}
                  src={teasers[0].image}
                  fill
                  className="object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 55vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent opacity-85 group-hover:opacity-90 transition-opacity duration-500" />
              </div>

              {/* Floating Frosted Glass Info Panel */}
              <div className="relative z-10 w-full bg-zinc-950/25 border border-white/5 backdrop-blur-md p-5 rounded-2xl flex flex-col items-start gap-1 transition-all duration-500 group-hover:bg-zinc-950/45 group-hover:border-white/10">
                <span className="text-[9px] font-mono tracking-widest text-[#6F4E37] font-black uppercase">
                  {teasers[0].tagline}
                </span>
                <h3 className="text-xl md:text-2xl font-light text-white font-playfair tracking-wide uppercase">
                  {teasers[0].brand}
                </h3>
                
                {/* Description - Slides up and fades in on hover */}
                <p className="text-[11px] text-zinc-300 font-sans font-light leading-relaxed max-w-md opacity-0 group-hover:opacity-100 max-h-0 group-hover:max-h-16 transition-all duration-550 ease-out overflow-hidden mt-0 group-hover:mt-1.5">
                  {teasers[0].description}
                </p>

                {/* Arrow link indicator */}
                <div className="flex items-center gap-1.5 text-[8px] font-mono text-white/80 uppercase tracking-widest font-semibold mt-2 group-hover:text-white transition-colors duration-300">
                  Explore Label
                  <ArrowRight className="w-2.5 h-2.5 transform group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </Link>

            {/* Card 2: Zara (flex-5, expands on hover) */}
            <Link
              href={teasers[1].href}
              className="group overflow-hidden rounded-[28px] relative flex flex-col justify-end p-4 sm:p-5 border border-zinc-200/50 shadow-sm hover:shadow-[0_20px_45px_rgba(111,78,55,0.12)] hover:-translate-y-0.5 w-full aspect-[4/5] lg:aspect-auto lg:h-[340px] lg:flex-[5] lg:hover:flex-[6.5] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer"
            >
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <Image
                  alt={teasers[1].brand}
                  src={teasers[1].image}
                  fill
                  className="object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent opacity-85 group-hover:opacity-90 transition-opacity duration-500" />
              </div>

              {/* Floating Frosted Glass Info Panel */}
              <div className="relative z-10 w-full bg-zinc-950/25 border border-white/5 backdrop-blur-md p-5 rounded-2xl flex flex-col items-start gap-1 transition-all duration-500 group-hover:bg-zinc-950/45 group-hover:border-white/10">
                <span className="text-[9px] font-mono tracking-widest text-[#6F4E37] font-black uppercase">
                  {teasers[1].tagline}
                </span>
                <h3 className="text-xl md:text-2xl font-light text-white font-playfair tracking-wide uppercase">
                  {teasers[1].brand}
                </h3>
                
                {/* Description - Slides up and fades in on hover */}
                <p className="text-[11px] text-zinc-300 font-sans font-light leading-relaxed max-w-md opacity-0 group-hover:opacity-100 max-h-0 group-hover:max-h-16 transition-all duration-550 ease-out overflow-hidden mt-0 group-hover:mt-1.5">
                  {teasers[1].description}
                </p>

                {/* Arrow link indicator */}
                <div className="flex items-center gap-1.5 text-[8px] font-mono text-white/80 uppercase tracking-widest font-semibold mt-2 group-hover:text-white transition-colors duration-300">
                  Explore Label
                  <ArrowRight className="w-2.5 h-2.5 transform group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </Link>
          </div>

          {/* Row 2: Fear of God & Balenciaga */}
          <div className="flex flex-col lg:flex-row gap-6 w-full">
            {/* Card 3: Fear of God (flex-5, expands on hover) */}
            <Link
              href={teasers[2].href}
              className="group overflow-hidden rounded-[28px] relative flex flex-col justify-end p-4 sm:p-5 border border-zinc-200/50 shadow-sm hover:shadow-[0_20px_45px_rgba(111,78,55,0.12)] hover:-translate-y-0.5 w-full aspect-[4/5] lg:aspect-auto lg:h-[340px] lg:flex-[5] lg:hover:flex-[6.5] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer"
            >
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <Image
                  alt={teasers[2].brand}
                  src={teasers[2].image}
                  fill
                  className="object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent opacity-85 group-hover:opacity-90 transition-opacity duration-500" />
              </div>

              {/* Floating Frosted Glass Info Panel */}
              <div className="relative z-10 w-full bg-zinc-950/25 border border-white/5 backdrop-blur-md p-5 rounded-2xl flex flex-col items-start gap-1 transition-all duration-500 group-hover:bg-zinc-950/45 group-hover:border-white/10">
                <span className="text-[9px] font-mono tracking-widest text-[#6F4E37] font-black uppercase">
                  {teasers[2].tagline}
                </span>
                <h3 className="text-xl md:text-2xl font-light text-white font-playfair tracking-wide uppercase">
                  {teasers[2].brand}
                </h3>
                
                {/* Description - Slides up and fades in on hover */}
                <p className="text-[11px] text-zinc-300 font-sans font-light leading-relaxed max-w-md opacity-0 group-hover:opacity-100 max-h-0 group-hover:max-h-16 transition-all duration-550 ease-out overflow-hidden mt-0 group-hover:mt-1.5">
                  {teasers[2].description}
                </p>

                {/* Arrow link indicator */}
                <div className="flex items-center gap-1.5 text-[8px] font-mono text-white/80 uppercase tracking-widest font-semibold mt-2 group-hover:text-white transition-colors duration-300">
                  Explore Label
                  <ArrowRight className="w-2.5 h-2.5 transform group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </Link>

            {/* Card 4: Balenciaga (flex-7, expands on hover) */}
            <Link
              href={teasers[3].href}
              className="group overflow-hidden rounded-[28px] relative flex flex-col justify-end p-4 sm:p-5 border border-zinc-200/50 shadow-sm hover:shadow-[0_20px_45px_rgba(111,78,55,0.12)] hover:-translate-y-0.5 w-full aspect-[16/10] lg:aspect-auto lg:h-[340px] lg:flex-[7] lg:hover:flex-[8.5] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer"
            >
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <Image
                  alt={teasers[3].brand}
                  src={teasers[3].image}
                  fill
                  className="object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 55vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent opacity-85 group-hover:opacity-90 transition-opacity duration-500" />
              </div>

              {/* Floating Frosted Glass Info Panel */}
              <div className="relative z-10 w-full bg-zinc-950/25 border border-white/5 backdrop-blur-md p-5 rounded-2xl flex flex-col items-start gap-1 transition-all duration-500 group-hover:bg-zinc-950/45 group-hover:border-white/10">
                <span className="text-[9px] font-mono tracking-widest text-[#6F4E37] font-black uppercase">
                  {teasers[3].tagline}
                </span>
                <h3 className="text-xl md:text-2xl font-light text-white font-playfair tracking-wide uppercase">
                  {teasers[3].brand}
                </h3>
                
                {/* Description - Slides up and fades in on hover */}
                <p className="text-[11px] text-zinc-300 font-sans font-light leading-relaxed max-w-md opacity-0 group-hover:opacity-100 max-h-0 group-hover:max-h-16 transition-all duration-550 ease-out overflow-hidden mt-0 group-hover:mt-1.5">
                  {teasers[3].description}
                </p>

                {/* Arrow link indicator */}
                <div className="flex items-center gap-1.5 text-[8px] font-mono text-white/80 uppercase tracking-widest font-semibold mt-2 group-hover:text-white transition-colors duration-300">
                  Explore Label
                  <ArrowRight className="w-2.5 h-2.5 transform group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
