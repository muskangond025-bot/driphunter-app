export interface Product {
  id: string;
  title: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  hoverImage?: string;
  rating: number;
  reviewsCount: number;
  trendingScore?: number;
  isNew?: boolean;
  isLimited?: boolean;
  stockLeft?: number;
  totalStock?: number;
  dropTime?: string; // ISO string
  category: string;
  subCategory?: string;
  sizes?: string[];
  gender?: string;
  colors?: string[];
  material?: string;
  inStock?: boolean;
}

export interface Brand {
  id: string;
  name: string;
  logo: string;
  banner: string;
  description: string;
  featuredProducts: Product[];
}

export interface TaggedProduct {
  id: string;
  name: string;
  price: number;
  x: number; // percentage from left
  y: number; // percentage from top
}

export interface CommunityPost {
  id: string;
  username: string;
  userAvatar: string;
  location?: string;
  isFollowing?: boolean;
  media: string[];
  caption: string;
  likes: number;
  commentsCount: number;
  hashtags: string[];
  taggedProducts: TaggedProduct[];
}

export interface Influencer {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  bio: string;
  followers: string;
  lookImage: string;
  products: Product[];
}

export interface LiveEvent {
  id: string;
  title: string;
  date: string; // "July 15, 2026"
  time: string; // "18:00 IST"
  image: string;
  waitlistCount: number;
  isRegistered?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  rating: number;
  text: string;
  platform: "instagram" | "twitter" | "direct";
}

// --- ANNOUNCEMENT BAR ---
export const ANNOUNCEMENTS = [
  "🔥 New Drop Live Now | Free Shipping Above ₹1999",
  "⚡ Limited Edition Cargo pants pre-orders close tonight!",
  "👟 Get 10% off your first purchase. Use code: DRIP10"
];

// --- NAVIGATION LINKS ---
export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Brands", href: "/brands" },
  { label: "Explore", href: "/explore" },
  { label: "Community", href: "/explore" }
];

// --- TRENDING KEYWORDS ---
export const TRENDING_KEYWORDS = [
  "Nike Dunks",
  "Cargo Pants",
  "Oversized Tees",
  "Vintage Hoodies",
  "Streetwear Caps",
  "Skate Shoes",
  "Yeezy Boost"
];

// --- CATEGORY NAV ---
export const CATEGORY_TABS = [
  { id: "all", label: "All Items" },
  { id: "top-wear", label: "Top Wear" },
  { id: "bottom-wear", label: "Bottom Wear" },
  { id: "sneakers", label: "Sneakers" },
  { id: "accessories", label: "Accessories" },
  { id: "skate", label: "Skate" },
  { id: "limited-drops", label: "Limited Drops" }
];

// --- HERO SECTION ---
export const HERO_DATA = {
  title: "REDEFINE YOUR STREET CRED",
  subtitle: "India's premier streetwear marketplace for authentic drops, culture, and community.",
  bannerImage: "https://images.unsplash.com/photo-1509281373149-e957c6296406?q=80&w=1200&auto=format&fit=crop",
  ctas: [
    { label: "Shop the Drop", href: "/shop", variant: "primary" as const },
    { label: "Join the Club", href: "/explore", variant: "secondary" as const }
  ],
  featuredProduct: {
    name: "Air Jordan 1 Retro High 'Chicago'",
    price: 18999,
    image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=400&auto=format&fit=crop"
  },
  countdownTarget: new Date(Date.now() + 1000 * 60 * 60 * 36).toISOString() // 36 hours from now
};

