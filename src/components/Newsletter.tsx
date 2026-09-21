"use client";

import React from "react";
import { ArrowRight, Mail, Send } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { SectionHeading } from "@/components/ui/SectionHeading";

export default function Newsletter() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="bg-white dark:bg-zinc-950 py-16 border-t border-zinc-100 dark:border-zinc-900">
      <div
        ref={ref}
        className={`w-full max-w-4xl mx-auto px-6 sm:px-12 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        <div className="w-full relative rounded-[36px] overflow-hidden border border-stone-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 sm:p-14 text-center text-zinc-900 dark:text-white flex flex-col items-center justify-center min-h-[280px] shadow-sm select-none">
          {/* Background glow (Adapted to bright theme) */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(111,78,55,0.03),transparent_55%)] dark:bg-[radial-gradient(circle_at_top_right,rgba(111,78,55,0.12),transparent_55%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(111,78,55,0.02),transparent_55%)] dark:bg-[radial-gradient(circle_at_bottom_left,rgba(111,78,55,0.08),transparent_55%)] pointer-events-none" />

          <div className="relative z-10 max-w-md space-y-4">
            <SectionHeading
              variant="playfair"
              align="center"
              className="text-zinc-950 dark:text-zinc-50 uppercase"
              title={<>Join the <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280]">Drip Nation</span></>}
              eyebrow={
                <span className="text-[9px] sm:text-[10px] font-mono tracking-widest text-[#6F4E37] dark:text-[#E6C280] font-bold uppercase block">
                  STAY UPDATED
                </span>
              }
              subtitle={
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans font-normal">
                  Be the first to know about exclusive drops, flash sales, and limited edition launches. No spam, just pure drip.
                </p>
              }
            />

            <form
              className="pt-2 flex flex-col sm:flex-row gap-2 max-w-sm mx-auto"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                required
                placeholder="Enter your email"
                className="bg-stone-50 dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 focus:border-[#6F4E37] dark:focus:border-[#E6C280] focus:outline-none rounded-xl px-4 py-3 text-xs text-zinc-900 dark:text-white placeholder-zinc-400 font-mono flex-grow w-full transition-all"
              />
              <button
                type="submit"
                className="bg-zinc-950 hover:bg-[#6F4E37] dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-[#E6C280] text-white text-xs font-mono font-bold uppercase tracking-widest px-7 py-3 rounded-xl transition-all duration-300 cursor-pointer shrink-0 border-none shadow-sm active:scale-95 flex items-center justify-center gap-2"
              >
                Subscribe
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
