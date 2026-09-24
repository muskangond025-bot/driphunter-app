const fs = require('fs');

let content = fs.readFileSync('src/app/mobile/product/[id]/page.tsx', 'utf-8');

if (!content.includes('import Link from "next/link";')) {
    content = content.replace('import Image from "next/image";', 'import Image from "next/image";\nimport Link from "next/link";');
}

if (!content.includes('import Footer from "@/components/layout/Footer";')) {
    content = content.replace('import AppPageLayout from "@/components/app-shell/AppPageLayout";', 'import AppPageLayout from "@/components/app-shell/AppPageLayout";\nimport Footer from "@/components/layout/Footer";');
}

const breadcrumbsCode = `        }
      />

      {/* ─── BREADCRUMBS ─── */}
      <div className="w-full px-5 py-3 border-b border-zinc-100 dark:border-zinc-800">
        <nav className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-zinc-400 uppercase select-none">
          <Link href="/mobile" className="hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/mobile/shop" className="hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors">Clothing</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#6F4E37] dark:text-[#E6C280] font-bold truncate max-w-[120px] inline-block align-bottom">{dynamicName}</span>
        </nav>
      </div>`;

content = content.replace('        }\n      />', breadcrumbsCode);

const startMarker = "{/* 9. REVIEWS */}";
const endMarker = "{/* ─── TOAST NOTIFICATION ─── */}";

const idxStart = content.indexOf(startMarker);
const idxEnd = content.indexOf(endMarker);

