"use client";

import React, { Suspense, useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ArrowLeft, ChevronDown, Crosshair, Search, X, Home, MapPin, MoreHorizontal, Edit2, Trash2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

function CouponOffersContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const couponCode = searchParams.get('code') || '';
  const [isAddressSidebarOpen, setIsAddressSidebarOpen] = useState(false);
  
  // Addresses state
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "Agent Antigravity",
      address: "277 27, Maa Ambe Nagar, Pardi, nearby Metro Pillar 42, Mumbai, 400001"
    },
    {
      id: 2,
      name: "Jane Smith",
      address: "456 Style Avenue, Trend Plaza, New York, NY 10001"
    }
  ]);
  
  const [activeAddressDropdown, setActiveAddressDropdown] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Modals state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<{ title: string; content: React.ReactNode } | null>(null);

  useEffect(() => {
    setIsAddressSidebarOpen(true);
  }, []);

  const openModal = (title: string, content: React.ReactNode) => {
    setModalContent({ title, content });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setModalContent(null), 200);
  };

  const handleCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    openModal("Current Location", (
      <div className="space-y-6">
        <p className="text-sm font-medium text-zinc-500">Requesting location permission...</p>
        <div className="w-full h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
          <div className="w-1/2 h-full bg-[#6F4E37] dark:bg-[#E6C280] animate-pulse rounded-full"></div>
        </div>
      </div>
    ));

    navigator.geolocation.getCurrentPosition(
      (position) => {
        openModal("Location Found", (
          <div className="space-y-6">
            <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">Successfully fetched coordinates!</p>
            <div className="p-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs text-zinc-950 dark:text-white font-mono">
              Latitude: {position.coords.latitude.toFixed(6)}<br />
              Longitude: {position.coords.longitude.toFixed(6)}
            </div>
            <button 
              className="w-full bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors shadow-lg"
              onClick={() => {
                // Here we would typically reverse-geocode, but we'll mock adding it
                alert("Location set to your current coordinates!");
                closeModal();
                setIsAddressSidebarOpen(false);
              }}
            >
              Confirm Location
            </button>
          </div>
        ));
      },
      (error) => {
        openModal("Location Error", (
          <div className="space-y-6">
            <p className="text-sm font-bold text-red-600 dark:text-red-400">Unable to retrieve your location</p>
            <p className="text-sm font-medium text-zinc-500">Reason: {error.message}</p>
            <button 
              className="w-full border-2 border-zinc-200 dark:border-zinc-800 text-zinc-950 dark:text-white py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:border-zinc-950 dark:hover:border-white transition-colors"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        ));
      }
    );
  };

  const handleAddNewAddress = () => {
    openModal("Add New Address", (
      <div className="space-y-4">
        <input type="text" placeholder="Full Name *" className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 px-4 py-4 rounded-xl text-sm font-medium text-zinc-950 dark:text-white outline-none focus:border-zinc-950 dark:focus:border-white transition-all placeholder-zinc-400" />
        <input type="text" placeholder="Pincode *" className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 px-4 py-4 rounded-xl text-sm font-medium text-zinc-950 dark:text-white outline-none focus:border-zinc-950 dark:focus:border-white transition-all placeholder-zinc-400" />
        <textarea placeholder="Address (House No, Building, Street) *" className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 px-4 py-4 rounded-xl text-sm font-medium text-zinc-950 dark:text-white outline-none focus:border-zinc-950 dark:focus:border-white transition-all placeholder-zinc-400 h-28 resize-none" />
        <button 
          className="w-full bg-[#6F4E37] text-white py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-[#5a3f2c] transition-colors mt-2"
          onClick={() => {
            alert("New address saved!");
            closeModal();
          }}
        >
          Save Address
        </button>
      </div>
    ));
  };

  const handleEditAddress = (id: number) => {
    setActiveAddressDropdown(null);
    openModal("Edit Address", (
      <div className="space-y-4">
        <input type="text" defaultValue={addresses.find(a => a.id === id)?.name} className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 px-4 py-4 rounded-xl text-sm font-medium text-zinc-950 dark:text-white outline-none focus:border-zinc-950 dark:focus:border-white transition-all" />
        <textarea defaultValue={addresses.find(a => a.id === id)?.address} className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 px-4 py-4 rounded-xl text-sm font-medium text-zinc-950 dark:text-white outline-none focus:border-zinc-950 dark:focus:border-white transition-all h-28 resize-none" />
        <button 
          className="w-full bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors mt-2 shadow-lg"
          onClick={() => {
            alert("Address updated!");
            closeModal();
          }}
        >
          Update Address
        </button>
      </div>
    ));
  };

  const handleDeleteAddress = (id: number) => {
    setActiveAddressDropdown(null);
    setAddresses(addresses.filter(a => a.id !== id));
  };

  const filteredAddresses = addresses.filter(a => 
    a.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    a.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const clothingCategories = [
    { name: "Men's T-Shirts", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=300&q=80" },
    { name: "Women's Dresses", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=300&q=80" },
    { name: "Jeans & Trousers", image: "https://images.unsplash.com/photo-1542272604-78021c1798ec?auto=format&fit=crop&w=300&q=80" },
    { name: "Winter Wear", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=300&q=80" },
    { name: "Activewear", image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&w=300&q=80" },
    { name: "Ethnic Wear", image: "https://images.unsplash.com/photo-1583391733958-d15f1136e8c3?auto=format&fit=crop&w=300&q=80" },
    { name: "Footwear", image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=300&q=80" },
    { name: "Accessories", image: "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?auto=format&fit=crop&w=300&q=80" }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans relative">
      <Navbar />

      <main className="flex-grow pt-8 pb-16 px-4 md:px-8 max-w-[1200px] mx-auto w-full">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <ArrowLeft className="w-5 h-5 text-zinc-950 dark:text-white cursor-pointer hover:text-[#6F4E37] dark:hover:text-[#E6C280] transition-colors" onClick={() => router.back()} />
          <h1 className="text-xs font-bold uppercase tracking-widest text-zinc-500">Back to Coupons</h1>
        </div>

        {/* Location Banner */}
        <div 
          className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 md:p-6 mb-10 flex items-center justify-between cursor-pointer w-full md:w-[500px] hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors group"
          onClick={() => setIsAddressSidebarOpen(true)}
        >
          <div>
            <p className="text-sm font-medium text-zinc-950 dark:text-white leading-relaxed">
              <span className="font-bold uppercase tracking-widest text-xs text-[#6F4E37] dark:text-[#E6C280] mr-2">Share Location</span> 
              <br className="sm:hidden" />
              <span className="text-zinc-500 dark:text-zinc-400">to explore exclusive offers trending in your area.</span>
            </p>
          </div>
          <ChevronDown className="w-5 h-5 text-zinc-400 group-hover:text-zinc-950 dark:group-hover:text-white transition-colors flex-shrink-0 ml-4" />
        </div>

        {/* Title */}
        <h2 className="text-3xl md:text-5xl font-chaney-title uppercase tracking-tight text-zinc-950 dark:text-white mb-10">
          Clothing <span className="text-[#6F4E37] dark:text-[#E6C280]">&</span> Fashion
        </h2>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {clothingCategories.map((cat, idx) => (
            <div 
              key={idx} 
              className="bg-white dark:bg-zinc-900 rounded-2xl flex flex-col items-center cursor-pointer hover:shadow-2xl transition-all duration-300 overflow-hidden border border-zinc-200 dark:border-zinc-800 group"
              onClick={() => router.push(`/products?category=${encodeURIComponent(cat.name)}&coupon=${encodeURIComponent(couponCode)}`)}
            >
              <div className="w-full aspect-[4/5] bg-zinc-100 dark:bg-zinc-950 overflow-hidden relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 mix-blend-multiply dark:mix-blend-normal" 
                />
              </div>
              <div className="p-5 w-full text-center border-t border-zinc-100 dark:border-zinc-800">
                <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-950 dark:text-white group-hover:text-[#6F4E37] dark:group-hover:text-[#E6C280] transition-colors line-clamp-1">{cat.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />

      {/* Slide-in Sidebar overlay */}
      {isAddressSidebarOpen && (
        <div className="fixed inset-0 z-40 flex">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsAddressSidebarOpen(false)}
          ></div>
          
          {/* Sliding Panel */}
          <div className="absolute top-0 right-0 h-full w-[450px] max-w-full bg-white dark:bg-zinc-950 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300 border-l border-zinc-200 dark:border-zinc-800">
            {/* Sidebar Header */}
            <div className="flex items-center justify-between p-6 md:p-8 border-b border-zinc-100 dark:border-zinc-800">
              <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-950 dark:text-white">Delivery Address</h2>
              <X className="w-6 h-6 text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors cursor-pointer" onClick={() => setIsAddressSidebarOpen(false)} />
            </div>

            {/* Sidebar Body */}
            <div 
              className="p-6 md:p-8 flex-grow overflow-y-auto"
              onClick={() => setActiveAddressDropdown(null)} // Close dropdowns on clicking body
            >
              
              {/* Search */}
              <div className="relative mb-8">
                <Search className="w-5 h-5 text-zinc-400 absolute left-4 top-4" />
                <input 
                  type="text" 
                  placeholder="Search area, street, pincode" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full border border-zinc-200 dark:border-zinc-800 rounded-xl py-4 pl-12 pr-4 text-sm font-medium bg-zinc-50 dark:bg-zinc-900 text-zinc-950 dark:text-white outline-none focus:border-zinc-950 dark:focus:border-white transition-all placeholder-zinc-400"
                />
              </div>

              {/* Current Location */}
              <div 
                className="flex items-center gap-4 pb-8 border-b border-zinc-100 dark:border-zinc-800 border-dashed cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-900 p-4 -mx-4 rounded-xl transition-colors group"
                onClick={handleCurrentLocation}
              >
                <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Crosshair className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-1">Current Location</h3>
                  <p className="text-xs font-medium text-zinc-500">Allow GPS access</p>
                </div>
              </div>

              {/* Saved Addresses Header */}
              <div className="flex items-center justify-between mt-8 mb-6">
                <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Saved addresses</h3>
                <span 
                  className="text-xs font-bold text-[#6F4E37] dark:text-[#E6C280] uppercase tracking-widest cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={handleAddNewAddress}
                >
                  + Add New
                </span>
              </div>

              {/* Saved Addresses List */}
              <div className="space-y-4 pb-12">
                {filteredAddresses.length === 0 ? (
                  <div className="text-center py-12 bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
                    <p className="text-sm font-medium text-zinc-500">
                      {searchQuery ? "No matching addresses found." : "No saved addresses."}
                    </p>
                  </div>
                ) : (
                  filteredAddresses.map((address) => (
                    <div key={address.id} className="flex gap-4 p-4 border border-zinc-200 dark:border-zinc-800 rounded-xl transition-colors hover:border-[#6F4E37] dark:hover:border-[#E6C280] group relative bg-white dark:bg-zinc-950">
                      <Home className="w-5 h-5 text-zinc-400 mt-1 flex-shrink-0 group-hover:text-[#6F4E37] dark:group-hover:text-[#E6C280] transition-colors" />
                      <div className="flex-1 cursor-pointer">
                        <h4 className="text-sm font-bold text-zinc-950 dark:text-white mb-2 uppercase tracking-wide">{address.name}</h4>
                        <p className="text-sm text-zinc-500 font-medium leading-relaxed pr-6">{address.address}</p>
                      </div>
                      
                      {/* Three dots menu */}
                      <div className="relative">
                        <div 
                          className="w-8 h-8 flex items-center justify-center text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-full cursor-pointer transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveAddressDropdown(activeAddressDropdown === address.id ? null : address.id);
                          }}
                        >
                          <MoreHorizontal className="w-5 h-5" />
                        </div>

                        {/* Dropdown Menu */}
                        {activeAddressDropdown === address.id && (
                          <div 
                            className="absolute right-0 top-10 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl rounded-xl py-2 w-36 z-10 animate-in fade-in zoom-in-95 duration-100"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div 
                              className="flex items-center gap-3 px-4 py-3 hover:bg-zinc-50 dark:hover:bg-zinc-950 cursor-pointer text-xs font-bold uppercase tracking-widest text-zinc-950 dark:text-white transition-colors"
                              onClick={() => handleEditAddress(address.id)}
                            >
                              <Edit2 className="w-4 h-4 text-zinc-400" /> Edit
                            </div>
                            <div 
                              className="flex items-center gap-3 px-4 py-3 hover:bg-red-50 dark:hover:bg-red-950/30 cursor-pointer text-xs font-bold uppercase tracking-widest text-red-600 dark:text-red-400 transition-colors"
                              onClick={() => handleDeleteAddress(address.id)}
                            >
                              <Trash2 className="w-4 h-4" /> Delete
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Global Modals */}
      {isModalOpen && modalContent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeModal}></div>
          <div className="bg-white dark:bg-zinc-900 rounded-3xl w-full max-w-md flex flex-col shadow-2xl z-10 animate-in fade-in zoom-in-95 duration-200 border border-zinc-200 dark:border-zinc-800 overflow-hidden">
            <div className="px-8 py-6 border-b border-zinc-100 dark:border-zinc-800 flex justify-between items-center bg-zinc-50 dark:bg-zinc-950">
              <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-950 dark:text-white">{modalContent.title}</h3>
              <button onClick={closeModal} className="text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors bg-transparent border-none cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-8">
              {modalContent.content}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default function CouponOffersPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background text-foreground flex items-center justify-center font-chaney-title animate-pulse">Loading...</div>}>
      <CouponOffersContent />
    </Suspense>
  );
}
