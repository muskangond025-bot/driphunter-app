import React from "react";
import { ShieldCheck, Flame, Users, Store } from "lucide-react";

const WHY_CARDS = [
  {
    title: "Authentic Products",
    description: "Every item on our platform is 100% verified by expert curators before shipping. No fakes. No compromises.",
    icon: ShieldCheck,
    colorClass: "group-hover:border-brand-neon/40 group-hover:text-brand-neon text-brand-neon",
    bgLight: "bg-brand-neon/10",
  },
  {
    title: "Limited Drops",
    description: "Never miss out. Get early access to timed pre-orders, high-demand auctions, and exclusive limited streetwear drops.",
    icon: Flame,
    colorClass: "group-hover:border-brand-orange/40 group-hover:text-brand-orange text-brand-orange",
    bgLight: "bg-brand-orange/10",
  },
  {
    title: "Creator Community",
    description: "Tag your outfits, share your lookbooks, check influencer picks, and gain styling inspiration from real fashion enthusiasts.",
    icon: Users,
    colorClass: "group-hover:border-brand-purple/40 group-hover:text-brand-purple text-brand-purple",
    bgLight: "bg-brand-purple/10",
  },
  {
    title: "Seller-Friendly Platform",
    description: "Custom storefront settings, low processing fees, and direct payouts designed to empower local Indian streetwear brands.",
    icon: Store,
    colorClass: "group-hover:border-white/40 group-hover:text-white text-zinc-400",
    bgLight: "bg-zinc-800",
  },
];

export default function WhyUs() {
  return (
    <section className="relative w-full py-16 bg-background border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-purple">Why Choose Us</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-1">The DripHunter Advantage</h2>
          <p className="mt-4 text-muted-foreground text-sm sm:text-base">
            Providing a reliable, premium, and community-driven marketplace built specifically for streetwear culture in India.
          </p>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_CARDS.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Visual Accent Layer */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-muted-foreground/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Glowing border outline */}
                <div className={`absolute inset-0 border border-transparent rounded-2xl transition-colors duration-500 ${card.colorClass}`} />

                {/* Icon Container */}
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${card.bgLight} transition-all duration-300 mb-6 group-hover:rotate-6`}>
                  <Icon className="h-6 w-6" />
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-foreground transition-colors duration-300 group-hover:text-foreground">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
