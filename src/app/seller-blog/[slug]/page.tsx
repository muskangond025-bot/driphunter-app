"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import SellerNavbar from "@/components/layout/SellerNavbar";
import Footer from "@/components/layout/Footer";
import { ArrowLeft, ArrowRight, Clock, Calendar, Star, Zap, TrendingUp, Share2, Truck } from "lucide-react";

// Shared mock data between seller-hub and blog details
const articleData = {
  "sneakervault-success": {
    tag: "Success Story",
    tagIcon: Star,
    title: "How SneakerVault Made ₹15L in Their First Month",
    excerpt: "Discover the exact listing strategies and FBD fulfillment tactics used by our top new seller.",
    date: "Aug 28, 2026",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=1600&q=80",
    content: [
      "Starting a reselling business in the highly competitive luxury streetwear market can be daunting. But for SneakerVault, a newly registered seller on DripHunter, their first month was nothing short of historic, closing out with ₹15L in gross sales.",
      "So, what was their secret? According to founder Rahul S., it came down to two major factors: aggressive pricing on high-demand 'Grail' sneakers, and leveraging Fulfilment by DripHunter (FBD) for next-day delivery badges.",
      "\"We didn't focus on high margins initially,\" Rahul explains. \"We focused on velocity. We priced our Jordan 4s and Yeezy 350s slightly below the market average to build our Seller Score. Once buyers saw that our items shipped the exact same day thanks to DripVault consignment, the organic search traffic skyrocketed.\"",
      "SneakerVault's strategy highlights the importance of early momentum. By utilizing FBD, they completely removed the operational headache of packing and shipping, allowing them to focus 100% of their time on sourcing better inventory. Their advice for new sellers? \"Don't hoard inventory. Cash flow is more important than holding out for an extra ₹2000 on a shoe.\""
    ]
  },
  "next-day-payouts": {
    tag: "Platform Update",
    tagIcon: Zap,
    title: "Introducing Next-Day Payouts for Verified Sellers",
    excerpt: "Cash flow is king. We are rolling out T+1 NEFT settlements for sellers who maintain a 99% authenticity score.",
    date: "Sep 02, 2026",
    readTime: "2 min read",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1600&q=80",
    content: [
      "We know that in the reselling game, cash flow dictates how fast you can grow. The faster you get paid, the faster you can reinvest in new inventory.",
      "That's why starting next week, DripHunter is officially rolling out Next-Day Payouts (T+1 Settlements) for our Pro Tier Verified Sellers.",
      "Currently, standard payouts are processed on a T+2 basis after an item passes our physical authentication check. With the new update, eligible sellers will see the funds wired via NEFT/IMPS the very next business day after authentication clearance.",
      "**How to qualify:**\nTo unlock Next-Day Payouts, your store must maintain a 99% or higher authenticity pass rate over the last 90 days, with a minimum of 20 successful sales. You must also maintain a zero-cancellation record for self-shipped items.",
      "Check your Seller Dashboard under 'Financials' to see your current eligibility status!"
    ]
  },
  "grail-listing-tips": {
    tag: "Selling Tip",
    tagIcon: TrendingUp,
    title: "Mastering the Art of the 'Grail' Listing",
    excerpt: "Why high-quality lighting and detailed defect reporting actually increases your final sale price.",
    date: "Sep 10, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1600&q=80",
    content: [
      "Listing a high-value 'Grail' item—like a Dior Jordan 1 or a Supreme Box Logo hoodie—requires a different approach than listing standard general release items. Buyers spending upwards of ₹50,000 expect absolute transparency and premium presentation.",
      "**1. Lighting is Everything**\nStop taking photos on your bed with dim yellow lighting. Invest in a simple white backdrop and a ring light. Crisp, color-accurate photos build immediate trust. Buyers are willing to pay a premium for listings that look professional.",
      "**2. Hyper-Detail Defect Reporting**\nIt might sound counterintuitive, but pointing out tiny flaws actually increases buyer trust. If there is a microscopic scuff on the shoebox, photograph it and mention it. When a buyer knows exactly what they are getting, they are less likely to hesitate at checkout, and it completely eliminates the risk of a post-sale dispute.",
      "**3. The 'Story' Matters**\nFor vintage or highly rare items, use the description box to tell the item's story. What year did it release? What collection is it from? Adding context elevates the item from a mere product to a collectible asset.",
      "By applying these three principles, our data shows sellers command a 12% higher final sale price on Grail items compared to low-effort listings of the exact same product."
    ]
  },
  "fbd-fulfillment": {
    tag: "Logistics",
    tagIcon: Truck,
    title: "How Fulfilment by DripHunter (FBD) Works",
    excerpt: "Automate your shipping and storage. Let us handle the packing while you focus on sourcing.",
    date: "Sep 15, 2026",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1580674285054-bed31e145f59?w=1600&q=80",
    content: [
      "Running a streetwear reselling business out of your bedroom is fine when you are pushing 10 pairs a month. But what happens when you scale to 100? The logistics become a nightmare.",
      "Enter Fulfilment by DripHunter (FBD). FBD is our end-to-end consignment and fulfillment service designed to make selling entirely hands-off.",
      "**How it works**\nYou bulk-ship your inventory to our secure, climate-controlled warehouse. We authenticate all items upfront. When an item sells, we pack it in our premium DripHunter boxes and ship it to the buyer with Next-Day Delivery.",
      "Because the items are pre-authenticated and ready to ship, FBD listings receive a 'Next-Day' badge on the platform, which increases conversion rates by up to 45% compared to standard seller-fulfilled listings."
    ]
  },
  "seo-optimization": {
    tag: "Growth Hacks",
    tagIcon: TrendingUp,
    title: "Optimizing Your Store for DripHunter Search",
    excerpt: "Learn how the search algorithm works and get your products on the front page.",
    date: "Sep 18, 2026",
    readTime: "3 min read",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&q=80",
    content: [
      "Just because you listed an item doesn't mean buyers will find it. With thousands of products added daily, understanding DripHunter's search algorithm is crucial.",
      "**Keywords in Titles**\nAlways use the official colorway name. If you are selling the Jordan 4 Military Black, do not just write 'Jordan 4 White/Black'. Buyers search for specific colloquial names.",
      "**Fill Out All Attributes**\nWhen creating a listing, fill out the optional fields like 'Release Year', 'Box Condition', and 'Accessories included'. The search filters rely heavily on these data points. If a buyer filters by 'Original Box', and you skipped that field, your listing disappears.",
      "**Competitive Pricing**\nThe algorithm favors listings priced within 5% of the lowest ask. If your price is highly uncompetitive, it will naturally rank lower in the default 'Best Match' sorting."
    ]
  }
};

