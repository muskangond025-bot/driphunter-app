"use client";

import React from "react";
import { MessageCircle, ArrowUpRight, PlayCircle, Eye, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

export default function CreatorPicks() {
  const selectedProducts = [
    {
      id: "bo-1",
      title: "400GSM Stealth Heavy Hoodie",
      price: 3999,
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=300&auto=format&fit=crop",
      brand: "Guerilla Culture"
    },
    {
      id: "bo-3",
      title: "Multi-Pocket Tactical Cargos",
      price: 3299,
      image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=300&auto=format&fit=crop",
      brand: "Urban Combat"
    }
  ];

  return (
    <section className="w-full py-16 bg-background border-b border-border/40 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-14 text-center">
          <SectionHeading
            variant="sans"
            align="center"
            className="text-foreground"
            title="Creator Styled"
            eyebrow={
              <span className="text-xs font-bold uppercase tracking-widest text-brand-purple">Editorial Picks</span>
            }
            subtitle={
              <p className="text-sm text-muted-foreground mt-3">
                See how top curators style the Blackout capsule to build their daily fits.
              </p>
            }
          />
        </div>

        {/* Creator Pick Profile Card */}
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 sm:p-12 hover:border-brand-purple/20 transition-all duration-500 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Left: Creator Profile */}
            <div className="md:col-span-5 flex flex-col items-center md:items-start text-center md:text-left space-y-5">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 overflow-hidden rounded-full border border-border">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop"
                    alt="Kabir Mehta"
                    className="object-cover w-full h-full grayscale"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-black text-foreground leading-none">Kabir Mehta</h3>
                  <span className="text-xs font-semibold text-brand-purple tracking-wide block mt-1">
                    @kabir_drips &middot; 125K followers
                  </span>
                </div>
              </div>

              <div className="flex gap-2 text-xs font-semibold text-muted-foreground items-center bg-zinc-950 px-3 py-1 rounded-md border border-border">
                <MessageCircle className="h-4 w-4 text-brand-purple" />
                <span>Delhi Techwear Pioneer</span>
              </div>

              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed italic">
                &ldquo;For this capsule, I wanted to build an silhouette that plays with proportions. The oversized heavy hoodie paired with multi-pocket tactical cargos creates the perfect urban explorer silhouette.&rdquo;
              </p>
            </div>

            {/* Right: Selected Products Showcase */}
            <div className="md:col-span-7 space-y-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground font-mono block">
                KABIR&apos;S CURATED FIT
              </span>
              
              <div className="grid grid-cols-2 gap-4">
                {selectedProducts.map((prod) => (
                  <div
                    key={prod.id}
                    className="group relative bg-zinc-950 border border-border rounded-2xl p-3.5 hover:border-brand-purple/20 transition-all duration-300"
                  >
                    <div className="relative aspect-[1/1] w-full rounded-xl overflow-hidden bg-zinc-900 mb-3 border border-border">
                      <img
                        src={prod.image}
                        alt={prod.title}
                        className="object-cover w-full h-full grayscale group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest font-mono">
                        {prod.brand}
                      </p>
                      <h4 className="text-xs font-extrabold text-foreground leading-snug line-clamp-1">
                        {prod.title}
                      </h4>
                      <p className="text-xs font-black text-foreground">₹{prod.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
