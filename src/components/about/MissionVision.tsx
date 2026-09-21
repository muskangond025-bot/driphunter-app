import React from "react";
import { Compass, Target } from "lucide-react";

export default function MissionVision() {
  return (
    <section className="relative w-full py-16 bg-zinc-950 border-b border-zinc-900 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[350px] w-[350px] rounded-full bg-brand-neon/5 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-neon">Our Purpose</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mt-1">Mission &amp; Vision</h2>
          <p className="mt-4 text-zinc-400 text-sm sm:text-base">
            Guiding DripHunter towards shaping the future of Indian fashion and streetwear.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Mission Card */}
          <div className="relative group overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/40 backdrop-blur-md p-8 sm:p-10 transition-all duration-300 hover:border-brand-neon/30 hover:translate-y-[-4px]">
            <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-brand-neon via-brand-neon/50 to-transparent" />
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-neon/10 text-brand-neon">
                <Target className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-brand-neon">The Mission</h3>
                <h4 className="text-xl font-bold text-white">What We Do Today</h4>
              </div>
            </div>

            <p className="text-zinc-300 text-base sm:text-lg leading-relaxed font-medium">
              &ldquo;To connect streetwear lovers with authentic drops, creators, and brands.&rdquo;
            </p>
            <p className="mt-4 text-sm text-zinc-500 leading-relaxed">
              We eliminate the friction of finding genuine streetwear by offering absolute quality vetting, direct brand relationships, and seamless checkout pipelines.
            </p>
          </div>

          {/* Vision Card */}
          <div className="relative group overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/40 backdrop-blur-md p-8 sm:p-10 transition-all duration-300 hover:border-brand-purple/30 hover:translate-y-[-4px]">
            <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-brand-purple via-brand-purple/50 to-transparent" />
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-purple/10 text-brand-purple">
                <Compass className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-brand-purple">The Vision</h3>
                <h4 className="text-xl font-bold text-white">Where We Are Going</h4>
              </div>
            </div>

            <p className="text-zinc-300 text-base sm:text-lg leading-relaxed font-medium">
              &ldquo;Build India&rsquo;s biggest streetwear ecosystem (Marketplace + community + live drops).&rdquo;
            </p>
            <p className="mt-4 text-sm text-zinc-500 leading-relaxed">
              We are scaling DripHunter into the definitive hub for streetwear culture, bridging physical retail, dynamic live drop auctions, and conversational community feeds.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
