"use client";

import React, { useState, Suspense } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ArrowLeft, Star, Send, Camera, X, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";

function ReviewContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const orderId = params.id as string;
  const itemName = searchParams.get("item") || "this item";
  const itemImage = searchParams.get("image");
  const itemBrand = searchParams.get("brand");

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return;
    
    setIsSubmitting(true);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    setIsSubmitting(false);
    setShowSuccessModal(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#faf8f5] dark:bg-[#0a0a0c] text-zinc-900 dark:text-white font-sans antialiased relative">
      <Navbar onSearchClick={() => {}} />

      <main className="flex-grow py-20 px-6 sm:px-12 md:px-16 w-full max-w-4xl mx-auto space-y-12 relative z-10">
        <div className="space-y-4">
          <Link
            href="/orders"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Orders</span>
          </Link>

          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight font-sans text-zinc-900 dark:text-white">
              Write a Review
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm font-mono max-w-xl">
              Share your thoughts on <strong className="text-zinc-900 dark:text-white">{itemName}</strong> from order #{orderId}. Your feedback helps our community of collectors.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white dark:bg-zinc-900/80 rounded-3xl p-8 sm:p-12 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-10">
          
          {/* Product Preview Section */}
          <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-zinc-100 dark:border-zinc-800/60">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shrink-0">
              {itemImage ? (
                <img src={itemImage} alt={itemName} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-zinc-400">
                  <Star className="w-8 h-8 opacity-20" />
                </div>
              )}
            </div>
            <div className="text-center sm:text-left space-y-1">
              {itemBrand && <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#6F4E37] dark:text-[#E6C280]">{itemBrand}</span>}
              <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white font-sans">{itemName}</h2>
              <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400">Order #{orderId}</p>
            </div>
          </div>

          {/* Rating Section */}
          <div className="space-y-4 text-center">
            <h3 className="text-lg font-bold font-sans text-zinc-900 dark:text-white">Overall Rating</h3>
            <div className="flex justify-center gap-2 sm:gap-4">
              {[1, 2, 3, 4, 5].map((star) => {
                const activeRating = hoverRating || rating;
                const isFilled = star <= activeRating;
                return (
                  <button
                    key={star}
                    type="button"
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(star)}
                    className="p-2 cursor-pointer transition-transform hover:scale-110 border-none bg-transparent outline-none focus:outline-none"
                  >
                    <Star 
                      className={`w-10 h-10 sm:w-12 sm:h-12 transition-all duration-300 hover:scale-110 ${
                        isFilled 
                          ? 'fill-[#D4AF37] text-[#D4AF37] dark:fill-[#E6C280] dark:text-[#E6C280] drop-shadow-[0_0_8px_rgba(212,175,55,0.5)] dark:drop-shadow-[0_0_8px_rgba(230,194,128,0.5)]' 
                          : 'text-zinc-200 dark:text-zinc-700 fill-transparent hover:fill-zinc-100 dark:hover:fill-zinc-800'
                      }`} 
                    />
                  </button>
                );
              })}
            </div>
            <p className="text-xs font-mono text-[#6F4E37] dark:text-[#E6C280] font-bold uppercase tracking-widest pt-2">
              {rating === 1 ? "Poor" : rating === 2 ? "Fair" : rating === 3 ? "Good" : rating === 4 ? "Very Good" : "Excellent"}
            </p>
          </div>

          <hr className="border-zinc-100 dark:border-zinc-800/60" />

          {/* Text Area Section */}
          <div className="space-y-4">
            <label htmlFor="review" className="block text-sm font-bold font-sans text-zinc-900 dark:text-white">
              Add a written review & photos
            </label>
            <textarea
              id="review"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="What did you like or dislike? How was the fit and quality?"
              className="w-full bg-zinc-50 dark:bg-zinc-950/50 border-2 border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 text-base font-sans text-zinc-900 dark:text-white resize-none h-40 focus:outline-none focus:border-[#6F4E37] dark:focus:border-[#E6C280] transition-colors placeholder-zinc-400 dark:placeholder-zinc-600 mb-2"
            />
            
            {/* Image Upload Area */}
            <div className="flex flex-wrap gap-4">
              {attachedImage && (
                <div className="relative w-24 h-24 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden group">
                  <img src={attachedImage} alt="Attached review photo" className="w-full h-full object-cover" />
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
                <label className="w-24 h-24 rounded-xl border-2 border-dashed border-zinc-300 dark:border-zinc-700 hover:border-[#6F4E37] dark:hover:border-[#E6C280] flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors bg-zinc-50 dark:bg-zinc-950/50 text-zinc-500 hover:text-[#6F4E37] dark:hover:text-[#E6C280]">
                  <Camera className="w-6 h-6" />
                  <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-center px-2">Add Photo</span>
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
              )}
            </div>
          </div>

          {/* Submit Section */}
          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={rating === 0 || isSubmitting}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-xs font-mono font-bold uppercase tracking-widest bg-[#6F4E37] hover:bg-[#583e2b] dark:bg-[#E6C280] dark:hover:bg-[#d4b06c] text-white dark:text-zinc-950 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer border-none shadow-md"
            >
              <span>{isSubmitting ? "Submitting..." : "Submit Review"}</span>
              {!isSubmitting && <Send className="w-4 h-4" />}
            </button>
          </div>
        </form>
      </main>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300 pointer-events-none">
          <div className="bg-white dark:bg-zinc-900 rounded-[32px] w-full max-w-sm p-8 text-center shadow-2xl border border-zinc-200 dark:border-zinc-800 animate-in zoom-in-95 duration-300 pointer-events-auto">
            <div className="w-20 h-20 mx-auto bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="text-2xl font-black uppercase tracking-tight font-sans text-zinc-900 dark:text-white mb-2">
              Review Submitted
            </h3>
            <p className="text-sm font-mono text-zinc-500 dark:text-zinc-400 mb-8">
              Your feedback for {itemName} has been successfully received. Thank you for helping our community!
            </p>
            <button
              onClick={() => router.push("/orders")}
              className="w-full py-4 rounded-full text-xs font-mono font-bold uppercase tracking-widest bg-[#6F4E37] dark:bg-[#E6C280] text-white dark:text-zinc-900 hover:bg-[#583e2b] dark:hover:bg-[#d4b06c] transition-colors border-none shadow-md cursor-pointer"
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

export default function ReviewOrderPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#faf8f5] dark:bg-[#0a0a0c]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#6F4E37] dark:border-[#E6C280]"></div>
      </div>
    }>
      <ReviewContent />
    </Suspense>
  );
}
