"use client";

import React, { useState } from "react";
import AppHeader from "@/components/app-shell/AppHeader";
import AppPageLayout from "@/components/app-shell/AppPageLayout";
import CuratedLookCard from "@/components/product/CuratedLookCard";
import { ARCHIVE_LOOKS } from "@/app/explore/page";
import { Sparkles } from "lucide-react";

export default function MobileExplorePage() {
  const [activeAesthetic, setActiveAesthetic] = useState("All");

  const filteredLooks =
    activeAesthetic === "All"
      ? ARCHIVE_LOOKS
      : ARCHIVE_LOOKS.filter((l) => l.category?.toLowerCase().includes(activeAesthetic.toLowerCase()));

  return (
    <AppPageLayout hasBottomNav={true}>
      <AppHeader variant="contextual" title="Style Archive" showActions={true} />
      <div className="flex flex-col min-h-screen bg-[#FAF8F5] dark:bg-zinc-950 pb-24 pt-4">
        
        {/* Aesthetic Filter Chips */}
        <div className="px-4 pb-4">
          <div className="flex overflow-x-auto hide-scrollbar gap-2 pb-1 items-center -mx-4 px-4">
            {["All", "Quiet Luxury", "Techwear", "Tokyo Minimalist", "Resort & Drapes"].map((aes) => (
              <button
                key={aes}
                onClick={() => setActiveAesthetic(aes)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-[11px] font-mono transition-colors ${
                  activeAesthetic === aes
                    ? "bg-[#6F4E37] text-white font-bold shadow-sm"
                    : "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 active:bg-zinc-50 dark:active:bg-zinc-800"
                }`}
              >
                {aes}
              </button>
            ))}
          </div>
        </div>

        {/* Header Text */}
        <div className="px-4 mb-6">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-3.5 h-3.5 text-[#6F4E37] dark:text-[#E6C280]" />
            <span className="text-[10px] font-semibold tracking-[0.25em] text-[#6F4E37] dark:text-[#E6C280] uppercase font-mono">
              Culture Circle Vault
            </span>
          </div>
          <p className="text-xs text-zinc-500 font-sans font-light">
            Curated head-to-toe runway ensembles & community looks.
          </p>
        </div>

        <div className="px-4 flex flex-col gap-6">
          {filteredLooks.map((look) => (
            <CuratedLookCard key={look.id} look={look} />
          ))}
        </div>
      </div>
    </AppPageLayout>
  );
}
