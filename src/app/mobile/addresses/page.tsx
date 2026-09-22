"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Plus, MapPin, MoreVertical, Trash2, Edit2 } from "lucide-react";
import { useAddress, AddressType } from "@/context/AddressContext";
import AppPageLayout from "@/components/app-shell/AppPageLayout";
import AppHeader from "@/components/app-shell/AppHeader";

export default function MobileAddressesPage() {
  const router = useRouter();
  const { addresses, addAddress, deleteAddress, updateAddress } = useAddress();
  const [activeDropdownId, setActiveDropdownId] = useState<number | null>(null);
  const [editingAddressId, setEditingAddressId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<any>(null);

  // Simplified Add logic for mobile to avoid giant forms here; 
  // in a real app this might open a bottom sheet or another route.
  // We'll just provide a mock "Add" for now that uses geolocation or manual flow.
  const handleAddMockAddress = () => {
    addAddress({
      name: "New Mobile User",
      phone: "+91 9999999999",
      pincode: "110001",
      locality: "Connaught Place",
      address: "123 Mobile Street",
      city: "New Delhi",
      state: "Delhi",
      type: "HOME"
    });
    alert("Mock address added for demonstration.");
  };

  return (
    <AppPageLayout hasBottomNav={false} className="bg-zinc-50 dark:bg-zinc-950">
      <AppHeader showActions={true}
        variant="contextual"
        title="Saved Addresses"
        fallbackUrl="/mobile/account"
        rightAction={
          <button onClick={handleAddMockAddress} aria-label="Add Address" className="p-2 -mr-2 text-zinc-950 dark:text-zinc-50">
            <Plus className="w-6 h-6" />
          </button>
        }
      />

      <div className="flex-1 overflow-y-auto pb-24 px-4 pt-6">
        {addresses.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[50vh] text-center px-4">
            <div className="w-16 h-16 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center mb-6">
              <MapPin className="w-6 h-6 text-zinc-400" />
            </div>
            <h3 className="text-xl font-light text-zinc-900 dark:text-zinc-100 font-playfair tracking-tight mb-3">
              No addresses saved
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 font-sans mb-8">
              Add a new shipping address to checkout faster.
            </p>
            <button 
              onClick={handleAddMockAddress}
              className="bg-zinc-950 dark:bg-[#E6C280] text-white dark:text-zinc-950 px-8 py-3.5 rounded-xl text-xs font-mono font-bold uppercase tracking-widest shadow-md"
            >
              Add New Address
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="text-xs font-mono font-bold tracking-wider text-zinc-500 uppercase mb-2">
              Your Addresses ({addresses.length})
            </div>
            {addresses.map((addr) => (
              <div 
                key={addr.id} 
                className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 relative shadow-sm"
              >
                {editingAddressId === addr.id ? (
                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (editForm) {
                        updateAddress(addr.id, editForm);
                        setEditingAddressId(null);
                      }
                    }}
                    className="flex flex-col gap-3 animate-in fade-in"
                  >
                    <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white mb-2">Edit Address</h4>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] text-zinc-500 uppercase font-bold">Name</label>
                        <input type="text" value={editForm?.name || ""} onChange={e => setEditForm((prev: any) => ({...prev!, name: e.target.value}))} className="w-full text-sm p-2 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800" required />
                      </div>
                      <div>
                        <label className="text-[10px] text-zinc-500 uppercase font-bold">Phone</label>
                        <input type="text" value={editForm?.phone || ""} onChange={e => setEditForm((prev: any) => ({...prev!, phone: e.target.value}))} className="w-full text-sm p-2 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800" required />
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-[10px] text-zinc-500 uppercase font-bold">Locality / Area</label>
                      <input type="text" value={editForm?.locality || ""} onChange={e => setEditForm((prev: any) => ({...prev!, locality: e.target.value}))} className="w-full text-sm p-2 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800" required />
                    </div>

                    <div>
                      <label className="text-[10px] text-zinc-500 uppercase font-bold">Full Address</label>
                      <input type="text" value={editForm?.address || ""} onChange={e => setEditForm((prev: any) => ({...prev!, address: e.target.value}))} className="w-full text-sm p-2 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800" required />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] text-zinc-500 uppercase font-bold">City</label>
                        <input type="text" value={editForm?.city || ""} onChange={e => setEditForm((prev: any) => ({...prev!, city: e.target.value}))} className="w-full text-sm p-2 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800" required />
                      </div>
                      <div>
                        <label className="text-[10px] text-zinc-500 uppercase font-bold">Pincode</label>
                        <input type="text" value={editForm?.pincode || ""} onChange={e => setEditForm((prev: any) => ({...prev!, pincode: e.target.value}))} className="w-full text-sm p-2 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800" required />
                      </div>
                    </div>

                    <div className="flex gap-2 mt-2">
                      <button 
                        type="button" 
                        onClick={() => setEditingAddressId(null)}
                        className="flex-1 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 text-xs font-bold uppercase"
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit"
                        className="flex-1 py-2 rounded-xl bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 text-xs font-bold uppercase"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <div className="flex justify-between items-start mb-3">
                      <span className="bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-zinc-200 dark:border-zinc-700">
                        {addr.type}
                      </span>
                      
                      <div className="relative dropdown-container">
                        <button 
                          className="text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 p-1"
                          onClick={() => setActiveDropdownId(activeDropdownId === addr.id ? null : addr.id)}
                        >
                          <MoreVertical className="w-5 h-5" />
                        </button>
                        
                        {activeDropdownId === addr.id && (
                          <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-xl z-20 overflow-hidden">
                            <button 
                              className="w-full text-left px-4 py-3 text-sm text-zinc-700 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-700"
                              onClick={() => {
                                setEditForm(addr);
                                setEditingAddressId(addr.id);
                                setActiveDropdownId(null);
                              }}
                            >
                              <Edit2 className="w-4 h-4" /> Edit
                            </button>
                            <button 
                              className="w-full text-left px-4 py-3 text-sm text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors flex items-center gap-2"
                              onClick={() => {
                                deleteAddress(addr.id);
                                setActiveDropdownId(null);
                              }}
                            >
                              <Trash2 className="w-4 h-4" /> Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100 uppercase">{addr.name}</span>
                      <span className="text-xs text-zinc-500 font-mono">• {addr.phone}</span>
                    </div>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed pr-6">
                      {addr.address}, {addr.locality}, {addr.city}, {addr.state} - <span className="font-mono">{addr.pincode}</span>
                    </p>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </AppPageLayout>
  );
}
