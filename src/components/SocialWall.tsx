"use client";

import React from "react";
import Image from "next/image";
import { Play, Heart, MessageCircle, Monitor, Sparkles } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { SectionHeading } from "@/components/ui/SectionHeading";

export default function SocialWall() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="bg-white dark:bg-zinc-950 py-16 border-t border-zinc-100 dark:border-zinc-900">
      <div ref={ref} className="w-full max-w-[1600px] mx-auto px-6 sm:px-12 md:px-16 lg:px-20">
        
        {/* Section Header */}
        <div
          className={`mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <SectionHeading
            title="Social Wall"
            className="text-black"
            eyebrow={
              <div className="flex items-center gap-2">
                <Monitor className="w-4 h-4 text-[#6F4E37]" />
                <span className="text-[10px] font-mono text-[#6F4E37] font-extrabold uppercase tracking-widest">
                  STREAMING HUB
                </span>
              </div>
            }
          />
        </div>

        {/* Social Wall Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT: Premium TV Display Mockup */}
          <div 
            className={`lg:col-span-7 relative rounded-[32px] overflow-hidden bg-zinc-950 p-6 sm:p-10 flex flex-col justify-between min-h-[400px] sm:min-h-[500px] border border-zinc-900 shadow-2xl transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
            }`}
          >
            {/* TV Screen Mockup Inner */}
            <div className="absolute inset-4 rounded-[24px] overflow-hidden border border-zinc-800/80 bg-zinc-900 flex items-center justify-center group shadow-inner">
              <Image
                alt="TV Feed"
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=750&q=80"
                fill
                className="object-cover opacity-60 transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
              
              {/* Play / YouTube overlay badge */}
              <div className="absolute z-10 w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg cursor-pointer">
                <Play className="w-8 h-8 text-[#6F4E37] fill-[#6F4E37] ml-1" />
              </div>
              
              {/* Chat overlay mockup inside TV */}
              <div className="absolute bottom-4 left-4 right-4 z-10 bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl p-4 text-left text-white max-w-sm space-y-2 select-none animate-pulse">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#6F4E37] animate-ping" />
                  <span className="text-[9px] font-mono text-zinc-400">@drip_curator: Live Reviewing fits</span>
                </div>
                <p className="text-[11px] font-mono text-zinc-200 leading-tight">
                  &ldquo;This fabric is insanely high quality... worth every single rupee.&rdquo;
                </p>
              </div>
            </div>

            {/* Bottom Screen Indicator Details */}
            <div className="relative z-10 flex items-center justify-between text-left text-white/50 text-[10px] font-mono select-none pt-4">
              <span>DRIP-VISION V1.0</span>
              <span>● BROADCASTING ON YOUTUBE</span>
            </div>
          </div>

          {/* RIGHT: Mockup Social Cards */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            {/* Social Card 1 */}
            <div 
              className={`bg-[#f5f0eb] border border-zinc-200 rounded-[24px] p-6 text-left flex flex-col justify-between flex-1 hover:shadow-xl hover:border-zinc-300 transition-all duration-1000 ease-out ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: '150ms' }}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center font-bold text-xs">DH</div>
                    <div>
                      <h4 className="text-xs font-bold text-zinc-950 uppercase tracking-tight">Vikas Rawat</h4>
                      <span className="text-[9px] font-mono text-zinc-500">@vikas_drips</span>
                    </div>
                  </div>
                  <Heart className="w-4 h-4 text-[#6F4E37] fill-[#6F4E37]" />
                </div>
                <p className="text-xs font-mono text-zinc-700 leading-relaxed">
                  Just received my varsity jacket drop today! The custom embroidery details and heavy wool feel premium as promised. Incredible fit.
                </p>
              </div>
              <span className="text-[9px] font-mono text-zinc-500 pt-4 block border-t border-zinc-300/40">POSTED ON TWITTER</span>
            </div>

            {/* Social Card 2 */}
            <div 
              className={`bg-zinc-950 border border-zinc-900 rounded-[24px] p-6 text-left flex flex-col justify-between flex-1 hover:shadow-xl hover:border-zinc-800 transition-all duration-1000 ease-out text-white ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: '300ms' }}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center font-bold text-xs">DR</div>
                    <div>
                      <h4 className="text-xs font-bold text-zinc-100 uppercase tracking-tight">Karan Shah</h4>
                      <span className="text-[9px] font-mono text-zinc-400">@karan_fits</span>
                    </div>
                  </div>
                  <Sparkles className="w-4 h-4 text-[#6F4E37]" />
                </div>
                <p className="text-xs font-mono text-zinc-400 leading-relaxed">
                  Best customer service experience. Had to size up my cargo pants and they resolved it in less than 48 hours. Strongly recommend DRIP HUNTER!
                </p>
              </div>
              <span className="text-[9px] font-mono text-zinc-500 pt-4 block border-t border-zinc-900">POSTED ON INSTAGRAM</span>
            </div>
            
          </div>

        </div>

      </div>
    </section>
  );
}
