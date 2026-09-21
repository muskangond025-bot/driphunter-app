"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Search, ChevronDown, ChevronRight, Package, XCircle, Star, Box, CheckCircle, Filter } from "lucide-react";

export default function OrdersPage() {
  const router = useRouter();
  
  // Orders State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [submittedReviews, setSubmittedReviews] = useState<Record<string, any>>({});

  useEffect(() => {
    const saved = localStorage.getItem('submittedReviews');
    if (saved) setSubmittedReviews(JSON.parse(saved));
  }, []);

  const mockOrders = [
    {
      id: "OD111111111111111111",
      name: "Midnight Eclipse Low",
      brand: "Neo-Step",
      color: "Color: Phantom Black, Size: 9",
      price: "₹8,999",
      status: "Delivered on Oct 22",
      baseStatus: "Delivered",
      timeCategory: "2023",
      statusColor: "green",
      subText: "Your grail has arrived.",
      image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=400&q=80",
      showReview: true
    },
    {
      id: "OD336542014089797100",
      name: "Oversized Cyber-Drip Tee",
      brand: "Outkast Lab",
      color: "Color: Acid Wash, Size: L",
      price: "₹1,799",
      status: "Cancelled on Oct 19 2023",
      baseStatus: "Cancelled",
      timeCategory: "2023",
      statusColor: "red",
      subText: "Order cancelled as requested.",
      image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=400&q=80",
      showReview: false
    },
    {
      id: "OD333333333333333333",
      name: "Tactical Tech Gloves",
      brand: "Urban Combat",
      color: "Color: Olive Drab",
      price: "₹1,499",
      status: "Returned",
      baseStatus: "Returned",
      timeCategory: "Last 30 days",
      statusColor: "orange",
      subText: "Refund initiated.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=400&q=80",
      showReview: false
    },
    {
      id: "OD444444444444444444",
      name: "Utility Cargo Vest",
      brand: "Tokyo Techwear",
      color: "Color: Gunmetal",
      price: "₹3,499",
      status: "Delivered on Jan 14",
      baseStatus: "Delivered",
      timeCategory: "Last 30 days",
      statusColor: "green",
      subText: "Your package was delivered.",
      image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=400&q=80",
      showReview: true
    }
  ];

  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch = order.name.toLowerCase().includes(searchQuery.toLowerCase()) || order.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.includes(order.baseStatus) || (order.baseStatus === "On the way" && selectedStatuses.includes("On the way"));
    const matchesTime = selectedTimes.length === 0 || selectedTimes.includes(order.timeCategory);
    return matchesSearch && matchesStatus && matchesTime;
  });

  const toggleStatus = (status: string) => {
    setSelectedStatuses(prev => prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status]);
  };

  const toggleTime = (time: string) => {
    setSelectedTimes(prev => prev.includes(time) ? prev.filter(t => t !== time) : [...prev, time]);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Navbar onSearchClick={() => {}} />

      <main className="flex-grow bg-zinc-50 dark:bg-zinc-950 pb-16 pt-8">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-12 md:px-16 lg:px-20 flex flex-col md:flex-row gap-8">
          
          {/* Mobile Overlay */}
          {isMobileFilterOpen && (
            <div 
              className="fixed inset-0 bg-black/40 z-[90] md:hidden animate-fade-in"
              onClick={() => setIsMobileFilterOpen(false)}
            />
          )}

          {/* SIDEBAR Filters */}
          <div className={`w-full md:w-[280px] flex-shrink-0 space-y-6 md:relative md:z-auto md:bg-transparent md:block ${isMobileFilterOpen ? 'fixed bottom-0 left-0 right-0 z-[100] bg-white dark:bg-zinc-950 rounded-t-3xl max-h-[85vh] overflow-y-auto pb-6 animate-slide-up-sheet shadow-[0_-20px_40px_rgba(0,0,0,0.15)] block' : 'max-md:hidden'}`}>
            <style>{`
              @keyframes slideUpSheet {
                from { transform: translateY(100%); }
                to { transform: translateY(0); }
              }
              .animate-slide-up-sheet {
                animation: slideUpSheet 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
              }
            `}</style>
            <div className="bg-white dark:bg-zinc-900 border-0 md:border border-zinc-200 dark:border-zinc-800 rounded-none md:rounded-2xl overflow-hidden shadow-none md:shadow-sm">
              <div className="p-6 md:p-6 pt-8 md:pt-6 border-b border-zinc-100 dark:border-zinc-800 flex justify-between items-center">
                <h2 className="text-xl font-chaney-title uppercase tracking-wider text-zinc-950 dark:text-white">Filters</h2>
                <button onClick={() => setIsMobileFilterOpen(false)} className="md:hidden text-zinc-500 hover:text-zinc-950 dark:hover:text-white transition-colors">
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
              <div className="p-6 border-b border-zinc-100 dark:border-zinc-800">
                <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">Order Status</div>
                <div className="space-y-4">
                  {['On the way', 'Delivered', 'Cancelled', 'Returned'].map((status) => (
                    <label key={status} className="flex items-center gap-3 cursor-pointer group">
                      <div className="relative flex items-center justify-center w-5 h-5">
                        <input 
                          type="checkbox" 
                          checked={selectedStatuses.includes(status)}
                          onChange={() => toggleStatus(status)}
                          className="peer appearance-none w-5 h-5 border-2 border-zinc-300 dark:border-zinc-700 rounded-sm checked:border-zinc-950 dark:checked:border-white checked:bg-zinc-950 dark:checked:bg-white transition-all cursor-pointer" 
                        />
                        <div className="absolute text-white dark:text-zinc-950 pointer-events-none opacity-0 peer-checked:opacity-100">
                           <svg width="10" height="8" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M1 5L5 9L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                           </svg>
                        </div>
                      </div>
                      <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-950 dark:group-hover:text-white transition-colors">{status}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="p-6">
                <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">Order Time</div>
                <div className="space-y-4">
                  {['Last 30 days', '2023', '2022', 'Older'].map((time) => (
                    <label key={time} className="flex items-center gap-3 cursor-pointer group">
                      <div className="relative flex items-center justify-center w-5 h-5">
                        <input 
                          type="checkbox" 
                          checked={selectedTimes.includes(time)}
                          onChange={() => toggleTime(time)}
                          className="peer appearance-none w-5 h-5 border-2 border-zinc-300 dark:border-zinc-700 rounded-sm checked:border-zinc-950 dark:checked:border-white checked:bg-zinc-950 dark:checked:bg-white transition-all cursor-pointer" 
                        />
                        <div className="absolute text-white dark:text-zinc-950 pointer-events-none opacity-0 peer-checked:opacity-100">
                           <svg width="10" height="8" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M1 5L5 9L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                           </svg>
                        </div>
                      </div>
                      <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-950 dark:group-hover:text-white transition-colors">{time}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="p-6 md:hidden border-t border-zinc-100 dark:border-zinc-800 mt-4">
                <button 
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-full bg-[#6F4E37] dark:bg-[#E6C280] text-white dark:text-zinc-950 px-6 py-4 rounded-xl text-xs font-bold uppercase tracking-widest shadow-md hover:opacity-90 transition-opacity"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>

          {/* MAIN CONTENT */}
          <div className="flex-1 w-full flex flex-col gap-6">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-500">
              <span className="hover:text-zinc-950 dark:hover:text-white cursor-pointer transition-colors" onClick={() => router.push('/')}>Home</span>
              <ChevronRight className="w-4 h-4" />
              <span className="hover:text-zinc-950 dark:hover:text-white cursor-pointer transition-colors" onClick={() => router.push('/profile')}>My Account</span>
              <ChevronRight className="w-4 h-4" />
              <span className="text-zinc-950 dark:text-white">My Orders</span>
            </div>

            {/* Header & Search */}
            <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6">
              <h1 className="text-3xl md:text-5xl font-chaney-title uppercase tracking-tight text-zinc-950 dark:text-white">
                Order <span className="text-[#6F4E37] dark:text-[#E6C280]">History</span>
              </h1>
              
              <div className="flex-1 max-w-xl xl:max-w-md">
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="w-5 h-5 text-zinc-400 group-focus-within:text-zinc-950 dark:group-focus-within:text-white transition-colors" />
                  </div>
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by brand or product..." 
                    className="w-full pl-12 pr-4 py-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl outline-none text-sm font-medium text-zinc-950 dark:text-white focus:border-zinc-950 dark:focus:border-white transition-all shadow-sm"
                  />
                </div>
                
                {/* Mobile Filter Toggle */}
                <button 
                  onClick={() => setIsMobileFilterOpen(true)} 
                  className="w-full mt-4 md:hidden flex items-center justify-center gap-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-950 dark:text-white px-4 py-4 rounded-xl font-bold text-xs uppercase tracking-widest shadow-sm"
                >
                  <Filter className="w-4 h-4" />
                  <span>Filter Orders</span>
                </button>
              </div>
            </div>

            {/* Order Items */}
            <div className="space-y-4">
              {filteredOrders.length > 0 ? filteredOrders.map((item) => (
                <div 
                  key={item.id} 
                  onClick={() => router.push(`/orders/${item.id}`)}
                  className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 flex flex-col lg:flex-row gap-6 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors group shadow-sm cursor-pointer"
                >
                  <div className="w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 bg-zinc-100 dark:bg-zinc-950 rounded-xl flex items-center justify-center p-2 overflow-hidden relative">
                    <img src={item.image} alt={item.name} className="max-w-full max-h-full object-contain hover:scale-110 transition-transform duration-500 mix-blend-multiply dark:mix-blend-normal" />
                  </div>
                  
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1 truncate">{item.brand}</p>
                          <h3 className="text-lg md:text-xl font-chaney-title uppercase text-zinc-950 dark:text-white group-hover:text-[#6F4E37] dark:group-hover:text-[#E6C280] transition-colors truncate">{item.name}</h3>
                          <p className="text-sm text-zinc-500 mt-2 font-medium">{item.color}</p>
                        </div>
                        <div className="text-left lg:text-right">
                          <span className="text-xl font-chaney-title text-zinc-950 dark:text-white">{item.price}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-zinc-100 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className={`flex items-center justify-center w-10 h-10 rounded-full ${item.statusColor === 'green' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' : item.statusColor === 'red' ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' : 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400'}`}>
                          {item.statusColor === 'green' && <Package className="w-5 h-5" />}
                          {item.statusColor === 'red' && <XCircle className="w-5 h-5" />}
                          {item.statusColor === 'orange' && <Package className="w-5 h-5" />}
                        </div>
                        <div>
                          <p className="text-sm font-bold uppercase tracking-wide text-zinc-950 dark:text-white">{item.status}</p>
                          <p className="text-xs font-medium text-zinc-500 mt-0.5">{item.subText}</p>
                        </div>
                      </div>
                      
                      {item.showReview && (
                        (() => {
                          const hasReviewed = submittedReviews[item.id];
                          return (
                            <button 
                              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-colors ${
                                hasReviewed 
                                  ? 'bg-emerald-100 hover:bg-emerald-200 text-emerald-700 dark:bg-emerald-900/30 dark:hover:bg-emerald-900/50 dark:text-emerald-400'
                                  : 'bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-950 dark:text-white'
                              }`}
                              onClick={(e) => {
                                e.stopPropagation();
                                router.push(`/profile/review?orderId=${item.id}`);
                              }}
                            >
                              {hasReviewed ? <CheckCircle className="w-4 h-4" /> : <Star className="w-4 h-4" />}
                              <span>{hasReviewed ? "Review Submitted" : "Review"}</span>
                            </button>
                          );
                        })()
                      )}
                    </div>
                  </div>
                </div>
              )) : (
                <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-12 text-center flex flex-col items-center justify-center shadow-sm">
                  <div className="w-24 h-24 mb-6 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center">
                    <Box className="w-10 h-10 text-zinc-400 dark:text-zinc-500" />
                  </div>
                  <h3 className="text-2xl font-chaney-title uppercase text-zinc-950 dark:text-white mb-3">No drops found</h3>
                  <p className="text-zinc-500 font-medium">We couldn't find any orders matching your criteria.</p>
                  <button 
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedStatuses([]);
                      setSelectedTimes([]);
                    }}
                    className="mt-6 px-6 py-3 bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 rounded-xl text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-opacity"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
