import React from "react";

interface ProductPriceProps {
  price: string | number;
  originalPrice?: string | number;
  className?: string;
  priceClass?: string;
  originalPriceClass?: string;
}

export function ProductPrice({
  price,
  originalPrice,
  className = "flex items-baseline gap-2",
  priceClass = "text-sm font-mono font-bold text-zinc-950 dark:text-white tracking-tight",
  originalPriceClass = "text-[11px] font-mono text-zinc-400 line-through",
}: ProductPriceProps) {
  const formatPrice = (p: string | number) => 
    typeof p === "number" ? `₹${p.toLocaleString("en-IN")}` : p;

  return (
    <div className={className}>
      <span className={priceClass}>{formatPrice(price)}</span>
      {originalPrice && (
        <span className={originalPriceClass}>{formatPrice(originalPrice)}</span>
      )}
    </div>
  );
}