// --- FEATURED CATEGORIES ---
export const FEATURED_CATEGORIES = [
  {
    title: "Hoodies",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=400&auto=format&fit=crop",
    href: "/shop?category=hoodies"
  },
  {
    title: "Cargos",
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=400&auto=format&fit=crop",
    href: "/shop?category=cargos"
  },
  {
    title: "Sneakers",
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=400&auto=format&fit=crop",
    href: "/shop?category=sneakers"
  },
  {
    title: "Tees",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=400&auto=format&fit=crop",
    href: "/shop?category=tees"
  },
  {
    title: "Caps",
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=400&auto=format&fit=crop",
    href: "/shop?category=caps"
  }
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "p1",
    title: "Vandalism Heavyweight Hoodie",
    brand: "Guerilla Culture",
    price: 3499,
    originalPrice: 4999,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=400&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1556821840-41604a112df3?q=80&w=400&auto=format&fit=crop",
    rating: 4.8,
    reviewsCount: 124,
    isNew: true,
    category: "top-wear",
    subCategory: "hoodies",
    sizes: ["S", "M", "L", "XL"],
    gender: "Unisex",
    colors: ["Charcoal", "Black"],
    material: "Heavyweight Cotton",
    inStock: true
  },
  {
    id: "p2",
    title: "Parachute Cargo Pants - Sand",
    brand: "Urban Combat",
    price: 2799,
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=400&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1517423568366-8b83523034fd?q=80&w=400&auto=format&fit=crop",
    rating: 4.6,
    reviewsCount: 89,
    trendingScore: 98,
    category: "bottom-wear",
    subCategory: "cargos",
    sizes: ["M", "L", "XL"],
    gender: "Men",
    colors: ["Sand", "Olive"],
    material: "Nylon Tech",
    inStock: true
  },
  {
    id: "p3",
    title: "Court Vision Low Sneakers",
    brand: "Nike",
    price: 5999,
    originalPrice: 7999,
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=400&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=400&auto=format&fit=crop",
    rating: 4.9,
    reviewsCount: 312,
    trendingScore: 99,
    category: "sneakers",
    subCategory: "sneakers",
    sizes: ["UK 7", "UK 8", "UK 9", "UK 10"],
    gender: "Unisex",
    colors: ["White", "Red", "Blue"],
    material: "Leather",
    inStock: true
  },
  {
    id: "p4",
    title: "Drippy Paint Splatter Tee",
    brand: "Outkast Lab",
    price: 1499,
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=400&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=400&auto=format&fit=crop",
    rating: 4.4,
    reviewsCount: 45,
    isNew: true,
    category: "top-wear",
    subCategory: "tshirts",
    sizes: ["XS", "S", "M", "L"],
    gender: "Unisex",
    colors: ["White", "Pink"],
    material: "Heavyweight Cotton",
    inStock: true
  },
  {
    id: "p5",
    title: "Graphite Skate Cap",
    brand: "DripHunter Originals",
    price: 999,
    originalPrice: 1499,
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=400&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1521369909029-2afed882baee?q=80&w=400&auto=format&fit=crop",
    rating: 4.5,
    reviewsCount: 67,
    category: "accessories",
    subCategory: "headwear",
    sizes: ["Free Size"],
    gender: "Unisex",
    colors: ["Charcoal"],
    material: "Heavyweight Cotton",
    inStock: true
  },
  {
    id: "p6",
    title: "Limited Drop: Cyberpunk Windbreaker",
    brand: "Tokyo Techwear",
    price: 6499,
    originalPrice: 8999,
    image: "https://images.unsplash.com/photo-1548883354-7622d03aca27?q=80&w=400&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=400&auto=format&fit=crop",
    rating: 4.9,
    reviewsCount: 18,
    isLimited: true,
    stockLeft: 3,
    totalStock: 50,
    dropTime: new Date(Date.now() + 1000 * 60 * 120).toISOString(),
    category: "limited-drops",
    subCategory: "clothing",
    sizes: ["M", "L", "XL"],
    gender: "Men",
    colors: ["Black"],
    material: "Nylon Tech",
    inStock: true
  },
  {
    id: "p7",
    title: "Outlaw Skate Deck V2",
    brand: "Element Streetwear",
    price: 4299,
    image: "https://images.unsplash.com/photo-1547447134-cd3f5c716030?q=80&w=400&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1520045892732-304bc3ac5d8e?q=80&w=400&auto=format&fit=crop",
    rating: 4.7,
    reviewsCount: 34,
    category: "skate",
    subCategory: "skateboards",
    sizes: ["8.0", "8.25"],
    gender: "Unisex",
    colors: ["Charcoal"],
    material: "Maple Wood",
    inStock: true
  },
  {
    id: "p8",
    title: "Retro Canvas Utility Bag",
    brand: "Guerilla Culture",
    price: 1999,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=400&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=400&auto=format&fit=crop",
    rating: 4.6,
    reviewsCount: 52,
    category: "accessories",
    subCategory: "backpacks",
    sizes: ["One Size"],
    gender: "Unisex",
    colors: ["Black"],
    material: "Canvas",
    inStock: true
  },
  {
    id: "p9",
    title: "Oversized Corduroy Button-Up Shirt",
    brand: "Zara",
    price: 3299,
    originalPrice: 4299,
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=400&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=400&auto=format&fit=crop",
    rating: 4.7,
    reviewsCount: 41,
    category: "top-wear",
    subCategory: "shirts",
    sizes: ["S", "M", "L", "XL"],
    gender: "Men",
    colors: ["Olive", "Charcoal"],
    material: "Corduroy",
    inStock: true
  },
  {
    id: "p10",
    title: "Retro Plaid Flannel Shirt",
    brand: "Guerilla Culture",
    price: 2499,
    image: "https://images.unsplash.com/photo-1589310243389-96a5483213a8?q=80&w=400&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=400&auto=format&fit=crop",
    rating: 4.5,
    reviewsCount: 29,
    category: "top-wear",
    subCategory: "shirts",
    sizes: ["M", "L", "XL"],
    gender: "Unisex",
    colors: ["Red", "Charcoal"],
    material: "Heavyweight Cotton",
    inStock: true
  },
  {
    id: "p11",
    title: "Dark Mode Cyber Sunglasses",
    brand: "Tokyo Techwear",
    price: 1899,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=400&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1508296695146-257a814070b4?q=80&w=400&auto=format&fit=crop",
    rating: 4.8,
    reviewsCount: 15,
    category: "accessories",
    subCategory: "eyewear",
    sizes: ["Free Size"],
    gender: "Unisex",
    colors: ["Black"],
    material: "Acetate",
    inStock: true
  },
  {
    id: "p12",
    title: "Minimalist Leather Cardholder Wallet",
    brand: "Zara",
    price: 1299,
    image: "https://drip-hunter.vercel.app/images/urban-essentials/bifold_wallet.png",
    hoverImage: "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=400&auto=format&fit=crop",
    rating: 4.4,
    reviewsCount: 22,
    category: "accessories",
    subCategory: "wallets",
    sizes: ["One Size"],
    gender: "Unisex",
    colors: ["Black", "Sand"],
    material: "Leather",
    inStock: true
  },
  {
    id: "p13",
    title: "3XL Distressed Runner Sneakers",
    brand: "Balenciaga",
    price: 12999,
    originalPrice: 16999,
    image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80",
    hoverImage: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    reviewsCount: 68,
    isLimited: true,
    category: "sneakers",
    subCategory: "sneakers",
    sizes: ["UK 7", "UK 8", "UK 9", "UK 10"],
    gender: "Unisex",
    colors: ["Charcoal", "Sand"],
    material: "Mesh & Synthetic",
    inStock: true
  },
  {
    id: "p14",
    title: "Tape Type Oversized Boxy T-Shirt",
    brand: "Balenciaga",
    price: 4999,
    originalPrice: 6999,
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80",
    hoverImage: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    reviewsCount: 42,
    isNew: true,
    category: "top-wear",
    subCategory: "tshirts",
    sizes: ["XS", "S", "M", "L", "XL"],
    gender: "Unisex",
    colors: ["Charcoal", "White"],
    material: "450 GSM Heavy Cotton",
    inStock: true
  },
  {
    id: "p15",
    title: "Owners Club Heavyweight Zip Hoodie",
    brand: "Represent",
    price: 3899,
    originalPrice: 5499,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80",
    hoverImage: "https://images.unsplash.com/photo-1556821840-41604a112df3?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    reviewsCount: 114,
    trendingScore: 97,
    category: "top-wear",
    subCategory: "hoodies",
    sizes: ["S", "M", "L", "XL"],
    gender: "Unisex",
    colors: ["Charcoal", "Olive", "Sand"],
    material: "480 GSM French Terry",
    inStock: true
  },
  {
    id: "p16",
    title: "Reptor Low Vintage Skate Sneaker",
    brand: "Represent",
    price: 8499,
    originalPrice: 11200,
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80",
    hoverImage: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    reviewsCount: 56,
    category: "sneakers",
    subCategory: "sneakers",
    sizes: ["UK 7", "UK 8", "UK 9", "UK 10"],
    gender: "Unisex",
    colors: ["White", "Charcoal"],
    material: "Italian Calf Leather",
    inStock: true
  },
  {
    id: "p17",
    title: "8-Ball Brushed Mohair Cardigan",
    brand: "Stüssy",
    price: 6499,
    originalPrice: 8999,
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
    hoverImage: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    reviewsCount: 88,
    isLimited: true,
    category: "top-wear",
    subCategory: "shirts",
    sizes: ["S", "M", "L", "XL"],
    gender: "Unisex",
    colors: ["Olive", "Charcoal"],
    material: "Mohair Wool Blend",
    inStock: true
  },
  {
    id: "p18",
    title: "World Tour Heavyweight Graphic Tee",
    brand: "Stüssy",
    price: 2499,
    originalPrice: 3499,
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80",
    hoverImage: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    reviewsCount: 92,
    category: "top-wear",
    subCategory: "tshirts",
    sizes: ["XS", "S", "M", "L", "XL"],
    gender: "Unisex",
    colors: ["White", "Charcoal"],
    material: "100% Combed Cotton",
    inStock: true
  },
  {
    id: "p19",
    title: "Fleece Relaxed Pullover Hoodie",
    brand: "Fear of God Essentials",
    price: 4299,
    originalPrice: 5999,
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80",
    hoverImage: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    reviewsCount: 130,
    category: "top-wear",
    subCategory: "hoodies",
    sizes: ["S", "M", "L", "XL"],
    gender: "Unisex",
    colors: ["Sand", "Charcoal", "Olive"],
    material: "Heavy Core Fleece",
    inStock: true
  },
  {
    id: "p20",
    title: "Diagonal Arrow Heavy Cotton Hoodie",
    brand: "Off-White",
    price: 7999,
    originalPrice: 11000,
    image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=800&q=80",
    hoverImage: "https://images.unsplash.com/photo-1549880712-912b9a50b73a?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    reviewsCount: 75,
    isLimited: true,
    category: "top-wear",
    subCategory: "hoodies",
    sizes: ["S", "M", "L", "XL"],
    gender: "Unisex",
    colors: ["Charcoal", "White"],
    material: "French Terry Cotton",
    inStock: true
  },
  {
    id: "p21",
    title: "Box Logo Embroidered Crewneck",
    brand: "Supreme",
    price: 5999,
    originalPrice: 8500,
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
    hoverImage: "https://images.unsplash.com/photo-1517423568366-8b83523034fd?auto=format&fit=crop&w=800&q=80",
    rating: 5.0,
    reviewsCount: 148,
    isLimited: true,
    category: "top-wear",
    subCategory: "sweatshirts",
    sizes: ["S", "M", "L", "XL"],
    gender: "Unisex",
    colors: ["Charcoal", "Red"],
    material: "Crossgrain Fleece",
    inStock: true
  },
  {
    id: "p22",
    title: "Shark Full-Zip ABC Camo Hoodie",
    brand: "A Bathing Ape (BAPE)",
    price: 8999,
    originalPrice: 12500,
    image: "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=800&q=80",
    hoverImage: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    reviewsCount: 95,
    isLimited: true,
    category: "top-wear",
    subCategory: "hoodies",
    sizes: ["S", "M", "L", "XL"],
    gender: "Unisex",
    colors: ["Olive", "Charcoal"],
    material: "Heavyweight Jersey",
    inStock: true
  },
  {
    id: "p23",
    title: "Tri-Ferg Reflective Heavy Hoodie",
    brand: "Palace",
    price: 5299,
    originalPrice: 7200,
    image: "https://images.unsplash.com/photo-1544923246-77307dd654cb?auto=format&fit=crop&w=800&q=80",
    hoverImage: "https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    reviewsCount: 62,
    category: "top-wear",
    subCategory: "hoodies",
    sizes: ["M", "L", "XL"],
    gender: "Unisex",
    colors: ["Charcoal", "Sand"],
    material: "Heavyweight Cotton",
    inStock: true
  },
  {
    id: "p24",
    title: "Archival Boxy Drop-Shoulder Hoodie",
    brand: "DripHunter Originals",
    price: 2999,
    originalPrice: 4200,
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80",
    hoverImage: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    reviewsCount: 88,
    isNew: true,
    category: "top-wear",
    subCategory: "hoodies",
    sizes: ["S", "M", "L", "XL"],
    gender: "Unisex",
    colors: ["Charcoal", "Sand", "Olive"],
    material: "450 GSM Loopback",
    inStock: true
  }
];

