"use client";

import React, { useState, useEffect, useMemo } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SearchOverlay from "@/components/layout/SearchOverlay";
import InstagramFeed from "@/components/InstagramFeed";
import { useCart } from "@/context/CartContext";
import { Eye, ChevronDown, ChevronLeft, ChevronRight, X, Calendar, Tag, BookOpen, Plus, Sparkles, Clock, ArrowUpRight, Heart, Shield, Fingerprint, Check, Bookmark, ShoppingBag, Layers, Lock, Mail, User, Key, Zap, Flame, ShieldCheck, Film, Play, Globe } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Article {
  id: string;
  category: string;
  date: string;
  title: string;
  image: string;
  excerpt: string;
  content: string;
  price: string;
  brand: string;
}

interface StoryBrand {
  id: string;
  name: string;
  logo: string;
  activeDropTitle: string;
  hours: number;
  minutes: number;
  seconds: number;
  image: string;
  video: string;
  description: string;
  featuredProduct: string;
  price: string;
}

interface SimilarProduct {
  name: string;
  brand: string;
  price: string;
  image: string;
}

interface DripSpotItem {
  name: string;
  brand: string;
  price: string;
  numericPrice: number;
  image: string; // garment image
  xPercent: number; // position on image
  yPercent: number;
  similarProducts: SimilarProduct[];
}

interface DripSpotFit {
  id: string;
  celebrityName: string;
  dateUploaded: string;
  mainImage: string;
  thumbnailImage: string;
  items: DripSpotItem[];
}

interface DripVisionVideo {
  id: string;
  title: string;
  brand: string;
  description: string;
  videoUrl: string;
  imageUrl?: string;
}


const STORY_BRANDS: StoryBrand[] = [
  {
    id: "tokyo-techwear",
    name: "Tokyo Techwear",
    logo: "TT",
    activeDropTitle: "Neon Resurgence Capsule",
    hours: 12,
    minutes: 45,
    seconds: 12,
    image: "/tokyo_techwear_collage.jpg",
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    description: "Our third limited technical drop. Crafted with cyber-reflective panels, waterproof tactical webbings, and asymmetric storage slots.",
    featuredProduct: "Reflective Cyber Shell V3",
    price: "₹18,999"
  },
  {
    id: "guerilla-culture",
    name: "Guerilla Culture",
    logo: "GC",
    activeDropTitle: "Vanguard Canvas Drop",
    hours: 36,
    minutes: 15,
    seconds: 0,
    image: "/guerilla_culture_hero.jpg",
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    description: "An anti-establishment raw fabric collection. Distressed custom canvas outerwear, heavyweight loopback knitwear, and utility drop bags.",
    featuredProduct: "Guerilla Vanguard Harness",
    price: "₹14,499"
  },
  {
    id: "outkast-lab",
    name: "Outkast Lab",
    logo: "OL",
    activeDropTitle: "Patchwork Denim Capsule",
    hours: 2,
    minutes: 19,
    seconds: 54,
    image: "/outkast_lab_hero.jpg",
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    description: "Experimental patchwork denim trousers, boxy graphic tees, and customized hardware details for street-level curation.",
    featuredProduct: "Outkast Patchwork Denim",
    price: "₹16,500"
  },
  {
    id: "vanguard-syndicate",
    name: "Vanguard Syndicate",
    logo: "VS",
    activeDropTitle: "Zenith Tech Shell",
    hours: 24,
    minutes: 0,
    seconds: 0,
    image: "/deal_day_new_collection.png",
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    description: "A high-performance shell engineered for severe weather survival, utilizing advanced seam taping and ergonomic articulations.",
    featuredProduct: "Zenith Shell Alpha",
    price: "₹22,000"
  },
  {
    id: "kuro-nomad",
    name: "Kuro Nomad",
    logo: "KN",
    activeDropTitle: "Stealth Cargo Pack",
    hours: 48,
    minutes: 30,
    seconds: 15,
    image: "/streetwear_campaign_models.png",
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    description: "Modular transport system crafted from ballistic nylon with Cobra buckles and magnetic modular attachments.",
    featuredProduct: "Nomad Modular Pack",
    price: "₹15,500"
  },
  {
    id: "aether-lab",
    name: "Aether Lab",
    logo: "AL",
    activeDropTitle: "Aerosol Windbreaker",
    hours: 8,
    minutes: 15,
    seconds: 0,
    image: "/deal_archive_outerwear.png",
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    description: "Ultralight windbreakers made of ripstop nylon with integrated packable pocket straps and DWR treatment.",
    featuredProduct: "Aether Windbreaker",
    price: "₹12,999"
  }
];

const SLIDE_DATA = STORY_BRANDS.map(brand => {
  const nameParts = brand.name.split(' ');
  const title = nameParts[0] || '';
  const title2 = nameParts.slice(1).join(' ') || '';
  return {
    id: brand.id,
    place: brand.activeDropTitle,
    title: title.toUpperCase(),
    title2: title2.toUpperCase(),
    description: brand.description,
    image: brand.image,
    price: brand.price
  };
});


const JOURNAL_ARTICLES: Article[] = [
  {
    id: "neoclassical-knit",
    category: "Guerilla Culture",
    date: "450 GSM Heavy Terry",
    title: "Neoclassical Knit Loopback Hoodie",
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=600&q=80",
    excerpt: "A custom-milled heavyweight box-fit loopback hoodie, inspired by classical draping and tailored for modern streetwear styling.",
    content: "Inspired by neoclassical sculpture drapery, this hoodie is engineered from a proprietary 450 GSM loopback French Terry cotton. It features dropped shoulder seams, structured hoods with no drawstrings for a minimal silhouette, and double-layered cuffs. Designed to hold a rigid boxy structure while providing dynamic, organic kinetic flows when in motion.",
    price: "₹8,999",
    brand: "Guerilla Culture"
  },
  {
    id: "vanguard-shell",
    category: "Tokyo Techwear",
    date: "3-Layer Weatherproof",
    title: "Vanguard Tactical Weather Shell",
    image: "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=600&q=80",
    excerpt: "A modular, weather-sealed utility shell featuring asymmetric pockets, quick-release cobra buckles, and high-vis reflective tapes.",
    content: "A premium technical performance shell jacket constructed from a highly breathable 3-layer laminated nylon membrane. Fitted with full weather-sealing seam tapes, waterproof zippers, dual modular checkout rigs, quick-release locking Cobra buckles, and hidden custom storage pods. Built to withstand dynamic urban microclimates.",
    price: "₹12,499",
    brand: "Tokyo Techwear"
  },
  {
    id: "outkast-cargos",
    category: "Outkast Lab",
    date: "12oz Double-Knee Canvas",
    title: "Heavy Double-Knee Utility Cargos",
    image: "https://images.unsplash.com/photo-1517423568366-8b83523034fd?auto=format&fit=crop&w=600&q=80",
    excerpt: "Double-knee utility pants equipped with 6-pocket cargo expansions, custom tactical hardware, and adjustable ankle cinch straps.",
    content: "Engineered from a heavyweight 12oz double-dyed cotton utility canvas, these cargo pants feature double-knee panelling for maximum durability. Includes an asymmetric utility belt layout, 6-pocket functional expanding compartments, custom-milled hardware locks, and adjustable ankle cinches to toggle between baggier or tapered styling fits.",
    price: "₹7,200",
    brand: "Outkast Lab"
  },
  {
    id: "cyber-canvas-vest",
    category: "Tokyo Techwear",
    date: "Multi-pocket Tactical",
    title: "Cybernetic Canvas Utility Vest",
    image: "https://images.unsplash.com/photo-1554568218-0f1715e72254?auto=format&fit=crop&w=600&q=80",
    excerpt: "A technical layered vest featuring multi-point harness adjustments and quick-release utility pockets.",
    content: "Engineered for high-intensity urban mobility, this techwear vest is crafted from high-density water-resistant nylon canvas. Equipped with three tactical chest pouch attachments and dual lateral modular harness hooks. Fits seamlessly over hoodies or base-layer tees.",
    price: "₹6,499",
    brand: "Tokyo Techwear"
  },
  {
    id: "selvedge-denim",
    category: "Guerilla Culture",
    date: "14oz Okayama Denim",
    title: "Raw Selvedge Stitched Trousers",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=600&q=80",
    excerpt: "14oz rigid Japanese indigo selvedge jeans featuring vintage copper rivets and contrast stitching.",
    content: "Woven on antique shuttle looms in Okayama, these selvedge jeans hold a rigid structured fit that fades organically with wear. Detailed with custom-engraved buttons and a reinforced saddle-stitch pattern. A true streetwear wardrobe essential.",
    price: "₹11,000",
    brand: "Guerilla Culture"
  },
  {
    id: "tactical-belt",
    category: "Outkast Lab",
    date: "Heavy Webbed Strap",
    title: "Cobra Lock Heavy Tactical Belt",
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=600&q=80",
    excerpt: "Heavy-duty webbed belt fitted with a premium metal Cobra quick-release safety buckle.",
    content: "Constructed from dual-layer high-tensile military nylon webbing, this belt is finished with a certified YKK Cobra buckle lock. Specially reinforced to withstand attachments like pouches or tool harnesses. Designed to fit all double-knee cargos.",
    price: "₹2,999",
    brand: "Outkast Lab"
  },
  {
    id: "mohair-cardigan",
    category: "Outkast Lab",
    date: "Oversized Wool Blend",
    title: "Distressed Raw Mohair Cardigan",
    image: "https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?auto=format&fit=crop&w=600&q=80",
    excerpt: "A loosely woven mohair cardigan featuring raw edge distressing and a relaxed retro drop-shoulder.",
    content: "Knitted from a premium mohair-wool blend, this cardigan undergoes a custom brush-distressing process to create a worn-in, vintage texture. Features natural horn buttons and relaxed oversized sleeves.",
    price: "₹9,499",
    brand: "Outkast Lab"
  },
  {
    id: "canvas-bomber",
    category: "Guerilla Culture",
    date: "Stonewashed 12oz Duck",
    title: "Raw Canvas Workwear Bomber Jacket",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80",
    excerpt: "Heavyweight stonewashed canvas work jacket with a quilted lining and solid metal zip.",
    content: "A rugged workwear bomber built from double-stitched cotton duck canvas. Features an adjustable corduroy collar, ribbed cuffs, and custom brass zipper. Finished with a heavy stonewashing treatment for an authentic aged look.",
    price: "₹12,999",
    brand: "Guerilla Culture"
  },
  {
    id: "retro-trainers",
    category: "Outkast Lab",
    date: "Full-Grain Leather",
    title: "Samba Retro Leather Trainers",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=80",
    excerpt: "Premium full-grain leather trainers with gum soles and contrast stitched brand panels.",
    content: "Recreated from 80s indoor soccer archives, these trainers feature a buttery full-grain white leather base, reinforced suede toe overlays, and a classic low-profile gum sole. Delivers maximum versatility for vintage street fits.",
    price: "₹7,999",
    brand: "Outkast Lab"
  },
  {
    id: "heavyweight-tee",
    category: "Tokyo Techwear",
    date: "300 GSM Organic Rib",
    title: "300 GSM Heavyweight Box Tee",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80",
    excerpt: "A clean box-cut tee crafted from dense organic cotton with double-stitched crew collars.",
    content: "Crafted from 100% combed organic cotton ringspun yarn, this tee is pre-shrunk and custom-dyed. Features an ultra-thick neck rib and a relaxed silhouette designed to hold its shape perfectly through washes.",
    price: "₹3,499",
    brand: "Tokyo Techwear"
  },
  {
    id: "cargo-shorts",
    category: "Tokyo Techwear",
    date: "Ripstop Quick-Dry",
    title: "Modular Nylon Tech Cargo Shorts",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=600&q=80",
    excerpt: "Water-resistant techwear shorts with detachable pocket bags and quick-access utility zippers.",
    content: "Constructed from quick-dry ripstop nylon with a Teflon coating. Features integrated webbed belts, two side cargo zipper pockets, and modular d-rings for keys or attachments. Perfect for warm-weather technical styling.",
    price: "₹5,499",
    brand: "Tokyo Techwear"
  },
  {
    id: "reflective-coat",
    category: "Tokyo Techwear",
    date: "Retroreflective Shell",
    title: "Reflective Cyber Neon Run Coat",
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=600&q=80",
    excerpt: "An active windbreaker coat featuring grid-patterned glass bead retroreflective prints.",
    content: "A high-visibility running coat that shines brilliantly under flashlight beams. Equipped with fully taped seams, dynamic rear ventilation flaps, and weather-sealed drawcord adjusters. Designed for night-time urban exploration.",
    price: "₹15,499",
    brand: "Tokyo Techwear"
  },
  {
    id: "indigo-jeans",
    category: "Outkast Lab",
    date: "Vintage Wash Sashiko",
    title: "Distressed Vintage Selvedge Jeans",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=600&q=80",
    excerpt: "12oz distressed washed selvedge denim jeans featuring hand-shredded knee patches.",
    content: "Individually distressed by hand, these raw indigo jeans feature paint splatter detailing and natural sashiko reinforcement stitches. Built to wear in beautifully and stand out in street culture.",
    price: "₹9,999",
    brand: "Outkast Lab"
  },
  {
    id: "loose-cargos",
    category: "Outkast Lab",
    date: "Military spec 8-pocket",
    title: "Oversized Ripstop Military Cargos",
    image: "https://images.unsplash.com/photo-1517423568366-8b83523034fd?auto=format&fit=crop&w=600&q=80",
    excerpt: "Loose baggier cut cargos with 8-pocket military slots and ankle cinch cords.",
    content: "Inspired by vintage military fatigue gear, these cargo pants are sewn from tough cotton-blend ripstop fabric. Fitted with expanding bellows pockets, knee pleats for articulation, and cinch ties at the hem to adjust block fits.",
    price: "₹6,999",
    brand: "Outkast Lab"
  },
  {
    id: "shoulder-pouch",
    category: "Guerilla Culture",
    date: "Cordura Water-Resist",
    title: "Tactical Ripstop Sling Belt Bag",
    image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=600&q=80",
    excerpt: "A weather-sealed nylon canvas sling bag with key loops and phone compartments.",
    content: "A lightweight utility bag designed to keep essentials secure and accessible. Crafted from tear-resistant Cordura canvas, equipped with YKK Aquaguard zips, and an adjustable quick-release cross-body harness strap.",
    price: "₹4,200",
    brand: "Guerilla Culture"
  }
];

