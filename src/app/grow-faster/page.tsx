"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import {
  TrendingUp,
  Zap,
  Search,
  ShieldCheck,
  BarChart,
  Target,
  Megaphone,
  ArrowRight,
  Check
} from "lucide-react";

export default function GrowFasterPage() {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation();
  const { ref: featuresRef, isVisible: featuresVisible } = useScrollAnimation();
  const { ref: detailsRef, isVisible: detailsVisible } = useScrollAnimation();
  const [activeTab, setActiveTab] = useState("create-account");

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5] dark:bg-[#0C0B0A] text-zinc-900 dark:text-white font-sans antialiased overflow-x-hidden selection:bg-[#E6C280] selection:text-black">
      <Navbar />

      <main className="flex-grow">
        {/* HERO SECTION */}
        <section
          ref={heroRef}
          className={`relative w-full min-h-[60vh] flex items-center justify-center overflow-hidden transition-all duration-1000 ease-out ${
            heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-[#18181B] to-[#0C0B0A] dark:from-[#111111] dark:to-[#050505] z-0" />
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#E6C280]/10 blur-[150px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#6F4E37]/15 blur-[120px] rounded-full pointer-events-none" />
          </div>

          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 py-20 text-center flex flex-col items-center">
            <span className="inline-flex items-center gap-2 text-[10px] font-mono font-bold tracking-[0.25em] text-[#E6C280] uppercase bg-[#E6C280]/10 px-4 py-2 rounded-full border border-[#E6C280]/20 mb-8">
              <Sparkles className="w-3.5 h-3.5" />
              ACCELERATE YOUR SALES
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight font-playfair leading-[1.1] text-white mb-6 max-w-4xl">
              Scale Your Empire. <br />
              Grow <span className="font-serif italic font-normal text-[#E6C280]">Faster</span>.
            </h1>
            <p className="text-base md:text-lg text-zinc-400 font-sans max-w-2xl mx-auto leading-relaxed mb-10">
              Leverage our premium seller tools to reach millions of verified hypebeasts, maximize your conversion rates, and dominate the luxury streetwear market.
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className="bg-[#E6C280] text-black hover:bg-white px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2"
              >
                Access Dashboard <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* FEATURES OVERVIEW */}
        <section
          ref={featuresRef}
          className={`py-20 px-6 sm:px-12 max-w-7xl mx-auto transition-all duration-1000 ease-out ${
            featuresVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "DripHunter Ads",
                desc: "Boost visibility for your grails with targeted Product Listing Ads (PLA). Appear at the top of trending search results.",
                icon: TrendingUp
              },
              {
                title: "Sales Events",
                desc: "Participate in exclusive seasonal drops and 'Hype Week' promotions to drive massive volume spikes.",
                icon: Zap
              },
              {
                title: "Seller Lens",
                desc: "Access powerful analytics to identify high-demand silhouettes, track market valuation, and optimize pricing.",
                icon: Search
              },
              {
                title: "Account Manager",
                desc: "Gold & Platinum tier sellers get a dedicated account manager for tailored business strategy and priority support.",
                icon: ShieldCheck
              }
            ].map((feature, idx) => (
              <div key={idx} className="bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 p-8 rounded-3xl hover:shadow-xl hover:border-[#6F4E37]/40 dark:hover:border-[#E6C280]/40 transition-all duration-300 group">
                <div className="w-14 h-14 rounded-2xl bg-stone-100 dark:bg-zinc-800 flex items-center justify-center text-[#6F4E37] dark:text-[#E6C280] mb-6 group-hover:scale-110 group-hover:bg-[#6F4E37] group-hover:text-white dark:group-hover:bg-[#E6C280] dark:group-hover:text-zinc-950 transition-all duration-500">
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold uppercase tracking-wider mb-3 text-zinc-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* DEEP DIVE TABS SECTION */}
        <section
          ref={detailsRef}
          className={`py-20 px-6 sm:px-12 bg-white dark:bg-[#111111] transition-all duration-1000 ease-out border-y border-stone-200 dark:border-zinc-800 ${
            detailsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-light tracking-tight font-playfair leading-[1.1] text-zinc-900 dark:text-white">
                Everything you need to <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280]">succeed</span>
              </h2>
            </div>

            <div className="flex flex-col lg:flex-row gap-12 relative items-start">
              {/* Tabs Sidebar (Sticky) */}
              <div className="lg:w-1/3 flex flex-col gap-2 sticky top-24">
                {[
                  { id: "create-account", label: "Create Account" },
                  { id: "list-products", label: "List Products" },
                  { id: "storage-shipping", label: "Storage & Shipping" },
                  { id: "receive-payments", label: "Receive Payments" },
                  { id: "grow-faster", label: "Grow Faster" },
                  { id: "help-support", label: "Help & Support" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center justify-between px-6 py-4 rounded-xl transition-all duration-300 text-left cursor-pointer border-l-4 ${
                      activeTab === tab.id
                        ? "bg-white dark:bg-zinc-800/80 border-[#6F4E37] dark:border-[#E6C280] text-[#6F4E37] dark:text-[#E6C280] shadow-sm font-black"
                        : "bg-transparent border-transparent text-zinc-500 dark:text-zinc-400 hover:bg-stone-50 dark:hover:bg-zinc-900/50 hover:text-zinc-800 dark:hover:text-zinc-200"
                    }`}
                  >
                    <span className="text-sm tracking-wide">{tab.label}</span>
                    {activeTab === tab.id && <ArrowRight className="w-4 h-4" />}
                  </button>
                ))}
              </div>

              {/* Tab Content (Scrollable) */}
              <div className="lg:w-2/3 bg-white dark:bg-[#151515] rounded-[32px] p-8 md:p-12 border border-stone-200 dark:border-zinc-800 min-h-[500px]">
                
                {activeTab === "create-account" && (
                  <div className="space-y-6 animate-fade-in">
                    <h3 className="text-3xl font-light font-playfair text-zinc-900 dark:text-white mb-2">
                      How to <span className="italic text-[#6F4E37] dark:text-[#E6C280]">Create an Account</span>
                    </h3>
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-6">
                      Setting up your DripHunter seller account is fast, secure, and straightforward. We require basic identity and business details to maintain the integrity of our verified network.
                    </p>
                    <div className="space-y-8">
                      <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-[#6F4E37]/10 dark:bg-[#E6C280]/10 text-[#6F4E37] dark:text-[#E6C280] flex items-center justify-center font-bold font-mono text-xs shrink-0">1</div>
                        <div>
                          <h4 className="font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider text-sm mb-1">Verify Phone & Email</h4>
                          <p className="text-zinc-500 text-xs leading-relaxed">Enter your primary contact details and verify them via OTP. This will be used for all seller communications and alerts.</p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-[#6F4E37]/10 dark:bg-[#E6C280]/10 text-[#6F4E37] dark:text-[#E6C280] flex items-center justify-center font-bold font-mono text-xs shrink-0">2</div>
                        <div>
                          <h4 className="font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider text-sm mb-1">Submit GSTIN & KYC</h4>
                          <p className="text-zinc-500 text-xs leading-relaxed">Provide your active GSTIN number and business PAN. If you are an individual vintage curator, you can sign up with your personal PAN.</p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-[#6F4E37]/10 dark:bg-[#E6C280]/10 text-[#6F4E37] dark:text-[#E6C280] flex items-center justify-center font-bold font-mono text-xs shrink-0">3</div>
                        <div>
                          <h4 className="font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider text-sm mb-1">Bank Account Setup</h4>
                          <p className="text-zinc-500 text-xs leading-relaxed">Add a verified bank account in the exact name of your registered business or individual PAN for secure payout settlements.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "list-products" && (
                  <div className="space-y-6 animate-fade-in">
                    <h3 className="text-3xl font-light font-playfair text-zinc-900 dark:text-white mb-2">
                      <span className="italic text-[#6F4E37] dark:text-[#E6C280]">List</span> Your Products
                    </h3>
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-6">
                      Showcase your grails to millions of buyers. Our cataloging tools make it easy to list products individually or in bulk.
                    </p>
                    <ul className="space-y-4">
                      {[
                        "Search our existing catalog via Barcode/SKU and map your price instantly.",
                        "Upload high-resolution images showing all angles and size tags for verification.",
                        "Use the Bulk Upload tool via Excel for listing 50+ items at once.",
                        "AI-generated product descriptions that highlight material and fit."
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                          <span className="text-sm text-zinc-700 dark:text-zinc-300">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeTab === "storage-shipping" && (
                  <div className="space-y-6 animate-fade-in">
                    <h3 className="text-3xl font-light font-playfair text-zinc-900 dark:text-white mb-2">
                      Storage & <span className="italic text-[#6F4E37] dark:text-[#E6C280]">Shipping</span>
                    </h3>
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-6">
                      We handle the logistics so you can focus on sourcing. Choose between fulfilling orders yourself or using our premium consignment storage.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-stone-50 dark:bg-zinc-900 p-5 rounded-2xl border border-stone-200 dark:border-zinc-800">
                        <h4 className="font-bold text-zinc-900 dark:text-white mb-2">Self-Ship (Drip Dispatch)</h4>
                        <p className="text-xs text-zinc-500 leading-relaxed">Pack the item securely, print our auto-generated shipping label, and hand it over to our courier partner. We'll authenticate it en-route to the buyer.</p>
                      </div>
                      <div className="bg-stone-50 dark:bg-zinc-900 p-5 rounded-2xl border border-stone-200 dark:border-zinc-800">
                        <h4 className="font-bold text-zinc-900 dark:text-white mb-2">Drip Vault (Consignment)</h4>
                        <p className="text-xs text-zinc-500 leading-relaxed">Ship your inventory to our climate-controlled vault. We handle photography, storage, and same-day dispatch when an item sells.</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "receive-payments" && (
                  <div className="space-y-6 animate-fade-in">
                    <h3 className="text-3xl font-light font-playfair text-zinc-900 dark:text-white mb-2">
                      Secure <span className="italic text-[#6F4E37] dark:text-[#E6C280]">Payments</span>
                    </h3>
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-6">
                      We guarantee secure, on-time payments with zero risk of fraudulent chargebacks. You get paid exactly what you earned.
                    </p>
                    <ul className="space-y-4">
                      {[
                        "Flat 8% Commission on standard items, with zero hidden listing fees.",
                        "Payments are settled directly to your bank account within 24-48 hours of item authentication.",
                        "100% Chargeback Protection: Once we verify and ship to the buyer, your funds are completely safe.",
                        "Transparent tax deductions and TCS/TDS certificates available in the dashboard."
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                          <span className="text-sm text-zinc-700 dark:text-zinc-300">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeTab === "grow-faster" && (
                  <div className="space-y-6 animate-fade-in">
                    <h3 className="text-3xl font-light font-playfair text-zinc-900 dark:text-white mb-2">
                      <span className="italic text-[#6F4E37] dark:text-[#E6C280]">Grow</span> Faster
                    </h3>
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-6">
                      Leverage our premium seller tools to reach more buyers, maximize your conversions, and scale your luxury boutique.
                    </p>
                    <ul className="space-y-4">
                      {[
                        "DripHunter Ads (PLA): Appear at the top of trending search results.",
                        "Participate in exclusive seasonal drops and 'Hype Week' promotions.",
                        "Use Seller Lens analytics to identify high-demand silhouettes and optimize pricing.",
                        "Gold & Platinum sellers get a dedicated account manager for tailored business strategy."
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                          <span className="text-sm text-zinc-700 dark:text-zinc-300">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeTab === "help-support" && (
                  <div className="space-y-6 animate-fade-in">
                    <h3 className="text-3xl font-light font-playfair text-zinc-900 dark:text-white mb-2">
                      Help & <span className="italic text-[#6F4E37] dark:text-[#E6C280]">Support</span>
                    </h3>
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-6">
                      Running into issues? Our dedicated seller support team is here to assist you 24/7.
                    </p>
                    <div className="bg-stone-50 dark:bg-zinc-900 p-6 rounded-2xl border border-stone-200 dark:border-zinc-800">
                      <h4 className="font-bold text-zinc-900 dark:text-white mb-4">How to reach us</h4>
                      <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
                        <li><strong>Seller Ticketing:</strong> Raise a dispute ticket directly from your seller dashboard for order-related issues.</li>
                        <li><strong>Live Chat:</strong> Available from 9 AM to 9 PM IST for instant resolutions.</li>
                        <li><strong>Seller Learning Center:</strong> Access video tutorials and step-by-step guides on mastering the DripHunter platform.</li>
                      </ul>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

// Re-use Sparkles icon component since it was missing in the top imports
function Sparkles(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
      <path d="M20 3v4" />
      <path d="M22 5h-4" />
      <path d="M4 17v2" />
      <path d="M5 18H3" />
    </svg>
  );
}

