"use client";

import React, { useState } from "react";
import { ShieldCheck, Flame, ShoppingBag, Check } from "lucide-react";

export default function FeaturedProduct() {
  const [selectedSize, setSelectedSize] = useState("L");
  const [isBuying, setIsBuying] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const sizes = ["S", "M", "L", "XL"];
  const stockLeft = 4;
  const totalStock = 20;
  const stockPercentage = (stockLeft / totalStock) * 100;

  const handleQuickBuy = () => {
    setIsBuying(true);
    setTimeout(() => {
      setIsBuying(false);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
    }, 1500);
  };

  return (
    <section className="w-full py-16 bg-zinc-950 border-b border-zinc-900 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-orange">Highlight Piece</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mt-1">Featured Drop</h2>
        </div>

        {/* Feature Panel Grid */}
        <div className="relative overflow-hidden rounded-3xl border border-zinc-900 bg-zinc-900/20 p-8 sm:p-12 lg:p-16 hover:border-zinc-800/60 transition-all duration-500 max-w-5xl mx-auto">
          {/* Subtle background glow */}
          <div className="absolute -top-12 -right-12 h-64 w-64 rounded-full bg-brand-orange/5 blur-[100px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: Highlight Image */}
            <div className="lg:col-span-6 relative aspect-[4/5] rounded-2xl overflow-hidden bg-zinc-900 group border border-zinc-900">
              <img
                src="https://images.unsplash.com/photo-1548883354-7622d03aca27?q=80&w=600&auto=format&fit=crop"
                alt="Stealth Tactical Parka"
                className="object-cover w-full h-full grayscale group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              
              {/* Floating Tag */}
              <div className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-black/60 backdrop-blur-md border border-white/10 px-3.5 py-1.5 rounded-lg text-white font-mono text-[10px] font-bold">
                <Flame className="h-3.5 w-3.5 text-brand-orange fill-brand-orange" />
                Flagship Edition
              </div>
            </div>

            {/* Right: Product Customization & Buy Details */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600 font-mono">
                  TOKYO TECHWEAR
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
                  M-65 Tactical Blackout Parka
                </h3>
                <div className="flex items-center gap-3 pt-1">
                  <span className="text-xl font-extrabold text-white">₹7,499</span>
                  <span className="text-sm text-zinc-600 line-through font-semibold">₹9,999</span>
                  <span className="text-[9px] bg-brand-orange/15 text-brand-orange font-black uppercase tracking-wider px-2 py-0.5 rounded border border-brand-orange/25">
                    25% Off
                  </span>
                </div>
              </div>

              <p className="text-sm text-zinc-400 leading-relaxed">
                Featuring waterproof seam-sealed zippers, expandable tactical pockets, and a modular hood variant. Built using raw carbon textiles that adapt dynamically to shape and motion.
              </p>

              {/* Stock Warning Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                  <span className="text-brand-orange flex items-center gap-1">
                    <Flame className="h-3.5 w-3.5 fill-brand-orange text-brand-orange" />
                    Selling Out Fast
                  </span>
                  <span className="text-zinc-500">{stockLeft} items left in stock</span>
                </div>
                <div className="h-2 w-full bg-zinc-900 rounded-full overflow-hidden border border-zinc-900">
                  <div
                    className="h-full bg-gradient-to-r from-[#6F4E37] to-[#8B6914] rounded-full transition-all duration-1000"
                    style={{ width: `${stockPercentage}%` }}
                  />
                </div>
              </div>

              {/* Sizing Panel */}
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">Select Size</span>
                <div className="flex gap-3">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`h-11 w-11 rounded-xl text-xs font-bold uppercase tracking-wider border flex items-center justify-center transition-all ${
                        selectedSize === size
                          ? "bg-white text-black border-white"
                          : "bg-zinc-950 text-zinc-500 border-zinc-900 hover:text-white hover:border-zinc-800"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Trigger */}
              <div className="pt-2">
                <button
                  onClick={handleQuickBuy}
                  disabled={isBuying || isSuccess}
                  className={`w-full group inline-flex items-center justify-center gap-2.5 rounded-xl font-extrabold px-8 py-4.5 text-sm transition-all duration-300 ${
                    isSuccess
                      ? "bg-[#6F4E37] text-white shadow-[0_0_30px_rgba(111,78,55,0.2)]"
                      : "bg-white text-black hover:bg-zinc-200 shadow-[0_4px_30px_rgba(255,255,255,0.05)] hover:scale-[1.01]"
                  }`}
                >
                  {isSuccess ? (
                    <>
                      <Check className="h-4.5 w-4.5 stroke-[3]" />
                      Added to Bag (Size {selectedSize})
                    </>
                  ) : isBuying ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 rounded-full border-2 border-zinc-600 border-t-black animate-spin" />
                      Securing Drop...
                    </span>
                  ) : (
                    <>
                      <ShoppingBag className="h-4.5 w-4.5" />
                      Quick Buy (Size {selectedSize})
                    </>
                  )}
                </button>
                
                <p className="flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-wider text-zinc-600 mt-3 text-center">
                  <ShieldCheck className="h-3.5 w-3.5 text-brand-purple" />
                  Authenticity 100% Verified before dispatch
                </p>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
