"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  Package,
  Truck,
  ShieldCheck,
  ArrowRight,
  ShoppingBag,
  MapPin,
  Clock,
  Printer,
  Copy,
  Check,
  CreditCard,
  Sparkles,
  ArrowUpRight,
  FileText
} from "lucide-react";
import AppPageLayout from "@/components/app-shell/AppPageLayout";

interface OrderItem {
  id: string | number;
  name: string;
  brand?: string;
  image: string;
  price: number;
  quantity: number;
  size?: string;
  color?: string;
}

interface OrderData {
  orderId: string;
  date: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  paymentMethod: string;
  shippingMethod: string;
  subtotal: number;
  discount: number;
  total: number;
  estimatedDelivery: string;
  items: OrderItem[];
}

function MobileOrderSuccessContent() {
  const searchParams = useSearchParams();
  const queryOrderId = searchParams.get("orderId");

  const [order, setOrder] = useState<OrderData | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  useEffect(() => {
    // Exact same localStorage logic as desktop
    const savedOrder = localStorage.getItem("drip_last_order");
    if (savedOrder) {
      try {
        const parsed = JSON.parse(savedOrder);
        if (queryOrderId && parsed.orderId !== queryOrderId) {
          parsed.orderId = queryOrderId;
        }
        
        if (parsed.items && Array.isArray(parsed.items) && parsed.items.length > 0) {
          const computedSubtotal = parsed.items.reduce(
            (sum: number, item: OrderItem) => sum + (Number(item.price) || 0) * (Number(item.quantity) || 1),
            0
          );
          parsed.subtotal = computedSubtotal;
          parsed.total = Math.max(0, computedSubtotal - (Number(parsed.discount) || 0));
        }

        setOrder(parsed);
        return;
      } catch (e) {
        console.error("Error reading saved order", e);
      }
    }

    // Default fallback order if none exists
    setOrder({
      orderId: queryOrderId || "DH78053",
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      customerName: "Abhishek Yadav",
      email: "abhishek@driphunter.com",
      phone: "+91 98765 43210",
      address: "Flat 402, Highline Residency",
      city: "Mumbai",
      state: "Maharashtra",
      zip: "400050",
      paymentMethod: "UPI // Verified Escrow",
      shippingMethod: "Express Vault Tracked",
      subtotal: 3899,
      discount: 0,
      total: 3899,
      estimatedDelivery: "3 to 4 Business Days",
      items: [{
        id: "p15",
        name: "Owners Club Heavyweight Zip Hoodie",
        brand: "Represent",
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=600&q=85",
        price: 3899,
        quantity: 1,
        size: "L",
        color: "Vintage Black"
      }]
    });
  }, [queryOrderId]);

  if (!order) return <div className="p-8 text-center text-xs font-mono">Loading...</div>;

  const totalItemCount = order.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="flex flex-col flex-1 w-full p-4 space-y-6 pb-24 bg-zinc-50 dark:bg-zinc-950 min-h-screen">
      
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-12 left-1/2 -translate-x-1/2 z-[100] bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 px-4 py-2.5 rounded-full font-mono text-[10px] font-bold shadow-2xl flex items-center gap-2 animate-in slide-in-from-top-2 w-[90%] max-w-[300px]">
          <Check className="w-3.5 h-3.5 text-emerald-400" />
          <span className="truncate">{toastMsg}</span>
        </div>
      )}

      {/* Hero Success Card */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 text-center shadow-sm relative overflow-hidden mt-6">
        <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center mb-4">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <span className="text-[9px] font-mono font-bold tracking-[0.2em] text-[#6F4E37] dark:text-[#E6C280] uppercase mb-2 block">
          TRANSACTION VERIFIED
        </span>
        <h1 className="text-3xl font-light tracking-tight text-zinc-950 dark:text-zinc-50 font-playfair leading-tight mb-2">
          Order <span className="font-serif italic text-[#6F4E37] dark:text-[#E6C280]">Confirmed</span>
        </h1>
        <p className="text-xs text-zinc-500 font-sans mb-4">
          Thank you, <strong className="text-zinc-900 dark:text-zinc-100">{order.customerName}</strong>. Your heat has been secured.
        </p>

        <div className="flex items-center justify-center gap-2 bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 rounded-xl p-3 inline-flex">
          <span className="text-[10px] font-mono text-zinc-500 uppercase">Order ID:</span>
          <span className="text-xs font-mono font-bold text-zinc-900 dark:text-white">#{order.orderId}</span>
          <button 
            onClick={() => {
              navigator.clipboard.writeText(order.orderId);
              setIsCopied(true);
              triggerToast("Order ID copied to clipboard!");
              setTimeout(() => setIsCopied(false), 2000);
            }} 
            className="ml-2 text-zinc-400"
          >
            {isCopied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Items Breakdown */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-5 shadow-sm">
        <h3 className="text-xs font-mono font-bold uppercase text-zinc-500 mb-4 border-b border-zinc-100 dark:border-zinc-800 pb-2">
          Purchased Items ({totalItemCount})
        </h3>
        <div className="space-y-4">
          {order.items.map((item, idx) => (
            <div key={`${item.id}-${idx}`} className="flex gap-4">
              <div className="w-16 h-20 rounded-xl overflow-hidden bg-zinc-100 shrink-0 relative">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 space-y-1">
                {item.brand && <span className="text-[8px] font-mono font-bold text-[#6F4E37] uppercase">{item.brand}</span>}
                <p className="text-xs font-bold text-zinc-900 dark:text-white line-clamp-1">{item.name}</p>
                <div className="text-[9px] text-zinc-500 font-mono">
                  <span>Size: {item.size}</span> | <span>Qty: {item.quantity}</span>
                </div>
                <p className="text-xs font-bold">₹{(item.price * item.quantity).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Financial Summary */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-5 shadow-sm space-y-3 font-mono text-xs text-zinc-600 dark:text-zinc-400">
        <h3 className="text-xs font-bold uppercase text-zinc-500 mb-2 border-b border-zinc-100 dark:border-zinc-800 pb-2 font-mono">
          Financial Summary
        </h3>
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="text-zinc-900 dark:text-white font-bold">₹{order.subtotal.toLocaleString()}</span>
        </div>
        {order.discount > 0 && (
          <div className="flex justify-between text-emerald-600">
            <span>Discount Applied</span>
            <span className="font-bold">-₹{order.discount.toLocaleString()}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span>Shipping & Vault Check</span>
          <span className="text-emerald-600 font-bold">FREE</span>
        </div>
        <div className="flex justify-between border-t border-zinc-100 dark:border-zinc-800 pt-3 text-sm">
          <span className="text-zinc-900 dark:text-white font-bold uppercase">Total</span>
          <span className="text-[#6F4E37] dark:text-[#E6C280] font-black">₹{order.total.toLocaleString()}</span>
        </div>
      </div>

      {/* Delivery Tracking / Info */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-5 shadow-sm">
        <h3 className="text-xs font-mono font-bold uppercase text-zinc-500 mb-4 border-b border-zinc-100 dark:border-zinc-800 pb-2 flex items-center gap-2">
          <Truck className="w-4 h-4" /> Delivery Info
        </h3>
        <div className="text-xs space-y-1 text-zinc-600 dark:text-zinc-300">
          <p className="font-bold text-zinc-900 dark:text-white">{order.customerName}</p>
          <p>{order.address}</p>
          <p>{order.city}, {order.state} {order.zip}</p>
          <div className="mt-3 bg-zinc-50 dark:bg-zinc-950 p-3 rounded-xl border border-zinc-100 dark:border-zinc-800">
            <span className="block text-[10px] text-zinc-500 uppercase font-bold mb-1">Est. Arrival</span>
            <span className="text-emerald-600 font-bold">{order.estimatedDelivery}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3 pt-2">
        <Link href="/mobile/categories" className="flex items-center justify-center gap-2 w-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 py-4 rounded-xl text-xs font-mono font-bold uppercase tracking-wider active:scale-95 transition-transform">
          Continue Shopping <ShoppingBag className="w-4 h-4" />
        </Link>
        <button onClick={() => alert('Order tracking feature in development!')} className="flex items-center justify-center gap-2 w-full bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-800 py-4 rounded-xl text-xs font-mono font-bold uppercase tracking-wider active:scale-95 transition-transform">
          Track Order
        </button>
      </div>

    </div>
  );
}

export default function MobileOrderSuccessPage() {
  return (
    <AppPageLayout hasBottomNav={false}>
      {/* A simple clean header without a back button to prevent users from returning to checkout */}
      <div className="flex items-center justify-center h-14 bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 sticky top-0 z-50">
        <span className="font-playfair text-lg font-bold">Drip Hunter</span>
      </div>

      <Suspense fallback={<div className="p-10 text-center text-xs font-mono">Loading Receipt...</div>}>
        <MobileOrderSuccessContent />
      </Suspense>
    </AppPageLayout>
  );
}
