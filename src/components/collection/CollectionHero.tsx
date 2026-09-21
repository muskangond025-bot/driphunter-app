"use client";

import React from "react";
import { ArrowDown } from "lucide-react";

export default function CollectionHero() {
  const handleScrollToGrid = () => {
    const element = document.getElementById("collection-grid-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full h-[60vh] sm:h-[75vh] min-h-[500px] overflow-hidden bg-black flex items-center">
      {/* Background Media Container */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=1600&auto=format&fit=crop"
          alt="Blackout Collection Banner"
          className="w-full h-full object-cover opacity-70 scale-105 animate-[pulse_6000ms_infinite] transition-transform duration-1000"
        />
        {/* Sleek Dark Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-transparent to-zinc-950/20" />
        {/* Futuristic grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl space-y-6">
          {/* Tag */}
          <div className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 backdrop-blur-md px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-white">
            <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
            <span>Limited Capsule 04</span>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <h1 className="text-5xl font-black tracking-tighter text-white sm:text-7xl lg:text-8xl uppercase leading-none">
              BLACKOUT
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-zinc-400 via-white to-zinc-500 font-extrabold italic">
                COLLECTION
              </span>
            </h1>
          </div>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-zinc-400 font-medium tracking-wide">
            Minimal. Bold. All Black. Heavyweight street-garments built for the midnight culture.
          </p>

          {/* CTAs */}
          <div className="pt-4 flex flex-col sm:flex-row gap-4 items-center">
            <button
              onClick={handleScrollToGrid}
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-xl bg-white hover:bg-zinc-200 text-black font-extrabold px-8 py-4 text-sm transition-all duration-300 shadow-[0_4px_30px_rgba(255,255,255,0.1)] hover:scale-[1.02]"
            >
              Shop Collection
              <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
            </button>
            <span className="text-xs font-bold text-zinc-600 uppercase tracking-widest font-mono">
              Drops ending soon
            </span>
          </div>
        </div>
      </div>

      {/* Bottom border stripe */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
    </section>
  );
}
