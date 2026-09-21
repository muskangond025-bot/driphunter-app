"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, ArrowRight, ShieldCheck, RefreshCw, Droplets, Zap, ChevronLeft, ChevronRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const showcaseProducts = [
  {
    id: "prod-1",
    tagline: "ARCHIVE EDIT // 001",
    title: "VINTAGE FLAME HEAVYWEIGHT TEE",
    subtitle: "280 GSM Organic Washed Cotton • Vintage Screenprint",
    description:
      "Crafted with double-stitched reinforced collar seams and hand-distressed edge weathering. Designed to hold shape while offering an effortless relaxed drape.",
    price: "₹999",
    mrp: "₹1,499",
    discount: "20% OFF",
    rating: 4.9,
    reviews: 42,
    features: [
      { icon: Droplets, title: "Acid Washed", desc: "Pre-shrunk custom fabric finish" },
      { icon: ShieldCheck, title: "Reinforced Seams", desc: "Built for long-lasting durability" },
      { icon: RefreshCw, title: "Breathable Knit", desc: "All-day temperature regulation" },
    ],
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80",
    thumbnails: [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=300&q=80",
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=300&q=80",
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=300&q=80",
    ],
    colors: ["#000000", "#18181b", "#71717a"],
    sizes: ["S", "M", "L", "XL", "2XL"],
  },
  {
    id: "prod-2",
    tagline: "TECH UTILITY // 002",
    title: "CYBER MODULAR TACTICAL VEST",
    subtitle: "Waterproof Cordura® • Quick-Release Buckles",
    description:
      "Engineered with 6 modular utility pockets, waterproof sealed zips, and ergonomic shoulder padding for active city movement.",
    price: "₹4,299",
    mrp: "₹5,999",
    discount: "28% OFF",
    rating: 4.8,
    reviews: 29,
    features: [
      { icon: Zap, title: "Quick Lock", desc: "Tactical magnetic chest latches" },
      { icon: ShieldCheck, title: "Cordura® Shell", desc: "Abrasion & weather resistant" },
      { icon: Droplets, title: "Waterproof Zips", desc: "Sealed storage protection" },
    ],
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80",
    thumbnails: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=300&q=80",
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=300&q=80",
    ],
    colors: ["#09090b", "#27272a"],
    sizes: ["M", "L", "XL"],
  },
];

export default function InteractiveProductShowcase() {
  const { ref, isVisible } = useScrollAnimation();
  const [activeIdx, setActiveIdx] = useState(0);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState("L");

  const currentProduct = showcaseProducts[activeIdx];
  const activeImage = selectedImg || currentProduct.image;

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % showcaseProducts.length);
    setSelectedImg(null);
  };

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + showcaseProducts.length) % showcaseProducts.length);
    setSelectedImg(null);
  };

  return (
    <section className="py-16 bg-zinc-950 text-white relative overflow-hidden border-y border-zinc-900 selection:bg-yellow-400 selection:text-black">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] max-w-full h-[600px] bg-yellow-400/5 rounded-full blur-[140px] pointer-events-none" />

      <div
        ref={ref}
        className={`w-full max-w-[1600px] mx-auto px-6 sm:px-12 md:px-16 lg:px-20relative z-10 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 border-b border-zinc-900 pb-6">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 font-mono text-[10px] font-black uppercase tracking-widest rounded-full">
              <Sparkles className="w-3.5 h-3.5" />
              SPOTLIGHT INTERACTION
            </span>
            <h2 className="text-3xl sm:text-5xl font-chaney-title uppercase tracking-tight">
              INTERACTIVE <span className="text-yellow-400">PRODUCT MATRIX</span>
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              className="p-3 rounded-full bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800 transition-all cursor-pointer active:scale-95"
              aria-label="Previous Product"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="p-3 rounded-full bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800 transition-all cursor-pointer active:scale-95"
              aria-label="Next Product"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Product Showcase Card Container */}
        <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-3xl p-6 sm:p-10 backdrop-blur-md grid grid-cols-1 lg:grid-cols-12 gap-10 items-center shadow-2xl relative">
          
          {/* Left Column: Interactive Image Gallery */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950 group">
              <Image
                alt={currentProduct.title}
                src={activeImage}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <div className="absolute top-4 left-4 bg-yellow-400 text-black font-mono text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-md shadow-md">
                {currentProduct.discount}
              </div>
            </div>

            {/* Thumbnail Selection */}
            <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-none snap-x snap-mandatory scroll-smooth scroll-p-2">
              {currentProduct.thumbnails.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImg(img)}
                  className={`relative w-20 h-24 rounded-xl overflow-hidden border-2 transition-all cursor-pointer shrink-0 snap-center ${
                    activeImage === img ? "border-yellow-400 scale-105 shadow-lg" : "border-zinc-800 opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image alt="Thumbnail" src={img} fill className="object-cover" sizes="80px" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Detailed Product Info & Controls */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="font-mono text-xs font-black text-yellow-400 tracking-widest uppercase">
                {currentProduct.tagline}
              </span>
              <h3 className="text-2xl sm:text-4xl font-chaney-title uppercase leading-tight text-white mt-1">
                {currentProduct.title}
              </h3>
              <p className="text-xs font-mono text-zinc-400 mt-2">
                {currentProduct.subtitle}
              </p>
            </div>

            {/* Price & Rating */}
            <div className="flex items-center gap-4 border-y border-zinc-800/80 py-4 font-mono">
              <div>
                <span className="text-3xl font-extrabold text-yellow-400">{currentProduct.price}</span>
                <span className="text-zinc-500 line-through text-xs ml-2">{currentProduct.mrp}</span>
              </div>
              <div className="h-8 w-px bg-zinc-800" />
              <div className="text-xs">
                <span className="text-amber-400 font-bold">★ {currentProduct.rating}</span>
                <span className="text-zinc-500 ml-1">({currentProduct.reviews} reviews)</span>
              </div>
            </div>

            <p className="text-xs text-zinc-300 font-mono leading-relaxed">
              {currentProduct.description}
            </p>

            {/* Interactive Feature Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {currentProduct.features.map((feat, i) => (
                <div key={i} className="bg-zinc-950/80 border border-zinc-800/80 rounded-xl p-3 space-y-1 hover:border-zinc-700 transition-colors">
                  <feat.icon className="w-4 h-4 text-yellow-400" />
                  <h4 className="text-[11px] font-bold text-white uppercase font-mono">{feat.title}</h4>
                  <p className="text-[9px] text-zinc-400 font-mono leading-tight">{feat.desc}</p>
                </div>
              ))}
            </div>

            {/* Size Selector */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-zinc-400 uppercase font-bold">SELECT SIZE:</span>
              <div className="flex flex-wrap gap-2 font-mono text-xs">
                {currentProduct.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`px-4 py-2 rounded-xl font-bold uppercase transition-all cursor-pointer border ${
                      selectedSize === sz
                        ? "bg-yellow-400 text-black border-yellow-400 shadow-md shadow-yellow-400/10"
                        : "bg-zinc-950 text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:text-white"
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-4">
              <Link
                href="/shop"
                className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black font-extrabold text-xs uppercase tracking-widest py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-yellow-400/10 hover:scale-[1.01] active:scale-95"
              >
                ADD TO CART • {currentProduct.price}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/shop"
                className="bg-zinc-950 hover:bg-zinc-900 border border-zinc-800 text-white font-bold text-xs uppercase tracking-widest py-4 px-6 rounded-xl flex items-center justify-center transition-all cursor-pointer"
              >
                VIEW FULL SPEC
              </Link>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
