"use client";

import React, { useEffect, useState } from "react";
import { Mail } from "lucide-react";

export default function MaintenancePage() {
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState("");
  const [notifyStatus, setNotifyStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  
  // Working Timer State (starts at 45 minutes)
  const [timeLeft, setTimeLeft] = useState(45 * 60);

  useEffect(() => {
    setMounted(true);

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleNotifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setNotifyStatus('loading');
    
    // Simulate API call to subscribe to notifications
    setTimeout(() => {
      setNotifyStatus('success');
      setEmail("");
      
      // Reset back to idle after a few seconds
      setTimeout(() => {
        setNotifyStatus('idle');
      }, 3000);
    }, 1500);
  };

  if (!mounted) return null;

  // Format time
  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="min-h-screen bg-[#FDFCFB] flex flex-col font-sans relative overflow-hidden selection:bg-[#C5A880]/30 selection:text-[#6F4E37]">
      
      {/* Header */}
      <header className="relative z-20 w-full p-6 md:p-8 flex justify-center bg-transparent">
        <div className="text-2xl font-playfair tracking-widest text-zinc-900">
          DRIP <span className="font-serif italic font-normal text-[#C5A880]">HUNTER</span>
        </div>
      </header>

      {/* Full-width Animated Caution Tape Banner */}
      <div className="w-full relative overflow-hidden flex flex-col items-center justify-center py-6 bg-[#FCD34D] shadow-md z-20 border-y-2 border-black/10">
        
        {/* Top Animated Stripes */}
        <div className="absolute top-0 left-0 w-[200%] h-4 md:h-6" style={{
          backgroundImage: 'repeating-linear-gradient(-45deg, #000, #000 20px, #FCD34D 20px, #FCD34D 40px)',
          backgroundSize: '56.56px 56.56px',
          animation: 'moveStripes 2s linear infinite'
        }}></div>
        
        {/* Text Container (Marquee) */}
        <div className="relative z-10 w-full py-4 overflow-hidden flex whitespace-nowrap">
          
          <div className="animate-[marquee_20s_linear_infinite] flex items-center shrink-0">
            <span className="mx-8 text-3xl md:text-5xl lg:text-6xl font-sans font-black text-black tracking-widest uppercase drop-shadow-sm">UNDER MAINTENANCE</span>
            <span className="mx-8 text-3xl md:text-5xl lg:text-6xl font-sans font-black text-black tracking-widest uppercase drop-shadow-sm">UNDER MAINTENANCE</span>
            <span className="mx-8 text-3xl md:text-5xl lg:text-6xl font-sans font-black text-black tracking-widest uppercase drop-shadow-sm">UNDER MAINTENANCE</span>
            <span className="mx-8 text-3xl md:text-5xl lg:text-6xl font-sans font-black text-black tracking-widest uppercase drop-shadow-sm">UNDER MAINTENANCE</span>
            <span className="mx-8 text-3xl md:text-5xl lg:text-6xl font-sans font-black text-black tracking-widest uppercase drop-shadow-sm">UNDER MAINTENANCE</span>
          </div>

          <div className="animate-[marquee_20s_linear_infinite] flex items-center shrink-0">
            <span className="mx-8 text-3xl md:text-5xl lg:text-6xl font-sans font-black text-black tracking-widest uppercase drop-shadow-sm">UNDER MAINTENANCE</span>
            <span className="mx-8 text-3xl md:text-5xl lg:text-6xl font-sans font-black text-black tracking-widest uppercase drop-shadow-sm">UNDER MAINTENANCE</span>
            <span className="mx-8 text-3xl md:text-5xl lg:text-6xl font-sans font-black text-black tracking-widest uppercase drop-shadow-sm">UNDER MAINTENANCE</span>
            <span className="mx-8 text-3xl md:text-5xl lg:text-6xl font-sans font-black text-black tracking-widest uppercase drop-shadow-sm">UNDER MAINTENANCE</span>
            <span className="mx-8 text-3xl md:text-5xl lg:text-6xl font-sans font-black text-black tracking-widest uppercase drop-shadow-sm">UNDER MAINTENANCE</span>
          </div>

        </div>

        {/* Bottom Animated Stripes */}
        <div className="absolute bottom-0 left-0 w-[200%] h-4 md:h-6" style={{
          backgroundImage: 'repeating-linear-gradient(-45deg, #000, #000 20px, #FCD34D 20px, #FCD34D 40px)',
          backgroundSize: '56.56px 56.56px',
          animation: 'moveStripes 2s linear infinite'
        }}></div>
      </div>

      {/* Main Content Container */}
      <main className="relative z-10 flex-grow flex flex-col lg:flex-row items-center justify-center p-6 w-full max-w-6xl mx-auto gap-12 lg:gap-24">
        
        {/* Left Side: Premium SVG Illustration */}
        <div className="w-full lg:w-1/2 flex justify-center relative">
          
          {/* Animated Background Blob for SVG */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#C5A880]/10 rounded-full blur-3xl animate-pulse"></div>
          
          <div className="relative w-full max-w-md aspect-square z-10">
            <svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-2xl" xmlns="http://www.w3.org/2000/svg">
              <defs>
                {/* Photorealistic Metallic Gradients */}
                <linearGradient id="silver" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F5F5F5" />
                  <stop offset="30%" stopColor="#9E9E9E" />
                  <stop offset="50%" stopColor="#E0E0E0" />
                  <stop offset="80%" stopColor="#616161" />
                  <stop offset="100%" stopColor="#BDBDBD" />
                </linearGradient>
                <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F9E79F" />
                  <stop offset="30%" stopColor="#B7950B" />
                  <stop offset="50%" stopColor="#F5D76E" />
                  <stop offset="80%" stopColor="#7D6608" />
                  <stop offset="100%" stopColor="#D4AC0D" />
                </linearGradient>
                <linearGradient id="monitorMetal" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#424242" />
                  <stop offset="100%" stopColor="#111111" />
                </linearGradient>
                
                {/* SVG Filters for Realism */}
                <filter id="dropShadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="4" dy="12" stdDeviation="8" floodColor="#000" floodOpacity="0.4" />
                </filter>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                
                {/* Mask for realistic wrench cutouts */}
                <mask id="wrenchMask">
                  <rect x="0" y="0" width="400" height="400" fill="white" />
                  {/* Mouth Cutout */}
                  <rect x="175" y="40" width="50" height="60" rx="8" fill="black" />
                  {/* Ring Cutout */}
                  <circle cx="200" cy="310" r="18" fill="black" />
                </mask>
              </defs>

              {/* Photorealistic Monitor Stand */}
              <path d="M170 320 L230 320 L245 370 L155 370 Z" fill="url(#silver)" filter="url(#dropShadow)" />
              <rect x="120" y="370" width="160" height="12" rx="6" fill="url(#monitorMetal)" filter="url(#dropShadow)" />
              
              {/* Photorealistic Monitor Body */}
              <rect x="20" y="60" width="360" height="260" rx="16" fill="url(#monitorMetal)" filter="url(#dropShadow)" />
              <rect x="30" y="70" width="340" height="240" rx="8" fill="#000" />
              <rect x="30" y="70" width="340" height="240" rx="8" fill="#18181b" filter="url(#glow)" />
              
              {/* Screen UI - Glowing Wireframe */}
              <rect x="50" y="90" width="300" height="35" rx="6" fill="#27272a" stroke="#3f3f46" strokeWidth="1.5" />
              <circle cx="70" cy="107.5" r="6" fill="#ef4444" />
              <circle cx="90" cy="107.5" r="6" fill="#eab308" />
              <circle cx="110" cy="107.5" r="6" fill="#22c55e" />
              <rect x="135" y="102" width="120" height="10" rx="5" fill="#3f3f46" />
              
              <rect x="50" y="140" width="140" height="100" rx="8" fill="#3b82f6" fillOpacity="0.15" stroke="#3b82f6" strokeWidth="2" strokeOpacity="0.3" filter="url(#glow)" />
              
              <rect x="210" y="140" width="140" height="16" rx="8" fill="url(#gold)" />
              <rect x="210" y="170" width="120" height="8" rx="4" fill="#71717a" />
              <rect x="210" y="190" width="100" height="8" rx="4" fill="#71717a" />
              <rect x="210" y="210" width="80" height="8" rx="4" fill="#71717a" />
              <rect x="210" y="232" width="60" height="12" rx="6" fill="#C5A880" />
              
              <rect x="50" y="260" width="300" height="30" rx="6" fill="#27272a" stroke="#3f3f46" strokeWidth="1.5" />
              <path d="M70 275 L110 275 M130 275 L170 275 M190 275 L230 275 M250 275 L290 275 M310 275 L330 275" stroke="#C5A880" strokeWidth="4" strokeLinecap="round" opacity="0.8" filter="url(#glow)" />

              {/* Photorealistic Spinning Gears */}
              <g className="origin-[320px_50px] animate-[spin_8s_linear_infinite]" filter="url(#dropShadow)">
                <circle cx="320" cy="50" r="30" stroke="url(#gold)" strokeWidth="12" strokeDasharray="14 10" fill="none" />
                <circle cx="320" cy="50" r="26" fill="url(#gold)" />
                <circle cx="320" cy="50" r="16" fill="#111" />
                <circle cx="320" cy="50" r="10" fill="url(#gold)" />
                <circle cx="320" cy="50" r="4" fill="#111" />
              </g>

              <g className="origin-[70px_280px] animate-[spin_10s_linear_infinite_reverse]" filter="url(#dropShadow)">
                <circle cx="70" cy="280" r="40" stroke="url(#silver)" strokeWidth="14" strokeDasharray="16 12" fill="none" />
                <circle cx="70" cy="280" r="35" fill="url(#silver)" />
                <circle cx="70" cy="280" r="22" fill="#111" />
                <circle cx="70" cy="280" r="14" fill="url(#silver)" />
                <circle cx="70" cy="280" r="6" fill="#111" />
              </g>

              {/* Photorealistic 3D Wrench */}
              <g transform="rotate(35 200 200)" filter="url(#dropShadow)">
                <g mask="url(#wrenchMask)">
                  {/* Handle */}
                  <rect x="180" y="80" width="40" height="230" rx="20" fill="url(#silver)" />
                  {/* Grip Inner Groove */}
                  <rect x="188" y="130" width="24" height="130" rx="12" fill="#757575" />
                  
                  {/* Top Head */}
                  <circle cx="200" cy="85" r="40" fill="url(#silver)" />
                  {/* Bottom Head (Ring) */}
                  <circle cx="200" cy="310" r="36" fill="url(#silver)" />
                </g>
              </g>

            </svg>
          </div>
        </div>

        {/* Right Side: Text & Working Timer */}
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left pt-6 lg:pt-0">
          
          <p className="text-base text-zinc-500 font-sans font-light max-w-lg leading-relaxed mb-10">
            We are currently upgrading Drip Hunter to bring you a more premium and seamless shopping experience. We'll be back online soon.
          </p>

          {/* Working Countdown Timer */}
          <div className="w-full max-w-md bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm mb-10">
            <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold mb-6 text-center lg:text-left">
              Estimated Return
            </div>
            
            <div className="flex items-center justify-center lg:justify-start gap-4 md:gap-8">
              <div className="flex flex-col items-center min-w-[60px]">
                <span className="text-4xl md:text-5xl font-playfair font-medium text-zinc-900">
                  {hours.toString().padStart(2, '0')}
                </span>
                <span className="text-[9px] font-mono tracking-widest text-zinc-400 uppercase mt-2">Hours</span>
              </div>
              <span className="text-3xl md:text-4xl font-playfair font-light text-zinc-200 mb-6">:</span>
              <div className="flex flex-col items-center min-w-[60px]">
                <span className="text-4xl md:text-5xl font-playfair font-medium text-zinc-900">
                  {minutes.toString().padStart(2, '0')}
                </span>
                <span className="text-[9px] font-mono tracking-widest text-zinc-400 uppercase mt-2">Minutes</span>
              </div>
              <span className="text-3xl md:text-4xl font-playfair font-light text-zinc-200 mb-6">:</span>
              <div className="flex flex-col items-center min-w-[60px]">
                <span className="text-4xl md:text-5xl font-playfair font-medium text-[#6F4E37]">
                  {seconds.toString().padStart(2, '0')}
                </span>
                <span className="text-[9px] font-mono tracking-widest text-zinc-400 uppercase mt-2">Seconds</span>
              </div>
            </div>
          </div>

          {/* Notify Me Input */}
          <form onSubmit={handleNotifySubmit} className={`w-full max-w-md bg-white border rounded-full p-1.5 pl-5 flex items-center justify-between transition-colors shadow-sm ${
            notifyStatus === 'success' ? 'border-green-500 ring-1 ring-green-500/20' : 'border-zinc-200 focus-within:border-[#6F4E37] focus-within:ring-1 focus-within:ring-[#6F4E37]/20'
          }`}>
            <div className="flex items-center gap-3 w-full">
              <Mail className={`w-4 h-4 ${notifyStatus === 'success' ? 'text-green-500' : 'text-zinc-400'}`} />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={notifyStatus !== 'idle'}
                placeholder={notifyStatus === 'success' ? "You're on the list!" : "Notify me when we're back..."}
                required
                className={`w-full bg-transparent text-sm text-zinc-900 outline-none disabled:bg-transparent ${
                  notifyStatus === 'success' ? 'placeholder-green-600 font-medium' : 'placeholder-zinc-400'
                }`}
              />
            </div>
            <button 
              type="submit"
              disabled={notifyStatus !== 'idle'}
              className={`px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300 shadow-sm ml-2 ${
                notifyStatus === 'success' 
                  ? 'bg-green-500 text-white' 
                  : notifyStatus === 'loading'
                  ? 'bg-zinc-300 text-zinc-500 cursor-not-allowed'
                  : 'bg-zinc-900 hover:bg-[#6F4E37] text-white'
              }`}
            >
              {notifyStatus === 'loading' ? 'WAIT...' : notifyStatus === 'success' ? 'DONE' : 'NOTIFY'}
            </button>
          </form>
          
        </div>

      </main>

      {/* Footer with Socials */}
      <footer className="relative z-20 w-full p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-4 border-t border-zinc-200/50 bg-transparent mt-auto">
        <p className="text-[10px] uppercase font-mono tracking-widest text-zinc-400">
          © {new Date().getFullYear()} DripHunter
        </p>
        
        <div className="flex items-center gap-4">
          <a href="#" className="w-10 h-10 rounded-full bg-white border border-zinc-200 flex items-center justify-center text-zinc-500 hover:text-white hover:bg-[#6F4E37] hover:border-[#6F4E37] transition-all duration-300 shadow-sm group">
            <svg className="w-4 h-4 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
          </a>
          <a href="#" className="w-10 h-10 rounded-full bg-white border border-zinc-200 flex items-center justify-center text-zinc-500 hover:text-white hover:bg-[#6F4E37] hover:border-[#6F4E37] transition-all duration-300 shadow-sm group">
            <svg className="w-4 h-4 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
          </a>
        </div>
      </footer>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes moveStripes {
          0% { transform: translateX(0); }
          100% { transform: translateX(-56.56px); }
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
      `}} />
    </div>
  );
}
