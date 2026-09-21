"use client";

import React, { useState, useEffect, useRef } from "react";

export default function HeroSection() {
  const [isScrolled, setIsScrolled] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.scrollY > 40;
          setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Ensure video continues playing smoothly without pausing on scroll
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay policy fallback
      });
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative w-full h-[55dvh] sm:h-[65dvh] md:h-[calc(100dvh-92px)] min-h-[400px] md:min-h-[500px] flex items-center justify-center overflow-hidden bg-white dark:bg-zinc-950 text-zinc-950 dark:text-white select-none"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      {/* GPU Accelerated Morphing Card Container */}
      <div
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0 overflow-hidden shadow-2xl select-none pointer-events-none flex items-center justify-center will-change-transform transform-gpu transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isScrolled
            ? "w-[280px] sm:w-[320px] md:w-[360px] lg:w-[400px] xl:w-[440px] h-[68%] sm:h-[72%] md:h-[76%] lg:h-[80%] xl:h-[82%] rounded-[2rem] md:rounded-[3rem] border border-black/10 dark:border-white/15"
            : "w-[92%] sm:w-[94%] md:w-full h-[65%] sm:h-[70%] md:h-full rounded-[1.5rem] sm:rounded-[2rem] md:rounded-none border border-black/5 dark:border-white/5 md:border-transparent shadow-lg md:shadow-none"
        }`}
      >
        <video
          ref={videoRef}
          src="/hero_video.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          disableRemotePlayback
          className="w-full h-full object-fill transform-gpu will-change-transform"
        />
      </div>
    </section>
  );
}
