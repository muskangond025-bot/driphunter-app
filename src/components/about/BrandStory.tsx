import React, { useState } from "react";
import { Sparkles, Trophy, Flag } from "lucide-react";

export default function BrandStory() {
  const [lang, setLang] = useState<"en" | "mr">("en");

  return (
    <section className="relative w-full py-16 bg-background border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Graphic & Features Collage */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative group overflow-hidden rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:border-brand-purple/40 hover:shadow-[0_0_30px_rgba(154,106,255,0.05)]">
              <div className="absolute top-0 right-0 h-32 w-32 bg-brand-purple/5 blur-2xl rounded-full" />
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-purple/10 text-brand-purple mb-6">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Streetwear Culture Focus</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Curating the absolute best in oversized fits, limited sneakers, cargo variants, and exclusive techwear.
              </p>
            </div>

            <div className="relative group overflow-hidden rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:border-brand-neon/40 hover:shadow-[0_0_30px_rgba(204,255,0,0.05)]">
              <div className="absolute top-0 right-0 h-32 w-32 bg-brand-neon/5 blur-2xl rounded-full" />
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-neon/10 text-brand-neon dark:text-brand-neon mb-6">
                <Trophy className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Supporting Local + Premium Brands</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Giving homegrown Indian streetwear labels a premium marketplace next to global giants to showcase their creative drops.
              </p>
            </div>
          </div>

          {/* Right: Brand Story Description & Language Switcher */}
          <div className="lg:col-span-7 space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-brand-purple">The Genesis</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-1">Our Journey</h2>
              </div>
              
              {/* Language Switcher */}
              <div className="flex bg-muted rounded-full p-1 border border-border">
                <button
                  onClick={() => setLang("en")}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${
                    lang === "en"
                      ? "bg-foreground text-background shadow-md"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => setLang("mr")}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${
                    lang === "mr"
                      ? "bg-foreground text-background shadow-md"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  मराठी
                </button>
              </div>
            </div>

            {/* Story Text Box */}
            <div className="relative overflow-hidden rounded-2xl border border-border bg-card/40 backdrop-blur-sm p-8 min-h-[250px] transition-all duration-300">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-brand-purple to-brand-neon" />
              
              {lang === "en" ? (
                <div className="space-y-4 animate-fade-in">
                  <h3 className="text-2xl font-bold text-foreground">How DripHunter Started</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    DripHunter was born from a simple realization: India&apos;s streetwear community was growing exponentially, but fans had no trusted hub for authentic drops, secondary trades, or community discussions. Finding rare streetwear and verifying authenticity felt like a roll of the dice.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    We launched DripHunter as India&apos;s first dedicated streetwear ecosystem. We connect streetwear lovers directly with genuine creators, verifying every item, facilitating secure transactions, and offering a space where streetwear is not just fashion—it is culture.
                  </p>
                </div>
              ) : (
                <div className="space-y-4 animate-fade-in">
                  <h3 className="text-2xl font-bold text-foreground">DripHunter कसा सुरू झाला?</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    ड्रिपहंटरची सुरुवात एका साध्या जाणिवेतून झाली: भारतातील स्ट्रीटवेअर प्रेमींची संख्या झपाट्याने वाढत होती, परंतु ग्राहकांसाठी अस्सल प्रॉडक्ट्स, एक्सक्लुझिव्ह ड्रॉप्स किंवा कम्युनिटीशी कनेक्ट होण्यासाठी कोणतेही विश्वासार्ह व्यासपीठ नव्हते.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    आम्ही ड्रिपहंटरला भारतातील पहिले समर्पित स्ट्रीटवेअर इकोसिस्टम म्हणून लाँच केले. आम्ही स्ट्रीटवेअर प्रेमींना थेट ओरिजिनल ब्रँड्स आणि डिझायनर्सशी जोडतो, जिथे प्रत्येक ड्रॉप सुरक्षित आणि अस्सल असतो. स्ट्रीटवेअर ही केवळ फॅशन नसून ती एक संस्कृती आहे!
                  </p>
                </div>
              )}
            </div>

            {/* Quote Block */}
            <div className="flex gap-4 items-start pl-4 border-l-2 border-brand-neon/30 py-1">
              <p className="text-sm italic text-zinc-500">
                &ldquo;We don&apos;t just sell products; we facilitate the drops that define a generation&apos;s style.&rdquo;
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
