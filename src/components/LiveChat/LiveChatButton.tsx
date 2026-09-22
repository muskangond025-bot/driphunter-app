"use client";

import React from "react";
import { MessageSquare, X } from "lucide-react";
import { useLiveChat } from "@/context/LiveChatContext";
import { usePathname } from "next/navigation";

export default function LiveChatButton() {
  const { isOpen, openChat, closeChat, unreadCount } = useLiveChat();
  const pathname = usePathname();

  // Mobile routing rules
  const isMobileRoute = pathname?.startsWith("/mobile");
  
  // Exclude these routes completely from showing the FAB
  const isExcludedRoute = pathname?.includes("/checkout") || pathname?.includes("/order-success");

  // Determine bottom spacing based on route
  const isBottomNavRoute = isMobileRoute && [
    "/mobile", "/mobile/categories", "/mobile/search", "/mobile/shop", 
    "/mobile/account", "/mobile/orders", "/mobile/wishlist", 
    "/mobile/notifications", "/mobile/addresses", "/mobile/coupons", 
    "/mobile/gift-cards"
  ].some(route => pathname === route || pathname?.startsWith(route + "/"));

  const isStickyCTARoute = isMobileRoute && (pathname?.includes("/product/") || pathname?.endsWith("/cart"));

  if (isExcludedRoute) return null;
  if (isMobileRoute && isOpen) return null; // Hide FAB on mobile when chat is open

  // Desktop positioning: bottom-6 right-6
  // Mobile positioning: bottom-[calc(84px+env(safe-area-inset-bottom))] for standard BottomNav routes
  // Mobile positioning: bottom-[calc(132px+env(safe-area-inset-bottom))] for Product/Cart routes
  
  const mobileBottomPosition = isStickyCTARoute 
    ? "calc(132px + env(safe-area-inset-bottom))" 
    : "calc(84px + env(safe-area-inset-bottom))";

  return (
    <div 
      className={`fixed right-4 md:bottom-6 md:right-6 z-[100] ${isMobileRoute ? "block md:hidden" : "hidden md:block"}`}
      style={isMobileRoute ? { bottom: mobileBottomPosition } : undefined}
    >
      <button
        onClick={isOpen ? closeChat : openChat}
        aria-label={isOpen ? "Close live chat" : "Open live chat"}
        className={`group relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full shadow-2xl transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-900 dark:focus:ring-white ${
          isOpen
            ? "bg-zinc-100 hover:bg-zinc-200 text-zinc-900 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-white"
            : "bg-zinc-950 hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-zinc-200 dark:text-zinc-950"
        } hover:scale-105 active:scale-95`}
      >
        <div className="relative">
          {isOpen ? (
            <X className="w-6 h-6 md:w-7 md:h-7 transition-transform duration-300 rotate-0" />
          ) : (
            <MessageSquare className="w-6 h-6 md:w-7 md:h-7 transition-transform duration-300" />
          )}
          
          {/* Unread Badge */}
          {!isOpen && unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-red-500 text-white text-[10px] font-bold border-2 border-zinc-950 dark:border-white animate-in zoom-in">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </div>
      </button>
    </div>
  );
}
