"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Gift, CheckCircle2, Copy, Share2, Mail, User } from "lucide-react";
import AppHeader from "@/components/app-shell/AppHeader";
import AppPageLayout from "@/components/app-shell/AppPageLayout";
import { cn } from "@/lib/utils";

export default function MobileGiftCardsPage() {
  const router = useRouter();
  
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

  const designs = [
    { id: "Standard", name: "DripHunter Black", color: "bg-zinc-950", text: "text-white", border: "border-zinc-800", img: "https://images.unsplash.com/photo-1616423640778-28d1b53229bd?w=800&q=80" },
    { id: "Birthday", name: "Hype Birthday", color: "bg-[#6F4E37]", text: "text-white", border: "border-[#6F4E37]", img: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&q=80" },
    { id: "ThankYou", name: "Thank You", color: "bg-[#E6C280]", text: "text-zinc-950", border: "border-[#E6C280]", img: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&q=80" },
    { id: "Holiday", name: "Festive Drop", color: "bg-red-900", text: "text-[#f5f0eb]", border: "border-red-900", img: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=800&q=80" }
  ];

  const predefinedAmounts = [500, 1000, 2500, 5000, 10000];
  const displayAmount = amount === "Custom" ? (customAmount ? parseInt(customAmount) : 0) : amount;
  const currentDesign = designs.find(d => d.id === selectedDesign) || designs[0];

  const handlePurchase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipientName || !recipientEmail) return;
    setIsPurchasing(true);
    setTimeout(() => {
      setIsPurchasing(false);
      setPurchaseSuccess(true);
    }, 2000);
  };

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

  if (purchaseSuccess) {
    return (
      <AppPageLayout hasBottomNav={false} className="bg-zinc-50 dark:bg-zinc-950 flex flex-col justify-center">
        <div className="flex-1 flex flex-col items-center justify-center p-6 animate-fade-in text-center mt-[-10vh]">
          <div className="w-24 h-24 bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <h2 className="text-3xl font-chaney-title uppercase tracking-wider text-zinc-950 dark:text-white mb-3">
            Gift Sent!
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 font-sans leading-relaxed mb-8 text-sm">
            Your ₹{displayAmount.toLocaleString("en-IN")} gift card has been sent to {recipientEmail}. 
            A receipt has been sent to your registered email.
          </p>
          <button
            onClick={() => router.push("/mobile/account")}
            className="w-full max-w-xs bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 py-4 rounded-xl text-xs font-bold uppercase tracking-widest shadow-xl active:scale-95 transition-transform"
          >
            Back to Account
          </button>
        </div>
      </AppPageLayout>
    );
  }

  return (
    <AppPageLayout hasBottomNav={false} className="bg-zinc-50 dark:bg-zinc-950">
      <AppHeader showActions={true}
        variant="contextual"
        title="Gift Cards"
        fallbackUrl="/mobile/account"
        rightAction={
          <button onClick={handleShare} className="p-2 active:scale-90 transition-transform">
            <Share2 className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
          </button>
        }
      />

      <div className="flex-1 overflow-y-auto pb-32">
        {/* Card Preview Area */}
        <div className="w-full bg-zinc-100 dark:bg-zinc-900/50 p-6 flex items-center justify-center border-b border-zinc-200 dark:border-zinc-800">
          <div className={cn("w-full max-w-[320px] aspect-[1.6/1] rounded-2xl relative overflow-hidden shadow-2xl transition-all duration-500", currentDesign.color, currentDesign.border, "border-2")}>
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay transition-all duration-700" 
              style={{ backgroundImage: `url(${currentDesign.img})` }} 
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-black/60 mix-blend-multiply" />
            
            <div className="relative z-10 w-full h-full p-5 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <span className={cn("font-chaney-title uppercase tracking-widest text-xs", currentDesign.text)}>
                  DripHunter
                </span>
                <Gift className={cn("w-5 h-5", currentDesign.text, "opacity-70")} />
              </div>
              <div className="text-right">
                <span className={cn("font-mono text-[10px] tracking-widest block opacity-70 mb-1", currentDesign.text)}>DIGITAL GIFT CARD</span>
                <span className={cn("font-chaney-title text-2xl tracking-tighter", currentDesign.text)}>
                  ₹{displayAmount.toLocaleString("en-IN")}
                </span>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handlePurchase} className="p-4 space-y-8">
          
          {/* Section 1: Select Amount */}
          <section className="space-y-4">
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Select Amount</h3>
            <div className="grid grid-cols-3 gap-2">
              {predefinedAmounts.map(val => (
                <button
                  key={val}
                  type="button"
                  onClick={() => { setAmount(val); setCustomAmount(""); }}
                  className={cn(
                    "py-3 rounded-xl border text-sm font-bold transition-all active:scale-95",
                    amount === val 
                      ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900 shadow-md"
                      : "border-zinc-200 bg-white text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
                  )}
                >
                  ₹{val.toLocaleString("en-IN")}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setAmount("Custom")}
                className={cn(
                  "py-3 rounded-xl border text-sm font-bold transition-all active:scale-95",
                  amount === "Custom"
                    ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900 shadow-md"
                    : "border-zinc-200 bg-white text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
                )}
              >
                Custom
              </button>
            </div>
            {amount === "Custom" && (
              <div className="relative animate-in slide-in-from-top-2">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 font-bold">₹</span>
                <input
                  type="number"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full pl-8 pr-4 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm font-bold outline-none focus:border-zinc-900 dark:focus:border-zinc-100"
                />
              </div>
            )}
          </section>

          {/* Section 2: Choose Design */}
          <section className="space-y-4">
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Choose Design</h3>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
              {designs.map(design => (
                <button
                  key={design.id}
                  type="button"
                  onClick={() => setSelectedDesign(design.id)}
                  className={cn(
                    "flex-shrink-0 w-[120px] h-[80px] rounded-xl relative overflow-hidden transition-all",
                    design.color,
                    selectedDesign === design.id ? "ring-2 ring-offset-2 ring-zinc-900 dark:ring-zinc-100" : "opacity-70"
                  )}
                >
                  <div className="absolute inset-0 bg-cover bg-center mix-blend-overlay" style={{ backgroundImage: `url(${design.img})` }} />
                  <div className="absolute inset-0 flex items-center justify-center p-2 bg-black/30">
                    <span className="text-[10px] font-bold text-white text-center uppercase tracking-wider">{design.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* Section 3: Recipient Info */}
          <section className="space-y-4">
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Recipient Details</h3>
            <div className="space-y-3">
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input
                  type="text"
                  required
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder="Recipient Name"
                  className="w-full pl-11 pr-4 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm outline-none focus:border-zinc-900 dark:focus:border-zinc-100 text-zinc-900 dark:text-white"
                />
              </div>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input
                  type="email"
                  required
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                  placeholder="Recipient Email"
                  className="w-full pl-11 pr-4 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm outline-none focus:border-zinc-900 dark:focus:border-zinc-100 text-zinc-900 dark:text-white"
                />
              </div>
              <input
                type="text"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder="Your Name (Optional)"
                className="w-full px-4 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm outline-none focus:border-zinc-900 dark:focus:border-zinc-100 text-zinc-900 dark:text-white"
              />
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Add a personal message... (Optional)"
                rows={3}
                className="w-full px-4 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm outline-none focus:border-zinc-900 dark:focus:border-zinc-100 text-zinc-900 dark:text-white resize-none"
              />
            </div>
          </section>

          {/* Sticky CTA */}
          <div className="fixed bottom-0 left-0 w-full bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 p-4 z-40 pb-[env(safe-area-inset-bottom)]">
            <button
              type="submit"
              disabled={isPurchasing || !recipientName || !recipientEmail || displayAmount <= 0}
              className="w-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 py-4 rounded-xl text-xs font-bold uppercase tracking-widest shadow-xl flex items-center justify-center gap-2 active:scale-95 transition-transform disabled:opacity-50 disabled:active:scale-100"
            >
              {isPurchasing ? (
                <>Processing...</>
              ) : (
                <>
                  Buy For ₹{displayAmount.toLocaleString("en-IN")}
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </AppPageLayout>
  );
}
