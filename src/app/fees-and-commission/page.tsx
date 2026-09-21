"use client";

import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import {
  Package,
  CreditCard,
  RefreshCcw,
  Percent,
  Check,
  ArrowRight
} from "lucide-react";

export default function FeesAndCommissionPage() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: tabsRef, isVisible: tabsVisible } = useScrollAnimation();
  const [activeTab, setActiveTab] = useState("fulfillment-type");

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5] dark:bg-[#0C0B0A] text-zinc-900 dark:text-white font-sans antialiased overflow-x-hidden selection:bg-[#E6C280] selection:text-black">
      <Navbar />

      <main className="flex-grow pb-24">
        {/* Header Section */}
        <section
          ref={headerRef}
          className={`pt-20 pb-12 px-6 sm:px-12 max-w-7xl mx-auto text-center transition-all duration-1000 ease-out ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-block text-[10px] font-mono font-bold tracking-[0.2em] text-[#6F4E37] dark:text-[#E6C280] uppercase mb-4 border border-[#6F4E37]/20 dark:border-[#E6C280]/20 px-4 py-1.5 rounded-full bg-[#6F4E37]/5 dark:bg-[#E6C280]/5">
            Transparent Pricing
          </span>
          <h1 className="text-4xl md:text-5xl font-light tracking-tight font-playfair leading-[1.1] mb-6">
            Fees & <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280]">Commission</span>
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto text-sm leading-relaxed">
            Understand exactly how much you earn. We believe in complete transparency—no hidden fees, no complicated tiers. Just a flat commission structure designed to help luxury streetwear sellers scale profitably.
          </p>
        </section>

        {/* Interactive Tabs Section */}
        <section
          ref={tabsRef}
          className={`px-6 sm:px-12 max-w-7xl mx-auto transition-all duration-1000 ease-out ${
            tabsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 relative items-start">
            {/* Tabs Sidebar */}
            <div className="lg:w-1/3 flex flex-col gap-2 sticky top-24">
              {[
                { id: "fulfillment-type", label: "Fulfillment Type", icon: Package },
                { id: "fee-type", label: "Fee Type", icon: CreditCard },
                { id: "payment-cycle", label: "Payment Cycle", icon: RefreshCcw },
                { id: "gross-margin", label: "Gross Margin", icon: Percent },
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
                  <div className="flex items-center gap-3">
                    <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? "opacity-100" : "opacity-60"}`} />
                    <span className="text-sm tracking-wide">{tab.label}</span>
                  </div>
                  {activeTab === tab.id && <ArrowRight className="w-4 h-4" />}
                </button>
              ))}
            </div>

            {/* Tab Content Area */}
            <div className="lg:w-2/3 bg-white dark:bg-[#151515] rounded-[32px] p-8 md:p-12 border border-stone-200 dark:border-zinc-800 min-h-[500px] shadow-sm">
              
              {/* Fulfillment Type */}
              {activeTab === "fulfillment-type" && (
                <div className="space-y-6 animate-fade-in">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-[#6F4E37]/10 dark:bg-[#E6C280]/10 flex items-center justify-center text-[#6F4E37] dark:text-[#E6C280]">
                      <Package className="w-5 h-5" />
                    </div>
                    <h3 className="text-2xl font-bold font-sans text-zinc-900 dark:text-white uppercase tracking-tight">Fulfillment Type</h3>
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-6">
                    Your fees vary slightly depending on how you choose to fulfill your orders. We offer two primary modes designed for different seller scales.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    <div className="p-6 rounded-2xl bg-stone-50 dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800">
                      <h4 className="font-bold text-zinc-900 dark:text-white mb-2">Self-Ship</h4>
                      <p className="text-xs text-zinc-500 leading-relaxed mb-4">You pack the item and hand it to our courier. We bring it to our verification center.</p>
                      <ul className="space-y-2 text-xs text-zinc-600 dark:text-zinc-400">
                        <li className="flex justify-between items-center border-b border-stone-200 dark:border-zinc-800 pb-2">
                          <span>Verification Fee</span> <span>Standard</span>
                        </li>
                        <li className="flex justify-between items-center border-b border-stone-200 dark:border-zinc-800 pb-2">
                          <span>Shipping Fee</span> <span>Weight-based</span>
                        </li>
                      </ul>
                    </div>
                    <div className="p-6 rounded-2xl bg-[#6F4E37]/5 dark:bg-[#E6C280]/5 border border-[#6F4E37]/20 dark:border-[#E6C280]/20">
                      <h4 className="font-bold text-[#6F4E37] dark:text-[#E6C280] mb-2">DripVault Consignment</h4>
                      <p className="text-xs text-zinc-500 leading-relaxed mb-4">You store your inventory with us. We handle verification, photography, and next-day shipping.</p>
                      <ul className="space-y-2 text-xs text-zinc-600 dark:text-zinc-400">
                        <li className="flex justify-between items-center border-b border-stone-200 dark:border-zinc-800 pb-2">
                          <span>Storage Fee</span> <span>Free for 90 days</span>
                        </li>
                        <li className="flex justify-between items-center border-b border-stone-200 dark:border-zinc-800 pb-2">
                          <span>Fulfillment Fee</span> <span>Flat Rate</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Fee Type */}
              {activeTab === "fee-type" && (
                <div className="space-y-6 animate-fade-in">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-[#6F4E37]/10 dark:bg-[#E6C280]/10 flex items-center justify-center text-[#6F4E37] dark:text-[#E6C280]">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <h3 className="text-2xl font-bold font-sans text-zinc-900 dark:text-white uppercase tracking-tight">Fee Type</h3>
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-6">
                    We charge a straightforward flat commission on the final sale price of your item. There are no listing fees or subscription costs to join the platform.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-xl bg-stone-50 dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800">
                      <div>
                        <span className="font-bold text-zinc-900 dark:text-white block text-sm">Platform Commission</span>
                        <span className="text-xs text-zinc-500">Applied only when an item sells successfully.</span>
                      </div>
                      <div className="text-right">
                        <span className="font-black text-xl text-[#6F4E37] dark:text-[#E6C280]">8%</span>
                        <span className="block text-[10px] text-zinc-400 uppercase tracking-wider">Flat Rate</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 rounded-xl bg-stone-50 dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800">
                      <div>
                        <span className="font-bold text-zinc-900 dark:text-white block text-sm">Payment Processing Fee</span>
                        <span className="text-xs text-zinc-500">Standard gateway charge for card/UPI processing.</span>
                      </div>
                      <div className="text-right">
                        <span className="font-black text-xl text-zinc-700 dark:text-zinc-300">2%</span>
                        <span className="block text-[10px] text-zinc-400 uppercase tracking-wider">Per Transaction</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 rounded-xl bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-700/30">
                    <p className="text-xs text-amber-800 dark:text-amber-300">
                      <strong>Note on GST:</strong> 18% GST is applicable on the commission and shipping fees, not on the product value.
                    </p>
                  </div>
                </div>
              )}

              {/* Payment Cycle */}
              {activeTab === "payment-cycle" && (
                <div className="space-y-6 animate-fade-in">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-[#6F4E37]/10 dark:bg-[#E6C280]/10 flex items-center justify-center text-[#6F4E37] dark:text-[#E6C280]">
                      <RefreshCcw className="w-5 h-5" />
                    </div>
                    <h3 className="text-2xl font-bold font-sans text-zinc-900 dark:text-white uppercase tracking-tight">Payment Cycle</h3>
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-6">
                    Cash flow is critical for resellers. DripHunter offers some of the fastest payout cycles in the luxury streetwear industry.
                  </p>
                  
                  <ul className="space-y-4">
                    {[
                      { title: "Authentication Clearance", desc: "Once your item reaches our hub and passes the legit-check process, your payout is locked in." },
                      { title: "T+2 Settlement", desc: "For standard sellers, funds are wired to your registered bank account 2 business days after authentication." },
                      { title: "Next-Day Payouts (Pro Tier)", desc: "High-volume verified sellers gain access to next-day NEFT/IMPS settlements." },
                      { title: "Zero Holdbacks", desc: "We never freeze your funds arbitrarily. The dashboard provides real-time tracking of every rupee." }
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-4 p-4 rounded-xl border border-stone-100 dark:border-zinc-800/50 bg-white dark:bg-[#111111]">
                        <div className="mt-1 bg-emerald-100 dark:bg-emerald-900/30 p-1 rounded-full">
                          <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <div>
                          <h4 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm mb-1">{item.title}</h4>
                          <p className="text-xs text-zinc-500 leading-relaxed">{item.desc}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Gross Margin */}
              {activeTab === "gross-margin" && (
                <div className="space-y-6 animate-fade-in">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-[#6F4E37]/10 dark:bg-[#E6C280]/10 flex items-center justify-center text-[#6F4E37] dark:text-[#E6C280]">
                      <Percent className="w-5 h-5" />
                    </div>
                    <h3 className="text-2xl font-bold font-sans text-zinc-900 dark:text-white uppercase tracking-tight">Gross Margin</h3>
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-6">
                    Our fee structure is optimized so you can maintain a healthy gross margin on high-ticket luxury items and hype sneakers.
                  </p>
                  
                  <div className="bg-[#FAF8F5] dark:bg-black p-6 rounded-2xl border border-stone-200 dark:border-zinc-800">
                    <h4 className="font-bold text-zinc-900 dark:text-white mb-4 text-sm uppercase tracking-wider">Margin Example</h4>
                    
                    <div className="space-y-3 font-mono text-xs">
                      <div className="flex justify-between items-center pb-2 border-b border-stone-200 dark:border-zinc-800 border-dashed">
                        <span className="text-zinc-500">Selling Price</span>
                        <span className="font-bold text-zinc-900 dark:text-white">₹20,000</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b border-stone-200 dark:border-zinc-800 border-dashed">
                        <span className="text-red-500 dark:text-red-400">Platform Commission (8%)</span>
                        <span className="text-red-500 dark:text-red-400">- ₹1,600</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b border-stone-200 dark:border-zinc-800 border-dashed">
                        <span className="text-red-500 dark:text-red-400">Payment Gateway (2%)</span>
                        <span className="text-red-500 dark:text-red-400">- ₹400</span>
                      </div>
                      <div className="flex justify-between items-center pt-2">
                        <span className="font-bold text-zinc-900 dark:text-white text-sm">Net Payout to Seller</span>
                        <span className="font-black text-[#6F4E37] dark:text-[#E6C280] text-lg">₹18,000</span>
                      </div>
                    </div>
                    
                    <div className="mt-6 text-center">
                      <div className="inline-block bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase">
                        Effective Margin Kept: 90%
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

