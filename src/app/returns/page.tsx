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
  RotateCcw,
  Calendar,
  CheckCircle2,
  XCircle,
  RefreshCw,
  CreditCard,
  Mail,
  Printer,
  ShoppingBag,
  ShieldCheck,
  Package,
  ChevronRight,
  AlertTriangle,
  ArrowRight,
  Truck,
  Check
} from "lucide-react";

export default function ReturnsRefundsPage() {
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
        // Hero animations (different for different elements)
        gsap.fromTo(".anim-heading", { opacity: 0, scale: 0.9, rotateX: -20 }, { opacity: 1, scale: 1, rotateX: 0, duration: 1.2, ease: "power4.out" });
        gsap.fromTo(".anim-text", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: "power3.out" });
        gsap.fromTo(".anim-hero-btns", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.6, stagger: 0.2, ease: "power2.out" });
        gsap.fromTo(".anim-hero-card", { opacity: 0, x: 50, rotateY: 15 }, { opacity: 1, x: 0, rotateY: 0, duration: 1.2, delay: 0.4, ease: "back.out(1.2)" });

        // Scroll animations for Section Headings
        gsap.utils.toArray(".anim-section-heading").forEach((elem: any) => {
          gsap.fromTo(elem, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, scrollTrigger: { trigger: elem, start: "top 90%" }});
        });

        // Different Card Animations
        gsap.utils.toArray(".anim-slide-up").forEach((card: any) => {
          gsap.fromTo(card, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", scrollTrigger: { trigger: card, start: "top 85%" }});
        });
        
        gsap.utils.toArray(".anim-scale-up").forEach((card: any) => {
          gsap.fromTo(card, { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.2)", scrollTrigger: { trigger: card, start: "top 85%" }});
        });

        gsap.utils.toArray(".anim-slide-right").forEach((card: any) => {
          gsap.fromTo(card, { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.8, ease: "power2.out", scrollTrigger: { trigger: card, start: "top 85%" }});
        });

        gsap.utils.toArray(".anim-slide-left").forEach((card: any) => {
          gsap.fromTo(card, { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 0.8, ease: "power2.out", scrollTrigger: { trigger: card, start: "top 85%" }});
        });

        gsap.utils.toArray(".anim-stagger-step").forEach((step: any) => {
          gsap.fromTo(step, { opacity: 0, y: 30, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.6, scrollTrigger: { trigger: step, start: "top 90%" }});
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

      {/* ─── 1. ASYMMETRICAL SPLIT HERO ─── */}
      <section className="relative w-full overflow-hidden bg-[#FCFAF7] pt-32 pb-20 px-4 sm:px-8 lg:px-12 xl:px-16 border-b border-[#EAD8C0]/50">
        <div className="absolute inset-0 opacity-[0.4] mix-blend-overlay" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/rice-paper-2.png')" }}></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#EAD8C0]/30 blur-[130px] rounded-full pointer-events-none" />
        
        <PageContainer>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center relative z-10">
            {/* Left: Text & CTA */}
            <div className="space-y-8 max-w-2xl mx-auto lg:mx-0 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-white/60 border border-[#C5A880]/30 text-[#6F4E37] font-mono text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full shadow-sm backdrop-blur-sm mx-auto lg:mx-0">
                <RotateCcw className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Reverse Logistics Hub</span>
              </div>
              
              <h1 className="anim-heading text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-zinc-950 font-playfair leading-[1.05] uppercase">
                RETURNS <br className="hidden lg:block" />
                <span className="font-serif italic font-normal text-[#C5A880] lowercase">&amp; refunds</span>
              </h1>
              
              <p className="anim-text text-base md:text-lg text-zinc-600 font-sans font-light leading-relaxed">
                Experience our seamless 7-day doorstep return policy. We handle the reverse logistics, quality inspection, and automated escrow refunds so you can shop with absolute confidence.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start pt-4 anim-hero-btns">
                <Link
                  href="/orders"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#3B2C21] hover:bg-[#1a1a1a] text-white transition-all shadow-md font-mono text-xs tracking-widest uppercase font-bold w-full sm:w-auto"
                >
                  <ShoppingBag className="w-4 h-4 text-[#C5A880]" />
                  <span>Start a Return</span>
                </Link>
                <button
                  onClick={handlePrint}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white hover:bg-zinc-50 border border-[#EAD8C0] text-zinc-800 transition-all shadow-sm font-mono text-xs tracking-widest uppercase font-bold w-full sm:w-auto"
                >
                  <Printer className="w-4 h-4 text-[#6F4E37]" />
                  <span>Print Policy</span>
                </button>
              </div>
            </div>

            {/* Right: Visual Policy Summary Card */}
            <div className="relative mx-auto lg:ml-auto w-full max-w-md anim-hero-card">
              <div className="absolute inset-0 bg-gradient-to-br from-white via-[#EAD8C0] to-[#C5A880] opacity-100 rounded-[3rem] transform rotate-3 scale-105"></div>
              <div className="relative bg-white/90 backdrop-blur-2xl border border-white rounded-[2.5rem] p-8 md:p-10 shadow-[0_30px_60px_-15px_rgba(197,168,128,0.3)] space-y-8">
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-playfair text-zinc-900 mb-1">7-Day Window</h3>
                    <p className="text-xs font-sans text-zinc-600 leading-relaxed">Full refund for eligible items starting from the exact delivery timestamp.</p>
                  </div>
                </div>

                <div className="w-full h-px bg-gradient-to-r from-transparent via-[#EAD8C0] to-transparent"></div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#FCFAF7] text-[#6F4E37] flex items-center justify-center shrink-0 border border-[#EAD8C0]">
                    <RefreshCw className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-playfair text-zinc-900 mb-1">10-Day Exchange</h3>
                    <p className="text-xs font-sans text-zinc-600 leading-relaxed">Complimentary 1-time size swap for sneakers and apparel.</p>
                  </div>
                </div>

                <div className="w-full h-px bg-gradient-to-r from-transparent via-[#EAD8C0] to-transparent"></div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-playfair text-zinc-900 mb-1">Vault Inspected</h3>
                    <p className="text-xs font-sans text-zinc-600 leading-relaxed">All returns are professionally authenticated upon arrival before refunds are issued.</p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </PageContainer>
      </section>

      <PageContainer className="py-24 space-y-32">
        
        {/* ─── 2. THE POLICY (GRID) ─── */}
        <section className="space-y-12">
          <SectionHeading
            variant="playfair-sm"
            className="text-zinc-900 text-center anim-section-heading"
            title={<>Return <span className="font-serif italic font-normal text-[#C5A880]">Eligibility</span></>}
            eyebrow={
              <div className="flex items-center justify-center gap-2.5 mb-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#C5A880] animate-pulse" />
                <span className="text-[10px] md:text-xs font-semibold tracking-[0.25em] text-[#6F4E37] uppercase font-mono">
                  Acceptance Criteria
                </span>
              </div>
            }
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Eligible */}
            <div className="bg-white rounded-[2rem] border border-[#EAD8C0] p-8 md:p-12 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow anim-slide-right">
              <div className="absolute top-0 left-0 w-full h-2 bg-emerald-500"></div>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-playfair text-zinc-900">Eligible for Return</h3>
              </div>
              <ul className="space-y-4">
                {[
                  "Unworn, unwashed, and odor-free apparel",
                  "Original brand tags and wash-care labels attached",
                  "Sneakers with clean, unworn soles and zero creasing",
                  "Intact DripHunter security tamper seal",
                  "Original shoebox/dust-bag in pristine condition",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-sm font-sans text-zinc-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Non-Returnable */}
            <div className="bg-zinc-50 rounded-[2rem] border border-zinc-200 p-8 md:p-12 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow anim-slide-left">
              <div className="absolute top-0 left-0 w-full h-2 bg-red-500"></div>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center">
                  <XCircle className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-playfair text-zinc-900">Strictly Non-Returnable</h3>
              </div>
              <ul className="space-y-4">
                {[
                  "Items with cut or removed authentication seals",
                  "Socks, underwear, headwear, and hygiene items",
                  "Personal fragrances and jewelry",
                  "Custom 1-of-1 bespoke or commissioned pieces",
                  "Archive items marked as 'Final Sale' or 'Clearance'",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <span className="text-sm font-sans text-zinc-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ─── 3. HORIZONTAL PROCESS FLOW ─── */}
        <section className="space-y-16">
          <SectionHeading
            variant="playfair-sm"
            className="text-zinc-900 text-center anim-section-heading"
            title={<>How to <span className="font-serif italic font-normal text-[#C5A880]">Return</span></>}
            eyebrow={
              <div className="flex items-center justify-center gap-2.5 mb-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#C5A880] animate-pulse" />
                <span className="text-[10px] md:text-xs font-semibold tracking-[0.25em] text-[#6F4E37] uppercase font-mono">
                  Reverse Logistics Walkthrough
                </span>
              </div>
            }
          />

          <div className="relative max-w-6xl mx-auto">
            {/* Connecting Line (Desktop only) */}
            <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-transparent via-[#EAD8C0] to-transparent"></div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { step: "01", icon: ShoppingBag, title: "Request", desc: "Go to 'My Orders' and select the item you wish to return or exchange." },
                { step: "02", icon: Package, title: "Pack", desc: "Secure items in the original box with all tags and the security seal intact." },
                { step: "03", icon: Truck, title: "Pickup", desc: "Our courier will collect the package from your doorstep within 24-48 hrs." },
                { step: "04", icon: CreditCard, title: "Refund", desc: "Once vault inspected, funds are released instantly to your original payment method." },
              ].map((item, idx) => (
                <div key={idx} className="relative z-10 flex flex-col items-center text-center group anim-stagger-step">
                  <div className="w-24 h-24 rounded-full bg-white border border-[#EAD8C0] flex items-center justify-center mb-6 shadow-sm group-hover:border-[#C5A880] group-hover:scale-105 transition-all duration-300">
                    <item.icon className="w-8 h-8 text-[#6F4E37]" />
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#C5A880] mb-2">Step {item.step}</span>
                  <h4 className="text-xl font-playfair text-zinc-900 mb-3">{item.title}</h4>
                  <p className="text-xs sm:text-sm text-zinc-600 font-sans leading-relaxed max-w-[200px]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── 4. FAQ / ACCORDION FOR LOGISTICS ─── */}
        <section className="space-y-12">
          <SectionHeading
            variant="playfair-sm"
            className="text-zinc-900 text-center anim-section-heading"
            title={<>Logistics &amp; <span className="font-serif italic font-normal text-[#C5A880]">Support</span></>}
            eyebrow={
              <div className="flex items-center justify-center gap-2.5 mb-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#C5A880] animate-pulse" />
                <span className="text-[10px] md:text-xs font-semibold tracking-[0.25em] text-[#6F4E37] uppercase font-mono">
                  Additional Information
                </span>
              </div>
            }
          />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 max-w-5xl mx-auto">
            {/* Timeline (Wide) */}
            <div className="md:col-span-7 bg-white rounded-[2rem] border border-[#EAD8C0] p-8 md:p-10 shadow-sm hover:shadow-md transition-shadow anim-scale-up">
              <h3 className="text-xl font-playfair text-zinc-900 mb-4">Refund Timeline</h3>
              <p className="text-sm font-sans text-zinc-600 leading-relaxed mb-6">
                Turnaround times depend on your original payment instrument:
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#EAD8C0]/50">
                  <span className="block text-[10px] font-mono text-[#C5A880] uppercase tracking-widest font-bold mb-1">Store Credit</span>
                  <span className="block text-sm font-sans font-medium text-zinc-900">Instant (15 Mins)</span>
                </div>
                <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#EAD8C0]/50">
                  <span className="block text-[10px] font-mono text-[#C5A880] uppercase tracking-widest font-bold mb-1">UPI & Wallets</span>
                  <span className="block text-sm font-sans font-medium text-zinc-900">24 – 48 Hours</span>
                </div>
                <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#EAD8C0]/50">
                  <span className="block text-[10px] font-mono text-[#C5A880] uppercase tracking-widest font-bold mb-1">Cards</span>
                  <span className="block text-sm font-sans font-medium text-zinc-900">3 – 5 Days</span>
                </div>
                <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#EAD8C0]/50">
                  <span className="block text-[10px] font-mono text-[#C5A880] uppercase tracking-widest font-bold mb-1">Net Banking</span>
                  <span className="block text-sm font-sans font-medium text-zinc-900">3 – 5 Days</span>
                </div>
              </div>
            </div>

            {/* Damage (Narrow) */}
            <div className="md:col-span-5 bg-zinc-900 rounded-[2rem] border border-zinc-800 p-8 md:p-10 shadow-sm flex flex-col justify-between group anim-slide-up">
              <div>
                <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                </div>
                <h3 className="text-xl font-playfair text-white mb-4">Transit Damage?</h3>
                <p className="text-sm font-sans text-zinc-400 leading-relaxed">
                  Report defective merchandise or transit damage within <strong className="text-white">48 hours</strong> of delivery with clear unboxing photos for a priority replacement.
                </p>
              </div>
            </div>

            {/* Exchange (Narrow) */}
            <div className="md:col-span-5 bg-[#FAF8F5] rounded-[2rem] border border-[#EAD8C0] p-8 md:p-10 shadow-sm anim-slide-up">
              <h3 className="text-xl font-playfair text-zinc-900 mb-4">Size Exchange</h3>
              <p className="text-sm font-sans text-zinc-600 leading-relaxed mb-6">
                Enjoy a complimentary 1-time size swap within 10 days of delivery.
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white border border-[#EAD8C0] flex items-center justify-center">
                  <RefreshCw className="w-4 h-4 text-[#C5A880]" />
                </div>
                <span className="text-xs font-mono uppercase tracking-widest text-zinc-900 font-bold">Vault Reserved</span>
              </div>
            </div>

            {/* Contact (Wide) */}
            <div className="md:col-span-7 bg-white rounded-[2rem] border border-[#EAD8C0] p-8 md:p-10 shadow-sm relative overflow-hidden group hover:shadow-md transition-all anim-scale-up">
              <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-[#EAD8C0]/20 rounded-full blur-3xl pointer-events-none group-hover:bg-[#EAD8C0]/40 transition-all"></div>
              <h3 className="text-xl font-playfair text-zinc-900 mb-4">Escalations Desk</h3>
              <p className="text-sm font-sans text-zinc-600 leading-relaxed mb-8 max-w-md">
                Need immediate assistance? Our dedicated returns support team responds within 2 business hours.
              </p>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8">
                <a href="mailto:returns@driphunter.com" className="inline-flex items-center gap-3 group/btn">
                  <div className="w-12 h-12 rounded-full bg-[#FAF8F5] border border-[#EAD8C0] flex items-center justify-center group-hover/btn:bg-[#6F4E37] transition-colors">
                    <Mail className="w-5 h-5 text-[#6F4E37] group-hover/btn:text-white transition-colors" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono text-[#C5A880] uppercase tracking-widest font-bold">Email Us</span>
                    <span className="block text-sm font-sans font-medium text-zinc-900">returns@driphunter.com</span>
                  </div>
                </a>
                
                <Link href="/contact" className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#6F4E37] font-bold hover:text-[#C5A880] transition-colors bg-[#FAF8F5] px-4 py-3 rounded-full border border-[#EAD8C0]">
                  Open Contact Center <ArrowRight className="w-4 h-4" />
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
