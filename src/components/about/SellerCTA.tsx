import React from "react";
import Link from "next/link";
import { ArrowUpRight, Zap } from "lucide-react";

export default function SellerCTA() {
  return (
    <section className="relative w-full py-16 bg-background border-b border-border overflow-hidden">
      {/* Background neon grid mesh */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-full max-w-7xl bg-brand-purple/5 opacity-50 blur-[130px] pointer-events-none" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 sm:p-12 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-8 hover:border-brand-purple/30 hover:shadow-[0_0_50px_rgba(154,106,255,0.03)] transition-all duration-500">
          
          {/* Accent Line */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-brand-purple via-brand-neon to-brand-orange animate-gradient-xy" />

          {/* Left Content */}
          <div className="flex-1 space-y-4 max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-brand-purple">
              <Zap className="h-3 w-3 fill-brand-purple" />
              <span>Partnership Program</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              Are you a Creator or Homegrown Streetwear Brand?
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              Launch your exclusive collections, drops, and capsule projects directly on India&apos;s fastest growing street-culture marketplace. Partner with us for authenticated validation, logistics support, and instant community reach.
            </p>
          </div>

          {/* Right Action Button */}
          <div className="shrink-0 flex flex-col sm:flex-row gap-4 w-full lg:w-auto items-center justify-center">
            <Link href="/MAD/SellerProfileStoreSettingsPage.md" className="w-full sm:w-auto">
              <button className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-foreground hover:bg-zinc-800 text-background hover:text-foreground border border-transparent hover:border-border font-extrabold px-8 py-4 text-sm transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.1)]">
                Sell on DripHunter
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </Link>
            
            <Link href="/MAD/ContactUsPage.md" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-muted border border-border px-8 py-4 text-sm font-bold text-foreground hover:bg-border transition-colors">
                Contact Brand Relations
              </button>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
