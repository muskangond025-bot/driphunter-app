"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, Shield } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email address.");
      return;
    }
    setError("");
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setSuccessMessage("Password reset link sent to your email!");
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Navbar onSearchClick={() => setIsSearchOpen(true)} />

      <main className="flex-grow flex items-center justify-center p-4 sm:p-8 pt-32 pb-20 bg-zinc-50 dark:bg-zinc-950 relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#6F4E37]/10 dark:bg-[#E6C280]/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-zinc-200/50 dark:bg-zinc-900/50 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="w-full max-w-[440px] bg-white dark:bg-zinc-900/80 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800 rounded-[32px] sm:rounded-[40px] p-8 sm:p-10 shadow-2xl relative z-10 space-y-8 animate-fade-in">
          
          {/* Title & Description */}
          <div className="space-y-2 text-center">
            <span className="text-[9px] font-mono font-bold tracking-[0.25em] text-[#6F4E37] dark:text-[#E6C280] uppercase block">
              AUTHENTICATED ACCESS
            </span>
            <h1 className="text-3xl sm:text-4xl font-light tracking-tight text-zinc-900 dark:text-white font-playfair uppercase">
              Reset <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280]">Password</span>
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 font-sans leading-relaxed pt-2">
              Access your Drip Hunter vault. Enter your email to receive a secure password reset link.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="text-xs font-mono text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 px-4 py-3 rounded-xl text-center">
                {error}
              </div>
            )}

            {successMessage && (
              <div className="text-xs font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 px-4 py-3 rounded-xl text-center">
                {successMessage}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-widest block font-bold">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="e.g. drip@driphunter.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl py-3.5 pl-11 pr-4 text-sm font-medium text-zinc-900 dark:text-white placeholder-zinc-400 outline-none focus:border-[#6F4E37] dark:focus:border-[#E6C280] transition-colors disabled:opacity-50"
                />
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6F4E37] dark:text-[#E6C280]" />
              </div>
            </div>

            {/* Secure indicator box */}
            <div className="border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 rounded-xl p-3.5 flex gap-3 items-center">
              <Shield className="w-4 h-4 text-[#6F4E37] dark:text-[#E6C280] shrink-0" />
              <p className="text-[10px] text-zinc-500 dark:text-zinc-400 font-mono leading-relaxed">
                Secured by Drip Hunter Shield. 256-bit encrypted SSL protocol.
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !!successMessage}
              className="w-full bg-[#6F4E37] hover:bg-[#583e2b] dark:bg-[#E6C280] dark:text-zinc-950 dark:hover:bg-[#d4b06c] text-white text-xs font-mono font-bold uppercase tracking-widest py-4 rounded-xl transition-all shadow-xl hover:shadow-2xl active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>

          <div className="text-center pt-4 text-xs text-zinc-500 dark:text-zinc-400 font-mono border-t border-zinc-100 dark:border-zinc-800">
            <Link
              href="/login"
              className="font-bold text-[#6F4E37] dark:text-[#E6C280] hover:text-[#583e2b] dark:hover:text-[#d4b06c] underline decoration-[#6F4E37]/30 dark:decoration-[#E6C280]/30 underline-offset-4 transition-colors"
            >
              Back to Log In
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
