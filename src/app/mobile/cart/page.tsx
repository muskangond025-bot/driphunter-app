"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  ShoppingBag,
  Trash2,
  Minus,
  Plus,
  ArrowRight,
  Check,
  Tag,
  ShieldCheck,
  ChevronRight,
  Heart
} from "lucide-react";

import { useCart } from "@/context/CartContext";
import { useAddress } from "@/context/AddressContext";
import AppHeader from "@/components/app-shell/AppHeader";
import AppPageLayout from "@/components/app-shell/AppPageLayout";

export default function MobileCartPage() {
  const router = useRouter();

  // 1. Contexts
  const { cart, wishlist, removeFromCart, updateQuantity, isInWishlist, toggleWishlist } = useCart();
  const { addresses, activeAddressId } = useAddress();

  // 2. Local State (Matching Desktop Cart Logic)
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>("DRIP10");
  const [couponError, setCouponError] = useState("");
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  // 3. Pricing Math (Replicating Desktop Exactly)
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  
  const couponDiscount = useMemo(() => {
    if (!appliedCoupon) return 0;
    if (appliedCoupon === "DRIP10") return Math.round(subtotal * 0.10);
    if (appliedCoupon === "VIP15") return Math.round(subtotal * 0.15);
    return 0;
  }, [appliedCoupon, subtotal]);

  const totalAmount = Math.max(0, subtotal - couponDiscount);
  
  // Free Shipping Threshold (replicated from desktop but maybe not displayed visually in mobile yet, keeping logic consistent)
  const freeShippingThreshold = 1999;
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  // 4. Handlers (Replicated from Desktop)
  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (code === "DRIP10" || code === "VIP15") {
      setAppliedCoupon(code);
      setCouponError("");
      triggerToast(`Coupon code ${code} applied successfully!`);
    } else {
      setCouponError("Invalid Coupon. Try using DRIP10 or VIP15.");
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
    triggerToast("Coupon code removed.");
  };

  const handleToggleWishlist = (item: any) => {
    const isWished = isInWishlist(item.id);
    toggleWishlist({
      id: item.id,
      name: item.name,
      price: `₹${item.price.toLocaleString()}`,
      brand: item.brand,
      image: item.image,
    });
    triggerToast(isWished ? `Removed ${item.name} from Wishlist.` : `Added ${item.name} to Wishlist.`);
  };

  // 5. Active Address
  const activeAddress = addresses.find(a => a.id === activeAddressId) || addresses[0];

  return (
    <AppPageLayout hasBottomNav={true}>
      <AppHeader variant="main" title="Bag" />

      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-[100] bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 px-4 py-2.5 rounded-full font-mono text-xs font-bold shadow-2xl flex items-center gap-2 animate-in slide-in-from-top-2 w-[90%] max-w-sm">
          <Check className="w-4 h-4 text-emerald-400" />
          <span className="truncate">{toastMsg}</span>
        </div>
      )}

      {cart.length === 0 ? (
        // ─── EMPTY STATE ───
        <div className="flex-1 flex flex-col items-center justify-center p-6 min-h-[60vh]">
          <div className="w-20 h-20 bg-zinc-100 dark:bg-zinc-900 rounded-full flex items-center justify-center mb-6 shadow-inner">
            <ShoppingBag className="w-8 h-8 text-[#6F4E37] dark:text-[#E6C280]" />
          </div>
          <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-[#6F4E37] dark:text-[#E6C280] uppercase mb-2">
            YOUR CLOSET
          </span>
          <h1 className="text-3xl font-light tracking-tight text-zinc-950 dark:text-zinc-50 font-playfair leading-tight text-center mb-3">
            Shopping Bag is <br />
            <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280]">Empty</span>
          </h1>
          <p className="text-xs text-zinc-500 text-center max-w-[280px] mb-8 font-sans">
            Add limited edition apparel, authenticated grails, or sneaker silhouettes to your curated closet.
          </p>
          <Link 
            href="/mobile/categories"
            className="flex items-center gap-2 bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 px-8 py-3.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider active:scale-95 transition-transform"
          >
            Explore Drops
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        // ─── ACTIVE CART ───
        <div className="flex flex-col w-full bg-zinc-50 dark:bg-zinc-950 min-h-full pb-32">
          
          {/* Deliver To / Address Summary */}
          <div className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 p-4">
            {activeAddress ? (
              <div className="flex items-center justify-between">
                <div className="flex flex-col overflow-hidden mr-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase font-bold">
                      Deliver to
                    </span>
                    <span className="bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 text-[8px] px-1.5 py-0.5 rounded uppercase font-bold tracking-wider">
                      {activeAddress.type}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100 truncate mt-0.5">
                    {activeAddress.name}, {activeAddress.pincode}
                  </span>
                  <span className="text-[11px] text-zinc-500 truncate mt-0.5">
                    {activeAddress.address}, {activeAddress.city}
                  </span>
                </div>
                <button 
                  className="text-[10px] font-bold text-[#6F4E37] dark:text-[#E6C280] uppercase tracking-wider font-mono border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-1.5 active:bg-zinc-50 dark:active:bg-zinc-800"
                >
                  Change
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-zinc-600 dark:text-zinc-400">
                  No delivery address selected.
                </span>
                <button className="text-[10px] font-bold bg-zinc-950 text-white dark:bg-white dark:text-zinc-900 uppercase tracking-wider font-mono rounded-lg px-3 py-1.5 active:scale-95">
                  Add
                </button>
              </div>
            )}
          </div>

          {/* Cart Items List */}
          <div className="flex flex-col divide-y divide-zinc-100 dark:divide-zinc-800/50 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
            {cart.map((item, idx) => (
              <div key={`${item.id}-${item.size}-${item.color}`} className="p-4 flex flex-col gap-4">
                <div className="flex gap-4">
                  {/* Image */}
                  <div className="relative w-20 h-28 bg-zinc-100 dark:bg-zinc-800 rounded-lg overflow-hidden shrink-0 border border-zinc-200 dark:border-zinc-700">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  
                  {/* Info */}
                  <div className="flex flex-col justify-start flex-1 overflow-hidden">
                    <span className="text-[9px] font-mono font-bold tracking-widest text-[#6F4E37] dark:text-[#E6C280] uppercase mb-1">
                      {item.brand}
                    </span>
                    <span className="text-sm font-sans font-medium text-zinc-900 dark:text-zinc-100 line-clamp-2 leading-snug mb-2">
                      {item.name}
                    </span>
                    
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 px-2 py-0.5 rounded font-mono font-bold">
                        {item.size}
                      </span>
                      <span className="text-[10px] bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 px-2 py-0.5 rounded font-mono font-bold truncate max-w-[80px]">
                        {item.color}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mt-auto">
                      <span className="text-[10px] text-zinc-400 line-through font-sans">
                        ₹{(item.price * item.quantity + 500).toLocaleString()}
                      </span>
                      <strong className="text-sm font-bold text-zinc-900 dark:text-white font-sans">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </strong>
                    </div>
                  </div>
                </div>

                {/* Actions Row */}
                <div className="flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800 pt-3">
                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-zinc-300 dark:border-zinc-600 rounded overflow-hidden h-8 bg-zinc-50 dark:bg-zinc-800 w-[100px]">
                    <button 
                      onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)}
                      className="flex-1 h-full flex items-center justify-center text-zinc-600 dark:text-zinc-300 border-r border-zinc-300 dark:border-zinc-600 active:bg-zinc-200 dark:active:bg-zinc-700 transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="flex-1 text-xs font-bold font-sans text-center text-zinc-900 dark:text-white">
                      {item.quantity}
                    </span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}
                      className="flex-1 h-full flex items-center justify-center text-zinc-600 dark:text-zinc-300 border-l border-zinc-300 dark:border-zinc-600 active:bg-zinc-200 dark:active:bg-zinc-700 transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => handleToggleWishlist(item)}
                      className="text-zinc-400 hover:text-[#6F4E37] dark:hover:text-[#E6C280] transition-colors p-1"
                    >
                      <Heart className={`w-4 h-4 ${isInWishlist(item.id) ? "fill-red-500 text-red-500" : ""}`} />
                    </button>
                    <button 
                      onClick={() => removeFromCart(item.id, item.size, item.color)}
                      className="text-zinc-400 hover:text-red-500 transition-colors p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Coupon Section */}
          <div className="bg-white dark:bg-zinc-900 border-y border-zinc-200 dark:border-zinc-800 p-4 mt-4">
            <div className="flex items-center gap-2 mb-3">
              <Tag className="w-4 h-4 text-[#6F4E37] dark:text-[#E6C280]" />
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
                Apply Coupon
              </h3>
            </div>

            {appliedCoupon ? (
              <div className="flex items-center justify-between bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50 rounded-xl p-3">
                <div className="flex items-center gap-2">
                  <span className="bg-emerald-500 text-white text-[9px] font-bold tracking-widest px-2 py-1 rounded">
                    {appliedCoupon}
                  </span>
                  <span className="text-xs font-medium text-emerald-800 dark:text-emerald-400">
                    Applied successfully
                  </span>
                </div>
                <button
                  onClick={handleRemoveCoupon}
                  className="text-[10px] font-bold font-mono text-emerald-700 dark:text-emerald-500 uppercase tracking-wider"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter DRIP10 or VIP15"
                  className="flex-1 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-2.5 text-xs font-mono text-zinc-900 dark:text-white outline-none focus:border-[#6F4E37] dark:focus:border-[#E6C280] uppercase placeholder:normal-case placeholder:text-zinc-400"
                />
                <button
                  type="submit"
                  className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider active:scale-95 transition-transform"
                >
                  Apply
                </button>
              </form>
            )}
            {couponError && (
              <p className="text-[10px] text-red-500 mt-2 font-medium">{couponError}</p>
            )}
          </div>

          {/* Price Summary */}
          <div className="bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 p-4 mt-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-900 dark:text-white border-b border-zinc-100 dark:border-zinc-800 pb-3 mb-4">
              Price Details ({cartCount} Items)
            </h3>
            
            <div className="space-y-3 text-xs font-sans text-zinc-600 dark:text-zinc-400">
              <div className="flex justify-between">
                <span>MRP (incl. of all taxes)</span>
                <span className="font-bold text-zinc-900 dark:text-white">₹{(subtotal + 500).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                <span>Discounts {appliedCoupon ? `(${appliedCoupon})` : ""}</span>
                <span className="font-bold">-₹{(couponDiscount + 500).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Fees</span>
                <span className="font-bold text-zinc-900 dark:text-white">₹10</span>
              </div>
            </div>

            <div className="border-t border-dashed border-zinc-300 dark:border-zinc-700 mt-4 pt-4 flex items-center justify-between">
              <strong className="text-sm font-bold text-zinc-900 dark:text-white font-sans uppercase">Total Amount</strong>
              <strong className="text-lg font-bold text-zinc-900 dark:text-white font-sans">
                ₹{(totalAmount + 10).toLocaleString()}
              </strong>
            </div>

            <div className="mt-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/50 rounded-lg p-3 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <p className="text-[11px] font-medium text-emerald-800 dark:text-emerald-400 leading-tight">
                You will save <strong className="font-bold">₹{(500 + couponDiscount).toLocaleString()}</strong> on this order. 100% Authenticity Guaranteed.
              </p>
            </div>
          </div>
          
        </div>
      )}

      {/* ─── STICKY CHECKOUT CTA ─── */}
      {cart.length > 0 && (
        <div 
          className="fixed left-0 right-0 z-40 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md border-t border-zinc-200 dark:border-zinc-800 shadow-[0_-10px_20px_rgba(0,0,0,0.05)] px-4 py-3"
          style={{ bottom: "calc(4rem + env(safe-area-inset-bottom))" }}
        >
          <div className="flex items-center justify-between gap-4 max-w-md mx-auto">
            <div className="flex flex-col">
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono font-bold">Total</span>
              <strong className="text-lg font-bold text-zinc-900 dark:text-white font-sans leading-none">
                ₹{(totalAmount + 10).toLocaleString()}
              </strong>
            </div>
            <button
              onClick={() => router.push("/mobile/checkout")}
              className="flex-1 bg-[#6F4E37] text-white py-3.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider shadow-lg shadow-[#6F4E37]/20 active:scale-95 transition-transform flex items-center justify-center gap-2"
            >
              Checkout <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </AppPageLayout>
  );
}
