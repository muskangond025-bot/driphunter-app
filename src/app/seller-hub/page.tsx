"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import {
  Wallet,
  TrendingUp,
  MessageCircleQuestion,
  FileText,
  ArrowRight,
  Newspaper,
  Star,
  Zap,
  ChevronRight
} from "lucide-react";

const quickLinks = [
  {
    title: "Fees & Commission",
    description: "Understand our flat 8% fee structure, payment gateways, and settlement timelines.",
    icon: Wallet,
    href: "/fees-and-commission",
    color: "from-amber-500/20 to-orange-600/20",
    iconColor: "text-amber-600 dark:text-amber-400"
  },
  {
    title: "Grow Faster",
    description: "Step-by-step guides on creating your account, listing products, and scaling sales.",
    icon: TrendingUp,
    href: "/grow-faster",
    color: "from-emerald-500/20 to-teal-600/20",
    iconColor: "text-emerald-600 dark:text-emerald-400"
  },
  {
    title: "Seller FAQs",
    description: "Find instant answers to the most common questions from our seller community.",
    icon: MessageCircleQuestion,
    href: "/faqs",
    color: "from-blue-500/20 to-indigo-600/20",
    iconColor: "text-blue-600 dark:text-blue-400"
  },
  {
    title: "Seller Policies",
    description: "Review our strict guidelines on authenticity, returns, and seller conduct.",
    icon: FileText,
    href: "/seller-policies",
    color: "from-rose-500/20 to-pink-600/20",
    iconColor: "text-rose-600 dark:text-rose-400"
  }
];

const latestNews = [
  {
    tag: "Success Story",
    tagIcon: Star,
    title: "How SneakerVault Made ₹15L in Their First Month",
    slug: "sneakervault-success",
    excerpt: "Discover the exact listing strategies and FBD fulfillment tactics used by our top new seller.",
    date: "Aug 28, 2026",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80"
  },
  {
    tag: "Platform Update",
    tagIcon: Zap,
    title: "Introducing Next-Day Payouts for Verified Sellers",
    slug: "next-day-payouts",
    excerpt: "Cash flow is king. We are rolling out T+1 NEFT settlements for sellers who maintain a 99% authenticity score.",
    date: "Sep 02, 2026",
    readTime: "2 min read",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80"
  },
  {
    tag: "Selling Tip",
    tagIcon: TrendingUp,
    title: "Mastering the Art of the 'Grail' Listing",
    slug: "grail-listing-tips",
    excerpt: "Why high-quality lighting and detailed defect reporting actually increases your final sale price.",
    date: "Sep 10, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80"
  }
];

