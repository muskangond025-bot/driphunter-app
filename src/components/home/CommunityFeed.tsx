"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Play, VolumeX } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { SectionHeading } from "@/components/ui/SectionHeading";

export default function CommunityFeed({ basePath = "" }: { basePath?: string }) {
  const { ref, isVisible } = useScrollAnimation();
  const [videoErrors, setVideoErrors] = React.useState<Record<string, boolean>>({});
  const isMobileApp = basePath === "/mobile";

  return (
    <section className="bg-[#faf8f5] dark:bg-zinc-950 py-16 border-t border-zinc-100 dark:border-zinc-800 select-none overflow-hidden relative">
      {/* Premium Editorial Header */}
      <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-12 md:px-16 lg:px-20 mb-8">
        <div className="border-b border-zinc-200 dark:border-zinc-800/80 pb-5">
          <SectionHeading
            variant="playfair"
            className="text-zinc-900 dark:text-zinc-100"
            title={<>Featured <span className="font-serif italic font-normal text-[#6F4E37]">Campaigns</span></>}
            eyebrow={
              <span className="text-[10px] md:text-xs font-semibold tracking-[0.3em] text-[#6F4E37] uppercase block font-mono">
                Campaign Showroom
              </span>
            }
            action={
              <div className="flex flex-col gap-2 md:max-w-xs lg:max-w-md">
                <div className="h-[1px] w-12 bg-[#6F4E37] hidden md:block mb-2" />
                <p className="text-xs md:text-sm text-zinc-400 font-sans font-light leading-relaxed">
                  Discover visual narratives, runway motion, and limited-edition editorial releases from our brand partners.
                </p>
              </div>
            }
          />
        </div>
      </div>

      {/* Grid Layout conforming to the exact structure in the screenshot */}
      <div
        ref={ref}
        className="w-full max-w-[1600px] mx-auto px-6 sm:px-12 md:px-16 lg:px-20"
      >
        <div className={isMobileApp ? "flex overflow-x-auto scrollbar-none snap-x snap-mandatory gap-4 pb-6 scroll-p-4 w-full -mx-4 px-4" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 items-stretch"}>
          
          {/* 1. Large Core Editorial (7 cols) */}
          <div 
            className={`${isMobileApp ? "w-[85vw] max-w-[320px] snap-center shrink-0 min-h-[400px]" : "col-span-1 md:col-span-2 lg:col-span-7 min-h-[420px] lg:min-h-[490px]"} relative bg-zinc-950 rounded-[32px] overflow-hidden shadow-md border border-zinc-200/40 group flex flex-col justify-end p-7 transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
            style={{ transitionDelay: '0ms' }}
          >
            <div className="absolute inset-0 z-0">
              {!videoErrors["c1"] ? (
                <video
                  src="https://assets.mixkit.co/videos/preview/mixkit-fashion-model-showing-off-a-streetwear-outfit-40019-large.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  onError={() => setVideoErrors((prev: Record<string, boolean>) => ({ ...prev, c1: true }))}
                  className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-1000 ease-out"
                />
              ) : (
                <Image
                  alt="Streetwear Preview"
                  src="https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=800&q=80"
                  fill
                  className="object-cover opacity-85 group-hover:scale-105 transition-transform duration-1000 ease-out"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
            </div>

            {/* Video Label indicator */}
            <div className="absolute top-5 right-5 z-10 flex items-center gap-2 bg-black/40 border border-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[8.5px] font-mono tracking-widest text-white font-bold uppercase">
                Street Motion
              </span>
            </div>

            <div className="relative z-10 flex flex-col items-start gap-1.5">
              <span className="text-[9px] font-mono tracking-widest text-[#6F4E37] dark:text-[#E6C280] font-extrabold uppercase">
                Core Editorial
              </span>
              <h3 className="text-2xl md:text-3xl font-light text-white font-playfair tracking-wide uppercase">
                Driphunter Archive
              </h3>
              <p className="text-xs text-zinc-300 font-sans font-light leading-relaxed max-w-md">
                Explore relaxed silhouettes, graphic alignments, and modern utility wear engineered for the streets.
              </p>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 text-[9px] font-mono text-white/90 uppercase tracking-widest font-semibold mt-2.5 group-hover:text-white transition-colors duration-300"
              >
                Discover Collection
                <ArrowRight className="w-3 h-3 transform group-hover:translate-x-1.5 transition-transform duration-300" />
              </Link>
            </div>
          </div>

          {/* 2. Vertical Video Reel (5 cols) */}
          <div 
            className={`${isMobileApp ? "w-[85vw] max-w-[320px] snap-center shrink-0 min-h-[400px]" : "col-span-1 md:col-span-1 lg:col-span-5 min-h-[420px] lg:min-h-[490px]"} relative bg-zinc-950 rounded-[32px] overflow-hidden shadow-md border border-zinc-200/40 group flex flex-col justify-end p-7 transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
            style={{ transitionDelay: '150ms' }}
          >
            <div className="absolute inset-0 z-0">
              {!videoErrors["c2"] ? (
                <video
                  src="https://www.shutterstock.com/shutterstock/videos/1106556601/preview/stock-footage-vertical-video-young-beautiful-smiling-woman-in-trendy-summer-yellow-dress-clothes-sexy-carefree.webm"
                  autoPlay
                  loop
                  muted
                  playsInline
                  onError={() => setVideoErrors((prev: Record<string, boolean>) => ({ ...prev, c2: true }))}
                  className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-1000 ease-out"
                />
              ) : (
                <Image
                  alt="Summer Preview"
                  src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=600&q=80"
                  fill
                  className="object-cover opacity-85 group-hover:scale-105 transition-transform duration-1000 ease-out"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
            </div>

            {/* Video Label indicator */}
            <div className="absolute top-5 right-5 z-10 flex items-center gap-2 bg-black/40 border border-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-[8.5px] font-mono tracking-widest text-white font-bold uppercase">
                Summer Reel
              </span>
            </div>

            <div className="relative z-10 flex flex-col items-start gap-1.5">
              <span className="text-[9px] font-mono tracking-widest text-[#6F4E37] dark:text-[#E6C280] font-extrabold uppercase">
                Zara Campaign
              </span>
              <h3 className="text-2xl font-light text-white font-playfair tracking-wide uppercase">
                Minimal Fluidity
              </h3>
              <p className="text-xs text-zinc-300 font-sans font-light leading-relaxed">
                Lightweight draping and tailored essentials for the resort season.
              </p>
              <Link
                href="/shop?brand=zara"
                className="inline-flex items-center gap-2 text-[9px] font-mono text-white/90 uppercase tracking-widest font-semibold mt-2 group-hover:text-white transition-colors duration-300"
              >
                Shop Campaign
                <ArrowRight className="w-3 h-3 transform group-hover:translate-x-1.5 transition-transform duration-300" />
              </Link>
            </div>
          </div>

          {/* 3. Nike Blue Graphic Card (4 cols) */}
          <div 
            className={`${isMobileApp ? "w-[85vw] max-w-[320px] snap-center shrink-0 min-h-[380px]" : "col-span-1 md:col-span-1 lg:col-span-4 min-h-[360px]"} relative bg-zinc-900 rounded-[28px] overflow-hidden shadow-sm border border-zinc-200/50 group flex flex-col justify-end p-6 transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
            style={{ transitionDelay: '0ms' }}
          >
            <div className="absolute inset-0 z-0">
              <Image
                alt="Blue Graphic Tee Model"
                src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80"
                fill
                className="object-cover transition-transform duration-750 group-hover:scale-108"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent opacity-85 group-hover:opacity-95 transition-opacity duration-500" />
            </div>

            <div className="relative z-10 flex flex-col items-start gap-1">
              <span className="text-[9px] font-mono tracking-widest text-[#6F4E37] dark:text-[#E6C280] font-extrabold uppercase">
                Nike Technical
              </span>
              <h3 className="text-xl font-light text-white font-playfair tracking-wide uppercase">
                Treasure Blue Tee
              </h3>
              <Link
                href="/shop?brand=nike"
                className="inline-flex items-center gap-1.5 text-[8.5px] font-mono text-white/80 uppercase tracking-widest font-semibold mt-2 group-hover:text-white transition-colors duration-300"
              >
                Explore
                <ArrowRight className="w-2.5 h-2.5 transform group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>

          {/* 4. Creator Video Campaign (4 cols) */}
          <div 
            className={`${isMobileApp ? "w-[85vw] max-w-[320px] snap-center shrink-0 min-h-[380px]" : "col-span-1 md:col-span-1 lg:col-span-4 min-h-[360px]"} relative bg-zinc-950 rounded-[28px] overflow-hidden shadow-sm border border-zinc-200/40 group flex flex-col justify-end p-6 transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
            style={{ transitionDelay: '150ms' }}
          >
            <div className="absolute inset-0 z-0">
              {!videoErrors["c3"] ? (
                <video
                  src="https://www.shutterstock.com/shutterstock/videos/3483336041/preview/stock-footage-vertical-shot-pretty-female-blogger-taking-hand.webm"
                  autoPlay
                  loop
                  muted
                  playsInline
                  onError={() => setVideoErrors((prev: Record<string, boolean>) => ({ ...prev, c3: true }))}
                  className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-1000 ease-out"
                />
              ) : (
                <Image
                  alt="Blogger Preview"
                  src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80"
                  fill
                  className="object-cover opacity-85 group-hover:scale-105 transition-transform duration-1000 ease-out"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent" />
            </div>

            {/* Video Label indicator */}
            <div className="absolute top-5 right-5 z-10 flex items-center gap-2 bg-black/40 border border-white/10 backdrop-blur-md px-3 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
              <span className="text-[8px] font-mono tracking-widest text-white font-bold uppercase">
                Blogger Edit
              </span>
            </div>

            <div className="relative z-10 flex flex-col items-start gap-1">
              <span className="text-[9px] font-mono tracking-widest text-[#6F4E37] dark:text-[#E6C280] font-extrabold uppercase">
                Fear Of God
              </span>
              <h3 className="text-xl font-light text-white font-playfair tracking-wide uppercase">
                Creator Showcase
              </h3>
              <Link
                href="/shop?brand=fear-of-god"
                className="inline-flex items-center gap-1.5 text-[8.5px] font-mono text-white/80 uppercase tracking-widest font-semibold mt-2 group-hover:text-white transition-colors duration-300"
              >
                Explore Label
                <ArrowRight className="w-2.5 h-2.5 transform group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>

          {/* 5. Represent Red Edition (4 cols) */}
          <div 
            className={`${isMobileApp ? "w-[85vw] max-w-[320px] snap-center shrink-0 min-h-[380px]" : "col-span-1 md:col-span-2 lg:col-span-4 min-h-[360px]"} relative bg-zinc-950 rounded-[28px] overflow-hidden shadow-sm border border-zinc-200/50 group flex flex-col justify-end p-6 transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
            style={{ transitionDelay: '300ms' }}
          >
            <div className="absolute inset-0 z-0">
              {!videoErrors["c4"] ? (
                <video
                  src="https://www.shutterstock.com/shutterstock/videos/1107797059/preview/stock-footage-vertical-video-young-beautiful-smiling-hipster-woman-in-trendy-summer-red-top-and-skirt-clothes.webm"
                  autoPlay
                  loop
                  muted
                  playsInline
                  onError={() => setVideoErrors((prev: Record<string, boolean>) => ({ ...prev, c4: true }))}
                  className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-1000 ease-out"
                />
              ) : (
                <Image
                  alt="Red Preview"
                  src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80"
                  fill
                  className="object-cover opacity-85 group-hover:scale-105 transition-transform duration-1000 ease-out"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent" />
            </div>

            {/* Video Label indicator */}
            <div className="absolute top-5 right-5 z-10 flex items-center gap-2 bg-black/40 border border-white/10 backdrop-blur-md px-3 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
              <span className="text-[8px] font-mono tracking-widest text-white font-bold uppercase">
                Red Edit
              </span>
            </div>

            <div className="relative z-10 flex flex-col items-start gap-1">
              <span className="text-[9px] font-mono tracking-widest text-[#6F4E37] dark:text-[#E6C280] font-extrabold uppercase">
                Represent
              </span>
              <h3 className="text-xl font-light text-white font-playfair tracking-wide uppercase">
                Street Red Edition
              </h3>
              <Link
                href="/shop?brand=represent"
                className="inline-flex items-center gap-1.5 text-[8.5px] font-mono text-white/80 uppercase tracking-widest font-semibold mt-2 group-hover:text-white transition-colors duration-300"
              >
                Explore Campaign
                <ArrowRight className="w-2.5 h-2.5 transform group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>

          {/* 6. Adidas Olive Graphic (5 cols) */}
          <div className={`${isMobileApp ? "w-[85vw] max-w-[320px] snap-center shrink-0 min-h-[380px]" : "col-span-1 md:col-span-1 lg:col-span-5 min-h-[340px]"} relative bg-zinc-900 rounded-[28px] overflow-hidden shadow-sm border border-zinc-200/50 group flex flex-col justify-end p-6`}>
            <div className="absolute inset-0 z-0">
              <Image
                alt="Olive Graphic Tee Model"
                src="https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=600&q=80"
                fill
                className="object-cover transition-transform duration-750 group-hover:scale-108"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent opacity-85 group-hover:opacity-95 transition-opacity duration-500" />
            </div>

            <div className="relative z-10 flex flex-col items-start gap-1">
              <span className="text-[9px] font-mono tracking-widest text-[#6F4E37] dark:text-[#E6C280] font-extrabold uppercase">
                Adidas Originals
              </span>
              <h3 className="text-xl font-light text-white font-playfair tracking-wide uppercase">
                Sunflower Olive Tee
              </h3>
              <Link
                href="/shop?brand=adidas"
                className="inline-flex items-center gap-1.5 text-[8.5px] font-mono text-white/80 uppercase tracking-widest font-semibold mt-2 group-hover:text-white transition-colors duration-300"
              >
                Explore
                <ArrowRight className="w-2.5 h-2.5 transform group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>

          {/* 7. Stüssy Archive Luxury Video (7 cols) */}
          <div className={`${isMobileApp ? "w-[85vw] max-w-[320px] snap-center shrink-0 min-h-[380px]" : "col-span-1 md:col-span-1 lg:col-span-7 min-h-[340px]"} relative bg-zinc-950 rounded-[32px] overflow-hidden shadow-md border border-zinc-200/50 group flex flex-col justify-end p-7`}>
            <div className="absolute inset-0 z-0">
              {!videoErrors["c5"] ? (
                <video
                  src="https://www.shutterstock.com/shutterstock/videos/1109719157/preview/stock-footage-close-up-portrait-of-a-young-luxurious-sexy-woman-looking-at-the-camera-on-a-white-background.webm"
                  autoPlay
                  loop
                  muted
                  playsInline
                  onError={() => setVideoErrors((prev: Record<string, boolean>) => ({ ...prev, c5: true }))}
                  className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-1000 ease-out"
                />
              ) : (
                <Image
                  alt="Luxury Preview"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80"
                  fill
                  className="object-cover opacity-85 group-hover:scale-105 transition-transform duration-1000 ease-out"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent" />
            </div>

            {/* Video Label indicator */}
            <div className="absolute top-5 right-5 z-10 flex items-center gap-2 bg-black/40 border border-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse" />
              <span className="text-[8.5px] font-mono tracking-widest text-white font-bold uppercase">
                Luxury Edit
              </span>
            </div>

            <div className="relative z-10 flex flex-col items-start gap-1">
              <span className="text-[9px] font-mono tracking-widest text-[#6F4E37] dark:text-[#E6C280] font-extrabold uppercase">
                Stüssy Archive
              </span>
              <h3 className="text-2xl font-light text-white font-playfair tracking-wide uppercase">
                Mint Grails Edition
              </h3>
              <p className="text-xs text-zinc-300 font-sans font-light leading-relaxed">
                Exclusive drop featuring archival streetwear silhouettes and luxury finish.
              </p>
              <Link
                href="/shop?brand=stussy"
                className="inline-flex items-center gap-2 text-[9px] font-mono text-white/90 uppercase tracking-widest font-semibold mt-2 group-hover:text-white transition-colors duration-300"
              >
                Explore Campaign
                <ArrowRight className="w-3 h-3 transform group-hover:translate-x-1.5 transition-transform duration-300" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
