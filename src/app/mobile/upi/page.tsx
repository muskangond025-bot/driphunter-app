"use client";

import React, { useState } from "react";
import AppHeader from "@/components/app-shell/AppHeader";
import AppPageLayout from "@/components/app-shell/AppPageLayout";
import { CreditCard, Plus, Trash2, CheckCircle2 } from "lucide-react";
import { usePayment } from "@/context/PaymentContext";

export default function MobileUpiPage() {
  const { savedUpis, addUpi, removeUpi } = usePayment();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newUpi, setNewUpi] = useState("");
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleAddUpi = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUpi.includes("@")) {
      triggerToast("Invalid UPI ID");
      return;
    }
    addUpi(newUpi);
    setShowAddForm(false);
    setNewUpi("");
    triggerToast("UPI added successfully");
  };

  const handleRemove = (upi: string) => {
    removeUpi(upi);
    triggerToast("UPI removed");
  };

  return (
    <AppPageLayout hasBottomNav={false} className="bg-zinc-50 dark:bg-zinc-950">
      <AppHeader showActions={true}
        variant="contextual"
        title="Saved UPI"
        fallbackUrl="/mobile/account"
      />

      {toastMsg && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-[100] bg-zinc-900 text-white px-4 py-2.5 rounded-full font-mono text-xs font-bold shadow-2xl flex items-center gap-2 animate-in slide-in-from-top-2 w-[90%] max-w-sm justify-center">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span className="truncate">{toastMsg}</span>
        </div>
      )}

      <div className="p-4 flex flex-col gap-4 pb-24">
        {savedUpis.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-900 rounded-full flex items-center justify-center mb-4">
              <CreditCard className="w-8 h-8 text-zinc-300 dark:text-zinc-700" />
            </div>
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white mb-1">NO SAVED UPI</h3>
            <p className="text-xs text-zinc-500 mb-6">Save a UPI ID for faster checkout.</p>
          </div>
        ) : (
          savedUpis.map(upi => (
            <div 
              key={upi} 
              className="bg-white dark:bg-zinc-900 rounded-2xl p-4 border border-zinc-200 dark:border-zinc-800 shadow-sm"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-zinc-900 dark:text-white font-mono">{upi}</span>
                  <span className="text-xs text-zinc-500">UPI</span>
                </div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-zinc-800">
                <div />
                <button 
                  onClick={() => handleRemove(upi)}
                  className="text-xs font-bold text-rose-500 uppercase tracking-widest flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Remove
                </button>
              </div>
            </div>
          ))
        )}

        {!showAddForm ? (
          <button 
            onClick={() => setShowAddForm(true)}
            className="mt-4 border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 active:bg-zinc-100 dark:active:bg-zinc-900 transition-colors"
          >
            <div className="w-10 h-10 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center">
              <Plus className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
            </div>
            <span className="text-sm font-bold text-zinc-700 dark:text-zinc-300">+ ADD UPI</span>
          </button>
        ) : (
          <form onSubmit={handleAddUpi} className="mt-4 bg-white dark:bg-zinc-900 rounded-2xl p-4 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col gap-4 animate-in slide-in-from-bottom-4">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-widest mb-2">Add New UPI</h3>
            <input 
              type="text" 
              value={newUpi}
              onChange={(e) => setNewUpi(e.target.value)}
              placeholder="UPI ID (e.g. muskan@upi)"
              className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm outline-none focus:border-zinc-900 dark:focus:border-zinc-100"
            />
            <div className="flex gap-3 mt-2">
              <button 
                type="button"
                onClick={() => setShowAddForm(false)}
                className="w-1/2 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 text-sm font-bold text-zinc-600 dark:text-zinc-400"
              >
                Cancel
              </button>
              <button 
                type="submit"
                disabled={!newUpi}
                className="w-1/2 py-3 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-sm font-bold disabled:opacity-50"
              >
                Save UPI
              </button>
            </div>
          </form>
        )}
      </div>
    </AppPageLayout>
  );
}
