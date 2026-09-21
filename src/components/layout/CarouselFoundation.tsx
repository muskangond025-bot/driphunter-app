import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselFoundationProps {
  scrollProgress: number;
  totalItems: number;
  onScrollLeft: () => void;
  onScrollRight: () => void;
  className?: string;
}

export function CarouselFoundation({
  scrollProgress,
  totalItems,
  onScrollLeft,
  onScrollRight,
  className = "w-full mt-8"
}: CarouselFoundationProps) {
  return (
    <div className={className}>
      <div className="flex items-center justify-between gap-6 max-w-xl mx-auto">
        <button
          onClick={onScrollLeft}
          className="w-10 h-10 shrink-0 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-950 hover:text-white dark:hover:bg-white dark:hover:text-zinc-950 text-zinc-800 dark:text-zinc-200 flex items-center justify-center transition-all duration-300 cursor-pointer active:scale-95 shadow-xs"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Progress Indicator */}
        <div className="flex-1 flex items-center gap-3">
          <span className="text-[10px] font-mono text-zinc-400 font-bold">01</span>
          <div className="flex-1 h-[2px] bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden relative">
            <div
              className="absolute top-0 left-0 bottom-0 bg-[#6F4E37] dark:bg-[#E6C280] transition-all duration-300 rounded-full"
              style={{ width: `${Math.max(15, scrollProgress)}%` }}
            />
          </div>
          <span className="text-[10px] font-mono text-zinc-400 font-bold">
            {totalItems < 10 ? `0${totalItems}` : totalItems}
          </span>
        </div>

        <button
          onClick={onScrollRight}
          className="w-10 h-10 shrink-0 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-950 hover:text-white dark:hover:bg-white dark:hover:text-zinc-950 text-zinc-800 dark:text-zinc-200 flex items-center justify-center transition-all duration-300 cursor-pointer active:scale-95 shadow-xs"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
