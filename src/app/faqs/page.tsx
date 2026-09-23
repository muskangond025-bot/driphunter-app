"use client";

import React, { useState } from "react";
import AppHeader from "@/components/app-shell/AppHeader";
import { ChevronDown } from "lucide-react";

// Mock FAQ Data
const faqData = [
  {
    category: "Fees & Charges",
    id: "fees",
    questions: [
      { q: "Who decides the price of my products?", a: "You have complete control over the pricing of your products. However, our Seller Lens tool provides pricing recommendations based on current market trends." },
      { q: "What are the charges for selling on DripHunter?", a: "We charge a flat 8% platform commission on the final sale value, plus a standard 2% payment gateway fee. There are no listing fees." },
      { q: "Will I get charged for listing products?", a: "No, listing your products on DripHunter is completely free. We only make money when you make a sale." },
      { q: "How and when do I get paid?", a: "Payments are settled directly to your registered bank account on a T+2 basis after the item passes our authentication check." },
      { q: "Are there any hidden charges?", a: "Absolutely not. Our fee structure is 100% transparent. You can view a complete breakdown of deductions for every payout in your Seller Dashboard." },
      { q: "What happens to the fees if a customer returns the product?", a: "If an item is returned due to our verification process failing (e.g., replica item), you will be charged a penalty fee. If it's a standard return not at your fault, platform fees are reversed." }
    ]
  },
  {
    category: "Managing Account",
    id: "account",
    questions: [
      { q: "How do I list my products on DripHunter?", a: "You can list products one by one using our catalog search, or use our Bulk Upload tool via Excel for listing multiple items at once." },
      { q: "How do I manage my orders?", a: "All orders can be managed from the 'Orders' tab in your Seller Dashboard. You can print shipping labels and track dispatch statuses there." },
      { q: "Can I get help with catalogue development?", a: "Yes, our team can assist with AI-generated descriptions and automatic background removal for your product images." },
      { q: "How can I change my bank account details?", a: "You can update your bank account details under the 'Settings > Financials' section. Any changes will require an OTP verification sent to your registered mobile number." },
      { q: "What should I do if I go on vacation?", a: "You can activate 'Vacation Mode' in your dashboard. This temporarily hides your self-shipped listings. Items in the DripVault will continue to sell normally." },
      { q: "How do I track my sales performance?", a: "The 'Analytics' tab in your dashboard provides detailed metrics on your sales volume, average order value, conversion rate, and top-selling products." }
    ]
  },
  {
    category: "Services",
    id: "services",
    questions: [
      { q: "Do you offer protection against fraud?", a: "Absolutely. We offer 100% chargeback protection. Once your item is authenticated by us, you are guaranteed your payout." },
      { q: "Do I need GST to sell on DripHunter?", a: "Yes, an active GSTIN is required for business sellers. However, individual vintage curators can register using their personal PAN." },
      { q: "How does the authentication process work?", a: "All items pass through our physical authentication hub. Our experts check tags, stitching, materials, and packaging before forwarding the item to the buyer." },
      { q: "What advertising options are available?", a: "We offer DripHunter Ads (Product Listing Ads) that allow you to bid on keywords and place your products at the top of search results." },
      { q: "Can I offer discounts on my products?", a: "Yes, you can create custom coupon codes or participate in platform-wide promotional events directly from the 'Promotions' tab." }
    ]
  },
  {
    category: "Fulfilment (FBD)",
    id: "fulfilment",
    questions: [
      { q: "What is Fulfilment by DripHunter (FBD)?", a: "FBD (also known as DripVault) is our premium consignment service. You send your inventory to us, and we handle the storage, photography, and shipping." },
      { q: "How does FBD work?", a: "Ship your items to our climate-controlled vault. When an item sells, we authenticate it immediately and dispatch it the same day, ensuring the fastest delivery to the buyer." },
      { q: "What are the benefits of FBD?", a: "Faster shipping times, higher search visibility (Verified Drip badge), zero storage fees for the first 90 days, and complete hands-off logistics." },
      { q: "Is there a minimum quantity required for FBD?", a: "Currently, we require a minimum of 5 items to process an FBD inbound shipment. There is no maximum limit." },
      { q: "What happens if my items don't sell in FBD?", a: "Items stored for over 90 days will incur a small monthly storage fee. You can request to have your unsold inventory shipped back to you at any time for a nominal return shipping fee." },
      { q: "Are my items insured while in the DripVault?", a: "Yes, all inventory stored in our facility is fully insured against theft, fire, and transit damage at no extra cost to you." }
    ]
  }
];

// Accordion Item Component
const AccordionItem = ({ q, a }: { q: string; a: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-stone-200 dark:border-zinc-800 last:border-0 bg-white dark:bg-black">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-4 text-left focus:outline-none group px-4 active:bg-zinc-50 dark:active:bg-zinc-900 transition-colors"
      >
        <span className="text-[13px] font-bold text-zinc-800 dark:text-zinc-200 group-hover:text-[#6F4E37] dark:group-hover:text-[#E6C280] transition-colors pr-4">
          {q}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-zinc-400 transition-transform duration-300 shrink-0 ${isOpen ? "rotate-180 text-[#6F4E37] dark:text-[#E6C280]" : ""}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out px-4 ${
          isOpen ? "max-h-[500px] opacity-100 pb-4" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-[13px] text-zinc-600 dark:text-zinc-400 leading-relaxed">
          {a}
        </p>
      </div>
    </div>
  );
};

export default function FAQsPage() {
  const [activeCategory, setActiveCategory] = useState(faqData[0].id);

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 dark:bg-zinc-950 font-sans">
      <AppHeader title="FAQs" variant="contextual" showActions={true} />

      <main className="flex-1 max-w-md w-full mx-auto bg-zinc-50 dark:bg-zinc-950 flex flex-col">
        {/* Category Selector (Horizontal Scroll) */}
        <div className="bg-white dark:bg-black border-b border-stone-200 dark:border-zinc-800 py-3 px-4">
          <div className="flex overflow-x-auto gap-2 scrollbar-hide">
            {faqData.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold transition-colors ${
                  activeCategory === cat.id
                    ? "bg-[#6F4E37] text-white dark:bg-[#E6C280] dark:text-zinc-900 shadow-sm"
                    : "bg-zinc-100 text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800"
                }`}
              >
                {cat.category}
              </button>
            ))}
          </div>
        </div>

        {/* FAQs List */}
        <div className="flex-1 mt-2 mb-8">
          <div className="bg-white dark:bg-black border-y border-stone-200 dark:border-zinc-800 flex flex-col">
            {faqData.filter(cat => cat.id === activeCategory).map((cat) => (
              <div key={cat.id} className="animate-fade-in flex flex-col w-full">
                {cat.questions.map((item, idx) => (
                  <AccordionItem key={idx} q={item.q} a={item.a} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
