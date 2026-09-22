"use client";

import React from "react";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import { useLiveChat } from "@/context/LiveChatContext";
import { usePathname } from "next/navigation";

export default function LiveChatPanel() {
  const { isMinimized } = useLiveChat();
  const pathname = usePathname();
  const isMobileRoute = pathname?.startsWith("/mobile");

  return (
    <div
      className={`fixed z-[200] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col bg-white dark:bg-zinc-950 shadow-[0_-10px_40px_rgba(0,0,0,0.15)] dark:shadow-[0_-10px_40px_rgba(0,0,0,0.5)] border border-zinc-200 dark:border-white/10 overflow-hidden
        ${isMinimized ? "opacity-0 translate-y-10 pointer-events-none" : "opacity-100 translate-y-0"}
        ${isMobileRoute 
          ? "bottom-0 left-0 right-0 w-full h-[65dvh] rounded-t-3xl pb-[env(safe-area-inset-bottom)]" 
          : "bottom-0 right-0 w-full h-[100dvh] md:h-auto sm:rounded-none md:bottom-24 md:right-6 md:w-[380px] lg:w-[400px] md:h-[600px] md:rounded-3xl"}
      `}
    >
      <ChatHeader />
      <ChatMessages />
      <ChatInput />
    </div>
  );
}
