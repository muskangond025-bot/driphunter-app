"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Heart, ArrowRight, ShoppingBag, Sparkles, Check, ChevronRight } from "lucide-react";
import PageContainer from "@/components/layout/PageContainer";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SearchOverlay from "@/components/layout/SearchOverlay";
import ProductCard from "@/components/product/ProductCard";
import RecentlyViewed from "@/components/RecentlyViewed";
import { useCart } from "@/context/CartContext";
import { Surface } from "@/components/ui/Surface";
import { Button } from "@/components/ui/button";

export default function WishlistPage() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const { wishlist, addToCart } = useCart();

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2400);
  };

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
    triggerToast("All wishlist pieces moved to shopping bag!");
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FCFAF7] dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 select-none antialiased font-sans transition-colors duration-300">
      {/* Navigation Header */}
      <Navbar onSearchClick={() => setIsSearchOpen(true)} />

      {/* Main Content */}
      <PageContainer className="flex-grow py-8 sm:py-12">
          
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-6">
            <Link href="/" className="hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#6F4E37] dark:text-[#E6C280] font-bold">Wishlist</span>
          </div>

          {/* Page Header */}
          <div className="mb-10 border-b border-zinc-200 dark:border-zinc-800/80 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-mono font-bold tracking-[0.28em] text-[#6F4E37] dark:text-[#E6C280] uppercase mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Personal Archive</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-zinc-950 dark:text-zinc-50 font-playfair leading-[1.05]">
                My <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280]">Wishlist</span>
              </h1>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-sans font-light mt-1.5 max-w-xl">
                Your curated streetwear archive and saved silhouettes. Review, select sizes, or transfer directly to your shopping bag.
              </p>
            </div>

            {/* Stats & Actions */}
            {wishlist.length > 0 && (
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-[11px] font-mono font-bold tracking-wider text-zinc-600 dark:text-zinc-300 bg-white dark:bg-zinc-900 px-4 py-2 rounded-full border border-zinc-200 dark:border-zinc-800 shadow-xs">
                  {wishlist.length} {wishlist.length === 1 ? "Piece" : "Pieces"} Saved
                </span>
                
                <button
                  onClick={handleMoveAllToCart}
                  className="inline-flex items-center gap-2 bg-[#6F4E37] hover:bg-[#5C3D2E] dark:bg-[#E6C280] dark:hover:bg-[#d4b06c] text-white dark:text-zinc-950 text-xs font-mono font-bold uppercase tracking-wider px-5 py-2.5 rounded-full transition-all cursor-pointer shadow-sm hover:shadow-md active:scale-95 border-none"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Move All To Bag</span>
                </button>
              </div>
            )}
          </div>

          {/* Wishlist Items Display */}
          {wishlist.length === 0 ? (
            /* Premium Empty State */
            <Surface className="flex flex-col items-center justify-center text-center py-20 px-4 max-w-lg mx-auto dark:bg-zinc-900/60 rounded-[32px] dark:border-zinc-800/80 p-8 sm:p-12 dark:shadow-2xl my-8 animate-fade-in">
              <div className="w-18 h-18 rounded-full bg-rose-50 dark:bg-rose-950/40 border border-rose-100 dark:border-rose-900/40 flex items-center justify-center mb-6 shadow-inner">
                <Heart className="w-8 h-8 text-rose-400 dark:text-rose-500" />
              </div>
              <h3 className="text-2xl font-light text-zinc-900 dark:text-zinc-100 font-playfair tracking-tight">
                Your archive is empty
              </h3>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-sans font-light mt-3 leading-relaxed max-w-sm">
                Explore our collections of limited drops and luxury streetwear. Click the heart on any piece to catalog it here.
              </p>
              <Button variant="drip" asChild className="mt-8 px-8 py-3.5 rounded-xl dark:shadow-[0_0_25px_rgba(230,194,128,0.25)] flex gap-2">
                <Link href="/shop">
                  <span>Explore Catalog</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </Button>
            </Surface>
          ) : (
            /* Responsive Grid matching Homepage & /shop */
            <div className="w-full mb-16">
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 sm:gap-6 animate-fade-in">
                {wishlist.map((item) => {
                  const priceFormatted = typeof item.price === "string" && item.price.includes("₹")
                    ? item.price
                    : `₹${parseInt(String(item.price).replace(/[^\d]/g, "") || "2999").toLocaleString()}`;

                  return (
                    <ProductCard
                      key={item.id}
                      id={item.id}
                      name={item.name}
                      brand={item.brand || "DripHunter Archive"}
                      price={priceFormatted}
                      image={item.image}
                      inStock={true}
                    />
                  );
                })}
              </div>
            </div>
          )}
        <div className="mt-12 pt-6 border-t border-zinc-200/80 dark:border-zinc-800/80">
          <RecentlyViewed />
        </div>
      </PageContainer>

      {/* Floating Action Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-zinc-950 dark:bg-[#E6C280] text-white dark:text-zinc-950 px-5 py-3 rounded-full text-xs font-mono font-bold tracking-wider shadow-2xl flex items-center gap-2 animate-slide-up border border-white/10 dark:border-zinc-900">
          <Check className="w-4 h-4 text-emerald-400 dark:text-zinc-950" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Footer */}
      <Footer />

      {/* Global Search Overlay */}
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
}
