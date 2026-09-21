"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const recentlyViewedHistory = [
  { 
    id: "201", 
    name: "Puma Scuderia Ferrari Heritage Zip Sweatshirt", 
    brand: "Puma", 
    price: "₹7,999", 
    originalPrice: "₹10,999",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=600&q=85", 
    hoverImage: "https://images.unsplash.com/photo-1620799139507-2a76f79a2f4d?auto=format&fit=crop&w=600&q=85",
    badge: "Viewed 2h ago",
    rating: 4.9,
    buttonLabel: "Add to Bag",
    colors: [
      { name: "Black", hex: "#000000", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=600&q=85", hoverImage: "https://images.unsplash.com/photo-1620799139507-2a76f79a2f4d?auto=format&fit=crop&w=600&q=85" },
      { name: "Red", hex: "#EF4444", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=85", hoverImage: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=600&q=85" }
    ]
  },
  { 
    id: "202", 
    name: "Oversized Heavy Fleece Hoodie", 
    brand: "REPRESENT", 
    price: "₹7,499", 
    originalPrice: "₹9,500",
    image: "https://images.unsplash.com/photo-1620799139507-2a76f79a2f4d?auto=format&fit=crop&w=600&q=85", 
    hoverImage: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=600&q=85",
    badge: "In Rotation",
    rating: 5.0,
    buttonLabel: "Add to Bag",
    colors: [
      { name: "Charcoal", hex: "#27272A", image: "https://images.unsplash.com/photo-1620799139507-2a76f79a2f4d?auto=format&fit=crop&w=600&q=85", hoverImage: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=600&q=85" },
      { name: "Sand", hex: "#D4C5B9", image: "https://images.unsplash.com/photo-1574169208507-84376144848b?auto=format&fit=crop&w=600&q=85", hoverImage: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=85" }
    ]
  },
  { 
    id: "204", 
    name: "Retro Box Cut Heavy Graphic Tee", 
    brand: "STÜSSY", 
    price: "₹3,799", 
    originalPrice: "₹4,999",
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=85", 
    hoverImage: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=600&q=85",
    badge: "Viewed Today",
    rating: 4.8,
    buttonLabel: "Add to Bag",
    colors: [
      { name: "Charcoal", hex: "#27272A", image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=85", hoverImage: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=600&q=85" },
      { name: "Olive", hex: "#5C604D", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=85", hoverImage: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=85" }
    ]
  },
  { 
    id: "206", 
    name: "Reflective Technical Shell Jacket", 
    brand: "ALMOST GODS", 
    price: "₹10,499", 
    originalPrice: "₹13,999",
    image: "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=600&q=85", 
    hoverImage: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=85",
    badge: "Grail Archive",
    rating: 4.9,
    buttonLabel: "Add to Bag",
    colors: [
      { name: "Charcoal", hex: "#27272A", image: "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=600&q=85", hoverImage: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=85" }
    ]
  },
  { 
    id: "203", 
    name: "Classic Heavyweight Cotton Crewneck", 
    brand: "ESSENTIALS", 
    price: "₹6,299", 
    originalPrice: "₹8,000",
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=600&q=85", 
    hoverImage: "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=600&q=85",
    badge: "Viewed Yesterday",
    rating: 4.7,
    buttonLabel: "Add to Bag",
    colors: [
      { name: "Sand", hex: "#D4C5B9", image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=600&q=85", hoverImage: "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=600&q=85" }
    ]
  },
  { 
    id: "207", 
    name: "XT-6 Advanced Technical Sneakers", 
    brand: "SALOMON", 
    price: "₹14,999", 
    originalPrice: "₹17,500",
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=600&q=85", 
    hoverImage: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=85",
    badge: "Trending",
    rating: 5.0,
    buttonLabel: "Add to Bag",
    colors: [
      { name: "Silver Black", hex: "#18181B", image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=600&q=85", hoverImage: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=85" }
    ]
  }
];

export default function RecentlyViewedPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5] dark:bg-zinc-950 text-zinc-900 dark:text-white">
      <Navbar onSearchClick={() => {}} />
      <main className="flex-grow pt-24 pb-20">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-12 md:px-16 lg:px-20">
        
        <div className="mb-12">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-mono font-bold tracking-wider text-zinc-500 hover:text-[#6F4E37] dark:hover:text-[#E6C280] transition-colors mb-6 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> BACK TO HOME
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-4 h-4 text-[#6F4E37] dark:text-[#E6C280]" />
                <span className="text-[10px] md:text-xs font-semibold tracking-[0.25em] text-[#6F4E37] dark:text-[#E6C280] uppercase font-mono">
                  Your Archive
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-zinc-900 dark:text-white font-playfair leading-[1.05]">
                Recently <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280]">Viewed</span>
              </h1>
            </div>
            
            <p className="text-sm text-zinc-500 dark:text-zinc-400 font-sans font-light leading-relaxed md:max-w-md md:text-right">
              A complete history of the pieces you've interacted with. Revisit your favorite items and complete your collection.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 sm:gap-x-6 gap-y-10 sm:gap-y-12">
          {recentlyViewedHistory.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>

        {recentlyViewedHistory.length === 0 && (
          <div className="py-20 flex flex-col items-center justify-center text-center border-t border-zinc-200 dark:border-zinc-800">
            <Clock className="w-12 h-12 text-zinc-300 dark:text-zinc-700 mb-4" />
            <h3 className="text-xl font-playfair font-medium text-zinc-900 dark:text-white mb-2">Your history is empty</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-md">You haven't viewed any products recently. Start exploring our collections to see your history here.</p>
            <Link href="/shop" className="mt-6 inline-flex items-center justify-center px-6 py-3 bg-[#6F4E37] text-white text-xs font-mono font-bold tracking-wider uppercase hover:bg-[#5C3D2E] transition-colors rounded-full">
              Explore Shop
            </Link>
          </div>
        )}

        </div>
      </main>
      <Footer />
    </div>
  );
}
