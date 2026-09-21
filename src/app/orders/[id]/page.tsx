"use client";

import React, { useState, use } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SearchOverlay from "@/components/layout/SearchOverlay";
import Link from "next/link";
import { ChevronRight, Copy, Check, MessageCircle, Home, User, Banknote, ChevronDown, Gift, FileDown } from "lucide-react";
import { useRouter } from "next/navigation";

export default function OrderTrackingPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const router = useRouter();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  
  const orderId = decodeURIComponent(unwrappedParams.id);
  const hasOffer = orderId !== 'OD336542014089797100';
  const handlingFee = orderId === 'OD336542014089797100' ? 50 : 0;

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const handleDownloadInvoice = () => {
    const invoiceText = `DRIPHUNTER INVOICE\n------------------\nOrder ID: ${orderId}\nItem: Midnight Eclipse Low\nTotal Amount: ₹8,999\n\nThank you for shopping with DripHunter!`;
    const blob = new Blob([invoiceText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Invoice_${orderId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-sans antialiased">
      <Navbar onSearchClick={() => setIsSearchOpen(true)} />
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* ─── MAIN TRACKING CONTENT ─── */}
      <main className="flex-grow bg-zinc-50 dark:bg-zinc-950 pt-8 pb-16 px-4 sm:px-6 md:px-12 w-full mx-auto relative z-20">
        
        <div className="max-w-[1200px] mx-auto">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-500 mb-8 overflow-x-auto whitespace-nowrap pb-2">
            <Link href="/" className="hover:text-zinc-950 dark:hover:text-white transition-colors shrink-0">Home</Link>
            <ChevronRight className="w-4 h-4 shrink-0" />
            <Link href="/profile" className="hover:text-zinc-950 dark:hover:text-white transition-colors shrink-0">My Account</Link>
            <ChevronRight className="w-4 h-4 shrink-0" />
            <Link href="/orders" className="hover:text-zinc-950 dark:hover:text-white transition-colors shrink-0">Orders</Link>
            <ChevronRight className="w-4 h-4 shrink-0" />
            <span className="text-zinc-950 dark:text-white truncate shrink-0 max-w-[120px] sm:max-w-none">Order ID: {orderId}</span>
          </div>

          {/* TWO COLUMN LAYOUT */}
          <div className="flex flex-col lg:flex-row gap-6">
            
            {/* LEFT COLUMN - Product & Timeline */}
            <div className="flex-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm flex flex-col overflow-hidden">
              {/* TOP: Product Details */}
              <div className="p-6 md:p-8 flex flex-col sm:flex-row gap-6 border-b border-zinc-100 dark:border-zinc-800">
                <div className="flex-1 order-2 sm:order-1">
                  <h2 className="text-xl md:text-2xl font-chaney-title uppercase tracking-tight text-zinc-950 dark:text-white leading-tight">
                    Midnight Eclipse Low
                  </h2>
                  <p className="text-sm text-zinc-500 mt-2 font-medium">Size: 9, Color: Phantom Black</p>
                  <p className="text-sm text-zinc-500 mt-1 font-medium">Seller: <span className="font-bold text-[#6F4E37] dark:text-[#E6C280]">DripHunter Official</span></p>
                  
                  <div className="mt-4 flex items-center gap-4">
                    <span className="text-2xl font-chaney-title text-zinc-950 dark:text-white">₹8,999</span>
                    {hasOffer && (
                      <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-1 rounded border border-emerald-200 dark:border-emerald-800/50">
                        1 Offer Applied
                      </span>
                    )}
                  </div>
                </div>
                <div className="w-full sm:w-32 h-48 sm:h-32 bg-zinc-100 dark:bg-zinc-950 rounded-xl overflow-hidden shrink-0 p-2 order-1 sm:order-2 flex items-center justify-center">
                  <img 
                    src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=400&q=80" 
                    alt="Product" 
                    className="max-w-full max-h-full object-contain mix-blend-multiply dark:mix-blend-normal" 
                  />
                </div>
              </div>

              {/* MIDDLE: Timeline */}
              <div className="px-6 md:px-12 py-10 flex-grow">
                <div className="ml-2">
                  {/* Item 1 */}
                  <div className="flex gap-6 relative">
                    <div className="flex flex-col items-center">
                      <div className="w-3.5 h-3.5 bg-emerald-500 rounded-full ring-4 ring-emerald-50 dark:ring-emerald-900/30 shrink-0 z-10 mt-1" />
                      <div className="w-0.5 h-full bg-zinc-200 dark:bg-zinc-800 my-2" />
                    </div>
                    <div className="pb-10">
                      <h4 className="text-sm md:text-base font-bold text-zinc-950 dark:text-white">Order Confirmed, Sep 16, 2026</h4>
                    </div>
                  </div>

                  {/* Item 2 */}
                  <div className="flex gap-6 relative">
                    <div className="flex flex-col items-center">
                      <div className="w-3.5 h-3.5 bg-red-500 rounded-full ring-4 ring-red-50 dark:ring-red-900/30 shrink-0 z-10 mt-1" />
                    </div>
                    <div>
                      <h4 className="text-sm md:text-base font-bold text-zinc-950 dark:text-white">Cancelled, Sep 16, 2026</h4>
                      <div className="mt-4 p-4 bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30 rounded-xl">
                        <p className="text-sm text-red-800 dark:text-red-300 leading-relaxed font-medium">
                          Your order has been canceled as requested during the automated order confirmation call.
                        </p>
                      </div>

                      <details className="mt-4 group outline-none">
                        <summary className="inline-flex items-center gap-1 text-sm font-bold text-[#6F4E37] dark:text-[#E6C280] cursor-pointer list-none marker:hidden hover:opacity-80 select-none">
                          See All Updates <ChevronDown className="w-4 h-4 group-open:rotate-180 transition-transform" />
                        </summary>
                        <div className="pt-6 mt-4 border-t border-zinc-100 dark:border-zinc-800">
                          <div className="relative pl-4 space-y-6 before:absolute before:top-2 before:bottom-2 before:left-[3px] before:w-0.5 before:bg-zinc-200 dark:before:bg-zinc-800">
                            
                            {/* Detail Step 1 */}
                            <div className="relative">
                              <div className="absolute -left-4 top-1.5 w-2 h-2 bg-emerald-500 rounded-full ring-4 ring-white dark:ring-zinc-950 z-10" />
                              <h5 className="text-sm font-bold text-zinc-950 dark:text-white mb-2">Order Confirmed <span className="font-normal text-zinc-500 ml-1">Fri, 16th Jan '26</span></h5>
                              <div className="space-y-3">
                                <div>
                                  <p className="text-xs text-zinc-900 dark:text-zinc-300 font-medium">Your Order has been placed.</p>
                                  <p className="text-[10px] text-zinc-500 mt-0.5">Fri, 16th Jan '26 - 5:30pm</p>
                                </div>
                                <div>
                                  <p className="text-xs text-zinc-900 dark:text-zinc-300 font-medium">Seller has processed your order.</p>
                                  <p className="text-[10px] text-zinc-500 mt-0.5">Sat, 17th Jan '26 - 11:02am</p>
                                </div>
                                <div>
                                  <p className="text-xs text-zinc-900 dark:text-zinc-300 font-medium">Your item has been picked up by delivery partner.</p>
                                  <p className="text-[10px] text-zinc-500 mt-0.5">Sat, 17th Jan '26 - 11:02am</p>
                                </div>
                              </div>
                            </div>

                            {/* Detail Step 2 */}
                            <div className="relative">
                              <div className="absolute -left-4 top-1.5 w-2 h-2 bg-emerald-500 rounded-full ring-4 ring-white dark:ring-zinc-950 z-10" />
                              <h5 className="text-sm font-bold text-zinc-950 dark:text-white mb-2">Shipped <span className="font-normal text-zinc-500 ml-1">Sat, 17th Jan '26</span></h5>
                              <div className="space-y-3">
                                <div>
                                  <p className="text-xs text-zinc-900 dark:text-zinc-300 font-medium">Ekart Logistics - FMPC5675803362</p>
                                  <p className="text-[10px] text-zinc-500 mt-0.5">Your item has been shipped.</p>
                                  <p className="text-[10px] text-zinc-500 mt-0.5">Sat, 17th Jan '26 - 1:10pm</p>
                                </div>
                                <div>
                                  <p className="text-xs text-zinc-900 dark:text-zinc-300 font-medium">Your item has been received in the hub nearest to you</p>
                                </div>
                              </div>
                            </div>

                            {/* Detail Step 3 */}
                            <div className="relative">
                              <div className="absolute -left-4 top-1.5 w-2 h-2 bg-[#ff9000] rounded-full ring-4 ring-white dark:ring-zinc-950 z-10" />
                              <h5 className="text-sm font-bold text-zinc-950 dark:text-white mb-2">Delivery Attempted</h5>
                              <div className="space-y-3">
                                <div>
                                  <p className="text-xs text-zinc-900 dark:text-zinc-300 font-medium leading-relaxed">Delivery agent was unable to deliver your order. Please check again after some time for further updates.</p>
                                  <p className="text-[10px] text-zinc-500 mt-0.5">Wed, 21st Jan '26 - 4:44pm</p>
                                </div>
                              </div>
                            </div>

                            {/* Detail Step 4 */}
                            <div className="relative">
                              <div className="absolute -left-4 top-1.5 w-2 h-2 bg-emerald-500 rounded-full ring-4 ring-white dark:ring-zinc-950 z-10" />
                              <h5 className="text-sm font-bold text-zinc-950 dark:text-white mb-2">Out For Delivery <span className="font-normal text-zinc-500 ml-1">Thu, 22nd Jan '26</span></h5>
                              <div className="space-y-3">
                                <div>
                                  <p className="text-xs text-zinc-900 dark:text-zinc-300 font-medium">Your item is out for delivery</p>
                                  <p className="text-[10px] text-zinc-500 mt-0.5">Thu, 22nd Jan '26 - 9:41am</p>
                                </div>
                              </div>
                            </div>

                          </div>
                        </div>
                      </details>
                    </div>
                  </div>
                </div>
              </div>

              {/* DIVIDER */}
              <div className="border-t border-zinc-100 dark:border-zinc-800" />

              {/* CHAT WITH US */}
              <div 
                onClick={() => router.push(`/orders/${orderId}/chat`)}
                className="p-5 flex justify-center border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 transition-colors cursor-pointer group"
              >
                <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-950 dark:text-white group-hover:text-[#6F4E37] dark:group-hover:text-[#E6C280] transition-colors pointer-events-none">
                  <MessageCircle className="w-4 h-4" /> Chat with us
                </button>
              </div>

              {/* ORDER ID */}
              <div className="p-5 px-6 md:px-8 flex justify-between items-center bg-zinc-50 dark:bg-zinc-950">
                <span className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-widest">Order ID: {orderId}</span>
                <button 
                  onClick={() => handleCopyCode(orderId)}
                  className="text-zinc-400 hover:text-[#6F4E37] dark:hover:text-[#E6C280] transition-colors flex items-center gap-2 text-xs font-bold uppercase tracking-widest"
                >
                  {copiedCode === orderId ? <Check className="w-4 h-4 text-emerald-500" /> : <><Copy className="w-4 h-4"/> Copy</>}
                </button>
              </div>
            </div>

            {/* RIGHT COLUMN - Delivery & Price */}
            <div className="w-full lg:w-[380px] xl:w-[420px] shrink-0 space-y-6">
              
              {/* Delivery Details */}
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
                <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 border-b border-zinc-100 dark:border-zinc-800 pb-4">Delivery details</h3>
                <div className="flex gap-4 items-start pt-2">
                  <div className="bg-zinc-100 dark:bg-zinc-800 p-2 rounded-lg shrink-0">
                    <Home className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-zinc-950 dark:text-white mb-1.5">Home</p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">142 Streetwear Lane, Near DripHunter Store, Bandra West, Mumbai, Maharashtra 400050</p>
                  </div>
                </div>
                <div className="flex gap-4 items-center">
                  <div className="bg-zinc-100 dark:bg-zinc-800 p-2 rounded-lg shrink-0">
                    <User className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-zinc-950 dark:text-white">Alex Carter <span className="font-mono text-zinc-500 ml-2 font-normal text-xs">+91 98765 43210</span></p>
                  </div>
                </div>
              </div>

              {/* Price details */}
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
                <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 border-b border-zinc-100 dark:border-zinc-800 pb-4">Price details</h3>
                
                <div className="space-y-4 text-sm font-medium pt-2">
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-500">Listing price</span>
                    <span className="text-zinc-400 line-through decoration-zinc-300 dark:decoration-zinc-700">₹11,999</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-500">Special price</span>
                    <span className="font-bold text-zinc-950 dark:text-white">₹8,999</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-500">Special price</span>
                    <span className="font-bold text-zinc-950 dark:text-white">₹8,999</span>
                  </div>
                  {handlingFee > 0 && (
                    <details className="group">
                      <summary className="flex justify-between items-center cursor-pointer list-none marker:hidden text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300">
                        <div className="flex items-center gap-2">
                          <span>Additional Charges</span>
                          <ChevronDown className="w-4 h-4 group-open:rotate-180 transition-transform" />
                        </div>
                        <span className="font-bold text-zinc-950 dark:text-white">₹{handlingFee}</span>
                      </summary>
                      <div className="pl-6 pt-3 space-y-2 text-xs">
                        <div className="flex justify-between items-center">
                          <span className="text-zinc-400">Handling fee</span>
                          <span className="font-bold text-zinc-950 dark:text-white">₹{handlingFee}</span>
                        </div>
                      </div>
                    </details>
                  )}
                  {hasOffer && (
                    <div className="flex justify-between items-center text-emerald-600 dark:text-emerald-400">
                      <span>Other discount</span>
                      <span className="font-bold">-₹50</span>
                    </div>
                  )}
                </div>

                <div className="border-t border-zinc-100 dark:border-zinc-800 pt-6 flex justify-between items-center">
                  <span className="font-bold text-zinc-950 dark:text-white text-base">Total amount</span>
                  <span className="text-2xl font-chaney-title text-zinc-950 dark:text-white">₹8,999</span>
                </div>
                
                <div className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 flex justify-between items-center text-xs mt-2">
                  <span className="text-zinc-500 font-bold uppercase tracking-widest">Paid By</span>
                  <span className="flex items-center gap-2 font-bold text-zinc-950 dark:text-white"><Banknote className="w-4 h-4 text-[#6F4E37] dark:text-[#E6C280]"/> Cash On Delivery</span>
                </div>
              </div>

              {hasOffer && (
                /* Offers Earned Dropdown */
                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm overflow-hidden">
                  <details className="group">
                    <summary className="p-6 md:p-8 flex justify-between items-center cursor-pointer list-none marker:hidden">
                      <div className="flex items-center gap-3">
                        <Gift className="w-5 h-5 text-[#6F4E37] dark:text-[#E6C280]" />
                        <span className="text-sm font-bold text-zinc-950 dark:text-white">Offers Earned</span>
                      </div>
                      <ChevronDown className="w-5 h-5 text-zinc-400 group-open:rotate-180 transition-transform" />
                    </summary>
                    <div className="px-6 md:px-8 pb-6 md:pb-8 border-t border-zinc-100 dark:border-zinc-800 pt-6">
                      <div className="flex gap-4">
                        <div className="w-1 bg-emerald-500 rounded-full shrink-0" />
                        <div>
                          <h4 className="text-sm font-bold text-zinc-950 dark:text-white mb-1">DripHunter Cash</h4>
                          <p className="text-sm text-zinc-500 font-medium leading-relaxed">
                            You earned 150 DripHunter Cash from this order. It will be credited to your wallet once the return period is over.
                          </p>
                        </div>
                      </div>
                    </div>
                  </details>
                </div>
              )}

              <button 
                onClick={handleDownloadInvoice}
                className="w-full flex items-center justify-between p-6 md:p-8 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm hover:border-[#6F4E37] dark:hover:border-[#E6C280] transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <FileDown className="w-5 h-5 text-zinc-400 group-hover:text-[#6F4E37] dark:group-hover:text-[#E6C280] transition-colors" />
                  <span className="text-sm font-bold text-zinc-950 dark:text-white">Download Invoice</span>
                </div>
                <ChevronRight className="w-5 h-5 text-zinc-400 group-hover:text-[#6F4E37] dark:group-hover:text-[#E6C280] transition-colors" />
              </button>

            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
