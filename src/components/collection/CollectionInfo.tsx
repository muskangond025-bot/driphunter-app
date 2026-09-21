"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, Calendar, Tag, Layers, Flame } from "lucide-react";

export default function CollectionInfo() {
  return (
    <section className="w-full py-16 bg-zinc-950 border-b border-zinc-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-6" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3 text-zinc-700" />
          <span className="text-zinc-600">Collections</span>
          <ChevronRight className="h-3 w-3 text-zinc-700" />
          <span className="text-white font-bold">Blackout Collection</span>
        </nav>

        {/* Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Heading & Description */}
          <div className="lg:col-span-8 space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest bg-brand-orange/10 text-brand-orange border border-brand-orange/20 px-2.5 py-0.5 rounded">
                <Flame className="h-3 w-3 fill-brand-orange" /> Limited Drop
              </span>
              <span className="text-xs font-bold text-zinc-500 font-mono">Capsule #04</span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              The Blackout Showcase
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-3xl">
              Constructed from 400GSM ultra-heavyweight cotton, raw metals, and high-tenacity polymers. This capsule explores the boundaries of structural streetwear with a singular focus on monochromatic utility, tactical storage, and oversized silhouettes.
            </p>
          </div>

          {/* Right: Quick Stats Cards */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-4 w-full">
            {/* Stat 1 */}
            <div className="bg-zinc-900/30 border border-zinc-900 rounded-xl p-4 flex items-center gap-3.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-900 text-zinc-400">
                <Layers className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Volume</p>
                <p className="text-base font-extrabold text-white">24 Products</p>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="bg-zinc-900/30 border border-zinc-900 rounded-xl p-4 flex items-center gap-3.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-900 text-zinc-400">
                <Calendar className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Drop Date</p>
                <p className="text-base font-extrabold text-white">June 2026</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
