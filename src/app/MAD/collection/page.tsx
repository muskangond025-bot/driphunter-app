"use client";

import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import SearchOverlay from "@/components/layout/SearchOverlay";

export default function CollectionPage() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar onSearchClick={() => setIsSearchOpen(true)} />
      
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      <main className="flex-grow" />
    </div>
  );
}
