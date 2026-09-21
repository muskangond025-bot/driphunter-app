"use client";

import React from "react";
import { X, Minus, Sparkles } from "lucide-react";
import { useLiveChat } from "@/context/LiveChatContext";

export default function ChatHeader() {
  const { closeChat, minimizeChat } = useLiveChat();

  return (
    <div className="flex items-center justify-between px-5 py-4 bg-zinc-950 dark:bg-zinc-900 text-white rounded-t-2xl md:rounded-t-3xl shadow-md z-10 border-b border-white/10 shrink-0">
      <div className="flex items-center gap-3">
        <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-white/10 overflow-hidden border border-white/20">
          <Sparkles className="w-5 h-5 text-[#E6C280]" />
          {/* Online indicator dot */}
          <span className="absolute bottom-0.5 right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-zinc-950 rounded-full" />
        </div>
        <div className="flex flex-col">
          <h3 className="text-sm font-bold font-sans tracking-tight">DripHunter Support</h3>
          <p className="text-[10px] text-zinc-400 font-medium">Usually replies instantly</p>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <button
          onClick={minimizeChat}
          className="p-2 text-zinc-400 hover:text-white hover:bg-white/10 rounded-full transition-colors hidden md:flex focus:outline-none focus:bg-white/10"
          aria-label="Minimize chat"
        >
          <Minus className="w-4 h-4" />
        </button>
        <button
          onClick={closeChat}
          className="p-2 text-zinc-400 hover:text-white hover:bg-white/10 rounded-full transition-colors focus:outline-none focus:bg-white/10"
          aria-label="Close chat"
        >
          <X className="w-5 h-5 md:w-4 md:h-4" />
        </button>
      </div>
    </div>
  );
}
