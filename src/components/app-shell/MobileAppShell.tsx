"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import BottomNav from "./BottomNav";
import { usePathname, useRouter } from "next/navigation";

interface MobileAppShellProps {
  children: React.ReactNode;
}

export default function MobileAppShell({ children }: MobileAppShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (pathname === "/mobile") {
      const isCompleted = localStorage.getItem("drip_onboarding_completed") === "true";
      if (!isCompleted) {
        router.replace("/mobile/splash");
      }
    }
  }, [pathname, router]);

  const isFirstLaunchFlow = pathname === "/mobile/splash" || pathname === "/mobile/onboarding" || pathname === "/mobile/preferences";

  return (
    <div className={cn(
      "relative flex flex-col w-full bg-background min-h-[100dvh] overflow-hidden"
    )}>
      {/* 
        Main content wrapper 
        Using flex-1 so it takes remaining space if needed.
        Overflow handles vertical scrolling on the content, not the whole page.
      */}
      <main className={cn(
        "flex-1 overflow-y-auto overflow-x-hidden relative flex flex-col",
        !isFirstLaunchFlow && "pb-20"
      )}>
        {/* We allow rendering children to preserve SSR, aware there might be a brief flash on initial load if redirecting */}
        {children}
      </main>

      {!isFirstLaunchFlow && mounted && <BottomNav />}
    </div>
  );
}
