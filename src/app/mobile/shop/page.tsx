"use client";

import React, { useState, useMemo } from "react";
import AppHeader from "@/components/app-shell/AppHeader";
import AppPageLayout from "@/components/app-shell/AppPageLayout";
import ProductCard from "@/components/product/ProductCard";
import { MOCK_PRODUCTS, LIMITED_DROPS } from "@/data/mockData";
import { filterProducts, sortProducts, FilterState } from "@/lib/filterLogic";
import FilterSortBottomSheet from "@/components/mobile/FilterSortBottomSheet";
import { SlidersHorizontal } from "lucide-react";

const ALL_PRODUCTS = [
  ...MOCK_PRODUCTS,
  ...LIMITED_DROPS,
  ...MOCK_PRODUCTS.map((p) => ({ ...p, id: `${p.id}-d1` })),
  ...LIMITED_DROPS.map((p) => ({ ...p, id: `${p.id}-d1` })),
  ...MOCK_PRODUCTS.map((p) => ({ ...p, id: `${p.id}-d2` })),
  ...LIMITED_DROPS.map((p) => ({ ...p, id: `${p.id}-d2` }))
];

const SHOP_TABS = [
  { id: "all", label: "All Items" },
  { id: "top-wear", label: "Top Wear" },
  { id: "bottom-wear", label: "Bottom Wear" },
  { id: "accessories", label: "Accessories" },
  { id: "sneakers", label: "Sneakers" },
  { id: "skate", label: "Skate" },
  { id: "limited", label: "Limited Drops" }
];

export default function MobileShopPage() {
  const [activeTab, setActiveTab] = useState("all");
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
    // 0. Tab filter
    let tabFiltered = ALL_PRODUCTS;
    if (activeTab === "limited") {
      tabFiltered = ALL_PRODUCTS.filter((p) => p.isLimited || p.category === "limited");
    } else if (activeTab === "skate") {
      tabFiltered = ALL_PRODUCTS.filter((p) => p.category === "skate" || p.subCategory === "skate");
    } else if (activeTab !== "all") {
      tabFiltered = ALL_PRODUCTS.filter((p) => p.category === activeTab);
    }

    // 1. Filters
    const filtered = filterProducts(tabFiltered, filters);
    // 2. Sorting
    return sortProducts(filtered, sortBy);
  }, [activeTab, filters, sortBy]);

  const handleApplyFilters = (newFilters: FilterState, newSortBy: string) => {
    setFilters(newFilters);
    setSortBy(newSortBy);
  };

  return (
    <AppPageLayout hasBottomNav={true}>
      <AppHeader variant="contextual" title="Shop All" showActions={true} />
      <div className="flex flex-col min-h-screen bg-zinc-50 dark:bg-zinc-950 pt-2 pb-[140px]">
        
        {/* Header Area */}
        <div className="px-4 py-2">
          {/* Horizontal Tabs */}
          <div className="flex overflow-x-auto hide-scrollbar gap-2 mb-4 pb-1 -mx-4 px-4 items-center">
            <FilterSortBottomSheet 
              currentFilters={filters}
              currentSortBy={sortBy}
              onApply={handleApplyFilters}
              trigger={
                <button className="whitespace-nowrap px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider transition-colors bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 active:bg-zinc-50 dark:active:bg-zinc-800 flex items-center gap-1.5 shrink-0">
                  <SlidersHorizontal className="w-3 h-3" />
                  Filter & Sort
                </button>
              }
            />
            {SHOP_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider transition-colors ${
                  activeTab === tab.id
                    ? "bg-[#6F4E37] text-white shadow-sm"
                    : "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 active:bg-zinc-50 dark:active:bg-zinc-800"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between mt-2">
            <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest">
              {filteredProducts.length} Products
            </span>
          </div>
        </div>

        {/* Product Grid */}
        <div className="px-4 pb-10">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {filteredProducts.map((product) => (
                <div key={product.id} className="w-full">
                  <ProductCard
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
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center px-4 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm mt-4">
              <h2 className="text-sm font-bold text-zinc-900 dark:text-white mb-2">No Products Found</h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-[200px]">
                Try adjusting your filters or sorting to see more items.
              </p>
              <button 
                onClick={() => {
                  setFilters({
                    inStockOnly: false,
                    selectedPriceRanges: [],
                    minPrice: 0, maxPrice: 15000,
                    selectedBrands: [], selectedCategories: [],
                    selectedSubCategories: [], selectedTypes: [],
                    selectedSizes: [], selectedGenders: [],
                    selectedColours: [], selectedMaterials: []
                  });
                  setSortBy("featured");
                }}
                className="mt-6 text-[11px] font-bold uppercase tracking-widest text-white dark:text-zinc-950 bg-zinc-950 dark:bg-white px-6 py-2.5 rounded-full active:scale-95 transition-transform"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </AppPageLayout>
  );
}
