"use client";

import React, { useState, useMemo } from "react";
import AppHeader from "@/components/app-shell/AppHeader";
import AppPageLayout from "@/components/app-shell/AppPageLayout";
import ProductCard from "@/components/product/ProductCard";
import { CATEGORY_TABS, MOCK_PRODUCTS, LIMITED_DROPS } from "@/data/mockData";
import { filterProducts, sortProducts, FilterState } from "@/lib/filterLogic";
import FilterSortBottomSheet from "@/components/mobile/FilterSortBottomSheet";
import { Compass } from "lucide-react";

// Combine products just like shop/page.tsx
const ALL_PRODUCTS = [
  ...MOCK_PRODUCTS,
  ...LIMITED_DROPS,
  ...MOCK_PRODUCTS.map((p) => ({ ...p, id: `${p.id}-d1` })),
  ...LIMITED_DROPS.map((p) => ({ ...p, id: `${p.id}-d1` })),
  ...MOCK_PRODUCTS.map((p) => ({ ...p, id: `${p.id}-d2` })),
  ...LIMITED_DROPS.map((p) => ({ ...p, id: `${p.id}-d2` }))
];

export default function MobileCategoriesPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  
  const [filters, setFilters] = useState<FilterState>({
    inStockOnly: false,
    selectedPriceRanges: [],
    minPrice: 0,
    maxPrice: 15000,
    selectedBrands: [],
    selectedCategories: [],
    selectedSubCategories: [],
    selectedTypes: [],
    selectedSizes: [],
    selectedGenders: [],
    selectedColours: [],
    selectedMaterials: [],
  });
  
  const [sortBy, setSortBy] = useState("featured");

  const filteredProducts = useMemo(() => {
    // 1. Apply tab category filter
    let products = ALL_PRODUCTS;
    if (activeCategory !== "all") {
      if (activeCategory === "limited-drops") {
        products = products.filter(p => p.isLimited);
      } else {
        products = products.filter(p => p.category.toLowerCase() === activeCategory);
      }
    }

    // 2. Apply bottom sheet filters
    const finalFiltered = filterProducts(products, filters);

    // 3. Sort
    return sortProducts(finalFiltered, sortBy);
  }, [activeCategory, filters, sortBy]);

  const handleApplyFilters = (newFilters: FilterState, newSortBy: string) => {
    setFilters(newFilters);
    setSortBy(newSortBy);
  };

  return (
    <AppPageLayout hasBottomNav={true}>
      <AppHeader title="Categories" rightAction={<Compass className="w-5 h-5 text-zinc-900" />} />
      <div className="flex flex-col min-h-screen bg-zinc-50 pt-2 pb-[130px]">
        
        {/* Horizontal Category Tabs */}
        <div className="sticky top-[56px] z-30 bg-zinc-50/95 backdrop-blur-md border-b border-zinc-200">
          <div className="flex overflow-x-auto scrollbar-none px-4 py-3 gap-3">
            {CATEGORY_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                  activeCategory === tab.id
                    ? "bg-[#6F4E37] text-white shadow-md shadow-[#6F4E37]/20"
                    : "bg-white text-zinc-600 border border-zinc-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest">
              {filteredProducts.length} Results
            </span>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-3">
              {filteredProducts.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    id={product.id}
                    name={product.title}
                    brand={product.brand}
                    price={`₹${product.price}`}
                    originalPrice={product.originalPrice ? `₹${product.originalPrice}` : undefined}
                    image={product.image}
                    hoverImage={product.hoverImage}
                    rating={product.rating}
                    inStock={product.inStock !== false}
                    basePath="/mobile"
                  />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="text-sm font-bold text-zinc-900 uppercase tracking-widest mb-2">
                No items found
              </p>
              <p className="text-xs text-zinc-500">
                Try adjusting your filters or category.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Fixed Filter & Sort Bar (Above BottomNav) */}
      <div className="fixed bottom-[64px] left-1/2 -translate-x-1/2 w-full max-w-md z-40 pb-safe">
        <div className="flex w-full">
          <FilterSortBottomSheet 
            currentFilters={filters}
            currentSortBy={sortBy}
            onApply={handleApplyFilters}
          />
        </div>
      </div>
      
    </AppPageLayout>
  );
}
