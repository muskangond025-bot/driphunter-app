"use client";

import React from "react";
import { Sparkles, Compass, Eye } from "lucide-react";

export default function CollectionStory() {
  return (
    <section className="w-full py-16 bg-background border-b border-border/40 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Inspiration Narrative */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-purple">Behind the Drop</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
                Midnight Inspiration
              </h2>
            </div>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Blackout represents a complete reset. In a culture saturated with logo-mania and loud patterns, this collection strips away the noise to focus purely on the structural weight of the garments themselves.
            </p>

            {/* Structured Details */}
            <div className="space-y-6 pt-2">
              <div className="flex gap-4 items-start">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-zinc-950 border border-border text-brand-purple">
                  <Compass className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground">Urban Nomad Mood</h4>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    Designed for urban explorers who require adaptability, stealth cargo pockets, and modular elements that transition from hot afternoons to cold nights.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-zinc-950 border border-border text-brand-neon">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground">Anti-reflective Aesthetics</h4>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    Using custom matte finishes, high-tenacity matte polymers, and deep carbon fibers to absorb light and create deep shadows.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Visual Mood Collage */}
          <div className="lg:col-span-6 grid grid-cols-12 gap-4">
            <div className="col-span-7 relative aspect-[4/5] rounded-2xl overflow-hidden bg-zinc-900 border border-border">
              <img
                src="https://images.unsplash.com/photo-1509281373149-e957c6296406?q=80&w=600&auto=format&fit=crop"
                alt="Minimal street style black"
                className="object-cover w-full h-full grayscale"
              />
            </div>
            <div className="col-span-5 flex flex-col gap-4 justify-between">
              <div className="relative flex-1 aspect-[1/1] rounded-2xl overflow-hidden bg-zinc-900 border border-border">
                <img
                  src="https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=400&auto=format&fit=crop"
                  alt="Fabric details"
                  className="object-cover w-full h-full grayscale"
                />
              </div>
              <div className="bg-zinc-950 border border-border rounded-2xl p-6 space-y-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-brand-purple font-mono">
                  THE VIBE
                </span>
                <p className="text-xs font-bold text-foreground uppercase tracking-wider leading-snug">
                  Stealth. Shadows. Form. Function.
                </p>
                <p className="text-[10px] text-muted-foreground leading-relaxed">
                  Capsule 04 highlights structural silhouettes and high-integrity hardware.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
