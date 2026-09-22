"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Heart, Check, ShoppingBag, ArrowUpRight, ArrowRight, Sparkles, Clock } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useCart } from "@/context/CartContext";
import { SectionHeading } from "@/components/ui/SectionHeading";
import ProductCard from "@/components/product/ProductCard";

const recentlyViewedProducts = [
  { 
    id: "201", 
    name: "Puma Scuderia Ferrari Heritage Zip Sweatshirt", 
    brand: "Puma", 
    price: "₹7,999", 
    originalPrice: "₹10,999",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=600&q=85", 
    hoverImage: "https://images.unsplash.com/photo-1620799139507-2a76f79a2f4d?auto=format&fit=crop&w=600&q=85",
    badge: "Viewed 2h ago",
    rating: 4.9
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
    rating: 5.0
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
    rating: 4.8
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
    rating: 4.9
  },
  { 
    id: "203", 
    name: "Classic Heavyweight Cotton Crewneck", 
    brand: "ESSENTIALS", 
    price: "₹6,299", 
    originalPrice: "₹8,000",
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=600&q=85", 
    hoverImage: "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=600&q=85",
    badge: "Viewed Today",
    rating: 4.7
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
    rating: 5.0
  }
];

const RECENTLY_VIEWED_COLORS: Record<string, { name: string; hex: string; image?: string; hoverImage?: string }[]> = {
  "201": [
    { name: "Black", hex: "#000000", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=600&q=85", hoverImage: "https://images.unsplash.com/photo-1620799139507-2a76f79a2f4d?auto=format&fit=crop&w=600&q=85" },
    { name: "Red", hex: "#EF4444", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=85", hoverImage: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=600&q=85" }
  ],
  "202": [
    { name: "Charcoal", hex: "#27272A", image: "https://images.unsplash.com/photo-1620799139507-2a76f79a2f4d?auto=format&fit=crop&w=600&q=85", hoverImage: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=600&q=85" },
    { name: "Sand", hex: "#D4C5B9", image: "https://images.unsplash.com/photo-1574169208507-84376144848b?auto=format&fit=crop&w=600&q=85", hoverImage: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=85" }
  ],
  "204": [
    { name: "Charcoal", hex: "#27272A", image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=85", hoverImage: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=600&q=85" },
    { name: "Olive", hex: "#5C604D", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=85", hoverImage: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=85" }
  ],
  "206": [
    { name: "Charcoal", hex: "#27272A", image: "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=600&q=85", hoverImage: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=85" },
    { name: "Sand", hex: "#D4C5B9", image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=85", hoverImage: "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=600&q=85" },
    { name: "Olive", hex: "#5C604D", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=85", hoverImage: "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=600&q=85" }
  ],
  "203": [
    { name: "Sand", hex: "#D4C5B9", image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=600&q=85", hoverImage: "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=600&q=85" },
    { name: "Charcoal", hex: "#27272A", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=600&q=85", hoverImage: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=600&q=85" }
  ],
  "207": [
    { name: "Silver Black", hex: "#18181B", image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=600&q=85", hoverImage: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=85" },
    { name: "Silver White", hex: "#F4F4F5", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=85", hoverImage: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=600&q=85" }
  ]
};

const SIZES = ["XS", "S", "M", "L", "XL"];

export default function RecentlyViewed({ basePath = "" }: { basePath?: string }) {
  const { ref, isVisible } = useScrollAnimation();
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toggleWishlist, isInWishlist, addToCart } = useCart();
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});
  const [selectedColors, setSelectedColors] = useState<Record<string, string>>({});
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const maxScroll = scrollWidth - clientWidth;
      if (maxScroll > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (scrollLeft / maxScroll) * 100)));
      }
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft } = scrollRef.current;
      const cardWidth = 280 + 24;
      const scrollTo = direction === "left" ? scrollLeft - cardWidth : scrollLeft + cardWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  if (!recentlyViewedProducts || recentlyViewedProducts.length === 0) {
    return null;
  }

  return (
    <section ref={ref} className="w-full bg-transparent text-zinc-900 dark:text-white py-16 select-none overflow-hidden relative">
      <div className="w-full max-w-[1600px] mx-auto px-0 md:px-6 md:sm:px-12 md:md:px-16 md:lg:px-20">
        
        {/* Desktop Editorial Luxury Header */}
        <div className="hidden md:block w-full mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-200/70 dark:border-zinc-800/80 pb-6 text-left">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#6F4E37] dark:bg-[#E6C280] animate-pulse" />
              <span className="text-[9.5px] sm:text-[10px] font-bold tracking-[0.25em] text-[#6F4E37] dark:text-[#E6C280] uppercase font-mono">
                YOUR BROWSING ARCHIVE
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-zinc-950 dark:text-zinc-50 font-playfair leading-[1.05]">
              Recently <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280]">Viewed</span>
            </h2>
          </div>
          
          <div className="flex flex-col md:items-end justify-end md:max-w-md w-full md:w-auto gap-2 text-left md:text-right">
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-sans font-light leading-relaxed">
              Curated items from your recent sessions. Complete your styling rotation with authenticated luxury picks.
            </p>
            <Link
              href={`${basePath}/recently-viewed`}
              className="inline-flex items-center gap-1.5 text-xs font-mono font-bold tracking-wider text-zinc-900 dark:text-zinc-100 hover:text-[#6F4E37] dark:hover:text-[#E6C280] transition-colors group"
            >
              <span>VIEW FULL HISTORY</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Editorial Header */}
      <div className="md:hidden border-b border-zinc-200/70 dark:border-zinc-800/80 pb-5 mx-4 mb-4">
        <SectionHeading
          variant="playfair"
          className="text-zinc-950 dark:text-zinc-50"
          title={<>RECENTLY <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280]">VIEWED</span></>}
          action={
            <Link
              href={`${basePath}/recently-viewed`}
              className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold tracking-wider text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors mt-2"
            >
              <span>VIEW ALL</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          }
        />
      </div>

      {/* Desktop Horizontal Scroll Track */}
      <div
        className={`hidden md:block w-full transition-all duration-1000 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="w-full flex overflow-x-auto scrollbar-none py-2 gap-5 sm:gap-6 scroll-smooth snap-x snap-mandatory scroll-p-4"
        >
          {recentlyViewedProducts.map((p) => {
            const isLiked = isInWishlist(p.id);
            const slug = p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
            const productUrl = basePath ? `${basePath}/product/${slug}` : `/product/${slug}`;
            const isHovered = hoveredCardId === p.id;

            const productColors = RECENTLY_VIEWED_COLORS[p.id] || [
              { name: "Charcoal", hex: "#27272A" },
              { name: "Sand", hex: "#D4C5B9" }
            ];
            const activeColor = selectedColors[p.id] || productColors[0].name;
            const activeColorObj = productColors.find((c) => c.name === activeColor) || productColors[0];
            const activeDisplayImage = activeColorObj?.image || p.image;
            const activeHoverImage = activeColorObj?.hoverImage || p.hoverImage;

            const handleWishlistClick = (e: React.MouseEvent) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist({
                id: p.id,
                name: p.name,
                brand: p.brand,
                price: p.price,
                image: activeDisplayImage,
              });
            };

            const selectedSize = selectedSizes[p.id] || "M";
            const isAdded = !!addedIds[p.id];

            // Discount percentage calculation
            const parseVal = (pStr: string) => parseInt(pStr.replace(/[^\d]/g, "")) || 0;
            const numPrice = parseVal(p.price);
            const numOriginal = p.originalPrice ? parseVal(p.originalPrice) : 0;
            const discountPct = numOriginal > numPrice ? Math.round(((numOriginal - numPrice) / numOriginal) * 100) : 0;

            const handleAddToCart = (e: React.MouseEvent) => {
              e.preventDefault();
              e.stopPropagation();
              const sizeToUse = selectedSizes[p.id] || "M";
              setSelectedSizes((prev) => ({ ...prev, [p.id]: sizeToUse }));
              setAddedIds((prev) => ({ ...prev, [p.id]: true }));
              setTimeout(() => {
                setAddedIds((prev) => ({ ...prev, [p.id]: false }));
              }, 1800);
              
              addToCart({
                id: `${p.id}-${sizeToUse}-${activeColor}`,
                name: p.name,
                price: numPrice,
                image: activeDisplayImage,
                brand: p.brand,
                size: sizeToUse,
                color: activeColor
              });
            };

            return (
              <div
                key={p.id}
                onMouseEnter={() => setHoveredCardId(p.id)}
                onMouseLeave={() => setHoveredCardId(null)}
                className="w-[260px] sm:w-[275px] lg:w-[calc(25%-18px)] shrink-0 snap-center group relative flex flex-col justify-between bg-[#FAFAFA] dark:bg-zinc-900/60 hover:bg-white dark:hover:bg-zinc-900 rounded-[24px] p-3 sm:p-3.5 border border-zinc-200/80 dark:border-zinc-800/80 hover:border-zinc-900/20 dark:hover:border-zinc-600/40 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_16px_30px_-8px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_16px_30px_-8px_rgba(0,0,0,0.5)] transform-gpu [transform:translateZ(0)] [backface-visibility:hidden]"
              >
                {/* Visual Image Canvas */}
                <div className="relative w-full aspect-[3/4] bg-[#F4EFEA] dark:bg-zinc-950/90 overflow-hidden select-none rounded-[16px] transition-colors duration-200 transform-gpu [backface-visibility:hidden]">
                  <Link href={productUrl} className="block w-full h-full relative transform-gpu [backface-visibility:hidden]">
                    <Image
                      key={`main-${p.id}-${activeDisplayImage}`}
                      alt={`${p.name} - ${activeColor}`}
                      src={activeDisplayImage}
                      fill
                      className={`object-cover transition-opacity duration-300 ease-out transform-gpu [backface-visibility:hidden] ${
                        activeHoverImage && isHovered ? "opacity-0" : "opacity-100"
                      }`}
                      sizes="(max-width: 768px) 50vw, 20vw"
                      priority={false}
                    />
                    {activeHoverImage && (
                      <Image
                        key={`hover-${p.id}-${activeHoverImage}`}
                        alt={`${p.name} secondary angle`}
                        src={activeHoverImage}
                        fill
                        className={`object-cover transition-opacity duration-300 ease-out transform-gpu [backface-visibility:hidden] ${
                          isHovered ? "opacity-100" : "opacity-0"
                        }`}
                        sizes="(max-width: 768px) 50vw, 20vw"
                      />
                    )}
                  </Link>

                  {/* Culture Circle Floating Badges */}
                  <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10 pointer-events-none">
                    <span className="inline-flex items-center gap-1 backdrop-blur-md bg-black/60 dark:bg-zinc-900/80 text-white text-[8px] font-mono font-semibold tracking-wider px-2.5 py-1 rounded-full uppercase border border-white/10 shadow-xs">
                      <span className="w-1 h-1 rounded-full bg-[#E6C280] animate-pulse" />
                      {p.badge}
                    </span>
                    {discountPct > 0 && (
                      <span className="backdrop-blur-md bg-zinc-950/85 text-white text-[8px] font-mono font-bold tracking-wider px-2 py-0.5 rounded-full uppercase border border-white/10 shadow-xs w-fit">
                        -{discountPct}% OFF
                      </span>
                    )}
                  </div>

                  {/* Wishlist Glass Button */}
                  <button
                    onClick={handleWishlistClick}
                    className={`absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full backdrop-blur-md border flex items-center justify-center hover:scale-110 active:scale-90 transition-all duration-300 cursor-pointer shadow-sm ${
                      isLiked
                        ? "bg-rose-50 dark:bg-rose-950/80 border-rose-200 dark:border-rose-800/80 text-rose-500"
                        : "bg-white/85 dark:bg-zinc-900/85 border-black/5 dark:border-white/10 text-zinc-700 dark:text-zinc-200"
                    }`}
                    aria-label="Add to favorites"
                  >
                    <Heart
                      className={`w-3.5 h-3.5 transition-colors ${
                        isLiked ? "text-rose-500" : "text-zinc-700 dark:text-zinc-300"
                      }`}
                      fill={isLiked ? "currentColor" : "none"}
                    />
                  </button>

                  {/* Sleek Floating Glass Quick Size Pill */}
                  <div className="absolute bottom-2.5 sm:bottom-3 inset-x-2.5 sm:inset-x-3 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-xl p-2 sm:p-2.5 shadow-[0_12px_24px_-6px_rgba(0,0,0,0.18)] opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 ease-out z-20 flex flex-col items-center gap-1.5">
                    <div className="flex items-center justify-between w-full px-0.5">
                      <span className="text-[8px] font-mono tracking-widest text-[#6F4E37] dark:text-[#E6C280] uppercase font-bold">
                        Quick Size
                      </span>
                      <span className="text-[8px] font-mono text-zinc-500 dark:text-zinc-400 font-semibold">
                        Size: {selectedSize} • {activeColor}
                      </span>
                    </div>
                    <div className="flex gap-1 w-full justify-center">
                      {SIZES.map((sz) => {
                        const isActive = selectedSize === sz;
                        return (
                          <button
                            key={sz}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setSelectedSizes((prev) => ({ ...prev, [p.id]: sz }));
                            }}
                            className={`flex-1 py-1 sm:py-1.5 rounded-lg text-[9px] sm:text-[9.5px] font-mono font-bold transition-all cursor-pointer flex items-center justify-center active:scale-95 ${
                              isActive
                                ? "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 shadow-xs"
                                : "bg-zinc-100/90 dark:bg-zinc-800/90 text-zinc-700 dark:text-zinc-300 hover:bg-[#6F4E37] hover:text-white dark:hover:bg-[#E6C280] dark:hover:text-zinc-950"
                            }`}
                          >
                            {sz}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Meta & Pricing Details */}
                <div className="mt-3 flex flex-col gap-1.5 flex-grow justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[9px] font-mono font-bold tracking-[0.2em] text-[#6F4E37] dark:text-[#E6C280] uppercase">
                        {p.brand}
                      </span>
                    </div>

                    <Link href={productUrl} className="block mt-0.5">
                      <h4 className="text-[12.5px] font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight line-clamp-1 group-hover:text-[#6F4E37] dark:group-hover:text-[#E6C280] transition-colors">
                        {p.name}
                      </h4>
                    </Link>

                    {/* Pricing Row */}
                    <div className="flex items-baseline justify-between mt-2">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-xs font-mono text-zinc-400 dark:text-zinc-500 font-medium">
                          From
                        </span>
                        <span className="text-sm font-mono font-bold text-zinc-950 dark:text-white tracking-tight">
                          {p.price}
                        </span>
                        {p.originalPrice && (
                          <span className="text-[11px] font-mono text-zinc-400 line-through">
                            {p.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Color Swatches (Square Fabric Thumbnails) */}
                    <div className="flex items-center gap-1.5 mt-2.5">
                      {productColors.map((color) => {
                        const isActive = activeColor === color.name;
                        return (
                          <button
                            key={color.name}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setSelectedColors((prev) => ({ ...prev, [p.id]: color.name }));
                            }}
                            title={color.name}
                            className={`relative w-4 h-4 flex-shrink-0 transition-all duration-200 cursor-pointer overflow-hidden ${
                              isActive
                                ? "ring-1 ring-zinc-900 dark:ring-white scale-110 shadow-sm z-10 rounded-[2px] border border-white dark:border-zinc-950"
                                : "ring-1 ring-zinc-200 dark:ring-zinc-800 hover:ring-zinc-400 rounded-[2px]"
                            }`}
                            style={{
                              backgroundColor: color.hex,
                              backgroundImage: color.image ? `url(${color.image})` : undefined,
                              backgroundSize: 'cover',
                              backgroundPosition: 'top center'
                            }}
                            aria-label={`Select color ${color.name}`}
                          />
                        );
                      })}
                    </div>
                  </div>

                  {/* Culture Circle Quick Add Action Button */}
                  <button
                    onClick={handleAddToCart}
                    className={`w-full mt-2.5 text-[9.5px] font-mono font-bold uppercase tracking-wider py-2.5 rounded-xl transition-all duration-300 border-none ${
                      isAdded
                        ? "bg-emerald-600 text-white cursor-pointer shadow-md"
                        : "bg-zinc-950 hover:bg-[#6F4E37] text-white dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-[#E6C280] cursor-pointer active:scale-[0.98] shadow-xs"
                    }`}
                  >
                    {isAdded ? (
                      <span className="flex items-center justify-center gap-1.5 animate-scale-in">
                        <Check className="w-3.5 h-3.5" /> Added ({selectedSize} • {activeColor})
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-1.5">
                        <ShoppingBag className="w-3 h-3 opacity-80" /> Add to Bag ({selectedSize})
                      </span>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
          {/* Spacer to prevent clipping */}
          <div className="w-6 sm:w-12 shrink-0 pointer-events-none" />
        </div>

        {/* Carousel controls & Progress bar */}
        <div className="w-full mt-8">
          <div className="flex items-center justify-between gap-6 max-w-xl mx-auto">
            <button
              onClick={() => scroll("left")}
              className="w-10 h-10 shrink-0 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-950 hover:text-white dark:hover:bg-white dark:hover:text-zinc-950 text-zinc-800 dark:text-zinc-200 flex items-center justify-center transition-all duration-300 cursor-pointer active:scale-95 shadow-xs"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Progress Indicator */}
            <div className="flex-1 flex items-center gap-3">
              <span className="text-[10px] font-mono text-zinc-400 font-bold">01</span>
              <div className="flex-1 h-[2px] bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden relative">
                <div
                  className="absolute top-0 left-0 bottom-0 bg-[#6F4E37] dark:bg-[#E6C280] transition-all duration-300 rounded-full"
                  style={{ width: `${Math.max(15, scrollProgress)}%` }}
                />
              </div>
              <span className="text-[10px] font-mono text-zinc-400 font-bold">
                0{recentlyViewedProducts.length}
              </span>
            </div>

            <button
              onClick={() => scroll("right")}
              className="w-10 h-10 shrink-0 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-950 hover:text-white dark:hover:bg-white dark:hover:text-zinc-950 text-zinc-800 dark:text-zinc-200 flex items-center justify-center transition-all duration-300 cursor-pointer active:scale-95 shadow-xs"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Horizontal Carousel */}
      <div 
        className={`md:hidden w-full flex items-stretch overflow-x-auto scrollbar-none py-2 gap-3 select-none scroll-smooth flex-nowrap px-4 snap-x snap-mandatory pb-6 transition-all duration-700 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {recentlyViewedProducts.map((p) => (
          <div 
            key={p.id} 
            className="w-[155px] sm:w-[170px] shrink-0 flex flex-col justify-between snap-start"
          >
            <ProductCard 
              id={p.id}
              name={p.name}
              brand={p.brand}
              price={p.price}
              originalPrice={p.originalPrice}
              image={p.image}
              hoverImage={p.hoverImage}
              badge={p.badge}
              rating={p.rating}
              colors={RECENTLY_VIEWED_COLORS[p.id]}
              basePath={basePath} 
            />
          </div>
        ))}
        <div className="w-4 shrink-0 pointer-events-none" />
      </div>
    </div>
  </section>
);
}

