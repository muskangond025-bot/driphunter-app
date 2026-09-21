import React from "react";

interface ProductRatingProps {
  rating: number;
  className?: string;
}

export function ProductRating({ rating, className = "flex items-center gap-1 text-[10px] text-zinc-500 font-mono" }: ProductRatingProps) {
  return (
    <div className={className}>
      <span className="text-amber-500">★</span>
      <span>{rating.toFixed(1)}</span>
    </div>
  );
}
