"use client";

import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ArrowLeft, PackageX, Camera, X, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

export default function CancelOrderPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.id as string;

  const [cancelReason, setCancelReason] = useState("");
  const [otherReason, setOtherReason] = useState("");
  const [attachedImage, setAttachedImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setAttachedImage(event.target?.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleCancel = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cancelReason) return;
    if (cancelReason === "Other" && !otherReason.trim()) return;
    
    setIsSubmitting(true);
    // Simulate API request
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Save to local storage for demo
    const cancelledOrders = JSON.parse(localStorage.getItem("drip_cancelled_orders") || "[]");
    if (!cancelledOrders.includes(orderId)) {
      cancelledOrders.push(orderId);
      localStorage.setItem("drip_cancelled_orders", JSON.stringify(cancelledOrders));
    }

    setIsSubmitting(false);
    setShowSuccessModal(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#faf8f5] dark:bg-[#0a0a0c] text-zinc-900 dark:text-white font-sans antialiased">
      <Navbar onSearchClick={() => {}} />

      <main className="flex-grow py-20 px-6 sm:px-12 md:px-16 w-full max-w-4xl mx-auto space-y-12">
        <div className="space-y-4">
          <Link
            href="/orders"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Orders</span>
          </Link>

          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight font-sans flex items-center gap-4">
              <PackageX className="w-10 h-10 text-red-600 dark:text-red-500" />
              Cancel Order
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm font-mono max-w-xl">
              You are requesting to cancel order <strong className="text-zinc-900 dark:text-white">#{orderId}</strong>. Please note that this action cannot be undone.
            </p>
          </div>
        </div>

        <form onSubmit={handleCancel} className="bg-white dark:bg-zinc-900/80 rounded-3xl p-8 sm:p-12 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-8">
          <div>
            <h3 className="text-xl font-bold font-sans text-zinc-900 dark:text-white mb-6">Why are you cancelling?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {["Found a better price", "Changed my mind", "Expected delivery is too long", "Ordered by mistake", "Forgot to apply promo code", "Other"].map((reason) => (
                <label 
                  key={reason} 
                  className={`flex items-start gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                    cancelReason === reason 
                      ? 'border-[#6F4E37] bg-[#6F4E37]/5 dark:border-[#E6C280] dark:bg-[#E6C280]/5' 
                      : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 bg-transparent'
                  }`}
                  onClick={() => setCancelReason(reason)}
                >
                  <div className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    cancelReason === reason ? 'border-[#6F4E37] dark:border-[#E6C280]' : 'border-zinc-300 dark:border-zinc-700'
                  }`}>
                    {cancelReason === reason && <div className="w-2.5 h-2.5 rounded-full bg-[#6F4E37] dark:bg-[#E6C280]" />}
                  </div>
                  <span className="text-sm font-sans font-medium text-zinc-800 dark:text-zinc-200 leading-snug">{reason}</span>
                </label>
              ))}
            </div>
            
            {cancelReason === "Other" && (
              <div className="mt-6 space-y-4 animate-in fade-in slide-in-from-top-2">
                <label htmlFor="otherReason" className="block text-sm font-bold font-sans text-zinc-900 dark:text-white">
                  Please specify the reason
                </label>
                <textarea
                  id="otherReason"
                  value={otherReason}
                  onChange={(e) => setOtherReason(e.target.value)}
                  placeholder="e.g., Product arrived damaged, missing parts, etc."
                  className="w-full bg-zinc-50 dark:bg-zinc-950/50 border-2 border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 text-sm font-sans text-zinc-900 dark:text-white resize-none h-24 focus:outline-none focus:border-red-500 dark:focus:border-red-500 transition-colors placeholder-zinc-400 dark:placeholder-zinc-600"
                />
                
                <div className="space-y-2">
                  <span className="block text-sm font-bold font-sans text-zinc-900 dark:text-white">
                    Upload Image (Optional if damaged)
                  </span>
                  <div className="flex flex-wrap gap-4">
                    {attachedImage && (
                      <div className="relative w-20 h-20 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden group">
                        <img src={attachedImage} alt="Attached damage photo" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                          <button 
                            type="button" 
                            onClick={() => setAttachedImage(null)}
                            className="p-1.5 bg-red-500 text-white rounded-full hover:scale-110 transition-transform border-none cursor-pointer"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}
                    
                    {!attachedImage && (
                      <label className="w-20 h-20 rounded-xl border-2 border-dashed border-zinc-300 dark:border-zinc-700 hover:border-red-500 dark:hover:border-red-500 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors bg-zinc-50 dark:bg-zinc-950/50 text-zinc-500 hover:text-red-500 dark:hover:text-red-500">
                        <Camera className="w-6 h-6" />
                        <span className="text-[8px] font-mono font-bold uppercase tracking-widest text-center px-1">Add Photo</span>
                        <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                      </label>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-wrap gap-4 items-center justify-end">
            <Link
              href="/orders"
              className="px-8 py-4 rounded-full text-xs font-mono font-bold uppercase tracking-widest border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
            >
              Keep Order
            </Link>
            <button
              type="submit"
              disabled={!cancelReason || (cancelReason === "Other" && !otherReason.trim()) || isSubmitting}
              className="px-8 py-4 rounded-full text-xs font-mono font-bold uppercase tracking-widest bg-red-600 hover:bg-red-700 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer border-none shadow-md"
            >
              {isSubmitting ? "Processing..." : "Confirm Cancellation"}
            </button>
          </div>
        </form>
      </main>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white dark:bg-zinc-900 rounded-[32px] w-full max-w-sm p-8 text-center shadow-2xl border border-zinc-200 dark:border-zinc-800 animate-in zoom-in-95 duration-300">
            <div className="w-20 h-20 mx-auto bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="text-2xl font-black uppercase tracking-tight font-sans text-zinc-900 dark:text-white mb-2">
              Cancellation Confirmed
            </h3>
            <p className="text-sm font-mono text-zinc-500 dark:text-zinc-400 mb-8">
              Your order #{orderId} has been successfully cancelled. A confirmation email will be sent shortly.
            </p>
            <button
              onClick={() => router.push("/orders")}
              className="w-full py-4 rounded-full text-xs font-mono font-bold uppercase tracking-widest bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors border-none shadow-md cursor-pointer"
            >
              Back to Orders
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
