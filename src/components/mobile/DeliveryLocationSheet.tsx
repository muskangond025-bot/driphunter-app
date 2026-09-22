"use client";

import React, { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { MapPin, ChevronDown, Plus, Loader2, Check } from "lucide-react";
import { useAddress, AddressType } from "@/context/AddressContext";

interface DeliveryLocationSheetProps {
  triggerClassName?: string;
  children?: React.ReactNode;
}

export default function DeliveryLocationSheet({ triggerClassName, children }: DeliveryLocationSheetProps) {
  const { addAddress, activeAddressId, addresses } = useAddress();
  const activeAddress = addresses.find((a) => a.id === activeAddressId);

  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState("");
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const saveToGlobalAddresses = (locationStr: string) => {
    addAddress({
      name: "Mobile User",
      phone: "-",
      pincode: "-",
      locality: locationStr,
      address: locationStr,
      city: "-",
      state: "-",
      type: "OTHER" as AddressType,
    });
  };

  const handleLocate = () => {
    setIsLocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setTimeout(() => {
            setIsLocating(false);
            saveToGlobalAddresses("Current Location (Detected)");
            showToast("Location updated successfully!");
            setIsSheetOpen(false);
          }, 800);
        },
        (error) => {
          setIsLocating(false);
          showToast("Failed to detect location.");
        }
      );
    } else {
      setIsLocating(false);
      showToast("Geolocation not supported.");
    }
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (newAddress.trim()) {
      saveToGlobalAddresses(newAddress);
      setNewAddress("");
      setShowAddressForm(false);
      setIsSheetOpen(false);
      showToast("Address added successfully!");
    }
  };

  return (
    <>
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-[150] bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 px-4 py-2.5 rounded-full font-mono text-xs font-bold shadow-2xl flex items-center gap-2 animate-in slide-in-from-top-2 w-[90%] max-w-sm">
          <Check className="w-4 h-4 text-emerald-400" />
          <span className="truncate">{toastMsg}</span>
        </div>
      )}

      <Sheet open={isSheetOpen} onOpenChange={(open) => {
        setIsSheetOpen(open);
        if (!open) {
          setTimeout(() => setShowAddressForm(false), 300);
        }
      }}>
        <SheetTrigger asChild>
          {children ? (
            children
          ) : (
            <button className={triggerClassName || "flex items-center gap-1.5 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors px-3 py-2 rounded-full text-[11px] font-medium text-zinc-700 dark:text-zinc-200 focus:outline-none"}>
              <MapPin className="w-3.5 h-3.5 text-[#6F4E37] dark:text-[#E6C280] shrink-0" />
              <span className="truncate max-w-[150px]">{activeAddress ? activeAddress.locality : "Select Delivery Location"}</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-70 shrink-0" />
            </button>
          )}
        </SheetTrigger>
        <SheetContent side="bottom" className="rounded-t-3xl px-0 pb-6 max-h-[85vh] overflow-y-auto">
          <SheetHeader className="px-5 mb-4 text-left">
            <SheetTitle className="font-sans font-bold text-lg text-zinc-900 dark:text-white">
              {showAddressForm ? "Add New Address" : "Select Delivery Location"}
            </SheetTitle>
          </SheetHeader>
          <div className="px-5">
            {!showAddressForm ? (
              <>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6 font-sans">
                  Select a location to see product availability and delivery options.
                </p>
                <div className="space-y-3">
                  <button 
                    onClick={handleLocate}
                    disabled={isLocating}
                    className="w-full text-left p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 flex items-center gap-4 hover:border-[#6F4E37] dark:hover:border-[#E6C280] transition-colors active:bg-zinc-50 dark:active:bg-zinc-900 disabled:opacity-70"
                  >
                    {isLocating ? (
                      <Loader2 className="w-5 h-5 text-[#6F4E37] dark:text-[#E6C280] animate-spin shrink-0" />
                    ) : (
                      <MapPin className="w-5 h-5 text-[#6F4E37] dark:text-[#E6C280] shrink-0" />
                    )}
                    <div>
                      <p className="font-bold text-zinc-900 dark:text-white text-sm font-sans">
                        {isLocating ? "Detecting..." : "Current Location"}
                      </p>
                      <p className="text-xs text-zinc-500 font-sans mt-0.5">Using GPS</p>
                    </div>
                  </button>
                  <button 
                    onClick={() => setShowAddressForm(true)}
                    className="w-full text-left p-4 rounded-xl border border-dashed border-zinc-300 dark:border-zinc-700 flex items-center gap-4 hover:border-[#6F4E37] dark:hover:border-[#E6C280] transition-colors bg-zinc-50/50 dark:bg-zinc-900/50 active:bg-zinc-100 dark:active:bg-zinc-800"
                  >
                    <div className="w-6 h-6 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center shrink-0">
                      <Plus className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
                    </div>
                    <span className="font-bold text-zinc-700 dark:text-zinc-300 text-sm font-sans">Add New Address</span>
                  </button>
                </div>
              </>
            ) : (
              <form onSubmit={handleAddAddress} className="space-y-4 animate-in fade-in zoom-in-95 duration-200">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5 uppercase tracking-wider">
                    Enter Address or Pincode
                  </label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. 10001 or New York"
                    value={newAddress}
                    onChange={(e) => setNewAddress(e.target.value)}
                    className="w-full h-11 px-4 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-transparent focus:border-[#6F4E37]/30 dark:focus:border-[#E6C280]/30 outline-none text-sm text-zinc-950 dark:text-white transition-all shadow-sm"
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <button 
                    type="button"
                    onClick={() => setShowAddressForm(false)}
                    className="flex-1 px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 font-semibold text-zinc-700 dark:text-zinc-300 text-sm active:bg-zinc-50 dark:active:bg-zinc-900"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 px-4 py-3 rounded-xl bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 font-semibold text-sm active:scale-[0.98] transition-transform"
                  >
                    Apply
                  </button>
                </div>
              </form>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
