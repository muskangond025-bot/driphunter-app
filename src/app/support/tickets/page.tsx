"use client";

import React, { useState, useRef, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SearchOverlay from "@/components/layout/SearchOverlay";
import { 
  LifeBuoy, Plus, List, Paperclip,
  ChevronDown, CheckCircle2, Clock, AlertCircle, 
  ArrowLeft, Send, Upload, Info, Trash2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Surface } from "@/components/ui/Surface";
import { Input } from "@/components/ui/input";
import gsap from "gsap";
import Lenis from "lenis";

type TicketStatus = "In Progress" | "Resolved" | "Waiting for Reply";

interface Ticket {
  id: string;
  category: string;
  subject: string;
  status: TicketStatus;
  date: string;
  orderNumber?: string;
}

const MOCK_TICKETS: Ticket[] = [
  { id: "#DH1024", category: "Delivery issue", subject: "My package shows delivered but I haven't received it.", status: "In Progress", date: "Aug 29, 2026", orderNumber: "DH-98421" },
  { id: "#DH0981", category: "Refund", subject: "Refund not credited yet for returned item.", status: "Resolved", date: "Aug 15, 2026" },
  { id: "#DH0945", category: "Product issue", subject: "Slight defect on the stitching of my hoodie.", status: "Waiting for Reply", date: "Aug 10, 2026", orderNumber: "DH-87241" },
];

const FAQS = [
  { question: "How long does it take for a refund to process?", answer: "Once your return is inspected and approved, refunds are processed within 5-7 business days to your original payment method." },
  { question: "Can I change my shipping address after placing an order?", answer: "If your order has not been dispatched yet, you can request an address change via a Support Ticket. Once dispatched, we cannot alter the address." },
  { question: "Do you offer exchanges?", answer: "Yes, we offer exchanges for size issues within 7 days of delivery, provided the item is unused with all tags intact." },
];

export default function SupportTicketsPage() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [view, setView] = useState<"dashboard" | "create" | "details">("dashboard");
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [tickets, setTickets] = useState<Ticket[]>(MOCK_TICKETS);

  // Form states
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showReplyToast, setShowReplyToast] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [isReplying, setIsReplying] = useState(false);
  const [localReplies, setLocalReplies] = useState<{text: string, time: string}[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const viewContainerRef = useRef<HTMLDivElement>(null);

  // Mobile-only smooth scroll
  useEffect(() => {
    if (window.innerWidth <= 768) {
      const lenis = new Lenis({
        duration: 1.2,
      });
      function raf(time: number) { lenis.raf(time); requestAnimationFrame(raf); }
      requestAnimationFrame(raf);
      return () => lenis.destroy();
    }
  }, []);

  // Mobile-only GSAP animations
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(max-width: 768px)", () => {
      const ctx = gsap.context(() => {
        gsap.fromTo(".hero-title", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out" });
        if (viewContainerRef.current) {
          const elems = viewContainerRef.current.querySelectorAll(".anim-elem");
          if (elems.length > 0) {
            gsap.fromTo(elems, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.05, clearProps: "all" });
          }
        }
      }, containerRef);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, [view, selectedTicket]);

  const handleReplyTicket = () => {
    if (!replyText.trim()) return;
    setIsReplying(true);
    setTimeout(() => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const dateStr = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      setLocalReplies(prev => [...prev, { text: replyText, time: `${dateStr} • ${timeStr}` }]);
      setIsReplying(false);
      setReplyText("");
      setShowReplyToast(true);
      setTimeout(() => setShowReplyToast(false), 3000);
    }, 1000);
  };

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      const newTicket: Ticket = {
        id: `#DH${Math.floor(1000 + Math.random() * 9000)}`,
        category: category || "Other",
        subject: subject,
        status: "In Progress",
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        orderNumber: orderNumber || undefined
      };
      setTickets(prev => [newTicket, ...prev]);

      setIsSubmitting(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      setView("dashboard");
      // Reset form
      setSubject("");
      setCategory("");
      setOrderNumber("");
      setDescription("");
    }, 1500);
  };

  const getStatusColor = (status: TicketStatus) => {
    switch(status) {
      case "In Progress": return "text-amber-500 bg-amber-500/10 border-amber-500/20";
      case "Resolved": return "text-emerald-500 bg-emerald-500/10 border-emerald-500/20";
      case "Waiting for Reply": return "text-blue-500 bg-blue-500/10 border-blue-500/20";
      default: return "text-zinc-500 bg-zinc-500/10 border-zinc-500/20";
    }
  };

  const getStatusIcon = (status: TicketStatus) => {
    switch(status) {
      case "In Progress": return <Clock className="w-3.5 h-3.5" />;
      case "Resolved": return <CheckCircle2 className="w-3.5 h-3.5" />;
      case "Waiting for Reply": return <AlertCircle className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-[#FAF8F5] dark:bg-zinc-950 text-zinc-950 dark:text-zinc-50 font-sans flex flex-col selection:bg-[#6F4E37]/20 selection:text-[#6F4E37]">
      <Navbar onSearchClick={() => setIsSearchOpen(true)} />

      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 px-5 py-3.5 rounded-2xl font-mono text-xs font-bold shadow-2xl flex items-center gap-2.5 border border-white/10 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 dark:text-emerald-500" />
          <span>Support Ticket Submitted!</span>
        </div>
      )}
      {showReplyToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 px-5 py-3.5 rounded-2xl font-mono text-xs font-bold shadow-2xl flex items-center gap-2.5 border border-white/10 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 dark:text-emerald-500" />
          <span>Reply sent successfully!</span>
        </div>
      )}

      <main className="flex-grow">
        {/* 01. SUPPORT HERO */}
        <section className="bg-zinc-950 text-white py-24 px-6 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-[#6F4E37]/20 border border-[#6F4E37]/30 flex items-center justify-center mx-auto mb-6 text-[#E6C280]">
              <LifeBuoy className="w-8 h-8" />
            </div>
            <h1 className="hero-title text-4xl md:text-5xl font-chaney-title uppercase tracking-tight mb-4">
              NEED HELP WITH <br /> YOUR ORDER?
            </h1>
            <p className="text-zinc-400 text-sm md:text-base mb-10 max-w-lg mx-auto">
              Our dedicated support team is here to assist you. Create a new trackable ticket or view the status of your ongoing requests below.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => setView("create")}
                className={`px-6 py-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all cursor-pointer shadow-lg active:scale-95 flex items-center gap-2 ${
                  view === "create" ? "bg-zinc-800 text-white" : "bg-white text-zinc-950 hover:bg-zinc-200"
                }`}
              >
                <Plus className="w-4 h-4" /> Create Support Ticket
              </button>
              <button 
                onClick={() => setView("dashboard")}
                className={`px-6 py-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all cursor-pointer flex items-center gap-2 border ${
                  view === "dashboard" ? "border-[#6F4E37] bg-[#6F4E37]/10 text-[#E6C280]" : "border-zinc-800 bg-transparent text-white hover:border-zinc-600"
                }`}
              >
                <List className="w-4 h-4" /> View My Tickets
              </button>
            </div>
          </div>
        </section>

        <div ref={viewContainerRef} className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
          
          {/* VIEW: CREATE TICKET */}
          {view === "create" && (
            <div className="max-w-3xl mx-auto animate-fade-in anim-elem">
              <Surface className="rounded-3xl p-8 sm:p-12 shadow-xl">
                <h2 className="text-2xl font-chaney-title uppercase tracking-wider mb-8">Create Ticket</h2>
                <form onSubmit={handleCreateTicket} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-widest font-bold block">
                      Subject
                    </label>
                    <Input 
                      required
                      variant="drip"
                      type="text" 
                      value={subject}
                      onChange={e => setSubject(e.target.value)}
                      placeholder="Briefly describe the issue..."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-widest font-bold block">
                        Category
                      </label>
                      <div className="relative">
                        <select 
                          required
                          value={category}
                          onChange={e => setCategory(e.target.value)}
                          className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:border-[#6F4E37] dark:focus:border-[#E6C280] rounded-xl px-4 py-3 text-sm outline-none transition-colors appearance-none"
                        >
                          <option value="" disabled>Select a category</option>
                          <option value="Order issue">Order issue</option>
                          <option value="Delivery issue">Delivery issue</option>
                          <option value="Return">Return</option>
                          <option value="Refund">Refund</option>
                          <option value="Payment">Payment</option>
                          <option value="Product issue">Product issue</option>
                          <option value="Account">Account</option>
                          <option value="Other">Other</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-widest font-bold block">
                        Order Number (Optional)
                      </label>
                      <Input 
                        type="text" 
                        variant="drip"
                        value={orderNumber}
                        onChange={e => setOrderNumber(e.target.value)}
                        placeholder="e.g. DH-98421"
                        className="font-mono"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-widest font-bold block">
                      Description
                    </label>
                    <textarea 
                      required
                      value={description}
                      onChange={e => setDescription(e.target.value)}
                      placeholder="Please provide as much detail as possible..."
                      rows={5}
                      className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:border-[#6F4E37] dark:focus:border-[#E6C280] rounded-xl px-4 py-3 text-sm outline-none transition-colors resize-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-widest font-bold block">
                      Attachments (Optional)
                    </label>
                    <input type="file" id="create-ticket-file" className="hidden" accept="image/png,image/jpeg,application/pdf" />
                    <label htmlFor="create-ticket-file" className="block border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-xl p-8 text-center bg-zinc-50 dark:bg-zinc-900/50 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer group">
                      <Upload className="w-6 h-6 text-zinc-400 mx-auto mb-2 group-hover:text-[#6F4E37] dark:group-hover:text-[#E6C280] transition-colors" />
                      <p className="text-sm font-bold text-zinc-600 dark:text-zinc-300">Click to upload or drag and drop</p>
                      <p className="text-[10px] font-mono text-zinc-400 mt-1 uppercase">PNG, JPG or PDF (MAX. 5MB)</p>
                    </label>
                  </div>

                  <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex justify-end">
                    <Button variant="drip"
                      type="submit"
                      disabled={isSubmitting}
                      className="max-md:hidden dark:bg-white dark:hover:bg-[#E6C280] disabled:opacity-70 px-8 py-4 rounded-xl text-xs font-black shadow-lg font-sans"
                    >
                      {isSubmitting ? "Submitting..." : "SUBMIT TICKET"}
                    </Button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="md:hidden relative overflow-hidden group bg-gradient-to-tr from-zinc-900 to-zinc-800 dark:from-white dark:to-zinc-200 text-white dark:text-zinc-950 px-10 py-4 rounded-2xl text-xs font-black tracking-widest uppercase shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(111,78,55,0.3)] transition-all duration-500 ease-out disabled:opacity-70 w-full"
                    >
                      <span className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/20 dark:via-black/10 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {isSubmitting ? "Submitting..." : "SUBMIT TICKET"} 
                        {!isSubmitting && <Send className="w-3.5 h-3.5" />}
                      </span>
                    </button>
                  </div>
                </form>
              </Surface>
            </div>
          )}

          {/* VIEW: DASHBOARD (MY TICKETS + FAQ) */}
          {view === "dashboard" && (
            <div className="space-y-16 animate-fade-in">
              
              <section>
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-chaney-title uppercase tracking-wider">My Tickets</h2>
                  <span className="bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 px-3 py-1 rounded-full text-[10px] font-mono font-bold">{tickets.length} Total</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {tickets.map(ticket => (
                    <div 
                      key={ticket.id}
                      onClick={() => {
                        setSelectedTicket(ticket);
                        setLocalReplies([]); // Reset replies on ticket change
                        setView("details");
                      }}
                      className="anim-elem bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:border-[#6F4E37] dark:hover:border-[#E6C280] transition-all cursor-pointer group relative"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-mono font-bold text-zinc-950 dark:text-white group-hover:text-[#6F4E37] dark:group-hover:text-[#E6C280] transition-colors">{ticket.id}</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setTickets(prev => prev.filter(t => t.id !== ticket.id));
                            }}
                            className="p-1.5 text-zinc-400 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-500/10 dark:hover:text-red-400 rounded-full transition-all opacity-0 group-hover:opacity-100"
                            title="Delete Ticket"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider border ${getStatusColor(ticket.status)}`}>
                          {getStatusIcon(ticket.status)} {ticket.status}
                        </span>
                      </div>
                      <h3 className="font-bold text-lg mb-1">{ticket.category}</h3>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2 mb-6 font-sans">
                        {ticket.subject}
                      </p>
                      <div className="flex justify-between items-center text-[10px] font-mono text-zinc-400 uppercase font-bold pt-4 border-t border-zinc-100 dark:border-zinc-800">
                        <span>{ticket.date}</span>
                        <span className="flex items-center gap-1">View Details <ArrowLeft className="w-3 h-3 rotate-180" /></span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* FAQ Section */}
              <Surface variant="subtle" className="rounded-3xl p-8 md:p-12 anim-elem">
                <div className="flex items-center gap-3 mb-8">
                  <Info className="w-6 h-6 text-[#6F4E37] dark:text-[#E6C280]" />
                  <h2 className="text-xl font-chaney-title uppercase tracking-wider">Frequently Asked Questions</h2>
                </div>
                <div className="grid gap-4">
                  {FAQS.map((faq, i) => (
                    <div key={i} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
                      <h4 className="font-bold text-sm uppercase tracking-wide mb-2 text-zinc-950 dark:text-white">{faq.question}</h4>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </Surface>

            </div>
          )}

          {/* VIEW: TICKET DETAILS */}
          {view === "details" && selectedTicket && (
            <div className="max-w-4xl mx-auto animate-fade-in anim-elem">
              <button 
                onClick={() => setView("dashboard")}
                className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-zinc-500 hover:text-zinc-950 dark:hover:text-white transition-colors mb-8 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" /> Back to My Tickets
              </button>

              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] overflow-hidden shadow-xl">
                
                {/* Header */}
                <div className="bg-zinc-50 dark:bg-zinc-950 p-8 border-b border-zinc-200 dark:border-zinc-800">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-mono font-bold bg-zinc-200 dark:bg-zinc-800 px-3 py-1 rounded-lg">{selectedTicket.id}</span>
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${getStatusColor(selectedTicket.status)}`}>
                          {getStatusIcon(selectedTicket.status)} {selectedTicket.status}
                        </span>
                      </div>
                      <h2 className="text-2xl font-chaney-title uppercase tracking-wider mt-4">{selectedTicket.category}</h2>
                      <p className="text-zinc-500 mt-1">{selectedTicket.subject}</p>
                    </div>
                    {selectedTicket.orderNumber && (
                      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 py-3 rounded-xl flex items-center gap-3 self-start shadow-sm">
                        <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-zinc-400">Order Ref:</span>
                        <span className="text-xs font-mono font-bold">{selectedTicket.orderNumber}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Conversation Body */}
                <div className="p-8 space-y-8 bg-white dark:bg-zinc-900">
                  {/* User Message */}
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center font-black text-xs shrink-0">ME</div>
                    <div className="flex-1">
                      <div className="bg-zinc-100 dark:bg-zinc-800/50 rounded-2xl rounded-tl-none p-5 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                        Hi, I need help with this issue. Attached are the details. Please let me know how we can resolve this.
                      </div>
                      <span className="text-[10px] font-mono text-zinc-400 mt-2 block pl-1">{selectedTicket.date} • 10:45 AM</span>
                    </div>
                  </div>

                  {/* Attachments Section */}
                  <div className="pl-14">
                    <div className="inline-flex items-center gap-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 p-3 rounded-xl shadow-sm cursor-pointer hover:border-[#6F4E37] transition-colors">
                      <div className="w-8 h-8 bg-zinc-100 dark:bg-zinc-800 rounded flex items-center justify-center text-zinc-500">
                        <Paperclip className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-zinc-950 dark:text-white">screenshot.png</p>
                        <p className="text-[10px] font-mono text-zinc-400 uppercase">1.2 MB</p>
                      </div>
                    </div>
                  </div>

                  {/* Support Reply (Conditional Mock) */}
                  {selectedTicket.status !== "Waiting for Reply" && (
                    <div className="flex gap-4 flex-row-reverse">
                      <div className="w-10 h-10 rounded-full bg-[#6F4E37] flex items-center justify-center font-black text-xs text-[#E6C280] shrink-0 shadow-inner shadow-[#5C3D2E]">DH</div>
                      <div className="flex-1 flex flex-col items-end">
                        <div className="bg-[#FAF8F5] dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl rounded-tr-none p-5 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300 text-left">
                          Hello! We apologize for the inconvenience. Our team is currently investigating this issue and will update you shortly with a resolution. Thank you for your patience.
                        </div>
                        <span className="text-[10px] font-mono text-zinc-400 mt-2 block pr-1">{selectedTicket.date} • 12:15 PM</span>
                      </div>
                    </div>
                  )}

                  {/* Newly Sent Local Replies */}
                  {localReplies.map((reply, i) => (
                    <div className="flex gap-4" key={i}>
                      <div className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center font-black text-xs shrink-0">ME</div>
                      <div className="flex-1">
                        <div className="bg-zinc-100 dark:bg-zinc-800/50 rounded-2xl rounded-tl-none p-5 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                          {reply.text}
                        </div>
                        <span className="text-[10px] font-mono text-zinc-400 mt-2 block pl-1">{reply.time}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Reply Input Area */}
                <div className="p-6 bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800">
                  <div className="relative">
                    <textarea 
                      rows={3}
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleReplyTicket();
                        }
                      }}
                      placeholder="Type your reply here..."
                      className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:border-[#6F4E37] dark:focus:border-[#E6C280] rounded-2xl px-5 py-4 text-sm outline-none transition-colors resize-none pr-32 shadow-sm"
                    />
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      className="hidden" 
                      accept="image/*,video/*"
                    />
                    <div className="absolute right-3 bottom-3 flex gap-2">
                      <button 
                        onClick={() => fileInputRef.current?.click()}
                        className="p-2 text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors cursor-pointer bg-transparent border-none"
                      >
                        <Paperclip className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={handleReplyTicket}
                        disabled={isReplying}
                        className="bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 hover:bg-[#6F4E37] dark:hover:bg-[#E6C280] p-2 px-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all cursor-pointer shadow-md active:scale-95 flex items-center gap-2 border-none disabled:opacity-70"
                      >
                        {isReplying ? "Sending..." : "Reply"} <Send className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
          )}

        </div>
      </main>

      <Footer />
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
}
