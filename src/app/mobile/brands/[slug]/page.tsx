"use client";

import { useMemo, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { BRANDS_DIRECTORY, MOCK_PRODUCTS } from "@/data/mockData";
import AppHeader from "@/components/app-shell/AppHeader";
import AppPageLayout from "@/components/app-shell/AppPageLayout";
import ProductCard from "@/components/product/ProductCard";
import { MapPin, Calendar } from "lucide-react";

export default function MobileBrandDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const unwrappedParams = use(params);

  const brand = useMemo(() => {
    const requestedSlug = decodeURIComponent(unwrappedParams.slug).toLowerCase();
    const found = BRANDS_DIRECTORY.find((b) => b.slug.toLowerCase() === requestedSlug);
    
    if (found) return found;

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

  const brandProducts = useMemo(() => {
    let filtered = MOCK_PRODUCTS.filter((product) => 
      product.brand.toLowerCase().includes(brand.name.toLowerCase()) || 
      brand.name.toLowerCase().includes(product.brand.toLowerCase())
    );

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
      filtered = MOCK_PRODUCTS.slice(0, 8);
    }

    return filtered;
  }, [brand]);

  return (
    <AppPageLayout hasBottomNav={true}>
      <AppHeader variant="contextual" title={brand.name} showActions={true} />
      
      <div className="flex flex-col min-h-screen bg-zinc-50 pb-24 pt-2">
        {/* Mobile Hero */}
        <div className="px-4 mb-6">
          <div className="rounded-[24px] p-6 overflow-hidden relative shadow-lg border border-zinc-800 bg-zinc-950 min-h-[200px] flex items-end">
            <div className="absolute inset-0 z-0 overflow-hidden">
              <img
                src={brand.bannerImage}
                alt={brand.name}
                className="absolute inset-0 w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent mix-blend-multiply" />
            </div>
            
            <div className="relative z-10">
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-mono font-bold text-[#E6C280] uppercase">
                  {brand.category}
                </span>
              </div>
              <h1 className="text-3xl font-black text-white uppercase">{brand.name}</h1>
              <p className="text-zinc-300 text-[11px] font-serif italic mt-1">&quot;{brand.tagline}&quot;</p>
              
              <div className="flex items-center gap-3 mt-3 text-[10px] font-mono text-zinc-400 uppercase">
                <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {brand.city}</span>
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> Est. {brand.founded}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Popular Styles */}
        <div className="px-4 mb-6">
          <div className="flex overflow-x-auto hide-scrollbar gap-2 pb-1 items-center -mx-4 px-4">
            {brand.popularStyles.map((style) => (
              <span key={style} className="whitespace-nowrap px-4 py-2 rounded-full text-[11px] font-mono transition-colors bg-white border border-zinc-200 text-zinc-600">
                {style}
              </span>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="px-4">
          <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-900 mb-4">The Collection</h2>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {brandProducts.map((product) => (
              <div key={product.id} className="w-full">
                <ProductCard
                  id={product.id}
                  name={product.title}
                  brand={product.brand}
                  price={`₹${product.price}`}
                  originalPrice={product.originalPrice ? `₹${product.originalPrice}` : undefined}
                  image={product.image}
                  hoverImage={product.hoverImage}
                  basePath="/mobile"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppPageLayout>
  );
}
