"use client";

import React, { useState } from "react";
import { Send, Check, Bell } from "lucide-react";

export default function CollectionNewsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setEmail("");
      setTimeout(() => setIsSuccess(false), 4000);
    }, 1200);
  };

  return (
    <section className="w-full py-16 bg-zinc-950 border-b border-zinc-900 overflow-hidden relative">
      {/* Background gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-full max-w-5xl bg-brand-purple/5 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative overflow-hidden rounded-3xl border border-zinc-900 bg-zinc-900/10 p-8 sm:p-12 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-10 hover:border-zinc-800 transition-all duration-500">
          
          {/* Top Neon Accent line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-brand-purple to-brand-neon" />

          {/* Left: Info */}
          <div className="flex-1 space-y-4 max-w-xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-neon">
              <Bell className="h-4.5 w-4.5 text-brand-neon fill-brand-neon/10 animate-pulse" />
              <span>Capsule Alerts</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
              Get Notified for the Next Drop
            </h2>
            <p className="text-sm text-zinc-500 leading-relaxed">
              Our capsule collections are released in highly limited quantities and sell out in minutes. Subscribe to receive SMS and email priority access alerts.
            </p>
          </div>

          {/* Right: Subscription Form */}
          <div className="w-full lg:w-auto shrink-0 min-w-[280px] sm:min-w-[400px]">
            <form onSubmit={handleSubmit} className="relative w-full">
              <div className="flex flex-col sm:flex-row gap-3 w-full">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  disabled={isSuccess || isSubmitting}
                  className="flex-1 bg-zinc-950 border border-zinc-900 rounded-xl px-5 py-4 text-xs font-semibold text-white placeholder-zinc-600 focus:outline-none focus:border-brand-purple transition-all"
                  required
                />
                
                <button
                  type="submit"
                  disabled={isSubmitting || isSuccess}
                  className={`group inline-flex items-center justify-center gap-2 rounded-xl font-extrabold px-6 py-4 text-xs uppercase tracking-widest transition-all ${
                    isSuccess
                      ? "bg-[#6F4E37] text-white"
                      : "bg-white text-black hover:bg-zinc-200 hover:scale-[1.02]"
                  }`}
                >
                  {isSuccess ? (
                    <>
                      <Check className="h-4 w-4 stroke-[3]" />
                      Subscribed
                    </>
                  ) : isSubmitting ? (
                    <span className="h-4 w-4 rounded-full border-2 border-zinc-600 border-t-black animate-spin" />
                  ) : (
                    <>
                      Notify Me
                      <Send className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
