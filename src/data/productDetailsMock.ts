export const productDetail = {
  id: "201",
  brand: "Puma",
  name: "Puma X Scuderia Ferrari Heritage Zip Sweatshirt",
  price: 7999,
  originalPrice: 14999,
  rating: 4.8,
  reviewsCount: 120,
  category: "Sweatshirts",
  description:
    "Inspired by track heritage, this Scuderia Ferrari zip-up sweatshirt combines retro motorsport styling with premium heavy-blend comfort. It features embroidered Scuderia Ferrari shield logo patches, classic Puma Cat branding, and racing red stripe accents.",
  sizes: ["S", "M", "L", "XL", "XXL"],
  colors: [
    {
      name: "Cream",
      hex: "#f5f5dc",
      images: [
        "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80",
        "https://images.unsplash.com/photo-1620799139507-2a76f79a2f4d?w=800&q=80",
        "https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?w=800&q=80",
        "https://images.unsplash.com/photo-1620799139834-6b8f844fbe61?w=800&q=80",
      ],
    },
    {
      name: "Black",
      hex: "#18181b",
      images: [
        "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80",
        "https://images.unsplash.com/photo-1620799140388-5b4e72753982?w=800&q=80",
        "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=800&q=80",
        "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80",
      ],
    },
    {
      name: "Red",
      hex: "#dc2626",
      images: [
        "https://images.unsplash.com/photo-1554568218-0f1715e72254?w=800&q=80",
        "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&q=80",
        "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&q=80",
        "https://images.unsplash.com/photo-1607345366928-199e5760f055?w=800&q=80",
      ],
    },
    {
      name: "Yellow",
      hex: "#facc15",
      images: [
        "https://images.unsplash.com/photo-1578932750294-f5075e85f44a?w=800&q=80",
        "https://images.unsplash.com/photo-1548883354-7622d03aca27?w=800&q=80",
        "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80",
        "https://images.unsplash.com/photo-1580894732444-8fecef2271ff?w=800&q=80",
      ],
    },
  ],
  specifications: [
    { label: "Fabric", value: "Premium Heavy Cotton-Poly Blend" },
    { label: "Fit", value: "Relaxed Motorsport Fit" },
    { label: "Sleeve Length", value: "Long Sleeves with Elasticized Ribbed Cuffs" },
    { label: "Collar", value: "High Neck Ribbed Bomber Collar" },
    { label: "Fastener", value: "Motorsport-grade YKK Zip Closure" },
    { label: "Co-Branding", value: "Embroidered Scuderia Ferrari Emblem & Puma Cat Logo" },
  ],
};

// ─── TRY-ON WARDROBE ITEMS ───
export const tryOnWardrobe = [
  { 
    id: "to1", 
    name: "Black Heavy Crewneck", 
    category: "Knitwear", 
    price: "₹6,299",
    image: "/images/ar_black_crewneck.jpg",
    modelImage: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=1000&q=85",
    clothCutout: "/images/ar_black_crewneck.jpg",
    fitType: "Relaxed Boxy Fit",
    tension: "0.14 kPa",
    drapeAccuracy: "99.4%"
  },
  { 
    id: "to2", 
    name: "Heather Grey Cable Knit", 
    category: "Sweater", 
    price: "₹7,499",
    image: "https://images.unsplash.com/photo-1574169208507-84376144848b?w=400&q=85",
    modelImage: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1000&q=85",
    clothCutout: "/images/ar_black_crewneck.jpg",
    fitType: "Structured Cable Knit",
    tension: "0.19 kPa",
    drapeAccuracy: "98.9%"
  },
  { 
    id: "to3", 
    name: "Ferrari Scuderia Zip Track", 
    category: "Outerwear", 
    price: "₹7,999",
    image: "/images/ar_ferrari_track.jpg",
    modelImage: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=1000&q=85",
    clothCutout: "/images/ar_ferrari_track.jpg",
    fitType: "Athletic Motorsport Fit",
    tension: "0.22 kPa",
    drapeAccuracy: "99.7%"
  },
  { 
    id: "to4", 
    name: "Cyber Technical Shell Jacket", 
    category: "Shell", 
    price: "₹10,499",
    image: "/images/ar_cyber_shell.jpg",
    modelImage: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1000&q=85",
    clothCutout: "/images/ar_cyber_shell.jpg",
    fitType: "Oversized Cyber Shell",
    tension: "0.12 kPa",
    drapeAccuracy: "98.5%"
  },
  { 
    id: "to5", 
    name: "Navy Atelier Tailored Blazer", 
    category: "Tailored", 
    price: "₹12,999",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&q=85",
    modelImage: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1000&q=85",
    clothCutout: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=85",
    fitType: "Sartorial Bespoke",
    tension: "0.18 kPa",
    drapeAccuracy: "99.1%"
  },
  { 
    id: "to6", 
    name: "Midnight Slim Formal Blazer", 
    category: "Tailored", 
    price: "₹11,499",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&q=85",
    modelImage: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=1000&q=85",
    clothCutout: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=85",
    fitType: "Slim Modern Silhouette",
    tension: "0.17 kPa",
    drapeAccuracy: "98.7%"
  },
  { 
    id: "to7", 
    name: "Grey Melange Wool Suit", 
    category: "Suiting", 
    price: "₹18,999",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&q=85",
    modelImage: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=1000&q=85",
    clothCutout: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=85",
    fitType: "Full Bespoke Fit",
    tension: "0.20 kPa",
    drapeAccuracy: "99.8%"
  },
  { 
    id: "to8", 
    name: "Champagne Silk Wrap Blouse", 
    category: "Silk", 
    price: "₹8,499",
    image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=400&q=85",
    modelImage: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=1000&q=85",
    clothCutout: "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=600&q=85",
    fitType: "Fluid Bias Draping",
    tension: "0.08 kPa",
    drapeAccuracy: "99.2%"
  },
];

