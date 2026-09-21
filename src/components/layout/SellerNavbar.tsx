"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import {
  ChevronDown,
  ArrowRight,
  Sun,
  Moon,
  Menu,
  X,
  Store,
  LineChart,
  Wallet,
  GraduationCap,
  Sparkles
} from "lucide-react";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Logo } from "@/components/layout/Logo";

const sellerNavLinks = [
  {
    label: "Sell Online",
    icon: Store,
    href: "/become-seller"
  },
  {
    label: "Fees & Commission",
    icon: Wallet,
    href: "/fees-and-commission"
  },

  {
    label: "Learn",
    icon: GraduationCap,
    subItems: [
      { label: "Seller Hub", href: "/seller-hub", description: "Best practices & guides" },
      { label: "FAQs", href: "/faqs", description: "Common questions answered" }
    ]
  }
];

export default function SellerNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`w-full sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 dark:bg-[#0a0a0c]/90 backdrop-blur-xl border-b border-zinc-200/50 dark:border-zinc-800/50 shadow-sm"
          : "bg-white dark:bg-[#0a0a0c] border-b border-transparent"
      }`}
      onMouseLeave={() => setHoveredCategory(null)}
    >


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[72px] flex items-center justify-between">
        {/* Logo */}
        <Logo variant="seller" />

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-2">
          {sellerNavLinks.map((item) => (
            <div
              key={item.label}
              className="relative group/nav"
              onMouseEnter={() => setHoveredCategory(item.label)}
            >
              {item.href ? (
                <Link
                  href={item.href}
                  className="px-4 py-2 rounded-full flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-all duration-200"
                >
                  <item.icon className="w-3.5 h-3.5 opacity-70" />
                  <span>{item.label}</span>
                </Link>
              ) : (
                <div
                  className={`px-4 py-2 rounded-full flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider cursor-pointer transition-all duration-200 ${
                    hoveredCategory === item.label
                      ? "text-[#6F4E37] dark:text-[#E6C280] bg-[#6F4E37]/10 dark:bg-[#E6C280]/10"
                      : "text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
                  }`}
                >
                  <item.icon className="w-3.5 h-3.5 opacity-70" />
                  <span>{item.label}</span>
                  <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${hoveredCategory === item.label ? "rotate-180" : ""}`} />
                </div>
              )}

              {/* Dropdown Menu */}
              {item.subItems && hoveredCategory === item.label && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-64 animate-fade-in-up z-50">
                  <div className="bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl p-3 flex flex-col gap-1 relative before:absolute before:-top-2 before:left-1/2 before:-translate-x-1/2 before:w-4 before:h-4 before:rotate-45 before:bg-white dark:before:bg-zinc-900 before:border-l before:border-t before:border-zinc-200 dark:before:border-zinc-800">
                    {item.subItems.map((sub) => (
                      <Link
                        key={sub.label}
                        href={sub.href}
                        className="group flex flex-col p-3 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors z-10"
                        onClick={() => setHoveredCategory(null)}
                      >
                        <span className="text-xs font-bold text-zinc-900 dark:text-white group-hover:text-[#6F4E37] dark:group-hover:text-[#E6C280] transition-colors uppercase tracking-wide">
                          {sub.label}
                        </span>
                        <span className="text-[10px] text-zinc-500 mt-0.5 font-sans">
                          {sub.description}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <ThemeToggle className="w-9 h-9 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors flex items-center justify-center text-zinc-950 dark:text-white" />
          
          <Link
            href="/start-selling"
            className="bg-[#6F4E37] hover:bg-[#5C3D2E] dark:bg-[#E6C280] dark:hover:bg-[#d4b06a] text-white dark:text-zinc-950 text-[10px] font-black uppercase tracking-widest px-6 py-2.5 rounded-full transition-all shadow-md items-center gap-2 hidden sm:flex"
          >
            Start Selling <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden w-9 h-9 relative rounded-full border border-zinc-200/60 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center justify-center transition-colors cursor-pointer text-zinc-950 dark:text-white shadow-xs overflow-hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            <div className="relative w-4.5 h-4.5">
              <Menu className={`absolute inset-0 w-4.5 h-4.5 transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${mobileOpen ? "rotate-90 scale-50 opacity-0" : "rotate-0 scale-100 opacity-100"}`} />
              <X className={`absolute inset-0 w-4.5 h-4.5 transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${mobileOpen ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-50 opacity-0"}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Scrollable Nav (Seller Links) */}
      <nav className="lg:hidden w-full overflow-x-auto scrollbar-none border-t border-zinc-200/50 dark:border-zinc-800/50 bg-inherit shadow-sm">
        <div className="flex px-4 py-2.5 gap-2 items-center w-max">
          <Link
            href="/start-selling"
            className="px-4 py-1.5 rounded-full flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-white dark:text-zinc-950 bg-zinc-900 dark:bg-white transition-colors mr-1 shadow-sm"
          >
            Start Selling <ArrowRight className="w-3 h-3" />
          </Link>
          <Link
            href="/become-seller"
            className="px-3.5 py-1.5 rounded-full flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-300 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 transition-colors"
          >
            <Store className="w-3 h-3" />
            <span>Sell Online</span>
          </Link>
          <Link
            href="/fees-and-commission"
            className="px-3.5 py-1.5 rounded-full flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-300 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 transition-colors"
          >
            <Wallet className="w-3 h-3" />
            <span>Fees & Comms</span>
          </Link>
          <Link
            href="/seller-hub"
            className="px-3.5 py-1.5 rounded-full flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-300 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 transition-colors"
          >
            <GraduationCap className="w-3 h-3" />
            <span>Seller Hub</span>
          </Link>
          <Link
            href="/faqs"
            className="px-3.5 py-1.5 rounded-full flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-300 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 transition-colors"
          >
            <Sparkles className="w-3 h-3" />
            <span>FAQs</span>
          </Link>
        </div>
      </nav>

      {/* Global Mobile Drawer (From Main Navbar) */}
      <div
        className={`lg:hidden grid transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          mobileOpen ? "grid-rows-[1fr] opacity-100 border-t border-zinc-200/60 dark:border-zinc-800/80 bg-white/98 dark:bg-zinc-950/98 backdrop-blur-2xl" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-5 py-5 flex flex-col gap-2 text-left">
            <nav className="flex flex-col gap-1" aria-label="Global Mobile Navigation">
              {[
                { label: "Home", href: "/" },
                { label: "Sneakers", href: "/shop?category=sneakers" },
                { label: "Apparel", href: "/shop?category=apparel" },
                { label: "Accessories", href: "/shop?category=accessories" },
                { label: "Brands", href: "/brands" },
                { label: "Profile", href: "/profile" },
                { label: "Orders", href: "/orders" },
                { label: "Wishlist", href: "/wishlist" },
                { label: "About Us", href: "/about" },
              ].map(({ label, href }, index) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all duration-200 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-900"
                >
                  <div className="overflow-hidden pb-1 -mb-1">
                    <div 
                      className={`transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] inline-block ${mobileOpen ? "translate-y-0" : "translate-y-[120%]"}`} 
                      style={{ transitionDelay: `${index * 40}ms` }}
                    >
                      {label}
                    </div>
                  </div>
                  <ArrowRight className={`w-3.5 h-3.5 text-zinc-400 transition-all duration-500 ${mobileOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`} style={{ transitionDelay: `${index * 40 + 100}ms` }} />
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
