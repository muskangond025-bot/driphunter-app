"use client";

import React, { useEffect } from "react";
import { AlertCircle } from "lucide-react";
import AppPageLayout from "@/components/app-shell/AppPageLayout";

export default function MobileError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service in a real app
    console.error(error);
  }, [error]);

  return (
    <AppPageLayout hasBottomNav={false}>
      <div className="flex flex-col items-center justify-center min-h-[100dvh] bg-zinc-50 dark:bg-zinc-950 px-6 text-center animate-in fade-in duration-300">
        <div className="w-20 h-20 bg-rose-50 dark:bg-rose-950/30 rounded-full flex items-center justify-center mb-6">
          <AlertCircle className="w-8 h-8 text-rose-500" />
        </div>
        <h1 className="text-2xl font-light tracking-tight text-zinc-900 dark:text-zinc-50 font-playfair mb-3">
          Something went wrong
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-8 max-w-[280px]">
          We couldn't load this right now. Please try again.
        </p>
        <button
          onClick={() => reset()}
          className="w-full max-w-[280px] bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 py-3.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider shadow-lg active:scale-95 transition-transform"
        >
          Try Again
        </button>
      </div>
    </AppPageLayout>
  );
}
