"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Check, ShoppingBag, Plus } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import { ProductPrice } from "@/components/product/ProductPrice";

export interface LookItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category?: string;
  originalPrice?: number;
  pin?: { top: string; left: string; label: string };
}

export interface CuratedLook {
  id: string;
  title: string;
  description: string;
  modelImage: string;
  items: LookItem[];
  category?: string;
  subtitle?: string;
  discountPct?: number;
}

interface CuratedLookCardProps {
  look: CuratedLook;
  isVisible?: boolean;
}

export default function CuratedLookCard({ look, isVisible = true }: CuratedLookCardProps) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});

  const handleGetCompleteLook = () => {
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);

    look.items.forEach((item) => {
      addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        brand: look.title,
        size: "M",
        color: "Curated Look"
      });
    });
    
    toast.success("Complete look added to cart");
  };

  const handleAddItem = (e: React.MouseEvent, item: LookItem) => {
    e.stopPropagation();
    
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      brand: look.title,
      size: "M",
      color: "Curated Look"
    });
    
    setAddedItems((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [item.id]: false }));
    }, 2000);
    
    toast.success(`Added ${item.name} to cart`);
  };

  return (
    <div 
      className={`flex flex-col lg:flex-row bg-white dark:bg-zinc-900 rounded-[2rem] sm:rounded-[3rem] overflow-hidden shadow-xl shadow-stone-200/50 dark:shadow-none border border-stone-200/80 dark:border-zinc-800/80 transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
    >
      
      {/* Left: Edge-to-Edge Model Image */}
      <div className="w-full lg:w-[40%] relative h-[280px] sm:h-[350px] lg:h-auto lg:min-h-[400px] shrink-0 group overflow-hidden bg-stone-100 dark:bg-zinc-800">
        <Image 
          src={look.modelImage} 
          fill 
          className="object-cover transition-transform duration-[1500ms] group-hover:scale-105" 
          alt={look.title}
          sizes="(max-width: 1024px) 100vw, 40vw"
        />
      </div>

      {/* Right: Compact Content & Items Grid */}
      <div className="w-full lg:w-[60%] p-4 sm:p-5 lg:p-6 flex flex-col flex-grow justify-between">
        
        <div className="mb-3">
          <p className="text-[9px] font-mono text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-[0.2em] mb-1">
            Lookbook File // {look.id}
          </p>
          <h3 className="text-2xl lg:text-3xl font-playfair font-light text-zinc-950 dark:text-white leading-[1.1] tracking-tight mb-1.5">
            {look.title}
          </h3>
          <p className="text-[11px] sm:text-xs text-zinc-500 dark:text-zinc-400 font-sans leading-relaxed line-clamp-2">
            {look.description}
          </p>
        </div>

        {/* Grid Items List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
          {look.items.map((item) => (
            <div key={item.id} className="flex flex-row items-center gap-3 group bg-stone-50/50 dark:bg-zinc-950/50 py-1.5 px-2 sm:p-2 rounded-xl border border-transparent hover:border-[#6F4E37]/30 dark:hover:border-[#E6C280]/30 transition-colors">
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 shrink-0 rounded-lg overflow-hidden bg-stone-100 dark:bg-zinc-900 border border-stone-200/50 dark:border-zinc-800 transition-colors group-hover:border-[#6F4E37] dark:group-hover:border-[#E6C280]">
                <Image src={item.image} fill className="object-cover transition-transform duration-700 group-hover:scale-110 mix-blend-multiply dark:mix-blend-normal" alt={item.name} sizes="48px" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-[#6F4E37] dark:group-hover:text-[#E6C280] transition-colors leading-tight line-clamp-1">
                  {item.name}
                </p>
                <ProductPrice 
                  price={item.price} 
                  className="mt-0.5" 
                  priceClass="text-[10px] sm:text-xs font-mono font-bold text-zinc-500 dark:text-zinc-400" 
                />
              </div>
              <button 
                onClick={(e) => handleAddItem(e, item)}
                className={`ml-auto shrink-0 h-8 rounded-full flex items-center justify-center transition-all duration-300 overflow-hidden ${
                  addedItems[item.id]
                    ? "w-24 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400 border-transparent px-3 gap-1.5 shadow-inner"
                    : "w-8 bg-white border border-stone-200 text-zinc-600 hover:bg-[#6F4E37] hover:text-white hover:border-[#6F4E37] dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-[#E6C280] dark:hover:text-zinc-950 dark:hover:border-[#E6C280]"
                }`}
                aria-label="Add to cart"
              >
                {addedItems[item.id] ? (
                  <div className="flex items-center justify-center gap-1.5 animate-in fade-in zoom-in duration-300">
                    <ShoppingBag className="w-3.5 h-3.5 animate-bounce" />
                    <span className="text-[9px] font-bold uppercase tracking-wider whitespace-nowrap">In Bag</span>
                  </div>
                ) : (
                  <Plus className="w-4 h-4" />
                )}
              </button>
            </div>
          ))}
        </div>

        {/* Premium Action Button */}
        <button 
          onClick={handleGetCompleteLook}
          className={`relative w-full mt-auto overflow-hidden group/btn rounded-full border py-3 sm:py-4 px-6 transition-all duration-500 flex items-center justify-between ${
            isAdded
              ? "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400"
              : "bg-white dark:bg-zinc-900 border-stone-200 dark:border-zinc-800 hover:border-[#6F4E37] dark:hover:border-[#E6C280]"
          }`}
        >
           {/* Button Text */}
           <span className={`relative z-10 text-xs font-mono font-bold uppercase tracking-[0.2em] transition-colors duration-500 ${!isAdded && 'group-hover/btn:text-white dark:group-hover/btn:text-zinc-950'}`}>
             {isAdded ? "Archive Secured" : "Acquire Complete Look"}
           </span>
           
           {/* Circle Icon */}
           <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
             isAdded 
               ? "bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-300" 
               : "bg-zinc-100 dark:bg-zinc-800 text-zinc-950 dark:text-white group-hover/btn:bg-white dark:group-hover/btn:bg-zinc-900 group-hover/btn:text-[#6F4E37] dark:group-hover/btn:text-[#E6C280]"
           }`}>
             {isAdded ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
           </div>

           {/* Hover Sweep Background */}
           {!isAdded && (
             <div className="absolute inset-0 bg-[#6F4E37] dark:bg-[#E6C280] translate-y-[100%] group-hover/btn:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.83,0,0.17,1)] z-0" />
           )}
        </button>

      </div>
    </div>
  );
}
