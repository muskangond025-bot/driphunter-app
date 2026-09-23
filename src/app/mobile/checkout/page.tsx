"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { 
  ArrowLeft, 
  ChevronRight, 
  ShieldCheck, 
  MapPin, 
  Truck, 
  CreditCard,
  CheckCircle2
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAddress } from "@/context/AddressContext";
import AppPageLayout from "@/components/app-shell/AppPageLayout";
import AppHeader from "@/components/app-shell/AppHeader";
import { usePayment } from "@/context/PaymentContext";

type CheckoutStep = "address" | "delivery" | "payment" | "review";

export default function MobileCheckoutPage() {
  const router = useRouter();
  const { cart, clearCart } = useCart();
  const { addresses, activeAddressId } = useAddress();

  const [step, setStep] = useState<CheckoutStep>("address");
  const [formErrors, setFormErrors] = useState<string[]>([]);

  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  // ─── FORM STATE ───
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [apartment, setApartment] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");

  const [shippingMethod, setShippingMethod] = useState("express");
  const [paymentMethod, setPaymentMethod] = useState("card");

  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [upiId, setUpiId] = useState("");

  const { savedUpis, savedCards, addUpi, addCard } = usePayment();
  const [selectedSavedUpi, setSelectedSavedUpi] = useState<string>("new");
  const [selectedSavedCard, setSelectedSavedCard] = useState<string>("new");
  const [saveUpiFlag, setSaveUpiFlag] = useState(false);
  const [saveCardFlag, setSaveCardFlag] = useState(false);

  const [upiInitialized, setUpiInitialized] = useState(false);
  const [cardInitialized, setCardInitialized] = useState(false);

  useEffect(() => {
    if (!upiInitialized && savedUpis.length > 0) {
      setSelectedSavedUpi(savedUpis[0]);
      setUpiInitialized(true);
    }
  }, [savedUpis, upiInitialized]);

  useEffect(() => {
    if (!cardInitialized && savedCards.length > 0) {
      const defaultCard = savedCards.find(c => c.isDefault) || savedCards[0];
      setSelectedSavedCard(defaultCard.id);
      setCardInitialized(true);
    }
  }, [savedCards, cardInitialized]);

  // ─── COUPON LOGIC (Local State matching Desktop) ───
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponError, setCouponError] = useState("");
  
  // Read saved coupon on mount
  React.useEffect(() => {
    const saved = localStorage.getItem("driphunter_applied_coupon");
    if (saved) {
      setAppliedCoupon(saved);
    }
  }, []);

  // Pre-fill from AddressContext if available
  useEffect(() => {
    const active = addresses.find(a => a.id === activeAddressId);
    if (active && !firstName) {
      // Very basic split for demo purposes if we only have 'name'
      const nameParts = active.name.split(" ");
      setFirstName(nameParts[0] || "");
      setLastName(nameParts.slice(1).join(" ") || "");
      setAddress(active.address || "");
      setCity(active.city || "");
      setZip(active.pincode || "");
      // Phone is usually not in Address context here, or we'd map it
    }
  }, [addresses, activeAddressId, firstName]);

  // If cart is empty, kick them out
  useEffect(() => {
    if (cart.length === 0) {
      router.replace("/mobile/cart");
    }
  }, [cart, router]);

  // ─── PRICING MATH (Matching Desktop Exactly) ───
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  
  const couponDiscount = useMemo(() => {
    if (!appliedCoupon) return 0;
    if (appliedCoupon === "DRIP10") return Math.round(subtotal * 0.10);
    if (appliedCoupon === "VIP15") return Math.round(subtotal * 0.15);
    return 0;
  }, [appliedCoupon, subtotal]);

  // Desktop checkout does not add the 500 flat fee MRP logic that Cart does,
  // it uses totalAmount = subtotal - discount directly in its price breakdown.
  // Wait, I will use exactly what desktop checkout/page.tsx has:
  const totalAmount = subtotal - couponDiscount + 10;

  // ─── VALIDATION & NAVIGATION ───
  const handleNextStep = () => {
    const errors: string[] = [];
    if (step === "address") {
      if (!email.includes("@")) errors.push("Valid Email required.");
      if (phone.length < 8) errors.push("Valid Phone required.");
      if (!firstName || !lastName) errors.push("First & Last Name required.");
      if (!address) errors.push("Street Address required.");
      if (!city || !state || !zip) errors.push("City, State & ZIP required.");
      
      if (errors.length === 0) setStep("delivery");
    } else if (step === "delivery") {
      setStep("payment");
    } else if (step === "payment") {
      if (paymentMethod === "card") {
        if (selectedSavedCard === "new") {
          if (!cardName) errors.push("Cardholder Name required.");
          if (cardNumber.replace(/\s/g, "").length < 16) errors.push("Valid 16-digit Card Number required.");
          if (!cardExpiry.includes("/")) errors.push("Valid Expiry (MM/YY) required.");
          if (cardCvv.length < 3) errors.push("Valid CVV required.");
        }
      } else if (paymentMethod === "upi") {
        if (selectedSavedUpi === "new") {
          if (!upiId.includes("@")) errors.push("Valid UPI ID required.");
        }
      }
      if (errors.length === 0) setStep("review");
    }
    
    setFormErrors(errors);
    if (errors.length > 0) {
      alert("Please fix the required details.");
      const mainElement = document.querySelector('main');
      if (mainElement) {
        mainElement.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  const handlePlaceOrder = () => {

    setIsProcessing(true);
    setPaymentError(null);

    const generatedId = "DH" + Math.floor(10000 + Math.random() * 90000);
    
    const orderPayload = {
      orderId: generatedId,
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      }),
      customerName: `${firstName} ${lastName}`.trim(),
      email: email,
      phone: phone,
      address: `${address} ${apartment}`.trim(),
      city: city,
      state: state,
      zip: zip,
      paymentMethod:
        paymentMethod === "card"
          ? selectedSavedCard === "new"
            ? `Credit/Debit Card (ending in ${cardNumber.slice(-4) || "4242"})`
            : `Credit/Debit Card (Saved Card)`
          : paymentMethod === "upi"
          ? selectedSavedUpi === "new"
            ? `UPI (${upiId || "user@upi"})`
            : `UPI (${selectedSavedUpi})`
          : "Cash on Delivery (COD)",
      shippingMethod: shippingMethod === "express" ? "Express Vault Tracked" : "Standard Delivery",
      subtotal: subtotal,
      discount: couponDiscount,
      total: totalAmount,
      estimatedDelivery: "3 to 4 Business Days",
      items: cart.map((item) => ({
        id: item.id,
        name: item.name,
        brand: item.brand,
        image: item.image,
        price: item.price,
        quantity: item.quantity,
        size: item.size || "Standard",
        color: item.color || "Default"
      }))
    };

    try {
      localStorage.setItem("drip_last_order", JSON.stringify(orderPayload));
      const existingStr = localStorage.getItem("drip_all_orders");
      const existingOrders = existingStr ? JSON.parse(existingStr) : [];
      existingOrders.unshift(orderPayload);
      localStorage.setItem("drip_all_orders", JSON.stringify(existingOrders));

      if (paymentMethod === "card" && selectedSavedCard === "new" && saveCardFlag) {
        const last4 = cardNumber.slice(-4) || "0000";
        const type = cardNumber.startsWith("4") ? "Visa" : "Mastercard";
        addCard({
          type,
          last4,
          expiry: cardExpiry,
          cardName,
          isDefault: savedCards.length === 0
        });
      }
      if (paymentMethod === "upi" && selectedSavedUpi === "new" && saveUpiFlag) {
        addUpi(upiId);
      }
    } catch (err) {
      console.error(err);
    }

    clearCart();
    router.push(`/mobile/order-success?orderId=${generatedId}`);
  };

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (code === "DRIP10" || code === "VIP15") {
      setAppliedCoupon(code);
      localStorage.setItem("driphunter_applied_coupon", code);
      setCouponError("");
    } else {
      setCouponError("Invalid Coupon.");
    }
  };

  // ─── RENDERERS ───
  const renderHeader = () => {
    const titleMap: Record<CheckoutStep, string> = {
      address: "Shipping Address",
      delivery: "Delivery Method",
      payment: "Payment Details",
      review: "Review Order"
    };

    const handleBack = () => {
      if (step === "address") router.back();
      else if (step === "delivery") setStep("address");
      else if (step === "payment") setStep("delivery");
      else if (step === "review") setStep("payment");
    };

    return (
      <div className="flex items-center h-14 px-4 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 sticky top-0 z-50">
        <button onClick={handleBack} className="p-2 -ml-2 text-zinc-900 dark:text-white">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <span className="flex-1 text-center font-playfair text-lg font-bold">
          {titleMap[step]}
        </span>
        <div className="w-9" /> {/* Spacer */}
      </div>
    );
  };

  const renderErrors = () => {
    if (formErrors.length === 0 && !paymentError) return null;
    return (
      <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 p-4 rounded-xl mb-6">
        <span className="text-xs font-bold text-red-800 dark:text-red-400 block mb-2">
          {paymentError ? "Payment Failed" : "Please fix these errors:"}
        </span>
        {paymentError ? (
          <p className="text-xs text-red-700 dark:text-red-300 mb-3">{paymentError}</p>
        ) : (
          <ul className="list-disc pl-4 space-y-1 text-xs text-red-700 dark:text-red-300">
            {formErrors.map((err, idx) => <li key={idx}>{err}</li>)}
          </ul>
        )}
        {paymentError && (
          <div className="flex gap-2">
            <button 
              onClick={() => { setPaymentError(null); handlePlaceOrder(); }}
              className="px-3 py-2 bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors active:scale-95"
            >
              Try Again
            </button>
            <button 
              onClick={() => { setPaymentError(null); setStep("payment"); }}
              className="px-3 py-2 border border-red-200 dark:border-red-900/50 text-red-800 dark:text-red-300 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors active:scale-95"
            >
              Change Payment Method
            </button>
          </div>
        )}
      </div>
    );
  };

  const renderAddressStep = () => (
    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="space-y-4 bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800">
        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-500 mb-2">Contact</h3>
        <input 
          type="email" placeholder="Email Address *" value={email} onChange={e => setEmail(e.target.value)}
          className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm focus:border-[#6F4E37] outline-none"
        />
        <input 
          type="tel" placeholder="Phone Number *" value={phone} onChange={e => setPhone(e.target.value)}
          className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm focus:border-[#6F4E37] outline-none"
        />
      </div>

      <div className="space-y-4 bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800">
        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-500 mb-2">Shipping Address</h3>
        <div className="grid grid-cols-2 gap-3">
          <input 
            type="text" placeholder="First Name *" value={firstName} onChange={e => setFirstName(e.target.value)}
            className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm focus:border-[#6F4E37] outline-none"
          />
          <input 
            type="text" placeholder="Last Name *" value={lastName} onChange={e => setLastName(e.target.value)}
            className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm focus:border-[#6F4E37] outline-none"
          />
        </div>
        <input 
          type="text" placeholder="Street Address *" value={address} onChange={e => setAddress(e.target.value)}
          className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm focus:border-[#6F4E37] outline-none"
        />
        <input 
          type="text" placeholder="Apartment / Suite (Optional)" value={apartment} onChange={e => setApartment(e.target.value)}
          className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm focus:border-[#6F4E37] outline-none"
        />
        <div className="grid grid-cols-2 gap-3">
          <input 
            type="text" placeholder="City *" value={city} onChange={e => setCity(e.target.value)}
            className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm focus:border-[#6F4E37] outline-none"
          />
          <input 
            type="text" placeholder="State *" value={state} onChange={e => setState(e.target.value)}
            className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm focus:border-[#6F4E37] outline-none"
          />
        </div>
        <input 
          type="text" placeholder="ZIP Code *" value={zip} onChange={e => setZip(e.target.value)}
          className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm focus:border-[#6F4E37] outline-none"
        />
      </div>
    </div>
  );

  const renderDeliveryStep = () => (
    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-2 overflow-hidden">
        
        <label className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-colors ${shippingMethod === "express" ? "bg-[#6F4E37]/5 border border-[#6F4E37]/30" : ""}`}>
          <input 
            type="radio" checked={shippingMethod === "express"} onChange={() => setShippingMethod("express")}
            className="w-5 h-5 text-[#6F4E37] focus:ring-[#6F4E37]"
          />
          <div className="flex-1">
            <span className="text-sm font-bold block text-zinc-900 dark:text-white">Express Air Delivery</span>
            <span className="text-xs text-zinc-500">1-2 Business Days</span>
          </div>
          <span className="text-xs font-bold text-emerald-600">FREE</span>
        </label>

        <div className="h-px bg-zinc-100 dark:bg-zinc-800 my-1 mx-4" />

        <label className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-colors ${shippingMethod === "standard" ? "bg-[#6F4E37]/5 border border-[#6F4E37]/30" : ""}`}>
          <input 
            type="radio" checked={shippingMethod === "standard"} onChange={() => setShippingMethod("standard")}
            className="w-5 h-5 text-[#6F4E37] focus:ring-[#6F4E37]"
          />
          <div className="flex-1">
            <span className="text-sm font-bold block text-zinc-900 dark:text-white">Standard Ground Shipping</span>
            <span className="text-xs text-zinc-500">3-5 Business Days</span>
          </div>
          <span className="text-xs font-bold text-emerald-600">FREE</span>
        </label>

      </div>
    </div>
  );

  const renderPaymentStep = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      
      {/* Tabs */}
      <div className="flex bg-zinc-100 dark:bg-zinc-900 rounded-xl p-1 border border-zinc-200 dark:border-zinc-800">
        {[
          { id: "card", label: "Card" },
          { id: "upi", label: "UPI" },
          { id: "cod", label: "COD" }
        ].map(m => (
          <button 
            key={m.id}
            onClick={() => setPaymentMethod(m.id as any)}
            className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors ${paymentMethod === m.id ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm" : "text-zinc-500"}`}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5">
        {paymentMethod === "card" && (
          <div className="space-y-4">
            {savedCards.length > 0 && (
              <div className="space-y-2 mb-4">
                {savedCards.map(c => (
                  <label key={c.id} className="flex items-center gap-3 p-3 border border-zinc-200 dark:border-zinc-800 rounded-xl cursor-pointer">
                    <input type="radio" checked={selectedSavedCard === c.id} onChange={() => setSelectedSavedCard(c.id)} className="w-4 h-4 text-[#6F4E37] focus:ring-[#6F4E37]" />
                    <span className="text-sm font-bold text-zinc-900 dark:text-white">{c.type} •••• {c.last4}</span>
                  </label>
                ))}
                <label className="flex items-center gap-3 p-3 border border-zinc-200 dark:border-zinc-800 rounded-xl cursor-pointer">
                  <input type="radio" checked={selectedSavedCard === "new"} onChange={() => setSelectedSavedCard("new")} className="w-4 h-4 text-[#6F4E37] focus:ring-[#6F4E37]" />
                  <span className="text-sm font-bold text-zinc-900 dark:text-white">Use another card</span>
                </label>
              </div>
            )}
            
            {selectedSavedCard === "new" && (
              <div className="space-y-4">
                <input 
                  type="text" placeholder="Cardholder Name *" value={cardName} onChange={e => setCardName(e.target.value)}
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm focus:border-[#6F4E37] outline-none"
                />
                <input 
                  type="text" placeholder="Card Number *" value={cardNumber} onChange={e => setCardNumber(e.target.value)}
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm focus:border-[#6F4E37] outline-none"
                />
                <div className="grid grid-cols-2 gap-3">
                  <input 
                    type="text" placeholder="MM/YY *" value={cardExpiry} onChange={e => setCardExpiry(e.target.value)}
                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm focus:border-[#6F4E37] outline-none"
                  />
                  <input 
                    type="password" placeholder="CVV *" value={cardCvv} onChange={e => setCardCvv(e.target.value)} maxLength={4}
                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm focus:border-[#6F4E37] outline-none"
                  />
                </div>
                <label className="flex items-center gap-2 mt-2 cursor-pointer">
                  <input type="checkbox" checked={saveCardFlag} onChange={e => setSaveCardFlag(e.target.checked)} className="rounded text-[#6F4E37] focus:ring-[#6F4E37]" />
                  <span className="text-xs text-zinc-600 dark:text-zinc-400">Save this card for faster checkout</span>
                </label>
              </div>
            )}
          </div>
        )}

        {paymentMethod === "upi" && (
          <div className="space-y-2">
            {savedUpis.length > 0 && (
              <div className="space-y-2 mb-4">
                {savedUpis.map(u => (
                  <label key={u} className="flex items-center gap-3 p-3 border border-zinc-200 dark:border-zinc-800 rounded-xl cursor-pointer">
                    <input type="radio" checked={selectedSavedUpi === u} onChange={() => setSelectedSavedUpi(u)} className="w-4 h-4 text-[#6F4E37] focus:ring-[#6F4E37]" />
                    <span className="text-sm font-bold text-zinc-900 dark:text-white">{u}</span>
                  </label>
                ))}
                <label className="flex items-center gap-3 p-3 border border-zinc-200 dark:border-zinc-800 rounded-xl cursor-pointer">
                  <input type="radio" checked={selectedSavedUpi === "new"} onChange={() => setSelectedSavedUpi("new")} className="w-4 h-4 text-[#6F4E37] focus:ring-[#6F4E37]" />
                  <span className="text-sm font-bold text-zinc-900 dark:text-white">Use another UPI ID</span>
                </label>
              </div>
            )}

            {selectedSavedUpi === "new" && (
              <>
                <input 
                  type="text" placeholder="UPI ID (username@upi) *" value={upiId} onChange={e => setUpiId(e.target.value)}
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm focus:border-[#6F4E37] outline-none"
                />
                <p className="text-xs text-zinc-500">A payment request will be sent to your UPI app.</p>
                <label className="flex items-center gap-2 mt-2 cursor-pointer">
                  <input type="checkbox" checked={saveUpiFlag} onChange={e => setSaveUpiFlag(e.target.checked)} className="rounded text-[#6F4E37] focus:ring-[#6F4E37]" />
                  <span className="text-xs text-zinc-600 dark:text-zinc-400">Save this UPI for faster checkout</span>
                </label>
              </>
            )}
          </div>
        )}

        {paymentMethod === "cod" && (
          <p className="text-sm text-zinc-600 dark:text-zinc-400 text-center py-4">
            Pay with cash or UPI on delivery.
          </p>
        )}
      </div>

    </div>
  );

  const renderReviewStep = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      
      {/* Items Summary */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5">
        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-500 mb-4 border-b border-zinc-100 dark:border-zinc-800 pb-2">Order Items</h3>
        <div className="space-y-4">
          {cart.map(item => (
            <div key={`${item.id}-${item.size}-${item.color}`} className="flex gap-4">
              <div className="w-16 h-20 bg-zinc-100 dark:bg-zinc-800 rounded-lg overflow-hidden shrink-0 border border-zinc-200 dark:border-zinc-700 relative">
                <Image src={item.image} alt={item.name} fill className="object-cover" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-zinc-900 dark:text-white line-clamp-2">{item.name}</p>
                <p className="text-[10px] text-zinc-500 mt-1">Size: {item.size} | Qty: {item.quantity}</p>
                <p className="text-xs font-bold mt-1">₹{(item.price * item.quantity).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Shipping & Payment Recap */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5 space-y-4">
        <div>
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-500 mb-1">Shipping To</h3>
          <p className="text-sm text-zinc-900 dark:text-white font-medium">{firstName} {lastName}</p>
          <p className="text-xs text-zinc-600 dark:text-zinc-400">{address}, {city}, {state} {zip}</p>
        </div>
        <div>
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-500 mb-1">Method</h3>
          <p className="text-xs text-zinc-600 dark:text-zinc-400">
            {shippingMethod === "express" ? "Express Air Delivery" : "Standard Ground Shipping"} 
            <span className="mx-2">•</span> 
            {paymentMethod.toUpperCase()}
          </p>
        </div>
      </div>

      {/* Coupon (Mirrored from Desktop) */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5">
        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-500 mb-3">Apply Coupon</h3>
        {appliedCoupon ? (
          <div className="flex justify-between items-center bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 rounded-xl p-3">
            <span className="text-xs font-bold text-emerald-800 dark:text-emerald-400">{appliedCoupon} Applied</span>
            <button onClick={() => {
              setAppliedCoupon(null);
              localStorage.removeItem("driphunter_applied_coupon");
            }} className="text-xs font-bold text-emerald-700">Remove</button>
          </div>
        ) : (
          <form onSubmit={handleApplyCoupon} className="flex gap-2">
            <input 
              type="text" value={couponCode} onChange={e => setCouponCode(e.target.value)} placeholder="DRIP10"
              className="flex-1 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-2.5 text-xs outline-none uppercase"
            />
            <button type="submit" className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-4 rounded-xl text-xs font-bold">Apply</button>
          </form>
        )}
        {couponError && <p className="text-[10px] text-red-500 mt-2">{couponError}</p>}
      </div>

      {/* Price Summary */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5 space-y-3">
        <div className="flex justify-between text-sm text-zinc-600 dark:text-zinc-400">
          <span>Subtotal</span>
          <span>₹{subtotal.toLocaleString()}</span>
        </div>
        {couponDiscount > 0 && (
          <div className="flex justify-between text-sm text-emerald-600 font-bold">
            <span>Discount</span>
            <span>-₹{couponDiscount.toLocaleString()}</span>
          </div>
        )}
        <div className="flex justify-between text-sm text-zinc-600 dark:text-zinc-400">
          <span>Delivery</span>
          <span className="text-emerald-600">FREE</span>
        </div>
        <div className="border-t border-zinc-100 dark:border-zinc-800 pt-3 flex justify-between font-bold text-base">
          <span>Total</span>
          <span>₹{totalAmount.toLocaleString()}</span>
        </div>
      </div>

    </div>
  );

  return (
    <AppPageLayout hasBottomNav={false}>
      {renderHeader()}
      
      <div className="flex-1 p-4 pb-32 bg-zinc-50 dark:bg-zinc-950 overflow-x-hidden">
        {renderErrors()}
        
        {step === "address" && renderAddressStep()}
        {step === "delivery" && renderDeliveryStep()}
        {step === "payment" && renderPaymentStep()}
        {step === "review" && renderReviewStep()}
      </div>

      {/* ─── STICKY CTA ─── */}
      <div 
        className="fixed left-0 right-0 z-40 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md border-t border-zinc-200 dark:border-zinc-800 shadow-[0_-10px_20px_rgba(0,0,0,0.05)] px-4 py-3"
        style={{ bottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="max-w-md mx-auto">
          {step === "review" ? (
            <button
              onClick={handlePlaceOrder}
              disabled={isProcessing}
              className={`w-full py-3.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider shadow-lg transition-all flex items-center justify-center gap-2 ${
                isProcessing 
                  ? "bg-zinc-400 dark:bg-zinc-600 text-white cursor-not-allowed" 
                  : "bg-[#6F4E37] text-white shadow-[#6F4E37]/20 active:scale-95"
              }`}
            >
              {isProcessing ? (
                <>Processing Payment...</>
              ) : (
                <><ShieldCheck className="w-4 h-4" /> Place Order (₹{totalAmount.toLocaleString()})</>
              )}
            </button>
          ) : (
            <button
              onClick={handleNextStep}
              className="w-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 py-3.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider shadow-lg active:scale-95 transition-transform flex items-center justify-center gap-2"
            >
              Continue <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </AppPageLayout>
  );
}
