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
      "relative flex flex-col w-full bg-background min-h-[100dvh]",
      !isFirstLaunchFlow && "pb-20" // reserve space for bottom nav (h-16 + spacing)
    )}>
      {/* 
        Main content wrapper 
        Using native body scrolling instead of internal overflow.
      */}
      <main className="flex-1 relative flex flex-col w-full overflow-x-hidden">
        {/* We allow rendering children to preserve SSR, aware there might be a brief flash on initial load if redirecting */}
        {children}
      </main>

      {!isFirstLaunchFlow && mounted && <BottomNav />}
    </div>
  );
}
