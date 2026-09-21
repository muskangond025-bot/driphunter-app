"use client";

import React, { useState, useEffect, Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SearchOverlay from "@/components/layout/SearchOverlay";
import ProductCard from "@/components/product/ProductCard";
import { MOCK_PRODUCTS, LIMITED_DROPS, Product } from "@/data/mockData";
import { searchProducts, filterProducts, sortProducts, getFilterCounts } from "@/lib/filterLogic";
import { useCart } from "@/context/CartContext";
import {
  ChevronDown,
  SlidersHorizontal,
  RefreshCw,
  X,
  Plus,
  ShoppingBag,
  Eye,
  Heart,
  Star,
  Sparkles,
  Compass,
  ShieldCheck,
  Flame,
  ArrowRight,
  Check,
  ArrowUpDown
} from "lucide-react";
import PageContainer from "@/components/layout/PageContainer";

// Combine mock products and limited drops
const ALL_PRODUCTS = [
  ...MOCK_PRODUCTS,
  ...LIMITED_DROPS,
  ...MOCK_PRODUCTS.map((p) => ({ ...p, id: `${p.id}-d1` })),
  ...LIMITED_DROPS.map((p) => ({ ...p, id: `${p.id}-d1` })),
  ...MOCK_PRODUCTS.map((p) => ({ ...p, id: `${p.id}-d2` })),
  ...LIMITED_DROPS.map((p) => ({ ...p, id: `${p.id}-d2` }))
];

// Hotspot tagged items in the interactive lookbook - expanded to cover a head-to-toe styled outfit fit
const HOTSPOT_PRODUCTS = [
  {
    id: "p5", // Graphite Skate Cap
    x: 50,
    y: 15,
    name: "Graphite Skate Cap",
    price: 1299,
    brand: "DripHunter Originals",
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=400&auto=format&fit=crop"
  },
  {
    id: "p1", // Vandalism Heavyweight Hoodie
    x: 48,
    y: 35,
    name: "Vandalism Heavyweight Hoodie",
    price: 3499,
    brand: "Guerilla Culture",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=400&auto=format&fit=crop"
  },
  {
    id: "p2", // Parachute Cargo Pants - Sand
    x: 55,
    y: 70,
    name: "Parachute Cargo Pants - Sand",
    price: 2799,
    brand: "Urban Combat",
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=400&auto=format&fit=crop"
  },
  {
    id: "p3", // Court Vision Low Sneakers
    x: 52,
    y: 88,
    name: "Court Vision Low Sneakers",
    price: 5999,
    brand: "Nike",
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=400&auto=format&fit=crop"
  }
];

function ShopContent() {
  const searchParams = useSearchParams();
  const { toggleWishlist, isInWishlist, addToCart } = useCart();

  // Live countdown timer state (hours, minutes, seconds)
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 32, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 24, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Navigation / Drawer status
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [layoutMode, setLayoutMode] = useState<"grid-3" | "grid-4" | "editorial">("grid-4");
  const [selectedQuickViewProduct, setSelectedQuickViewProduct] = useState<Product | null>(null);
  
  // Quick View State (Inside modal)
  const [selectedQuickViewSize, setSelectedQuickViewSize] = useState<string>("M");
  const [selectedQuickViewColor, setSelectedQuickViewColor] = useState<string>("");
  const [quickViewAdded, setQuickViewAdded] = useState(false);

  // Active Hotspot
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  // Toast indicator
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Accordion expanded sections
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    PRICE: true,
    BRANDS: true,
    CATEGORY: true,
    SUB_CATEGORY: false,
    TYPE: false,
    SIZE: true,
    GENDER: false,
    COLOUR: true,
    PRIMARY_MATERIAL: false,
    AVAILABILITY: true,
  });

  // Filter States
  const [inStockOnly, setInStockOnly] = useState(false);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(15000);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
  const [selectedColours, setSelectedColours] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = layoutMode === "editorial" ? 8 : 14;

  // Toast trigger helper
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Toggle accordions
  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Sync with URL query parameters
  useEffect(() => {
    const categoryParam = searchParams.get("category")?.toLowerCase();
    const brandParam = searchParams.get("brand")?.toLowerCase();
    const searchParam = searchParams.get("search");

    if (categoryParam) {
      if (categoryParam === "tshirts" || categoryParam === "tees" || categoryParam === "t-shirts") {
        setSelectedSubCategories(["tshirts"]);
      } else if (categoryParam === "eyewear") {
        setSelectedSubCategories(["eyewear"]);
      } else if (categoryParam === "headwear" || categoryParam === "caps") {
        setSelectedSubCategories(["headwear"]);
      } else if (categoryParam === "bottoms" || categoryParam === "cargos" || categoryParam === "bottom-wear") {
        setSelectedCategories(["bottom-wear"]);
      } else if (categoryParam === "accessories") {
        setSelectedCategories(["accessories"]);
      } else if (categoryParam === "backpacks" || categoryParam === "bags") {
        setSelectedSubCategories(["backpacks"]);
      } else if (categoryParam === "wallets") {
        setSelectedSubCategories(["wallets"]);
      } else if (categoryParam === "shirts") {
        setSelectedSubCategories(["shirts"]);
      } else if (categoryParam === "hoodies") {
        setSelectedSubCategories(["hoodies"]);
      } else if (categoryParam === "skateboards" || categoryParam === "skate") {
        setSelectedCategories(["skate"]);
      } else if (categoryParam === "clothing") {
        setSelectedCategories(["top-wear", "bottom-wear"]);
      } else if (categoryParam === "jackets") {
        setSelectedCategories(["top-wear"]);
        setSelectedSubCategories(["clothing"]);
      } else {
        setSelectedCategories([categoryParam]);
      }
    }

    if (brandParam) {
      setSelectedBrands([brandParam]);
    }

    if (searchParam) {
      setSearchQuery(searchParam);
    }
  }, [searchParams]);

  // Reset pagination on filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [
    inStockOnly,
    selectedPriceRanges,
    minPrice,
    maxPrice,
    selectedBrands,
    selectedCategories,
    selectedSubCategories,
    selectedTypes,
    selectedSizes,
    selectedGenders,
    selectedColours,
    selectedMaterials,
    searchQuery,
    sortBy,
    layoutMode
  ]);

  // Set default Quick View specs when active product changes
  useEffect(() => {
    if (selectedQuickViewProduct) {
      setSelectedQuickViewSize(selectedQuickViewProduct.sizes?.[0] || "M");
      setSelectedQuickViewColor(selectedQuickViewProduct.colors?.[0] || "Charcoal");
      setQuickViewAdded(false);
    }
  }, [selectedQuickViewProduct]);

  // Dynamic Item Count Helpers
  const filterCounts = getFilterCounts(ALL_PRODUCTS);
  const {
    getCountForBrand,
    getCountForCategory,
    getCountForSubCategory,
    getCountForType,
    getCountForSize,
    getCountForGender,
    getCountForColour,
    getCountForMaterial,
    getCountForPriceRange,
    inStockCount
  } = filterCounts;

  // Active filter count
  const activeFilterCount = 
    (inStockOnly ? 1 : 0) +
    selectedPriceRanges.length +
    selectedBrands.length +
    selectedCategories.length +
    selectedSubCategories.length +
    selectedTypes.length +
    selectedSizes.length +
    selectedGenders.length +
    selectedColours.length +
    selectedMaterials.length +
    (searchQuery ? 1 : 0);

  // Filtering Logic
  const searchedProducts = searchProducts(ALL_PRODUCTS, searchQuery);
  const filteredProducts = filterProducts(searchedProducts, {
    inStockOnly,
    selectedPriceRanges,
    minPrice,
    maxPrice,
    selectedBrands,
    selectedCategories,
    selectedSubCategories,
    selectedTypes,
    selectedSizes,
    selectedGenders,
    selectedColours,
    selectedMaterials
  });

  // Sorting Logic
  const sortedProducts = sortProducts(filteredProducts, sortBy);

  // Pagination Calculations
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage) || 1;
  const paginatedProducts = sortedProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const clearFilters = () => {
    setInStockOnly(false);
    setSelectedPriceRanges([]);
    setMinPrice(0);
    setMaxPrice(15000);
    setSelectedBrands([]);
    setSelectedCategories([]);
    setSelectedSubCategories([]);
    setSelectedTypes([]);
    setSelectedSizes([]);
    setSelectedGenders([]);
    setSelectedColours([]);
    setSelectedMaterials([]);
    setSearchQuery("");
    setSortBy("featured");
    
    // Clear URL parameters
    window.history.replaceState({}, "", window.location.pathname);
    triggerToast("Filters reset successfully");
  };

  const handleToggleCategory = (cat: string) => {
    setSelectedCategories((prev) => {
      const exists = prev.includes(cat.toLowerCase());
      const updated = exists ? prev.filter((v) => v !== cat.toLowerCase()) : [cat.toLowerCase()];
      triggerToast(exists ? `Cleared ${cat} category` : `Filtered by ${cat}`);
      return updated;
    });
  };

  // Add to Wishlist wrapper
  const handleToggleWishlist = (product: Product) => {
    toggleWishlist({
      id: product.id,
      name: product.title,
      brand: product.brand,
      price: `₹${product.price}`,
      image: product.image
    });
    const liked = isInWishlist(product.id);
    triggerToast(liked ? `Removed ${product.title} from Wishlist` : `Added ${product.title} to Wishlist`);
  };

  // Quick Add to Cart (Default specs)
  const handleQuickAddToCart = (product: Product) => {
    if (!product.inStock) return;
    const defaultSize = product.sizes?.[0] || "L";
    const defaultColor = product.colors?.[0] || "Charcoal";
    addToCart({
      id: product.id,
      name: product.title,
      brand: product.brand,
      price: product.price,
      image: product.image,
      size: defaultSize,
      color: defaultColor
    });
    triggerToast(`Added ${product.title} (${defaultSize}) to Shopping Bag`);
  };

  // Quick Add with Size Choice
  const handleQuickAddToCartWithSize = (product: Product, size: string) => {
    if (!product.inStock) return;
    const defaultColor = product.colors?.[0] || "Charcoal";
    addToCart({
      id: product.id,
      name: product.title,
      brand: product.brand,
      price: product.price,
      image: product.image,
      size: size,
      color: defaultColor
    });
    triggerToast(`Added ${product.title} (${size}) to Shopping Bag`);
  };

  // Detailed modal Add To Cart
  const handleModalAddToCart = () => {
    if (!selectedQuickViewProduct) return;
    addToCart({
      id: selectedQuickViewProduct.id,
      name: selectedQuickViewProduct.title,
      brand: selectedQuickViewProduct.brand,
      price: selectedQuickViewProduct.price,
      image: selectedQuickViewProduct.image,
      size: selectedQuickViewSize,
      color: selectedQuickViewColor
    });
    setQuickViewAdded(true);
    triggerToast(`Added ${selectedQuickViewProduct.title} to Shopping Bag`);
    setTimeout(() => {
      setQuickViewAdded(false);
    }, 1500);
  };

  // Culture-Circle Custom Luxury Checkbox Row
  const renderCustomCheckbox = (isChecked: boolean, onChange: () => void, label: string, count: number, keyVal?: string) => {
    return (
      <div 
        key={keyVal}
        onClick={onChange}
        className={`group flex items-center justify-between px-2.5 py-1.5 rounded-xl cursor-pointer select-none transition-all duration-200 ${
          isChecked 
            ? "bg-stone-100/80 dark:bg-zinc-800/80 text-zinc-950 dark:text-white" 
            : "hover:bg-stone-50 dark:hover:bg-zinc-800/40 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
        }`}
      >
        <div className="flex items-center gap-2.5">
          <span className={`w-4 h-4 rounded-[6px] border transition-all duration-200 flex items-center justify-center ${
            isChecked 
              ? "border-[#6F4E37] bg-[#6F4E37] dark:border-[#E6C280] dark:bg-[#E6C280] text-white dark:text-zinc-950 shadow-xs" 
              : "border-stone-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 group-hover:border-stone-400 dark:group-hover:border-zinc-600"
          }`}>
            {isChecked && <Check className="w-2.5 h-2.5 stroke-[3]" />}
          </span>
          <span className="text-xs font-medium tracking-tight">
            {label}
          </span>
        </div>
        <span className="font-mono text-[9px] text-zinc-400 dark:text-zinc-500 font-semibold group-hover:text-zinc-600 dark:group-hover:text-zinc-300">
          {count}
        </span>
      </div>
    );
  };

  // Culture-Circle Sidebar Filters Content
  const renderSidebarContent = () => (
    <div className="space-y-5 text-left pb-6 select-none">
      
      {/* Instant Search Bar */}
      <div className="pb-4 border-b border-stone-200/80 dark:border-zinc-800">
        <span className="text-[9px] font-mono font-bold uppercase tracking-[0.25em] text-[#6F4E37] dark:text-[#E6C280] block mb-2">
          Search Drops
        </span>
        <div className="relative">
          <input
            type="text"
            placeholder="Search hoodies, cargos, shoes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-stone-50 dark:bg-zinc-900/90 border border-stone-200 dark:border-zinc-750 rounded-xl pl-3.5 pr-8 py-2 text-xs font-medium text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:border-[#6F4E37] dark:focus:border-[#E6C280] focus:bg-white dark:focus:bg-zinc-900 focus:outline-none transition-all"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery("")} 
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 dark:hover:text-white cursor-pointer p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* In Stock Toggle (Culture-Circle Live Switch) */}
      <div className="pb-4 border-b border-stone-200/80 dark:border-zinc-800 flex items-center justify-between py-1">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-zinc-900 dark:text-zinc-100 block">
            In Stock Only
          </span>
          <span className="text-[8.5px] font-mono text-zinc-400 dark:text-zinc-500 block">
            {inStockCount} items available
          </span>
        </div>
        <button
          onClick={() => setInStockOnly(!inStockOnly)}
          className={`relative w-10 h-5.5 rounded-full transition-colors duration-300 p-0.5 cursor-pointer border ${
            inStockOnly
              ? "bg-[#6F4E37] dark:bg-[#E6C280] border-transparent"
              : "bg-stone-200 dark:bg-zinc-800 border-stone-300 dark:border-zinc-700"
          }`}
          aria-label="Toggle in stock only"
        >
          <span className={`block w-4 h-4 rounded-full bg-white dark:bg-zinc-950 shadow-xs transition-transform duration-300 ${
            inStockOnly ? "translate-x-4.5" : "translate-x-0"
          }`} />
        </button>
      </div>

      {/* Collections / Categories */}
      <div className="pb-4 border-b border-stone-200/80 dark:border-zinc-800">
        <button
          onClick={() => toggleSection("CATEGORY")}
          className="w-full flex justify-between items-center text-left py-1 cursor-pointer font-sans"
        >
          <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-zinc-900 dark:text-zinc-100">
            Collections
          </span>
          <ChevronDown className={`w-3.5 h-3.5 text-zinc-400 transition-transform duration-300 ${
            expandedSections.CATEGORY ? "rotate-180 text-zinc-900 dark:text-white" : ""
          }`} />
        </button>
        {expandedSections.CATEGORY && (
          <div className="mt-2 space-y-0.5">
            {[
              { value: "top-wear", label: "Top Wear" },
              { value: "bottom-wear", label: "Bottom Wear" },
              { value: "sneakers", label: "Sneakers" },
              { value: "accessories", label: "Accessories" },
              { value: "skate", label: "Skate" },
              { value: "limited-drops", label: "Limited Drops" }
            ].map((opt) => {
              const count = getCountForCategory(opt.value);
              const isChecked = selectedCategories.includes(opt.value);
              return renderCustomCheckbox(
                isChecked,
                () => {
                  setSelectedCategories((prev) =>
                    prev.includes(opt.value) ? prev.filter((v) => v !== opt.value) : [...prev, opt.value]
                  );
                },
                opt.label,
                count,
                opt.value
              );
            })}
          </div>
        )}
      </div>

      {/* Brands Filter */}
      <div className="pb-4 border-b border-stone-200/80 dark:border-zinc-800">
        <button
          onClick={() => toggleSection("BRANDS")}
          className="w-full flex justify-between items-center text-left py-1 cursor-pointer font-sans"
        >
          <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-zinc-900 dark:text-zinc-100">
            Brand Ateliers
          </span>
          <ChevronDown className={`w-3.5 h-3.5 text-zinc-400 transition-transform duration-300 ${
            expandedSections.BRANDS ? "rotate-180 text-zinc-900 dark:text-white" : ""
          }`} />
        </button>
        {expandedSections.BRANDS && (
          <div className="mt-2 space-y-0.5">
            {["Guerilla Culture", "Urban Combat", "Nike", "Outkast Lab", "DripHunter Originals", "Tokyo Techwear", "Element Streetwear", "Zara"].map((brand) => {
              const count = getCountForBrand(brand);
              const isChecked = selectedBrands.includes(brand.toLowerCase());
              return renderCustomCheckbox(
                isChecked,
                () => {
                  setSelectedBrands((prev) =>
                    prev.includes(brand.toLowerCase())
                      ? prev.filter((v) => v !== brand.toLowerCase())
                      : [...prev, brand.toLowerCase()]
                  );
                },
                brand,
                count,
                brand
              );
            })}
          </div>
        )}
      </div>

      {/* Price Range Slider */}
      <div className="pb-4 border-b border-stone-200/80 dark:border-zinc-800">
        <button
          onClick={() => toggleSection("PRICE")}
          className="w-full flex justify-between items-center text-left py-1 cursor-pointer font-sans"
        >
          <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-zinc-900 dark:text-zinc-100">
            Price Range
          </span>
          <ChevronDown className={`w-3.5 h-3.5 text-zinc-400 transition-transform duration-300 ${
            expandedSections.PRICE ? "rotate-180 text-zinc-900 dark:text-white" : ""
          }`} />
        </button>
        {expandedSections.PRICE && (
          <div className="mt-3 space-y-3 px-1">
            <div className="relative w-full py-4 select-none px-1">
              <div className="relative h-2 w-full bg-stone-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                <div 
                  className="absolute h-full bg-[#6F4E37] dark:bg-[#E6C280] rounded-full transition-all duration-75" 
                  style={{
                    left: `${(minPrice / 15000) * 100}%`,
                    width: `${Math.max(0, ((maxPrice - minPrice) / 15000) * 100)}%`
                  }}
                />
              </div>

              {/* Min range input */}
              <input
                type="range"
                min="0"
                max="15000"
                step="250"
                value={minPrice}
                onChange={(e) => {
                  const val = Math.min(Number(e.target.value), maxPrice - 500);
                  setMinPrice(val);
                }}
                className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-6 w-full appearance-none bg-transparent pointer-events-none focus:outline-none z-30 [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-4.5 [&::-webkit-slider-thumb]:h-4.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#6F4E37] dark:[&::-webkit-slider-thumb]:bg-[#E6C280] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white dark:[&::-webkit-slider-thumb]:border-zinc-900 [&::-webkit-slider-thumb]:cursor-grab active:[&::-webkit-slider-thumb]:cursor-grabbing [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:appearance-none [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-4.5 [&::-moz-range-thumb]:h-4.5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#6F4E37] dark:[&::-moz-range-thumb]:bg-[#E6C280] [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white dark:[&::-moz-range-thumb]:border-zinc-900 [&::-moz-range-thumb]:cursor-grab [&::-moz-range-thumb]:shadow-md"
              />

              {/* Max range input */}
              <input
                type="range"
                min="0"
                max="15000"
                step="250"
                value={maxPrice}
                onChange={(e) => {
                  const val = Math.max(Number(e.target.value), minPrice + 500);
                  setMaxPrice(val);
                }}
                className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-6 w-full appearance-none bg-transparent pointer-events-none focus:outline-none z-30 [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-4.5 [&::-webkit-slider-thumb]:h-4.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#6F4E37] dark:[&::-webkit-slider-thumb]:bg-[#E6C280] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white dark:[&::-webkit-slider-thumb]:border-zinc-900 [&::-webkit-slider-thumb]:cursor-grab active:[&::-webkit-slider-thumb]:cursor-grabbing [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:appearance-none [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-4.5 [&::-moz-range-thumb]:h-4.5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#6F4E37] dark:[&::-moz-range-thumb]:bg-[#E6C280] [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white dark:[&::-moz-range-thumb]:border-zinc-900 [&::-moz-range-thumb]:cursor-grab [&::-moz-range-thumb]:shadow-md"
              />

              <div className="flex justify-between items-center text-[9.5px] font-mono text-zinc-500 dark:text-zinc-400 mt-4 font-bold">
                <span className="bg-stone-100 dark:bg-zinc-800 px-2 py-0.5 rounded-md border border-stone-200 dark:border-zinc-700">₹{minPrice.toLocaleString()}</span>
                <span className="bg-stone-100 dark:bg-zinc-800 px-2 py-0.5 rounded-md border border-stone-200 dark:border-zinc-700">₹{maxPrice.toLocaleString()}</span>
              </div>
            </div>

            <div className="space-y-0.5">
              {[
                { value: "under-2000", label: "Under ₹2,000" },
                { value: "2000-5000", label: "₹2,000 - ₹5,000" },
                { value: "5000-10000", label: "₹5,000 - ₹10,000" },
                { value: "over-10000", label: "Over ₹10,000" }
              ].map((opt) => {
                const count = getCountForPriceRange(opt.value);
                const isChecked = selectedPriceRanges.includes(opt.value);
                return renderCustomCheckbox(
                  isChecked,
                  () => {
                    setSelectedPriceRanges((prev) =>
                      prev.includes(opt.value) ? prev.filter((v) => v !== opt.value) : [...prev, opt.value]
                    );
                  },
                  opt.label,
                  count,
                  opt.value
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Sizes Grid */}
      <div className="pb-4 border-b border-stone-200/80 dark:border-zinc-800">
        <button
          onClick={() => toggleSection("SIZE")}
          className="w-full flex justify-between items-center text-left py-1 cursor-pointer font-sans"
        >
          <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-zinc-900 dark:text-zinc-100">
            Sizes
          </span>
          <ChevronDown className={`w-3.5 h-3.5 text-zinc-400 transition-transform duration-300 ${
            expandedSections.SIZE ? "rotate-180 text-zinc-900 dark:text-white" : ""
          }`} />
        </button>
        {expandedSections.SIZE && (
          <div className="grid grid-cols-3 gap-1.5 mt-2.5">
            {["XS", "S", "M", "L", "XL", "Free Size"].map((sz) => {
              const count = getCountForSize(sz);
              const isChecked = selectedSizes.includes(sz.toUpperCase());
              return (
                <button
                  key={sz}
                  onClick={() => {
                    setSelectedSizes((prev) =>
                      prev.includes(sz.toUpperCase())
                        ? prev.filter((v) => v !== sz.toUpperCase())
                        : [...prev, sz.toUpperCase()]
                    );
                  }}
                  className={`h-9 rounded-xl border text-[10px] font-mono font-bold transition-all cursor-pointer flex flex-col items-center justify-center ${
                    isChecked
                      ? "bg-[#6F4E37] text-white border-[#6F4E37] dark:bg-[#E6C280] dark:text-zinc-950 dark:border-[#E6C280] shadow-xs"
                      : "bg-white text-zinc-700 border-stone-200 hover:border-stone-400 dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-800 dark:hover:border-zinc-700"
                  }`}
                >
                  <span>{sz}</span>
                  <span className={`text-[7px] font-mono leading-none mt-0.5 ${isChecked ? "text-white/80 dark:text-zinc-800" : "text-zinc-400"}`}>
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Colors Swatch Chips */}
      <div className="pb-4 border-b border-stone-200/80 dark:border-zinc-800">
        <button
          onClick={() => toggleSection("COLOUR")}
          className="w-full flex justify-between items-center text-left py-1 cursor-pointer font-sans"
        >
          <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-zinc-900 dark:text-zinc-100">
            Color Palette
          </span>
          <ChevronDown className={`w-3.5 h-3.5 text-zinc-400 transition-transform duration-300 ${
            expandedSections.COLOUR ? "rotate-180 text-zinc-900 dark:text-white" : ""
          }`} />
        </button>
        {expandedSections.COLOUR && (
          <div className="mt-2 space-y-0.5">
            {["Charcoal", "Sand", "Olive", "Black", "White", "Red", "Blue", "Pink"].map((col) => {
              const count = getCountForColour(col);
              const isChecked = selectedColours.includes(col.toLowerCase());
              return renderCustomCheckbox(
                isChecked,
                () => {
                  setSelectedColours((prev) =>
                    prev.includes(col.toLowerCase())
                      ? prev.filter((v) => v !== col.toLowerCase())
                      : [...prev, col.toLowerCase()]
                  );
                },
                col,
                count,
                col
              );
            })}
          </div>
        )}
      </div>

      {/* Sub Categories */}
      <div className="pb-4 border-b border-stone-200/80 dark:border-zinc-800">
        <button
          onClick={() => toggleSection("SUB_CATEGORY")}
          className="w-full flex justify-between items-center text-left py-1 cursor-pointer font-sans"
        >
          <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-zinc-900 dark:text-zinc-100">
            Apparel Type
          </span>
          <ChevronDown className={`w-3.5 h-3.5 text-zinc-400 transition-transform duration-300 ${
            expandedSections.SUB_CATEGORY ? "rotate-180 text-zinc-900 dark:text-white" : ""
          }`} />
        </button>
        {expandedSections.SUB_CATEGORY && (
          <div className="mt-2 space-y-0.5">
            {[
              { value: "hoodies", label: "Hoodies" },
              { value: "tshirts", label: "Tees & T-Shirts" },
              { value: "shirts", label: "Oversized Shirts" },
              { value: "cargos", label: "Tactical Cargos" },
              { value: "clothing", label: "Windbreakers" },
              { value: "backpacks", label: "Backpacks" },
              { value: "headwear", label: "Caps & Headwear" },
              { value: "eyewear", label: "Sunglasses" },
              { value: "skateboards", label: "Skate Decks" }
            ].map((opt) => {
              const count = getCountForSubCategory(opt.value);
              const isChecked = selectedSubCategories.includes(opt.value);
              return renderCustomCheckbox(
                isChecked,
                () => {
                  setSelectedSubCategories((prev) =>
                    prev.includes(opt.value) ? prev.filter((v) => v !== opt.value) : [...prev, opt.value]
                  );
                },
                opt.label,
                count,
                opt.value
              );
            })}
          </div>
        )}
      </div>

    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-[#FCFAF7] dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 select-none antialiased font-sans">
      <Navbar onSearchClick={() => setIsSearchOpen(true)} />
      
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      {/* Floating Toast notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#18181b] text-white px-5 py-3 rounded-2xl font-semibold shadow-2xl flex items-center gap-2.5 border border-white/10 animate-fade-in text-xs tracking-wide">
          <Check className="h-4.5 w-4.5 text-[#6F4E37]" />
          {toastMessage}
        </div>
      )}

      <PageContainer className="flex-grow py-6 sm:py-8">
        
        {/* ========================================================================= */}
        {/* PREMIUM FULL-WIDTH OUTFIT FASHION HERO BANNER                              */}
        {/* ========================================================================= */}
        <div className="relative w-full overflow-hidden bg-[#D5B393] rounded-[20px] sm:rounded-[32px] min-h-[340px] md:min-h-[440px] flex items-center mb-6 sm:mb-10 shadow-lg border border-zinc-200/10 select-none">
          
          {/* Right side: Styled Fashion Model Image */}
          <div className="absolute right-0 bottom-0 top-0 w-full md:w-1/2 h-full z-0 select-none pointer-events-none">
            <div className="relative w-full h-full">
              <Image
                src="/shop_hero_fashion_model.jpg"
                alt="Outfit Fashion lookbook model"
                fill
                className="object-cover object-center md:object-right select-none"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Fade gradient overlay on mobile to keep text on left highly readable */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#D5B393] via-[#D5B393]/70 to-transparent md:hidden" />
              {/* Subtle transition gradient for desktop */}
              <div className="absolute left-0 bottom-0 top-0 w-32 bg-gradient-to-r from-[#D5B393] to-transparent hidden md:block" />
            </div>
          </div>

          {/* Left side: Editorial Typography */}
          <div className="relative z-10 pl-5 pr-4 sm:pl-16 md:pl-20 py-10 sm:py-12 max-w-lg md:max-w-xl text-left select-none pointer-events-auto">
            <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.3em] text-[#6F4E37] uppercase block mb-3 leading-none">
              DripHunter Archive
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-zinc-950 dark:text-zinc-50 font-playfair leading-[1.05]">
              Outfit <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280]">Fashion</span>
            </h1>
            <p className="text-[13px] sm:text-[16px] md:text-[20px] text-[#4E392F]/80 font-sans font-light tracking-wide mt-4 block leading-none">
              curated silhouettes for every occasion
            </p>
            
            <button
              onClick={() => {
                document.getElementById("catalog-section")?.scrollIntoView({ behavior: "smooth" });
                triggerToast("Exploring fashion catalog drops!");
              }}
              className="inline-block bg-white hover:bg-[#FDFBF7] text-[#6F4E37] hover:text-[#4E392F] text-[10px] sm:text-xs font-sans font-extrabold uppercase tracking-widest px-8 py-3.5 rounded-xl shadow-lg shadow-black/5 hover:shadow-xl transition-all duration-300 mt-8 cursor-pointer border-none active:scale-95"
            >
              Shop the Collection
            </button>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* LUXURY CATEGORY NAVIGATION PILL BAR (STICKY ON SCROLL)                    */}
        {/* ========================================================================= */}
        <div id="catalog-section" className="sticky top-[86px] sm:top-[90px] md:top-[92px] z-40 bg-[#FAF8F5] dark:bg-zinc-950 py-3.5 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 border-b border-stone-200/90 dark:border-zinc-800/90 shadow-xs mb-8 transition-all">
          <div className="flex items-center justify-between gap-4 w-full">
            
            {/* Category Pill Tabs */}
            <div className="overflow-x-auto scrollbar-none flex-1 snap-x snap-mandatory scroll-smooth">
              <div className="flex items-center gap-2.5 min-w-max">
                {[
                  { id: "all", label: "All Pieces" },
                  { id: "top-wear", label: "Top Wear" },
                  { id: "bottom-wear", label: "Bottom Wear" },
                  { id: "sneakers", label: "Sneakers" },
                  { id: "accessories", label: "Accessories" },
                  { id: "skate", label: "Skate" },
                  { id: "limited-drops", label: "Limited Drops" }
                ].map((tab) => {
                  const isSelected = tab.id === "all" 
                    ? selectedCategories.length === 0 
                    : selectedCategories.includes(tab.id);
                  
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        if (tab.id === "all") {
                          setSelectedCategories([]);
                        } else {
                          setSelectedCategories([tab.id]);
                        }
                      }}
                      className={`snap-start px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl text-[9.5px] sm:text-[10.5px] font-mono font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer border select-none ${
                        isSelected
                          ? "border-[#6F4E37] bg-[#6F4E37] text-white shadow-md dark:border-[#E6C280] dark:bg-[#E6C280] dark:text-zinc-950"
                          : "border-stone-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 text-zinc-600 dark:text-zinc-400 hover:border-stone-400 hover:text-zinc-900 dark:hover:border-zinc-700 dark:hover:text-white shadow-xs"
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right side pieces count badge */}
            <div className="hidden lg:flex items-center gap-2 shrink-0 bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 px-4 py-2 rounded-2xl shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[9.5px] font-mono font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                {sortedProducts.length} Authenticated Pieces
              </span>
            </div>

          </div>
        </div>

        {/* Selected Filter Tags */}
        {(inStockOnly || selectedPriceRanges.length > 0 || selectedBrands.length > 0 || selectedCategories.length > 0 || selectedSubCategories.length > 0 || selectedTypes.length > 0 || selectedSizes.length > 0 || selectedGenders.length > 0 || selectedColours.length > 0 || selectedMaterials.length > 0 || searchQuery) && (
          <div className="flex flex-wrap items-center gap-2 mb-8 bg-zinc-50 dark:bg-zinc-900/60 p-4.5 rounded-2xl border border-zinc-200/60 dark:border-zinc-800/80 text-left animate-fade-in dark:backdrop-blur-md">
            <span className="text-[9px] font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-wider font-bold mr-1">
              Active Filters:
            </span>
            {inStockOnly && (
              <span className="bg-white dark:bg-zinc-800/90 border border-zinc-200 dark:border-zinc-700/80 text-zinc-700 dark:text-zinc-200 px-3 py-1.5 rounded-full text-[9px] font-mono font-bold uppercase flex items-center gap-1.5 shadow-xs hover:border-[#6F4E37] dark:hover:border-[#E6C280] transition-all">
                In Stock Only
                <X className="w-3 h-3 text-zinc-400 hover:text-zinc-800 dark:hover:text-white cursor-pointer" onClick={() => setInStockOnly(false)} />
              </span>
            )}
            {selectedPriceRanges.map((val) => (
              <span key={val} className="bg-white dark:bg-zinc-800/90 border border-zinc-200 dark:border-zinc-700/80 text-zinc-700 dark:text-zinc-200 px-3 py-1.5 rounded-full text-[9px] font-mono font-bold uppercase flex items-center gap-1.5 shadow-xs hover:border-[#6F4E37] dark:hover:border-[#E6C280] transition-all">
                Price: {val.replace("-", " to ")}
                <X className="w-3 h-3 text-zinc-400 hover:text-zinc-800 dark:hover:text-white cursor-pointer" onClick={() => setSelectedPriceRanges(prev => prev.filter(v => v !== val))} />
              </span>
            ))}
            {selectedBrands.map((val) => (
              <span key={val} className="bg-white dark:bg-zinc-800/90 border border-zinc-200 dark:border-zinc-700/80 text-zinc-700 dark:text-zinc-200 px-3 py-1.5 rounded-full text-[9px] font-mono font-bold uppercase flex items-center gap-1.5 shadow-xs hover:border-[#6F4E37] dark:hover:border-[#E6C280] transition-all">
                Brand: {val}
                <X className="w-3 h-3 text-zinc-400 hover:text-zinc-800 dark:hover:text-white cursor-pointer" onClick={() => setSelectedBrands(prev => prev.filter(v => v !== val))} />
              </span>
            ))}
            {selectedCategories.map((val) => (
              <span key={val} className="bg-white dark:bg-zinc-800/90 border border-zinc-200 dark:border-zinc-700/80 text-zinc-700 dark:text-zinc-200 px-3 py-1.5 rounded-full text-[9px] font-mono font-bold uppercase flex items-center gap-1.5 shadow-xs hover:border-[#6F4E37] dark:hover:border-[#E6C280] transition-all">
                Category: {val}
                <X className="w-3 h-3 text-zinc-400 hover:text-zinc-800 dark:hover:text-white cursor-pointer" onClick={() => setSelectedCategories(prev => prev.filter(v => v !== val))} />
              </span>
            ))}
            {selectedSubCategories.map((val) => (
              <span key={val} className="bg-white dark:bg-zinc-800/90 border border-zinc-200 dark:border-zinc-700/80 text-zinc-700 dark:text-zinc-200 px-3 py-1.5 rounded-full text-[9px] font-mono font-bold uppercase flex items-center gap-1.5 shadow-xs hover:border-[#6F4E37] dark:hover:border-[#E6C280] transition-all">
                {val}
                <X className="w-3 h-3 text-zinc-400 hover:text-zinc-800 dark:hover:text-white cursor-pointer" onClick={() => setSelectedSubCategories(prev => prev.filter(v => v !== val))} />
              </span>
            ))}
            {selectedTypes.map((val) => (
              <span key={val} className="bg-white dark:bg-zinc-800/90 border border-zinc-200 dark:border-zinc-700/80 text-zinc-700 dark:text-zinc-200 px-3 py-1.5 rounded-full text-[9px] font-mono font-bold uppercase flex items-center gap-1.5 shadow-xs hover:border-[#6F4E37] dark:hover:border-[#E6C280] transition-all">
                Type: {val}
                <X className="w-3 h-3 text-zinc-400 hover:text-zinc-800 dark:hover:text-white cursor-pointer" onClick={() => setSelectedTypes(prev => prev.filter(v => v !== val))} />
              </span>
            ))}
            {selectedSizes.map((val) => (
              <span key={val} className="bg-white dark:bg-zinc-800/90 border border-zinc-200 dark:border-zinc-700/80 text-zinc-700 dark:text-zinc-200 px-3 py-1.5 rounded-full text-[9px] font-mono font-bold uppercase flex items-center gap-1.5 shadow-xs hover:border-[#6F4E37] dark:hover:border-[#E6C280] transition-all">
                Size: {val}
                <X className="w-3 h-3 text-zinc-400 hover:text-zinc-800 dark:hover:text-white cursor-pointer" onClick={() => setSelectedSizes(prev => prev.filter(v => v !== val))} />
              </span>
            ))}
            {selectedGenders.map((val) => (
              <span key={val} className="bg-white dark:bg-zinc-800/90 border border-zinc-200 dark:border-zinc-700/80 text-zinc-700 dark:text-zinc-200 px-3 py-1.5 rounded-full text-[9px] font-mono font-bold uppercase flex items-center gap-1.5 shadow-xs hover:border-[#6F4E37] dark:hover:border-[#E6C280] transition-all">
                Gender: {val}
                <X className="w-3 h-3 text-zinc-400 hover:text-zinc-800 dark:hover:text-white cursor-pointer" onClick={() => setSelectedGenders(prev => prev.filter(v => v !== val))} />
              </span>
            ))}
            {selectedColours.map((val) => (
              <span key={val} className="bg-white dark:bg-zinc-800/90 border border-zinc-200 dark:border-zinc-700/80 text-zinc-700 dark:text-zinc-200 px-3 py-1.5 rounded-full text-[9px] font-mono font-bold uppercase flex items-center gap-1.5 shadow-xs hover:border-[#6F4E37] dark:hover:border-[#E6C280] transition-all">
                Color: {val}
                <X className="w-3 h-3 text-zinc-400 hover:text-zinc-800 dark:hover:text-white cursor-pointer" onClick={() => setSelectedColours(prev => prev.filter(v => v !== val))} />
              </span>
            ))}
            {selectedMaterials.map((val) => (
              <span key={val} className="bg-white dark:bg-zinc-800/90 border border-zinc-200 dark:border-zinc-700/80 text-zinc-700 dark:text-zinc-200 px-3 py-1.5 rounded-full text-[9px] font-mono font-bold uppercase flex items-center gap-1.5 shadow-xs hover:border-[#6F4E37] dark:hover:border-[#E6C280] transition-all">
                Material: {val}
                <X className="w-3 h-3 text-zinc-400 hover:text-zinc-800 dark:hover:text-white cursor-pointer" onClick={() => setSelectedMaterials(prev => prev.filter(v => v !== val))} />
              </span>
            ))}
            {searchQuery && (
              <span className="bg-white dark:bg-zinc-800/90 border border-zinc-200 dark:border-zinc-700/80 text-zinc-700 dark:text-zinc-200 px-3 py-1.5 rounded-full text-[9px] font-mono font-bold flex items-center gap-1.5 shadow-xs hover:border-[#6F4E37] dark:hover:border-[#E6C280] transition-all">
                Search: "{searchQuery}"
                <X className="w-3 h-3 text-zinc-400 hover:text-zinc-800 dark:hover:text-white cursor-pointer" onClick={() => setSearchQuery("")} />
              </span>
            )}
            <button onClick={clearFilters} className="text-[9.5px] font-bold text-[#6F4E37] dark:text-[#E6C280] uppercase tracking-wider font-mono hover:opacity-80 transition-opacity cursor-pointer border-none bg-transparent ml-2">
              Clear All
            </button>
          </div>
        )}

        {/* 2-Column Responsive Layout (Sidebar + Products Grid) */}
        <div className="flex flex-col md:flex-row gap-8 lg:gap-10 items-start text-left">
          
          {/* LEFT SIDEBAR: Persistent luxury filter panel on desktop */}
          {isSidebarOpen && (
            <aside className="hidden md:block w-72 shrink-0 bg-white dark:bg-zinc-900/80 backdrop-blur-xl border border-stone-200/90 dark:border-zinc-800/80 rounded-[30px] p-6 shadow-sm sticky top-[165px] self-start max-h-[calc(100vh-180px)] overflow-y-auto scrollbar-thin transition-all">
              <div className="border-b border-stone-200/80 dark:border-zinc-800/80 pb-4 mb-5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-[#6F4E37] dark:text-[#E6C280] font-mono">
                    Filters &amp; Sort
                  </h2>
                  {activeFilterCount > 0 && (
                    <span className="bg-[#6F4E37] text-white text-[8px] font-mono font-bold px-1.5 py-0.5 rounded-full">
                      {activeFilterCount}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {activeFilterCount > 0 && (
                    <button
                      onClick={clearFilters}
                      className="text-[9px] font-mono text-zinc-400 hover:text-[#6F4E37] uppercase font-bold cursor-pointer transition-colors border-none bg-transparent"
                    >
                      Reset
                    </button>
                  )}
                  <button
                    onClick={() => setIsSidebarOpen(false)}
                    className="p-1 rounded-lg hover:bg-stone-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-800 dark:hover:text-white transition-colors cursor-pointer border-none bg-transparent"
                    title="Hide Filters"
                    aria-label="Hide Filters"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              {renderSidebarContent()}
            </aside>
          )}

          {/* RIGHT COLUMN: Toolbar & Grid */}
          <div className="flex-1 w-full">
            {/* Toolbar Header (Mobile filter button & Desktop stats/sort) */}
            <div className="flex items-center justify-between border-y border-stone-200/90 dark:border-zinc-800/80 py-3 sm:py-4 mb-5 sm:mb-7 gap-2">
              <div className="flex items-center gap-3">
                {/* Mobile Filters Drawer Trigger */}
                <button
                  onClick={() => setIsFilterDrawerOpen(true)}
                  className="flex items-center gap-1.5 sm:gap-2 border border-stone-300 dark:border-zinc-700 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 text-[10px] sm:text-xs font-bold text-zinc-800 dark:text-zinc-200 bg-white dark:bg-zinc-900 hover:bg-[#6F4E37] dark:hover:bg-[#E6C280] hover:text-white dark:hover:text-zinc-950 transition-all cursor-pointer shadow-xs active:scale-95 md:hidden font-mono"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>Filters {activeFilterCount > 0 ? `(${activeFilterCount})` : ""}</span>
                </button>

                {/* Desktop Filter Toggle Tab Button */}
                <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="hidden md:flex items-center gap-2 border border-stone-300 dark:border-zinc-700 rounded-full px-4 py-2 text-[11px] font-mono font-bold text-zinc-800 dark:text-zinc-200 bg-white dark:bg-zinc-900 hover:bg-[#6F4E37] dark:hover:bg-[#E6C280] hover:text-white dark:hover:text-zinc-950 transition-all cursor-pointer shadow-xs active:scale-95"
                  title={isSidebarOpen ? "Hide Filter Sidebar" : "Show Filter Sidebar"}
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>{isSidebarOpen ? "Hide Filters" : "Show Filters"} {activeFilterCount > 0 ? `(${activeFilterCount})` : ""}</span>
                </button>

                <span className="hidden md:inline-block text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500">
                  Showing {sortedProducts.length} Authenticated Pieces
                </span>
              </div>

              <div className="flex items-center gap-4">
                <div className="relative flex items-center">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none border border-stone-200/90 dark:border-zinc-800 rounded-2xl pl-3 pr-7 sm:pl-4.5 sm:pr-8 py-1.5 sm:py-2 text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-[0.15em] text-zinc-700 dark:text-zinc-200 bg-white dark:bg-zinc-900 hover:border-[#6F4E37] dark:hover:border-[#E6C280] focus:outline-none cursor-pointer shadow-xs transition-all"
                  >
                    <option value="featured">Best Selling</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Rating: High to Low</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400" />
                </div>
              </div>
            </div>

            {/* Products grid */}
            <div className="w-full">
              {sortedProducts.length > 0 ? (
                <div className="flex flex-col gap-10">
                  <div className={`grid gap-4 sm:gap-6 lg:gap-6 grid-flow-row-dense ${
                    isSidebarOpen 
                      ? "grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4" 
                      : "grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5"
                  }`}>
                    {paginatedProducts.flatMap((product, idx) => {
                      const cards = [
                        <ProductCard
                          key={product.id}
                          id={product.id}
                          name={product.title}
                          brand={product.brand}
                          price={`₹${product.price.toLocaleString()}`}
                          originalPrice={product.originalPrice ? `₹${product.originalPrice.toLocaleString()}` : undefined}
                          image={product.image}
                          hoverImage={product.hoverImage}
                          badge={product.isLimited ? "LIMITED" : (product.isNew ? "NEW" : (product.trendingScore && product.trendingScore > 95 ? "HOT" : undefined))}
                          inStock={product.inStock}
                          onQuickView={() => setSelectedQuickViewProduct(product)}
                        />
                      ];

                      if (idx === 3) {
                        cards.push(
                          <div 
                            key="promo-1"
                            className="col-span-2 relative h-full min-h-[300px] md:min-h-[360px] rounded-[30px] overflow-hidden border border-stone-200/90 dark:border-zinc-800 shadow-md group cursor-pointer"
                          >
                            <Image
                              src="https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?q=80&w=800"
                              alt="Streetwear Promo Lookbook"
                              fill
                              className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                              sizes="(max-width: 768px) 100vw, 50vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                            <div className="absolute inset-0 p-7 flex flex-col justify-end text-left space-y-2">
                              <span className="text-[9px] font-mono text-[#D4AF37] uppercase tracking-[0.25em] font-bold">
                                ✦ CAPSULE 04 // VAULT ARCHIVE
                              </span>
                              <h3 className="text-white text-xl md:text-3xl font-light font-playfair uppercase tracking-tight leading-tight max-w-sm">
                                Guerilla Techwear: <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280] lowercase">survival</span>
                              </h3>
                              <p className="text-zinc-300 text-[11px] font-sans max-w-sm hidden sm:block leading-relaxed">
                                Waterproof shells, tactical modular harness webbing, and ergonomic cuts engineered for the concrete streets.
                              </p>
                            </div>
                          </div>
                        );
                      }

                      if (idx === 9) {
                        cards.push(
                          <div 
                            key="promo-2"
                            className="col-span-2 relative h-full min-h-[300px] md:min-h-[360px] rounded-[30px] overflow-hidden border border-stone-200/90 dark:border-zinc-800 shadow-md group cursor-pointer"
                          >
                            <Image
                              src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=800"
                              alt="Sneakers Promo Lookbook"
                              fill
                              className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                              sizes="(max-width: 768px) 100vw, 50vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                            <div className="absolute inset-0 p-7 flex flex-col justify-end text-left space-y-2">
                              <span className="text-[9px] font-mono text-[#D4AF37] uppercase tracking-[0.25em] font-bold">
                                ✦ STREET FOOTWEAR // 2026
                              </span>
                              <h3 className="text-white text-xl md:text-3xl font-light font-playfair uppercase tracking-tight leading-tight max-w-sm">
                                Urban Footwear: <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280] lowercase">uncompromising</span>
                              </h3>
                              <p className="text-zinc-300 text-[11px] font-sans max-w-sm hidden sm:block leading-relaxed">
                                Responsive air cushioning, vulcanized combat soles, and verified legitimacy checks on every pair.
                              </p>
                            </div>
                          </div>
                        );
                      }

                      return cards;
                    })}
                  </div>

                  {/* Custom Pagination */}
                  {totalPages >= 1 && (
                    <div className="flex items-center justify-center gap-2 mt-12 py-6 animate-fade-in">
                      {(() => {
                        const buttons: React.ReactNode[] = [];
                        const pushButton = (p: number) => {
                          const isActive = currentPage === p;
                          buttons.push(
                            <button
                              key={p}
                              onClick={() => setCurrentPage(p)}
                              className={`w-9 h-9 rounded-2xl flex items-center justify-center text-xs font-mono font-bold transition-all cursor-pointer border ${
                                isActive
                                  ? "bg-[#6F4E37] border-[#6F4E37] text-white dark:bg-[#E6C280] dark:border-[#E6C280] dark:text-zinc-950 shadow-md scale-105"
                                  : "bg-white border-stone-200 hover:border-stone-400 text-zinc-700 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-300 dark:hover:border-[#E6C280]"
                              }`}
                            >
                              {p}
                            </button>
                          );
                        };

                        if (totalPages <= 4) {
                          for (let i = 1; i <= totalPages; i++) {
                            pushButton(i);
                          }
                        } else {
                          pushButton(1);
                          pushButton(2);
                          pushButton(3);
                          buttons.push(
                            <div 
                              key="ellipsis" 
                              className="w-9 h-9 flex items-center justify-center text-xs font-mono font-bold text-zinc-400 select-none"
                            >
                              ...
                            </div>
                          );
                          pushButton(totalPages);
                        }

                        return (
                          <>
                            {buttons}
                            <button
                              disabled={currentPage === totalPages}
                              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                              className={`h-9 px-4.5 rounded-2xl flex items-center justify-center gap-1.5 text-[9.5px] font-mono font-bold uppercase tracking-wider transition-all border ${
                                currentPage === totalPages
                                  ? "bg-stone-100 border-stone-200 text-zinc-400 dark:bg-zinc-950 dark:border-zinc-800 dark:text-zinc-600 cursor-not-allowed"
                                  : "bg-white border-stone-200 hover:border-stone-400 text-zinc-700 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-300 dark:hover:border-[#E6C280] dark:hover:text-[#E6C280] cursor-pointer active:scale-95"
                              }`}
                            >
                              <span>Next</span>
                              <span>&gt;</span>
                            </button>
                          </>
                        );
                      })()}
                    </div>
                  )}
                </div>
              ) : (
                <div className="py-20 px-6 border border-stone-200/90 dark:border-zinc-800 rounded-[32px] text-center bg-white/80 dark:bg-zinc-900/60 backdrop-blur-md shadow-sm">
                  <div className="max-w-lg mx-auto space-y-4">
                    <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-stone-100 dark:bg-zinc-800 text-[#6F4E37] dark:text-[#E6C280] font-mono text-[9px] font-bold uppercase tracking-[0.25em] border border-stone-200 dark:border-zinc-700">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>VAULT ARCHIVE // DROP INCOMING</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-light font-playfair uppercase tracking-tight text-zinc-950 dark:text-white">
                      Atelier Drop <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280]">Coming Soon</span>
                    </h3>

                    <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-sans max-w-md mx-auto leading-relaxed">
                      New authenticated pieces from this curation are currently undergoing stitch-density inspection and legit checking for the upcoming weekly drop.
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                      <button 
                        onClick={() => triggerToast("You've been added to the VIP Priority Drop Access list! Check your inbox.")}
                        className="bg-zinc-950 hover:bg-[#6F4E37] text-white dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-[#E6C280] text-[10.5px] font-mono font-bold uppercase tracking-wider px-6 py-3.5 rounded-2xl transition-all cursor-pointer border-none shadow-md active:scale-95 flex items-center gap-2"
                      >
                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                        <span>Notify Me for Drop Access</span>
                      </button>

                      <button 
                        onClick={clearFilters}
                        className="bg-white hover:bg-stone-100 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 border border-stone-300 dark:border-zinc-700 text-[10.5px] font-mono font-bold uppercase tracking-wider px-6 py-3.5 rounded-2xl transition-all cursor-pointer shadow-xs active:scale-95"
                      >
                        Explore All Available Pieces
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SLIDE-OUT FILTER DRAWER (Mobile only overlay)                             */}
        {/* ========================================================================= */}
        {isFilterDrawerOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black/40 dark:bg-black/80 backdrop-blur-xs z-50 transition-opacity duration-300"
              onClick={() => setIsFilterDrawerOpen(false)}
            />
            {/* Drawer */}
            <div className="fixed inset-y-0 left-0 max-w-sm w-full bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl border-r border-zinc-200/50 dark:border-zinc-800/80 z-50 p-8 shadow-2xl flex flex-col justify-between transition-transform duration-500 ease-in-out">
              <div className="overflow-y-auto pr-2 scrollbar-unique flex-grow">
                <div className="flex justify-between items-center pb-5 border-b border-zinc-150 dark:border-zinc-800/80 mb-6">
                  <div className="text-left">
                    <h2 className="text-sm font-black uppercase tracking-widest text-zinc-900 dark:text-zinc-100 font-mono">Filter catalog</h2>
                    <p className="text-[10px] text-zinc-455 dark:text-zinc-400 font-mono mt-0.5">{sortedProducts.length} items match</p>
                  </div>
                  <button 
                    onClick={() => setIsFilterDrawerOpen(false)} 
                    className="text-zinc-400 dark:text-zinc-500 hover:text-zinc-800 dark:hover:text-white p-1 cursor-pointer border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-700 rounded-full"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                {renderSidebarContent()}
              </div>

              {/* Bottom Drawer Actions */}
              <div className="pt-5 border-t border-zinc-150 dark:border-zinc-800/80 mt-4 flex gap-3">
                <button
                  onClick={() => {
                    clearFilters();
                    setIsFilterDrawerOpen(false);
                  }}
                  className="flex-1 border border-zinc-300 dark:border-zinc-700 hover:border-zinc-500 dark:hover:border-zinc-500 text-zinc-800 dark:text-zinc-200 text-[10px] font-mono font-bold uppercase tracking-wider py-3.5 rounded-full transition-all cursor-pointer text-center bg-white dark:bg-zinc-800"
                >
                  Reset
                </button>
                <button
                  onClick={() => setIsFilterDrawerOpen(false)}
                  className="flex-1 bg-zinc-950 hover:bg-[#6F4E37] dark:bg-[#E6C280] dark:hover:bg-[#d4b06c] text-white dark:text-zinc-950 text-[10px] font-mono font-bold uppercase tracking-wider py-3.5 rounded-full transition-all cursor-pointer text-center border-none shadow-sm dark:shadow-[0_0_15px_rgba(230,194,128,0.25)]"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </>
        )}

      </PageContainer>

      {/* ========================================================================= */}
      {/* QUICK VIEW POPUP MODAL                                                     */}
      {/* ========================================================================= */}
      {selectedQuickViewProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/80 backdrop-blur-xs animate-fade-in">
          <div className="bg-white dark:bg-zinc-900/95 dark:backdrop-blur-2xl rounded-[28px] overflow-hidden max-w-3xl w-full border border-zinc-200 dark:border-zinc-800 shadow-2xl dark:shadow-[0_25px_60px_rgba(0,0,0,0.9)] relative animate-scale-in flex flex-col md:flex-row max-h-[90vh] md:max-h-[580px]">
            
            {/* Close trigger */}
            <button
              onClick={() => setSelectedQuickViewProduct(null)}
              className="absolute top-4 right-4 z-10 p-1.5 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-full text-zinc-450 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Left side product image */}
            <div className="w-full md:w-1/2 aspect-square md:aspect-auto md:h-full relative bg-[#F7F5F2] dark:bg-zinc-950">
              <Image
                src={selectedQuickViewProduct.image}
                alt={selectedQuickViewProduct.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
              
              <div className="absolute top-4 left-4 flex flex-col gap-1.5 pointer-events-none">
                {selectedQuickViewProduct.isLimited && (
                  <span className="bg-[#6F4E37] dark:bg-[#E6C280] text-white dark:text-zinc-950 text-[7.5px] font-black tracking-widest px-2.5 py-1 rounded-full uppercase font-mono shadow-sm">
                    LIMITED
                  </span>
                )}
                {selectedQuickViewProduct.isNew && (
                  <span className="bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 text-[7.5px] font-black tracking-widest px-2.5 py-1 rounded-full uppercase font-mono shadow-sm">
                    NEW RELEASE
                  </span>
                )}
              </div>
            </div>

            {/* Right side customization specs */}
            <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto text-left h-full">
              <div className="space-y-4">
                <div>
                  <span className="text-[9px] font-mono text-[#6F4E37] dark:text-[#E6C280] uppercase tracking-widest font-black">{selectedQuickViewProduct.brand}</span>
                  <h3 className="text-xl font-playfair font-normal text-zinc-900 dark:text-zinc-100 leading-snug mt-1">{selectedQuickViewProduct.title}</h3>
                  
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[10px] text-zinc-455 dark:text-zinc-400 font-mono">Category: {selectedQuickViewProduct.category}</span>
                    <span className="h-1 w-1 bg-zinc-300 dark:bg-zinc-700 rounded-full" />
                    <span className="text-[10px] text-zinc-455 dark:text-zinc-400 font-mono">Material: {selectedQuickViewProduct.material || "Heavy Cotton"}</span>
                  </div>
                </div>

                {/* Stars reviews */}
                <div className="flex items-center gap-2 text-[10px] text-zinc-550 dark:text-zinc-400">
                  <div className="flex text-amber-500">★ ★ ★ ★ ★</div>
                  <span className="font-mono font-bold text-zinc-800 dark:text-zinc-200">{selectedQuickViewProduct.rating.toFixed(1)}</span>
                  <span className="text-zinc-400 dark:text-zinc-500">({selectedQuickViewProduct.reviewsCount || 15} Reviews)</span>
                </div>

                <div className="flex items-baseline gap-2 pt-1 font-mono">
                  <span className="text-xl font-black text-zinc-950 dark:text-white">₹{selectedQuickViewProduct.price.toLocaleString()}</span>
                  {selectedQuickViewProduct.originalPrice && (
                    <span className="text-sm text-[#E4573F] dark:text-rose-400 line-through">₹{selectedQuickViewProduct.originalPrice.toLocaleString()}</span>
                  )}
                </div>

                <p className="text-xs text-zinc-555 dark:text-zinc-400 leading-relaxed font-sans pt-1">
                  Crafted for high-fashion wearability. Features a heavyweight structure designed to maintain a perfect silhouette. Pre-washed dye prevents shrinkage and retains color integrity.
                </p>

                {/* Sizing selection */}
                <div className="space-y-2 pt-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-mono font-bold text-zinc-455 dark:text-zinc-400 uppercase tracking-wider">Select Size</span>
                    <span className="text-[9px] font-mono font-bold text-[#6F4E37] dark:text-[#E6C280] hover:opacity-80 transition-opacity cursor-pointer">Size Guide</span>
                  </div>
                  <div className="flex gap-2">
                    {["S", "M", "L", "XL"].map((sz) => {
                      const isSelected = selectedQuickViewSize === sz;
                      return (
                        <button
                          key={sz}
                          onClick={() => setSelectedQuickViewSize(sz)}
                          className={`w-9 h-9 rounded-xl border text-xs font-mono font-bold transition-all cursor-pointer flex items-center justify-center ${
                            isSelected
                              ? "bg-[#6F4E37] border-[#6F4E37] text-white dark:bg-[#E6C280] dark:border-[#E6C280] dark:text-zinc-950 dark:shadow-[0_0_15px_rgba(230,194,128,0.2)] shadow-xs"
                              : "border-zinc-200 bg-white hover:border-zinc-400 text-zinc-800 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300 dark:hover:border-zinc-700"
                          }`}
                        >
                          {sz}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Color swatches */}
                <div className="space-y-2 pt-2">
                  <span className="text-[9px] font-mono font-bold text-zinc-455 dark:text-zinc-400 uppercase tracking-wider block">Colors</span>
                  <div className="flex gap-2.5 items-center">
                    {[
                      { name: "Charcoal", hex: "#27272A" },
                      { name: "Sand", hex: "#D4C5B9" },
                      { name: "Olive", hex: "#5C604D" }
                    ].map((col) => {
                      const isSelected = selectedQuickViewColor === col.name;
                      return (
                        <button
                          key={col.name}
                          onClick={() => setSelectedQuickViewColor(col.name)}
                          className={`w-6 h-6 rounded-full border transition-all cursor-pointer flex items-center justify-center ${
                            isSelected ? "ring-2 ring-[#6F4E37] dark:ring-[#E6C280] border-white dark:border-zinc-900 scale-105" : "border-zinc-200 dark:border-zinc-700"
                          }`}
                          style={{ backgroundColor: col.hex }}
                          title={col.name}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="mt-8 pt-4 border-t border-zinc-105 dark:border-zinc-800 space-y-3">
                <div className="flex gap-3">
                  <button
                    onClick={handleModalAddToCart}
                    className="flex-grow py-4 bg-zinc-950 hover:bg-[#6F4E37] text-white dark:bg-[#E6C280] dark:hover:bg-[#d4b06c] dark:text-zinc-950 dark:shadow-[0_0_20px_rgba(230,194,128,0.25)] text-xs font-mono font-bold uppercase tracking-wider rounded-full transition-all cursor-pointer flex items-center justify-center gap-2 border-none active:scale-[0.98]"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>{quickViewAdded ? "Added to Bag" : "Add to Shopping Bag"}</span>
                  </button>

                  <button
                    onClick={() => handleToggleWishlist(selectedQuickViewProduct)}
                    className={`p-4 rounded-full border transition-all cursor-pointer ${
                      isInWishlist(selectedQuickViewProduct.id)
                        ? "border-red-500 bg-red-50 dark:bg-rose-950/40 text-red-500"
                        : "border-zinc-200 hover:border-zinc-450 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:border-zinc-700 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                    }`}
                  >
                    <Heart className="w-4.5 h-4.5" fill={isInWishlist(selectedQuickViewProduct.id) ? "currentColor" : "none"} />
                  </button>
                </div>
                
                <div className="flex items-center justify-center gap-1.5 text-[9px] font-mono text-zinc-400 dark:text-zinc-500">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#6F4E37] dark:text-[#E6C280]" />
                  <span>100% Authentic release. Inspected before shipment.</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={null}>
      <ShopContent />
    </Suspense>
  );
}
