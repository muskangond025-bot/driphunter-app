"use client";

import React, { useState } from "react";
import { ArrowLeft, ChevronDown, Plus, Sparkles, Tag, Check, Copy, AlertCircle, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

export default function OffersPage() {
  const router = useRouter();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  
  // States for new features
  const [inputCode, setInputCode] = useState("");
  const [applyStatus, setApplyStatus] = useState<"idle" | "success" | "error">("idle");
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  
  const { ref: heroRef, isVisible: isHeroVisible } = useScrollAnimation();
  const { ref: listRef, isVisible: isListVisible } = useScrollAnimation();

  const [categoryOpen, setCategoryOpen] = useState(false);
  const [brandOpen, setBrandOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedBrand, setSelectedBrand] = useState("All Brands");
  
  const categories = ["All Categories", "Sneakers", "Apparel", "Accessories"];
  const brands = ["All Brands", "Nike", "Adidas", "Jordan", "Yeezy", "Supervek"];

  const coupons = [
    { badge: "8d", image: "https://drip-hunter.vercel.app/images/urban-essentials/cargo_pants.png", type: "Special Discount", title: "Flat ₹1000 off", desc: "on All Bottoms & Cargos", code: "BOTTOM1K", validity: "Valid from 1 Sep to 30 Sep 2026", terms: "Applicable on minimum spend of ₹5000.", category: "Apparel", brand: "Supervek" },
    { badge: "", image: "https://drip-hunter.vercel.app/images/urban-essentials/sling_bag.png", type: "Special Discount", title: "Flat ₹150 off", desc: "on Premium Sling Bags", code: "SLING150", validity: "Valid until 31 Oct 2026", terms: "No minimum spend required.", category: "Accessories", brand: "All Brands" },
    { badge: "", image: "https://drip-hunter.vercel.app/images/sneaker-jordan.jpg", type: "Special Discount", title: "Flat ₹250 off", desc: "on Jordan 1 Retro High", code: "JRDN250", validity: "Valid from 15 Oct to 20 Oct 2026", terms: "Limited to first 500 users.", category: "Sneakers", brand: "Jordan" },
    { badge: "", image: "https://drip-hunter.vercel.app/images/sneaker-nike.jpg", type: "Exclusive Brand discount", title: "Flat ₹1000 off", desc: "on Nike Sportswear", code: "NIKE1K", validity: "Valid this week only", terms: "Excludes latest drops.", category: "Sneakers", brand: "Nike" },
    { badge: "", image: "https://drip-hunter.vercel.app/images/sneaker-adidas.jpg", type: "Special Discount", title: "Get 8% off", desc: "on Adidas Originals", code: "ADI8", validity: "Valid until 31 Dec 2026", terms: "Max discount ₹1200.", category: "Sneakers", brand: "Adidas" },
    { badge: "", image: "https://drip-hunter.vercel.app/images/sneaker-yeezy.jpg", type: "Special Discount", title: "Get 5% off", desc: "on Yeezy Boost Series", code: "YZY5", validity: "Valid for 48 hours", terms: "Only on selected models.", category: "Sneakers", brand: "Yeezy" },
    { badge: "6d", image: "https://drip-hunter.vercel.app/images/urban-essentials/bifold_wallet.png", type: "Special Discount", title: "Flat ₹10000 off", desc: "on Luxury Wallets", code: "LUX10K", validity: "Valid until end of month", terms: "Minimum spend ₹50,000.", category: "Accessories", brand: "All Brands" },
    { badge: "", image: "https://img.icons8.com/ios-filled/50/E6C280/discount.png", type: "Special Discount", title: "Get 10% off upto ₹1200", desc: "on Accessories", code: "ACC10", validity: "Valid until 15 Nov 2026", terms: "Only for VIP members.", category: "Accessories", brand: "All Brands" },
    { badge: "", image: "https://img.icons8.com/ios/50/cccccc/image.png", type: "Special Discount", title: "Flat ₹2000 off", desc: "on Outerwear & Jackets", code: "OUTER2K", validity: "Valid from 1 Nov to 31 Jan", terms: "Winter collection only.", category: "Apparel", brand: "All Brands" },
  ];

  const filteredCoupons = coupons.filter(c => {
    const matchCategory = selectedCategory === "All Categories" || c.category === selectedCategory;
    const matchBrand = selectedBrand === "All Brands" || c.brand === selectedBrand;
    return matchCategory && matchBrand;
  });

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleApplyCode = () => {
    if (!inputCode.trim()) return;
    const isValid = coupons.some(c => c.code.toLowerCase() === inputCode.trim().toLowerCase());
    if (isValid) {
      setApplyStatus("success");
    } else {
      setApplyStatus("error");
    }
    setTimeout(() => {
      setApplyStatus("idle");
      if(isValid) setInputCode("");
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-zinc-950 font-sans flex flex-col transition-colors duration-300 selection:bg-[#6F4E37]/20 selection:text-[#6F4E37]">
      {/* Desktop Navbar */}
      <div className="hidden md:block">
        <Navbar />
      </div>

      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center gap-3 px-4 py-3 bg-white dark:bg-zinc-900 sticky top-0 z-50 border-b border-zinc-200 dark:border-zinc-800 shadow-sm">
        <button onClick={() => router.back()} className="p-1 -ml-1">
          <ArrowLeft className="w-5 h-5 text-zinc-800 dark:text-zinc-200" />
        </button>
        <h1 className="text-[15px] font-bold text-zinc-900 dark:text-white uppercase tracking-wider">My Coupons</h1>
      </div>

      <main className="flex-1 w-full max-w-7xl mx-auto px-0 md:px-6 lg:px-8 pb-10">
        {/* Hero Banner */}
        <div 
          ref={heroRef}
          className={cn("bg-gradient-to-r from-zinc-900 via-zinc-950 to-black md:rounded-3xl pt-8 pb-20 md:pt-16 md:pb-28 relative flex flex-col items-center text-center overflow-hidden md:mt-8 shadow-2xl border-b md:border border-zinc-800 transition-all duration-1000 transform", isHeroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12")}
        >
          <div className="absolute inset-0 bg-[#6F4E37]/5 mix-blend-screen" />
          
          <div className="relative z-10 flex items-center gap-2 text-[#E6C280] text-[10px] md:text-xs font-mono font-bold mb-3 tracking-[0.2em] uppercase">
            <Sparkles className="w-3 h-3 md:w-4 md:h-4" /> Level Up Your Savings! <Sparkles className="w-3 h-3 md:w-4 md:h-4" />
          </div>
          
          <h2 className="text-white text-3xl md:text-5xl lg:text-6xl font-chaney-title uppercase tracking-tight mb-4">
            COUPONS FOR YOU
          </h2>
          
          <div className="bg-[#6F4E37]/20 border border-[#6F4E37]/30 text-[#E6C280] text-[11px] md:text-sm font-semibold px-4 py-1.5 md:px-6 md:py-2 rounded-full mb-2 tracking-widest uppercase">
            You have {filteredCoupons.length} available coupons
          </div>
          
          <div className="absolute bottom-[-20%] right-[-10%] opacity-20 pointer-events-none blur-3xl">
            <div className="w-[300px] h-[300px] bg-[#E6C280] rounded-full" />
          </div>
        </div>

        <div ref={listRef} className="px-4 md:px-0 relative z-20">
          {/* Input Box with Apply Logic */}
          <div className="-mt-8 md:-mt-10 max-w-3xl mx-auto">
            <div className={`bg-white dark:bg-zinc-900 rounded-2xl border ${applyStatus === 'success' ? 'border-emerald-500 shadow-emerald-500/20' : applyStatus === 'error' ? 'border-red-500 shadow-red-500/20' : 'border-zinc-200 dark:border-zinc-800'} flex items-center shadow-xl overflow-hidden h-[50px] md:h-[60px] p-1.5 backdrop-blur-xl transition-all duration-300`}>
              <input 
                type="text" 
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleApplyCode()}
                placeholder="Enter promo code..." 
                className={`flex-1 px-4 py-2 text-sm md:text-base outline-none bg-transparent font-sans uppercase ${applyStatus === 'success' ? 'text-emerald-600 dark:text-emerald-400' : applyStatus === 'error' ? 'text-red-600 dark:text-red-400' : 'text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500'}`} 
              />
              <button 
                onClick={handleApplyCode}
                className={`h-full text-[11px] md:text-xs font-black uppercase tracking-widest px-6 md:px-8 rounded-xl transition-all shadow-md flex items-center gap-2 ${
                  applyStatus === 'success' ? 'bg-emerald-500 text-white' : applyStatus === 'error' ? 'bg-red-500 text-white' : 'bg-[#6F4E37] hover:bg-[#5C3D2E] dark:bg-[#E6C280] dark:hover:bg-[#d4b06a] text-white dark:text-zinc-950'
                }`}
              >
                {applyStatus === 'success' ? <><CheckCircle2 className="w-4 h-4" /> Applied</> : applyStatus === 'error' ? <><AlertCircle className="w-4 h-4" /> Invalid</> : 'Apply Code'}
              </button>
            </div>
            {/* Status Messages */}
            <div className="h-6 mt-1 text-center">
              {applyStatus === 'success' && <p className="text-emerald-600 dark:text-emerald-400 text-xs font-bold animate-fade-in-up">Coupon applied successfully! Proceed to checkout.</p>}
              {applyStatus === 'error' && <p className="text-red-600 dark:text-red-400 text-xs font-bold animate-fade-in-up">Invalid or expired coupon code. Please try again.</p>}
            </div>
          </div>

          {/* Heading & Filters */}
          <div className={cn("pt-4 md:pt-10 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all duration-700", isListVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
            <div className="flex items-center gap-3">
              <Tag className="w-5 h-5 text-[#6F4E37] dark:text-[#E6C280] hidden md:block" />
              <h3 className="text-[16px] md:text-2xl font-chaney-title uppercase tracking-wider text-zinc-900 dark:text-white">
                Available Offers
              </h3>
            </div>
            
            <div className="flex gap-2 md:gap-3">
              {/* Categories Dropdown */}
              <div className="relative">
                <button 
                  onClick={() => { setCategoryOpen(!categoryOpen); setBrandOpen(false); }}
                  onBlur={() => setTimeout(() => setCategoryOpen(false), 200)}
                  className={`flex items-center gap-2 px-4 py-2 border rounded-full text-[11px] md:text-xs font-bold uppercase tracking-wide transition-colors shadow-sm ${selectedCategory !== 'All Categories' ? 'border-[#6F4E37]/30 dark:border-[#E6C280]/30 bg-[#6F4E37]/5 dark:bg-[#E6C280]/10 text-[#6F4E37] dark:text-[#E6C280]' : 'border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800'}`}
                >
                  {selectedCategory === "All Categories" ? "Categories" : selectedCategory} <ChevronDown className={`w-3 h-3 opacity-50 transition-transform ${categoryOpen ? 'rotate-180' : ''}`} />
                </button>
                {categoryOpen && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xl z-50 py-2 animate-fade-in-up">
                    {categories.map((cat) => (
                      <button 
                        key={cat} 
                        onClick={() => { setSelectedCategory(cat); setCategoryOpen(false); setExpandedCard(null); }}
                        className={`w-full text-left px-4 py-2 text-xs font-semibold transition-colors ${selectedCategory === cat ? 'text-[#6F4E37] dark:text-[#E6C280] bg-zinc-50 dark:bg-zinc-800/50' : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-[#6F4E37] dark:hover:text-[#E6C280]'}`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Brands Dropdown */}
              <div className="relative">
                <button 
                  onClick={() => { setBrandOpen(!brandOpen); setCategoryOpen(false); }}
                  onBlur={() => setTimeout(() => setBrandOpen(false), 200)}
                  className={`flex items-center gap-2 px-4 py-2 border rounded-full text-[11px] md:text-xs font-bold uppercase tracking-wide transition-colors shadow-sm ${selectedBrand !== 'All Brands' ? 'border-[#6F4E37]/30 dark:border-[#E6C280]/30 bg-[#6F4E37]/5 dark:bg-[#E6C280]/10 text-[#6F4E37] dark:text-[#E6C280]' : 'border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800'}`}
                >
                  {selectedBrand === "All Brands" ? "Brands" : selectedBrand} <ChevronDown className={`w-3 h-3 opacity-50 transition-transform ${brandOpen ? 'rotate-180' : ''}`} />
                </button>
                {brandOpen && (
                  <div className="absolute top-full right-0 md:left-0 mt-2 w-48 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xl z-50 py-2 animate-fade-in-up">
                    {brands.map((brand) => (
                      <button 
                        key={brand} 
                        onClick={() => { setSelectedBrand(brand); setBrandOpen(false); setExpandedCard(null); }}
                        className={`w-full text-left px-4 py-2 text-xs font-semibold transition-colors ${selectedBrand === brand ? 'text-[#6F4E37] dark:text-[#E6C280] bg-zinc-50 dark:bg-zinc-800/50' : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-[#6F4E37] dark:hover:text-[#E6C280]'}`}
                      >
                        {brand}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Coupon Grid/List */}
          {filteredCoupons.length === 0 ? (
            <div className="py-20 text-center flex flex-col items-center justify-center bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800">
              <Tag className="w-10 h-10 text-zinc-300 dark:text-zinc-700 mb-4" />
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white uppercase tracking-wider font-chaney-title">No offers found</h3>
              <p className="text-zinc-500 text-sm mt-2">Try selecting a different category or brand.</p>
              <button 
                onClick={() => { setSelectedCategory("All Categories"); setSelectedBrand("All Brands"); }}
                className="mt-6 text-[#6F4E37] dark:text-[#E6C280] font-bold text-xs uppercase tracking-widest border border-[#6F4E37]/30 dark:border-[#E6C280]/30 px-6 py-2 rounded-full hover:bg-[#6F4E37]/5 dark:hover:bg-[#E6C280]/10 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 pt-2">
              {filteredCoupons.map((coupon, idx) => {
                const isExpanded = expandedCard === idx;
                
                return (
                  <div 
                    key={idx} 
                    className={cn(
                      "relative flex flex-col rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm hover:shadow-xl transition-all duration-700 group overflow-hidden",
                      isListVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                    )}
                    style={{ transitionDelay: `${idx * 150}ms` }}
                  >
                    
                    {/* Main Ticket Layout */}
                    <div className="flex h-[120px] md:h-[140px] relative">
                      {/* Left Image Section */}
                      <div className="w-[110px] md:w-[130px] bg-zinc-50 dark:bg-zinc-950 border-r border-dashed border-zinc-200 dark:border-zinc-800 relative flex-shrink-0 flex items-center justify-center p-3">
                        {coupon.badge && (
                          <div className="absolute top-2 left-2 bg-red-600 text-white text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded shadow-sm z-10 animate-pulse">
                            {coupon.badge}
                          </div>
                        )}
                        <img src={coupon.image} className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal" alt={coupon.title} />
                      </div>
                      
                      {/* Ticket Notches */}
                      <div className="absolute -top-2 left-[103px] md:left-[123px] w-[14px] h-[14px] bg-[#FAF8F5] dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-full z-10"></div>
                      <div className="absolute -bottom-2 left-[103px] md:left-[123px] w-[14px] h-[14px] bg-[#FAF8F5] dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-full z-10"></div>
  
                      {/* Right Text Section */}
                      <div className="flex-1 p-4 md:p-5 flex flex-col justify-center bg-white dark:bg-zinc-900">
                        <p className="text-[9px] md:text-[10px] font-mono font-bold uppercase tracking-widest text-[#6F4E37] dark:text-[#E6C280] mb-1">
                          {coupon.type}
                        </p>
                        <h4 className="text-[15px] md:text-lg font-black text-zinc-900 dark:text-white leading-tight uppercase font-chaney-title tracking-tight mb-1">
                          {coupon.title}
                        </h4>
                        <p className="text-[11px] md:text-xs text-zinc-500 dark:text-zinc-400 line-clamp-1 mb-3">
                          {coupon.desc}
                        </p>
                        
                        <div className="mt-auto flex items-center justify-between">
                          <span className="text-zinc-400 dark:text-zinc-500 text-[10px] font-mono tracking-widest uppercase">
                            Code: <strong className="text-zinc-800 dark:text-zinc-200">{coupon.code}</strong>
                          </span>
                          <button 
                            onClick={() => handleCopy(coupon.code)}
                            className={`text-[10px] font-black uppercase tracking-widest flex items-center gap-1 transition-colors px-2 py-1 rounded ${
                              copiedCode === coupon.code 
                                ? "text-emerald-500 bg-emerald-500/10" 
                                : "text-[#6F4E37] dark:text-[#E6C280] hover:bg-[#6F4E37]/10 dark:hover:bg-[#E6C280]/10"
                            }`}
                          >
                            {copiedCode === coupon.code ? <><Check className="w-3 h-3" /> Copied</> : <><Copy className="w-3 h-3" /> Copy</>}
                          </button>
                        </div>
                      </div>
                    </div>
  
                    {/* Read More Trigger */}
                    <button 
                      onClick={() => setExpandedCard(isExpanded ? null : idx)}
                      className="w-full py-2 bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 text-center text-[10px] font-bold uppercase tracking-wider text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300 transition-colors flex items-center justify-center gap-1"
                    >
                      {isExpanded ? 'Hide Details' : 'Read More'} 
                      <ChevronDown className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                    </button>
  
                    {/* Expanded Details Section */}
                    {isExpanded && (
                      <div className="px-5 py-4 bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 animate-fade-in-up">
                        <div className="mb-3">
                          <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">Duration</span>
                          <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">{coupon.validity}</span>
                        </div>
                        <div>
                          <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">Terms</span>
                          <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">{coupon.terms}</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
          </div>

          {/* Mobile Footer link */}
          <div className="md:hidden mt-8 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-xl p-4 flex items-center justify-between cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
            <p className="text-[12px] text-zinc-600 dark:text-zinc-400 font-medium">Drip Hunter - Official Store</p>
            <Plus className="w-4 h-4 text-zinc-400" />
          </div>
      </main>

      {/* Desktop Footer */}
      <div className="hidden md:block mt-auto">
        <Footer />
      </div>
    </div>
  );
}