// --- LIMITED DROPS ---
export const LIMITED_DROPS: Product[] = [
  {
    id: "drop-1",
    title: "Phantom Black Tech Shield Jacket",
    brand: "Hexa Combat",
    price: 8999,
    originalPrice: 12000,
    image: "https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=400&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?q=80&w=400&auto=format&fit=crop",
    rating: 5.0,
    reviewsCount: 8,
    isLimited: true,
    stockLeft: 5,
    totalStock: 30,
    dropTime: new Date(Date.now() + 1000 * 60 * 60 * 4).toISOString(), // 4 hours from now
    category: "limited-drops"
  },
  {
    id: "drop-2",
    title: "DripHunter Neon Cyber-Sneakers",
    brand: "Neo-Step",
    price: 14500,
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=400&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=400&auto=format&fit=crop",
    rating: 4.9,
    reviewsCount: 15,
    isLimited: true,
    stockLeft: 2,
    totalStock: 25,
    dropTime: new Date(Date.now() + 1000 * 60 * 60 * 18).toISOString(), // 18 hours from now
    category: "limited-drops"
  }
];

// --- DEAL OF THE DAY ---
export const DEAL_OF_THE_DAY = {
  product: {
    id: "deal-1",
    title: "Oversized Acid-Wash Denim Jacket",
    brand: "Vandalism Supply",
    price: 2499,
    originalPrice: 4999,
    image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=600&auto=format&fit=crop",
    rating: 4.7,
    reviewsCount: 142,
    category: "top-wear"
  },
  countdownTarget: new Date(Date.now() + 1000 * 60 * 60 * 12).toISOString() // 12 hours from now
};

