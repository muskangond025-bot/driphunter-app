"use client";

import React from "react";
import ProductCard from "@/components/product/ProductCard";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { SectionHeading } from "@/components/ui/SectionHeading";

const products = [
  { name: "Urban Tech Pants", brand: "ACRONYM", price: "₹95.00", image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=400&q=80", hoverImage: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=400&q=80" },
  { name: "Mesh Runner Sneakers", brand: "BALENCIAGA", price: "₹180.00", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80", hoverImage: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=400&q=80" },
  { name: "Vintage Washed Denim", brand: "BLUE BREW", price: "₹65.00", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=400&q=80", hoverImage: "https://images.unsplash.com/photo-1517423568366-8b83523034fd?auto=format&fit=crop&w=400&q=80" },
  { name: "Graphic Logo Crewneck", brand: "A BATHING APE", price: "₹78.00", image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=400&q=80", hoverImage: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=400&q=80" },
];

export default function TrendingProducts() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="bg-zinc-50 dark:bg-zinc-950 py-16 border-t border-zinc-100 dark:border-zinc-900">
      <div ref={ref} className="w-full max-w-[1600px] mx-auto px-6 sm:px-12 md:px-16 lg:px-20">
        <div className={`mb-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <SectionHeading
            variant="chaney"
            align="center"
            title="Trending Now"
            subtitle={<p className="text-xs sm:text-sm text-zinc-500 mt-3 max-w-lg mx-auto">The hottest items our community is wearing right now</p>}
            className="text-black dark:text-white"
          />
        </div>
        <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 stagger-children ${isVisible ? "visible" : ""}`}>
          {products.map((p) => <ProductCard key={p.name} {...p} />)}
        </div>
      </div>
    </section>
  );
}
