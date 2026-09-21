"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SearchOverlay from "@/components/layout/SearchOverlay";

interface StaticContentLayoutProps {
  children: React.ReactNode;
  bgClass?: string;
  progressBarGradient?: string;
}

export default function StaticContentLayout({
  children,
  bgClass = "bg-[#FAF8F5] text-zinc-900",
  progressBarGradient = "from-[#6F4E37] via-[#C5A880] to-[#6F4E37]",
}: StaticContentLayoutProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Reading progress tracker
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scroll = `${(totalScroll / (windowHeight || 1)) * 100}`;
      setScrollProgress(Number(scroll));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`flex flex-col min-h-screen font-sans antialiased overflow-x-hidden select-none ${bgClass}`}>
      {/* Scroll Reading Progress Bar */}
      <div
        className={`fixed top-0 left-0 h-[3px] bg-gradient-to-r ${progressBarGradient} z-50 transition-all duration-150 ease-out`}
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Navbar & Search */}
      <Navbar onSearchClick={() => setIsSearchOpen(true)} />

      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      {children}

      <Footer />
    </div>
  );
}