export default function SellerHubPage() {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation();
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation();
  const { ref: newsRef, isVisible: newsVisible } = useScrollAnimation();

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5] dark:bg-[#0C0B0A] text-zinc-900 dark:text-white font-sans antialiased overflow-x-hidden">
      <Navbar />

      <main className="flex-grow pb-24">
        {/* Hero Section */}
        <section
          ref={heroRef}
          className={`pt-24 pb-16 px-6 sm:px-12 max-w-7xl mx-auto text-center transition-all duration-1000 ease-out ${
            heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center gap-2 text-[10px] font-mono font-bold tracking-[0.2em] text-[#6F4E37] dark:text-[#E6C280] uppercase mb-6 border border-[#6F4E37]/20 dark:border-[#E6C280]/20 px-4 py-1.5 rounded-full bg-[#6F4E37]/5 dark:bg-[#E6C280]/5">
            <Newspaper className="w-3 h-3" /> Dashboard & Resources
          </div>
          <h1 className="text-4xl md:text-6xl font-light tracking-tight font-playfair leading-[1.1] mb-6">
            DripHunter <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280]">Seller Hub</span>
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto text-base leading-relaxed mb-10">
            Welcome to your command center. Access step-by-step guides, review platform policies, and stay updated with the latest strategies to scale your luxury streetwear business.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/start-selling"
              className="bg-[#6F4E37] dark:bg-[#E6C280] text-white dark:text-black font-bold uppercase tracking-wider text-xs px-8 py-4 rounded-full hover:bg-black dark:hover:bg-white transition-colors flex items-center justify-center gap-2"
            >
              Start Selling
            </Link>
            <Link 
              href="/faqs"
              className="bg-white dark:bg-[#151515] text-zinc-900 dark:text-white border border-stone-200 dark:border-zinc-800 font-bold uppercase tracking-wider text-xs px-8 py-4 rounded-full hover:bg-stone-50 dark:hover:bg-zinc-900 transition-colors flex items-center justify-center gap-2"
            >
              Contact Support
            </Link>
          </div>
        </section>

        {/* Quick Links Directory */}
        <section
          ref={gridRef}
          className={`px-6 sm:px-12 max-w-7xl mx-auto py-12 transition-all duration-1000 ease-out delay-200 ${
            gridVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quickLinks.map((link, idx) => (
              <Link 
                key={idx} 
                href={link.href}
                className="group relative bg-white dark:bg-[#111111] border border-stone-200 dark:border-zinc-800 rounded-3xl p-8 overflow-hidden hover:border-[#6F4E37]/50 dark:hover:border-[#E6C280]/50 transition-all duration-500 shadow-sm hover:shadow-xl"
              >
                {/* Background glow effect on hover */}
                <div className={`absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br ${link.color} rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700`}></div>
                
                <div className="relative z-10">
                  <div className={`w-14 h-14 rounded-2xl bg-stone-50 dark:bg-zinc-900 border border-stone-100 dark:border-zinc-800 flex items-center justify-center mb-6 ${link.iconColor} group-hover:scale-110 transition-transform duration-500`}>
                    <link.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold font-playfair text-zinc-900 dark:text-white mb-3 flex items-center gap-2">
                    {link.title}
                  </h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-sm mb-6">
                    {link.description}
                  </p>
                  <div className="flex items-center text-xs font-bold uppercase tracking-widest text-[#6F4E37] dark:text-[#E6C280]">
                    Explore <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Latest Seller News (Mini Blog) */}
        <section
          id="latest-news"
          ref={newsRef}
          className={`px-6 sm:px-12 max-w-7xl mx-auto py-24 transition-all duration-1000 ease-out delay-300 ${
            newsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-stone-200 dark:border-zinc-800 pb-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-light font-playfair text-zinc-900 dark:text-white">
                Seller <span className="font-serif italic font-bold text-[#6F4E37] dark:text-[#E6C280]">News & Updates</span>
              </h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">The latest platform features, tips, and success stories.</p>
            </div>
            <Link href="#" className="hidden md:flex items-center text-xs font-bold uppercase tracking-widest text-zinc-900 dark:text-white hover:text-[#6F4E37] dark:hover:text-[#E6C280] transition-colors mt-4 md:mt-0">
              View All Articles <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestNews.map((news, idx) => (
              <Link href={`/seller-blog/${news.slug}`} key={idx} className="group cursor-pointer flex flex-col h-full">
                <div className="relative h-64 w-full rounded-3xl overflow-hidden mb-6">
                  <Image 
                    src={news.image} 
                    alt={news.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500"></div>
                  <div className="absolute top-4 left-4 bg-white/90 dark:bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-white/20">
                    <news.tagIcon className="w-3 h-3 text-[#6F4E37] dark:text-[#E6C280]" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-900 dark:text-white">{news.tag}</span>
                  </div>
                </div>
                
                <div className="flex-grow flex flex-col">
                  <div className="flex items-center gap-3 text-xs text-zinc-500 font-mono mb-3">
                    <span>{news.date}</span>
                    <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700"></span>
                    <span>{news.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold font-playfair text-zinc-900 dark:text-white mb-3 group-hover:text-[#6F4E37] dark:group-hover:text-[#E6C280] transition-colors leading-snug">
                    {news.title}
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6 flex-grow">
                    {news.excerpt}
                  </p>
                  <div className="flex items-center text-xs font-bold uppercase tracking-widest text-zinc-900 dark:text-white group-hover:text-[#6F4E37] dark:group-hover:text-[#E6C280] transition-colors mt-auto">
                    Read Article <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <Link href="#" className="md:hidden flex items-center justify-center text-xs font-bold uppercase tracking-widest text-zinc-900 dark:text-white border border-stone-200 dark:border-zinc-800 rounded-xl py-4 mt-8 w-full hover:bg-stone-50 dark:hover:bg-zinc-900 transition-colors">
            View All Articles <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}

