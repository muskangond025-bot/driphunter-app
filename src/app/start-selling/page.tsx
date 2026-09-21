"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { 
  CheckCircle2, 
  Circle, 
  ArrowRight,
  Globe,
  Percent,
  UserCheck,
  Truck,
  Calculator,
  HeadphonesIcon,
  Zap,
  Smartphone
} from "lucide-react";

export default function StartSellingPage() {
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mobileOtpSent, setMobileOtpSent] = useState(false);
  const [emailOtpSent, setEmailOtpSent] = useState(false);
  
  // Step Management
  const [step, setStep] = useState(1);
  const [isApplicationSubmitted, setIsApplicationSubmitted] = useState(false);

  // Step 2 Form State
  const [gstin, setGstin] = useState("");
  const [storeName, setStoreName] = useState("");
  const [pincode, setPincode] = useState("");

  const benefits = [
    {
      icon: Globe,
      title: "Sell Across India",
      desc: "Reach over 500,000+ luxury streetwear enthusiasts across 27,000+ pincodes."
    },
    {
      icon: Percent,
      title: "Higher Profits",
      desc: "With a flat 8% commission, you take the absolute highest margins in the industry."
    },
    {
      icon: UserCheck,
      title: "Account Management",
      desc: "Our dedicated growth managers will help your business scale on DripHunter."
    },
    {
      icon: Truck,
      title: "Zero Return Charges",
      desc: "With our strict authentication process, ship your products stress-free. No fake returns."
    },
    {
      icon: Calculator,
      title: "Simple Pricing Calculator",
      desc: "Use our transparent pricing calculator to decide the most competitive selling price."
    },
    {
      icon: HeadphonesIcon,
      title: "24×7 Seller Support",
      desc: "All your queries and issues are answered instantly by our dedicated Seller Support Team."
    },
    {
      icon: Zap,
      title: "Fast & Regular Payments",
      desc: "Get payments as fast as T+1 day from the date of successful authentication."
    },
    {
      icon: Smartphone,
      title: "Business on the go",
      desc: "Download the DripHunter Seller App to manage your inventory anywhere, anytime."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5] dark:bg-[#0C0B0A] text-zinc-900 dark:text-white font-sans antialiased">
      <Navbar />

      <main className="flex-grow pt-24 pb-0">
        
        {/* Top Section: Registration Wizard */}
        <section className="px-6 sm:px-12 max-w-7xl mx-auto py-12">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
            
            {/* Left Column: Form */}
            <div className="lg:w-3/5">
              
              {/* Stepper */}
              <div className="flex items-center gap-4 mb-10">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className={`w-5 h-5 ${step >= 1 ? "text-emerald-600 dark:text-emerald-400" : "text-zinc-400"}`} />
                  <span className={`text-sm font-bold uppercase tracking-widest ${step >= 1 ? "text-zinc-900 dark:text-white" : "text-zinc-500"}`}>Email & Password</span>
                </div>
                <div className={`w-16 h-px ${step >= 2 ? "bg-emerald-600 dark:bg-emerald-400" : "bg-stone-300 dark:bg-zinc-700"}`}></div>
                <div className={`flex items-center gap-2 ${step === 2 ? "" : "opacity-50"}`}>
                  {step === 2 ? (
                    <Circle className="w-5 h-5 text-zinc-900 dark:text-white fill-[#6F4E37] dark:fill-[#E6C280] text-transparent" />
                  ) : (
                    <Circle className="w-5 h-5 text-zinc-400" />
                  )}
                  <span className={`text-sm font-bold uppercase tracking-widest ${step === 2 ? "text-zinc-900 dark:text-white" : "text-zinc-500"}`}>Business Details</span>
                </div>
              </div>

              {/* Form Fields */}
              {isApplicationSubmitted ? (
                <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 p-8 rounded-2xl flex flex-col items-center justify-center text-center animate-fade-in-up min-h-[400px]">
                  <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-800/50 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h3 className="text-2xl font-playfair font-bold text-zinc-900 dark:text-white mb-2">Application Submitted!</h3>
                  <p className="text-zinc-600 dark:text-zinc-400 mb-8">Your seller application is under review. Our team will contact you within 24 hours.</p>
                  <Link href="/seller-hub" className="bg-[#6F4E37] dark:bg-[#E6C280] text-white dark:text-black font-bold uppercase tracking-wider text-sm px-8 py-4 rounded-xl hover:bg-[#5C3D2E] dark:hover:bg-[#d4b06a] transition-colors">
                    Go to Dashboard
                  </Link>
                </div>
              ) : step === 1 ? (
                <form className="space-y-6 animate-fade-in" onSubmit={(e) => {
                  e.preventDefault();
                  setStep(2);
                }}>
                  
                  <div className="relative">
                    <input 
                      type="tel" 
                      placeholder="Enter Mobile Number *"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      required
                      className="w-full bg-white dark:bg-[#151515] border border-stone-200 dark:border-zinc-800 rounded-xl px-5 py-4 focus:outline-none focus:border-[#6F4E37] dark:focus:border-[#E6C280] transition-colors placeholder:text-zinc-400"
                    />
                    <button 
                      type="button" 
                      onClick={() => { if(mobile) setMobileOtpSent(true); }}
                      className={`absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold uppercase tracking-widest transition-colors ${mobileOtpSent ? "text-emerald-600 dark:text-emerald-400" : "text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"}`}
                    >
                      {mobileOtpSent ? "OTP Sent!" : "Send OTP"}
                    </button>
                  </div>

                  <div className="relative">
                    <input 
                      type="email" 
                      placeholder="Email ID *"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full bg-white dark:bg-[#151515] border border-stone-200 dark:border-zinc-800 rounded-xl px-5 py-4 focus:outline-none focus:border-[#6F4E37] dark:focus:border-[#E6C280] transition-colors placeholder:text-zinc-400"
                    />
                    <button 
                      type="button" 
                      onClick={() => { if(email) setEmailOtpSent(true); }}
                      className={`absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold uppercase tracking-widest transition-colors ${emailOtpSent ? "text-emerald-600 dark:text-emerald-400" : "text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"}`}
                    >
                      {emailOtpSent ? "OTP Sent!" : "Send OTP"}
                    </button>
                  </div>

                  <div>
                    <input 
                      type="password" 
                      placeholder="Create Password *"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full bg-white dark:bg-[#151515] border border-stone-200 dark:border-zinc-800 rounded-xl px-5 py-4 focus:outline-none focus:border-[#6F4E37] dark:focus:border-[#E6C280] transition-colors placeholder:text-zinc-400"
                    />
                  </div>

                  <div>
                    <input 
                      type="password" 
                      placeholder="Confirm Password *"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="w-full bg-white dark:bg-[#151515] border border-stone-200 dark:border-zinc-800 rounded-xl px-5 py-4 focus:outline-none focus:border-[#6F4E37] dark:focus:border-[#E6C280] transition-colors placeholder:text-zinc-400"
                    />
                  </div>

                  <div className="pt-2">
                    <p className="text-sm text-zinc-500">
                      By continuing, I agree to DripHunter's <Link href="/terms" className="text-[#6F4E37] dark:text-[#E6C280] font-bold hover:underline">Terms of Use</Link> & <Link href="/privacy" className="text-[#6F4E37] dark:text-[#E6C280] font-bold hover:underline">Privacy Policy</Link>
                    </p>
                  </div>

                  <div className="pt-2">
                    <button type="submit" className="bg-[#6F4E37] dark:bg-[#E6C280] text-white dark:text-black font-bold uppercase tracking-wider text-sm px-8 py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-[#5C3D2E] dark:hover:bg-[#d4b06a] transition-colors shadow-lg shadow-[#6F4E37]/20 dark:shadow-[#E6C280]/20">
                      Register & Continue <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>

                </form>
              ) : (
                <form className="space-y-6 animate-fade-in-up" onSubmit={(e) => {
                  e.preventDefault();
                  setIsApplicationSubmitted(true);
                }}>
                  
                  <div>
                    <input 
                      type="text" 
                      placeholder="Enter GSTIN Number (Optional for individuals) *"
                      value={gstin}
                      onChange={(e) => setGstin(e.target.value)}
                      required
                      className="w-full bg-white dark:bg-[#151515] border border-stone-200 dark:border-zinc-800 rounded-xl px-5 py-4 focus:outline-none focus:border-[#6F4E37] dark:focus:border-[#E6C280] transition-colors placeholder:text-zinc-400"
                    />
                  </div>

                  <div>
                    <input 
                      type="text" 
                      placeholder="Enter Store / Brand Name *"
                      value={storeName}
                      onChange={(e) => setStoreName(e.target.value)}
                      required
                      className="w-full bg-white dark:bg-[#151515] border border-stone-200 dark:border-zinc-800 rounded-xl px-5 py-4 focus:outline-none focus:border-[#6F4E37] dark:focus:border-[#E6C280] transition-colors placeholder:text-zinc-400"
                    />
                  </div>

                  <div>
                    <input 
                      type="text" 
                      placeholder="Pickup Pincode *"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      required
                      className="w-full bg-white dark:bg-[#151515] border border-stone-200 dark:border-zinc-800 rounded-xl px-5 py-4 focus:outline-none focus:border-[#6F4E37] dark:focus:border-[#E6C280] transition-colors placeholder:text-zinc-400"
                    />
                  </div>
                  
                  <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/30 p-4 rounded-xl">
                    <p className="text-sm text-amber-800 dark:text-amber-400 font-medium">Note: You will be asked to verify your bank details and PAN card after your application is approved.</p>
                  </div>

                  <div className="pt-4 flex items-center gap-4">
                    <button type="button" onClick={() => setStep(1)} className="px-6 py-4 rounded-xl text-zinc-500 font-bold uppercase tracking-wider text-sm hover:text-zinc-900 dark:hover:text-white transition-colors">
                      Back
                    </button>
                    <button type="submit" className="flex-1 bg-[#6F4E37] dark:bg-[#E6C280] text-white dark:text-black font-bold uppercase tracking-wider text-sm px-8 py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-[#5C3D2E] dark:hover:bg-[#d4b06a] transition-colors shadow-lg shadow-[#6F4E37]/20 dark:shadow-[#E6C280]/20">
                      Submit Application <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Right Column: Social Proof & Promo */}
            <div className="lg:w-2/5 space-y-6">
              
              {/* Testimonial */}
              <div className="bg-white dark:bg-[#151515] border border-stone-200 dark:border-zinc-800 p-6 rounded-2xl shadow-sm flex gap-4 items-start">
                <Image 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80" 
                  alt="Seller Avatar"
                  width={50}
                  height={50}
                  className="rounded-full object-cover shrink-0"
                />
                <div>
                  <p className="text-sm text-zinc-700 dark:text-zinc-300 italic mb-3">
                    "Starting with 1 pair of Jordans, DripHunter helped me expand to a full vintage warehouse with 5x growth year on year!"
                  </p>
                  <p className="text-xs font-bold text-zinc-900 dark:text-white">Raju S., SneakerVault</p>
                </div>
              </div>

              {/* Promo Banner */}
              <div className="relative w-full h-[400px] rounded-2xl overflow-hidden group">
                <Image 
                  src="https://images.unsplash.com/photo-1556906781-9a412961c28c?w=600&q=80"
                  alt="Sneaker Warehouse Promo"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                  <h2 className="text-5xl font-black text-white italic tracking-tighter transform -skew-x-12 drop-shadow-2xl mb-2">
                    8% FLAT
                  </h2>
                  <h3 className="text-3xl font-black text-[#E6C280] uppercase tracking-widest transform -skew-x-12 drop-shadow-lg mb-6">
                    COMMISSION*
                  </h3>
                  <div className="bg-[#E6C280] text-black font-bold uppercase tracking-widest text-xs px-6 py-2 transform -skew-x-12">
                    Zyada mat socho, DripHunter pe becho!
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Bottom Section: Benefits */}
        <section className="bg-stone-100 dark:bg-[#111111] py-20 px-6 sm:px-12 mt-12">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-light font-playfair text-center text-zinc-900 dark:text-white mb-16">
              Why sell on <span className="font-serif italic font-bold text-[#6F4E37] dark:text-[#E6C280]">DripHunter?</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="flex flex-col items-start">
                  <div className="w-14 h-14 rounded-full bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 flex items-center justify-center mb-6 shadow-sm">
                    <benefit.icon className="w-6 h-6 text-[#6F4E37] dark:text-[#E6C280]" />
                  </div>
                  <h3 className="text-lg font-bold font-sans text-zinc-900 dark:text-white mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    {benefit.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}

