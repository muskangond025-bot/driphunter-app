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
  FileText,
  Lock,
  Globe,
  ChevronRight, ChevronDown,
  ArrowUp,
  Mail,
  Scale,
  Search,
  Check,
  Copy,
  Printer,
  ShoppingBag,
  CreditCard,
  Truck,
  RotateCcw,
  Ban,
  Award,
  Store,
  Copyright,
  Fingerprint,
  AlertOctagon,
  Headphones,
  Sparkles,
  ExternalLink
} from "lucide-react";

export default function TermsPage() {
  const [activeSection, setActiveSection] = useState("section-1");
  const [openSections, setOpenSections] = useState<string[]>([]);
  const toggleSection = (id: string) => setOpenSections(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]);
  const [searchTerm, setSearchTerm] = useState("");
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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
        gsap.fromTo("h1", { opacity: 0, y: 30, rotationX: 10 }, { opacity: 1, y: 0, rotationX: 0, duration: 1, ease: "power3.out" });
        gsap.fromTo("p", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.3 });
        
        // Article sections animation
        const articles = gsap.utils.toArray("article");
        articles.forEach((art: any) => {
          gsap.fromTo(art, 
            { opacity: 0, y: 40, scale: 0.98 },
            { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power2.out", scrollTrigger: { trigger: art, start: "top 85%" } }
          );
        });
      }, containerRef);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);

  const sections = [
    { id: "section-1", number: "01", title: "Introduction", icon: Scale, tag: "PREAMBLE" },
    { id: "section-2", number: "02", title: "User Accounts", icon: Lock, tag: "CREDENTIALS" },
    { id: "section-3", number: "03", title: "Products", icon: ShoppingBag, tag: "CATALOG" },
    { id: "section-4", number: "04", title: "Pricing", icon: Sparkles, tag: "VALUATION" },
    { id: "section-5", number: "05", title: "Orders", icon: FileText, tag: "CHECKOUT" },
    { id: "section-6", number: "06", title: "Payments", icon: CreditCard, tag: "ESCROW" },
    { id: "section-7", number: "07", title: "Shipping", icon: Truck, tag: "LOGISTICS" },
    { id: "section-8", number: "08", title: "Returns & Refunds", icon: RotateCcw, tag: "7-DAY WINDOW" },
    { id: "section-9", number: "09", title: "Cancellation", icon: Ban, tag: "MODIFICATION" },
    { id: "section-10", number: "10", title: "Authenticity", icon: Award, tag: "ZERO TOLERANCE" },
    { id: "section-11", number: "11", title: "Seller Terms", icon: Store, tag: "MERCHANTS" },
    { id: "section-12", number: "12", title: "Intellectual Property", icon: Copyright, tag: "PROPRIETARY" },
    { id: "section-13", number: "13", title: "Privacy", icon: Fingerprint, tag: "SECURITY" },
    { id: "section-14", number: "14", title: "Liability", icon: AlertOctagon, tag: "INDEMNITY" },
    { id: "section-15", number: "15", title: "Contact", icon: Headphones, tag: "CONCIERGE" }
  ];



  // Scrollspy observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-15% 0px -65% 0px" }
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -95;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCopyLink = (id: string) => {
    const url = `${window.location.origin}/terms#${id}`;
    navigator.clipboard.writeText(url);
    setCopiedSection(id);
    setTimeout(() => setCopiedSection(null), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div ref={containerRef}>
    <StaticContentLayout
      bgClass="bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-300"
      progressBarGradient="from-[#6F4E37] via-[#E6C280] to-[#6F4E37]"
    >

      {/* ─── 1. HERO BANNER: EDITORIAL LEGAL ARCHIVE ─── */}
      <section className="relative w-full min-h-[420px] lg:min-h-[460px] flex flex-col items-center justify-center overflow-hidden bg-zinc-950 text-white select-none border-b border-zinc-200/30 dark:border-zinc-800/80 px-4 sm:px-6 py-16">
        {/* Background Image with Noise & Dark Gradient */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=1920&q=80"
            alt="DripHunter Legal Manifesto"
            className="w-full h-full object-cover object-center scale-105 opacity-20 pointer-events-none select-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/50 pointer-events-none" />
        </div>

        {/* Ambient Gold Halo Glowing Flares */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#E6C280]/10 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute top-1/4 right-1/4 w-[300px] h-[200px] bg-[#6F4E37]/15 blur-[120px] rounded-full pointer-events-none" />

        {/* Live Status Pill */}
        <div className="relative z-10 flex items-center gap-2 bg-black/60 dark:bg-zinc-900/90 border border-white/15 text-[#D4AF37] dark:text-[#E6C280] font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.25em] px-4 py-1.5 rounded-full shadow-lg mb-4 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>LEGAL ARCHIVE // REVISION 2026.4</span>
        </div>

        {/* Headline */}
        <h1 className="relative z-10 text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-white font-playfair leading-[1.05] uppercase text-center">
          TERMS & <span className="font-serif italic font-normal text-[#E6C280] lowercase">conditions</span>
        </h1>

        {/* Sub-description */}
        <p className="relative z-10 text-xs sm:text-sm text-zinc-300 font-sans font-normal max-w-md sm:max-w-2xl mx-auto leading-relaxed px-4 pt-3 text-center">
          Our transparent curation framework, binding consumer agreements, vault authenticity standards, and merchant terms governing your participation in the DripHunter collective.
        </p>

        {/* Key Highlight Metric Badges */}
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl w-full pt-8 px-2">
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md text-left flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-[#D4AF37] dark:text-[#E6C280] shrink-0" />
            <div>
              <span className="text-[10px] font-mono text-white font-bold uppercase block">100% Legit</span>
              <span className="text-[8.5px] font-sans text-zinc-400">Vault Verification</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md text-left flex items-center gap-3">
            <Lock className="w-5 h-5 text-[#D4AF37] dark:text-[#E6C280] shrink-0" />
            <div>
              <span className="text-[10px] font-mono text-white font-bold uppercase block">Safe Escrow</span>
              <span className="text-[8.5px] font-sans text-zinc-400">256-Bit Encrypted</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md text-left flex items-center gap-3">
            <RotateCcw className="w-5 h-5 text-[#D4AF37] dark:text-[#E6C280] shrink-0" />
            <div>
              <span className="text-[10px] font-mono text-white font-bold uppercase block">7-Day Return</span>
              <span className="text-[8.5px] font-sans text-zinc-400">Pristine Tag Guarantee</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md text-left flex items-center gap-3">
            <Globe className="w-5 h-5 text-[#D4AF37] dark:text-[#E6C280] shrink-0" />
            <div>
              <span className="text-[10px] font-mono text-white font-bold uppercase block">Pan-India</span>
              <span className="text-[8.5px] font-sans text-zinc-400">Tracked Express</span>
            </div>
          </div>
        </div>

        {/* Quick Utilities: Print & Share */}
        <div className="relative z-10 flex items-center gap-3 pt-6 text-[10px] font-mono text-zinc-400">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer border border-white/10"
          >
            <Printer className="w-3.5 h-3.5 text-[#D4AF37] dark:text-[#E6C280]" />
            <span>Print Document</span>
          </button>
          <span className="text-zinc-600">•</span>
          <span>Jurisdiction: Republic of India</span>
        </div>
      </section>

      {/* ─── 2. MAIN LAYOUT: COMMAND SIDEBAR + 15 NUMBERED SECTIONS ─── */}
      <PageContainer className="flex-grow py-12 sm:py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* ─── LEFT STICKY COMMAND SIDEBAR (4 COLS) ─── */}
          <aside className="max-md:hidden lg:col-span-4 sticky top-24 z-20 space-y-4">
            <div className="space-y-6 text-left transition-all duration-300 pr-4">
              
              {/* Header */}
              <div className="flex items-center justify-between pb-3.5 border-b border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#6F4E37]/10 dark:bg-[#E6C280]/15 text-[#6F4E37] dark:text-[#E6C280] flex items-center justify-center">
                    <Scale className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-900 dark:text-white leading-tight">
                      Clause Index
                    </h3>
                    <span className="text-[9px] font-sans text-zinc-400">15 Binding Sections</span>
                  </div>
                </div>

                <span className="text-[9px] font-mono font-bold text-[#6F4E37] dark:text-[#E6C280] bg-[#6F4E37]/10 dark:bg-[#E6C280]/15 px-2 py-0.5 rounded-md">
                  {activeSection.replace("section-", "#")} / 15
                </span>
              </div>

              {/* Instant Search Filter Input */}
              <div className="relative bg-zinc-50 dark:bg-zinc-800/60 rounded-2xl px-3.5 py-2.5 border border-zinc-200/80 dark:border-zinc-700/80 flex items-center gap-2 focus-within:border-[#6F4E37] dark:focus-within:border-[#E6C280] transition-all shadow-xs">
                <Search className="w-4 h-4 text-zinc-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Filter terms..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-transparent text-xs outline-none w-full text-zinc-900 dark:text-white placeholder-zinc-400 font-sans font-medium"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="text-[10px] text-zinc-400 hover:text-zinc-900 dark:hover:text-white cursor-pointer border-none bg-transparent"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Navigation List */}
              <nav className="max-h-[50vh] overflow-y-auto pr-1 space-y-1.5 scrollbar-thin scrollbar-thumb-zinc-300 dark:scrollbar-thumb-zinc-700">
                {sections
                  .filter((s) => s.title.toLowerCase().includes(searchTerm.toLowerCase()) || s.number.includes(searchTerm) || s.tag.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map((s) => {
                    const isActive = activeSection === s.id;
                    const Icon = s.icon;

                    return (
                      <button
                        key={s.id}
                        onClick={() => scrollToSection(s.id)}
                        className={`w-full text-left px-3.5 py-2.5 rounded-2xl text-xs font-sans transition-all duration-300 flex items-center justify-between cursor-pointer border-none outline-none group ${
                          isActive
                            ? "bg-[#6F4E37] text-white dark:bg-[#E6C280] dark:text-zinc-950 font-bold shadow-md scale-[1.01]"
                            : "bg-transparent text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 hover:text-zinc-900 dark:hover:text-white font-medium"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 truncate min-w-0">
                          <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? "text-white dark:text-zinc-950" : "text-zinc-400 group-hover:text-[#6F4E37] dark:group-hover:text-[#E6C280]"}`} />
                          <span className={`font-mono text-[9px] font-bold ${isActive ? "text-white/80 dark:text-zinc-950/80" : "text-zinc-400"}`}>
                            {s.number}.
                          </span>
                          <span className="truncate">{s.title}</span>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0 ml-2">
                          <span className={`text-[7.5px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                            isActive
                              ? "bg-white/20 dark:bg-black/20 text-white dark:text-zinc-950"
                              : "bg-zinc-100 dark:bg-zinc-800 text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300"
                          }`}>
                            {s.tag}
                          </span>
                          <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isActive ? "opacity-100 translate-x-0.5" : "opacity-0"}`} />
                        </div>
                      </button>
                    );
                  })}
              </nav>

              {/* Quick Legal Contact Footer */}
              <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 space-y-2">
                <div className="flex items-center justify-between text-[9.5px] font-mono text-zinc-500">
                  <span>Legal Support:</span>
                  <a href="mailto:legal@driphunter.com" className="text-[#6F4E37] dark:text-[#E6C280] font-bold hover:underline">
                    legal@driphunter.com
                  </a>
                </div>
                <div className="flex items-center justify-between text-[9px] font-mono text-zinc-400">
                  <span>Turnaround Window:</span>
                  <span className="text-zinc-700 dark:text-zinc-300 font-bold">&lt; 24 Hours</span>
                </div>
              </div>
            </div>
          </aside>

          {/* ─── RIGHT CONTENT: THE 15 NUMBERED SECTIONS (8 COLS) ─── */}
          <div className="lg:col-span-8 space-y-8 text-left">

            {/* 1. INTRODUCTION */}
            <article
              id="section-1"
              className="py-10 border-b border-zinc-200/60 dark:border-zinc-800/60 space-y-5 text-left relative group first:pt-0 last:border-b-0"
            >

              <div onClick={() => toggleSection("section-1")} className="cursor-pointer group select-none block w-full">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-[#6F4E37]/10 dark:bg-[#E6C280]/15 text-[#6F4E37] dark:text-[#E6C280]">
                    CLAUSE 01 // PREAMBLE
                  </span>
                  <span className="text-[9px] font-mono text-zinc-400 uppercase font-bold">Binding Terms</span>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); handleCopyLink("section-1"); }}
                  className="text-zinc-400 hover:text-[#6F4E37] dark:hover:text-[#E6C280] transition-colors p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer border-none bg-transparent flex items-center gap-1 text-[9px] font-mono"
                  title="Copy Clause Link"
                >
                  {copiedSection === "section-1" ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSection === "section-1" ? "Copied" : "Share"}</span>
                </button>
              
                </div>
                <div className="flex items-center justify-between mt-2">
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-zinc-950 dark:text-zinc-50 font-playfair leading-[1.05]">Introduction & <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280]">Acceptance</span>
              </h2>
                  <ChevronDown className={`w-6 h-6 text-zinc-400 transition-transform duration-300 shrink-0 ${openSections.includes("section-1") ? "rotate-180" : ""}`} />
                </div>
              </div>
              <div className={`transition-all duration-500 ease-in-out overflow-hidden mt-4 space-y-5 ${openSections.includes("section-1") ? "max-h-[5000px] opacity-100" : "max-h-0 opacity-0 m-0"}`}>
                

              <div className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-sans space-y-3.5 font-normal">
                <p>
                  Welcome to <strong className="font-semibold text-zinc-900 dark:text-white">DripHunter</strong> (&quot;Platform&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;). These Terms and Conditions constitute a legally binding agreement between you (&quot;User&quot;, &quot;Collector&quot;, &quot;Customer&quot;, or &quot;Seller&quot;) and DripHunter regarding your access to and use of our curated marketplace, digital drop feeds, authenticity verification vault, and concierge channels.
                </p>
                <p>
                  By creating an account, browsing archival collections, acquiring limited streetwear pieces, or utilizing our merchant consignment tools, you explicitly acknowledge that you have read, understood, and consented to these Terms in their entirety, alongside our integrated Privacy Policy.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#6F4E37]/5 dark:bg-[#E6C280]/10 border-l-4 border-[#6F4E37] dark:border-[#E6C280] text-xs font-sans text-zinc-700 dark:text-zinc-300 space-y-1">
                <strong className="text-zinc-900 dark:text-white font-bold block">Key Governance Principle:</strong>
                <span>Continuous usage of DripHunter following published revisions constitutes full legal acceptance of all amended terms.</span>
              </div>
            
              </div>
            </article>

            {/* 2. USER ACCOUNTS */}
            <article
              id="section-2"
              className="py-10 border-b border-zinc-200/60 dark:border-zinc-800/60 space-y-5 text-left relative group first:pt-0 last:border-b-0"
            >

              <div onClick={() => toggleSection("section-2")} className="cursor-pointer group select-none block w-full">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-[#6F4E37]/10 dark:bg-[#E6C280]/15 text-[#6F4E37] dark:text-[#E6C280]">
                    CLAUSE 02 // ACCESS
                  </span>
                  <span className="text-[9px] font-mono text-zinc-400 uppercase font-bold">Authentication</span>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); handleCopyLink("section-2"); }}
                  className="text-zinc-400 hover:text-[#6F4E37] dark:hover:text-[#E6C280] transition-colors p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer border-none bg-transparent flex items-center gap-1 text-[9px] font-mono"
                >
                  {copiedSection === "section-2" ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSection === "section-2" ? "Copied" : "Share"}</span>
                </button>
              
                </div>
                <div className="flex items-center justify-between mt-2">
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-zinc-950 dark:text-zinc-50 font-playfair leading-[1.05]">User Accounts & <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280]">Security</span>
              </h2>
                  <ChevronDown className={`w-6 h-6 text-zinc-400 transition-transform duration-300 shrink-0 ${openSections.includes("section-2") ? "rotate-180" : ""}`} />
                </div>
              </div>
              <div className={`transition-all duration-500 ease-in-out overflow-hidden mt-4 space-y-5 ${openSections.includes("section-2") ? "max-h-[5000px] opacity-100" : "max-h-0 opacity-0 m-0"}`}>
                

              <div className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-sans space-y-3.5 font-normal">
                <p>
                  To cop limited archival pieces, track exclusive drop calendars, and unlock tier-based collector perks, you must maintain a verified DripHunter account. You agree to provide true, accurate, and verified identity details during onboarding.
                </p>
                <ul className="space-y-2 pl-4 list-disc text-xs text-zinc-600 dark:text-zinc-400 font-sans">
                  <li><strong className="text-zinc-900 dark:text-white">Credential Protection:</strong> You are solely responsible for safeguarding your login password and two-factor authentication tokens.</li>
                  <li><strong className="text-zinc-900 dark:text-white">Anti-Bot Farming:</strong> Using automated checkout scripts, head-less browsers, or multiple phantom accounts to bypass drop purchase limits is strictly prohibited.</li>
                  <li><strong className="text-zinc-900 dark:text-white">Account Revocation:</strong> DripHunter reserves the right to immediately terminate any profile involved in fraud or suspicious chargebacks.</li>
                </ul>
              </div>
            
              </div>
            </article>

            {/* 3. PRODUCTS */}
            <article
              id="section-3"
              className="py-10 border-b border-zinc-200/60 dark:border-zinc-800/60 space-y-5 text-left relative group first:pt-0 last:border-b-0"
            >

              <div onClick={() => toggleSection("section-3")} className="cursor-pointer group select-none block w-full">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-[#6F4E37]/10 dark:bg-[#E6C280]/15 text-[#6F4E37] dark:text-[#E6C280]">
                    CLAUSE 03 // ARCHIVE
                  </span>
                  <span className="text-[9px] font-mono text-zinc-400 uppercase font-bold">Garment Listings</span>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); handleCopyLink("section-3"); }}
                  className="text-zinc-400 hover:text-[#6F4E37] dark:hover:text-[#E6C280] transition-colors p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer border-none bg-transparent flex items-center gap-1 text-[9px] font-mono"
                >
                  {copiedSection === "section-3" ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSection === "section-3" ? "Copied" : "Share"}</span>
                </button>
              
                </div>
                <div className="flex items-center justify-between mt-2">
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-zinc-950 dark:text-zinc-50 font-playfair leading-[1.05]">Products, Drops & <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280]">Listings</span>
              </h2>
                  <ChevronDown className={`w-6 h-6 text-zinc-400 transition-transform duration-300 shrink-0 ${openSections.includes("section-3") ? "rotate-180" : ""}`} />
                </div>
              </div>
              <div className={`transition-all duration-500 ease-in-out overflow-hidden mt-4 space-y-5 ${openSections.includes("section-3") ? "max-h-[5000px] opacity-100" : "max-h-0 opacity-0 m-0"}`}>
                

              <div className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-sans space-y-3.5 font-normal">
                <p>
                  All products featured on DripHunter—including oversized graphic tees, heavyweight French Terry hoodies, raw denim, and deadstock sneakers—are subject to curated batch limits.
                </p>
                <p>
                  We ensure strict fidelity in garment photography, fabric GSM specifications, and sizing metrics. Minor variances in distressing, acid wash finishes, or screen-printed patina are inherent characteristics of artisanal streetwear production.
                </p>
              </div>
            
              </div>
            </article>

            {/* 4. PRICING */}
            <article
              id="section-4"
              className="py-10 border-b border-zinc-200/60 dark:border-zinc-800/60 space-y-5 text-left relative group first:pt-0 last:border-b-0"
            >

              <div onClick={() => toggleSection("section-4")} className="cursor-pointer group select-none block w-full">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-[#6F4E37]/10 dark:bg-[#E6C280]/15 text-[#6F4E37] dark:text-[#E6C280]">
                    CLAUSE 04 // VALUATION
                  </span>
                  <span className="text-[9px] font-mono text-zinc-400 uppercase font-bold">Taxes & Currency</span>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); handleCopyLink("section-4"); }}
                  className="text-zinc-400 hover:text-[#6F4E37] dark:hover:text-[#E6C280] transition-colors p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer border-none bg-transparent flex items-center gap-1 text-[9px] font-mono"
                >
                  {copiedSection === "section-4" ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSection === "section-4" ? "Copied" : "Share"}</span>
                </button>
              
                </div>
                <div className="flex items-center justify-between mt-2">
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-zinc-950 dark:text-zinc-50 font-playfair leading-[1.05]">Pricing, Taxes & <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280]">Currency</span>
              </h2>
                  <ChevronDown className={`w-6 h-6 text-zinc-400 transition-transform duration-300 shrink-0 ${openSections.includes("section-4") ? "rotate-180" : ""}`} />
                </div>
              </div>
              <div className={`transition-all duration-500 ease-in-out overflow-hidden mt-4 space-y-5 ${openSections.includes("section-4") ? "max-h-[5000px] opacity-100" : "max-h-0 opacity-0 m-0"}`}>
                

              <div className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-sans space-y-3.5 font-normal">
                <p>
                  All prices displayed on DripHunter are quoted in <strong className="font-semibold text-zinc-900 dark:text-white">Indian National Rupees (INR / ₹)</strong> and include all statutory Goods and Services Tax (GST) obligations under Indian fiscal law.
                </p>
                <p>
                  Archival pieces and secondary market deadstock items are subject to dynamic real-time market pricing based on collector demand. Promotional discount codes (such as <code className="bg-zinc-100 dark:bg-zinc-800 text-[#6F4E37] dark:text-[#E6C280] px-2 py-0.5 rounded font-mono text-xs">DRIP10</code>) cannot be stacked unless explicitly advertised.
                </p>
              </div>
            
              </div>
            </article>

            {/* 5. ORDERS */}
            <article
              id="section-5"
              className="py-10 border-b border-zinc-200/60 dark:border-zinc-800/60 space-y-5 text-left relative group first:pt-0 last:border-b-0"
            >

              <div onClick={() => toggleSection("section-5")} className="cursor-pointer group select-none block w-full">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-[#6F4E37]/10 dark:bg-[#E6C280]/15 text-[#6F4E37] dark:text-[#E6C280]">
                    CLAUSE 05 // PLACEMENT
                  </span>
                  <span className="text-[9px] font-mono text-zinc-400 uppercase font-bold">Verification</span>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); handleCopyLink("section-5"); }}
                  className="text-zinc-400 hover:text-[#6F4E37] dark:hover:text-[#E6C280] transition-colors p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer border-none bg-transparent flex items-center gap-1 text-[9px] font-mono"
                >
                  {copiedSection === "section-5" ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSection === "section-5" ? "Copied" : "Share"}</span>
                </button>
              
                </div>
                <div className="flex items-center justify-between mt-2">
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-zinc-950 dark:text-zinc-50 font-playfair leading-[1.05]">Orders & Placement <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280]">Acceptance</span>
              </h2>
                  <ChevronDown className={`w-6 h-6 text-zinc-400 transition-transform duration-300 shrink-0 ${openSections.includes("section-5") ? "rotate-180" : ""}`} />
                </div>
              </div>
              <div className={`transition-all duration-500 ease-in-out overflow-hidden mt-4 space-y-5 ${openSections.includes("section-5") ? "max-h-[5000px] opacity-100" : "max-h-0 opacity-0 m-0"}`}>
                

              <div className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-sans space-y-3.5 font-normal">
                <p>
                  Order placement triggers an automated digital receipt acknowledging transmission. Binding fulfillment acceptance occurs once our authenticity specialists complete the physical in-hand vault audit.
                </p>
                <p>
                  DripHunter reserves the right to cancel or allocate purchase limits on drop orders if inventory allocation discrepancies or high-volume bot attacks are detected during release hours.
                </p>
              </div>
            
              </div>
            </article>

            {/* 6. PAYMENTS */}
            <article
              id="section-6"
              className="py-10 border-b border-zinc-200/60 dark:border-zinc-800/60 space-y-5 text-left relative group first:pt-0 last:border-b-0"
            >

              <div onClick={() => toggleSection("section-6")} className="cursor-pointer group select-none block w-full">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-[#6F4E37]/10 dark:bg-[#E6C280]/15 text-[#6F4E37] dark:text-[#E6C280]">
                    CLAUSE 06 // ESCROW
                  </span>
                  <span className="text-[9px] font-mono text-zinc-400 uppercase font-bold">256-Bit Protection</span>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); handleCopyLink("section-6"); }}
                  className="text-zinc-400 hover:text-[#6F4E37] dark:hover:text-[#E6C280] transition-colors p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer border-none bg-transparent flex items-center gap-1 text-[9px] font-mono"
                >
                  {copiedSection === "section-6" ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSection === "section-6" ? "Copied" : "Share"}</span>
                </button>
              
                </div>
                <div className="flex items-center justify-between mt-2">
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-zinc-950 dark:text-zinc-50 font-playfair leading-[1.05]">Payments & Escrow <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280]">Security</span>
              </h2>
                  <ChevronDown className={`w-6 h-6 text-zinc-400 transition-transform duration-300 shrink-0 ${openSections.includes("section-6") ? "rotate-180" : ""}`} />
                </div>
              </div>
              <div className={`transition-all duration-500 ease-in-out overflow-hidden mt-4 space-y-5 ${openSections.includes("section-6") ? "max-h-[5000px] opacity-100" : "max-h-0 opacity-0 m-0"}`}>
                

              <div className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-sans space-y-3.5 font-normal">
                <p>
                  Transactions are processed via RBI-compliant, PCI-DSS Level 1 payment gateways. We support UPI (Google Pay, PhonePe, Paytm), Credit/Debit cards (Visa, Mastercard, RuPay, Amex), Net Banking, and select Cash on Delivery (COD) services.
                </p>
                <p>
                  Funds are secured in escrow until your order passes our authenticity vault check and is handed over to express delivery couriers.
                </p>
              </div>
            
              </div>
            </article>

            {/* 7. SHIPPING */}
            <article
              id="section-7"
              className="py-10 border-b border-zinc-200/60 dark:border-zinc-800/60 space-y-5 text-left relative group first:pt-0 last:border-b-0"
            >

              <div onClick={() => toggleSection("section-7")} className="cursor-pointer group select-none block w-full">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-[#6F4E37]/10 dark:bg-[#E6C280]/15 text-[#6F4E37] dark:text-[#E6C280]">
                    CLAUSE 07 // TRANSIT
                  </span>
                  <span className="text-[9px] font-mono text-zinc-400 uppercase font-bold">Express Network</span>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); handleCopyLink("section-7"); }}
                  className="text-zinc-400 hover:text-[#6F4E37] dark:hover:text-[#E6C280] transition-colors p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer border-none bg-transparent flex items-center gap-1 text-[9px] font-mono"
                >
                  {copiedSection === "section-7" ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSection === "section-7" ? "Copied" : "Share"}</span>
                </button>
              
                </div>
                <div className="flex items-center justify-between mt-2">
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-zinc-950 dark:text-zinc-50 font-playfair leading-[1.05]">Shipping & Pan-India <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280]">Delivery</span>
              </h2>
                  <ChevronDown className={`w-6 h-6 text-zinc-400 transition-transform duration-300 shrink-0 ${openSections.includes("section-7") ? "rotate-180" : ""}`} />
                </div>
              </div>
              <div className={`transition-all duration-500 ease-in-out overflow-hidden mt-4 space-y-5 ${openSections.includes("section-7") ? "max-h-[5000px] opacity-100" : "max-h-0 opacity-0 m-0"}`}>
                

              <div className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-sans space-y-3.5 font-normal">
                <p>
                  Every piece undergoes a mandatory 24–48 hour vault inspection prior to dispatch. We ship across India via premium courier partners (Delhivery, BlueDart, Bluedart).
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-700/80">
                    <span className="text-[10px] font-mono font-bold uppercase text-zinc-900 dark:text-white block">Metro Cities</span>
                    <span className="text-xs text-zinc-600 dark:text-zinc-400">2 to 4 Business Days</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-700/80">
                    <span className="text-[10px] font-mono font-bold uppercase text-zinc-900 dark:text-white block">Rest of India</span>
                    <span className="text-xs text-zinc-600 dark:text-zinc-400">4 to 7 Business Days</span>
                  </div>
                </div>
              </div>
            
              </div>
            </article>

            {/* 8. RETURNS & REFUNDS */}
            <article
              id="section-8"
              className="py-10 border-b border-zinc-200/60 dark:border-zinc-800/60 space-y-5 text-left relative group first:pt-0 last:border-b-0"
            >

              <div onClick={() => toggleSection("section-8")} className="cursor-pointer group select-none block w-full">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-[#6F4E37]/10 dark:bg-[#E6C280]/15 text-[#6F4E37] dark:text-[#E6C280]">
                    CLAUSE 08 // REVERSALS
                  </span>
                  <span className="text-[9px] font-mono text-zinc-400 uppercase font-bold">7-Day Guarantee</span>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); handleCopyLink("section-8"); }}
                  className="text-zinc-400 hover:text-[#6F4E37] dark:hover:text-[#E6C280] transition-colors p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer border-none bg-transparent flex items-center gap-1 text-[9px] font-mono"
                >
                  {copiedSection === "section-8" ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSection === "section-8" ? "Copied" : "Share"}</span>
                </button>
              
                </div>
                <div className="flex items-center justify-between mt-2">
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-zinc-950 dark:text-zinc-50 font-playfair leading-[1.05]">Returns & Refunds <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280]">Policy</span>
              </h2>
                  <ChevronDown className={`w-6 h-6 text-zinc-400 transition-transform duration-300 shrink-0 ${openSections.includes("section-8") ? "rotate-180" : ""}`} />
                </div>
              </div>
              <div className={`transition-all duration-500 ease-in-out overflow-hidden mt-4 space-y-5 ${openSections.includes("section-8") ? "max-h-[5000px] opacity-100" : "max-h-0 opacity-0 m-0"}`}>
                

              <div className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-sans space-y-3.5 font-normal">
                <p>
                  Customers enjoy a <strong className="font-semibold text-zinc-900 dark:text-white">7-Day Return &amp; Exchange Window</strong> from the recorded date of delivery for qualifying items.
                </p>
                <p>
                  Garments must be returned in unworn, unwashed condition with all serialized DripHunter authenticity tags attached. Approved refunds are credited directly to your original payment source within 3–5 business days post-inspection.
                </p>
              </div>
            
              </div>
            </article>

            {/* 9. CANCELLATION */}
            <article
              id="section-9"
              className="py-10 border-b border-zinc-200/60 dark:border-zinc-800/60 space-y-5 text-left relative group first:pt-0 last:border-b-0"
            >

              <div onClick={() => toggleSection("section-9")} className="cursor-pointer group select-none block w-full">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-[#6F4E37]/10 dark:bg-[#E6C280]/15 text-[#6F4E37] dark:text-[#E6C280]">
                    CLAUSE 09 // MODIFICATIONS
                  </span>
                  <span className="text-[9px] font-mono text-zinc-400 uppercase font-bold">Pre-Vault Dispatch</span>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); handleCopyLink("section-9"); }}
                  className="text-zinc-400 hover:text-[#6F4E37] dark:hover:text-[#E6C280] transition-colors p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer border-none bg-transparent flex items-center gap-1 text-[9px] font-mono"
                >
                  {copiedSection === "section-9" ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSection === "section-9" ? "Copied" : "Share"}</span>
                </button>
              
                </div>
                <div className="flex items-center justify-between mt-2">
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-zinc-950 dark:text-zinc-50 font-playfair leading-[1.05]">Order Cancellation <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280]">Terms</span>
              </h2>
                  <ChevronDown className={`w-6 h-6 text-zinc-400 transition-transform duration-300 shrink-0 ${openSections.includes("section-9") ? "rotate-180" : ""}`} />
                </div>
              </div>
              <div className={`transition-all duration-500 ease-in-out overflow-hidden mt-4 space-y-5 ${openSections.includes("section-9") ? "max-h-[5000px] opacity-100" : "max-h-0 opacity-0 m-0"}`}>
                

              <div className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-sans space-y-3.5 font-normal">
                <p>
                  Orders can be cancelled with an instant refund directly from your account dashboard before the item is sealed into tamper-evident vault packaging. After courier handover, standard return protocols apply upon delivery.
                </p>
              </div>
            
              </div>
            </article>

            {/* 10. AUTHENTICITY */}
            <article
              id="section-10"
              className="py-10 border-b border-zinc-200/60 dark:border-zinc-800/60 space-y-5 text-left relative group first:pt-0 last:border-b-0"
            >

              <div onClick={() => toggleSection("section-10")} className="cursor-pointer group select-none block w-full">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-[#6F4E37]/10 dark:bg-[#E6C280]/15 text-[#6F4E37] dark:text-[#E6C280]">
                    CLAUSE 10 // PLEDGE
                  </span>
                  <span className="text-[9px] font-mono text-zinc-400 uppercase font-bold">Zero Tolerance</span>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); handleCopyLink("section-10"); }}
                  className="text-zinc-400 hover:text-[#6F4E37] dark:hover:text-[#E6C280] transition-colors p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer border-none bg-transparent flex items-center gap-1 text-[9px] font-mono"
                >
                  {copiedSection === "section-10" ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSection === "section-10" ? "Copied" : "Share"}</span>
                </button>
              
                </div>
                <div className="flex items-center justify-between mt-2">
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-zinc-950 dark:text-zinc-50 font-playfair leading-[1.05]">100% Authenticity <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280]">Guarantee</span>
              </h2>
                  <ChevronDown className={`w-6 h-6 text-zinc-400 transition-transform duration-300 shrink-0 ${openSections.includes("section-10") ? "rotate-180" : ""}`} />
                </div>
              </div>
              <div className={`transition-all duration-500 ease-in-out overflow-hidden mt-4 space-y-5 ${openSections.includes("section-10") ? "max-h-[5000px] opacity-100" : "max-h-0 opacity-0 m-0"}`}>
                

              <div className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-sans space-y-3.5 font-normal">
                <p>
                  DripHunter enforces a non-negotiable authenticity verification pipeline. In-house streetwear experts inspect stitch density, fabric weight, neck-tag font kerning, hardware engraving, and RFID microchips.
                </p>
                <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 flex items-start gap-3.5">
                  <ShieldCheck className="w-6 h-6 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <strong className="text-xs font-bold font-mono uppercase text-emerald-900 dark:text-emerald-300 block">
                      200% Money-Back Legitimacy Guarantee
                    </strong>
                    <p className="text-xs text-emerald-800 dark:text-emerald-400 leading-relaxed font-sans font-medium">
                      If an item received from DripHunter fails certified third-party verification, we will refund double the purchase price upon returned inspection.
                    </p>
                  </div>
                </div>
              </div>
            
              </div>
            </article>

            {/* 11. SELLER TERMS */}
            <article
              id="section-11"
              className="py-10 border-b border-zinc-200/60 dark:border-zinc-800/60 space-y-5 text-left relative group first:pt-0 last:border-b-0"
            >

              <div onClick={() => toggleSection("section-11")} className="cursor-pointer group select-none block w-full">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-[#6F4E37]/10 dark:bg-[#E6C280]/15 text-[#6F4E37] dark:text-[#E6C280]">
                    CLAUSE 11 // MERCHANTS
                  </span>
                  <span className="text-[9px] font-mono text-zinc-400 uppercase font-bold">Consignment</span>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); handleCopyLink("section-11"); }}
                  className="text-zinc-400 hover:text-[#6F4E37] dark:hover:text-[#E6C280] transition-colors p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer border-none bg-transparent flex items-center gap-1 text-[9px] font-mono"
                >
                  {copiedSection === "section-11" ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSection === "section-11" ? "Copied" : "Share"}</span>
                </button>
              
                </div>
                <div className="flex items-center justify-between mt-2">
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-zinc-950 dark:text-zinc-50 font-playfair leading-[1.05]">Seller Terms & <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280]">Consignment</span>
              </h2>
                  <ChevronDown className={`w-6 h-6 text-zinc-400 transition-transform duration-300 shrink-0 ${openSections.includes("section-11") ? "rotate-180" : ""}`} />
                </div>
              </div>
              <div className={`transition-all duration-500 ease-in-out overflow-hidden mt-4 space-y-5 ${openSections.includes("section-11") ? "max-h-[5000px] opacity-100" : "max-h-0 opacity-0 m-0"}`}>
                

              <div className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-sans space-y-3.5 font-normal">
                <p>
                  Independent designers, brands, and verified collectors consignment partners must adhere to our Merchant Standard Operating Procedure. Sellers warrant that all garments are 100% genuine and compliant with consumer trade regulations.
                </p>
                <p>
                  Any merchant attempting to consign replica goods faces permanent account deactivation and civil liability reporting.
                </p>
              </div>
            
              </div>
            </article>

            {/* 12. INTELLECTUAL PROPERTY */}
            <article
              id="section-12"
              className="py-10 border-b border-zinc-200/60 dark:border-zinc-800/60 space-y-5 text-left relative group first:pt-0 last:border-b-0"
            >

              <div onClick={() => toggleSection("section-12")} className="cursor-pointer group select-none block w-full">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-[#6F4E37]/10 dark:bg-[#E6C280]/15 text-[#6F4E37] dark:text-[#E6C280]">
                    CLAUSE 12 // ASSETS
                  </span>
                  <span className="text-[9px] font-mono text-zinc-400 uppercase font-bold">Copyright & IP</span>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); handleCopyLink("section-12"); }}
                  className="text-zinc-400 hover:text-[#6F4E37] dark:hover:text-[#E6C280] transition-colors p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer border-none bg-transparent flex items-center gap-1 text-[9px] font-mono"
                >
                  {copiedSection === "section-12" ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSection === "section-12" ? "Copied" : "Share"}</span>
                </button>
              
                </div>
                <div className="flex items-center justify-between mt-2">
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-zinc-950 dark:text-zinc-50 font-playfair leading-[1.05]">Intellectual Property <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280]">Rights</span>
              </h2>
                  <ChevronDown className={`w-6 h-6 text-zinc-400 transition-transform duration-300 shrink-0 ${openSections.includes("section-12") ? "rotate-180" : ""}`} />
                </div>
              </div>
              <div className={`transition-all duration-500 ease-in-out overflow-hidden mt-4 space-y-5 ${openSections.includes("section-12") ? "max-h-[5000px] opacity-100" : "max-h-0 opacity-0 m-0"}`}>
                

              <div className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-sans space-y-3.5 font-normal">
                <p>
                  All platform graphics, lookbooks, curation code, video content, and branding emblems belong exclusively to DripHunter. Unsanctioned scraping, reverse engineering, or unauthorized trademark usage is prohibited.
                </p>
              </div>
            
              </div>
            </article>

            {/* 13. PRIVACY */}
            <article
              id="section-13"
              className="py-10 border-b border-zinc-200/60 dark:border-zinc-800/60 space-y-5 text-left relative group first:pt-0 last:border-b-0"
            >

              <div onClick={() => toggleSection("section-13")} className="cursor-pointer group select-none block w-full">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-[#6F4E37]/10 dark:bg-[#E6C280]/15 text-[#6F4E37] dark:text-[#E6C280]">
                    CLAUSE 13 // DATA
                  </span>
                  <span className="text-[9px] font-mono text-zinc-400 uppercase font-bold">Privacy Guard</span>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); handleCopyLink("section-13"); }}
                  className="text-zinc-400 hover:text-[#6F4E37] dark:hover:text-[#E6C280] transition-colors p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer border-none bg-transparent flex items-center gap-1 text-[9px] font-mono"
                >
                  {copiedSection === "section-13" ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSection === "section-13" ? "Copied" : "Share"}</span>
                </button>
              
                </div>
                <div className="flex items-center justify-between mt-2">
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-zinc-950 dark:text-zinc-50 font-playfair leading-[1.05]">Privacy & Information <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280]">Governance</span>
              </h2>
                  <ChevronDown className={`w-6 h-6 text-zinc-400 transition-transform duration-300 shrink-0 ${openSections.includes("section-13") ? "rotate-180" : ""}`} />
                </div>
              </div>
              <div className={`transition-all duration-500 ease-in-out overflow-hidden mt-4 space-y-5 ${openSections.includes("section-13") ? "max-h-[5000px] opacity-100" : "max-h-0 opacity-0 m-0"}`}>
                

              <div className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-sans space-y-3.5 font-normal">
                <p>
                  We treat personal data with strict enterprise confidentiality in compliance with India&apos;s Digital Personal Data Protection (DPDP) Act 2023. We never sell your browsing patterns, payment details, or contact numbers to third parties.
                </p>
                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <span className="text-xs font-mono font-bold text-zinc-900 dark:text-white uppercase block">
                      Separate Legal Framework: Privacy Policy
                    </span>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                      For granular details on information collection, cookie controls, PCI-DSS payment tokenization, and data rights, please review our separate document.
                    </p>
                  </div>
                  <Link
                    href="/privacy"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#6F4E37] hover:bg-[#5C3D2E] text-white dark:bg-[#E6C280] dark:text-zinc-950 dark:hover:bg-[#d4af37] text-[10px] font-mono font-bold uppercase tracking-wider shrink-0 transition-colors"
                  >
                    <span>View Privacy Policy</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            
              </div>
            </article>

            {/* 14. LIABILITY */}
            <article
              id="section-14"
              className="py-10 border-b border-zinc-200/60 dark:border-zinc-800/60 space-y-5 text-left relative group first:pt-0 last:border-b-0"
            >

              <div onClick={() => toggleSection("section-14")} className="cursor-pointer group select-none block w-full">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-[#6F4E37]/10 dark:bg-[#E6C280]/15 text-[#6F4E37] dark:text-[#E6C280]">
                    CLAUSE 14 // INDEMNITY
                  </span>
                  <span className="text-[9px] font-mono text-zinc-400 uppercase font-bold">Liability Bounds</span>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); handleCopyLink("section-14"); }}
                  className="text-zinc-400 hover:text-[#6F4E37] dark:hover:text-[#E6C280] transition-colors p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer border-none bg-transparent flex items-center gap-1 text-[9px] font-mono"
                >
                  {copiedSection === "section-14" ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSection === "section-14" ? "Copied" : "Share"}</span>
                </button>
              
                </div>
                <div className="flex items-center justify-between mt-2">
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-zinc-950 dark:text-zinc-50 font-playfair leading-[1.05]">Limitation of <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280]">Liability</span>
              </h2>
                  <ChevronDown className={`w-6 h-6 text-zinc-400 transition-transform duration-300 shrink-0 ${openSections.includes("section-14") ? "rotate-180" : ""}`} />
                </div>
              </div>
              <div className={`transition-all duration-500 ease-in-out overflow-hidden mt-4 space-y-5 ${openSections.includes("section-14") ? "max-h-[5000px] opacity-100" : "max-h-0 opacity-0 m-0"}`}>
                

              <div className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-sans space-y-3.5 font-normal">
                <p>
                  To the extent permitted by Indian statutory law, DripHunter&apos;s aggregate liability for any claim arising out of a purchase transaction is strictly limited to the actual amount paid by the customer for the item in dispute.
                </p>
              </div>
            
              </div>
            </article>

            {/* 15. CONTACT */}
            <article
              id="section-15"
              className="py-10 border-b border-zinc-200/60 dark:border-zinc-800/60 space-y-5 text-left relative group first:pt-0 last:border-b-0"
            >

              <div onClick={() => toggleSection("section-15")} className="cursor-pointer group select-none block w-full">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-[#6F4E37]/10 dark:bg-[#E6C280]/15 text-[#6F4E37] dark:text-[#E6C280]">
                    CLAUSE 15 // CONCIERGE
                  </span>
                  <span className="text-[9px] font-mono text-zinc-400 uppercase font-bold">Support Liaison</span>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); handleCopyLink("section-15"); }}
                  className="text-zinc-400 hover:text-[#6F4E37] dark:hover:text-[#E6C280] transition-colors p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer border-none bg-transparent flex items-center gap-1 text-[9px] font-mono"
                >
                  {copiedSection === "section-15" ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSection === "section-15" ? "Copied" : "Share"}</span>
                </button>
              
                </div>
                <div className="flex items-center justify-between mt-2">
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-zinc-950 dark:text-zinc-50 font-playfair leading-[1.05]">Contact & Legal <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280]">Concierge</span>
              </h2>
                  <ChevronDown className={`w-6 h-6 text-zinc-400 transition-transform duration-300 shrink-0 ${openSections.includes("section-15") ? "rotate-180" : ""}`} />
                </div>
              </div>
              <div className={`transition-all duration-500 ease-in-out overflow-hidden mt-4 space-y-5 ${openSections.includes("section-15") ? "max-h-[5000px] opacity-100" : "max-h-0 opacity-0 m-0"}`}>
                

              <div className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-sans space-y-3.5 font-normal">
                <p>
                  For formal legal correspondence, dispute resolution, or authenticity escalation inquiries, please reach out to our legal department:
                </p>
                <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/80 space-y-3 text-xs font-mono text-zinc-700 dark:text-zinc-300">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[#6F4E37] dark:text-[#E6C280]" />
                    <span>Legal Email: <a href="mailto:legal@driphunter.com" className="text-[#6F4E37] dark:text-[#E6C280] font-bold underline">legal@driphunter.com</a></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-[#6F4E37] dark:text-[#E6C280]" />
                    <span>Customer Concierge: <Link href="/contact" className="text-[#6F4E37] dark:text-[#E6C280] font-bold underline">driphunter.com/contact</Link></span>
                  </div>
                  <p className="text-[10px] text-zinc-400 pt-1">
                    DripHunter Curation & Logistics Pvt Ltd, Mumbai, Maharashtra, India.
                  </p>
                </div>
              </div>
            
              </div>
            </article>

          </div>
        </div>

        {/* Floating Back to Top Button */}
        <div className="fixed bottom-6 right-6 z-30">
          <button
            onClick={scrollToTop}
            title="Scroll to Top"
            className="w-12 h-12 rounded-full bg-zinc-950 text-white dark:bg-[#E6C280] dark:text-zinc-950 flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all cursor-pointer border border-white/10 dark:border-zinc-800 hover:shadow-[0_0_25px_rgba(230,194,128,0.4)]"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        </div>
      </PageContainer>

    </StaticContentLayout>
    </div>
  );
}
