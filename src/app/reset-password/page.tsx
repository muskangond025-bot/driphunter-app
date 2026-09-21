"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Lock, Shield, Eye, EyeOff, CheckCircle2, Circle } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
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
    
    // Simulate API call
    setTimeout(() => {
      setSuccessMessage("Password successfully updated!");
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
              Update <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280]">Password</span>
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 font-sans leading-relaxed pt-2">
              Create a new secure password for your Drip Hunter vault.
            </p>
          </div>

          {/* Form */}
          {!successMessage ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="text-xs font-mono text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 px-4 py-3 rounded-xl text-center">
                  {error}
                </div>
              )}

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-widest block font-bold">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl py-3.5 pl-11 pr-11 text-sm font-medium text-zinc-900 dark:text-white placeholder-zinc-400 outline-none focus:border-[#6F4E37] dark:focus:border-[#E6C280] transition-colors"
                    />
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6F4E37] dark:text-[#E6C280]" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-widest block font-bold">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl py-3.5 pl-11 pr-11 text-sm font-medium text-zinc-900 dark:text-white placeholder-zinc-400 outline-none focus:border-[#6F4E37] dark:focus:border-[#E6C280] transition-colors"
                    />
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6F4E37] dark:text-[#E6C280]" />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Requirements Checklist */}
              <div className="border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 rounded-xl p-4 space-y-2.5">
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

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || !reqs.length || !reqs.number || !reqs.special || !reqs.match}
                className="w-full bg-[#6F4E37] hover:bg-[#583e2b] dark:bg-[#E6C280] dark:text-zinc-950 dark:hover:bg-[#d4b06c] text-white text-xs font-mono font-bold uppercase tracking-widest py-4 rounded-xl transition-all shadow-xl hover:shadow-2xl active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Updating..." : "Update Password"}
              </button>
            </form>
          ) : (
            <div className="text-center space-y-6 py-6">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-emerald-500" />
              </div>
              <h2 className="text-xl font-playfair font-bold text-zinc-900 dark:text-white">Password Updated</h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 font-sans leading-relaxed">
                Your password has been successfully reset. You can now use your new password to log in.
              </p>
              <Link
                href="/login"
                className="w-full inline-block bg-[#6F4E37] hover:bg-[#583e2b] dark:bg-[#E6C280] dark:text-zinc-950 dark:hover:bg-[#d4b06c] text-white text-xs font-mono font-bold uppercase tracking-widest py-4 rounded-xl transition-all shadow-xl hover:shadow-2xl active:scale-[0.98]"
              >
                Return to Log In
              </Link>
            </div>
          )}

          {/* Secure indicator */}
          <div className="flex justify-center items-center gap-2 text-zinc-400 dark:text-zinc-500 border-t border-zinc-100 dark:border-zinc-800 pt-6">
            <Shield className="w-3.5 h-3.5" />
            <span className="text-[9px] font-mono uppercase tracking-widest">SSL Encrypted</span>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
