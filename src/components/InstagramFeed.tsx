"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Instagram, ArrowRight, CheckCircle2, ChevronRight, Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface InstaPost {
  id: string;
  user: string;
  avatar: string;
  location: string;
  image?: string;
  video?: string;
  likes: string;
  caption: string;
  time: string;
  isReel?: boolean;
}

const posts: InstaPost[] = [
  {
    id: "insta-1",
    user: "street_culture",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
    location: "Milan, Italy",
    image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=500&q=80",
    likes: "1,420",
    caption: "Transitioning into premium autumn knits. Full editorial collection live on site.",
    time: "2 HOURS AGO"
  },
  {
    id: "insta-2",
    user: "drip_finder",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
    location: "Paris, France",
    video: "https://www.shutterstock.com/shutterstock/videos/1107797059/preview/stock-footage-vertical-video-young-beautiful-smiling-hipster-woman-in-trendy-summer-red-top-and-skirt-clothes.webm",
    likes: "3,112",
    caption: "Active street layers in our classic collection. Captured on film in the alleys of Paris.",
    time: "4 HOURS AGO",
    isReel: true
  },
  {
    id: "insta-3",
    user: "cargo_heir",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80",
    location: "Tokyo, Japan",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=500&q=80",
    likes: "982",
    caption: "Oversized silhouette balancing, cataloged on the streets of Shibuya.",
    time: "1 DAY AGO"
  },
  {
    id: "insta-4",
    user: "urban_grail",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=100&q=80",
    location: "New York, USA",
    video: "https://www.shutterstock.com/shutterstock/videos/1109719157/preview/stock-footage-close-up-portrait-of-a-young-luxurious-sexy-woman-looking-at-the-camera-on-a-white-background.webm",
    likes: "4,821",
    caption: "Luxury minimalism: close-up details from our upcoming winter showroom.",
    time: "2 DAYS AGO",
    isReel: true
  },
  {
    id: "insta-5",
    user: "kick_grails",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80",
    location: "London, UK",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80",
    likes: "2,840",
    caption: "Close-up detailing on our retro leather sneakers. Restock drops this Friday.",
    time: "3 DAYS AGO"
  },
  {
    id: "insta-6",
    user: "model_runway",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80",
    location: "Berlin, Germany",
    video: "https://assets.mixkit.co/videos/preview/mixkit-fashion-model-showing-off-a-streetwear-outfit-40019-large.mp4",
    likes: "1,732",
    caption: "Active street motion. Showcasing cargo fits and oversized layers.",
    time: "4 DAYS AGO",
    isReel: true
  },
  {
    id: "insta-7",
    user: "yellow_vibes",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
    location: "Sydney, Australia",
    video: "https://www.shutterstock.com/shutterstock/videos/1106556601/preview/stock-footage-vertical-video-young-beautiful-smiling-woman-in-trendy-summer-yellow-dress-clothes-sexy-carefree.webm",
    likes: "3,490",
    caption: "Sunny vibes in summer yellow collections. Live on stage in Sydney.",
    time: "5 DAYS AGO",
    isReel: true
  },
  {
    id: "insta-8",
    user: "bloggers_diary",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80",
    location: "Los Angeles, USA",
    video: "https://www.shutterstock.com/shutterstock/videos/3483336041/preview/stock-footage-vertical-shot-pretty-female-blogger-taking-hand.webm",
    likes: "5,120",
    caption: "Behind the scenes with our premium leather saddlebags. Blogger diaries on the road.",
    time: "1 WEEK AGO",
    isReel: true
  }
];

