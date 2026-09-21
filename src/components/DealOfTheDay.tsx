"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Clock, Flame } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import Link from "next/link";

function useCountdown(targetDate: Date) {
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, targetDate.getTime() - Date.now());
      setTime({
        hours: Math.floor(diff / 3600000) % 24,
        minutes: Math.floor(diff / 60000) % 60,
        seconds: Math.floor(diff / 1000) % 60,
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate]);
  return time;
}

export default function DealOfTheDay() {
  const { ref, isVisible } = useScrollAnimation();
  const target = new Date(Date.now() + 8 * 3600000);
  const { hours, minutes, seconds } = useCountdown(target);

  return (
    <section className="bg-zinc-950 text-white py-16 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(111,78,55,0.08),transparent_55%)] pointer-events-none" />

      <div
        ref={ref}
        className={`w-full max-w-[1600px] mx-auto px-6 sm:px-12 md:px-16 lg:px-20transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left — Product Image */}
          <div className="relative rounded-3xl overflow-hidden aspect-[4/5] max-h-[520px] group">
            <Image
              alt="Deal of the Day"
              src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute top-4 left-4 flex items-center gap-2 bg-[#6F4E37] text-white font-mono text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full">
              <Flame className="w-3 h-3" />
              HOT DEAL
            </div>
          </div>

          {/* Right — Info */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 text-[#6F4E37] font-mono text-xs font-bold uppercase tracking-widest">
              <Clock className="w-4 h-4" />
              DEAL OF THE DAY
            </div>
            <h2 className="text-3xl sm:text-5xl font-chaney-title uppercase tracking-tight leading-none">
              Tech Utility<br />
              <span className="text-[#6F4E37]">Vest System</span>
            </h2>
            <p className="text-sm text-zinc-400 font-mono leading-relaxed max-w-md">
              Modular tactical vest with detachable pouches, reflective taping, and water-resistant coating. Limited stock available.
            </p>

            {/* Countdown */}
            <div className="flex gap-4">
              {[
                { label: "Hours", value: hours },
                { label: "Minutes", value: minutes },
                { label: "Seconds", value: seconds },
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <div className="w-20 h-20 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-center">
                    <span className="text-3xl font-chaney-title text-white">
                      {String(item.value).padStart(2, "0")}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500 mt-2 block uppercase tracking-widest">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Pricing */}
            <div className="flex items-end gap-3">
              <span className="text-4xl font-chaney-title text-[#6F4E37]">₹149</span>
              <span className="text-lg text-zinc-600 line-through font-mono">₹220</span>
              <span className="bg-[#6F4E37] text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase">
                32% OFF
              </span>
            </div>

            <Link href="/product/tech-utility-vest-system" className="bg-[#6F4E37] hover:bg-[#5C3D2E] text-white font-bold uppercase tracking-widest text-xs py-4 px-10 rounded-full transition-all shadow-lg shadow-[#6F4E37]/20 hover:scale-[1.02] active:scale-95 cursor-pointer text-center inline-block">
              Grab This Deal
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
