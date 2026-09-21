import React from "react";

export default function AboutHero() {
  return (
    <section className="relative w-full overflow-hidden bg-zinc-950 py-16 border-b border-zinc-900">
      {/* Dynamic Background Gradients */}
      <div className="absolute inset-0 z-0">
        {/* Glow Effects */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 h-[300px] w-[300px] rounded-full bg-brand-purple/10 blur-[100px] animate-pulse duration-[8000ms]" />
        <div className="absolute top-1/3 right-1/4 -translate-y-1/2 h-[250px] w-[250px] rounded-full bg-brand-neon/5 blur-[80px] animate-pulse duration-[6000ms]" />
        
        {/* Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Culture Tag */}
        <div className="inline-flex items-center gap-1.5 rounded-full border border-brand-neon/20 bg-brand-neon/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-neon mb-6 animate-fade-in">
          <span>DripHunter Culture</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-extrabold tracking-tighter text-white sm:text-6xl md:text-7xl lg:text-8xl">
          ABOUT{" "}
          <span className="bg-gradient-to-r from-white via-brand-purple to-brand-neon bg-clip-text text-transparent italic font-black">
            DRIPHUNTER
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mt-6 max-w-3xl text-lg font-medium text-zinc-400 sm:text-xl md:text-2xl leading-relaxed">
          &ldquo;India&rsquo;s streetwear marketplace for{" "}
          <span className="text-white font-semibold">drops</span>,{" "}
          <span className="text-brand-purple font-semibold">culture</span>, and{" "}
          <span className="text-brand-neon font-semibold">community</span>.&rdquo;
        </p>

        {/* Dynamic Accents */}
        <div className="mt-10 flex justify-center items-center gap-3">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-neon animate-ping" />
          <span className="h-px w-24 bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
          <span className="text-[10px] font-semibold uppercase tracking-widest text-zinc-600">Est. 2026</span>
          <span className="h-px w-24 bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
          <span className="h-1.5 w-1.5 rounded-full bg-brand-purple animate-ping" />
        </div>
      </div>
    </section>
  );
}
