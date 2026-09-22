"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Ticket, ChevronRight, CheckCircle2 } from "lucide-react";
import AppHeader from "@/components/app-shell/AppHeader";
import AppPageLayout from "@/components/app-shell/AppPageLayout";
import { useCart } from "@/context/CartContext";

interface Coupon {
  code: string;
  title: string;
  desc: string;
  type: string;
  badge?: string;
  productId: string;
}

export default function MobileCouponsPage() {
  const router = useRouter();
  const { cart } = useCart();
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [manualInput, setManualInput] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };
  
  // Read existing coupon state from localStorage (or default if we want to mimic cart logic)
  useEffect(() => {
    const saved = localStorage.getItem("driphunter_applied_coupon");
    if (saved) {
      setAppliedCoupon(saved);
    }
  }, []);

  const coupons: Coupon[] = [
    { 
      code: "DRIP10", 
      title: "Flat 10% Off", 
      desc: "Save 10% on your entire order. No minimum purchase required.", 
      type: "Special Discount",
      badge: "Popular",
      productId: "1"
    },
    { 
      code: "VIP15", 
      title: "Flat 15% Off", 
      desc: "Exclusive 15% discount for VIP members on all items.", 
      type: "Exclusive Brand discount",
      productId: "2"
    }
  ];

  const handleApply = (code: string) => {
    if (appliedCoupon === code) {
      // Remove it
      setAppliedCoupon(null);
      localStorage.removeItem("driphunter_applied_coupon");
      triggerToast("Coupon removed");
    } else {
      // Apply it
      setAppliedCoupon(code);
      localStorage.setItem("driphunter_applied_coupon", code);
      
      if (cart.length === 0) {
        // If cart is empty, show toast and go to home page to shop
        triggerToast("Coupon saved! Add products to cart to use it.");
        setTimeout(() => {
          router.push("/mobile");
        }, 1500);
      } else {
        // If cart has items, go to cart to see discount
        triggerToast("Coupon applied!");
        setTimeout(() => {
          router.push("/mobile/cart");
        }, 1000);
      }
    }
  };

  const handleManualApply = () => {
    const code = manualInput.trim().toUpperCase();
    if (!code) return;
    
    if (code === "DRIP10" || code === "VIP15") {
      setErrorMsg("");
      handleApply(code);
      setManualInput("");
    } else {
      setErrorMsg("Invalid coupon code.");
    }
  };

  return (
    <AppPageLayout hasBottomNav={false} className="bg-zinc-50 dark:bg-zinc-950">
      <AppHeader showActions={true}
        variant="contextual"
        title="Coupons & Offers"
        fallbackUrl="/mobile/account"
      />

      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-[100] bg-zinc-900 text-white px-4 py-2.5 rounded-full font-mono text-xs font-bold shadow-2xl flex items-center gap-2 animate-in slide-in-from-top-2 w-[90%] max-w-sm justify-center">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span className="truncate">{toastMsg}</span>
        </div>
      )}

      <div className="flex-1 overflow-y-auto pb-24 pt-4 px-4">
        
        {/* Manual Input */}
        <div className="mb-6 flex flex-col gap-1">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-2 flex items-center shadow-sm">
            <Ticket className="w-5 h-5 text-zinc-400 ml-2" />
            <input 
              type="text" 
              value={manualInput}
              onChange={(e) => setManualInput(e.target.value)}
              placeholder="Enter coupon code" 
              className="flex-1 bg-transparent px-3 py-2 text-sm outline-none font-mono uppercase text-zinc-900 dark:text-zinc-100 placeholder-zinc-400"
            />
            <button 
              onClick={handleManualApply}
              className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-widest px-4 py-2 hover:opacity-70 transition-opacity"
            >
              Apply
            </button>
          </div>
          {errorMsg && (
            <span className="text-xs font-bold text-rose-500 ml-2 animate-fade-in">{errorMsg}</span>
          )}
        </div>

        <h3 className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-widest mb-4">
          Available Offers
        </h3>

        <div className="flex flex-col gap-4">
          {coupons.map((coupon) => {
            const isApplied = appliedCoupon === coupon.code;
            return (
              <div 
                key={coupon.code} 
                className={`relative flex flex-col rounded-2xl border p-5 overflow-hidden transition-colors ${
                  isApplied 
                    ? "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/50" 
                    : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-sm"
                }`}
              >
                {/* Visual Notch Design (Ticket style) */}
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800"></div>
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800"></div>
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-zinc-50 dark:bg-zinc-950 z-10"></div>
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-zinc-50 dark:bg-zinc-950 z-10"></div>

                <div className="flex justify-between items-start mb-3 ml-4">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">{coupon.type}</span>
                    <h4 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 leading-tight">{coupon.title}</h4>
                  </div>
                  {coupon.badge && (
                    <span className="bg-[#6F4E37] dark:bg-[#E6C280] text-white dark:text-zinc-950 text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-full">
                      {coupon.badge}
                    </span>
                  )}
                </div>
                
                <p className="text-xs text-zinc-600 dark:text-zinc-400 ml-4 mb-3 pr-4">
                  {coupon.desc}
                </p>

                <button 
                  onClick={() => router.push(`/mobile/product/${coupon.productId}`)}
                  className="text-xs font-bold text-indigo-600 dark:text-indigo-400 ml-4 mb-4 text-left w-fit hover:underline"
                >
                  View Product ›
                </button>

                <div className="mt-auto pt-4 border-t border-dashed border-zinc-200 dark:border-zinc-800 ml-4 mr-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-bold text-zinc-900 dark:text-zinc-100 bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-lg border border-zinc-200 dark:border-zinc-700">
                      {coupon.code}
                    </span>
                  </div>
                  <button 
                    onClick={() => handleApply(coupon.code)}
                    className={`text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-lg transition-colors flex items-center gap-1 ${
                      isApplied 
                        ? "text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/50" 
                        : "text-[#6F4E37] dark:text-[#E6C280] bg-[#6F4E37]/10 dark:bg-[#E6C280]/10 hover:bg-[#6F4E37]/20 dark:hover:bg-[#E6C280]/20"
                    }`}
                  >
                    {isApplied ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" /> Applied
                      </>
                    ) : (
                      "Apply"
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </AppPageLayout>
  );
}
