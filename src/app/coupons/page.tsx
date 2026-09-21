"use client";

import React from "react";
import { ArrowLeft, ChevronDown, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CouponsPage() {
  const router = useRouter();
  
  const coupons = [
    { badge: "8d", image: "https://drip-hunter.vercel.app/images/urban-essentials/cargo_pants.png", type: "Special Discount", title: "Flat ₹1000 off", desc: "on All AC" },
    { badge: "", image: "https://drip-hunter.vercel.app/images/urban-essentials/sling_bag.png", type: "Special Discount", title: "Flat ₹150 off", desc: "on Digitek Cleaning Kit camera" },
    { badge: "", image: "https://drip-hunter.vercel.app/images/sneaker-jordan.jpg", type: "Special Discount", title: "Flat ₹250 off", desc: "on Hiffin Camera LED Lights" },
    { badge: "", image: "https://drip-hunter.vercel.app/images/sneaker-nike.jpg", type: "Exclusive Brand discount", title: "Flat ₹1000 off", desc: "on All Washing Machine" },
    { badge: "", image: "https://drip-hunter.vercel.app/images/sneaker-adidas.jpg", type: "Special Discount", title: "Get 8% off", desc: "on Kreo Microphones camera" },
    { badge: "", image: "https://drip-hunter.vercel.app/images/sneaker-yeezy.jpg", type: "Special Discount", title: "Get 5% off", desc: "on Zeiss Terra Binoculars camera" },
    { badge: "6d", image: "https://drip-hunter.vercel.app/images/urban-essentials/bifold_wallet.png", type: "Special Discount", title: "Flat ₹10000 off", desc: "on All AC" },
    { badge: "", image: "https://img.icons8.com/ios-filled/50/a855f7/discount.png", type: "Special Discount", title: "Get 10% off upto ₹1200", desc: "on Seagate Storage" },
    { badge: "", image: "https://img.icons8.com/ios/50/cccccc/image.png", type: "Special Discount", title: "Flat ₹2000 off", desc: "on Sony camera" },
  ];

  return (
    <div className="min-h-screen bg-white font-sans max-w-lg mx-auto sm:border-x sm:border-gray-200 relative overflow-hidden flex flex-col">
      {/* Top Bar */}
      <div className="flex items-center gap-3 px-4 py-3 bg-white sticky top-0 z-50 border-b border-gray-100">
        <button onClick={() => router.back()} className="p-1 -ml-1">
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        <h1 className="text-[15px] font-bold text-gray-800">My Coupons</h1>
      </div>

      {/* Hero Banner */}
      <div className="bg-gradient-to-b from-[#f3e8ff] via-[#f3e8ff] to-white pt-6 pb-20 relative flex flex-col items-center text-center">
        <div className="flex items-center gap-1 text-[#8b5cf6] text-[10px] font-bold mb-1 tracking-wide">
          ✦ Level Up Your Savings! ✦
        </div>
        <h2 className="text-[#6d28d9] text-[22px] font-black uppercase tracking-tight mb-2">COUPONS FOR YOU</h2>
        <div className="bg-[#d8b4fe]/60 text-[#6d28d9] text-[11px] font-semibold px-4 py-1.5 rounded-full mb-2 tracking-wide">
          You have 3 new coupons
        </div>
        
        {/* Ticket illustration */}
        <div className="absolute bottom-6 flex justify-center w-full">
           <svg width="120" height="60" viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g transform="rotate(-15 40 30)">
                <rect x="20" y="10" width="40" height="60" rx="4" fill="#a855f7" />
                <circle cx="20" cy="40" r="4" fill="#f3e8ff" />
                <circle cx="60" cy="40" r="4" fill="#f3e8ff" />
                <line x1="25" y1="40" x2="55" y2="40" stroke="#f3e8ff" strokeWidth="2" strokeDasharray="4 4" />
                <path d="M32 25 L48 25 M32 30 L40 30" stroke="white" strokeWidth="3" strokeLinecap="round" />
                <text x="40" y="55" fill="white" fontSize="16" fontWeight="bold" textAnchor="middle">%</text>
              </g>
              <g transform="rotate(15 80 30)">
                <rect x="60" y="10" width="40" height="60" rx="4" fill="#8b5cf6" />
                <circle cx="60" cy="40" r="4" fill="#f3e8ff" />
                <circle cx="100" cy="40" r="4" fill="#f3e8ff" />
                <line x1="65" y1="40" x2="95" y2="40" stroke="#f3e8ff" strokeWidth="2" strokeDasharray="4 4" />
                <path d="M72 25 L88 25 M72 30 L80 30" stroke="white" strokeWidth="3" strokeLinecap="round" />
                <text x="80" y="55" fill="white" fontSize="16" fontWeight="bold" textAnchor="middle">%</text>
              </g>
           </svg>
        </div>
      </div>

      {/* Input Box */}
      <div className="px-4 py-0 -mt-8 relative z-10 w-full mx-auto">
        <div className="bg-white rounded-xl border border-gray-200 flex items-center shadow-sm overflow-hidden h-[46px]">
          <input 
            type="text" 
            placeholder="Enter coupon code" 
            className="flex-1 px-4 py-2 text-[13px] outline-none bg-transparent placeholder-gray-400 text-gray-800" 
          />
          <button className="text-[13px] font-semibold text-gray-700 px-4 h-full whitespace-nowrap bg-white hover:bg-gray-50 transition-colors">
            Add coupon
          </button>
        </div>
      </div>

      {/* Heading & Filters */}
      <div className="px-4 pt-6 pb-2">
        <h3 className="text-[14px] font-bold text-gray-800 mb-3">Save more with coupons</h3>
        <div className="flex gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg text-[11px] font-medium text-gray-600 bg-white hover:bg-gray-50">
            Categories <ChevronDown className="w-3 h-3 text-gray-400" />
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg text-[11px] font-medium text-gray-600 bg-white hover:bg-gray-50">
            Brands <ChevronDown className="w-3 h-3 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Coupon List */}
      <div className="px-4 pt-4 pb-6 flex flex-col gap-3 flex-1">
        {coupons.map((coupon, idx) => (
          <div key={idx} className="relative flex rounded-xl border border-gray-200 bg-[#f8f9fc] h-[100px] overflow-hidden">
            {/* Left Image Section */}
            <div className="w-[100px] bg-white border-r border-dashed border-gray-200 relative flex-shrink-0 flex items-center justify-center p-3">
              {coupon.badge && (
                <div className="absolute top-2 left-2 bg-[#333333] text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-sm z-10">
                  {coupon.badge}
                </div>
              )}
              <img src={coupon.image} className="w-full h-full object-contain mix-blend-multiply" alt={coupon.title} />
            </div>
            
            {/* Top Notch */}
            <div className="absolute -top-2 left-[93px] w-[14px] h-[14px] bg-white border border-gray-200 rounded-full z-10"></div>
            {/* Bottom Notch */}
            <div className="absolute -bottom-2 left-[93px] w-[14px] h-[14px] bg-white border border-gray-200 rounded-full z-10"></div>

            {/* Right Text Section */}
            <div className="flex-1 py-3 pr-3 pl-4 flex flex-col justify-center bg-[#f8f9fc]">
              <p className="text-[10px] text-gray-500 mb-0.5">{coupon.type}</p>
              <h4 className="text-[13px] font-bold text-gray-800 leading-tight">{coupon.title}</h4>
              <p className="text-[10px] text-gray-500 mt-1 line-clamp-1">{coupon.desc}</p>
              <button className="text-[#3b82f6] text-[11px] font-semibold mt-auto text-left w-fit hover:underline">
                View products ›
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer link */}
      <div className="border-t border-gray-100 bg-white p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 mt-auto">
        <p className="text-[12px] text-gray-600 truncate mr-2 font-medium">Drip Hunter - Your go-to place for Onli...</p>
        <Plus className="w-4 h-4 text-gray-400 flex-shrink-0" />
      </div>
    </div>
  );
}
