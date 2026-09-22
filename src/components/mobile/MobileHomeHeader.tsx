"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MapPin, ChevronDown, Search, TicketPercent, CheckCircle2, Mic, Camera, Plus } from "lucide-react";
import { useAddress } from "@/context/AddressContext";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useRouter } from "next/navigation";
import DeliveryLocationSheet from "./DeliveryLocationSheet";

export default function MobileHomeHeader() {
  const router = useRouter();
  const { addresses, activeAddressId, setActiveAddress } = useAddress();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const activeAddress = addresses.find((a) => a.id === activeAddressId) || addresses[0];

  return (
    <div className="w-full bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md pt-[env(safe-area-inset-top)] pb-4 px-4 sm:px-5 z-40 sticky top-0 rounded-b-[2rem] shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)] border-b border-zinc-100 dark:border-zinc-900/80">
      {/* Top Row: Brand & Actions */}
      <div className="flex items-center justify-between mb-3 pt-1">
        
        {/* Brand Logo */}
        <Link href="/mobile" className="flex items-center gap-1 active:scale-95 transition-transform">
          <h1 className="font-playfair text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
            DRIP<span className="italic text-[#6F4E37] dark:text-[#E6C280] font-normal">HUNTER</span>
          </h1>
        </Link>

        {/* Right Actions (Location & Offers) */}
        <div className="flex items-center gap-3 sm:gap-4">
          <DeliveryLocationSheet triggerClassName="flex items-center gap-1.5 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors px-2.5 py-1.5 rounded-full text-[10px] sm:text-xs font-medium text-zinc-700 dark:text-zinc-200 focus:outline-none" />

          <Link 
            href="/offers" 
            className="relative p-1 transition-transform active:scale-90"
            aria-label="View Offers"
          >
            <TicketPercent className="w-5 h-5 sm:w-6 sm:h-6 text-zinc-700 dark:text-zinc-200" />
            <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-zinc-950"></span>
          </Link>
        </div>
      </div>

      {/* Bottom Row: Premium Search Bar */}
      <div className="flex items-center w-full mt-1">
        <div 
          onClick={() => router.push("/mobile/search")}
          className="flex-1 h-11 sm:h-12 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 rounded-xl flex items-center px-3.5 gap-3 transition-all active:scale-[0.98] shadow-sm hover:shadow-md cursor-pointer"
        >
          <Search className="w-4 h-4 sm:w-5 sm:h-5 text-[#6F4E37] dark:text-[#E6C280] shrink-0 pointer-events-none" />
          <span className="text-xs sm:text-[13px] text-zinc-400 dark:text-zinc-500 font-medium flex-1 truncate pointer-events-none">
            Search for sneakers, streetwear...
          </span>
          <div className="flex items-center gap-3 border-l border-zinc-200 dark:border-zinc-700 pl-3 shrink-0">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                router.push("/mobile/search?mode=voice");
              }}
              className="p-1 -m-1"
            >
              <Mic className="w-4 h-4 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors" />
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                router.push("/mobile/search?mode=image");
              }}
              className="p-1 -m-1"
            >
              <Camera className="w-4 h-4 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
