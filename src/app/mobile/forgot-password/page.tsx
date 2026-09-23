"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, Shield } from "lucide-react";
import AppHeader from "@/components/app-shell/AppHeader";
import AppPageLayout from "@/components/app-shell/AppPageLayout";

export default function MobileForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email address.");
      return;
    }
    setError("");
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      setError("Backend Integration Required to send reset email.");
    }, 1000);
  };

  return (
    <AppPageLayout hasBottomNav={false}>
      <AppHeader variant="contextual" title="Forgot Password" fallbackUrl="/mobile/login" />
      
      <div className="flex flex-col min-h-screen bg-white dark:bg-zinc-950 px-6 pt-6 pb-24">
        
        <div className="space-y-2 mb-8 mt-4 text-center">
          <h1 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-white font-sans uppercase">
            Reset <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280]">Password</span>
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono pt-2 leading-relaxed">
            Enter the email address associated with your account and we'll send you a password reset link.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="text-[10px] font-mono font-bold tracking-widest uppercase text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 px-4 py-3 text-center rounded-xl">
              {error}
            </div>
          )}

          {successMessage && (
            <div className="text-[10px] font-mono font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 px-4 py-3 text-center rounded-xl">
              Check Your Email
              <span className="block font-sans text-xs text-emerald-700 dark:text-emerald-300 font-normal tracking-normal normal-case mt-1">{successMessage}</span>
            </div>
          )}

          <div className="relative group">
            <input
              type="email"
              required
              disabled={isLoading}
              placeholder=" "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="peer w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:border-[#6F4E37] dark:focus:border-zinc-500 rounded-2xl px-5 py-4 text-sm font-sans font-medium text-zinc-900 dark:text-white outline-none transition-all disabled:opacity-50"
            />
            <label className="absolute left-5 top-4 text-xs font-mono font-bold uppercase tracking-[0.2em] text-zinc-400 peer-focus:-translate-y-8 peer-focus:text-[9px] peer-focus:text-zinc-900 dark:peer-focus:text-white peer-valid:-translate-y-8 peer-valid:text-[9px] transition-all duration-300 pointer-events-none">
              Email Address
            </label>
            <Mail className="absolute right-5 top-4 w-4 h-4 text-zinc-400" />
          </div>

          <div className="border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 rounded-xl p-3.5 flex gap-3 items-center">
            <Shield className="w-4 h-4 text-[#6F4E37] dark:text-[#E6C280] shrink-0" />
            <p className="text-[10px] text-zinc-500 dark:text-zinc-400 font-mono leading-relaxed">
              Secured by Drip Hunter Shield. 256-bit encrypted SSL protocol.
            </p>
          </div>

          <button
            type="submit"
            disabled={isLoading || !!successMessage}
            className="w-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 py-4 rounded-xl font-bold active:scale-[0.98] transition-transform flex justify-center items-center gap-2 mt-2 disabled:opacity-50 disabled:active:scale-100"
          >
            {isLoading ? "SENDING..." : "SEND RESET LINK"}
          </button>
        </form>

        <div className="text-center mt-auto pt-8 pb-4 text-xs text-zinc-500 font-mono uppercase tracking-widest font-bold">
          <Link
            href="/mobile/login"
            className="text-zinc-900 dark:text-white hover:underline decoration-zinc-300 dark:decoration-zinc-700 underline-offset-4"
          >
            Back to Log In
          </Link>
        </div>

      </div>
    </AppPageLayout>
  );
}
