"use client";

import React from "react";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import { useLiveChat } from "@/context/LiveChatContext";

export default function LiveChatPanel() {
  const { isMinimized } = useLiveChat();

  return (
    <div
      className={`fixed z-[100] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col bg-white dark:bg-zinc-950 shadow-2xl border border-zinc-200 dark:border-white/10
        ${isMinimized ? "opacity-0 translate-y-10 pointer-events-none" : "opacity-100 translate-y-0"}
        /* Mobile: full screen minus safe areas */
        bottom-0 right-0 w-full h-[100dvh] md:h-auto sm:rounded-none
        /* Desktop: fixed panel */
        md:bottom-24 md:right-6 md:w-[380px] lg:w-[400px] md:h-[600px] md:rounded-3xl
      `}
    >
      <ChatHeader />
      <ChatMessages />
      <ChatInput />
    </div>
  );
}
