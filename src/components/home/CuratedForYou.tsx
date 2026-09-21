"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import CuratedLookCard, { CuratedLook } from "@/components/product/CuratedLookCard";

const curatedLooks: CuratedLook[] = [
  {
    id: "look1",
    title: "Sand Linen Curation",
    description: "Relaxed draping paired with structured monochrome tailoring for timeless, effortless elegance.",
    modelImage: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80", 
    items: [
      {
        id: "li1",
        name: "Linen Trench Coat",
        price: 7999,
        image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=300&q=80",
      },
      {
        id: "li2",
        name: "Classic Cotton Tee",
        price: 1499,
        image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=300&q=80",
      },
      {
        id: "li3",
        name: "Tailored Trousers",
        price: 3499,
        image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=300&q=80",
      },
      {
        id: "li4",
        name: "Trapeze Bag",
        price: 9299,
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=300&q=80",
      },
      {
        id: "li5",
        name: "Acetate Sunglasses",
        price: 2199,
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=300&q=80",
      }
    ]
  }
];

export default function CuratedForYou({ basePath = "" }: { basePath?: string }) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="bg-[#faf8f5] dark:bg-[#0a0a0c] text-zinc-900 dark:text-zinc-100 py-10 relative overflow-hidden transition-colors duration-300">
      
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
        
        {/* Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 border border-stone-200 dark:border-zinc-800 rounded-full flex items-center justify-center text-zinc-400 bg-white dark:bg-zinc-900 shadow-sm">
              <Heart className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={1.5} />
            </div>
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-zinc-950 dark:text-white font-playfair tracking-tight leading-none">
                Curated <span className="font-serif italic text-[#6F4E37] dark:text-[#E6C280]">For You</span>
              </h2>
            </div>
          </div>

          <Link
            href={`${basePath}/explore`}
            className="group flex items-center gap-3 text-xs font-bold uppercase tracking-widest hover:text-[#6F4E37] dark:hover:text-[#E6C280] transition-colors"
          >
            Explore Archive 
            <div className="w-10 h-10 rounded-full border border-stone-200 dark:border-zinc-800 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-2 bg-white dark:bg-zinc-900">
               <ArrowRight className="w-4 h-4" />
            </div>
          </Link>
        </div>

        {/* Compact Premium Catalogue Container */}
        <div ref={ref} className="grid grid-cols-1 gap-12 lg:gap-16">
          {curatedLooks.map((look) => (
            <CuratedLookCard key={look.id} look={look} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}

