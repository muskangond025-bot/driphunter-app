"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  Users,
  ShieldCheck,
  TrendingDown,
  HeadphonesIcon,
  Zap,
  ChevronDown,
  MessageSquare,
  Smile,
  Send
} from "lucide-react";

// Mock FAQ Data
const faqData = [
  {
    category: "Fees & Charges",
    id: "fees",
    questions: [
      { q: "Who decides the price of my products?", a: "You have complete control over the pricing of your products. However, our Seller Lens tool provides pricing recommendations based on current market trends." },
      { q: "What are the charges for selling on DripHunter?", a: "We charge a flat 8% platform commission on the final sale value, plus a standard 2% payment gateway fee. There are no listing fees." },
      { q: "Will I get charged for listing products?", a: "No, listing your products on DripHunter is completely free. We only make money when you make a sale." },
      { q: "How and when do I get paid?", a: "Payments are settled directly to your registered bank account on a T+2 basis after the item passes our authentication check." },
      { q: "Are there any hidden charges?", a: "Absolutely not. Our fee structure is 100% transparent. You can view a complete breakdown of deductions for every payout in your Seller Dashboard." },
      { q: "What happens to the fees if a customer returns the product?", a: "If an item is returned due to our verification process failing (e.g., replica item), you will be charged a penalty fee. If it's a standard return not at your fault, platform fees are reversed." }
    ]
  },
  {
    category: "Managing Your Account",
    id: "account",
    questions: [
      { q: "How do I list my products on DripHunter?", a: "You can list products one by one using our catalog search, or use our Bulk Upload tool via Excel for listing multiple items at once." },
      { q: "How do I manage my orders?", a: "All orders can be managed from the 'Orders' tab in your Seller Dashboard. You can print shipping labels and track dispatch statuses there." },
      { q: "Can I get help with catalogue development?", a: "Yes, our team can assist with AI-generated descriptions and automatic background removal for your product images." },
      { q: "How can I change my bank account details?", a: "You can update your bank account details under the 'Settings > Financials' section. Any changes will require an OTP verification sent to your registered mobile number." },
      { q: "What should I do if I go on vacation?", a: "You can activate 'Vacation Mode' in your dashboard. This temporarily hides your self-shipped listings. Items in the DripVault will continue to sell normally." },
      { q: "How do I track my sales performance?", a: "The 'Analytics' tab in your dashboard provides detailed metrics on your sales volume, average order value, conversion rate, and top-selling products." }
    ]
  },
  {
    category: "Services",
    id: "services",
    questions: [
      { q: "Do you offer protection against fraud?", a: "Absolutely. We offer 100% chargeback protection. Once your item is authenticated by us, you are guaranteed your payout." },
      { q: "Do I need GST to sell on DripHunter?", a: "Yes, an active GSTIN is required for business sellers. However, individual vintage curators can register using their personal PAN." },
      { q: "How does the authentication process work?", a: "All items pass through our physical authentication hub. Our experts check tags, stitching, materials, and packaging before forwarding the item to the buyer." },
      { q: "What advertising options are available?", a: "We offer DripHunter Ads (Product Listing Ads) that allow you to bid on keywords and place your products at the top of search results." },
      { q: "Can I offer discounts on my products?", a: "Yes, you can create custom coupon codes or participate in platform-wide promotional events directly from the 'Promotions' tab." }
    ]
  },
  {
    category: "Fulfilment by DripHunter (FBD)",
    id: "fulfilment",
    questions: [
      { q: "What is Fulfilment by DripHunter (FBD)?", a: "FBD (also known as DripVault) is our premium consignment service. You send your inventory to us, and we handle the storage, photography, and shipping." },
      { q: "How does FBD work?", a: "Ship your items to our climate-controlled vault. When an item sells, we authenticate it immediately and dispatch it the same day, ensuring the fastest delivery to the buyer." },
      { q: "What are the benefits of FBD?", a: "Faster shipping times, higher search visibility (Verified Drip badge), zero storage fees for the first 90 days, and complete hands-off logistics." },
      { q: "Is there a minimum quantity required for FBD?", a: "Currently, we require a minimum of 5 items to process an FBD inbound shipment. There is no maximum limit." },
      { q: "What happens if my items don't sell in FBD?", a: "Items stored for over 90 days will incur a small monthly storage fee. You can request to have your unsold inventory shipped back to you at any time for a nominal return shipping fee." },
      { q: "Are my items insured while in the DripVault?", a: "Yes, all inventory stored in our facility is fully insured against theft, fire, and transit damage at no extra cost to you." }
    ]
  }
];

