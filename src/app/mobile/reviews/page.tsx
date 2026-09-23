"use client";

import React, { useState, useEffect } from "react";
import AppHeader from "@/components/app-shell/AppHeader";
import AppPageLayout from "@/components/app-shell/AppPageLayout";
import { Star, Trash2, Edit3 } from "lucide-react";
import { useRouter } from "next/navigation";

type Review = {
  rating: number;
  reviewTitle: string;
  reviewText: string;
  photos: string[];
};

export default function MobileReviewsPage() {
  const router = useRouter();
  const [reviews, setReviews] = useState<Record<string, Review>>({});

  useEffect(() => {
    const saved = localStorage.getItem('submittedReviews');
    if (saved) {
      setReviews(JSON.parse(saved));
    }
  }, []);

  const handleDelete = (orderId: string) => {
    const updated = { ...reviews };
    delete updated[orderId];
    setReviews(updated);
    localStorage.setItem('submittedReviews', JSON.stringify(updated));
  };

  const reviewEntries = Object.entries(reviews);

  return (
    <AppPageLayout hasBottomNav={false} className="bg-zinc-50 dark:bg-zinc-950">
      <AppHeader showActions={true}
        variant="contextual"
        title="My Reviews"
        fallbackUrl="/mobile/account"
      />
      
      <div className="flex-1 overflow-y-auto px-4 py-6 pb-24 max-w-md mx-auto w-full">
        {reviewEntries.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-900 rounded-full flex items-center justify-center mb-4">
              <Star className="w-8 h-8 text-zinc-400" />
            </div>
            <h2 className="text-lg font-playfair font-bold text-zinc-900 dark:text-white mb-2">No Reviews Yet</h2>
            <p className="text-sm text-zinc-500 mb-6 px-4">You haven't reviewed any products yet. Share your experience with others by reviewing past orders!</p>
            <button 
              onClick={() => router.push('/mobile/orders')}
              className="bg-[#6F4E37] dark:bg-[#E6C280] text-white dark:text-zinc-900 font-bold uppercase tracking-widest text-xs px-8 py-3 rounded-xl"
            >
              Go to Orders
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {reviewEntries.map(([orderId, review]) => (
              <div key={orderId} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className={`w-3.5 h-3.5 ${s <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-zinc-200 dark:text-zinc-700 fill-transparent"}`} fill={s <= review.rating ? "currentColor" : "none"} />
                    ))}
                  </div>
                  <span className="text-[10px] text-zinc-400 font-mono tracking-widest">ORDER: {orderId.slice(-6)}</span>
                </div>
                
                {review.reviewTitle && <h3 className="text-sm font-bold text-zinc-900 dark:text-white mb-1">{review.reviewTitle}</h3>}
                {review.reviewText && <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">{review.reviewText}</p>}
                
                {review.photos && review.photos.length > 0 && (
                  <div className="flex gap-2 mb-4 overflow-x-auto pb-1 scrollbar-hide">
                    {review.photos.map((p, i) => (
                      <img key={i} src={p} alt="Review" className="w-14 h-14 object-cover rounded-lg flex-shrink-0 border border-zinc-200 dark:border-zinc-800" />
                    ))}
                  </div>
                )}
                
                <div className="flex justify-end gap-3 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                  <button 
                    onClick={() => handleDelete(orderId)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest text-rose-500 bg-rose-50 dark:bg-rose-900/20 active:scale-95 transition-transform"
                  >
                    <Trash2 className="w-3 h-3" /> Cancel
                  </button>
                  <button 
                    onClick={() => router.push(`/mobile/reviews/write?orderId=${orderId}`)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 active:scale-95 transition-transform"
                  >
                    <Edit3 className="w-3 h-3" /> Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppPageLayout>
  );
}
