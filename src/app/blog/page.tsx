"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SearchOverlay from "@/components/layout/SearchOverlay";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import {
  BookOpen,
  Search,
  X,
  Bookmark,
  MessageCircle,
  BookmarkCheck,
  Send,
  Share2,
  Sparkles,
  ArrowRight,
  Clock,
  Check,
  TrendingUp,
  Eye,
  Flame,
  Award,
  Compass,
  Quote
} from "lucide-react";

export interface BlogPost {
  id: string;
  category: "Trends" | "Celebs" | "Opinion";
  tag: string;
  title: string;
  subtitle: string;
  excerpt: string;
  content: string[];
  image: string;
  authorName: string;
  authorAvatar: string;
  date: string;
  readTime: string;
  readTimeNum: number;
  popularityScore: number;
  featuredQuote?: string;
}

export interface Comment {
  id: string;
  author: string;
  text: string;
  date: string;
  avatar: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "monsoon-gorpcore",
    category: "Trends",
    tag: "Techwear",
    title: "Monsoon Streetwear Trends in India (2026): Gorpcore & Technical Shells",
    subtitle: "How high-function utility clothing conquered Indian rainstorms.",
    excerpt: "Rain-proof garments, water-resistant fabrics, and utility waist bags have taken over Indian streetwear during monsoons. Here is why Gorpcore is the ultimate urban uniform.",
    content: [
      "The intersection of outdoor utility and street style—known colloquially as Gorpcore—has officially landed in India's major metro cities. Faced with intense urban monsoon seasons, fashion-forward youth in Mumbai, Bengaluru, and Delhi are turning to technical shells, seam-sealed zippers, and rugged footwear as their daily uniform.",
      "At the heart of this trend is the rejection of cheap umbrellas in favor of high-performance windbreakers and modular jackets. Brands are experimenting with breathable membranes that withstand heavy downpours while keeping the wearer cool in India's high humidity. It's no longer just about staying dry; it's about looking tactical.",
      "Accessories have also adapted. Crossbody bags made of waterproof ripstop nylon, quick-dry bucket hats, and trail runners with heavy-tread Vibram soles are now standard features of regional fit-pics. What started as mountaineering gear has become the ultimate symbol of city survivability and street style."
    ],
    image: "https://images.unsplash.com/photo-1548883354-7622d03aca27?w=1000&q=80",
    authorName: "Abhishek Yadav",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80",
    date: "04 Aug 2026",
    readTime: "5 min read",
    readTimeNum: 5,
    popularityScore: 950,
    featuredQuote: "Utility is the new luxury. When fashion meets real-world survival, style becomes indestructible."
  },
  {
    id: "pastel-revolution",
    category: "Trends",
    tag: "Color Curation",
    title: "Pastel Revolution: Why Soft Sage & Lavender are Dominating Men's Wardrobes",
    subtitle: "Breaking traditional color boundaries with breezy summer tones.",
    excerpt: "Men's fashion in India has taken a softer turn. Discover how to style pastel shirts, lightweight linen suits, and knit polos without losing the masculine edge.",
    content: [
      "For decades, the Indian menswear palette was dominated by navy, black, grey, and khaki. But 2026 has witnessed a massive shift. Soft sage green, lilac, dust lavender, and pale peach are now the leading shades in premium streetwear and casual tailoring.",
      "This color revolution is closely tied to the rise of relaxed silhouettes. A boxy linen shirt in pastel sage paired with off-white cotton trousers creates an effortless, breathable elegance perfect for warm climates. The look is clean, intentional, and highly sophisticated.",
      "The key to mastering pastels lies in the balance of textures. Combining a knitted pastel polo with heavier canvas pants keeps the look grounded. It is a styling choice that projects confidence and style maturity, proving that soft tones hold incredible visual power."
    ],
    image: "https://images.unsplash.com/photo-1505022610485-0249ba5b3675?w=1000&q=80",
    authorName: "Tanya Sen",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&q=80",
    date: "01 Aug 2026",
    readTime: "4 min read",
    readTimeNum: 4,
    popularityScore: 820,
    featuredQuote: "Color boundaries are artificial. Real style finds strength in soft, breezy shades."
  },
  {
    id: "cyberpunk-eyewear",
    category: "Trends",
    tag: "Accessories",
    title: "The Revival of Retro-Futurism: 90s Cyberpunk Sunglasses are Back",
    subtitle: "Tiny frames, chrome finishes, and wrap-around athletic shades.",
    excerpt: "From rave culture to high fashion, 90s cyberpunk sunglasses are reclaiming their spot as the ultimate statement accessory. Here is our breakdown of the best retro shapes.",
    content: [
      "The accessories market has been hijacked by a wave of nostalgia that looks straight out of the year 1999. Wrap-around athletic shades, chrome-rimmed oval glasses, and tinted visor sunglasses have returned to the forefront of youth fashion.",
      "Initially popularized by matrix-aesthetic movie characters and early rave subcultures, these retro-futuristic frames add an instant edge to even the most basic outfits. A simple white tee and blue jeans are instantly elevated into a curated look when paired with silver wrap-arounds.",
      "Indian designers are integrating these accessories into local streetwear lookbooks, contrasting traditional silhouettes with futuristic eyewear. It represents a broader movement of design hybridization—blending the past, present, and future in a single outfit."
    ],
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=1000&q=80",
    authorName: "Rohan Kapoor",
    authorAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&q=80",
    date: "28 Jul 2026",
    readTime: "3 min read",
    readTimeNum: 3,
    popularityScore: 710
  },
  {
    id: "diljit-dosanjh-style",
    category: "Celebs",
    tag: "Iconic Fits",
    title: "Decoding Diljit Dosanjh's Iconic Oversized Streetwear Lookbook",
    subtitle: "A detailed breakdown of how India's global superstar styles cozy silhouettes.",
    excerpt: "From Coachella to stadium tours, Diljit Dosanjh has become a global style icon. We analyze his love for oversized designer hoodies, color-matched turbans, and rare boots.",
    content: [
      "Diljit Dosanjh isn't just making history with his music; he is redefining global fashion on his own terms. His signature style combines high-end luxury streetwear with traditional Punjabi elements, resulting in a look that is globally recognized and locally celebrated.",
      "His silhouettes are consistently oversized. Diljit favors heavyweight hoodies from brands like Balenciaga and Vetements, styled with wide-leg utility cargos or loose-fit distressed denim. This relaxed shape projects comfort while maintaining a strong visual presence.",
      "But what sets Diljit apart is his masterful coordination of color. His turbans are selected with extreme care, acting as the primary anchor or a bold contrast to his outfits. It is a masterclass in identity-first fashion, proving that authenticity is the ultimate style statement."
    ],
    image: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=1000&q=80",
    authorName: "Abhishek Yadav",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80",
    date: "05 Aug 2026",
    readTime: "6 min read",
    readTimeNum: 6,
    popularityScore: 1250,
    featuredQuote: "Oversized silhouettes are more than comfort; they are a canvas of cultural pride and modern swagger."
  },
  {
    id: "ranveer-singh-fashion",
    category: "Celebs",
    tag: "Avant-Garde",
    title: "Ranveer Singh's Boldest Style Decisions & How to Borrow His Confidence",
    subtitle: "Demystifying the avant-garde choices of India's most experimental dresser.",
    excerpt: "Love it or hate it, Ranveer Singh's wardrobe demands attention. We review his experimental outfits and outline how you can adopt his confidence in everyday wear.",
    content: [
      "Ranveer Singh has long established himself as the wild card of Indian fashion. He rejects traditional menswear rules, regularly appearing in gender-neutral skirts, vibrant neon patterns, and architectural tailoring that challenges standard expectations.",
      "While his red-carpet looks might seem inaccessible, the philosophy behind them is highly relevant. Ranveer's wardrobe is an exercise in self-expression. He treats fashion as an art form rather than a set of boundaries.",
      "To adopt a fraction of this style energy, start small. Introduce one statement element—like a leopard-print bucket hat, an asymmetric collar shirt, or high-contrast sneakers—into an otherwise minimal outfit. It's about breaking one rule at a time."
    ],
    image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=1000&q=80",
    authorName: "Vikram Singh",
    authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80",
    date: "03 Aug 2026",
    readTime: "5 min read",
    readTimeNum: 5,
    popularityScore: 910
  },
  {
    id: "alia-bhatt-quiet-luxury",
    category: "Celebs",
    tag: "Clean Girl",
    title: "Alia Bhatt's Quiet Luxury Aesthetic: A Masterclass in Clean Airport Looks",
    subtitle: "Spotlight on high-end basics, structural blazers, and classic leather accessories.",
    excerpt: "Alia Bhatt's travel wardrobe has become the blueprint for 'quiet luxury' in India. We analyze her minimal tailoring, clean color palettes, and understated accessories.",
    content: [
      "As the global ambassador for premier luxury houses, Alia Bhatt has polished her personal style into the ultimate expression of quiet luxury. Her travel looks are characterized by premium materials, neutral shades, and zero loud logo branding.",
      "Her uniform is simple yet highly structured. She frequently pairs oversized linen blazers with relaxed white cotton shirts and straight-leg denim. The styling focuses entirely on the drape and quality of the fabrics rather than flashy graphics.",
      "Accessories are kept minimal but luxurious. A structured leather tote, classic sunglasses, and simple gold hoops complete her outfits. It is a timeless approach to fashion that highlights the power of understated elegance."
    ],
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=1000&q=80",
    authorName: "Tanya Sen",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&q=80",
    date: "25 Jul 2026",
    readTime: "4 min read",
    readTimeNum: 4,
    popularityScore: 1040,
    featuredQuote: "Elegance is not about catching the eye; it is about remaining in the memory."
  },
  {
    id: "opinion-fast-fashion-dying",
    category: "Opinion",
    tag: "Sustainability",
    title: "Is 'Fast Fashion' Actually Dying? The Rise of Indian Archival Culture",
    subtitle: "A critical essay on consumer fatigue, thrifting, and long-term garment investment.",
    excerpt: "With rising awareness of fast fashion's ecological footprint, Indian Gen Z is shifting towards archival pieces and thrifting. We discuss the future of consumption.",
    content: [
      "For the past decade, fast fashion dominated the retail industry in India by offering endless cheap trends at breakneck speed. However, a growing collective fatigue is settling in. Consumers are beginning to realize that low-quality synthetic garments are bad for both their wallets and the planet.",
      "This shift is visible in the explosion of online thrifting communities and archival stores in India. Young style enthusiasts are actively searching for vintage denim, high-grade leather jackets, and pre-loved designer pieces. They are choosing durability and history over temporary hype.",
      "Investing in fewer, high-quality garments that can be repaired, restyled, and eventually resold is the new standard of cool. It represents a significant maturity in style mindset—moving away from buying clothes to fit in, and moving towards curating pieces that define who you are."
    ],
    image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=1000&q=80",
    authorName: "Vikram Singh",
    authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80",
    date: "06 Aug 2026",
    readTime: "7 min read",
    readTimeNum: 7,
    popularityScore: 1100,
    featuredQuote: "Style is what lasts after fast-paced microtrends burn out."
  }
];

