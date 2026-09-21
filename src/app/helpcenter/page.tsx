"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ChevronRight, ChevronDown, ChevronUp, AlertCircle, X, Package, Clock, CheckCircle2 } from "lucide-react";

export default function HelpCenterPage() {
  const router = useRouter();
  const [activeIssue, setActiveIssue] = useState("Help with your issues");
  const [activeTopic, setActiveTopic] = useState("Login and my account");
  const [expandedQuestionIdx, setExpandedQuestionIdx] = useState<number | null>(null);

  // States for accordions and sub-questions
  const [expandedIssueCategory, setExpandedIssueCategory] = useState<string | null>(null);
  const [expandedSubQuestion, setExpandedSubQuestion] = useState<string | null>(null);

  // States for "Help with your order" view
  const [orderFilter, setOrderFilter] = useState("Last 30 Days");
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<{ title: string; content: string } | null>(null);

  const issues = ["Help with your issues", "Help with your order", "Help with other issues"];
  const topicsList = [
    "Delivery related",
    "Login and my account",
    "Refunds related",
    "Flipkart EMI",
    "Payment",
    "Returns & Pickup related",
    "Cancellation related",
    "Grocery",
    "SuperCoins",
    "Flipkart Plus",
    "Flipkart Travel",
    "BLACK",
    "2 Wheelers",
    "Others",
    "Personal Loan",
    "Recharges",
    "2 Wheeler Insurance",
    "Flipkart UPI",
    "DOR TV",
    "Minutes",
    "Fees",
    "superPay Later",
    "superPay in 3",
    "Business Loans"
  ];

  const topicsData: Record<string, { title: string; questions: string[] }> = {
    "Delivery related": {
      title: "Delivery related",
      questions: ["How do I track my order?", "What happens if I am not available when the delivery agent calls?", "Can I change the delivery address after placing the order?"]
    },
    "Login and my account": {
      title: "Login and my account",
      questions: ["Can I reactivate my inactive account?", "How do I change my password?", "What do I do if I forget my login email?"]
    },
    "Refunds related": {
      title: "Refunds related",
      questions: ["When will I get my refund?", "Why is my refund taking so long?", "Can I get a refund to my bank account instead of original payment method?"]
    },
    "Flipkart EMI": {
      title: "Flipkart EMI",
      questions: ["How do I avail EMI on my purchase?", "What is the interest rate for EMI?", "Can I close my EMI early?"]
    },
    "Payment": {
      title: "Payment",
      questions: ["What payment methods are supported?", "My payment failed but money was deducted. What should I do?", "Is it safe to save my card details?"]
    },
    "Returns & Pickup related": {
      title: "Returns & Pickup related",
      questions: ["How do I return an item?", "When will the pickup agent arrive?", "Do I need the original packaging to return an item?"]
    },
    "Cancellation related": {
      title: "Cancellation related",
      questions: ["How do I cancel my order?", "Will I be charged a cancellation fee?", "Can I cancel my order after it has shipped?"]
    },
    "Grocery": {
      title: "Grocery",
      questions: [
        "How can I trust that the groceries that will be delivered are quality checked and fresh?",
        "Can I cancel my order for groceries?",
        "Can I change the time slot for delivery of groceries after I have placed an order for them?",
        "Can groceries be delivered anywhere in India?",
        "What is 'Smart basket'?",
        "Can I convert a cash-on-delivery order for groceries into a prepaid one?"
      ],
    },
    "SuperCoins": {
      title: "SuperCoins",
      questions: ["How do I earn SuperCoins?", "Where can I use my SuperCoins?", "Do SuperCoins expire?"]
    },
    "Flipkart Plus": {
      title: "Flipkart Plus",
      questions: ["What are the benefits of Flipkart Plus?", "How do I become a Plus member?", "Is there a membership fee for Plus?"]
    },
    "Flipkart Travel": {
      title: "Flipkart Travel",
      questions: ["How do I book a flight?", "Can I cancel my flight booking?", "Where can I find my travel itinerary?"]
    },
    "BLACK": {
      title: "BLACK",
      questions: ["What is the BLACK program?", "How do I upgrade to BLACK tier?", "What exclusive benefits do BLACK members get?"]
    },
    "2 Wheelers": {
      title: "2 Wheelers",
      questions: ["How do I buy a 2 Wheeler on Flipkart?", "What documents are required for registration?", "Is insurance included with my purchase?"]
    },
    "Others": {
      title: "Others",
      questions: ["How do I report a bug on the website?", "Where can I find career opportunities?", "How do I delete my account?"]
    },
    "Personal Loan": {
      title: "Personal Loan",
      questions: ["What are the eligibility criteria for a personal loan?", "What is the maximum loan amount I can get?", "How long does the approval process take?"]
    },
    "Recharges": {
      title: "Recharges",
      questions: ["How do I recharge my mobile number?", "My recharge failed but money was deducted. What should I do?", "Can I recharge my DTH connection?"]
    },
    "2 Wheeler Insurance": {
      title: "2 Wheeler Insurance",
      questions: ["How do I buy insurance for my bike?", "What does the insurance policy cover?", "How do I claim insurance?"]
    },
    "Flipkart UPI": {
      title: "Flipkart UPI",
      questions: ["How do I set up Flipkart UPI?", "What is the transaction limit for UPI?", "Can I link multiple bank accounts?"]
    },
    "DOR TV": {
      title: "DOR TV",
      questions: ["What is DOR TV?", "How do I subscribe to DOR TV channels?", "Is DOR TV available on all devices?"]
    },
    "Minutes": {
      title: "Minutes",
      questions: ["What is Flipkart Minutes?", "How quickly will my items be delivered?", "Is Minutes available in my city?"]
    },
    "Fees": {
      title: "Fees",
      questions: ["Why was a platform fee charged on my order?", "Are there any hidden fees?", "Is delivery always free for Plus members?"]
    },
    "superPay Later": {
      title: "superPay Later",
      questions: ["What is superPay Later?", "How do I apply for superPay Later limit?", "What happens if I miss a repayment?"]
    },
    "superPay in 3": {
      title: "superPay in 3",
      questions: ["How does superPay in 3 work?", "Are there any interest charges?", "Can I prepay my installments?"]
    },
    "Business Loans": {
      title: "Business Loans",
      questions: ["Who is eligible for a Flipkart Business Loan?", "What documents are needed to apply?", "What is the repayment tenure?"]
    }
  };

  const currentTopicData = topicsData[activeTopic] || { title: activeTopic, questions: ["No FAQs available for this topic yet."] };

  const issueCategoriesData: Record<string, string[]> = {
    "I want help with new GST changes": [
      "How does the new GST affect my order?",
      "Can I claim GST input tax credit?",
      "Why is the GST amount different on my invoice?"
    ],
    "I want to manage my order": [
      "How do I track my order?",
      "How do I cancel my order?",
      "How do I change my delivery address?",
      "Where can I find my invoice?"
    ],
    "I want help with returns & refunds": [
      "How do I return an item?",
      "When will I get my refund?",
      "Can I replace an item instead of returning it?",
      "Where is my pickup agent?"
    ],
    "I want help with other issues": [
      "How does Flipkart Plus work?",
      "My payment failed but money was deducted.",
      "How do I use SuperCoins?"
    ],
    "I want to contact the seller": [
      "How do I send a message to the seller?",
      "Can I call the seller directly?",
      "What if the seller doesn't respond?"
    ]
  };

  const mockOrders = [
    { id: "OD1234567890", name: "Apple iPhone 15 (Black, 128 GB)", status: "Delivered", date: "Sep 05, 2026", img: "📱" },
    { id: "OD1234567891", name: "Puma Running Shoes (Size 9)", status: "Returned", date: "Aug 25, 2026", img: "👟" },
    { id: "OD1234567892", name: "Sony WH-1000XM5 Headphones", status: "Delivered", date: "Jan 10, 2026", img: "🎧" },
  ];

  const filteredOrders = mockOrders.filter(o => {
    const isOld = o.date.includes("Jan") || o.date.includes("2025");
    if (orderFilter === "Last 30 Days") return !isOld;
    if (orderFilter === "2026") return o.date.includes("2026");
    return true;
  });

  const openModal = (title: string, content: string) => {
    setModalContent({ title, content });
    setIsModalOpen(true);
  };

  const toggleCategory = (category: string) => {
    setExpandedIssueCategory(expandedIssueCategory === category ? null : category);
    setExpandedSubQuestion(null); // Reset sub-questions when changing category
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans transition-colors duration-300">
      <Navbar />

      <main className="flex-grow pt-8 pb-16 px-4 md:px-8 max-w-[1400px] mx-auto w-full relative">
        <div className="mb-8">
          <h1 className="text-[18px] font-semibold text-zinc-950 dark:text-zinc-50 mb-2">Flipkart Help Center | 24x7 Customer Care Support</h1>
          <p className="text-[12px] text-zinc-500 dark:text-zinc-400 leading-relaxed text-justify">
            The Flipkart Help Centre page lists out various types of issues that you may have encountered so that there can be quick resolution and you can go back to shopping online.
          </p>
        </div>

        <div className="flex flex-col md:flex-row bg-transparent gap-4 mb-8">
          {/* Left Sidebar */}
          <div className="w-full md:w-[280px] flex-shrink-0 bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 rounded-2xl flex flex-col shadow-sm">
            <div className="py-6 border-b border-zinc-200 dark:border-zinc-800">
              <h3 className="text-[12px] font-bold text-zinc-500 dark:text-zinc-400 px-8 mb-4 uppercase">TYPE OF ISSUE</h3>
              <div className="flex flex-col">
                {issues.map(issue => (
                  <div 
                    key={issue}
                    onClick={() => setActiveIssue(issue)}
                    className={`px-8 py-4 text-[14px] cursor-pointer transition-colors ${activeIssue === issue ? 'text-[#6F4E37] dark:text-[#E6C280] font-medium bg-[#6F4E37]/10 dark:bg-[#E6C280]/10 border-l-4 border-[#6F4E37] dark:border-[#E6C280] pl-[28px]' : 'text-zinc-950 dark:text-zinc-50 hover:text-[#6F4E37] dark:text-[#E6C280] pl-[32px]'}`}
                  >
                    {issue}
                  </div>
                ))}
              </div>
            </div>

            {/* ONLY SHOW HELP TOPICS IF ON "Help with other issues" */}
            {activeIssue === "Help with other issues" && (
              <div className="py-6 flex-grow overflow-y-auto max-h-[600px]">
                <h3 className="text-[12px] font-bold text-zinc-500 dark:text-zinc-400 px-8 mb-4 uppercase">HELP TOPICS</h3>
                <div className="flex flex-col">
                  {topicsList.map(topic => (
                    <div 
                      key={topic}
                      onClick={() => {
                        setActiveTopic(topic);
                        setExpandedQuestionIdx(null);
                      }}
                      className={`px-8 py-4 text-[14px] cursor-pointer transition-colors ${activeTopic === topic ? 'text-[#6F4E37] dark:text-[#E6C280] font-medium bg-[#6F4E37]/10 dark:bg-[#E6C280]/10 border-l-4 border-[#6F4E37] dark:border-[#E6C280] pl-[28px]' : 'text-zinc-950 dark:text-zinc-50 hover:text-[#6F4E37] dark:text-[#E6C280] pl-[32px]'}`}
                    >
                      {topic}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Main Content */}
          <div className="flex-1 bg-transparent flex flex-col gap-4">
            
            {/* VIEW: Help with your issues (Screenshot 1 Exact Layout) */}
            {activeIssue === "Help with your issues" && (
              <>
                <div className="bg-white dark:bg-zinc-900/60 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-4 flex items-center shadow-sm">
                  <div className="w-10 h-10 bg-[#6F4E37]/10 dark:bg-[#E6C280]/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <AlertCircle className="w-5 h-5 text-[#f57c00]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[14px] font-semibold text-zinc-950 dark:text-zinc-50">GST Rate Updates</h3>
                    <p className="text-[12px] text-zinc-500 dark:text-zinc-400">Quick answers to all your queries</p>
                  </div>
                  <div 
                    className="text-[#6F4E37] dark:text-[#E6C280] text-[14px] font-medium cursor-pointer hover:underline flex items-center gap-1"
                    onClick={() => setActiveIssue("GST Rate Updates")}
                  >
                    Know more <ChevronRight className="w-4 h-4" />
                  </div>
                </div>

                <div className="bg-white dark:bg-zinc-900/60 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm">
                  <h2 className="text-[16px] font-medium text-zinc-950 dark:text-zinc-50 mb-4">Which item are you facing an issue with?</h2>
                  
                  <div className="space-y-4">
                    <div 
                      className="flex gap-4 p-2 cursor-pointer hover:bg-zinc-50 dark:bg-zinc-800/50 border border-transparent hover:border-zinc-200 dark:border-zinc-700 rounded-2xl transition-colors"
                      onClick={() => router.push('/orders/4')}
                    >
                      <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center rounded-2xl overflow-hidden flex-shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="https://images.unsplash.com/photo-1542272604-78021c1798ec?auto=format&fit=crop&w=150&q=80" alt="Trousers" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 pt-1">
                        <h3 className="text-[14px] text-zinc-950 dark:text-zinc-50 line-clamp-1">CLOWALL Regular Fit Women Black Trousers</h3>
                        <p className="text-[12px] text-[#388e3c] flex items-center gap-1 mt-2">
                          <span className="w-2 h-2 rounded-full bg-[#388e3c]"></span> Delivered on Mar 04
                        </p>
                      </div>
                    </div>

                    <div 
                      className="flex gap-4 p-2 cursor-pointer hover:bg-zinc-50 dark:bg-zinc-800/50 border border-transparent hover:border-zinc-200 dark:border-zinc-700 rounded-2xl transition-colors"
                      onClick={() => router.push('/orders/4')}
                    >
                      <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center rounded-2xl overflow-hidden flex-shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=150&q=80" alt="Keyboard" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 pt-1">
                        <h3 className="text-[14px] text-zinc-950 dark:text-zinc-50 line-clamp-2">ZEBRONICS Zeb-Judwaa 750 Combo Wired USB Standard Desktop Keyboard Compatible with Desktop, Laptop, Mac with 104 Keys and a USB Mouse with 1200 DPI</h3>
                        <p className="text-[12px] text-[#388e3c] flex items-center gap-1 mt-2">
                          <span className="w-2 h-2 rounded-full bg-[#388e3c]"></span> Delivered on Jan 22
                        </p>
                      </div>
                    </div>

                    <div 
                      className="flex gap-4 p-2 cursor-pointer hover:bg-zinc-50 dark:bg-zinc-800/50 border border-transparent hover:border-zinc-200 dark:border-zinc-700 rounded-2xl transition-colors"
                      onClick={() => router.push('/orders/4')}
                    >
                      <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center rounded-2xl overflow-hidden flex-shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=150&q=80" alt="T-Shirt" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 pt-1">
                        <h3 className="text-[14px] text-zinc-950 dark:text-zinc-50 line-clamp-1">ATTITUDE START OF FASHION Striped Men Blue, Yellow T-Shirt</h3>
                        <p className="text-[12px] text-[#ff6161] flex items-center gap-1 mt-2">
                          <span className="w-2 h-2 rounded-full bg-[#ff6161]"></span> Cancelled
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="text-center mt-6 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                    <span 
                      className="text-[14px] text-[#6F4E37] dark:text-[#E6C280] font-medium cursor-pointer hover:underline"
                      onClick={() => setActiveIssue("Help with your order")}
                    >
                      View More Orders
                    </span>
                  </div>
                </div>

                {/* What issue are you facing? */}
                <div className="bg-white dark:bg-zinc-900/60 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm">
                  <h2 className="text-[16px] font-medium text-zinc-950 dark:text-zinc-50 mb-2">What issue are you facing?</h2>
                  
                  <div className="space-y-0">
                    {Object.keys(issueCategoriesData).map((category, idx) => (
                      <div key={idx} className="border-b border-zinc-200 dark:border-zinc-800 last:border-0">
                        <div 
                          className="flex justify-between items-center py-4 cursor-pointer hover:text-[#6F4E37] dark:text-[#E6C280] group"
                          onClick={() => toggleCategory(category)}
                        >
                          <div>
                            <h3 className={`text-[14px] ${expandedIssueCategory === category ? 'text-[#6F4E37] dark:text-[#E6C280] font-medium' : 'text-zinc-950 dark:text-zinc-50 group-hover:text-[#6F4E37] dark:text-[#E6C280]'}`}>
                              {category}
                            </h3>
                            {category === "I want to manage my order" && <p className="text-[12px] text-zinc-500 dark:text-zinc-400 mt-1">View, cancel or return an order</p>}
                            {category === "I want help with returns & refunds" && <p className="text-[12px] text-zinc-500 dark:text-zinc-400 mt-1">Manage and track returns</p>}
                            {category === "I want help with other issues" && <p className="text-[12px] text-zinc-500 dark:text-zinc-400 mt-1">Offers, payment, Flipkart Plus & all other issues</p>}
                          </div>
                          {expandedIssueCategory === category ? <ChevronDown className="w-5 h-5 text-[#6F4E37] dark:text-[#E6C280]" /> : <ChevronRight className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />}
                        </div>

                        {/* Sub-questions Expansion */}
                        {expandedIssueCategory === category && (
                          <div className="pl-4 pb-4 bg-zinc-50 dark:bg-zinc-800/50 border-l-2 border-[#6F4E37] dark:border-[#E6C280] animate-in slide-in-from-top-2 duration-200">
                            {issueCategoriesData[category].map((subQ, subIdx) => (
                              <div key={subIdx} className="pt-3">
                                <div 
                                  className="text-[13px] text-zinc-950 dark:text-zinc-50 hover:text-[#6F4E37] dark:text-[#E6C280] cursor-pointer flex justify-between items-center pr-4"
                                  onClick={() => setExpandedSubQuestion(expandedSubQuestion === subQ ? null : subQ)}
                                >
                                  <span className={expandedSubQuestion === subQ ? "font-medium text-[#6F4E37] dark:text-[#E6C280]" : ""}>{subQ}</span>
                                  {expandedSubQuestion === subQ ? <ChevronUp className="w-4 h-4 text-[#6F4E37] dark:text-[#E6C280]" /> : <ChevronDown className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />}
                                </div>
                                
                                {/* Final Answer Expansion */}
                                {expandedSubQuestion === subQ && (
                                  <div className="mt-2 text-[12px] text-zinc-500 dark:text-zinc-400 leading-relaxed pr-4">
                                    This is the detailed resolution procedure for "{subQ}". In a production environment, this text comes directly from the Flipkart Help Center knowledge base.
                                    <div className="mt-2 flex items-center gap-2">
                                      Was this helpful? 
                                      <span className="text-[#6F4E37] dark:text-[#E6C280] cursor-pointer hover:underline">Yes</span>
                                      <span className="text-[#6F4E37] dark:text-[#E6C280] cursor-pointer hover:underline">No</span>
                                    </div>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800">
                    <p className="text-[12px] text-zinc-500 dark:text-zinc-400">
                      Want to reach us old style ? Here is our <span className="text-[#6F4E37] dark:text-[#E6C280] cursor-pointer hover:underline font-medium" onClick={() => openModal("Postal Address", "Flipkart Internet Private Limited, \nBuildings Alyssa, Begonia & \nClove Embassy Tech Village, \nOuter Ring Road, Devarabeesanahalli Village, \nBengaluru, 560103, \nKarnataka, India")}>postal address</span>
                    </p>
                  </div>
                </div>
              </>
            )}

            {/* VIEW: GST Rate Updates */}
            {activeIssue === "GST Rate Updates" && (
              <div className="bg-white dark:bg-zinc-900/60 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm animate-in fade-in duration-200">
                <div className="p-6 border-b border-zinc-200 dark:border-zinc-800">
                  <h2 className="text-[18px] font-semibold text-zinc-950 dark:text-zinc-50">Frequently asked questions</h2>
                </div>
                <div className="flex flex-col">
                  {[
                    "What are the new GST rates in India?",
                    "When will I be able to buy products with the new GST rates?",
                    "How do I check the GST rate for different products?",
                    "Will the upcoming GST rate changes affect the speed of deliveries, replacements, or exchanges?",
                    "Will there be any changes made to the returns/cancellation policy for the products under the purview of GST rate changes?",
                    "How do I check the GST rate applied to my product?",
                    "Why are some luxury items more expensive now?",
                    "I see product prices are different across sellers, does this mean that some sellers have not applied revised GST rates to products?",
                    "Will there be any changes in the price of the products due to change in GST rates?",
                    "Will GST rate applied to my order change based on order shipping or invoice generation date?",
                    "If I cancel or return a product, will refund amount change due to GST changes?",
                    "Why does my invoice show the old GST rate although my order ws delivered on/after September 22?",
                    "What happens if I bought a product before the new rates, but the invoice is issued after September 22?",
                    "What happens if I bought a product via Cash on Delivery (COD) before the new rates, but the invoice is issued after September 22?",
                    "Can I cancel my order because the GST rate has changed?"
                  ].map((q, idx) => (
                    <div key={idx} className="border-b border-zinc-200 dark:border-zinc-800 last:border-0">
                      <div 
                        className="flex justify-between items-center py-4 px-6 cursor-pointer hover:bg-zinc-50 dark:bg-zinc-800/50 transition-colors"
                        onClick={() => setExpandedQuestionIdx(expandedQuestionIdx === idx ? null : idx)}
                      >
                        <span className={`text-[14px] ${expandedQuestionIdx === idx ? "text-[#6F4E37] dark:text-[#E6C280]" : "text-zinc-950 dark:text-zinc-50"}`}>{q}</span>
                        <ChevronDown className={`w-5 h-5 transition-transform ${expandedQuestionIdx === idx ? "rotate-180 text-[#6F4E37] dark:text-[#E6C280]" : "text-zinc-500 dark:text-zinc-400"}`} />
                      </div>
                      
                      {expandedQuestionIdx === idx && (
                        <div className="px-6 pb-4 pt-2 text-[13px] text-zinc-950 dark:text-zinc-50 leading-relaxed bg-zinc-50 dark:bg-zinc-800/50 border-l-2 border-[#6F4E37] dark:border-[#E6C280] ml-6 mr-6 mb-4 mt-2">
                          <p>The revised GST rates have been applied to products as per the latest government guidelines. Prices displayed on the product page are inclusive of the applicable GST.</p>
                          <div className="mt-4 flex items-center text-zinc-500 dark:text-zinc-400 text-[12px]">
                            Was this helpful? 
                            <button className="text-[#6F4E37] dark:text-[#E6C280] font-medium ml-3 hover:underline outline-none">Yes</button> 
                            <button className="text-[#6F4E37] dark:text-[#E6C280] font-medium ml-3 hover:underline outline-none">No</button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* VIEW: Help with your order */}
            {activeIssue === "Help with your order" && (
              <div className="bg-white dark:bg-zinc-900/60 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm min-h-[600px]">
                <div className="flex justify-between items-center mb-6 border-b border-zinc-200 dark:border-zinc-800 pb-4">
                  <h2 className="text-[20px] font-semibold text-zinc-950 dark:text-zinc-50">Select an Order</h2>
                  <div className="relative">
                    <select 
                      className="appearance-none bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-700 rounded-2xl px-4 py-2 pr-8 text-[14px] text-zinc-950 dark:text-zinc-50 outline-none cursor-pointer focus:border-[#6F4E37] dark:border-[#E6C280]"
                      value={orderFilter}
                      onChange={(e) => setOrderFilter(e.target.value)}
                    >
                      <option>Last 30 Days</option>
                      <option>Past 6 Months</option>
                      <option>2026</option>
                      <option>2025</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-zinc-500 dark:text-zinc-400 absolute right-3 top-2.5 pointer-events-none" />
                  </div>
                </div>

                {filteredOrders.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="w-16 h-16 text-[#e0e0e0] mx-auto mb-4" />
                    <p className="text-[16px] text-zinc-500 dark:text-zinc-400">No orders found for this timeframe.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredOrders.map(order => (
                      <div key={order.id} className="border border-zinc-200 dark:border-zinc-700 rounded-2xl overflow-hidden">
                        <div 
                          className="p-4 flex gap-4 cursor-pointer hover:bg-zinc-50 dark:bg-zinc-800/50 transition-colors"
                          onClick={() => setExpandedOrderId(expandedOrderId === order.id ? null : order.id)}
                        >
                          <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-2xl rounded-2xl">
                            {order.img}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-[14px] font-semibold text-zinc-950 dark:text-zinc-50">{order.name}</h3>
                            <p className="text-[12px] text-zinc-500 dark:text-zinc-400 mt-1">Order ID: {order.id}</p>
                            <div className="flex items-center gap-1 mt-2 text-[12px] font-medium text-zinc-950 dark:text-zinc-50">
                              {order.status === "Delivered" ? <CheckCircle2 className="w-4 h-4 text-[#388e3c]" /> : <Clock className="w-4 h-4 text-[#f57c00]" />}
                              {order.status} on {order.date}
                            </div>
                          </div>
                          <div className="flex items-center">
                            <ChevronRight className={`w-5 h-5 text-zinc-500 dark:text-zinc-400 transition-transform ${expandedOrderId === order.id ? 'rotate-90' : ''}`} />
                          </div>
                        </div>
                        {expandedOrderId === order.id && (
                          <div className="bg-[#6F4E37]/10 dark:bg-[#E6C280]/10 border-t border-zinc-200 dark:border-zinc-700 p-4 flex flex-col sm:flex-row gap-4">
                            <button className="flex-1 bg-white dark:bg-zinc-900/60 border border-zinc-300 dark:border-zinc-700 text-zinc-950 dark:text-zinc-50 py-2 text-[14px] font-medium rounded-2xl shadow-sm hover:shadow-md transition-shadow outline-none" onClick={() => router.push(`/orders/${order.id}`)}>View Order Details</button>
                            <button className="flex-1 bg-white dark:bg-zinc-900/60 border border-zinc-300 dark:border-zinc-700 text-zinc-950 dark:text-zinc-50 py-2 text-[14px] font-medium rounded-2xl shadow-sm hover:shadow-md transition-shadow outline-none" onClick={() => openModal("Return Initiated", "This will start the return process.")}>Return Item</button>
                            <button className="flex-1 bg-white dark:bg-zinc-900/60 border border-zinc-300 dark:border-zinc-700 text-zinc-950 dark:text-zinc-50 py-2 text-[14px] font-medium rounded-2xl shadow-sm hover:shadow-md transition-shadow outline-none" onClick={() => openModal("Invoice Downloaded", "The PDF has been generated.")}>Download Invoice</button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* VIEW: Help with other issues (Catalog FAQs) */}
            {activeIssue === "Help with other issues" && (
              <div className="bg-white dark:bg-zinc-900/60 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-8 shadow-sm">
                <div className="text-[12px] text-zinc-500 dark:text-zinc-400 flex items-center gap-1 mb-6">
                  <span className="hover:underline cursor-pointer" onClick={() => setActiveIssue("Help with your issues")}>Help Centre</span>
                  <ChevronRight className="w-3 h-3" />
                  <span>{activeTopic}</span>
                </div>

                <h2 className="text-[20px] font-semibold text-zinc-950 dark:text-zinc-50 mb-6">{currentTopicData.title}</h2>

                <div className="space-y-4 mb-8">
                  {currentTopicData.questions.map((q, idx) => (
                    <div key={idx} className="border-b border-zinc-200 dark:border-zinc-800 last:border-0 pb-2">
                      <div 
                        className="text-[14px] text-zinc-950 dark:text-zinc-50 hover:text-[#6F4E37] dark:text-[#E6C280] cursor-pointer transition-colors py-2 flex justify-between items-center" 
                        onClick={() => setExpandedQuestionIdx(expandedQuestionIdx === idx ? null : idx)}
                      >
                        <span className={expandedQuestionIdx === idx ? "font-medium text-[#6F4E37] dark:text-[#E6C280]" : ""}>{q}</span>
                        {expandedQuestionIdx === idx ? <ChevronUp className="w-4 h-4 flex-shrink-0 text-[#6F4E37] dark:text-[#E6C280]" /> : <ChevronDown className="w-4 h-4 flex-shrink-0 text-zinc-500 dark:text-zinc-400" />}
                      </div>
                      
                      {expandedQuestionIdx === idx && (
                        <div className="text-[13px] text-zinc-950 dark:text-zinc-50 leading-relaxed py-4 pl-4 border-l-2 border-[#6F4E37] dark:border-[#E6C280] bg-zinc-50 dark:bg-zinc-800/50 mb-2 mt-2 transition-all">
                          <p>This is the exact answer policy for <strong>"{q}"</strong>.</p>
                          <br />
                          <p>We are dynamically loading the most accurate policies from the central system to resolve your issue immediately.</p>
                          <div className="mt-4 pt-3 border-t border-zinc-200 dark:border-zinc-700 flex items-center text-zinc-500 dark:text-zinc-400">
                            Was this helpful? 
                            <button className="text-[#6F4E37] dark:text-[#E6C280] hover:bg-[#6F4E37]/10 dark:bg-[#E6C280]/10 font-medium px-3 py-1 rounded-2xl ml-2 border border-transparent hover:border-[#6F4E37] dark:border-[#E6C280] transition-colors outline-none" onClick={() => openModal("Feedback Received", "Thank you! We're glad this was helpful.")}>Yes</button> 
                            <button className="text-[#6F4E37] dark:text-[#E6C280] hover:bg-[#6F4E37]/10 dark:bg-[#E6C280]/10 font-medium px-3 py-1 rounded-2xl ml-1 border border-transparent hover:border-[#6F4E37] dark:border-[#E6C280] transition-colors outline-none" onClick={() => openModal("Feedback Received", "Thanks for your feedback. We will improve this answer.")}>No</button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Global Modal for Interactions (replaces alerts) */}
        {isModalOpen && modalContent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in duration-200">
            <div className="bg-white dark:bg-zinc-900/60 rounded-2xl shadow-xl w-full max-w-md overflow-hidden flex flex-col">
              <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center bg-[#6F4E37]/10 dark:bg-[#E6C280]/10">
                <h3 className="text-[16px] font-semibold text-zinc-950 dark:text-zinc-50">{modalContent.title}</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-950 dark:text-zinc-50 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 text-[14px] text-zinc-950 dark:text-zinc-50 leading-relaxed whitespace-pre-wrap">
                {modalContent.content}
              </div>
              <div className="px-6 py-4 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50 flex justify-end">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2 bg-[#6F4E37] dark:bg-[#E6C280] text-white text-[14px] font-medium rounded-2xl shadow-sm hover:bg-[#1a5cbd] transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
