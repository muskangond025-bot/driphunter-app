"use client";

import React from "react";
import Image from "next/image";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const categories = [
  {
    title: "Top Wear",
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=600&q=80",
    bg: "bg-black",
  },
  {
    title: "Bottom Wear",
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=80",
    bg: "bg-zinc-300",
  },
  {
    title: "Accessories",
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=600&q=80",
    bg: "bg-[#6F4E37]",
  },
];

export default function FeaturedCategories() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="w-full max-w-[1600px] mx-auto px-6 sm:px-12 md:px-16 lg:px-20py-16">
      <div
        ref={ref}
        className={`flex flex-col lg:flex-row gap-4 w-full stagger-children ${
          isVisible ? "visible" : ""
        }`}
      >
        {categories.map((cat) => (
          <button
            key={cat.title}
            className={`relative rounded-3xl overflow-hidden shadow-md group cursor-pointer text-left min-h-[140px] md:min-h-[220px] transition-all duration-500 flex-grow lg:flex-[1] ${cat.bg}`}
          >
            <div className="absolute inset-0 z-10 p-6 flex items-center justify-center">
              <h3 className="font-chaney-title text-xl sm:text-2xl text-white text-center uppercase tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] group-hover:scale-110 transition-transform duration-500">
                {cat.title}
              </h3>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
