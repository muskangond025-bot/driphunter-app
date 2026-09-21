"use client";

import React from "react";
import Image from "next/image";
import { Radio, Users, Eye, Play } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface LiveShow {
  id: string;
  host: string;
  title: string;
  viewers: string;
  image: string;
}

const shows: LiveShow[] = [
  { id: "show-1", host: "@riya_fitwear", title: "Testing Summer Heavy Tees", viewers: "1.2K", image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80" },
  { id: "show-2", host: "@kabir_drips", title: "Styling Tech Utility Cargoes", viewers: "842", image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=400&q=80" },
  { id: "show-3", host: "@ananya_trends", title: "Varsity Archives Live Review", viewers: "2.1K", image: "https://images.unsplash.com/photo-1611312449412-6cefac5dc3e4?auto=format&fit=crop&w=400&q=80" },
  { id: "show-4", host: "@rupert_drip", title: "Quick Unboxing Premium Bags", viewers: "910", image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=400&q=80" },
];

export default function LiveShows() {
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
            title="Live Shows"
            className="text-black"
            eyebrow={
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-[#6F4E37] animate-pulse" />
                <span className="text-[10px] font-mono text-[#6F4E37] font-extrabold uppercase tracking-widest">
                  IN-APP BROADCAST
                </span>
              </div>
            }
          />
        </div>

        {/* Grid of Broadcasts */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children ${
            isVisible ? "visible" : ""
          }`}
        >
          {shows.map((show) => (
            <div
              key={show.id}
              className="group relative rounded-[24px] overflow-hidden bg-zinc-950 aspect-[4/5] border border-zinc-900 shadow-lg cursor-pointer transition-all duration-300 hover:shadow-2xl hover:border-zinc-800"
            >
              {/* Cover Image */}
              <Image
                alt={show.title}
                src={show.image}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80"
                sizes="(max-width: 768px) 100vw, 20vw"
              />

              {/* Gradient Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-10" />

              {/* Top Overlays */}
              <div className="absolute top-4 inset-x-4 flex items-center justify-between z-20">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white text-black font-mono text-[9px] uppercase tracking-wider font-extrabold rounded-full shadow-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#6F4E37] animate-ping" />
                  LIVE
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-black/45 backdrop-blur-sm text-zinc-300 font-mono text-[9px] rounded-full border border-white/10">
                  <Users className="w-3 h-3 text-[#6F4E37]" />
                  {show.viewers}
                </span>
              </div>

              {/* Bottom Info Content */}
              <div className="absolute bottom-4 inset-x-4 z-20 text-left space-y-2">
                <span className="text-[10px] font-mono text-white/70 block">{show.host}</span>
                <h4 className="text-sm font-bold text-white uppercase tracking-tight line-clamp-2 leading-tight">
                  {show.title}
                </h4>
                
                {/* Simulated Stream Join Trigger */}
                <div className="pt-2">
                  <button className="w-full flex items-center justify-center gap-1.5 bg-[#6F4E37] hover:bg-[#5C3D2E] text-white font-mono text-[10px] uppercase font-bold tracking-widest py-2 rounded-xl transition-all shadow-md active:scale-95">
                    <Play className="w-3 h-3 fill-white" />
                    Watch Stream
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
