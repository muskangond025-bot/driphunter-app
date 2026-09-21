"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

export default function AnnouncementBar() {
  return (
    <div className="w-full bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 text-white text-xs py-2.5 px-4 flex items-center justify-center font-mono overflow-hidden relative">
      {/* Animated shimmer overlay */}
      <div className="absolute inset-0 animate-shimmer pointer-events-none" />
      <div className="flex items-center space-x-2 relative z-10">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#6F4E37] animate-pulse" />
        <span>
          SUMMER DRIP IS HERE: USE CODE{" "}
          <strong className="text-[#6F4E37] font-bold tracking-wider">
            DRIP10
          </strong>{" "}
          FOR 10% OFF
        </span>
        <ArrowRight className="w-3.5 h-3.5 text-[#6F4E37]" aria-hidden="true" />
      </div>
    </div>
  );
}
