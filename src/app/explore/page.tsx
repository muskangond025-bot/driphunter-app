"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SearchOverlay from "@/components/layout/SearchOverlay";
import { useCart } from "@/context/CartContext";
import {
  Sparkles,
  Layers,
  Filter
} from "lucide-react";
import CuratedLookCard, { CuratedLook } from "@/components/product/CuratedLookCard";



const ARCHIVE_LOOKS: CuratedLook[] = [
  {
    id: "look1",
    category: "Quiet Luxury",
    title: "Sand Linen Atelier",
    subtitle: "SS26 RUNWAY ARCHIVE",
    description: "Relaxed draping paired with structured monochrome tailoring for timeless, effortless elegance.",
    modelImage: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80",
    discountPct: 15,
    items: [
      {
        id: "li1",
        name: "Sand Linen Trench Coat",
        category: "Outerwear",
        price: 7999,
        originalPrice: 9499,
        image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=300&q=80",
        pin: { top: "32%", left: "48%", label: "Trench Coat" }
      },
      {
        id: "li2",
        name: "Classic Silk-Cotton Tee — Ivory",
        category: "Tops",
        price: 1499,
        originalPrice: 1999,
        image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=300&q=80",
        pin: { top: "45%", left: "54%", label: "Silk Tee" }
      },
      {
        id: "li3",
        name: "High-Waist Tailored Trousers",
        category: "Bottoms",
        price: 3499,
        originalPrice: 4299,
        image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=300&q=80",
        pin: { top: "68%", left: "46%", label: "Trousers" }
      },
      {
        id: "li4",
        name: "Trapeze Saddle Shoulder Bag",
        category: "Bags",
        price: 9299,
        originalPrice: 11499,
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=300&q=80",
        pin: { top: "52%", left: "28%", label: "Shoulder Bag" }
      },
      {
        id: "li5",
        name: "Handcrafted Acetate Sunglasses",
        category: "Accessories",
        price: 2199,
        originalPrice: 2899,
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=300&q=80",
        pin: { top: "18%", left: "52%", label: "Sunglasses" }
      }
    ]
  },
  {
    id: "look2",
    category: "Techwear",
    title: "Noir Technical Cyber",
    subtitle: "STREET WEAR UTILITY",
    description: "Multi-layered water-repellent shell outerwear combined with tactical modular utility accents.",
    modelImage: "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=800&q=80",
    discountPct: 20,
    items: [
      {
        id: "li6",
        name: "Technical Windbreaker — Stealth Black",
        category: "Outerwear",
        price: 9999,
        originalPrice: 12499,
        image: "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=300&q=80",
        pin: { top: "34%", left: "50%", label: "Windbreaker" }
      },
      {
        id: "li7",
        name: "Modular Cargo Utility Pants",
        category: "Bottoms",
        price: 4499,
        originalPrice: 5999,
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=300&q=80",
        pin: { top: "66%", left: "52%", label: "Cargo Pants" }
      },
      {
        id: "li8",
        name: "Air Max Stealth Monochrome",
        category: "Footwear",
        price: 12499,
        originalPrice: 14999,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=300&q=80",
        pin: { top: "88%", left: "48%", label: "Sneakers" }
      },
      {
        id: "li9",
        name: "Minimalist Chrono Sport Watch",
        category: "Accessories",
        price: 8999,
        originalPrice: 10999,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=300&q=80",
        pin: { top: "54%", left: "70%", label: "Chrono Watch" }
      },
      {
        id: "li10",
        name: "Weatherproof Technical Nylon Cap",
        category: "Headwear",
        price: 1799,
        originalPrice: 2299,
        image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=300&q=80",
        pin: { top: "14%", left: "50%", label: "Nylon Cap" }
      }
    ]
  },
  {
    id: "look3",
    category: "Tokyo Minimalist",
    title: "Neo Tokyo Minimalist",
    subtitle: "CONTEMPORARY ATELIER",
    description: "Architectural proportions, cropped silhouettes, and clean Japanese tailoring.",
    modelImage: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80",
    discountPct: 18,
    items: [
      {
        id: "li11",
        name: "Boxy Cropped Double-Breasted Blazer",
        category: "Outerwear",
        price: 8499,
        originalPrice: 10999,
        image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=300&q=80",
        pin: { top: "35%", left: "50%", label: "Cropped Blazer" }
      },
      {
        id: "li12",
        name: "Wide-Leg Pleated Trousers — Charcoal",
        category: "Bottoms",
        price: 4199,
        originalPrice: 5299,
        image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=300&q=80",
        pin: { top: "70%", left: "50%", label: "Pleated Trousers" }
      },
      {
        id: "li13",
        name: "Leather Chunky Derby Shoes",
        category: "Footwear",
        price: 7999,
        originalPrice: 9999,
        image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=300&q=80",
        pin: { top: "90%", left: "50%", label: "Derby Shoes" }
      }
    ]
  },
  {
    id: "look4",
    category: "Resort & Drapes",
    title: "Silk Riviera Ensemble",
    subtitle: "MEDITERRANEAN SUMMER",
    description: "Flowing satin slip silhouettes and premium knitwear for evening soirees.",
    modelImage: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=800&q=80",
    discountPct: 15,
    items: [
      {
        id: "li14",
        name: "Satin Slip Open-Back Gown",
        category: "Dresses",
        price: 6999,
        originalPrice: 8999,
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=300&q=80",
        pin: { top: "45%", left: "50%", label: "Slip Gown" }
      },
      {
        id: "li15",
        name: "Cropped Cable Knit Cardigan — Cream",
        category: "Knitwear",
        price: 3899,
        originalPrice: 4899,
        image: "https://images.unsplash.com/photo-1574169208507-84376144848b?auto=format&fit=crop&w=300&q=80",
        pin: { top: "30%", left: "50%", label: "Knit Cardigan" }
      }
    ]
  }
];

