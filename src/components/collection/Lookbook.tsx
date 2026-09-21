"use client";

import React, { useState } from "react";
import { Plus, ShoppingBag, Eye, Tag, ExternalLink } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface TaggedItem {
  id: string;
  name: string;
  price: number;
  x: number; // percentage from left
  y: number; // percentage from top
}

export default function Lookbook() {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const taggedItems: TaggedItem[] = [
    { id: "bo-1", name: "400GSM Stealth Heavy Hoodie", price: 3999, x: 50, y: 35 },
    { id: "bo-3", name: "Multi-Pocket Tactical Cargos", price: 3299, x: 55, y: 70 }
  ];

  return (
    <section className="w-full py-16 bg-zinc-950 border-b border-zinc-900 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-16">
          <SectionHeading
            variant="sans"
            className="text-white"
            title="Interactive Lookbook"
            eyebrow={
              <span className="text-xs font-bold uppercase tracking-widest text-brand-neon font-mono">Style Guide</span>
            }
            subtitle={
              <p className="text-sm text-zinc-400 max-w-xl leading-relaxed">
                Hover over the hotspots to discover what items make up this signature Blackout fit and add them directly to your checkout bag.
              </p>
            }
            action={
              <div className="shrink-0 flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-brand-neon animate-ping" />
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">Tap hotspots to shop</span>
              </div>
            }
          />
        </div>

        {/* Lookbook Display Container */}
        <div className="relative max-w-3xl mx-auto rounded-3xl overflow-hidden border border-zinc-900 bg-zinc-950 aspect-[3/4] sm:aspect-[4/5] group">
          <img
            src="https://images.unsplash.com/photo-1488161628813-04466f872be2?q=80&w=800&auto=format&fit=crop"
            alt="Streetwear model styling Blackout collection"
            className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:scale-[1.01]"
          />
          
          {/* Subtle overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />

          {/* Interactive Hotspots */}
          {taggedItems.map((item) => {
            const isOpen = activeTag === item.id;
            
            return (
              <div
                key={item.id}
                className="absolute"
                style={{ left: `${item.x}%`, top: `${item.y}%` }}
                onMouseEnter={() => setActiveTag(item.id)}
                onMouseLeave={() => setActiveTag(null)}
              >
                {/* Hotspot Pulse Button */}
                <button
                  className={`relative flex h-8 w-8 items-center justify-center rounded-full text-black transition-all duration-300 shadow-2xl ${
                    isOpen ? "bg-brand-neon scale-110" : "bg-white hover:bg-brand-neon hover:scale-105"
                  }`}
                  aria-label={`View ${item.name}`}
                >
                  <Plus className={`h-4.5 w-4.5 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`} />
                  <span className="absolute inset-0 rounded-full bg-white/30 animate-ping pointer-events-none" />
                </button>

                {/* Tooltip Card popup */}
                {isOpen && (
                  <div className="absolute bottom-10 -left-28 sm:-left-36 w-56 sm:w-72 bg-zinc-950 border border-zinc-800 rounded-xl p-4 shadow-[0_10px_40px_rgba(0,0,0,0.8)] z-30 animate-fade-in">
                    <div className="space-y-3">
                      <div>
                        <p className="text-[9px] font-black uppercase tracking-wider text-brand-neon font-mono">
                          TAGGED PRODUCT
                        </p>
                        <h4 className="text-xs sm:text-sm font-extrabold text-white mt-1 leading-tight">
                          {item.name}
                        </h4>
                        <p className="text-xs font-extrabold text-white mt-1">₹{item.price}</p>
                      </div>
                      
                      <div className="flex gap-2">
                        <button className="flex-1 bg-white hover:bg-zinc-200 text-black text-[10px] font-extrabold uppercase tracking-wider py-2 rounded-lg transition-colors flex items-center justify-center gap-1">
                          <ShoppingBag className="h-3 w-3" /> Add
                        </button>
                        <button className="bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-300 text-[10px] font-bold uppercase tracking-wider px-3 py-2 rounded-lg transition-colors flex items-center justify-center">
                          <Eye className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