// --- BRANDS SHOWCASE ---
export const BRANDS_DATA: Brand[] = [
  {
    id: "b1",
    name: "Guerilla Culture",
    logo: "GC",
    banner: "https://images.unsplash.com/photo-1549880712-912b9a50b73a?q=80&w=600&auto=format&fit=crop",
    description: "Anti-establishment streetwear made in India.",
    featuredProducts: [MOCK_PRODUCTS[0], MOCK_PRODUCTS[7]]
  },
  {
    id: "b2",
    name: "Tokyo Techwear",
    logo: "TT",
    banner: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=600&auto=format&fit=crop",
    description: "Highly functional modular cyberpunk street garments.",
    featuredProducts: [MOCK_PRODUCTS[5]]
  },
  {
    id: "b3",
    name: "Outkast Lab",
    logo: "OL",
    banner: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=600&auto=format&fit=crop",
    description: "Experimental colors and paint effects for everyday wear.",
    featuredProducts: [MOCK_PRODUCTS[3]]
  }
];

// --- COMMUNITY FEED ---
export const MOCK_COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: "post-1",
    username: "yash_drips",
    userAvatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=150&auto=format&fit=crop",
    location: "Mumbai, India",
    isFollowing: true,
    media: ["https://images.unsplash.com/photo-1488161628813-04466f872be2?q=80&w=600&auto=format&fit=crop"],
    caption: "Feeling the summer breeze with these oversized fits. Simple colors, heavy weight. 🔥 #OOTD #Streetwear #SummerFits",
    likes: 342,
    commentsCount: 28,
    hashtags: ["#OOTD", "#Streetwear", "#SummerFits"],
    taggedProducts: [
      { id: "p1", name: "Vandalism Heavyweight Hoodie", price: 3499, x: 50, y: 35 },
      { id: "p2", name: "Parachute Cargo Pants - Sand", price: 2799, x: 55, y: 70 }
    ]
  },
  {
    id: "post-2",
    username: "neha_sneaks",
    userAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
    location: "Pune, India",
    isFollowing: false,
    media: ["https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600&auto=format&fit=crop"],
    caption: "Court Vision Low Sneakers just came in! Goes perfectly with the sand cargos. Rate this fit! 👟 #Nike #Sneakers #CargoFit",
    likes: 512,
    commentsCount: 42,
    hashtags: ["#Nike", "#Sneakers", "#CargoFit"],
    taggedProducts: [
      { id: "p3", name: "Court Vision Low Sneakers", price: 5999, x: 50, y: 85 },
      { id: "p2", name: "Parachute Cargo Pants - Sand", price: 2799, x: 48, y: 55 }
    ]
  }
];

// --- INFLUENCER PICKS ---
export const MOCK_INFLUENCER_PICKS: Influencer[] = [
  {
    id: "inf-1",
    name: "Kabir Mehta",
    handle: "kabir_drips",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
    bio: "Street photographer and techwear pioneer in Delhi.",
    followers: "125K",
    lookImage: "https://images.unsplash.com/photo-1509281373149-e957c6296406?q=80&w=600&auto=format&fit=crop",
    products: [MOCK_PRODUCTS[0], MOCK_PRODUCTS[1], MOCK_PRODUCTS[4]]
  }
];

