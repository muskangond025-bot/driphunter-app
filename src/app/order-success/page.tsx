"use client";

import React, { useState, useEffect, Suspense } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SearchOverlay from "@/components/layout/SearchOverlay";
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

function OrderSuccessContent() {
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
    // Attempt to read order placed from localStorage
    const savedOrder = localStorage.getItem("drip_last_order");
    if (savedOrder) {
      try {
        const parsed = JSON.parse(savedOrder);
        if (queryOrderId && parsed.orderId !== queryOrderId) {
          parsed.orderId = queryOrderId;
        }
        
        // Compute exact subtotal from items if available
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

    // Default fallback order ONLY when no previous order exists in localStorage
    const fallbackOrder: OrderData = {
      orderId: queryOrderId || "DH78053",
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      }),
      customerName: "Abhishek Yadav",
      email: "abhishek@driphunter.com",
      phone: "+91 98765 43210",
      address: "Flat 402, Highline Residency, Bandra West",
      city: "Mumbai",
      state: "Maharashtra",
      zip: "400050",
      paymentMethod: "UPI // Verified Escrow",
      shippingMethod: "Express Vault Tracked",
      subtotal: 3899,
      discount: 0,
      total: 3899,
      estimatedDelivery: "3 to 4 Business Days",
      items: [
        {
          id: "p15",
          name: "Owners Club Heavyweight Zip Hoodie",
          brand: "Represent",
          image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=600&q=85",
          price: 3899,
          quantity: 1,
          size: "L",
          color: "Vintage Black"
        }
      ]
    };

    setOrder(fallbackOrder);
  }, [queryOrderId]);

  const handleCopyOrderId = () => {
    if (!order) return;
    navigator.clipboard.writeText(order.orderId);
    setIsCopied(true);
    triggerToast("Order ID copied to clipboard!");
    setTimeout(() => setIsCopied(false), 2500);
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  if (!order) return null;

  const totalItemCount = order.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="space-y-10 sm:space-y-14 w-full">
      {/* Toast */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 px-5 py-3.5 rounded-2xl font-mono text-xs font-bold shadow-2xl flex items-center gap-2.5 border border-white/10 animate-fade-in">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* ─── 1. ORDER CONFIRMED HERO CARD (PRESERVED HEADINGS & CULTURE-CIRCLE LUXURY SEAL) ─── */}
      <section className="bg-white dark:bg-zinc-900/90 border border-stone-200/90 dark:border-zinc-800/90 rounded-[40px] p-8 sm:p-14 text-center shadow-md dark:shadow-[0_20px_60px_rgba(0,0,0,0.8)] relative overflow-hidden text-left">
        {/* Glow ambient background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-[#E6C280]/15 blur-[140px] rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center space-y-5 max-w-2xl mx-auto">
          {/* Animated Success Badge */}
          <div className="relative">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/80 flex items-center justify-center shadow-inner ring-8 ring-emerald-500/10 animate-bounce">
              <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 stroke-[2.5]" />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-[#6F4E37] dark:bg-[#E6C280] text-white dark:text-zinc-950 p-1.5 rounded-full shadow-md">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
          </div>

          <div className="space-y-2.5">
            <span className="text-[10px] font-mono font-bold tracking-[0.3em] text-[#6F4E37] dark:text-[#E6C280] uppercase bg-[#6F4E37]/10 dark:bg-[#E6C280]/15 px-4 py-1.5 rounded-full inline-block border border-[#6F4E37]/20 dark:border-[#E6C280]/30">
              TRANSACTION VERIFIED // ESCROW LOCKED
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-zinc-950 dark:text-zinc-50 font-playfair leading-[1.05] uppercase">
              Order <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280]">Confirmed</span>
            </h1>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-sans font-normal max-w-lg mx-auto leading-relaxed">
              Thank you for your order, <strong className="text-zinc-900 dark:text-white font-semibold">{order.customerName}</strong>. Your streetwear pieces have been secured and transferred to our Central Vault for physical authenticity verification.
            </p>
          </div>

          {/* Order ID Pill & Print action */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <div className="flex items-center gap-2.5 bg-stone-50 dark:bg-zinc-800/90 border border-stone-200 dark:border-zinc-700/80 rounded-2xl px-5 py-3 shadow-xs">
              <span className="text-xs font-mono text-zinc-400 uppercase font-bold">Order Number:</span>
              <span className="text-sm font-mono font-black text-[#6F4E37] dark:text-[#E6C280] tracking-wider">
                #{order.orderId}
              </span>
              <button
                onClick={handleCopyOrderId}
                className="ml-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer border-none bg-transparent"
                title="Copy Order ID"
              >
                {isCopied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            <button
              onClick={handlePrintReceipt}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-stone-50 dark:bg-zinc-800/90 border border-stone-200 dark:border-zinc-700/80 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer font-mono text-xs font-bold uppercase tracking-wider"
              title="Print Receipt"
            >
              <Printer className="w-4 h-4" />
              <span>Print Invoice</span>
            </button>
          </div>
        </div>
      </section>

      {/* ─── 2. ORDER DETAILS GRID (ONLY PURCHASED ITEMS + FINANCIAL TOTAL + ADDRESS + DELIVERY) ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start w-full">
        
        {/* ─── LEFT COLUMN: ONLY PURCHASED PRODUCTS SUMMARY (7 COLS) ─── */}
        <div className="lg:col-span-7 space-y-6 text-left">
          <div className="bg-white dark:bg-zinc-900/90 border border-stone-200/90 dark:border-zinc-800/90 rounded-[36px] p-6 sm:p-8 shadow-xs space-y-6">
            
            <div className="flex items-center justify-between pb-4 border-b border-stone-100 dark:border-zinc-800">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#6F4E37]/10 dark:bg-[#E6C280]/15 text-[#6F4E37] dark:text-[#E6C280] flex items-center justify-center">
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <h3 className="text-base sm:text-lg font-bold uppercase tracking-tight text-zinc-900 dark:text-white font-playfair">
                  Purchased Items ({totalItemCount})
                </h3>
              </div>
              <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-800/80">
                100% Legit Vault Certified
              </span>
            </div>

            {/* ONLY Purchased Product Item Cards */}
            <div className="space-y-4">
              {order.items.map((item, idx) => (
                <div
                  key={`${item.id}-${idx}`}
                  className="flex items-center gap-5 p-4 sm:p-5 rounded-[24px] bg-stone-50/80 dark:bg-zinc-800/60 border border-stone-200/80 dark:border-zinc-700/80 hover:border-[#6F4E37]/40 dark:hover:border-[#E6C280]/40 transition-all duration-300 group text-left"
                >
                  <div className="w-20 h-24 sm:w-24 sm:h-28 rounded-2xl overflow-hidden bg-stone-100 dark:bg-zinc-900 shrink-0 border border-stone-200 dark:border-zinc-700 shadow-inner relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-1.5 left-1.5 bg-black/70 backdrop-blur-xs text-white text-[7px] font-mono font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
                      VERIFIED
                    </div>
                  </div>

                  <div className="flex-grow min-w-0 space-y-1.5">
                    {item.brand && (
                      <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-[#6F4E37] dark:text-[#E6C280] block">
                        {item.brand}
                      </span>
                    )}
                    <h4 className="text-xs sm:text-sm font-semibold text-zinc-900 dark:text-white truncate font-sans">
                      {item.name}
                    </h4>
                    <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono text-zinc-500 dark:text-zinc-400">
                      <span className="bg-white dark:bg-zinc-800 px-2 py-0.5 rounded border border-stone-200 dark:border-zinc-700">Size: <strong className="text-zinc-800 dark:text-zinc-200 font-bold">{item.size || "Standard"}</strong></span>
                      {item.color && item.color !== "Default" && (
                        <span className="bg-white dark:bg-zinc-800 px-2 py-0.5 rounded border border-stone-200 dark:border-zinc-700">Color: <strong className="text-zinc-800 dark:text-zinc-200 font-bold">{item.color}</strong></span>
                      )}
                      <span>Qty: <strong className="text-zinc-800 dark:text-zinc-200 font-bold">{item.quantity}</strong></span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-sm sm:text-base font-mono font-black text-zinc-900 dark:text-white block">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </span>
                    <span className="text-[9px] font-mono text-zinc-400 uppercase">
                      ₹{item.price.toLocaleString()} each
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Authenticity Guarantee Banner */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#6F4E37]/5 dark:bg-[#E6C280]/10 border border-[#6F4E37]/20 dark:border-[#E6C280]/20 flex items-center gap-3.5">
              <ShieldCheck className="w-6 h-6 text-[#6F4E37] dark:text-[#E6C280] shrink-0" />
              <p className="text-xs text-zinc-700 dark:text-zinc-300 font-sans leading-relaxed">
                Every piece undergoes a 12-point physical check by resident specialists before dispatch. Includes tamper-proof holographic authentication tags.
              </p>
            </div>

          </div>

          {/* ─── ESTIMATED DELIVERY TRACKER MILESTONES ─── */}
          <div className="bg-white dark:bg-zinc-900/90 border border-stone-200/90 dark:border-zinc-800/90 rounded-[36px] p-6 sm:p-8 shadow-xs space-y-6 text-left">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100 dark:border-zinc-800">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#6F4E37]/10 dark:bg-[#E6C280]/15 text-[#6F4E37] dark:text-[#E6C280] flex items-center justify-center">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold uppercase tracking-tight text-zinc-900 dark:text-white font-playfair leading-tight">
                    Estimated Delivery
                  </h3>
                  <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                    {order.estimatedDelivery}
                  </span>
                </div>
              </div>

              <span className="text-[9px] font-mono font-bold text-zinc-600 dark:text-zinc-400 uppercase bg-stone-100 dark:bg-zinc-800 px-3 py-1.5 rounded-full border border-stone-200 dark:border-zinc-700">
                Express Air Transit
              </span>
            </div>

            {/* 4 Step Visual Progress Tracker */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 relative pt-2">
              {/* Step 1 */}
              <div className="space-y-2 relative">
                <div className="w-9 h-9 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xs shadow-md">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
                <div>
                  <span className="text-[10.5px] font-mono font-bold uppercase text-zinc-900 dark:text-white block">
                    Order Placed
                  </span>
                  <span className="text-[9px] text-zinc-400 font-sans block">Confirmed</span>
                </div>
              </div>

              {/* Step 2 */}
              <div className="space-y-2 relative">
                <div className="w-9 h-9 rounded-full bg-[#6F4E37] dark:bg-[#E6C280] text-white dark:text-zinc-950 flex items-center justify-center font-bold text-xs shadow-md animate-pulse">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10.5px] font-mono font-bold uppercase text-zinc-900 dark:text-white block">
                    Vault Check
                  </span>
                  <span className="text-[9px] text-[#6F4E37] dark:text-[#E6C280] font-sans font-bold block">In Progress</span>
                </div>
              </div>

              {/* Step 3 */}
              <div className="space-y-2 relative opacity-60">
                <div className="w-9 h-9 rounded-full bg-stone-200 dark:bg-zinc-800 text-zinc-500 flex items-center justify-center font-bold text-xs">
                  3
                </div>
                <div>
                  <span className="text-[10.5px] font-mono font-bold uppercase text-zinc-900 dark:text-white block">
                    Dispatched
                  </span>
                  <span className="text-[9px] text-zinc-400 font-sans block">Delhivery Air</span>
                </div>
              </div>

              {/* Step 4 */}
              <div className="space-y-2 relative opacity-60">
                <div className="w-9 h-9 rounded-full bg-stone-200 dark:bg-zinc-800 text-zinc-500 flex items-center justify-center font-bold text-xs">
                  4
                </div>
                <div>
                  <span className="text-[10.5px] font-mono font-bold uppercase text-zinc-900 dark:text-white block">
                    Delivered
                  </span>
                  <span className="text-[9px] text-zinc-400 font-sans block">To Doorstep</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* ─── RIGHT COLUMN: EXACT FINANCIAL TOTAL & SHIPPING ADDRESS (5 COLS) ─── */}
        <div className="lg:col-span-5 space-y-6 text-left">
          
          {/* Total Price Breakdown based on exact items purchased */}
          <div className="bg-white dark:bg-zinc-900/90 border border-stone-200/90 dark:border-zinc-800/90 rounded-[36px] p-6 sm:p-8 shadow-xs space-y-5 text-left">
            <div className="flex items-center gap-2.5 pb-4 border-b border-stone-100 dark:border-zinc-800">
              <div className="w-9 h-9 rounded-xl bg-[#6F4E37]/10 dark:bg-[#E6C280]/15 text-[#6F4E37] dark:text-[#E6C280] flex items-center justify-center">
                <CreditCard className="w-4 h-4" />
              </div>
              <h3 className="text-base sm:text-lg font-bold uppercase tracking-tight text-zinc-900 dark:text-white font-playfair">
                Financial Summary
              </h3>
            </div>

            <div className="space-y-3.5 font-mono text-xs text-zinc-600 dark:text-zinc-400">
              <div className="flex justify-between items-center">
                <span>Items Subtotal ({totalItemCount} Items)</span>
                <span className="font-bold text-zinc-900 dark:text-white">₹{order.subtotal.toLocaleString()}</span>
              </div>

              {order.discount > 0 && (
                <div className="flex justify-between items-center text-emerald-600 dark:text-emerald-400">
                  <span>Promo Discount Applied</span>
                  <span className="font-bold">-₹{order.discount.toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between items-center">
                <span>Physical Vault Legit-Check</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold uppercase text-[10px]">Complimentary (₹0)</span>
              </div>

              <div className="flex justify-between items-center">
                <span>Tracked Express Courier</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold uppercase text-[10px]">Free Delivery</span>
              </div>

              <div className="flex justify-between items-center">
                <span>GST & Statutory Taxes</span>
                <span className="text-zinc-500 text-[10px]">Included</span>
              </div>

              <div className="pt-4 border-t border-stone-100 dark:border-zinc-800 flex justify-between items-center text-sm font-bold text-zinc-900 dark:text-white">
                <div>
                  <span className="font-sans uppercase block text-xs font-mono">Total Amount Paid</span>
                  <span className="text-[8.5px] font-mono text-zinc-400 uppercase font-normal">All taxes included</span>
                </div>
                <span className="text-2xl font-mono font-black text-[#6F4E37] dark:text-[#E6C280]">
                  ₹{order.total.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="pt-2">
              <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-zinc-800/70 border border-stone-200/80 dark:border-zinc-700/80 flex items-center justify-between text-xs font-mono">
                <span className="text-zinc-400 uppercase text-[9.5px]">Payment Status:</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold uppercase text-[10px] flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>{order.paymentMethod}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Shipping Address & Contact */}
          <div className="bg-white dark:bg-zinc-900/90 border border-stone-200/90 dark:border-zinc-800/90 rounded-[36px] p-6 sm:p-8 shadow-xs space-y-4 text-left">
            <div className="flex items-center gap-2.5 pb-4 border-b border-stone-100 dark:border-zinc-800">
              <div className="w-9 h-9 rounded-xl bg-[#6F4E37]/10 dark:bg-[#E6C280]/15 text-[#6F4E37] dark:text-[#E6C280] flex items-center justify-center">
                <MapPin className="w-4 h-4" />
              </div>
              <h3 className="text-base sm:text-lg font-bold uppercase tracking-tight text-zinc-900 dark:text-white font-playfair">
                Shipping Destination
              </h3>
            </div>

            <div className="space-y-2 text-xs font-sans leading-relaxed text-zinc-600 dark:text-zinc-300">
              <p className="font-bold text-zinc-900 dark:text-white text-sm">
                {order.customerName}
              </p>
              <p className="text-zinc-600 dark:text-zinc-400">
                {order.address}
              </p>
              <p className="text-zinc-600 dark:text-zinc-400">
                {order.city}, {order.state} - {order.zip}
              </p>
              <div className="pt-2 font-mono text-[10.5px] text-zinc-500 dark:text-zinc-400 space-y-1">
                <div>Phone: <strong className="text-zinc-800 dark:text-zinc-200">{order.phone}</strong></div>
                <div>Email: <strong className="text-zinc-800 dark:text-zinc-200">{order.email}</strong></div>
              </div>
            </div>
          </div>

          {/* ─── ACTION BUTTONS ─── */}
          <div className="space-y-3 pt-2">
            <Link
              href="/orders"
              className="w-full inline-flex items-center justify-center gap-2 bg-zinc-950 hover:bg-[#6F4E37] dark:bg-[#E6C280] dark:text-zinc-950 dark:hover:bg-[#d4b06c] text-white px-8 py-4 rounded-2xl text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-md hover:scale-[1.01] active:scale-95 text-center border-none"
            >
              <span>Track Order In Realtime</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/shop"
              className="w-full inline-flex items-center justify-center gap-2 bg-white dark:bg-zinc-900 hover:bg-stone-50 dark:hover:bg-zinc-800 text-zinc-900 dark:text-white border border-stone-200 dark:border-zinc-800 px-8 py-4 rounded-2xl text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-xs hover:scale-[1.01] active:scale-95 text-center"
            >
              <span>Continue Shopping</span>
              <ShoppingBag className="w-4 h-4" />
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5] dark:bg-[#0C0B0A] text-zinc-900 dark:text-white font-sans antialiased overflow-x-hidden select-none transition-colors duration-300 w-full">
      {/* Navbar */}
      <Navbar onSearchClick={() => setIsSearchOpen(true)} />

      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      <main className="flex-grow py-10 sm:py-14 md:py-16 px-6 sm:px-12 md:px-16 lg:px-20 w-full max-w-[1600px] mx-auto">
        <Suspense fallback={
          <div className="flex items-center justify-center py-32 text-zinc-400 font-mono text-xs">
            Loading order confirmation...
          </div>
        }>
          <OrderSuccessContent />
        </Suspense>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
