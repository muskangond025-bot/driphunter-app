import React from "react";
import Link from "next/link";

interface LogoProps {
  variant?: "buyer" | "seller";
  className?: string;
  textClassName?: string;
}

export function Logo({
  variant = "buyer",
  className = "flex items-center gap-1 group select-none text-zinc-950 dark:text-white shrink-0",
  textClassName = "font-sans font-black tracking-tighter text-lg sm:text-xl uppercase transition-opacity group-hover:opacity-90",
}: LogoProps) {
  const suffix = variant === "buyer" ? "HUNTER" : "SELLER";
  const linkHref = variant === "buyer" ? "/" : "/";

  return (
    <Link href={linkHref} className={className} aria-label={`Drip${suffix} Home`}>
      <span className={textClassName}>
        DRIP<span className="text-[#6F4E37] dark:text-[#E6C280]">{suffix}</span>
      </span>
    </Link>
  );
}