export const PRESEEDED_COMMENTS: Record<string, Comment[]> = {
  "monsoon-gorpcore": [
    {
      id: "c1",
      author: "Devansh Mehta",
      text: "The technical shell wave is real. Mumbai monsoons ruin standard streetwear, Gore-Tex is a necessity.",
      date: "2 hours ago",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=60&q=80"
    }
  ]
};

export default function BlogPage() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [isBookmarksPanelOpen, setIsBookmarksPanelOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Scroll Animations for Hero Text
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation();
  const { ref: spotlightRef, isVisible: spotlightVisible } = useScrollAnimation();

  // Local storage for bookmarks
  useEffect(() => {
    const saved = localStorage.getItem("drip_blog_bookmarks");
    if (saved) {
      try {
        setBookmarkedIds(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleToggleBookmark = (id: string, title: string) => {
    let next: string[];
    if (bookmarkedIds.includes(id)) {
      next = bookmarkedIds.filter((bId) => bId !== id);
      triggerToast(`Removed from saved bookmarks`);
    } else {
      next = [...bookmarkedIds, id];
      triggerToast(`Saved to read-later bookmarks`);
    }
    setBookmarkedIds(next);
    localStorage.setItem("drip_blog_bookmarks", JSON.stringify(next));
  };

  const handleShare = (title: string) => {
    if (navigator.share) {
      navigator.share({
        title: title,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      triggerToast("Article link copied to clipboard!");
    }
  };

  // Comments state
  const [commentsMap, setCommentsMap] = useState<Record<string, Comment[]>>(PRESEEDED_COMMENTS);
  const [newCommentName, setNewCommentName] = useState("");
  const [newCommentText, setNewCommentText] = useState("");

  const handleAddComment = (e: React.FormEvent, postId: string) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const newComm: Comment = {
      id: Date.now().toString(),
      author: newCommentName.trim() || "Anonymous Reader",
      text: newCommentText.trim(),
      date: "Just now",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=60&q=80"
    };

    setCommentsMap((prev) => ({
      ...prev,
      [postId]: [...(prev[postId] || []), newComm]
    }));

    setNewCommentText("");
    triggerToast("Comment posted to discussion!");
  };

  // Filtered stories
  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchesCat = selectedCategory === "All" || post.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.tag.toLowerCase().includes(q) ||
        post.authorName.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const bookmarkedPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => bookmarkedIds.includes(post.id));
  }, [bookmarkedIds]);

  const trendsPosts = useMemo(() => BLOG_POSTS.filter(p => p.category === "Trends"), []);
  const celebsPosts = useMemo(() => BLOG_POSTS.filter(p => p.category === "Celebs"), []);
  const opinionPosts = useMemo(() => BLOG_POSTS.filter(p => p.category === "Opinion"), []);

  const featuredPost = BLOG_POSTS[6]; // "Is 'Fast Fashion' Actually Dying?"

  const renderPostCard = (post: BlogPost, readLabel: string = "Read Story", indexNum: number = 1) => {
    const isBookmarked = bookmarkedIds.includes(post.id);
    return (
      <div
        key={post.id}
        className="bg-white dark:bg-zinc-900/90 border border-stone-200/90 dark:border-zinc-800/90 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-[#6F4E37]/50 dark:hover:border-[#E6C280]/50 transition-all duration-500 rounded-[24px] overflow-hidden p-4 sm:p-5 flex flex-col justify-between gap-3 group text-left relative"
      >
        {/* Subtle Watermark Number */}
        <div className="absolute top-3 right-5 font-playfair font-black text-3xl text-stone-200/60 dark:text-zinc-800/40 select-none pointer-events-none group-hover:text-[#6F4E37]/15 dark:group-hover:text-[#E6C280]/20 transition-colors z-0">
          0{indexNum}
        </div>

        <div className="space-y-3 z-10">
          <div className="relative aspect-[16/9] w-full bg-stone-100 dark:bg-zinc-800 rounded-[16px] overflow-hidden border border-stone-200/80 dark:border-zinc-800 shadow-inner">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter contrast-[1.02]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="absolute top-3 left-3 bg-white/95 dark:bg-zinc-950/90 backdrop-blur-md border border-stone-200/80 dark:border-zinc-800 px-2.5 py-0.5 rounded-lg shadow-xs">
              <span className="text-[8px] font-mono font-bold tracking-wider text-[#6F4E37] dark:text-[#E6C280] uppercase">
                #{post.tag}
              </span>
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between font-mono text-[8px] text-zinc-400 dark:text-zinc-500 uppercase tracking-wider font-bold">
              <span className="text-[#6F4E37] dark:text-[#E6C280]">{post.category} Archive</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3 h-3 text-zinc-400" />
                {post.readTime}
              </span>
            </div>
            
            <h4 className="text-base sm:text-lg font-playfair font-normal text-zinc-900 dark:text-white group-hover:text-[#6F4E37] dark:group-hover:text-[#E6C280] transition-colors duration-300 leading-snug tracking-tight line-clamp-2">
              {post.title}
            </h4>
            
            <p className="text-[11px] text-zinc-600 dark:text-zinc-400 font-sans font-normal leading-relaxed line-clamp-2">
              {post.excerpt}
            </p>
          </div>
        </div>

        <div className="pt-4 flex items-center justify-between z-10 border-t border-stone-100 dark:border-zinc-800">
          <div className="flex items-center gap-2.5">
            <img
              src={post.authorAvatar}
              alt={post.authorName}
              className="w-8 h-8 rounded-full object-cover border-2 border-[#6F4E37]/30 dark:border-[#E6C280]/40 shadow-xs"
            />
            <div>
              <span className="text-[9.5px] font-mono font-bold text-zinc-900 dark:text-white block leading-tight">
                {post.authorName}
              </span>
              <span className="text-[8px] font-mono text-zinc-400 uppercase">
                {post.date}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleToggleBookmark(post.id, post.title)}
              className="p-2 hover:bg-stone-100 dark:hover:bg-zinc-800 rounded-full transition-colors border-none cursor-pointer text-zinc-400 hover:text-[#6F4E37] dark:hover:text-[#E6C280]"
              title="Save to bookmarks"
            >
              <Bookmark
                className={`w-4 h-4 transition-all duration-300 ${
                  isBookmarked ? "text-[#6F4E37] dark:text-[#E6C280]" : ""
                }`}
                fill={isBookmarked ? "currentColor" : "none"}
              />
            </button>
            
            <Link
              href={`/blog/${post.id}`}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-zinc-950 hover:bg-[#6F4E37] dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-[#E6C280] text-white text-[9.5px] font-mono font-bold uppercase tracking-wider rounded-xl transition-all duration-300 cursor-pointer shadow-sm active:scale-95 border-none"
            >
              <span>{readLabel}</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5] dark:bg-[#0C0B0A] text-zinc-900 dark:text-white font-sans antialiased select-none transition-colors duration-300 w-full">
      <Navbar onSearchClick={() => setIsSearchOpen(true)} />
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 px-5 py-3 rounded-2xl font-mono text-xs font-bold shadow-2xl flex items-center gap-2.5 border border-white/10 animate-fade-in">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Bookmarks Drawer */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-full sm:w-[420px] bg-white dark:bg-zinc-950 border-l border-stone-200 dark:border-zinc-800 shadow-2xl transition-transform duration-500 ease-out flex flex-col ${
          isBookmarksPanelOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 border-b border-stone-200 dark:border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <BookmarkCheck className="w-5 h-5 text-[#6F4E37] dark:text-[#E6C280]" />
            <h3 className="text-sm font-bold uppercase tracking-wider font-mono text-zinc-900 dark:text-white">
              Saved Bookmarks ({bookmarkedPosts.length})
            </h3>
          </div>
          <button
            onClick={() => setIsBookmarksPanelOpen(false)}
            className="p-2 hover:bg-stone-100 dark:hover:bg-zinc-800 rounded-full cursor-pointer transition-colors border-none"
          >
            <X className="w-5 h-5 text-zinc-400 hover:text-zinc-900 dark:hover:text-white" />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-6 space-y-4">
          {bookmarkedPosts.length > 0 ? (
            bookmarkedPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.id}`}
                onClick={() => setIsBookmarksPanelOpen(false)}
                className="bg-stone-50 dark:bg-zinc-900 border border-stone-200/80 dark:border-zinc-800 p-4 rounded-2xl flex items-center gap-4 cursor-pointer hover:border-[#6F4E37]/50 transition-all duration-300 text-left"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-16 h-16 rounded-xl object-cover border border-stone-200 dark:border-zinc-800 shrink-0"
                />
                <div className="flex-grow space-y-1 min-w-0">
                  <span className="text-[8.5px] font-mono text-[#6F4E37] dark:text-[#E6C280] uppercase font-bold tracking-widest block">
                    {post.category}
                  </span>
                  <h4 className="text-xs font-bold text-zinc-900 dark:text-white line-clamp-2 uppercase leading-tight font-sans">
                    {post.title}
                  </h4>
                  <span className="text-[8.5px] font-mono text-zinc-400">{post.readTime}</span>
                </div>
              </Link>
            ))
          ) : (
            <div className="text-center py-20 space-y-3">
              <Bookmark className="w-8 h-8 text-zinc-300 dark:text-zinc-600 mx-auto" />
              <p className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest">
                No bookmarked stories yet.
              </p>
              <p className="text-[10px] text-zinc-400 font-sans max-w-xs mx-auto leading-relaxed">
                Click the bookmark icon on any article to save it for reading later.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ─── REDESIGNED AVANT-GARDE HERO BANNER (NO CARD) ─── */}
      <section className="relative w-full min-h-[50vh] flex flex-col items-center justify-center overflow-hidden select-none p-6 md:p-8">
        
        {/* Edge-to-Edge Cinematic Image Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1492288991661-058aa541ff43?w=1920&q=80"
            alt="Drip Journal Editorial Hero"
            className="w-full h-full object-cover object-center filter grayscale-[30%] brightness-75"
          />
          {/* Full 70% Overlay */}
          <div className="absolute inset-0 bg-black/70 z-10 pointer-events-none" />
        </div>

        {/* Ambient Glowing Orbs over the image */}
        <div className="absolute top-1/4 -left-1/4 w-[800px] h-[800px] bg-[#6F4E37]/30 dark:bg-[#E6C280]/15 rounded-full blur-[150px] pointer-events-none animate-pulse-slow z-0" />

        {/* Content Container (70% width, No Card) */}
        <div ref={heroRef} className="relative z-10 flex flex-col items-center justify-center w-[100%] md:w-[70%] text-center space-y-6 p-4 mt-8">
          
          {/* Top Tag */}
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/30 bg-white/5 backdrop-blur-sm transition-all duration-700 ease-out delay-100 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#E6C280] animate-pulse" />
            <span className="text-white font-mono text-[9px] font-bold uppercase tracking-[0.25em]">
              The Editorial Archive
            </span>
          </div>

          {/* Page Title */}
          <div className={`space-y-4 transition-all duration-700 ease-out delay-200 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-playfair font-black text-white tracking-tight uppercase leading-[0.95]">
              STREET <br/>
              <span className="font-serif italic font-normal text-zinc-300 lowercase">culture &</span> <br/>
              AESTHETICS
            </h1>
          </div>

          {/* Sub-description */}
          <p className={`text-xs sm:text-sm text-zinc-200 font-sans font-light max-w-lg mx-auto leading-relaxed transition-all duration-700 ease-out delay-300 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            Curated essays, trend forecasts, and deep dives into the evolving landscape of global fashion and localized streetwear.
          </p>

          <div className={`pt-4 flex items-center justify-center gap-4 transition-all duration-700 ease-out delay-500 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="h-[1px] w-12 bg-zinc-500" />
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-400 font-bold">EST. 2026</span>
            <div className="h-[1px] w-12 bg-zinc-500" />
          </div>

        </div>
      </section>



      <main className="flex-grow py-10 sm:py-16 px-4 sm:px-12 md:px-16 lg:px-20 w-full max-w-[1600px] mx-auto space-y-12 sm:space-y-20">
        
        {/* ─── SECTION: Spotlight Weekly Feature (PRESERVED HEADING) ─── */}
        {selectedCategory === "All" && !searchQuery && (
          <section ref={spotlightRef} className={`w-full transition-all duration-1000 ease-out ${spotlightVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 bg-white dark:bg-zinc-900/90 border border-stone-200/90 dark:border-zinc-800/90 rounded-[32px] overflow-hidden p-5 sm:p-6 lg:p-8 shadow-md hover:shadow-2xl hover:border-[#6F4E37]/50 dark:hover:border-[#E6C280]/50 transition-all duration-500 text-left relative">
              
              {/* Left Video Showcase (7 cols) */}
              <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto lg:h-[320px] w-full rounded-[20px] overflow-hidden bg-zinc-950 border border-stone-200/80 dark:border-zinc-800 shadow-inner flex items-center justify-center">
                <iframe
                  src="https://www.youtube.com/embed/1R9_6hQmwR0?autoplay=1&mute=1&loop=1&playlist=1R9_6hQmwR0&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1"
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[150%] min-h-full min-w-full pointer-events-none"
                  title="Spotlight Feature Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                <div className="absolute inset-0 bg-black/[0.02] z-20 pointer-events-auto" />
                
                <div className="absolute top-3 left-3 z-30 bg-black/80 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E6C280] animate-pulse" />
                  <span className="text-[8px] font-mono font-bold tracking-widest text-[#E6C280] uppercase">
                    FEATURED REEL
                  </span>
                </div>
              </div>

              {/* Right Content (5 cols) */}
              <div className="lg:col-span-5 flex flex-col justify-between text-left space-y-4 py-1">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="bg-[#6F4E37]/10 dark:bg-[#E6C280]/15 text-[#6F4E37] dark:text-[#E6C280] font-mono text-[8px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-[#6F4E37]/20 dark:border-[#E6C280]/30">
                      Spotlight Weekly Feature
                    </span>
                    <button
                      onClick={() => handleToggleBookmark(featuredPost.id, featuredPost.title)}
                      className="p-1.5 hover:bg-stone-100 dark:hover:bg-zinc-800 rounded-full transition-colors cursor-pointer border-none text-zinc-400 hover:text-[#6F4E37] dark:hover:text-[#E6C280]"
                    >
                      <Bookmark
                        className={`w-3.5 h-3.5 ${
                          bookmarkedIds.includes(featuredPost.id) ? "text-[#6F4E37] dark:text-[#E6C280]" : ""
                        }`}
                        fill={bookmarkedIds.includes(featuredPost.id) ? "currentColor" : "none"}
                      />
                    </button>
                  </div>

                  <h2 className="text-3xl md:text-4xl lg:text-4xl font-light tracking-tight text-zinc-950 dark:text-zinc-50 font-playfair leading-[1.1] uppercase">
                    {featuredPost.title}
                  </h2>
                  <p className="text-zinc-500 dark:text-zinc-400 font-mono text-[9.5px] uppercase tracking-wider font-bold">
                    {featuredPost.subtitle}
                  </p>
                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-sans font-normal">
                    {featuredPost.excerpt}
                  </p>
                </div>

                <div className="pt-6 border-t border-stone-100 dark:border-zinc-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={featuredPost.authorAvatar}
                      alt={featuredPost.authorName}
                      className="w-10 h-10 rounded-full object-cover border-2 border-[#6F4E37] dark:border-[#E6C280] shadow-sm"
                    />
                    <div>
                      <span className="text-[10px] font-mono text-zinc-900 dark:text-white uppercase font-bold block">
                        {featuredPost.authorName}
                      </span>
                      <span className="text-[8.5px] font-mono text-zinc-400 uppercase">
                        {featuredPost.date} • {featuredPost.readTime}
                      </span>
                    </div>
                  </div>
                  
                  <Link
                    href={`/blog/${featuredPost.id}`}
                    className="inline-flex items-center gap-2 bg-zinc-950 hover:bg-[#6F4E37] dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-[#E6C280] text-white px-6 py-3.5 rounded-2xl text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer border-none shadow-md active:scale-95"
                  >
                    <span>Read Article</span>
                    <BookOpen className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

            </div>
          </section>
        )}

        {/* ─── FILTER CONTROL BAR ─── */}
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-stretch lg:items-center text-left pt-2">
          <div className="flex gap-2 overflow-x-auto scrollbar-none py-1">
            {["All", "Trends", "Celebs", "Opinion"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-3 rounded-2xl text-xs font-mono font-bold tracking-wider uppercase cursor-pointer border transition-all duration-300 active:scale-95 ${
                  selectedCategory === cat
                    ? "bg-[#6F4E37] text-white border-[#6F4E37] dark:bg-[#E6C280] dark:text-zinc-950 dark:border-[#E6C280] shadow-sm"
                    : "bg-white text-zinc-700 border-stone-200 hover:bg-stone-100 dark:bg-zinc-900/80 dark:border-zinc-800 dark:text-zinc-400 dark:hover:text-white"
                }`}
              >
                {cat === "All" ? "All Editorial" : `${cat} Section`}
              </button>
            ))}
          </div>

          <div className="relative max-w-sm w-full bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 focus-within:border-[#6F4E37] dark:focus-within:border-[#E6C280] rounded-2xl px-4 py-3 flex items-center gap-2.5 transition-all shadow-xs">
            <Search className="w-4 h-4 text-zinc-400 shrink-0" />
            <input
              type="text"
              placeholder="Search editorial archives..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent outline-none text-xs font-mono text-zinc-900 dark:text-white placeholder-zinc-400 w-full"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="border-none bg-transparent cursor-pointer text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* ─── CATEGORIZED EDITORIAL SECTIONS (PRESERVED HEADINGS) ─── */}
        {selectedCategory === "All" && !searchQuery ? (
          <>
            {/* SECTION 1: TRENDS */}
            <section className="space-y-6">
              <div className="flex justify-between items-end text-left border-b border-stone-200/90 dark:border-zinc-800 pb-4">
                <div>
                  <span className="text-[9px] sm:text-[10px] font-mono text-[#6F4E37] dark:text-[#E6C280] uppercase tracking-[0.2em] font-bold block mb-1">
                    SECTION 01 // FORECASTS
                  </span>
                  <h3 className="text-2xl sm:text-4xl font-light uppercase tracking-tight text-zinc-900 dark:text-white font-playfair leading-tight">
                    Style Forecasts & <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280]">Trends</span>
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedCategory("Trends")}
                  className="text-[10.5px] font-mono font-bold text-[#6F4E37] dark:text-[#E6C280] uppercase tracking-widest cursor-pointer border-none bg-transparent flex items-center gap-1.5 hover:underline"
                >
                  <span>View All Trends</span>
                  <span>→</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                {trendsPosts.map((post, i) => renderPostCard(post, "Read Forecast", i + 1))}
              </div>
            </section>

            {/* ─── LUXURY EDITORIAL PULL-QUOTE BREAK ─── */}
            <section className="w-full bg-gradient-to-r from-[#F3ECE0] via-[#FAF6F0] to-[#FFFFFF] dark:from-[#18181B] dark:via-[#141415] dark:to-[#0C0B0A] border border-stone-300/80 dark:border-zinc-800 rounded-[36px] p-8 sm:p-14 text-center relative overflow-hidden shadow-sm">
              <div className="max-w-3xl mx-auto space-y-4 relative z-10">
                <Quote className="w-8 h-8 text-[#6F4E37] dark:text-[#E6C280] mx-auto opacity-70" />
                <blockquote className="text-xl sm:text-2xl md:text-3xl font-light font-playfair italic leading-relaxed text-zinc-950 dark:text-white">
                  "In an era of fleeting microtrends, archival streetwear is the only true currency of personal identity."
                </blockquote>
                <p className="text-[10.5px] font-mono font-bold uppercase tracking-[0.25em] text-[#6F4E37] dark:text-[#E6C280]">
                  — Abhishek Yadav, Chief Editorial Curator
                </p>
              </div>
            </section>

            {/* SECTION 2: CELEBS */}
            <section className="space-y-6">
              <div className="flex justify-between items-end text-left border-b border-stone-200/90 dark:border-zinc-800 pb-4">
                <div>
                  <span className="text-[9px] sm:text-[10px] font-mono text-[#6F4E37] dark:text-[#E6C280] uppercase tracking-[0.2em] font-bold block mb-1">
                    SECTION 02 // ICONS
                  </span>
                  <h3 className="text-2xl sm:text-4xl font-light uppercase tracking-tight text-zinc-900 dark:text-white font-playfair leading-tight">
                    Celebrity Style <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280]">Breakdown</span>
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedCategory("Celebs")}
                  className="text-[10.5px] font-mono font-bold text-[#6F4E37] dark:text-[#E6C280] uppercase tracking-widest cursor-pointer border-none bg-transparent flex items-center gap-1.5 hover:underline"
                >
                  <span>View All Celebs</span>
                  <span>→</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                {celebsPosts.map((post, i) => renderPostCard(post, "Read Breakdown", i + 1))}
              </div>
            </section>

            {/* SECTION 3: OPINION */}
            <section className="space-y-6">
              <div className="flex justify-between items-end text-left border-b border-stone-200/90 dark:border-zinc-800 pb-4">
                <div>
                  <span className="text-[9px] sm:text-[10px] font-mono text-[#6F4E37] dark:text-[#E6C280] uppercase tracking-[0.2em] font-bold block mb-1">
                    SECTION 03 // ESSAYS
                  </span>
                  <h3 className="text-2xl sm:text-4xl font-light uppercase tracking-tight text-zinc-900 dark:text-white font-playfair leading-tight">
                    Editorial Opinion & <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280]">Culture</span>
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedCategory("Opinion")}
                  className="text-[10.5px] font-mono font-bold text-[#6F4E37] dark:text-[#E6C280] uppercase tracking-widest cursor-pointer border-none bg-transparent flex items-center gap-1.5 hover:underline"
                >
                  <span>View All Opinions</span>
                  <span>→</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                {opinionPosts.map((post, i) => renderPostCard(post, "Read Essay", i + 1))}
              </div>
            </section>
          </>
        ) : (
          /* FILTERED VIEW */
          <section className="space-y-6">
            <h3 className="text-[10px] font-mono text-[#6F4E37] dark:text-[#E6C280] uppercase tracking-widest font-bold text-left">
              {searchQuery ? `Search Results for "${searchQuery}"` : `${selectedCategory} Archives`}
            </h3>

            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                {filteredPosts.map((post, i) => renderPostCard(post, "Read Article", i + 1))}
              </div>
            ) : (
              <div className="text-center py-20 border border-stone-200 dark:border-zinc-800 rounded-[32px] bg-white dark:bg-zinc-900 space-y-3">
                <BookOpen className="w-10 h-10 text-zinc-400 mx-auto" />
                <p className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest">
                  No matching editorial stories found.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory("All");
                    setSearchQuery("");
                  }}
                  className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-widest text-[#6F4E37] dark:text-[#E6C280] bg-transparent border-none cursor-pointer"
                >
                  Reset Search Filters
                </button>
              </div>
            )}
          </section>
        )}

        {/* ─── WEEKLY NEWSLETTER CARD (PRESERVED HEADING) ─── */}
        <section className="w-full max-w-4xl mx-auto relative rounded-[36px] overflow-hidden border border-stone-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 sm:p-14 text-center text-zinc-900 dark:text-white flex flex-col items-center justify-center min-h-[280px] shadow-sm select-none">
          <div className="relative z-10 max-w-md space-y-4">
            <span className="text-[9px] sm:text-[10px] font-mono tracking-widest text-[#6F4E37] dark:text-[#E6C280] font-bold uppercase block">
              Drip Journal Digest
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-zinc-950 dark:text-zinc-50 font-playfair leading-[1.05] uppercase">
              One editorial letter a <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280]">week</span>
            </h2>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans font-normal">
              We compile deep thoughts on streetwear, vintage trends, and aesthetic insights. Strictly content.
            </p>

            <form
              className="pt-2 flex flex-col sm:flex-row gap-2 max-w-sm mx-auto"
              onSubmit={(e) => {
                e.preventDefault();
                const target = e.target as HTMLFormElement;
                const emailInput = target.elements.namedItem("email") as HTMLInputElement;
                if (emailInput && emailInput.value) {
                  triggerToast("Thank you for joining our editorial digest!");
                  target.reset();
                }
              }}
            >
              <input
                type="email"
                name="email"
                required
                placeholder="Enter your email address"
                className="bg-stone-50 dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 focus:border-[#6F4E37] dark:focus:border-[#E6C280] focus:outline-none rounded-xl px-4 py-3 text-xs text-zinc-900 dark:text-white placeholder-zinc-400 font-mono flex-grow w-full transition-all"
              />
              <button
                type="submit"
                className="bg-zinc-950 hover:bg-[#6F4E37] dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-[#E6C280] text-white text-xs font-mono font-bold uppercase tracking-widest px-7 py-3 rounded-xl transition-all duration-300 cursor-pointer shrink-0 border-none shadow-sm active:scale-95"
              >
                Join Digest
              </button>
            </form>
          </div>
        </section>

      </main>

      {/* ─── FULL STORY MODAL / READ VIEW ─── */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
          <div className="bg-white dark:bg-zinc-950 w-full max-w-3xl rounded-[36px] border border-stone-200 dark:border-zinc-800 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            
            {/* Top Navigation Panel */}
            <div className="p-5 border-b border-stone-200 dark:border-zinc-800 flex items-center justify-between shrink-0 bg-white dark:bg-zinc-950">
              <div className="flex items-center gap-3">
                <span className="bg-[#6F4E37]/10 dark:bg-[#E6C280]/15 text-[#6F4E37] dark:text-[#E6C280] font-mono text-[8.5px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md">
                  #{selectedPost.tag}
                </span>
                <span className="text-[10px] font-mono text-zinc-400">{selectedPost.readTime}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleToggleBookmark(selectedPost.id, selectedPost.title)}
                  className="p-2 hover:bg-stone-100 dark:hover:bg-zinc-800 rounded-full transition-colors cursor-pointer border-none text-zinc-400 hover:text-[#6F4E37] dark:hover:text-[#E6C280]"
                  title="Bookmark story"
                >
                  <Bookmark
                    className={`w-4 h-4 ${
                      bookmarkedIds.includes(selectedPost.id) ? "text-[#6F4E37] dark:text-[#E6C280]" : ""
                    }`}
                    fill={bookmarkedIds.includes(selectedPost.id) ? "currentColor" : "none"}
                  />
                </button>
                <button
                  onClick={() => handleShare(selectedPost.title)}
                  className="p-2 hover:bg-stone-100 dark:hover:bg-zinc-800 rounded-full transition-colors cursor-pointer border-none text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                  title="Share article"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="p-2 hover:bg-stone-100 dark:hover:bg-zinc-800 rounded-full transition-colors cursor-pointer border-none text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                  aria-label="Close reader"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Immersive Scrollable Content Area */}
            <div className="p-6 sm:p-10 overflow-y-auto space-y-6 text-left">
              <div className="space-y-3">
                <span className="text-[10px] font-mono text-[#6F4E37] dark:text-[#E6C280] uppercase tracking-widest font-bold block">
                  #{selectedPost.tag}
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-zinc-950 dark:text-zinc-50 font-playfair leading-[1.05] uppercase">
                  {selectedPost.title}
                </h1>
                <p className="text-sm sm:text-base text-zinc-500 italic font-serif leading-relaxed">
                  {selectedPost.subtitle}
                </p>

                <div className="flex items-center gap-3 pt-2">
                  <img
                    src={selectedPost.authorAvatar}
                    alt={selectedPost.authorName}
                    className="w-10 h-10 rounded-full object-cover border border-stone-200 dark:border-zinc-800"
                  />
                  <div>
                    <span className="text-[10px] font-mono text-zinc-900 dark:text-white uppercase font-bold block">
                      Published by {selectedPost.authorName}
                    </span>
                    <span className="text-[9px] font-mono text-zinc-400 uppercase">
                      Released {selectedPost.date}
                    </span>
                  </div>
                </div>
              </div>

              <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-stone-100 dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800">
                <img
                  src={selectedPost.image}
                  alt={selectedPost.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans font-normal">
                {selectedPost.content.map((para, pIdx) => (
                  <p key={pIdx}>{para}</p>
                ))}
              </div>

              {selectedPost.featuredQuote && (
                <div className="bg-[#FAF8F5] dark:bg-zinc-900 border-l-4 border-[#6F4E37] dark:border-[#E6C280] p-5 rounded-r-2xl italic font-serif text-base text-zinc-800 dark:text-zinc-200 my-6 shadow-inner">
                  "{selectedPost.featuredQuote}"
                </div>
              )}

              {/* Comments */}
              <div className="border-t border-stone-200 dark:border-zinc-800 pt-6 space-y-5">
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-[#6F4E37] dark:text-[#E6C280]" />
                  <h3 className="text-sm font-bold uppercase tracking-wider font-mono text-zinc-900 dark:text-white">
                    Discussion ({commentsMap[selectedPost.id]?.length || 0} Comments)
                  </h3>
                </div>

                <div className="space-y-3">
                  {(commentsMap[selectedPost.id] || []).length > 0 ? (
                    (commentsMap[selectedPost.id] || []).map((comm) => (
                      <div
                        key={comm.id}
                        className="bg-stone-50 dark:bg-zinc-900/80 border border-stone-200 dark:border-zinc-800 p-4 rounded-2xl flex gap-3 text-left"
                      >
                        <img
                          src={comm.avatar}
                          alt={comm.author}
                          className="w-8 h-8 rounded-full object-cover shrink-0 border border-stone-200 dark:border-zinc-700"
                        />
                        <div className="space-y-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono text-zinc-900 dark:text-white font-bold uppercase">
                              {comm.author}
                            </span>
                            <span className="text-[8px] font-mono text-zinc-400">{comm.date}</span>
                          </div>
                          <p className="text-xs text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed">
                            {comm.text}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-zinc-400 italic py-2">
                      No comments yet. Start the conversation below!
                    </p>
                  )}
                </div>

                <form
                  onSubmit={(e) => handleAddComment(e, selectedPost.id)}
                  className="bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 p-5 rounded-2xl space-y-4 text-left shadow-xs"
                >
                  <span className="text-[9px] font-mono text-zinc-400 dark:text-zinc-500 uppercase font-bold block">
                    Join the editorial conversation
                  </span>
                  
                  <input
                    type="text"
                    required
                    value={newCommentName}
                    onChange={(e) => setNewCommentName(e.target.value)}
                    placeholder="Your name"
                    className="w-full bg-stone-50 dark:bg-zinc-800/80 border border-stone-200 dark:border-zinc-700 focus:border-[#6F4E37] dark:focus:border-[#E6C280] outline-none rounded-xl px-4 py-2.5 text-xs font-sans text-zinc-900 dark:text-white placeholder-zinc-400 transition-all"
                  />

                  <textarea
                    required
                    rows={3}
                    value={newCommentText}
                    onChange={(e) => setNewCommentText(e.target.value)}
                    placeholder="Share your thoughts on this editorial..."
                    className="w-full bg-stone-50 dark:bg-zinc-800/80 border border-stone-200 dark:border-zinc-700 focus:border-[#6F4E37] dark:focus:border-[#E6C280] outline-none rounded-xl px-4 py-2.5 text-xs font-sans text-zinc-900 dark:text-white placeholder-zinc-400 transition-all"
                  />

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 bg-zinc-950 hover:bg-[#6F4E37] dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-[#E6C280] text-white px-5 py-2.5 rounded-xl text-[10px] font-mono font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer border-none shadow-xs active:scale-95"
                  >
                    <span>Post Comment</span>
                    <Send className="w-3 h-3" />
                  </button>
                </form>
              </div>

              <div className="pt-4 border-t border-stone-200 dark:border-zinc-800 flex items-center justify-end">
                <button
                  onClick={() => setSelectedPost(null)}
                  className="bg-zinc-950 hover:bg-[#6F4E37] dark:bg-zinc-800 text-white text-[10px] font-mono font-bold uppercase tracking-widest px-5 py-2.5 rounded-xl transition-all duration-300 cursor-pointer border-none shadow-xs active:scale-95"
                >
                  Close Reader
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
