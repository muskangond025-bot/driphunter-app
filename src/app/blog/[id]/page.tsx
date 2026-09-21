"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SearchOverlay from "@/components/layout/SearchOverlay";
import {
  BookOpen,
  Calendar,
  Clock,
  ArrowLeft,
  Search,
  Tag,
  User,
  X,
  ChevronRight,
  Bookmark,
  Sparkles,
  Heart,
  MessageCircle,
  Send,
  Share2,
  Check
} from "lucide-react";
import { BLOG_POSTS, PRESEEDED_COMMENTS, BlogPost, Comment } from "../page";

export default function BlogPostDetailPage() {
  const params = useParams();
  const router = useRouter();
  const postId = params?.id as string;

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [post, setPost] = useState<BlogPost | null>(null);

  // Bookmarks state (persisted in localStorage)
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);

  // Comments state
  const [commentsMap, setCommentsMap] = useState<Record<string, Comment[]>>(PRESEEDED_COMMENTS);
  const [newCommentName, setNewCommentName] = useState("");
  const [newCommentText, setNewCommentText] = useState("");

  // Toast notifications for bookmarks or share
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  useEffect(() => {
    if (postId) {
      const foundPost = BLOG_POSTS.find((p) => p.id === postId);
      if (foundPost) {
        setPost(foundPost);
      } else {
        // Redirect to blog if post not found
        router.push("/blog");
      }
    }
  }, [postId, router]);

  useEffect(() => {
    // Load bookmarks from local storage
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("drip_blog_bookmarks");
      if (stored) {
        try {
          setBookmarkedIds(JSON.parse(stored));
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, []);

  const handleToggleBookmark = (id: string, title: string) => {
    let updated;
    if (bookmarkedIds.includes(id)) {
      updated = bookmarkedIds.filter((item) => item !== id);
      triggerToast(`Removed "${title}" from bookmarks.`);
    } else {
      updated = [...bookmarkedIds, id];
      triggerToast(`Saved "${title}" to bookmarks.`);
    }
    setBookmarkedIds(updated);
    localStorage.setItem("drip_blog_bookmarks", JSON.stringify(updated));
  };

  const handleShare = (title: string) => {
    if (navigator.share) {
      navigator
        .share({
          title: `${title} | Drip Journal`,
          url: window.location.href,
        })
        .catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      triggerToast("Article link copied to clipboard!");
    }
  };

  const handleAddComment = (e: React.FormEvent, currentPostId: string) => {
    e.preventDefault();
    if (!newCommentName.trim() || !newCommentText.trim()) return;

    const newComment: Comment = {
      id: Date.now().toString(),
      author: newCommentName,
      text: newCommentText,
      date: "Today",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&q=80",
    };

    const currentPostComments = commentsMap[currentPostId] || [];
    setCommentsMap({
      ...commentsMap,
      [currentPostId]: [...currentPostComments, newComment],
    });

    setNewCommentName("");
    setNewCommentText("");
    triggerToast("Your comment has been posted successfully.");
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-4 border-zinc-200 border-t-[#6F4E37] animate-spin" />
      </div>
    );
  }

  const isBookmarked = bookmarkedIds.includes(post.id);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased overflow-x-hidden select-none flex flex-col justify-between">
      <Navbar onSearchClick={() => setIsSearchOpen(true)} />

      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      <main className="flex-grow py-10 px-6 sm:px-12 md:px-16 lg:px-20 w-full max-w-[1600px] mx-auto space-y-10">

        {/* Back Link Button */}
        <div className="flex items-center justify-between border-b border-zinc-200 pb-5 text-left">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-[#6F4E37] hover:text-[#5C3D2E] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Editorial
          </Link>

          <div className="flex items-center gap-2">
            {/* Bookmark button */}
            <button
              onClick={() => handleToggleBookmark(post.id, post.title)}
              className="p-2 hover:bg-zinc-100 rounded-full transition-colors cursor-pointer border-none bg-transparent"
              title="Bookmark story"
            >
              <Bookmark
                className={`w-4 h-4 ${isBookmarked ? "text-[#6F4E37] dark:text-[#E6C280]" : "text-zinc-400"}`}
                fill={isBookmarked ? "currentColor" : "none"}
              />
            </button>
            {/* Share button */}
            <button
              onClick={() => handleShare(post.title)}
              className="p-2 hover:bg-zinc-100 rounded-full transition-colors cursor-pointer border-none bg-transparent"
              title="Share article"
            >
              <Share2 className="w-4 h-4 text-zinc-400 hover:text-zinc-800" />
            </button>
          </div>
        </div>

        {/* Article content block */}
        <article className="space-y-8 text-left">

          {/* Header inside the article */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="bg-[#6F4E37]/10 text-[#6F4E37] font-mono text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md">
                {post.category}
              </span>
              <span className="text-[10px] font-mono text-zinc-400">{post.readTime}</span>
            </div>
            <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest font-black block">
              #{post.tag}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-zinc-950 dark:text-zinc-50 font-playfair leading-[1.05] uppercase">
              {post.title}
            </h1>
            <p className="text-md sm:text-lg text-zinc-500 italic font-serif leading-relaxed">
              {post.subtitle}
            </p>

            {/* Author Info row */}
            <div className="flex items-center gap-3 pt-2">
              <img
                src={post.authorAvatar}
                alt={post.authorName}
                className="w-10 h-10 rounded-full object-cover border border-zinc-200"
              />
              <div>
                <span className="text-[10px] font-mono text-zinc-900 uppercase font-black block">
                  Published by {post.authorName}
                </span>
                <span className="text-[9px] font-mono text-zinc-400 uppercase">
                  Released {post.date}
                </span>
              </div>
            </div>
          </div>

          {/* Cover Image inside content */}
          <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-zinc-50 border border-zinc-150/40">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content text */}
          <div className="space-y-6 text-sm sm:text-base text-zinc-650 leading-relaxed font-sans font-medium">
            {post.content.map((para, pIdx) => {
              if (pIdx === 0) {
                // First paragraph has a beautiful Drop-Cap!
                const firstChar = para.charAt(0);
                const restText = para.substring(1);
                return (
                  <p
                    key={pIdx}
                    className="first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:text-[#6F4E37] first-letter:float-left first-letter:mr-2 first-letter:leading-none"
                  >
                    {para}
                  </p>
                );
              }
              return <p key={pIdx}>{para}</p>;
            })}
          </div>

          {/* Editorial Quote Highlight if available */}
          {post.featuredQuote && (
            <div className="bg-[#faf8f5] border-l-4 border-[#6F4E37] p-6 rounded-r-2xl italic font-serif text-lg text-zinc-850 my-8 shadow-inner">
              "{post.featuredQuote}"
            </div>
          )}

          {/* Section 6: Comments layout */}
          <div className="border-t border-zinc-150 pt-8 space-y-6">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-[#6F4E37]" />
              <h3 className="text-sm font-bold uppercase tracking-wider font-mono text-zinc-800">
                Discussion ({commentsMap[post.id]?.length || 0} Comments)
              </h3>
            </div>

            {/* Comment lists */}
            <div className="space-y-4">
              {(commentsMap[post.id] || []).length > 0 ? (
                (commentsMap[post.id] || []).map((comm) => (
                  <div
                    key={comm.id}
                    className="bg-[#faf8f5] border border-zinc-200/50 p-4.5 rounded-2xl flex gap-3 text-left"
                  >
                    <img
                      src={comm.avatar}
                      alt={comm.author}
                      className="w-8 h-8 rounded-full object-cover shrink-0 border border-zinc-200"
                    />
                    <div className="space-y-1.5 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-zinc-900 font-bold uppercase">
                          {comm.author}
                        </span>
                        <span className="text-[8px] font-mono text-zinc-400">{comm.date}</span>
                      </div>
                      <p className="text-xs text-zinc-650 font-sans leading-relaxed">
                        {comm.text}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xs text-zinc-400 italic py-4">
                  No comments yet. Start the conversation below!
                </p>
              )}
            </div>

            {/* Write a comment form */}
            <form
              onSubmit={(e) => handleAddComment(e, post.id)}
              className="bg-white border border-zinc-200/60 p-5 rounded-[26px] space-y-4 text-left shadow-sm"
            >
              <span className="text-[9px] font-mono text-zinc-500 uppercase font-black block">
                Join the editorial conversation
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[9px] font-mono text-zinc-500 uppercase font-bold">Your Name</label>
                  <input
                    type="text"
                    required
                    value={newCommentName}
                    onChange={(e) => setNewCommentName(e.target.value)}
                    placeholder="e.g. Abhishek Yadav"
                    className="w-full bg-[#faf8f5] border border-zinc-200/80 focus:border-[#6F4E37] focus:ring-1 focus:ring-[#6F4E37]/15 outline-none rounded-full px-5 py-3 text-xs font-sans text-zinc-800 placeholder-zinc-400 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[9px] font-mono text-zinc-500 uppercase font-bold">Comment Text</label>
                <textarea
                  required
                  rows={3}
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  placeholder="Share your thoughts on this editorial..."
                  className="w-full bg-[#faf8f5] border border-zinc-200/80 focus:border-[#6F4E37] focus:ring-1 focus:ring-[#6F4E37]/15 outline-none rounded-[18px] px-5 py-3.5 text-xs font-sans text-zinc-800 placeholder-zinc-400 transition-all"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-zinc-950 hover:bg-[#6F4E37] text-white px-5 py-3.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer border-none shadow-sm active:scale-95"
              >
                <span>Post Comment</span>
                <Send className="w-3 h-3 text-[#D4AF37]" />
              </button>
            </form>
          </div>
        </article>
      </main>

      {/* Redesigned Premium Custom Toast */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-[130] bg-[#21130d] text-[#f5f0eb] px-5 py-4 rounded-2xl shadow-2xl border-2 border-[#6F4E37]/50 flex items-center gap-3 animate-slide-in-right text-xs font-mono font-bold uppercase tracking-wider min-w-[280px]">
          <div className="w-2.5 h-2.5 rounded-full bg-[#6F4E37] animate-ping shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      <Footer />
    </div>
  );
}
