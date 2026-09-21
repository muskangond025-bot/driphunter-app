"use client";

import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SearchOverlay from "@/components/layout/SearchOverlay";
import { ArrowLeft, Clock, MessageSquare, Send, Paperclip, MoreVertical, Search, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function TicketDetailsPage() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const params = useParams();
  
  // Use mock data based on the ID if possible
  const idStr = Array.isArray(params?.id) ? params?.id[0] : params?.id || "DH-1024";
  const formattedId = idStr.startsWith("DH") ? `#${idStr}` : `#DH-${idStr}`;
  
  const isResolved = formattedId === "#DH-1018";
  
  const ticket = {
    id: formattedId,
    subject: isResolved ? "Return request" : "Order issue",
    status: isResolved ? "Resolved" : "Open",
    date: isResolved ? "Aug 15, 2026" : "Aug 29, 2026",
    lastUpdate: isResolved ? "Aug 16, 2026" : "2 hours ago",
  };

  const [reply, setReply] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "You",
      date: ticket.date,
      content: isResolved ? "I want to return my order. It doesn't fit properly." : "I have a problem with my recent order. The package arrived but one of the items is missing from the box.",
      isAgent: false
    },
    {
      sender: "Support Agent",
      date: ticket.lastUpdate,
      content: isResolved ? "Your return request has been approved. Please use the attached shipping label." : "We apologize for the inconvenience. We have initiated a replacement for the missing item. You will receive a tracking number shortly.",
      isAgent: true
    }
  ]);

  const handleReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reply.trim()) return;
    
    setIsSubmitting(true);
    setTimeout(() => {
      setMessages([...messages, {
        sender: "You",
        date: "Just now",
        content: reply,
        isAgent: false
      }]);
      setReply("");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#faf9f8] text-zinc-950 flex flex-col font-sans selection:bg-[#6F4E37]/20 selection:text-[#6F4E37]">
      <Navbar onSearchClick={() => setIsSearchOpen(true)} />

      <main className="flex-grow max-w-3xl mx-auto w-full px-4 sm:px-6 py-12">
        <Link 
          href="/support/tickets"
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-[#6F4E37] text-xs font-black uppercase tracking-widest transition-all mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Tickets
        </Link>

        <div className="bg-white rounded-[32px] overflow-hidden shadow-sm border border-zinc-200">
          <div className="bg-[#21130d] p-8 text-white relative">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-6 ${ticket.status === "Open" ? "bg-amber-500/20 text-amber-500" : "bg-emerald-500/20 text-emerald-500"}`}>
              <MessageSquare className="w-6 h-6" />
            </div>
            <h1 className="text-3xl font-chaney-title uppercase tracking-widest">{ticket.id}</h1>
            <p className="text-sm text-zinc-400 mt-2 font-sans max-w-xl leading-relaxed">{ticket.subject}</p>
          </div>
          
          <div className="p-8 space-y-8">
            <div className="grid grid-cols-2 gap-4 border-b border-zinc-100 pb-8">
              <div>
                <span className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2">Status</span>
                <span className={`text-xs font-mono font-bold uppercase tracking-widest px-3 py-1.5 rounded-md inline-block ${ticket.status === "Open" ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"}`}>
                  {ticket.status}
                </span>
              </div>
              <div>
                <span className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2">Opened On</span>
                <span className="text-sm font-sans text-zinc-950">{ticket.date}</span>
              </div>
            </div>
            
            <div>
              <span className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-4">Conversation History</span>
              <div className="space-y-4">
                {messages.map((msg, idx) => (
                  <div key={idx} className={msg.isAgent ? "bg-[#6F4E37]/5 p-5 rounded-2xl border border-[#6F4E37]/20 ml-8" : "bg-zinc-50 p-5 rounded-2xl border border-zinc-200 mr-8"}>
                    <div className="flex justify-between items-start mb-3">
                      <span className={`text-xs font-black uppercase tracking-widest ${msg.isAgent ? "text-[#6F4E37]" : "text-zinc-950"}`}>{msg.sender}</span>
                      <span className="text-[10px] font-mono text-zinc-400">{msg.date}</span>
                    </div>
                    <p className="text-sm text-zinc-600 leading-relaxed">
                      {msg.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            
            {ticket.status === "Open" ? (
              <div className="pt-6 border-t border-zinc-100">
                <form onSubmit={handleReply} className="flex gap-3">
                  <input 
                    type="text" 
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    placeholder="Type your reply to the support team..." 
                    className="flex-1 bg-zinc-50 border border-zinc-200 px-5 py-4 rounded-xl text-sm focus:outline-none focus:border-[#6F4E37] focus:ring-2 focus:ring-[#6F4E37]/10 transition-all"
                  />
                  <Button variant="drip"
                    type="submit"
                    disabled={isSubmitting || !reply.trim()}
                    className="bg-[#6F4E37] hover:bg-[#5c3d2e] px-8 py-4 rounded-xl text-[10px] disabled:opacity-50 flex gap-2 font-sans"
                  >
                    {isSubmitting ? "Sending..." : "Reply"}
                    {!isSubmitting && <Send className="w-3.5 h-3.5" />}
                  </Button>
                </form>
              </div>
            ) : (
              <div className="pt-6 border-t border-zinc-100 text-center">
                <p className="text-xs text-zinc-500 italic">This ticket has been resolved and is closed to new replies.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />

      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </div>
  );
}