export default function InstagramFeed({ basePath = "" }: { basePath?: string }) {
  const { ref, isVisible } = useScrollAnimation();
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});
  const [savedPosts, setSavedPosts] = useState<Record<string, boolean>>({});
  const [videoErrors, setVideoErrors] = useState<Record<string, boolean>>({});
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Modal States (Store the unique key of the post to show overlay on the exact card)
  const [activeCommentPost, setActiveCommentPost] = useState<string | null>(null);
  const [activeOptionsPost, setActiveOptionsPost] = useState<string | null>(null);
  const [activeSharePost, setActiveSharePost] = useState<string | null>(null);

  const toggleLike = (postId: string) => {
    setLikedPosts((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  const toggleSave = (postId: string) => {
    setSavedPosts((prev) => {
      const isSaved = !prev[postId];
      showToast(isSaved ? 'Saved to collections' : 'Removed from collections');
      return { ...prev, [postId]: isSaved };
    });
  };

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setActiveSharePost(null);
    setActiveOptionsPost(null);
    showToast("Link copied to clipboard!");
  };

  const handleOptionClick = (msg: string) => {
    setActiveOptionsPost(null);
    showToast(msg);
  };

  return (
    <section className="bg-white dark:bg-zinc-950 text-black dark:text-white py-16 border-t border-zinc-100 dark:border-zinc-900 select-none overflow-hidden relative">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-[60] bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 px-5 py-3 rounded-2xl font-mono text-xs font-bold shadow-2xl flex items-center gap-2.5 border border-white/10 animate-fade-in" style={{ animation: "fadeIn 0.3s ease-out" }}>
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMsg}</span>
        </div>
      )}


      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Premium Editorial Header */}
      <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 mb-8">
        <div className="border-b border-zinc-150 dark:border-zinc-800/80 pb-5">
          <SectionHeading
            variant="playfair"
            className="text-zinc-900 dark:text-zinc-100"
            title={<>Instagram <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280]">Feed</span></>}
            eyebrow={
              <span className="text-[10px] md:text-xs font-semibold tracking-[0.3em] text-[#6F4E37] dark:text-[#E6C280] uppercase block mb-3 font-mono">
                Social Corner
              </span>
            }
            action={
              <div className="flex flex-col gap-2 md:max-w-xs lg:max-w-md">
                <div className="h-[1px] w-12 bg-[#6F4E37] hidden md:block mb-2" />
                <p className="text-xs md:text-sm text-zinc-400 font-sans font-light leading-relaxed">
                  Tag us on social media using <span className="font-semibold text-zinc-800">#drip_finder</span> to get featured in our curated showroom.
                </p>
              </div>
            }
          />
        </div>
      </div>

      {/* Scrolling Track of Instagram Post Cards */}
      <div
        ref={ref}
        className={`w-full transition-all duration-1000 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="flex overflow-x-auto scrollbar-none snap-x snap-mandatory gap-4 md:gap-6 py-4 px-4 md:px-6 scroll-p-4 md:scroll-p-6 w-full">
          {(basePath === "/mobile" ? posts : [...posts, ...posts]).map((post, idx) => {
            const postKey = `${post.id}-${idx}`;
            const isLiked = likedPosts[post.id];
            const isSaved = savedPosts[post.id];

            return (
              <div
                key={postKey}
                className={`${basePath === "/mobile" ? "w-[80vw] max-w-[300px]" : "w-[80vw] max-w-[300px] md:max-w-none md:w-72 sm:w-80"} shrink-0 snap-center bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-3xl overflow-hidden flex flex-col justify-between shadow-[0_4px_15px_rgba(0,0,0,0.01)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.04)] hover:-translate-y-1.5 transition-all duration-500 group relative`}
              >
                {/* --- INLINE OVERLAYS --- */}
                {activeOptionsPost === postKey && (
                  <div className="absolute inset-0 z-50 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md flex flex-col text-center justify-center animate-fade-in p-4">
                    <button onClick={() => handleOptionClick('Post Reported')} className="py-3 font-bold text-red-500 border-b border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">Report</button>
                    <button onClick={() => handleOptionClick('Unfollowed User')} className="py-3 font-bold text-red-500 border-b border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">Unfollow</button>
                    <button onClick={() => handleOptionClick('Navigating to post...')} className="py-3 text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">Go to post</button>
                    <button onClick={handleCopyLink} className="py-3 text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">Copy link</button>
                    <button onClick={() => setActiveOptionsPost(null)} className="py-3 text-zinc-500 font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors mt-2 rounded-xl border border-zinc-200 dark:border-zinc-800">Cancel</button>
                  </div>
                )}

                {activeSharePost === postKey && (
                  <div className="absolute inset-0 z-50 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md flex flex-col animate-fade-in p-5">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="font-bold text-base text-zinc-900 dark:text-white">Share</h3>
                      <button onClick={() => setActiveSharePost(null)} className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                      </button>
                    </div>
                    <div className="grid grid-cols-3 gap-3 mb-6">
                      <div className="flex flex-col items-center gap-1.5 cursor-pointer hover:opacity-70 transition-opacity">
                        <div className="w-10 h-10 rounded-full bg-[#25D366]/10 flex items-center justify-center text-[#25D366]">
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
                        </div>
                        <span className="text-[9px] font-mono text-zinc-600 dark:text-zinc-400">WhatsApp</span>
                      </div>
                      <div className="flex flex-col items-center gap-1.5 cursor-pointer hover:opacity-70 transition-opacity">
                        <div className="w-10 h-10 rounded-full bg-[#1DA1F2]/10 flex items-center justify-center text-[#1DA1F2]">
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                        </div>
                        <span className="text-[9px] font-mono text-zinc-600 dark:text-zinc-400">Twitter</span>
                      </div>
                      <div className="flex flex-col items-center gap-1.5 cursor-pointer hover:opacity-70 transition-opacity">
                        <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-900 dark:text-white">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                        </div>
                        <span className="text-[9px] font-mono text-zinc-600 dark:text-zinc-400">Email</span>
                      </div>
                    </div>
                    <div className="flex border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden mt-auto">
                      <input type="text" readOnly value="https://driphunter.com/p/..." className="flex-grow bg-zinc-50 dark:bg-zinc-800/50 px-3 py-2 text-xs text-zinc-500 outline-none" />
                      <button onClick={handleCopyLink} className="bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 px-4 py-2 text-xs font-bold hover:bg-[#6F4E37] transition-colors">Copy</button>
                    </div>
                  </div>
                )}

                {activeCommentPost === postKey && (
                  <div className="absolute inset-0 z-50 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md flex flex-col animate-fade-in rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800">
                    <div className="flex justify-between items-center p-4 border-b border-zinc-200 dark:border-zinc-800">
                      <h3 className="font-bold text-sm text-zinc-900 dark:text-white">Comments</h3>
                      <button onClick={() => setActiveCommentPost(null)} className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></button>
                    </div>
                    <div className="flex-grow overflow-y-auto p-4 space-y-4">
                      <div className="flex gap-3">
                        <Image src={post.avatar} alt="Avatar" width={24} height={24} className="rounded-full w-6 h-6 object-cover" />
                        <div>
                          <span className="font-bold text-xs text-zinc-900 dark:text-white mr-1.5">{post.user}</span>
                          <span className="text-xs text-zinc-800 dark:text-zinc-300">{post.caption}</span>
                          <div className="text-[9px] text-zinc-400 mt-1 uppercase">{post.time}</div>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="w-6 h-6 rounded-full bg-zinc-200 dark:bg-zinc-800 shrink-0" />
                        <div>
                          <span className="font-bold text-xs text-zinc-900 dark:text-white mr-1.5">sneaker_head99</span>
                          <span className="text-xs text-zinc-800 dark:text-zinc-300">Need this drop ASAP! 🔥🔥</span>
                          <div className="text-[9px] text-zinc-400 mt-1 uppercase">1h</div>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 border-t border-zinc-200 dark:border-zinc-800 flex gap-2 items-center bg-zinc-50 dark:bg-zinc-900/50">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#6F4E37] to-[#C5A880] shrink-0" />
                      <input type="text" placeholder="Add a comment..." className="flex-grow bg-transparent text-xs outline-none text-zinc-900 dark:text-white placeholder-zinc-400" />
                      <button onClick={() => showToast('Comment posted!')} className="text-[#6F4E37] dark:text-[#E6C280] font-bold text-xs">Post</button>
                    </div>
                  </div>
                )}

                {/* Post Header */}
                <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-800">
                  <div className="flex items-center gap-3">
                    {/* circular avatar with pink gradient ring */}
                    <div className="w-8 h-8 rounded-full p-[1.5px] bg-gradient-to-tr from-yellow-450 via-pink-500 to-purple-600">
                      <div className="w-full h-full rounded-full border border-white dark:border-zinc-900 overflow-hidden relative">
                        <Image
                          alt={post.user}
                          src={post.avatar}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-xs sm:text-[13px] font-bold text-zinc-900 dark:text-zinc-100 leading-tight">
                        {post.user}
                      </span>
                      <span className="text-[10px] sm:text-[11px] text-zinc-400 font-light">
                        {post.location}
                      </span>
                    </div>
                  </div>
                  <button onClick={() => setActiveOptionsPost(postKey)} className="text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors border-none bg-transparent cursor-pointer">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>

                {/* Post Media Wrapper */}
                <div className="relative w-full aspect-square bg-zinc-50 dark:bg-zinc-800 overflow-hidden select-none">
                  {post.video && !videoErrors[post.id] ? (
                    <video
                      src={post.video}
                      autoPlay
                      loop
                      muted
                      playsInline
                      onError={() => setVideoErrors((prev: Record<string, boolean>) => ({ ...prev, [post.id]: true }))}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                    />
                  ) : (
                    <Image
                      alt={post.user}
                      src={post.image || "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=500&q=80"}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-103"
                      sizes="(max-width: 640px) 100vw, 25vw"
                    />
                  )}
                  {/* Floating Reel / Video badge */}
                  {post.isReel && (
                    <div className="absolute top-3 right-3 z-10 bg-black/40 backdrop-blur-md text-white text-[8px] font-bold tracking-wider px-2 py-0.5 rounded-full uppercase">
                      Reel
                    </div>
                  )}
                </div>

                {/* Post Interaction bar */}
                <div className="p-4 flex flex-col gap-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {/* Heart icon button */}
                      <button
                        onClick={() => toggleLike(post.id)}
                        className="text-zinc-700 dark:text-zinc-300 hover:text-red-500 dark:hover:text-red-500 transition-colors border-none bg-transparent cursor-pointer p-0"
                      >
                        <Heart
                          className={`w-5 h-5 transition-colors ${
                            isLiked ? "text-red-500" : ""
                          }`}
                          fill={isLiked ? "#ef4444" : "none"}
                        />
                      </button>
                      {/* Comment icon button */}
                      <button onClick={() => setActiveCommentPost(postKey)} className="text-zinc-700 dark:text-zinc-300 hover:text-[#6F4E37] dark:hover:text-[#E6C280] transition-colors border-none bg-transparent cursor-pointer p-0">
                        <MessageCircle className="w-5 h-5" />
                      </button>
                      {/* Share icon button */}
                      <button onClick={() => setActiveSharePost(postKey)} className="text-zinc-700 dark:text-zinc-300 hover:text-[#6F4E37] dark:hover:text-[#E6C280] transition-colors border-none bg-transparent cursor-pointer p-0">
                        <Send className="w-4.5 h-4.5" />
                      </button>
                    </div>
                    {/* Save bookmark button */}
                    <button onClick={() => toggleSave(post.id)} className="text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors border-none bg-transparent cursor-pointer p-0">
                      <Bookmark 
                        className={`w-5 h-5 transition-colors ${
                          isSaved ? "text-zinc-950 dark:text-white" : ""
                        }`}
                        fill={isSaved ? "currentColor" : "none"}
                      />
                    </button>
                  </div>

                  {/* Likes count */}
                  <span className="text-xs sm:text-[13px] font-bold text-zinc-950 dark:text-white text-left">
                    {post.likes} likes
                  </span>

                  {/* Caption */}
                  <p className="text-xs sm:text-[13px] text-zinc-800 dark:text-zinc-300 text-left leading-relaxed">
                    <span className="font-bold text-zinc-950 dark:text-white mr-1.5">
                      {post.user}
                    </span>
                    {post.caption}
                  </p>

                  {/* Time */}
                  <span className="text-[9px] sm:text-[10px] text-zinc-400 font-mono tracking-wider text-left uppercase">
                    {post.time}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