// --- LIVE DROPS & EVENTS ---
export const MOCK_EVENTS: LiveEvent[] = [
  {
    id: "ev-1",
    title: "Midnight Tokyo Tech Drop",
    date: "July 04, 2026",
    time: "00:00 IST",
    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=600&auto=format&fit=crop",
    waitlistCount: 2405,
    isRegistered: false
  },
  {
    id: "ev-2",
    title: "Retro Skate Deck Auction",
    date: "July 12, 2026",
    time: "17:00 IST",
    image: "https://images.unsplash.com/photo-1547447134-cd3f5c716030?q=80&w=600&auto=format&fit=crop",
    waitlistCount: 1102,
    isRegistered: true
  }
];

// --- SOCIAL PROOF & TESTIMONIALS ---
export const MOCK_TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Aman Sen",
    handle: "@aman_ootd",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop",
    rating: 5,
    text: "Received my Nike Dunks in 3 days. Legit checked and authentic. DripHunter is my new go-to app!",
    platform: "twitter"
  },
  {
    id: "t2",
    name: "Riya Sharma",
    handle: "@riya_sneaks",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop",
    rating: 5,
    text: "The community feed is so useful. I found this outfit layout, clicked buy look, and it was here within a week. Outstanding UX!",
    platform: "instagram"
  },
  {
    id: "t3",
    name: "Vikram Roy",
    handle: "@vikram_street",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop",
    rating: 4,
    text: "Got pre-order Tech Windbreaker. The stock progress bar is crazy helpful for buying limited items.",
    platform: "direct"
  }
];

// --- ATELIERS (BRAND DIRECTORY) ---
export interface BrandItem {
  id: string;
  name: string;
  slug: string;
  category: "luxury" | "underground" | "heritage" | "techwear" | "footwear";
  country: string;
  city: string;
  founded: string;
  itemCount: number;
  featured: boolean;
  tagline: string;
  description: string;
  bannerImage: string;
  popularStyles: string[];
}