export default function ExplorePage() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all-ensembles"); // "all-ensembles" | "community" | "creators"
  const [activeAesthetic, setActiveAesthetic] = useState("All");

  const filteredLooks =
    activeAesthetic === "All"
      ? ARCHIVE_LOOKS
      : ARCHIVE_LOOKS.filter((l) => l.category?.toLowerCase().includes(activeAesthetic.toLowerCase()));

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5] dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 selection:bg-[#6F4E37] selection:text-white">
      <Navbar onSearchClick={() => setIsSearchOpen(true)} />
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      <main className="flex-grow w-full relative">
        {/* Background removed as requested */}

        {/* Ambient Top Flares */}
        <div className="absolute top-10 left-1/3 w-[600px] h-[300px] bg-[#6F4E37]/10 dark:bg-[#E6C280]/10 blur-[150px] rounded-full pointer-events-none" />

        {/* 1. Hero Editorial Banner */}
        <section className="relative w-full min-h-[70vh] flex flex-col justify-center px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 py-12 border-b border-zinc-200/80 dark:border-zinc-800/80 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=3840&q=100" 
              alt="Explore Fashion Styles"
              className="w-full h-full object-cover filter brightness-[0.95] dark:brightness-[0.4]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/40 to-transparent dark:from-black/90 dark:via-black/50 dark:to-transparent" />
          </div>
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-mono tracking-widest uppercase font-bold bg-[#6F4E37]/10 text-[#6F4E37] dark:bg-[#E6C280]/15 dark:text-[#E6C280] border border-[#6F4E37]/20">
                  <Sparkles className="w-3 h-3" />
                  Culture Circle Vault
                </span>
                <span className="text-zinc-400 font-mono text-[10px]">• SS26 CURATED ARCHIVE</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-zinc-950 dark:text-zinc-50 font-playfair leading-[1.05]">
                The Style <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280]">Archive</span>
              </h1>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-sans font-light mt-3 max-w-xl leading-relaxed">
                Explore curated head-to-toe runway ensembles, discover verified community looks, and shop full outfit bundles with exclusive direct savings.
              </p>
            </div>

            {/* Live Counter Stats Pill */}
            <div className="flex items-center gap-6 sm:gap-8 bg-white dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800 p-4 sm:px-6 rounded-3xl shadow-sm self-start lg:self-end">
              <div>
                <span className="text-xl sm:text-2xl font-bold font-mono text-zinc-950 dark:text-white block">
                  24+
                </span>
                <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-400">
                  Curated Ensembles
                </span>
              </div>
              <div className="w-px h-8 bg-zinc-200 dark:bg-zinc-800" />
              <div>
                <span className="text-xl sm:text-2xl font-bold font-mono text-[#6F4E37] dark:text-[#E6C280] block">
                  100%
                </span>
                <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-400">
                  Verified Drops
                </span>
              </div>
              <div className="w-px h-8 bg-zinc-200 dark:bg-zinc-800" />
              <div>
                <span className="text-xl sm:text-2xl font-bold font-mono text-zinc-950 dark:text-white block">
                  15% Off
                </span>
                <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-400">
                  Bundle Savings
                </span>
              </div>
            </div>
          </div>

          {/* Primary View Mode Switcher */}
          <div className="flex items-center gap-3 mt-10 pt-6 border-t border-zinc-200/60 dark:border-zinc-800/60 overflow-x-auto scrollbar-none">
            <button
              onClick={() => setActiveTab("all-ensembles")}
              className={`px-5 py-2.5 rounded-full text-xs font-mono tracking-wider transition-all duration-300 cursor-pointer flex items-center gap-2 shrink-0 ${
                activeTab === "all-ensembles"
                  ? "bg-zinc-950 text-white dark:bg-white dark:text-black shadow-md font-bold scale-102"
                  : "bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              COMPLETE ENSEMBLES ({ARCHIVE_LOOKS.length})
            </button>

            <button
              onClick={() => setActiveTab("aesthetic-filter")}
              className={`px-5 py-2.5 rounded-full text-xs font-mono tracking-wider transition-all duration-300 cursor-pointer flex items-center gap-2 shrink-0 ${
                activeTab === "aesthetic-filter"
                  ? "bg-zinc-950 text-white dark:bg-white dark:text-black shadow-md font-bold scale-102"
                  : "bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400"
              }`}
            >
              <Filter className="w-3.5 h-3.5" />
              FILTER BY AESTHETIC
            </button>
          </div>

          {/* Aesthetic Filter Chips */}
          {activeTab === "aesthetic-filter" && (
            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-dashed border-zinc-200 dark:border-zinc-800 animate-fade-in">
              {["All", "Quiet Luxury", "Techwear", "Tokyo Minimalist", "Resort & Drapes"].map((aes) => (
                <button
                  key={aes}
                  onClick={() => setActiveAesthetic(aes)}
                  className={`px-4 py-1.5 rounded-full text-[11px] font-mono transition-all cursor-pointer ${
                    activeAesthetic === aes
                      ? "bg-[#6F4E37] text-white font-bold shadow-sm"
                      : "bg-white/80 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-[#6F4E37]"
                  }`}
                >
                  {aes}
                </button>
              ))}
            </div>
          )}
        </section>

        {/* 2. Interactive Curated Outfits Showroom Grid */}
        <section className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 py-16 relative z-10">
          <div className="flex flex-col gap-12 sm:gap-16">
            {filteredLooks.map((look) => (
              <CuratedLookCard key={look.id} look={look} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
