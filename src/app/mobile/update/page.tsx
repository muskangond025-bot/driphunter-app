"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { DownloadCloud, ArrowRight, Zap, AlertCircle } from "lucide-react";
import AppPageLayout from "@/components/app-shell/AppPageLayout";
import AppHeader from "@/components/app-shell/AppHeader";

export default function MobileUpdatePage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateMessage, setUpdateMessage] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleUpdate = () => {
    setIsUpdating(true);
    setUpdateMessage(null);
    
    // Simulate a brief delay then show the neutral UI state
    // We explicitly do NOT fake a successful update, as per requirements
    setTimeout(() => {
      setIsUpdating(false);
      setUpdateMessage("App distribution service is currently pending integration. Real updates will be supported soon.");
    }, 1200);
  };

  const handleLater = () => {
    // If the user opened this directly, window.history.length is likely 1 or 2
    if (window.history.length > 2) {
      router.back();
    } else {
      router.replace("/mobile");
    }
  };

  if (!mounted) return null;

  return (
    <AppPageLayout hasBottomNav={false}>
      <AppHeader variant="contextual" title="App Update" fallbackUrl="/mobile" />
      
      <div className="flex flex-col min-h-screen bg-white dark:bg-zinc-950 px-6 pt-12 pb-24 text-center items-center">
        
        <div className="w-24 h-24 bg-zinc-100 dark:bg-zinc-900 rounded-full flex items-center justify-center mb-8 relative border border-zinc-200 dark:border-zinc-800 animate-in zoom-in-95 duration-500">
          <DownloadCloud className="w-10 h-10 text-[#6F4E37] dark:text-[#E6C280]" />
          <div className="absolute -top-1 -right-1 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center border-2 border-white dark:border-zinc-950 shadow-sm">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
          </div>
        </div>

        <h1 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white font-sans uppercase mb-4 animate-in fade-in slide-in-from-bottom-2 duration-500 delay-100 fill-mode-both">
          New Version<br/>Available
        </h1>
        
        <p className="text-sm text-zinc-500 dark:text-zinc-400 font-sans leading-relaxed max-w-[280px] mx-auto mb-10 animate-in fade-in slide-in-from-bottom-2 duration-500 delay-150 fill-mode-both">
          Update DripHunter to get the latest improvements, fixes, and features for a premium shopping experience.
        </p>

        {updateMessage && (
          <div className="w-full max-w-sm mb-6 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 px-4 py-3 rounded-xl flex items-start gap-3 animate-in fade-in zoom-in-95 duration-300 text-left">
            <AlertCircle className="w-4 h-4 text-zinc-500 dark:text-zinc-400 shrink-0 mt-0.5" />
            <p className="text-xs text-zinc-600 dark:text-zinc-400 font-medium font-sans leading-relaxed">
              {updateMessage}
            </p>
          </div>
        )}

        <div className="w-full max-w-sm mt-auto space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300 fill-mode-both flex flex-col items-center">
          
          <button
            onClick={handleUpdate}
            disabled={isUpdating}
            className="w-full bg-[#6F4E37] dark:bg-[#E6C280] text-white dark:text-zinc-950 h-14 rounded-full font-bold active:scale-[0.98] transition-all disabled:opacity-70 disabled:active:scale-100 flex justify-center items-center gap-2 shadow-xl shadow-[#6F4E37]/20 uppercase tracking-widest text-[11px] font-mono group"
          >
            {isUpdating ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 dark:border-zinc-950/30 border-t-white dark:border-t-zinc-950 rounded-full animate-spin" />
                Preparing...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                UPDATE NOW
              </span>
            )}
          </button>

          <button
            onClick={handleLater}
            disabled={isUpdating}
            className="w-full h-14 rounded-full font-mono text-[11px] font-bold uppercase tracking-widest text-zinc-500 active:text-zinc-900 dark:active:text-zinc-100 transition-colors disabled:opacity-50"
          >
            LATER
          </button>

        </div>
      </div>
    </AppPageLayout>
  );
}
