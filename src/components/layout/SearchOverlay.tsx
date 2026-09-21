"use client";
import React, { useState, useRef, useEffect } from "react";
import { Mic, Camera, Search, X } from "lucide-react";
import VoiceSearchDropdown from "./VoiceSearchDropdown";
import ImageSearchDropdown from "./ImageSearchDropdown";
import { useRouter } from "next/navigation";

export default function SearchOverlay({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchMode, setSearchMode] = useState<"text" | "voice" | "image">("text");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (isOpen && searchMode === "text") {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, searchMode]);

  if (!isOpen) return null;

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    router.push(`/shop?search=${encodeURIComponent(query)}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-start justify-center pt-24 px-4" onClick={onClose}>
      <div className="w-full max-w-2xl bg-white dark:bg-zinc-950 rounded-2xl shadow-2xl p-4 sm:p-6 animate-fade-in-down border border-zinc-200 dark:border-zinc-800" onClick={(e) => e.stopPropagation()}>
        
        {/* Header Controls */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-900 dark:text-white">Search</h2>
          <button onClick={onClose} className="p-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors bg-zinc-100 dark:bg-zinc-900 rounded-full">
            <X className="w-4 h-4" />
          </button>
        </div>

        {searchMode === "text" && (
          <>
            <div className="relative flex items-center w-full">
              <Search className="absolute left-4 w-5 h-5 text-zinc-400" />
              <input 
                ref={inputRef}
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && searchQuery.trim() && handleSearch(searchQuery)}
                placeholder="Search products, brands..." 
                className="w-full text-base sm:text-lg outline-none font-sans py-4 pl-12 pr-24 bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:border-[#6F4E37] dark:focus:border-[#E6C280] transition-colors" 
              />
              <div className="absolute right-2 flex items-center gap-1">
                <button 
                  onClick={() => setSearchMode("voice")}
                  className="p-2 text-zinc-400 hover:text-[#6F4E37] dark:hover:text-[#E6C280] transition-colors rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                  <Mic className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setSearchMode("image")}
                  className="p-2 text-zinc-400 hover:text-[#6F4E37] dark:hover:text-[#E6C280] transition-colors rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                  <Camera className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="mt-6">
              <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-3">Trending Searches</p>
              <div className="flex flex-wrap gap-2">
                {["Oversized Tees", "Cargo Pants", "Tech Vests", "Samba OG", "Jordan 1"].map((t) => (
                  <button 
                    key={t} 
                    onClick={() => handleSearch(t)}
                    className="px-4 py-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-full hover:border-[#6F4E37] hover:text-[#6F4E37] dark:hover:border-[#E6C280] dark:hover:text-[#E6C280] text-xs font-medium transition-colors"
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {searchMode === "voice" && (
          <div className="mt-2">
            <VoiceSearchDropdown 
              onClose={onClose} 
              onBack={() => setSearchMode("text")} 
              onSearch={handleSearch} 
            />
          </div>
        )}

        {searchMode === "image" && (
          <div className="mt-2">
            <ImageSearchDropdown 
              onClose={onClose} 
              onBack={() => setSearchMode("text")} 
              onSearch={(q) => handleSearch(q)} 
            />
          </div>
        )}
      </div>
    </div>
  );
}
