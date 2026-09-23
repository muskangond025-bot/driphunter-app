"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Lock, Shield, Eye, EyeOff, CheckCircle2, Circle } from "lucide-react";
import AppHeader from "@/components/app-shell/AppHeader";
import AppPageLayout from "@/components/app-shell/AppPageLayout";

export default function MobileResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Requirements state
  const [reqs, setReqs] = useState({
    length: false,
    number: false,
    special: false,
    match: false,
  });

  useEffect(() => {
    setReqs({
      length: password.length >= 8,
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      match: password.length > 0 && password === confirmPassword,
    });
  }, [password, confirmPassword]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reqs.length || !reqs.number || !reqs.special || !reqs.match) {
      setError("Please ensure all password requirements are met.");
      return;
    }
    setError("");
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      setError("Backend Integration Required for Password Reset.");
    }, 1000);
  };

  return (
    <AppPageLayout hasBottomNav={false}>
      <AppHeader variant="contextual" title="Reset Password" fallbackUrl="/mobile/login" />
      
      <div className="flex flex-col min-h-screen bg-white dark:bg-zinc-950 px-6 pt-6 pb-24">
        
        <div className="space-y-2 mb-8 mt-4 text-center">
          <h1 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-white font-sans uppercase">
            Update <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280]">Password</span>
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono pt-2 leading-relaxed">
            Create a new secure password for your Drip Hunter vault.
          </p>
        </div>

        {!successMessage ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="text-[10px] font-mono font-bold tracking-widest uppercase text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 px-4 py-3 text-center rounded-xl">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div className="relative group">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder=" "
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="peer w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:border-[#6F4E37] dark:focus:border-zinc-500 rounded-2xl px-5 py-4 text-sm font-sans font-medium text-zinc-900 dark:text-white outline-none transition-all pr-12"
                />
                <label className="absolute left-5 top-4 text-xs font-mono font-bold uppercase tracking-[0.2em] text-zinc-400 peer-focus:-translate-y-8 peer-focus:text-[9px] peer-focus:text-zinc-900 dark:peer-focus:text-white peer-valid:-translate-y-8 peer-valid:text-[9px] transition-all duration-300 pointer-events-none">
                  New Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-4 text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              <div className="relative group">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  placeholder=" "
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="peer w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:border-[#6F4E37] dark:focus:border-zinc-500 rounded-2xl px-5 py-4 text-sm font-sans font-medium text-zinc-900 dark:text-white outline-none transition-all pr-12"
                />
                <label className="absolute left-5 top-4 text-xs font-mono font-bold uppercase tracking-[0.2em] text-zinc-400 peer-focus:-translate-y-8 peer-focus:text-[9px] peer-focus:text-zinc-900 dark:peer-focus:text-white peer-valid:-translate-y-8 peer-valid:text-[9px] transition-all duration-300 pointer-events-none">
                  Confirm Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-5 top-4 text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 rounded-xl p-4 space-y-2.5">
              <p className="text-[10px] font-mono font-bold text-zinc-900 dark:text-white uppercase tracking-widest mb-3">
                Password Requirements
              </p>
              <div className="flex items-center gap-2 text-xs font-sans">
                {reqs.length ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Circle className="w-4 h-4 text-zinc-300 dark:text-zinc-700" />}
                <span className={reqs.length ? "text-zinc-900 dark:text-zinc-300" : "text-zinc-500 dark:text-zinc-500"}>At least 8 characters</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-sans">
                {reqs.number ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Circle className="w-4 h-4 text-zinc-300 dark:text-zinc-700" />}
                <span className={reqs.number ? "text-zinc-900 dark:text-zinc-300" : "text-zinc-500 dark:text-zinc-500"}>Contains a number</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-sans">
                {reqs.special ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Circle className="w-4 h-4 text-zinc-300 dark:text-zinc-700" />}
                <span className={reqs.special ? "text-zinc-900 dark:text-zinc-300" : "text-zinc-500 dark:text-zinc-500"}>Contains a special character</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-sans">
                {reqs.match ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Circle className="w-4 h-4 text-zinc-300 dark:text-zinc-700" />}
                <span className={reqs.match ? "text-zinc-900 dark:text-zinc-300" : "text-zinc-500 dark:text-zinc-500"}>Passwords match</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || !reqs.length || !reqs.number || !reqs.special || !reqs.match}
              className="w-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 py-4 rounded-xl font-bold active:scale-[0.98] transition-transform flex justify-center items-center gap-2 mt-2 disabled:opacity-50 disabled:active:scale-100"
            >
              {isLoading ? "UPDATING..." : "RESET PASSWORD"}
            </button>
          </form>
        ) : (
          <div className="text-center space-y-6 py-10">
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-emerald-500" />
            </div>
            <h2 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white font-sans uppercase">Password Updated</h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 font-mono leading-relaxed">
              Your password has been successfully reset. You can now use your new password to log in.
            </p>
            <Link
              href="/mobile/login"
              className="w-full inline-block bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 py-4 rounded-xl font-bold active:scale-[0.98] transition-transform mt-4 font-sans text-sm"
            >
              Return to Log In
            </Link>
          </div>
        )}

      </div>
    </AppPageLayout>
  );
}
