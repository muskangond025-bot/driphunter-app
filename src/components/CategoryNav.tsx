"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

/* ──────────────────────────────────────────────
   Category data – subcategories per top-level
   ────────────────────────────────────────────── */

interface SubCategory {
  title: string;
  items: string[];
}

interface PromoImage {
  src: string;
  alt: string;
  label: string;
}

interface CategoryData {
  label: string;
  href: string;
  badge?: string;
  subcategories: SubCategory[];
  promoImages: PromoImage[];
}

const categories: CategoryData[] = [
  {
    label: "MEN",
    href: "/shop?category=men",
    subcategories: [
      {
        title: "Topwear",
        items: ["T-Shirts", "Casual Shirts", "Formal Shirts", "Sweatshirts", "Sweaters", "Jackets", "Blazers & Coats", "Suits", "Rain Jackets"],
      },
      {
        title: "Bottomwear",
        items: ["Jeans", "Casual Trousers", "Formal Trousers", "Shorts", "Track Pants & Joggers"],
      },
      {
        title: "Innerwear & Sleepwear",
        items: ["Briefs & Trunks", "Boxers", "Vests", "Sleepwear & Loungewear", "Thermals"],
      },
      {
        title: "Footwear",
        items: ["Casual Shoes", "Sports Shoes", "Formal Shoes", "Sneakers", "Sandals & Floaters", "Flip Flops", "Socks"],
      },
      {
        title: "Sports & Active Wear",
        items: ["Sports Shoes", "Sports Sandals", "Active T-Shirts", "Track Pants & Shorts", "Tracksuits", "Jackets & Sweatshirts", "Sports Accessories", "Swimwear"],
      },
      {
        title: "Fashion Accessories",
        items: ["Wallets", "Belts", "Perfumes & Body Mists", "Trimmers", "Deodorants", "Ties, Cufflinks & Pocket Squares", "Accessory Gift Sets", "Caps & Hats", "Mufflers, Scarves & Gloves", "Phone Cases", "Rings & Wristwear", "Helmets"],
      },
      {
        title: "Indian & Festive Wear",
        items: ["Kurtas & Kurta Sets", "Sherwanis", "Nehru Jackets", "Dhotis"],
      },
      {
        title: "Personal Care & Grooming",
        items: [],
      },
      {
        title: "Sunglasses & Frames",
        items: [],
      },
      {
        title: "Watches",
        items: [],
      },
      {
        title: "Gadgets",
        items: ["Smart Wearables", "Fitness Gadgets", "Headphones", "Speakers"],
      },
      {
        title: "Bags & Backpacks",
        items: [],
      },
    ],
    promoImages: [
      { src: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=400&h=300&fit=crop", alt: "Men's Fashion", label: "NEW ARRIVALS" },
      { src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop", alt: "Men's Collection", label: "TRENDING NOW" },
    ],
  },
  {
    label: "WOMEN",
    href: "/shop?category=women",
    subcategories: [
      {
        title: "Indian & Fusion Wear",
        items: ["Kurtas & Suits", "Kurtis & Tunics", "Sarees", "Ethnic Wear", "Leggings & Salwars", "Skirts & Palazzos", "Dress Materials", "Lehenga Cholis", "Dupattas & Shawls", "Jackets"],
      },
      {
        title: "Western Wear",
        items: ["Dresses", "Tops", "T-Shirts", "Jeans", "Trousers & Capris", "Shorts & Skirts", "Co-ords", "Playsuits", "Jumpsuits", "Shrugs", "Sweaters & Sweatshirts", "Jackets & Coats", "Blazers & Waistcoats"],
      },
      {
        title: "Footwear",
        items: ["Flats", "Casual Shoes", "Heels", "Boots", "Sports Shoes & Floaters"],
      },
      {
        title: "Lingerie & Sleepwear",
        items: ["Bra", "Briefs", "Shapewear", "Sleepwear & Loungewear", "Swimwear", "Camisoles & Thermals"],
      },
      {
        title: "Beauty & Personal Care",
        items: ["Makeup", "Skincare", "Premium Beauty", "Lipsticks", "Fragrances"],
      },
      {
        title: "Accessories",
        items: ["Handbags", "Sunglasses", "Watches", "Jewellery", "Hair Accessories"],
      },
    ],
    promoImages: [
      { src: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=300&fit=crop", alt: "Women's Fashion", label: "SUMMER COLLECTION" },
      { src: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=300&fit=crop", alt: "Women's Style", label: "BESTSELLERS" },
    ],
  },
  {
    label: "KIDS",
    href: "/shop?category=kids",
    subcategories: [
      {
        title: "Boys Clothing",
        items: ["T-Shirts", "Shirts", "Shorts", "Jeans", "Trousers", "Clothing Sets"],
      },
      {
        title: "Girls Clothing",
        items: ["Dresses", "Tops", "T-Shirts", "Clothing Sets", "Lehenga Cholis", "Kurta Sets", "Skirts & Shorts"],
      },
      {
        title: "Footwear",
        items: ["Casual Shoes", "Flipflops", "Sports Shoes", "Flats", "Sandals"],
      },
      {
        title: "Infants",
        items: ["Bodysuits", "Rompers", "Baby Sets", "Winterwear", "Innerwear"],
      },
      {
        title: "Toys & Games",
        items: ["Learning & Educational", "Activity Toys", "Soft Toys", "Action Figures"],
      },
    ],
    promoImages: [
      { src: "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=400&h=300&fit=crop", alt: "Kids Fashion", label: "KIDS SPECIAL" },
    ],
  },
  {
    label: "HOME",
    href: "/shop?category=home",
    subcategories: [
      {
        title: "Bed Linen & Furnishing",
        items: ["Bed Runners", "Mattress Protectors", "Bedsheets", "Bedding Sets", "Blankets & Quilts", "Pillows & Pillow Covers"],
      },
      {
        title: "Flooring",
        items: ["Floor Runners", "Carpets", "Floor Mats & Dhurries"],
      },
      {
        title: "Bath",
        items: ["Bath Towels", "Hand & Face Towels", "Beach Towels", "Bathrobes", "Bathroom Accessories"],
      },
      {
        title: "Lamps & Lighting",
        items: ["Floor Lamps", "Ceiling Lamps", "Table Lamps", "Wall Lamps", "Outdoor Lamps"],
      },
      {
        title: "Home Décor",
        items: ["Plants & Planters", "Aromas & Candles", "Clocks", "Mirrors", "Wall Décor", "Festive Décor", "Pooja Essentials", "Wall Shelves"],
      },
      {
        title: "Kitchen & Table",
        items: ["Table Runners", "Dinnerware & Serveware", "Cups & Mugs", "Bakeware & Cookware", "Kitchen Storage"],
      },
    ],
    promoImages: [
      { src: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=400&h=300&fit=crop", alt: "Home Decor", label: "HOME REFRESH" },
    ],
  },
  {
    label: "BEAUTY",
    href: "/shop?category=beauty",
    subcategories: [
      {
        title: "Makeup",
        items: ["Lipstick", "Lip Gloss", "Lip Liner", "Mascara", "Eyeliner", "Kajal", "Eyeshadow", "Foundation", "Primer", "Concealer", "Compact", "Nail Polish"],
      },
      {
        title: "Skincare",
        items: ["Moisturiser", "Cleanser", "Masks & Peel", "Sunscreen", "Serum", "Face Wash", "Eye Cream", "Lip Balm"],
      },
      {
        title: "Haircare",
        items: ["Shampoo", "Conditioner", "Hair Cream", "Hair Oil", "Hair Gel", "Hair Colour", "Hair Serum", "Hair Accessory"],
      },
      {
        title: "Fragrances",
        items: ["Perfume", "Deodorant", "Body Mist"],
      },
      {
        title: "Appliances",
        items: ["Hair Straightener", "Hair Dryer", "Epilator"],
      },
    ],
    promoImages: [
      { src: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop", alt: "Beauty Products", label: "BEAUTY PICKS" },
    ],
  },
  {
    label: "GENZ",
    href: "/shop?category=genz",
    subcategories: [
      {
        title: "Trending Now",
        items: ["Oversized Tees", "Cargo Pants", "Baggy Jeans", "Graphic Tees", "Streetwear Sets"],
      },
      {
        title: "Sneaker Culture",
        items: ["High Tops", "Chunky Sneakers", "Limited Editions", "Collabs"],
      },
      {
        title: "Accessories",
        items: ["Bucket Hats", "Chain Necklaces", "Phone Cases", "Tote Bags", "Sunglasses"],
      },
      {
        title: "Y2K & Retro",
        items: ["Low Rise Jeans", "Baby Tees", "Mini Skirts", "Platform Shoes"],
      },
    ],
    promoImages: [
      { src: "https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=400&h=300&fit=crop", alt: "GenZ Style", label: "GEN-Z VIBES" },
      { src: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=400&h=300&fit=crop", alt: "Street Style", label: "STREET STYLE" },
    ],
  },
  {
    label: "STUDIO",
    href: "/shop?category=studio",
    badge: "NEW",
    subcategories: [
      {
        title: "DripHunter Originals",
        items: ["Signature Tees", "Premium Hoodies", "Limited Drops", "Collab Pieces"],
      },
      {
        title: "Curated Collections",
        items: ["Minimalist Edit", "Streetwear Edit", "Athleisure Edit", "Party Edit"],
      },
      {
        title: "Exclusive Launches",
        items: ["Pre-Order", "Coming Soon", "Just Dropped"],
      },
    ],
    promoImages: [
      { src: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=300&fit=crop", alt: "Studio Collection", label: "STUDIO EXCLUSIVES" },
    ],
  },
];

/* ──────────────────────────────────────────────
   Component
   ────────────────────────────────────────────── */

export default function CategoryNav() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [expandedSub, setExpandedSub] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveCategory(label);
    setExpandedSub(null);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveCategory(null);
      setExpandedSub(null);
    }, 200);
  };

  const handlePanelEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const toggleSubcategory = (title: string) => {
    setExpandedSub((prev) => (prev === title ? null : title));
  };

  // Close on escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveCategory(null);
        setExpandedSub(null);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const activeCat = categories.find((c) => c.label === activeCategory);

  return (
    <div className="relative w-full bg-white" ref={navRef}>
      {/* Top category bar */}
      <div className="w-full overflow-x-auto scrollbar-none py-3 border-b border-zinc-100 snap-x snap-mandatory scroll-smooth scroll-p-6">
        <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-12 md:px-16 lg:px-20flex items-center justify-center gap-8 md:gap-10">
          {categories.map((cat) => (
            <button
              key={cat.label}
              onMouseEnter={() => handleMouseEnter(cat.label)}
              onMouseLeave={handleMouseLeave}
              onClick={() =>
                setActiveCategory((prev) =>
                  prev === cat.label ? null : cat.label
                )
              }
              className={`relative text-sm font-bold uppercase tracking-wider whitespace-nowrap transition-colors duration-200 cursor-pointer pb-1 shrink-0 snap-center ${
                activeCategory === cat.label
                  ? "text-[#6F4E37]"
                  : "text-zinc-700 hover:text-black"
              }`}
            >
              {cat.label}
              {cat.badge && (
                <sup className="ml-0.5 text-[10px] font-bold text-[#6F4E37] tracking-normal">
                  {cat.badge}
                </sup>
              )}
              {/* Active underline */}
              {activeCategory === cat.label && (
                <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#6F4E37] rounded-full transition-all" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Mega-menu panel */}
      {activeCat && (
        <div
          className="absolute left-0 right-0 top-full z-50 bg-white border-b border-zinc-200 shadow-xl shadow-black/5 transition-all duration-200"
          onMouseEnter={handlePanelEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-12 md:px-16 lg:px-20py-6 flex gap-0">
            {/* LEFT: Subcategory list */}
            <div className="w-64 flex-shrink-0 border-r border-zinc-100 pr-6 max-h-[65vh] overflow-y-auto scrollbar-none">
              {activeCat.subcategories.map((sub) => {
                const isExpanded = expandedSub === sub.title;
                const hasItems = sub.items.length > 0;

                return (
                  <div key={sub.title} className="mb-1">
                    <button
                      onClick={() => hasItems && toggleSubcategory(sub.title)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-all duration-200 cursor-pointer group ${
                        isExpanded
                          ? "bg-[#6F4E37]/10"
                          : "hover:bg-zinc-50"
                      }`}
                    >
                      <span
                        className={`text-sm font-semibold transition-colors ${
                          isExpanded ? "text-[#6F4E37]" : "text-[#6F4E37]"
                        }`}
                      >
                        {sub.title}
                      </span>
                      {hasItems && (
                        <ChevronDown
                          className={`w-4 h-4 text-zinc-400 transition-transform duration-200 ${
                            isExpanded ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </button>

                    {/* Expandable sub-items */}
                    {hasItems && (
                      <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                          isExpanded ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                        }`}
                      >
                        <div className="pl-3 pr-2 pb-2 pt-1 flex flex-col gap-0.5">
                          {sub.items.map((item) => (
                            <Link
                              key={item}
                              href={`${activeCat.href}&sub=${encodeURIComponent(item.toLowerCase())}`}
                              className="px-3 py-1.5 text-sm text-zinc-600 hover:text-black hover:bg-zinc-50 rounded-md transition-colors duration-150"
                              onClick={() => {
                                setActiveCategory(null);
                                setExpandedSub(null);
                              }}
                            >
                              {item}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* RIGHT: Promo images */}
            <div className="flex-1 pl-8 flex items-start gap-6 overflow-hidden">
              {activeCat.promoImages.map((img, idx) => (
                <Link
                  key={idx}
                  href={activeCat.href}
                  className="group relative flex-1 rounded-xl overflow-hidden aspect-[4/3] max-w-sm bg-zinc-100"
                  onClick={() => {
                    setActiveCategory(null);
                    setExpandedSub(null);
                  }}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <span className="absolute bottom-4 left-4 text-white text-sm font-bold uppercase tracking-wider">
                    {img.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Backdrop overlay */}
      {activeCategory && (
        <div
          className="fixed inset-0 top-0 bg-black/20 z-40"
          style={{ top: navRef.current ? navRef.current.getBoundingClientRect().bottom + "px" : "0" }}
          onClick={() => {
            setActiveCategory(null);
            setExpandedSub(null);
          }}
        />
      )}
    </div>
  );
}