const DRIPSPOT_FITS: DripSpotFit[] = [
  {
    id: "arjun-sen",
    celebrityName: "Urban Hoodie Fit",
    dateUploaded: "Aug 04, 2026",
    mainImage: "/dripspot_main_celebrity.png",
    thumbnailImage: "/dripspot_main_celebrity.png",
    items: [
      {
        name: "Urban Motion Graphic Hoodie",
        brand: "Tokyo Techwear",
        price: "₹8,999",
        numericPrice: 8999,
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80",
        xPercent: 47,
        yPercent: 31,
        similarProducts: [
          {
            name: "Classic Box Hoodie",
            brand: "Guerilla Culture",
            price: "₹7,200",
            image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=150&q=80"
          },
          {
            name: "Premium Loopback Hoodie",
            brand: "Outkast Lab",
            price: "₹9,500",
            image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=150&q=80"
          },
          {
            name: "Distressed Knit Hoodie",
            brand: "Guerilla Culture",
            price: "₹6,805",
            image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=150&q=80"
          },
          {
            name: "Cyber Punk Hoodie",
            brand: "Tokyo Techwear",
            price: "₹11,200",
            image: "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=150&q=80"
          }
        ]
      },
      {
        name: "Tactical Shoulder Pouch",
        brand: "Guerilla Culture",
        price: "₹4,499",
        numericPrice: 4499,
        image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=800&q=80",
        xPercent: 55,
        yPercent: 48,
        similarProducts: [
          {
            name: "Utility Sling Pack",
            brand: "Tokyo Techwear",
            price: "₹3,900",
            image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80"
          },
          {
            name: "Cobra Harness Pack",
            brand: "Outkast Lab",
            price: "₹5,400",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80"
          },
          {
            name: "Messenger Sling Bag",
            brand: "Tokyo Techwear",
            price: "₹4,800",
            image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80"
          },
          {
            name: "Urban Crossbody Bag",
            brand: "Guerilla Culture",
            price: "₹3,200",
            image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80"
          }
        ]
      },
      {
        name: "Khaki Utility Cargo Trousers",
        brand: "Outkast Lab",
        price: "₹6,500",
        numericPrice: 6500,
        image: "https://images.unsplash.com/photo-1517423568366-8b83523034fd?auto=format&fit=crop&w=800&q=80",
        xPercent: 42,
        yPercent: 75,
        similarProducts: [
          {
            name: "Vanguard Tech Cargo",
            brand: "Tokyo Techwear",
            price: "₹9,800",
            image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80"
          },
          {
            name: "Draped Utility Pants",
            brand: "Guerilla Culture",
            price: "₹7,999",
            image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=150&q=80"
          },
          {
            name: "Loose Fitted Cargo",
            brand: "Outkast Lab",
            price: "₹6,400",
            image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80"
          },
          {
            name: "Heavy Canvas Trouser",
            brand: "Guerilla Culture",
            price: "₹8,200",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
          }
        ]
      }
    ]
  },
  {
    id: "kavya-rao",
    celebrityName: "Distressed Knit Fit",
    dateUploaded: "Jul 28, 2026",
    mainImage: "/distressed_knit_fit.jpg",
    thumbnailImage: "/distressed_knit_fit.jpg",
    items: [
      {
        name: "Distressed Knit Sweater",
        brand: "Guerilla Culture",
        price: "₹6,499",
        numericPrice: 6499,
        image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80",
        xPercent: 50,
        yPercent: 35,
        similarProducts: [
          {
            name: "Classic Knit Jumper",
            brand: "Guerilla Culture",
            price: "₹5,200",
            image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=150&q=80"
          },
          {
            name: "Raw Mohair Sweater",
            brand: "Outkast Lab",
            price: "₹8,900",
            image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=150&q=80"
          },
          {
            name: "Textured Heavy Sweater",
            brand: "Guerilla Culture",
            price: "₹7,400",
            image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80"
          },
          {
            name: "Distressed Cardigan",
            brand: "Outkast Lab",
            price: "₹9,200",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
          }
        ]
      },
      {
        name: "Boxy Print Tee",
        brand: "Outkast Lab",
        price: "₹2,999",
        numericPrice: 2999,
        image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
        xPercent: 55,
        yPercent: 52,
        similarProducts: [
          {
            name: "Oversized Heavy Tee",
            brand: "Outkast Lab",
            price: "₹3,400",
            image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=150&q=80"
          },
          {
            name: "Graphic Street Tee",
            brand: "Tokyo Techwear",
            price: "₹2,800",
            image: "https://images.unsplash.com/photo-1547447134-cd3f5c716030?auto=format&fit=crop&w=150&q=80"
          },
          {
            name: "Retro Graphic Tee",
            brand: "Outkast Lab",
            price: "₹3,100",
            image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=150&q=80"
          },
          {
            name: "Heavyweight Box Tee",
            brand: "Tokyo Techwear",
            price: "₹3,500",
            image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80"
          }
        ]
      },
      {
        name: "Raw Denim Trousers",
        brand: "Tokyo Techwear",
        price: "₹8,999",
        numericPrice: 8999,
        image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80",
        xPercent: 45,
        yPercent: 80,
        similarProducts: [
          {
            name: "Japanese Selvedge Denim",
            brand: "Tokyo Techwear",
            price: "₹12,500",
            image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=150&q=80"
          },
          {
            name: "Baggy Cargo Denim",
            brand: "Guerilla Culture",
            price: "₹9,200",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
          },
          {
            name: "Washed Raw Trousers",
            brand: "Tokyo Techwear",
            price: "₹7,999",
            image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80"
          },
          {
            name: "Utility Indigo Jeans",
            brand: "Outkast Lab",
            price: "₹10,500",
            image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80"
          }
        ]
      }
    ]
  },
  {
    id: "kabir-mehta",
    celebrityName: "Windbreaker Tech Fit",
    dateUploaded: "Jul 19, 2026",
    mainImage: "/windbreaker_tech_fit.jpg",
    thumbnailImage: "/windbreaker_tech_fit.jpg",
    items: [
      {
        name: "Windbreaker Tech Shell",
        brand: "Tokyo Techwear",
        price: "₹11,999",
        numericPrice: 11999,
        image: "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=800&q=80",
        xPercent: 46,
        yPercent: 28,
        similarProducts: [
          {
            name: "Reflective Run Coat",
            brand: "Tokyo Techwear",
            price: "₹14,500",
            image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=150&q=80"
          },
          {
            name: "Urban Rain Anorak",
            brand: "Guerilla Culture",
            price: "₹10,999",
            image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=150&q=80"
          },
          {
            name: "Cyber Sport Windbreaker",
            brand: "Tokyo Techwear",
            price: "₹11,200",
            image: "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=150&q=80"
          },
          {
            name: "Raw Canvas Anorak",
            brand: "Guerilla Culture",
            price: "₹12,400",
            image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=150&q=80"
          }
        ]
      },
      {
        name: "Heavy Loopback Jogger",
        brand: "Guerilla Culture",
        price: "₹5,499",
        numericPrice: 5499,
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
        xPercent: 54,
        yPercent: 55,
        similarProducts: [
          {
            name: "Tactical Fleece Pants",
            brand: "Guerilla Culture",
            price: "₹6,800",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
          },
          {
            name: "Milled Heavy Sweatpant",
            brand: "Outkast Lab",
            price: "₹4,999",
            image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=150&q=80"
          },
          {
            name: "Casual Street Fleece",
            brand: "Guerilla Culture",
            price: "₹5,100",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80"
          },
          {
            name: "Tokyo Utility Joggers",
            brand: "Tokyo Techwear",
            price: "₹6,900",
            image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80"
          }
        ]
      },
      {
        name: "Retro High-Top Sneaker",
        brand: "Outkast Lab",
        price: "₹9,999",
        numericPrice: 9999,
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80",
        xPercent: 48,
        yPercent: 85,
        similarProducts: [
          {
            name: "Mid-Top Classic Trainer",
            brand: "Outkast Lab",
            price: "₹8,499",
            image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
          },
          {
            name: "Tactical Runner Boot",
            brand: "Tokyo Techwear",
            price: "₹15,000",
            image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80"
          },
          {
            name: "Street High Trainer",
            brand: "Outkast Lab",
            price: "₹9,200",
            image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80"
          },
          {
            name: "Urban Low Top Shoes",
            brand: "Guerilla Culture",
            price: "₹7,800",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80"
          }
        ]
      }
    ]
  },
  {
    id: "rohan-das",
    celebrityName: "Pigment Wash Fit",
    dateUploaded: "Jun 30, 2026",
    mainImage: "/pigment_wash_fit.jpg",
    thumbnailImage: "/pigment_wash_fit.jpg",
    items: [
      {
        name: "Pigment Wash Tee",
        brand: "Outkast Lab",
        price: "₹3,200",
        numericPrice: 3200,
        image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80",
        xPercent: 52,
        yPercent: 32,
        similarProducts: [
          {
            name: "Heavy Boxy Crew",
            brand: "Outkast Lab",
            price: "₹2,800",
            image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80"
          },
          {
            name: "Acid Wash Street Tee",
            brand: "Guerilla Culture",
            price: "₹3,500",
            image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=150&q=80"
          },
          {
            name: "Washed Vintage Tee",
            brand: "Outkast Lab",
            price: "₹2,990",
            image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=150&q=80"
          },
          {
            name: "Oversized Slate Tee",
            brand: "Tokyo Techwear",
            price: "₹3,400",
            image: "https://images.unsplash.com/photo-1547447134-cd3f5c716030?auto=format&fit=crop&w=150&q=80"
          }
        ]
      },
      {
        name: "Multi-pocket Harness",
        brand: "Guerilla Culture",
        price: "₹6,500",
        numericPrice: 6500,
        image: "https://images.unsplash.com/photo-1489980508314-941910ded1f4?auto=format&fit=crop&w=800&q=80",
        xPercent: 48,
        yPercent: 50,
        similarProducts: [
          {
            name: "Utility Chest Bag",
            brand: "Guerilla Culture",
            price: "₹5,200",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80"
          },
          {
            name: "Modular Cargo Belt",
            brand: "Tokyo Techwear",
            price: "₹4,800",
            image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80"
          },
          {
            name: "Tactical Modular Harness",
            brand: "Guerilla Culture",
            price: "₹7,200",
            image: "https://images.unsplash.com/photo-1489980508314-941910ded1f4?auto=format&fit=crop&w=800&q=80"
          },
          {
            name: "Utility Chest Harness",
            brand: "Outkast Lab",
            price: "₹5,900",
            image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80"
          }
        ]
      },
      {
        name: "Waterproof Cargo Pants",
        brand: "Tokyo Techwear",
        price: "₹9,800",
        numericPrice: 9800,
        image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=800&q=80",
        xPercent: 50,
        yPercent: 78,
        similarProducts: [
          {
            name: "Reflective Track Trouser",
            brand: "Tokyo Techwear",
            price: "₹8,900",
            image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80"
          },
          {
            name: "Heavy Canvas Cargo",
            brand: "Guerilla Culture",
            price: "₹11,500",
            image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80"
          },
          {
            name: "Urban Zip Trousers",
            brand: "Tokyo Techwear",
            price: "₹9,200",
            image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80"
          },
          {
            name: "Tapered Cotton Cargo",
            brand: "Outkast Lab",
            price: "₹7,500",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
          }
        ]
      }
    ]
  }
];

const DRIPVISION_VIDEOS: DripVisionVideo[] = [
  {
    id: "v1",
    title: "AESTHETE Runway Presentation",
    brand: "Guerilla Culture",
    description: "Behind the scenes look at the raw fabric collection presentation.",
    videoUrl: "https://youtu.be/V98XW6qisO0",
    imageUrl: "https://img.youtube.com/vi/V98XW6qisO0/hqdefault.jpg"
  },
  {
    id: "v2",
    title: "Cyber Nomad Streetwalk",
    brand: "Tokyo Techwear",
    description: "Dynamic fit test featuring technical waterproof shells in metropolitan environments.",
    videoUrl: "https://www.youtube.com/watch?v=1R9_6hQmwR0",
    imageUrl: "https://img.youtube.com/vi/1R9_6hQmwR0/hqdefault.jpg"
  },
  {
    id: "v3",
    title: "Outkast Skater Curation",
    brand: "Outkast Lab",
    description: "Testing raw patchwork denim durability across urban street structures.",
    videoUrl: "https://www.youtube.com/watch?v=9N3h209gyoY",
    imageUrl: "https://img.youtube.com/vi/9N3h209gyoY/hqdefault.jpg"
  },
  {
    id: "v4",
    title: "Tailored Overcoat Showcase",
    brand: "Guerilla Culture",
    description: "Double-breasted heavyweight wool draping and tailoring detail inspection.",
    videoUrl: "https://youtu.be/YcF4lJ-jT1k",
    imageUrl: "https://img.youtube.com/vi/YcF4lJ-jT1k/hqdefault.jpg"
  },
  {
    id: "v5",
    title: "Vanguard Lights Catwalk",
    brand: "Tokyo Techwear",
    description: "High-contrast technical silhouettes lit by neon graphic backdrops.",
    videoUrl: "https://www.youtube.com/watch?v=sQK4_SIJ0k8",
    imageUrl: "https://img.youtube.com/vi/sQK4_SIJ0k8/hqdefault.jpg"
  },
  {
    id: "v6",
    title: "Noir Technical Presentation",
    brand: "Outkast Lab",
    description: "DripSpot exclusive coverage of the midnight runway designer showcase.",
    videoUrl: "https://www.youtube.com/watch?v=EKZcwfMDCiQ",
    imageUrl: "https://img.youtube.com/vi/EKZcwfMDCiQ/hqdefault.jpg"
  }
];

