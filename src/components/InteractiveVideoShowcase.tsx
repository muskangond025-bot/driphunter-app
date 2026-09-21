"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Play, Plus } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useCart } from "@/context/CartContext";

interface ShowcaseItem {
  id: string;
  title: string;
  description: string;
  price: string;
  thumbnail: string;
  videoUrl: string;
}

const items: ShowcaseItem[] = [
  {
    id: "item-1",
    title: "SB Varsity Jacket",
    description: "Premium wool blend varsity jacket with custom patch embroidery details and contrasting faux leather sleeves.",
    price: "₹2,499",
    thumbnail: "https://img.youtube.com/vi/1R9_6hQmwR0/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=1R9_6hQmwR0",
  },
  {
    id: "item-2",
    title: "Retro Ribbed Crop Top",
    description: "Stretch rib-knit crop tank top featuring contrast edge piping and front graphic placement.",
    price: "₹899",
    thumbnail: "https://img.youtube.com/vi/h2q5l_mK2kY/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=h2q5l_mK2kY",
  },
  {
    id: "item-3",
    title: "Cartoon Character Hoodie",
    description: "Ultra-cozy 400 GSM heavy-brushed cotton fleece hoodie with premium sleeve print graphics.",
    price: "₹1,899",
    thumbnail: "https://img.youtube.com/vi/F3S7j3_C4rY/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=F3S7j3_C4rY",
  },
  {
    id: "item-4",
    title: "Oversized Graphic Tee",
    description: "Boxy fit organic cotton drop-shoulder tee with screen-printed front character artwork.",
    price: "₹1,199",
    thumbnail: "https://img.youtube.com/vi/gT8w_5bY2vU/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=gT8w_5bY2vU",
  },
];

