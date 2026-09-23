"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function MobileOnboardingPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSkip = () => {
    localStorage.setItem("drip_onboarding_completed", "true");
    router.replace("/mobile");
  };

  const handleGetStarted = () => {
    router.push("/mobile/preferences");
  };

  return (
    <div className="relative flex flex-col min-h-[100dvh] w-full bg-zinc-950 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/shop_hero_dark_model.jpg" 
          alt="Streetwear Model"
          className="w-full h-full object-cover object-center opacity-80"
        />
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-transparent" />
      </div>

      {/* Content */}
      <div 
        className={cn(
          "relative z-10 flex flex-col justify-end flex-1 px-6 pb-12 transition-all duration-1000 delay-300",
          mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        )}
      >
        <div className="flex flex-col gap-4 mb-10">
          <h1 className="font-playfair text-4xl sm:text-5xl font-bold tracking-tight text-white leading-[1.1]">
            YOUR STYLE.<br />
            <span className="italic font-normal text-[#E6C280]">YOUR DROP.</span>
          </h1>
          <p className="text-zinc-300 font-sans text-sm sm:text-base max-w-[280px] leading-relaxed">
            Discover sneakers, apparel & accessories made for your style.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <button 
            onClick={handleGetStarted}
            className="group flex items-center justify-center gap-3 bg-white text-zinc-950 px-8 py-4 rounded-full font-mono text-xs font-bold uppercase tracking-[0.2em] w-full active:scale-95 transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:shadow-[0_0_50px_rgba(255,255,255,0.25)]"
          >
            <span>Get Started</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button 
            onClick={handleSkip}
            className="px-8 py-3 text-zinc-400 font-sans text-sm font-medium active:text-white transition-colors"
          >
            Skip
          </button>
        </div>
      </div>
    </div>
  );
}
