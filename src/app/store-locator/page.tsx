"use client";

import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SearchOverlay from "@/components/layout/SearchOverlay";
import PageContainer from "@/components/layout/PageContainer";
import { Search, MapPin, Clock, ArrowRight, Navigation2, Map as MapIcon, Phone } from "lucide-react";

export default function StoreLocatorPage() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeStoreId, setActiveStoreId] = useState<number>(1);

  const stores = [
    {
      id: 1,
      name: "DripHunter Mumbai Flagship",
      address: "123 Linking Road, Bandra West, Mumbai, MH 400050",
      city: "Mumbai",
      pin: "400050",
      hours: "Mon - Sun: 11:00 AM - 9:00 PM",
      status: "Open Now",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15082.016335195438!2d72.82522965415701!3d19.06603504859877!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c91130392c07%3A0x3c47bf391c8de931!2sLinking%20Rd%2C%20Bandra%20West%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1704104033000!5m2!1sen!2sin",
      directions: "https://maps.google.com/?q=Linking+Road,+Bandra+West,+Mumbai"
    },
    {
      id: 2,
      name: "DripHunter Delhi Vault",
      address: "Select Citywalk, Saket District Centre, New Delhi, DL 110017",
      city: "Delhi",
      pin: "110017",
      hours: "Mon - Sun: 10:30 AM - 9:30 PM",
      status: "Open Now",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3505.0069351065183!2d77.21639017616654!3d28.529532588383827!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce1f705191b79%3A0x6b6a67f043bc13a6!2sSelect%20CITYWALK!5e0!3m2!1sen!2sin!4v1704104100000!5m2!1sen!2sin",
      directions: "https://maps.google.com/?q=Select+Citywalk,+Saket,+New+Delhi"
    }
  ];

  const filteredStores = stores.filter(store => 
    store.city.toLowerCase().includes(searchQuery.toLowerCase()) || 
    store.pin.includes(searchQuery) ||
    store.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeStore = stores.find(s => s.id === activeStoreId) || stores[0];

  return (
    <div className="min-h-screen bg-[#faf9f8] text-zinc-950 flex flex-col font-sans selection:bg-[#6F4E37]/20 selection:text-[#6F4E37]">
      <Navbar onSearchClick={() => setIsSearchOpen(true)} />

      <PageContainer className="flex-grow py-12 sm:py-20">
        
        {/* Header & Search */}
        <div className="text-center max-w-2xl mx-auto space-y-6 mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-chaney-title uppercase tracking-wider text-zinc-950">
            Find a Store
          </h1>
          <p className="text-sm text-zinc-500 font-sans leading-relaxed">
            Discover our premium flagship stores and exclusive drops worldwide. Enter your location to find the nearest DripHunter vault.
          </p>
          
          <div className="relative w-full max-w-lg mx-auto group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 group-focus-within:text-[#6F4E37] transition-colors" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter city or PIN code..."
              className="w-full bg-white border border-zinc-200 focus:border-[#6F4E37] focus:ring-4 focus:ring-[#6F4E37]/10 outline-none rounded-full pl-12 pr-6 py-4 text-sm text-zinc-950 transition-all shadow-sm"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#6F4E37] hover:bg-[#5C3D2E] text-white p-2.5 rounded-full transition-all">
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Interactive Map Embed */}
          <div className="lg:col-span-8 bg-zinc-200 rounded-[32px] overflow-hidden border border-zinc-200 shadow-sm relative min-h-[500px] h-full w-full">
            <iframe 
              src={activeStore.mapUrl} 
              width="100%" 
              height="100%" 
              style={{ border: 0, minHeight: "500px" }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 w-full h-full"
            ></iframe>
            
            {/* Aesthetic overlay */}
            <div className="absolute bottom-6 left-6 flex items-center gap-2 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-zinc-500 shadow-lg border border-white/20 pointer-events-none">
              <MapIcon className="w-4 h-4 text-[#6F4E37]" />
              {activeStore.city} Location Active
            </div>
          </div>

          {/* Nearby Stores List */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-black uppercase tracking-widest text-zinc-950">
                Nearby Stores
              </h2>
              <span className="text-[10px] font-mono text-zinc-400 bg-white px-2 py-1 rounded-md border border-zinc-200">
                {filteredStores.length} Found
              </span>
            </div>

            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
              {filteredStores.length > 0 ? (
                filteredStores.map((store) => (
                  <div 
                    key={store.id} 
                    onClick={() => setActiveStoreId(store.id)}
                    className={`bg-white border rounded-[24px] p-6 transition-all cursor-pointer group ${activeStoreId === store.id ? "border-[#6F4E37] shadow-lg ring-1 ring-[#6F4E37]/20" : "border-zinc-200 hover:border-[#6F4E37]/40 hover:shadow-md"}`}
                  >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-chaney-title uppercase tracking-wider text-zinc-950 pr-4 leading-tight">
                      {store.name}
                    </h3>
                    <span className="text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-md bg-emerald-50 text-emerald-600 border border-emerald-200/50 shrink-0">
                      {store.status}
                    </span>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-start gap-3 text-xs text-zinc-500 font-sans leading-relaxed">
                      <MapPin className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                      <span>{store.address}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-zinc-500 font-sans">
                      <Clock className="w-4 h-4 text-zinc-400 shrink-0" />
                      <span>{store.hours}</span>
                    </div>
                  </div>

                  <a 
                    href={store.directions}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className={`w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border cursor-pointer ${activeStoreId === store.id ? "bg-[#6F4E37] text-white border-[#6F4E37] hover:bg-[#5c3d2e]" : "bg-zinc-50 text-zinc-600 border-zinc-200 hover:border-[#6F4E37] hover:text-[#6F4E37]"}`}
                  >
                    <Navigation2 className="w-3.5 h-3.5" />
                    Get Directions
                  </a>
                </div>
              ))
              ) : (
                <div className="text-center py-12 px-4 border border-zinc-200 border-dashed rounded-2xl bg-zinc-50/50">
                  <p className="text-sm font-black uppercase tracking-widest text-zinc-400 mb-2">No Stores Found</p>
                  <p className="text-xs text-zinc-500">We don't have a location in that area yet.</p>
                </div>
              )}
            </div>
            
          </div>
        </div>

      </PageContainer>

      <Footer />

      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </div>
  );
}
