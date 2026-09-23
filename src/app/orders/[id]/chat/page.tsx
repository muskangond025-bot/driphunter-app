"use client";

import React, { useState, use, useRef, useEffect } from "react";
import AppHeader from "@/components/app-shell/AppHeader";
import Link from "next/link";
import { ChevronRight, ArrowLeft, Send, MessageSquare } from "lucide-react";
import { useRouter } from "next/navigation";

type Message = {
  id: string;
  sender: 'bot' | 'user';
  type: 'text' | 'product_card' | 'options_card';
  text?: string;
  timestamp: Date;
  options?: string[];
};

export default function OrderChatPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const router = useRouter();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [messageInput, setMessageInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);
  
  const orderId = decodeURIComponent(unwrappedParams.id);

  const productMap: Record<string, { name: string, image: string }> = {
    'OD111111111111111111': { name: "Midnight Eclipse Low", image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=400&q=80" },
    'OD336542014089797100': { name: "Oversized Cyber-Drip Tee", image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=400&q=80" },
    'OD333333333333333333': { name: "Tactical Tech Gloves", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=400&q=80" },
    'OD444444444444444444': { name: "Utility Cargo Vest", image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=400&q=80" }
  };

  const productDetails = productMap[orderId] || productMap['OD111111111111111111'];

  // Initialize messages with past dates
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'bot',
      type: 'text',
      text: "Hey! 👋 I'm your DripHunter support assistant.",
      timestamp: new Date(Date.now() - 86400000 * 2) // 2 days ago
    },
    {
      id: '2',
      sender: 'bot',
      type: 'product_card',
      timestamp: new Date(Date.now() - 86400000 * 2)
    },
    {
      id: '3',
      sender: 'bot',
      type: 'text',
      text: "I see that your product is delivered to you",
      timestamp: new Date(Date.now() - 86400000) // Yesterday
    },
    {
      id: '4',
      sender: 'bot',
      type: 'options_card',
      timestamp: new Date(Date.now() - 86400000), // Yesterday
      options: [
        "Order not delivered",
        "I need to return the item",
        "Get my bill or invoice",
        "Know more about DripHunter Cash"
      ]
    }
  ]);

  // Auto-scroll to bottom on new message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (text: string = messageInput) => {
    if (!text.trim()) return;
    
    const newMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      type: 'text',
      text: text.trim(),
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMsg]);
    setMessageInput("");
  };

  const handleOptionClick = (option: string) => {
    handleSendMessage(option);
    
    // Simulate bot typing response
    setTimeout(() => {
      const botReply: Message = {
        id: Date.now().toString(),
        sender: 'bot',
        type: 'text',
        text: `You selected: "${option}". Our support agent will be with you shortly.`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botReply]);
    }, 1000);
  };

  const groupMessagesByDate = () => {
    const groups: { dateLabel: string, messages: Message[] }[] = [];
    
    messages.forEach(msg => {
      const date = new Date(msg.timestamp);
      date.setHours(0, 0, 0, 0);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const timeDiff = today.getTime() - date.getTime();
      const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
      
      let dateLabel = "";
      if (daysDiff === 0) dateLabel = "Today";
      else if (daysDiff === 1) dateLabel = "Yesterday";
      else {
        dateLabel = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      }
      
      let group = groups.find(g => g.dateLabel === dateLabel);
      if (!group) {
        group = { dateLabel, messages: [] };
        groups.push(group);
      }
      group.messages.push(msg);
    });
    
    return groups;
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-sans antialiased">
      <AppHeader title="Order Support" variant="contextual" fallbackUrl={`/orders/${orderId}`} showActions={true} />

      {/* ─── MAIN CONTENT ─── */}
      <main className="flex-grow bg-zinc-50 dark:bg-zinc-950 pt-8 pb-16 px-4 sm:px-6 md:px-12 w-full mx-auto relative z-20">
        <div className="max-w-[1400px] mx-auto flex flex-col h-[calc(100vh-200px)] min-h-[600px] w-full">
          
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-500 mb-8 overflow-x-auto whitespace-nowrap pb-2 shrink-0">
            <Link href="/" className="hover:text-zinc-950 dark:hover:text-white transition-colors shrink-0">Home</Link>
            <ChevronRight className="w-4 h-4 shrink-0" />
            <Link href="/orders" className="hover:text-zinc-950 dark:hover:text-white transition-colors shrink-0">Orders</Link>
            <ChevronRight className="w-4 h-4 shrink-0" />
            <Link href={`/orders/${orderId}`} className="hover:text-zinc-950 dark:hover:text-white transition-colors shrink-0 max-w-[100px] truncate">{orderId}</Link>
            <ChevronRight className="w-4 h-4 shrink-0" />
            <span className="text-zinc-950 dark:text-white shrink-0">Support</span>
          </div>

          {/* Chat Container */}
          <div className="flex-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm flex flex-col overflow-hidden relative">
            
            {/* Chat Header */}
            <div className="p-4 md:p-6 border-b border-zinc-100 dark:border-zinc-800 flex items-center gap-4 bg-white dark:bg-zinc-900 z-10 shrink-0">
              <button onClick={() => router.back()} className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors text-zinc-500 hover:text-zinc-950 dark:hover:text-white">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="w-10 h-10 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center shrink-0">
                <MessageSquare className="w-5 h-5 text-[#6F4E37] dark:text-[#E6C280]" />
              </div>
              <div>
                <h2 className="text-lg font-chaney-title uppercase tracking-tight text-zinc-950 dark:text-white leading-none">DripHunter Support</h2>
                <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold mt-1 uppercase tracking-widest flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Online
                </p>
              </div>
            </div>

            {/* Chat Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 bg-zinc-50/50 dark:bg-zinc-950/30">
              
              {groupMessagesByDate().map((group) => (
                <div key={group.dateLabel} className="space-y-6">
                  
                  {/* Date Separator */}
                  <div className="flex justify-center my-6">
                    <span className="bg-zinc-200 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-sm">
                      {group.dateLabel}
                    </span>
                  </div>

                  {group.messages.map((msg) => (
                    <div key={msg.id}>
                      {msg.sender === 'bot' ? (
                        /* Bot Message */
                        <div className="flex items-start gap-4">
                          <div className="w-8 h-8 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center shrink-0 mt-1">
                            <MessageSquare className="w-4 h-4 text-zinc-500" />
                          </div>
                          
                          {msg.type === 'text' && (
                            <div className="flex flex-col gap-1 max-w-[80%] md:max-w-[60%]">
                              <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl rounded-tl-sm p-4 shadow-sm">
                                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100 leading-relaxed">
                                  {msg.text}
                                </p>
                              </div>
                              <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest pl-1">
                                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </div>
                          )}

                          {msg.type === 'product_card' && (
                            <div className="flex flex-col gap-1 max-w-[80%] md:max-w-[60%]">
                              <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl rounded-tl-sm p-4 shadow-sm w-48 sm:w-56">
                                <div className="w-full h-32 sm:h-40 bg-zinc-100 dark:bg-zinc-900 rounded-xl mb-3 overflow-hidden p-2 flex items-center justify-center">
                                  <img 
                                    src={productDetails.image} 
                                    alt={productDetails.name} 
                                    className="max-w-full max-h-full object-contain mix-blend-multiply dark:mix-blend-normal" 
                                  />
                                </div>
                                <p className="text-xs font-bold text-zinc-950 dark:text-white uppercase tracking-wider truncate">
                                  {productDetails.name}
                                </p>
                                <p className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1">Order ID: {orderId}</p>
                              </div>
                              <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest pl-1">
                                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </div>
                          )}

                          {msg.type === 'options_card' && (
                            <div className="flex flex-col gap-1 max-w-[90%] md:max-w-[60%] w-full sm:w-[340px]">
                              <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl rounded-tl-sm shadow-sm overflow-hidden flex flex-col">
                                <div className="p-4 border-b border-zinc-100 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50">
                                  <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                                    How may I help you?
                                  </p>
                                </div>
                                {msg.options?.map((option, index) => (
                                  <button 
                                    key={index}
                                    onClick={() => handleOptionClick(option)}
                                    className={`p-3.5 text-sm font-bold text-[#6F4E37] dark:text-[#E6C280] hover:bg-zinc-50 dark:hover:bg-zinc-700/50 transition-colors text-left ${index !== msg.options!.length - 1 ? 'border-b border-zinc-100 dark:border-zinc-700' : ''}`}
                                  >
                                    {option}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}

                        </div>
                      ) : (
                        /* User Message */
                        <div className="flex items-start justify-end gap-4">
                          <div className="flex flex-col items-end gap-1 max-w-[80%] md:max-w-[60%]">
                            <div className="bg-[#6F4E37] dark:bg-[#E6C280] text-white dark:text-zinc-950 rounded-2xl rounded-tr-sm p-4 shadow-sm">
                              <p className="text-sm font-medium leading-relaxed">
                                {msg.text}
                              </p>
                            </div>
                            <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest pr-1">
                              {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))}
              
              {/* Invisible element to scroll to */}
              <div ref={chatEndRef} />
            </div>

            {/* Chat Input Area */}
            <div className="p-4 border-t border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 shrink-0">
              <div className="relative flex items-center">
                <input 
                  type="text" 
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder="Write a message..."
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl py-4 pl-4 pr-14 text-sm text-zinc-950 dark:text-white outline-none focus:border-zinc-950 dark:focus:border-white transition-all font-medium placeholder:text-zinc-400"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSendMessage();
                    }
                  }}
                />
                <button 
                  onClick={() => handleSendMessage()}
                  className="absolute right-2 p-2.5 bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
