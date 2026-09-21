"use client";

import React from "react";
import Image from "next/image";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const innerAvatars = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80",
  "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=100&h=100&q=80",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&h=100&q=80",
  "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=100&h=100&q=80",
  "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=100&h=100&q=80",
];

const outerAvatars = [
  "https://images.unsplash.com/photo-1489980508314-941910ded1f4?auto=format&fit=crop&w=100&h=100&q=80",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=100&h=100&q=80",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&h=100&q=80",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&h=100&q=80",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&h=100&q=80",
  "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=100&h=100&q=80",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=100&h=100&q=80",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=100&h=100&q=80",
  "https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&w=100&h=100&q=80",
  "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=100&h=100&q=80",
];

function getPosition(index: number, total: number, radius: number) {
  const angle = (2 * Math.PI * index) / total;
  return {
    x: Math.cos(angle) * radius,
    y: Math.sin(angle) * radius,
    rotation: -(angle * 180) / Math.PI,
  };
}

export default function SocialProof() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="bg-white dark:bg-zinc-950 py-16 overflow-hidden flex flex-col items-center border-t border-zinc-100 dark:border-zinc-900">
      <div
        ref={ref}
        className={`relative w-full max-w-4xl h-[580px] flex items-center justify-center select-none transition-all duration-1000 ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
        }`}
      >
        {/* Decorative rings */}
        <div className="absolute rounded-full border border-zinc-100 w-[480px] max-w-[100vw] h-[480px] pointer-events-none" />
        <div className="absolute rounded-full border border-zinc-200 w-[280px] h-[280px] pointer-events-none" />

        {/* Center Hub */}
        <div className="w-52 h-52 sm:w-56 sm:h-56 rounded-full bg-black border-4 border-zinc-800 hover:border-[#6F4E37] transition-colors duration-500 flex flex-col items-center justify-center text-center p-6 z-30 shadow-2xl relative animate-pulse-glow">
          <div className="text-[10px] font-mono tracking-widest text-zinc-400 font-bold uppercase">
            COMMUNITY
          </div>
          <div className="text-lg sm:text-xl font-chaney-title uppercase tracking-tight text-white my-2 leading-none">
            10% Premium Drip
          </div>
          <div className="text-[8px] font-mono tracking-widest font-black text-[#6F4E37] bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-full mt-2 uppercase shadow-inner">
            LIMITED EDITION
          </div>
        </div>

        {/* Inner Ring — counter-clockwise */}
        <div className="absolute w-[280px] h-[280px] flex items-center justify-center z-10 animate-spin-counter">
          {innerAvatars.map((src, i) => {
            const pos = getPosition(i, innerAvatars.length, 140);
            return (
              <div
                key={i}
                className="absolute w-10 h-10 rounded-full border-2 border-white bg-zinc-100 shadow-md overflow-hidden hover:scale-125 transition-transform duration-300 pointer-events-auto cursor-pointer"
                style={{
                  transform: `translate(${pos.x}px, ${pos.y}px) rotate(${pos.rotation}deg)`,
                }}
              >
                <div className="w-full h-full relative animate-spin-clockwise">
                  <Image
                    alt={`User avatar ${i}`}
                    src={src}
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Outer Ring — clockwise */}
        <div className="absolute w-[480px] max-w-[100vw] h-[480px] flex items-center justify-center z-10 animate-spin-clockwise">
          {outerAvatars.map((src, i) => {
            const pos = getPosition(i, outerAvatars.length, 240);
            return (
              <div
                key={i}
                className="absolute w-10 h-10 rounded-full border-2 border-white bg-zinc-100 shadow-md overflow-hidden hover:scale-125 transition-transform duration-300 pointer-events-auto cursor-pointer"
                style={{
                  transform: `translate(${pos.x}px, ${pos.y}px) rotate(${pos.rotation}deg)`,
                }}
              >
                <div className="w-full h-full relative animate-spin-counter">
                  <Image
                    alt={`User avatar ${i + innerAvatars.length}`}
                    src={src}
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
