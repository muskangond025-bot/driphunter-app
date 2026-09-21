import React from "react";

interface ProductBadgeProps {
  badge?: string;
  discountPct?: number;
  inStock?: boolean;
}

export function ProductBadge({ badge, discountPct = 0, inStock = true }: ProductBadgeProps) {
  return (
    <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10 pointer-events-none">
      {inStock && badge && (
        <span className="inline-flex items-center gap-1.5 backdrop-blur-md bg-zinc-950/80 dark:bg-zinc-900/90 text-white text-[8px] font-mono font-bold tracking-widest px-3 py-1 rounded-full uppercase border border-white/10 shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          {badge}
        </span>
      )}
      {inStock && discountPct > 0 && (
        <span className="backdrop-blur-md bg-[#6F4E37] text-white text-[8px] font-mono font-bold tracking-widest px-2.5 py-0.5 rounded-full uppercase shadow-xs w-fit">
          -{discountPct}%
        </span>
      )}
      {!inStock && (
        <span className="backdrop-blur-md bg-zinc-900/95 text-zinc-300 text-[8px] font-mono font-bold tracking-widest px-3 py-1 rounded-full uppercase shadow-xs">
          Vault Archived
        </span>
      )}
    </div>
  );
}
