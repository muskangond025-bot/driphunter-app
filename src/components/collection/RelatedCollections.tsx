"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

export default function RelatedCollections() {
  const collections = [
    {
      title: "Summer Heat",
      desc: "Lightweight linen and high-breathability tech fabrics designed for hot climates.",
      image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=400&auto=format&fit=crop",
      tag: "Capsule 03"
    },
    {
      title: "Midnight Drop",
      desc: "Deep Indigo denim, neon-accented utility wear, and reflective elements.",
      image: "https://images.unsplash.com/photo-1509281373149-e957c6296406?q=80&w=400&auto=format&fit=crop",
      tag: "Capsule 02"
    },
    {
      title: "Vintage Revival",
      desc: "Distressed retro graphics, boxy cuts, and acid-washed custom washes.",
      image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=400&auto=format&fit=crop",
      tag: "Capsule 01"
    }
  ];

  return (
    <section className="w-full py-16 bg-zinc-950 border-b border-zinc-900 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-16">
          <SectionHeading
            variant="sans"
            className="text-white"
            title="Related Collections"
            eyebrow={
              <span className="text-xs font-bold uppercase tracking-widest text-brand-neon">Discover More</span>
            }
            action={
              <button className="hidden sm:flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-white transition-colors">
                All Collections <ArrowRight className="h-4 w-4" />
              </button>
            }
          />
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {collections.map((col, idx) => (
            <div
              key={idx}
              className="group relative flex flex-col bg-zinc-900/10 border border-zinc-900 hover:border-zinc-800 rounded-3xl overflow-hidden p-5 transition-all duration-350 hover:shadow-xl hover:-translate-y-1"
            >
              {/* Image Container */}
              <div className="relative aspect-[1.8/1] w-full rounded-2xl overflow-hidden bg-zinc-900 mb-6 border border-zinc-900">
                <img
                  src={col.image}
                  alt={col.title}
                  className="object-cover w-full h-full grayscale group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 z-10 bg-black/60 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-wider text-white">
                  {col.tag}
                </div>
              </div>

              {/* Info */}
              <div className="space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="text-lg font-extrabold text-white group-hover:text-brand-neon transition-colors duration-300">
                    {col.title}
                  </h3>
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    {col.desc}
                  </p>
                </div>

                <div className="pt-2">
                  <button className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white group-hover:text-brand-neon transition-colors">
                    Explore Drop <ArrowRight className="h-3 w-3" />
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
