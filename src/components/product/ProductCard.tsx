"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Check, ShoppingBag, Sparkles, ShieldCheck } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { ProductPrice } from "@/components/product/ProductPrice";
import { ProductRating } from "@/components/product/ProductRating";
import { ProductBadge } from "@/components/product/ProductBadge";

export interface ProductColor {
  name: string;
  hex: string;
  image?: string;
  hoverImage?: string;
}

interface ProductCardProps {
  id?: string;
  name: string;
  brand: string;
  price: string;
  originalPrice?: string;
  image: string;
  hoverImage?: string;
  badge?: string;
  buttonLabel?: string;
  colors?: ProductColor[];
  layout?: "default" | "centered";
  rating?: number;
  inStock?: boolean;
  onQuickView?: () => void;
  hideColorOptions?: boolean;
  hideQuickSizes?: boolean;
  hideAddToBag?: boolean;
  basePath?: string;
}

const DEFAULT_COLORS: ProductColor[] = [
  { name: "Charcoal", hex: "#27272A" },
  { name: "Sand", hex: "#D4C5B9" },
  { name: "Olive", hex: "#5C604D" }
];

const SIZES = ["XS", "S", "M", "L", "XL"];

export default function ProductCard({
  id,
  name,
  brand,
  price,
  originalPrice,
  image,
  hoverImage,
  badge,
  buttonLabel = "Add to Bag",
  colors = DEFAULT_COLORS,
  layout = "default",
  rating,
  inStock = true,
  onQuickView,
  hideColorOptions = false,
  hideQuickSizes = false,
  hideAddToBag = false,
  basePath,
}: ProductCardProps) {
  const { toggleWishlist, isInWishlist, addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>("M");
  const [selectedColor, setSelectedColor] = useState<string>(colors[0]?.name || "Charcoal");
  const [isAdded, setIsAdded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const itemId = id || name;
  const isLiked = isInWishlist(itemId);
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  const productUrl = basePath ? `${basePath}/product/${slug}` : `/product/${slug}`;

  // Active color matching
  const activeColorObj = colors.find((c) => c.name === selectedColor) || colors[0];
  const activeDisplayImage = (activeColorObj && activeColorObj.image) ? activeColorObj.image : image;
  const activeHoverImage = (activeColorObj && activeColorObj.hoverImage) ? activeColorObj.hoverImage : (hoverImage || image);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist({
      id: itemId,
      name,
      brand,
      price,
      image: activeDisplayImage,
    });
  };

  const handleSizeSelect = (sz: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!inStock) return;
    setSelectedSize(sz);
  };

  const handleColorSelect = (colorName: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!inStock) return;
    setSelectedColor(colorName);
  };

  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!inStock) return;

    const sizeToUse = selectedSize || "M";
    setIsAdded(true);

    const parsedPrice = parseInt(price.replace(/[^\d]/g, "")) || 2999;

    addToCart({
      id: `${itemId}-${sizeToUse}-${selectedColor}`,
      name,
      brand,
      price: parsedPrice,
      image: activeDisplayImage,
      size: sizeToUse,
      color: selectedColor,
    });

    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  // Calculate discount percentage dynamically if originalPrice is provided
  const parseVal = (pStr: string) => parseInt(pStr.replace(/[^\d]/g, "")) || 0;
  const numPrice = parseVal(price);
  const numOriginal = originalPrice ? parseVal(originalPrice) : 0;
  const discountPct = numOriginal > numPrice ? Math.round(((numOriginal - numPrice) / numOriginal) * 100) : 0;

  return (
    <div
      className="group relative flex flex-col justify-start w-full h-full bg-white dark:bg-zinc-900/70 hover:bg-stone-50/50 dark:hover:bg-zinc-900 rounded-[16px] sm:rounded-[26px] p-2 sm:p-4 border border-stone-200/85 dark:border-zinc-800/80 hover:border-stone-300 dark:hover:border-zinc-700 shadow-xs hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.6)] transition-all duration-400 ease-out select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Visual Image Viewport */}
      <div className={`relative w-full aspect-[3/4] bg-[#F7F4EE] dark:bg-zinc-950/90 overflow-hidden rounded-[12px] sm:rounded-[20px] transition-colors duration-300 ${!inStock ? "grayscale opacity-75" : ""}`}>
        <Link href={productUrl} className="block w-full h-full relative">
          <Image
            key={`main-${activeDisplayImage}`}
            alt={`${name} - ${selectedColor}`}
            src={activeDisplayImage}
            fill
            className={`object-cover transition-all duration-700 ease-out group-hover:scale-105 ${
              activeHoverImage && isHovered ? "opacity-0" : "opacity-100"
            }`}
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            priority={false}
          />
          {activeHoverImage && (
            <Image
              key={`hover-${activeHoverImage}`}
              alt={`${name} editorial preview`}
              src={activeHoverImage}
              fill
              className={`object-cover transition-all duration-700 ease-out group-hover:scale-105 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            />
          )}
        </Link>

        {/* Floating Badges (Culture-Circle Verified Standard) */}
        <ProductBadge badge={badge} discountPct={discountPct} inStock={inStock} />

        {/* Wishlist Glass Button */}
        {inStock && (
          <button
            onClick={handleWishlistClick}
            className={`absolute top-2 right-2 sm:top-2.5 sm:right-2.5 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full backdrop-blur-md border flex items-center justify-center hover:scale-110 active:scale-90 transition-all duration-300 cursor-pointer shadow-xs ${
              isLiked
                ? "bg-rose-50 dark:bg-rose-950/90 border-rose-200 dark:border-rose-800 text-rose-500"
                : "bg-white/90 dark:bg-zinc-900/90 border-stone-200/80 dark:border-white/10 text-zinc-700 dark:text-zinc-200 hover:text-rose-500"
            }`}
            aria-label="Add to favorites"
          >
            <Heart
              className={`w-3 h-3 sm:w-3.5 sm:h-3.5 transition-colors ${
                isLiked ? "text-rose-500" : "currentColor"
              }`}
              fill={isLiked ? "currentColor" : "none"}
            />
          </button>
        )}

        {/* Quick Size Flyout Overlay (Culture-Circle Interactive Pill) */}
        {!hideQuickSizes && inStock && (
          <div className="absolute bottom-2.5 inset-x-2.5 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl border border-stone-200/90 dark:border-white/10 rounded-2xl p-2.5 shadow-xl opacity-0 translate-y-3 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 ease-out z-20 flex flex-col gap-1.5">
            <div className="flex items-center justify-between px-1">
              <span className="text-[8px] font-mono tracking-widest text-[#6F4E37] dark:text-[#E6C280] uppercase font-bold">
                Select Size
              </span>
              <span className="text-[8px] font-mono text-zinc-500 dark:text-zinc-400 font-semibold">
                {selectedSize} • {selectedColor}
              </span>
            </div>
            <div className="flex gap-1 w-full justify-center">
              {SIZES.map((sz) => {
                const isActive = selectedSize === sz;
                return (
                  <button
                    key={sz}
                    onClick={(e) => handleSizeSelect(sz, e)}
                    className={`flex-1 py-1 rounded-lg text-[9px] font-mono font-bold transition-all cursor-pointer flex items-center justify-center active:scale-95 ${
                      isActive
                        ? "bg-[#6F4E37] text-white dark:bg-[#E6C280] dark:text-zinc-950 shadow-xs"
                        : "bg-stone-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-[#6F4E37]/20 hover:text-[#6F4E37]"
                    }`}
                  >
                    {sz}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Meta & Pricing Details */}
      <div className="mt-2 sm:mt-3 flex flex-col text-left">
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between gap-1">
            <span className="text-[8px] sm:text-[9px] font-mono font-bold tracking-[0.25em] text-[#6F4E37] dark:text-[#E6C280] uppercase">
              {brand}
            </span>
          </div>

          <Link href={productUrl} className="block mt-0.5 sm:mt-1">
            <h4 className="text-[11px] sm:text-[13px] font-medium text-zinc-900 dark:text-zinc-100 tracking-tight line-clamp-1 group-hover:text-[#6F4E37] dark:group-hover:text-[#E6C280] transition-colors">
              {name}
            </h4>
          </Link>

          {/* Pricing Row */}
          <div className="flex items-baseline justify-between mt-1 sm:mt-1.5">
            <ProductPrice price={price} originalPrice={originalPrice} />
            {rating !== undefined && (
              <ProductRating rating={rating} />
            )}
          </div>
        </div>

        {/* Color Swatches (Square Fabric Thumbnails) */}
        {!hideColorOptions && colors && colors.length > 0 && (
          <div className="flex items-center gap-1 sm:gap-1.5 mt-1 sm:mt-2">
            {colors.map((color) => {
              const isActive = selectedColor === color.name;
              return (
                <button
                  key={color.name}
                  onClick={(e) => handleColorSelect(color.name, e)}
                  title={color.name}
                  className={`relative w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 transition-all duration-200 cursor-pointer overflow-hidden ${
                    isActive
                      ? "ring-1 ring-zinc-900 dark:ring-white scale-110 shadow-sm z-10 rounded-[2px] border border-white dark:border-zinc-950"
                      : "ring-1 ring-zinc-200 dark:ring-zinc-800 hover:ring-zinc-400 rounded-[2px]"
                  }`}
                  style={{
                    backgroundColor: color.hex,
                    backgroundImage: color.image 
                      ? `url(${color.image})` 
                      : `linear-gradient(${color.hex}B3, ${color.hex}B3), url(${image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'top center'
                  }}
                  aria-label={`Select color ${color.name}`}
                />
              );
            })}
          </div>
        )}

        {/* Culture-Circle Direct Add to Bag Action (Inline Feedback) */}
        {!hideAddToBag && (
          <button
            disabled={!inStock}
            onClick={handleAddToCartClick}
            className={`w-full mt-1.5 sm:mt-2 text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider py-1.5 sm:py-2.5 rounded-lg sm:rounded-xl transition-all duration-300 border-none select-none ${
              !inStock
                ? "bg-stone-100 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed"
                : isAdded
                ? "bg-emerald-600 text-white cursor-pointer shadow-md"
                : "bg-zinc-950 hover:bg-[#6F4E37] text-white dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-[#E6C280] cursor-pointer active:scale-[0.98] shadow-xs"
            }`}
          >
            {!inStock ? (
              "Sold Out"
            ) : isAdded ? (
              <span className="flex items-center justify-center gap-1 sm:gap-1.5 animate-scale-in">
                <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Added ({selectedSize}) ✓
              </span>
            ) : (
              <span className="flex items-center justify-center gap-1.5">
                <ShoppingBag className="w-3 h-3 opacity-80" /> {buttonLabel} ({selectedSize})
              </span>
            )}
          </button>
        )}
      </div>
    </div>
  );
}


