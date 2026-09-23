"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ShieldCheck, CheckCircle2, AlertCircle, Smartphone } from "lucide-react";
import AppHeader from "@/components/app-shell/AppHeader";
import AppPageLayout from "@/components/app-shell/AppPageLayout";

function OtpLoginForm() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [mobileNumber, setMobileNumber] = useState("");
  
  // OTP State
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [countdown, setCountdown] = useState(30);
  const [canResend, setCanResend] = useState(false);

  // Mask identifier
  const maskedIdentifier = React.useMemo(() => {
    if (mobileNumber.length >= 10) {
      return `+91 ${mobileNumber.slice(0, 2)}******${mobileNumber.slice(-2)}`;
    }
    return `***${mobileNumber.slice(-2)}`;
  }, [mobileNumber]);

  // Countdown timer
  useEffect(() => {
    if (step === 2) {
      if (countdown > 0) {
        const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        return () => clearTimeout(timer);
      } else {
        setCanResend(true);
      }
    }
  }, [countdown, step]);

  // Auto-focus first input on step 2
  useEffect(() => {
    if (step === 2 && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [step]);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (mobileNumber.length < 10) {
      setError("Please enter a valid mobile number.");
      return;
    }
    setError(null);
    setStep(2);
    setCountdown(30);
    setCanResend(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);
    setError(null);

    if (value && index < 5) {
      setActiveIndex(index + 1);
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        setActiveIndex(index - 1);
        inputRefs.current[index - 1]?.focus();
      } else {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
        setError(null);
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").trim();
    if (/^\d{6}$/.test(pastedData)) {
      const newOtp = pastedData.split("");
      setOtp(newOtp);
      setActiveIndex(5);
      inputRefs.current[5]?.focus();
      setError(null);
    }
  };

  const handleResend = () => {
    if (!canResend) return;
    setOtp(Array(6).fill(""));
    setActiveIndex(0);
    inputRefs.current[0]?.focus();
    setCanResend(false);
    setCountdown(30);
    setError(null);
  };

  const handleVerify = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const otpValue = otp.join("");
    if (otpValue.length !== 6) return;

    setIsVerifying(true);
    setError(null);

    // Mock Backend validation
    setTimeout(() => {
      setIsVerifying(false);
      // Backend is not connected, so we simulate a state that requires a real backend
      setError("Backend OTP Verification Required. Integration pending.");
    }, 1000);
  };

  if (step === 1) {
    return (
      <div className="flex flex-col min-h-screen bg-white dark:bg-zinc-950 px-6 pt-6 pb-24">
        <div className="space-y-2 mb-8 mt-4 text-center">
          <h1 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-white font-sans uppercase">
            SIGN IN WITH OTP
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono uppercase tracking-widest pt-2">
            Secure Passwordless Login
          </p>
        </div>

        <form onSubmit={handleSendOtp} className="space-y-6 max-w-sm mx-auto w-full">
          {error && (
            <div className="text-[10px] font-mono font-bold tracking-widest uppercase text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 px-4 py-3 text-center rounded-xl">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div className="relative group">
              <input
                type="tel"
                required
                placeholder=" "
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                maxLength={10}
                className="peer w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:border-[#6F4E37] dark:focus:border-zinc-500 rounded-2xl pl-16 pr-5 py-4 text-sm font-sans font-medium text-zinc-900 dark:text-white outline-none transition-all"
              />
              <div className="absolute left-5 top-4 flex items-center gap-2 pointer-events-none text-zinc-400 font-medium text-sm">
                <span>+91</span>
              </div>
              <label className="absolute left-16 top-4 text-xs font-mono font-bold uppercase tracking-[0.2em] text-zinc-400 peer-focus:-translate-y-8 peer-focus:-translate-x-11 peer-focus:text-[9px] peer-focus:text-zinc-900 dark:peer-focus:text-white peer-valid:-translate-y-8 peer-valid:-translate-x-11 peer-valid:text-[9px] transition-all duration-300 pointer-events-none">
                Mobile Number
              </label>
              <Smartphone className="absolute right-5 top-4 w-4 h-4 text-zinc-400" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 py-4 rounded-xl font-bold active:scale-[0.98] transition-transform flex justify-center items-center gap-2 mt-2 shadow-xl shadow-zinc-200 dark:shadow-none font-mono tracking-widest uppercase text-[11px]"
          >
            SEND OTP
          </button>
        </form>

        <div className="mt-8 space-y-4 max-w-sm mx-auto w-full">
          <Link
            href="/mobile/login"
            className="w-full text-zinc-900 dark:text-white py-4 rounded-xl font-bold active:scale-[0.98] transition-transform flex justify-center items-center gap-2 font-sans text-sm underline underline-offset-4"
          >
            Sign in with password
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-zinc-950 px-6 pt-6 pb-24">
      <div className="space-y-3 mb-8 mt-4 text-center">
        <div className="w-14 h-14 bg-zinc-100 dark:bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-4 border border-zinc-200 dark:border-zinc-800">
          <ShieldCheck className="w-6 h-6 text-[#6F4E37] dark:text-[#E6C280]" />
        </div>
        <h1 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white font-sans uppercase">
          VERIFY OTP
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 font-sans max-w-[260px] mx-auto">
          Enter the 6-digit code sent to <span className="font-bold text-zinc-900 dark:text-zinc-300">{maskedIdentifier}</span>
        </p>
      </div>

      <form onSubmit={handleVerify} className="space-y-8 max-w-sm mx-auto w-full">
        {error && (
          <div className="flex items-center gap-2 text-[10px] font-mono font-bold tracking-widest uppercase text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 px-4 py-3 rounded-xl">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="flex justify-between gap-2 sm:gap-3">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              inputMode="numeric"
              maxLength={1}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={handlePaste}
              onFocus={() => setActiveIndex(index)}
              className={`w-11 h-14 sm:w-12 sm:h-16 text-center text-xl font-bold font-mono rounded-xl border-2 transition-all outline-none ${
                activeIndex === index
                  ? "border-[#6F4E37] dark:border-[#E6C280] bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-white scale-105"
                  : digit
                  ? "border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-white"
                  : "border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 text-zinc-900 dark:text-white"
              }`}
            />
          ))}
        </div>

        <div className="flex flex-col gap-4">
          <button
            type="submit"
            disabled={otp.join("").length !== 6 || isVerifying}
            className="w-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 h-14 rounded-xl font-bold active:scale-[0.98] transition-all disabled:opacity-50 disabled:active:scale-100 flex justify-center items-center shadow-xl shadow-zinc-200 dark:shadow-none uppercase tracking-widest text-[11px] font-mono"
          >
            {isVerifying ? "Verifying..." : "VERIFY OTP"}
          </button>

          <div className="text-center">
            <button
              type="button"
              disabled={!canResend}
              onClick={handleResend}
              className={`text-[10px] font-mono font-bold uppercase tracking-widest transition-colors ${
                canResend
                  ? "text-zinc-900 dark:text-white active:scale-95"
                  : "text-zinc-400 dark:text-zinc-600"
              }`}
            >
              {canResend ? "Resend OTP" : `Resend OTP in 00:${countdown.toString().padStart(2, "0")}s`}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default function MobileOtpPage() {
  return (
    <AppPageLayout hasBottomNav={false}>
      <AppHeader variant="contextual" title="Sign In" fallbackUrl="/mobile/login" />
      <Suspense fallback={<div className="min-h-screen bg-white dark:bg-zinc-950" />}>
        <OtpLoginForm />
      </Suspense>
    </AppPageLayout>
  );
}
