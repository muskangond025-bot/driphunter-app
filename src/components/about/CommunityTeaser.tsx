import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Users, Calendar, Sparkles, Heart, MessageCircle } from "lucide-react";

export default function CommunityTeaser() {
  return (
    <section className="relative w-full py-16 bg-zinc-950 border-b border-zinc-900 overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-10 right-10 h-72 w-72 rounded-full bg-brand-purple/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 h-72 w-72 rounded-full bg-brand-neon/5 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-brand-neon">Join the Movement</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mt-1">Culture &amp; Community</h2>
            <p className="mt-4 text-zinc-400 max-w-xl text-sm sm:text-base">
              Streetwear is a collective language. DripHunter is where buyers, creators, and brands share the culture.
            </p>
          </div>
          <Link href="/explore">
            <button className="group inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 hover:border-zinc-700 px-6 py-3 text-sm font-semibold text-white transition-all">
              Explore Community Hub
              <span className="text-brand-neon transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
            </button>
          </Link>
        </div>

        {/* Feature Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: #OOTD Feed */}
          <div className="relative group overflow-hidden rounded-2xl border border-zinc-850 bg-zinc-900/30 backdrop-blur-md transition-all duration-300 hover:border-brand-neon/20">
            <div className="p-6 border-b border-zinc-900 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-brand-orange fill-brand-orange" />
                <span className="text-xs font-bold text-zinc-300 uppercase">#OOTD Showcase</span>
              </div>
              <span className="text-[10px] bg-brand-neon/10 text-brand-neon px-2 py-0.5 rounded-full font-bold">Trending</span>
            </div>
            
            {/* Post Media Mock */}
            <div className="relative h-64 w-full bg-zinc-900">
              <img
                src="https://images.unsplash.com/photo-1488161628813-04466f872be2?q=80&w=600&auto=format&fit=crop"
                alt="Streetwear outfit look"
                className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                <div>
                  <p className="text-xs font-bold">@yash_drips</p>
                  <p className="text-[10px] text-zinc-400">Cargo Pants &amp; Dunk Lows</p>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold">
                  <span className="flex items-center gap-1"><Heart className="h-3 w-3" /> 342</span>
                  <span className="flex items-center gap-1"><MessageCircle className="h-3 w-3" /> 28</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Events Teaser */}
          <div className="relative group overflow-hidden rounded-2xl border border-zinc-850 bg-zinc-900/30 backdrop-blur-md transition-all duration-300 hover:border-brand-purple/20">
            <div className="p-6 border-b border-zinc-900 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-brand-purple" />
                <span className="text-xs font-bold text-zinc-300 uppercase">Exclusive Events</span>
              </div>
              <span className="text-[10px] bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded-full font-bold">Mumbai</span>
            </div>
            
            {/* Event Media Mock */}
            <div className="relative h-64 w-full bg-zinc-900">
              <img
                src="https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=600&auto=format&fit=crop"
                alt="Live auction streetwear"
                className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[9px] bg-brand-purple/20 text-brand-purple border border-brand-purple/35 px-2 py-0.5 rounded font-black uppercase">Live Drop Auction</span>
                <h4 className="text-sm font-extrabold mt-2">Midnight Tokyo Tech Drop</h4>
                <p className="text-[10px] text-zinc-400">July 04, 2026 | 00:00 IST</p>
              </div>
            </div>
          </div>

          {/* Card 3: Influencer Collaborations */}
          <div className="relative group overflow-hidden rounded-2xl border border-zinc-850 bg-zinc-900/30 backdrop-blur-md transition-all duration-300 hover:border-white/10">
            <div className="p-6 border-b border-zinc-900 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-brand-orange" />
                <span className="text-xs font-bold text-zinc-300 uppercase">Creator Spotlight</span>
              </div>
              <span className="text-[10px] bg-brand-orange/10 text-brand-orange px-2 py-0.5 rounded-full font-bold">Partner</span>
            </div>
            
            {/* Influencer Profile Mock */}
            <div className="relative h-64 w-full bg-zinc-900">
              <img
                src="https://images.unsplash.com/photo-1509281373149-e957c6296406?q=80&w=600&auto=format&fit=crop"
                alt="Creator portrait"
                className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop"
                    alt="avatar"
                    className="h-6 w-6 rounded-full border border-border"
                  />
                  <div>
                    <h5 className="text-xs font-bold leading-none">Kabir Mehta</h5>
                    <span className="text-[9px] text-zinc-400">@kabir_drips &middot; 125K followers</span>
                  </div>
                </div>
                <p className="text-[10px] text-zinc-300 line-clamp-2">
                  &ldquo;Building delhi techwear showcase and picking favorites for DripHunter culture.&rdquo;
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
