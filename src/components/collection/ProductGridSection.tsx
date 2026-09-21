"use client";

import React, { useState, useMemo } from "react";
import { Heart, ShoppingBag, Star, SlidersHorizontal, ChevronDown, Check } from "lucide-react";

interface Product {
  id: string;
  title: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  category: string;
  popularity: number; // 1 to 100
  isNew?: boolean;
}

const BLACKOUT_PRODUCTS: Product[] = [
  {
    id: "bo-1",
    title: "400GSM Stealth Heavy Hoodie",
    brand: "Guerilla Culture",
    price: 3999,
    originalPrice: 5499,
    category: "hoodies",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=400&auto=format&fit=crop",
    popularity: 95,
    isNew: true
  },
  {
    id: "bo-2",
    title: "Oversized Cyber-Drip Tee",
    brand: "Outkast Lab",
    price: 1799,
    category: "tees",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=400&auto=format&fit=crop",
    popularity: 88,
    isNew: true
  },
  {
    id: "bo-3",
    title: "Multi-Pocket Tactical Cargos",
    brand: "Urban Combat",
    price: 3299,
    originalPrice: 4299,
    category: "cargos",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=400&auto=format&fit=crop",
    popularity: 92
  },
  {
    id: "bo-4",
    title: "Midnight Eclipse Low Sneakers",
    brand: "Neo-Step",
    price: 8999,
    originalPrice: 11999,
    category: "sneakers",
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=400&auto=format&fit=crop",
    popularity: 99,
    isNew: true
  },
  {
    id: "bo-5",
    title: "Obsidian Utility Chest Rig",
    brand: "Tokyo Techwear",
    price: 2199,
    category: "accessories",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=400&auto=format&fit=crop",
    popularity: 84
  },
  {
    id: "bo-6",
    title: "Dark Matter Boxy Tee",
    brand: "Guerilla Culture",
    price: 1699,
    originalPrice: 2199,
    category: "tees",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=400&auto=format&fit=crop",
    popularity: 78
  },
  {
    id: "bo-7",
    title: "Parachute Combat Pants",
    brand: "Urban Combat",
    price: 2999,
    category: "cargos",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1517462964-21fdcec3f25b?q=80&w=400&auto=format&fit=crop",
    popularity: 85
  },
  {
    id: "bo-8",
    title: "Shibuya Blackout Cap",
    brand: "DripHunter Originals",
    price: 1299,
    category: "accessories",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=400&auto=format&fit=crop",
    popularity: 90
  }
];

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "hoodies", label: "Hoodies" },
  { id: "tees", label: "Tees" },
  { id: "cargos", label: "Cargos" },
  { id: "sneakers", label: "Sneakers" },
  { id: "accessories", label: "Accessories" }
];

const SORT_OPTIONS = [
  { id: "featured", label: "Featured" },
  { id: "newest", label: "Newest" },
  { id: "price-low", label: "Price Low to High" },
  { id: "price-high", label: "Price High to Low" },
  { id: "popular", label: "Most Popular" }
];

