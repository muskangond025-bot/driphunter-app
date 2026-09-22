"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutGrid, Search, ShoppingBag, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/CartContext";

const LEVEL_1_ROUTES = [
  "/mobile",
  "/mobile/categories",
  "/mobile/search",
  "/mobile/cart",
  "/mobile/account",
];

export default function BottomNav() {
  const pathname = usePathname();
  const { cart } = useCart();
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const isVisible = LEVEL_1_ROUTES.includes(pathname);
  
  const [langCode, setLangCode] = useState<"en" | "hi">("en");

  useEffect(() => {
    const savedCode = localStorage.getItem("driphunter_language");
    if (savedCode === "hi") {
      setLangCode("hi");
    } else {
      setLangCode("en");
    }
  }, []);

  if (!isVisible) return null;

  const translations = {
    en: {
      Home: "Home",
      Categories: "Categories",
      Search: "Search",
      Cart: "Cart",
      Account: "Account",
    },
    hi: {
      Home: "होम",
      Categories: "केटेगरीज",
      Search: "खोजें",
      Cart: "कार्ट",
      Account: "प्रोफाइल",
    }
  };

  const t = (key: keyof typeof translations.en) => {
    return translations[langCode][key] || translations.en[key];
  };

  const tabs = [
    { name: "Home", key: "Home" as const, href: "/mobile", icon: Home },
    { name: "Categories", key: "Categories" as const, href: "/mobile/categories", icon: LayoutGrid },
    { name: "Search", key: "Search" as const, href: "/mobile/search", icon: Search },
    { name: "Cart", key: "Cart" as const, href: "/mobile/cart", icon: ShoppingBag, badge: cartCount },
    { name: "Account", key: "Account" as const, href: "/mobile/account", icon: User },
  ];

  return (
    <nav 
      className={cn(
        "fixed bottom-0 left-0 w-full z-50",
        "bg-background border-t border-border shadow-lg",
        // Safe area padding for bottom indicator on iOS
        "pb-[env(safe-area-inset-bottom)]"
      )}
    >
      <ul className="flex items-center justify-around h-16 px-2">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href;
          const Icon = tab.icon;

          return (
            <li key={tab.name} className="flex-1">
              <Link
                href={tab.href}
                className={cn(
                  "flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <div className="relative">
                  <Icon className="w-6 h-6" strokeWidth={isActive ? 2.5 : 2} />
                  {tab.badge !== undefined && tab.badge > 0 && (
                    <Badge 
                      variant="destructive" 
                      className="absolute -top-2 -right-2 px-1.5 py-0.5 text-[10px] min-w-4 h-4 flex items-center justify-center rounded-full"
                    >
                      {tab.badge}
                    </Badge>
                  )}
                </div>
                <span className="text-[10px] font-medium leading-none">
                  {t(tab.key)}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
