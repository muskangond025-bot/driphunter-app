"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SearchOverlay from "@/components/layout/SearchOverlay";
import { Package, CheckCircle2, ArrowRight, Truck, ShieldCheck, MapPin, ArrowLeft, Share2, Star, Check } from "lucide-react";

export default function PhysicalGiftCardPage() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showAllDetails, setShowAllDetails] = useState(false);
  const [showAllQuestions, setShowAllQuestions] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  
  // Physical Builder States
  const [amount, setAmount] = useState<number>(5000);
  const [packaging, setPackaging] = useState<"Standard" | "Premium">("Premium");
  const [recipientName, setRecipientName] = useState("");
  const [senderName, setSenderName] = useState("");
  const [message, setMessage] = useState("");
  
  // Shipping States
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [phone, setPhone] = useState("");

  const [isPurchasing, setIsPurchasing] = useState(false);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);

  const predefinedAmounts = [500, 1000, 2000, 3000, 5000, 10000];
  
  const packagingFee = packaging === "Premium" ? 250 : 0;
  const totalAmount = amount + packagingFee;

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'DripHunter Physical Gift Card',
          text: 'Check out this physical gift card from DripHunter!',
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      }
    } catch (err) {
      console.log('Error sharing:', err);
    }
  };

  const handlePurchase = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPurchasing(true);
    setTimeout(() => {
      setIsPurchasing(false);
      setPurchaseSuccess(true);
    }, 2000);
  };

  if (purchaseSuccess) {
    return (
      <div className="min-h-screen bg-[#faf9f8] text-zinc-950 flex flex-col font-sans">
        <Navbar onSearchClick={() => setIsSearchOpen(true)} />
        <main className="flex-grow flex items-center justify-center p-6 mt-20">
          <div className="bg-white p-10 rounded-[2rem] shadow-2xl border border-zinc-200 text-center max-w-lg w-full animate-fade-in">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-3xl font-chaney-title uppercase tracking-wider text-zinc-950 mb-3">
              Order Confirmed
            </h2>
            <p className="text-zinc-500 font-sans leading-relaxed mb-6">
              Your physical ₹{amount.toLocaleString("en-IN")} gift card has been scheduled for dispatch. 
              Tracking details will be sent via SMS to {phone}.
            </p>
            <Link
              href="/gift-cards"
              className="inline-block bg-[#6F4E37] text-white px-8 py-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all hover:bg-[#5C3D2E] shadow-lg cursor-pointer"
            >
              Back to Gift Cards
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-950 dark:text-zinc-50 flex flex-col font-sans selection:bg-[#6F4E37]/20 selection:text-[#6F4E37]">
      <Navbar onSearchClick={() => setIsSearchOpen(true)} />

      <main className="flex-grow mt-20">
        
        <div className="max-w-[1600px] mx-auto px-6 sm:px-12 md:px-16 lg:px-20 py-8">
          <Link href="/gift-cards" className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-zinc-500 hover:text-[#6F4E37] dark:hover:text-[#E6C280] transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Store
          </Link>
        </div>

        <div className="max-w-[1600px] mx-auto px-6 sm:px-12 md:px-16 lg:px-20 pb-16 sm:pb-24">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* LEFT COLUMN: FORM */}
            <div className="lg:col-span-7">

              <div className="mb-6">
                <div className="flex justify-between items-start mb-2">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-chaney-title uppercase tracking-tight text-zinc-950 dark:text-white leading-tight">
                    DripHunter Physical Gift Card
                  </h1>
                  <button 
                    type="button" 
                    onClick={handleShare} 
                    className="p-3 bg-zinc-100 dark:bg-zinc-900 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors cursor-pointer shrink-0"
                    title="Share this gift card"
                  >
                    {isCopied ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <Share2 className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
                    )}
                  </button>
                </div>
                
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex text-amber-500">
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current text-zinc-300 dark:text-zinc-700" />
                  </div>
                  <span className="text-sm font-sans text-zinc-500">
                    Very Good <span className="mx-1">•</span> <span className="underline cursor-pointer hover:text-zinc-950 dark:hover:text-white">279 Ratings</span> <span className="mx-1">•</span> Verified Buyers
                  </span>
                </div>

                <div className="text-4xl font-chaney-title text-zinc-950 dark:text-white mb-6">
                  ₹{totalAmount.toLocaleString("en-IN")}
                </div>

                {/* 3 Badges */}
                <div className="flex flex-wrap gap-3 mb-8">
                   <div className="px-3 py-1.5 bg-zinc-100 dark:bg-zinc-900 rounded-full text-xs font-mono font-bold uppercase tracking-widest text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800">No returns</div>
                   <div className="px-3 py-1.5 bg-zinc-100 dark:bg-zinc-900 rounded-full text-xs font-mono font-bold uppercase tracking-widest text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800">No cash on delivery</div>
                   <div className="px-3 py-1.5 bg-zinc-100 dark:bg-zinc-900 rounded-full text-xs font-mono font-bold uppercase tracking-widest text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800">Customer support</div>
                </div>
              </div>

              <hr className="border-zinc-200 dark:border-zinc-800 mb-8" />

              <form onSubmit={handlePurchase} className="space-y-8">
                
                {/* 1. CHOOSE AMOUNT */}
                <section>
                   <h3 className="text-xs font-mono font-black uppercase tracking-widest text-zinc-500 mb-4">
                     Selected Denomination: <span className="text-zinc-950 dark:text-white">₹{amount.toLocaleString("en-IN")}</span>
                   </h3>
                   <div className="flex flex-wrap gap-3">
                    {predefinedAmounts.map(amt => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => setAmount(amt)}
                        className={`px-4 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer border-2 ${
                          amount === amt
                            ? "bg-[#6F4E37] text-white border-[#6F4E37] shadow-md dark:bg-[#E6C280] dark:text-zinc-950 dark:border-[#E6C280]"
                            : "bg-white dark:bg-zinc-950/50 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800 hover:border-[#6F4E37]/50"
                        }`}
                      >
                        ₹{amt}
                      </button>
                    ))}
                  </div>
                </section>

                <hr className="border-zinc-100 dark:border-zinc-800/80" />

                {/* 2. PACKAGING */}
                <section>
                  <h3 className="text-xl font-chaney-title uppercase text-zinc-950 dark:text-white tracking-wider mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-[10px] font-black text-[#6F4E37] dark:text-[#E6C280] font-mono border border-zinc-200 dark:border-zinc-700 shadow-xs">02</span>
                    Packaging
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setPackaging("Standard")}
                      className={`relative flex flex-col items-start p-6 rounded-2xl border-2 transition-all cursor-pointer ${
                        packaging === "Standard" ? "border-[#6F4E37] dark:border-[#E6C280] bg-[#6F4E37]/5 dark:bg-[#E6C280]/5" : "border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/50 hover:border-zinc-300 dark:hover:border-zinc-700"
                      }`}
                    >
                      <h4 className="text-sm font-chaney-title uppercase tracking-wider text-zinc-950 dark:text-white mb-2">Standard Envelope</h4>
                      <p className="text-xs text-zinc-500 font-sans text-left">Heavyweight black cardstock sleeve with wax seal.</p>
                      <span className="absolute top-4 right-4 text-xs font-mono font-bold text-zinc-400 uppercase">Free</span>
                      {packaging === "Standard" && <CheckCircle2 className="absolute bottom-4 right-4 w-5 h-5 text-[#6F4E37] dark:text-[#E6C280]" />}
                    </button>
                    <button
                      type="button"
                      onClick={() => setPackaging("Premium")}
                      className={`relative flex flex-col items-start p-6 rounded-2xl border-2 transition-all cursor-pointer ${
                        packaging === "Premium" ? "border-[#6F4E37] dark:border-[#E6C280] bg-[#6F4E37]/5 dark:bg-[#E6C280]/5 shadow-md" : "border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/50 hover:border-zinc-300 dark:hover:border-zinc-700"
                      }`}
                    >
                      <h4 className="text-sm font-chaney-title uppercase tracking-wider text-zinc-950 dark:text-white mb-2 text-left">Premium Box</h4>
                      <p className="text-xs text-zinc-500 font-sans text-left">Magnetic closure matte box with velvet inlay and authenticity card.</p>
                      <span className="absolute top-4 right-4 text-xs font-mono font-bold text-[#6F4E37] dark:text-[#E6C280] uppercase">+₹250</span>
                      {packaging === "Premium" && <CheckCircle2 className="absolute bottom-4 right-4 w-5 h-5 text-[#6F4E37] dark:text-[#E6C280]" />}
                    </button>
                  </div>
                </section>

                <hr className="border-zinc-100 dark:border-zinc-800/80" />

                {/* 3. CARD DETAILS */}
                <section>
                  <h3 className="text-xl font-chaney-title uppercase text-zinc-950 dark:text-white tracking-wider mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-[10px] font-black text-[#6F4E37] dark:text-[#E6C280] font-mono border border-zinc-200 dark:border-zinc-700 shadow-xs">03</span>
                    Card Details
                  </h3>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-[10px] font-mono font-black uppercase tracking-widest text-zinc-500 mb-2 pb-1">To (Engraved on Card)</h4>
                        <input 
                          type="text" 
                          required 
                          maxLength={15}
                          value={recipientName}
                          onChange={(e) => setRecipientName(e.target.value)}
                          className="w-full bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-800 p-4 rounded-2xl text-sm focus:outline-none focus:border-[#6F4E37] dark:focus:border-[#E6C280] transition-colors uppercase font-bold"
                          placeholder="Recipient Name"
                        />
                      </div>
                      <div>
                        <h4 className="text-[10px] font-mono font-black uppercase tracking-widest text-zinc-500 mb-2 pb-1">From (Engraved on Card)</h4>
                        <input 
                          type="text" 
                          required
                          maxLength={15}
                          value={senderName}
                          onChange={(e) => setSenderName(e.target.value)}
                          className="w-full bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-800 p-4 rounded-2xl text-sm focus:outline-none focus:border-[#6F4E37] dark:focus:border-[#E6C280] transition-colors uppercase font-bold"
                          placeholder="Your Name"
                        />
                      </div>
                    </div>

                    <div>
                      <h4 className="text-[10px] font-mono font-black uppercase tracking-widest text-zinc-500 mb-2 pb-1">Printed Gift Message</h4>
                      <textarea 
                        rows={3}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-800 p-4 rounded-2xl text-sm focus:outline-none focus:border-[#6F4E37] dark:focus:border-[#E6C280] transition-colors resize-none"
                        placeholder="Write a personal message to be included in the packaging..."
                      />
                    </div>
                  </div>
                </section>

                <hr className="border-zinc-100 dark:border-zinc-800/80" />

                {/* 4. SHIPPING */}
                <section>
                  <h3 className="text-xl font-chaney-title uppercase text-zinc-950 dark:text-white tracking-wider mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-[10px] font-black text-[#6F4E37] dark:text-[#E6C280] font-mono border border-zinc-200 dark:border-zinc-700 shadow-xs">04</span>
                    Shipping Address
                  </h3>
                  <div className="space-y-4">
                    <input 
                      type="text" 
                      required 
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-800 p-4 rounded-2xl text-sm focus:outline-none focus:border-[#6F4E37] dark:focus:border-[#E6C280] transition-colors"
                      placeholder="Street Address, Flat, Suite"
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input 
                        type="text" 
                        required 
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-800 p-4 rounded-2xl text-sm focus:outline-none focus:border-[#6F4E37] dark:focus:border-[#E6C280] transition-colors"
                        placeholder="City"
                      />
                      <input 
                        type="text" 
                        required 
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        className="w-full bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-800 p-4 rounded-2xl text-sm focus:outline-none focus:border-[#6F4E37] dark:focus:border-[#E6C280] transition-colors"
                        placeholder="Pincode"
                      />
                    </div>
                    <input 
                      type="tel" 
                      required 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-800 p-4 rounded-2xl text-sm focus:outline-none focus:border-[#6F4E37] dark:focus:border-[#E6C280] transition-colors"
                      placeholder="Phone Number (For Tracking)"
                    />
                  </div>
                </section>

                <hr className="border-zinc-100 dark:border-zinc-800/80" />

                {/* CHECKOUT */}
                <section className="bg-zinc-50 dark:bg-zinc-950/80 p-6 -mx-6 sm:-mx-12 rounded-[2rem] border border-zinc-200 dark:border-zinc-800/80 shadow-inner">
                  <div className="px-6 sm:px-12">
                    <div className="flex flex-col gap-2 mb-6">
                      <div className="flex justify-between text-sm text-zinc-500 font-mono uppercase tracking-widest">
                        <span>Card Value</span>
                        <span className="font-bold text-zinc-950 dark:text-white">₹{amount.toLocaleString("en-IN")}</span>
                      </div>
                      <div className="flex justify-between text-sm text-zinc-500 font-mono uppercase tracking-widest">
                        <span>Packaging ({packaging})</span>
                        <span className="font-bold text-zinc-950 dark:text-white">₹{packagingFee}</span>
                      </div>
                      <div className="flex justify-between text-sm text-zinc-500 font-mono uppercase tracking-widest">
                        <span>Shipping</span>
                        <span className="font-bold text-emerald-600">FREE</span>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4 border-t border-zinc-200 dark:border-zinc-800/80">
                      <div>
                        <p className="text-[10px] text-zinc-500 font-mono font-black uppercase tracking-widest mb-1">Total Due</p>
                        <p className="text-3xl font-chaney-title text-zinc-950 dark:text-white">₹{totalAmount.toLocaleString("en-IN")}</p>
                      </div>
                      
                      <button
                        type="submit"
                        disabled={isPurchasing}
                        className="w-full sm:w-auto min-w-[240px] bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 px-8 py-5 rounded-2xl text-[11px] font-mono font-black uppercase tracking-widest transition-all shadow-xl hover:-translate-y-1 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                      >
                        {isPurchasing ? (
                          <><div className="w-4 h-4 border-2 border-white/20 dark:border-zinc-950/20 border-t-white dark:border-t-zinc-950 rounded-full animate-spin" /> Processing...</>
                        ) : (
                          <>Proceed to Payment <ArrowRight className="w-4 h-4" /></>
                        )}
                      </button>
                    </div>
                  </div>
                </section>
              </form>

                {/* PRODUCT HIGHLIGHTS */}
                <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800 mt-12">
                  <h4 className="text-sm font-bold text-zinc-950 dark:text-white mb-4">All details</h4>
                  
                  {!showAllDetails ? (
                    <div>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400 font-sans mb-3">Features, description and more</p>
                      <button type="button" onClick={() => setShowAllDetails(true)} className="text-sm font-bold text-[#6F4E37] dark:text-[#E6C280] hover:underline">
                        Read more
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-8 animate-fade-in text-sm text-zinc-600 dark:text-zinc-400 font-sans">
                      
                      {/* Specifications */}
                      <div>
                        <h5 className="font-bold text-zinc-950 dark:text-white text-base mb-3 border-b border-zinc-200 dark:border-zinc-800 pb-2">Specifications</h5>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div><span className="text-zinc-500">In the Box:</span> 1 Gift Card</div>
                          <div><span className="text-zinc-500">General Brand:</span> DripHunter</div>
                          <div><span className="text-zinc-500">Type:</span> Stores</div>
                          <div><span className="text-zinc-500">Theme:</span> Open</div>
                          <div><span className="text-zinc-500">Denomination:</span> Rs 5000</div>
                          <div><span className="text-zinc-500">Validity:</span> 12 Months</div>
                          <div><span className="text-zinc-500">Occasion:</span> Generic</div>
                          <div><span className="text-zinc-500">Language:</span> English</div>
                          <div><span className="text-zinc-500">Net Quantity:</span> 1</div>
                          <div><span className="text-zinc-500">Place of Redemption:</span> DripHunter</div>
                        </div>
                        <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl text-xs">
                          <span className="font-bold">Important Note:</span> Cancellation/ Returns NOT allowed for this product post order booking.
                        </div>
                      </div>

                      {/* How to Redeem */}
                      <div>
                         <h5 className="font-bold text-zinc-950 dark:text-white text-base mb-3 border-b border-zinc-200 dark:border-zinc-800 pb-2">How to Redeem</h5>
                         <ol className="list-decimal pl-5 space-y-2">
                           <li>Go to www.driphunter.com and select items you want to purchase.</li>
                           <li>At checkout, click "Proceed to Pay" and select "Pay by Gift Card."</li>
                           <li>Enter your 16-digit Gift Card number and PIN.</li>
                           <li>Pay any remaining balance using Credit Card / Debit Card / Internet Banking. Cash on Delivery cannot be used for the balance amount.</li>
                         </ol>
                         <h6 className="font-bold mt-4 mb-2 text-zinc-950 dark:text-zinc-300">Key Conditions:</h6>
                         <ul className="list-disc pl-5 space-y-2">
                           <li>Gift Cards can be used for single orders with multiple sellers.</li>
                           <li>If the order value is less than the Gift Card balance, the remaining amount stays on the same card for future use.</li>
                           <li>Gift Cards cannot be redeemed for cash or credit.</li>
                           <li>A maximum of Rs. 50,000 in Gift Cards can be added per calendar month. DripHunter reserves the right to modify this limit.</li>
                           <li>Additional verification may be required when adding a Gift Card.</li>
                         </ul>
                      </div>

                      {/* Terms & Conditions */}
                      <div>
                        <h5 className="font-bold text-zinc-950 dark:text-white text-base mb-3 border-b border-zinc-200 dark:border-zinc-800 pb-2">Terms & Conditions</h5>
                        <ol className="list-decimal pl-5 space-y-2 text-xs leading-relaxed">
                          <li>DripHunter GCs ("GCs" or "GC") are issued by Pine Labs Limited, which is a company incorporated under the laws of India, and is authorised by the Reserve Bank of India ("RBI") to issue such GC.</li>
                          <li>GC can be purchased using the following payment modes only - Credit Card, Debit Card, EMI & Net Banking.</li>
                          <li>GC cannot be used to purchase other DripHunter GC or subscriptions.</li>
                          <li>GC cannot be used to make bulk purchases on the Platform.</li>
                          <li>If the order value exceeds the GC amount, the balance must be paid by Credit Card/Debit Card/Internet Banking. The Cash on Delivery payment option cannot be used to pay the balance amount.</li>
                          <li>If the order value is less than the amount of the GC, the outstanding balance (after deduction of order value) will reflect under the same GC and can be used for subsequent transactions.</li>
                          <li>GC are valid for a period of 12 months from the date of issuance.</li>
                          <li>The cardholder may request revalidation of the expired GC. Upon receipt of such a request, the GC may be revalidated after due verification and may be subject to additional terms and conditions. A nominal administrative fee may be applicable, subject to prevailing regulations.</li>
                          <li>GC issued to you on account of damaged, defective, or missing products must not be transferred to any other account. Pine Labs/DripHunter reserves the right to cancel such GC if the same are transferred to any other account.</li>
                          <li>www.driphunter.com/Pine Labs is not responsible for any acts of omission or commission if the GC is lost, stolen or used without permission.</li>
                          <li>Once the GC has been sent to you, you are bound to protect the GC PIN or GC number as confidential. In the event of any misuse of the GC due to loss of any such confidential details due to the fault of the purchaser, DripHunter/ Pine Labs Ltd. shall not be responsible for the same, and no refund will be issued.</li>
                          <li>DripHunter.com/Pine Labs assume no responsibility for the products purchased using the GC, and any liability thereof is expressly disclaimed.</li>
                          <li>GC, once purchased, cannot be cancelled by the Purchaser. Any cancellations shall be at the sole discretion of DripHunter/Pine Labs.</li>
                          <li>The maximum value of any single GC issued under these terms shall not exceed Rs. 10,000/- (Rupees Ten Thousand only), or such other limit as may be prescribed by the RBI from time to time for non-reloadable Gift PPIs.</li>
                          <li>You can only purchase 100 GC in a 30-day period, and the aggregate value of the GC purchased cannot be more than Rs. 100,000/- (Rupees One Lakh only) in a month. Purchases exceeding these limits shall be cancelled automatically.</li>
                          <li>Pine Labs/DripHunter reserves the right to cancel GC if the same have been found to be purchased using fraudulent means or purchased through unauthorised third-party vendors, social media groups, or secondary marketplaces. In such cases, the funds shall be credited back to the same source from which they were received.</li>
                          <li>Any cancelled GC will be refunded to the original payment source used at the time of purchase.</li>
                          <li>DripHunter reserves the right to temporarily suspend or 'lock' the redemption of GC balances if:</li>
                          <li>i. There is a recent change in the registered Mobile Number or Email ID associated with the account.</li>
                          <li>ii. Suspicious login activity or multiple failed PIN attempts are detected.</li>
                          <li>In the event that the beneficiary/Know Your Customer ("KYC") details as per RBI Guidelines are found to be incorrect/insufficient, DripHunter/Pine Labs retains the right to cancel the GC issued.</li>
                          <li>You agree and understand that GC are a pre-paid payment instrument subject to regulations by the RBI under the RBI guidelines. DripHunter/ Pine Labs Ltd. may be required to share KYC details of the purchaser/ redeemer of the GC and/or any other information with relation to the purchase of the GC and/or transaction undertaken using the GC with RBI or such statutory authorities. DripHunter/ Pine Labs Ltd. may contact the purchaser/redeemer of the GC for any such information. DripHunter/Pine Labs will never contact you via Phone, Email, or SMS to ask for your 16-digit GC number or PIN.</li>
                          <li>There is no fee or other charges associated with a GC purchase.</li>
                          <li>GC cannot be reloaded or resold.</li>
                          <li>Any offer on GC, including offers by banks and instant cashbacks, could be withdrawn anytime at the sole discretion of DripHunter/ Pine Labs.</li>
                          <li>For Dispute and Liability - Please refer to the Customer Grievance policy for dispute resolution, unauthorised transactions and liability-related aspects at https://www.pinelabs.com/grievance-policy/</li>
                          <li>You can change the language for transaction alerts via SMS notifications. Please write to support@woohoo.in. You can choose to receive SMS in any of the languages - Hindi, Telugu, Tamil, Kannada, Marathi, Bengali, Gujarati, Odia, Punjabi, Malayalam and Assamese.</li>
                          <li>While sending the email, please mention the registered mobile number against your GC number and your preferred language option for getting these SMS.</li>
                        </ol>
                      </div>

                      <button type="button" onClick={() => setShowAllDetails(false)} className="text-sm font-bold text-[#6F4E37] dark:text-[#E6C280] hover:underline mt-4">
                        See less
                      </button>
                    </div>
                  )}
                </div>

                {/* RATINGS AND REVIEWS */}
                <div className="pt-12 border-t border-zinc-200 dark:border-zinc-800 mt-12">
                   <div className="flex justify-between items-center mb-6">
                      <h3 className="text-lg font-bold text-zinc-950 dark:text-white">Ratings and reviews</h3>
                   </div>
                   
                   <div className="flex items-start gap-4 mb-8 bg-zinc-50 dark:bg-zinc-900/40 p-6 rounded-2xl">
                      <div className="text-4xl font-bold text-zinc-950 dark:text-white">4.3</div>
                      <div>
                         <div className="flex text-amber-500 mb-1">
                          <Star className="w-4 h-4 fill-current" />
                          <Star className="w-4 h-4 fill-current" />
                          <Star className="w-4 h-4 fill-current" />
                          <Star className="w-4 h-4 fill-current" />
                          <Star className="w-4 h-4 text-zinc-300 dark:text-zinc-700" />
                         </div>
                         <p className="text-xs text-zinc-500 font-sans">based on 279 ratings by Verified Buyers</p>
                      </div>
                   </div>

                   <div className="space-y-6">
                      <div className="border-b border-zinc-100 dark:border-zinc-800 pb-6">
                         <div className="flex items-center gap-2 mb-2">
                           <div className="flex text-amber-500">
                              <Star className="w-3 h-3 fill-current" />
                              <Star className="w-3 h-3 fill-current" />
                              <Star className="w-3 h-3 fill-current" />
                              <Star className="w-3 h-3 fill-current" />
                              <Star className="w-3 h-3 fill-current" />
                           </div>
                           <span className="text-sm font-bold text-zinc-950 dark:text-white">Best in the market!</span>
                         </div>
                         <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">Received physical gift card like ATM. Thank you ...more</p>
                         <div className="flex items-center gap-2 text-xs text-zinc-400">
                           <span className="font-bold text-zinc-500">Masihur Rahman</span>
                           <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700"></span>
                           <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-emerald-500" /> Verified Buyer</span>
                           <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700"></span>
                           <span>5 years ago</span>
                         </div>
                      </div>

                      <div className="border-b border-zinc-100 dark:border-zinc-800 pb-6">
                         <div className="flex items-center gap-2 mb-2">
                           <div className="flex text-amber-500">
                              <Star className="w-3 h-3 fill-current" />
                              <Star className="w-3 h-3 fill-current" />
                              <Star className="w-3 h-3 fill-current" />
                              <Star className="w-3 h-3 fill-current" />
                              <Star className="w-3 h-3 fill-current text-zinc-300 dark:text-zinc-700" />
                           </div>
                           <span className="text-sm font-bold text-zinc-950 dark:text-white">Awesome</span>
                         </div>
                         <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">Very good</p>
                         <div className="flex items-center gap-2 text-xs text-zinc-400">
                           <span className="font-bold text-zinc-500">Srinath Ghosh</span>
                           <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700"></span>
                           <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-emerald-500" /> Verified Buyer</span>
                           <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700"></span>
                           <span>5 years ago</span>
                         </div>
                      </div>
                      
                      <button type="button" className="text-sm font-bold text-[#6F4E37] dark:text-[#E6C280] mt-4 hover:underline">
                        Show all reviews
                      </button>
                   </div>
                </div>

                {/* Q&A */}
                <div className="pt-8 border-t border-zinc-200 dark:border-zinc-800 mt-8 mb-16">
                   <div className="flex justify-between items-center mb-6">
                      <h3 className="text-lg font-bold text-zinc-950 dark:text-white">Questions and Answers</h3>
                   </div>
                   
                   <div className="space-y-6">
                      <div className="border-b border-zinc-100 dark:border-zinc-800 pb-6">
                         <div className="flex gap-4 mb-2">
                            <span className="font-bold text-zinc-950 dark:text-white min-w-[20px]">Q:</span>
                            <p className="text-sm font-bold text-zinc-950 dark:text-white">How long is the physical gift card valid for?</p>
                         </div>
                         <div className="flex gap-4">
                            <span className="font-bold text-zinc-500 min-w-[20px]">A:</span>
                            <div>
                               <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">The gift card is valid for 12 months from the date of issuance.</p>
                               <div className="flex items-center gap-4 text-xs text-zinc-400">
                                 <span className="font-bold">DripHunter Support</span>
                                 <div className="flex items-center gap-3 ml-auto">
                                   <span className="flex items-center gap-1 cursor-pointer hover:text-zinc-950 dark:hover:text-white"><span className="text-[10px]">👍</span> 14</span>
                                   <span className="flex items-center gap-1 cursor-pointer hover:text-zinc-950 dark:hover:text-white"><span className="text-[10px]">👎</span> 0</span>
                                 </div>
                               </div>
                            </div>
                         </div>
                      </div>

                      <div className="border-b border-zinc-100 dark:border-zinc-800 pb-6">
                         <div className="flex gap-4 mb-2">
                            <span className="font-bold text-zinc-950 dark:text-white min-w-[20px]">Q:</span>
                            <p className="text-sm font-bold text-zinc-950 dark:text-white">Can I use this for multiple purchases?</p>
                         </div>
                         <div className="flex gap-4">
                            <span className="font-bold text-zinc-500 min-w-[20px]">A:</span>
                            <div>
                               <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">Yes. If your order value is less than the gift card amount, the remaining balance stays on the card for your next purchase.</p>
                               <div className="flex items-center gap-4 text-xs text-zinc-400">
                                 <span className="font-bold">DripHunter Support</span>
                                 <div className="flex items-center gap-3 ml-auto">
                                   <span className="flex items-center gap-1 cursor-pointer hover:text-zinc-950 dark:hover:text-white"><span className="text-[10px]">👍</span> 8</span>
                                   <span className="flex items-center gap-1 cursor-pointer hover:text-zinc-950 dark:hover:text-white"><span className="text-[10px]">👎</span> 1</span>
                                 </div>
                               </div>
                            </div>
                         </div>
                      </div>

                      <div className="border-b border-zinc-100 dark:border-zinc-800 pb-6">
                         <div className="flex gap-4 mb-2">
                            <span className="font-bold text-zinc-950 dark:text-white min-w-[20px]">Q:</span>
                            <p className="text-sm font-bold text-zinc-950 dark:text-white">Are there any delivery charges?</p>
                         </div>
                         <div className="flex gap-4">
                            <span className="font-bold text-zinc-500 min-w-[20px]">A:</span>
                            <div>
                               <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">Standard shipping for physical gift cards is completely free. However, opting for our Premium Box packaging costs an additional ₹250.</p>
                               <div className="flex items-center gap-4 text-xs text-zinc-400">
                                 <span className="font-bold">DripHunter Support</span>
                                 <div className="flex items-center gap-3 ml-auto">
                                   <span className="flex items-center gap-1 cursor-pointer hover:text-zinc-950 dark:hover:text-white"><span className="text-[10px]">👍</span> 22</span>
                                   <span className="flex items-center gap-1 cursor-pointer hover:text-zinc-950 dark:hover:text-white"><span className="text-[10px]">👎</span> 0</span>
                                 </div>
                               </div>
                            </div>
                         </div>
                      </div>
                      
                      {showAllQuestions && (
                        <div className="space-y-6 pt-2 animate-fade-in">
                          <div className="border-b border-zinc-100 dark:border-zinc-800 pb-6">
                             <div className="flex gap-4 mb-2">
                                <span className="font-bold text-zinc-950 dark:text-white min-w-[20px]">Q:</span>
                                <p className="text-sm font-bold text-zinc-950 dark:text-white">Can I buy this card using Cash on Delivery?</p>
                             </div>
                             <div className="flex gap-4">
                                <span className="font-bold text-zinc-500 min-w-[20px]">A:</span>
                                <div>
                                   <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">No, Cash on Delivery is not available for purchasing gift cards. You can use Credit/Debit cards or UPI.</p>
                                   <div className="flex items-center gap-4 text-xs text-zinc-400">
                                     <span className="font-bold">DripHunter Support</span>
                                     <div className="flex items-center gap-3 ml-auto">
                                       <span className="flex items-center gap-1 cursor-pointer hover:text-zinc-950 dark:hover:text-white"><span className="text-[10px]">👍</span> 5</span>
                                       <span className="flex items-center gap-1 cursor-pointer hover:text-zinc-950 dark:hover:text-white"><span className="text-[10px]">👎</span> 0</span>
                                     </div>
                                   </div>
                                </div>
                             </div>
                          </div>
                          
                          <div className="border-b border-zinc-100 dark:border-zinc-800 pb-6">
                             <div className="flex gap-4 mb-2">
                                <span className="font-bold text-zinc-950 dark:text-white min-w-[20px]">Q:</span>
                                <p className="text-sm font-bold text-zinc-950 dark:text-white">Can the gift card be cancelled or returned?</p>
                             </div>
                             <div className="flex gap-4">
                                <span className="font-bold text-zinc-500 min-w-[20px]">A:</span>
                                <div>
                                   <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">Gift cards once purchased cannot be cancelled or returned under any circumstances.</p>
                                   <div className="flex items-center gap-4 text-xs text-zinc-400">
                                     <span className="font-bold">DripHunter Support</span>
                                     <div className="flex items-center gap-3 ml-auto">
                                       <span className="flex items-center gap-1 cursor-pointer hover:text-zinc-950 dark:hover:text-white"><span className="text-[10px]">👍</span> 3</span>
                                       <span className="flex items-center gap-1 cursor-pointer hover:text-zinc-950 dark:hover:text-white"><span className="text-[10px]">👎</span> 1</span>
                                     </div>
                                   </div>
                                </div>
                             </div>
                          </div>
                        </div>
                      )}
                      
                      <button 
                        type="button" 
                        onClick={() => setShowAllQuestions(!showAllQuestions)}
                        className="text-sm font-bold text-[#6F4E37] dark:text-[#E6C280] hover:underline"
                      >
                        {showAllQuestions ? "See less" : "All questions"}
                      </button>
                   </div>
                </div>

            </div>

            {/* RIGHT COLUMN: PREVIEW INFO */}
            <div className="lg:col-span-5 relative hidden lg:block">
              <div className="sticky top-32 space-y-6">
                
                {/* Visual Representation */}
                <div className="w-full aspect-square bg-zinc-100 dark:bg-zinc-900 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 overflow-hidden relative group">
                  <img 
                    src={packaging === "Premium" ? "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&q=80" : "https://images.unsplash.com/photo-1616423640778-28d1b53229bd?w=800&q=80"}
                    alt="Physical Card Presentation"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-8 left-8 right-8">
                     <div className="flex items-center gap-2 text-white/70 font-mono text-xs uppercase tracking-widest mb-2">
                        <Truck className="w-4 h-4" /> Dispatches in 24hrs
                     </div>
                     <h3 className="text-2xl font-chaney-title text-white uppercase tracking-wider">{packaging} Presentation</h3>
                  </div>
                </div>

                {/* Mock Card Preview (Engraving) */}
                <div className="bg-zinc-950 p-8 rounded-[2.5rem] border border-zinc-800 shadow-xl relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
                   <h3 className="text-[10px] font-mono font-black uppercase tracking-widest text-zinc-500 mb-6">Metal Card Engraving Preview</h3>
                   <div className="aspect-[1.586/1] bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-xl border border-zinc-700 p-6 flex flex-col justify-between shadow-inner">
                      <div className="flex justify-between items-start">
                        <span className="text-xl font-chaney-title uppercase tracking-widest text-zinc-400 drop-shadow-md">
                          DRIP<span className="text-zinc-600">HUNTER</span>
                        </span>
                        <Package className="text-zinc-600 w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-2xl font-chaney-title tracking-tight text-white mb-4">
                          ₹{amount.toLocaleString("en-IN")}
                        </div>
                        <div className="flex justify-between text-xs font-mono text-zinc-400 uppercase tracking-widest">
                           <span>TO: {recipientName || "NAME"}</span>
                           <span>FROM: {senderName || "NAME"}</span>
                        </div>
                      </div>
                   </div>
                </div>

              </div>
            </div>
            
          </div>
        </div>

      </main>

      <Footer />

      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </div>
  );
}
