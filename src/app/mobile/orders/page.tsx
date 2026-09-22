"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Package, Search, ChevronRight } from "lucide-react";
import AppPageLayout from "@/components/app-shell/AppPageLayout";
import AppHeader from "@/components/app-shell/AppHeader";

export default function MobileOrdersPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

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

  const filteredOrders = mockOrders.filter(order => 
    order.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    order.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AppPageLayout hasBottomNav={false} className="bg-zinc-50 dark:bg-zinc-950">
      <AppHeader showActions={true}
        variant="contextual"
        title="My Orders"
        fallbackUrl="/mobile/account"
      />

      <div className="flex-1 flex flex-col pb-24">
        
        {/* Search Bar */}
        <div className="p-4 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 sticky top-0 z-10">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="w-4 h-4 text-zinc-400" />
            </div>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by brand or product..." 
              className="w-full pl-10 pr-4 py-3 bg-zinc-100 dark:bg-zinc-900 border border-transparent focus:bg-white dark:focus:bg-zinc-950 focus:border-zinc-300 dark:focus:border-zinc-700 rounded-xl outline-none text-sm text-zinc-900 dark:text-zinc-100 transition-all"
            />
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
                No orders found
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 font-sans">
                Try adjusting your search or explore new drops.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {filteredOrders.map((order) => (
                <div 
                  key={order.id} 
                  className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 flex gap-4 active:scale-[0.98] transition-transform"
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
                      <div className="flex items-center gap-1 text-[10px] text-zinc-400 font-mono uppercase tracking-wider">
                        {order.statusDate} <ChevronRight className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AppPageLayout>
  );
}
