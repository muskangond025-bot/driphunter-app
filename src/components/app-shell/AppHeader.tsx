"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/layout/Logo";

interface AppHeaderProps {
  title?: string;
  variant?: "main" | "contextual";
  rightAction?: React.ReactNode;
  fallbackUrl?: string; // used if direct-entry back fails
  onBack?: () => void; // override default back
}

export default function AppHeader({
  title,
  variant = "main",
  rightAction,
  fallbackUrl = "/mobile",
  onBack
}: AppHeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
      return;
    }
    // Very simple heuristic to check if we can go back in history.
    // In a real app we might track history in context, but for Phase 1 this is enough.
    // If we can't go back, we use the fallbackUrl.
    if (window.history.length > 2) {
      router.back();
    } else {
      router.push(fallbackUrl);
    }
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        "border-b border-border",
        // Safe area padding for top indicator on iOS
        "pt-[env(safe-area-inset-top)]"
      )}
    >
      <div className="flex h-14 items-center px-4 justify-between">
        {/* Left Side */}
        <div className="flex-1 flex items-center justify-start">
          {variant === "contextual" && (
            <Button
              variant="ghost"
              size="icon"
              className="-ml-2 shrink-0"
              onClick={handleBack}
              aria-label="Go back"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
          )}
        </div>

        {/* Center */}
        <div className="flex-[2] flex justify-center items-center truncate">
          {title ? (
            <h1 className="text-lg font-semibold truncate tracking-tight">{title}</h1>
          ) : (
            <Logo />
          )}
        </div>

        {/* Right Side */}
        <div className="flex-1 flex items-center justify-end">
          {rightAction}
        </div>
      </div>
    </header>
  );
}
