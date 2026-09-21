"use client";

import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SearchOverlay from "@/components/layout/SearchOverlay";
import { Building2, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function CorporateSalesPage() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [corpName, setCorpName] = useState("");
  const [corpEmail, setCorpEmail] = useState("");
  const [corpCompany, setCorpCompany] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#faf9f8] text-zinc-950 flex flex-col font-sans selection:bg-[#6F4E37]/20 selection:text-[#6F4E37]">
      <Navbar onSearchClick={() => setIsSearchOpen(true)} />

      <main className="flex-grow flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-xl">
          {isSubmitted ? (
            <div className="bg-white p-10 rounded-[2rem] shadow-2xl border border-zinc-200 text-center space-y-6 animate-fade-in">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-chaney-title uppercase tracking-wider text-zinc-950 mb-3">
                  Inquiry Received
                </h2>
                <p className="text-zinc-500 font-sans leading-relaxed">
                  Thank you for your interest in DripHunter Corporate Gifting, {corpName}. Our enterprise team will reach out to {corpEmail} within 24 hours.
                </p>
              </div>
              <div className="pt-6">
                <Link 
                  href="/gift-cards"
                  className="inline-block bg-zinc-950 hover:bg-zinc-800 text-white px-8 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                >
                  Return to Gift Cards
                </Link>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-[2rem] shadow-2xl border border-zinc-200 overflow-hidden">
              <div className="bg-[#21130d] p-8 text-white relative">
                <Building2 className="w-10 h-10 text-[#E6C280] mb-4" />
                <h1 className="text-2xl sm:text-3xl font-chaney-title uppercase tracking-widest mb-2">Corporate Inquiry</h1>
                <p className="text-sm text-zinc-400 font-sans leading-relaxed">
                  Partner with DripHunter for exclusive enterprise discounts, bulk eGift card purchases, and physical premium reward cards.
                </p>
              </div>
              
              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-zinc-500 mb-3">Full Name</label>
                  <input 
                    type="text" 
                    required 
                    value={corpName}
                    onChange={(e) => setCorpName(e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-200 p-4 rounded-xl text-sm focus:outline-none focus:border-[#6F4E37] focus:ring-2 focus:ring-[#6F4E37]/10 transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-zinc-500 mb-3">Work Email</label>
                  <input 
                    type="email" 
                    required 
                    value={corpEmail}
                    onChange={(e) => setCorpEmail(e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-200 p-4 rounded-xl text-sm focus:outline-none focus:border-[#6F4E37] focus:ring-2 focus:ring-[#6F4E37]/10 transition-all"
                    placeholder="john@company.com"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-zinc-500 mb-3">Company Name</label>
                  <input 
                    type="text" 
                    required 
                    value={corpCompany}
                    onChange={(e) => setCorpCompany(e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-200 p-4 rounded-xl text-sm focus:outline-none focus:border-[#6F4E37] focus:ring-2 focus:ring-[#6F4E37]/10 transition-all"
                    placeholder="Drip Enterprise"
                  />
                </div>
                
                <div className="pt-4">
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-[#6F4E37] hover:bg-[#5c3d2e] text-white py-4 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <><div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" /> Submitting...</>
                    ) : (
                      "Submit Inquiry"
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}
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
