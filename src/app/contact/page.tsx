"use client";

import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SearchOverlay from "@/components/layout/SearchOverlay";
import { Mail, MapPin, Phone, CheckCircle2, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        (e.target as HTMLFormElement).reset();
      }, 5000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#faf9f8] text-zinc-950 flex flex-col font-sans selection:bg-[#6F4E37]/20 selection:text-[#6F4E37]">
      <Navbar onSearchClick={() => setIsSearchOpen(true)} />

      <main className="flex-grow py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#6F4E37]/5 rounded-full filter blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-zinc-200/50 rounded-full filter blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          
          <div className="text-center mb-16 space-y-4">
            <h1 className="text-4xl md:text-6xl font-chaney-title uppercase tracking-wider text-zinc-950">
              Get in Touch
            </h1>
            <p className="text-zinc-500 font-sans max-w-2xl mx-auto leading-relaxed">
              Have a question about a product, order, or just want to say hi? We'd love to hear from you. Fill out the form and our team will get back to you shortly.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
            
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-[#21130d] text-white p-8 sm:p-12 rounded-[32px] relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#6F4E37]/20 rounded-full filter blur-[80px] pointer-events-none" />
                
                <h3 className="text-2xl font-chaney-title uppercase tracking-widest mb-8 relative z-10">Contact Info</h3>
                
                <div className="space-y-8 relative z-10">
                  <div className="flex items-start gap-4 group">
                    <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-[#6F4E37] transition-colors">
                      <MapPin className="w-5 h-5 text-[#E6C280] group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h4 className="text-sm font-black uppercase tracking-widest text-white mb-1">Our HQ</h4>
                      <p className="text-sm text-zinc-400 leading-relaxed">
                        123 Streetwear Ave,<br />
                        New York, NY 10012<br />
                        United States
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group">
                    <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-[#6F4E37] transition-colors">
                      <Mail className="w-5 h-5 text-[#E6C280] group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h4 className="text-sm font-black uppercase tracking-widest text-white mb-1">Email Us</h4>
                      <p className="text-sm text-zinc-400 leading-relaxed">
                        support@driphunter.com<br />
                        collabs@driphunter.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group">
                    <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-[#6F4E37] transition-colors">
                      <Phone className="w-5 h-5 text-[#E6C280] group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h4 className="text-sm font-black uppercase tracking-widest text-white mb-1">Call Us</h4>
                      <p className="text-sm text-zinc-400 leading-relaxed">
                        +1 (555) 123-4567<br />
                        Mon-Fri, 9am-6pm EST
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3 bg-white p-8 sm:p-12 rounded-[32px] shadow-xl border border-zinc-200">
              {isSuccess ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-12 animate-fade-in">
                  <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-12 h-12" />
                  </div>
                  <h2 className="text-3xl font-chaney-title uppercase tracking-widest text-zinc-950">
                    Message Sent
                  </h2>
                  <p className="text-zinc-500 font-sans max-w-md mx-auto leading-relaxed">
                    Thank you for reaching out! We've received your message and will get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">First Name</label>
                      <Input variant="drip" 
                        type="text" 
                        required 
                        className="w-full p-4 focus:ring-1 focus:ring-[#6F4E37] transition-all"
                        placeholder="John"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Last Name</label>
                      <Input variant="drip" 
                        type="text" 
                        required 
                        className="w-full p-4 focus:ring-1 focus:ring-[#6F4E37] transition-all"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Email Address</label>
                    <Input variant="drip" 
                      type="email" 
                      required 
                      className="w-full p-4 focus:ring-1 focus:ring-[#6F4E37] transition-all"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Subject</label>
                    <select className="w-full bg-zinc-50 border border-zinc-200 p-4 rounded-xl text-sm focus:outline-none focus:border-[#6F4E37] focus:ring-1 focus:ring-[#6F4E37] transition-all appearance-none cursor-pointer">
                      <option value="general">General Inquiry</option>
                      <option value="order">Order Support</option>
                      <option value="press">Press & Media</option>
                      <option value="collab">Collaborations</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Message</label>
                    <textarea 
                      rows={6}
                      required
                      className="w-full bg-zinc-50 border border-zinc-200 p-4 rounded-xl text-sm focus:outline-none focus:border-[#6F4E37] focus:ring-1 focus:ring-[#6F4E37] transition-all resize-none"
                      placeholder="How can we help you today?"
                    />
                  </div>

                  <Button variant="drip"
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-[#6F4E37] hover:bg-[#5C3D2E] p-5 rounded-xl text-xs hover:-translate-y-1 flex gap-3 disabled:opacity-50 disabled:hover:translate-y-0 group"
                  >
                    {isSubmitting ? "Sending Message..." : "Send Message"}
                    {!isSubmitting && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                  </Button>
                </form>
              )}
            </div>

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
