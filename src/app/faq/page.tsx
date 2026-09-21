"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SearchOverlay from "@/components/layout/SearchOverlay";
import Link from "next/link";
import gsap from "gsap";
import Lenis from "lenis";
import {
  HelpCircle,
  Search,
  ShoppingBag,
  CreditCard,
  Truck,
  RotateCcw,
  User,
  ShieldCheck,
  Building,
  Sparkles,
  Mail,
  MessageSquare,
  Layers,
  Plus,
  Minus
} from "lucide-react";

interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
  points?: string[];
}

export default function FAQPage() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    "orders-1": true,
    "authenticity-1": true,
  });

  const heroRef = useRef<HTMLDivElement>(null);

  // Initialize Lenis for buttery smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // GSAP Text Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate badges
      gsap.fromTo(
        ".hero-badge",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" }
      );
      
      // Animate title
      gsap.fromTo(
        ".hero-title",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 0.2, ease: "power4.out" }
      );

      // Animate description
      gsap.fromTo(
        ".hero-desc",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 0.4, ease: "power3.out" }
      );

      // Animate search bar
      gsap.fromTo(
        ".hero-search",
        { scale: 0.95, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, delay: 0.6, ease: "back.out(1.2)" }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const toggleAccordion = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const categories = [
    { id: "all", label: "All Questions", count: 32, icon: Layers },
    { id: "orders", label: "Orders", count: 4, icon: ShoppingBag },
    { id: "payments", label: "Payments", count: 4, icon: CreditCard },
    { id: "shipping", label: "Shipping", count: 4, icon: Truck },
    { id: "returns", label: "Returns", count: 4, icon: RotateCcw },
    { id: "account", label: "Account", count: 4, icon: User },
    { id: "authenticity", label: "Authenticity", count: 4, icon: ShieldCheck },
    { id: "seller", label: "Seller", count: 4, icon: Building },
    { id: "affiliate", label: "Affiliate", count: 4, icon: Sparkles },
  ];

  const faqData: FAQItem[] = [
    // 1. ORDERS
    {
      id: "orders-1",
      category: "orders",
      question: "How do I place an order during a limited hype sneaker drop?",
      answer: "During high-heat drop events, add your desired size to the cart immediately. Your cart locks your pair for 10 minutes to allow you to complete checkout and OTP payment without bot snipers stealing your allocation.",
      points: [
        "Sign in beforehand to pre-save your shipping address and payment method.",
        "Ensure your mobile number is verified for instant 3D-Secure bank OTP entry.",
        "A confirmation SMS and order ID will be generated upon successful authorization."
      ]
    },
    {
      id: "orders-2",
      category: "orders",
      question: "Can I modify or cancel my order after placement?",
      answer: "You can cancel your order within 2 hours of placement directly from your Account > My Orders page before the item enters physical vault legit verification.",
      points: [
        "Once an order is marked 'Vault In-Inspection', modifications cannot be made.",
        "If you need to adjust your shipping address, contact support within 1 hour."
      ]
    },
    {
      id: "orders-3",
      category: "orders",
      question: "Where can I check the live status of my active order?",
      answer: "Navigate to Account > My Orders in the top navigation bar. You will find real-time status updates: Order Placed → Vault Verified → Dispatched → In-Transit → Out for Delivery.",
    },
    {
      id: "orders-4",
      category: "orders",
      question: "What happens if an item in my cart sells out during checkout?",
      answer: "In the rare event that another collector completes payment milliseconds earlier during extreme concurrency drops, your cart will notify you instantly and no funds will be captured.",
    },

    // 2. PAYMENTS
    {
      id: "payments-1",
      category: "payments",
      question: "What payment methods are accepted on DripHunter?",
      answer: "We support all major RBI-compliant Indian payment channels through our PCI-DSS Level 1 encrypted payment gateway:",
      points: [
        "UPI 2.0 (Google Pay, PhonePe, Paytm, BHIM, CRED)",
        "Credit / Debit Cards (Visa, Mastercard, RuPay, American Express)",
        "Net Banking across 50+ Indian banks",
        "Cash on Delivery (COD) on eligible pin codes up to ₹10,000"
      ]
    },
    {
      id: "payments-2",
      category: "payments",
      question: "Is Cash on Delivery (COD) available for all postal PIN codes?",
      answer: "Cash on Delivery is available across 20,000+ Indian PIN codes for orders up to ₹10,000. A nominal courier handling fee of ₹49 is applied to cash transactions upon doorstep delivery.",
    },
    {
      id: "payments-3",
      category: "payments",
      question: "Is my card and financial data secure?",
      answer: "Yes, 100%. DripHunter enforces a strict zero-raw-card-storage policy. Your payment data is tokenized via RBI-certified banking gateways with 256-bit TLS 1.3 encryption.",
    },
    {
      id: "payments-4",
      category: "payments",
      question: "What happens if money is deducted but my order failed?",
      answer: "If your bank debited funds during a connection drop, our automated banking gateway automatically flags the transaction. Your bank will release and credit the exact amount back to your source account within 24 to 48 banking hours.",
    },

    // 3. SHIPPING
    {
      id: "shipping-1",
      category: "shipping",
      question: "How long does standard delivery take?",
      answer: "Orders are processed through our Mumbai Vault within 24–48 hours. Transit timelines depend on your delivery location:",
      points: [
        "Metro Cities (Mumbai, Delhi NCR, Bangalore, Hyderabad, Chennai, Kolkata, Pune): 2 – 4 business days",
        "Tier 2 & Tier 3 Regional Cities: 4 – 7 business days",
        "Special & Remote Zones (North-East, J&K, Islands): 7 – 10 business days"
      ]
    },
    {
      id: "shipping-2",
      category: "shipping",
      question: "Do you offer free shipping on streetwear and sneaker orders?",
      answer: "Yes! All orders with a cart total of ₹1,999 and above receive complimentary free standard shipping across India. Orders below ₹1,999 carry a flat ₹99 delivery charge.",
    },
    {
      id: "shipping-3",
      category: "shipping",
      question: "How do I track my dispatched package?",
      answer: "As soon as your package leaves our fulfillment vault, an Airway Bill (AWB) tracking number is generated and sent via SMS and Email with a live courier tracking link (Delhivery, BlueDart, Shadowfax).",
    },
    {
      id: "shipping-4",
      category: "shipping",
      question: "Do you ship internationally outside India?",
      answer: "Yes, DripHunter ships selected streetwear grails and deadstock sneakers worldwide to the US, UK, UAE, Singapore, Canada, and the EU via DHL Express and FedEx International (7–14 business days, DDU terms).",
    },

    // 4. RETURNS
    {
      id: "returns-1",
      category: "returns",
      question: "What is DripHunter's return policy and window?",
      answer: "We provide a 7-day hassle-free return window for standard catalog apparel and sneakers from the exact date of doorstep delivery, and a 10-day window for size exchanges.",
    },
    {
      id: "returns-2",
      category: "returns",
      question: "How do I initiate a size exchange for sneakers or oversized apparel?",
      answer: "Go to Account > My Orders, select the delivered item, click 'Request Return / Exchange', and pick your replacement size. We offer a free 1-time size exchange with instant vault inventory reservation.",
    },
    {
      id: "returns-3",
      category: "returns",
      question: "When will I receive my refund after returning an item?",
      answer: "Once the reverse courier delivers the parcel to our Mumbai Vault, our quality control team completes inspection within 24–48 hours. Approved refunds settle within 3 to 5 business days back to your original payment source (UPI / Card / Bank).",
    },
    {
      id: "returns-4",
      category: "returns",
      question: "Which products are non-returnable?",
      answer: "Items with cut or removed DripHunter security tags, intimate wear/socks, customized 1-of-1 creations, and archive pieces explicitly marked 'Final Sale / Non-Returnable' on the drop page cannot be returned.",
    },

    // 5. ACCOUNT
    {
      id: "account-1",
      category: "account",
      question: "How do I create or manage my DripHunter account?",
      answer: "Click the Profile icon in the top header and sign up using your mobile number (instant OTP) or Google account. Once signed in, you can pre-save your sneaker sizing (UK/US), delivery addresses, and wishlist grails.",
    },
    {
      id: "account-2",
      category: "account",
      question: "Can I update my registered phone number or shipping address?",
      answer: "Yes, you can edit saved addresses, default sizing attributes, and contact preferences anytime from your Account Settings dashboard.",
    },
    {
      id: "account-3",
      category: "account",
      question: "How do I reset my password or login credentials?",
      answer: "Click 'Login' in the navigation bar and select 'Forgot Password' or choose 'Login with Mobile OTP' for instant 1-click passwordless sign-in.",
    },
    {
      id: "account-4",
      category: "account",
      question: "How do I permanently delete my account and personal data?",
      answer: "Under the DPDP Act 2023, you have the right to account erasure. Simply send a request from your registered email to privacy@driphunter.com, and our Data Protection Officer will process account anonymization within 30 days.",
    },

    // 6. AUTHENTICITY
    {
      id: "authenticity-1",
      category: "authenticity",
      question: "How does DripHunter guarantee 100% product authenticity?",
      answer: "Every single sneaker pair, designer hoodie, and streetwear grail is physically delivered to our Mumbai Vault before reaching the customer. Our veteran authenticators conduct an exhaustive multi-point legit check:",
      points: [
        "UV blacklight inspection for factory glue stamps and hidden batch flaws",
        "Stitch density, typography kerning, and RFID chip verification against our Culture-Circle master database",
        "Sole flexibility, insole underside patterns, and weight balance matching verified deadstock samples"
      ]
    },
    {
      id: "authenticity-2",
      category: "authenticity",
      question: "What is the 200% Authenticity Guarantee?",
      answer: "We stand behind our curation with an ironclad promise: if any item purchased on DripHunter is ever proven non-genuine by an authorized brand store, we issue an immediate 200% money-back refund (double your purchase price).",
    },
    {
      id: "authenticity-3",
      category: "authenticity",
      question: "What is the DripHunter / Culture-Circle Security Tag?",
      answer: "It is a serialized, tamper-evident security seal attached to every authenticated piece. Once attached, it certifies that the item passed vault inspection. Removing or breaking the tag voids standard return eligibility.",
    },
    {
      id: "authenticity-4",
      category: "authenticity",
      question: "Can I verify the authentication certificate of my pair?",
      answer: "Yes. Scan the unique QR code on the attached vault hangtag with your smartphone camera to view the verified inspection ledger, inspector ID, and timestamp.",
    },

    // 7. SELLER
    {
      id: "seller-1",
      category: "seller",
      question: "How do I become a verified seller or consignor on DripHunter?",
      answer: "Visit our 'Become a Seller' page and submit your brand catalog or consignment inventory details along with your GSTIN and PAN credentials. Our seller onboarding team reviews applications within 48 hours.",
    },
    {
      id: "seller-2",
      category: "seller",
      question: "What is the seller commission structure and payout timeline?",
      answer: "We offer competitive tiered marketplace commission rates. Payouts for sold and delivered items are automatically calculated and transferred directly to your registered bank account every Tuesday via NEFT/IMPS.",
    },
    {
      id: "seller-3",
      category: "seller",
      question: "How are seller products dispatched to buyers?",
      answer: "When an item sells, the seller ships the product to our Mumbai Fulfillment Vault. We handle the physical legit check, repackaging with premium tamper-proof boxes, and doorstep buyer delivery with insurance.",
    },
    {
      id: "seller-4",
      category: "seller",
      question: "What happens if a buyer requests a return on a seller item?",
      answer: "Returned items are delivered back to our vault and inspected by QC specialists. If the item is in pristine original condition with intact security tags, it is safely re-listed on the seller portal.",
    },

    // 8. AFFILIATE
    {
      id: "affiliate-1",
      category: "affiliate",
      question: "How does the DripHunter Creator & Affiliate Program work?",
      answer: "Content creators, streetwear curators, and hype stylists earn up to 10% commission on every qualifying sale generated through their unique tracking links and custom discount codes.",
    },
    {
      id: "affiliate-2",
      category: "affiliate",
      question: "When and how are affiliate commissions paid?",
      answer: "Affiliate commissions are calculated on net sales (excluding returns) and settled on the 10th of every month directly via UPI or NEFT bank transfer for balances exceeding ₹1,000.",
    },
    {
      id: "affiliate-3",
      category: "affiliate",
      question: "What is the cookie attribution duration for referral links?",
      answer: "We provide a generous 30-day tracking cookie window. If a follower clicks your link and makes a purchase within 30 days, you earn commission on that order.",
    },
    {
      id: "affiliate-4",
      category: "affiliate",
      question: "Do top affiliates receive exclusive drop seeding boxes?",
      answer: "Yes! Top-tier creator partners receive complimentary seasonal PR seeding boxes, early VIP access to limited sneaker drops, and exclusive community giveaways.",
    },
  ];

  // Filter FAQs based on selected category and search query
  const filteredFAQs = useMemo(() => {
    return faqData.filter((item) => {
      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5] text-zinc-900 font-sans antialiased overflow-x-hidden select-none">
      {/* Navbar & Search */}
      <Navbar onSearchClick={() => setIsSearchOpen(true)} />

      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      {/* ─── 1. BRIGHT LUXURY E-COMMERCE FAQ HERO HEADER ─── */}
      <section 
        ref={heroRef}
        className="relative w-full min-h-[50vh] md:min-h-[70vh] flex flex-col justify-center overflow-hidden bg-gradient-to-b from-[#F4EFEA] via-[#FAF8F5] to-[#FAF8F5] border-b border-stone-200/80 px-4 sm:px-8 lg:px-12 xl:px-16 max-md:py-16"
      >
        {/* Subtle Decorative Grid Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#6F4E37_1px,transparent_1px)] [background-size:28px_28px] opacity-[0.03] pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-[500px] h-[300px] bg-amber-200/20 blur-[130px] rounded-full pointer-events-none" />

        <div className="w-full relative z-10 space-y-5 md:space-y-7 text-center">
          
          {/* Top Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <div className="hero-badge inline-flex items-center gap-2 bg-white border border-stone-300 text-[#6F4E37] font-mono text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] px-3 md:px-4 py-1.5 rounded-full shadow-sm">
              <HelpCircle className="w-3 h-3 md:w-3.5 md:h-3.5 text-[#C5A880]" />
              <span>FREQUENTLY ASKED QUESTIONS</span>
            </div>

            <div className="hero-badge inline-flex items-center gap-2 bg-white border border-stone-300 text-emerald-700 font-mono text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] px-3 md:px-4 py-1.5 rounded-full shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>INSTANT ACCORDION ANSWERS</span>
            </div>
          </div>

          {/* Main Headline */}
          <div className="space-y-3 w-full">
            <h1 className="hero-title text-3xl md:text-5xl lg:text-6xl font-light tracking-tight text-zinc-950 dark:text-zinc-50 font-playfair leading-[1.05] uppercase">
              FREQUENTLY ASKED <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280] lowercase">questions</span>
            </h1>
            <p className="hero-desc text-xs sm:text-sm md:text-base text-zinc-600 font-sans font-normal max-w-3xl mx-auto leading-relaxed max-md:px-2">
              Find quick, clear answers about orders, payments, shipping, returns, account settings, 100% vault authenticity, seller consignment, and affiliate partnerships.
            </p>
          </div>

          {/* Interactive Search Bar */}
          <div className="hero-search w-full max-w-[1600px] mx-auto px-2 sm:px-12 md:px-16 lg:px-20 relative">
            <div className="flex items-center bg-white border-2 border-stone-300 focus-within:border-[#6F4E37] rounded-full px-4 md:px-5 py-3 md:py-3.5 shadow-md transition-all duration-200">
              <Search className="w-4 h-4 md:w-5 md:h-5 text-zinc-400 mr-3 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search questions (e.g. tracking, size exchange)..."
                className="w-full bg-transparent text-xs md:text-sm text-zinc-900 placeholder-zinc-400 outline-none font-sans"
              />
              {searchQuery && (
               <button
                  onClick={() => setSearchQuery("")}
                  className="text-[10px] md:text-xs text-zinc-400 hover:text-zinc-700 p-1 border-none bg-transparent cursor-pointer font-mono"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. CATEGORY PILL SELECTOR ─── */}
      <div className="sticky top-16 z-30 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-stone-200/80 py-3 px-4 sm:px-8 lg:px-12 xl:px-16 shadow-xs">
        <div className="w-full flex items-center gap-2 overflow-x-auto no-scrollbar py-1 text-[10px] md:text-xs font-mono">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full whitespace-nowrap transition-all duration-200 flex items-center gap-2 cursor-pointer border shrink-0 font-medium ${
                  isActive
                    ? "bg-[#6F4E37] text-white border-[#6F4E37] shadow-sm font-bold scale-[1.01]"
                    : "bg-white hover:bg-stone-100 text-zinc-600 hover:text-zinc-900 border-stone-200"
                }`}
              >
                <Icon className="w-3 h-3 md:w-3.5 md:h-3.5" />
                <span>{cat.label}</span>
                <span
                  className={`text-[9px] md:text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isActive ? "bg-white/20 text-white" : "bg-stone-100 text-zinc-500"
                  }`}
                >
                  {cat.id === "all" ? faqData.length : faqData.filter((i) => i.category === cat.id).length}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── 3. MAIN ACCORDION LIST SECTION ─── */}
      <main className="flex-grow py-8 md:py-12 px-4 sm:px-12 md:px-16 lg:px-20 w-full max-w-[1600px] mx-auto space-y-6 md:space-y-8">
        
        {filteredFAQs.length === 0 ? (
          <div className="py-12 md:py-16 text-center space-y-4 bg-white border border-stone-200 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-sm">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#6F4E37]/10 text-[#6F4E37] flex items-center justify-center mx-auto">
              <Search className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <h3 className="text-base md:text-lg font-mono font-bold uppercase text-zinc-900">
              No matching questions found
            </h3>
            <p className="text-[10px] md:text-xs text-zinc-600 max-w-sm mx-auto">
              We couldn't find any FAQs matching "{searchQuery}". Try searching with another keyword or reach out directly to our support desk.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="inline-flex items-center gap-2 px-4 md:px-5 py-2 md:py-2.5 rounded-full bg-[#6F4E37] text-white text-[10px] md:text-xs font-mono font-bold uppercase hover:bg-[#5C3D2E] transition-colors cursor-pointer border-none shadow-sm"
            >
              <span>Reset Filters</span>
            </button>
          </div>
        ) : (
          <div className="space-y-3 md:space-y-4 text-left">
            {filteredFAQs.map((faq) => {
              const isOpen = !!openItems[faq.id];
              return (
                <div
                  key={faq.id}
                  className={`rounded-2xl md:rounded-3xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden border ${
                    isOpen
                      ? "bg-white border-[#6F4E37]/40 shadow-md"
                      : "bg-white/80 hover:bg-white border-stone-200/90 shadow-2xs hover:shadow-sm"
                  }`}
                >
                  {/* Accordion Header / Trigger Button */}
                  <button
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full p-4 md:p-5 lg:p-6 text-left flex items-center justify-between gap-4 cursor-pointer border-none bg-transparent select-none focus:outline-none group"
                    aria-expanded={isOpen}
                  >
                    <div className="space-y-1 md:space-y-1.5 pr-2 flex-1">
                      <div className="flex items-center gap-2 mb-1 md:mb-0">
                        <span className="text-[8px] md:text-[9px] font-mono font-bold uppercase tracking-wider text-[#6F4E37] bg-[#FAF4EF] border border-[#6F4E37]/20 px-2 md:px-2.5 py-0.5 rounded-full">
                          {faq.category}
                        </span>
                      </div>
                      <h3 className={`text-sm md:text-base lg:text-lg font-medium leading-snug font-sans transition-colors duration-300 ${isOpen ? "text-[#6F4E37]" : "text-zinc-900 group-hover:text-[#6F4E37]"}`}>
                        {faq.question}
                      </h3>
                    </div>

                    <div
                      className={`relative w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] border ${
                        isOpen
                          ? "bg-[#6F4E37] border-[#6F4E37] shadow-lg shadow-[#6F4E37]/20 scale-110"
                          : "bg-stone-50 border-stone-200 text-zinc-500 group-hover:bg-white group-hover:border-stone-300 group-hover:text-zinc-900"
                      }`}
                    >
                      <Plus 
                        className={`absolute w-4 h-4 md:w-5 md:h-5 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                          isOpen ? "rotate-90 opacity-0 scale-50" : "rotate-0 opacity-100 scale-100"
                        }`}
                      />
                      <Minus 
                        className={`absolute w-4 h-4 md:w-5 md:h-5 text-white transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                          isOpen ? "rotate-0 opacity-100 scale-100" : "-rotate-90 opacity-0 scale-50"
                        }`}
                      />
                    </div>
                  </button>

                  {/* Accordion Content Panel with Grid Transition for Smooth Slide */}
                  <div 
                    className="grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <div className="px-4 md:px-5 lg:px-6 pb-5 md:pb-6 pt-1 text-zinc-600 text-xs md:text-sm font-sans border-t border-stone-100 space-y-3 leading-relaxed opacity-0 animate-fade-in-up" style={{ animationFillMode: "forwards", animationDelay: isOpen ? "150ms" : "0ms" }}>
                        <p>{faq.answer}</p>

                        {faq.points && faq.points.length > 0 && (
                          <ul className="space-y-1.5 pl-4 md:pl-5 list-disc text-zinc-700 pt-1">
                            {faq.points.map((pt, idx) => (
                              <li key={idx} className="text-[11px] md:text-xs leading-relaxed">
                                {pt}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ─── 4. BOTTOM SUPPORT CONCIERGE BANNER ─── */}
        <div className="p-5 md:p-7 lg:p-8 rounded-2xl md:rounded-3xl bg-gradient-to-r from-[#F4EFEA] to-[#FAF8F5] border border-stone-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-5 md:gap-6 text-center md:text-left mt-8 md:mt-12">
          <div className="space-y-1.5 w-full md:w-auto">
            <span className="text-[9px] md:text-[10px] font-mono text-[#6F4E37] uppercase tracking-widest font-bold block">
              STILL HAVE QUESTIONS?
            </span>
            <h3 className="text-lg md:text-xl font-mono font-bold uppercase text-zinc-900">
              Speak with Our Support Concierge
            </h3>
            <p className="text-[10px] md:text-xs text-zinc-600 max-w-md font-sans mx-auto md:mx-0">
              Our support team is available Monday to Saturday (10:00 AM – 7:00 PM IST) to assist with order tracking, sizing guidance, and vault authenticity.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2 md:gap-3 shrink-0 w-full md:w-auto">
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 md:px-6 py-2.5 md:py-3 rounded-xl bg-[#6F4E37] hover:bg-[#5C3D2E] text-white text-[10px] md:text-xs font-mono font-bold uppercase tracking-wider transition-colors shadow-sm"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Contact Support</span>
            </Link>

            <a
              href="mailto:support@driphunter.com"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 md:px-5 py-2.5 md:py-3 rounded-xl bg-white hover:bg-stone-50 border border-stone-300 text-zinc-700 text-[10px] md:text-xs font-mono font-medium transition-colors shadow-2xs"
            >
              <Mail className="w-3.5 h-3.5 text-[#6F4E37]" />
              <span>Email Us</span>
            </a>
          </div>
        </div>

      </main>

      {/* Site Footer */}
      <Footer />
    </div>
  );
}
