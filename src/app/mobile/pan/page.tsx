"use client";

import React, { useState, useEffect } from "react";
import AppHeader from "@/components/app-shell/AppHeader";
import AppPageLayout from "@/components/app-shell/AppPageLayout";
import { IdCard } from "lucide-react";

export default function MobilePanPage() {
  const [panNumber, setPanNumber] = useState("");
  const [panName, setPanName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("drip_pan_data");
      if (saved) {
        const data = JSON.parse(saved);
        setPanNumber(data.panNumber || "");
        setPanName(data.name || "");
        setIsSaved(true);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!panNumber || !panName) return;
    
    localStorage.setItem("drip_pan_data", JSON.stringify({ panNumber, name: panName }));
    setIsSaved(true);
    setIsEditing(false);
  };

  const getMaskedPan = (pan: string) => {
    if (pan.length < 10) return pan;
    return `${pan.substring(0, 5)}••••${pan.substring(9)}`;
  };

  return (
    <AppPageLayout hasBottomNav={false} className="bg-zinc-50 dark:bg-zinc-950">
      <AppHeader showActions={true}
        variant="contextual"
        title="PAN Card Information"
        fallbackUrl="/mobile/account"
      />
      <div className="p-4 mt-4 max-w-md mx-auto w-full">
        {!isSaved || isEditing ? (
          <form onSubmit={handleSave} className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col gap-5 animate-in fade-in">
            <div className="flex flex-col items-center justify-center mb-2">
              <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-3">
                <IdCard className="w-8 h-8 text-zinc-400" />
              </div>
              <h2 className="text-lg font-bold text-zinc-900 dark:text-white text-center">Add PAN Details</h2>
              <p className="text-xs text-zinc-500 text-center mt-1">To unlock higher wallet limits and refunds.</p>
            </div>
            
            <div className="space-y-4">
              <input
                type="text"
                maxLength={10}
                required
                value={panNumber}
                onChange={(e) => setPanNumber(e.target.value.toUpperCase())}
                placeholder="PAN Number (e.g. ABCDE1234F)"
                className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm outline-none focus:border-zinc-900 dark:focus:border-zinc-100 font-mono uppercase"
              />
              <input
                type="text"
                required
                value={panName}
                onChange={(e) => setPanName(e.target.value.toUpperCase())}
                placeholder="Name as per PAN"
                className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm outline-none focus:border-zinc-900 dark:focus:border-zinc-100 uppercase"
              />
            </div>
            
            <div className="flex gap-3 mt-2">
              {isSaved && (
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="w-1/2 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 text-sm font-bold text-zinc-600 dark:text-zinc-400"
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                disabled={!panNumber || !panName}
                className={`${isSaved ? 'w-1/2' : 'w-full'} py-3 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-sm font-bold disabled:opacity-50`}
              >
                Save PAN
              </button>
            </div>
          </form>
        ) : (
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col gap-4 animate-in fade-in">
             <div className="flex justify-between items-start">
               <div className="flex items-center gap-3">
                 <div className="w-12 h-10 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center">
                   <IdCard className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                 </div>
                 <div>
                   <h3 className="text-sm font-bold text-zinc-900 dark:text-white">PAN Verified</h3>
                   <p className="text-xs text-zinc-500">Your details are secure.</p>
                 </div>
               </div>
               <button 
                 onClick={() => setIsEditing(true)}
                 className="text-xs font-bold text-indigo-600 dark:text-indigo-400"
               >
                 Edit
               </button>
             </div>
             
             <div className="bg-zinc-50 dark:bg-zinc-950 p-4 rounded-2xl border border-zinc-100 dark:border-zinc-800 space-y-3 mt-2">
               <div>
                 <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-400 block mb-1">PAN Number</span>
                 <span className="text-sm font-mono font-bold text-zinc-900 dark:text-white">{getMaskedPan(panNumber)}</span>
               </div>
               <div>
                 <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-400 block mb-1">Name</span>
                 <span className="text-sm font-bold text-zinc-900 dark:text-white uppercase">{panName}</span>
               </div>
             </div>
          </div>
        )}
      </div>
    </AppPageLayout>
  );
}
