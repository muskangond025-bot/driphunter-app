"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import StaticContentLayout from "@/components/layout/StaticContentLayout";
import PageContainer from "@/components/layout/PageContainer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);
import {
  ShieldCheck,
  Lock,
  Eye,
  Cookie,
  CreditCard,
  Server,
  Share2,
  UserCheck,
  Clock,
  Mail,
  ChevronRight,
  Printer,
  Copy,
  Check,
  Search,
  Sliders,
  FileSpreadsheet,
  Trash2,
  Edit3,
  Sparkles,
  X,
  Scale,
  Database,
  Layers,
  ShoppingBag,
  Truck,
  RotateCcw,
  Building,
  ExternalLink,
  ChevronDown,
  Info
} from "lucide-react";

export default function PrivacyPolicyPage() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [openSections, setOpenSections] = useState<string[]>([]);
  const toggleSection = (id: string) => setOpenSections(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]);
  const [searchTerm, setSearchTerm] = useState("");
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Comparison toggle
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);

  // Mobile-only smooth scroll
  useEffect(() => {
    if (window.innerWidth <= 768) {
      const lenis = new Lenis({ duration: 1.2 });
      function raf(time: number) { lenis.raf(time); requestAnimationFrame(raf); }
      requestAnimationFrame(raf);
      return () => lenis.destroy();
    }
  }, []);

  // Mobile-only GSAP animations
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(max-width: 768px)", () => {
      const ctx = gsap.context(() => {
        // Hero animation
        gsap.fromTo("h1", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out" });
        
        // Stagger grid cards
        const grids = gsap.utils.toArray(".grid");
        grids.forEach((grid: any) => {
          const cards = grid.children;
          if (cards.length > 0) {
            gsap.fromTo(cards, 
              { opacity: 0, y: 40 },
              { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, scrollTrigger: { trigger: grid, start: "top 85%" } }
            );
          }
        });

        // Section animations
        const sections = gsap.utils.toArray("section");
        sections.forEach((sec: any) => {
          gsap.fromTo(sec, 
            { opacity: 0, scale: 0.98 },
            { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out", scrollTrigger: { trigger: sec, start: "top 90%" } }
          );
        });
      }, containerRef);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, [activeTab]);



  const handleCopyLink = (id: string) => {
    const url = `${window.location.origin}/privacy#${id}`;
    navigator.clipboard.writeText(url);
    setCopiedSection(id);
    setTimeout(() => setCopiedSection(null), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const tabs = [
    { id: "all", label: "All 9 Sections", count: "9" },
    { id: "intake", label: "1. Information We Collect", icon: Eye },
    { id: "usage", label: "2. How We Use Info", icon: Layers },
    { id: "cookies", label: "3. Cookies & Tracking", icon: Cookie },
    { id: "payments", label: "4. Payments & Escrow", icon: CreditCard },
    { id: "security", label: "5. Data Security", icon: Lock },
    { id: "thirdparty", label: "6. Third-Party Services", icon: Share2 },
    { id: "rights", label: "7. User Rights", icon: UserCheck },
    { id: "retention", label: "8. Data Retention", icon: Clock },
    { id: "contact", label: "9. Contact Desk", icon: Mail },
  ];

  const shouldShowSection = (sectionKey: string) => {
    if (activeTab === "all") return true;
    return activeTab === sectionKey;
  };

  return (
    <div ref={containerRef}>
      <StaticContentLayout title="Privacy Policy">

      {/* ─── 1. BRIGHT LUXURY E-COMMERCE & CULTURE-CIRCLE HERO HEADER ─── */}
      <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#F4EFEA] via-[#FAF8F5] to-[#FAF8F5] border-b border-stone-200/80 pt-28 pb-14 px-4 sm:px-8 lg:px-12 xl:px-16">
        {/* Subtle Decorative Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#6F4E37_1px,transparent_1px)] [background-size:28px_28px] opacity-[0.03] pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-[500px] h-[300px] bg-amber-200/20 blur-[130px] rounded-full pointer-events-none" />

        <div className="w-full relative z-10 space-y-7 text-center">
          
          {/* Marketplace Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <div className="inline-flex items-center gap-2 bg-white border border-stone-300 text-[#6F4E37] font-mono text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full shadow-sm">
              <ShoppingBag className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>E-COMMERCE MARKETPLACE POLICY</span>
            </div>

            <div className="inline-flex items-center gap-2 bg-white border border-stone-300 text-emerald-700 font-mono text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>CULTURE-CIRCLE COMPLIANT // DPDP ACT 2023</span>
            </div>
          </div>

          {/* Main Title */}
          <div className="space-y-3 w-full">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-zinc-950 dark:text-zinc-50 font-playfair leading-[1.05] uppercase">
              PRIVACY <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280] lowercase">policy</span>
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-zinc-600 font-sans font-normal max-w-3xl mx-auto leading-relaxed">
              How DripHunter protects buyer and seller data across our curated streetwear marketplace, sneaker drops, deadstock archives, and Culture-Circle verified consignment network.
            </p>
          </div>

          {/* Quick Trust Highlights Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full pt-2">
            <div className="p-4 rounded-2xl bg-white border border-stone-200/90 shadow-sm text-left flex items-start gap-3 hover:border-[#6F4E37]/50 transition-all duration-300">
              <div className="w-9 h-9 rounded-xl bg-[#6F4E37]/10 text-[#6F4E37] flex items-center justify-center shrink-0">
                <Lock className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <span className="text-xs font-mono font-bold uppercase text-zinc-900 block">PCI-DSS Tokenized</span>
                <span className="text-[11px] text-zinc-500 font-sans">Zero raw card storage</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-stone-200/90 shadow-sm text-left flex items-start gap-3 hover:border-[#6F4E37]/50 transition-all duration-300">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <span className="text-xs font-mono font-bold uppercase text-zinc-900 block">Zero Data Sale</span>
                <span className="text-[11px] text-zinc-500 font-sans">Strict anti-ad broker rule</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-stone-200/90 shadow-sm text-left flex items-start gap-3 hover:border-[#6F4E37]/50 transition-all duration-300">
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                <Truck className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <span className="text-xs font-mono font-bold uppercase text-zinc-900 block">Logistics Shield</span>
                <span className="text-[11px] text-zinc-500 font-sans">OTP verified delivery only</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-stone-200/90 shadow-sm text-left flex items-start gap-3 hover:border-[#6F4E37]/50 transition-all duration-300">
              <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
                <UserCheck className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <span className="text-xs font-mono font-bold uppercase text-zinc-900 block">User Sovereignty</span>
                <span className="text-[11px] text-zinc-500 font-sans">DPDP Act 2023 Rights</span>
              </div>
            </div>
          </div>

          {/* Quick Utility Actions */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-mono">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-stone-50 border border-stone-300 text-zinc-700 transition-all cursor-pointer shadow-xs"
            >
              <Printer className="w-3.5 h-3.5 text-[#6F4E37]" />
              <span>Print Document</span>
            </button>

            <button
              onClick={() => setIsComparisonOpen(!isComparisonOpen)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-stone-50 border border-[#6F4E37]/30 text-[#6F4E37] transition-all cursor-pointer shadow-xs"
            >
              <Scale className="w-3.5 h-3.5" />
              <span>Privacy Policy ≠ Terms &amp; Conditions</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isComparisonOpen ? "rotate-180" : ""}`} />
            </button>
          </div>

        </div>
      </section>

      {/* ─── 2. EXPANDABLE COMPARISON: PRIVACY POLICY ≠ TERMS & CONDITIONS ─── */}
      {isComparisonOpen && (
        <section className="w-full bg-[#F4EFEA] border-b border-stone-200/90 py-16 px-4 sm:px-8 lg:px-12 xl:px-16 animate-fade-in-up">
          <div className="w-full space-y-6 text-left">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-[#6F4E37] font-bold uppercase tracking-widest block">
                  LEGAL FRAMEWORK DISTINCTION
                </span>
                <h3 className="text-xl font-bold uppercase tracking-tight text-zinc-900 font-sans">
                  Privacy Policy vs. Terms &amp; Conditions
                </h3>
              </div>
              <button
                onClick={() => setIsComparisonOpen(false)}
                className="text-zinc-500 hover:text-zinc-900 p-1.5 rounded-lg border-none bg-transparent cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left: Privacy Policy */}
              <div className="p-6 rounded-3xl bg-white border-2 border-[#6F4E37]/30 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-[#6F4E37]/10 text-[#6F4E37] flex items-center justify-center">
                      <Lock className="w-4 h-4" />
                    </div>
                    <h4 className="text-sm font-mono font-bold uppercase text-zinc-900">This Page: Privacy Policy</h4>
                  </div>
                  <span className="text-[9px] font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded">
                    DATA &amp; PRIVACY
                  </span>
                </div>
                <ul className="text-xs text-zinc-600 space-y-2 pl-4 list-disc font-sans leading-relaxed">
                  <li><strong>Focus:</strong> How customer identity, sizing data, checkout cart cookies, and banking tokens are protected.</li>
                  <li><strong>Security:</strong> 256-bit encryption, tokenized checkout, zero raw card storage, DPDP Act 2023 user rights.</li>
                  <li><strong>User Powers:</strong> Right to access records, correct profiles, revoke marketing cookies, and request account erasure.</li>
                </ul>
              </div>

              {/* Right: Terms & Conditions */}
              <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-stone-100 text-zinc-700 flex items-center justify-center">
                      <Scale className="w-4 h-4" />
                    </div>
                    <h4 className="text-sm font-mono font-bold uppercase text-zinc-800">Commercial: Terms &amp; Conditions</h4>
                  </div>
                  <Link
                    href="/terms"
                    className="text-[9px] font-mono font-bold bg-stone-100 hover:bg-stone-200 text-zinc-800 px-2.5 py-1 rounded flex items-center gap-1 transition-colors"
                  >
                    <span>GO TO TERMS</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </Link>
                </div>
                <ul className="text-xs text-zinc-600 space-y-2 pl-4 list-disc font-sans leading-relaxed">
                  <li><strong>Focus:</strong> Commercial drop rules, seller consignment fees, and buyer transaction contracts.</li>
                  <li><strong>Authenticity Pledge:</strong> 100% Vault physical inspection and 200% legitimacy money-back guarantee.</li>
                  <li><strong>Marketplace Rules:</strong> 7-Day return policy, anti-bot cart cancellations, and seller payouts.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ─── 3. BRIGHT PILLAR TABS NAVIGATOR ─── */}
      <div className="sticky top-16 z-30 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-stone-200/80 py-3 px-4 sm:px-8 lg:px-12 xl:px-16 shadow-xs">
        <div className="w-full flex items-center justify-between gap-4">
          
          {/* Scrollable Category Pill Nav */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 text-xs font-mono">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    if (tab.id !== "all") {
                      const el = document.getElementById(tab.id);
                      if (el) {
                        const yOffset = -140;
                        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
                        window.scrollTo({ top: y, behavior: "smooth" });
                      }
                    }
                  }}
                  className={`px-4 py-2 rounded-full whitespace-nowrap transition-all duration-200 flex items-center gap-2 cursor-pointer border shrink-0 font-medium ${
                    isActive
                      ? "bg-[#6F4E37] text-white border-[#6F4E37] shadow-sm font-bold scale-[1.01]"
                      : "bg-white hover:bg-stone-100 text-zinc-600 hover:text-zinc-900 border-stone-200"
                  }`}
                >
                  {Icon && <Icon className="w-3.5 h-3.5" />}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Instant Search Filter */}
          <div className="hidden lg:flex items-center bg-white border border-stone-300 rounded-full px-3.5 py-1.5 gap-2 w-72 shrink-0 focus-within:border-[#6F4E37]">
            <Search className="w-3.5 h-3.5 text-zinc-400" />
            <input
              type="text"
              placeholder="Search policy..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent text-xs outline-none w-full text-zinc-900 placeholder-zinc-400 font-sans"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="text-[10px] text-zinc-400 hover:text-zinc-700 border-none bg-transparent cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>

        </div>
      </div>

      {/* ─── 4. MAIN DOSSIER: 9 BRIGHT E-COMMERCE CARDS (PURE CLEAN TEXT FORMAT) ─── */}
      <PageContainer className="flex-grow py-10 sm:py-14 space-y-12">
        
        {/* ========================================================================= */}
        {/* 1. INFORMATION WE COLLECT */}
        {/* ========================================================================= */}
        {shouldShowSection("intake") && (
          <section id="intake" className="space-y-5 text-left scroll-mt-36">
            <div onClick={() => toggleSection("intake")} className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-stone-200 cursor-pointer group">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#6F4E37]/10 text-[#6F4E37] flex items-center justify-center font-mono font-bold text-sm">
                  01
                </div>
                <div>
                  <span className="text-[10px] font-mono text-[#6F4E37] uppercase tracking-widest font-bold block">
                    ARTICLE 01 // E-COMMERCE DATA INTAKE
                  </span>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-zinc-950 dark:text-zinc-50 font-playfair leading-[1.05] uppercase">
                    Information We Collect
                  </h2>
                </div>
              </div>
              
              <button
                onClick={(e) => { e.stopPropagation(); handleCopyLink("intake"); }}
                className="text-zinc-600 hover:text-[#6F4E37] transition-colors p-2 rounded-xl bg-white border border-stone-200 cursor-pointer flex items-center gap-1.5 text-xs font-mono shadow-2xs"
              >
                {copiedSection === "intake" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSection === "intake" ? "Link Copied" : "Share"}</span>
              </button>
              <ChevronDown className={`w-5 h-5 text-zinc-400 transition-transform duration-300 ${openSections.includes("intake") ? "rotate-180" : ""}`} />
            </div>
            <div className={`transition-all duration-500 ease-in-out overflow-hidden space-y-5 ${openSections.includes("intake") ? "max-h-[5000px] opacity-100 mt-5" : "max-h-0 opacity-0 m-0"}`}>

            <p className="text-xs sm:text-sm text-zinc-600 font-sans max-w-3xl leading-relaxed">
              In running DripHunter&apos;s e-commerce marketplace and Culture-Circle verified drops, we collect specific data to authenticate sneaker releases, handle doorstep deliveries, and manage consignment payouts.
            </p>

            {/* Categorized E-Commerce Data Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Card A: Customer Checkout */}
              <div className="p-5 rounded-3xl bg-white border border-stone-200/90 shadow-sm hover:border-[#6F4E37]/50 transition-all duration-300 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-xl bg-[#6F4E37]/10 text-[#6F4E37] flex items-center justify-center">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <span className="text-[9px] font-mono font-bold text-[#6F4E37] uppercase bg-[#FAF4EF] px-2 py-0.5 rounded">
                    BUYER CHECKOUT
                  </span>
                </div>
                <h3 className="text-sm font-mono font-bold uppercase text-zinc-900">A. Buyer &amp; Shipping Data</h3>
                <ul className="text-xs text-zinc-600 space-y-1.5 pl-4 list-disc font-sans">
                  <li>Full recipient legal name</li>
                  <li>Email &amp; verified mobile number</li>
                  <li>Doorstep address &amp; Postal PIN</li>
                  <li>Delivery landmarks for couriers</li>
                </ul>
              </div>

              {/* Card B: Sizing & Grails */}
              <div className="p-5 rounded-3xl bg-white border border-stone-200/90 shadow-sm hover:border-[#6F4E37]/50 transition-all duration-300 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center">
                    <Sliders className="w-4 h-4" />
                  </div>
                  <span className="text-[9px] font-mono font-bold text-amber-800 uppercase bg-amber-50 px-2 py-0.5 rounded">
                    SNEAKER SIZING
                  </span>
                </div>
                <h3 className="text-sm font-mono font-bold uppercase text-zinc-900">B. Sizing &amp; Grail Wishlist</h3>
                <ul className="text-xs text-zinc-600 space-y-1.5 pl-4 list-disc font-sans">
                  <li>UK/US Sneaker &amp; Apparel sizing</li>
                  <li>Saved streetwear drops &amp; grails</li>
                  <li>Restock reminder notifications</li>
                  <li>Archived purchase receipts</li>
                </ul>
              </div>

              {/* Card C: Anti-Bot & Telemetry */}
              <div className="p-5 rounded-3xl bg-white border border-stone-200/90 shadow-sm hover:border-[#6F4E37]/50 transition-all duration-300 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-800 flex items-center justify-center">
                    <Server className="w-4 h-4" />
                  </div>
                  <span className="text-[9px] font-mono font-bold text-blue-800 uppercase bg-blue-50 px-2 py-0.5 rounded">
                    DROP INTEGRITY
                  </span>
                </div>
                <h3 className="text-sm font-mono font-bold uppercase text-zinc-900">C. Drop Bot Protection</h3>
                <ul className="text-xs text-zinc-600 space-y-1.5 pl-4 list-disc font-sans">
                  <li>IP address &amp; geo-location for taxes</li>
                  <li>Browser fingerprinting for fair drops</li>
                  <li>Headless bot detection scripts</li>
                  <li>Referral campaign attribution</li>
                </ul>
              </div>

              {/* Card D: Culture-Circle Sellers */}
              <div className="p-5 rounded-3xl bg-white border border-stone-200/90 shadow-sm hover:border-[#6F4E37]/50 transition-all duration-300 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-800 flex items-center justify-center">
                    <Building className="w-4 h-4" />
                  </div>
                  <span className="text-[9px] font-mono font-bold text-purple-800 uppercase bg-purple-50 px-2 py-0.5 rounded">
                    CONSIGNMENT
                  </span>
                </div>
                <h3 className="text-sm font-mono font-bold uppercase text-zinc-900">D. Culture-Circle Sellers</h3>
                <ul className="text-xs text-zinc-600 space-y-1.5 pl-4 list-disc font-sans">
                  <li>GSTIN &amp; PAN tax credentials</li>
                  <li>Consignment bank payout details</li>
                  <li>Community fit-check lookbook uploads</li>
                  <li>Brand catalog authentication tags</li>
                </ul>
              </div>

            </div>
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* 2. HOW WE USE INFORMATION */}
        {/* ========================================================================= */}
        {shouldShowSection("usage") && (
          <section id="usage" className="space-y-5 text-left scroll-mt-36">
            <div onClick={() => toggleSection("usage")} className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-stone-200 cursor-pointer group">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#6F4E37]/10 text-[#6F4E37] flex items-center justify-center font-mono font-bold text-sm">
                  02
                </div>
                <div>
                  <span className="text-[10px] font-mono text-[#6F4E37] uppercase tracking-widest font-bold block">
                    ARTICLE 02 // E-COMMERCE FULFILLMENT &amp; INTELLIGENCE
                  </span>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-zinc-950 dark:text-zinc-50 font-playfair leading-[1.05] uppercase">
                    How We Use Information
                  </h2>
                </div>
              </div>

              <button
                onClick={(e) => { e.stopPropagation(); handleCopyLink("usage"); }}
                className="text-zinc-600 hover:text-[#6F4E37] transition-colors p-2 rounded-xl bg-white border border-stone-200 cursor-pointer flex items-center gap-1.5 text-xs font-mono shadow-2xs"
              >
                {copiedSection === "usage" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSection === "usage" ? "Link Copied" : "Share"}</span>
              </button>
              <ChevronDown className={`w-5 h-5 text-zinc-400 transition-transform duration-300 ${openSections.includes("usage") ? "rotate-180" : ""}`} />
            </div>
            <div className={`transition-all duration-500 ease-in-out overflow-hidden space-y-5 ${openSections.includes("usage") ? "max-h-[5000px] opacity-100 mt-5" : "max-h-0 opacity-0 m-0"}`}>

            {/* 5-Step E-Commerce Visual Pipeline Cards */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3.5">
              <div className="p-4 rounded-2xl bg-white border border-stone-200/90 shadow-sm space-y-2">
                <span className="w-6 h-6 rounded-full bg-[#6F4E37]/10 text-[#6F4E37] text-xs font-mono font-bold flex items-center justify-center">
                  1
                </span>
                <h4 className="text-xs font-mono font-bold uppercase text-zinc-900">Vault Verification</h4>
                <p className="text-[11px] text-zinc-600 font-sans leading-relaxed">
                  Verifying sneakers, stitch density, and RFID chips against the Culture-Circle authenticity database.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-stone-200/90 shadow-sm space-y-2">
                <span className="w-6 h-6 rounded-full bg-[#6F4E37]/10 text-[#6F4E37] text-xs font-mono font-bold flex items-center justify-center">
                  2
                </span>
                <h4 className="text-xs font-mono font-bold uppercase text-zinc-900">Streetwear Curation</h4>
                <p className="text-[11px] text-zinc-600 font-sans leading-relaxed">
                  Recommending oversized fits, heavyweight tees, and notifying collectors when saved sizes drop.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-stone-200/90 shadow-sm space-y-2">
                <span className="w-6 h-6 rounded-full bg-[#6F4E37]/10 text-[#6F4E37] text-xs font-mono font-bold flex items-center justify-center">
                  3
                </span>
                <h4 className="text-xs font-mono font-bold uppercase text-zinc-900">Anti-Bot Drops</h4>
                <p className="text-[11px] text-zinc-600 font-sans leading-relaxed">
                  Defending limited sneaker drops against automated sniper bots to ensure genuine hype collectors get access.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-stone-200/90 shadow-sm space-y-2">
                <span className="w-6 h-6 rounded-full bg-[#6F4E37]/10 text-[#6F4E37] text-xs font-mono font-bold flex items-center justify-center">
                  4
                </span>
                <h4 className="text-xs font-mono font-bold uppercase text-zinc-900">Tracked Logistics</h4>
                <p className="text-[11px] text-zinc-600 font-sans leading-relaxed">
                  Generating verified airway bills with Delhivery &amp; BlueDart with live SMS delivery milestone pings.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-stone-200/90 shadow-sm space-y-2">
                <span className="w-6 h-6 rounded-full bg-[#6F4E37]/10 text-[#6F4E37] text-xs font-mono font-bold flex items-center justify-center">
                  5
                </span>
                <h4 className="text-xs font-mono font-bold uppercase text-zinc-900">7-Day Concierge</h4>
                <p className="text-[11px] text-zinc-600 font-sans leading-relaxed">
                  Handling sizing exchanges, return inspections, and escrow refunds directly back to payment source.
                </p>
              </div>
            </div>
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* 3. COOKIES (CLEAN TEXT FORMAT) */}
        {/* ========================================================================= */}
        {shouldShowSection("cookies") && (
          <section id="cookies" className="space-y-5 text-left scroll-mt-36">
            <div onClick={() => toggleSection("cookies")} className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-stone-200 cursor-pointer group">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#6F4E37]/10 text-[#6F4E37] flex items-center justify-center font-mono font-bold text-sm">
                  03
                </div>
                <div>
                  <span className="text-[10px] font-mono text-[#6F4E37] uppercase tracking-widest font-bold block">
                    ARTICLE 03 // SHOPPING CART &amp; COOKIES
                  </span>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-zinc-950 dark:text-zinc-50 font-playfair leading-[1.05] uppercase">
                    Cookies &amp; Tracking Technologies
                  </h2>
                </div>
              </div>

              <button
                onClick={(e) => { e.stopPropagation(); handleCopyLink("cookies"); }}
                className="text-zinc-600 hover:text-[#6F4E37] transition-colors p-2 rounded-xl bg-white border border-stone-200 cursor-pointer flex items-center gap-1.5 text-xs font-mono shadow-2xs"
              >
                {copiedSection === "cookies" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSection === "cookies" ? "Link Copied" : "Share"}</span>
              </button>
              <ChevronDown className={`w-5 h-5 text-zinc-400 transition-transform duration-300 ${openSections.includes("cookies") ? "rotate-180" : ""}`} />
            </div>
            <div className={`transition-all duration-500 ease-in-out overflow-hidden space-y-5 ${openSections.includes("cookies") ? "max-h-[5000px] opacity-100 mt-5" : "max-h-0 opacity-0 m-0"}`}>

            {/* Bright Clean Structured Text Cards for Section 3 */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-stone-200/90 shadow-sm space-y-6">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-[#6F4E37] uppercase tracking-widest font-bold block">
                  BROWSER SESSION &amp; TELEMETRY POLICY
                </span>
                <h3 className="text-base sm:text-lg font-mono font-bold uppercase text-zinc-900">
                  How We Use Cookies Across Our E-Commerce Marketplace
                </h3>
                <p className="text-xs text-zinc-600 leading-relaxed font-sans">
                  Cookies and local telemetry tokens are essential for maintaining your shopping bag, preserving checkout encryption, and remembering sneaker sizing preferences. We categorize cookies into 4 transparent tiers:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 1. Essential */}
                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-zinc-900 uppercase">
                      1. Essential Checkout &amp; Cart Cookies
                    </span>
                    <span className="text-[8px] font-mono font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded border border-emerald-200">
                      MANDATORY
                    </span>
                  </div>
                  <p className="text-xs text-zinc-600 font-sans leading-relaxed">
                    Maintains items in your shopping bag, protects active SSL session tokens, prevents CSRF security exploits, and handles queue positions during high-demand limited drops.
                  </p>
                </div>

                {/* 2. Personalization */}
                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-zinc-900 uppercase">
                      2. Sizing &amp; Preference Cookies
                    </span>
                    <span className="text-[8px] font-mono font-bold bg-[#FAF4EF] text-[#6F4E37] px-2 py-0.5 rounded border border-[#6F4E37]/20">
                      PREFERENCES
                    </span>
                  </div>
                  <p className="text-xs text-zinc-600 font-sans leading-relaxed">
                    Remembers your shoe sizes (UK/US), clothing dimensions, INR currency presentation, and your recently viewed streetwear archival drops.
                  </p>
                </div>

                {/* 3. Analytics */}
                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-zinc-900 uppercase">
                      3. Drop Load &amp; Performance Telemetry
                    </span>
                    <span className="text-[8px] font-mono font-bold bg-blue-50 text-blue-800 px-2 py-0.5 rounded border border-blue-200">
                      PERFORMANCE
                    </span>
                  </div>
                  <p className="text-xs text-zinc-600 font-sans leading-relaxed">
                    Collects aggregated anonymous telemetry on server latency, high-concurrency drop checkouts, and UI rendering speeds to prevent flash-drop crashes.
                  </p>
                </div>

                {/* 4. Marketing */}
                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-zinc-900 uppercase">
                      4. Culture Ad Attribution
                    </span>
                    <span className="text-[8px] font-mono font-bold bg-purple-50 text-purple-800 px-2 py-0.5 rounded border border-purple-200">
                      ATTRIBUTION
                    </span>
                  </div>
                  <p className="text-xs text-zinc-600 font-sans leading-relaxed">
                    Measures campaign effectiveness to prevent displaying duplicate sneaker ads and lookbook promotions across external street-culture partner channels.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF4EF] border border-[#6F4E37]/20 text-xs text-zinc-700 space-y-1">
                <strong className="text-zinc-900 font-mono font-bold block">
                  How to Manage or Clear Cookies in Your Browser:
                </strong>
                <p className="text-zinc-600 font-sans leading-relaxed">
                  You can modify, block, or delete cookies at any time through your browser settings (Google Chrome, Apple Safari, Mozilla Firefox, or Microsoft Edge). Please note that disabling essential cookies may prevent items from persisting in your cart or impede checkout completion.
                </p>
              </div>
            </div>
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* 4. PAYMENTS */}
        {/* ========================================================================= */}
        {shouldShowSection("payments") && (
          <section id="payments" className="space-y-5 text-left scroll-mt-36">
            <div onClick={() => toggleSection("payments")} className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-stone-200 cursor-pointer group">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#6F4E37]/10 text-[#6F4E37] flex items-center justify-center font-mono font-bold text-sm">
                  04
                </div>
                <div>
                  <span className="text-[10px] font-mono text-[#6F4E37] uppercase tracking-widest font-bold block">
                    ARTICLE 04 // ESCROW &amp; FINANCIAL CHECKOUT
                  </span>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-zinc-950 dark:text-zinc-50 font-playfair leading-[1.05] uppercase">
                    Payments &amp; Escrow
                  </h2>
                </div>
              </div>

              <button
                onClick={(e) => { e.stopPropagation(); handleCopyLink("payments"); }}
                className="text-zinc-600 hover:text-[#6F4E37] transition-colors p-2 rounded-xl bg-white border border-stone-200 cursor-pointer flex items-center gap-1.5 text-xs font-mono shadow-2xs"
              >
                {copiedSection === "payments" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSection === "payments" ? "Link Copied" : "Share"}</span>
              </button>
              <ChevronDown className={`w-5 h-5 text-zinc-400 transition-transform duration-300 ${openSections.includes("payments") ? "rotate-180" : ""}`} />
            </div>
            <div className={`transition-all duration-500 ease-in-out overflow-hidden space-y-5 ${openSections.includes("payments") ? "max-h-[5000px] opacity-100 mt-5" : "max-h-0 opacity-0 m-0"}`}>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              
              {/* Zero Storage Principle */}
              <div className="lg:col-span-2 p-6 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#6F4E37]/10 text-[#6F4E37] flex items-center justify-center">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-mono font-bold uppercase text-zinc-900">
                    Non-Storage Tokenization Protocol
                  </h3>
                </div>
                <p className="text-xs text-zinc-600 leading-relaxed font-sans">
                  DripHunter enforces a non-negotiable zero-card-storage policy. We never store, process, or view your raw 16-digit credit/debit card numbers, CVVs, expiration dates, or bank net banking passwords.
                </p>
                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200 text-xs text-zinc-700 space-y-2">
                  <strong className="text-zinc-900 block font-mono">Supported RBI-Compliant Payment Channels:</strong>
                  <div className="flex flex-wrap gap-2 text-[10px] font-mono">
                    <span className="px-2.5 py-1 rounded-lg bg-white border border-stone-300 text-zinc-800">UPI 2.0 (Google Pay, PhonePe, Paytm, BHIM)</span>
                    <span className="px-2.5 py-1 rounded-lg bg-white border border-stone-300 text-zinc-800">RuPay, Visa, Mastercard, American Express</span>
                    <span className="px-2.5 py-1 rounded-lg bg-white border border-stone-300 text-zinc-800">Net Banking across 50+ Banks</span>
                    <span className="px-2.5 py-1 rounded-lg bg-white border border-stone-300 text-zinc-800">Cash on Delivery (COD)</span>
                  </div>
                </div>
              </div>

              {/* Escrow Timeline */}
              <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-3 text-left">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-[#6F4E37]" />
                  <h4 className="text-xs font-mono font-bold uppercase text-zinc-900">Culture Escrow &amp; Refunds</h4>
                </div>
                <p className="text-xs text-zinc-600 leading-relaxed font-sans">
                  Buyer funds are secured in automated escrow until the sneakers or streetwear pass vault inspection. Approved refunds settle within <strong>3 to 5 banking days</strong>.
                </p>
                <div className="pt-2 border-t border-stone-200 text-[10px] font-mono text-emerald-700 flex items-center gap-1.5 font-bold">
                  <Check className="w-3.5 h-3.5" />
                  <span>PCI-DSS Level 1 Escrow Protocol</span>
                </div>
              </div>

            </div>
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* 5. DATA SECURITY */}
        {/* ========================================================================= */}
        {shouldShowSection("security") && (
          <section id="security" className="space-y-5 text-left scroll-mt-36">
            <div onClick={() => toggleSection("security")} className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-stone-200 cursor-pointer group">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#6F4E37]/10 text-[#6F4E37] flex items-center justify-center font-mono font-bold text-sm">
                  05
                </div>
                <div>
                  <span className="text-[10px] font-mono text-[#6F4E37] uppercase tracking-widest font-bold block">
                    ARTICLE 05 // VAULT DEFENSE &amp; ENCRYPTION
                  </span>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-zinc-950 dark:text-zinc-50 font-playfair leading-[1.05] uppercase">
                    Data Security Architecture
                  </h2>
                </div>
              </div>

              <button
                onClick={(e) => { e.stopPropagation(); handleCopyLink("security"); }}
                className="text-zinc-600 hover:text-[#6F4E37] transition-colors p-2 rounded-xl bg-white border border-stone-200 cursor-pointer flex items-center gap-1.5 text-xs font-mono shadow-2xs"
              >
                {copiedSection === "security" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSection === "security" ? "Link Copied" : "Share"}</span>
              </button>
              <ChevronDown className={`w-5 h-5 text-zinc-400 transition-transform duration-300 ${openSections.includes("security") ? "rotate-180" : ""}`} />
            </div>
            <div className={`transition-all duration-500 ease-in-out overflow-hidden space-y-5 ${openSections.includes("security") ? "max-h-[5000px] opacity-100 mt-5" : "max-h-0 opacity-0 m-0"}`}>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-2">
                <div className="w-8 h-8 rounded-xl bg-[#6F4E37]/10 text-[#6F4E37] flex items-center justify-center">
                  <Lock className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-mono font-bold uppercase text-zinc-900">TLS 1.3 &amp; AES-256</h4>
                <p className="text-xs text-zinc-600 leading-relaxed font-sans">
                  End-to-end transport layer encryption combined with military-grade database encryption at rest.
                </p>
              </div>

              <div className="p-5 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-mono font-bold uppercase text-zinc-900">Zero-Trust RBAC &amp; MFA</h4>
                <p className="text-xs text-zinc-600 leading-relaxed font-sans">
                  Strict role-based least privilege. Vault inspectors only access shipping labels needed for packing.
                </p>
              </div>

              <div className="p-5 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-2">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-mono font-bold uppercase text-zinc-900">72-Hour Incident SLA</h4>
                <p className="text-xs text-zinc-600 leading-relaxed font-sans">
                  Verified security disclosure protocol notifying affected collectors and CERT-In within 72 hours.
                </p>
              </div>
            </div>
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* 6. THIRD-PARTY SERVICES */}
        {/* ========================================================================= */}
        {shouldShowSection("thirdparty") && (
          <section id="thirdparty" className="space-y-5 text-left scroll-mt-36">
            <div onClick={() => toggleSection("thirdparty")} className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-stone-200 cursor-pointer group">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#6F4E37]/10 text-[#6F4E37] flex items-center justify-center font-mono font-bold text-sm">
                  06
                </div>
                <div>
                  <span className="text-[10px] font-mono text-[#6F4E37] uppercase tracking-widest font-bold block">
                    ARTICLE 06 // E-COMMERCE SERVICE INTEGRATIONS
                  </span>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-zinc-950 dark:text-zinc-50 font-playfair leading-[1.05] uppercase">
                    Third-Party Services
                  </h2>
                </div>
              </div>

              <button
                onClick={(e) => { e.stopPropagation(); handleCopyLink("thirdparty"); }}
                className="text-zinc-600 hover:text-[#6F4E37] transition-colors p-2 rounded-xl bg-white border border-stone-200 cursor-pointer flex items-center gap-1.5 text-xs font-mono shadow-2xs"
              >
                {copiedSection === "thirdparty" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSection === "thirdparty" ? "Link Copied" : "Share"}</span>
              </button>
              <ChevronDown className={`w-5 h-5 text-zinc-400 transition-transform duration-300 ${openSections.includes("thirdparty") ? "rotate-180" : ""}`} />
            </div>
            <div className={`transition-all duration-500 ease-in-out overflow-hidden space-y-5 ${openSections.includes("thirdparty") ? "max-h-[5000px] opacity-100 mt-5" : "max-h-0 opacity-0 m-0"}`}>

            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-sm flex items-start gap-4">
                <div className="w-8 h-8 rounded-xl bg-stone-100 text-[#6F4E37] flex items-center justify-center shrink-0">
                  <Truck className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <strong className="text-xs font-mono font-bold text-zinc-900 uppercase block">Logistics &amp; Express Delivery Couriers</strong>
                  <p className="text-xs text-zinc-600">
                    <strong>Partners:</strong> Delhivery, BlueDart, Bluedart, Shadowfax.<br />
                    <strong>Data Shared:</strong> Recipient name, street address, and contact number strictly for doorstep OTP delivery confirmation.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-sm flex items-start gap-4">
                <div className="w-8 h-8 rounded-xl bg-stone-100 text-[#6F4E37] flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <strong className="text-xs font-mono font-bold text-zinc-900 uppercase block">Transactional SMS &amp; Drop Receipts</strong>
                  <p className="text-xs text-zinc-600">
                    <strong>Partners:</strong> Twilio, AWS SNS, MSG91, SendGrid.<br />
                    <strong>Data Shared:</strong> Email address and phone number strictly for order receipts, tracking waybills, and 2FA authentication.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-sm flex items-start gap-4">
                <div className="w-8 h-8 rounded-xl bg-stone-100 text-[#6F4E37] flex items-center justify-center shrink-0">
                  <Database className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <strong className="text-xs font-mono font-bold text-zinc-900 uppercase block">Cloud Infrastructure &amp; Lookbook Hosting</strong>
                  <p className="text-xs text-zinc-600">
                    <strong>Partners:</strong> Vercel (Edge Hosting), AWS S3 (Media Storage), MongoDB Atlas / PostgreSQL.
                  </p>
                </div>
              </div>
            </div>
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* 7. USER RIGHTS (PURE CLEAN TEXT FORMAT) */}
        {/* ========================================================================= */}
        {shouldShowSection("rights") && (
          <section id="rights" className="space-y-5 text-left scroll-mt-36">
            <div onClick={() => toggleSection("rights")} className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-stone-200 cursor-pointer group">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#6F4E37]/10 text-[#6F4E37] flex items-center justify-center font-mono font-bold text-sm">
                  07
                </div>
                <div>
                  <span className="text-[10px] font-mono text-[#6F4E37] uppercase tracking-widest font-bold block">
                    ARTICLE 07 // STATUTORY USER RIGHTS
                  </span>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-zinc-950 dark:text-zinc-50 font-playfair leading-[1.05] uppercase">
                    User Rights &amp; Data Sovereignty
                  </h2>
                </div>
              </div>

              <button
                onClick={(e) => { e.stopPropagation(); handleCopyLink("rights"); }}
                className="text-zinc-600 hover:text-[#6F4E37] transition-colors p-2 rounded-xl bg-white border border-stone-200 cursor-pointer flex items-center gap-1.5 text-xs font-mono shadow-2xs"
              >
                {copiedSection === "rights" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSection === "rights" ? "Link Copied" : "Share"}</span>
              </button>
              <ChevronDown className={`w-5 h-5 text-zinc-400 transition-transform duration-300 ${openSections.includes("rights") ? "rotate-180" : ""}`} />
            </div>
            <div className={`transition-all duration-500 ease-in-out overflow-hidden space-y-5 ${openSections.includes("rights") ? "max-h-[5000px] opacity-100 mt-5" : "max-h-0 opacity-0 m-0"}`}>

            {/* Clean Structured Text Cards for Section 7 */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-6">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-[#6F4E37] uppercase tracking-widest font-bold block">
                  DPDP ACT 2023 RECOGNISED RIGHTS
                </span>
                <h3 className="text-base sm:text-lg font-mono font-bold uppercase text-zinc-900">
                  Your Statutory Data Rights as a Buyer or Seller
                </h3>
                <p className="text-xs text-zinc-600 leading-relaxed font-sans">
                  Under India&apos;s Digital Personal Data Protection (DPDP) Act 2023, you maintain complete legal ownership and control over your personal information across DripHunter:
                </p>
              </div>

              <div className="space-y-3.5 text-left">
                {/* 1. Right to Access */}
                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#6F4E37]/10 text-[#6F4E37] text-[10px] font-mono font-bold flex items-center justify-center shrink-0">
                      1
                    </span>
                    <h4 className="text-xs font-mono font-bold uppercase text-zinc-900">
                      Right to Access &amp; Data Portability
                    </h4>
                  </div>
                  <p className="text-xs text-zinc-600 font-sans pl-7 leading-relaxed">
                    You have the right to request a complete summary and machine-readable export (JSON/CSV) of all personal data, purchasing logs, payment timestamps, and sizing attributes stored on your account.
                  </p>
                </div>

                {/* 2. Right to Correction */}
                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#6F4E37]/10 text-[#6F4E37] text-[10px] font-mono font-bold flex items-center justify-center shrink-0">
                      2
                    </span>
                    <h4 className="text-xs font-mono font-bold uppercase text-zinc-900">
                      Right to Correction &amp; Rectification
                    </h4>
                  </div>
                  <p className="text-xs text-zinc-600 font-sans pl-7 leading-relaxed">
                    You have the right to update, correct, or complete any inaccurate doorstep shipping addresses, contact numbers, email IDs, or seller GSTIN/PAN tax records at any time.
                  </p>
                </div>

                {/* 3. Right to Erasure */}
                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#6F4E37]/10 text-[#6F4E37] text-[10px] font-mono font-bold flex items-center justify-center shrink-0">
                      3
                    </span>
                    <h4 className="text-xs font-mono font-bold uppercase text-zinc-900">
                      Right to Erasure (&quot;Right to be Forgotten&quot;)
                    </h4>
                  </div>
                  <p className="text-xs text-zinc-600 font-sans pl-7 leading-relaxed">
                    You have the right to request the permanent deletion and cryptographic erasure of your DripHunter account and personal profile identifiers, subject only to mandatory statutory tax retention obligations.
                  </p>
                </div>

                {/* 4. Right to Withdraw Consent */}
                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#6F4E37]/10 text-[#6F4E37] text-[10px] font-mono font-bold flex items-center justify-center shrink-0">
                      4
                    </span>
                    <h4 className="text-xs font-mono font-bold uppercase text-zinc-900">
                      Right to Withdraw Consent &amp; Opt-Out
                    </h4>
                  </div>
                  <p className="text-xs text-zinc-600 font-sans pl-7 leading-relaxed">
                    You have the right to revoke consent for promotional drop newsletters, restock SMS alerts, and optional telemetry cookies at any moment without affecting your core shopping experience.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF4EF] border border-[#6F4E37]/20 text-xs text-zinc-700 space-y-1">
                <strong className="text-zinc-900 font-mono font-bold block">
                  How to Submit a Rights Request:
                </strong>
                <p className="text-zinc-600 font-sans leading-relaxed">
                  To exercise any of these rights, email our Data Protection Desk at <a href="mailto:privacy@driphunter.com" className="text-[#6F4E37] font-mono font-bold hover:underline">privacy@driphunter.com</a> with your registered email ID. All statutory requests are verified and processed within 30 business days.
                </p>
              </div>
            </div>
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* 8. DATA RETENTION */}
        {/* ========================================================================= */}
        {shouldShowSection("retention") && (
          <section id="retention" className="space-y-5 text-left scroll-mt-36">
            <div onClick={() => toggleSection("retention")} className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-stone-200 cursor-pointer group">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#6F4E37]/10 text-[#6F4E37] flex items-center justify-center font-mono font-bold text-sm">
                  08
                </div>
                <div>
                  <span className="text-[10px] font-mono text-[#6F4E37] uppercase tracking-widest font-bold block">
                    ARTICLE 08 // E-COMMERCE RETENTION LIFECYCLE
                  </span>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-zinc-950 dark:text-zinc-50 font-playfair leading-[1.05] uppercase">
                    Data Retention Timeline
                  </h2>
                </div>
              </div>

              <button
                onClick={(e) => { e.stopPropagation(); handleCopyLink("retention"); }}
                className="text-zinc-600 hover:text-[#6F4E37] transition-colors p-2 rounded-xl bg-white border border-stone-200 cursor-pointer flex items-center gap-1.5 text-xs font-mono shadow-2xs"
              >
                {copiedSection === "retention" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSection === "retention" ? "Link Copied" : "Share"}</span>
              </button>
              <ChevronDown className={`w-5 h-5 text-zinc-400 transition-transform duration-300 ${openSections.includes("retention") ? "rotate-180" : ""}`} />
            </div>
            <div className={`transition-all duration-500 ease-in-out overflow-hidden space-y-5 ${openSections.includes("retention") ? "max-h-[5000px] opacity-100 mt-5" : "max-h-0 opacity-0 m-0"}`}>

            {/* Retention Step Ladder */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold uppercase text-zinc-900">Active Collector Profile</span>
                  <span className="text-[9px] font-mono font-bold bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded">ACTIVE</span>
                </div>
                <p className="text-xs text-zinc-600 font-sans leading-relaxed">
                  Preserved for the duration of your membership to enable seamless re-orders, sizing filters, and authenticity certificates.
                </p>
              </div>

              <div className="p-5 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold uppercase text-zinc-900">36-Month Dormancy</span>
                  <span className="text-[9px] font-mono font-bold bg-amber-50 text-amber-800 px-2 py-0.5 rounded">ANONYMIZED</span>
                </div>
                <p className="text-xs text-zinc-600 font-sans leading-relaxed">
                  Accounts with no logins for 36 months are queued for cryptographic pseudonymization following a 30-day email alert.
                </p>
              </div>

              <div className="p-5 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold uppercase text-zinc-900">Tax Invoices (7 Years)</span>
                  <span className="text-[9px] font-mono font-bold bg-blue-50 text-blue-800 px-2 py-0.5 rounded">STATUTORY</span>
                </div>
                <p className="text-xs text-zinc-600 font-sans leading-relaxed">
                  GST invoices and financial ledger transactions are retained for 7 years under Indian Income Tax Act regulations.
                </p>
              </div>
            </div>
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* 9. CONTACT & GRIEVANCE DESK */}
        {/* ========================================================================= */}
        {shouldShowSection("contact") && (
          <section id="contact" className="space-y-5 text-left scroll-mt-36">
            <div onClick={() => toggleSection("contact")} className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-stone-200 cursor-pointer group">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#6F4E37]/10 text-[#6F4E37] flex items-center justify-center font-mono font-bold text-sm">
                  09
                </div>
                <div>
                  <span className="text-[10px] font-mono text-[#6F4E37] uppercase tracking-widest font-bold block">
                    ARTICLE 09 // GRIEVANCE &amp; LEGAL DESK
                  </span>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-zinc-950 dark:text-zinc-50 font-playfair leading-[1.05] uppercase">
                    Contact Us &amp; Grievance Officer
                  </h2>
                </div>
              </div>

              <button
                onClick={(e) => { e.stopPropagation(); handleCopyLink("contact"); }}
                className="text-zinc-600 hover:text-[#6F4E37] transition-colors p-2 rounded-xl bg-white border border-stone-200 cursor-pointer flex items-center gap-1.5 text-xs font-mono shadow-2xs"
              >
                {copiedSection === "contact" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSection === "contact" ? "Link Copied" : "Share"}</span>
              </button>
              <ChevronDown className={`w-5 h-5 text-zinc-400 transition-transform duration-300 ${openSections.includes("contact") ? "rotate-180" : ""}`} />
            </div>
            <div className={`transition-all duration-500 ease-in-out overflow-hidden space-y-5 ${openSections.includes("contact") ? "max-h-[5000px] opacity-100 mt-5" : "max-h-0 opacity-0 m-0"}`}>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              
              {/* Grievance Officer Details Card */}
              <div className="p-6 sm:p-7 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-4 text-left">
                <span className="text-[10px] font-mono text-[#6F4E37] font-bold uppercase tracking-widest block">
                  APPOINTED UNDER DPDP ACT 2023
                </span>
                <h3 className="text-base sm:text-lg font-mono font-bold uppercase text-zinc-900">
                  Data Protection &amp; Grievance Officer
                </h3>
                <div className="space-y-2 text-xs text-zinc-600 font-sans">
                  <p><strong>Corporate Entity:</strong> DripHunter Private Limited</p>
                  <p><strong>Direct Privacy Desk:</strong> <a href="mailto:privacy@driphunter.com" className="text-[#6F4E37] font-mono font-bold hover:underline">privacy@driphunter.com</a></p>
                  <p><strong>Grievance Redressal:</strong> <a href="mailto:grievance@driphunter.com" className="text-[#6F4E37] font-mono font-bold hover:underline">grievance@driphunter.com</a></p>
                  <p><strong>Headquarters:</strong> Bandra Kurla Complex (BKC), Mumbai, Maharashtra 400051, India</p>
                  <p className="text-zinc-500 text-[11px] font-mono pt-1">
                    Turnaround Commitment: &lt; 24-48 Hours Initial Acknowledgment
                  </p>
                </div>
              </div>

              {/* Inquiry Guidance Card */}
              <div className="p-6 sm:p-7 rounded-3xl bg-[#FAF8F5] border border-stone-200 shadow-sm space-y-3 text-left">
                <span className="text-[10px] font-mono text-emerald-700 font-bold uppercase tracking-widest block">
                  DIRECT ESCALATION
                </span>
                <h3 className="text-base sm:text-lg font-mono font-bold uppercase text-zinc-900">
                  Privacy Inquiries &amp; Seller KYC
                </h3>
                <p className="text-xs text-zinc-600 font-sans leading-relaxed">
                  Have questions about cookie tags, sizing telemetry, or seller KYC data in the Culture-Circle network? You can reach our dedicated compliance team directly by email at <a href="mailto:privacy@driphunter.com" className="text-[#6F4E37] font-mono font-bold hover:underline">privacy@driphunter.com</a>.
                </p>
                <div className="pt-2 border-t border-stone-200 text-[11px] text-zinc-500 font-mono">
                  SLA: Comprehensive formal response within 15–30 calendar days.
                </div>
              </div>

            </div>
            </div>
          </section>
        )}

      </PageContainer>

    </StaticContentLayout>
    </div>
  );
}
