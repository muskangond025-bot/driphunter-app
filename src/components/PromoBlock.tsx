"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Megaphone } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function PromoBlock() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="bg-white dark:bg-zinc-950 py-16 border-t border-zinc-100 dark:border-zinc-900">
      <div ref={ref} className="w-full max-w-[1600px] mx-auto px-6 sm:px-12 md:px-16 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT: Promotion Banner (Mockup Ad) */}
          <div 
            className={`lg:col-span-6 relative rounded-[32px] overflow-hidden bg-zinc-950 text-white p-8 sm:p-12 flex flex-col justify-between min-h-[380px] sm:min-h-[480px] border border-zinc-900 shadow-2xl transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {/* Background Image & Overlay */}
            <Image
              alt="Social background"
              src="https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=750&q=80"
              fill
              className="object-cover opacity-25 z-0 transition-transform duration-1000 hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
            
            <div className="relative z-20 flex flex-col justify-between h-full w-full">
              <div className="space-y-4 text-left">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#6F4E37]/15 border border-[#6F4E37]/30 text-[#6F4E37] font-mono text-[9px] uppercase tracking-widest rounded-full">
                  <Megaphone className="w-3.5 h-3.5" />
                  Featured Promotion
                </span>
                <h3 className="text-3xl sm:text-5xl font-chaney-title uppercase leading-tight tracking-tight">
                  Connect on <br />
                  <span className="text-[#6F4E37]">Social Channels</span>
                </h3>
                <p className="text-xs text-zinc-400 font-mono leading-relaxed max-w-sm">
                  Get notified of flash discounts, custom passwords for archive vaults, and lookbook updates on our social feed.
                </p>
              </div>
              
              <div className="pt-6 text-left">
                <a
                  href="https://web.telegram.org/k/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#6F4E37] hover:bg-[#5C3D2E] text-white font-bold uppercase tracking-widest text-[10px] py-4 px-8 rounded-xl transition-all shadow-lg cursor-pointer active:scale-95"
                >
                  Join Telegram
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT: Promo Products */}
          <div 
            className={`lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6 transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {/* Promo Product 1 */}
            <div className="h-full">
              <ProductCard
                id="promo-1"
                name="Urban Cotton Parka"
                brand="REPRESENT"
                price="₹4,299"
                image="https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=400&q=80"
                badge="NEW ARRIVAL"
              />
            </div>

            {/* Promo Product 2 */}
            <div className="h-full">
              <ProductCard
                id="promo-2"
                name="Classic Cargo Pullover"
                brand="ESSENTIALS"
                price="₹3,199"
                image="https://images.unsplash.com/photo-1620799139507-2a76f79a2f4d?auto=format&fit=crop&w=400&q=80"
                badge="MUST HAVE"
              />
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
