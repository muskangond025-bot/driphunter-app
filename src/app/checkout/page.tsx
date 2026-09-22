"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PageContainer from "@/components/layout/PageContainer";
import { CheckCircle, ArrowRight, ShieldCheck, Tag, ArrowLeft, Search, ShoppingBag } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SearchOverlay from "@/components/layout/SearchOverlay";
import { useCart } from "@/context/CartContext";
import { Surface } from "@/components/ui/Surface";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function CheckoutPage() {
  const router = useRouter();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { cart, clearCart, isLoaded } = useCart();
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Form fields
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
  
  // Card details
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  // UPI VPA
  const [upiId, setUpiId] = useState("");

  // Coupon promo code
  const [couponCode, setCouponCode] = useState("");
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState("");

  // Placed Order states
  const [isOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [formErrors, setFormErrors] = useState<string[]>([]);

  // Calculations
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const couponDiscount = isCouponApplied ? Math.round(subtotal * 0.1) : 0;
  const totalAmount = subtotal - couponDiscount;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.toUpperCase() === "DRIP10") {
      setIsCouponApplied(true);
      setCouponError("");
    } else {
      setCouponError("Invalid coupon code. Use DRIP10 for 10% off.");
      setIsCouponApplied(false);
    }
  };

  const handleRemoveCoupon = () => {
    setIsCouponApplied(false);
    setCouponCode("");
  };

  const validateForm = () => {
    const errors: string[] = [];
    if (!email.includes("@")) errors.push("Please enter a valid email address.");
    if (phone.length < 8) errors.push("Please enter a valid contact number.");
    if (!firstName || !lastName) errors.push("First and Last name are required.");
    if (!address) errors.push("Shipping street address is required.");
    if (!city || !state || !zip) errors.push("City, State, and ZIP code are required.");

    if (paymentMethod === "card") {
      if (!cardName) errors.push("Cardholder Name is required.");
      if (cardNumber.replace(/\s/g, "").length < 16) errors.push("Enter a valid 16-digit Card Number.");
      if (!cardExpiry.includes("/")) errors.push("Enter a valid expiration date (MM/YY).");
      if (cardCvv.length < 3) errors.push("Enter a valid 3-digit security CVV.");
    } else if (paymentMethod === "upi") {
      if (!upiId.includes("@")) errors.push("Please enter a valid UPI VPA ID (e.g., alex@okaxis).");
    }

    setFormErrors(errors);
    return errors.length === 0;
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const generatedId = "DH" + Math.floor(10000 + Math.random() * 90000);
      setOrderId(generatedId);

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
            ? `Credit/Debit Card (ending in ${cardNumber.slice(-4) || "4242"})`
            : paymentMethod === "upi"
            ? `UPI (${upiId || "user@upi"})`
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
      } catch (err) {
        console.error(err);
      }

      clearCart();
      router.push(`/order-success?orderId=${generatedId}`);
    }
  };

  if (!mounted || !isLoaded) return null;

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 dark:bg-zinc-950 text-foreground">
      {/* Minimal Checkout Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-4 sm:px-6 py-4 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
        <button onClick={() => router.back()} className="p-2 -ml-2 text-zinc-900 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-full transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        
        <Link href="/" className="font-serif italic font-black text-xl tracking-tighter text-zinc-900 dark:text-white absolute left-1/2 -translate-x-1/2">
          DripHunter
        </Link>
        
        <div className="flex gap-2 items-center">
          <button onClick={() => setIsSearchOpen(true)} className="p-2 text-zinc-900 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-full transition-colors">
            <Search className="w-5 h-5" />
          </button>
          <Link href="/mobile/cart" className="p-2 text-zinc-900 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-full transition-colors relative">
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white dark:border-zinc-950"></span>
            )}
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow bg-zinc-50 dark:bg-zinc-950 py-12 sm:py-16 select-none">
        <PageContainer as="div">
          
          {isOrderPlaced ? (
            /* ─── PREMIUM SUCCESS TICKET SCREEN ─── */
            <Surface variant="subtle" className="max-w-2xl mx-auto py-12 px-6 sm:px-8 dark:bg-zinc-950 dark:border-zinc-800 rounded-3xl text-center space-y-8 animate-fade-in shadow-[0_15px_45px_rgba(111,78,55,0.03)]">
              <div className="w-16 h-16 rounded-full bg-green-50 border border-green-150 text-green-600 flex items-center justify-center mx-auto shadow-inner animate-bounce">
                <CheckCircle className="w-8 h-8 animate-pulse" />
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-bold tracking-[0.25em] text-[#6F4E37] uppercase font-mono">COP SUCCESSFUL</span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-zinc-950 dark:text-zinc-50 dark:text-zinc-50 font-playfair leading-[1.05] uppercase">
                  Order Placed <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280]">Successfully!</span>
                </h1>
                <p className="text-sm text-zinc-450 font-sans max-w-sm mx-auto leading-relaxed">
                  Thank you for copping the heat from Drip Hunter. Your transaction was processed successfully.
                </p>
              </div>

              {/* Serrated Physical Invoice lookbook */}
              <div className="relative bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 text-sm font-mono text-zinc-650 text-left shadow-sm max-w-md mx-auto overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-1 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-200 to-transparent bg-[length:12px_4px] bg-repeat-x" />
                <h4 className="text-[10px] font-extrabold uppercase tracking-wider text-zinc-800 dark:text-zinc-200 border-b border-zinc-100 pb-3 mb-3">Invoice Details</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">ORDER NUMBER:</span>
                    <strong className="text-[#6F4E37] font-black">{orderId}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">RECIPIENT:</span>
                    <strong className="text-zinc-800 dark:text-zinc-200 uppercase">{firstName} {lastName}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">SHIP TO:</span>
                    <strong className="text-zinc-800 dark:text-zinc-200 line-clamp-1">{address}, {city}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">BILLING VALUE:</span>
                    <strong className="text-zinc-800 dark:text-zinc-200">₹{totalAmount.toLocaleString()}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">SHIPPING ESTIMATE:</span>
                    <strong className="text-green-600 font-bold uppercase">2-3 Business Days</strong>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/"
                  onClick={() => clearCart()}
                  className="inline-flex items-center gap-1.5 bg-zinc-950 hover:bg-black text-white text-sm font-bold uppercase tracking-widest px-8 py-4 rounded-xl transition-all shadow-md active:scale-95 font-sans"
                >
                  Return to Dashboard
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </Surface>
          ) : cart.length === 0 ? (
            /* ─── EMPTY STATE redirect ─── */
            <div className="flex flex-col items-center justify-center text-center py-20 px-4 max-w-md mx-auto animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 flex items-center justify-center mb-6 shadow-sm">
                <CheckCircle className="w-6 h-6 text-zinc-300" />
              </div>
              <h3 className="text-xl font-light text-zinc-900 dark:text-zinc-100 font-playfair uppercase tracking-wide">
                No items to checkout
              </h3>
              <p className="text-sm text-zinc-400 font-sans font-light mt-3 leading-relaxed">
                Your shopping bag is empty. Please add items to your cart before proceeding to checkout.
              </p>
              <Link
                href="/shop"
                className="mt-8 bg-zinc-950 hover:bg-black text-white text-sm font-bold uppercase tracking-widest px-8 py-4 rounded-xl transition-all duration-300 shadow-md inline-flex items-center gap-1.5 font-sans"
              >
                Go to Shop
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ) : (
            /* ─── ACTIVE CHECKOUT FLOW ─── */
            <div className="space-y-10 animate-fade-in">
              
              {/* Header */}
              <div className="border-b border-zinc-200 dark:border-zinc-800 dark:border-zinc-800 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <span className="text-[10px] md:text-sm font-semibold tracking-[0.3em] text-[#6F4E37] uppercase block mb-3 font-mono">
                    Secure Checkout
                  </span>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-zinc-950 dark:text-zinc-50 dark:text-zinc-50 font-playfair leading-[1.05]">
                    Billing & <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280]">Shipping</span>
                  </h1>
                </div>
                <div className="text-left sm:text-right">
                  <span className="text-sm font-mono font-bold tracking-wider text-zinc-500 uppercase">
                    Checkout ({cartCount} {cartCount === 1 ? "Item" : "Items"})
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                
                {/* Left Column: Checkout Inputs */}
                <div className="lg:col-span-7 space-y-6 text-left w-full overflow-x-auto">
                  
                  {/* Display validation issues */}
                  {formErrors.length > 0 && (
                    <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-5 rounded-2xl space-y-1.5">
                      <strong className="block font-bold">Please correct the following fields:</strong>
                      <ul className="list-disc pl-4 space-y-1">
                        {formErrors.map((err, idx) => (
                          <li key={idx}>{err}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <form onSubmit={handlePlaceOrder} className="space-y-6">
                    {/* Contact information card */}
                    <Surface className="dark:border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-5">
                      <h3 className="text-sm sm:text-sm font-bold uppercase tracking-wider text-zinc-950 dark:text-zinc-50 border-b border-zinc-100 pb-3.5 flex items-center gap-2 font-sans">
                        <span className="w-1.5 h-3 bg-[#6F4E37] rounded-full" />
                        Contact details
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs md:text-sm font-black font-sans text-zinc-800 dark:text-zinc-200 uppercase">Email Address</label>
                          <Input variant="drip"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="e.g. self@domain.com"
                            className="w-full focus:bg-white text-zinc-800 dark:text-zinc-200 placeholder-zinc-400 transition-all duration-300 focus:ring-1 focus:ring-[#6F4E37]"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs md:text-sm font-black font-sans text-zinc-800 dark:text-zinc-200 uppercase">Phone Number</label>
                          <Input variant="drip"
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="e.g. +91 98765 43210"
                            className="w-full focus:bg-white text-zinc-800 dark:text-zinc-200 placeholder-zinc-400 transition-all duration-300 focus:ring-1 focus:ring-[#6F4E37]"
                          />
                        </div>
                      </div>
                    </Surface>

                    {/* Shipping Address card */}
                    <Surface className="dark:border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-5">
                      <h3 className="text-sm sm:text-sm font-bold uppercase tracking-wider text-zinc-950 dark:text-zinc-50 border-b border-zinc-100 pb-3.5 flex items-center gap-2 font-sans">
                        <span className="w-1.5 h-3 bg-[#6F4E37] rounded-full" />
                        Delivery Destination
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs md:text-sm font-black font-sans text-zinc-800 dark:text-zinc-200 uppercase">First Name</label>
                          <Input variant="drip"
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="First Name"
                            className="w-full focus:bg-white text-zinc-800 dark:text-zinc-200 placeholder-zinc-400 transition-all duration-300 focus:ring-1 focus:ring-[#6F4E37]"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs md:text-sm font-black font-sans text-zinc-800 dark:text-zinc-200 uppercase">Last Name</label>
                          <Input variant="drip"
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Last Name"
                            className="w-full focus:bg-white text-zinc-800 dark:text-zinc-200 placeholder-zinc-400 transition-all duration-300 focus:ring-1 focus:ring-[#6F4E37]"
                          />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs md:text-sm font-black font-sans text-zinc-800 dark:text-zinc-200 uppercase">Street Address</label>
                        <Input variant="drip"
                          type="text"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="House / Flat Number, Street, Locality Address details"
                          className="w-full focus:bg-white text-zinc-800 dark:text-zinc-200 placeholder-zinc-400 transition-all duration-300 focus:ring-1 focus:ring-[#6F4E37]"
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                        <div className="sm:col-span-2 space-y-1.5">
                          <label className="text-xs md:text-sm font-black font-sans text-zinc-800 dark:text-zinc-200 uppercase">Apartment / Suite</label>
                          <Input variant="drip"
                            type="text"
                            value={apartment}
                            onChange={(e) => setApartment(e.target.value)}
                            placeholder="Apt, Suite, Floor (optional)"
                            className="w-full focus:bg-white text-zinc-800 dark:text-zinc-200 placeholder-zinc-400 transition-all duration-300 focus:ring-1 focus:ring-[#6F4E37]"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs md:text-sm font-black font-sans text-zinc-800 dark:text-zinc-200 uppercase">City</label>
                          <Input variant="drip"
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="City"
                            className="w-full focus:bg-white text-zinc-800 dark:text-zinc-200 placeholder-zinc-400 transition-all duration-300 focus:ring-1 focus:ring-[#6F4E37]"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs md:text-sm font-black font-sans text-zinc-800 dark:text-zinc-200 uppercase">State</label>
                          <Input variant="drip"
                            type="text"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            placeholder="State"
                            className="w-full focus:bg-white text-zinc-800 dark:text-zinc-200 placeholder-zinc-400 transition-all duration-300 focus:ring-1 focus:ring-[#6F4E37]"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs md:text-sm font-black font-sans text-zinc-800 dark:text-zinc-200 uppercase">ZIP / Postal Code</label>
                          <Input variant="drip"
                            type="text"
                            value={zip}
                            onChange={(e) => setZip(e.target.value)}
                            placeholder="ZIP Code"
                            className="w-full focus:bg-white text-zinc-800 dark:text-zinc-200 placeholder-zinc-400 transition-all duration-300 focus:ring-1 focus:ring-[#6F4E37]"
                          />
                        </div>
                      </div>
                    </Surface>

                    {/* Shipping Speed card */}
                    <Surface className="dark:border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-5">
                      <h3 className="text-sm sm:text-sm font-bold uppercase tracking-wider text-zinc-950 dark:text-zinc-50 border-b border-zinc-100 pb-3.5 flex items-center gap-2 font-sans">
                        <span className="w-1.5 h-3 bg-[#6F4E37] rounded-full" />
                        Shipping speed
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <label
                          className={`border rounded-2xl p-4 flex items-center justify-between cursor-pointer transition-all ${
                            shippingMethod === "express"
                              ? "border-[#6F4E37] bg-[#6F4E37]/5"
                              : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:bg-zinc-950"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="radio"
                              name="shipping"
                              checked={shippingMethod === "express"}
                              onChange={() => setShippingMethod("express")}
                              className="text-[#6F4E37] focus:ring-[#6F4E37]"
                            />
                            <div className="text-left">
                              <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100 block">Express Air Delivery</span>
                              <span className="text-[10px] text-zinc-400 font-mono">1-2 Business Days</span>
                            </div>
                          </div>
                          <span className="text-sm font-black text-green-600 font-mono">FREE</span>
                        </label>

                        <label
                          className={`border rounded-2xl p-4 flex items-center justify-between cursor-pointer transition-all ${
                            shippingMethod === "standard"
                              ? "border-[#6F4E37] bg-[#6F4E37]/5"
                              : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:bg-zinc-950"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="radio"
                              name="shipping"
                              checked={shippingMethod === "standard"}
                              onChange={() => setShippingMethod("standard")}
                              className="text-[#6F4E37] focus:ring-[#6F4E37]"
                            />
                            <div className="text-left">
                              <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100 block">Standard Ground Shipping</span>
                              <span className="text-[10px] text-zinc-400 font-mono">3-5 Business Days</span>
                            </div>
                          </div>
                          <span className="text-sm font-black text-green-600 font-mono">FREE</span>
                        </label>
                      </div>
                    </Surface>

                    {/* Payment details card */}
                    <Surface className="dark:border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-5">
                      <h3 className="text-sm sm:text-sm font-bold uppercase tracking-wider text-zinc-950 dark:text-zinc-50 border-b border-zinc-100 pb-3.5 flex items-center gap-2 font-sans">
                        <span className="w-1.5 h-3 bg-[#6F4E37] rounded-full" />
                        Payment details
                      </h3>
                      
                      {/* Tabs */}
                      <div className="flex border-b border-zinc-200 dark:border-zinc-800 dark:border-zinc-800 pb-3 gap-6">
                        <button
                          type="button"
                          onClick={() => setPaymentMethod("card")}
                          className={`pb-1 text-sm font-bold uppercase tracking-wider transition-colors border-none bg-transparent cursor-pointer ${
                            paymentMethod === "card"
                              ? "text-[#6F4E37] border-b-2 border-[#6F4E37] font-black"
                              : "text-zinc-450 hover:text-zinc-800 dark:text-zinc-200"
                          }`}
                        >
                          Credit/Debit Card
                        </button>
                        <button
                          type="button"
                          onClick={() => setPaymentMethod("upi")}
                          className={`pb-1 text-sm font-bold uppercase tracking-wider transition-colors border-none bg-transparent cursor-pointer ${
                            paymentMethod === "upi"
                              ? "text-[#6F4E37] border-b-2 border-[#6F4E37] font-black"
                              : "text-zinc-450 hover:text-zinc-800 dark:text-zinc-200"
                          }`}
                        >
                          UPI Wallet
                        </button>
                        <button
                          type="button"
                          onClick={() => setPaymentMethod("cod")}
                          className={`pb-1 text-sm font-bold uppercase tracking-wider transition-colors border-none bg-transparent cursor-pointer ${
                            paymentMethod === "cod"
                              ? "text-[#6F4E37] border-b-2 border-[#6F4E37] font-black"
                              : "text-zinc-450 hover:text-zinc-800 dark:text-zinc-200"
                          }`}
                        >
                          Cash on Delivery
                        </button>
                      </div>

                      {/* Fields */}
                      {paymentMethod === "card" && (
                        <div className="space-y-4 pt-2">
                          <div className="space-y-1.5">
                            <label className="text-xs md:text-sm font-black font-sans text-zinc-800 dark:text-zinc-200 uppercase">Cardholder Name</label>
                            <Input variant="drip"
                              type="text"
                              value={cardName}
                              onChange={(e) => setCardName(e.target.value)}
                              placeholder="e.g. ALEXANDER MCQUEEN"
                              className="w-full focus:bg-white text-zinc-800 dark:text-zinc-200 placeholder-zinc-400 transition-all duration-300 focus:ring-1 focus:ring-[#6F4E37]"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs md:text-sm font-black font-sans text-zinc-800 dark:text-zinc-200 uppercase">Card Number</label>
                            <Input variant="drip"
                              type="text"
                              value={cardNumber}
                              onChange={(e) => setCardNumber(e.target.value)}
                              placeholder="4000 1234 5678 9010"
                              className="w-full focus:bg-white text-zinc-800 dark:text-zinc-200 placeholder-zinc-400 transition-all duration-300 focus:ring-1 focus:ring-[#6F4E37]"
                            />
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                              <label className="text-xs md:text-sm font-black font-sans text-zinc-800 dark:text-zinc-200 uppercase">Expiry Date (MM/YY)</label>
                              <Input variant="drip"
                                type="text"
                                value={cardExpiry}
                                onChange={(e) => setCardExpiry(e.target.value)}
                                placeholder="12/28"
                                className="w-full focus:bg-white text-zinc-800 dark:text-zinc-200 placeholder-zinc-400 transition-all duration-300 focus:ring-1 focus:ring-[#6F4E37]"
                              />
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-xs md:text-sm font-black font-sans text-zinc-800 dark:text-zinc-200 uppercase">CVV Security Code</label>
                              <Input variant="drip"
                                type="password"
                                value={cardCvv}
                                onChange={(e) => setCardCvv(e.target.value)}
                                placeholder="***"
                                maxLength={4}
                                className="w-full focus:bg-white text-zinc-800 dark:text-zinc-200 placeholder-zinc-400 transition-all duration-300 focus:ring-1 focus:ring-[#6F4E37]"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {paymentMethod === "upi" && (
                        <div className="space-y-1.5 pt-2">
                          <label className="text-xs md:text-sm font-black font-sans text-zinc-800 dark:text-zinc-200 uppercase">UPI Address (VPA)</label>
                          <Input variant="drip"
                            type="text"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            placeholder="username@upi"
                            className="w-full focus:bg-white text-zinc-800 dark:text-zinc-200 placeholder-zinc-400 transition-all duration-300 focus:ring-1 focus:ring-[#6F4E37]"
                          />
                          <span className="text-[11px] text-zinc-400 font-mono block pt-1">
                            A collection request will be dispatched to your selected UPI app.
                          </span>
                        </div>
                      )}

                      {paymentMethod === "cod" && (
                        <div className="bg-zinc-50 dark:bg-zinc-950 rounded-2xl p-4 border border-zinc-200 dark:border-zinc-800 dark:border-zinc-800 text-sm font-mono text-zinc-450 leading-relaxed pt-2">
                          Please settle the order total using cash or digital UPI scanners upon arrival of your package. A processing fee may apply.
                        </div>
                      )}
                    </Surface>

                    {/* Sync Billing Checkbox */}
                    <div className="flex items-center gap-2.5 px-2">
                      <input
                        type="checkbox"
                        id="billing-same"
                        defaultChecked
                        className="rounded text-[#6F4E37] focus:ring-[#6F4E37]"
                      />
                      <label htmlFor="billing-same" className="text-sm text-zinc-450 font-sans cursor-pointer">
                        Billing destination is identical to shipping destination
                      </label>
                    </div>
                  </form>
                </div>

                {/* Right Column: Order summary sidebar */}
                <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24 text-left">
                  
                  {/* Coupon section */}
                  <Surface variant="subtle" className="dark:bg-zinc-950 dark:border-zinc-800 rounded-3xl p-6 space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-950 dark:text-zinc-50 flex items-center gap-2">
                      <Tag className="w-4 h-4 text-[#6F4E37]" />
                      Promotional Coupon
                    </h3>
                    
                    {isCouponApplied ? (
                      <div className="flex items-center justify-between bg-green-50 border border-green-200 text-green-800 rounded-2xl p-3.5 text-sm font-mono">
                        <div className="flex items-center gap-2">
                          <span className="bg-green-600 text-white text-[8px] font-black tracking-widest px-2 py-0.5 rounded">DRIP10</span>
                          <span>10% Discount Applied</span>
                        </div>
                        <button
                          onClick={handleRemoveCoupon}
                          className="text-green-800 hover:text-red-500 transition-colors border-none bg-transparent cursor-pointer font-bold text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleApplyCoupon} className="flex gap-2">
                        <Input variant="drip"
                          type="text"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          placeholder="Coupon Code (e.g. DRIP10)"
                          className="flex-grow bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-800 dark:text-zinc-200 focus:outline-none focus:border-[#6F4E37] transition-colors uppercase"
                        />
                        <Button variant="drip"
                          type="submit"
                          className="text-[10px] py-3 px-5 rounded-xl cursor-pointer"
                        >
                          Apply
                        </Button>
                      </form>
                    )}
                    {couponError && (
                      <span className="text-[10px] font-mono text-red-600 block">
                        {couponError}
                      </span>
                    )}
                  </Surface>

                  {/* Summary Sidebar details */}
                  <Surface variant="subtle" className="bg-zinc-50/70 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-955 text-zinc-905 text-zinc-950 dark:text-zinc-50 border-b border-zinc-200 dark:border-zinc-800 dark:border-zinc-800 pb-3">
                      Order Summary
                    </h3>

                    {/* Mini item details */}
                    <div className="max-h-[220px] overflow-y-auto divide-y divide-zinc-150 pr-2 scrollbar-none">
                      {cart.map((item) => (
                        <div key={`${item.id}-${item.size}-${item.color}`} className="py-4 flex gap-4 first:pt-0 last:pb-0">
                          <div className="relative w-12 h-16 bg-zinc-50 dark:bg-zinc-950 border rounded-xl overflow-hidden shrink-0">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-grow text-left space-y-0.5">
                            <span className="text-[8px] text-[#6F4E37] font-mono block uppercase font-bold tracking-wider">{item.brand}</span>
                            <h4 className="text-sm font-light text-zinc-900 dark:text-zinc-100 leading-tight uppercase line-clamp-1 font-playfair">
                              {item.name}
                            </h4>
                            <div className="flex gap-2 text-[8px] font-mono text-zinc-400 mt-1 font-bold">
                              <span>SZ: {item.size}</span>
                              <span>QTY: {item.quantity}</span>
                            </div>
                            <strong className="text-sm font-bold text-zinc-950 dark:text-zinc-50 font-mono mt-1 block">
                              ₹{(item.price * item.quantity).toLocaleString()}
                            </strong>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Breakdown prices */}
                    <div className="space-y-3.5 pt-4 border-t border-zinc-200 dark:border-zinc-800 text-sm font-mono text-zinc-500">
                      <div className="flex justify-between">
                        <span>Items Subtotal</span>
                        <span className="text-zinc-950 dark:text-zinc-50 font-bold">₹{subtotal.toLocaleString()}</span>
                      </div>
                      {isCouponApplied && (
                        <div className="flex justify-between text-green-600 font-bold">
                          <span>Discount (10% OFF)</span>
                          <span>-₹{couponDiscount.toLocaleString()}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span>Shipping Cost</span>
                        <span className="text-green-600 font-bold">FREE</span>
                      </div>

                      <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-sm">
                        <strong className="text-sm font-black uppercase text-zinc-950 dark:text-zinc-50">Total Amount</strong>
                        <strong className="text-lg font-black text-zinc-950 dark:text-zinc-50 font-mono">₹{totalAmount.toLocaleString()}</strong>
                      </div>
                    </div>

                    {/* Submit checkout triggers */}
                    <Button variant="drip"
                      onClick={handlePlaceOrder}
                      className="w-full bg-[#6F4E37] hover:bg-[#5C3D2E] text-sm py-4.5 rounded-xl shadow-lg shadow-[#6F4E37]/15 cursor-pointer flex gap-2 mt-2 font-sans"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      Place Order
                    </Button>
                  </Surface>

                </div>

              </div>
            </div>
          )}

        </PageContainer>
      </main>

      {/* Global Search Overlay */}
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
}
