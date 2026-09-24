"use client";

import React, { useState } from "react";
import Link from "next/link";
import AppHeader from "@/components/app-shell/AppHeader";
import { cn } from "@/lib/utils";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import {
  ArrowRight,
  DollarSign,
  Percent,
  Clock,
  ShieldCheck,
  ChevronDown,
  Sparkles,
  Sliders,
  CheckCircle2,
  Check,
  X,
  Crown
} from "lucide-react";

export default function AffiliatePage() {

  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Interactive Earnings Calculator State
  const [monthlySales, setMonthlySales] = useState<number>(250000);
  const [creatorTier, setCreatorTier] = useState<"rising" | "stylist" | "ambassador">("ambassador");

  // Form inputs
  const [fullName, setFullName] = useState("");
  const [emailVal, setEmailVal] = useState("");
  const [handleVal, setHandleVal] = useState("");
  const [platformVal, setPlatformVal] = useState("Instagram");
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Scroll animations
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation();
  const { ref: stepsRef, isVisible: stepsVisible } = useScrollAnimation();
  const { ref: benefitsRef, isVisible: benefitsVisible } = useScrollAnimation();
  const { ref: detailsRef, isVisible: detailsVisible } = useScrollAnimation();
  const { ref: formRef, isVisible: formVisible } = useScrollAnimation();

  // Tier Commission Rates
  const tierRate = creatorTier === "rising" ? 0.08 : creatorTier === "stylist" ? 0.12 : 0.15;
  const estimatedMonthly = Math.round(monthlySales * tierRate);
  const estimatedAnnual = estimatedMonthly * 12;

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 4000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !emailVal || !handleVal) {
      triggerToast("Please fill in all required fields.");
      return;
    }
    setIsSubmitted(true);
    triggerToast("Application submitted successfully! Our team will review within 24 hours.");
  };

  const faqs = [
    {
      q: "How does the Driphunter Associates Program work?",
      a: "You can share products and available drops on Driphunter with your audience through customized linking tools and earn money on qualifying purchases."
    },
    {
      q: "How do I qualify for this program?",
      a: "Bloggers, fashion curators, social media influencers, and content creators with an active, fashion-forward audience qualify to participate in the program."
    },
    {
      q: "How do I earn in this program?",
      a: "You earn from qualifying purchases through the traffic you drive to Driphunter. Commission rates range up to 15% depending on product category and drop tiers."
    },
    {
      q: "When and how do I receive payouts?",
      a: "Earnings are disbursed monthly directly to your registered bank account, Stripe, or UPI on a reliable 30-day net settlement cycle."
    }
  ];

  const steps = [
    {
      num: "Step 1",
      title: "Sign up",
      description: "Join tens of thousands of creators, publishers and bloggers who are earning with the Driphunter Associates Program."
    },
    {
      num: "Step 2",
      title: "Recommend",
      description: "Share millions of products with your audience. We have customized linking tools for large publishers, individual bloggers and social media influencers."
    },
    {
      num: "Step 3",
      title: "Earn",
      description: "Earn up to 15% in affiliate fees from qualifying purchases and programs. Our competitive conversion rates help maximize earnings."
    }
  ];

  const benefits = [
    {
      icon: Percent,
      title: "High Commission Rates",
      description: "Earn industry-leading commissions on every verified streetwear drop checkout."
    },
    {
      icon: Clock,
      title: "30-Day Cookie Window",
      description: "Get credit for any checkout made by your referrals up to 30 days after clicking."
    },
    {
      icon: ShieldCheck,
      title: "Legit-Checked Authenticity",
      description: "Recommend with trust. Every apparel item undergoes in-hand physical verification."
    },
    {
      icon: DollarSign,
      title: "On-Time Monthly Payouts",
      description: "Secure, reliable, and prompt monthly earnings direct to your bank account or UPI."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5] dark:bg-[#0C0B0A] text-zinc-900 dark:text-white font-sans antialiased overflow-x-hidden select-none transition-colors duration-300 w-full">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 px-5 py-3 rounded-2xl font-mono text-xs font-bold shadow-2xl flex items-center gap-2.5 border border-white/10 animate-fade-in">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMsg}</span>
        </div>
      )}

      <AppHeader title="Affiliate" variant="contextual" showActions={true} />

      {/* ─── HERO BANNER ─── */}
      <section
        ref={heroRef}
        className="relative w-full bg-white dark:bg-zinc-950 flex flex-col overflow-hidden transition-all duration-1000 ease-out border-b border-stone-200 dark:border-zinc-800"
      >
        <div className="w-full max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] min-h-[70vh]">
          {/* Left Column (Content) */}
          <div className={cn("flex flex-col justify-center px-4 sm:px-12 md:px-16 lg:px-20 py-16 lg:py-24 z-10 transition-all duration-700", heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6")}>
            <div className="max-w-2xl space-y-8 text-left">
              {/* Badges Dock */}
              <div className="flex flex-wrap items-center gap-2.5">
                <div className="inline-flex items-center gap-1.5 bg-zinc-100 dark:bg-zinc-900 border border-stone-300 dark:border-zinc-700 text-[#6F4E37] dark:text-[#E6C280] font-mono text-[9.5px] font-bold uppercase tracking-[0.25em] px-3.5 py-1.5 rounded-full shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>DRIP HUNTER SYNDICATE</span>
                </div>
                <div className="inline-flex items-center gap-1.5 bg-zinc-100 dark:bg-zinc-900 border border-stone-300 dark:border-zinc-700 text-emerald-700 dark:text-emerald-400 font-mono text-[9px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>EARN UP TO 15% REVENUE SHARE</span>
                </div>
              </div>

              {/* Exact Original Headline */}
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-light tracking-tight text-zinc-950 dark:text-white font-playfair leading-[1.05]">
                  Recommend Drip.<br /> <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280]">Earn Ad Fees*</span>
                </h1>
                <p className="text-sm sm:text-base md:text-lg text-zinc-600 dark:text-zinc-400 font-sans font-normal max-w-xl leading-relaxed">
                  Monetize your fashion content by linking directly to authentic designer grails, limited drops, and curated streetwear archives.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2">
                <a href="#register-section" className="bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 hover:bg-[#6F4E37] dark:hover:bg-[#E6C280] px-8 py-3.5 rounded-xl font-mono text-[10px] font-bold tracking-widest uppercase transition-all shadow-lg hover:-translate-y-0.5 w-full sm:w-auto text-center flex items-center justify-center gap-2 cursor-pointer border-none">
                  <span>Apply Now</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a href="#details-section" className="px-8 py-3.5 rounded-xl font-mono text-[10px] font-bold tracking-widest uppercase transition-all w-full sm:w-auto text-center border border-zinc-300 dark:border-zinc-700 hover:border-zinc-950 dark:hover:border-white text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white">
                  Calculate Earnings
                </a>
              </div>
            </div>
          </div>

          {/* Right Column (Image) */}
          <div className={cn("relative w-full h-[50vh] lg:h-auto overflow-hidden transition-all duration-1000 delay-200", heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
            <img 
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80" 
              alt="Fashion Creator"
              className="absolute inset-0 w-full h-full object-cover object-center lg:object-[center_top]"
            />
            {/* Subtle gradient to blend edges */}
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-white dark:from-zinc-950 via-transparent to-transparent opacity-90 sm:opacity-50" />
          </div>
        </div>

        {/* Clean Horizontal Strip for Metrics at the bottom of the hero */}
        <div className="w-full bg-zinc-50 dark:bg-zinc-900/60 border-t border-stone-200 dark:border-zinc-800">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-12 md:px-16 lg:px-20 py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-left space-y-1 border-l-2 border-[#6F4E37]/30 dark:border-[#E6C280]/30 pl-4">
                <span className="text-2xl sm:text-3xl font-mono font-bold text-[#6F4E37] dark:text-[#E6C280] block leading-none">
                  15%
                </span>
                <span className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block">
                  Max Revenue Share
                </span>
              </div>
              <div className="text-left space-y-1 border-l-2 border-zinc-300 dark:border-zinc-700 pl-4">
                <span className="text-2xl sm:text-3xl font-mono font-bold text-zinc-950 dark:text-white block leading-none">
                  30 Days
                </span>
                <span className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block">
                  Cookie Window
                </span>
              </div>
              <div className="text-left space-y-1 border-l-2 border-[#6F4E37]/30 dark:border-[#E6C280]/30 pl-4">
                <span className="text-2xl sm:text-3xl font-mono font-bold text-[#6F4E37] dark:text-[#E6C280] block leading-none">
                  ₹45L+
                </span>
                <span className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block">
                  Paid to Creators
                </span>
              </div>
              <div className="text-left space-y-1 border-l-2 border-zinc-300 dark:border-zinc-700 pl-4">
                <span className="text-2xl sm:text-3xl font-mono font-bold text-zinc-950 dark:text-white block leading-none">
                  Instant UPI
                </span>
                <span className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block">
                  Monthly Settlements
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="flex-grow py-10 sm:py-16 px-4 sm:px-12 md:px-16 lg:px-20 w-full max-w-[1600px] mx-auto space-y-14 sm:space-y-20 overflow-hidden">

        {/* ─── SECTION 1: Driphunter Associates Program ─── */}
        <section
          ref={stepsRef}
          className="w-full space-y-8 md:space-y-10"
        >
          <div className={cn("text-center max-w-3xl mx-auto space-y-3 transition-all duration-700", stepsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6")}>
            <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-[#6F4E37] dark:text-[#E6C280] uppercase">
              SIMPLE STEPS
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-zinc-950 dark:text-zinc-50 font-playfair leading-[1.05]">
              Driphunter <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280]">Associates</span>
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-sans font-normal leading-relaxed max-w-2xl mx-auto">
              Monetize your fashion content by linking directly to authentic designer grails, limited drops, and curated streetwear archives.
            </p>
            <div className="w-10 h-[2px] bg-[#6F4E37] dark:bg-[#E6C280] mx-auto mt-2 rounded-full" />
          </div>

          <div className={cn("flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-6 sm:gap-8 pb-4 transition-all duration-700 delay-200", stepsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6")}>
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="w-[85vw] sm:w-[350px] shrink-0 snap-center sm:snap-start bg-white dark:bg-zinc-900/80 border border-stone-200/90 dark:border-zinc-800/90 rounded-[32px] p-8 relative flex flex-col justify-between transition-all duration-500 hover:border-[#6F4E37]/50 dark:hover:border-[#E6C280]/50 shadow-xs hover:shadow-xl hover:-translate-y-1.5 cursor-pointer overflow-hidden group text-left space-y-4"
              >
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#6F4E37] dark:text-[#E6C280] uppercase">
                    {step.num}
                  </span>
                  <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280]">
                    0{idx + 1}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-zinc-900 dark:text-white uppercase tracking-tight font-sans">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-normal leading-relaxed font-sans">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── SECTION 2: BENEFITS ─── */}
        <section
          ref={benefitsRef}
          className="w-full space-y-8 md:space-y-10"
        >
          <div className={cn("text-left space-y-3 border-b border-stone-200/90 dark:border-zinc-800 pb-4 transition-all duration-700", benefitsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6")}>
            <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-[#6F4E37] dark:text-[#E6C280] uppercase">
              WHY PARTNER WITH US
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-zinc-950 dark:text-zinc-50 font-playfair leading-[1.05]">
              Affiliate <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280]">Benefits</span>
            </h2>
          </div>

          <div className={cn("flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-6 pb-4 transition-all duration-700 delay-200", benefitsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6")}>
            {benefits.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={idx}
                  className="w-[80vw] sm:w-[300px] shrink-0 snap-center sm:snap-start bg-white dark:bg-zinc-900/80 border border-stone-200/90 dark:border-zinc-800/90 rounded-[28px] p-7 flex flex-col justify-between cursor-pointer overflow-hidden group shadow-xs hover:border-[#6F4E37]/50 dark:hover:border-[#E6C280]/50 hover:-translate-y-1 transition-all duration-300 text-left space-y-4"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#FAF8F5] dark:bg-zinc-800 text-[#6F4E37] dark:text-[#E6C280] border border-stone-200 dark:border-zinc-700 flex items-center justify-center transition-all duration-500 shadow-xs group-hover:scale-110">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold uppercase tracking-tight text-zinc-900 dark:text-white font-sans">
                    {benefit.title}
                  </h3>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 font-normal leading-relaxed font-sans">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ─── SECTION 3: PROGRAM DETAILS (INTERACTIVE ESTIMATOR & TIER ARCHITECTURE) ─── */}
        <section
          id="details-section"
          ref={detailsRef}
          className="w-full space-y-10"
        >
          <div className={cn("text-left space-y-2 border-b border-stone-200/90 dark:border-zinc-800 pb-4 transition-all duration-700", detailsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6")}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-zinc-950 dark:text-zinc-50 font-playfair leading-[1.05]">
              Program <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280]">Details</span>
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans font-normal max-w-2xl">
              The Driphunter Associates Program offers fashion creators and publishers seamless linking tools to monetize their audience. Whether reviewing high-heat sneaker drops or styling avant-garde runway pieces, earn transparent payouts on every qualified referral.
            </p>
          </div>

          {/* Interactive Calculator Box */}
          <div className={cn("bg-white dark:bg-zinc-900/80 border border-stone-200/90 dark:border-zinc-800/90 rounded-[36px] p-6 sm:p-12 shadow-sm text-left select-none transition-all duration-700 delay-200", detailsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6")}>
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 lg:gap-12">
              
              {/* Left Controls */}
              <div className="space-y-6 flex-1 max-w-xl">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1.5 text-[9.5px] font-mono font-bold text-[#6F4E37] dark:text-[#E6C280] uppercase tracking-[0.25em]">
                    <Sliders className="w-3.5 h-3.5" />
                    <span>EARNINGS ESTIMATOR</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-light font-playfair uppercase tracking-tight text-zinc-950 dark:text-white">
                    Estimated Referral <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280]">Earnings</span>
                  </h3>
                </div>

                {/* Tier Switcher Buttons */}
                <div className="space-y-2">
                  <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                    Select Your Commission Tier:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "rising" as const, label: "Rising (8%)" },
                      { id: "stylist" as const, label: "Stylist (12%)" },
                      { id: "ambassador" as const, label: "VIP (15%)" }
                    ].map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setCreatorTier(t.id)}
                        className={`py-2.5 px-3 rounded-2xl text-[11px] font-mono font-bold uppercase tracking-wider transition-all duration-300 border cursor-pointer ${
                          creatorTier === t.id
                            ? "bg-[#6F4E37] text-white border-[#6F4E37] dark:bg-[#E6C280] dark:text-zinc-950 dark:border-[#E6C280] shadow-xs"
                            : "bg-stone-50 dark:bg-zinc-800 border-stone-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-stone-100"
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Range Slider */}
                <div className="space-y-3 pt-2">
                  <div className="flex justify-between items-center text-xs font-mono font-bold">
                    <span className="text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                      Monthly Referral Sales
                    </span>
                    <span className="text-[#6F4E37] dark:text-[#E6C280] text-sm bg-stone-100 dark:bg-zinc-800 px-3 py-1 rounded-xl">
                      ₹{monthlySales.toLocaleString()}
                    </span>
                  </div>

                  <input
                    type="range"
                    min="25000"
                    max="1500000"
                    step="25000"
                    value={monthlySales}
                    onChange={(e) => setMonthlySales(Number(e.target.value))}
                    className="w-full h-2.5 bg-stone-200 dark:bg-zinc-800 rounded-full appearance-none cursor-pointer accent-[#6F4E37] dark:accent-[#E6C280]"
                  />

                  <div className="flex justify-between text-[10px] font-mono font-medium text-zinc-600 dark:text-zinc-400">
                    <span>₹25,000</span>
                    <span>₹7,50,000</span>
                    <span>₹15,00,000+</span>
                  </div>
                </div>
              </div>

              {/* Right Output Box */}
              <div className="bg-gradient-to-br from-[#FAF6F0] via-[#F3ECE0] to-[#E9DFCF] dark:from-[#18181B] dark:via-[#141415] dark:to-[#0C0B0A] border border-stone-300/80 dark:border-zinc-800 rounded-[32px] p-8 sm:p-10 flex flex-col justify-between space-y-6 lg:w-96 shadow-md">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#6F4E37] dark:text-[#E6C280] uppercase block">
                    MONTHLY PAYOUT ESTIMATE
                  </span>
                  <div className="text-4xl sm:text-5xl font-mono font-bold text-zinc-950 dark:text-white tracking-tight">
                    ₹{estimatedMonthly.toLocaleString()}
                    <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400 font-normal ml-1">/mo</span>
                  </div>
                  <p className="text-[11px] font-mono text-zinc-600 dark:text-zinc-400">
                    Annual Projection: <strong className="text-zinc-950 dark:text-white">₹{estimatedAnnual.toLocaleString()}</strong> / year
                  </p>
                </div>

                <div className="space-y-2.5 pt-4 border-t border-stone-300/70 dark:border-zinc-800 text-[11px] font-mono text-zinc-700 dark:text-zinc-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>Direct UPI/Bank Settlement</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>30-Day Cookie Window</span>
                  </div>
                </div>

                <a
                  href="#register-section"
                  className="w-full bg-zinc-950 hover:bg-[#6F4E37] text-white dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-[#E6C280] text-[10.5px] font-mono font-bold uppercase tracking-wider py-3.5 rounded-xl transition-all text-center block shadow-sm active:scale-95"
                >
                  Register as Affiliate →
                </a>
              </div>

            </div>
          </div>
        </section>

        {/* ─── SECTION 4: PREMIUM REGISTRATION TERMINAL ─── */}
        <section
          id="register-section"
          ref={formRef}
          className="w-full transition-all duration-1000 ease-out"
        >
          <div className={cn("w-full bg-white dark:bg-zinc-900 border border-stone-200/90 dark:border-zinc-800 rounded-[2rem] sm:rounded-[3rem] overflow-hidden shadow-xl shadow-stone-200/50 dark:shadow-none flex flex-col lg:flex-row transition-all duration-700 delay-100", formVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12")}>
            
            {/* Left: Editorial Copy & Branding */}
            <div className="w-full lg:w-[45%] bg-zinc-950 dark:bg-black text-white p-6 sm:p-10 lg:p-12 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#6F4E37]/20 dark:bg-[#E6C280]/10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-zinc-800/30 dark:bg-zinc-900/30 blur-[120px] rounded-full -translate-x-1/2 translate-y-1/2" />
              
              <div className="relative z-10 space-y-5 max-w-md">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-800 bg-zinc-900/50 backdrop-blur-md">
                  <span className="w-2 h-2 rounded-full bg-[#E6C280] animate-pulse" />
                  <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-zinc-300 uppercase">
                    Syndicate Applications Open
                  </span>
                </div>
                
                <h2 className="text-4xl sm:text-5xl font-light tracking-tight text-white font-playfair leading-[1.1]">
                  Join The <br />
                  <span className="font-serif italic font-normal text-[#E6C280]">Inner Circle</span>
                </h2>
                
                <p className="text-sm text-zinc-400 font-sans leading-relaxed">
                  Partner with Driphunter to monetize your fashion influence. Share curated archives and authentic grails with your audience, and earn industry-leading revenue shares.
                </p>
              </div>

              <div className="relative z-10 mt-12 space-y-3">
                <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
                  <ShieldCheck className="w-5 h-5 text-[#E6C280]" />
                  <span>Verified Creator Network</span>
                </div>
                <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
                  <Crown className="w-5 h-5 text-[#E6C280]" />
                  <span>Exclusive Early Access</span>
                </div>
                <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
                  <DollarSign className="w-5 h-5 text-[#E6C280]" />
                  <span>Premium Commission Tiers</span>
                </div>
              </div>
            </div>

            {/* Right: Sleek Form Interface */}
            <div className="w-full lg:w-[55%] p-6 sm:p-10 lg:p-12 flex flex-col justify-center bg-white dark:bg-zinc-900">
              
              {isSubmitted ? (
                <div className="text-center py-12 space-y-6">
                  <div className="w-20 h-20 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-inner border border-emerald-100 dark:border-emerald-800/30">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-light font-playfair text-zinc-950 dark:text-white">
                      Application <span className="font-serif italic text-emerald-600 dark:text-emerald-400">Received</span>
                    </h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 font-sans max-w-md mx-auto leading-relaxed">
                      Your creator dossier is under review. Our syndicate managers will reach out to your registered email within 24-48 hours.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="inline-block mt-4 border-b border-zinc-300 dark:border-zinc-700 hover:border-zinc-900 dark:hover:border-white text-xs font-mono font-bold uppercase tracking-widest text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-all pb-1 cursor-pointer"
                  >
                    Submit Another Profile
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-lg mx-auto">
                  <div className="space-y-5">
                    
                    {/* Floating Label Input: Full Name */}
                    <div className="relative group/input">
                      <input
                        type="text"
                        id="fullName"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="block w-full px-0 py-3 bg-transparent border-0 border-b-2 border-stone-200 dark:border-zinc-800 appearance-none text-zinc-900 dark:text-white text-base focus:outline-none focus:ring-0 focus:border-zinc-950 dark:focus:border-white transition-colors peer"
                        placeholder=" "
                      />
                      <label 
                        htmlFor="fullName" 
                        className="absolute text-xs font-mono uppercase tracking-widest text-zinc-400 duration-300 transform -translate-y-6 scale-75 top-4 z-10 pointer-events-none origin-[0] peer-focus:left-0 peer-focus:text-zinc-950 dark:peer-focus:text-white peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Creator Name *
                      </label>
                    </div>

                    {/* Floating Label Input: Email */}
                    <div className="relative group/input">
                      <input
                        type="email"
                        id="emailVal"
                        required
                        value={emailVal}
                        onChange={(e) => setEmailVal(e.target.value)}
                        className="block w-full px-0 py-3 bg-transparent border-0 border-b-2 border-stone-200 dark:border-zinc-800 appearance-none text-zinc-900 dark:text-white text-base focus:outline-none focus:ring-0 focus:border-zinc-950 dark:focus:border-white transition-colors peer"
                        placeholder=" "
                      />
                      <label 
                        htmlFor="emailVal" 
                        className="absolute text-xs font-mono uppercase tracking-widest text-zinc-400 duration-300 transform -translate-y-6 scale-75 top-4 z-10 pointer-events-none origin-[0] peer-focus:left-0 peer-focus:text-zinc-950 dark:peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Business Email *
                      </label>
                    </div>

                    {/* Floating Label Input: Handle */}
                    <div className="relative group/input">
                      <input
                        type="text"
                        id="handleVal"
                        required
                        value={handleVal}
                        onChange={(e) => setHandleVal(e.target.value)}
                        className="block w-full px-0 py-3 bg-transparent border-0 border-b-2 border-stone-200 dark:border-zinc-800 appearance-none text-zinc-900 dark:text-white text-base focus:outline-none focus:ring-0 focus:border-zinc-950 dark:focus:border-white transition-colors peer"
                        placeholder=" "
                      />
                      <label 
                        htmlFor="handleVal" 
                        className="absolute text-xs font-mono uppercase tracking-widest text-zinc-400 duration-300 transform -translate-y-6 scale-75 top-4 z-10 pointer-events-none origin-[0] peer-focus:left-0 peer-focus:text-zinc-950 dark:peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Primary Social Handle *
                      </label>
                    </div>

                    {/* Minimalist Select: Platform */}
                    <div className="relative group/input pt-2">
                      <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-400 mb-2 block">
                        Primary Platform
                      </label>
                      <div className="relative">
                        <select
                          value={platformVal}
                          onChange={(e) => setPlatformVal(e.target.value)}
                          className="w-full bg-stone-50 dark:bg-zinc-800/50 border border-stone-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600 transition-all font-sans cursor-pointer appearance-none"
                        >
                          <option value="Instagram">Instagram</option>
                          <option value="YouTube">YouTube</option>
                          <option value="TikTok">TikTok</option>
                          <option value="Pinterest">Pinterest</option>
                          <option value="Editorial Blog">Editorial Blog / Lookbook</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  <div className="pt-6">
                    <button
                      type="submit"
                      className="w-full relative overflow-hidden group/btn bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 py-4 rounded-2xl transition-all cursor-pointer shadow-lg hover:shadow-xl"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-3 text-xs font-mono font-bold uppercase tracking-widest group-hover/btn:text-white dark:group-hover/btn:text-zinc-950 transition-colors duration-500">
                        <span>Initialize Application</span>
                        <ArrowRight className="w-4 h-4" />
                      </span>
                      <div className="absolute inset-0 bg-[#6F4E37] dark:bg-[#E6C280] translate-y-[100%] group-hover/btn:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.83,0,0.17,1)] z-0" />
                    </button>
                    <p className="text-center text-[10px] text-zinc-400 mt-4 font-sans">
                      By applying, you agree to our <a href="/terms" className="underline hover:text-zinc-950 dark:hover:text-white transition-colors">Affiliate Terms</a>.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* ─── SECTION 5: PREMIUM FAQ ─── */}
        <section className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 pt-16 border-t border-stone-200/90 dark:border-zinc-800 text-left">
          
          {/* Left Column: Sticky Title */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-32 self-start">
            <div className="space-y-2">
              <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-[#6F4E37] dark:text-[#E6C280] uppercase block">
                KNOWLEDGE BASE
              </span>
              <h2 className="text-4xl md:text-5xl font-light tracking-tight text-zinc-950 dark:text-white font-playfair leading-[1.1]">
                Frequently <br className="hidden lg:block" />
                <span className="font-serif italic text-[#6F4E37] dark:text-[#E6C280]">Asked</span>
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed max-w-sm">
              Everything you need to know about the Driphunter Associates program, commission structures, and payouts.
            </p>
            <div className="pt-2">
              <a href="/contact" className="inline-flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-950 dark:text-white hover:text-[#6F4E37] dark:hover:text-[#E6C280] transition-colors border-b border-zinc-950 dark:border-white hover:border-[#6F4E37] dark:hover:border-[#E6C280] pb-1">
                Contact Support <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right Column: Minimalist Accordion */}
          <div className="lg:col-span-8">
            <div className="flex flex-col border-t border-stone-200 dark:border-zinc-800">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="border-b border-stone-200 dark:border-zinc-800 group"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full text-left py-6 sm:py-8 flex items-center justify-between cursor-pointer bg-transparent border-none outline-none group-hover:pl-2 transition-all duration-300"
                    >
                      <span className={`text-base sm:text-lg lg:text-xl font-sans font-medium transition-colors duration-300 pr-8 ${isOpen ? "text-[#6F4E37] dark:text-[#E6C280]" : "text-zinc-900 dark:text-white group-hover:text-[#6F4E37] dark:group-hover:text-[#E6C280]"}`}>
                        {faq.q}
                      </span>
                      <div className="relative w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center shrink-0">
                        <span className={`absolute w-3.5 sm:w-4 h-[1.5px] bg-zinc-900 dark:bg-white transition-all duration-300 ${isOpen ? "bg-[#6F4E37] dark:bg-[#E6C280] rotate-180" : ""}`} />
                        <span className={`absolute w-3.5 sm:w-4 h-[1.5px] bg-zinc-900 dark:bg-white transition-all duration-300 ${isOpen ? "bg-[#6F4E37] dark:bg-[#E6C280] rotate-0" : "rotate-90"}`} />
                      </div>
                    </button>

                    <div 
                      className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? "max-h-[500px] opacity-100 mb-6 sm:mb-8" : "max-h-0 opacity-0 mb-0"}`}
                    >
                      <p className="text-xs sm:text-sm lg:text-base text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed max-w-3xl pr-12">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

      </main>


    </div>
  );
}