export default function ProductGridSection() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeSort, setActiveSort] = useState("featured");
  const [isSortOpen, setIsSortOpen] = useState(false);
  
  // Interaction states for feedback
  const [wishlisted, setWishlisted] = useState<Record<string, boolean>>({});
  const [carted, setCarted] = useState<Record<string, boolean>>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleWishlist = (id: string, name: string) => {
    setWishlisted((prev) => {
      const updated = !prev[id];
      triggerToast(updated ? `Added ${name} to Wishlist` : `Removed ${name} from Wishlist`);
      return { ...prev, [id]: updated };
    });
  };

  const handleAddToCart = (id: string, name: string) => {
    setCarted((prev) => ({ ...prev, [id]: true }));
    triggerToast(`Added ${name} to Shopping Bag`);
    setTimeout(() => {
      setCarted((prev) => ({ ...prev, [id]: false }));
    }, 2000);
  };

  // Filter and Sort Logic
  const processedProducts = useMemo(() => {
    let result = [...BLACKOUT_PRODUCTS];
    
    // Filter
    if (activeCategory !== "all") {
      result = result.filter((p) => p.category === activeCategory);
    }
    
    // Sort
    if (activeSort === "newest") {
      result = result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    } else if (activeSort === "price-low") {
      result = result.sort((a, b) => a.price - b.price);
    } else if (activeSort === "price-high") {
      result = result.sort((a, b) => b.price - a.price);
    } else if (activeSort === "popular") {
      result = result.sort((a, b) => b.popularity - a.popularity);
    }
    
    return result;
  }, [activeCategory, activeSort]);

  return (
    <section id="collection-grid-section" className="w-full py-16 bg-background scroll-mt-20 border-b border-border/40 relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-white text-black px-5 py-3 rounded-xl font-bold shadow-2xl flex items-center gap-2 border border-zinc-200 animate-slide-in duration-300 text-sm">
          <Check className="h-4 w-4 text-[#6F4E37] stroke-[3]" />
          {toastMessage}
        </div>
      )}

      <div className="w-full px-4 md:px-6">
        
        {/* Controls: Filter Tabs & Sort Dropdown */}
        <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center pb-8 mb-10 border-b border-border/40">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider border transition-all duration-300 ${
                  activeCategory === tab.id
                    ? "bg-white text-black border-white shadow-md"
                    : "bg-zinc-950 text-zinc-400 border-zinc-900 hover:text-white hover:border-zinc-800"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="relative self-stretch md:self-auto min-w-[200px]">
            <button
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="w-full flex items-center justify-between gap-4 bg-zinc-950 border border-zinc-900 rounded-xl px-5 py-3 text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-white hover:border-zinc-800 transition-all"
            >
              <span className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                Sort: {SORT_OPTIONS.find((o) => o.id === activeSort)?.label}
              </span>
              <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isSortOpen ? "rotate-180" : ""}`} />
            </button>

            {isSortOpen && (
              <>
                <div className="fixed inset-0 z-20" onClick={() => setIsSortOpen(false)} />
                <div className="absolute right-0 mt-2 w-full bg-zinc-950 border border-zinc-900 rounded-xl shadow-2xl overflow-hidden z-30 animate-fade-in">
                  {SORT_OPTIONS.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => {
                        setActiveSort(option.id);
                        setIsSortOpen(false);
                      }}
                      className={`w-full text-left px-5 py-3.5 text-xs font-semibold uppercase tracking-wider transition-colors hover:bg-zinc-900 ${
                        activeSort === option.id ? "text-brand-neon bg-zinc-900/50" : "text-zinc-400"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Product Grid */}
        {processedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {processedProducts.map((product) => {
              const discount = product.originalPrice
                ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
                : null;
              
              const isWishlisted = !!wishlisted[product.id];
              const isCarted = !!carted[product.id];

              return (
                <div
                  key={product.id}
                  className="group relative flex flex-col bg-zinc-950 border border-zinc-900 rounded-2xl overflow-hidden transition-all duration-350 hover:border-zinc-800 hover:shadow-xl hover:-translate-y-1"
                >
                  {/* Image and Badges */}
                  <div className="relative aspect-[3/4] w-full bg-zinc-900 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700 ease-out group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                    
                    {/* Floating Badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                      {product.isNew && (
                        <span className="text-[9px] font-black uppercase tracking-wider bg-white text-black px-2.5 py-1 rounded">
                          New
                        </span>
                      )}
                      {discount && (
                        <span className="text-[9px] font-black uppercase tracking-wider bg-brand-orange text-white px-2.5 py-1 rounded">
                          {discount}% OFF
                        </span>
                      )}
                    </div>

                    {/* Wishlist Trigger */}
                    <button
                      onClick={() => handleWishlist(product.id, product.title)}
                      className={`absolute top-4 right-4 z-10 flex h-9.5 w-9.5 items-center justify-center rounded-xl border transition-all ${
                        isWishlisted
                          ? "bg-brand-orange/20 border-brand-orange text-brand-orange"
                          : "bg-black/40 border-white/10 text-white hover:bg-white hover:text-black hover:scale-105"
                      }`}
                      aria-label="Add to Wishlist"
                    >
                      <Heart className="h-4.5 w-4.5" fill={isWishlisted ? "currentColor" : "none"} />
                    </button>

                    {/* Quick Add to Cart Panel (Desktop Hover) */}
                    <div className="absolute bottom-4 inset-x-4 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-10 hidden sm:block">
                      <button
                        onClick={() => handleAddToCart(product.id, product.title)}
                        className={`w-full flex items-center justify-center gap-2 rounded-xl py-3.5 text-xs font-extrabold uppercase tracking-widest transition-all ${
                          isCarted
                            ? "bg-[#6F4E37] text-white"
                            : "bg-white text-black hover:bg-zinc-200"
                        }`}
                      >
                        <ShoppingBag className="h-4 w-4" />
                        {isCarted ? "Added to Bag" : "Quick Add"}
                      </button>
                    </div>
                  </div>

                  {/* Info Panel */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest font-mono">
                        {product.brand}
                      </p>
                      <h3 className="text-sm font-bold text-white leading-tight group-hover:text-white transition-colors duration-300">
                        {product.title}
                      </h3>
                    </div>

                    {/* Price and Rating */}
                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-baseline gap-2">
                        <span className="text-sm font-extrabold text-white">₹{product.price}</span>
                        {product.originalPrice && (
                          <span className="text-xs text-zinc-600 line-through font-semibold">
                            ₹{product.originalPrice}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-1 text-[10px] font-bold text-zinc-400 bg-zinc-900/40 px-2 py-0.5 rounded border border-zinc-900">
                        <Star className="h-3 w-3 text-[#6F4E37] fill-[#6F4E37]" />
                        {product.rating}
                      </div>
                    </div>

                    {/* Add to Bag (Mobile Only) */}
                    <button
                      onClick={() => handleAddToCart(product.id, product.title)}
                      className={`w-full sm:hidden flex items-center justify-center gap-2 rounded-xl py-3 text-xs font-extrabold uppercase tracking-widest transition-all ${
                        isCarted
                          ? "bg-[#6F4E37] text-white"
                          : "bg-white text-black"
                      }`}
                    >
                      <ShoppingBag className="h-4.5 w-4.5" />
                      {isCarted ? "Added to Bag" : "Add to Bag"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 bg-zinc-950 rounded-3xl border border-zinc-900">
            <p className="text-sm font-bold uppercase tracking-widest text-zinc-500">No products found</p>
            <p className="text-xs text-zinc-600 mt-2">Try selecting another filter category</p>
          </div>
        )}

      </div>
    </section>
  );
}