export const BRANDS_DIRECTORY: BrandItem[] = [
  {
    id: "represent",
    name: "Represent",
    slug: "represent",
    category: "luxury",
    country: "UK",
    city: "Manchester",
    founded: "2011",
    itemCount: 124,
    featured: true,
    tagline: "British luxury streetwear fusing bespoke denim with vintage graphics.",
    description: "High-grade heavyweight jersey cotton, proprietary washes, and meticulously designed oversized cuts.",
    bannerImage: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1000&q=80",
    popularStyles: ["Owners Club Hoodie", "Reptor Low Sneaker", "Alpha Cargo Pants"]
  },
  {
    id: "stussy",
    name: "Stüssy",
    slug: "stussy",
    category: "heritage",
    country: "USA",
    city: "Laguna Beach",
    founded: "1980",
    itemCount: 88,
    featured: true,
    tagline: "The quintessential pioneer of global skate, surf, and streetwear culture.",
    description: "Iconic 8-ball graphics, textured knitwear, work jackets, and relaxed casual silhouettes.",
    bannerImage: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80",
    popularStyles: ["8-Ball Mohair Cardigan", "World Tour Tee", "Canvas Chore Jacket"]
  },
  {
    id: "fear-of-god",
    name: "Fear of God Essentials",
    slug: "fear of god",
    category: "luxury",
    country: "USA",
    city: "Los Angeles",
    founded: "2013",
    itemCount: 65,
    featured: true,
    tagline: "Monochromatic luxury minimalism and architectural oversized drape.",
    description: "Jerry Lorenzo's masterclass in muted earth tones, heavyweight fleece, and elevated casual staples.",
    bannerImage: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80",
    popularStyles: ["Fleece Pullover Hoodie", "Running Short", "Relaxed Sweatpant"]
  },
  {
    id: "off-white",
    name: "Off-White",
    slug: "off-white",
    category: "luxury",
    country: "Italy",
    city: "Milan",
    founded: "2012",
    itemCount: 94,
    featured: true,
    tagline: "Defining the grey area between black and white as the color Off-White.",
    description: "Virgil Abloh's signature quotation marks, diagonal stripes, industrial belts, and zip-tie hardware.",
    bannerImage: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=1000&q=80",
    popularStyles: ["Diag Arrow Hoodie", "Out Of Office Sneaker", "Industrial Belt"]
  },
  {
    id: "guerilla-culture",
    name: "Guerilla Culture",
    slug: "guerilla culture",
    category: "underground",
    country: "India",
    city: "Mumbai",
    founded: "2021",
    itemCount: 38,
    featured: true,
    tagline: "Anti-establishment Indian streetwear crafted for dystopian urban streets.",
    description: "320+ GSM custom milled french terry, raw-edge distressing, and subversive screenprints.",
    bannerImage: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80",
    popularStyles: ["Vandalism Heavyweight Hoodie", "Parachute Cargos", "Acid Wash Boxy Tee"]
  },
  {
    id: "balenciaga",
    name: "Balenciaga",
    slug: "balenciaga",
    category: "luxury",
    country: "France",
    city: "Paris",
    founded: "1919",
    itemCount: 46,
    featured: true,
    tagline: "Avant-garde disproportionate silhouettes and disruptive high fashion.",
    description: "Exaggerated shoulder pads, cocoon parkas, distressed sneakers, and runway conceptual statements.",
    bannerImage: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1000&q=80",
    popularStyles: ["3XL Trainer", "Tape Type T-Shirt", "Destroyed Denim Jacket"]
  },
  {
    id: "supreme",
    name: "Supreme",
    slug: "supreme",
    category: "heritage",
    country: "USA",
    city: "New York",
    founded: "1994",
    itemCount: 112,
    featured: false,
    tagline: "Downtown Manhattan skate roots grown into global cultural currency.",
    description: "Box logo collectibles, artist collaborations, heavyweight outerwear, and limited weekly drop grails.",
    bannerImage: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80",
    popularStyles: ["Box Logo Crewneck", "GORE-TEX Parka", "Camp Cap"]
  },
  {
    id: "nike-jordan",
    name: "Nike / Jordan",
    slug: "nike",
    category: "footwear",
    country: "USA",
    city: "Beaverton",
    founded: "1964",
    itemCount: 240,
    featured: true,
    tagline: "Unrivaled athletic heritage, Air technology, and legendary retro sneaker archives.",
    description: "The gold standard in sneaker culture—from OG Jordan 1s to Travis Scott collaborations and Dunks.",
    bannerImage: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1000&q=80",
    popularStyles: ["Air Jordan 1 High OG", "Dunk Low Retro", "Air Max 95 OG"]
  },
  {
    id: "tokyo-techwear",
    name: "Tokyo Techwear",
    slug: "tokyo techwear",
    category: "techwear",
    country: "Japan",
    city: "Tokyo",
    founded: "2019",
    itemCount: 29,
    featured: false,
    tagline: "Highly functional modular cyberpunk street garments engineered for weather resistance.",
    description: "Waterproof ripstop membranes, FIDLOCK magnetic buckles, and transformable cargo architectures.",
    bannerImage: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1000&q=80",
    popularStyles: ["Modular Shell Jacket", "Tactical Harness Vest", "Waterproof Cargo Pants"]
  },
  {
    id: "outkast-lab",
    name: "Outkast Lab",
    slug: "outkast lab",
    category: "underground",
    country: "India",
    city: "New Delhi",
    founded: "2022",
    itemCount: 44,
    featured: false,
    tagline: "Experimental pigments, paint splatter effects, and wearable modern art.",
    description: "Hand-finished garment dye washes, raw edges, and limited edition Indian designer capsules.",
    bannerImage: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1000&q=80",
    popularStyles: ["Splatter Boxy Tee", "Bleached Utility Vest", "Overdyed Sweatshirt"]
  },
  {
    id: "bape",
    name: "A Bathing Ape (BAPE)",
    slug: "bape",
    category: "heritage",
    country: "Japan",
    city: "Harajuku",
    founded: "1993",
    itemCount: 78,
    featured: false,
    tagline: "The cornerstone of Harajuku streetwear culture with iconic ABC camo prints.",
    description: "NIGO's legendary shark full-zip hoodies, BAPESTA sneakers, and bold camouflage patterns.",
    bannerImage: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80",
    popularStyles: ["Shark Full-Zip Hoodie", "BAPESTA Low", "College Tee"]
  },
  {
    id: "palace",
    name: "Palace",
    slug: "palace",
    category: "heritage",
    country: "UK",
    city: "London",
    founded: "2009",
    itemCount: 56,
    featured: false,
    tagline: "Irreverent British skate attitude, Tri-Ferg branding, and technical sportswear.",
    description: "Vintage 90s football aesthetics, weatherproof GORE-TEX collaborations, and witty British graphics.",
    bannerImage: "https://images.unsplash.com/photo-1544923246-77307dd654cb?auto=format&fit=crop&w=1000&q=80",
    popularStyles: ["Tri-Ferg Hood", "Palace Jeans Jacket", "Track Top"]
  },
  {
    id: "drip-originals",
    name: "DripHunter Originals",
    slug: "driphunter originals",
    category: "underground",
    country: "India",
    city: "Bangalore",
    founded: "2024",
    itemCount: 52,
    featured: true,
    tagline: "In-house archival silhouettes engineered from 450+ GSM loopback cotton.",
    description: "Minimalist typography, structured dropped shoulders, and garment-washed heavyweight pieces.",
    bannerImage: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=80",
    popularStyles: ["Archival Boxy Hoodie", "Raw Seam Sweatpants", "Monochrome Cap"]
  },
  {
    id: "element",
    name: "Element Streetwear",
    slug: "element streetwear",
    category: "heritage",
    country: "USA",
    city: "San Francisco",
    founded: "1992",
    itemCount: 34,
    featured: false,
    tagline: "Rooted in eco-conscious skateboard heritage and outdoor exploration apparel.",
    description: "Durable canvas jackets, graphic skate decks, flannel overshirts, and utility headwear.",
    bannerImage: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80",
    popularStyles: ["Timber Heavy Flannel", "Skate Parka", "Durable Canvas Pants"]
  },
  {
    id: "acne-studios",
    name: "Acne Studios",
    slug: "acne studios",
    category: "luxury",
    country: "Sweden",
    city: "Stockholm",
    founded: "1996",
    itemCount: 45,
    featured: false,
    tagline: "Multidisciplinary luxury fashion house with an eclectic approach.",
    description: "Known for signature denim, distinctive face motifs, and oversized knitwear that blends photography, art, and contemporary culture.",
    bannerImage: "https://images.unsplash.com/photo-1523381294911-8d3cead13475?auto=format&fit=crop&w=1000&q=80",
    popularStyles: ["Face Motif Beanie", "River Indigo Denim", "Oversized Wool Scarf"]
  },
  {
    id: "a-cold-wall",
    name: "A-COLD-WALL*",
    slug: "a cold wall",
    category: "techwear",
    country: "UK",
    city: "London",
    founded: "2015",
    itemCount: 32,
    featured: false,
    tagline: "Industrial design language meeting bespoke tailoring.",
    description: "Samuel Ross's exploration of British working-class uniforms, brutalist architecture, and asymmetric technical fabrics.",
    bannerImage: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=1000&q=80",
    popularStyles: ["Puffer Zip Jacket", "Corbusier Pants", "Bracket Logo Tee"]
  },
  {
    id: "aime-leon-dore",
    name: "Aimé Leon Dore",
    slug: "aime leon dore",
    category: "heritage",
    country: "USA",
    city: "New York",
    founded: "2014",
    itemCount: 55,
    featured: false,
    tagline: "Nostalgic Queens, NY aesthetic blended with elevated prep.",
    description: "Rich color palettes, tailored streetwear, New Balance collaborations, and a strong focus on 90s basketball and hip-hop culture.",
    bannerImage: "https://images.unsplash.com/photo-1520045892732-304bc3ac5d8e?auto=format&fit=crop&w=1000&q=80",
    popularStyles: ["ALD 550 Sneaker", "Uniform Sweatpants", "Crest Logo Hoodie"]
  },
  {
    id: "billionaire-boys-club",
    name: "Billionaire Boys Club",
    slug: "billionaire boys club",
    category: "heritage",
    country: "USA",
    city: "Miami",
    founded: "2003",
    itemCount: 88,
    featured: false,
    tagline: "Wealth is of the heart and mind, not the pocket.",
    description: "Pharrell Williams & NIGO's brainchild, famous for the astronaut logo, bright space-themed graphics, and ICECREAM skate line.",
    bannerImage: "https://images.unsplash.com/photo-1517423568366-8b83523034fd?auto=format&fit=crop&w=1000&q=80",
    popularStyles: ["Astronaut Helmet Tee", "ICECREAM Running Dog Jeans", "Space Camo Hoodie"]
  },
  {
    id: "carhartt-wip",
    name: "Carhartt WIP",
    slug: "carhartt wip",
    category: "heritage",
    country: "Germany",
    city: "Weil am Rhein",
    founded: "1989",
    itemCount: 120,
    featured: false,
    tagline: "American heritage workwear refined for the European underground.",
    description: "Extremely durable duck canvas, double-knee trousers, and the iconic Detroit jacket embraced by skate and hip-hop scenes globally.",
    bannerImage: "https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?auto=format&fit=crop&w=1000&q=80",
    popularStyles: ["Detroit Jacket", "Double Knee Pant", "Watch Hat Beanie"]
  },
  {
    id: "cactus-plant-flea-market",
    name: "Cactus Plant Flea Market",
    slug: "cpfm",
    category: "underground",
    country: "USA",
    city: "Los Angeles",
    founded: "2015",
    itemCount: 18,
    featured: false,
    tagline: "Eccentric, playful, and highly elusive puff-print graphics.",
    description: "Cynthia Lu's mysterious label known for its DIY aesthetic, smiley face motifs, and highly sought-after Nike collaborations.",
    bannerImage: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1000&q=80",
    popularStyles: ["Ye Must Be Born Again Hoodie", "CPFM Vapormax", "Smiley Socks"]
  },
  {
    id: "chrome-hearts",
    name: "Chrome Hearts",
    slug: "chrome-hearts",
    category: "luxury",
    country: "USA",
    city: "Los Angeles",
    founded: "1988",
    itemCount: 42,
    featured: false,
    tagline: "Gothic luxury biker culture and heavy sterling silver hardware.",
    description: "Extremely exclusive silver jewelry, leather goods, and premium apparel adorned with crosses and daggers.",
    bannerImage: "https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?auto=format&fit=crop&w=1000&q=80",
    popularStyles: ["Cemetery Cross Ring", "Matty Boy Hoodie", "Leather Cross Patch Denim"]
  },
  {
    id: "dior-men",
    name: "Dior Men",
    slug: "dior-men",
    category: "luxury",
    country: "France",
    city: "Paris",
    founded: "1946",
    itemCount: 65,
    featured: false,
    tagline: "Haute couture elegance infused with modern streetwear sensibilities.",
    description: "Under Kim Jones, Dior has bridged the gap between Parisian luxury tailoring and global street culture, notably collaborating with Jordan Brand and Stussy.",
    bannerImage: "https://images.unsplash.com/photo-1520045892732-304bc3ac5d8e?auto=format&fit=crop&w=1000&q=80",
    popularStyles: ["Air Dior 1", "Oblique Saddle Bag", "B23 High Top"]
  },
  {
    id: "dr-martens",
    name: "Dr. Martens",
    slug: "dr-martens",
    category: "footwear",
    country: "UK",
    city: "Wollaston",
    founded: "1947",
    itemCount: 95,
    featured: false,
    tagline: "The footwear of punk, grunge, and rebellious youth culture.",
    description: "Indestructible leather boots and oxfords with signature yellow stitching and air-cushioned soles.",
    bannerImage: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=1000&q=80",
    popularStyles: ["1460 Boot", "1461 Oxford", "Jadon Platform"]
  },
  {
    id: "essentials",
    name: "Essentials (Fear of God)",
    slug: "essentials",
    category: "heritage",
    country: "USA",
    city: "Los Angeles",
    founded: "2018",
    itemCount: 110,
    featured: false,
    tagline: "Accessible luxury lounge wear defined by muted earth tones.",
    description: "Jerry Lorenzo's diffusion line offering premium heavyweight basics, dropped shoulders, and subtle silicone branding.",
    bannerImage: "https://images.unsplash.com/photo-1523381294911-8d3cead13475?auto=format&fit=crop&w=1000&q=80",
    popularStyles: ["Knit Hoodie", "Fleece Sweatpants", "Boxy T-Shirt"]
  },
  {
    id: "evisu",
    name: "Evisu",
    slug: "evisu",
    category: "heritage",
    country: "Japan",
    city: "Osaka",
    founded: "1991",
    itemCount: 45,
    featured: false,
    tagline: "Premium Japanese selvedge denim featuring the iconic seagull paint.",
    description: "A pioneer of the Osaka 5, bringing vintage loom denim and extravagant painted graphics to global streetwear.",
    bannerImage: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=1000&q=80",
    popularStyles: ["Daicock Denim", "Seagull Print Jacket", "Multi-Pocket Jeans"]
  },
  {
    id: "new-balance",
    name: "New Balance",
    slug: "new-balance",
    category: "footwear",
    country: "USA",
    city: "Boston",
    founded: "1906",
    itemCount: 180,
    featured: false,
    tagline: "Worn by supermodels in London and dads in Ohio.",
    description: "Premium suede runners and heritage dad shoes that have dominated recent sneaker culture through masterful collaborations.",
    bannerImage: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80",
    popularStyles: ["990v3 Made in USA", "550 Basketball Oxford", "2002R Protection Pack"]
  },
  {
    id: "needles",
    name: "Needles",
    slug: "needles",
    category: "techwear",
    country: "Japan",
    city: "Tokyo",
    founded: "1997",
    itemCount: 40,
    featured: false,
    tagline: "Reconstructed vintage Americana meets Japanese avant-garde.",
    description: "Keizo Shimizu's label famous for its 7-cut flannel shirts and immensely popular butterfly-logo tracksuits.",
    bannerImage: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=80",
    popularStyles: ["Poly Smooth Track Pants", "Rebuild 7-Cut Flannel", "Mohair Cardigan"]
  },
  {
    id: "oakley",
    name: "Oakley",
    slug: "oakley",
    category: "techwear",
    country: "USA",
    city: "Lake Forest",
    founded: "1975",
    itemCount: 50,
    featured: false,
    tagline: "High-performance optics embraced by the 2000s techwear revival.",
    description: "Futuristic sunglasses and technical outdoor gear that have transitioned from extreme sports to high fashion runways.",
    bannerImage: "https://images.unsplash.com/photo-1544923246-77307dd654cb?auto=format&fit=crop&w=1000&q=80",
    popularStyles: ["Radar EV Path", "Flesh Sandal", "Eye Jacket Redux"]
  },
  {
    id: "prada-linea-rossa",
    name: "Prada Linea Rossa",
    slug: "prada-linea-rossa",
    category: "luxury",
    country: "Italy",
    city: "Milan",
    founded: "1997",
    itemCount: 38,
    featured: false,
    tagline: "Minimalist Italian sportswear defined by the iconic red stripe.",
    description: "High-tech materials, nylon gabardine, and futuristic silhouettes that defined late 90s luxury streetwear.",
    bannerImage: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80",
    popularStyles: ["America's Cup Sneaker", "Nylon Bucket Hat", "Red Stripe Track Jacket"]
  },
  {
    id: "patta",
    name: "Patta",
    slug: "patta",
    category: "heritage",
    country: "Netherlands",
    city: "Amsterdam",
    founded: "2004",
    itemCount: 45,
    featured: false,
    tagline: "Amsterdam's finest, bridging hip-hop culture with European sportswear.",
    description: "Started as a sneaker boutique, now a globally respected brand known for graphic tees, tracksuits, and historic Air Max 1 collaborations.",
    bannerImage: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1000&q=80",
    popularStyles: ["Air Max 1 Waves", "Script Logo Tee", "Basic Tracksuit"]
  },
  {
    id: "stone-island",
    name: "Stone Island",
    slug: "stone-island",
    category: "techwear",
    country: "Italy",
    city: "Ravarino",
    founded: "1982",
    itemCount: 85,
    featured: false,
    tagline: "Relentless fabric research and experimental dyeing techniques.",
    description: "The compass badge represents the apex of utilitarian outerwear, embraced by football casuals, grime artists, and high fashion alike.",
    bannerImage: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1000&q=80",
    popularStyles: ["Nylon Metal Watro", "Crinkle Reps Down Jacket", "Garment Dyed Cargo"]
  },
  {
    id: "the-north-face",
    name: "The North Face",
    slug: "the-north-face",
    category: "techwear",
    country: "USA",
    city: "San Francisco",
    founded: "1966",
    itemCount: 160,
    featured: false,
    tagline: "Extreme alpine exploration gear adopted by urban concrete jungles.",
    description: "From Everest to New York winters, the Nuptse and Mountain jackets have become indestructible staples of streetwear history.",
    bannerImage: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1000&q=80",
    popularStyles: ["1996 Retro Nuptse", "Mountain Light Jacket", "Base Camp Duffel"]
  },
  {
    id: "travis-scott",
    name: "Travis Scott (Cactus Jack)",
    slug: "cactus-jack",
    category: "underground",
    country: "USA",
    city: "Houston",
    founded: "2017",
    itemCount: 60,
    featured: false,
    tagline: "Psychedelic rodeo aesthetics and the most coveted sneakers of a generation.",
    description: "Earth tones, reverse swooshes, and heavy merchandising that has completely disrupted the modern hype economy.",
    bannerImage: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80",
    popularStyles: ["Jordan 1 Reverse Mocha", "Cactus Jack Fragment", "Utopia Merch"]
  }
];
