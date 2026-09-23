"use client";

import React, { useState, useEffect } from "react";
import { WifiOff } from "lucide-react";

export default function OfflineWrapper({ children }: { children: React.ReactNode }) {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsOnline(navigator.onLine);

      const handleOnline = () => setIsOnline(true);
      const handleOffline = () => setIsOnline(false);

      window.addEventListener("online", handleOnline);
      window.addEventListener("offline", handleOffline);

      return () => {
        window.removeEventListener("online", handleOnline);
        window.removeEventListener("offline", handleOffline);
      };
    }
  }, []);

  if (!isOnline) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[100dvh] bg-zinc-50 dark:bg-zinc-950 px-6 text-center animate-in fade-in duration-300">
        <div className="w-20 h-20 bg-zinc-100 dark:bg-zinc-900 rounded-full flex items-center justify-center mb-6">
          <WifiOff className="w-8 h-8 text-zinc-400 dark:text-zinc-500" />
        </div>
        <h1 className="text-2xl font-light tracking-tight text-zinc-900 dark:text-zinc-50 font-playfair mb-3">
          No Internet Connection
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-8 max-w-[280px]">
          Please check your connection and try again.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="w-full max-w-[280px] bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 py-3.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider shadow-lg active:scale-95 transition-transform"
        >
          Try Again
        </button>
      </div>
    );
  }

  return <>{children}</>;
}
