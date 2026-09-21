"use client";

import { useMemo, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { BRANDS_DIRECTORY } from "@/data/mockData";
import { MOCK_PRODUCTS } from "@/data/mockData";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/product/ProductCard";
import { ArrowLeft, Globe, MapPin, Calendar, ExternalLink } from "lucide-react";

export default function BrandDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const unwrappedParams = use(params);

  // Find the requested brand or generate a fallback
  const brand = useMemo(() => {
    const requestedSlug = decodeURIComponent(unwrappedParams.slug).toLowerCase();
    const found = BRANDS_DIRECTORY.find((b) => b.slug.toLowerCase() === requestedSlug);
    
    if (found) return found;

    // Fallback brand for any slug not explicitly defined in BRANDS_DIRECTORY
    const formattedName = requestedSlug
      .split(/[- ]+/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    return {
      id: requestedSlug,
      name: formattedName,
      slug: requestedSlug,
      category: "underground",
      country: "Global",
      city: "Worldwide",
      founded: "2024",
      itemCount: 0,
      featured: false,
      tagline: `Premium streetwear and culture from ${formattedName}.`,
      description: `Explore the complete curated archive of ${formattedName}. Discover the latest drops, iconic silhouettes, and limited edition releases.`,
      bannerImage: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1000&q=80",
      popularStyles: ["New Arrivals", "Classics"]
    };
  }, [unwrappedParams.slug]);

  // Filter products by brand
  const brandProducts = useMemo(() => {
    let filtered = MOCK_PRODUCTS.filter((product) => 
      product.brand.toLowerCase().includes(brand.name.toLowerCase()) || 
      brand.name.toLowerCase().includes(product.brand.toLowerCase())
    );

    // Artificial padding for demo purposes: ensure at least 8 cards
    if (filtered.length > 0 && filtered.length < 8) {
      const template = filtered[0];
      const additional = Array.from({ length: 8 - filtered.length }).map((_, i) => ({
        ...template,
        id: `${template.id}-var-${i}`,
        title: `${template.title} (Vol. ${i + 2})`,
        price: template.price + (i * 500)
      }));
      filtered = [...filtered, ...additional];
    } else if (filtered.length === 0) {
      // If none found, show some trending items as a fallback
      filtered = MOCK_PRODUCTS.slice(0, 8);
    }

    return filtered;
  }, [brand]);

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5] dark:bg-[#0C0B0A] text-zinc-900 dark:text-white font-sans antialiased overflow-x-hidden selection:bg-[#6F4E37]/20 selection:text-[#6F4E37] transition-colors duration-300 w-full">
      <Navbar />

      <main className="flex-grow pb-16">
        
        {/* ─── HERO COVER BANNER ─── */}
        <section className="relative w-full h-[50vh] min-h-[400px] md:h-[60vh] flex items-end">
          <div className="absolute inset-0 z-0">
            <Image
              src={brand.bannerImage}
              alt={brand.name}
              fill
              className="object-cover"
              priority
            />
            {/* Dark gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F5] via-[#FAF8F5]/80 to-transparent dark:from-[#0C0B0A] dark:via-[#0C0B0A]/80" />
            <div className="absolute inset-0 bg-black/20" />
          </div>

          <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 sm:px-12 md:px-16 lg:px-20 pb-12 sm:pb-16">
            <Link 
              href="/brands"
              className="inline-flex items-center gap-2 text-zinc-800 dark:text-zinc-200 hover:text-[#6F4E37] dark:hover:text-[#E6C280] transition-colors text-[10px] font-mono font-bold uppercase tracking-widest mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Ateliers
            </Link>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-white/50 dark:bg-black/50 backdrop-blur-md border border-stone-200 dark:border-zinc-800 text-[10px] font-mono font-bold text-[#6F4E37] dark:text-[#E6C280] uppercase tracking-wider">
                    {brand.category}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/50 dark:bg-black/50 backdrop-blur-md border border-stone-200 dark:border-zinc-800 text-[10px] font-mono text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
                    {brand.itemCount} Verified Pieces
                  </span>
                </div>
                
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black font-sans tracking-tight text-zinc-950 dark:text-white uppercase leading-[0.9]">
                  {brand.name}
                </h1>
                
                <p className="text-sm md:text-base lg:text-lg text-zinc-800 dark:text-zinc-200 max-w-2xl font-serif italic">
                  &quot;{brand.tagline}&quot;
                </p>
              </div>

              <div className="flex md:flex-col gap-4 md:text-right text-xs font-mono font-bold uppercase tracking-widest text-zinc-600 dark:text-zinc-400">
                <div className="flex items-center md:justify-end gap-2">
                  <MapPin className="w-4 h-4 text-[#6F4E37] dark:text-[#E6C280]" />
                  <span>{brand.city}, {brand.country}</span>
                </div>
                <div className="flex items-center md:justify-end gap-2">
                  <Calendar className="w-4 h-4 text-[#6F4E37] dark:text-[#E6C280]" />
                  <span>Est. {brand.founded}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── ATELIER MANIFESTO ─── */}
        <section className="w-full max-w-[1400px] mx-auto px-6 sm:px-12 md:px-16 lg:px-20 py-12 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
            
            {/* Left Column: Details */}
            <div className="lg:col-span-4 space-y-8">
              <div>
                <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-[#6F4E37] dark:text-[#E6C280] uppercase block mb-4">
                  Signature Silhouettes
                </span>
                <div className="flex flex-wrap gap-2">
                  {brand.popularStyles.map((style) => (
                    <span 
                      key={style}
                      className="text-[10px] font-mono bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 px-3 py-1.5 rounded-lg"
                    >
                      {style}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-8 border-t border-stone-200 dark:border-zinc-800">
                <a 
                  href="#" 
                  className="inline-flex items-center gap-2 text-[11px] font-mono font-bold text-zinc-900 dark:text-white uppercase tracking-widest hover:text-[#6F4E37] dark:hover:text-[#E6C280] transition-colors"
                >
                  <Globe className="w-4 h-4" />
                  Visit Official Website
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Right Column: Manifesto */}
            <div className="lg:col-span-8">
              <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-[#6F4E37] dark:text-[#E6C280] uppercase block mb-6">
                The Manifesto
              </span>
              <p className="text-lg md:text-xl lg:text-2xl text-zinc-800 dark:text-zinc-200 font-sans leading-relaxed font-light">
                {brand.description}
              </p>
            </div>

          </div>
        </section>

        {/* ─── ARCHIVE / PRODUCT GRID ─── */}
        <section className="w-full max-w-[1400px] mx-auto px-6 sm:px-12 md:px-16 lg:px-20 space-y-8">
          <div className="flex items-end justify-between border-b border-stone-200/90 dark:border-zinc-800 pb-4">
            <div>
              <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-[#6F4E37] dark:text-[#E6C280] uppercase">
                CURATED VAULT
              </span>
              <h2 className="text-3xl md:text-4xl font-light tracking-tight text-zinc-950 dark:text-zinc-50 font-playfair uppercase mt-2">
                Brand <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280]">Archive</span>
              </h2>
            </div>
            <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-500">
              Showing {brandProducts.length} Items
            </div>
          </div>

          {brandProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {brandProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  id={product.id}
                  name={product.title}
                  brand={product.brand}
                  price={`₹${product.price.toLocaleString()}`}
                  originalPrice={product.originalPrice ? `₹${product.originalPrice.toLocaleString()}` : undefined}
                  image={product.image}
                  hoverImage={product.hoverImage}
                  badge={product.isNew ? "New Drop" : product.isLimited ? "Limited" : undefined}
                  rating={product.rating}
                  inStock={product.inStock !== false}
                />
              ))}
            </div>
          ) : (
            <div className="py-24 text-center space-y-4">
              <h3 className="text-xl font-bold font-sans">No pieces currently listed</h3>
              <p className="text-sm font-sans text-zinc-500">
                We are currently sourcing more pieces from this atelier. Check back soon.
              </p>
            </div>
          )}
        </section>

      </main>
      
      <Footer />
    </div>
  );
}
