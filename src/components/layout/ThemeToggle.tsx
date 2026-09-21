"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({
  className = "w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-zinc-200/60 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer text-zinc-950 dark:text-white flex items-center justify-center shadow-xs active:scale-95",
}: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={className}
      aria-label="Toggle Theme"
    >
      {mounted && theme === "dark" ? (
        <Sun className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
      ) : (
        <Moon className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
      )}
    </button>
  );
}