function getYoutubeEmbedUrl(url: string) {
  let videoId = "";
  if (url.includes("youtu.be/")) {
    videoId = url.split("youtu.be/")[1]?.split(/[?#]/)[0] || "";
  } else if (url.includes("youtube.com/watch")) {
    videoId = url.split("v=")[1]?.split(/[&?#]/)[0] || "";
  } else if (url.includes("youtube.com/embed/")) {
    videoId = url.split("embed/")[1]?.split(/[?#]/)[0] || "";
  }
  
  if (videoId) {
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=1&rel=0`;
  }
  return null;
}

export default function AboutPage() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const sec1 = useScrollAnimation();
  const sec2 = useScrollAnimation();
  const sec3 = useScrollAnimation();
  const sec4 = useScrollAnimation();
  const sec5 = useScrollAnimation();
  const sec6 = useScrollAnimation();
  const sec7 = useScrollAnimation();
  const [isMounted, setIsMounted] = useState(false);
  const [scrollYOffset, setScrollYOffset] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isFeaturedLookAdded, setIsFeaturedLookAdded] = useState(false);
  const [activeStorySection, setActiveStorySection] = useState(1);
  const [supportsScrollDriven, setSupportsScrollDriven] = useState(true);

  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % 4);
    }, 6000); // 6 seconds autoplay
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setIsMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate normalized coordinates (-1 to 1) relative to center of screen
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x, y });
    };
    const handleScroll = () => {
      setScrollYOffset(window.scrollY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Detect CSS Scroll-driven animations support
    const supports = typeof CSS !== "undefined" && CSS.supports && CSS.supports("animation-timeline", "scroll()");
    setSupportsScrollDriven(supports);

    let observer: IntersectionObserver | null = null;
    if (!supports) {
      const observerOptions = {
        root: null,
        rootMargin: "-25% 0px -45% 0px",
        threshold: 0.1,
      };

      const observerCallback = (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target.id === "StoriesUnveiled") {
              setActiveStorySection(1);
            } else if (entry.target.id === "CelebratingLifeTogether") {
              setActiveStorySection(2);
            } else if (entry.target.id === "TheArtofGiving") {
              setActiveStorySection(3);
            }
          }
        });
      };

      observer = new IntersectionObserver(observerCallback, observerOptions);
      setTimeout(() => {
        const targets = [
          document.getElementById("StoriesUnveiled"),
          document.getElementById("CelebratingLifeTogether"),
          document.getElementById("TheArtofGiving"),
        ];
        targets.forEach((target) => {
          if (target && observer) observer.observe(target);
        });
      }, 500); // Small timeout to ensure elements are in DOM
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      if (observer) observer.disconnect();
    };
  }, []);


  const [timers, setTimers] = useState<Record<string, { h: number; m: number; s: number }>>({});
  const sliderRef = React.useRef<HTMLDivElement>(null);
  const [activeSlideBrandId, setActiveSlideBrandId] = useState("");
  const activeSlideTime = timers[activeSlideBrandId] || { h: 0, m: 0, s: 0 };
  const activeSlidePrice = SLIDE_DATA.find(s => s.id === activeSlideBrandId)?.price || "";

  const [bookmarkedBrands, setBookmarkedBrands] = useState<Record<string, boolean>>({});
  const toggleBookmark = (brandId: string) => {
    setBookmarkedBrands(prev => ({
      ...prev,
      [brandId]: !prev[brandId]
    }));
  };

  useEffect(() => {
    let ctx: any;
    
    import("gsap").then(({ gsap }) => {
      if (!sliderRef.current) return;

      ctx = gsap.context(() => {
        let order = [0, 1, 2, 3, 4, 5];
        let detailsEven = true;
        let isTransitioning = false;

        const isMobile = window.innerWidth < 768;
        const cardWidth = isMobile ? 90 : 140;
        const cardHeight = isMobile ? 120 : 140;
        const gap = isMobile ? 12 : 20;
        const numberSize = isMobile ? 36 : 50;
        const ease = "sine.inOut";

        // Calculate offsets relative to parent container
        const containerWidth = sliderRef.current ? sliderRef.current.offsetWidth : 1200;
        const containerHeight = sliderRef.current ? sliderRef.current.offsetHeight : 450;
        const offsetTop = containerHeight - (isMobile ? 140 : 170);
        const offsetLeft = containerWidth - (isMobile ? 220 : 480);

        function getCard(index: number) {
          return `#card${index}`;
        }
        function getCardContent(index: number) {
          return `#card-content-${index}`;
        }
        function getSliderItem(index: number) {
          return `#slide-item-${index}`;
        }

        const active = order[0];
        const rest = order.slice(1);
        const detailsActive = "#details-even";
        const detailsInactive = "#details-odd";

        const paginationLeft = isMobile ? 20 : 60;
        const paginationTop = containerHeight - (isMobile ? 65 : 70);

        gsap.set("#pagination", {
          top: paginationTop,
          left: paginationLeft,
          y: 60,
          opacity: 0,
          zIndex: 40,
        });

        gsap.set(getCard(active), {
          x: 0,
          y: 0,
          width: containerWidth,
          height: containerHeight,
          borderRadius: 0,
          zIndex: 20,
        });
        gsap.set(getCardContent(active), { x: 0, y: 0, opacity: 0 });
        gsap.set(detailsActive, { opacity: 0, zIndex: 22, x: -200 });
        gsap.set(detailsInactive, { opacity: 0, zIndex: 12 });
        gsap.set(`${detailsInactive} .text`, { y: 100 });
        gsap.set(`${detailsInactive} .title-1`, { y: 100 });
        gsap.set(`${detailsInactive} .title-2`, { y: 100 });
        gsap.set(`${detailsInactive} .desc`, { y: 50 });
        gsap.set(`${detailsInactive} .cta`, { y: 60 });

        // Set initial text values
        const activeItem = SLIDE_DATA[active];
        const textPlace = document.querySelector(`${detailsActive} .place-box .text`);
        const textT1 = document.querySelector(`${detailsActive} .title-1`);
        const textT2 = document.querySelector(`${detailsActive} .title-2`);
        const textDesc = document.querySelector(`${detailsActive} .desc`);
        if (textPlace) textPlace.textContent = activeItem.place;
        if (textT1) textT1.textContent = activeItem.title;
        if (textT2) textT2.textContent = activeItem.title2;
        if (textDesc) textDesc.textContent = activeItem.description;
        setActiveSlideBrandId(activeItem.id);

        gsap.set(".progress-sub-foreground", {
          width: 250 * (1 / order.length) * (active + 1),
        });

        rest.forEach((i, index) => {
          gsap.set(getCard(i), {
            x: offsetLeft + 400 + index * (cardWidth + gap),
            y: offsetTop,
            width: cardWidth,
            height: cardHeight,
            zIndex: 30,
            borderRadius: 28,
          });
          gsap.set(getCardContent(i), {
            x: offsetLeft + 400 + index * (cardWidth + gap),
            zIndex: 40,
            y: offsetTop + cardHeight - 105,
            opacity: 1,
          });
          gsap.set(getSliderItem(i), { x: (index + 1) * numberSize });
        });

        gsap.set(".indicator", { x: -containerWidth });

        // Intro animation
        const startDelay = 0.6;
        gsap.to(".cover", {
          x: containerWidth + 400,
          delay: 0.5,
          ease,
          onComplete: () => {
            startLoop();
          },
        });

        rest.forEach((i, index) => {
          gsap.to(getCard(i), {
            x: offsetLeft + index * (cardWidth + gap),
            zIndex: 30,
            ease,
            delay: startDelay + 0.05 * index,
          });
          gsap.to(getCardContent(i), {
            x: offsetLeft + index * (cardWidth + gap),
            zIndex: 40,
            ease,
            delay: startDelay + 0.05 * index,
          });
        });

        gsap.to("#pagination", { y: 0, opacity: 1, ease, delay: startDelay });
        gsap.to(detailsActive, { opacity: 1, x: 0, ease, delay: startDelay });

        function step(isNext = true) {
          if (isTransitioning) return Promise.resolve();
          isTransitioning = true;

          return new Promise<void>((resolve) => {
            const oldActive = order[0];

            if (isNext) {
              order.push(order.shift() as number);
            } else {
              order.unshift(order.pop() as number);
            }
            detailsEven = !detailsEven;

            const nextActive = order[0];
            const detailsActive = detailsEven ? "#details-even" : "#details-odd";
            const detailsInactive = detailsEven ? "#details-odd" : "#details-even";

            const slideItem = SLIDE_DATA[nextActive];
            const textPlace = document.querySelector(`${detailsActive} .place-box .text`);
            const textT1 = document.querySelector(`${detailsActive} .title-1`);
            const textT2 = document.querySelector(`${detailsActive} .title-2`);
            const textDesc = document.querySelector(`${detailsActive} .desc`);
            if (textPlace) textPlace.textContent = slideItem.place;
            if (textT1) textT1.textContent = slideItem.title;
            if (textT2) textT2.textContent = slideItem.title2;
            if (textDesc) textDesc.textContent = slideItem.description;
            setActiveSlideBrandId(slideItem.id);

            gsap.set(detailsActive, { zIndex: 22 });
            gsap.to(detailsActive, { opacity: 1, delay: 0.4, ease });
            gsap.to(`${detailsActive} .text`, { y: 0, delay: 0.1, duration: 0.7, ease });
            gsap.to(`${detailsActive} .title-1`, { y: 0, delay: 0.15, duration: 0.7, ease });
            gsap.to(`${detailsActive} .title-2`, { y: 0, delay: 0.15, duration: 0.7, ease });
            gsap.to(`${detailsActive} .desc`, { y: 0, delay: 0.3, duration: 0.4, ease });
            gsap.to(`${detailsActive} .cta`, {
              y: 0,
              delay: 0.35,
              duration: 0.4,
              ease,
              onComplete: () => {
                isTransitioning = false;
                resolve();
              }
            });
            
            gsap.set(detailsInactive, { zIndex: 12 });

            const [active, ...rest] = order;

            if (isNext) {
              const prv = oldActive;

              gsap.set(getCard(prv), { zIndex: 10 });
              gsap.set(getCard(active), { zIndex: 20 });
              gsap.to(getCard(prv), { scale: 1.5, ease });

              gsap.to(getCardContent(active), {
                y: offsetTop + cardHeight - 10,
                opacity: 0,
                duration: 0.3,
                ease,
              });
              gsap.to(getSliderItem(active), { x: 0, ease });
              gsap.to(getSliderItem(prv), { x: -numberSize, ease });
              gsap.to(".progress-sub-foreground", {
                width: 250 * (1 / order.length) * (active + 1),
                ease,
              });

              gsap.to(getCard(active), {
                x: 0,
                y: 0,
                ease,
                width: containerWidth,
                height: containerHeight,
                borderRadius: 0,
                onComplete: () => {
                  const xNew = offsetLeft + (rest.length - 1) * (cardWidth + gap);
                  gsap.set(getCard(prv), {
                    x: xNew,
                    y: offsetTop,
                    width: cardWidth,
                    height: cardHeight,
                    zIndex: 30,
                    borderRadius: 20,
                    scale: 1,
                  });

                  gsap.set(getCardContent(prv), {
                    x: xNew,
                    y: offsetTop + cardHeight - 105,
                    opacity: 1,
                    zIndex: 40,
                  });
                  gsap.set(getSliderItem(prv), { x: rest.length * numberSize });

                  gsap.set(detailsInactive, { opacity: 0 });
                  gsap.set(`${detailsInactive} .text`, { y: 100 });
                  gsap.set(`${detailsInactive} .title-1`, { y: 100 });
                  gsap.set(`${detailsInactive} .title-2`, { y: 100 });
                  gsap.set(`${detailsInactive} .desc`, { y: 50 });
                  gsap.set(`${detailsInactive} .cta`, { y: 60 });
                },
              });

              rest.forEach((i, index) => {
                if (i !== prv) {
                  const xNew = offsetLeft + index * (cardWidth + gap);
                  gsap.set(getCard(i), { zIndex: 30 });
                  gsap.to(getCard(i), {
                    x: xNew,
                    y: offsetTop,
                    width: cardWidth,
                    height: cardHeight,
                    ease,
                    delay: 0.1 * (index + 1),
                  });

                  gsap.to(getCardContent(i), {
                    x: xNew,
                    y: offsetTop + cardHeight - 105,
                    opacity: 1,
                    zIndex: 40,
                    ease,
                    delay: 0.1 * (index + 1),
                  });
                  gsap.to(getSliderItem(i), { x: (index + 1) * numberSize, ease });
                }
              });
            } else {
              // Backward Transition (isNext === false)
              const prv = oldActive; // previous active (which is now order[1] / rest[0])

              gsap.set(getCard(prv), { zIndex: 20 });
              gsap.set(getCard(active), { zIndex: 10 });
              
              gsap.to(getCardContent(active), {
                y: offsetTop + cardHeight - 10,
                opacity: 0,
                duration: 0.3,
                ease,
              });

              // Slide numbers
              gsap.set(getSliderItem(active), { x: -numberSize });
              gsap.to(getSliderItem(active), { x: 0, ease });
              
              gsap.to(".progress-sub-foreground", {
                width: 250 * (1 / order.length) * (active + 1),
                ease,
              });

              // Animate old full screen card (prv) down to the first slot of preview
              gsap.to(getCard(prv), {
                x: offsetLeft,
                y: offsetTop,
                width: cardWidth,
                height: cardHeight,
                borderRadius: 20,
                ease,
                onComplete: () => {
                  gsap.set(getCardContent(prv), {
                    x: offsetLeft,
                    y: offsetTop + cardHeight - 105,
                    opacity: 1,
                    zIndex: 40,
                  });

                  gsap.set(detailsInactive, { opacity: 0 });
                  gsap.set(`${detailsInactive} .text`, { y: 100 });
                  gsap.set(`${detailsInactive} .title-1`, { y: 100 });
                  gsap.set(`${detailsInactive} .title-2`, { y: 100 });
                  gsap.set(`${detailsInactive} .desc`, { y: 50 });
                  gsap.set(`${detailsInactive} .cta`, { y: 60 });
                }
              });

              // Zoom new active card up to full screen
              gsap.to(getCard(active), {
                x: 0,
                y: 0,
                width: containerWidth,
                height: containerHeight,
                borderRadius: 0,
                ease,
              });

              // Shift remaining cards to their slots (from index 1 to end)
              rest.forEach((i, index) => {
                const xNew = offsetLeft + index * (cardWidth + gap);
                gsap.set(getCard(i), { zIndex: 30 });
                gsap.to(getCard(i), {
                  x: xNew,
                  y: offsetTop,
                  width: cardWidth,
                  height: cardHeight,
                  ease,
                  delay: 0.05 * index,
                });

                if (i !== prv) {
                  gsap.to(getCardContent(i), {
                    x: xNew,
                    y: offsetTop + cardHeight - 105,
                    opacity: 1,
                    zIndex: 40,
                    ease,
                    delay: 0.05 * index,
                  });
                }
                gsap.to(getSliderItem(i), { x: (index + 1) * numberSize, ease });
              });
            }
          });
        }

        let loopTween: gsap.core.Timeline | null = null;

        function startLoop() {
          loopTween = gsap.timeline({
            onComplete: () => {
              step(true).then(() => {
                startLoop();
              });
            }
          });

          loopTween.to(".indicator", {
            x: 0,
            duration: 4,
            ease: "none",
          });
          loopTween.to(".indicator", {
            x: containerWidth,
            duration: 0.8,
            ease,
            delay: 0.3,
            onComplete: () => {
              gsap.set(".indicator", { x: -containerWidth });
            }
          });
        }

        // Arrow handlers
        const arrowNext = document.querySelector("#pagination .arrow-right");
        const arrowPrev = document.querySelector("#pagination .arrow-left");

        const handleNextClick = () => {
          if (loopTween) {
            loopTween.kill();
            gsap.set(".indicator", { x: -containerWidth });
          }
          step(true).then(() => {
            startLoop();
          });
        };

        const handlePrevClick = () => {
          if (loopTween) {
            loopTween.kill();
            gsap.set(".indicator", { x: -containerWidth });
          }
          step(false).then(() => {
            startLoop();
          });
        };

        if (arrowNext) arrowNext.addEventListener("click", handleNextClick);
        if (arrowPrev) arrowPrev.addEventListener("click", handlePrevClick);

        // Discover button handlers
        const handleDiscoverClick = () => {
          const activeItem = SLIDE_DATA[order[0]];
          const brandName = (activeItem.title + " " + activeItem.title2).trim();
          window.location.href = `/shop?brand=${encodeURIComponent(brandName)}`;
        };
        const discoverEven = document.querySelector("#details-even .discover");
        const discoverOdd = document.querySelector("#details-odd .discover");
        if (discoverEven) discoverEven.addEventListener("click", handleDiscoverClick);
        if (discoverOdd) discoverOdd.addEventListener("click", handleDiscoverClick);

      }, sliderRef.current);
    });

    return () => {
      if (ctx) ctx.revert();
    };
  }, []);


  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [readMoreMain, setReadMoreMain] = useState(false);
  const { ref: sectionRef, isVisible } = useScrollAnimation();
  const { ref: capsuleRef, isVisible: isCapsuleVisible } = useScrollAnimation();
  const [sortBy, setSortBy] = useState("Default");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const displayedArticles = useMemo(() => {
    const startIndex = (currentPage - 1) * 3;
    return JOURNAL_ARTICLES.slice(startIndex, startIndex + 3);
  }, [currentPage]);

  // Stories states
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  
  const [storyVideoErrors, setStoryVideoErrors] = useState<Record<string, boolean>>({});

  // Initialize countdown timers
  useEffect(() => {
    const initialTimers: Record<string, { h: number; m: number; s: number }> = {};
    STORY_BRANDS.forEach((brand) => {
      initialTimers[brand.id] = { h: brand.hours, m: brand.minutes, s: brand.seconds };
    });
    setTimers(initialTimers);
  }, []);

  // Tick countdown timers
  useEffect(() => {
    const interval = setInterval(() => {
      setTimers((prev) => {
        const next = { ...prev };
        let updated = false;
        Object.keys(next).forEach((key) => {
          let { h, m, s } = next[key] || { h: 0, m: 0, s: 0 };
          if (h > 0 || m > 0 || s > 0) {
            updated = true;
            if (s > 0) {
              s--;
            } else if (m > 0) {
              m--;
              s = 59;
            } else if (h > 0) {
              h--;
              m = 59;
              s = 59;
            }
            next[key] = { h, m, s };
          }
        });
        return updated ? next : prev;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timers]);

  const activeStory = STORY_BRANDS[activeStoryIndex];
  const activeTime = timers[activeStory?.id] || { h: 0, m: 0, s: 0 };

  // DripSpot states
  const [activeFitIndex, setActiveFitIndex] = useState(0);
  const [hoveredItemIndex, setHoveredItemIndex] = useState<number | null>(null);
  const [detailItemIndex, setDetailItemIndex] = useState<number | null>(null); // Index of selected item for detail view
  const [exploreViewMore, setExploreViewMore] = useState(false);

  // DripVision states
  const [activeVideo, setActiveVideo] = useState(DRIPVISION_VIDEOS[0]);



  // Redesigned Newsletter states
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [subscriberEmail, setSubscriberEmail] = useState("");
  
  // Section 1 interactive tab state
  const [activeTab, setActiveTab] = useState(0);

  // Video error states to gracefully catch unsupported sources
  const [visionVideoErrors, setVisionVideoErrors] = useState<Record<string, boolean>>({});

  // Direct add to bag inline feedback states (no side drawer)
  const [addedItemsMap, setAddedItemsMap] = useState<Record<string, boolean>>({});
  const [addedEntireLook, setAddedEntireLook] = useState<boolean>(false);

  const { toggleWishlist: globalToggleWishlist, isInWishlist, addToCart } = useCart();

  const activeFit = DRIPSPOT_FITS[activeFitIndex];

  const formatNum = (num: number) => num.toString().padStart(2, "0");

  const formatNumWithCommas = (num: number) => num.toLocaleString("en-IN");

  const handleNextDetailItem = () => {
    if (detailItemIndex !== null) {
      setDetailItemIndex((detailItemIndex + 1) % activeFit.items.length);
    }
  };

  const handlePrevDetailItem = () => {
    if (detailItemIndex !== null) {
      setDetailItemIndex((detailItemIndex - 1 + activeFit.items.length) % activeFit.items.length);
    }
  };

  // Determine similar products to display based on exploreViewMore state
  const getDisplayedSimilar = () => {
    if (detailItemIndex === null) return [];
    const item = activeFit.items[detailItemIndex];
    if (!item.similarProducts) return [];
    return exploreViewMore ? item.similarProducts : item.similarProducts.slice(0, 2);
  };

  const scrollVision = (direction: "left" | "right") => {
    const el = document.getElementById("vision-scroll-container");
    if (el) {
      const amount = 320; // Approx thumbnail width + gap
      el.scrollBy({
        left: direction === "left" ? -amount : amount,
        behavior: "smooth"
      });
    }
  };



  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (subscriberEmail.trim()) {
      setNewsletterSubscribed(true);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#faf8f5] dark:bg-[#0a0a0c] text-zinc-900 dark:text-white font-sans antialiased overflow-x-hidden select-none transition-colors duration-300">
      {/* Navbar & Search */}
      <Navbar onSearchClick={() => setIsSearchOpen(true)} />

      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

        <section className="about-hero-container relative w-full min-h-[55vh] md:min-h-[70vh] flex flex-col items-start justify-center text-left overflow-hidden bg-zinc-950 text-white select-none border-b border-zinc-200/30 dark:border-zinc-800/80">
        {/* Slide 1: Nike Men's Footwear Campaign */}
        <div 
          className={`absolute inset-0 w-full h-full overflow-hidden transition-opacity duration-1000 ease-in-out ${
            activeSlide === 0 ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
          }`}
        >
          {/* Background Zoom Image (Ken Burns) */}
          <img
            src="/about_hero_banner.jpg"
            alt="Mens Footwear"
            className={`w-full h-full object-cover object-[80%_center] md:object-center select-none pointer-events-none transition-transform duration-[6000ms] ease-out ${
              activeSlide === 0 ? "scale-[1.04]" : "scale-100"
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-900/10 via-transparent to-transparent z-10" />

          {/* Left Text Overlay */}
          <div 
            className={`absolute inset-y-0 left-0 right-0 w-full px-5 sm:px-12 md:px-16 lg:px-20 flex flex-col justify-center items-start z-20 text-left transition-all duration-1000 delay-300 ${
              activeSlide === 0 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <h1 className="text-stone-900 font-sans font-black uppercase leading-[0.85] tracking-tighter text-4xl sm:text-[6vw] lg:text-[5.5vw] max-w-[90vw] break-words">
              MENS
              <span className="block text-transparent" style={{ WebkitTextStroke: "2px #1c1917" }}>FOOTWEAR</span>
              <span className="block">SHOES</span>
            </h1>


          </div>
        </div>

        {/* Slide 2: Express Your Style Star Cardigan Campaign */}
        <div 
          className={`absolute inset-0 w-full h-full overflow-hidden transition-opacity duration-1000 ease-in-out ${
            activeSlide === 1 ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
          }`}
        >
          {/* Background Zoom Image (Ken Burns) */}
          <img
            src="/about_hero_banner2.jpg"
            alt="Express Your Style"
            className={`w-full h-full object-cover object-[75%_center] md:object-center select-none pointer-events-none transition-transform duration-[6000ms] ease-out ${
              activeSlide === 1 ? "scale-[1.04]" : "scale-100"
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-900/10 via-transparent to-transparent z-10" />

          {/* Left Text Overlay */}
          <div 
            className={`absolute inset-y-0 left-0 right-0 w-full px-5 sm:px-12 md:px-16 lg:px-20 flex flex-col justify-center items-start z-20 text-left transition-all duration-1000 delay-300 ${
              activeSlide === 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6F4E37] animate-pulse" />
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-black">
                ✦ New Season Curation
              </span>
            </div>

            <h1 className="text-white font-serif italic font-normal leading-[1.05] tracking-tight text-3xl sm:text-[4vw] lg:text-[3.5vw] max-w-[90vw] break-words">
              Express Your Style.
              <span className="block mt-1 font-sans font-black uppercase not-italic tracking-tighter text-4xl sm:text-[5.5vw] lg:text-[5vw] text-stone-100">
                Live Your Way.
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-stone-200 font-sans leading-relaxed mt-4 max-w-sm">
              Effortless pieces that make every day your moment.
            </p>


          </div>
        </div>

        {/* Slide 3: Tokyo Techwear Campaign */}
        <div 
          className={`absolute inset-0 w-full h-full overflow-hidden transition-opacity duration-1000 ease-in-out ${
            activeSlide === 2 ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
          }`}
        >
          {/* Background Zoom Image (Ken Burns) */}
          <img
            src="/tokyo_techwear_hero.jpg"
            alt="Tokyo Techwear"
            className={`w-full h-full object-cover object-right md:object-center select-none pointer-events-none transition-transform duration-[6000ms] ease-out ${
              activeSlide === 2 ? "scale-[1.04]" : "scale-100"
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-900/10 via-transparent to-transparent z-10" />

          {/* Left Text Overlay */}
          <div 
            className={`absolute inset-y-0 left-0 right-0 w-full px-5 sm:px-12 md:px-16 lg:px-20 flex flex-col justify-center items-start z-20 text-left transition-all duration-1000 delay-300 ${
              activeSlide === 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6F4E37] animate-pulse" />
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-black">
                ✦ Technical Shell Capsule
              </span>
            </div>

            <h1 className="text-white font-sans font-black uppercase leading-[0.85] tracking-tighter text-4xl sm:text-[6vw] lg:text-[5.5vw] max-w-[90vw] break-words">
              TOKYO
              <span className="block text-transparent" style={{ WebkitTextStroke: "2px #ffffff" }}>TECHWEAR</span>
            </h1>

            <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed mt-4 max-w-sm">
              Waterproof tactical panels and modular cyber storage systems.
            </p>


          </div>
        </div>

        {/* Slide 4: Guerilla Culture Campaign */}
        <div 
          className={`absolute inset-0 w-full h-full overflow-hidden transition-opacity duration-1000 ease-in-out ${
            activeSlide === 3 ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
          }`}
        >
          {/* Background Zoom Image (Ken Burns) */}
          <img
            src="/guerilla_culture_hero.jpg"
            alt="Guerilla Culture"
            className={`w-full h-full object-cover object-[70%_center] md:object-center select-none pointer-events-none transition-transform duration-[6000ms] ease-out ${
              activeSlide === 3 ? "scale-[1.04]" : "scale-100"
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-900/10 via-transparent to-transparent z-10" />

          {/* Left Text Overlay */}
          <div 
            className={`absolute inset-y-0 left-0 right-0 w-full px-5 sm:px-12 md:px-16 lg:px-20 flex flex-col justify-center items-start z-20 text-left transition-all duration-1000 delay-300 ${
              activeSlide === 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6F4E37] animate-pulse" />
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-black">
                ✦ Structured Street Outerwear
              </span>
            </div>

            <h1 className="text-white font-serif italic font-normal leading-[1.05] tracking-tight text-3xl sm:text-[4vw] lg:text-[3.5vw] max-w-[90vw] break-words">
              Guerilla Culture.
              <span className="block mt-1 font-sans font-black uppercase not-italic tracking-tighter text-4xl sm:text-[5.5vw] lg:text-[5vw] text-stone-100">
                Canvas Vanguard
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-stone-200 font-sans leading-relaxed mt-4 max-w-sm">
              Heavyweight loopback outerwear crafted for structured minimal silhouettes.
            </p>


          </div>
        </div>

        {/* Carousel Indicators Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-35 flex items-center gap-3">
          {[0, 1, 2, 3].map((idx) => (
            <button
              key={idx}
              onClick={() => setActiveSlide(idx)}
              className={`h-1.5 rounded-full transition-all duration-350 ${
                activeSlide === idx ? "w-7 bg-stone-900" : "w-1.5 bg-white/50 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </section>

      <main className="flex-grow w-full py-2 animate-fade-in text-left flex flex-col gap-6 sm:gap-8">

        {/* ─── SECTION 1: THE STREETWEAR MOVEMENT & ARCHIVE MANIFESTO (CULTURE-CIRCLE LUXURY) ─── */}
        <section ref={sec1.ref} className="px-4 sm:px-12 md:px-16 lg:px-20 w-full max-w-[1600px] mx-auto py-8 select-none overflow-hidden">
          <div className="w-full space-y-6">

            {/* ─── HEADER: EDITORIAL MANIFESTO TITLE & STATUS ─── */}
            <div className={cn("relative z-10 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 pb-6 border-b border-stone-200/80 dark:border-zinc-800/80 text-left transition-all duration-700", sec1.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6")}>
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2.5">
                  <div className="inline-flex items-center gap-2 bg-white dark:bg-zinc-900 border border-stone-300 dark:border-zinc-700 text-[#6F4E37] dark:text-[#E6C280] font-mono text-[9px] font-bold uppercase tracking-[0.25em] px-3.5 py-1.5 rounded-full shadow-xs">
                    <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>DRIPHUNTER MANIFESTO // VOL 01</span>
                  </div>

                  <div className="inline-flex items-center gap-2 bg-white dark:bg-zinc-900 border border-stone-300 dark:border-zinc-700 text-emerald-700 dark:text-emerald-400 font-mono text-[9px] font-bold uppercase tracking-[0.2em] px-3.5 py-1.5 rounded-full shadow-xs">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>100% AUTHENTIC VAULT ARCHIVE</span>
                  </div>
                </div>

                <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-zinc-950 dark:text-zinc-50 font-playfair leading-[1.05] uppercase">
                  The Streetwear <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280] lowercase">movement</span>
                </h2>
                
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-sans font-normal max-w-2xl leading-relaxed">
                  India's premier authenticated streetwear ecosystem. Uniting domestic visionary creators with discerning collectors through verifiable legitimacy, raw experimental drops, and cultural currency.
                </p>
              </div>

              {/* Editorial Issue Metadata Stamp */}
              <div className="flex items-center gap-3 bg-white dark:bg-zinc-900 px-5 py-3.5 rounded-2xl border border-stone-200 dark:border-zinc-800 shadow-sm shrink-0">
                <div className="text-left">
                  <span className="text-[8.5px] font-mono uppercase tracking-widest text-zinc-400 font-bold block">
                    EDITION // TIMELINE
                  </span>
                  <span className="text-xs font-mono font-bold text-zinc-900 dark:text-white block">
                    AUTUMN 2026 ARCHIVE
                  </span>
                </div>
                <div className="w-8 h-8 rounded-full bg-stone-100 dark:bg-zinc-800 flex items-center justify-center text-[#6F4E37] dark:text-[#E6C280]">
                  <BookOpen className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* ─── MAIN EDITORIAL SPLIT (LEFT 5 COLS: COVER STAGE, RIGHT 7 COLS: INTERACTIVE PILLARS) ─── */}
            <div className={cn("relative z-10 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-6 items-stretch w-full transition-all duration-700 delay-200", sec1.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6")}>

              {/* LEFT COLUMN: Visual Manifesto Cover Stage */}
              <div className="relative rounded-[32px] overflow-hidden border-2 border-stone-300/80 dark:border-zinc-800 shadow-xl min-h-[340px] flex flex-col justify-between p-7 bg-zinc-950 group">
                {/* Image background with slow hover zoom */}
                <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
                  <img
                    src="/streetwear_movement_manifesto.jpg"
                    alt="Streetwear Movement Manifesto"
                    className="w-full h-full object-cover object-[75%_center] md:object-center opacity-75 scale-105 group-hover:scale-100 transition-transform duration-[3000ms] ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/20" />
                </div>

                {/* Top Floating Badge */}
                <div className="relative z-10 flex items-center justify-between w-full">
                  <div className="bg-black/75 backdrop-blur-md border border-white/15 text-white font-mono text-[8.5px] font-black tracking-widest px-3 py-1.5 rounded-full shadow flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>CURATION NETWORK LIVE</span>
                  </div>

                  <span className="text-[9px] font-mono text-[#D4AF37] uppercase tracking-widest font-black bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full border border-[#D4AF37]/30">
                    DH // 01
                  </span>
                </div>

                {/* Bottom Overlay Info & Action */}
                <div className="relative z-10 text-left space-y-3 mt-auto pt-6 border-t border-white/15">
                  <div>
                    <div className="flex items-center gap-1.5 text-[#D4AF37] font-mono text-[9px] uppercase tracking-widest font-bold mb-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Accredited Domestic Archive</span>
                    </div>
                    <h3 className="text-2xl font-light text-white font-playfair uppercase leading-tight">
                      Raw Vision. <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280] lowercase">authenticated.</span>
                    </h3>
                  </div>

                  <Link
                    href="/shop"
                    className="inline-flex items-center justify-between w-full bg-white hover:bg-stone-100 text-zinc-950 px-5 py-3 rounded-2xl text-[10px] font-mono font-bold uppercase tracking-wider transition-all duration-300 shadow-md group-hover:shadow-xl cursor-pointer"
                  >
                    <span>Explore Archive Drops</span>
                    <ArrowUpRight className="w-4 h-4 text-[#6F4E37]" />
                  </Link>
                </div>
              </div>

              {/* RIGHT COLUMN: Interactive Philosophy Terminal & Pillars */}
              <div className="relative rounded-[32px] border border-stone-200/90 dark:border-zinc-800 shadow-md p-6 sm:p-8 flex flex-col justify-between bg-white dark:bg-zinc-900 text-left space-y-6">
                
                <div className="space-y-5">
                  {/* Interactive Pillar Selector Tabs */}
                  <div className="flex flex-wrap gap-2 pb-3 border-b border-stone-200/80 dark:border-zinc-800">
                    {[
                      { id: 0, label: "The Manifesto", icon: BookOpen },
                      { id: 1, label: "Legit Standards", icon: ShieldCheck },
                      { id: 2, label: "Collector Network", icon: Zap }
                    ].map((tab) => {
                      const Icon = tab.icon;
                      const isTabActive = activeTab === tab.id;

                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider font-bold px-4 py-2 rounded-xl transition-all cursor-pointer border ${
                            isTabActive
                              ? "bg-[#6F4E37] text-white border-[#6F4E37] shadow-sm"
                              : "bg-stone-50 dark:bg-zinc-800/60 text-zinc-600 dark:text-zinc-400 border-stone-200 dark:border-zinc-700 hover:border-stone-400"
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                          <span>{tab.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Tab Narrative Content Block */}
                  <div className="min-h-[120px] text-zinc-600 dark:text-zinc-300 leading-relaxed font-sans transition-all duration-300">
                    {activeTab === 0 && (
                      <div className="space-y-3 animate-fade-in">
                        <h4 className="text-xl font-light text-zinc-900 dark:text-white font-playfair">
                          Redefining Domestic <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280]">Luxury</span>
                        </h4>
                        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                          India's streetwear culture is undergoing a monumental evolution. No longer confined to niche collector circles, homegrown labels are commanding global attention with 450+ GSM French terry weaves, heavy loopback cottons, and avant-garde structural cuts. Drip Hunter serves as the trusted cultural centerpoint—curating raw seasonal drops and authenticating true designer value.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-[11px] font-mono text-zinc-700 dark:text-zinc-300">
                          <span className="flex items-center gap-1.5">
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Heavyweight GSM Loopback Fabrics</span>
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Experimental Structural Cuts</span>
                          </span>
                        </div>
                      </div>
                    )}

                    {activeTab === 1 && (
                      <div className="space-y-3 animate-fade-in">
                        <h4 className="text-xl font-light text-zinc-900 dark:text-white font-playfair">
                          Zero-Tolerance <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280]">Verification</span>
                        </h4>
                        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                          Every drop in our vault undergoes an intensive multi-point authentication protocol before reaching collectors. Our specialists examine stitch density, typography kerning on label tags, zipper metallurgy, and fabric dye weights to eliminate counterfeits and guarantee 100% genuine investment grails.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-[11px] font-mono text-zinc-700 dark:text-zinc-300">
                          <span className="flex items-center gap-1.5">
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Optical & Stitch-Density Inspection</span>
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span>100% Legit Check Guarantee</span>
                          </span>
                        </div>
                      </div>
                    )}

                    {activeTab === 2 && (
                      <div className="space-y-3 animate-fade-in">
                        <h4 className="text-xl font-light text-zinc-900 dark:text-white font-playfair">
                          Creator-to-Collector <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280]">Bridge</span>
                        </h4>
                        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                          We eliminate middlemen and counterfeit risk by linking domestic designer ateliers directly with passionate streetwear collectors. Through verified drop schedules, transparent valuations, and pan-India express logistics, we foster a thriving streetwear economy where artistic innovation is celebrated.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-[11px] font-mono text-zinc-700 dark:text-zinc-300">
                          <span className="flex items-center gap-1.5">
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Direct Brand Collaborations</span>
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Pan-India Secure Vault Delivery</span>
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Stats Counters Highlights Bar */}
                <div className="grid grid-cols-3 gap-3 pt-5 border-t border-stone-200/80 dark:border-zinc-800">
                  <div className="bg-stone-50 dark:bg-zinc-800/50 p-3.5 rounded-2xl border border-stone-200/60 dark:border-zinc-800 text-left">
                    <span className="text-xl sm:text-2xl font-mono font-black text-zinc-900 dark:text-white block leading-none">
                      15,000+
                    </span>
                    <span className="text-[8.5px] font-mono text-zinc-500 uppercase tracking-wider font-bold block mt-1">
                      Active Collectors
                    </span>
                  </div>

                  <div className="bg-stone-50 dark:bg-zinc-800/50 p-3.5 rounded-2xl border border-stone-200/60 dark:border-zinc-800 text-left">
                    <span className="text-xl sm:text-2xl font-mono font-black text-zinc-900 dark:text-white block leading-none">
                      1,200+
                    </span>
                    <span className="text-[8.5px] font-mono text-zinc-500 uppercase tracking-wider font-bold block mt-1">
                      Verified Grails
                    </span>
                  </div>

                  <div className="bg-stone-50 dark:bg-zinc-800/50 p-3.5 rounded-2xl border border-stone-200/60 dark:border-zinc-800 text-left">
                    <span className="text-xl sm:text-2xl font-mono font-black text-[#6F4E37] dark:text-[#E6C280] block leading-none">
                      24+
                    </span>
                    <span className="text-[8.5px] font-mono text-zinc-500 uppercase tracking-wider font-bold block mt-1">
                      Partner Labels
                    </span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* ─── SECTION 2: OUR MISSION & VISION (OPEN EDITORIAL LAYOUT - NO CARDS/BOXES) ─── */}
        <section ref={sec2.ref} className="px-4 sm:px-12 md:px-16 lg:px-20 w-full max-w-[1600px] mx-auto py-8 select-none overflow-hidden">
          <div className="w-full space-y-6">
            
            {/* Header: Open Editorial Layout */}
            <div className={cn("flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-stone-200 dark:border-zinc-800 text-left transition-all duration-700", sec2.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6")}>
              <div className="space-y-2">
                <div className="flex items-center gap-2 font-mono text-[9.5px] font-bold text-[#6F4E37] dark:text-[#E6C280] tracking-[0.3em] uppercase">
                  <span>/ Mission &amp; Vision</span>
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-zinc-950 dark:text-zinc-50 font-playfair leading-[1.05] uppercase">
                  Our <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280] lowercase">mission</span>
                </h2>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-sans font-normal max-w-2xl leading-relaxed pt-1">
                  To establish India's most definitive authenticated streetwear archive—empowering homegrown design ateliers, safeguarding collector integrity, and redefining domestic luxury through verified craftsmanship.
                </p>
              </div>

              {/* Minimal Tag */}
              <div className="flex items-center gap-2 text-[#6F4E37] dark:text-[#E6C280] font-mono text-[10px] uppercase tracking-[0.2em] font-bold shrink-0">
                <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
                <span>Culture-Circle Committed</span>
              </div>
            </div>

            {/* 3 Open Editorial Pillars (No Cards / No Box Wrappers) */}
            <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-left transition-all duration-700 delay-200", sec2.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6")}>
              
              {/* Pillar 01 */}
              <div className="space-y-3 pt-2 flex flex-col items-start">
                <div className="flex items-center gap-3 w-full pb-3 border-b border-stone-200 dark:border-zinc-800">
                  <span className="font-mono text-xs font-bold text-[#6F4E37] dark:text-[#E6C280]">01 // ATELIER</span>
                  <Layers className="w-4 h-4 text-stone-400" />
                </div>
                <h3 className="text-xl sm:text-2xl font-light text-zinc-900 dark:text-white font-playfair uppercase">
                  Empower Creators
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans">
                  Providing independent Indian streetwear ateliers a high-visibility, verified platform to showcase avant-garde silhouettes without exploitative middlemen.
                </p>
              </div>

              {/* Pillar 02 */}
              <div className="space-y-3 pt-2 flex flex-col items-start">
                <div className="flex items-center gap-3 w-full pb-3 border-b border-stone-200 dark:border-zinc-800">
                  <span className="font-mono text-xs font-bold text-emerald-700 dark:text-emerald-400">02 // VERIFIED</span>
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                </div>
                <h3 className="text-xl sm:text-2xl font-light text-zinc-900 dark:text-white font-playfair uppercase">
                  Authenticity Guarantee
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans">
                  Protecting collectors with multi-point optical stitch inspection, physical hardware testing, and tamper-proof authentication certificates.
                </p>
              </div>

              {/* Pillar 03 */}
              <div className="space-y-3 pt-2 flex flex-col items-start">
                <div className="flex items-center gap-3 w-full pb-3 border-b border-stone-200 dark:border-zinc-800">
                  <span className="font-mono text-xs font-bold text-[#6F4E37] dark:text-[#E6C280]">03 // NETWORK</span>
                  <Zap className="w-4 h-4 text-stone-400" />
                </div>
                <h3 className="text-xl sm:text-2xl font-light text-zinc-900 dark:text-white font-playfair uppercase">
                  Collector Ecosystem
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans">
                  Connecting enthusiasts across 40+ Indian metros with curated runway lookbooks, express door-to-door logistics, and exclusive VIP drops.
                </p>
              </div>

            </div>

          </div>
        </section>

        {/* ─── SECTION 3: WHY DRIPHUNTER? ─── */}
        <section ref={sec3.ref} className="px-4 sm:px-12 md:px-16 lg:px-20 w-full max-w-[1600px] mx-auto overflow-hidden">
          <div className="space-y-6">
            <div className={cn("space-y-3 text-left transition-all duration-700", sec3.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6")}>
              <div className="flex items-center gap-2 font-mono text-[9px] font-bold text-[#6F4E37] dark:text-[#E6C280] tracking-[0.3em] uppercase">
                <span>/ Why Choose Us</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-zinc-950 dark:text-zinc-50 font-playfair leading-[1.05] uppercase">
                Why <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280] lowercase">DripHunter?</span>
              </h2>
            </div>
            <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-700 delay-200", sec3.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6")}>
              {[
                { id: "01", title: "Curated Excellence", desc: "Every garment in our catalog is handpicked by fashion curators to match modern street aesthetics." },
                { id: "02", title: "Collector Priority", desc: "We focus on limited runs, archive capsules, and designer grails for true collectors." },
                { id: "03", title: "Seamless Discovery", desc: "Find exactly what fits your style through advanced tech and lookbook deconstructions." }
              ].map((item) => (
                <div key={item.id} className="bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800 rounded-3xl p-6 text-left shadow-xs">
                  <span className="text-[10px] font-mono font-bold text-[#6F4E37] dark:text-[#E6C280] block mb-3">[{item.id}]</span>
                  <h4 className="text-lg font-mono font-bold text-zinc-900 dark:text-white mb-2">{item.title}</h4>
                  <p className="text-xs text-zinc-550 dark:text-zinc-400 font-sans leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── SECTION 5: AUTHENTICITY ─── */}
        <section ref={sec4.ref} className="px-4 sm:px-12 md:px-16 lg:px-20 w-full max-w-[1600px] mx-auto py-8 overflow-hidden">
          <div className={cn("rounded-[32px] border border-zinc-200/60 dark:border-zinc-850 shadow-sm p-8 sm:p-10 bg-zinc-950 text-left relative overflow-hidden flex flex-col md:flex-row items-center gap-8 transition-all duration-1000", sec4.isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95")}>
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#E6C280]/5 blur-[80px] rounded-full pointer-events-none" />
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-2 font-mono text-[9px] text-[#E6C280] uppercase tracking-widest font-bold mb-3">
                <span>/ Authenticity Registry</span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-light text-white font-playfair uppercase leading-tight">
                Guaranteed <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280] lowercase">authenticity</span>
              </h3>
              <p className="text-sm sm:text-base text-zinc-300 font-sans leading-relaxed mt-6 max-w-xl">
                We verify every single drop. Every item in our curated directory undergoes rigorous authenticity checks by our resident streetwear specialists—examining stitch densities, label prints, fabric weights, and hardware signatures to protect collectors from replica markets and guarantee true designer value.
              </p>
            </div>
            <div className="md:w-1/3 flex justify-center shrink-0">
               <div className="w-40 h-40 rounded-full border-2 border-dashed border-[#E6C280]/50 flex items-center justify-center animate-spin-slow text-[#E6C280]">
                 <ShieldCheck className="w-16 h-16" />
               </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: OUR CURATION PROCESS ─── */}
        <div ref={sec5.ref} className="px-4 sm:px-12 md:px-16 lg:px-20 w-full max-w-[1600px] mx-auto py-8 overflow-hidden">
          <div className="space-y-6">
            <div className={cn("space-y-3 pb-4 border-b border-zinc-200/50 text-left transition-all duration-700", sec5.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6")}>
              <div className="flex items-center gap-2 font-mono text-[9px] font-bold text-[#D4AF37] tracking-[0.3em] uppercase">
                <span>/ Section 06</span>
                <span>•</span>
                <span>Drip Hunter Stories</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-zinc-950 dark:text-zinc-50 font-playfair leading-[1.05] uppercase">
                Drip Hunter <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280] lowercase">stories</span>
              </h2>
              <p className="text-xs text-zinc-500 font-sans font-normal max-w-lg leading-relaxed">
                Witness behind-the-scenes timelines, exclusive drop countdowns, and collection previews.
              </p>
            </div>
            
            <div className={cn("transition-all duration-1000 delay-200", sec5.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
              <div
                id="archives-section"
                ref={sliderRef}
                className="relative w-full overflow-hidden select-none border border-zinc-850 h-[520px] md:h-[450px]"
                style={{ borderRadius: "2.5rem", backgroundColor: "#0c0c0e" }}
              >
                {/* Scoped CSS Style tag for Travel slide transition */}
              <style dangerouslySetInnerHTML={{ __html: `
                #archives-section {
                  position: relative;
                  font-family: "Inter", sans-serif;
                  color: #FFFFFFDD;
                }

                #archives-section .card {
                  position: absolute;
                  left: 0;
                  top: 0;
                  background-position: center;
                  background-size: cover;
                  box-shadow: 6px 6px 15px rgba(0, 0, 0, 0.5);
                  transition: border-radius 0.3s;
                }

                #archives-section .card::after {
                  content: "";
                  position: absolute;
                  inset: 0;
                  background: linear-gradient(to right, rgba(10, 10, 12, 0.85) 0%, rgba(10, 10, 12, 0.4) 40%, rgba(10, 10, 12, 0) 100%);
                  pointer-events: none;
                  z-index: 1;
                }

                #archives-section .card-content {
                  position: absolute;
                  left: 0;
                  top: 0;
                  color: #FFFFFFDD;
                  padding-left: 24px;
                  pointer-events: none;
                  display: flex;
                  flex-direction: column;
                  justify-content: flex-end;
                  padding-bottom: 24px;
                  height: 100%;
                  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
                }

                #archives-section .content-place {
                  margin-top: 6px;
                  font-size: 9px;
                  font-weight: 700;
                  letter-spacing: 0.1em;
                  text-transform: uppercase;
                  color: #D4AF37;
                }

                #archives-section .content-title-1,
                #archives-section .content-title-2 {
                  font-weight: 650;
                  font-size: 14px;
                  font-family: "Oswald", sans-serif;
                  text-transform: uppercase;
                  line-height: 1.2;
                  letter-spacing: 0.05em;
                }

                #archives-section .content-start {
                  width: 30px;
                  height: 4px;
                  border-radius: 99px;
                  background-color: #D4AF37;
                }

                #archives-section .details {
                  z-index: 22;
                  position: absolute;
                  top: 20px;
                  left: 60px;
                  pointer-events: auto;
                  text-align: left;
                  max-width: 480px; /* Prevent text cutting and card overlaps */
                }

                #archives-section .place-box {
                  height: 46px;
                  overflow: hidden;
                }

                #archives-section .place-box .text {
                  padding-top: 16px;
                  font-size: 16px;
                  position: relative;
                  font-family: var(--font-mono), monospace;
                  color: #D4AF37;
                  letter-spacing: 0.15em;
                  font-weight: 800;
                  text-transform: uppercase;
                }

                #archives-section .place-box .text::before {
                  top: 0;
                  left: 0;
                  position: absolute;
                  content: "";
                  width: 40px;
                  height: 3px;
                  border-radius: 99px;
                  background-color: #D4AF37;
                }

                #archives-section .title-1,
                #archives-section .title-2 {
                  font-weight: 700;
                  font-size: 46px;
                  font-family: "Oswald", sans-serif;
                  text-transform: uppercase;
                  line-height: 1.05;
                  letter-spacing: -0.01em;
                  background: linear-gradient(135deg, #ffffff 30%, #e2e8f0 100%);
                  -webkit-background-clip: text;
                  -webkit-text-fill-color: transparent;
                }

                #archives-section .title-box-1,
                #archives-section .title-box-2 {
                  margin-top: 2px;
                  height: 54px;
                  overflow: hidden;
                }

                #archives-section .desc {
                  margin-top: 12px;
                  width: 440px;
                  font-size: 13px;
                  line-height: 1.5;
                  color: #cbd5e1;
                  font-weight: 450;
                }

                #archives-section .cta {
                  width: 440px;
                  margin-top: 16px;
                  display: flex;
                  align-items: center;
                  gap: 16px;
                }

                #archives-section .cta .bookmark {
                  border: 1px solid rgba(212, 175, 55, 0.2);
                  background-color: rgba(255, 255, 255, 0.03);
                  width: 44px;
                  height: 44px;
                  border-radius: 14px;
                  color: #D4AF37;
                  display: grid;
                  place-items: center;
                  cursor: pointer;
                  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                }

                #archives-section .cta .bookmark:hover {
                  transform: scale(1.05);
                  background-color: rgba(212, 175, 55, 0.15);
                  border-color: #D4AF37;
                }

                #archives-section .cta .bookmark svg {
                  width: 20px;
                  height: 20px;
                }

                #archives-section .cta .discover {
                  border: 1px solid rgba(255, 255, 255, 0.15);
                  background: linear-gradient(to right, transparent 50%, #D4AF37 50%);
                  background-size: 200% 100%;
                  background-position: left bottom;
                  height: 44px;
                  border-radius: 14px;
                  color: #ffffff;
                  padding: 4px 32px;
                  font-size: 11px;
                  font-family: var(--font-mono), monospace;
                  text-transform: uppercase;
                  cursor: pointer;
                  font-weight: 800;
                  letter-spacing: 0.15em;
                  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                }

                #archives-section .cta .discover:hover {
                  background-position: right bottom;
                  color: #121214;
                  border-color: #D4AF37;
                  transform: translateY(-2px);
                  box-shadow: 0 10px 20px -5px rgba(212, 175, 55, 0.3);
                }

                #archives-section .indicator {
                  position: absolute;
                  left: 0;
                  right: 0;
                  top: 0;
                  height: 4px;
                  z-index: 60;
                  background-color: #D4AF37;
                }

                #archives-section .pagination {
                  position: absolute;
                  display: inline-flex;
                  align-items: center;
                  z-index: 40;
                  background-color: rgba(12, 12, 14, 0.85);
                  backdrop-filter: blur(16px);
                  -webkit-backdrop-filter: blur(16px);
                  border: 1px solid rgba(230, 194, 128, 0.25);
                  padding: 6px 16px;
                  border-radius: 99px;
                  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.6);
                }

                #archives-section .pagination .arrow {
                  width: 36px;
                  height: 36px;
                  border-radius: 999px;
                  border: 1px solid rgba(255, 255, 255, 0.12);
                  display: grid;
                  place-items: center;
                  cursor: pointer;
                  background-color: rgba(255, 255, 255, 0.05);
                  transition: all 0.3s ease;
                }

                #archives-section .pagination .arrow:hover {
                  background-color: #E6C280;
                  border-color: #E6C280;
                  transform: scale(1.08);
                }

                #archives-section .pagination .arrow svg {
                  width: 16px;
                  height: 16px;
                  color: #ffffff;
                  transition: color 0.3s;
                }
                
                #archives-section .pagination .arrow:hover svg {
                  color: #0c0c0e;
                }

                #archives-section .progress-sub-container {
                  margin-left: 16px;
                  width: 250px;
                  height: 36px;
                  display: flex;
                  align-items: center;
                }

                #archives-section .progress-sub-background {
                  width: 100%;
                  height: 2px;
                  background-color: rgba(255, 255, 255, 0.2);
                  position: relative;
                  border-radius: 99px;
                }

                #archives-section .progress-sub-foreground {
                  height: 2px;
                  background-color: #E6C280;
                  width: 0;
                  border-radius: 99px;
                  box-shadow: 0 0 10px rgba(230, 194, 128, 0.6);
                  transition: width 0.3s ease;
                }

                #archives-section .slide-numbers {
                  width: 36px;
                  height: 36px;
                  overflow: hidden;
                  position: relative;
                  margin-left: 12px;
                }

                #archives-section .slide-numbers .item {
                  width: 36px;
                  height: 36px;
                  position: absolute;
                  color: #E6C280;
                  top: 0;
                  left: 0;
                  display: grid;
                  place-items: center;
                  font-size: 16px;
                  font-weight: 800;
                  font-family: var(--font-mono), monospace;
                }

                #archives-section .cover {
                  position: absolute;
                  left: 0;
                  top: 0;
                  width: 100%;
                  height: 100%;
                  background-color: #121214;
                  z-index: 100;
                }

                @keyframes pathDash {
                  to {
                    stroke-dashoffset: -200;
                  }
                }
                .animate-path-dash {
                  animation: pathDash 6s linear infinite;
                  stroke-dasharray: 25 70;
                  stroke-dashoffset: 0;
                }
                
                @media (max-width: 768px) {
                  #archives-section .details {
                    left: 20px !important;
                    right: 20px !important;
                    top: 24px !important;
                    max-width: calc(100% - 40px) !important;
                  }
                  #archives-section .title-1,
                  #archives-section .title-2 {
                    font-size: 32px !important;
                  }
                  #archives-section .desc {
                    width: 100% !important;
                    font-size: 12px !important;
                    margin-top: 8px !important;
                  }
                  #archives-section .cta {
                    width: 100% !important;
                    margin-top: 12px !important;
                  }
                  #archives-section .place-box .text {
                    font-size: 12px !important;
                    padding-top: 12px !important;
                  }
                  #archives-section .pagination {
                    padding: 4px 12px !important;
                  }
                  #archives-section .progress-sub-container {
                    width: 120px !important;
                  }
                  #archives-section .card-content {
                    padding-left: 12px !important;
                    padding-bottom: 12px !important;
                  }
                  #archives-section .content-title-1,
                  #archives-section .content-title-2 {
                    font-size: 11px !important;
                  }
                }
` }} />

              {/* Progress top indicator */}
              <div className="indicator" />

              {/* Loader Cover */}
              <div className="cover" />

              {/* Demo cards container */}
              <div id="demo">
                {/* 6 Hardcoded cards loaded with dynamic background images */}
                <div className="card" id="card0" style={{ backgroundImage: `url('${SLIDE_DATA[0]?.image}')` }} />
                <div className="card" id="card1" style={{ backgroundImage: `url('${SLIDE_DATA[1]?.image}')` }} />
                <div className="card" id="card2" style={{ backgroundImage: `url('${SLIDE_DATA[2]?.image}')` }} />
                <div className="card" id="card3" style={{ backgroundImage: `url('${SLIDE_DATA[3]?.image}')` }} />
                <div className="card" id="card4" style={{ backgroundImage: `url('${SLIDE_DATA[4]?.image}')` }} />
                <div className="card" id="card5" style={{ backgroundImage: `url('${SLIDE_DATA[5]?.image}')` }} />

                {/* 6 Hardcoded card content overlays loaded with dynamic text */}
                <div className="card-content" id="card-content-0">
                  <div className="content-start" />
                  <div className="content-place">{SLIDE_DATA[0]?.place}</div>
                  <div className="content-title-1">{SLIDE_DATA[0]?.title}</div>
                  <div className="content-title-2">{SLIDE_DATA[0]?.title2}</div>
                  <div className="text-[10px] font-mono font-bold text-[#D4AF37] mt-1">{SLIDE_DATA[0]?.price}</div>
                </div>
                <div className="card-content" id="card-content-1">
                  <div className="content-start" />
                  <div className="content-place">{SLIDE_DATA[1]?.place}</div>
                  <div className="content-title-1">{SLIDE_DATA[1]?.title}</div>
                  <div className="content-title-2">{SLIDE_DATA[1]?.title2}</div>
                  <div className="text-[10px] font-mono font-bold text-[#D4AF37] mt-1">{SLIDE_DATA[1]?.price}</div>
                </div>
                <div className="card-content" id="card-content-2">
                  <div className="content-start" />
                  <div className="content-place">{SLIDE_DATA[2]?.place}</div>
                  <div className="content-title-1">{SLIDE_DATA[2]?.title}</div>
                  <div className="content-title-2">{SLIDE_DATA[2]?.title2}</div>
                  <div className="text-[10px] font-mono font-bold text-[#D4AF37] mt-1">{SLIDE_DATA[2]?.price}</div>
                </div>
                <div className="card-content" id="card-content-3">
                  <div className="content-start" />
                  <div className="content-place">{SLIDE_DATA[3]?.place}</div>
                  <div className="content-title-1">{SLIDE_DATA[3]?.title}</div>
                  <div className="content-title-2">{SLIDE_DATA[3]?.title2}</div>
                  <div className="text-[10px] font-mono font-bold text-[#D4AF37] mt-1">{SLIDE_DATA[3]?.price}</div>
                </div>
                <div className="card-content" id="card-content-4">
                  <div className="content-start" />
                  <div className="content-place">{SLIDE_DATA[4]?.place}</div>
                  <div className="content-title-1">{SLIDE_DATA[4]?.title}</div>
                  <div className="content-title-2">{SLIDE_DATA[4]?.title2}</div>
                  <div className="text-[10px] font-mono font-bold text-[#D4AF37] mt-1">{SLIDE_DATA[4]?.price}</div>
                </div>
                <div className="card-content" id="card-content-5">
                  <div className="content-start" />
                  <div className="content-place">{SLIDE_DATA[5]?.place}</div>
                  <div className="content-title-1">{SLIDE_DATA[5]?.title}</div>
                  <div className="content-title-2">{SLIDE_DATA[5]?.title2}</div>
                  <div className="text-[10px] font-mono font-bold text-[#D4AF37] mt-1">{SLIDE_DATA[5]?.price}</div>
                </div>
              </div>

              {/* Details block - Even */}
              <div className="details" id="details-even">
                <div className="place-box">
                  <div className="text" />
                </div>
                <div className="title-box-1">
                  <div className="title-1" />
                </div>
                <div className="title-box-2">
                  <div className="title-2" />
                </div>

                {/* Price & Countdown Timer Badges */}
                <div className="flex flex-wrap items-center gap-2.5 my-3.5 w-fit">
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/10 px-3.5 py-2 rounded-xl">
                    <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span className="text-[10px] font-mono font-bold text-white tracking-wider uppercase">
                      Drop starts in: {formatNum(activeSlideTime.h)}:{formatNum(activeSlideTime.m)}:{formatNum(activeSlideTime.s)}
                    </span>
                  </div>
                  {activeSlidePrice && (
                    <div className="bg-[#D4AF37]/20 border border-[#D4AF37]/40 backdrop-blur-md px-3.5 py-2 rounded-xl text-left">
                      <span className="text-[10px] font-mono font-bold text-[#D4AF37] tracking-wider uppercase">
                        Est. Value: {activeSlidePrice}
                      </span>
                    </div>
                  )}
                </div>

                <div className="desc" />
                <div className="cta">
                  <button className="bookmark" onClick={() => toggleBookmark(activeSlideBrandId)}>
                    <Bookmark 
                      className="w-5 h-5" 
                      fill={bookmarkedBrands[activeSlideBrandId] ? "#D4AF37" : "none"} 
                      stroke={bookmarkedBrands[activeSlideBrandId] ? "#D4AF37" : "currentColor"}
                    />
                  </button>
                  <button className="discover">Shop Collection</button>
                </div>
              </div>

              {/* Details block - Odd */}
              <div className="details" id="details-odd">
                <div className="place-box">
                  <div className="text" />
                </div>
                <div className="title-box-1">
                  <div className="title-1" />
                </div>
                <div className="title-box-2">
                  <div className="title-2" />
                </div>

                {/* Price & Countdown Timer Badges */}
                <div className="flex flex-wrap items-center gap-2.5 my-3.5 w-fit">
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/10 px-3.5 py-2 rounded-xl">
                    <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span className="text-[10px] font-mono font-bold text-white tracking-wider uppercase">
                      Drop starts in: {formatNum(activeSlideTime.h)}:{formatNum(activeSlideTime.m)}:{formatNum(activeSlideTime.s)}
                    </span>
                  </div>
                  {activeSlidePrice && (
                    <div className="bg-[#D4AF37]/20 border border-[#D4AF37]/40 backdrop-blur-md px-3.5 py-2 rounded-xl text-left">
                      <span className="text-[10px] font-mono font-bold text-[#D4AF37] tracking-wider uppercase">
                        Est. Value: {activeSlidePrice}
                      </span>
                    </div>
                  )}
                </div>

                <div className="desc" />
                <div className="cta">
                  <button className="bookmark" onClick={() => toggleBookmark(activeSlideBrandId)}>
                    <Bookmark 
                      className="w-5 h-5" 
                      fill={bookmarkedBrands[activeSlideBrandId] ? "#D4AF37" : "none"} 
                      stroke={bookmarkedBrands[activeSlideBrandId] ? "#D4AF37" : "currentColor"}
                    />
                  </button>
                  <button className="discover">Shop Collection</button>
                </div>
              </div>

              {/* Pagination Controls */}
              <div className="pagination" id="pagination">
                <div className="arrow arrow-left">
                  <ChevronLeft className="w-6 h-6" />
                </div>
                <div className="arrow arrow-right">
                  <ChevronRight className="w-6 h-6" />
                </div>
                
                <div className="progress-sub-container">
                  <div className="progress-sub-background">
                    <div className="progress-sub-foreground" />
                  </div>
                </div>

                <div className="slide-numbers" id="slide-numbers">
                  <div className="item" id="slide-item-0">1</div>
                  <div className="item" id="slide-item-1">2</div>
                  <div className="item" id="slide-item-2">3</div>
                  <div className="item" id="slide-item-3">4</div>
                  <div className="item" id="slide-item-4">5</div>
                  <div className="item" id="slide-item-5">6</div>
                </div>
              </div>

            </div>
            </div>
          </div>
        </div>

        {/* ─── SECTION 4: SPOT THE DRIP RUNWAY STUDIO (CLEAN MINIMALIST LUXURY) ─── */}
        <section ref={sec6.ref} className="px-4 sm:px-12 md:px-16 lg:px-20 w-full max-w-[1600px] mx-auto py-8 select-none overflow-hidden">
          <div className="w-full space-y-6">
            
            {/* Header: Clean & Refined */}
            <div className={cn("flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-stone-200/80 dark:border-zinc-800/80 text-left transition-all duration-700", sec6.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6")}>
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono font-bold text-[#6F4E37] dark:text-[#E6C280] uppercase tracking-[0.25em] block">
                  Interactive Runway Lookbook
                </span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-zinc-950 dark:text-zinc-50 font-playfair leading-[1.05]">
                  Spot The <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280]">Drip</span>
                </h2>
                <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-sans max-w-lg">
                  Click any hotspot on the model to deconstruct the look, inspect specifications, and shop the outfit.
                </p>
              </div>

              {/* Total Silhouette Valuation & Action */}
              <div className="flex items-center gap-4 bg-stone-50 dark:bg-zinc-900 px-5 py-3.5 rounded-2xl border border-stone-200/80 dark:border-zinc-800 shrink-0">
                <div className="text-left pr-4 border-r border-stone-200 dark:border-zinc-700">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-400 font-semibold block">
                    TOTAL LOOK
                  </span>
                  <span className="text-lg font-mono font-bold text-zinc-900 dark:text-white">
                    ₹{formatNumWithCommas(activeFit.items.reduce((sum, item) => sum + item.numericPrice, 0))}
                  </span>
                </div>
                <button
                  onClick={() => {
                    activeFit.items.forEach((it) => {
                      addToCart({
                        id: `${it.name}-M-Default`,
                        name: it.name,
                        brand: it.brand,
                        price: it.numericPrice,
                        image: it.image,
                        size: "M",
                        color: "Default"
                      });
                    });
                    setAddedEntireLook(true);
                    setTimeout(() => setAddedEntireLook(false), 2000);
                  }}
                  className={`px-5 py-2.5 text-xs font-mono font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center gap-2 border-none shadow-sm active:scale-95 ${
                    addedEntireLook
                      ? "bg-emerald-600 text-white"
                      : "bg-[#6F4E37] hover:bg-[#5C3D2E] text-white dark:bg-[#E6C280] dark:text-zinc-950 dark:hover:bg-[#d4b06c]"
                  }`}
                >
                  {addedEntireLook ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Added Entire Look ✓</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Bag Entire Look</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Main Interactive Stage Grid */}
            <div className={cn("grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-6 items-start transition-all duration-700 delay-200", sec6.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6")}>
              
              {/* ─── LEFT: CLEAN EDITORIAL MODEL CANVAS ─── */}
              <div className="relative w-full aspect-[4/5] sm:aspect-[4/5] md:h-[460px] rounded-3xl overflow-hidden bg-stone-100 dark:bg-zinc-900 border border-stone-200/80 dark:border-zinc-800 shadow-md group">
                  
                  {/* Clean Model Image */}
                  <img
                    src={activeFit.mainImage}
                    alt={activeFit.celebrityName}
                    className="w-full h-full object-cover object-top transition-transform duration-1000 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                  {/* Clean Minimal Hotspot Pins */}
                  {activeFit.items.map((item, idx) => {
                    const isSelected = detailItemIndex === idx;
                    const isHovered = hoveredItemIndex === idx;

                    return (
                      <div
                        key={item.name}
                        style={{ left: `${item.xPercent}%`, top: `${item.yPercent}%` }}
                        className="absolute -translate-x-1/2 -translate-y-1/2 z-30 cursor-pointer"
                        onMouseEnter={() => setHoveredItemIndex(idx)}
                        onMouseLeave={() => setHoveredItemIndex(null)}
                        onClick={() => setDetailItemIndex(isSelected ? null : idx)}
                      >
                        {/* Minimal Hotspot Button */}
                        <div className={`relative w-8 h-8 rounded-full flex items-center justify-center font-mono text-[10px] font-bold transition-all duration-300 shadow-lg ${
                          isSelected
                            ? "bg-[#6F4E37] text-white scale-125 ring-4 ring-[#6F4E37]/30"
                            : isHovered
                            ? "bg-white text-zinc-900 scale-110 shadow-xl"
                            : "bg-white/90 text-zinc-800 backdrop-blur-md hover:bg-white"
                        }`}>
                          0{idx + 1}
                        </div>

                        {/* Floating Tooltip Specs */}
                        {(isHovered || isSelected) && (
                          <div className={`absolute top-1/2 -translate-y-1/2 bg-zinc-900/95 backdrop-blur-xl text-white px-3.5 py-2.5 rounded-xl whitespace-nowrap shadow-2xl pointer-events-none transition-all z-40 ${
                            item.xPercent > 50 ? "right-11" : "left-11"
                          }`}>
                            <span className="text-[8.5px] font-mono uppercase tracking-widest text-[#D4AF37] font-semibold block">
                              {item.brand}
                            </span>
                            <span className="text-xs font-medium block">{item.name}</span>
                            <span className="text-xs font-mono font-bold text-white mt-0.5 block">{item.price}</span>
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {/* Bottom Canvas Silhouette Title */}
                  <div className="absolute bottom-4 inset-x-4 z-20 flex items-center justify-between bg-black/60 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/10 text-white">
                    <span className="text-xs font-mono font-medium">{activeFit.celebrityName}</span>
                    <span className="text-[10px] font-mono text-zinc-300">{activeFit.items.length} Items</span>
                  </div>

                </div>
              
              {/* ─── RIGHT: CLEAN SHOOTABLE GARMENT DOCK ─── */}
              <div className="flex flex-col gap-3 text-left">
                <span className="text-xs font-mono uppercase tracking-wider font-bold text-zinc-500 dark:text-zinc-400 pb-1">
                  Outfit Pieces
                </span>

                <div className="space-y-3">
                  {activeFit.items.map((item, idx) => {
                    const isFocus = detailItemIndex === idx;
                    const isLiked = isInWishlist(item.name);
                    const isAdded = !!addedItemsMap[item.name];

                    return (
                      <div
                        key={item.name}
                        onClick={() => setDetailItemIndex(isFocus ? null : idx)}
                        onMouseEnter={() => setHoveredItemIndex(idx)}
                        onMouseLeave={() => setHoveredItemIndex(null)}
                        className={`rounded-2xl p-4 transition-all duration-200 cursor-pointer border flex items-center justify-between gap-4 ${
                          isFocus
                            ? "bg-stone-50 dark:bg-zinc-900 border-[#6F4E37] dark:border-[#E6C280] shadow-md"
                            : "bg-white dark:bg-zinc-950 border-stone-200/90 dark:border-zinc-800 hover:border-stone-300"
                        }`}
                      >
                        {/* Left: Thumbnail + Specs */}
                        <div className="flex items-center gap-3.5 min-w-0">
                          <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-stone-100 dark:bg-zinc-900 shrink-0 border border-stone-200/60 dark:border-zinc-800">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            <span className="absolute top-1 left-1 w-4 h-4 rounded-full bg-black/75 text-[8px] font-mono font-bold text-white flex items-center justify-center">
                              0{idx + 1}
                            </span>
                          </div>

                          <div className="min-w-0">
                            <span className="text-[9px] font-mono uppercase tracking-wider text-[#6F4E37] dark:text-[#E6C280] font-bold block">
                              {item.brand}
                            </span>
                            <h4 className="text-xs sm:text-sm font-medium text-zinc-900 dark:text-white truncate">
                              {item.name}
                            </h4>
                            <span className="text-xs font-mono font-bold text-zinc-900 dark:text-white mt-0.5 block">
                              {item.price}
                            </span>
                          </div>
                        </div>

                        {/* Right: Quick Actions */}
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              globalToggleWishlist({
                                id: item.name,
                                name: item.name,
                                price: item.price,
                                image: item.image,
                                brand: item.brand
                              });
                            }}
                            className="w-8 h-8 rounded-full border border-stone-200 dark:border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-rose-500 transition-colors bg-white dark:bg-zinc-900 cursor-pointer"
                            aria-label="Wishlist"
                          >
                            <Heart className="w-3.5 h-3.5" fill={isLiked ? "#ef4444" : "none"} stroke={isLiked ? "#ef4444" : "currentColor"} />
                          </button>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              addToCart({
                                id: `${item.name}-M-Default`,
                                name: item.name,
                                brand: item.brand,
                                price: item.numericPrice,
                                image: item.image,
                                size: "M",
                                color: "Default"
                              });
                              setAddedItemsMap((prev) => ({ ...prev, [item.name]: true }));
                              setTimeout(() => {
                                setAddedItemsMap((prev) => ({ ...prev, [item.name]: false }));
                              }, 2000);
                            }}
                            className={`px-3.5 py-2 text-[11px] font-mono font-bold uppercase rounded-xl transition-all cursor-pointer border-none shadow-xs ${
                              isAdded
                                ? "bg-emerald-600 text-white"
                                : "bg-[#6F4E37] hover:bg-[#5C3D2E] text-white dark:bg-[#E6C280] dark:text-zinc-950"
                            }`}
                          >
                            {isAdded ? (
                              <span className="flex items-center gap-1">
                                <Check className="w-3 h-3" />
                                <span>Added ✓</span>
                              </span>
                            ) : (
                              <span>Add</span>
                            )}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* ─── BOTTOM: CLEAN RUNWAY LOOKBOOK SELECTOR ─── */}
            <div className="pt-4 border-t border-stone-200/80 dark:border-zinc-800/80">
              <div className="flex items-center justify-between mb-3 text-left">
                <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-zinc-400">
                  Select Lookbook Silhouette ({DRIPSPOT_FITS.length})
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {DRIPSPOT_FITS.map((fit, idx) => {
                  const isActive = activeFitIndex === idx;

                  return (
                    <button
                      key={fit.id}
                      onClick={() => {
                        setActiveFitIndex(idx);
                        setDetailItemIndex(null);
                      }}
                      className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
                        isActive
                          ? "bg-stone-50 dark:bg-zinc-900 border-[#6F4E37] dark:border-[#E6C280] shadow-sm ring-1 ring-[#6F4E37]"
                          : "bg-white dark:bg-zinc-950 border-stone-200/90 dark:border-zinc-800 hover:border-stone-300"
                      }`}
                    >
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-stone-100 shrink-0">
                        <img src={fit.thumbnailImage} alt={fit.celebrityName} className="w-full h-full object-cover" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[8.5px] font-mono font-bold text-zinc-400 block">LOOK 0{idx + 1}</span>
                        <span className="text-xs font-medium text-zinc-900 dark:text-white truncate block">
                          {fit.celebrityName}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        </section>

        {/* ─── SECTION 5: DRIP VISION VIDEO STUDIO (CULTURE-CIRCLE LUXURY CINEMA) ─── */}
        <section ref={sec7.ref} className="px-4 sm:px-12 md:px-16 lg:px-20 w-full max-w-[1600px] mx-auto py-8 select-none overflow-hidden">
          <div className="w-full space-y-6">

            {/* Header */}
            <div className={cn("relative z-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4 pb-6 border-b border-stone-200/80 dark:border-zinc-800/80 text-left transition-all duration-700", sec7.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6")}>
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2.5">
                  <div className="inline-flex items-center gap-2 bg-white dark:bg-zinc-900 border border-stone-300 dark:border-zinc-700 text-[#6F4E37] dark:text-[#E6C280] font-mono text-[9px] font-bold uppercase tracking-[0.25em] px-3.5 py-1.5 rounded-full shadow-xs">
                    <Film className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>DRIP VISION CINEMA STUDIO</span>
                  </div>

                  <div className="inline-flex items-center gap-2 bg-white dark:bg-zinc-900 border border-stone-300 dark:border-zinc-700 text-emerald-700 dark:text-emerald-400 font-mono text-[9px] font-bold uppercase tracking-[0.2em] px-3.5 py-1.5 rounded-full shadow-xs">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>4K RUNWAY BROADCAST</span>
                  </div>
                </div>

                <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-zinc-950 dark:text-zinc-50 font-playfair leading-[1.05] uppercase">
                  Drip <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280] lowercase">vision</span>
                </h2>
                
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-sans font-normal max-w-xl leading-relaxed">
                  Watch verified streetwear collections, designer campaigns, behind-the-scenes masterclasses, and runway deconstructions.
                </p>
              </div>

              {/* Verified Certificate Pill */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-stone-200 dark:border-zinc-800 text-[10px] font-mono text-zinc-600 dark:text-zinc-400">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Culture-Circle Verified Archive</span>
              </div>
            </div>

            {/* ─── 1. TOP THEATER HERO PLAYER ─── */}
            <div className={cn("relative z-10 w-full flex flex-col gap-5 transition-all duration-700 delay-200", sec7.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6")}>
              
              {/* Cinematic Video Stage Frame */}
              <div className="relative w-full max-w-5xl mx-auto aspect-video md:h-[420px] md:aspect-auto rounded-3xl overflow-hidden bg-black shadow-2xl border-2 border-stone-300/80 dark:border-zinc-700/80 group">
                
                {/* Embedded Video */}
                {activeVideo && (
                  <iframe
                    src={getYoutubeEmbedUrl(activeVideo.videoUrl) || ""}
                    title={activeVideo.title}
                    className="w-full h-full border-none"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                )}

                {/* Subtle Framing HUD Accents */}
                <div className="absolute top-4 left-4 z-20 pointer-events-none flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                  <span className="text-[8.5px] font-mono text-white uppercase tracking-widest font-bold bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/15">
                    4K MASTER // STEREO DOLBY
                  </span>
                </div>

                <div className="absolute top-4 right-4 z-20 pointer-events-none">
                  <span className="text-[8.5px] font-mono text-[#D4AF37] uppercase tracking-widest font-bold bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-[#D4AF37]/30">
                    {activeVideo?.brand}
                  </span>
                </div>
              </div>

              {/* Active Video Info & Quick Actions Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-zinc-900/80 border border-stone-200/90 dark:border-zinc-800 shadow-sm text-left">
                <div className="space-y-1 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-mono font-bold text-[#6F4E37] dark:text-[#E6C280] uppercase tracking-wider bg-[#FAF4EF] dark:bg-zinc-800 px-2.5 py-0.5 rounded-full border border-[#6F4E37]/20">
                      {activeVideo?.brand}
                    </span>
                    <span className="text-[9px] font-mono text-zinc-400">
                      // NOW STREAMING
                    </span>
                  </div>
                  <h3 className="text-xl font-light font-playfair text-zinc-900 dark:text-white tracking-tight">
                    {activeVideo?.title}
                  </h3>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed">
                    {activeVideo?.description}
                  </p>
                </div>

                {/* Direct Action Link */}
                <Link
                  href={`/shop?brand=${encodeURIComponent(activeVideo?.brand || "")}`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#6F4E37] hover:bg-[#5C3D2E] text-white dark:bg-[#E6C280] dark:hover:bg-[#d4b06c] dark:text-zinc-950 text-xs font-mono font-bold uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg transition-all duration-300 shrink-0 border-none cursor-pointer active:scale-95"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Shop This Drop</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Separator */}
            <div className="h-[1px] w-full bg-stone-200/90 dark:bg-zinc-800/80" />

            {/* ─── 2. BOTTOM PLAYLIST REEL (STRICT 4:4 / 1:1 SQUARE CARDS) ─── */}
            <div className="relative z-10 w-full space-y-4">
              
              {/* Playlist Header & Carousel Arrows */}
              <div className="flex items-center justify-between text-left">
                <div className="flex items-center gap-2">
                  <Film className="w-4 h-4 text-[#6F4E37] dark:text-[#E6C280]" />
                  <span className="text-xs font-mono uppercase tracking-[0.2em] font-bold text-zinc-900 dark:text-white">
                    Select Presentation Reel ({DRIPVISION_VIDEOS.length} Episodes)
                  </span>
                </div>

                {/* Prev / Next Scroll Navigation Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => scrollVision("left")}
                    className="w-9 h-9 rounded-full bg-white dark:bg-zinc-900 border border-stone-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:border-[#6F4E37] hover:text-[#6F4E37] dark:hover:border-[#E6C280] dark:hover:text-[#E6C280] flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-90"
                    aria-label="Scroll left"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => scrollVision("right")}
                    className="w-9 h-9 rounded-full bg-white dark:bg-zinc-900 border border-stone-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:border-[#6F4E37] hover:text-[#6F4E37] dark:hover:border-[#E6C280] dark:hover:text-[#E6C280] flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-90"
                    aria-label="Scroll right"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Square 4:4 / 1:1 Carousel Container */}
              <div
                id="vision-scroll-container"
                className="w-full flex flex-row gap-5 overflow-x-auto pb-4 pt-2 scroll-smooth scrollbar-none snap-x snap-mandatory"
              >
                {DRIPVISION_VIDEOS.map((video, idx) => {
                  const isSelected = activeVideo?.id === video.id;

                  return (
                    <div
                      key={video.id}
                      onClick={() => setActiveVideo(video)}
                      className={`w-[140px] sm:w-[160px] md:w-[180px] aspect-square shrink-0 snap-start rounded-3xl overflow-hidden relative group cursor-pointer border-2 transition-all duration-300 select-none shadow-md hover:shadow-xl ${
                        isSelected
                          ? "border-[#6F4E37] dark:border-[#E6C280] ring-4 ring-[#6F4E37]/20 dark:ring-[#E6C280]/20 scale-[1.02] shadow-2xl"
                          : "border-stone-200/90 dark:border-zinc-800 hover:border-[#6F4E37]/60 dark:hover:border-[#E6C280]/60 hover:scale-[1.01]"
                      }`}
                    >
                      {/* Background Thumbnail Image (Ken Burns on hover) */}
                      <img
                        src={video.imageUrl}
                        alt={video.title}
                        className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
                      />

                      {/* Multi-tier Gradient Shadows */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/20 group-hover:via-black/25 transition-all" />

                      {/* Top Bar Badges */}
                      <div className="absolute top-3.5 inset-x-3.5 z-10 flex items-center justify-between pointer-events-none">
                        <span className="bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md text-[#6F4E37] dark:text-[#E6C280] font-mono text-[8.5px] font-extrabold uppercase px-2.5 py-1 rounded-full shadow-xs">
                          {video.brand}
                        </span>

                        {isSelected ? (
                          <span className="inline-flex items-center gap-1.5 bg-emerald-500 text-white font-mono text-[8px] font-bold uppercase px-2.5 py-1 rounded-full shadow-md animate-pulse">
                            <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                            <span>PLAYING</span>
                          </span>
                        ) : (
                          <span className="bg-black/60 backdrop-blur-md text-zinc-300 font-mono text-[8px] font-bold px-2 py-0.5 rounded-full border border-white/10">
                            0{idx + 1}
                          </span>
                        )}
                      </div>

                      {/* Center Play Beacon */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl ${
                          isSelected
                            ? "bg-[#6F4E37] text-white dark:bg-[#E6C280] dark:text-zinc-950 scale-110 shadow-[0_0_25px_rgba(111,78,55,0.6)]"
                            : "bg-white/80 backdrop-blur-md text-[#6F4E37] group-hover:bg-[#6F4E37] group-hover:text-white group-hover:scale-115"
                        }`}>
                          <Play className="w-5 h-5 ml-0.5 fill-current" />
                        </div>
                      </div>

                      {/* Bottom Editorial Card Info */}
                      <div className="absolute bottom-3.5 inset-x-3.5 z-10 text-left space-y-1 pointer-events-none">
                        <h4 className="text-sm font-playfair font-medium text-white line-clamp-1 group-hover:text-[#D4AF37] transition-colors">
                          {video.title}
                        </h4>
                        <p className="text-[10px] text-zinc-300 font-sans line-clamp-1 font-normal opacity-90">
                          {video.description}
                        </p>

                        <div className="flex items-center justify-between pt-1 border-t border-white/15 text-[8.5px] font-mono text-zinc-400">
                          <span>4K ULTRA HD</span>
                          <span className="text-[#D4AF37] font-bold">CLICK TO WATCH</span>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>

            </div>

          </div>
        </section>

        {/* ─── SECTION 6: CURATED INSTAGRAM POSTS (SLIDER FORMAT) ─── */}
        <InstagramFeed />

        {/* ─── SECTION 8: OUR BRAND PARTNERS ─── */}
        <section className="px-6 sm:px-12 md:px-16 lg:px-20 w-full max-w-[1600px] mx-auto">
          <div className="space-y-6">
            <div className="space-y-3 text-center flex flex-col items-center">
              <div className="flex items-center justify-center gap-2 font-mono text-[9px] font-bold text-[#6F4E37] dark:text-[#E6C280] tracking-[0.3em] uppercase">
                <span>/ Industry Collaborators</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-zinc-950 dark:text-zinc-50 font-playfair leading-[1.05] uppercase">
                Our Brand <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280] lowercase">partners</span>
              </h2>
              <p className="text-xs text-zinc-500 font-sans font-normal max-w-lg leading-relaxed">
                We collaborate with leading labels, independent designer brands, and authorized verification bodies to keep the culture authentic.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {["Guerilla Culture", "Urban Combat", "Tokyo Techwear", "Outkast Lab"].map((brand, idx) => (
                <div key={idx} className="bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800 rounded-2xl py-6 px-4 flex items-center justify-center font-mono text-xs font-bold text-zinc-400 dark:text-zinc-500 hover:text-zinc-950 dark:hover:text-white hover:border-[#6F4E37] dark:hover:border-[#E6C280] transition-colors cursor-default shadow-xs">
                  {brand.toUpperCase()}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── SECTION 9: JOIN THE CULTURE ─── */}
        <section className="w-full max-w-4xl mx-auto px-6 sm:px-12 pb-20">
          <div className="relative w-full rounded-[36px] overflow-hidden bg-white dark:bg-zinc-900 p-8 sm:p-14 shadow-xl text-center select-none border border-stone-200/90 dark:border-zinc-800">
            
            {/* Background Glows */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-64 bg-[#6F4E37]/10 dark:bg-[#6F4E37]/30 blur-[120px] pointer-events-none rounded-full" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#E6C280]/20 dark:bg-[#E6C280]/10 blur-[100px] pointer-events-none rounded-full" />
            
            <div className="relative z-10 flex flex-col items-center max-w-3xl mx-auto space-y-8">
              <div className="inline-flex items-center gap-2 bg-stone-50 dark:bg-black/50 border border-stone-200 dark:border-white/10 text-[#6F4E37] dark:text-[#E6C280] font-mono text-[10px] font-bold uppercase tracking-[0.25em] px-4 py-2 rounded-full shadow-sm dark:shadow-lg backdrop-blur-md">
                <Globe className="w-3.5 h-3.5" />
                <span>Global Collector Network</span>
              </div>
              
              <h3 className="text-4xl sm:text-5xl md:text-6xl font-light uppercase font-playfair tracking-tight text-zinc-950 dark:text-white leading-[1.1]">
                Join The Culture <br/><span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280] lowercase">circle</span>
              </h3>
              
              <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed max-w-xl">
                Direct dispatches from our global fashion archive. Unlock password-protected drop access, private runway lookbooks, and insider early access passes before general release.
              </p>
              
              <div className="pt-4 h-20 flex items-center justify-center w-full">
                {newsletterSubscribed ? (
                  <div className="bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400 px-8 py-4 rounded-2xl animate-fade-in inline-flex items-center gap-3">
                    <Check className="w-5 h-5" />
                    <span className="text-sm font-mono tracking-wider">Pass Unlocked. Welcome to the Circle.</span>
                  </div>
                ) : (
                  <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row items-center gap-2 max-w-md mx-auto animate-fade-in w-full">
                    <input 
                      type="email" 
                      value={subscriberEmail}
                      onChange={(e) => setSubscriberEmail(e.target.value)}
                      required
                      placeholder="Enter your digital destination..." 
                      className="flex-grow w-full bg-white dark:bg-white/5 border border-stone-200 dark:border-white/10 text-zinc-900 dark:text-white placeholder:text-zinc-500 px-6 py-4 rounded-2xl focus:outline-none focus:border-[#6F4E37] dark:focus:border-[#E6C280] transition-colors font-mono text-sm shadow-sm dark:shadow-none"
                    />
                    <button type="submit" className="w-full sm:w-auto bg-zinc-950 dark:bg-[#E6C280] text-white dark:text-zinc-950 px-8 py-4 rounded-2xl font-mono text-sm font-bold uppercase tracking-widest hover:bg-[#6F4E37] dark:hover:bg-white transition-colors shrink-0 cursor-pointer shadow-md dark:shadow-none flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      <span>Unlock Pass</span>
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Decorative background grid/dots */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)', backgroundSize: '32px 32px' }} />

          </div>
        </section>

      </main>
        {/* ─── PREMIUM FULL-PAGE OVERLAY ARTICLE MODAL ─── */}
      {selectedArticle && (
        <div className="fixed inset-0 z-[120] bg-white w-screen h-screen flex flex-col md:flex-row overflow-y-auto md:overflow-hidden animate-fade-in select-none">

          {/* Close Button (Floating Top Right) */}
          <button
            onClick={() => setSelectedArticle(null)}
            className="absolute top-6 right-6 z-50 w-11 h-11 rounded-full bg-zinc-950 hover:bg-[#6F4E37] text-white flex items-center justify-center transition-all duration-300 hover:rotate-90 shadow-lg cursor-pointer border-none active:scale-95"
            aria-label="Close article modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* LEFT PANEL: Hero Video / Image (Full height on desktop) */}
          <div className="w-full md:w-1/2 h-[45vh] md:h-full bg-zinc-950 relative shrink-0">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-90"
              poster={selectedArticle.image}
            >
              <source
                src={
                  selectedArticle.brand === "Guerilla Culture"
                    ? "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c054354784a17079db3b0204e3b72847&profile_id=139&oauth2_token_id=57447761"
                    : selectedArticle.brand === "Tokyo Techwear"
                      ? "https://player.vimeo.com/external/435674703.sd.mp4?s=aa1a6e5b4f2c0fc44f8e79b9087c53d0d540f2f3&profile_id=139&oauth2_token_id=57447761"
                      : "https://player.vimeo.com/external/517602120.sd.mp4?s=d762e84c16a49c4cfbe12dc8ab870c5e7b2354e4&profile_id=139&oauth2_token_id=57447761"
                }
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/20 pointer-events-none" />

            {/* Brand watermark overlay */}
            <div className="absolute bottom-8 left-8 text-white space-y-1">
              <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-[0.3em] font-bold block">
                {selectedArticle.brand} Archive
              </span>
              <span className="text-sm font-sans tracking-wider block font-light opacity-80">
                Registry ID: DH-8903-CAP
              </span>
            </div>
          </div>

          {/* RIGHT PANEL: Editorial Story Details (Scrollable on desktop) */}
          <div className="w-full md:w-1/2 h-auto md:h-full p-8 sm:p-12 md:p-16 lg:p-20 overflow-y-auto flex flex-col justify-between text-left bg-[#fcfaf7] relative border-l border-zinc-150/40">
            <div className="space-y-8 my-auto">

              {/* Category Tag pill */}
              <div className="flex items-center gap-3">
                <span className="bg-[#6F4E37]/10 text-[#6F4E37] font-mono text-[9px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full border border-[#6F4E37]/15">
                  {selectedArticle.category}
                </span>
                <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest">
                  {selectedArticle.date}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-zinc-950 dark:text-zinc-50 font-playfair leading-[1.05] uppercase">
                {selectedArticle.title.split(" ").slice(0, 3).join(" ")}{" "}
                <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280] lowercase">
                  {selectedArticle.title.split(" ").slice(3).join(" ")}
                </span>
              </h2>

              {/* Verified Clothes Ticket Badge */}
              <div className="flex items-center gap-4 bg-white border border-zinc-250/70 p-4 rounded-2xl shadow-sm">
                <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shrink-0" />
                <div className="flex-grow text-left">
                  <span className="text-[8px] font-mono text-zinc-400 tracking-wider block font-bold uppercase">AUTHENTICITY REGISTRY</span>
                  <span className="text-xs font-mono font-bold text-zinc-800">DRIPHUNTER ACCREDITED ARCHIVE</span>
                </div>
                <div className="text-right">
                  <span className="text-[8px] font-mono text-zinc-400 tracking-wider block font-bold uppercase">VALUATION TICKET</span>
                  <span className="text-sm font-mono font-bold text-[#6F4E37]">{selectedArticle.price}</span>
                </div>
              </div>

              {/* Article Content Copy */}
              <div className="space-y-5 text-xs sm:text-sm text-zinc-500 leading-relaxed font-sans font-medium">
                <p className="text-zinc-800 text-sm sm:text-base font-medium italic border-l-2 border-[#6F4E37] pl-4 py-1">
                  "{selectedArticle.excerpt}"
                </p>
                <p>
                  {selectedArticle.content}
                </p>
              </div>

            </div>

            {/* Actions Footer */}
            <div className="pt-8 border-t border-zinc-200/80 flex flex-col sm:flex-row gap-3 w-full mt-10 shrink-0">
              <button
                onClick={() => window.location.href = `/shop?brand=${encodeURIComponent(selectedArticle.brand)}`}
                className="flex-grow sm:flex-none bg-[#6F4E37] hover:bg-[#5C3D2E] text-white text-[10px] font-mono font-bold uppercase tracking-widest py-4 px-8 rounded-xl transition-all cursor-pointer border-none shadow-md active:scale-95 text-center font-sans"
              >
                Shop Brand Collection
              </button>
              <button
                onClick={() => setSelectedArticle(null)}
                className="flex-grow sm:flex-none bg-zinc-950 hover:bg-black text-white text-[10px] font-mono font-bold uppercase tracking-widest py-4 px-8 rounded-xl transition-all cursor-pointer border-none shadow-md active:scale-95 text-center font-sans"
              >
                Close Archive
              </button>
            </div>

          </div>

        </div>
      )}

      <Footer />
    </div>
  );
}