export default function SellerBlogDetail() {
  const params = useParams();
  const slug = params.slug as string;
  
  const article = articleData[slug as keyof typeof articleData];

  if (!article) {
    return (
      <div className="flex flex-col min-h-screen bg-[#FAF8F5] dark:bg-[#0C0B0A] text-zinc-900 dark:text-white font-sans antialiased">
        <SellerNavbar />
        <main className="flex-grow flex flex-col items-center justify-center p-6 text-center">
          <h1 className="text-4xl font-playfair font-bold mb-4">Article Not Found</h1>
          <p className="text-zinc-500 mb-8">The article you are looking for does not exist or has been removed.</p>
          <Link href="/seller-hub" className="bg-[#6F4E37] dark:bg-[#E6C280] text-white dark:text-black font-bold uppercase tracking-wider text-xs px-8 py-3 rounded-full">
            Back to Hub
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5] dark:bg-[#0C0B0A] text-zinc-900 dark:text-white font-sans antialiased overflow-x-hidden">
      <SellerNavbar />

      <main className="flex-grow pb-24">
        
        {/* Article Header & Hero Image */}
        <div className="w-full relative">
          <div className="h-[40vh] md:h-[60vh] w-full relative">
            <Image 
              src={article.image}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F5] via-black/40 to-black/20 dark:from-[#0C0B0A]"></div>
          </div>
          
          <div className="max-w-6xl mx-auto px-6 sm:px-12 relative -mt-32 md:-mt-48 z-10">
            <Link href="/seller-hub" className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-white/80 hover:text-white mb-6 transition-colors drop-shadow-md">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Hub
            </Link>
            
            <div className="bg-white dark:bg-[#151515] rounded-[32px] p-8 md:p-14 shadow-xl border border-stone-100 dark:border-zinc-800">
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-[#6F4E37]/10 dark:bg-[#E6C280]/10 px-3 py-1.5 rounded-full flex items-center gap-1.5">
                  <article.tagIcon className="w-3 h-3 text-[#6F4E37] dark:text-[#E6C280]" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#6F4E37] dark:text-[#E6C280]">{article.tag}</span>
                </div>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-playfair font-bold leading-tight mb-8 text-zinc-900 dark:text-white w-full">
                {article.title}
              </h1>
              
              <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 font-light mb-10 max-w-4xl">
                {article.excerpt}
              </p>
              
              <div className="flex items-center justify-between border-t border-stone-200 dark:border-zinc-800 pt-8">
                <div className="flex flex-wrap items-center gap-6 text-sm font-mono text-zinc-500">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" /> {article.date}
                  </div>
                  <span className="hidden sm:inline w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700"></span>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" /> {article.readTime}
                  </div>
                </div>
                
                <button className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-zinc-900 dark:text-white hover:text-[#6F4E37] dark:hover:text-[#E6C280] transition-colors bg-stone-100 dark:bg-zinc-900 px-6 py-3 rounded-full">
                  <Share2 className="w-4 h-4" /> Share Article
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Article Body */}
        <section className="px-6 sm:px-12 max-w-5xl mx-auto mt-20 animate-fade-in w-full text-left">
          <div className="prose prose-xl md:prose-2xl dark:prose-invert prose-stone max-w-none w-full">
            {article.content.map((paragraph, idx) => {
              // Simple parser to handle basic bold text in the mock data
              if (paragraph.startsWith("**") && paragraph.includes("**\n")) {
                const parts = paragraph.split("**\n");
                const heading = parts[0].replace("**", "");
                const text = parts[1];
                return (
                  <div key={idx} className="mb-8">
                    <h3 className="text-2xl font-bold font-playfair text-zinc-900 dark:text-white mt-8 mb-4">{heading}</h3>
                    <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">{text}</p>
                  </div>
                );
              }
              return (
                <p key={idx} className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
                  {paragraph}
                </p>
              );
            })}
          </div>
        </section>

        {/* Related Articles Footer - Full Width */}
        <section className="w-full border-t border-stone-200 dark:border-zinc-800 bg-stone-50 dark:bg-[#111111] mt-24 py-20">
          <div className="max-w-[1400px] mx-auto px-6 sm:px-12">
            <div className="flex items-center justify-between mb-12">
              <h3 className="text-3xl md:text-4xl font-playfair font-bold text-zinc-900 dark:text-white text-left">
                Keep <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280]">Reading</span>
              </h3>
              <Link href="/seller-hub#latest-news" className="hidden sm:flex text-sm font-bold uppercase tracking-widest text-[#6F4E37] dark:text-[#E6C280] hover:underline items-center gap-2">
                All Articles <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Object.entries(articleData)
                .filter(([key]) => key !== slug)
                .slice(0, 3)
                .map(([key, news]) => (
                <Link href={`/seller-blog/${key}`} key={key} className="group cursor-pointer flex flex-col h-full bg-white dark:bg-[#151515] border border-stone-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm hover:border-[#6F4E37]/50 dark:hover:border-[#E6C280]/50 transition-all duration-300">
                  <div className="relative h-48 w-full rounded-2xl overflow-hidden mb-6">
                    <Image 
                      src={news.image} 
                      alt={news.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500"></div>
                    <div className="absolute top-3 left-3 bg-white/90 dark:bg-black/80 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1.5 border border-white/20">
                      <news.tagIcon className="w-3 h-3 text-[#6F4E37] dark:text-[#E6C280]" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-900 dark:text-white truncate max-w-[120px]">{news.tag}</span>
                    </div>
                  </div>
                  
                  <div className="flex-grow flex flex-col text-left">
                    <h4 className="text-xl font-bold font-playfair text-zinc-900 dark:text-white mb-3 group-hover:text-[#6F4E37] dark:group-hover:text-[#E6C280] transition-colors leading-snug line-clamp-2">
                      {news.title}
                    </h4>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 mb-6 flex-grow">
                      {news.excerpt}
                    </p>
                    <div className="flex items-center text-xs font-bold uppercase tracking-widest text-zinc-900 dark:text-white group-hover:text-[#6F4E37] dark:group-hover:text-[#E6C280] transition-colors mt-auto">
                      Read Article <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            
            <div className="mt-12 flex sm:hidden justify-center">
              <Link href="/seller-hub#latest-news" className="bg-white dark:bg-[#151515] text-zinc-900 dark:text-white font-bold uppercase tracking-wider text-xs px-8 py-4 rounded-full hover:bg-stone-50 dark:hover:bg-zinc-800 transition-colors border border-stone-200 dark:border-zinc-800 w-full text-center">
                All Articles
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
