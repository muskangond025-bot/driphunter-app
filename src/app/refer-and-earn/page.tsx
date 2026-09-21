"use client";

import React, { useState, useRef } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Gift, Copy, Share2, Users, Info, Check, IndianRupee, Trophy, Link as LinkIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/SectionHeading";

const FAQS = [
  {
    question: "How do I refer a friend?",
    answer: "Share your unique referral link or code. When they sign up and complete their first qualifying purchase, the referral is counted.",
  },
  {
    question: "When do I get my reward?",
    answer: "You receive your store credit automatically after your friend's qualifying order is successfully delivered and fulfilled.",
  },
  {
    question: "Is there a limit to how many friends I can refer?",
    answer: "There is no limit to how many friends you can refer. Your credits stack with every successful referral.",
  },
  {
    question: "What happens if my friend's order is cancelled or returned?",
    answer: "If the qualifying order is cancelled or returned, the referral store credit will not be issued.",
  },
  {
    question: "Where can I use my referral credits?",
    answer: "Referral credits are issued as DripHunter store credit and can be applied toward any eligible purchase on our platform.",
  }
];

export default function ReferAndEarnPage() {
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const hubRef = useRef<HTMLDivElement>(null);
  const howItWorksRef = useRef<HTMLElement>(null);

  const scrollToRef = (ref: React.RefObject<HTMLElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const referralCode = "DRIP-ABH89X";
  const referralLink = "https://driphunter.com/ref/ABH89X";

  const referralHistory = [
    { name: "Rahul K.", status: "Completed", amount: "+₹500" },
    { name: "Priya S.", status: "Pending", amount: "--" },
    { name: "Aman T.", status: "Completed", amount: "+₹500" },
    { name: "Neha G.", status: "Failed", amount: "--" },
    { name: "Kunal M.", status: "Completed", amount: "+₹500" },
  ];

  const successfulReferrals = referralHistory.filter(h => h.status === 'Completed').length;
  const totalEarned = 1500; // Mock derived value

  const displayedHistory = referralHistory.slice(0, 4); // Show a few more since it's side-by-side now

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(`Join me on DripHunter and get 15% off your first qualifying purchase. Use my referral code ${referralCode}: ${referralLink}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Join me on DripHunter",
          text: `Get 15% off your first qualifying purchase with my referral code ${referralCode}.`,
          url: referralLink,
        });
      } catch (error) {
        console.error("Error sharing", error);
      }
    } else {
      handleCopy(referralLink, 'link');
    }
  };

  const handleCopy = (text: string, type: 'code' | 'link') => {
    navigator.clipboard.writeText(text);
    if (type === 'code') {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } else {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FCFAF7] text-zinc-900 selection:bg-[#C5A880] selection:text-white font-sans overflow-hidden">
      <Navbar />

      {/* Light Premium Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#FCFAF7]">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-[#EAD8C0]/20 blur-[120px] mix-blend-multiply animate-pulse-glow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] rounded-full bg-[#f4ece1]/40 blur-[150px] mix-blend-multiply" />
        <div className="absolute top-[30%] left-[60%] w-[40%] h-[40%] rounded-full bg-[#F2ECE4]/50 blur-[100px] mix-blend-multiply animate-float" />
        <div className="absolute inset-0 opacity-[0.4] mix-blend-overlay" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/rice-paper-2.png')" }}></div>
      </div>

      <main className="flex-grow pt-32 pb-24 relative z-10 space-y-32">
        
        {/* SECTION 1: HERO */}
        <section className="relative px-6 text-center flex flex-col items-center justify-center max-w-5xl mx-auto w-full min-h-[70vh] reveal visible">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/60 border border-[#C5A880]/20 backdrop-blur-md mb-10 shadow-sm">
            <Gift className="w-3.5 h-3.5 text-[#C5A880]" />
            <span className="text-xs uppercase tracking-widest text-[#6F4E37] font-mono font-bold">Premium Rewards Program</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-[#1a1a1a] font-playfair leading-[1.1] mb-8">
            REFER & <span className="font-serif italic font-normal text-[#C5A880]">EARN</span>
          </h1>
          
          <p className="text-base md:text-lg text-zinc-600 font-light max-w-2xl mx-auto leading-relaxed balance-text mb-10">
            Invite friends to DripHunter. Your friend gets a first-order discount. You earn store credit after their qualifying purchase is completed.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Button variant="drip" onClick={() => scrollToRef(hubRef)} className="w-full sm:w-auto px-10 py-7 rounded-full text-sm">
              START REFERRING
            </Button>
            <Button variant="ghost" onClick={() => scrollToRef(howItWorksRef)} className="w-full sm:w-auto px-10 py-7 rounded-full text-sm border border-zinc-200 hover:bg-zinc-100">
              HOW IT WORKS
            </Button>
          </div>
        </section>

        {/* SECTION 2: YOUR REFERRAL HUB */}
        <section ref={hubRef} className="scroll-mt-32 w-full max-w-[1600px] mx-auto px-6 sm:px-12 md:px-16 lg:px-20 reveal visible">
          <div className="border-b border-[#EAD8C0]/50 pb-6 mb-8">
            <SectionHeading
              variant="playfair"
              className="text-[#1a1a1a]"
              title={<>Your <span className="font-serif italic font-normal text-[#C5A880]">Referral Hub</span></>}
              eyebrow={
                <div className="flex items-center gap-2.5 mb-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#C5A880] animate-pulse" />
                  <span className="text-[10px] md:text-xs font-semibold tracking-[0.25em] text-[#6F4E37] uppercase font-mono">
                    Share & Track
                  </span>
                </div>
              }
            />
          </div>

          <div className="relative p-[1px] rounded-[2.5rem] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#EAD8C0] via-[#C5A880] to-[#6F4E37] opacity-100"></div>
            <div className="relative rounded-[39px] bg-gradient-to-br from-[#FCFAF7] to-white border border-[#EAD8C0] overflow-hidden shadow-[0_30px_60px_-15px_rgba(197,168,128,0.3)] p-6 md:p-10">
              {/* Premium Background Effects */}
              <div className="absolute inset-0 opacity-[0.03] mix-blend-multiply pointer-events-none" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')" }}></div>
              <div className="absolute top-[-20%] left-[-10%] w-[30rem] h-[30rem] bg-[#C5A880]/10 blur-[80px] rounded-full pointer-events-none"></div>
              <div className="absolute bottom-[-20%] right-[-10%] w-[30rem] h-[30rem] bg-[#6F4E37]/10 blur-[100px] rounded-full pointer-events-none"></div>

              <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center text-left">
                
                {/* Left Column: Codes & Links */}
                <div className="lg:col-span-7 space-y-8 lg:pr-10 lg:border-r lg:border-[#EAD8C0]/50 relative">
                  {/* Subtle highlight line */}
                  <div className="absolute right-[-1px] top-[10%] bottom-[10%] w-[1px] bg-gradient-to-b from-transparent via-[#C5A880]/50 to-transparent hidden lg:block" />

                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Trophy className="w-4 h-4 text-[#C5A880]" />
                      <label className="text-[10px] md:text-xs text-zinc-800 uppercase tracking-[0.25em] font-mono font-bold">Your Unique Code</label>
                    </div>
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 group/code">
                      <div className="bg-white border border-[#EAD8C0] rounded-2xl px-6 py-4 font-mono text-xl text-[#1a1a1a] tracking-[0.2em] shadow-inner relative overflow-hidden group-hover/code:border-[#C5A880] transition-all flex items-center justify-center font-bold w-full sm:w-auto flex-grow">
                        <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-[#6F4E37] to-[#C5A880] drop-shadow-sm">{referralCode}</span>
                      </div>
                      <button
                        onClick={() => handleCopy(referralCode, 'code')}
                        className="p-4 bg-gradient-to-r from-[#6F4E37] to-[#8B674B] hover:from-[#3B2C21] hover:to-[#6F4E37] text-white rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl shrink-0 w-full sm:w-40 flex items-center justify-center gap-2 h-full border border-[#8B674B]/50"
                      >
                        {copiedCode ? (
                          <>
                            <Check className="w-4 h-4 text-emerald-400" />
                            <span className="text-xs font-mono font-bold uppercase tracking-wider">COPIED</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            <span className="text-xs font-mono font-bold uppercase tracking-wider">COPY CODE</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                      <LinkIcon className="w-4 h-4 text-[#C5A880]" />
                      <label className="text-[10px] md:text-xs text-zinc-800 uppercase tracking-[0.25em] font-mono font-bold">Your Sharing Link</label>
                    </div>
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 group/link">
                      <div className="bg-white border border-[#EAD8C0] rounded-2xl px-6 py-4 font-sans text-sm text-zinc-800 font-bold shadow-inner group-hover/link:border-[#C5A880] transition-colors truncate break-all w-full sm:w-auto flex-grow text-center sm:text-left">
                        {referralLink}
                      </div>
                      <button
                        onClick={() => handleCopy(referralLink, 'link')}
                        className="p-4 bg-gradient-to-r from-[#6F4E37] to-[#8B674B] hover:from-[#3B2C21] hover:to-[#6F4E37] text-white rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl shrink-0 w-full sm:w-40 flex items-center justify-center gap-2 h-full border border-[#8B674B]/50"
                      >
                        {copiedLink ? (
                          <>
                            <Check className="w-4 h-4 text-emerald-400" />
                            <span className="text-xs font-mono font-bold uppercase tracking-wider">COPIED</span>
                          </>
                        ) : (
                          <>
                            <LinkIcon className="w-4 h-4" />
                            <span className="text-xs font-mono font-bold uppercase tracking-wider">COPY LINK</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right Column: Share Via & Stats */}
                <div className="lg:col-span-5 space-y-8 flex flex-col justify-center">
                  
                  {/* Share Via */}
                  <div className="flex flex-col gap-3 p-5 rounded-[24px] bg-zinc-50/80 border border-[#EAD8C0]/60 backdrop-blur-sm">
                    <span className="text-[10px] text-zinc-600 uppercase tracking-[0.2em] font-mono font-bold flex items-center gap-2">
                      <Share2 className="w-3 h-3 text-[#C5A880]" /> Quick Share
                    </span>
                    <div className="flex flex-wrap items-center gap-3 w-full">
                      <button onClick={handleShareWhatsApp} className="h-10 px-5 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366] text-[#25D366] hover:text-white border border-[#25D366]/30 flex items-center justify-center transition-all duration-300 shadow-sm gap-2 flex-grow sm:flex-grow-0">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
                        <span className="text-xs font-mono font-bold">WhatsApp</span>
                      </button>
                      <button onClick={handleNativeShare} className="h-10 px-5 rounded-xl bg-white hover:bg-zinc-100 border border-[#EAD8C0] text-[#6F4E37] flex items-center justify-center transition-all duration-300 shadow-sm gap-2 flex-grow sm:flex-grow-0">
                        <Share2 className="w-4 h-4" />
                        <span className="text-xs font-mono font-bold">More Options</span>
                      </button>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-[20px] bg-gradient-to-b from-white to-[#FCFAF7] border border-[#EAD8C0]/80 shadow-[inset_0_2px_4px_rgba(255,255,255,1),0_4px_10px_rgba(197,168,128,0.1)] group hover:-translate-y-1 transition-transform">
                      <div className="text-xl sm:text-2xl font-normal text-[#1a1a1a] font-mono mb-1">{3}</div>
                      <div className="text-[8px] sm:text-[9px] text-zinc-500 uppercase tracking-widest font-bold">Invites Sent</div>
                    </div>
                    <div className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-[20px] bg-gradient-to-b from-white to-[#FCFAF7] border border-[#EAD8C0]/80 shadow-[inset_0_2px_4px_rgba(255,255,255,1),0_4px_10px_rgba(197,168,128,0.1)] group hover:-translate-y-1 transition-transform">
                      <div className="text-xl sm:text-2xl font-normal text-[#1a1a1a] font-mono mb-1">{successfulReferrals}</div>
                      <div className="text-[8px] sm:text-[9px] text-zinc-500 uppercase tracking-widest font-bold">Successful</div>
                    </div>
                    <div className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-[20px] bg-gradient-to-br from-[#6F4E37] to-[#8B674B] border border-[#3B2C21]/20 shadow-[inset_0_1px_3px_rgba(255,255,255,0.2),0_4px_12px_rgba(111,78,55,0.3)] group hover:-translate-y-1 transition-transform">
                      <div className="text-xl sm:text-2xl font-normal text-white font-mono mb-1">₹{totalEarned}</div>
                      <div className="text-[8px] sm:text-[9px] text-[#EAD8C0] uppercase tracking-widest font-bold drop-shadow-sm">Total Earned</div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: HOW IT WORKS */}
        <section ref={howItWorksRef} className="scroll-mt-32 w-full max-w-[1600px] mx-auto px-6 sm:px-12 md:px-16 lg:px-20 reveal visible">
          <div className="border-b border-[#EAD8C0]/50 pb-6 mb-12">
            <SectionHeading
              variant="playfair"
              className="text-[#1a1a1a]"
              title={<>How <span className="font-serif italic font-normal text-[#C5A880]">It Works</span></>}
              eyebrow={
                <div className="flex items-center gap-2.5 mb-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#C5A880] animate-pulse" />
                  <span className="text-[10px] md:text-xs font-semibold tracking-[0.25em] text-[#6F4E37] uppercase font-mono">
                    The Process
                  </span>
                </div>
              }
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Users, title: "Invite", desc: "Share your unique referral link/code.", step: "01" },
              { icon: Check, title: "Friend Joins", desc: "Your friend receives 15% off their first qualifying purchase.", step: "02" },
              { icon: Gift, title: "You Earn", desc: "After the qualifying order is successfully delivered/fulfilled, you receive ₹500 store credit.", step: "03" },
            ].map((item, idx) => (
              <div key={idx} className="p-10 md:p-12 rounded-[2.5rem] bg-white border border-[#EAD8C0] relative overflow-hidden group hover:bg-[#FCFAF7] transition-all duration-700 shadow-md hover:shadow-lg hover:-translate-y-2">
                <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-[#C5A880] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-full bg-zinc-50 flex items-center justify-center border border-[#EAD8C0] mb-8 group-hover:border-[#C5A880] transition-colors duration-700 shadow-sm">
                    <item.icon className="w-6 h-6 text-[#6F4E37]" />
                  </div>
                  <div className="text-[12px] uppercase tracking-widest text-[#6F4E37] font-mono font-bold mb-3 block">{item.step} &mdash; {item.title}</div>
                  <p className="text-zinc-800 text-base md:text-lg leading-relaxed font-medium mt-4">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 4: THE PREMIUM REWARD */}
        <section className="w-full max-w-[1600px] mx-auto px-6 sm:px-12 md:px-16 lg:px-20 reveal visible">
          <div className="relative rounded-[3rem] overflow-hidden group p-12 md:p-24 flex flex-col md:flex-row items-center justify-between gap-16">
            <div className="absolute inset-0 bg-[#3B2C21] z-0"></div>
            
            <div className="absolute inset-0 z-0 opacity-40">
              <div className="absolute -top-32 -right-32 w-[40rem] h-[40rem] bg-[#EAD8C0]/20 blur-[120px] rounded-full group-hover:bg-[#C5A880]/20 transition-colors duration-1000"></div>
              <div className="absolute -bottom-32 -left-32 w-[40rem] h-[40rem] bg-[#1a1a1a]/60 blur-[120px] rounded-full group-hover:bg-[#EAD8C0]/10 transition-colors duration-1000"></div>
              <div className="absolute inset-0 mix-blend-overlay opacity-30" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/rice-paper-2.png')" }}></div>
            </div>
            
            <div className="relative z-10 space-y-8 max-w-2xl text-center md:text-left mx-auto md:mx-0">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white uppercase tracking-widest font-playfair">
                ₹500 Store <span className="font-serif italic font-normal text-[#C5A880]">Credit</span>
              </h2>
              <p className="text-zinc-300 text-lg md:text-xl font-light leading-relaxed">
                Per successful referral. Your credits can stack with every successful referral. Store credits can be applied toward any eligible purchase on DripHunter.
              </p>
            </div>
            
            <div className="shrink-0 relative z-10 mx-auto md:mx-0">
              <div className="absolute inset-0 bg-[#C5A880]/10 rounded-full blur-3xl transform scale-150"></div>
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full border border-white/20 bg-white/10 backdrop-blur-2xl shadow-[0_20px_50px_rgba(197,168,128,0.15)] group-hover:shadow-[0_30px_60px_rgba(197,168,128,0.25)] flex flex-col items-center justify-center transition-all duration-700 group-hover:scale-105">
                <div className="absolute inset-5 border border-dashed border-[#C5A880]/40 rounded-full animate-spin-clockwise" style={{ animationDuration: '40s' }}></div>
                <div className="flex items-center gap-3">
                  <IndianRupee className="w-10 h-10 text-[#C5A880]" />
                  <span className="text-7xl md:text-8xl font-light text-white tracking-tighter font-playfair">500</span>
                </div>
                <span className="text-[10px] md:text-xs text-[#EAD8C0] font-mono uppercase tracking-[0.2em] mt-4 font-bold text-center">Store Credit<br/>Per Referral</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: ACTIVITY & LEADERBOARD */}
        <section className="w-full max-w-[1600px] mx-auto px-6 sm:px-12 md:px-16 lg:px-20 reveal visible">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            
            {/* Left: Referral Activity - Ledger Layout */}
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-8 md:mb-12 border-b border-[#EAD8C0]/50 pb-6">
                <SectionHeading
                  variant="playfair-sm"
                  className="text-[#1a1a1a]"
                  title={<>Referral <span className="font-serif italic font-normal text-[#C5A880]">Activity</span></>}
                />
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="text-[10px] md:text-xs text-zinc-800 hover:text-[#6F4E37] transition-colors font-mono uppercase tracking-[0.2em] font-bold shrink-0">
                      View All
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl bg-[#FCFAF7] border-[#EAD8C0]">
                    <DialogHeader>
                      <DialogTitle className="font-playfair text-2xl font-normal text-[#1a1a1a]">Referral History</DialogTitle>
                    </DialogHeader>
                    <div className="mt-6 max-h-[60vh] overflow-y-auto pr-2">
                      <div className="space-y-3">
                        {referralHistory.map((history, idx) => (
                          <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-white border border-[#EAD8C0] shadow-sm">
                            <div>
                              <div className="font-medium text-[#1a1a1a]">{history.name}</div>
                              <div className="text-xs text-zinc-600 mt-1 font-mono uppercase tracking-widest font-bold">{history.status}</div>
                            </div>
                            <div className={cn(
                              "font-mono font-bold",
                              history.amount === "--" ? "text-zinc-500" : "text-emerald-700"
                            )}>
                              {history.amount}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              
              <div className="bg-white rounded-[2rem] border border-[#EAD8C0] shadow-md overflow-hidden">
                {/* Header row */}
                <div className="grid grid-cols-3 gap-2 sm:gap-4 px-6 sm:px-8 py-5 border-b border-[#EAD8C0] bg-zinc-50 text-[10px] uppercase font-mono font-bold tracking-widest text-zinc-800">
                  <div>REFERRED</div>
                  <div className="hidden sm:block">STATUS</div>
                  <div className="text-right">EARNED</div>
                </div>
                
                {/* Rows */}
                <div className="divide-y divide-[#EAD8C0]/30">
                  {displayedHistory.map((history, idx) => (
                    <div key={idx} className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4 px-6 sm:px-8 py-6 items-center hover:bg-white/60 transition-colors">
                      <div>
                        <div className="text-lg md:text-xl text-[#1a1a1a] font-medium font-playfair leading-none mb-2">{history.name}</div>
                        <span className={cn(
                          "sm:hidden inline-flex items-center gap-2",
                          history.status === "Completed" ? "text-emerald-700" :
                          history.status === "Pending" ? "text-amber-600" : "text-red-600"
                        )}>
                          <span className={cn(
                            "w-1.5 h-1.5 rounded-full",
                            history.status === "Completed" ? "bg-emerald-500" :
                            history.status === "Pending" ? "bg-amber-400" : "bg-red-500"
                          )}></span>
                          <span className="text-[10px] uppercase font-mono font-bold tracking-widest">{history.status}</span>
                        </span>
                      </div>
                      <div className="hidden sm:block">
                        <span className={cn(
                          "inline-flex items-center gap-2",
                          history.status === "Completed" ? "text-emerald-700" :
                          history.status === "Pending" ? "text-amber-600" : "text-red-600"
                        )}>
                          <span className={cn(
                            "w-1.5 h-1.5 rounded-full",
                            history.status === "Completed" ? "bg-emerald-500" :
                            history.status === "Pending" ? "bg-amber-400" : "bg-red-500"
                          )}></span>
                          <span className="text-[10px] uppercase font-mono font-bold tracking-widest">{history.status}</span>
                        </span>
                      </div>
                      <div className={cn(
                        "text-lg md:text-xl font-mono font-medium tracking-tight text-right",
                        history.amount === "--" ? "text-zinc-300" : "text-[#1a1a1a]"
                      )}>
                        {history.amount}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Leaderboard - Podium Layout */}
            <div className="space-y-6 lg:mt-16">
              <div className="mb-8 md:mb-12 border-b border-[#EAD8C0]/50 pb-6">
                <SectionHeading
                  variant="playfair-sm"
                  className="text-[#1a1a1a]"
                  title={<>Top <span className="font-serif italic font-normal text-[#C5A880]">Hunters</span></>}
                />
              </div>
              
              <div className="space-y-10">
                {/* Podium Top 3 */}
                <div className="flex items-end justify-center gap-2 sm:gap-4 md:gap-6 pt-10">
                  {[
                    { name: "Ananya M.", referrals: 8, amount: "₹4,000", rank: 2 },
                    { name: "Vikram S.", referrals: 12, amount: "₹6,000", rank: 1 },
                    { name: "Karan D.", referrals: 5, amount: "₹2,500", rank: 3 },
                  ].map((user, i) => (
                    <div key={i} className={cn(
                      "relative flex flex-col items-center bg-white border shadow-sm rounded-t-3xl rounded-b-xl w-[30%] text-center p-4 sm:p-6 transition-transform duration-500 hover:-translate-y-2",
                      user.rank === 1 ? "h-64 sm:h-72 border-[#C5A880] shadow-[0_10px_30px_rgba(197,168,128,0.2)] bg-gradient-to-b from-[#FCFAF7] to-white z-10" :
                      user.rank === 2 ? "h-48 sm:h-56 border-[#EAD8C0]/60 -mr-2 sm:-mr-4" : 
                      "h-44 sm:h-52 border-[#EAD8C0]/60 -ml-2 sm:-ml-4"
                    )}>
                      {user.rank === 1 && (
                        <div className="absolute -top-10 w-12 h-12 rounded-full bg-gradient-to-br from-[#C5A880] to-[#6F4E37] flex items-center justify-center shadow-[0_5px_15px_rgba(197,168,128,0.5)] border-2 border-white">
                           <Trophy className="w-5 h-5 text-white" />
                        </div>
                      )}
                      
                      <div className={cn(
                        "font-playfair font-normal opacity-30 mt-2",
                        user.rank === 1 ? "text-7xl sm:text-8xl text-[#6F4E37] -mt-4 sm:-mt-6" : "text-5xl sm:text-6xl text-zinc-600"
                      )}>
                        {user.rank}
                      </div>
                      
                      <div className="mt-auto w-full">
                        <div className={cn(
                          "font-playfair truncate",
                          user.rank === 1 ? "text-xl sm:text-2xl text-[#1a1a1a] mb-1" : "text-base sm:text-lg text-zinc-700"
                        )}>{user.name.split(' ')[0]}</div>
                        <div className={cn(
                          "font-mono font-bold uppercase tracking-widest",
                          user.rank === 1 ? "text-xs sm:text-sm text-[#C5A880]" : "text-[9px] sm:text-[10px] text-zinc-400"
                        )}>
                          {user.amount}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Rest of the ranks */}
                <div className="bg-white rounded-2xl border border-[#EAD8C0]/50 divide-y divide-[#EAD8C0]/30 shadow-sm overflow-hidden">
                  {[
                    { name: "Suresh P.", referrals: 4, amount: "₹2,000", rank: 4 },
                    { name: "Riya K.", referrals: 3, amount: "₹1,500", rank: 5 },
                  ].map((user, i) => (
                    <div key={i} className="flex items-center justify-between p-4 sm:p-5 hover:bg-zinc-50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 flex items-center justify-center text-xs font-mono font-bold text-zinc-400 bg-zinc-100 rounded-full">{user.rank}</div>
                        <div className="text-base font-medium font-playfair text-[#1a1a1a]">{user.name}</div>
                      </div>
                      <div className="text-base font-mono font-medium text-[#1a1a1a]">{user.amount}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
          </div>
        </section>

        {/* SECTION 6: FAQ & TERMS */}
        <section className="w-full max-w-[1600px] mx-auto px-6 sm:px-12 md:px-16 lg:px-20 reveal visible mt-32 md:mt-48 lg:mt-64">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            
            {/* Sticky Header Side */}
            <div className="lg:col-span-4 lg:sticky lg:top-32 space-y-6">
              <SectionHeading
                variant="playfair"
                className="text-[#1a1a1a]"
                title={<>Frequently <span className="font-serif italic font-normal text-[#C5A880] block mt-2">Asked</span></>}
                eyebrow={
                  <div className="flex items-center gap-2.5 mb-6">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#C5A880] animate-pulse" />
                    <span className="text-[10px] md:text-xs font-semibold tracking-[0.25em] text-[#6F4E37] uppercase font-mono">
                      Got Questions?
                    </span>
                  </div>
                }
              />
              <p className="text-zinc-500 text-sm md:text-base font-light leading-relaxed max-w-sm">
                Everything you need to know about the DripHunter referral program, how to earn, and how to spend your store credit.
              </p>
            </div>
            
            {/* Unique Minimal FAQ Side */}
            <div className="lg:col-span-8 space-y-0 border-t border-[#EAD8C0]/50">
              {FAQS.map((faq, index) => (
                <div key={index} className="border-b border-[#EAD8C0]/50 group">
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full flex items-center justify-between py-8 md:py-10 text-left focus:outline-none"
                  >
                    <div className="flex items-start gap-6 md:gap-10">
                      <span className="text-[#C5A880] font-mono font-bold text-xs md:text-sm mt-1.5 shrink-0">0{index + 1}</span>
                      <span className="text-xl md:text-2xl lg:text-3xl text-[#1a1a1a] font-light font-playfair group-hover:text-[#6F4E37] transition-colors duration-500">{faq.question}</span>
                    </div>
                    <div className="relative w-10 h-10 rounded-full border border-[#EAD8C0] flex items-center justify-center shrink-0 group-hover:border-[#C5A880] transition-colors duration-500 bg-white/50 ml-4">
                      <div className={cn("w-3 h-[1px] bg-[#6F4E37] transition-transform duration-500", openFaq === index ? "rotate-180" : "")} />
                      <div className={cn("absolute w-[1px] h-3 bg-[#6F4E37] transition-transform duration-500", openFaq === index ? "rotate-90 opacity-0" : "opacity-100")} />
                    </div>
                  </button>
                  <div 
                    className={cn(
                      "overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
                      openFaq === index ? "max-h-[500px] opacity-100 mb-10" : "max-h-0 opacity-0"
                    )}
                  >
                    <div className="pl-[3.25rem] md:pl-[4.5rem] text-base md:text-lg text-zinc-600 leading-relaxed font-light max-w-2xl">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Terms Footer */}
          <div className="mt-20 flex items-start gap-4 p-8 rounded-[2rem] bg-white/40 border border-white/60 text-zinc-500 shadow-sm max-w-4xl mx-auto backdrop-blur-md">
            <Info className="w-6 h-6 text-[#C5A880] shrink-0 mt-0.5" />
            <p className="text-xs md:text-sm leading-relaxed font-sans font-light">
              By participating, you agree to our <a href="#" className="text-[#6F4E37] hover:text-[#3B2C21] underline font-medium">Referral Terms</a>. Store credit is not cash and is non-transferable. Referral rewards are subject to qualifying order conditions. Fraudulent manipulation may lead to account restrictions.
            </p>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="w-full max-w-[1600px] mx-auto px-6 sm:px-12 md:px-16 lg:px-20 reveal visible mb-16">
          <div className="relative rounded-[3rem] overflow-hidden group p-12 md:p-24 text-center">
            <div className="absolute inset-0 bg-[#FCFAF7] border border-[#EAD8C0]/60 shadow-[0_20px_40px_-15px_rgba(197,168,128,0.1)] z-0"></div>
            
            <div className="absolute inset-0 z-0 opacity-40">
              <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-[#EAD8C0]/30 blur-[100px] rounded-full group-hover:bg-[#C5A880]/20 transition-colors duration-1000"></div>
              <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-[#F2ECE4]/50 blur-[100px] rounded-full transition-colors duration-1000"></div>
              <div className="absolute inset-0 mix-blend-overlay opacity-30" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/rice-paper-2.png')" }}></div>
            </div>
            
            <div className="relative z-10 space-y-6 max-w-2xl mx-auto flex flex-col items-center">
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/60 border border-[#C5A880]/20 backdrop-blur-md shadow-sm mb-2">
                <Share2 className="w-3.5 h-3.5 text-[#C5A880]" />
                <span className="text-xs uppercase tracking-widest text-[#6F4E37] font-mono font-bold">Start Earning</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-[#1a1a1a] font-playfair">
                Ready to <span className="font-serif italic font-normal text-[#C5A880]">Share?</span>
              </h2>
              <p className="text-zinc-600 text-lg md:text-xl font-light leading-relaxed max-w-lg mx-auto">
                Invite your friends and start racking up store credit for every qualifying order.
              </p>
              
              <Button variant="drip" onClick={handleNativeShare} className="px-12 py-8 rounded-full text-sm md:text-base shadow-xl mt-6 w-full sm:w-auto gap-3 flex items-center justify-center hover:scale-105 transition-transform duration-300">
                <Share2 className="w-5 h-5" />
                SHARE REFERRAL LINK
              </Button>
            </div>
          </div>
        </section>
        
      </main>

      <Footer />
    </div>
  );
}