// Accordion Item Component
const AccordionItem = ({ q, a }: { q: string; a: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-stone-200 dark:border-zinc-800 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-5 text-left focus:outline-none group"
      >
        <span className="text-sm font-bold text-zinc-800 dark:text-zinc-200 group-hover:text-[#6F4E37] dark:group-hover:text-[#E6C280] transition-colors pr-8">
          {q}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-zinc-400 transition-transform duration-300 shrink-0 ${isOpen ? "rotate-180 text-[#6F4E37] dark:text-[#E6C280]" : ""}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[500px] opacity-100 pb-5" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed pl-2 border-l-2 border-[#6F4E37]/30 dark:border-[#E6C280]/30">
          {a}
        </p>
      </div>
    </div>
  );
};

export default function FAQsPage() {
  const [activeCategory, setActiveCategory] = useState(faqData[0].id);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5] dark:bg-[#0C0B0A] text-zinc-900 dark:text-white font-sans antialiased overflow-x-hidden">
      <Navbar />

      {/* Header Section */}
      <div className="w-full bg-white dark:bg-[#111111] border-b border-stone-200 dark:border-zinc-800 pt-12 pb-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
          <div className="text-xs text-zinc-500 mb-4 font-mono tracking-wider">
            <Link href="/" className="hover:text-[#6F4E37] dark:hover:text-[#E6C280]">Home</Link> &gt; 
            <Link href="/become-seller" className="hover:text-[#6F4E37] dark:hover:text-[#E6C280] ml-1">Seller</Link> &gt; 
            <span className="text-zinc-900 dark:text-zinc-300 ml-1">FAQs</span>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2">
              <h1 className="text-4xl md:text-5xl font-light tracking-tight font-playfair leading-[1.1] mb-4">
                Frequently Asked <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280]">Questions</span>
              </h1>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-md">
                Find answers to common questions about selling on DripHunter, managing your account, and our fulfillment services.
              </p>
            </div>
            
            {/* Illustration Area */}
            <div className="md:w-1/2 flex justify-end mt-8 md:mt-0 relative">
              <div className="w-64 h-64 bg-gradient-to-br from-[#E6C280]/20 to-[#6F4E37]/20 rounded-full blur-3xl absolute right-10 top-0"></div>
              <div className="relative w-72 h-48 bg-white/50 dark:bg-black/50 border border-stone-200 dark:border-zinc-800 rounded-3xl backdrop-blur-md shadow-xl flex items-center justify-center p-6 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="text-center">
                  <MessageSquare className="w-12 h-12 mx-auto text-[#6F4E37] dark:text-[#E6C280] mb-3 opacity-80" />
                  <p className="font-playfair text-xl italic font-bold">We're here to help.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5 Stats / Benefits Row */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 -mt-8 relative z-20 w-full">
        <div className="bg-white dark:bg-[#151515] rounded-2xl shadow-lg border border-stone-100 dark:border-zinc-800 flex flex-wrap justify-center divide-y md:divide-y-0 md:divide-x divide-stone-100 dark:divide-zinc-800 p-2">
          {[
            { icon: Users, text: "1 Million+ Verified Buyers" },
            { icon: ShieldCheck, text: "100% Secure & Regular Payments" },
            { icon: TrendingDown, text: "Low Cost of Doing Business" },
            { icon: HeadphonesIcon, text: "One-Click Seller Support" },
            { icon: Zap, text: "Access to Exclusive Drops" }
          ].map((item, idx) => (
            <div key={idx} className="w-full sm:w-1/2 md:w-1/5 p-6 flex flex-col items-center text-center group">
              <div className="w-12 h-12 rounded-full bg-[#FAF8F5] dark:bg-black flex items-center justify-center mb-3 group-hover:bg-[#6F4E37] dark:group-hover:bg-[#E6C280] transition-colors duration-300">
                <item.icon className="w-5 h-5 text-[#6F4E37] dark:text-[#E6C280] group-hover:text-white dark:group-hover:text-black transition-colors" />
              </div>
              <p className="text-xs font-bold text-zinc-700 dark:text-zinc-300 px-2">{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 sm:px-12 py-16 w-full flex flex-col lg:flex-row gap-12">
        {/* Left Sidebar - Categories */}
        <div className="lg:w-1/4">
          <div className="sticky top-28 flex flex-col gap-1">
            {faqData.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`text-left px-5 py-4 rounded-xl transition-all duration-200 text-sm font-bold border-l-4 ${
                  activeCategory === cat.id
                    ? "bg-white dark:bg-[#151515] text-[#6F4E37] dark:text-[#E6C280] border-[#6F4E37] dark:border-[#E6C280] shadow-sm"
                    : "bg-transparent text-zinc-500 dark:text-zinc-400 border-transparent hover:bg-stone-100 dark:hover:bg-zinc-900/50 hover:text-zinc-800 dark:hover:text-zinc-200"
                }`}
              >
                {cat.category}
              </button>
            ))}
          </div>
        </div>

        {/* Right Side - FAQ Accordions */}
        <div className="lg:w-3/4">
          <div className="bg-white dark:bg-[#151515] border border-stone-200 dark:border-zinc-800 rounded-[32px] p-8 md:p-12 shadow-sm min-h-[500px]">
            {faqData.filter(cat => cat.id === activeCategory).map((cat) => (
              <div key={cat.id} className="animate-fade-in">
                <h2 className="text-3xl font-light font-playfair text-zinc-900 dark:text-white mb-2 relative inline-block">
                  {cat.category}
                  <div className="absolute -bottom-2 left-0 w-1/3 h-1 bg-[#6F4E37] dark:bg-[#E6C280] rounded-full"></div>
                </h2>
                <div className="mt-8">
                  {cat.questions.map((item, idx) => (
                    <AccordionItem key={idx} q={item.q} a={item.a} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Support / Contact Section */}
      <div className="w-full bg-white dark:bg-[#111111] border-t border-stone-200 dark:border-zinc-800 py-16 mt-8">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 flex flex-col md:flex-row items-center justify-between gap-12">
          
          <div className="md:w-1/2 space-y-6">
            <h2 className="text-3xl md:text-4xl font-light font-playfair text-zinc-900 dark:text-white flex items-center gap-3">
              We are happy to <span className="font-serif italic font-bold text-[#6F4E37] dark:text-[#E6C280]">help you</span> <Smile className="w-8 h-8 text-[#6F4E37] dark:text-[#E6C280]" />
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Still have questions or queries that are left unanswered? Share your thoughts below and we will help improve the website with more information.
            </p>
            
            {isSubmitted ? (
              <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl p-6 mt-8 flex flex-col items-center justify-center text-center animate-fade-in max-w-md">
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center mb-4">
                  <ShieldCheck className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="text-lg font-bold text-emerald-900 dark:text-emerald-100 mb-2">Query Submitted</h3>
                <p className="text-sm text-emerald-700 dark:text-emerald-300">
                  Thanks for reaching out! Our support team will get back to you within 5 minutes.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 max-w-md mt-8">
                <input 
                  type="text" 
                  required
                  placeholder="Enter Full Name *" 
                  className="w-full bg-[#FAF8F5] dark:bg-black border border-stone-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#6F4E37]/50 dark:focus:ring-[#E6C280]/50"
                />
                <input 
                  type="text" 
                  required
                  placeholder="Enter Mobile Number / Email ID *" 
                  className="w-full bg-[#FAF8F5] dark:bg-black border border-stone-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#6F4E37]/50 dark:focus:ring-[#E6C280]/50"
                />
                <div className="relative">
                  <select defaultValue="" required className="w-full bg-[#FAF8F5] dark:bg-black border border-stone-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-[#6F4E37]/50 dark:focus:ring-[#E6C280]/50 text-zinc-500">
                    <option value="" disabled>Select a Topic</option>
                    <option value="registration">Registration Issue</option>
                    <option value="payments">Payments & Fees</option>
                    <option value="listings">Product Listings</option>
                    <option value="other">Other</option>
                  </select>
                  <ChevronDown className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                </div>
                <textarea 
                  placeholder="Type Your Message *" 
                  required
                  rows={4}
                  className="w-full bg-[#FAF8F5] dark:bg-black border border-stone-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#6F4E37]/50 dark:focus:ring-[#E6C280]/50 resize-none"
                ></textarea>
                <button 
                  type="submit" 
                  className="bg-[#6F4E37] dark:bg-[#E6C280] text-white dark:text-black font-bold uppercase tracking-wider text-xs px-8 py-3.5 rounded-full hover:bg-black dark:hover:bg-white transition-colors flex items-center gap-2"
                >
                  Send Query <Send className="w-3 h-3" />
                </button>
              </form>
            )}
          </div>

          <div className="md:w-1/2 flex justify-center">
            {/* Decorative support illustration matching DripHunter theme */}
            <div className="relative w-full max-w-[400px] aspect-square rounded-[40px] bg-gradient-to-br from-[#FAF8F5] to-stone-100 dark:from-zinc-900 dark:to-black border border-stone-200 dark:border-zinc-800 p-8 flex items-center justify-center overflow-hidden">
              <div className="absolute top-10 right-10 w-24 h-24 bg-[#E6C280]/20 rounded-full blur-2xl"></div>
              <div className="absolute bottom-10 left-10 w-32 h-32 bg-[#6F4E37]/10 rounded-full blur-2xl"></div>
              
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-white dark:bg-[#151515] shadow-xl flex items-center justify-center mb-6 border border-stone-100 dark:border-zinc-800">
                  <HeadphonesIcon className="w-10 h-10 text-[#6F4E37] dark:text-[#E6C280]" />
                </div>
                <div className="bg-white dark:bg-[#151515] py-3 px-6 rounded-2xl shadow-lg border border-stone-100 dark:border-zinc-800 text-center relative">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 bg-white dark:bg-[#151515] border-l border-t border-stone-100 dark:border-zinc-800"></div>
                  <p className="font-bold text-sm text-zinc-900 dark:text-white">24/7 Priority Support</p>
                  <p className="text-xs text-zinc-500 mt-1">Typical reply time: 5 minutes</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}

