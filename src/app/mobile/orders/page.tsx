"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Package, Search, ChevronRight, Star, CheckCircle, SlidersHorizontal, X } from "lucide-react";
import AppPageLayout from "@/components/app-shell/AppPageLayout";
import AppHeader from "@/components/app-shell/AppHeader";

export default function MobileOrdersPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [submittedReviews, setSubmittedReviews] = React.useState<Record<string, any>>({});
  
  // Filter States
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
  
  // Applied Filter States (to actually filter the list)
  const [appliedStatuses, setAppliedStatuses] = useState<string[]>([]);
  const [appliedTimes, setAppliedTimes] = useState<string[]>([]);

  const mockOrders = [
    {
      id: "OD111111111111111111",
      name: "Midnight Eclipse Low",
      brand: "Neo-Step",
      color: "Phantom Black, Size: 9",
      price: "₹8,999",
      status: "Delivered",
      statusDate: "Oct 22",
      statusColor: "text-emerald-500",
      image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: "OD336542014089797100",
      name: "Oversized Cyber-Drip Tee",
      brand: "Outkast Lab",
      color: "Acid Wash, Size: L",
      price: "₹1,799",
      status: "Cancelled",
      statusDate: "Oct 19",
      statusColor: "text-rose-500",
      image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: "OD333333333333333333",
      name: "Tactical Tech Gloves",
      brand: "Urban Combat",
      color: "Olive Drab",
      price: "₹1,499",
      status: "Returned",
      statusDate: "Oct 12",
      statusColor: "text-amber-500",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: "OD444444444444444444",
      name: "Utility Cargo Vest",
      brand: "Tokyo Techwear",
      color: "Gunmetal",
      price: "₹3,499",
      status: "Delivered",
      statusDate: "Jan 14",
      statusColor: "text-emerald-500",
      image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=400&q=80"
    }
  ];

  const [allOrders, setAllOrders] = useState(mockOrders);

  React.useEffect(() => {
    const saved = localStorage.getItem('submittedReviews');
    if (saved) {
      setSubmittedReviews(JSON.parse(saved));
    }

    const savedOrdersStr = localStorage.getItem("drip_all_orders");
    if (savedOrdersStr) {
      try {
        const savedOrders = JSON.parse(savedOrdersStr);
        const formattedOrders = savedOrders.map((o: any) => {
          const firstItem = o.items && o.items.length > 0 ? o.items[0] : {};
          return {
            id: o.orderId,
            name: firstItem.name || "Order Item",
            brand: firstItem.brand || "DripHunter",
            color: `${firstItem.color || "Standard"}, Size: ${firstItem.size || "Standard"}`,
            price: `₹${o.total?.toLocaleString() || "0"}`,
            status: "On the way",
            statusDate: "Just now",
            statusColor: "text-emerald-500",
            image: firstItem.image || "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=400&q=80"
          };
        });
        setAllOrders([...formattedOrders, ...mockOrders]);
      } catch (e) {
        console.error("Error parsing orders", e);
      }
    }
  }, []);

  const filteredOrders = allOrders.filter(order => {
    const matchesSearch = order.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          order.brand.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Status matching
    let matchesStatus = true;
    if (appliedStatuses.length > 0) {
      // Map mock status to the filter names if needed, but our mock statuses are "Delivered", "Cancelled", "Returned"
      matchesStatus = appliedStatuses.includes(order.status);
    }
    
    return matchesSearch && matchesStatus;
  });

  const toggleStatus = (status: string) => {
    setSelectedStatuses(prev => 
      prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status]
    );
  };

  const toggleTime = (time: string) => {
    setSelectedTimes(prev => 
      prev.includes(time) ? prev.filter(t => t !== time) : [...prev, time]
    );
  };

  const handleApplyFilters = () => {
    setAppliedStatuses(selectedStatuses);
    setAppliedTimes(selectedTimes);
    setIsFilterOpen(false);
  };

  const handleClearFilters = () => {
    setSelectedStatuses([]);
    setSelectedTimes([]);
  };

  const handleCancelFilters = () => {
    // Revert to previously applied states
    setSelectedStatuses(appliedStatuses);
    setSelectedTimes(appliedTimes);
    setIsFilterOpen(false);
  };

  const statusOptions = ["On the way", "Delivered", "Cancelled", "Returned"];
  const timeOptions = ["Last 30 days", "2024", "2023", "Older"];

  return (
    <AppPageLayout hasBottomNav={false} className="bg-zinc-50 dark:bg-zinc-950 relative">
      <AppHeader showActions={true}
        variant="contextual"
        title="My Orders"
        fallbackUrl="/mobile/account"
      />

      <div className="flex-1 flex flex-col pb-24">
        
        {/* Search Bar & Filter */}
        <div className="p-4 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 sticky top-0 z-10">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="w-4 h-4 text-zinc-400" />
              </div>
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search your order..." 
                className="w-full pl-10 pr-4 py-3 bg-zinc-100 dark:bg-zinc-900 border border-transparent focus:bg-white dark:focus:bg-zinc-950 focus:border-zinc-300 dark:focus:border-zinc-700 rounded-xl outline-none text-sm text-zinc-900 dark:text-zinc-100 transition-all"
              />
            </div>
            <button 
              onClick={() => setIsFilterOpen(true)}
              className="flex items-center justify-center gap-2 px-4 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-700 rounded-xl text-zinc-700 dark:text-zinc-300 active:scale-95 transition-transform"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="text-sm font-medium">Filters</span>
            </button>
          </div>
        </div>

        {/* Orders List */}
        <div className="flex-1 overflow-y-auto pt-4 px-4">
          {filteredOrders.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[50vh] text-center px-4">
              <div className="w-16 h-16 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center mb-6">
                <Package className="w-6 h-6 text-zinc-400" />
              </div>
              <h3 className="text-xl font-light text-zinc-900 dark:text-zinc-100 font-playfair tracking-tight mb-2">
                No Orders Yet
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 font-sans mb-6">
                Your orders will appear here after you make a purchase.
              </p>
              <button 
                onClick={() => router.push('/mobile/shop')}
                className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-6 py-3 rounded-xl font-mono text-xs font-bold uppercase tracking-wider active:scale-95 transition-transform"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {filteredOrders.map((order) => (
                <div 
                  key={order.id} 
                  onClick={() => router.push(`/mobile/orders/${order.id}`)}
                  className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 flex gap-4 active:scale-[0.98] transition-transform cursor-pointer"
                >
                  <div className="w-20 h-20 rounded-xl bg-zinc-100 dark:bg-zinc-950 flex items-center justify-center overflow-hidden flex-shrink-0">
                    <img src={order.image} alt={order.name} className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal" />
                  </div>
                  
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex justify-between items-start mb-1">
                        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest truncate">{order.brand}</p>
                        <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${order.statusColor}`}>
                          {order.status}
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 truncate">{order.name}</h3>
                      <p className="text-[11px] text-zinc-500 mt-0.5 truncate">{order.color}</p>
                    </div>
                    
                    <div className="flex justify-between items-end mt-2">
                      <span className="text-sm font-mono font-bold text-zinc-900 dark:text-zinc-100">{order.price}</span>
                      
                      <div className="flex gap-2 items-center">
                        {order.status === "Delivered" && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              router.push(`/mobile/reviews/write?orderId=${order.id}`);
                            }}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-colors ${
                              submittedReviews[order.id] 
                                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                                : 'bg-zinc-100 text-zinc-950 dark:bg-zinc-800 dark:text-white'
                            }`}
                          >
                            {submittedReviews[order.id] ? <CheckCircle className="w-3 h-3" /> : <Star className="w-3 h-3" />}
                            <span>{submittedReviews[order.id] ? "Reviewed" : "Review"}</span>
                          </button>
                        )}
                        <div className="flex items-center gap-1 text-[10px] text-zinc-400 font-mono uppercase tracking-wider ml-1">
                          {order.statusDate} <ChevronRight className="w-3 h-3" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Filter Bottom Sheet */}
      {/* Background Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 z-[100] transition-opacity duration-300 ${
          isFilterOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={handleCancelFilters}
      />

      {/* Sheet Content */}
      <div 
        className={`fixed bottom-0 left-0 right-0 bg-white dark:bg-zinc-950 rounded-t-3xl z-[101] transition-transform duration-300 ease-in-out transform flex flex-col max-h-[85vh] ${
          isFilterOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="p-6 overflow-y-auto pb-24">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white">Filters</h2>
            <button 
              onClick={handleClearFilters}
              className="text-sm text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
            >
              Clear Filter
            </button>
          </div>

          <div className="mb-8">
            <h3 className="text-base font-medium text-zinc-900 dark:text-white mb-4">Order Status</h3>
            <div className="flex flex-wrap gap-3">
              {statusOptions.map(status => (
                <button
                  key={status}
                  onClick={() => toggleStatus(status)}
                  className={`px-4 py-2 rounded-xl text-sm border flex items-center gap-2 transition-all ${
                    selectedStatuses.includes(status) 
                      ? "border-[#6F4E37] text-[#6F4E37] bg-[#6F4E37]/10 dark:border-[#E6C280] dark:text-[#E6C280] dark:bg-[#E6C280]/10 font-medium"
                      : "border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-700"
                  }`}
                >
                  {status} <span className="text-[10px] opacity-70">{selectedStatuses.includes(status) ? "×" : "+"}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-base font-medium text-zinc-900 dark:text-white mb-4">Order Time</h3>
            <div className="flex flex-wrap gap-3">
              {timeOptions.map(time => (
                <button
                  key={time}
                  onClick={() => toggleTime(time)}
                  className={`px-4 py-2 rounded-xl text-sm border flex items-center gap-2 transition-all ${
                    selectedTimes.includes(time) 
                      ? "border-[#6F4E37] text-[#6F4E37] bg-[#6F4E37]/10 dark:border-[#E6C280] dark:text-[#E6C280] dark:bg-[#E6C280]/10 font-medium"
                      : "border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-700"
                  }`}
                >
                  {time} <span className="text-[10px] opacity-70">{selectedTimes.includes(time) ? "×" : "+"}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 flex gap-4">
          <button 
            onClick={handleCancelFilters}
            className="flex-1 py-3.5 rounded-xl border border-[#6F4E37] dark:border-[#E6C280] text-[#6F4E37] dark:text-[#E6C280] font-bold text-sm bg-transparent active:bg-[#6F4E37]/5 dark:active:bg-[#E6C280]/5 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handleApplyFilters}
            className="flex-1 py-3.5 rounded-xl bg-zinc-400 dark:bg-zinc-500 text-white dark:text-zinc-900 font-bold text-sm shadow-md transition-colors active:scale-95"
            style={selectedStatuses.length > 0 || selectedTimes.length > 0 ? { backgroundColor: '#6F4E37', color: '#fff' } : {}}
          >
            Apply
          </button>
        </div>
      </div>
    </AppPageLayout>
  );
}
