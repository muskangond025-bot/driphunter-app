"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, ArrowRight, Sparkles } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useCart } from "@/context/CartContext";

interface RecommendedProduct {
  id: string;
  name: string;
  brand: string;
  price: string;
  image: string;
  rating: number;
}

const products: RecommendedProduct[] = [
  { id: "rec-1", name: "Premium Utility Bomber", brand: "ACRONYM", price: "₹120.00", image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=400&q=80", rating: 5 },
  { id: "rec-2", name: "Ribbed Knit Crewneck", brand: "ESSENTIALS", price: "₹75.00", image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=400&q=80", rating: 4 },
  { id: "rec-3", name: "Cyber Tech Cargo Pants", brand: "REPRESENT", price: "₹95.00", image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=400&q=80", rating: 5 },
  { id: "rec-4", name: "Oversized Vintage Hoodie", brand: "STÜSSY", price: "₹89.00", image: "https://images.unsplash.com/photo-1620799139507-2a76f79a2f4d?auto=format&fit=crop&w=400&q=80", rating: 5 },
];

export default function RecommendedForYou() {
  const { ref, isVisible } = useScrollAnimation();
  const { addToCart } = useCart();

  return (
    <section className="bg-white dark:bg-zinc-950 py-16 border-t border-zinc-100 dark:border-zinc-900">
      <div ref={ref} className="w-full max-w-[1600px] mx-auto px-6 sm:px-12 md:px-16 lg:px-20">
        
        {/* Section Header */}
        <div
          className={`mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <SectionHeading
            title="Recommended For You"
            className="text-black"
            eyebrow={
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#6F4E37]" />
                <span className="text-[10px] font-mono text-[#6F4E37] font-extrabold uppercase tracking-widest">
                  CURATED FOR YOU
                </span>
              </div>
            }
            action={
              <Link
                href="/shop"
                className="inline-flex items-center gap-1 text-xs font-mono font-bold uppercase tracking-widest text-[#6F4E37] hover:opacity-80 transition-opacity cursor-pointer"
              >
                Explore All Recommendation
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            }
          />
        </div>

        {/* Product Grid */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children ${
            isVisible ? "visible" : ""
          }`}
        >
          {products.map((prod) => (
            <div
              key={prod.id}
              className="bg-[#f5f0eb] border border-zinc-200 rounded-[28px] overflow-hidden p-5 flex flex-col justify-between group cursor-pointer transition-all duration-300 hover:shadow-xl hover:border-[#6F4E37]/30"
            >
              <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden mb-5">
                <Image
                  alt={prod.name}
                  src={prod.image}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 20vw"
                />
              </div>

              <div className="text-left space-y-1">
                <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">{prod.brand}</span>
                <h3 className="text-sm font-bold text-zinc-950 uppercase tracking-tight line-clamp-1 group-hover:text-[#6F4E37] transition-colors">
                  {prod.name}
                </h3>
                
                {/* Rating (Coffee brown stars) */}
                <div className="flex items-center gap-0.5 pt-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${
                        i < prod.rating 
                          ? "text-[#6F4E37] fill-[#6F4E37]" 
                          : "text-zinc-300"
                      }`}
                    />
                  ))}
                </div>

                <div className="flex items-center justify-between pt-3">
                  <span className="text-base font-chaney-title text-[#6F4E37]">{prod.price}</span>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      const parsedPrice = parseInt(prod.price.replace(/[^\d]/g, "")) || 4999;
                      addToCart({
                        id: prod.id,
                        name: prod.name,
                        price: parsedPrice,
                        image: prod.image,
                        brand: prod.brand,
                        size: "L",
                        color: "Default"
                      });
                    }}
                    className="bg-black hover:bg-zinc-800 text-white font-mono text-[9px] uppercase font-bold tracking-wider py-2 px-4 rounded-xl transition-colors cursor-pointer border-none"
                  >
                    Add to Cart
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
