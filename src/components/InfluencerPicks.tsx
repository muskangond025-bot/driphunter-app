"use client";

import React from "react";
import Image from "next/image";
import { Star, ArrowRight, ExternalLink } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { SectionHeading } from "@/components/ui/SectionHeading";

const influencers = [
  {
    name: "Alex Rivera",
    handle: "@alexdrips",
    pick: "Oversized Varsity Jacket",
    image: "https://images.unsplash.com/photo-1611312449412-6cefac5dc3e4?auto=format&fit=crop&w=400&q=80",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80",
  },
  {
    name: "Maya Chen",
    handle: "@mayastreet",
    pick: "Cyber Cargo Pants",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=400&q=80",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80",
  },
  {
    name: "Jordan Blake",
    handle: "@jb_threads",
    pick: "Reflective Tech Hoodie",
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=400&q=80",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80",
  },
];

export default function InfluencerPicks() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="bg-white dark:bg-zinc-950 py-16 border-t border-zinc-100 dark:border-zinc-900">
      <div ref={ref} className="w-full max-w-[1600px] mx-auto px-6 sm:px-12 md:px-16 lg:px-20">
        <div
          className={`mb-14 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <SectionHeading
            title="Influencer Picks"
            className="text-black"
            align="center"
            subtitle={<p className="text-xs sm:text-sm text-zinc-500 mt-3 max-w-lg mx-auto">Curated selections from the most influential voices in streetwear culture</p>}
          />
        </div>

        <div
          className={`grid grid-cols-1 md:grid-cols-3 gap-8 stagger-children ${
            isVisible ? "visible" : ""
          }`}
        >
          {influencers.map((inf) => (
            <div
              key={inf.handle}
              className="group relative rounded-3xl overflow-hidden bg-zinc-950 cursor-pointer card-hover"
            >
              {/* Image */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  alt={inf.name}
                  src={inf.image}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              </div>

              {/* Content */}
              <div className="absolute bottom-0 inset-x-0 p-6 z-10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white/30">
                    <Image
                      alt={inf.name}
                      src={inf.avatar}
                      fill
                      className="object-cover"
                      sizes="40px"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{inf.name}</p>
                    <p className="text-[10px] font-mono text-zinc-400">{inf.handle}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[9px] font-mono text-[#6F4E37] uppercase tracking-widest">
                      Top Pick
                    </span>
                    <h4 className="text-sm font-bold text-white mt-0.5">{inf.pick}</h4>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                    <ExternalLink className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
