"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function DelayedLoginModal() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Check if user is logged in
    const savedUser = localStorage.getItem("drip_user");
    if (savedUser) return; // User is logged in

    // Check cooldown (7 days)
    const dismissedAtStr = localStorage.getItem("drip_login_prompt_dismissed_at");
    if (dismissedAtStr) {
      const dismissedAt = parseInt(dismissedAtStr, 10);
      const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;
      if (Date.now() - dismissedAt < SEVEN_DAYS_MS) {
        return; // In cooldown
      }
    }

    // Timer for 45 seconds
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 45000);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsOpen(false);
    localStorage.setItem("drip_login_prompt_dismissed_at", Date.now().toString());
  };

  if (!mounted || !isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="w-full max-w-sm bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 sm:rounded-3xl rounded-t-3xl sm:rounded-b-3xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-full sm:slide-in-from-bottom-10 duration-500 max-h-[90dvh] flex flex-col">
        
        {/* Close Button */}
        <div className="flex justify-end p-4 pb-0 relative z-10">
          <button 
            onClick={handleDismiss}
            className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="px-8 pb-10 flex flex-col items-center text-center -mt-2">
          {/* Visual Element */}
          <div className="w-16 h-16 bg-[#6F4E37]/10 dark:bg-[#E6C280]/10 rounded-2xl flex items-center justify-center mb-6">
            <span className="font-playfair text-2xl font-bold italic text-[#6F4E37] dark:text-[#E6C280]">DH</span>
          </div>

          <h2 className="font-playfair text-2xl font-bold tracking-tight text-zinc-900 dark:text-white mb-3">
            UNLOCK YOUR<br />DRIPHUNTER EXPERIENCE
          </h2>
          
          <p className="text-zinc-500 dark:text-zinc-400 font-sans text-sm mb-8 leading-relaxed max-w-[280px]">
            Save your wishlist, track orders and enjoy a faster checkout.
          </p>

          <div className="w-full flex flex-col gap-3">
            <button 
              onClick={() => router.push("/mobile/login")}
              className="w-full bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 py-4 rounded-full font-mono text-[11px] font-bold uppercase tracking-[0.2em] shadow-xl active:scale-95 transition-transform"
            >
              SIGN IN
            </button>
            <button 
              onClick={() => router.push("/mobile/signup")}
              className="w-full bg-transparent border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white py-4 rounded-full font-mono text-[11px] font-bold uppercase tracking-[0.2em] active:bg-zinc-50 dark:active:bg-zinc-900 transition-colors"
            >
              CREATE ACCOUNT
            </button>
          </div>
          
          <button 
            onClick={handleDismiss}
            className="mt-6 text-sm font-medium text-zinc-400 dark:text-zinc-500 active:text-zinc-600 dark:active:text-zinc-300 font-sans transition-colors"
          >
            Maybe later
          </button>
        </div>

      </div>
    </div>
  );
}
