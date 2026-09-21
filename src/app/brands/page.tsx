"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/product/ProductCard";
import SearchOverlay from "@/components/layout/SearchOverlay";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { 
  ArrowRight, 
  ArrowUpRight,
  Search,
  Sparkles,
  Check,
  X,
  Globe
} from "lucide-react";
import { BRANDS_DIRECTORY, BrandItem } from "@/data/mockData";

const CATEGORY_TABS = [
  { id: "all", label: "All Houses" },
  { id: "luxury", label: "Luxury & Couture" },
  { id: "underground", label: "Underground India" },
  { id: "heritage", label: "Heritage Streetwear" },
  { id: "techwear", label: "Techwear & Modular" },
  { id: "footwear", label: "Footwear Royalty" },
];

const ALPHABET = ["ALL", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

export default function BrandsPage() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedLetter, setSelectedLetter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const [isCtaOpen, setIsCtaOpen] = useState(false);
  const [ctaEmail, setCtaEmail] = useState("");
  const [isCtaSubmitted, setIsCtaSubmitted] = useState(false);

  // Scroll Animations
  const { ref: spotlightRef, isVisible: spotlightVisible } = useScrollAnimation();
  const { ref: indexRef, isVisible: indexVisible } = useScrollAnimation();

  // Filtered Brands
  const filteredBrands = useMemo(() => {
    return BRANDS_DIRECTORY.filter((brand) => {
      if (activeCategory !== "all" && brand.category !== activeCategory) return false;
      if (selectedLetter !== "ALL") {
        const firstLetter = brand.name.trim().charAt(0).toUpperCase();
        if (firstLetter !== selectedLetter) return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = brand.name.toLowerCase().includes(q);
        const matchesCity = brand.city.toLowerCase().includes(q);
        const matchesCountry = brand.country.toLowerCase().includes(q);
        const matchesTagline = brand.tagline.toLowerCase().includes(q);
        if (!matchesName && !matchesCity && !matchesCountry && !matchesTagline) {
          return false;
        }
      }
      return true;
    });
  }, [activeCategory, selectedLetter, searchQuery]);

  // Grouped by Alphabet for Directory Matrix
  const brandsGroupedByLetter = useMemo(() => {
    const map: Record<string, BrandItem[]> = {};
    filteredBrands.forEach((b) => {
      const letter = b.name.trim().charAt(0).toUpperCase();
      if (!map[letter]) map[letter] = [];
      map[letter].push(b);
    });
    return Object.keys(map).sort().reduce((obj, key) => {
      obj[key] = map[key];
      return obj;
    }, {} as Record<string, BrandItem[]>);
  }, [filteredBrands]);

  const collectionItems = [
    {
      img: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80",
      tag: "01 // COUTURE JACKET",
      title: "Owners Heavyweight Zip",
      brand: "Represent",
      price: "₹3,499",
      link: "/product/owners-heavyweight-zip"
    },
    {
      img: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80",
      tag: "02 // INDUSTRIAL DRAPE",
      title: "Tactical Parachute Cargo",
      brand: "Guerilla Culture",
      price: "₹4,200",
      link: "/product/tactical-parachute-cargo"
    },
    {
      img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
      tag: "03 // MOHAIR ARCHIVE",
      title: "8-Ball Knit Cardigan",
      brand: "Stüssy",
      price: "₹6,800",
      link: "/product/8-ball-knit-cardigan"
    },
    {
      img: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=800&q=80",
      tag: "04 // VINTAGE SILHOUETTE",
      title: "Diagonal Arrows Tee",
      brand: "Off-White",
      price: "₹5,100",
      link: "/product/diagonal-arrows-tee"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5] dark:bg-[#0C0B0A] text-zinc-900 dark:text-white font-sans antialiased overflow-x-hidden select-none transition-colors duration-300 w-full">
      <Navbar onSearchClick={() => setIsSearchOpen(true)} />
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* ─── SECTION 1: AVANT-GARDE HERO BANNER ─── */}
      <section
        className="relative w-full min-h-[50vh] flex flex-col justify-center items-center overflow-hidden transition-all duration-1000 ease-out border-b border-zinc-200 dark:border-white/5 p-6 md:p-8 opacity-100 translate-y-0"
      >
        {/* Edge-to-Edge Cinematic Image Background */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=3840&q=100" 
            alt="Archive Collection"
            className="w-full h-full object-cover filter grayscale-[40%] brightness-50 dark:brightness-[0.3]" 
          />
          {/* Full dark overlay */}
          <div className="absolute inset-0 bg-black/50 z-10 pointer-events-none" />
        </div>

        {/* Ambient Glowing Orbs over the image */}
        <div className="absolute top-1/4 -left-1/4 w-[800px] h-[800px] bg-[#6F4E37]/30 dark:bg-[#E6C280]/15 rounded-full blur-[150px] pointer-events-none animate-pulse-slow z-0" />

        {/* Massive Background Typography Watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full overflow-hidden flex justify-center items-center pointer-events-none select-none z-0 opacity-10">
          <h1 className="text-[25vw] font-playfair font-black tracking-tighter leading-none whitespace-nowrap text-white">
            ATELIER
          </h1>
        </div>

        {/* Floating Typography Container (No Card) */}
        <div className="relative z-10 w-full max-w-[1600px] mx-auto flex flex-col items-center justify-center text-center space-y-6 p-4 mt-8">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/30 bg-white/5 backdrop-blur-sm shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E6C280] animate-pulse" />
            <span className="text-white font-mono text-[9px] font-bold uppercase tracking-[0.25em]">
              Verified Global Authenticity
            </span>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-playfair font-black text-white tracking-tight uppercase leading-[0.95]">
              DOMESTIC <br/>
              <span className="font-serif italic font-normal text-zinc-300 lowercase">& Global</span> <br/>
              ARCHIVES
            </h1>
          </div>

          <p className="text-xs sm:text-sm text-zinc-200 font-sans font-light max-w-lg mx-auto leading-relaxed">
            Discover verified domestic couture labels, underground creators, and iconic global streetwear archives. Every designer house is strictly authenticated by our specialist team.
          </p>

          <div className="pt-4 flex items-center justify-center gap-4">
            <div className="h-[1px] w-12 bg-zinc-500" />
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-400 font-bold">EST. 2026</span>
            <div className="h-[1px] w-12 bg-zinc-500" />
          </div>
        </div>
      </section>

      <main className="flex-grow py-8 sm:py-12 w-full max-w-[1600px] mx-auto space-y-12">

        {/* ─── SECTION 2: FLOATING FILTERS (CARDLESS) ─── */}
        <section className="w-full px-4 sm:px-12 md:px-16 lg:px-20 space-y-8">
          
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 pb-6 border-b border-zinc-200 dark:border-zinc-800">
            {/* Ultra-minimal Alphabet Strip */}
            <div className="overflow-x-auto scrollbar-none w-full lg:w-auto flex-grow">
              <div className="flex items-center gap-4 min-w-max">
                <span className="text-[9.5px] font-mono font-bold text-[#6F4E37] dark:text-[#E6C280] uppercase tracking-widest">
                  INDEX //
                </span>
                {ALPHABET.map((letter) => {
                  const isActive = selectedLetter === letter;
                  return (
                    <button
                      key={letter}
                      onClick={() => setSelectedLetter(letter)}
                      className={`text-xl sm:text-2xl font-playfair transition-all duration-300 cursor-pointer border-none bg-transparent ${
                        isActive
                          ? "text-[#6F4E37] dark:text-[#E6C280] scale-125 font-bold italic"
                          : "text-zinc-400 dark:text-zinc-600 hover:text-zinc-900 dark:hover:text-white"
                      }`}
                    >
                      {letter}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Minimalist Borderless Search */}
            <div className="relative w-full lg:w-[400px] shrink-0 border-b border-zinc-300 dark:border-zinc-700 focus-within:border-zinc-900 dark:focus-within:border-white transition-colors">
              <div className="relative flex items-center">
                <Search className="w-5 h-5 text-zinc-400 absolute left-0 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (e.target.value.trim() !== "") {
                      setSelectedLetter("ALL");
                      setActiveCategory("all");
                    }
                  }}
                  placeholder="Search brand or origin..."
                  className="w-full bg-transparent border-none pl-8 pr-10 py-3 text-sm font-sans text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-0 shadow-none"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-0 p-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-white cursor-pointer bg-transparent border-none"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Minimal Text Links Category Switcher */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-center">
            {CATEGORY_TABS.map((tab) => {
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`text-[10px] font-mono font-bold uppercase tracking-[0.2em] transition-all duration-300 cursor-pointer border-none bg-transparent ${
                    isActive
                      ? "text-zinc-950 dark:text-white border-b border-zinc-950 dark:border-white pb-1"
                      : "text-zinc-400 hover:text-zinc-950 dark:hover:text-white pb-1"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </section>

        {/* ─── NEW SECTION: METRICS & STATISTICS (To add rich data) ─── */}
        <section className="w-full px-4 sm:px-12 md:px-16 lg:px-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8 border-y border-zinc-200/50 dark:border-zinc-800/50">
            <div className="text-center space-y-2 border-r border-zinc-200/50 dark:border-zinc-800/50">
              <span className="text-4xl md:text-5xl font-playfair font-black text-zinc-900 dark:text-white">{BRANDS_DIRECTORY.length}+</span>
              <p className="text-[9px] font-mono uppercase tracking-widest text-zinc-500">Verified Houses</p>
            </div>
            <div className="text-center space-y-2 md:border-r border-zinc-200/50 dark:border-zinc-800/50">
              <span className="text-4xl md:text-5xl font-playfair font-black text-[#6F4E37] dark:text-[#E6C280]">15k+</span>
              <p className="text-[9px] font-mono uppercase tracking-widest text-zinc-500">Curated Grails</p>
            </div>
            <div className="text-center space-y-2 border-r border-zinc-200/50 dark:border-zinc-800/50">
              <span className="text-4xl md:text-5xl font-playfair font-black text-zinc-900 dark:text-white">100%</span>
              <p className="text-[9px] font-mono uppercase tracking-widest text-zinc-500">Authenticity Guarantee</p>
            </div>
            <div className="text-center space-y-2">
              <span className="text-4xl md:text-5xl font-playfair font-black text-[#6F4E37] dark:text-[#E6C280]">40+</span>
              <p className="text-[9px] font-mono uppercase tracking-widest text-zinc-500">Global Metros Sourced</p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: SPOTLIGHT POWERHOUSES (PREMIUM GLASS BENTO) ─── */}
        <section
          className="w-full px-4 sm:px-12 md:px-16 lg:px-20 space-y-6 sm:space-y-8 transition-all duration-1000 ease-out opacity-100 translate-y-0"
        >
          <div className="flex items-end justify-between border-b border-zinc-200/50 dark:border-white/10 pb-4 text-left">
            <div>
              <span className="text-[9.5px] font-mono font-bold tracking-[0.25em] text-[#6F4E37] dark:text-[#E6C280] uppercase">
                CURATED SPOTLIGHT
              </span>
              <h2 className="text-4xl md:text-5xl font-light tracking-tight text-zinc-950 dark:text-zinc-50 font-playfair uppercase">
                Featured <span className="font-serif italic text-[#6F4E37] dark:text-[#E6C280]">Powerhouses</span>
              </h2>
            </div>
          </div>

          <div ref={spotlightRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBrands.filter(b => b.featured).map((brand, idx) => (
              <Link
                key={brand.id}
                href={`/brands/${encodeURIComponent(brand.slug)}`}
                style={{ transitionDelay: `${idx * 150}ms` }}
                className={`group relative rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden bg-black border border-zinc-200/80 dark:border-white/10 hover:border-[#6F4E37]/50 dark:hover:border-[#E6C280]/50 p-5 sm:p-8 flex flex-col justify-between min-h-[350px] sm:min-h-[450px] transition-all duration-700 hover:shadow-2xl cursor-pointer ease-out ${
                  spotlightVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                }`}
              >
                {/* Background Image (No Blur) */}
                <div className="absolute inset-0 z-0 bg-black">
                  <Image
                    src={brand.bannerImage}
                    alt={brand.name}
                    fill
                    className="object-cover filter grayscale opacity-40 group-hover:opacity-70 group-hover:grayscale-0 transition-all duration-700 ease-out"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
                </div>

                <div className="relative z-10 flex flex-col h-full justify-between">
                  {/* Top Bar */}
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[9px] font-mono font-bold text-white uppercase tracking-wider">
                      {brand.country}
                    </span>
                    <span className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-[#E6C280] text-white group-hover:text-zinc-950 flex items-center justify-center transition-colors">
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>

                  {/* Content */}
                  <div className="mt-auto space-y-4">
                    <h3 className="text-3xl sm:text-4xl font-black font-sans tracking-tight uppercase text-white group-hover:text-[#E6C280] transition-colors leading-none">
                      {brand.name}
                    </h3>
                    <p className="text-xs text-zinc-300 font-sans line-clamp-2">
                      {brand.tagline}
                    </p>
                    <div className="pt-4 border-t border-white/20 flex items-center justify-between text-[10px] font-mono">
                      <span className="text-zinc-400">{brand.city} • Est. {brand.founded}</span>
                      <span className="font-bold text-white group-hover:translate-x-1 transition-transform">
                        Explore →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ─── NEW SECTION: TRENDING ARCHIVES (To add visual variety) ─── */}
        <section className="w-full px-4 sm:px-12 md:px-16 lg:px-20 space-y-6 sm:space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-zinc-200/50 dark:border-white/10 pb-4 text-left gap-3 sm:gap-0">
            <div>
              <span className="text-[9.5px] font-mono font-bold tracking-[0.25em] text-[#6F4E37] dark:text-[#E6C280] uppercase">
                RECENT ARRIVALS
              </span>
              <h2 className="text-4xl md:text-5xl font-light tracking-tight text-zinc-950 dark:text-zinc-50 font-playfair uppercase">
                Trending <span className="font-serif italic text-[#6F4E37] dark:text-[#E6C280]">Grails</span>
              </h2>
            </div>
            <Link href="/shop" className="text-[10px] font-mono font-bold text-zinc-900 dark:text-white uppercase tracking-widest border-b border-zinc-900 dark:border-white hover:text-[#6F4E37] dark:hover:text-[#E6C280] hover:border-[#6F4E37] dark:hover:border-[#E6C280] pb-1 transition-colors self-end sm:self-auto">
              View All Vaults
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                id: 1,
                img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=600&q=80",
                title: "Exclusive Heavyweight Hoodie",
                price: "₹2,499",
                archive: "#120"
              },
              {
                id: 2,
                img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80",
                title: "Archive Distressed Denim",
                price: "₹4,998",
                archive: "#220"
              },
              {
                id: 3,
                img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=600&q=80",
                title: "Tactical Cargo Vest",
                price: "₹7,497",
                archive: "#320"
              },
              {
                id: 4,
                img: "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=600&q=80",
                title: "Layered Outerwear Jacket",
                price: "₹9,996",
                archive: "#420"
              }
            ].map((item) => (
              <div key={item.id} className="h-auto">
                <ProductCard
                  id={`archive-${item.id}`}
                  name={item.title}
                  brand={`Archive ${item.archive}`}
                  price={item.price}
                  image={item.img}
                  badge="New Arrival"
                  inStock={true}
                />
              </div>
            ))}
          </div>
        </section>

        {/* ─── SECTION 4: ELEGANT ALPHABETICAL DIRECTORY (IMAGE CARDS) ─── */}
        <section
          className="w-full px-4 sm:px-12 md:px-16 lg:px-20 space-y-8 sm:space-y-12 transition-all duration-1000 ease-out opacity-100 translate-y-0"
        >
          <div className="flex items-end justify-between border-b border-zinc-200/50 dark:border-white/10 pb-4 text-left">
            <div>
              <span className="text-[9.5px] font-mono font-bold tracking-[0.25em] text-[#6F4E37] dark:text-[#E6C280] uppercase">
                COMPLETE REPOSITORY
              </span>
              <h2 className="text-4xl md:text-5xl font-light tracking-tight text-zinc-950 dark:text-zinc-50 font-playfair uppercase">
                A-Z <span className="font-serif italic text-[#6F4E37] dark:text-[#E6C280]">Index</span>
              </h2>
            </div>
          </div>

          {Object.keys(brandsGroupedByLetter).length > 0 ? (
            <div className="space-y-12">
              {Object.entries(brandsGroupedByLetter).map(([letter, brands]) => (
                <div key={letter} className="space-y-6">
                  
                  {/* Elegant Letter Header */}
                  <div className="flex items-end gap-4 border-b border-zinc-200/50 dark:border-white/5 pb-2">
                    <span className="text-4xl sm:text-5xl font-playfair font-black text-zinc-900 dark:text-white leading-none">
                      {letter}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest mb-1 pb-1">
                      {brands.length} {brands.length === 1 ? "House" : "Houses"}
                    </span>
                  </div>

                  {/* Premium Image Bento Grid (Same as Spotlight) */}
                  <div ref={indexRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {brands.map((brand, idx) => (
                      <Link
                        key={brand.id}
                        href={`/brands/${encodeURIComponent(brand.slug)}`}
                        style={{ transitionDelay: `${idx * 100}ms` }}
                        className={`group relative rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden bg-black border border-zinc-200/80 dark:border-white/10 hover:border-[#6F4E37]/50 dark:hover:border-[#E6C280]/50 p-5 sm:p-6 flex flex-col justify-between min-h-[300px] sm:min-h-[400px] transition-all duration-700 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:hover:shadow-[0_8px_30px_rgb(255,255,255,0.04)] cursor-pointer text-zinc-900 dark:text-white ease-out ${
                          indexVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        }`}
                      >
                        {/* Background Image (No Blur) */}
                        <div className="absolute inset-0 z-0 bg-black">
                          <Image
                            src={brand.bannerImage}
                            alt={brand.name}
                            fill
                            className="object-cover filter grayscale opacity-30 group-hover:opacity-70 group-hover:grayscale-0 transition-all duration-700 ease-out"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40" />
                        </div>

                        <div className="relative z-10 flex flex-col h-full justify-between">
                          {/* Top Bar */}
                          <div className="flex items-center justify-between">
                            <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[9px] font-mono font-bold text-white uppercase tracking-wider">
                              {brand.country}
                            </span>
                            <span className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-[#E6C280] text-white group-hover:text-zinc-950 flex items-center justify-center transition-colors">
                              <ArrowUpRight className="w-4 h-4" />
                            </span>
                          </div>

                          {/* Content */}
                          <div className="mt-auto space-y-4">
                            <h3 className="text-3xl sm:text-4xl font-black font-sans tracking-tight uppercase text-white group-hover:text-[#E6C280] transition-colors leading-[0.9]">
                              {brand.name}
                            </h3>
                            <p className="text-xs text-zinc-400 font-sans line-clamp-2">
                              {brand.tagline}
                            </p>
                            <div className="pt-4 border-t border-white/20 flex items-center justify-between text-[10px] font-mono">
                              <span className="text-zinc-500">{brand.city} • Est. {brand.founded}</span>
                              <span className="font-bold text-white group-hover:translate-x-1 transition-transform">
                                Explore →
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-32 flex flex-col items-center justify-center space-y-6">
              <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10">
                {/* Custom Infinite SVG Hourglass */}
                <div className="relative w-28 h-36 flex flex-col items-center justify-center drop-shadow-[0_0_15px_rgba(230,194,128,0.15)] origin-center group cursor-pointer">
                  <svg viewBox="0 0 100 120" className="w-full h-full transition-transform duration-1000 ease-in-out group-hover:rotate-[360deg]" xmlns="http://www.w3.org/2000/svg">
                    {/* Top Cap */}
                    <path d="M10 5 L90 5 L90 15 L10 15 Z" fill="#18181B" rx="2" className="dark:fill-zinc-100" />
                    {/* Bottom Cap */}
                    <path d="M10 105 L90 105 L90 115 L10 115 Z" fill="#18181B" rx="2" className="dark:fill-zinc-100" />
                    
                    {/* Top Glass */}
                    <path d="M25 15 C25 45, 45 55, 50 60 C55 55, 75 45, 75 15 Z" fill="rgba(255,255,255,0.05)" stroke="#3F3F46" strokeWidth="2" className="dark:stroke-zinc-600" />
                    {/* Bottom Glass */}
                    <path d="M25 105 C25 75, 45 65, 50 60 C55 65, 75 75, 75 105 Z" fill="rgba(255,255,255,0.05)" stroke="#3F3F46" strokeWidth="2" className="dark:stroke-zinc-600" />
                    
                    {/* Top Sand (Static, half full) */}
                    <clipPath id="topSand">
                      <path d="M25 15 C25 45, 45 55, 50 60 C55 55, 75 45, 75 15 Z" />
                    </clipPath>
                    <rect x="20" y="35" width="60" height="25" fill="#E6C280" clipPath="url(#topSand)" />
                    
                    {/* Bottom Sand (Static, half full) */}
                    <clipPath id="bottomSand">
                      <path d="M25 105 C25 75, 45 65, 50 60 C55 65, 75 75, 75 105 Z" />
                    </clipPath>
                    {/* Bottom sand mound */}
                    <path d="M30 105 Q50 75 70 105 Z" fill="#E6C280" clipPath="url(#bottomSand)" />
                    
                    {/* Infinite Falling Sand Stream */}
                    <line x1="50" y1="60" x2="50" y2="95" stroke="#E6C280" strokeWidth="2" strokeDasharray="4 4" className="animate-[stream-fall_0.8s_linear_infinite]" />
                  </svg>
                  <style jsx>{`
                    @keyframes stream-fall {
                      from { stroke-dashoffset: 8; }
                      to { stroke-dashoffset: 0; }
                    }
                  `}</style>
                </div>
                
                <h3 className="text-6xl sm:text-8xl font-black font-sans tracking-tighter text-zinc-900 dark:text-zinc-100 uppercase leading-[0.85]">
                  COMING <br /> SOON<span className="text-[#E6C280]">!</span>
                </h3>
              </div>
              
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("all");
                  setSelectedLetter("ALL");
                }}
                className="mt-8 text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-500 hover:text-zinc-900 dark:hover:text-white border-b border-zinc-500 hover:border-zinc-900 dark:hover:border-white pb-1 cursor-pointer bg-transparent transition-colors"
              >
                Reset Filters & Go Back
              </button>
            </div>
          )}
        </section>

        {/* ─── SECTION 5: CURATED RUNWAY & FIT LOOKS (CARDLESS GRID) ─── */}
        <section
          className="w-full px-4 sm:px-12 md:px-16 lg:px-20 transition-all duration-1000 ease-out space-y-6 sm:space-y-10 opacity-100 translate-y-0"
        >
          <div className="text-center space-y-4">
            <span className="text-[10px] font-mono text-[#6F4E37] dark:text-[#E6C280] uppercase tracking-[0.3em] font-bold">
              EDITORIAL CURATION
            </span>
            <h2 className="text-4xl md:text-5xl font-light font-playfair text-zinc-950 dark:text-white uppercase tracking-tight">
              Styled <span className="font-serif italic text-[#6F4E37] dark:text-[#E6C280]">Fits</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
            {collectionItems.map((item, idx) => (
              <div key={idx} className="h-auto">
                <ProductCard
                  id={`curated-${idx}`}
                  name={item.title}
                  brand={item.brand}
                  price={item.price}
                  image={item.img}
                  badge="Editorial"
                  inStock={true}
                />
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* ─── SECTION 6: ATELIER PARTNERSHIP CTA (EDGE-TO-EDGE) ─── */}
      <section className="relative w-full min-h-[60vh] flex flex-col items-center justify-center overflow-hidden bg-stone-50 dark:bg-zinc-950 mt-4 mb-0 border-t border-stone-200 dark:border-zinc-900 transition-colors duration-300">
        {/* Edge-to-Edge Cinematic Image Background */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1558599427-048700078864?auto=format&fit=crop&w=2400&q=80" 
            alt="Atelier CTA Background"
            fill
            className="object-cover opacity-[0.15] dark:opacity-30 grayscale-[50%]" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-50 via-stone-50/80 dark:from-zinc-950 dark:via-zinc-950/80 to-transparent transition-colors duration-300" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-stone-50/40 dark:via-zinc-950/40 to-stone-50 dark:to-zinc-950 transition-colors duration-300" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20 flex flex-col lg:flex-row items-center justify-between gap-12">
          
          {/* Left Content */}
          <div className="flex-1 text-left space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-black/10 dark:border-white/20 bg-black/5 dark:bg-white/5 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6F4E37] dark:bg-[#E6C280] animate-pulse" />
              <span className="text-zinc-900 dark:text-white font-mono text-[9px] font-bold uppercase tracking-[0.2em]">
                Join The Culture
              </span>
            </div>
            
            <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-playfair font-black text-zinc-950 dark:text-white tracking-tight uppercase leading-[0.9]">
              Elevate to <br />
              <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280] lowercase">grail status</span>
            </h3>
            
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 font-sans max-w-md leading-relaxed">
              Join our exclusive roster of authenticated ateliers. Gain direct access to verified streetwear collectors globally. We handle the authentication, logistics, and curation—you focus on the art.
            </p>

            {/* Data / Stats Row */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-4 border-t border-zinc-200 dark:border-zinc-800">
              <div>
                <div className="text-3xl font-playfair font-bold text-zinc-950 dark:text-white mb-1">15K+</div>
                <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Active Collectors</div>
              </div>
              <div>
                <div className="text-3xl font-playfair font-bold text-zinc-950 dark:text-white mb-1">150+</div>
                <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Verified Ateliers</div>
              </div>
              <div className="hidden sm:block">
                <div className="text-3xl font-playfair font-bold text-zinc-950 dark:text-white mb-1">$50M</div>
                <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Culture Traded</div>
              </div>
            </div>
          </div>

          {/* Right Form Box */}
          <div className="w-full max-w-md bg-white/70 dark:bg-zinc-900/60 backdrop-blur-2xl border border-white/50 dark:border-zinc-800/80 rounded-3xl p-8 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] relative overflow-hidden group">
            {/* Subtle accent glow */}
            <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-[#6F4E37]/10 dark:bg-[#E6C280]/10 rounded-full blur-[80px] group-hover:bg-[#6F4E37]/25 dark:group-hover:bg-[#E6C280]/25 transition-colors duration-1000 ease-in-out pointer-events-none" />
            <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-stone-200/30 dark:bg-zinc-800/30 rounded-full blur-[60px] pointer-events-none" />
            
            <div className="relative z-10">
              <h4 className="text-2xl font-playfair font-bold text-zinc-950 dark:text-white uppercase tracking-tight mb-2">Apply for Partnership</h4>
              <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400 mb-8 leading-relaxed">Enter your brand's official email to request a curation application.</p>
              
              {isCtaSubmitted ? (
                <div className="h-40 flex flex-col items-center justify-center gap-4 text-center animate-fade-in bg-white/40 dark:bg-black/20 rounded-2xl border border-white/50 dark:border-white/5 backdrop-blur-sm p-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                    <Check className="w-6 h-6 animate-[scale-in_0.3s_ease-out]" strokeWidth={3} />
                  </div>
                  <div>
                    <span className="text-zinc-900 dark:text-white font-mono text-[11px] uppercase tracking-widest font-bold block mb-1">
                      Application Received
                    </span>
                    <p className="text-zinc-500 text-[9.5px] font-mono">Our curation team will be in touch within 48h.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={(e) => {
                  e.preventDefault();
                  if (ctaEmail) setIsCtaSubmitted(true);
                }} className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-[9.5px] font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-widest font-bold">Brand Email</label>
                    <input 
                      type="email" 
                      value={ctaEmail}
                      onChange={(e) => setCtaEmail(e.target.value)}
                      required
                      placeholder="atelier@yourbrand.com" 
                      className="w-full bg-white/60 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3.5 text-zinc-950 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-700 font-mono text-sm focus:outline-none focus:border-[#6F4E37] dark:focus:border-[#E6C280] focus:ring-4 focus:ring-[#6F4E37]/10 dark:focus:ring-[#E6C280]/10 transition-all duration-300 shadow-inner"
                    />
                  </div>
                  <button type="submit" className="group/btn w-full flex items-center justify-center gap-2 bg-zinc-950 text-white dark:bg-white hover:bg-[#6F4E37] dark:hover:bg-[#E6C280] dark:text-zinc-950 rounded-xl py-4 text-[11px] font-bold font-mono tracking-widest uppercase transition-all duration-500 shadow-[0_8px_20px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_20px_rgba(255,255,255,0.1)] hover:shadow-[0_8px_25px_rgba(111,78,55,0.4)] dark:hover:shadow-[0_8px_25px_rgba(230,194,128,0.4)] hover:-translate-y-0.5 cursor-pointer">
                    <span>Submit Request</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

