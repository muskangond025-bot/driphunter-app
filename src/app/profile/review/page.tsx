"use client";

import React, { useState, useRef, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Star, Camera, ChevronRight, X, Check, Edit3 } from "lucide-react";

function ReviewPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');

  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [reviewTitle, setReviewTitle] = useState("");
  const [photos, setPhotos] = useState<string[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [isEditing, setIsEditing] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (orderId) {
      const saved = localStorage.getItem('submittedReviews');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed[orderId]) {
          const data = parsed[orderId];
          setRating(data.rating || 0);
          setReviewText(data.reviewText || "");
          setReviewTitle(data.reviewTitle || "");
          setPhotos(data.photos || []);
          setIsEditing(false);
        }
      }
    }
  }, [orderId]);

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

  const handleSubmit = () => {
    if (orderId) {
      const saved = localStorage.getItem('submittedReviews');
      const parsed = saved ? JSON.parse(saved) : {};
      parsed[orderId] = { rating, reviewText, reviewTitle, photos };
      localStorage.setItem('submittedReviews', JSON.stringify(parsed));
    }
    setShowPopup(true);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative">
      <Navbar onSearchClick={() => {}} />

      <main className="flex-grow bg-zinc-50 dark:bg-zinc-950 pb-16 pt-8 relative">
        {/* Header Block */}
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 mb-8">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-500 mb-6">
            <span className="hover:text-zinc-950 dark:hover:text-white cursor-pointer transition-colors" onClick={() => router.push('/')}>Home</span>
            <ChevronRight className="w-4 h-4" />
            <span className="hover:text-zinc-950 dark:hover:text-white cursor-pointer transition-colors" onClick={() => router.push('/profile')}>My Account</span>
            <ChevronRight className="w-4 h-4" />
            <span className="hover:text-zinc-950 dark:hover:text-white cursor-pointer transition-colors" onClick={() => router.push('/orders')}>Orders</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-zinc-950 dark:text-white">Review</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h1 className="text-3xl md:text-5xl font-chaney-title uppercase tracking-tight text-zinc-950 dark:text-white">
              Drop a <span className="text-[#6F4E37] dark:text-[#E6C280]">Review</span>
            </h1>

            <div className="flex items-center gap-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 shadow-sm">
              <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-950 rounded-lg flex items-center justify-center p-2">
                <img 
                  src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=400&q=80" 
                  alt="Product" 
                  className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal" 
                />
              </div>
              <div className="pr-4">
                <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Neo-Step</p>
                <p className="text-sm font-chaney-title uppercase text-zinc-950 dark:text-white truncate max-w-[150px]">
                  Midnight Eclipse Low
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Content Block */}
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 flex flex-col md:flex-row gap-8">
          
          {/* LEFT SIDEBAR - Guidelines */}
          <div className="w-full md:w-[320px] flex-shrink-0 space-y-6">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm h-max">
              <div className="p-6 border-b border-zinc-100 dark:border-zinc-800">
                <h2 className="text-xl font-chaney-title uppercase tracking-wider text-zinc-950 dark:text-white">Review Guide</h2>
              </div>
              <div className="p-6 border-b border-zinc-100 dark:border-zinc-800">
                <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Have you worn it?</h3>
                <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed font-medium">
                  Your review should be about your authentic experience with the fit, quality, and feel.
                </p>
              </div>
              <div className="p-6 border-b border-zinc-100 dark:border-zinc-800">
                <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Why drop a review?</h3>
                <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed font-medium">
                  Help the community decide if this piece is worth copping. Your feedback shapes the culture.
                </p>
              </div>
              <div className="p-6">
                <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Need help?</h3>
                <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed font-medium">
                  If there's an issue with the drop, reach out to our <span className="text-[#6F4E37] dark:text-[#E6C280] font-bold cursor-pointer hover:underline transition-all">Support Team</span> before reviewing.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT MAIN CONTENT - Form */}
          <div className="flex-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm overflow-hidden relative">
            
            {/* Rating Section */}
            <div className="p-8 border-b border-zinc-100 dark:border-zinc-800">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-chaney-title uppercase text-zinc-950 dark:text-white">Rate Your Cop</h2>
                {!isEditing && (
                  <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#6F4E37] dark:text-[#E6C280] hover:opacity-80 transition-colors">
                    <Edit3 className="w-4 h-4" /> Edit Review
                  </button>
                )}
              </div>
              <div className="flex gap-4">
                {[1, 2, 3, 4, 5].map((star) => {
                  const isFilled = hoveredRating ? hoveredRating >= star : rating >= star;
                  return (
                    <Star 
                      key={star} 
                      className={`w-10 h-10 ${isEditing ? 'cursor-pointer transition-all duration-300 hover:scale-110' : ''} ${
                        isFilled 
                          ? 'text-[#E6C280] drop-shadow-[0_0_8px_rgba(230,194,128,0.5)]' 
                          : 'text-zinc-200 dark:text-zinc-800'
                      }`}
                      fill={isFilled ? "currentColor" : "none"}
                      onMouseEnter={() => isEditing && setHoveredRating(star)}
                      onMouseLeave={() => isEditing && setHoveredRating(0)}
                      onClick={() => isEditing && setRating(star)}
                    />
                  );
                })}
              </div>
            </div>

            {/* Review Section */}
            <div className="p-8">
              <h2 className="text-lg font-chaney-title uppercase text-zinc-950 dark:text-white mb-6">Write a Review</h2>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest block">Description</label>
                  <textarea 
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    disabled={!isEditing}
                    placeholder="Tell us what you think..." 
                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 text-sm text-zinc-950 dark:text-white outline-none resize-none min-h-[140px] focus:border-zinc-950 dark:focus:border-white transition-all focus:ring-1 focus:ring-zinc-950 dark:focus:ring-white font-medium placeholder:text-zinc-400 disabled:opacity-70 disabled:cursor-not-allowed"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest block">Title (optional)</label>
                  <input 
                    type="text" 
                    value={reviewTitle}
                    onChange={(e) => setReviewTitle(e.target.value)}
                    disabled={!isEditing}
                    placeholder="Summarize your thoughts..." 
                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 text-sm text-zinc-950 dark:text-white outline-none focus:border-zinc-950 dark:focus:border-white transition-all focus:ring-1 focus:ring-zinc-950 dark:focus:ring-white font-medium placeholder:text-zinc-400 disabled:opacity-70 disabled:cursor-not-allowed"
                  />
                </div>

                <div className="space-y-2 pt-2">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest block">Photos</label>
                  <div className="flex gap-4 flex-wrap">
                    {/* Render uploaded photos */}
                    {photos.map((photo, i) => (
                      <div key={i} className="relative w-24 h-24 rounded-xl overflow-hidden group border border-zinc-200 dark:border-zinc-800">
                        <img src={photo} alt="Preview" className="w-full h-full object-cover" />
                        {isEditing && (
                          <button 
                            onClick={() => removePhoto(i)} 
                            className="absolute top-1.5 right-1.5 bg-black/60 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    ))}
                    
                    {/* Upload Button */}
                    {isEditing && (
                      <div 
                        onClick={() => fileInputRef.current?.click()}
                        className="w-24 h-24 bg-zinc-50 dark:bg-zinc-950 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-[#6F4E37] dark:hover:border-[#E6C280] hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all group"
                      >
                        <Camera className="w-6 h-6 text-zinc-400 group-hover:text-[#6F4E37] dark:group-hover:text-[#E6C280] mb-2" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 group-hover:text-[#6F4E37] dark:group-hover:text-[#E6C280]">Upload</span>
                      </div>
                    )}
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      className="hidden" 
                      accept="image/*" 
                      onChange={handlePhotoUpload} 
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Section */}
            {isEditing && (
              <div className="p-8 pt-0 flex justify-end">
                <button 
                  onClick={handleSubmit}
                  className="bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200 font-bold text-xs uppercase tracking-widest px-10 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={rating === 0}
                >
                  Save Review
                </button>
              </div>
            )}

          </div>

        </div>

        {/* Pop-up (No backdrop blur, fixed center) */}
        {showPopup && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 shadow-2xl z-50 flex flex-col items-center max-w-[400px] w-[90%] text-center">
            <button onClick={() => setShowPopup(false)} className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mb-6">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-chaney-title uppercase text-zinc-950 dark:text-white mb-2">Thank You</h3>
            <p className="text-sm font-medium text-zinc-500 mb-8 leading-relaxed">Your review has been successfully submitted and is under moderation.</p>
            <button onClick={() => router.push('/orders')} className="bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 px-8 py-3 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors w-full">
              Back to Orders
            </button>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}

export default function ReviewPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background text-foreground" />}>
      <ReviewPageContent />
    </Suspense>
  );
}