function getYoutubeEmbedUrl(url: string) {
  let videoId = "";
  if (url.includes("youtu.be/")) {
    videoId = url.split("youtu.be/")[1]?.split(/[?#]/)[0] || "";
  } else if (url.includes("youtube.com/watch")) {
    videoId = url.split("v=")[1]?.split(/[&?#]/)[0] || "";
  } else if (url.includes("youtube.com/embed/")) {
    videoId = url.split("embed/")[1]?.split(/[?#]/)[0] || "";
  }
  
  if (videoId) {
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=1&rel=0`;
  }
  return null;
}

export default function InteractiveVideoShowcase() {
  const { ref, isVisible } = useScrollAnimation();
  const [activeIdx, setActiveIdx] = useState(0);
  const [videoError, setVideoError] = useState(false);
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const videoRef = useRef<HTMLVideoElement>(null);

  const activeItem = items[activeIdx];

  // Auto-play the video when the active item changes
  useEffect(() => {
    setVideoError(false);
  }, [activeIdx]);

  useEffect(() => {
    if (videoRef.current && !videoError) {
      videoRef.current.load();
      videoRef.current.play().catch((err) => {
        console.log("Auto-play blocked or failed:", err);
      });
    }
  }, [activeIdx, videoError]);

  return (
    <section className="bg-white py-16 border-t border-zinc-100">
      <div ref={ref} className="w-full max-w-[1600px] mx-auto px-6 sm:px-12 md:px-16 lg:px-20">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT: Large Display Frame */}
          <div 
            className={`lg:col-span-9 relative rounded-[32px] overflow-hidden bg-black text-white p-8 sm:p-12 flex flex-col justify-end min-h-[450px] sm:min-h-[580px] border border-zinc-900 shadow-2xl group transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
            }`}
          >
            {/* Fallback Background Image (Displays if video is loading or fails) */}
            <Image
              alt={activeItem.title}
              src={activeItem.thumbnail}
              fill
              className="absolute inset-0 w-full h-full object-cover z-0 opacity-50 transition-opacity duration-500"
              sizes="(max-width: 1024px) 100vw, 75vw"
            />

            {/* Background Video */}
            {activeItem && getYoutubeEmbedUrl(activeItem.videoUrl) ? (
              <div className="absolute inset-0 w-full h-full z-10">
                <iframe
                  key={activeItem.videoUrl}
                  src={getYoutubeEmbedUrl(activeItem.videoUrl) || ""}
                  className="absolute inset-0 w-full h-full opacity-70 transition-opacity duration-500 border-none z-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
                {/* Transparent click blocker to prevent youtube redirect */}
                <div className="absolute inset-0 z-20 bg-transparent cursor-default" />
              </div>
            ) : !videoError ? (
              <video
                ref={videoRef}
                key={activeItem.id}
                src={activeItem.videoUrl}
                poster={activeItem.thumbnail}
                loop
                muted
                playsInline
                autoPlay
                onError={() => setVideoError(true)}
                className="absolute inset-0 w-full h-full object-cover z-10 opacity-70 transition-opacity duration-500"
              />
            ) : null}

            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-20 pointer-events-none" />

            {/* Brand Logo Box (Top Left) */}
            <div className="absolute top-6 left-6 sm:top-8 sm:left-8 bg-white text-black px-5 py-4 rounded-xl shadow-lg z-30 select-none border border-zinc-100">
              <span className="font-chaney-title text-sm sm:text-base tracking-tight uppercase leading-none block font-black">
                DRIP<br />HUNTER
              </span>
            </div>

            {/* Text Overlay Content */}
            <div className="relative z-30 space-y-4 max-w-xl text-left">
              <span className="text-[10px] font-mono tracking-widest text-[#6F4E37] font-black uppercase bg-[#6F4E37]/10 border border-[#6F4E37]/20 px-3 py-1 rounded-full inline-block">
                Out now
              </span>
              <h3 className="text-3xl sm:text-5xl font-chaney-title uppercase leading-tight tracking-tight text-white">
                {activeItem.title}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 font-mono leading-relaxed max-w-md">
                {activeItem.description}
              </p>
              <strong className="text-lg sm:text-xl font-chaney-title text-[#6F4E37] block">
                Starting at {activeItem.price}
              </strong>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-3">
                <button
                  onClick={() => {
                    const parsedPrice = parseInt(activeItem.price.replace(/[^\d]/g, "")) || 1899;
                    addToCart({
                      id: activeItem.id,
                      name: activeItem.title,
                      price: parsedPrice,
                      image: activeItem.thumbnail,
                      brand: "Streetwear",
                      size: "L",
                      color: "Default"
                    });
                  }}
                  className="bg-white hover:bg-zinc-100 text-black font-extrabold uppercase text-xs tracking-widest py-3.5 px-8 rounded-xl transition-all cursor-pointer active:scale-95 shadow-md border-none"
                >
                  Buy Now
                </button>
                <button
                  onClick={() => toggleWishlist({
                    id: activeItem.id,
                    name: activeItem.title,
                    price: activeItem.price,
                    image: activeItem.thumbnail,
                    brand: "Streetwear"
                  })}
                  className="flex items-center gap-2 text-xs font-bold text-white hover:text-[#6F4E37] transition-colors cursor-pointer border-none bg-transparent"
                  aria-label="Add to wishlist"
                >
                  <Plus className={`w-4 h-4 transition-transform ${isInWishlist(activeItem.id) ? "rotate-45 text-red-500" : ""}`} />
                  <span className={isInWishlist(activeItem.id) ? "text-red-500 font-black" : ""}>
                    {isInWishlist(activeItem.id) ? "In Wishlist" : "Add to wishlist"}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT: Thumbnail Column */}
          <div 
            className={`lg:col-span-3 flex flex-row lg:flex-col gap-4 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 scrollbar-none transition-all duration-700 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            {items.map((item, idx) => {
              const isActive = idx === activeIdx;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveIdx(idx)}
                  className={`relative flex-1 min-w-[120px] lg:min-w-0 aspect-[4/3] lg:aspect-auto lg:h-[135px] rounded-2xl overflow-hidden cursor-pointer transition-all border-4 duration-300 ${
                    isActive 
                      ? "border-[#6F4E37] scale-[1.03] shadow-lg" 
                      : "border-transparent opacity-60 hover:opacity-100 hover:scale-[1.01]"
                  }`}
                >
                  <Image
                    alt={item.title}
                    src={item.thumbnail}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 25vw, 20vw"
                  />
                  {/* Play Icon Indicator */}
                  <div className="absolute inset-0 bg-black/15 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                      <Play className="w-3.5 h-3.5 text-white fill-white ml-0.5" />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
