"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, User } from "lucide-react";
import AppHeader from "@/components/app-shell/AppHeader";
import AppPageLayout from "@/components/app-shell/AppPageLayout";

export default function MobileSignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    setIsSubmitting(true);
    
    // Simulate user signup
    localStorage.setItem("drip_user", JSON.stringify({ name, email }));

    setTimeout(() => {
      window.location.href = "/mobile/account";
    }, 1000);
  };

  const handleSocialLogin = (platform: string) => {
    setIsSubmitting(true);
    localStorage.setItem("drip_user", JSON.stringify({ name: `${platform} User`, email: `user@${platform.toLowerCase()}.com` }));

    setTimeout(() => {
      window.location.href = "/mobile/account";
    }, 1000);
  };

  return (
    <AppPageLayout hasBottomNav={false}>
      <AppHeader variant="contextual" title="Create Account" fallbackUrl="/mobile/account" />
      
      <div className="flex flex-col min-h-screen bg-white dark:bg-zinc-950 px-6 pt-6 pb-24">
        
        <div className="space-y-2 mb-8 mt-4 text-center">
          <h1 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-white font-sans uppercase">
            Join <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280]">Culture</span>
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono uppercase tracking-widest pt-2">
            Gain Authorized Access
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="text-[10px] font-mono font-bold tracking-widest uppercase text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 px-4 py-3 text-center rounded-xl">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div className="relative group">
              <input
                type="text"
                required
                placeholder=" "
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="peer w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:border-[#6F4E37] dark:focus:border-zinc-500 rounded-2xl px-5 py-4 text-sm font-sans font-medium text-zinc-900 dark:text-white outline-none transition-all"
              />
              <label className="absolute left-5 top-4 text-xs font-mono font-bold uppercase tracking-[0.2em] text-zinc-400 peer-focus:-translate-y-8 peer-focus:text-[9px] peer-focus:text-zinc-900 dark:peer-focus:text-white peer-valid:-translate-y-8 peer-valid:text-[9px] transition-all duration-300 pointer-events-none">
                Full Name
              </label>
              <User className="absolute right-5 top-4 w-4 h-4 text-zinc-400" />
            </div>

            <div className="relative group mt-2">
              <input
                type="email"
                required
                placeholder=" "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="peer w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:border-[#6F4E37] dark:focus:border-zinc-500 rounded-2xl px-5 py-4 text-sm font-sans font-medium text-zinc-900 dark:text-white outline-none transition-all"
              />
              <label className="absolute left-5 top-4 text-xs font-mono font-bold uppercase tracking-[0.2em] text-zinc-400 peer-focus:-translate-y-8 peer-focus:text-[9px] peer-focus:text-zinc-900 dark:peer-focus:text-white peer-valid:-translate-y-8 peer-valid:text-[9px] transition-all duration-300 pointer-events-none">
                Email Address
              </label>
              <Mail className="absolute right-5 top-4 w-4 h-4 text-zinc-400" />
            </div>

            <div className="relative group mt-2">
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder=" "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="peer w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:border-[#6F4E37] dark:focus:border-zinc-500 rounded-2xl px-5 py-4 text-sm font-sans font-medium text-zinc-900 dark:text-white outline-none transition-all pr-12"
              />
              <label className="absolute left-5 top-4 text-xs font-mono font-bold uppercase tracking-[0.2em] text-zinc-400 peer-focus:-translate-y-8 peer-focus:text-[9px] peer-focus:text-zinc-900 dark:peer-focus:text-white peer-valid:-translate-y-8 peer-valid:text-[9px] transition-all duration-300 pointer-events-none">
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

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 py-4 rounded-xl font-bold active:scale-[0.98] transition-transform flex justify-center items-center gap-2 mt-2"
          >
            {isSubmitting ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <div className="mt-8 space-y-4">
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-200 dark:border-zinc-800" />
            </div>
            <span className="relative z-10 px-4 bg-white dark:bg-zinc-950 text-[9px] font-mono text-zinc-400 uppercase tracking-widest font-bold">
              Or Connect
            </span>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => handleSocialLogin("Google")}
              className="flex items-center justify-center gap-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl py-3.5 text-xs font-bold text-zinc-900 dark:text-white active:scale-[0.98] transition-transform"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.92h6.69c-.29 1.5-.14 3.09-.59 4.14v2.58h4.19c2.44-2.25 3.85-5.56 3.85-9.25z" />
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-4.19-2.58c-1.1.77-2.54 1.25-4.14 1.25-3.18 0-5.88-2.15-6.84-5.05H.59v2.67C2.58 20.34 7.02 24 12 24z" />
                <path fill="#FBBC05" d="M5.16 14.71c-.25-.77-.39-1.6-.39-2.46s.14-1.69.39-2.46V7.12H.59C.2 8.56 0 10.23 0 12s.2 3.44.59 4.88l4.57-2.17z" />
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.93 1.19 15.24 0 12 0 7.02 0 2.58 3.66.59 6.88l4.57 2.17c.96-2.9 3.66-5.05 6.84-5.05z" />
              </svg>
              Continue with Google
            </button>
            <button
              onClick={() => handleSocialLogin("Apple")}
              className="flex items-center justify-center gap-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl py-3.5 text-xs font-bold text-zinc-900 dark:text-white active:scale-[0.98] transition-transform"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.11.67-2.83 1.51-.62.71-1.16 1.85-1.01 2.96 1.1.09 2.19-.58 2.85-1.41z" />
              </svg>
              Continue with Apple
            </button>
          </div>
        </div>

        <div className="text-center mt-auto pt-8 pb-4 text-xs text-zinc-500">
          <span>Already registered? </span>
          <Link
            href="/mobile/login"
            className="font-bold text-zinc-900 dark:text-white hover:underline"
          >
            Sign In
          </Link>
        </div>

      </div>
    </AppPageLayout>
  );
}
