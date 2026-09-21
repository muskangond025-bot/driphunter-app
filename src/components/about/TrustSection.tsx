import React from "react";
import { Lock, RefreshCw, BadgeCheck } from "lucide-react";

export default function TrustSection() {
  const trustFeatures = [
    {
      title: "Secure Payments",
      description: "Enjoy bank-grade security during checkout. Fully compliant payments, SSL encryption, and direct UPI or card options.",
      icon: Lock,
      color: "text-brand-purple bg-brand-purple/10",
    },
    {
      title: "Easy Returns",
      description: "Hassle-free shipping and returns policies. Open a return request within 7 days of delivery for complete buyer protection.",
      icon: RefreshCw,
      color: "text-brand-orange bg-brand-orange/10",
    },
    {
      title: "Verified Sellers",
      description: "Every merchant and brand partner undergoes strict document verification and quality audits before joining the platform.",
      icon: BadgeCheck,
      color: "text-brand-neon bg-brand-neon/10",
    },
  ];

  return (
    <section className="relative w-full py-16 bg-zinc-950 border-b border-zinc-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {trustFeatures.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="flex flex-col items-center md:items-start text-center md:text-left p-6 rounded-2xl border border-zinc-900 bg-zinc-900/10 hover:bg-zinc-900/35 transition-colors duration-300 group"
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${feature.color} mb-4 transition-transform duration-300 group-hover:scale-110`}>
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed max-w-xs md:max-w-none">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
