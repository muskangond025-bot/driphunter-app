"use client";

import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import Link from "next/link";
import {
  ShieldCheck,
  FileText,
  AlertTriangle,
  Scale,
  ArrowRight,
  ArrowLeft
} from "lucide-react";

export default function SellerPoliciesPage() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: tabsRef, isVisible: tabsVisible } = useScrollAnimation();
  const [activeTab, setActiveTab] = useState("authenticity");

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5] dark:bg-[#0C0B0A] text-zinc-900 dark:text-white font-sans antialiased overflow-x-hidden selection:bg-[#E6C280] selection:text-black">
      <Navbar />

      <main className="flex-grow pb-24">
        {/* Header Section */}
        <section
          ref={headerRef}
          className={`pt-24 pb-12 px-6 sm:px-12 max-w-7xl mx-auto text-center transition-all duration-1000 ease-out ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="mb-6 flex justify-center">
            <Link href="/seller-hub" className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-[#6F4E37] dark:hover:text-[#E6C280] transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Hub
            </Link>
          </div>
          
          <span className="inline-block text-[10px] font-mono font-bold tracking-[0.2em] text-[#6F4E37] dark:text-[#E6C280] uppercase mb-4 border border-[#6F4E37]/20 dark:border-[#E6C280]/20 px-4 py-1.5 rounded-full bg-[#6F4E37]/5 dark:bg-[#E6C280]/5">
            Platform Guidelines
          </span>
          <h1 className="text-4xl md:text-5xl font-light tracking-tight font-playfair leading-[1.1] mb-6">
            Seller <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280]">Policies</span>
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto text-sm leading-relaxed">
            Maintaining a trusted luxury marketplace is our top priority. Please review our core seller guidelines regarding authenticity, condition reporting, and prohibited items to ensure a seamless selling experience.
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
                { id: "authenticity", label: "Authenticity Guarantee", icon: ShieldCheck },
                { id: "condition", label: "Condition Reporting", icon: FileText },
                { id: "shipping", label: "Shipping Timelines", icon: AlertTriangle },
                { id: "prohibited", label: "Prohibited Items", icon: Scale },
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
              
              {/* Authenticity Guarantee */}
              {activeTab === "authenticity" && (
                <div className="space-y-6 animate-fade-in">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                      <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <h3 className="text-2xl font-bold font-sans text-zinc-900 dark:text-white tracking-tight">Authenticity Guarantee</h3>
                  </div>
                  
                  <div className="p-6 rounded-2xl bg-stone-50 dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 mb-6">
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed font-bold">
                      DripHunter operates on a zero-tolerance policy for counterfeit, replica, or unauthorized goods. Every single item sold on our platform must pass through our physical authentication hub before being dispatched to the buyer.
                    </p>
                  </div>

                  <h4 className="font-bold text-zinc-900 dark:text-white mb-4 uppercase tracking-wider text-xs">Penalties for Violations</h4>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-4">
                      <div className="mt-1 w-2 h-2 rounded-full bg-[#6F4E37] dark:bg-[#E6C280] shrink-0"></div>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">If an item fails authentication, it will be returned to you at your expense.</p>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="mt-1 w-2 h-2 rounded-full bg-[#6F4E37] dark:bg-[#E6C280] shrink-0"></div>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">A penalty fee of <span className="font-bold text-red-500">15% of the item value</span> (minimum ₹1000) will be charged to your account.</p>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="mt-1 w-2 h-2 rounded-full bg-[#6F4E37] dark:bg-[#E6C280] shrink-0"></div>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">Three failed authentications will result in a <span className="font-bold text-red-500">permanent ban</span> from selling on DripHunter.</p>
                    </li>
                  </ul>
                </div>
              )}

              {/* Condition Reporting */}
              {activeTab === "condition" && (
                <div className="space-y-6 animate-fade-in">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-2xl font-bold font-sans text-zinc-900 dark:text-white tracking-tight">Condition Reporting</h3>
                  </div>
                  
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-6">
                    Sellers must accurately describe the condition of the items they list. Proper condition reporting ensures a smooth authentication process and prevents canceled orders.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    <div className="p-6 rounded-2xl bg-stone-50 dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800">
                      <h4 className="font-bold text-zinc-900 dark:text-white mb-2 text-sm uppercase">Deadstock (DS)</h4>
                      <p className="text-xs text-zinc-500 leading-relaxed">
                        Means the item is brand new, unworn, un-tried on, and includes all original tags, laces, and undamaged packaging.
                      </p>
                    </div>
                    <div className="p-6 rounded-2xl bg-[#6F4E37]/5 dark:bg-[#E6C280]/5 border border-[#6F4E37]/20 dark:border-[#E6C280]/20">
                      <h4 className="font-bold text-[#6F4E37] dark:text-[#E6C280] mb-2 text-sm uppercase">Defect Reporting</h4>
                      <p className="text-xs text-zinc-500 leading-relaxed">
                        Any scuffs, missing accessories, or damaged boxes must be explicitly stated and photographed in the listing. If an item is sold as DS but arrives with signs of wear, the sale will be cancelled.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Shipping Timelines */}
              {activeTab === "shipping" && (
                <div className="space-y-6 animate-fade-in">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                      <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                    </div>
                    <h3 className="text-2xl font-bold font-sans text-zinc-900 dark:text-white tracking-tight">Shipping Timelines</h3>
                  </div>
                  
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-6">
                    Fast fulfillment is key to customer satisfaction. Buyers on DripHunter expect premium service, which starts with you dispatching your items on time.
                  </p>
                  
                  <ul className="space-y-4">
                    <li className="flex items-start gap-4 p-4 rounded-xl border border-stone-100 dark:border-zinc-800/50 bg-white dark:bg-[#111111]">
                      <div className="mt-1 bg-amber-100 dark:bg-amber-900/30 p-1 rounded-full shrink-0">
                        <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                      </div>
                      <div>
                        <h4 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm mb-1">48-Hour Requirement</h4>
                        <p className="text-xs text-zinc-500 leading-relaxed">Sellers are required to dispatch sold items within 48 hours of order confirmation.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4 p-4 rounded-xl border border-stone-100 dark:border-zinc-800/50 bg-white dark:bg-[#111111]">
                      <div className="mt-1 bg-red-100 dark:bg-red-900/30 p-1 rounded-full shrink-0">
                        <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400" />
                      </div>
                      <div>
                        <h4 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm mb-1">Automatic Cancellation</h4>
                        <p className="text-xs text-zinc-500 leading-relaxed">Failure to ship within 72 hours will result in automatic order cancellation. Repeated late shipments will lower your Seller Score.</p>
                      </div>
                    </li>
                  </ul>
                </div>
              )}

              {/* Prohibited Items */}
              {activeTab === "prohibited" && (
                <div className="space-y-6 animate-fade-in">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center">
                      <Scale className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                    </div>
                    <h3 className="text-2xl font-bold font-sans text-zinc-900 dark:text-white tracking-tight">Prohibited Items</h3>
                  </div>
                  
                  <div className="p-8 rounded-2xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/30">
                    <p className="text-zinc-800 dark:text-zinc-200 text-sm leading-relaxed font-bold mb-4">
                      DripHunter prohibits the sale of items that violate intellectual property rights, items that are illegally obtained, and any form of offensive or hazardous materials. 
                    </p>
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                      We actively monitor listings and will immediately remove any items that violate this policy without prior notice. Severe violations will be reported to the appropriate authorities.
                    </p>
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

