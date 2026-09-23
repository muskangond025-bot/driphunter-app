"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Heart, ChevronLeft, ArrowRight, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import ProductCard from "@/components/product/ProductCard";
import AppPageLayout from "@/components/app-shell/AppPageLayout";
import AppHeader from "@/components/app-shell/AppHeader";

export default function MobileWishlistPage() {
  const router = useRouter();
  const { wishlist, addToCart } = useCart();

  const handleMoveAllToCart = () => {
    if (wishlist.length === 0) return;
    wishlist.forEach((item) => {
      const priceStr = typeof item.price === "number" ? String(item.price) : item.price;
      const parsedPrice = parseInt(priceStr.replace(/[^\d]/g, "")) || 2999;
      addToCart({
        id: `${item.id}-M-Default`,
        name: item.name,
        brand: item.brand,
        price: parsedPrice,
        image: item.image,
        size: "M",
        color: "Default",
      });
    });
    alert("All items moved to bag!"); // simple fallback since we don't have toast context globally
  };

  return (
    <AppPageLayout hasBottomNav={false} className="bg-zinc-50 dark:bg-zinc-950">
      <AppHeader showActions={true}
        variant="contextual"
        title="Wishlist"
        fallbackUrl="/mobile/account"
      />

      <div className="flex-1 overflow-y-auto pb-24 px-4 pt-4">
        {wishlist.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center px-4">
            <div className="w-16 h-16 rounded-full bg-rose-50 dark:bg-rose-950/40 flex items-center justify-center mb-6">
              <Heart className="w-6 h-6 text-rose-400 dark:text-rose-500" />
            </div>
            <h3 className="text-xl font-light text-zinc-900 dark:text-zinc-100 font-playfair tracking-tight mb-3">
              Your wishlist is empty
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 font-sans mb-8">
              Explore our collections and save your favorite pieces here.
            </p>
            <Link 
              href="/mobile"
              className="bg-zinc-950 dark:bg-[#E6C280] text-white dark:text-zinc-950 px-8 py-3.5 rounded-xl text-xs font-mono font-bold uppercase tracking-widest shadow-md flex items-center gap-2"
            >
              <span>Explore Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold tracking-wider text-zinc-500 uppercase">
                {wishlist.length} Items Saved
              </span>
              <button 
                onClick={handleMoveAllToCart}
                className="text-xs font-mono font-bold tracking-wider text-[#6F4E37] dark:text-[#E6C280] uppercase flex items-center gap-1.5"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                Move All To Bag
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {wishlist.map((item) => {
                const priceFormatted = typeof item.price === "string" && item.price.includes("₹")
                  ? item.price
                  : `₹${parseInt(String(item.price).replace(/[^\d]/g, "") || "2999").toLocaleString()}`;

                return (
                  <ProductCard
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    brand={item.brand || "DripHunter"}
                    price={priceFormatted}
                    image={item.image}
                    inStock={true}
                    basePath="/mobile"
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    </AppPageLayout>
  );
}
