"use client";

import React, { useState } from "react";
import AppHeader from "@/components/app-shell/AppHeader";
import AppPageLayout from "@/components/app-shell/AppPageLayout";
import { CreditCard, Plus, Trash2, CheckCircle2 } from "lucide-react";
import { usePayment } from "@/context/PaymentContext";

export default function MobilePaymentsPage() {
  const { savedCards, addCard, removeCard, setDefaultCard } = usePayment();
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  
  // New Card Form States
  const [newCardNumber, setNewCardNumber] = useState("");
  const [newCardExpiry, setNewCardExpiry] = useState("");
  const [newCardCvv, setNewCardCvv] = useState("");
  const [newCardName, setNewCardName] = useState("");

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleRemove = (id: string) => {
    removeCard(id);
    triggerToast("Payment method removed");
  };

  const handleSetDefault = (id: string) => {
    setDefaultCard(id);
    triggerToast("Default payment method updated");
  };

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCardNumber || !newCardExpiry || !newCardCvv || !newCardName) {
      triggerToast("Please fill all details");
      return;
    }
    
    const last4 = newCardNumber.slice(-4) || "0000";
    const type = newCardNumber.startsWith("4") ? "Visa" : "Mastercard"; // simple mock logic
    
    addCard({
      type,
      last4,
      expiry: newCardExpiry,
      cardName: newCardName,
      isDefault: false
    });
    
    setShowAddForm(false);
    triggerToast("Card added successfully");
    
    // Reset form
    setNewCardNumber("");
    setNewCardExpiry("");
    setNewCardCvv("");
    setNewCardName("");
  };

  return (
    <AppPageLayout hasBottomNav={false} className="bg-zinc-50 dark:bg-zinc-950">
      <AppHeader showActions={true}
        variant="contextual"
        title="Saved Payment Methods"
        fallbackUrl="/mobile/account"
      />

      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-[100] bg-zinc-900 text-white px-4 py-2.5 rounded-full font-mono text-xs font-bold shadow-2xl flex items-center gap-2 animate-in slide-in-from-top-2 w-[90%] max-w-sm justify-center">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span className="truncate">{toastMsg}</span>
        </div>
      )}

      <div className="p-4 flex flex-col gap-4 pb-24">
        {savedCards.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-900 rounded-full flex items-center justify-center mb-4">
              <CreditCard className="w-8 h-8 text-zinc-300 dark:text-zinc-700" />
            </div>
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white mb-1">No saved cards</h3>
            <p className="text-xs text-zinc-500">Add a payment method for faster checkout.</p>
          </div>
        ) : (
          savedCards.map(card => (
            <div 
              key={card.id} 
              className={`bg-white dark:bg-zinc-900 rounded-2xl p-4 border transition-colors ${
                card.isDefault 
                  ? "border-zinc-900 dark:border-zinc-100 shadow-md" 
                  : "border-zinc-200 dark:border-zinc-800 shadow-sm"
              }`}
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-8 bg-zinc-100 dark:bg-zinc-800 rounded flex items-center justify-center text-xs font-bold font-mono text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">
                    {card.type}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-zinc-900 dark:text-white font-mono">
                      •••• •••• •••• {card.last4}
                    </span>
                    <span className="text-xs text-zinc-500">Exp: {card.expiry}</span>
                  </div>
                </div>
                {card.isDefault && (
                  <span className="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full">
                    Default
                  </span>
                )}
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-zinc-800">
                {!card.isDefault ? (
                  <button 
                    onClick={() => handleSetDefault(card.id)}
                    className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest"
                  >
                    Set as default
                  </button>
                ) : (
                  <div /> // Spacer
                )}
                <button 
                  onClick={() => handleRemove(card.id)}
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
            <span className="text-sm font-bold text-zinc-700 dark:text-zinc-300">Add new payment method</span>
          </button>
        ) : (
          <form onSubmit={handleAddCard} className="mt-4 bg-white dark:bg-zinc-900 rounded-2xl p-4 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col gap-4 animate-in slide-in-from-bottom-4">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-widest mb-2">Add New Card</h3>
            
            <input 
              type="text" 
              maxLength={16}
              value={newCardNumber}
              onChange={(e) => setNewCardNumber(e.target.value.replace(/\D/g, ''))}
              placeholder="Card Number"
              className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm outline-none focus:border-zinc-900 dark:focus:border-zinc-100"
            />
            
            <div className="flex gap-4">
              <input 
                type="text" 
                maxLength={5}
                value={newCardExpiry}
                onChange={(e) => setNewCardExpiry(e.target.value)}
                placeholder="MM/YY"
                className="w-1/2 px-4 py-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm outline-none focus:border-zinc-900 dark:focus:border-zinc-100"
              />
              <input 
                type="text" 
                maxLength={4}
                value={newCardCvv}
                onChange={(e) => setNewCardCvv(e.target.value.replace(/\D/g, ''))}
                placeholder="CVV"
                className="w-1/2 px-4 py-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm outline-none focus:border-zinc-900 dark:focus:border-zinc-100"
              />
            </div>
            
            <input 
              type="text" 
              value={newCardName}
              onChange={(e) => setNewCardName(e.target.value)}
              placeholder="Cardholder Name"
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
                disabled={!newCardNumber || !newCardExpiry || !newCardCvv || !newCardName}
                className="w-1/2 py-3 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-sm font-bold disabled:opacity-50"
              >
                Save Card
              </button>
            </div>
          </form>
        )}

      </div>
    </AppPageLayout>
  );
}