// ─── MIX & MATCH ITEMS ───
export const stylingItems = [
  {
    id: "cap",
    name: "Scuderia Ferrari Cap",
    price: 1999,
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&q=80",
    color: "Red",
  },
  {
    id: "tee",
    name: "Puma Racing Shield Tee",
    price: 2499,
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=400&q=80",
    color: "White",
  },
  {
    id: "pants",
    name: "Puma Track Trousers",
    price: 4999,
    image: "https://images.unsplash.com/photo-1551854838-212c50b4c184?w=400&q=80",
    color: "Charcoal",
  },
  {
    id: "shoes",
    name: "Samba Retro Trainers",
    price: 7999,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&q=80",
    color: "Core White",
  },
];

// ─── RELATED PRODUCTS ───
export const similarProducts = [
  {
    id: "sp1",
    name: "Oversized Heavy Hoodie",
    brand: "Represent",
    price: "₹8,999",
    image: "https://images.unsplash.com/photo-1620799139507-2a76f79a2f4d?auto=format&fit=crop&w=400&q=80",
    badge: "Trending",
  },
  {
    id: "sp2",
    name: "Classic Cotton Crewneck",
    brand: "Essentials",
    price: "₹7,500",
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "sp3",
    name: "Utility Bomber Jacket",
    brand: "Acronym",
    price: "₹12,000",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "sp4",
    name: "Cream Workwear Jacket",
    brand: "Carhartt WIP",
    price: "₹11,000",
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "sp5",
    name: "Classic Crewneck Sweatshirt",
    brand: "Essentials",
    price: "₹6,999",
    image: "https://images.unsplash.com/photo-1578932750294-f5075e85f44a?auto=format&fit=crop&w=400&q=80",
    badge: "New",
  },
];

export const customerAlsoLiked = [
  {
    id: "al1",
    name: "Stock Logo Cap",
    brand: "Stüssy",
    price: "₹3,499",
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "al2",
    name: "Retro Acetate Sunglasses",
    brand: "Eyewear Co.",
    price: "₹6,999",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=360&q=80",
    badge: "Hot Buy",
  },
  {
    id: "al3",
    name: "Oversized Canvas Backpack",
    brand: "Urban Gear",
    price: "₹7,499",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=360&q=80",
  },
  {
    id: "al4",
    name: "Knit Ribbed Socks Pack",
    brand: "Essentials",
    price: "₹1,199",
    image: "https://images.unsplash.com/photo-1582966772680-860e372bb558?w=360&q=80",
  },
  {
    id: "al5",
    name: "Casual Cotton Chino Pants",
    brand: "Zara",
    price: "₹4,500",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=400&q=80",
  },
];

export const recentlyViewed = [
  {
    id: "rv1",
    name: "Motorsport Graphic Tee",
    brand: "Puma",
    price: "₹2,499",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=360&q=80",
    badge: "Best Seller",
  },
  {
    id: "rv2",
    name: "Puma Fleece Sweatpants",
    brand: "Puma",
    price: "₹3,999",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=360&q=80",
    badge: "Trending",
  },
  {
    id: "rv3",
    name: "Puma Scuderia Tech Vest",
    brand: "Puma",
    price: "₹5,499",
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=360&q=80",
  },
  {
    id: "rv4",
    name: "Puma Speedcat Pro Shoes",
    brand: "Puma",
    price: "₹12,999",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80",
    badge: "Exclusive",
  },
  {
    id: "rv5",
    name: "Unisex Street Hoodie",
    brand: "Balenciaga",
    price: "₹18,500",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=400&q=80",
  },
];

// ─── REVIEWS DATA ───
export const mockReviews = [
  {
    id: "r1",
    name: "Vikram Singh",
    rating: 5,
    title: "Incredible Quality",
    date: "July 24, 2026",
    comment: "The heavy cotton-poly fabric is super high-quality and fits exactly like premium motorsport designer pieces. The Ferrari shield patch has very dense, elegant embroidery.",
  },
  {
    id: "r2",
    name: "Anjali Mehta",
    rating: 4,
    title: "Great color but runs large",
    date: "June 18, 2026",
    comment: "Beautiful cream colorway, goes well with raw denims. Dropped one star because it fits slightly more oversized than standard sizing. I suggest going one size down.",
  },
  {
    id: "r3",
    name: "Rohit Kapoor",
    rating: 5,
    title: "Straight Fire",
    date: "May 30, 2026",
    comment: "PUMA x FERRARI collab is straight fire. Extremely comfortable, keeps you warm in summer air conditioning, and the YKK metal zipper feels heavy and authentic.",
  },
  {
    id: "r4",
    name: "Aman Desai",
    rating: 5,
    title: "Worth Every Penny",
    date: "August 12, 2026",
    comment: "Absolutely love the fit and finish. The fabric feels luxurious and the subtle branding hits just right. Worth every penny for this limited edition piece.",
  },
  {
    id: "r5",
    name: "Priya Sharma",
    rating: 4,
    title: "Fast Shipping",
    date: "September 02, 2026",
    comment: "Great quality overall. The ribbed cuffs hold up well after multiple washes. The shipping was really fast too, though the packaging was a bit plain.",
  },
  {
    id: "r6",
    name: "Karan Patel",
    rating: 5,
    title: "Best Piece Yet",
    date: "October 10, 2026",
    comment: "I own several pieces from this brand and this one might be the best yet. The drape is perfect and it feels very breathable despite being heavyweight.",
  }
];
