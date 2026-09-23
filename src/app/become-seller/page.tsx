"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import AppHeader from "@/components/app-shell/AppHeader";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Zap,
  TrendingUp,
  Sparkles,
  Sliders,
  DollarSign,
  Package,
  Building2,
  CheckCircle2,
  Lock,
  Headphones,
  Check,
  Search
} from "lucide-react";

export default function BecomeSellerPage() {

  const [activeSlide, setActiveSlide] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [containerWidth, setContainerWidth] = useState(800);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Consignment Earnings Estimator
  const [itemPrice, setItemPrice] = useState<number>(18500);
  const [itemCategory, setItemCategory] = useState<string>("sneakers");

  // Application Form State
  const [boutiqueName, setBoutiqueName] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [inventoryCount, setInventoryCount] = useState("10-50 Pieces");
  const [cityVal, setCityVal] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation();
  const { ref: reasonsRef, isVisible: reasonsVisible } = useScrollAnimation();
  const { ref: processRef, isVisible: processVisible } = useScrollAnimation();
  const { ref: calcRef, isVisible: calcVisible } = useScrollAnimation();
  const { ref: storiesRef, isVisible: storiesVisible } = useScrollAnimation();
  const { ref: formRef, isVisible: formVisible } = useScrollAnimation();

  const storiesScrollRef = useRef<HTMLDivElement>(null);

  const categoryScrollRef = useRef<HTMLDivElement>(null);
  const [categoryProgress, setCategoryProgress] = useState(0);

  // Flat commission calculation
  const commissionRate = itemCategory === "luxury" ? 0.07 : 0.08;
  const driphunterFee = Math.round(itemPrice * commissionRate);
  const sellerPayout = itemPrice - driphunterFee;
  const competitorFee = Math.round(itemPrice * 0.20); // 20% on typical consignment
  const sellerSavings = competitorFee - driphunterFee;

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 4000);
  };

  const handleCategoryScroll = () => {
    const container = categoryScrollRef.current;
    if (container) {
      setScrollLeft(container.scrollLeft);
      setContainerWidth(container.clientWidth);
      const scrollL = container.scrollLeft;
      const maxScrollLeft = container.scrollWidth - container.clientWidth;
      const percentage = maxScrollLeft > 0 ? (scrollL / maxScrollLeft) * 100 : 0;
      setCategoryProgress(percentage);
    }
  };

  const scrollCategoryNext = () => {
    categoryScrollRef.current?.scrollBy({ left: 340, behavior: "smooth" });
  };

  const scrollCategoryPrev = () => {
    categoryScrollRef.current?.scrollBy({ left: -340, behavior: "smooth" });
  };

  useEffect(() => {
    handleCategoryScroll();
    const container = categoryScrollRef.current;
    if (container) {
      container.addEventListener("scroll", handleCategoryScroll);
      setContainerWidth(container.clientWidth);
    }
    window.addEventListener("resize", handleCategoryScroll);
    return () => {
      if (container) {
        container.removeEventListener("scroll", handleCategoryScroll);
      }
      window.removeEventListener("resize", handleCategoryScroll);
    };
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!boutiqueName || !contactEmail || !contactName) {
      triggerToast("Please fill in all mandatory seller fields.");
      return;
    }
    setIsSubmitted(true);
    triggerToast("Application received! Your curator verification token has been generated.");
  };

  const reasons = [
    {
      index: "01 // REACH",
      title: "Global Reach",
      description: "Connect with streetwear collectors, vintage curators, and high-end sneaker enthusiasts nationwide without borders.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80",
      wide: true
    },
    {
      index: "02 // LEGIT",
      title: "Legit-Check Network",
      description: "Every item undergoes in-hand physical verification by our authentication curators to build absolute community trust.",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80",
      wide: false
    },
    {
      index: "03 // ESCROW",
      title: "Secure Payouts",
      description: "Get prompt payouts directly into your bank account or UPI with safe transaction escrow and guaranteed zero chargebacks.",
      image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80",
      wide: false
    },
    {
      index: "04 // ANL",
      title: "Seller Analytics",
      description: "Track live market valuation graphs, historical drop sales metrics, and active buyer demand heatmaps in real time.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      wide: true
    },
    {
      index: "05 // FEES",
      title: "Flat Commission",
      description: "Keep up to 93% of your sale value with our ultra-transparent flat commission structure and zero hidden listing costs.",
      image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=800&q=80",
      wide: false
    },
    {
      index: "06 // DROP",
      title: "Exclusive Drops",
      description: "Showcase limited archives, bespoke domestic streetwear collections, and rare grails to an active luxury buyer demographic.",
      image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80",
      wide: true
    }
  ];

  const popularCategories = [
    {
      name: "Sneakers & Kicks",
      tags: "Hyped, Rare, Verified, Collectors",
      image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=600&q=80"
    },
    {
      name: "Tees & Tops",
      tags: "Vintage, Box-Logo, Graphic, Street",
      image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80"
    },
    {
      name: "Hoodies & Sweats",
      tags: "Heavyweight, Cozy, Essential, Premium",
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=600&q=80"
    },
    {
      name: "Outerwear & Jackets",
      tags: "Varsity, Puffer, Leather, Shells",
      image: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=600&q=80"
    },
    {
      name: "Bottoms & Denim",
      tags: "Double-Knee, Cargo, Selvedge, Relaxed",
      image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=600&q=80"
    },
    {
      name: "Vintage Archives",
      tags: "Single-Stitch, Rare, Retro, Sportswear",
      image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80"
    },
    {
      name: "Accessories & Bags",
      tags: "Luxury, Wallets, Caps, Eyewear",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80"
    }
  ];

  const processSteps = [
    {
      num: "Step 01",
      title: "Set Up Shop",
      description: "Create your verified seller profile and list your domestic label or consignment boutique on the DripHunter network.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=600&q=80",
      code: "DH-REG-01"
    },
    {
      num: "Step 02",
      title: "List Items",
      description: "Upload high-resolution photos and specifications of your authentic streetwear grails and limited drop inventory.",
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80",
      code: "DH-LST-02"
    },
    {
      num: "Step 03",
      title: "Ship Drop",
      description: "When an item sells, ship it to our central inspection facility using our prepaid secure courier shipping label.",
      image: "https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&w=600&q=80",
      code: "DH-VFY-03"
    },
    {
      num: "Step 04",
      title: "Get Paid",
      description: "Upon passing physical verification, the piece is dispatched to the buyer and your payout is transferred instantly.",
      image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=600&q=80",
      code: "DH-PAY-04"
    }
  ];

  const stories = [
    {
      quote: "DripHunter completely modernized how we manage our rare sneaker inventory. The physical authentication check gives buyers 100% confidence, and our grails sell out in hours.",
      name: "Kabir Dev",
      handle: "@kabir.kicks",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
      video: "K5gm-S6ManA",
      location: "DELHI, IN",
      volume: "₹38L+ Gross Volume"
    },
    {
      quote: "The 8% flat fee is unbeatable compared to old-school 20-25% consignment stores. Real-time payouts and zero fraudulent return disputes make it effortless.",
      name: "Aanya Verma",
      handle: "@aanya.archives",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
      video: "TUu0vlMtnuQ",
      location: "MUMBAI, IN",
      volume: "180+ Grails Sold"
    },
    {
      quote: "The seller analytics dashboard lets us price limited drops dynamically based on genuine verified buyer demand. Indispensable for high-end boutique consignment.",
      name: "Rohan Malhotra",
      handle: "@rohan.grails",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
      video: "1Civ9B5CXac",
      location: "BANGALORE, IN",
      volume: "₹24L+ Gross Volume"
    },
    {
      quote: "Switching to DripHunter was the best decision for my vintage streetwear brand. The platform's reach is insane and the dashboard is incredibly intuitive.",
      name: "Aryan Patel",
      handle: "@aryan.vintage",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80",
      video: "K5gm-S6ManA",
      location: "PUNE, IN",
      volume: "₹15L+ Gross Volume"
    },
    {
      quote: "Zero chargebacks and the guaranteed authentication process gives us total peace of mind. We've tripled our sales in just 6 months.",
      name: "Sneha Reddy",
      handle: "@sneha.hype",
      image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=600&q=80",
      video: "TUu0vlMtnuQ",
      location: "HYDERABAD, IN",
      volume: "120+ Grails Sold"
    },
    {
      quote: "The 24h verification clearance means faster payouts. No other platform offers such a streamlined and secure consignment process in India.",
      name: "Vikram Singh",
      handle: "@vikram.drip",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80",
      video: "1Civ9B5CXac",
      location: "CHANDIGARH, IN",
      volume: "₹42L+ Gross Volume"
    }
  ];

  const nextSlide = () => setActiveSlide((prev) => (prev + 1) % stories.length);
  const prevSlide = () => setActiveSlide((prev) => (prev - 1 + stories.length) % stories.length);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % stories.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [stories.length]);

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5] dark:bg-[#0C0B0A] text-zinc-900 dark:text-white font-sans antialiased overflow-x-hidden select-none transition-colors duration-300 w-full">
      {/* Toast */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 px-5 py-3 rounded-2xl font-mono text-xs font-bold shadow-2xl flex items-center gap-2.5 border border-white/10 animate-fade-in">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMsg}</span>
        </div>
      )}

      <AppHeader title="Become a Seller" variant="contextual" showActions={true} />

      {/* ─── SECTION 1: PREMIUM EDITORIAL HERO ─── */}
      <section
        ref={heroRef}
        className="relative w-full min-h-0 py-12 lg:min-h-[calc(100vh-72px)] flex items-start lg:items-center lg:py-6 overflow-hidden transition-all duration-1000 ease-out"
      >
        {/* Subtle ambient background glow */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#6F4E37]/10 dark:bg-[#E6C280]/5 blur-[120px] rounded-full translate-x-1/3 -translate-y-1/4 z-0 pointer-events-none" />

        <div className="relative z-10 w-full max-w-[1600px] mx-auto px-4 sm:px-12 md:px-16 lg:px-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left: Typography & Metrics */}
          <div className={cn("lg:col-span-6 xl:col-span-5 space-y-8 lg:pr-8 transition-all duration-700", heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
            
            {/* Badges removed per user request */}

            {/* Preserved Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight text-zinc-950 dark:text-white font-playfair leading-[1.05]">
                Become a <br />
                Driphunter <br className="hidden sm:inline" />
                <span className="font-serif italic text-[#6F4E37] dark:text-[#E6C280]">Seller</span>
              </h1>
              <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed max-w-lg">
                Start your selling journey on Driphunter and join our curated seller network. Reach thousands of collectors nationwide looking for verified streetwear, vintage archives, and limited sneaker drops.
              </p>
            </div>

            {/* CTA Button removed per user request */}

            {/* Verified Metrics Grid */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-6 pt-10 border-t border-stone-200 dark:border-zinc-800/80">
              <div>
                <span className="text-3xl font-light font-playfair text-[#6F4E37] dark:text-[#E6C280] block leading-none">
                  8%
                </span>
                <span className="text-[9px] font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-widest block mt-2 font-bold">
                  Flat Seller Fee
                </span>
              </div>
              <div>
                <span className="text-3xl font-light font-playfair text-zinc-950 dark:text-white block leading-none">
                  ₹0
                </span>
                <span className="text-[9px] font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-widest block mt-2 font-bold">
                  Free Authentication
                </span>
              </div>
              <div>
                <span className="text-3xl font-light font-playfair text-[#6F4E37] dark:text-[#E6C280] block leading-none">
                  0%
                </span>
                <span className="text-[9px] font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-widest block mt-2 font-bold">
                  Fraud Chargebacks
                </span>
              </div>
              <div>
                <span className="text-3xl font-light font-playfair text-zinc-950 dark:text-white block leading-none">
                  24h
                </span>
                <span className="text-[9px] font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-widest block mt-2 font-bold">
                  Verification Clearance
                </span>
              </div>
            </div>

          </div>

          {/* Right: Asymmetrical Image Collage */}
          <div className={cn("lg:col-span-6 xl:col-span-7 relative h-[350px] sm:h-[450px] lg:h-[500px] xl:h-[550px] w-full hidden sm:block transition-all duration-1000 delay-200", heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
            {/* Main Image */}
            <div className="absolute top-0 right-0 w-[85%] h-[85%] rounded-[2rem] sm:rounded-[3rem] overflow-hidden border-4 border-white dark:border-zinc-900 shadow-2xl z-10">
              <img 
                src="https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1200&q=80" 
                alt="Premium Sneaker Display"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Overlapping Secondary Image */}
            <div className="absolute bottom-0 left-0 w-[55%] h-[55%] rounded-[2rem] overflow-hidden border-4 border-white dark:border-zinc-900 shadow-2xl z-20 transition-transform duration-700 hover:-translate-y-4">
              <img 
                src="https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80" 
                alt="Sneaker Verification"
                className="w-full h-full object-cover"
              />
              {/* Overlay Badge */}
              <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-black/80 backdrop-blur-md px-4 py-2 rounded-xl shadow-lg border border-white/20">
                <span className="text-[9px] font-mono font-bold text-zinc-950 dark:text-white uppercase tracking-widest flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Legit-Checked
                </span>
              </div>
            </div>
            
            {/* Decorative Element */}
            <div className="absolute top-1/4 -left-4 w-24 h-24 bg-[#6F4E37]/10 dark:bg-[#E6C280]/20 rounded-full blur-xl z-0" />
          </div>

        </div>
      </section>

      <main className="flex-grow py-10 sm:py-16 px-4 sm:px-12 md:px-16 lg:px-20 w-full max-w-[1600px] mx-auto space-y-14 sm:space-y-20 overflow-hidden">
        {/* ─── SECTION 2: WHY SELLERS CHOOSE DRIPHUNTER (PRESERVED HEADING) ─── */}
        <section
          ref={reasonsRef}
          className="w-full space-y-8 md:space-y-10"
        >
          <div className={cn("text-center max-w-2xl mx-auto space-y-3 transition-all duration-700", reasonsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
            <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-[#6F4E37] dark:text-[#E6C280] uppercase">
              BENEFITS
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-zinc-950 dark:text-zinc-50 font-playfair leading-[1.05]">
              Why sellers choose <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280]">Driphunter?</span>
            </h2>
            <div className="w-10 h-[2px] bg-[#6F4E37] dark:bg-[#E6C280] mx-auto mt-2 rounded-full" />
          </div>

          <div className={cn("grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 transition-all duration-700 delay-200", reasonsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
            {reasons.map((reason, idx) => {
              const [num, label] = reason.index.split(" // ");
              return (
                <div
                  key={idx}
                  className={`bg-white dark:bg-zinc-900/80 border border-stone-200/90 dark:border-zinc-800/90 rounded-[32px] p-6 sm:p-8 hover:shadow-xl hover:border-[#6F4E37]/45 dark:hover:border-[#E6C280]/40 transition-all duration-500 hover:-translate-y-1.5 group flex flex-col justify-between relative overflow-hidden text-left ${
                    reason.wide ? "lg:col-span-2" : "lg:col-span-1"
                  }`}
                >
                  <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#6F4E37] dark:bg-[#E6C280] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-10" />

                  {reason.wide ? (
                    <div className="flex flex-col md:flex-row items-stretch gap-6 sm:gap-8 w-full h-full relative z-10">
                      <div className="relative w-full md:w-[46%] aspect-[16/10] md:aspect-[4/3] rounded-2xl overflow-hidden border border-stone-200 dark:border-zinc-800 shadow-sm shrink-0">
                        <img
                          src={reason.image}
                          alt={reason.title}
                          className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                        />
                        <div className="absolute top-3.5 left-3.5 bg-zinc-950/80 backdrop-blur-md border border-zinc-800 px-3 py-1 rounded-lg">
                          <span className="text-[8px] font-mono font-bold tracking-wider text-[#E6C280] uppercase">
                            node.{label.toLowerCase()}
                          </span>
                        </div>
                      </div>

                      <div className="flex-grow flex flex-col justify-between py-1 space-y-4">
                        <div className="space-y-3">
                          <div className="flex justify-between items-center border-b border-stone-100 dark:border-zinc-800 pb-3">
                            <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white uppercase tracking-wider font-sans group-hover:text-[#6F4E37] dark:group-hover:text-[#E6C280] transition-colors">
                              {reason.title}
                            </h3>
                            <div className="flex items-center gap-2">
                              <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280]">{num}</span>
                              <span className="text-[8px] font-mono tracking-[0.2em] text-zinc-400 dark:text-zinc-500 uppercase font-bold">{label}</span>
                            </div>
                          </div>
                          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans font-normal">
                            {reason.description}
                          </p>
                        </div>

                        <div className="flex items-center justify-between border-t border-stone-100 dark:border-zinc-800 pt-3 text-[9px] font-mono text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-wider">
                          <span>VERIFIED SYSTEM</span>
                          <span className="text-[#6F4E37] dark:text-[#E6C280]">SECURE NODE // 0{idx+1}</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="relative z-10 h-full flex flex-col justify-between space-y-4">
                      <div>
                        <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden mb-5 border border-stone-200 dark:border-zinc-800 shadow-sm">
                          <img
                            src={reason.image}
                            alt={reason.title}
                            className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                          />
                          <div className="absolute top-3.5 left-3.5 bg-zinc-950/80 backdrop-blur-md border border-zinc-800 px-3 py-1 rounded-lg">
                            <span className="text-[8px] font-mono font-bold tracking-wider text-[#E6C280] uppercase">
                              node.{label.toLowerCase()}
                            </span>
                          </div>
                        </div>

                        <div className="flex justify-between items-center border-b border-stone-100 dark:border-zinc-800 pb-3 mb-3">
                          <h3 className="text-base font-bold text-zinc-900 dark:text-white uppercase tracking-wider font-sans group-hover:text-[#6F4E37] dark:group-hover:text-[#E6C280] transition-colors">
                            {reason.title}
                          </h3>
                          <div className="flex items-center gap-2">
                            <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280]">{num}</span>
                            <span className="text-[8px] font-mono tracking-[0.2em] text-zinc-400 dark:text-zinc-500 uppercase font-bold">{label}</span>
                          </div>
                        </div>
                        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans font-normal">
                          {reason.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between border-t border-stone-100 dark:border-zinc-800 pt-3 text-[9px] font-mono text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-wider">
                        <span>VERIFIED SYSTEM</span>
                        <span className="text-[#6F4E37] dark:text-[#E6C280]">SECURE NODE // 0{idx+1}</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ─── INTERACTIVE CONSIGNMENT PAYOUT CALCULATOR ─── */}
        <section
          id="calculator-section"
          ref={calcRef}
          className="w-full"
        >
          <div className={cn("bg-white dark:bg-zinc-900/80 border border-stone-200/90 dark:border-zinc-800/90 rounded-[36px] p-6 sm:p-12 shadow-sm text-left select-none transition-all duration-1000 ease-out", calcVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 lg:gap-12">
              
              <div className="space-y-6 flex-1 max-w-xl">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1.5 text-[9.5px] font-mono font-bold text-[#6F4E37] dark:text-[#E6C280] uppercase tracking-[0.25em]">
                    <Sliders className="w-3.5 h-3.5" />
                    <span>CONSIGNMENT FEE ESTIMATOR</span>
                  </div>
                  <h3 className="text-2xl sm:text-4xl font-light font-playfair uppercase tracking-tight text-zinc-950 dark:text-white">
                    Compare Your <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280]">Payout</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed">
                    See exactly how much more you earn with DripHunter's transparent 8% seller fee compared to traditional 20-25% consignment stores.
                  </p>
                </div>

                {/* Category Switcher */}
                <div className="space-y-2">
                  <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                    Category:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "sneakers", label: "Sneakers (8%)" },
                      { id: "streetwear", label: "Apparel (8%)" },
                      { id: "luxury", label: "Luxury Grail (7%)" }
                    ].map((c) => (
                      <button
                        key={c.id}
                        onClick={() => setItemCategory(c.id)}
                        className={`py-2.5 px-3 rounded-2xl text-[11px] font-mono font-bold uppercase tracking-wider transition-all duration-300 border cursor-pointer ${
                          itemCategory === c.id
                            ? "bg-[#6F4E37] text-white border-[#6F4E37] dark:bg-[#E6C280] dark:text-zinc-950 dark:border-[#E6C280] shadow-xs"
                            : "bg-stone-50 dark:bg-zinc-800 border-stone-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-stone-100"
                        }`}
                      >
                        {c.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Slider */}
                <div className="space-y-3 pt-2">
                  <div className="flex justify-between items-center text-xs font-mono font-bold">
                    <span className="text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                      Item Listed Price
                    </span>
                    <span className="text-[#6F4E37] dark:text-[#E6C280] text-sm bg-stone-100 dark:bg-zinc-800 px-3 py-1 rounded-xl">
                      ₹{itemPrice.toLocaleString()}
                    </span>
                  </div>

                  <input
                    type="range"
                    min="3000"
                    max="100000"
                    step="1000"
                    value={itemPrice}
                    onChange={(e) => setItemPrice(Number(e.target.value))}
                    className="w-full h-2.5 bg-stone-200 dark:bg-zinc-800 rounded-full appearance-none cursor-pointer accent-[#6F4E37] dark:accent-[#E6C280]"
                  />

                  <div className="flex justify-between text-[9px] font-mono text-zinc-400">
                    <span>₹3,000</span>
                    <span>₹50,000</span>
                    <span>₹1,00,000</span>
                  </div>
                </div>
              </div>

              {/* Output Box */}
              <div className="bg-gradient-to-br from-[#FAF6F0] via-[#F3ECE0] to-[#E9DFCF] dark:from-[#18181B] dark:via-[#141415] dark:to-[#0C0B0A] border border-stone-300/80 dark:border-zinc-800 rounded-[32px] p-8 sm:p-10 flex flex-col justify-between space-y-6 lg:w-96 shadow-md">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#6F4E37] dark:text-[#E6C280] uppercase block">
                    YOU TAKE HOME
                  </span>
                  <div className="text-4xl sm:text-5xl font-mono font-bold text-zinc-950 dark:text-white tracking-tight">
                    ₹{sellerPayout.toLocaleString()}
                  </div>
                  <p className="text-[11px] font-mono text-emerald-700 dark:text-emerald-400 font-bold">
                    +₹{sellerSavings.toLocaleString()} extra in your pocket vs. 20% offline consignment
                  </p>
                </div>

                <div className="space-y-2.5 pt-4 border-t border-stone-300/70 dark:border-zinc-800 text-[11px] font-mono text-zinc-700 dark:text-zinc-300">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">DripHunter Fee ({(commissionRate * 100).toFixed(0)}%):</span>
                    <span>₹{driphunterFee.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Physical Legit-Check:</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">₹0 (Free)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Payment Processing:</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">Included</span>
                  </div>
                </div>

                <a
                  href="#apply-section"
                  className="w-full bg-zinc-950 hover:bg-[#6F4E37] text-white dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-[#E6C280] text-[10.5px] font-mono font-bold uppercase tracking-wider py-3.5 rounded-xl transition-all text-center block shadow-sm active:scale-95"
                >
                  List This Item Now →
                </a>
              </div>

            </div>
          </div>
        </section>

        {/* ─── SECTION 3: HOW TO SELL PROCESS TIMELINE (PRESERVED HEADING) ─── */}
        <section
          ref={processRef}
          className="w-full space-y-8"
        >
          <div className={cn("text-center max-w-2xl mx-auto space-y-3 transition-all duration-700", processVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
            <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-[#6F4E37] dark:text-[#E6C280] uppercase">
              PROCESS FLOW
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-zinc-950 dark:text-zinc-50 font-playfair leading-[1.05]">
              How to sell on <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280]">Driphunter.com</span>
            </h2>
            <div className="w-10 h-[2px] bg-[#6F4E37] dark:bg-[#E6C280] mx-auto mt-2 rounded-full" />
          </div>

          <div className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 transition-all duration-700 delay-200", processVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
            {processSteps.map((step, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-zinc-900/80 border border-stone-200/90 dark:border-zinc-800/90 rounded-[32px] p-6 shadow-xs transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl hover:border-[#6F4E37]/35 dark:hover:border-[#E6C280]/40 relative overflow-hidden group flex flex-col justify-between text-left min-h-[360px]"
              >
                <div className="absolute -top-4 -right-1 text-7xl font-playfair font-black text-stone-100 dark:text-zinc-800/40 select-none pointer-events-none group-hover:text-[#6F4E37]/10 dark:group-hover:text-[#E6C280]/15 transition-colors duration-500 z-0">
                  0{idx + 1}
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#6F4E37] dark:bg-[#E6C280] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-10" />

                <div className="space-y-4 z-10">
                  <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden border border-stone-200 dark:border-zinc-800 shadow-sm shrink-0">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-[8.5px] font-mono font-bold uppercase tracking-[0.2em] px-2.5 py-0.5 border border-[#6F4E37]/35 dark:border-[#E6C280]/30 rounded-md bg-[#6F4E37]/5 dark:bg-[#E6C280]/10 text-[#6F4E37] dark:text-[#E6C280] inline-block">
                      {step.num}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white uppercase tracking-wider font-sans group-hover:text-[#6F4E37] dark:group-hover:text-[#E6C280] transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans font-normal">
                      {step.description}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center border-t border-stone-100 dark:border-zinc-800 pt-3 mt-4 z-10">
                  <span className="text-[8px] font-mono tracking-[0.15em] text-zinc-400 dark:text-zinc-500 font-bold">REGISTRY CODE</span>
                  <span className="text-[9px] font-mono font-bold text-[#6F4E37] dark:text-[#E6C280]">{step.code}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── SECTION 4: SELLER SUCCESS STORIES (PRESERVED HEADING) ─── */}
        <section
          ref={storiesRef}
          className="w-full space-y-8"
        >
          <div className={cn("text-center max-w-2xl mx-auto space-y-3 transition-all duration-700", storiesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
            <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-[#6F4E37] dark:text-[#E6C280] uppercase">
              TESTIMONIALS
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-zinc-950 dark:text-zinc-50 font-playfair leading-[1.05]">
              Seller Success <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280]">Stories</span>
            </h2>
            <div className="w-10 h-[2px] bg-[#6F4E37] dark:bg-[#E6C280] mx-auto mt-2 rounded-full" />
          </div>

          <div className={cn("relative w-full group/carousel pt-8 md:pt-12 pb-16 transition-all duration-700 delay-200", storiesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
            {/* Left Carousel Button */}
            <button
              onClick={() => storiesScrollRef.current?.scrollBy({ left: -350, behavior: "smooth" })}
              className="absolute left-0 sm:-left-6 lg:-left-12 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border border-stone-200 dark:border-zinc-800 hover:border-[#6F4E37] text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-900 transition-all duration-300 cursor-pointer shadow-xl flex items-center justify-center opacity-100 sm:opacity-0 sm:group-hover/carousel:opacity-100"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Scrollable Container */}
            <div
              ref={storiesScrollRef}
              className="flex gap-6 lg:gap-8 overflow-x-auto scrollbar-none snap-x snap-mandatory py-4 px-2 sm:px-0"
            >
              {stories.map((story, idx) => (
                <VideoStoryCard key={idx} story={story} />
              ))}
            </div>

            {/* Right Carousel Button */}
            <button
              onClick={() => storiesScrollRef.current?.scrollBy({ left: 350, behavior: "smooth" })}
              className="absolute right-0 sm:-right-6 lg:-right-12 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border border-stone-200 dark:border-zinc-800 hover:border-[#6F4E37] text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-900 transition-all duration-300 cursor-pointer shadow-xl flex items-center justify-center opacity-100 sm:opacity-0 sm:group-hover/carousel:opacity-100"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </section>

        {/* ─── SECTION 5: DRIP THAT FLOWS WITH THE seasons (PRESERVED HEADING) ─── */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full relative z-10 py-8 md:py-16 mt-8 md:mt-16">
          
          <div className="lg:col-span-4 flex flex-col justify-between h-full space-y-6 text-left">
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-none text-zinc-900 dark:text-white font-sans uppercase">
                <span className="font-light tracking-wide text-transparent block select-none drip-outline-text" style={{ WebkitTextStroke: "1.5px currentColor" }}>
                  DRIP
                </span>{" "}
                THAT FLOWS WITH THE <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280] lowercase">seasons</span>
              </h2>
              
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans font-normal max-w-sm">
                Explore our curated categories of premium streetwear, sneakers, and vintage archives. Sell your grails securely to a dedicated collector network.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={scrollCategoryPrev}
                className="w-11 h-11 rounded-full border border-stone-200 dark:border-zinc-800 hover:border-[#6F4E37] text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-900 transition-all duration-300 cursor-pointer shadow-xs flex items-center justify-center"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={scrollCategoryNext}
                className="w-11 h-11 rounded-full border border-stone-200 dark:border-zinc-800 hover:border-[#6F4E37] text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-900 transition-all duration-300 cursor-pointer shadow-xs flex items-center justify-center"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-8 w-full relative">
            <div
              ref={categoryScrollRef}
              className="flex gap-5 sm:gap-6 overflow-x-auto scrollbar-none snap-x snap-mandatory py-4 cursor-grab active:cursor-grabbing select-none"
              onScroll={handleCategoryScroll}
            >
              {popularCategories.map((cat, idx) => (
                <div
                  key={idx}
                  className="w-[260px] sm:w-[300px] shrink-0 bg-white dark:bg-zinc-900/80 border border-stone-200/90 dark:border-zinc-800/90 rounded-[32px] p-4 shadow-sm snap-start transition-all duration-500 hover:-translate-y-1.5 hover:border-[#6F4E37]/40 dark:hover:border-[#E6C280]/40 group"
                >
                  <div className="relative aspect-[3/4] w-full rounded-[24px] overflow-hidden border border-stone-100 dark:border-zinc-800 bg-stone-100 dark:bg-zinc-900 shadow-inner mb-3.5 cursor-pointer">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

                    <div className="absolute bottom-4 left-3 right-3 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border border-stone-200 dark:border-zinc-800 px-3.5 py-2.5 rounded-xl shadow-md text-left">
                      <p className="text-[10px] text-zinc-900 dark:text-zinc-100 font-sans font-semibold leading-tight">
                        {cat.tags}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center px-1.5 py-1">
                    <h3 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider font-sans group-hover:text-[#6F4E37] dark:group-hover:text-[#E6C280] transition-colors">
                      {cat.name}
                    </h3>
                    <a
                      href="#apply-section"
                      className="border border-[#6F4E37]/45 dark:border-[#E6C280]/40 hover:border-[#6F4E37] dark:hover:border-[#E6C280] bg-transparent hover:bg-[#6F4E37] dark:hover:bg-[#E6C280] rounded-full px-3.5 py-1.5 text-[8px] font-mono font-bold uppercase tracking-widest text-[#6F4E37] dark:text-[#E6C280] hover:text-white dark:hover:text-zinc-950 transition-all duration-300 cursor-pointer shadow-xs active:scale-95 block"
                    >
                      SELL
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="w-full pt-4 flex items-center justify-between">
              <div className="flex-1 max-w-xs h-[2px] bg-stone-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#6F4E37] dark:bg-[#E6C280] transition-all duration-300 ease-out"
                  style={{ width: `${categoryProgress}%` }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: SUPPLIER SUPPORT HELPDESK (PRESERVED HEADING) ─── */}
        <section className="w-full relative z-10">
          <div className="bg-white dark:bg-zinc-900 border border-stone-200/90 dark:border-zinc-800 rounded-[36px] p-6 sm:p-10 md:p-14 relative overflow-hidden shadow-md text-left">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
              <div className="lg:col-span-7 space-y-5 relative z-10">
                <div className="space-y-3">
                  <span className="text-[9px] font-mono font-bold tracking-[0.25em] text-[#6F4E37] dark:text-[#E6C280] uppercase bg-stone-100 dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 px-3.5 py-1.5 rounded-full inline-block">
                    CURATOR HELPDESK // 24-7 DIRECT LINE
                  </span>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-zinc-950 dark:text-zinc-50 font-playfair leading-[1.05]">
                    Driphunter <br />
                    <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280]">Supplier Support</span>
                  </h2>
                  <div className="flex items-center gap-2 text-[9px] font-mono font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 px-3.5 py-1 rounded-full w-fit">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    LIVE CURATOR ONLINE
                  </div>
                </div>
                
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-sans font-normal max-w-xl">
                  Our partner curator desk is online around the clock. Whether you need help setting up your payment escrow ledger, authenticating a rare archive drop, or tracking shipping status to our verification hub, our support curators are here to escort your transactions.
                </p>

                <div className="flex flex-wrap gap-3.5 pt-2">
                  <Link
                    href="/contact"
                    className="bg-zinc-950 hover:bg-[#6F4E37] text-white dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-[#E6C280] text-xs font-mono font-bold uppercase tracking-widest py-3.5 px-6 sm:px-8 rounded-xl transition-all duration-300 shadow-md active:scale-95 flex items-center gap-2"
                  >
                    <span>Contact Support</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <div className="flex items-center gap-2 px-4 py-2.5 border border-stone-200 dark:border-zinc-700 rounded-xl bg-stone-50 dark:bg-zinc-800">
                    <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider font-bold">DIRECT:</span>
                    <a href="mailto:support@driphunter.com" className="text-xs font-bold text-zinc-900 dark:text-zinc-100 hover:text-[#6F4E37] dark:hover:text-[#E6C280] transition-colors font-mono">
                      support@driphunter.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 flex justify-center relative z-10 w-full">
                <div className="relative w-full max-w-md aspect-[4/3] rounded-[28px] overflow-hidden border border-stone-200 dark:border-zinc-800 shadow-md bg-stone-100">
                  <img
                    src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80"
                    alt="Driphunter Supplier Support Workspace"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-sm text-white text-[8px] font-mono tracking-widest uppercase px-3 py-1.5 rounded-lg border border-white/10 shadow-md flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    desk.active.08
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 7: BOTTOM ONBOARDING CTA ─── */}
        <section
          id="apply-section"
          ref={formRef}
          className="w-full flex justify-center"
        >
          <div className={cn("w-full max-w-4xl mx-auto bg-white dark:bg-zinc-900 border border-stone-200/90 dark:border-zinc-800 rounded-[36px] p-6 sm:p-16 shadow-lg text-center select-none space-y-8 transition-all duration-1000 ease-out", formVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
            <div className="space-y-4">
              <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-[#6F4E37] dark:text-[#E6C280] uppercase block">
                DRIPHUNTER GLOBAL PARTNERSHIP
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-zinc-950 dark:text-zinc-50 font-playfair leading-[1.05] uppercase">
                Become a <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280]">Driphunter Seller</span>
              </h2>
              <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed max-w-2xl mx-auto">
                Join our exclusive curator community and reach thousands of collectors nationwide looking for verified streetwear, vintage archives, and limited brand drops. Start your selling journey today.
              </p>
            </div>

            <div className="pt-4 pb-2">
              <Link 
                href="/start-selling"
                className="inline-flex items-center justify-center gap-3 bg-zinc-950 hover:bg-[#6F4E37] text-white dark:bg-white dark:text-zinc-950 dark:hover:bg-[#E6C280] transition-colors duration-300 px-10 py-5 rounded-2xl text-xs font-mono font-bold uppercase tracking-widest shadow-xl hover:shadow-2xl hover:-translate-y-1 active:translate-y-0"
              >
                <span>Start Selling</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="flex justify-center items-center gap-6 pt-4 border-t border-stone-100 dark:border-zinc-800">
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 dark:text-zinc-400">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Verified Escrow</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 dark:text-zinc-400">
                <Zap className="w-4 h-4 text-[#E6C280]" />
                <span>Instant Payouts</span>
              </div>
            </div>
          </div>
        </section>

      </main>


    </div>
  );
}

const VideoStoryCard = ({ story }: { story: any }) => {
  return (
    <div
      className="relative group rounded-[32px] overflow-hidden aspect-[9/16] md:aspect-[3/4] lg:aspect-[9/14] border-2 border-stone-200/50 dark:border-zinc-800/50 hover:border-[#6F4E37]/60 dark:hover:border-[#E6C280]/60 transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(111,78,55,0.3)] dark:hover:shadow-[0_20px_40px_-15px_rgba(230,194,128,0.2)] bg-zinc-900 w-[280px] sm:w-[320px] md:w-[350px] shrink-0 snap-center"
    >
      {/* Background YouTube Video */}
      <iframe
        className="absolute inset-0 w-[150%] h-[150%] left-[-25%] top-[-25%] pointer-events-none transition-transform duration-[2s] ease-out group-hover:scale-105"
        src={`https://www.youtube.com/embed/${story.video}?autoplay=1&mute=1&loop=1&playlist=${story.video}&controls=0&modestbranding=1&playsinline=1&rel=0`}
        allow="autoplay; encrypted-media"
        title="Seller Success Story"
        frameBorder="0"
      />
      
      {/* Dark Gradient Overlay for Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/90 pointer-events-none" />

      {/* Content Overlay */}
      <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end h-full">
        
        <div className="space-y-4 relative z-10 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
          {/* Quote */}
          <p className="text-sm font-light font-playfair leading-relaxed text-zinc-200 group-hover:text-white transition-colors line-clamp-4">
            <span className="text-2xl text-[#E6C280] font-serif leading-none align-bottom mr-1">“</span>
            {story.quote}
          </p>

          {/* Author Info */}
          <div className="pt-4 mt-4 border-t border-white/20 flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/30 group-hover:border-[#E6C280] transition-colors shadow-lg shrink-0">
              <img
                src={story.image}
                alt={story.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold text-white font-sans uppercase tracking-wider truncate">
                {story.name}
              </h4>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] text-zinc-400 font-mono tracking-wide truncate">
                  {story.handle}
                </span>
                <span className="w-1 h-1 rounded-full bg-zinc-600 shrink-0" />
                <span className="text-[9px] font-mono font-bold tracking-widest text-[#E6C280] uppercase truncate">
                  {story.location}
                </span>
              </div>
            </div>
          </div>
          
          {/* Floating Metric Badge */}
          <div className="inline-block mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
             <span className="text-[9.5px] font-mono font-bold text-zinc-950 bg-[#E6C280] px-3 py-1.5 rounded-full shadow-lg">
               {story.volume}
             </span>
          </div>

        </div>
      </div>
    </div>
  );
};

