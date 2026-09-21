"use client";

import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SearchOverlay from "@/components/layout/SearchOverlay";

export default function AboutPage() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5] text-zinc-900 font-sans antialiased overflow-x-hidden select-none">
      {/* Navbar & Search */}
      <Navbar onSearchClick={() => setIsSearchOpen(true)} />
      
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-12px) rotate(0.8deg);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>

      <main className="flex-grow py-16 md:py-24 px-6 sm:px-12 md:px-20 lg:px-32 w-full max-w-[1600px] mx-auto px-6 sm:px-12 md:px-16 lg:px-20space-y-28">
        
        {/* ─── SECTION 1: SLAY THE STREETS / OUR STORY ─── */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Streetwear Character Graphic with Float Animation */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative rounded-[32px] overflow-hidden border border-[#6F4E37]/15 shadow-2xl bg-white p-6 w-full max-w-md aspect-square flex items-center justify-center transition-all duration-500 hover:scale-[1.02] animate-float">
              <img 
                src="https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=800&q=80" 
                alt="Slay the Streets Streetwear Graphic" 
                className="w-full h-full object-cover rounded-2xl filter contrast-105"
              />
              {/* Decorative label */}
              <div className="absolute bottom-4 right-4 bg-zinc-950 text-white text-[8px] font-mono tracking-widest uppercase px-3 py-1 rounded-md border border-zinc-800">
                archive.01
              </div>
            </div>
          </div>

          {/* Right: Slay the Streets Text */}
          <div className="lg:col-span-6 space-y-8 text-left">
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl lg:text-7.5xl font-black uppercase tracking-tight leading-none text-zinc-950 font-sans">
                SLAY<br />
                THE<br />
                STREETS
              </h1>
              <div className="flex items-center gap-3">
                <div className="h-[2px] w-8 bg-[#6F4E37]" />
                <h2 className="text-sm font-black uppercase tracking-widest text-[#6F4E37] font-mono">
                  Our Story
                </h2>
              </div>
            </div>
            
            <div className="space-y-5 text-xs sm:text-sm text-zinc-550 leading-relaxed font-sans font-medium">
              <p>
                Our main mission is to curate and style a premium archive of high-end streetwear that is accessible to collectors, curators, and fashion enthusiasts across the nation.
              </p>
              <p>
                Combining ease-of-use and curation flexibility, we make it possible for anyone from any corner of the country to discover authentic designer garments and limited drops. We took the name Drip Hunter from our relentless pursuit of authentic streetwear grails and limited collections. From the day we launched our first curated drop, we have dedicated ourselves to styling the streets.
              </p>
            </div>
          </div>
        </section>

        {/* Separator line */}
        <div className="h-[1px] w-full bg-zinc-200/60" />

        {/* ─── SECTION 2: TERMS AND CONDITION DOCUMENT ─── */}
        <section className="w-full max-w-[1600px] mx-auto px-6 sm:px-12 md:px-16 lg:px-20space-y-12">
          
          {/* Header Tag and Document Title */}
          <div className="flex flex-col items-center text-center space-y-5">
            <span className="bg-[#6F4E37] text-white text-[9px] font-black uppercase tracking-[0.25em] px-6 py-2.5 rounded-xl border border-[#6F4E37]/15 shadow-md inline-block">
              Terms and Condition
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-zinc-950 max-w-2xl leading-tight font-sans">
              Over thousands of grails verified. What are you copping next?
            </h2>
          </div>

          {/* Document Content - Clean, Borderless, Integrated Editorial Flow */}
          <div className="space-y-8 text-xs sm:text-sm text-zinc-600 leading-relaxed font-sans text-left relative overflow-hidden py-4">
            {/* Fine Header Index */}
            <div className="flex justify-between items-center w-full border-b border-zinc-200 pb-5 mb-8 font-mono text-[10px] text-zinc-450">
              <span>DOCUMENT ID: DH-TC-2026</span>
              <span>REVISION: 4.2</span>
              <span>VERIFIED ARCHIVE</span>
            </div>

            <p>
              Hundreds of thousands of street fashion enthusiasts look for design inspiration, verified drops, and curated archives on Drip Hunter. We help collectors like you discover unique projects, showcase your personal style portfolios, and wear what you love—no matter what kind of style identity you represent. Founded in 2024, we are a bootstrapped and culture-driven platform helping design talent share their creations and get copped by over tens of thousands of today&apos;s most active streetwear collectors around the country.
            </p>
            <p>
              Practically every single streetwear marketplace worth copping from has a Curation Policy page that it can turn to whenever issues about authenticity come up with users. That&apos;s why you really need to have a clear curation terms framework, ensuring all bases are covered. This is why you want to look into the details of our verified legit-check process, since it comes with absolute peace of mind. A curation terms policy is a verified ledger that details how a website inspects, gathers, stores, and presents clothing drops to its community. This data typically includes items such as the brand provenance, fabric GSM, print details, and verified seller parameters.
            </p>
            <p>
              The specific contents of a curation policy depend on the strict design standards in the legal jurisdiction in which our business operates. We follow all local consumer guidelines regarding how products are cataloged, verified, and shipped. Curation policies include authentic verification steps, secure transaction standards, and strict refund protocols.
            </p>
            <p>
              When it comes to limited edition streetwear, it is best not to take chances with authenticity. Fortunately, our curation terms are completely transparent. If you have any inquiries about a drop or an archive, our customer support curators are ready to assist you.
            </p>

            {/* Sub-section: Technologies */}
            <div className="space-y-5 pt-8 border-t border-zinc-200 mt-8">
              <h3 className="text-sm sm:text-base font-black uppercase tracking-wide text-zinc-950">
                Types of technologies that we use
              </h3>
              <p>
                <strong className="text-[#6F4E37] font-extrabold uppercase font-mono tracking-wider text-[11px] block mb-1">Cookies:</strong> A cookie is a small piece of data (text file) that our platform asks your browser to store on your device in order to remember information about you, such as your cart items or profile login details. These cookies are set by us (first-party cookies). We also use third-party cookies originating from secure payment domains (e.g. , for processing card checkouts) to maintain security (for example, shopping cart functionality, payment protection, and customer support); to track, measure, and improve performance of our drops; and to target our owns ads to prior visitors of our Sites on third-party websites (see below on &apos;Why We Use Cookies and Similar Technologies&apos;).
              </p>
              
              <ul className="space-y-4 pl-5 list-disc text-zinc-500 mt-4 font-mono text-[11px] leading-relaxed">
                <li>
                  A persistent cookie remains on your device after you close your browser, remembering your bag configurations for subsequent visits to Drip Hunter.
                </li>
                <li>
                  A session cookie is temporary and disappears as soon as you close your browser.
                </li>
                <li>
                  A third-party cookie helps us process secure transactions and prevents automated bots from copping exclusive limited drops during release hours.
                </li>
              </ul>
            </div>

            <p className="pt-6 text-[10px] text-zinc-400 font-mono italic border-t border-zinc-200 mt-8">
              You can configure your web browser to refuse all cookies. However, some features of our service (like checkout cart systems) may not function properly if cookies are disabled. For more details, you can visit <a href="http://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-[#6F4E37] underline hover:text-[#5C3D2E]">allaboutcookies.org</a>.
            </p>
          </div>

          {/* Bottom Visual: Document and Pen close-up */}
          <div className="relative rounded-[32px] overflow-hidden border border-[#6F4E37]/15 shadow-xl aspect-[16/9] w-full max-w-3xl mx-auto transition-transform duration-500 hover:scale-[1.01]">
            <img 
              src="https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80" 
              alt="Terms and Conditions Curation close-up" 
              className="w-full h-full object-cover filter contrast-105 brightness-95"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/30 to-transparent pointer-events-none" />
          </div>

        </section>

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
