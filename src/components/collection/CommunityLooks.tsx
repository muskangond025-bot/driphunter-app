"use client";

import React, { useState } from "react";
import { Heart, MessageCircle } from "lucide-react";

export default function CommunityLooks() {
  const posts = [
    {
      username: "rohit_fit",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop",
      location: "Mumbai, India",
      image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=400&auto=format&fit=crop",
      caption: "Double blackout day. Stealth heavy hoodie is thick. 🔥 #OOTD #blackout",
      likes: 184,
      comments: 12
    },
    {
      username: "sneha_kapoor",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
      location: "Delhi, India",
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=400&auto=format&fit=crop",
      caption: "Stealth cargo details. Tactical compartments are extremely handy. 🖤",
      likes: 245,
      comments: 19
    },
    {
      username: "ishan_drifts",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=150&auto=format&fit=crop",
      location: "Bangalore, India",
      image: "https://images.unsplash.com/photo-1488161628813-04466f872be2?q=80&w=400&auto=format&fit=crop",
      caption: "Eclipse low sneakers on feet today. Pure comfort and sleek lines.",
      likes: 192,
      comments: 14
    }
  ];

  const [likesState, setLikesState] = useState<Record<number, number>>({});
  const [likedState, setLikedState] = useState<Record<number, boolean>>({});

  const toggleLike = (index: number, initialLikes: number) => {
    setLikedState((prev) => {
      const liked = !prev[index];
      setLikesState((prevLikes) => ({
        ...prevLikes,
        [index]: liked ? (prevLikes[index] ?? initialLikes) + 1 : (prevLikes[index] ?? initialLikes) - 1
      }));
      return { ...prev, [index]: liked };
    });
  };

  return (
    <section className="w-full py-16 bg-background border-b border-border/40 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-purple">Spotted In Culture</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground mt-1">
            Community Looks
          </h2>
          <p className="text-sm text-muted-foreground mt-3">
            Streetwear is best defined by those who wear it. Tag @DripHunter on socials to be featured.
          </p>
        </div>

        {/* UGC Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, idx) => {
            const isLiked = !!likedState[idx];
            const displayLikes = likesState[idx] ?? post.likes;

            return (
              <div
                key={idx}
                className="group flex flex-col bg-zinc-950 border border-border rounded-2xl overflow-hidden transition-all duration-300 hover:border-zinc-800"
              >
                {/* User Header */}
                <div className="p-4 border-b border-border flex items-center gap-3">
                  <div className="h-9 w-9 overflow-hidden rounded-full border border-border">
                    <img src={post.avatar} alt={post.username} className="object-cover w-full h-full" />
                  </div>
                  <div>
                    <h4 className="text-xs font-extrabold text-foreground leading-none">{post.username}</h4>
                    <span className="text-[9px] text-muted-foreground mt-1 block font-mono">{post.location}</span>
                  </div>
                </div>

                {/* Post Image */}
                <div className="relative aspect-[1.1/1] w-full bg-zinc-900 overflow-hidden border-b border-border">
                  <img
                    src={post.image}
                    alt="Community style post"
                    className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-45" />
                </div>

                {/* Content & Socials */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {post.caption}
                  </p>

                  <div className="flex gap-4 text-xs font-bold text-muted-foreground">
                    <button
                      onClick={() => toggleLike(idx, post.likes)}
                      className={`flex items-center gap-1.5 transition-all ${
                        isLiked ? "text-brand-orange" : "hover:text-foreground"
                      }`}
                    >
                      <Heart className="h-4.5 w-4.5" fill={isLiked ? "currentColor" : "none"} />
                      <span>{displayLikes}</span>
                    </button>
                    <div className="flex items-center gap-1.5">
                      <MessageCircle className="h-4.5 w-4.5" />
                      <span>{post.comments}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
