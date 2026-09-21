"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SearchOverlay from "@/components/layout/SearchOverlay";
import { CheckCircle2, ChevronRight, ChevronDown, Zap, Award, ShieldCheck, ArrowRight, Building2 } from "lucide-react";

export default function BulkGiftCardPage() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  // Form States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [orderValue, setOrderValue] = useState("");
  const [requirements, setRequirements] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
    }, 2000);
  };

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-[#faf9f8] text-zinc-950 flex flex-col font-sans">
        <Navbar onSearchClick={() => setIsSearchOpen(true)} />
        <main className="flex-grow flex items-center justify-center p-6 mt-20">
          <div className="bg-white p-10 rounded-[2rem] shadow-2xl border border-zinc-200 text-center max-w-lg w-full animate-fade-in">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-3xl font-chaney-title uppercase tracking-wider text-zinc-950 mb-3">
              Request Received!
            </h2>
            <p className="text-zinc-500 font-sans leading-relaxed mb-6">
              Thank you for choosing DripHunter Corporate. Your bulk order enquiry has been successfully submitted. Our B2B team will contact you within 24 hours at <strong>{email}</strong>.
            </p>
            <button
              type="button"
              onClick={() => {
                setSubmitSuccess(false);
                setName("");
                setEmail("");
                setPhone("");
                setCompany("");
                setOrderValue("");
                setRequirements("");
              }}
              className="inline-block bg-[#6F4E37] text-white px-8 py-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all hover:bg-[#5C3D2E] shadow-lg cursor-pointer"
            >
              Submit Another Request
            </button>
            <div className="mt-4">
              <Link href="/gift-cards" className="text-xs font-bold text-zinc-500 hover:text-zinc-950 transition-colors">
                Back to Gift Cards
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-950 dark:text-zinc-50 flex flex-col font-sans selection:bg-[#6F4E37]/20 selection:text-[#6F4E37]">
      <Navbar onSearchClick={() => setIsSearchOpen(true)} />

      <main className="flex-grow mt-20 pt-4 pb-24">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-12">
          
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-500 mb-8">
            <Link href="/" className="hover:text-[#6F4E37] dark:hover:text-[#E6C280] transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/gift-cards" className="hover:text-[#6F4E37] dark:hover:text-[#E6C280] transition-colors">Gift Cards</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-zinc-950 dark:text-white">Corporate & Bulk Orders</span>
          </nav>

          {/* PHASE 1: HERO & QUICK ACTIONS */}
          <section className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#6F4E37]/10 dark:bg-[#E6C280]/10 text-[#6F4E37] dark:text-[#E6C280] font-mono text-xs font-bold uppercase tracking-widest mb-6 border border-[#6F4E37]/20 dark:border-[#E6C280]/20">
              <Building2 className="w-4 h-4" /> B2B Exclusive
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-chaney-title uppercase tracking-tight text-zinc-950 dark:text-white leading-tight mb-6">
              Corporate Gifting <br />
              <span className="text-[#6F4E37] dark:text-[#E6C280]">Redefined.</span>
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed max-w-2xl mx-auto mb-10">
              Reward your employees, incentivize partners, and impress clients with DripHunter Corporate Gift Cards. Access exclusive bulk discounts and dedicated account management.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                href="/signup"
                className="w-full sm:w-auto px-8 py-4 bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 rounded-xl text-xs font-black uppercase tracking-widest transition-all hover:scale-105 shadow-xl text-center"
              >
                Register Now!
              </Link>
              <button 
                onClick={() => document.getElementById("talk-to-us")?.scrollIntoView({ behavior: "smooth" })}
                className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-zinc-900 border-2 border-zinc-200 dark:border-zinc-800 text-zinc-950 dark:text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all hover:border-[#6F4E37] dark:hover:border-[#E6C280] shadow-sm hover:shadow-md"
              >
                Talk to us
              </button>
            </div>
          </section>

          {/* PHASE 2: UTILITY & PROMOTIONS BANNER */}
          <section className="mb-20">
            <div className="relative w-full rounded-[2rem] overflow-hidden bg-gradient-to-r from-[#6F4E37] to-[#8C684F] dark:from-[#2a1d14] dark:to-[#3d2b1f] p-8 sm:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between group">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay"></div>
              <div className="relative z-10 text-center md:text-left mb-6 md:mb-0">
                <h3 className="text-3xl sm:text-4xl font-chaney-title uppercase text-white tracking-wider mb-2">
                  Cop Exclusives. Save More. Every Time.
                </h3>
                <p className="text-white/80 font-sans max-w-xl">
                  DripHunter Gift Cards are versatile. Beyond standard shopping, use them to access VIP archive drops, exclusive early-access sales, and special collaboration drops.
                </p>
              </div>
              <div className="relative z-10">
                <Zap className="w-20 h-20 text-[#E6C280] group-hover:scale-110 transition-transform duration-500 animate-pulse" />
              </div>
            </div>
          </section>

          {/* PHASE 3: VALUE PROPOSITION */}
          <section className="mb-24">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-chaney-title uppercase tracking-wide text-zinc-950 dark:text-white">
                Why opt for DripHunter Gift Cards?
              </h2>
              <div className="w-16 h-1 bg-[#6F4E37] dark:bg-[#E6C280] mx-auto mt-4 rounded-full"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-zinc-900/50 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 text-center hover:-translate-y-2 transition-transform duration-300">
                <div className="w-16 h-16 bg-[#6F4E37]/10 dark:bg-[#E6C280]/10 rounded-2xl flex items-center justify-center text-[#6F4E37] dark:text-[#E6C280] mx-auto mb-6">
                  <Award className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-zinc-950 dark:text-white mb-3">Employee Rewards</h4>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Boost morale by rewarding top performers with premium streetwear. Let them flex in the office or on the streets with highly coveted gear.
                </p>
              </div>

              <div className="bg-white dark:bg-zinc-900/50 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 text-center hover:-translate-y-2 transition-transform duration-300">
                <div className="w-16 h-16 bg-[#6F4E37]/10 dark:bg-[#E6C280]/10 rounded-2xl flex items-center justify-center text-[#6F4E37] dark:text-[#E6C280] mx-auto mb-6">
                  <Zap className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-zinc-950 dark:text-white mb-3">Ease of Distribution</h4>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Send thousands of digital gift cards instantly to employee inboxes via bulk upload. No physical logistics required.
                </p>
              </div>

              <div className="bg-white dark:bg-zinc-900/50 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 text-center hover:-translate-y-2 transition-transform duration-300">
                <div className="w-16 h-16 bg-[#6F4E37]/10 dark:bg-[#E6C280]/10 rounded-2xl flex items-center justify-center text-[#6F4E37] dark:text-[#E6C280] mx-auto mb-6">
                  <Building2 className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-zinc-950 dark:text-white mb-3">Wide Variety</h4>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Recipients get the freedom to choose from thousands of curated sneakers, vintage apparel, and luxury streetwear accessories.
                </p>
              </div>
            </div>
          </section>

          {/* PHASE 4: ENQUIRY FORM (TALK TO US) */}
          <section id="talk-to-us" className="max-w-3xl mx-auto scroll-mt-32">
            <div className="bg-white dark:bg-zinc-900/40 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 shadow-2xl p-8 sm:p-12">
               <div className="mb-8 text-center">
                  <h2 className="text-2xl font-chaney-title uppercase tracking-wide text-zinc-950 dark:text-white mb-2">Talk to Us</h2>
                  <p className="text-sm text-zinc-500">Fill out the form below and our Corporate Sales team will get back to you with custom pricing.</p>
               </div>

               <form onSubmit={handleSubmit} className="space-y-6">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-bold block mb-2 pl-1">Full Name *</label>
                      <input 
                        type="text" 
                        required 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        placeholder="John Doe"
                        className="w-full bg-zinc-50 dark:bg-zinc-950/80 border border-zinc-200 dark:border-zinc-800 focus:border-[#6F4E37] dark:focus:border-[#E6C280] rounded-xl px-4 py-3 text-sm font-bold text-zinc-900 dark:text-white outline-none transition-all" 
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-bold block mb-2 pl-1">Official Email *</label>
                      <input 
                        type="email" 
                        required 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        placeholder="john@company.com"
                        className="w-full bg-zinc-50 dark:bg-zinc-950/80 border border-zinc-200 dark:border-zinc-800 focus:border-[#6F4E37] dark:focus:border-[#E6C280] rounded-xl px-4 py-3 text-sm font-bold text-zinc-900 dark:text-white outline-none transition-all" 
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-bold block mb-2 pl-1">Mobile Number *</label>
                      <input 
                        type="tel" 
                        required 
                        value={phone} 
                        onChange={(e) => setPhone(e.target.value)} 
                        placeholder="+91 98765 43210"
                        className="w-full bg-zinc-50 dark:bg-zinc-950/80 border border-zinc-200 dark:border-zinc-800 focus:border-[#6F4E37] dark:focus:border-[#E6C280] rounded-xl px-4 py-3 text-sm font-bold text-zinc-900 dark:text-white outline-none transition-all" 
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-bold block mb-2 pl-1">Company Name *</label>
                      <input 
                        type="text" 
                        required 
                        value={company} 
                        onChange={(e) => setCompany(e.target.value)} 
                        placeholder="Acme Corp"
                        className="w-full bg-zinc-50 dark:bg-zinc-950/80 border border-zinc-200 dark:border-zinc-800 focus:border-[#6F4E37] dark:focus:border-[#E6C280] rounded-xl px-4 py-3 text-sm font-bold text-zinc-900 dark:text-white outline-none transition-all" 
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-bold block mb-2 pl-1">Expected Order Value *</label>
                    <div className="relative">
                      <select 
                        required
                        value={orderValue}
                        onChange={(e) => setOrderValue(e.target.value)}
                        className="w-full appearance-none bg-zinc-50 dark:bg-zinc-950/80 border border-zinc-200 dark:border-zinc-800 focus:border-[#6F4E37] dark:focus:border-[#E6C280] rounded-xl px-4 py-3 text-sm font-bold text-zinc-900 dark:text-white outline-none transition-all cursor-pointer"
                      >
                        <option value="" disabled>Select a range</option>
                        <option value="50k-1L">₹50,000 - ₹1,00,000</option>
                        <option value="1L-5L">₹1,00,000 - ₹5,00,000</option>
                        <option value="5L-10L">₹5,00,000 - ₹10,00,000</option>
                        <option value="10L+">Above ₹10,00,000</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                      <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-bold block mb-2 pl-1">Requirements (Optional)</label>
                      <textarea 
                        rows={4} 
                        value={requirements} 
                        onChange={(e) => setRequirements(e.target.value)} 
                        placeholder="Tell us about your gifting needs (e.g., Diwali gifting for 500 employees, Custom branding requirements...)"
                        className="w-full bg-zinc-50 dark:bg-zinc-950/80 border border-zinc-200 dark:border-zinc-800 focus:border-[#6F4E37] dark:focus:border-[#E6C280] rounded-xl px-4 py-3 text-sm text-zinc-900 dark:text-white outline-none transition-all resize-none" 
                      />
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#6F4E37] dark:bg-[#E6C280] text-white dark:text-zinc-950 py-5 rounded-2xl text-[12px] font-mono font-black uppercase tracking-widest transition-all shadow-xl hover:-translate-y-1 hover:bg-[#5C3D2E] dark:hover:bg-[#d4b06c] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex justify-center items-center gap-2"
                    >
                      {isSubmitting ? (
                        <><div className="w-4 h-4 border-2 border-white/20 dark:border-zinc-950/20 border-t-white dark:border-t-zinc-950 rounded-full animate-spin" /> Submitting...</>
                      ) : (
                        <>Submit Enquiry <ArrowRight className="w-4 h-4" /></>
                      )}
                    </button>
                    <p className="text-center text-xs font-sans text-zinc-500 mt-4 flex justify-center items-center gap-1">
                      <ShieldCheck className="w-4 h-4" /> Your information is secure
                    </p>
                  </div>

               </form>

            </div>
          </section>

        </div>
      </main>

      <Footer />

      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </div>
  );
}
