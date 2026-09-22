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
      className="relative w-full md:h-[calc(100dvh-92px)] md:min-h-[500px] flex items-center justify-center bg-white dark:bg-zinc-950 text-zinc-950 dark:text-white select-none px-4 pt-2 pb-6 md:p-0 md:overflow-hidden"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      {/* GPU Accelerated Morphing Card Container */}
      <div
        className={`relative md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-0 overflow-hidden shadow-lg select-none pointer-events-none flex items-center justify-center will-change-transform transform-gpu transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] w-full aspect-[4/3] rounded-[24px] sm:rounded-[28px] border border-black/5 dark:border-white/5 ${
          isScrolled
            ? "md:w-[360px] lg:w-[400px] xl:w-[440px] md:h-[76%] lg:h-[80%] xl:h-[82%] md:aspect-auto md:rounded-[3rem] md:border-black/10 md:dark:border-white/15 md:shadow-2xl"
            : "md:w-full md:h-full md:aspect-auto md:rounded-none md:border-transparent md:shadow-none"
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
          className="w-full h-full object-cover transform-gpu will-change-transform"
        />
      </div>
    </section>
  );
}
