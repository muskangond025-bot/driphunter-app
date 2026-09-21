"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, ShieldCheck, ArrowRight, User } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SearchOverlay from "@/components/layout/SearchOverlay";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    setIsSubmitting(true);
    
    setTimeout(() => {
      window.location.href = "/";
    }, 1500);
  };

  const handleSocialLogin = (platform: string) => {
    setIsSubmitting(true);
    setTimeout(() => {
      window.location.href = "/";
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 dark:bg-[#0a0a0a] text-foreground">
      <Navbar onSearchClick={() => setIsSearchOpen(true)} />
      
      <main className="flex-grow relative flex items-center justify-center overflow-hidden select-none py-24 px-4">
        
        {/* ─── DYNAMIC AVANT-GARDE BACKGROUND ─── */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 flex items-center justify-center">
          {/* Massive Typography Watermark */}
          <div className="absolute whitespace-nowrap text-[25vw] font-black font-sans tracking-tighter text-zinc-900/5 dark:text-white/[0.02] leading-none transform -rotate-6 scale-150 select-none">
            DRIPHUNTER
          </div>
          <div className="absolute whitespace-nowrap text-[20vw] font-black font-serif italic tracking-tighter text-[#6F4E37]/5 dark:text-[#E6C280]/[0.03] leading-none transform rotate-12 scale-150 translate-y-1/2 select-none">
            ENLIST
          </div>
          
          {/* Ambient Glow Orbs */}
          <div className="absolute top-1/4 right-1/4 w-[40vw] h-[40vw] bg-[#6F4E37]/10 dark:bg-[#6F4E37]/20 rounded-full blur-[100px] animate-pulse"></div>
          <div className="absolute bottom-1/4 left-1/4 w-[50vw] h-[50vw] bg-zinc-400/10 dark:bg-zinc-800/40 rounded-full blur-[120px]"></div>
        </div>

        {/* ─── GLASSMORPHISM FORM CONTAINER ─── */}
        <div className="relative z-10 w-full max-w-[480px] animate-fade-in">
          
          {/* Floating Glass Panel */}
          <div className="bg-white/70 dark:bg-black/40 backdrop-blur-2xl border border-zinc-200/50 dark:border-white/10 rounded-[2.5rem] p-8 sm:p-12 shadow-[0_0_80px_rgba(0,0,0,0.05)] dark:shadow-[0_0_80px_rgba(0,0,0,0.4)]">
            
            <div className="space-y-2 mb-10 text-center">
              <div className="w-12 h-12 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                <User className="w-5 h-5" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-900 dark:text-white font-sans uppercase">
                Join <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280]">Culture</span>
              </h1>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono uppercase tracking-widest pt-2">
                Gain Authorized Access
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {error && (
                <div className="text-[10px] font-mono font-bold tracking-widest uppercase text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 px-4 py-3 text-center rounded-xl">
                  {error}
                </div>
              )}

              <div className="space-y-6">
                
                <div className="relative group">
                  <input
                    type="text"
                    required
                    placeholder=" "
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="peer w-full bg-zinc-100/50 dark:bg-zinc-900/50 border border-transparent focus:border-[#6F4E37] dark:focus:border-white/30 rounded-2xl px-5 py-4 text-sm font-sans font-medium text-zinc-900 dark:text-white outline-none transition-all"
                  />
                  <label className="absolute left-5 top-4 text-xs font-mono font-bold uppercase tracking-[0.2em] text-zinc-400 peer-focus:-translate-y-8 peer-focus:text-[9px] peer-focus:text-zinc-900 dark:peer-focus:text-white peer-valid:-translate-y-8 peer-valid:text-[9px] transition-all duration-300 pointer-events-none">
                    Full Name
                  </label>
                  <User className="absolute right-5 top-4 w-4 h-4 text-zinc-400" />
                </div>

                <div className="relative group pt-2">
                  <input
                    type="email"
                    required
                    placeholder=" "
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="peer w-full bg-zinc-100/50 dark:bg-zinc-900/50 border border-transparent focus:border-[#6F4E37] dark:focus:border-white/30 rounded-2xl px-5 py-4 text-sm font-sans font-medium text-zinc-900 dark:text-white outline-none transition-all"
                  />
                  <label className="absolute left-5 top-6 text-xs font-mono font-bold uppercase tracking-[0.2em] text-zinc-400 peer-focus:-translate-y-10 peer-focus:text-[9px] peer-focus:text-zinc-900 dark:peer-focus:text-white peer-valid:-translate-y-10 peer-valid:text-[9px] transition-all duration-300 pointer-events-none">
                    Email Address
                  </label>
                  <Mail className="absolute right-5 top-6 w-4 h-4 text-zinc-400" />
                </div>

                <div className="relative group pt-2">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder=" "
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="peer w-full bg-zinc-100/50 dark:bg-zinc-900/50 border border-transparent focus:border-[#6F4E37] dark:focus:border-white/30 rounded-2xl px-5 py-4 text-sm font-sans font-medium text-zinc-900 dark:text-white outline-none transition-all pr-12"
                  />
                  <label className="absolute left-5 top-6 text-xs font-mono font-bold uppercase tracking-[0.2em] text-zinc-400 peer-focus:-translate-y-10 peer-focus:text-[9px] peer-focus:text-zinc-900 dark:peer-focus:text-white peer-valid:-translate-y-10 peer-valid:text-[9px] transition-all duration-300 pointer-events-none">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-5 top-4 text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-1.5 opacity-60 pt-2">
                <ShieldCheck className="w-3.5 h-3.5 text-zinc-900 dark:text-white" />
                <span className="text-[9px] text-zinc-900 dark:text-white font-mono uppercase tracking-widest font-bold">Secured by Drip Hunter Shield</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-zinc-900 hover:bg-black dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-zinc-900 py-4.5 rounded-2xl text-[10px] font-mono font-black uppercase tracking-[0.25em] transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 active:translate-y-0 disabled:opacity-70 disabled:hover:translate-y-0 flex justify-center items-center gap-3 mt-4"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-3.5 h-3.5 border-2 border-white/20 dark:border-zinc-900/20 border-t-white dark:border-t-zinc-900 rounded-full animate-spin" />
                    Registering...
                  </div>
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 space-y-4">
              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-zinc-200 dark:border-white/10" />
                </div>
                <span className="relative z-10 px-4 bg-white dark:bg-black text-[9px] font-mono text-zinc-400 uppercase tracking-widest font-bold">
                  Or Connect
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => handleSocialLogin("Google")}
                  className="flex items-center justify-center gap-2 bg-zinc-50 hover:bg-zinc-100 dark:bg-white/5 dark:hover:bg-white/10 rounded-xl py-3.5 text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-900 dark:text-white transition-all"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.92h6.69c-.29 1.5-.14 3.09-.59 4.14v2.58h4.19c2.44-2.25 3.85-5.56 3.85-9.25z" />
                    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-4.19-2.58c-1.1.77-2.54 1.25-4.14 1.25-3.18 0-5.88-2.15-6.84-5.05H.59v2.67C2.58 20.34 7.02 24 12 24z" />
                    <path fill="#FBBC05" d="M5.16 14.71c-.25-.77-.39-1.6-.39-2.46s.14-1.69.39-2.46V7.12H.59C.2 8.56 0 10.23 0 12s.2 3.44.59 4.88l4.57-2.17z" />
                    <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.93 1.19 15.24 0 12 0 7.02 0 2.58 3.66.59 6.88l4.57 2.17c.96-2.9 3.66-5.05 6.84-5.05z" />
                  </svg>
                  Google
                </button>
                <button
                  onClick={() => handleSocialLogin("Apple")}
                  className="flex items-center justify-center gap-2 bg-zinc-50 hover:bg-zinc-100 dark:bg-white/5 dark:hover:bg-white/10 rounded-xl py-3.5 text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-900 dark:text-white transition-all"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.11.67-2.83 1.51-.62.71-1.16 1.85-1.01 2.96 1.1.09 2.19-.58 2.85-1.41z" />
                  </svg>
                  Apple
                </button>
              </div>
            </div>

            <div className="text-center pt-8 text-[10px] text-zinc-500 font-mono uppercase tracking-widest">
              <span>Already have an account? </span>
              <Link
                href="/login"
                className="font-bold text-zinc-900 dark:text-white hover:text-[#6F4E37] dark:hover:text-[#E6C280] transition-colors ml-1"
              >
                Log In
              </Link>
            </div>

          </div>
        </div>
      </main>

      <Footer />
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
}
