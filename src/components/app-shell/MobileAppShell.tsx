"use client";

import React from "react";
import { cn } from "@/lib/utils";
import BottomNav from "./BottomNav";

interface MobileAppShellProps {
  children: React.ReactNode;
}

export default function MobileAppShell({ children }: MobileAppShellProps) {
  return (
    <div className={cn(
      "relative flex flex-col w-full bg-background min-h-[100dvh] overflow-hidden"
    )}>
      {/* 
        Main content wrapper 
        Using flex-1 so it takes remaining space if needed.
        Overflow handles vertical scrolling on the content, not the whole page.
      */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden relative flex flex-col pb-20">
        {children}
      </main>

      <BottomNav />
    </div>
  );
}
