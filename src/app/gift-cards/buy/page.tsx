"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SearchOverlay from "@/components/layout/SearchOverlay";
import { CheckCircle2, ChevronRight, ChevronDown, Share2, Star, ShieldCheck, ArrowRight, Check } from "lucide-react";

export default function DigitalGiftCardPDP() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  // Product States
  const [amount, setAmount] = useState<number | "Custom">(1000);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [selectedDesign, setSelectedDesign] = useState("Standard");
  
  // Form States
  const [recipientName, setRecipientName] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [senderName, setSenderName] = useState("");
  const [message, setMessage] = useState("");
  
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  
  // Q&A States
  const [expandedQ, setExpandedQ] = useState<number | null>(null);

  const designs = [
    { id: "Standard", name: "DripHunter Black", color: "bg-zinc-950", text: "text-white", border: "border-zinc-800", img: "https://images.unsplash.com/photo-1616423640778-28d1b53229bd?w=800&q=80" },
    { id: "Birthday", name: "Hype Birthday", color: "bg-[#6F4E37]", text: "text-white", border: "border-[#6F4E37]", img: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&q=80" },
    { id: "ThankYou", name: "Thank You", color: "bg-[#E6C280]", text: "text-zinc-950", border: "border-[#E6C280]", img: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&q=80" },
    { id: "Holiday", name: "Festive Drop", color: "bg-red-900", text: "text-[#f5f0eb]", border: "border-red-900", img: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=800&q=80" }
  ];

  const predefinedAmounts = [500, 1000, 2500, 5000, 10000];
  const displayAmount = amount === "Custom" ? (customAmount ? parseInt(customAmount) : 0) : amount;
  const currentDesign = designs.find(d => d.id === selectedDesign) || designs[0];

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'DripHunter Digital Gift Card',
          text: 'Check out this digital gift card from DripHunter!',
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      }
    } catch (err) {
      console.log('Error sharing:', err);
    }
  };

  const handlePurchase = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPurchasing(true);
    setTimeout(() => {
      setIsPurchasing(false);
      setPurchaseSuccess(true);
    }, 2000);
  };

  if (purchaseSuccess) {
    return (
      <div className="min-h-screen bg-[#faf9f8] text-zinc-950 flex flex-col font-sans">
        <Navbar onSearchClick={() => setIsSearchOpen(true)} />
        <main className="flex-grow flex items-center justify-center p-6 mt-20">
          <div className="bg-white p-10 rounded-[2rem] shadow-2xl border border-zinc-200 text-center max-w-lg w-full animate-fade-in">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-3xl font-chaney-title uppercase tracking-wider text-zinc-950 mb-3">
              Gift Sent!
            </h2>
            <p className="text-zinc-500 font-sans leading-relaxed mb-6">
              Your ₹{displayAmount.toLocaleString("en-IN")} gift card has been sent to {recipientEmail}. 
              A receipt has been sent to your registered email.
            </p>
            <Link
              href="/gift-cards"
              className="inline-block bg-[#6F4E37] text-white px-8 py-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all hover:bg-[#5C3D2E] shadow-lg cursor-pointer"
            >
              Back to Gift Cards
            </Link>
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
        <div className="max-w-[1600px] mx-auto px-6 sm:px-12 md:px-16 lg:px-20">
          
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-500 mb-8">
            <Link href="/" className="hover:text-[#6F4E37] dark:hover:text-[#E6C280] transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/gift-cards" className="hover:text-[#6F4E37] dark:hover:text-[#E6C280] transition-colors">Gift Cards</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-zinc-950 dark:text-white">Digital E-Gift Card</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* LEFT COLUMN: IMAGE GALLERY (STICKY) */}
            <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-6">
              
              {/* Main Image View */}
              <div className={`relative w-full aspect-[1.586/1] rounded-3xl shadow-2xl overflow-hidden ${currentDesign.color} ${currentDesign.border} border-4 transition-all duration-500 group`}>
                <div className="absolute inset-0 opacity-50 mix-blend-overlay">
                  <img src={currentDesign.img} alt={currentDesign.name} className="w-full h-full object-cover" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-tr from-black/80 to-transparent opacity-90" />
                
                <div className="relative h-full flex flex-col justify-between p-6 sm:p-10 z-10">
                  <div className="flex justify-between items-start">
                    <span className="text-2xl sm:text-3xl font-chaney-title uppercase tracking-widest text-white drop-shadow-md">
                      DRIP<span className={currentDesign.id === "ThankYou" ? "text-zinc-800" : "text-[#E6C280]"}>HUNTER</span>
                    </span>
                  </div>
                  
                  <div className="space-y-4 sm:space-y-6">
                    <div className="text-5xl sm:text-7xl font-chaney-title tracking-tight text-white drop-shadow-lg">
                      ₹{displayAmount.toLocaleString("en-IN")}
                    </div>
                  </div>
                </div>
              </div>

              {/* Thumbnails row */}
              <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2">
                {designs.map(design => (
                  <button
                    key={design.id}
                    onClick={() => setSelectedDesign(design.id)}
                    className={`relative w-24 aspect-[1.586/1] rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                      selectedDesign === design.id ? "border-[#6F4E37] dark:border-[#E6C280] ring-4 ring-[#6F4E37]/10 dark:ring-[#E6C280]/10 scale-105" : "border-transparent opacity-50 hover:opacity-100"
                    }`}
                  >
                    <img src={design.img} alt={design.name} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

            </div>

            {/* RIGHT COLUMN: PRODUCT DETAILS & CONFIG FORM */}
            <div className="lg:col-span-7">
              <div className="mb-6">
                <div className="flex justify-between items-start mb-2">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-chaney-title uppercase tracking-tight text-zinc-950 dark:text-white leading-tight">
                    DripHunter Digital Gift Card
                  </h1>
                  <button 
                    type="button" 
                    onClick={handleShare} 
                    className="p-3 bg-zinc-100 dark:bg-zinc-900 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors cursor-pointer shrink-0"
                    title="Share this gift card"
                  >
                    {isCopied ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <Share2 className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
                    )}
                  </button>
                </div>
                
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex text-amber-500">
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current text-zinc-300 dark:text-zinc-700" />
                  </div>
                  <span className="text-sm font-sans text-zinc-500">
                    Very Good <span className="mx-1">•</span> <span className="underline cursor-pointer hover:text-zinc-950 dark:hover:text-white">80 Ratings</span> <span className="mx-1">•</span> Verified Buyers
                  </span>
                </div>

                <div className="text-4xl font-chaney-title text-zinc-950 dark:text-white mb-6">
                  ₹{displayAmount.toLocaleString("en-IN")}
                </div>

                {/* 3 Badges */}
                <div className="flex flex-wrap gap-3 mb-8">
                   <div className="px-3 py-1.5 bg-zinc-100 dark:bg-zinc-900 rounded-full text-xs font-mono font-bold uppercase tracking-widest text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800">No returns</div>
                   <div className="px-3 py-1.5 bg-zinc-100 dark:bg-zinc-900 rounded-full text-xs font-mono font-bold uppercase tracking-widest text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800">No cash on delivery</div>
                   <div className="px-3 py-1.5 bg-zinc-100 dark:bg-zinc-900 rounded-full text-xs font-mono font-bold uppercase tracking-widest text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800">Customer support</div>
                </div>
              </div>

              <hr className="border-zinc-200 dark:border-zinc-800 mb-8" />

              <form onSubmit={handlePurchase} className="space-y-8">
                
                {/* 1. SELECT AMOUNT */}
                <div>
                   <h3 className="text-xs font-mono font-black uppercase tracking-widest text-zinc-500 mb-4">
                     Selected Denomination: <span className="text-zinc-950 dark:text-white">₹{displayAmount.toLocaleString("en-IN")}</span>
                   </h3>
                   <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => setAmount("Custom")}
                      className={`px-4 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer border-2 ${
                        amount === "Custom"
                          ? "bg-[#6F4E37] text-white border-[#6F4E37] shadow-md dark:bg-[#E6C280] dark:text-zinc-950 dark:border-[#E6C280]"
                          : "bg-white dark:bg-zinc-950/50 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800 hover:border-[#6F4E37]/50"
                      }`}
                    >
                      Custom amount
                    </button>
                    {[1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000].map(amt => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => setAmount(amt)}
                        className={`px-4 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer border-2 ${
                          amount === amt
                            ? "bg-[#6F4E37] text-white border-[#6F4E37] shadow-md dark:bg-[#E6C280] dark:text-zinc-950 dark:border-[#E6C280]"
                            : "bg-white dark:bg-zinc-950/50 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800 hover:border-[#6F4E37]/50"
                        }`}
                      >
                        ₹{amt}
                      </button>
                    ))}
                  </div>
                  {amount === "Custom" && (
                    <div className="mt-4 relative animate-fade-in max-w-xs">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 font-bold">₹</span>
                      <input
                        type="number"
                        min="100"
                        max="100000"
                        value={customAmount}
                        onChange={(e) => setCustomAmount(e.target.value)}
                        placeholder="Enter amount"
                        className="w-full pl-8 pr-4 py-3 rounded-xl border-2 border-[#6F4E37] dark:border-[#E6C280] bg-white dark:bg-zinc-950 text-sm font-bold text-zinc-950 dark:text-white focus:outline-none"
                        required
                      />
                    </div>
                  )}
                </div>

                {/* 2. SELECT DESIGN TEXT */}
                <div>
                  <h3 className="text-xs font-mono font-black uppercase tracking-widest text-zinc-500 mb-4">
                     Selected Design: <span className="text-zinc-950 dark:text-white">{currentDesign.name}</span>
                  </h3>
                  <div className="flex flex-wrap gap-3">
                     {designs.map((design, idx) => (
                        <button
                          key={design.id}
                          type="button"
                          onClick={() => setSelectedDesign(design.id)}
                          className={`px-4 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer border-2 ${
                            selectedDesign === design.id
                              ? "bg-[#6F4E37] text-white border-[#6F4E37] shadow-md dark:bg-[#E6C280] dark:text-zinc-950 dark:border-[#E6C280]"
                              : "bg-white dark:bg-zinc-950/50 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800 hover:border-[#6F4E37]/50"
                          }`}
                        >
                          Design {idx + 1}
                        </button>
                     ))}
                  </div>
                </div>

                {/* PRODUCT HIGHLIGHTS */}
                <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800">
                  <h4 className="text-sm font-bold text-zinc-950 dark:text-white mb-4">Product highlights</h4>
                  <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400 font-sans list-disc pl-5">
                    <li>Official brand product</li>
                    <li>Redeem: Online</li>
                    <li>Multiple-use: Balance can be used across multiple purchases</li>
                    <li>Validity: 12 months</li>
                    <li>Perfect for New Beginnings</li>
                    <li>Instant delivery via email</li>
                  </ul>
                  <button type="button" className="text-sm font-bold text-[#6F4E37] dark:text-[#E6C280] mt-4 hover:underline">
                    All details
                  </button>
                  <p className="text-xs text-zinc-500 mt-1">Features, description and more</p>
                </div>

                {/* Form Fields for Details */}
                <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800">
                   <h3 className="text-xs font-mono font-black uppercase tracking-widest text-zinc-500 mb-4">
                     Delivery Details
                   </h3>
                   <div className="bg-white dark:bg-zinc-900/40 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-bold block mb-2 pl-1">Receiver Name</label>
                          <input type="text" required value={recipientName} onChange={(e) => setRecipientName(e.target.value)} className="w-full bg-zinc-50 dark:bg-zinc-950/80 border border-zinc-200 dark:border-zinc-800 focus:border-[#6F4E37] dark:focus:border-[#E6C280] rounded-xl px-4 py-3 text-sm font-bold text-zinc-900 dark:text-white outline-none transition-all" />
                        </div>
                        <div>
                          <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-bold block mb-2 pl-1">Receiver Email</label>
                          <input type="email" required value={recipientEmail} onChange={(e) => setRecipientEmail(e.target.value)} className="w-full bg-zinc-50 dark:bg-zinc-950/80 border border-zinc-200 dark:border-zinc-800 focus:border-[#6F4E37] dark:focus:border-[#E6C280] rounded-xl px-4 py-3 text-sm font-bold text-zinc-900 dark:text-white outline-none transition-all" />
                        </div>
                      </div>
                      <div>
                          <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-bold block mb-2 pl-1">Sender Name</label>
                          <input type="text" required value={senderName} onChange={(e) => setSenderName(e.target.value)} className="w-full bg-zinc-50 dark:bg-zinc-950/80 border border-zinc-200 dark:border-zinc-800 focus:border-[#6F4E37] dark:focus:border-[#E6C280] rounded-xl px-4 py-3 text-sm font-bold text-zinc-900 dark:text-white outline-none transition-all" />
                      </div>
                      <div>
                          <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-bold block mb-2 pl-1">Personal Message (Optional)</label>
                          <textarea rows={2} value={message} onChange={(e) => setMessage(e.target.value)} className="w-full bg-zinc-50 dark:bg-zinc-950/80 border border-zinc-200 dark:border-zinc-800 focus:border-[#6F4E37] dark:focus:border-[#E6C280] rounded-xl px-4 py-3 text-sm text-zinc-900 dark:text-white outline-none transition-all resize-none" />
                      </div>
                   </div>
                </div>

                {/* 3. BUY NOW */}
                <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800">
                  <button
                    type="submit"
                    disabled={isPurchasing || (amount === "Custom" && (!customAmount || parseInt(customAmount) <= 0))}
                    className="w-full bg-[#6F4E37] dark:bg-[#E6C280] text-white dark:text-zinc-950 py-5 rounded-2xl text-[12px] font-mono font-black uppercase tracking-widest transition-all shadow-xl hover:-translate-y-1 hover:bg-[#5C3D2E] dark:hover:bg-[#d4b06c] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex justify-center items-center gap-2"
                  >
                    {isPurchasing ? (
                      <><div className="w-4 h-4 border-2 border-white/20 dark:border-zinc-950/20 border-t-white dark:border-t-zinc-950 rounded-full animate-spin" /> Processing...</>
                    ) : (
                      <>Buy Now <ArrowRight className="w-4 h-4" /></>
                    )}
                  </button>
                  <p className="text-center text-xs font-sans text-zinc-500 mt-4 flex justify-center items-center gap-1">
                    <ShieldCheck className="w-4 h-4" /> Secure Checkout via SSL
                  </p>
                </div>

                {/* RATINGS AND REVIEWS */}
                <div className="pt-12 border-t border-zinc-200 dark:border-zinc-800 mt-12">
                   <div className="flex justify-between items-center mb-6">
                      <h3 className="text-lg font-bold text-zinc-950 dark:text-white">Ratings and reviews</h3>
                   </div>
                   
                   <div className="flex items-start gap-4 mb-8 bg-zinc-50 dark:bg-zinc-900/40 p-6 rounded-2xl">
                      <div className="text-4xl font-bold text-zinc-950 dark:text-white">4.1</div>
                      <div>
                         <div className="flex text-amber-500 mb-1">
                          <Star className="w-4 h-4 fill-current" />
                          <Star className="w-4 h-4 fill-current" />
                          <Star className="w-4 h-4 fill-current" />
                          <Star className="w-4 h-4 fill-current" />
                          <Star className="w-4 h-4 text-zinc-300 dark:text-zinc-700" />
                         </div>
                         <p className="text-xs text-zinc-500 font-sans">based on 80 ratings by Verified Buyers</p>
                      </div>
                   </div>

                   <div className="space-y-6">
                      <div className="border-b border-zinc-100 dark:border-zinc-800 pb-6">
                         <div className="flex items-center gap-2 mb-2">
                           <div className="flex text-amber-500">
                              <Star className="w-3 h-3 fill-current" />
                              <Star className="w-3 h-3 fill-current" />
                              <Star className="w-3 h-3 fill-current" />
                              <Star className="w-3 h-3 text-zinc-300 dark:text-zinc-700" />
                              <Star className="w-3 h-3 text-zinc-300 dark:text-zinc-700" />
                           </div>
                           <span className="text-sm font-bold text-zinc-950 dark:text-white">Just okay</span>
                         </div>
                         <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">Good. Surprise gift to our Mgr for house warming.</p>
                         <div className="flex items-center gap-2 text-xs text-zinc-400">
                           <span className="font-bold text-zinc-500">Flipkart Customer</span>
                           <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700"></span>
                           <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-emerald-500" /> Verified Buyer</span>
                           <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700"></span>
                           <span>4 years ago</span>
                         </div>
                      </div>
                   </div>
                </div>

                {/* Q&A */}
                <div className="pt-8 border-t border-zinc-200 dark:border-zinc-800 mt-8 mb-16">
                   <div className="flex justify-between items-center mb-6">
                      <h3 className="text-lg font-bold text-zinc-950 dark:text-white">Questions and Answers</h3>
                   </div>

                   {/* Removed Post Question Box as requested */}
                   
                   <div className="space-y-4">
                      {/* Q1 */}
                      <div className="border border-zinc-100 dark:border-zinc-800 rounded-xl overflow-hidden bg-white dark:bg-zinc-950/50">
                        <button 
                          type="button" 
                          onClick={() => setExpandedQ(expandedQ === 1 ? null : 1)}
                          className="w-full flex justify-between items-center p-4 text-left hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors"
                        >
                          <span className="text-sm font-bold text-zinc-950 dark:text-white">Q: How do I redeem this digital gift card?</span>
                          <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform ${expandedQ === 1 ? 'rotate-180' : ''}`} />
                        </button>
                        {expandedQ === 1 && (
                          <div className="p-4 pt-0 border-t border-zinc-100 dark:border-zinc-800">
                             <div className="flex gap-3 mt-4">
                               <span className="font-bold text-zinc-500 min-w-[20px]">A:</span>
                               <div>
                                 <p className="text-sm text-zinc-600 dark:text-zinc-400">At checkout on DripHunter, select "Pay by Gift Card" and enter the 16-digit number and PIN you receive in your email.</p>
                                 <p className="text-xs text-zinc-400 mt-2 font-bold">DripHunter Support</p>
                               </div>
                             </div>
                          </div>
                        )}
                      </div>

                      {/* Q2 */}
                      <div className="border border-zinc-100 dark:border-zinc-800 rounded-xl overflow-hidden bg-white dark:bg-zinc-950/50">
                        <button 
                          type="button" 
                          onClick={() => setExpandedQ(expandedQ === 2 ? null : 2)}
                          className="w-full flex justify-between items-center p-4 text-left hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors"
                        >
                          <span className="text-sm font-bold text-zinc-950 dark:text-white">Q: Can I send this directly to a friend?</span>
                          <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform ${expandedQ === 2 ? 'rotate-180' : ''}`} />
                        </button>
                        {expandedQ === 2 && (
                          <div className="p-4 pt-0 border-t border-zinc-100 dark:border-zinc-800">
                             <div className="flex gap-3 mt-4">
                               <span className="font-bold text-zinc-500 min-w-[20px]">A:</span>
                               <div>
                                 <p className="text-sm text-zinc-600 dark:text-zinc-400">Yes! Just enter their name and email address in the delivery details section, and we'll email it directly to them instantly.</p>
                                 <p className="text-xs text-zinc-400 mt-2 font-bold">DripHunter Support</p>
                               </div>
                             </div>
                          </div>
                        )}
                      </div>
                   </div>
                </div>

              </form>
            </div>
            
          </div>
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
