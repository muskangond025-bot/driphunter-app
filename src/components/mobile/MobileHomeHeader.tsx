"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MapPin, ChevronDown, Search, TicketPercent, CheckCircle2, Mic, Camera } from "lucide-react";
import { useAddress } from "@/context/AddressContext";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export default function MobileHomeHeader() {
  const { addresses, activeAddressId, setActiveAddress } = useAddress();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const activeAddress = addresses.find((a) => a.id === activeAddressId) || addresses[0];

  return (
    <div className="w-full bg-white dark:bg-zinc-950 pt-[env(safe-area-inset-top)] pb-5 px-5 z-40 sticky top-0 rounded-b-3xl shadow-sm border-b border-zinc-100 dark:border-zinc-900/50">
      {/* Top Row: Location Selector */}
      <div className="flex items-center justify-between mb-3 pt-2">
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <button className="flex items-center gap-1.5 focus:outline-none group">
              <MapPin className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400 shrink-0" />
              <div className="flex items-center gap-1.5">
                <span className="font-medium text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 truncate max-w-[150px] sm:max-w-[200px]">
                  {activeAddress ? `${activeAddress.locality}` : "Select Delivery Location"}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-600 transition-colors" />
              </div>
            </button>
          </SheetTrigger>
          <SheetContent side="bottom" className="rounded-t-2xl px-0 pb-6 max-h-[80vh] overflow-y-auto">
            <SheetHeader className="px-5 mb-4 text-left">
              <SheetTitle>Select Delivery Location</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-0">
              {addresses.map((address) => (
                <button
                  key={address.id}
                  onClick={() => {
                    setActiveAddress(address.id);
                    setIsSheetOpen(false);
                  }}
                  className={`w-full flex items-start gap-4 px-5 py-4 border-b border-border hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors text-left ${activeAddressId === address.id ? "bg-zinc-50 dark:bg-zinc-900/50" : ""}`}
                >
                  <MapPin className={`w-5 h-5 shrink-0 mt-0.5 ${activeAddressId === address.id ? "text-zinc-900 dark:text-white" : "text-zinc-400"}`} />
                  <div className="flex-1 flex flex-col">
                    <span className="font-semibold text-sm text-zinc-900 dark:text-white flex items-center gap-2">
                      {address.type} {activeAddressId === address.id && <CheckCircle2 className="w-4 h-4 text-green-500" />}
                    </span>
                    <span className="text-xs text-zinc-500 mt-1 line-clamp-2">
                      {address.address}, {address.locality}, {address.city}, {address.state} - {address.pincode}
                    </span>
                  </div>
                </button>
              ))}
            </div>
            <div className="px-5 mt-6">
              <Link href="/mobile/account" onClick={() => setIsSheetOpen(false)} className="w-full block text-center rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-semibold text-sm py-3.5 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors">
                Add New Address
              </Link>
            </div>
          </SheetContent>
        </Sheet>
        {/* Top Right: Offer / Coupon Icon */}
        <Link 
          href="/offers" 
          className="w-8 h-8 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center justify-center transition-colors text-zinc-600 dark:text-zinc-300"
          aria-label="View Offers and Coupons"
        >
          <TicketPercent className="w-4 h-4" />
        </Link>
      </div>

      {/* Bottom Row: Search Bar */}
      <div className="flex items-center">
        <Link 
          href="/mobile/search" 
          className="flex-1 h-12 bg-zinc-100/80 dark:bg-zinc-900 rounded-full flex items-center px-4 gap-2.5 transition-colors group"
        >
          <Search className="w-4 h-4 text-zinc-400" />
          <span className="text-[13px] text-zinc-400 dark:text-zinc-500 font-medium flex-1 truncate">
            Explore vintage, streetwear...
          </span>
          <div className="flex items-center gap-2.5 text-zinc-400">
            <Mic className="w-4 h-4" />
            <Camera className="w-4 h-4" />
          </div>
        </Link>
      </div>
    </div>
  );
}
