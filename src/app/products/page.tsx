"use client";

import React, { Suspense } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ArrowLeft, Tag } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import ProductCard from "@/components/product/ProductCard";

const IMAGE_URLS = [
  "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=600&q=80"
];

function ProductsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.get('category') || 'All Clothing';
  const couponCode = searchParams.get('coupon') || '';

  // Extract a rough discount percentage from the coupon code if it exists
  const discountMatch = couponCode.match(/(\d+)%/);
  const discountPercent = discountMatch ? parseInt(discountMatch[1]) : (couponCode ? 10 : 0);

  // Generate mock products based on the category
  const mockProducts = Array.from({ length: 8 }).map((_, i) => {
    const basePrice = 500 + Math.floor(Math.random() * 2000);
    const discountedPrice = Math.floor(basePrice * (1 - discountPercent / 100));

    return {
      id: String(i + 1),
      name: `${category.replace(/s$/, '')} - Style ${i + 1}`,
      brand: ["Dennis Lingo", "Roadster", "Highlander", "Puma"][Math.floor(Math.random() * 4)],
      rating: parseFloat((3.5 + Math.random() * 1.5).toFixed(1)),
      price: `₹${discountedPrice}`,
      originalPrice: discountPercent > 0 ? `₹${basePrice}` : undefined,
      image: IMAGE_URLS[i % IMAGE_URLS.length],
      badge: discountPercent > 0 ? `${discountPercent}% OFF` : undefined,
    };
  });

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow pt-8 pb-16 px-4 md:px-8 max-w-[1200px] mx-auto w-full">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <ArrowLeft className="w-5 h-5 text-zinc-950 dark:text-white cursor-pointer hover:text-[#6F4E37] dark:hover:text-[#E6C280] transition-colors" onClick={() => router.back()} />
          <h1 className="text-xs font-bold uppercase tracking-widest text-zinc-500">Back to Categories</h1>
        </div>

        {/* Coupon Banner */}
        {couponCode && (
          <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 rounded-xl p-4 md:p-6 mb-10 flex items-center gap-4 shadow-sm">
            <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center rounded-full shrink-0">
              <Tag className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-950 dark:text-white">
                Showing eligible items for coupon: <span className="font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/50 px-2 py-0.5 rounded ml-1">{couponCode}</span>
              </p>
              <p className="text-xs text-zinc-500 mt-1">{discountPercent}% discount applied at checkout</p>
            </div>
          </div>
        )}

        <div className="flex items-end justify-between mb-8 border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <h2 className="text-3xl md:text-5xl font-chaney-title uppercase tracking-tight text-zinc-950 dark:text-white">
            {category}
          </h2>
          <span className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">{mockProducts.length} Items</span>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {mockProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              brand={product.brand}
              price={product.price}
              originalPrice={product.originalPrice}
              image={product.image}
              badge={product.badge}
              rating={product.rating}
            />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background text-foreground flex items-center justify-center font-chaney-title animate-pulse">Loading products...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
