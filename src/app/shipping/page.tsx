"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import StaticContentLayout from "@/components/layout/StaticContentLayout";
import PageContainer from "@/components/layout/PageContainer";
import SearchOverlay from "@/components/layout/SearchOverlay";
import { SectionHeading } from "@/components/ui/SectionHeading";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);
import {
  Truck,
  MapPin,
  Clock,
  Calendar,
  CreditCard,
  Search,
  AlertTriangle,
  Globe,
  Mail,
  CheckCircle2,
  Package,
  ShieldCheck,
  Printer,
  ChevronRight,
  Building,
  RotateCcw,
  Sparkles,
  ArrowRight
} from "lucide-react";

export default function ShippingPolicyPage() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
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
        gsap.fromTo(".hero-elem", 
          { y: 30, opacity: 0 }, 
          { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out" }
        );

        // Scroll animations for cards
        const cards = gsap.utils.toArray(".anim-card");
        cards.forEach((card: any) => {
          gsap.fromTo(card,
            { y: 50, opacity: 0, scale: 0.95 },
            { 
              y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
              }
            }
          );
        });
      }, containerRef);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div ref={containerRef}>
      <StaticContentLayout>
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      {/* ─── 1. CENTERED HERO ─── */}
      <section className="relative w-full overflow-hidden bg-zinc-950 pt-32 pb-24 px-4 sm:px-8 border-b border-zinc-800">
        {/* Subtle Decorative Grid Pattern & Lights */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.03] pointer-events-none" />
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#C5A880]/20 blur-[150px] rounded-full pointer-events-none" />
        
        {/* Animated tracking lines simulation */}
        <div className="absolute top-1/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#C5A880]/30 to-transparent">
          <div className="absolute top-[-2px] left-[-10px] w-1.5 h-1.5 bg-[#C5A880] rounded-full animate-[ping_4s_ease-in-out_infinite]" />
        </div>
        <div className="absolute bottom-1/3 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent">
          <div className="absolute top-[-2px] right-[-10px] w-1.5 h-1.5 bg-emerald-500 rounded-full animate-[ping_5s_ease-in-out_infinite]" />
        </div>

        <div className="w-full relative z-10 space-y-8 text-center max-w-4xl mx-auto">
          
          {/* Top Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 hero-elem">
            <div className="inline-flex items-center gap-2 bg-zinc-900/80 border border-zinc-800 text-zinc-300 font-mono text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full shadow-sm backdrop-blur-md">
              <Truck className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Pan-India Logistics</span>
            </div>

            <div className="inline-flex items-center gap-2 bg-zinc-900/80 border border-zinc-800 text-emerald-400 font-mono text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full shadow-sm backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>100% Tracked Vault Shipments</span>
            </div>
          </div>

          {/* Headline */}
          <div className="space-y-4 w-full hero-elem">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-white font-playfair leading-[1.05] uppercase">
              SHIPPING <span className="font-serif italic font-normal text-[#C5A880] lowercase">policy</span>
            </h1>
            <p className="text-base md:text-lg text-zinc-400 font-sans font-light max-w-2xl mx-auto leading-relaxed">
              Complete guide to our express courier network, vault legitimacy inspection, door-to-door transit timelines, and global shipping capabilities.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 hero-elem">
            <Link
              href="/orders"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white hover:bg-zinc-100 text-zinc-950 transition-all shadow-md font-mono text-xs tracking-widest uppercase font-bold w-full sm:w-auto group"
            >
              <Search className="w-4 h-4 text-[#C5A880] group-hover:scale-110 transition-transform" />
              <span>Track Active Orders</span>
            </Link>
            <button
              onClick={handlePrint}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white transition-all shadow-sm font-mono text-xs tracking-widest uppercase font-bold w-full sm:w-auto"
            >
              <Printer className="w-4 h-4 text-zinc-400" />
              <span>Print Policy</span>
            </button>
          </div>
        </div>
      </section>

      <PageContainer className="py-24 space-y-32">
        
        {/* ─── 2. PRICING & TIMELINES (CARDS) ─── */}
        <section className="space-y-12">
          <SectionHeading
            variant="playfair-sm"
            className="text-zinc-900 text-center"
            title={<>Rates &amp; <span className="font-serif italic font-normal text-[#C5A880]">Timelines</span></>}
            eyebrow={
              <div className="flex items-center justify-center gap-2.5 mb-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#C5A880] animate-pulse" />
                <span className="text-[10px] md:text-xs font-semibold tracking-[0.25em] text-[#6F4E37] uppercase font-mono">
                  Transit Estimates
                </span>
              </div>
            }
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Shipping Charges */}
            <div className="bg-white rounded-[2rem] border border-[#EAD8C0] p-8 md:p-10 shadow-sm flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300 anim-card">
              <div className="mb-8">
                <div className="w-12 h-12 rounded-full bg-[#FAF8F5] border border-[#EAD8C0] flex items-center justify-center mb-6">
                  <CreditCard className="w-5 h-5 text-[#6F4E37]" />
                </div>
                <h3 className="text-2xl font-playfair text-zinc-900 mb-2">Shipping Rates</h3>
                <p className="text-sm text-zinc-600 font-sans leading-relaxed">
                  Transparent freight rates with no hidden fuel surcharges.
                </p>
              </div>
              <ul className="space-y-4 font-sans text-sm">
                <li className="flex justify-between items-center py-3 border-b border-zinc-100">
                  <span className="text-zinc-600">Orders above ₹1,999</span>
                  <span className="font-mono font-bold text-emerald-600">FREE</span>
                </li>
                <li className="flex justify-between items-center py-3 border-b border-zinc-100">
                  <span className="text-zinc-600">Orders under ₹1,999</span>
                  <span className="font-mono font-bold text-zinc-900">₹99</span>
                </li>
                <li className="flex justify-between items-center py-3">
                  <span className="text-zinc-600">Cash on Delivery (COD)</span>
                  <span className="font-mono font-bold text-zinc-900">+₹49 Fee</span>
                </li>
              </ul>
            </div>

            {/* Processing Time */}
            <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 p-8 md:p-10 shadow-sm flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden group anim-card">
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-[#C5A880]/10 rounded-full blur-2xl group-hover:bg-[#C5A880]/20 transition-colors"></div>
              <div className="relative z-10 mb-8">
                <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center mb-6">
                  <ShieldCheck className="w-5 h-5 text-[#C5A880]" />
                </div>
                <h3 className="text-2xl font-playfair text-white mb-2">Vault Processing</h3>
                <p className="text-sm text-zinc-400 font-sans leading-relaxed">
                  Every item undergoes mandatory physical inspection before dispatch.
                </p>
              </div>
              <div className="relative z-10 space-y-4">
                <div className="bg-zinc-800/50 p-4 rounded-2xl border border-zinc-700/50">
                  <span className="block text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest mb-1">Standard Drops</span>
                  <span className="block text-base font-medium text-white">24 – 48 Hours</span>
                </div>
                <div className="bg-zinc-800/50 p-4 rounded-2xl border border-zinc-700/50">
                  <span className="block text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest mb-1">Pre-Orders / Flash</span>
                  <span className="block text-base font-medium text-white">3 – 7 Days</span>
                </div>
              </div>
            </div>

            {/* Delivery Time */}
            <div className="bg-white rounded-[2rem] border border-[#EAD8C0] p-8 md:p-10 shadow-sm flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300 anim-card">
              <div className="mb-8">
                <div className="w-12 h-12 rounded-full bg-[#FAF8F5] border border-[#EAD8C0] flex items-center justify-center mb-6">
                  <Clock className="w-5 h-5 text-[#6F4E37]" />
                </div>
                <h3 className="text-2xl font-playfair text-zinc-900 mb-2">Transit Windows</h3>
                <p className="text-sm text-zinc-600 font-sans leading-relaxed">
                  Estimated delivery times start once the courier collects your sealed order.
                </p>
              </div>
              <ul className="space-y-4 font-sans text-sm">
                <li className="flex justify-between items-center py-3 border-b border-zinc-100">
                  <span className="text-zinc-600">Metro Express</span>
                  <span className="font-mono font-bold text-zinc-900">2 – 4 Days</span>
                </li>
                <li className="flex justify-between items-center py-3 border-b border-zinc-100">
                  <span className="text-zinc-600">Standard National</span>
                  <span className="font-mono font-bold text-zinc-900">4 – 7 Days</span>
                </li>
                <li className="flex justify-between items-center py-3">
                  <span className="text-zinc-600">Remote Zones (NE, J&K)</span>
                  <span className="font-mono font-bold text-zinc-900">7 – 10 Days</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ─── 3. GEOGRAPHICAL COVERAGE (SPLIT) ─── */}
        <section className="space-y-12">
          <SectionHeading
            variant="playfair-sm"
            className="text-zinc-900 text-center"
            title={<>Global <span className="font-serif italic font-normal text-[#C5A880]">Reach</span></>}
            eyebrow={
              <div className="flex items-center justify-center gap-2.5 mb-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#C5A880] animate-pulse" />
                <span className="text-[10px] md:text-xs font-semibold tracking-[0.25em] text-[#6F4E37] uppercase font-mono">
                  Delivery Infrastructure
                </span>
              </div>
            }
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto items-stretch">
            {/* Domestic */}
            <div className="bg-[#FAF8F5] border border-[#EAD8C0] p-10 md:p-14 rounded-[2rem] flex flex-col justify-center anim-card">
              <div className="w-12 h-12 rounded-2xl bg-white text-[#6F4E37] flex items-center justify-center shrink-0 border border-[#EAD8C0] mb-6">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-3xl font-playfair text-zinc-900 mb-4">Domestic Coverage</h3>
              <p className="text-base text-zinc-600 font-sans leading-relaxed mb-8">
                DripHunter ships across India through Tier-1 express courier partnerships, servicing over <strong className="text-zinc-900">25,000+ postal PIN codes</strong> covering all major states and union territories.
              </p>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-2xl border border-[#EAD8C0]/50 flex items-center gap-4">
                  <Building className="w-5 h-5 text-[#C5A880]" />
                  <div>
                    <h4 className="text-sm font-mono font-bold text-zinc-900 uppercase">Metro Hubs</h4>
                    <p className="text-xs text-zinc-500 font-sans">Mumbai, Delhi NCR, Bangalore, Hyderabad, Chennai</p>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-[#EAD8C0]/50 flex items-center gap-4">
                  <MapPin className="w-5 h-5 text-[#C5A880]" />
                  <div>
                    <h4 className="text-sm font-mono font-bold text-zinc-900 uppercase">Tier 2 & 3 Cities</h4>
                    <p className="text-xs text-zinc-500 font-sans">Jaipur, Chandigarh, Lucknow, Kochi, Surat, Indore</p>
                  </div>
                </div>
              </div>
            </div>

            {/* International */}
            <div className="bg-zinc-900 border border-zinc-800 p-10 md:p-14 rounded-[2rem] flex flex-col justify-center relative overflow-hidden anim-card">
              <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-zinc-800 text-[#C5A880] flex items-center justify-center shrink-0 border border-zinc-700 mb-6">
                  <Globe className="w-6 h-6" />
                </div>
                <h3 className="text-3xl font-playfair text-white mb-4">International Shipping</h3>
                <p className="text-base text-zinc-400 font-sans leading-relaxed mb-8">
                  We ship selected streetwear grails and archive pieces worldwide via international air express (DHL Express & FedEx International).
                </p>

                <div className="space-y-4">
                  <div className="bg-zinc-800/50 p-4 rounded-2xl border border-zinc-700/50 flex flex-col gap-1">
                    <h4 className="text-sm font-mono font-bold text-white uppercase">Transit Time</h4>
                    <p className="text-xs text-zinc-400 font-sans">Typically ranges from 7 to 14 business days globally.</p>
                  </div>
                  <div className="bg-zinc-800/50 p-4 rounded-2xl border border-zinc-700/50 flex flex-col gap-1">
                    <h4 className="text-sm font-mono font-bold text-white uppercase">Customs & Duties (DDU)</h4>
                    <p className="text-xs text-zinc-400 font-sans">Import taxes, VAT, and local clearance fees are the sole responsibility of the recipient upon arrival.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 4. BENTO GRID (TRACKING & SUPPORT) ─── */}
        <section className="space-y-12">
          <SectionHeading
            variant="playfair-sm"
            className="text-zinc-900 text-center"
            title={<>Order <span className="font-serif italic font-normal text-[#C5A880]">Assistance</span></>}
            eyebrow={
              <div className="flex items-center justify-center gap-2.5 mb-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#C5A880] animate-pulse" />
                <span className="text-[10px] md:text-xs font-semibold tracking-[0.25em] text-[#6F4E37] uppercase font-mono">
                  Telemetry & Support
                </span>
              </div>
            }
          />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 max-w-6xl mx-auto">
            
            {/* Tracking (Wide) */}
            <div className="md:col-span-8 bg-white rounded-[2rem] border border-[#EAD8C0] p-8 md:p-10 shadow-sm relative overflow-hidden group anim-card">
              <div className="absolute right-0 bottom-0 w-64 h-64 bg-zinc-50 rounded-tl-full -mr-16 -mb-16 border-t border-l border-[#EAD8C0]/50 transition-transform group-hover:scale-110 duration-500"></div>
              <div className="relative z-10">
                <h3 className="text-2xl font-playfair text-zinc-900 mb-4">Real-Time Telemetry</h3>
                <p className="text-sm font-sans text-zinc-600 leading-relaxed mb-8 max-w-lg">
                  Stay informed every step of the way from our vault staging area directly to your door:
                </p>
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#FAF8F5] border border-[#EAD8C0] flex items-center justify-center shrink-0 mt-1">
                      <span className="text-[10px] font-mono font-bold text-[#6F4E37]">1</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-mono font-bold uppercase text-zinc-900">Instant AWB</h4>
                      <p className="text-xs text-zinc-500 mt-1">Generated upon packaging with tracking link sent via SMS.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#FAF8F5] border border-[#EAD8C0] flex items-center justify-center shrink-0 mt-1">
                      <span className="text-[10px] font-mono font-bold text-[#6F4E37]">2</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-mono font-bold uppercase text-zinc-900">SMS Alerts</h4>
                      <p className="text-xs text-zinc-500 mt-1">Automated updates for Dispatched, Transit, and Out for Delivery.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Exceptions (Narrow) */}
            <div className="md:col-span-4 bg-[#FAF8F5] rounded-[2rem] border border-[#EAD8C0] p-8 md:p-10 shadow-sm anim-card">
              <h3 className="text-xl font-playfair text-zinc-900 mb-4">Delays & Exceptions</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <p className="text-xs font-sans text-zinc-600">Force Majeure (monsoons, strikes) may extend transit by 24-48hrs.</p>
                </li>
                <li className="flex items-start gap-3">
                  <RotateCcw className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                  <p className="text-xs font-sans text-zinc-600">Couriers make up to 3 separate delivery attempts.</p>
                </li>
                <li className="flex items-start gap-3">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <p className="text-xs font-sans text-zinc-600">100% lost transit guarantee for confirmed missing parcels.</p>
                </li>
              </ul>
            </div>

            {/* Support Desk (Full Width) */}
            <div className="md:col-span-12 bg-zinc-900 rounded-[2rem] border border-zinc-800 p-8 md:p-10 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-8 anim-card">
              <div>
                <h3 className="text-2xl font-playfair text-white mb-2">Logistics Concierge Desk</h3>
                <p className="text-sm font-sans text-zinc-400 leading-relaxed max-w-xl">
                  Need urgent assistance rerouting a package, verifying a delivery OTP, or tracking a delayed shipment? Our team responds within 2 business hours.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 shrink-0">
                <a href="mailto:shipping@driphunter.com" className="inline-flex items-center gap-3 bg-zinc-800 hover:bg-zinc-700 px-6 py-4 rounded-2xl transition-colors border border-zinc-700">
                  <Mail className="w-5 h-5 text-[#C5A880]" />
                  <div className="text-left">
                    <span className="block text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-bold">Email Desk</span>
                    <span className="block text-sm font-sans font-medium text-white">shipping@driphunter.com</span>
                  </div>
                </a>
                
                <Link href="/contact" className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-900 font-bold hover:opacity-90 transition-opacity bg-white px-6 py-4 rounded-2xl border border-transparent">
                  Contact Center <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>
        </section>

      </PageContainer>
    </StaticContentLayout>
    </div>
  );
}
