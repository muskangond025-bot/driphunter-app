"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import AppHeader from "@/components/app-shell/AppHeader";
import AppPageLayout from "@/components/app-shell/AppPageLayout";
import ProductCard from "@/components/product/ProductCard";
import { TRENDING_KEYWORDS, MOCK_PRODUCTS, LIMITED_DROPS } from "@/data/mockData";
import { searchProducts, filterProducts, sortProducts, FilterState } from "@/lib/filterLogic";
import FilterSortBottomSheet from "@/components/mobile/FilterSortBottomSheet";
import { Search, X, Mic, AlertCircle } from "lucide-react";
import { useVoiceSearch } from "@/hooks/useVoiceSearch";

const ALL_PRODUCTS = [
  ...MOCK_PRODUCTS,
  ...LIMITED_DROPS,
  ...MOCK_PRODUCTS.map((p) => ({ ...p, id: `${p.id}-d1` })),
  ...LIMITED_DROPS.map((p) => ({ ...p, id: `${p.id}-d1` })),
  ...MOCK_PRODUCTS.map((p) => ({ ...p, id: `${p.id}-d2` })),
  ...LIMITED_DROPS.map((p) => ({ ...p, id: `${p.id}-d2` }))
];

export default function MobileSearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

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

  const { isListening, transcript, error, startListening, stopListening } = useVoiceSearch({
    onSearch: (query) => {
      setSearchQuery(query);
    }
  });

  // Sync partial transcript visually when listening
  useEffect(() => {
    if (isListening && transcript) {
      setSearchQuery(transcript);
    }
  }, [isListening, transcript]);

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return [];
    
    // 1. Search matching
    const searched = searchProducts(ALL_PRODUCTS, searchQuery);
    
    // 2. Filters
    const filtered = filterProducts(searched, filters);

    // 3. Sorting
    return sortProducts(filtered, sortBy);
  }, [searchQuery, filters, sortBy]);

  const handleApplyFilters = (newFilters: FilterState, newSortBy: string) => {
    setFilters(newFilters);
    setSortBy(newSortBy);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    inputRef.current?.focus();
  };

  return (
    <AppPageLayout hasBottomNav={true}>
      <AppHeader title="Search" />
      <div className="flex flex-col min-h-screen bg-zinc-50 pt-2 pb-[130px]">
        
        {/* Search Input Area */}
        <div className="sticky top-[56px] z-30 bg-zinc-50/95 backdrop-blur-md px-4 py-3 border-b border-zinc-200">
          <div className="relative flex items-center">
            <Search className="absolute left-3.5 w-4 h-4 text-zinc-400" />
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products, brands..."
              className="w-full bg-white border border-zinc-200 rounded-2xl pl-10 pr-12 py-3 text-sm font-medium text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-[#6F4E37] focus:ring-1 focus:ring-[#6F4E37] transition-all shadow-sm"
            />
            {searchQuery ? (
              <button 
                onClick={handleClearSearch}
                className="absolute right-3 p-1.5 text-zinc-400 hover:text-zinc-900 bg-white"
              >
                <X className="w-4 h-4" />
              </button>
            ) : (
              <button 
                onClick={isListening ? stopListening : startListening}
                className={`absolute right-2 p-2 rounded-xl transition-all ${
                  isListening 
                    ? "bg-red-500 text-white animate-pulse" 
                    : "text-[#6F4E37] bg-[#6F4E37]/10"
                }`}
              >
                <Mic className="w-4 h-4" />
              </button>
            )}
          </div>
          
          {error && (
            <div className="mt-2 flex items-center gap-1.5 text-xs text-red-500 bg-red-50 p-2 rounded-lg">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Content Area */}
        <div className="px-4 py-4">
          {!searchQuery.trim() ? (
            /* Empty State: Trending Keywords */
            <div className="mt-4">
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-500 mb-4">
                Trending Searches
              </h3>
              <div className="flex flex-wrap gap-2">
                {TRENDING_KEYWORDS.map((keyword) => (
                  <button
                    key={keyword}
                    onClick={() => setSearchQuery(keyword)}
                    className="px-4 py-2 bg-white border border-zinc-200 rounded-full text-xs font-bold text-zinc-700 hover:border-[#6F4E37] hover:text-[#6F4E37] transition-colors shadow-sm"
                  >
                    {keyword}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Search Results */
            <>
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
                  <Search className="w-8 h-8 text-zinc-300 mb-4" />
                  <p className="text-sm font-bold text-zinc-900 uppercase tracking-widest mb-2">
                    No items found
                  </p>
                  <p className="text-xs text-zinc-500 max-w-[200px]">
                    We couldn't find anything matching "{searchQuery}".
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Fixed Filter & Sort Bar (Only show if we have a search query, or maybe always. Let's show only if there is a query) */}
      {searchQuery.trim() && (
        <div className="fixed bottom-[64px] left-1/2 -translate-x-1/2 w-full max-w-md z-40 pb-safe">
          <div className="flex w-full">
            <FilterSortBottomSheet 
              currentFilters={filters}
              currentSortBy={sortBy}
              onApply={handleApplyFilters}
            />
          </div>
        </div>
      )}
    </AppPageLayout>
  );
}
