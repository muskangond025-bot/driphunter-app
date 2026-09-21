"use client";

import React, { useState, useEffect } from "react";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger, DrawerClose } from "@/components/ui/drawer";
import { SlidersHorizontal, X, Check } from "lucide-react";
import { FilterState } from "@/lib/filterLogic";

export interface MobileFilterSortProps {
  currentFilters: FilterState;
  currentSortBy: string;
  onApply: (filters: FilterState, sortBy: string) => void;
}

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
];

const BRANDS = ["Guerilla Culture", "Urban Combat", "Nike", "Outkast Lab", "DripHunter Originals", "Tokyo Techwear", "Element Streetwear", "Zara"];
const SIZES = ["XS", "S", "M", "L", "XL", "Free Size"];

export default function FilterSortBottomSheet({ currentFilters, currentSortBy, onApply }: MobileFilterSortProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  // Local temporary state
  const [localFilters, setLocalFilters] = useState<FilterState>(currentFilters);
  const [localSortBy, setLocalSortBy] = useState<string>(currentSortBy);

  // Sync state when opened
  useEffect(() => {
    if (isOpen) {
      setLocalFilters(currentFilters);
      setLocalSortBy(currentSortBy);
    }
  }, [isOpen, currentFilters, currentSortBy]);

  const handleApply = () => {
    onApply(localFilters, localSortBy);
    setIsOpen(false);
  };

  const clearFilters = () => {
    setLocalFilters({
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
    setLocalSortBy("featured");
  };

  const toggleBrand = (brand: string) => {
    const b = brand.toLowerCase();
    setLocalFilters((prev) => ({
      ...prev,
      selectedBrands: prev.selectedBrands.includes(b)
        ? prev.selectedBrands.filter((v) => v !== b)
        : [...prev.selectedBrands, b]
    }));
  };

  const toggleSize = (sz: string) => {
    const s = sz.toUpperCase();
    setLocalFilters((prev) => ({
      ...prev,
      selectedSizes: prev.selectedSizes.includes(s)
        ? prev.selectedSizes.filter((v) => v !== s)
        : [...prev.selectedSizes, s]
    }));
  };

  const activeFilterCount = 
    (currentFilters.inStockOnly ? 1 : 0) +
    currentFilters.selectedBrands.length +
    currentFilters.selectedSizes.length +
    (currentFilters.minPrice > 0 || currentFilters.maxPrice < 15000 ? 1 : 0);

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-white border-t border-zinc-200 text-xs font-bold uppercase tracking-wider text-zinc-900 active:bg-zinc-50 shadow-[0_-4px_12px_rgba(0,0,0,0.03)] z-40 relative h-[56px]">
          <SlidersHorizontal className="w-4 h-4" />
          Filter & Sort
          {activeFilterCount > 0 && (
            <span className="bg-[#6F4E37] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center leading-none">
              {activeFilterCount}
            </span>
          )}
        </button>
      </DrawerTrigger>

      <DrawerContent className="h-[85vh] flex flex-col bg-white">
        <div className="flex items-center justify-between px-4 py-4 border-b border-zinc-100">
          <DrawerTitle className="text-sm font-bold uppercase tracking-wider">
            Filter & Sort
          </DrawerTitle>
          <DrawerClose asChild>
            <button className="p-2 -mr-2 text-zinc-400 hover:text-black rounded-full bg-zinc-50">
              <X className="w-4 h-4" />
            </button>
          </DrawerClose>
        </div>

        <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 pb-32">
          {/* Sorting */}
          <section className="mb-8">
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-500 mb-3">
              Sort By
            </h3>
            <div className="space-y-2">
              {SORT_OPTIONS.map((opt) => {
                const isActive = localSortBy === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => setLocalSortBy(opt.value)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all ${
                      isActive
                        ? "border-[#6F4E37] bg-[#6F4E37]/5 text-[#6F4E37]"
                        : "border-zinc-200 bg-white text-zinc-700"
                    }`}
                  >
                    <span className="text-xs font-bold">{opt.label}</span>
                    {isActive && <Check className="w-4 h-4" />}
                  </button>
                );
              })}
            </div>
          </section>

          {/* In Stock */}
          <section className="mb-8 flex items-center justify-between">
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-500">
              In Stock Only
            </h3>
            <button
              onClick={() => setLocalFilters(p => ({ ...p, inStockOnly: !p.inStockOnly }))}
              className={`relative w-11 h-6 rounded-full transition-colors ${
                localFilters.inStockOnly ? "bg-[#6F4E37]" : "bg-zinc-200"
              }`}
            >
              <span className={`absolute left-1 top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                localFilters.inStockOnly ? "translate-x-5" : "translate-x-0"
              }`} />
            </button>
          </section>

          {/* Sizes */}
          <section className="mb-8">
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-500 mb-3">
              Sizes
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {SIZES.map((sz) => {
                const isActive = localFilters.selectedSizes.includes(sz.toUpperCase());
                return (
                  <button
                    key={sz}
                    onClick={() => toggleSize(sz)}
                    className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                      isActive
                        ? "border-[#6F4E37] bg-[#6F4E37] text-white shadow-md"
                        : "border-zinc-200 bg-white text-zinc-700"
                    }`}
                  >
                    {sz}
                  </button>
                );
              })}
            </div>
          </section>

          {/* Brands */}
          <section className="mb-8">
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-500 mb-3">
              Brands
            </h3>
            <div className="space-y-2">
              {BRANDS.map((brand) => {
                const isActive = localFilters.selectedBrands.includes(brand.toLowerCase());
                return (
                  <button
                    key={brand}
                    onClick={() => toggleBrand(brand)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all ${
                      isActive
                        ? "border-[#6F4E37] bg-[#6F4E37]/5 text-[#6F4E37]"
                        : "border-zinc-200 bg-white text-zinc-700"
                    }`}
                  >
                    <div className={`w-5 h-5 rounded border flex items-center justify-center ${
                      isActive ? "bg-[#6F4E37] border-[#6F4E37] text-white" : "border-zinc-300"
                    }`}>
                      {isActive && <Check className="w-3 h-3" />}
                    </div>
                    <span className="text-xs font-bold">{brand}</span>
                  </button>
                );
              })}
            </div>
          </section>
        </div>

        {/* Action Buttons */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-zinc-100 flex gap-3 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
          <button
            onClick={clearFilters}
            className="flex-1 py-3.5 px-4 rounded-2xl border border-zinc-200 text-xs font-bold uppercase tracking-widest text-zinc-900 active:bg-zinc-50"
          >
            Clear All
          </button>
          <button
            onClick={handleApply}
            className="flex-[2] py-3.5 px-4 rounded-2xl bg-[#6F4E37] text-white text-xs font-bold uppercase tracking-widest shadow-lg shadow-[#6F4E37]/20 active:scale-[0.98] transition-transform"
          >
            Apply Filters
          </button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
