"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export default function MobileSplashPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      const isCompleted = localStorage.getItem("drip_onboarding_completed") === "true";
      if (isCompleted) {
        router.replace("/mobile");
      } else {
        router.replace("/mobile/onboarding");
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[100dvh] w-full bg-background transition-colors duration-300">
      <div 
        className={cn(
          "flex flex-col items-center transition-all duration-1000 ease-out",
          mounted ? "opacity-100 scale-100" : "opacity-0 scale-95"
        )}
      >
        <h1 className="font-playfair text-3xl font-bold tracking-tight text-zinc-900 dark:text-white mb-2">
          DRIP<span className="italic text-[#6F4E37] dark:text-[#E6C280] font-normal">HUNTER</span>
        </h1>
        <div className="w-12 h-[2px] bg-[#6F4E37] dark:bg-[#E6C280] rounded-full" />
      </div>
    </div>
  );
}
