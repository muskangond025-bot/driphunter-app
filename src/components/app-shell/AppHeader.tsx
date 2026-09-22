"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Search, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/layout/Logo";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/CartContext";

interface AppHeaderProps {
  title?: React.ReactNode;
  variant?: "main" | "contextual";
  rightAction?: React.ReactNode;
  fallbackUrl?: string; // used if direct-entry back fails
  onBack?: () => void; // override default back
  showActions?: boolean; // if true, shows search and cart icons
}

export default function AppHeader({
  title,
  variant = "main",
  rightAction,
  fallbackUrl = "/mobile",
  onBack,
  showActions = false
}: AppHeaderProps) {
  const router = useRouter();
  const { cart } = useCart();
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

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
            typeof title === 'string' ? <h1 className="text-lg font-semibold truncate tracking-tight">{title}</h1> : title
          ) : (
            <Logo />
          )}
        </div>

        {/* Right Side */}
        <div className="flex-1 flex items-center justify-end gap-1">
          {rightAction ? (
            rightAction
          ) : showActions ? (
            <>
              <Link href="/mobile/search">
                <Button variant="ghost" size="icon" className="shrink-0 rounded-full h-10 w-10">
                  <Search className="h-5 w-5 text-zinc-700 dark:text-zinc-300" />
                </Button>
              </Link>
              <Link href="/mobile/cart" className="relative">
                <Button variant="ghost" size="icon" className="shrink-0 rounded-full h-10 w-10">
                  <ShoppingBag className="h-5 w-5 text-zinc-700 dark:text-zinc-300" />
                </Button>
                {cartCount > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute top-1.5 right-1.5 px-1.5 py-0.5 text-[10px] min-w-4 h-4 flex items-center justify-center rounded-full pointer-events-none"
                  >
                    {cartCount}
                  </Badge>
                )}
              </Link>
            </>
          ) : null}
        </div>
      </div>
    </header>
  );
}
