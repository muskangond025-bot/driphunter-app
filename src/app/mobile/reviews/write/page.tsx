"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Star, Check, Camera, X } from "lucide-react";
import AppHeader from "@/components/app-shell/AppHeader";

export default function WriteReviewPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');

  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [photos, setPhotos] = useState<string[]>([]);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (orderId) {
      const saved = localStorage.getItem('submittedReviews');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed[orderId]) {
          const data = parsed[orderId];
          setRating(data.rating || 0);
          setReviewTitle(data.reviewTitle || "");
          setReviewText(data.reviewText || "");
          setPhotos(data.photos || []);
        }
      }
    }
  }, [orderId]);

  const handleSubmit = () => {
    if (orderId) {
      const saved = localStorage.getItem('submittedReviews');
      const parsed = saved ? JSON.parse(saved) : {};
      parsed[orderId] = { rating, reviewText, reviewTitle, photos };
      localStorage.setItem('submittedReviews', JSON.stringify(parsed));
    }
    setShowPopup(true);
    setTimeout(() => {
      router.push('/mobile/orders');
    }, 1500);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        setPhotos(prev => [...prev, event.target?.result as string]);
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 dark:bg-zinc-950 font-sans pb-24">
      <AppHeader title="Write Review" variant="contextual" fallbackUrl="/mobile/orders" showActions={false} />

      <main className="flex-1 p-4 max-w-md mx-auto w-full">
        {/* Rating Section */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl mb-4 text-center shadow-sm">
          <h2 className="text-lg font-playfair font-bold text-zinc-900 dark:text-white mb-2">Rate your purchase</h2>
          <p className="text-xs text-zinc-500 mb-6">Tap the stars to rate</p>
          
          <div className="flex justify-center gap-2 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="focus:outline-none transition-transform hover:scale-110 active:scale-95"
              >
                <Star 
                  className={`w-10 h-10 transition-colors ${
                    (hoveredRating || rating) >= star 
                      ? "fill-yellow-400 text-yellow-400" 
                      : "text-zinc-200 dark:text-zinc-800 fill-transparent"
                  }`} 
                  fill={(hoveredRating || rating) >= star ? "currentColor" : "none"}
                />
              </button>
            ))}
          </div>
          <span className="text-xs font-bold text-yellow-500 uppercase tracking-widest min-h-[20px] block mt-4">
            {rating === 5 ? "Excellent!" : rating === 4 ? "Very Good" : rating === 3 ? "Average" : rating === 2 ? "Poor" : rating === 1 ? "Terrible" : ""}
          </span>
        </div>

        {/* Written Review */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-2xl mb-4 shadow-sm">
          <h3 className="text-sm font-bold text-zinc-900 dark:text-white mb-4">Add a written review</h3>
          <input
            type="text"
            placeholder="Sum up your experience in a headline"
            value={reviewTitle}
            onChange={(e) => setReviewTitle(e.target.value)}
            className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 mb-4 text-sm focus:outline-none focus:border-[#6F4E37] dark:focus:border-[#E6C280] transition-colors font-medium"
          />
          <textarea
            placeholder="What did you like or dislike? How's the fit?"
            rows={5}
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#6F4E37] dark:focus:border-[#E6C280] transition-colors resize-none mb-1"
          />
          <p className="text-[10px] text-zinc-400 text-right">{reviewText.length}/500 chars</p>
        </div>

        {/* Photo Upload */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-2xl mb-4 shadow-sm">
          <h3 className="text-sm font-bold text-zinc-900 dark:text-white mb-2">Add photos</h3>
          <p className="text-xs text-zinc-500 mb-4">Shoppers find images more helpful than text alone.</p>
          
          <div className="flex flex-wrap gap-3">
            {photos.map((photo, idx) => (
              <div key={idx} className="relative w-20 h-20 rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 group">
                <img src={photo} alt="Upload preview" className="w-full h-full object-cover" />
                <button 
                  onClick={() => removePhoto(idx)}
                  className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
            
            {photos.length < 3 && (
              <label className="w-20 h-20 rounded-xl border-2 border-dashed border-zinc-300 dark:border-zinc-700 hover:border-[#6F4E37] dark:hover:border-[#E6C280] flex flex-col items-center justify-center cursor-pointer transition-colors text-zinc-400 hover:text-[#6F4E37] dark:hover:text-[#E6C280] bg-zinc-50 dark:bg-zinc-950">
                <Camera className="w-5 h-5 mb-1" />
                <span className="text-[10px] font-bold uppercase">Upload</span>
                <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
              </label>
            )}
          </div>
        </div>

        <button 
          onClick={handleSubmit}
          disabled={rating === 0}
          className="w-full bg-[#6F4E37] dark:bg-[#E6C280] text-white dark:text-zinc-900 font-bold uppercase tracking-widest text-xs py-4 rounded-xl active:scale-[0.98] transition-transform shadow-md shadow-[#6F4E37]/20 disabled:opacity-50 disabled:active:scale-100 mt-2"
        >
          Submit Review
        </button>
      </main>

      {/* Success Popup */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white dark:bg-zinc-900 rounded-[32px] p-8 max-w-sm w-full text-center shadow-2xl scale-100 animate-in zoom-in-95 duration-300">
            <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="text-2xl font-playfair font-bold text-zinc-900 dark:text-white mb-2">Review Submitted!</h3>
            <p className="text-sm text-zinc-500 mb-6">Thank you for sharing your experience. Your feedback helps others.</p>
          </div>
        </div>
      )}
    </div>
  );
}
