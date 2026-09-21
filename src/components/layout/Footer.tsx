"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Send, Lock, ShieldCheck, Truck, ArrowUp, Mail, X, Check } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const quickLinks = [
  { href: "/about", label: "About Us" },
  { href: "/deals", label: "Deals" },
  { href: "/gift-cards", label: "Gift Cards" },
  { href: "/shop", label: "Shop Catalog" },
  { href: "/affiliate", label: "Affiliate Program" },
  { href: "/become-seller", label: "Become a Seller" },
  { href: "/store-locator", label: "Store Locator" },
  { href: "/blog", label: "Blog" },
  { href: "/refer-and-earn", label: "Refer & Earn" },
];

const supportLinks = [
  { href: "/faq", label: "FAQ" },
  { href: "/shipping", label: "Shipping Policy" },
  { href: "/returns", label: "Returns & Refunds" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms & Conditions" },
  { href: "/contact", label: "Contact Us" },
  { href: "/support/tickets", label: "Help & Support" },
];

const footerLinks = [
  {
    title: "DISCOVER",
    links: [
      { href: "/shop", label: "Shop" },
      { href: "/brands", label: "Brands" },
      { href: "/blog", label: "Blog" },
      { href: "/about", label: "About Us" },
      { href: "/affiliate", label: "Affiliate Program" },
      { href: "/become-seller", label: "Become a Seller" },
      { href: "/gift-cards", label: "Gift Cards" },
    ],
  },
  {
    title: "OFFERS",
    links: [
      { href: "/deals", label: "Deals & Offers" },
      { href: "/refer-and-earn", label: "Refer & Earn" },
    ],
  },
  {
    title: "CUSTOMER CARE",
    links: [
      { href: "/contact", label: "Contact Us" },
      { href: "/faq", label: "FAQ" },
      { href: "/support/tickets", label: "Support Tickets" },
      { href: "/shipping", label: "Shipping" },
      { href: "/returns", label: "Returns & Refunds" },
    ],
  },
  {
    title: "LEGAL",
    links: [
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms & Conditions" },
    ],
  },
];

export default function Footer() {
  const { ref, isVisible } = useScrollAnimation();

  const [isContactOpen, setIsContactOpen] = useState(false);
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactSubject, setContactSubject] = useState("Order Inquiry");
  const [contactMessage, setContactMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setNewsletterSubscribed(true);
    setNewsletterEmail("");
    setTimeout(() => {
      setNewsletterSubscribed(false);
    }, 4000);
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactEmail.trim() || !contactMessage.trim()) return;
    
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setIsSubmitting(false);
    setSubmitted(true);
    
    setTimeout(() => {
      setSubmitted(false);
      setIsContactOpen(false);
      setContactName("");
      setContactEmail("");
      setContactSubject("Order Inquiry");
      setContactMessage("");
    }, 2500);
  };

  return (
    <footer className="bg-gradient-to-b from-zinc-950 via-black to-black text-white border-t border-[#6F4E37]/20 py-4 relative overflow-hidden select-none">
      {/* Background Radial Glow Layer 1 (Coffee) */}
      <div className="absolute top-0 left-1/3 -translate-x-1/2 w-[600px] h-[600px] bg-[#6F4E37]/8 rounded-full filter blur-[130px] pointer-events-none z-0" />
      
      {/* Background Radial Glow Layer 2 (Warm Gold Core) */}
      <div className="absolute top-0 left-2/3 -translate-x-1/2 w-[400px] h-[400px] bg-amber-500/3 rounded-full filter blur-[100px] pointer-events-none z-0" />

      <div
        ref={ref}
        className={`w-full max-w-[1600px] mx-auto px-6 sm:px-12 md:px-16 lg:px-20relative z-10 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Main Columns Grid - Original Items */}
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-8 md:gap-4 pb-8 md:pb-4 border-b border-zinc-900/60">
          {/* Brand Column */}
          <div className="space-y-5 md:space-y-3 flex flex-col items-center md:items-start w-full md:w-auto">
            <h2 className="text-4xl md:text-4xl font-light tracking-tight text-white font-playfair leading-none">
              DRIP <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280]">HUNTER</span>
            </h2>
            
            {/* Redesigned Premium Socials */}
            <div className="flex items-center justify-center md:justify-start gap-3">
              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                id="footer-social-ig"
                className="w-10 h-10 rounded-full bg-zinc-900/40 hover:bg-[#6F4E37]/15 border border-zinc-800 hover:border-[#6F4E37]/40 flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer text-zinc-400 hover:text-white"
                aria-label="Instagram Link"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>

              {/* Twitter / X */}
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                id="footer-social-tw"
                className="w-10 h-10 rounded-full bg-zinc-900/40 hover:bg-[#6F4E37]/15 border border-zinc-800 hover:border-[#6F4E37]/40 flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer text-zinc-400 hover:text-white"
                aria-label="Twitter Link"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                id="footer-social-fb"
                className="w-10 h-10 rounded-full bg-zinc-900/40 hover:bg-[#6F4E37]/15 border border-zinc-800 hover:border-[#6F4E37]/40 flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer text-zinc-400 hover:text-white"
                aria-label="Facebook Link"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
            </div>
          </div>

          {/* Newsletter Column */}
          <div className="w-full md:w-auto flex flex-col items-center md:items-start gap-5 md:gap-3">
            <div className="space-y-2 md:space-y-1 text-center md:text-left w-full">
              <h3 className="text-[12px] md:text-[11px] font-bold tracking-widest uppercase font-mono text-white">Join The Club</h3>
              <p className="text-[12px] md:text-[11px] text-zinc-400 font-sans max-w-[280px] mx-auto md:mx-0">Get insider access to exclusive drops, archive sales, and private events.</p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-sm mx-auto md:mx-0">
            
            {newsletterSubscribed ? (
              <div className="flex items-center gap-2 text-xs text-emerald-500 font-sans font-medium py-2 animate-bounce-in">
                <Check className="w-4 h-4 shrink-0 text-emerald-500" />
                <span>Successfully subscribed to Drip Hunter newsletter!</span>
              </div>
            ) : (
              <form className="space-y-3" onSubmit={handleNewsletterSubmit}>
                <div className="relative flex items-center bg-zinc-900/90 border border-zinc-600 rounded-full pl-4 pr-1.5 py-1.5 focus-within:border-[#C5A880] focus-within:ring-1 focus-within:ring-[#C5A880]/30 transition-all duration-350 shadow-sm">
                  <Mail className="w-4 h-4 text-zinc-300 mr-2.5 shrink-0" />
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter email address"
                    className="flex-1 bg-transparent border-none outline-none py-1.5 text-xs font-sans text-white placeholder-zinc-300 focus:ring-0 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="bg-white hover:bg-[#6F4E37] text-zinc-950 hover:text-white p-2 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95 group border-none shrink-0"
                    aria-label="Subscribe"
                  >
                    <Send className="w-3.5 h-3.5 text-zinc-850 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                  </button>
                </div>
              </form>
            )}
            </div>
          </div>
        </div>

        {/* Dynamic Link Columns - New Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10 py-8 border-b border-zinc-900/60 text-left">
          {footerLinks.map((section) => (
            <div key={section.title} className="space-y-5">
              <h3 className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.25em] text-[#C5A880] font-mono relative after:content-[''] after:block after:w-5 after:h-[1px] after:bg-[#6F4E37]/60 after:mt-2.5">
                {section.title}
              </h3>
              <ul className="space-y-3 text-xs text-zinc-400 font-sans font-light">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="hover:text-[#C5A880] hover:translate-x-1 transition-all duration-300 ease-out inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Redesigned Premium Bottom Glass Trust Bar */}
        <div className="my-8 md:my-3 py-6 md:py-3 px-6 bg-zinc-900/10 border border-zinc-900/60 backdrop-blur-sm rounded-3xl md:rounded-full grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-2 text-left md:text-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.01)]">
          <div className="flex items-center justify-start md:justify-center gap-4 md:gap-3 text-[10px] md:text-[11px] uppercase tracking-[0.18em] font-medium text-zinc-400 hover:text-zinc-200 transition-colors duration-300">
            <div className="w-10 h-10 md:w-8 md:h-8 shrink-0 rounded-full bg-[#6F4E37]/10 flex items-center justify-center text-[#C5A880]">
              <Lock className="w-4 h-4 md:w-3.5 md:h-3.5" />
            </div>
            <span>Secure Checkout SSL</span>
          </div>
          <div className="flex items-center justify-start md:justify-center gap-4 md:gap-3 text-[10px] md:text-[11px] uppercase tracking-[0.18em] font-medium text-zinc-400 hover:text-zinc-200 transition-colors duration-300">
            <div className="w-10 h-10 md:w-8 md:h-8 shrink-0 rounded-full bg-[#6F4E37]/10 flex items-center justify-center text-[#C5A880]">
              <ShieldCheck className="w-4 h-4 md:w-3.5 md:h-3.5" />
            </div>
            <span>100% Authenticity Check</span>
          </div>
          <div className="flex items-center justify-start md:justify-center gap-4 md:gap-3 text-[10px] md:text-[11px] uppercase tracking-[0.18em] font-medium text-zinc-400 hover:text-zinc-200 transition-colors duration-300">
            <div className="w-10 h-10 md:w-8 md:h-8 shrink-0 rounded-full bg-[#6F4E37]/10 flex items-center justify-center text-[#C5A880]">
              <Truck className="w-4 h-4 md:w-3.5 md:h-3.5" />
            </div>
            <span>Carbon Neutral Shipping</span>
          </div>
        </div>

        {/* Footer Copyright and Back to Top Row */}
        <div className="pt-2 pb-6 md:pb-2 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-2 font-sans text-xs text-zinc-500">
          <div className="text-[10px] text-zinc-400 tracking-wider font-medium uppercase font-mono text-center md:text-left">
            © 2026 DRIP HUNTER INC. ALL RIGHTS RESERVED.
          </div>
          
          <button
            onClick={handleScrollToTop}
            className="w-11 h-11 md:mr-20 rounded-full bg-zinc-900/40 hover:bg-[#6F4E37] border border-zinc-800 hover:border-[#6F4E37] flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer text-zinc-400 hover:text-white"
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ─── CONTACT US MODAL / OVERLAY ─── */}
      {isContactOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md">
          <div className="bg-zinc-900 border border-zinc-800 w-full max-w-lg rounded-[32px] overflow-hidden p-8 space-y-6 text-white relative shadow-2xl animate-fade-in-up">
            
            {/* Close Button */}
            <button
              onClick={() => setIsContactOpen(false)}
              className="absolute top-6 right-6 p-2 bg-zinc-800/40 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-full transition-colors cursor-pointer border-none"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#6F4E37]/20 border border-[#6F4E37] flex items-center justify-center animate-bounce-in">
                  <Check className="w-8 h-8 text-[#6F4E37]" />
                </div>
                <h3 className="text-xl font-bold uppercase tracking-wider font-mono">
                  Message Sent
                </h3>
                <p className="text-xs text-zinc-400 max-w-xs leading-relaxed">
                  Thank you for reaching out, {contactName}. Our team will contact you at {contactEmail} within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-5 text-left">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-[#6F4E37] uppercase tracking-widest font-black block">
                    Get in Touch
                  </span>
                  <h3 className="text-xl sm:text-2xl font-light uppercase tracking-tight font-serif">
                    Contact Drip Support
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                    Have questions about an order, drops, or selling with us? Send us a message directly.
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Name field */}
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-mono text-zinc-400 uppercase font-bold">Full Name</label>
                    <input
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="e.g. Abhishek Yadav"
                      className="w-full bg-zinc-950 border border-zinc-800 focus:border-[#6F4E37] outline-none rounded-xl px-4 py-3 text-xs font-sans text-white placeholder-zinc-600"
                    />
                  </div>

                  {/* Email field */}
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-mono text-zinc-400 uppercase font-bold">Email Address</label>
                    <input
                      type="email"
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="e.g. abhishek@mail.com"
                      className="w-full bg-zinc-950 border border-zinc-800 focus:border-[#6F4E37] outline-none rounded-xl px-4 py-3 text-xs font-sans text-white placeholder-zinc-600"
                    />
                  </div>

                  {/* Subject Dropdown */}
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-mono text-zinc-400 uppercase font-bold">Subject Inquiry</label>
                    <select
                      value={contactSubject}
                      onChange={(e) => setContactSubject(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 focus:border-[#6F4E37] outline-none rounded-xl px-4 py-3 text-xs font-sans text-white cursor-pointer"
                    >
                      <option value="Order Inquiry">Order Inquiry & Tracking</option>
                      <option value="Become a Seller">Seller Onboarding</option>
                      <option value="Affiliate Program">Affiliate / Partnership</option>
                      <option value="Feedback">General Feedback</option>
                    </select>
                  </div>

                  {/* Message field */}
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-mono text-zinc-400 uppercase font-bold">Message Details</label>
                    <textarea
                      required
                      rows={4}
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      placeholder="Describe your inquiry in detail..."
                      className="w-full bg-zinc-950 border border-zinc-800 focus:border-[#6F4E37] outline-none rounded-xl px-4 py-3 text-xs font-sans text-white placeholder-zinc-600 resize-none"
                    />
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-zinc-400">
                    <Mail className="w-3.5 h-3.5 text-[#6F4E37]" />
                    <span className="text-[10px] font-mono">support@driphunter.com</span>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#6F4E37] hover:bg-[#5C3D2E] disabled:bg-zinc-800 text-white px-6 py-3 rounded-xl text-[10px] font-mono font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer border-none shadow-md shrink-0"
                  >
                    <span>{isSubmitting ? "Sending..." : "Submit Inquiry"}</span>
                    <Send className="w-3 h-3 text-[#D4AF37]" />
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}
    </footer>
  );
}
// Trivial change to force TS language server reload