if (idxStart !== -1 && idxEnd !== -1) {
    const newSections = `{/* 6.5 VIRTUAL FITTING ROOM */}
        <div className="px-5 py-8">
          <div className="mb-6">
            <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-[#6F4E37] dark:text-[#E6C280] block mb-2">
              Interactive Experience
            </span>
            <h2 className="text-2xl font-light tracking-tight text-zinc-950 dark:text-zinc-50 font-playfair leading-tight">
              Virtual <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280]">Fitting Room</span>
            </h2>
          </div>

          <div className="relative rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 h-[400px] border border-zinc-200/50 dark:border-zinc-800/50 mb-6">
            <Image
              src={tryOnWardrobe[0]?.modelImage || "/images/awwwards_tryon_studio.jpg"}
              alt="Studio Model"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-mono font-bold text-zinc-900 dark:text-white shadow-sm border border-zinc-200/50 dark:border-zinc-800/50">
              Viewing: Base Model
            </div>
          </div>
        </div>

        <div className="h-2 w-full bg-zinc-50 dark:bg-zinc-900" />

        {/* 11. STYLE WITH US (INTERACTIVE) */}
        <div className="px-5 py-8">
          <div className="mb-6 text-left">
            <span className="text-[10px] font-mono tracking-[0.2em] text-[#6F4E37] dark:text-[#E6C280] font-bold uppercase block mb-1">
              Curated Lookbook
            </span>
            <h3 className="text-2xl font-light tracking-tight text-zinc-950 dark:text-zinc-50 font-playfair uppercase leading-none">
              Style With <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280]">Us</span>
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 leading-relaxed font-sans">
              Elevate your wardrobe with perfectly paired pieces.
            </p>
          </div>

          <div className="flex flex-col gap-6 bg-zinc-50/50 dark:bg-zinc-900/30 rounded-3xl p-5 border border-zinc-100 dark:border-zinc-800/60 shadow-sm">
            <div className="relative rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 h-[400px] w-full">
              <img
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80"
                alt="Curated Look"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="h-2 w-full bg-zinc-50 dark:bg-zinc-900" />

        {/* 9. REVIEWS */}
        <div className="px-5 py-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-black font-sans uppercase tracking-widest text-zinc-950 dark:text-white">
              Reviews ({mockReviews.length})
            </h3>
            <div className="flex items-center gap-1 text-xs font-mono font-bold text-[#6F4E37] dark:text-[#E6C280]">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>4.8</span>
            </div>
          </div>
          
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-none snap-x">
            {mockReviews.slice(0, 3).map((rev) => (
              <div key={rev.id} className="w-[280px] shrink-0 snap-center bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl p-4 border border-zinc-100 dark:border-zinc-800/80">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase font-mono">{rev.name}</h4>
                    <span className="text-[9px] font-mono text-zinc-500 dark:text-zinc-400 block pt-0.5">{rev.date}</span>
                  </div>
                  <div className="flex text-yellow-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed font-sans mt-2 line-clamp-3">
                  "{rev.comment}"
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* PUMA X FERRARI BANNER */}
        <section className="w-full bg-gradient-to-br from-[#1b120c] via-[#2c1e16] to-[#0c0805] py-12 px-5 flex flex-col items-center justify-center text-center text-white relative">
          <div className="relative z-10 space-y-2">
            <span className="text-[8px] font-mono tracking-[0.4em] text-[#E6C280] font-bold uppercase block">
              Official Collaboration
            </span>
            <h2 className="text-2xl font-light uppercase tracking-tight text-white font-playfair leading-tight">
              PUMA x <span className="font-serif italic font-normal text-[#E6C280]">Ferrari</span>
            </h2>
            <div className="w-8 h-[1px] bg-[#E6C280]/40 mx-auto my-2" />
            <p className="text-[10px] font-mono text-stone-300 leading-relaxed max-w-xs mx-auto">
              Bringing motorsport heritage to high-end luxury streetwear.
            </p>
          </div>
        </section>

        {/* MORE FROM BRAND */}
        <div className="px-5 py-8 bg-[#E5B53C] text-zinc-950">
          <h2 className="text-3xl font-black font-sans uppercase tracking-tight leading-none mb-3">
            {productDetail.brand.toUpperCase()}
          </h2>
          <p className="text-xs font-sans leading-relaxed mb-5 font-medium text-zinc-900/80">
            Discover the full range of authentic streetwear directly from {productDetail.brand}.
          </p>
          <Link href={\`/mobile/brands/\${productDetail.brand.toLowerCase()}\`} className="inline-flex items-center justify-center border-2 border-zinc-950 px-6 py-2.5 rounded-full text-[10px] font-bold font-mono uppercase tracking-widest hover:bg-zinc-950 hover:text-[#E5B53C] transition-colors w-max">
            Shop {productDetail.brand}
          </Link>
        </div>

        <div className="h-2 w-full bg-zinc-50 dark:bg-zinc-900" />

        {/* 12. SIMILAR PRODUCTS */}
        <div className="px-5 py-8">
          <h3 className="text-sm font-black font-sans uppercase tracking-widest text-zinc-950 dark:text-white mb-6">
            Similar Products
          </h3>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-none snap-x">
            {similarProducts.map((p) => (
              <div key={p.id} className="w-[45vw] sm:w-[200px] shrink-0 snap-start">
                <ProductCard
                  id={p.id}
                  brand={p.brand}
                  name={p.name}
                  price={p.price.toString()}
                  image={p.image}
                  basePath="/mobile"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="h-2 w-full bg-zinc-50 dark:bg-zinc-900" />

        {/* RECENTLY VIEWED */}
        <div className="px-5 py-8">
          <h3 className="text-sm font-black font-sans uppercase tracking-widest text-zinc-950 dark:text-white mb-6">
            Recently Viewed
          </h3>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-none snap-x">
            {recentlyViewed.map((p) => (
              <div key={p.id} className="w-[45vw] sm:w-[200px] shrink-0 snap-start">
                <ProductCard
                  id={p.id}
                  brand={p.brand}
                  name={p.name}
                  price={p.price.toString()}
                  image={p.image}
                  basePath="/mobile"
                />
              </div>
            ))}
          </div>
        </div>

        <Footer />\n\n        `;
    
    content = content.substring(0, idxStart) + newSections + content.substring(idxEnd);
}

fs.writeFileSync('src/app/mobile/product/[id]/page.tsx', content, 'utf-8');
console.log('Done!');
