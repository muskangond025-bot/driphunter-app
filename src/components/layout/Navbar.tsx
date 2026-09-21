"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { usePathname, useRouter } from "next/navigation";
import {
  Search,
  User,
  Heart,
  ShoppingBag,
  Menu,
  X,
  Mic,
  Camera,
  ArrowRight,
  ChevronDown,
  Trash2,
  Plus,
  Minus,
  Sun,
  Moon,
  Bell,
  MapPin,
  Loader2,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import VoiceSearchDropdown from "@/components/layout/VoiceSearchDropdown";
import ImageSearchDropdown from "@/components/layout/ImageSearchDropdown";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Logo } from "@/components/layout/Logo";

const navLinks = [
  { label: "Sneakers", href: "/shop?category=sneakers" },
  { label: "Apparel", href: "/shop?category=apparel" },
  { label: "Accessories", href: "/shop?category=accessories" },
  { label: "Brands", href: "/brands" },
];

const dropdownCategories: Record<
  string,
  {
    columns: { title: string; items: { label: string; href: string }[] }[];
    promo: { title: string; tag: string; description: string; image: string; href: string };
  }
> = {
  Sneakers: {
    columns: [
      {
        title: "Popular Brands",
        items: [
          { label: "Air Jordan", href: "/brands/Jordan" },
          { label: "Nike", href: "/brands/Nike" },
          { label: "Adidas", href: "/brands/Adidas" },
          { label: "Yeezy", href: "/brands/Yeezy" },
          { label: "New Balance", href: "/brands/New+Balance" },
          { label: "Asics", href: "/brands/Asics" },
        ],
      },
      {
        title: "Trending Silhouettes",
        items: [
          { label: "Samba", href: "/brands/Samba" },
          { label: "Air Jordan 1", href: "/brands/Jordan-1" },
          { label: "Air Force 1", href: "/brands/Air-Force" },
          { label: "Dunk Low", href: "/brands/Dunk" },
          { label: "Yeezy Slide", href: "/brands/Slide" },
        ],
      },
    ],
    promo: {
      title: "Trending Footwear",
      tag: "COP THE HEAT",
      description: "Verified authentic hype sneakers from Jordan, Nike, Adidas & more.",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80",
      href: "/brands/Footwear",
    },
  },
  Apparel: {
    columns: [
      {
        title: "Categories",
        items: [
          { label: "T-Shirts", href: "/brands/T-Shirts" },
          { label: "Hoodies & Sweatshirts", href: "/brands/Hoodies" },
          { label: "Jackets & Coats", href: "/brands/Jackets" },
          { label: "Shirts", href: "/brands/Shirts" },
          { label: "Pants & Cargos", href: "/brands/Bottoms" },
        ],
      },
      {
        title: "Featured Brands",
        items: [
          { label: "Almost Gods", href: "/brands/Almost-Gods" },
          { label: "Supervek", href: "/brands/Supervek" },
          { label: "Arlo", href: "/brands/Arlo" },
        ],
      },
    ],
    promo: {
      title: "Streetwear Drops",
      tag: "SEASON 1 DROP",
      description: "Heavyweight drop-shoulder graphic tees and oversized premium essentials.",
      image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=400&q=80",
      href: "/brands/Apparel",
    },
  },
  Accessories: {
    columns: [
      {
        title: "Categories",
        items: [
          { label: "Sling Bags", href: "/brands/Bags" },
          { label: "Wallets", href: "/brands/Wallets" },
          { label: "Caps & Beanies", href: "/brands/Headwear" },
          { label: "Eyewear & Sunglasses", href: "/brands/Eyewear" },
        ],
      },
    ],
    promo: {
      title: "Finish Your Drip",
      tag: "STREET UTILITY",
      description: "Complete your look with premium slingers, bifold wallets, and caps.",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=400&q=80",
      href: "/brands/Accessories",
    },
  },
  Brands: {
    columns: [
      {
        title: "Verified Resellers",
        items: [
          { label: "Almost Gods", href: "/brands/Almost-Gods" },
          { label: "Supervek", href: "/brands/Supervek" },
          { label: "Arlo", href: "/brands/Arlo" },
        ],
      },
      {
        title: "Collaborations",
        items: [
          { label: "Cyber Shield", href: "/brands/Cyber" },
          { label: "Heritage Bomber", href: "/brands/Bomber" },
        ],
      },
    ],
    promo: {
      title: "Brand Curations",
      tag: "OFFICIAL PARTNERS",
      description: "Explore limited collections and verified streetwear drops.",
      image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=400&q=80",
      href: "/brands",
    },
  },
};

const previewData: Record<
  string,
  { image: string; tag: string; title: string; description: string; href: string }
> = {
  // Sneakers
  "Air Jordan": { image: "https://drip-hunter.vercel.app/images/sneaker-jordan.jpg", tag: "JORDAN BRAND", title: "Air Jordan", description: "Verified authentic hype sneakers from Jordan Brand.", href: "/brands/Jordan" },
  Nike: { image: "https://drip-hunter.vercel.app/images/sneaker-nike.jpg", tag: "NIKE SPORTSWEAR", title: "Nike", description: "Sleek active kicks and iconic streetwear sneakers from Nike.", href: "/brands/Nike" },
  Adidas: { image: "https://drip-hunter.vercel.app/images/sneaker-adidas.jpg", tag: "THREE STRIPES", title: "Adidas Originals", description: "Timeless classic casual kicks from Adidas.", href: "/brands/Adidas" },
  Yeezy: { image: "https://drip-hunter.vercel.app/images/sneaker-yeezy.jpg", tag: "YEEZY LIFE", title: "Yeezy Series", description: "Hype lifestyle sneakers and slides designed by Kanye West.", href: "/brands/Yeezy" },
  "New Balance": { image: "https://drip-hunter.vercel.app/images/sneaker-newbalance.jpg", tag: "RETRO CORE", title: "New Balance", description: "Premium suede retro trainers and modern comfort runners.", href: "/brands/New+Balance" },
  Asics: { image: "https://drip-hunter.vercel.app/images/sneaker-asics.jpg", tag: "JAPAN DESIGN", title: "Asics Gel", description: "Japanese performance running sneakers and retro GEL cushioning.", href: "/brands/Asics" },
  Samba: { image: "https://drip-hunter.vercel.app/images/sneaker-samba.jpg", tag: "TRENDING KICK", title: "Adidas Samba", description: "The classic low-profile terrace sneaker ruling the streets.", href: "/brands/Samba" },
  "Air Jordan 1": { image: "https://drip-hunter.vercel.app/images/sneaker-jordan1.jpg", tag: "TRENDING KICK", title: "Air Jordan 1", description: "The legendary basketball sneaker that started it all.", href: "/brands/Jordan-1" },
  "Air Force 1": { image: "https://drip-hunter.vercel.app/images/sneaker-af1.jpg", tag: "TRENDING KICK", title: "Nike Air Force 1", description: "The classic triple white court shoe turned street icon.", href: "/brands/Air-Force" },
  "Dunk Low": { image: "https://drip-hunter.vercel.app/images/sneaker-dunklow.jpg", tag: "TRENDING KICK", title: "Nike Dunk Low", description: "Sleek two-tone skate shoe that dominates streetwear.", href: "/brands/Dunk" },
  "Yeezy Slide": { image: "https://drip-hunter.vercel.app/images/sneaker-yeezyslide.jpg", tag: "TRENDING SLIDE", title: "Adidas Yeezy Slide", description: "Minimalist injection-molded EVA foam slides for extreme comfort.", href: "/brands/Slide" },
  
  // Apparel
  "T-Shirts": { image: "https://drip-hunter.vercel.app/images/streetwear_tshirt_preview.png", tag: "STREETWEAR CORE", title: "Graphic Tees", description: "Heavyweight drop-shoulder graphic tees and oversized premium essentials.", href: "/brands/T-Shirts" },
  "Hoodies & Sweatshirts": { image: "https://drip-hunter.vercel.app/images/streetwear_sweatshirt_preview.png", tag: "WINTER UTILITY", title: "Sweatshirts & Hoodies", description: "Ultra-soft heavy fleece hoodies and crewnecks styled for the streets.", href: "/brands/Hoodies" },
  "Jackets & Coats": { image: "https://drip-hunter.vercel.app/images/urban-essentials/denim_jacket.png", tag: "OUTERWEAR", title: "Jackets & Coats", description: "Utility cargos, bomber jackets, and heavy denim pieces for perfect layering.", href: "/brands/Jackets" },
  Shirts: { image: "https://drip-hunter.vercel.app/images/shirt_hover.jpg", tag: "SHARP ESSENTIALS", title: "Casual & Formal Shirts", description: "Tailored fit premium cotton shirts for a modern, sophisticated dress code.", href: "/brands/Shirts" },
  "Pants & Cargos": { image: "https://drip-hunter.vercel.app/images/urban-essentials/cargo_pants.png", tag: "STREET BOTTOMS", title: "Cargos & Pants", description: "Heavyweight ripstop utility cargos and relaxed fit trousers.", href: "/brands/Bottoms" },
  "Almost Gods": { image: "https://drip-hunter.vercel.app/images/almost_gods_hover.jpg", tag: "FEATURED BRAND", title: "Almost Gods", description: "Indian streetwear label focusing on premium luxury materials and avant-garde designs.", href: "/brands/Almost-Gods" },
  Supervek: { image: "https://drip-hunter.vercel.app/images/supervek_hover.jpg", tag: "FEATURED BRAND", title: "Supervek", description: "Aesthetic streetwear accessories, caps, and minimalist cardholders built for utility.", href: "/brands/Supervek" },
  Arlo: { image: "https://drip-hunter.vercel.app/images/arlo_hover.jpg", tag: "FEATURED BRAND", title: "Arlo Apparel", description: "Premium minimal basics and oversized comfort apparel.", href: "/brands/Arlo" },
  
  // Accessories
  "Sling Bags": { image: "https://drip-hunter.vercel.app/images/urban-essentials/sling_bag.png", tag: "STREET UTILITY", title: "Sling & Crossbody Bags", description: "Complete your look with premium water-resistant tactical slingers.", href: "/brands/Bags" },
  Wallets: { image: "https://drip-hunter.vercel.app/images/urban-essentials/bifold_wallet.png", tag: "DAILY UTILITY", title: "Bifold & Card Wallets", description: "Minimalist card holders and premium quilted zip wallets.", href: "/brands/Wallets" },
  "Caps & Beanies": { image: "https://drip-hunter.vercel.app/images/accessory-caps.jpg", tag: "HEADWEAR CORES", title: "Caps & Beanies", description: "Streetwear snapbacks, bucket hats, and classic baseball caps.", href: "/brands/Headwear" },
  "Eyewear & Sunglasses": { image: "https://drip-hunter.vercel.app/images/retro_chic.png", tag: "STATEMENT SHADES", title: "Sunglasses & Frames", description: "Timeless polarized sunglasses designed with premium acetate frames.", href: "/brands/Eyewear" },

  // Collaborations
  "Cyber Shield": { image: "https://drip-hunter.vercel.app/images/beige_jumpsuit.png", tag: "EXCLUSIVE COLLAB", title: "Cyber Shield Tech", description: "Futuristic techwear accessories and high performance materials.", href: "/brands/Cyber" },
  "Heritage Bomber": { image: "https://drip-hunter.vercel.app/images/red_rose_dress.png", tag: "GRAIL COLLAB", title: "Heritage Bomber Kit", description: "Vintage styled premium bombers and flight jackets.", href: "/brands/Bomber" }
};

interface NavbarProps {
  onSearchClick?: () => void;
}

export default function Navbar({ onSearchClick }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isLocationPopupOpen, setIsLocationPopupOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("Select Delivery Location");
  const [isLocating, setIsLocating] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  // Desktop search states
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isSearchHovered, setIsSearchHovered] = useState(false);
  const [searchMode, setSearchMode] = useState<"trending" | "voice" | "image">("trending");
  const searchRef = React.useRef<HTMLDivElement>(null);
  const searchInputRef = React.useRef<HTMLInputElement>(null);
  const [shortcutText, setShortcutText] = useState("⌘K");
  const [placeholder, setPlaceholder] = useState("");

  useEffect(() => {
    if (typeof navigator !== "undefined") {
      const isMac = /Mac|iPod|iPhone|iPad/.test(navigator.platform);
      setShortcutText(isMac ? "⌘K" : "Ctrl+K");
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    let isMounted = true;
    let currentIdx = 0;
    let currentText = "";
    let isDeleting = false;
    let typingSpeed = 80;
    let timer: NodeJS.Timeout | null = null;

    const placeholders = [
      "Search Jordan 1 Retro...",
      "Find utility cargo pants...",
      "Search oversized hoodies...",
      "Explore vintage bombers...",
      "Find Samba OG kicks..."
    ];

    const handleType = () => {
      if (!isMounted) return;

      const fullText = placeholders[currentIdx];
      if (!isDeleting) {
        currentText = fullText.slice(0, currentText.length + 1);
        typingSpeed = 80;
      } else {
        currentText = fullText.slice(0, currentText.length - 1);
        typingSpeed = 40;
      }

      setPlaceholder((prev) => (prev !== currentText ? currentText : prev));

      if (!isDeleting && currentText === fullText) {
        isDeleting = true;
        typingSpeed = 1500;
      } else if (isDeleting && currentText === "") {
        isDeleting = false;
        currentIdx = (currentIdx + 1) % placeholders.length;
        typingSpeed = 500;
      }

      timer = setTimeout(handleType, typingSpeed);
    };

    timer = setTimeout(handleType, typingSpeed);

    return () => {
      isMounted = false;
      if (timer) clearTimeout(timer);
    };
  }, []);

  // Profile state
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = React.useRef<HTMLDivElement>(null);

  // Auth User states (Defaults to null to show "Sign In / Sign Up" layout initially)
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [redirectAfterAuth, setRedirectAfterAuth] = useState<string | null>(null);

  // Toast notifications state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Scroll behavior states for sticky navbar hiding/showing
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollYRef = React.useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 50) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollYRef.current) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const showNavbar = isVisible || mobileOpen || isSearchOpen || isProfileOpen || hoveredCategory !== null;

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("drip_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (isSearchOpen && searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
      if (isProfileOpen && profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }
    
    if (isSearchOpen || isProfileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchOpen, isProfileOpen]);

  const {
    cart,
    wishlist,
    removeFromCart,
    updateQuantity,
    toggleWishlist,
    isCartOpen,
    setIsCartOpen,
    isWishlistOpen,
    setIsWishlistOpen,
    addToCart,
  } = useCart();

  // Reset hovered sub-item when category changes
  useEffect(() => {
    setHoveredItem(null);
  }, [hoveredCategory]);

  const [expandedMobileMenu, setExpandedMobileMenu] = useState<string | null>(null);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);



  const profileMenuItems = [
    { label: "My Profile", href: "/profile", icon: User },
    { label: "Notifications", href: "/profile?tab=notifications", icon: Bell },
    { label: "Track Orders", href: "/orders", icon: ShoppingBag },
    { label: "Style Wishlist", href: "/wishlist", icon: Heart },
  ];

  const handleCheckout = () => {
    alert("Checkout Successful! Thank you for copping the heat from Drip Hunter!");
  };

  const handleMoveToBag = (item: typeof wishlist[0]) => {
    const priceNum = parseInt(item.price.replace(/[^\d]/g, "")) || 4999;
    addToCart({
      id: item.id,
      name: item.name,
      price: priceNum,
      image: item.image,
      brand: item.brand,
      size: "L",
      color: "Default",
    });
    toggleWishlist(item);
    setIsWishlistOpen(false);
    // setIsCartOpen(true);
  };

  const isSearchExpanded = isSearchFocused || isSearchHovered || searchQuery.length > 0 || isSearchOpen;

  return (
    <>
      <header
        className="w-full bg-white/95 dark:bg-zinc-950/95 backdrop-blur-2xl border-b border-zinc-200/80 dark:border-zinc-800/80 sticky top-0 z-50 select-none shadow-[0_4px_30px_rgba(0,0,0,0.02)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
        onMouseLeave={() => setHoveredCategory(null)}
      >
        {/* ─── ROW 0: Integrated Luxury Announcement Ticker ─── */}
        <Link href="/offers" className="w-full bg-[#141210] dark:bg-black text-[#E6C280] text-[9px] sm:text-[10px] py-1.5 px-4 flex items-center justify-center font-mono overflow-hidden tracking-[0.2em] uppercase select-none border-b border-white/5 hover:bg-[#1a1816] dark:hover:bg-[#0a0a0a] transition-colors cursor-pointer block">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E6C280] animate-pulse shrink-0" />
            <span className="text-zinc-300">
              AUTHENTICATED STREETWEAR ARCHIVE // CODE{" "}
              <strong className="text-[#E6C280] font-black">DRIP10</strong> FOR 10% OFF
            </span>
            <ArrowRight className="w-3 h-3 text-[#E6C280] shrink-0" aria-hidden="true" />
          </div>
        </Link>

        {/* ─── ROW 1: Main Header Bar (Standardized Max-W-7xl Luxury Grid) ─── */}
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 h-[68px] flex items-center justify-between gap-4 lg:gap-6">
          <div className="flex items-center gap-4 lg:gap-7 flex-shrink-0">
            {/* Logo */}
            <Logo variant="buyer" />

            {/* Desktop Navigation Links */}
            <nav
              className="hidden lg:flex items-center gap-1 text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-700 dark:text-zinc-300"
              aria-label="Primary Navigation"
            >
              {navLinks.map(({ label, href }) => {
                const isActive = pathname === href;
                const isHovered = hoveredCategory === label;
                return (
                  <div
                    key={href}
                    className="relative"
                    onMouseEnter={() => setHoveredCategory(label)}
                  >
                    <Link
                      href={href}
                      className={`px-3 py-1.5 rounded-full transition-all duration-200 flex items-center gap-1 cursor-pointer select-none ${
                        isActive
                          ? "text-zinc-950 dark:text-white bg-zinc-100/90 dark:bg-zinc-800/80 font-black shadow-xs"
                          : isHovered
                          ? "text-[#6F4E37] dark:text-[#E6C280] bg-[#6F4E37]/8 dark:bg-[#E6C280]/10"
                          : "text-zinc-650 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100/60 dark:hover:bg-zinc-800/40"
                      }`}
                    >
                      <span>{label}</span>
                      <ChevronDown className={`w-3 h-3 transition-transform duration-200 opacity-60 ${isHovered ? "rotate-180 text-[#6F4E37] dark:text-[#E6C280] opacity-100" : ""}`} />
                    </Link>
                  </div>
                );
              })}
            </nav>
          </div>

          {/* Right: Premium Action Buttons */}
          <div className="flex items-center justify-end gap-2 sm:gap-3 flex-1 min-w-0">
            {/* Expandable Search Bar (Moved from Center to Right Side) */}
            <div className={`relative z-50 hidden md:flex items-center justify-end transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isSearchExpanded ? 'w-9 sm:w-10 shrink-0 md:flex-1 md:w-full md:max-w-[350px] lg:max-w-[450px] xl:max-w-[600px]' : 'w-9 sm:w-10 shrink-0'}`} ref={searchRef}>
              <div 
                onMouseEnter={() => setIsSearchHovered(true)}
                onMouseLeave={() => setIsSearchHovered(false)}
                onClick={() => {
                  if (typeof window !== 'undefined' && window.innerWidth < 768) {
                    setIsSearchOpen(true);
                  } else if (!isSearchExpanded) {
                    searchInputRef.current?.focus();
                  }
                }}
                className={`relative w-full flex items-center gap-3 rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden border origin-right ${
                  isSearchExpanded 
                    ? 'h-9 sm:h-10 px-0 justify-center bg-zinc-100/60 dark:bg-zinc-900/60 border-transparent cursor-pointer shadow-xs md:h-auto md:px-5 md:py-2.5 md:bg-white md:dark:bg-[#0a0a0c] md:border-[#6F4E37]/30 md:dark:border-[#E6C280]/30 md:shadow-[0_8px_30px_rgba(0,0,0,0.04)] md:dark:shadow-[0_8px_30px_rgba(255,255,255,0.02)] md:scale-[1.01]' 
                    : 'h-9 sm:h-10 px-0 justify-center bg-zinc-100/60 dark:bg-zinc-900/60 hover:bg-zinc-200/80 dark:hover:bg-zinc-800/80 border-transparent cursor-pointer shadow-xs'
                }`}
              >
                <Search
                  className={`w-4 h-4 sm:w-4.5 sm:h-4.5 transition-colors duration-300 shrink-0 ${
                    isSearchExpanded || searchQuery ? "text-[#6F4E37] dark:text-[#E6C280]" : "text-zinc-650 dark:text-zinc-300"
                  }`}
                  aria-hidden="true"
                />
                
                <div className={`hidden md:flex flex-1 items-center gap-3 transition-opacity duration-300 min-w-0 ${isSearchExpanded ? 'opacity-100 visible delay-100' : 'opacity-0 invisible absolute'}`}>
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => {
                      setIsSearchOpen(true);
                      setSearchMode("trending");
                      setIsSearchFocused(true);
                    }}
                    onBlur={() => {
                      setTimeout(() => setIsSearchFocused(false), 200);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && searchQuery.trim() !== "") {
                        window.location.href = `/shop?search=${encodeURIComponent(searchQuery)}`;
                      }
                    }}
                    placeholder={placeholder || "Search streetwear, grails..."}
                    className="bg-transparent outline-none text-[13px] w-full text-zinc-950 dark:text-white placeholder-zinc-500 font-sans tracking-wide transition-all duration-300"
                    tabIndex={isSearchExpanded ? 0 : -1}
                  />
                  
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSearchQuery("");
                        searchInputRef.current?.focus();
                      }}
                      className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors duration-300 shrink-0 p-1"
                      title="Clear search"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}

                  {!isSearchFocused && !searchQuery && (
                    <span className="hidden sm:inline-block text-[10px] font-mono font-medium text-zinc-400 dark:text-zinc-500 border border-zinc-200/80 dark:border-zinc-700 bg-white/50 dark:bg-zinc-800/50 rounded px-1.5 py-0.5 pointer-events-none select-none tracking-widest shrink-0">
                      {shortcutText}
                    </span>
                  )}
                </div>

                <div className={`hidden md:flex items-center gap-2 pl-4 pr-1.5 border-l border-zinc-200/40 dark:border-zinc-800/60 text-zinc-400 shrink-0 transition-opacity duration-300 ${isSearchExpanded ? 'opacity-100 visible delay-100' : 'opacity-0 invisible absolute right-0'}`}>
                  <button
                    type="button"
                    className={`relative flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full transition-all duration-300 ease-out cursor-pointer group/btn overflow-hidden ${
                      searchMode === "voice" && isSearchOpen 
                        ? "bg-gradient-to-tr from-[#6F4E37] to-[#8B6547] dark:from-[#E6C280] dark:to-[#D4B06A] text-white dark:text-zinc-950 border border-transparent scale-110 shadow-[0_4px_15px_rgba(111,78,55,0.4)] dark:shadow-[0_4px_15px_rgba(230,194,128,0.3)] z-10" 
                        : "bg-zinc-100/80 dark:bg-zinc-800/80 border border-zinc-200/60 dark:border-zinc-700/60 shadow-[inset_0_1px_2px_rgba(255,255,255,0.8)] dark:shadow-[inset_0_1px_2px_rgba(255,255,255,0.05)] hover:bg-white dark:hover:bg-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600 hover:text-zinc-950 dark:hover:text-white hover:scale-105 hover:shadow-sm"
                    }`}
                    title="Voice Search"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsSearchOpen(true);
                      setSearchMode("voice");
                    }}
                    tabIndex={isSearchExpanded ? 0 : -1}
                  >
                    <Mic className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 ${searchMode === "voice" && isSearchOpen ? 'animate-pulse' : 'group-hover/btn:scale-110'}`} aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    className={`relative flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full transition-all duration-300 ease-out cursor-pointer group/btn overflow-hidden ${
                      searchMode === "image" && isSearchOpen 
                        ? "bg-gradient-to-tr from-[#6F4E37] to-[#8B6547] dark:from-[#E6C280] dark:to-[#D4B06A] text-white dark:text-zinc-950 border border-transparent scale-110 shadow-[0_4px_15px_rgba(111,78,55,0.4)] dark:shadow-[0_4px_15px_rgba(230,194,128,0.3)] z-10" 
                        : "bg-zinc-100/80 dark:bg-zinc-800/80 border border-zinc-200/60 dark:border-zinc-700/60 shadow-[inset_0_1px_2px_rgba(255,255,255,0.8)] dark:shadow-[inset_0_1px_2px_rgba(255,255,255,0.05)] hover:bg-white dark:hover:bg-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600 hover:text-zinc-950 dark:hover:text-white hover:scale-105 hover:shadow-sm"
                    }`}
                    title="Search by Image"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsSearchOpen(true);
                      setSearchMode("image");
                    }}
                    tabIndex={isSearchExpanded ? 0 : -1}
                  >
                    <Camera className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 ${searchMode === "image" && isSearchOpen ? '' : 'group-hover/btn:scale-110'}`} aria-hidden="true" />
                  </button>
                </div>
              </div>

              {/* Dropdown Menu (Right-Aligned) */}
              {isSearchOpen && (
                <div className="absolute right-0 top-[calc(100%+16px)] w-[300px] sm:w-[400px] lg:w-[500px] bg-white/98 dark:bg-[#0a0a0c]/98 backdrop-blur-3xl border border-zinc-200/50 dark:border-zinc-800/50 rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] p-6 sm:p-8 z-50 animate-fade-in-up text-left">
                  {searchMode === "trending" && (
                    <div className="space-y-5">
                      <p className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-[#6F4E37] dark:text-[#E6C280]">
                        Trending Searches
                      </p>
                      <div className="flex flex-wrap gap-2.5">
                        {["Oversized Tees", "Cargo Pants", "Tech Vests", "Vintage Hoodies", "Samba OG"].map((t) => (
                          <button
                            key={t}
                            onClick={() => {
                              setSearchQuery(t);
                              window.location.href = `/shop?search=${encodeURIComponent(t)}`;
                            }}
                            className="px-4 py-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-transparent text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:border-zinc-900 dark:hover:border-zinc-100 hover:shadow-sm transition-all duration-300 text-[10px] font-mono uppercase tracking-widest cursor-pointer"
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  {searchMode === "voice" && (
                    <VoiceSearchDropdown
                      onClose={() => setIsSearchOpen(false)}
                      onBack={() => setSearchMode("trending")}
                      onSearch={(query) => {
                        setSearchQuery(query);
                        window.location.href = `/shop?search=${encodeURIComponent(query)}`;
                      }}
                    />
                  )}
                  {searchMode === "image" && (
                    <ImageSearchDropdown
                      onClose={() => setIsSearchOpen(false)}
                      onBack={() => setSearchMode("trending")}
                      onSearch={(query, toastMessage) => {
                        setSearchQuery(query);
                        if (toastMessage) {
                          showToast(toastMessage);
                        }
                        window.location.href = `/shop?search=${encodeURIComponent(query)}`;
                      }}
                    />
                  )}
                </div>
              )}
            </div>

            {/* Notifications */}
            {/* Notifications */}
            {user && (
              <Link
                href="/profile?tab=notifications"
                className="w-9 h-9 sm:w-10 sm:h-10 flex rounded-full border border-zinc-200/60 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-200 relative cursor-pointer items-center justify-center text-zinc-950 dark:text-white shadow-xs active:scale-95"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4 sm:w-4.5 sm:h-4.5" aria-hidden="true" />
                <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-[#6F4E37] border-2 border-white dark:border-zinc-900"></span>
              </Link>
            )}

            {/* Account */}
            <div 
              className="relative hidden sm:block" 
              ref={profileRef}
            >
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-zinc-200/60 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-200 relative cursor-pointer flex items-center justify-center text-zinc-950 dark:text-white shadow-xs active:scale-95"
                aria-label="Account"
              >
                <User className="w-4 h-4 sm:w-4.5 sm:h-4.5" aria-hidden="true" />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 top-full pt-3 w-72 z-50 animate-fade-in text-left">
                  <div className="bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl border border-zinc-200/80 dark:border-zinc-700 rounded-[28px] shadow-2xl p-5">
                  {/* Profile Header */}
                  <div className="flex items-center gap-3 pb-4 border-b border-zinc-100 dark:border-zinc-800">
                    <div className="w-10 h-10 rounded-full bg-[#6F4E37]/15 text-[#6F4E37] dark:bg-[#E6C280]/15 dark:text-[#E6C280] flex items-center justify-center font-bold text-sm border border-[#6F4E37]/25 dark:border-[#E6C280]/30 shadow-inner uppercase">
                      {user ? user.name.slice(0, 2) : "GU"}
                    </div>
                    <div>
                      <h4 className="text-xs font-black uppercase tracking-wider text-zinc-950 dark:text-white">
                        {user ? user.name : "Guest User"}
                      </h4>
                      <p className="text-[10px] text-zinc-500 font-mono">
                        {user ? user.email : "Sign in to cop exclusive archives"}
                      </p>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="py-3 flex flex-col gap-1">
                    {profileMenuItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.label}
                          href={item.href}
                          onClick={(e) => {
                            if (!user) {
                              e.preventDefault();
                              sessionStorage.setItem("redirectAfterAuth", item.href);
                              setIsProfileOpen(false);
                              router.push("/login");
                            } else {
                              setIsProfileOpen(false);
                            }
                          }}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-zinc-100/70 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-[#6F4E37] dark:hover:text-[#E6C280] transition-all duration-200 text-[11px] font-bold uppercase tracking-wide"
                        >
                          <Icon className="w-4 h-4" />
                          {item.label}
                        </Link>
                      );
                    })}
                  </div>

                  {/* Footer */}
                  <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800">
                    {user ? (
                      <button
                        onClick={() => {
                          setUser(null);
                          localStorage.removeItem("drip_user");
                          showToast("Logged out successfully!");
                          setIsProfileOpen(false);
                        }}
                        className="w-full bg-[#6F4E37] hover:bg-[#5C3D2E] text-white text-[9px] font-black uppercase tracking-widest py-3 rounded-xl transition-all shadow-md cursor-pointer text-center"
                      >
                        Log Out
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          sessionStorage.setItem("redirectAfterAuth", "/profile");
                          setIsProfileOpen(false);
                          router.push("/login");
                        }}
                        className="w-full bg-[#6F4E37] hover:bg-[#5C3D2E] dark:bg-[#E6C280] dark:hover:bg-[#d4b06a] text-white dark:text-zinc-950 text-[9px] font-black uppercase tracking-widest py-3 rounded-xl transition-all shadow-md cursor-pointer text-center"
                      >
                        Sign In / Sign Up
                      </button>
                    )}
                  </div>
                  </div>
                </div>
              )}
            </div>

            {/* Theme Toggle Button */}
            <ThemeToggle />

            {/* Wishlist Icon */}
            <Link
              href="/wishlist"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-zinc-200/60 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors relative cursor-pointer text-zinc-950 dark:text-white hidden sm:flex items-center justify-center shadow-xs active:scale-95"
              aria-label="Wishlist"
            >
              <Heart className="w-4 h-4 sm:w-4.5 sm:h-4.5" aria-hidden="true" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[7.5px] w-4 h-4 flex items-center justify-center rounded-full font-black shadow-sm">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Shopping Bag / Cart */}
            <Link
              href="/cart"
              id="navbar-cart-icon"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-zinc-200/60 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all relative cursor-pointer duration-300 text-zinc-950 dark:text-white flex items-center justify-center shadow-xs active:scale-95"
              aria-label="Cart"
            >
              <ShoppingBag className="w-4 h-4 sm:w-4.5 sm:h-4.5" aria-hidden="true" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#6F4E37] dark:bg-[#E6C280] text-white dark:text-zinc-950 text-[7.5px] w-4 h-4 flex items-center justify-center rounded-full font-black shadow-sm">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Toggle Button */}
            <button
              className="lg:hidden w-9 h-9 relative rounded-full border border-zinc-200/60 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center justify-center transition-colors cursor-pointer text-zinc-950 dark:text-white shadow-xs overflow-hidden"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              <div className="relative w-4.5 h-4.5">
                <Menu className={`absolute inset-0 w-4.5 h-4.5 transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${mobileOpen ? "rotate-90 scale-50 opacity-0" : "rotate-0 scale-100 opacity-100"}`} />
                <X className={`absolute inset-0 w-4.5 h-4.5 transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${mobileOpen ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-50 opacity-0"}`} />
              </div>
            </button>
          </div>
        </div>

        {/* ─── ROW 2: Mobile Location & Search (Visible ONLY on mobile) ─── */}
        <div className="block md:hidden w-full bg-white/95 dark:bg-zinc-950/95 backdrop-blur-2xl px-4 pb-3">
          {/* Location Selector */}
          <div 
            className="flex items-center gap-1.5 py-1.5 text-zinc-600 dark:text-zinc-300 cursor-pointer"
            onClick={() => setIsLocationPopupOpen(true)}
          >
            <MapPin className="w-3.5 h-3.5 text-zinc-950 dark:text-white shrink-0" />
            <span className="text-[12px] font-semibold tracking-wide truncate max-w-[180px]">{selectedLocation}</span>
            <ChevronDown className="w-3.5 h-3.5 opacity-70 shrink-0" />
          </div>
          
          {/* Mobile Search Bar */}
          <div className="relative mt-2 flex items-center">
            <Search className="absolute left-3 w-4 h-4 text-zinc-400" />
            <input 
              type="text" 
              placeholder={placeholder || "Search streetwear, grails..."}
              className="w-full h-11 pl-10 pr-[72px] rounded-[12px] bg-zinc-100 dark:bg-zinc-900/80 border border-transparent focus:border-[#6F4E37]/30 dark:focus:border-[#E6C280]/30 outline-none text-[13px] text-zinc-950 dark:text-white transition-all shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && searchQuery.trim() !== "") {
                  window.location.href = `/shop?search=${encodeURIComponent(searchQuery)}`;
                }
              }}
            />
            {/* Voice & Camera Mobile Icons */}
            <div className="absolute right-2 flex items-center gap-1">
              <button
                type="button"
                className="w-7 h-7 flex items-center justify-center rounded-full bg-white dark:bg-zinc-800 text-zinc-500 shadow-sm"
                onClick={() => {
                  setIsSearchOpen(true);
                  setSearchMode("voice");
                }}
              >
                <Mic className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                className="w-7 h-7 flex items-center justify-center rounded-full bg-white dark:bg-zinc-800 text-zinc-500 shadow-sm"
                onClick={() => {
                  setIsSearchOpen(true);
                  setSearchMode("image");
                }}
              >
                <Camera className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          
          {/* Mobile Search Dropdown Menu */}
          {isSearchOpen && (
            <div className="absolute left-4 right-4 top-[calc(100%+8px)] bg-white/98 dark:bg-[#0a0a0c]/98 backdrop-blur-3xl border border-zinc-200/50 dark:border-zinc-800/50 rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] p-5 z-[150] animate-fade-in-up text-left">
              {searchMode === "trending" && (
                <div className="space-y-4">
                  <p className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-[#6F4E37] dark:text-[#E6C280]">
                    Trending Searches
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Oversized Tees", "Cargo Pants", "Tech Vests", "Vintage Hoodies", "Samba OG"].map((t) => (
                      <button
                        key={t}
                        onClick={() => {
                          setSearchQuery(t);
                          window.location.href = `/shop?search=${encodeURIComponent(t)}`;
                        }}
                        className="px-3 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-transparent text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:border-zinc-900 dark:hover:border-zinc-100 hover:shadow-sm transition-all duration-300 text-[10px] font-mono uppercase tracking-widest cursor-pointer"
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {searchMode === "voice" && (
                <VoiceSearchDropdown
                  onClose={() => setIsSearchOpen(false)}
                  onBack={() => setSearchMode("trending")}
                  onSearch={(query) => {
                    setSearchQuery(query);
                    window.location.href = `/shop?search=${encodeURIComponent(query)}`;
                  }}
                />
              )}
              {searchMode === "image" && (
                <ImageSearchDropdown
                  onClose={() => setIsSearchOpen(false)}
                  onBack={() => setSearchMode("trending")}
                  onSearch={(query, toastMessage) => {
                    setSearchQuery(query);
                    if (toastMessage) {
                      showToast(toastMessage);
                    }
                    window.location.href = `/shop?search=${encodeURIComponent(query)}`;
                  }}
                />
              )}
            </div>
          )}
        </div>

        {/* ─── ROW 3: Hover Mega Menu (Culture Circle Style Luxury Spread) ─── */}
        {hoveredCategory && dropdownCategories[hoveredCategory] && (
          <div
            className="absolute top-full left-0 w-full bg-white/98 dark:bg-zinc-950/98 backdrop-blur-2xl border-b border-zinc-200/70 dark:border-zinc-800/80 shadow-2xl z-40 select-none transition-all duration-300 animate-fade-in-up"
            onMouseEnter={() => setHoveredCategory(hoveredCategory)}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-12 gap-8 py-8 min-h-[280px]">
              {/* Columns list */}
              <div className="col-span-8 grid grid-cols-3 gap-6 text-left">
                {dropdownCategories[hoveredCategory].columns.map((section, idx) => (
                  <div key={idx} className="space-y-3">
                    <h4
                      className="text-[9.5px] font-mono font-black uppercase tracking-[0.25em] text-[#6F4E37] dark:text-[#E6C280] cursor-default"
                      onMouseEnter={() => setHoveredItem(null)}
                    >
                      {section.title}
                    </h4>
                    <div className="flex flex-col gap-2 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                      {section.items.map((item, itemIdx) => (
                        <Link
                          key={itemIdx}
                          href={item.href}
                          onMouseEnter={() => setHoveredItem(item.label)}
                          onMouseLeave={() => setHoveredItem(null)}
                          className="hover:text-zinc-950 dark:hover:text-white hover:translate-x-1.5 transition-all py-0.5 w-fit flex items-center gap-1 group"
                        >
                          <span className="w-1 h-1 rounded-full bg-[#6F4E37] dark:bg-[#E6C280] opacity-0 group-hover:opacity-100 transition-opacity" />
                          <span>{item.label}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Preview Card column */}
              <div className="col-span-4 border-l border-zinc-200/80 dark:border-zinc-800/80 pl-8 flex items-center justify-center">
                {(() => {
                  const activePreview =
                    hoveredItem && previewData[hoveredItem]
                      ? previewData[hoveredItem]
                      : dropdownCategories[hoveredCategory].promo;

                  if (!activePreview) return null;

                  return (
                    <Link
                      href={activePreview.href}
                      className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden shadow-xl border border-zinc-200/50 dark:border-zinc-800/80 group/promo flex flex-col justify-end p-6 text-left bg-zinc-900"
                    >
                      <img
                        src={activePreview.image}
                        alt={activePreview.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/promo:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                      <div className="relative z-10 space-y-1.5">
                        <span className="text-[9px] font-bold font-mono tracking-widest text-[#E6C280] uppercase bg-[#E6C280]/20 border border-[#E6C280]/30 px-2 py-0.5 rounded-md inline-block">
                          {activePreview.tag}
                        </span>
                        <h3 className="text-sm font-black uppercase tracking-tight text-white leading-tight">
                          {activePreview.title}
                        </h3>
                        <p className="text-[10.5px] text-zinc-300 font-medium leading-relaxed line-clamp-2">
                          {activePreview.description}
                        </p>
                      </div>
                    </Link>
                  );
                })()}
              </div>
            </div>
          </div>
        )}

        {/* ─── MOBILE DRAWER (Culture Circle Refined Sheet) ─── */}
        <div
          className={`lg:hidden grid transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
            mobileOpen ? "grid-rows-[1fr] opacity-100 border-t border-zinc-200/60 dark:border-zinc-800/80 bg-white/98 dark:bg-zinc-950/98 backdrop-blur-2xl" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="px-5 py-5 flex flex-col gap-2 text-left">
            {/* Mobile Links */}
            <nav className="flex flex-col gap-1" aria-label="Mobile Navigation">
              {navLinks.map(({ label, href }, index) => {
                const isActive = pathname === href;
                const hasDropdown = !!dropdownCategories[label];
                const isExpanded = expandedMobileMenu === label;
                
                return (
                  <div key={href} className="flex flex-col">
                    {hasDropdown ? (
                      <button
                        onClick={() => setExpandedMobileMenu(isExpanded ? null : label)}
                        className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all duration-200 border-none cursor-pointer ${
                          isActive
                            ? "text-zinc-950 dark:text-white bg-zinc-100 dark:bg-zinc-850 font-black"
                            : "bg-transparent text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-900"
                        }`}
                      >
                        <div className="overflow-hidden pb-1 -mb-1">
                          <div 
                            className={`transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] inline-block ${mobileOpen ? "translate-y-0" : "translate-y-[120%]"}`} 
                            style={{ transitionDelay: `${index * 40}ms` }}
                          >
                            {label}
                          </div>
                        </div>
                        <ChevronDown className={`w-3.5 h-3.5 text-zinc-400 transition-all duration-300 ${isExpanded ? "rotate-180" : "rotate-0"} ${mobileOpen ? "opacity-100 scale-100" : "opacity-0 scale-50"}`} style={{ transitionDelay: `${index * 40 + 100}ms` }} />
                      </button>
                    ) : (
                      <Link
                        href={href}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all duration-200 ${
                          isActive
                            ? "text-zinc-950 dark:text-white bg-zinc-100 dark:bg-zinc-850 font-black"
                            : "text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-900"
                        }`}
                      >
                        <div className="overflow-hidden pb-1 -mb-1">
                          <div 
                            className={`transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] inline-block ${mobileOpen ? "translate-y-0" : "translate-y-[120%]"}`} 
                            style={{ transitionDelay: `${index * 40}ms` }}
                          >
                            {label}
                          </div>
                        </div>
                        <ChevronDown className={`w-3.5 h-3.5 text-zinc-400 -rotate-90 transition-all duration-500 ${mobileOpen ? "opacity-100 scale-100" : "opacity-0 scale-50"}`} style={{ transitionDelay: `${index * 40 + 100}ms` }} />
                      </Link>
                    )}
                    
                    {/* Submenu Accordion */}
                    {hasDropdown && (
                      <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-[1000px] mt-2 opacity-100' : 'max-h-0 opacity-0'}`}>
                        <div className="flex flex-col gap-5 pl-4 pr-4 pb-4 border-l-2 border-zinc-100 dark:border-zinc-800 ml-4">
                          <Link 
                            href={href} 
                            onClick={() => setMobileOpen(false)}
                            className="text-[10px] font-bold text-white bg-[#6F4E37] dark:bg-[#E6C280] dark:text-zinc-950 uppercase tracking-widest flex items-center justify-center gap-1.5 py-2.5 rounded-lg w-full"
                          >
                            View All {label} <ArrowRight className="w-3 h-3" />
                          </Link>
                          
                          {dropdownCategories[label].columns.map((col, colIdx) => (
                            <div key={colIdx} className="space-y-2.5">
                              <span className="text-[9px] font-mono text-zinc-400 font-bold uppercase tracking-widest">{col.title}</span>
                              <div className="flex flex-col gap-2">
                                {col.items.map((item, itemIdx) => (
                                  <Link
                                    key={itemIdx}
                                    href={item.href}
                                    onClick={() => setMobileOpen(false)}
                                    className="text-xs text-zinc-700 dark:text-zinc-300 font-medium hover:text-[#6F4E37] dark:hover:text-[#E6C280] transition-colors"
                                  >
                                    {item.label}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
              
              <Link
                href="/profile"
                onClick={() => setMobileOpen(false)}
                className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all duration-200 mt-1 ${
                  pathname === "/profile"
                    ? "text-zinc-950 dark:text-white bg-zinc-100 dark:bg-zinc-850 font-black"
                    : "text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-900"
                }`}
              >
                <div className="overflow-hidden pb-1 -mb-1">
                  <div 
                    className={`transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] inline-block ${mobileOpen ? "translate-y-0" : "translate-y-[120%]"}`} 
                    style={{ transitionDelay: `${navLinks.length * 40}ms` }}
                  >
                    My Profile
                  </div>
                </div>
                <ChevronDown className={`w-3.5 h-3.5 text-zinc-400 -rotate-90 transition-all duration-500 ${mobileOpen ? "opacity-100 scale-100" : "opacity-0 scale-50"}`} style={{ transitionDelay: `${navLinks.length * 40 + 100}ms` }} />
              </Link>
              
              <Link
                href="/orders"
                onClick={() => setMobileOpen(false)}
                className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all duration-200 ${
                  pathname === "/orders"
                    ? "text-zinc-950 dark:text-white bg-zinc-100 dark:bg-zinc-850 font-black"
                    : "text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-900"
                }`}
              >
                <div className="overflow-hidden pb-1 -mb-1">
                  <div 
                    className={`transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] inline-block ${mobileOpen ? "translate-y-0" : "translate-y-[120%]"}`} 
                    style={{ transitionDelay: `${(navLinks.length + 1) * 40}ms` }}
                  >
                    Track Orders
                  </div>
                </div>
                <ChevronDown className={`w-3.5 h-3.5 text-zinc-400 -rotate-90 transition-all duration-500 ${mobileOpen ? "opacity-100 scale-100" : "opacity-0 scale-50"}`} style={{ transitionDelay: `${(navLinks.length + 1) * 40 + 100}ms` }} />
              </Link>
            </nav>

            {/* Mobile Extra Actions */}
            <div className="flex gap-2 pt-3 border-t border-zinc-100 dark:border-zinc-850 mt-1 overflow-hidden">
              <div 
                className={`flex-1 flex gap-2 transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${mobileOpen ? "translate-y-0" : "translate-y-[150%]"}`}
                style={{ transitionDelay: `${(navLinks.length + 2) * 40}ms` }}
              >
                <Link
                  href="/wishlist"
                  onClick={() => setMobileOpen(false)}
                  className="flex-1 text-center bg-zinc-100 dark:bg-zinc-850 text-zinc-950 dark:text-white text-[11px] font-black uppercase py-3 rounded-xl hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors cursor-pointer flex items-center justify-center border-none"
                >
                  <div className="overflow-hidden pb-1 -mb-1">
                    <div className={`transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] inline-block ${mobileOpen ? "translate-y-0" : "translate-y-[120%]"}`} style={{ transitionDelay: `${(navLinks.length + 3) * 40}ms` }}>
                      Wishlist ({wishlist.length})
                    </div>
                  </div>
                </Link>
                <Link
                  href="/cart"
                  onClick={() => setMobileOpen(false)}
                  className="flex-1 text-center bg-[#6F4E37] dark:bg-[#E6C280] text-white dark:text-zinc-950 text-[11px] font-black uppercase py-3 rounded-xl hover:bg-[#5C3D2E] dark:hover:bg-[#d4b06a] transition-colors cursor-pointer flex items-center justify-center border-none shadow-md"
                >
                  <div className="overflow-hidden pb-1 -mb-1">
                    <div className={`transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] inline-block ${mobileOpen ? "translate-y-0" : "translate-y-[120%]"}`} style={{ transitionDelay: `${(navLinks.length + 4) * 40}ms` }}>
                      My Bag ({cartCount})
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
        </div>
      </header>

      {/* ─── SHOPPING CART DRAWER ─── */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[100] select-none text-left">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={() => setIsCartOpen(false)}
          />
          <div className="fixed right-0 top-0 bottom-0 w-[420px] max-w-full bg-white shadow-2xl flex flex-col transition-all duration-300 animate-slide-in-right border-l border-zinc-200">
            {/* Header */}
            <div className="px-6 py-5 border-b border-zinc-150 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-zinc-950" />
                <h3 className="text-sm font-black uppercase tracking-wider text-zinc-950">
                  Your Shopping Bag ({cartCount})
                </h3>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1 rounded-full hover:bg-zinc-100 transition-colors cursor-pointer border-none bg-transparent text-zinc-650"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable List */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
              {cart.length === 0 ? (
                <div className="flex-grow flex flex-col items-center justify-center text-center py-20 gap-4">
                  <div className="w-16 h-16 rounded-full bg-zinc-50 border border-zinc-150 flex items-center justify-center text-zinc-400">
                    <ShoppingBag className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-wider text-zinc-800">
                      Your bag is empty
                    </h4>
                    <p className="text-[11px] text-zinc-500 mt-1 max-w-[200px] font-mono leading-relaxed">
                      Add some curated grails to your wardrobe archive to get started.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="mt-2 bg-zinc-950 hover:bg-black text-white text-[10px] font-black uppercase tracking-widest py-3 px-6 rounded-xl transition-all cursor-pointer"
                  >
                    Continue Browsing
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={`${item.id}-${item.size}-${item.color}`}
                    className="flex gap-4 pb-4 border-b border-zinc-100 items-start text-left"
                  >
                    <div className="relative w-20 h-24 bg-zinc-50 border rounded-xl overflow-hidden shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow">
                      <span className="text-[9px] text-zinc-400 font-mono tracking-widest uppercase block font-black">
                        {item.brand}
                      </span>
                      <h4 className="text-xs font-bold text-zinc-950 uppercase tracking-tight leading-tight mt-0.5 line-clamp-2">
                        {item.name}
                      </h4>
                      <div className="flex gap-2 text-[10px] font-bold text-zinc-500 font-mono mt-1">
                        <span>SIZE: {item.size}</span>
                        <span>COLOR: {item.color}</span>
                      </div>
                      
                      {/* Controls */}
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-zinc-200 rounded-lg overflow-hidden h-7 bg-zinc-50">
                          <button
                            onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)}
                            className="px-2 h-full hover:bg-zinc-200 transition-colors border-none bg-transparent cursor-pointer flex items-center justify-center text-zinc-650"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-3 text-xs font-bold text-zinc-800 font-mono">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}
                            className="px-2 h-full hover:bg-zinc-200 transition-colors border-none bg-transparent cursor-pointer flex items-center justify-center text-zinc-650"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id, item.size, item.color)}
                          className="text-zinc-400 hover:text-red-500 transition-colors border-none bg-transparent cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <strong className="text-xs font-black text-zinc-950 font-mono text-right shrink-0">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </strong>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-zinc-150 bg-zinc-50/50">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-mono tracking-widest text-zinc-500 uppercase font-black">
                    Cart Subtotal
                  </span>
                  <strong className="text-xl font-black text-zinc-950 font-mono">
                    ₹{subtotal.toLocaleString()}
                  </strong>
                </div>
                <p className="text-[10px] text-zinc-400 font-mono leading-relaxed mb-4 text-left">
                  Tax and shipping fees calculated at checkout. Early orders shipped instantly.
                </p>
                <button
                  onClick={handleCheckout}
                  className="w-full bg-zinc-950 hover:bg-black text-white text-xs font-black uppercase tracking-widest py-4 rounded-xl transition-all shadow-lg cursor-pointer active:scale-95"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ─── WISHLIST DRAWER ─── */}
      {isWishlistOpen && (
        <div className="fixed inset-0 z-[100] select-none text-left">
          <div
            className="absolute inset-0 bg-black/45 backdrop-blur-sm transition-opacity"
            onClick={() => setIsWishlistOpen(false)}
          />
          <div className="fixed right-0 top-0 bottom-0 w-[420px] max-w-full bg-white shadow-2xl flex flex-col transition-all duration-300 animate-slide-in-right border-l border-zinc-200 rounded-l-[32px] overflow-hidden">
            {/* Header */}
            <div className="px-6 py-6 border-b border-zinc-150 flex items-center justify-between bg-zinc-50/50">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-[#6F4E37] fill-[#6F4E37]" />
                <h3 className="text-sm font-black uppercase tracking-wider text-zinc-950">
                  Your Wishlist ({wishlist.length})
                </h3>
              </div>
              <button
                onClick={() => setIsWishlistOpen(false)}
                className="p-2 rounded-full hover:bg-zinc-200/50 transition-colors cursor-pointer border-none bg-transparent text-zinc-650"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable List */}
            <div className="flex-grow overflow-y-auto p-6 flex flex-col gap-5">
              {wishlist.length === 0 ? (
                <div className="flex-grow flex flex-col items-center justify-center text-center py-20 gap-5">
                  <div className="w-16 h-16 rounded-full bg-[#f5f0eb]/70 border border-[#6F4E37]/15 flex items-center justify-center text-[#6F4E37]">
                    <Heart className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-wider text-zinc-800">
                      Your Wishlist is empty
                    </h4>
                    <p className="text-[11px] text-zinc-500 mt-1 max-w-[200px] font-mono leading-relaxed">
                      Tap the heart icons on product cards to compile your style wishlist here.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsWishlistOpen(false)}
                    className="mt-2 bg-[#6F4E37] hover:bg-[#5C3D2E] text-white text-[10px] font-black uppercase tracking-widest py-3.5 px-6 rounded-xl transition-all cursor-pointer shadow-md active:scale-95"
                  >
                    Explore Products
                  </button>
                </div>
              ) : (
                wishlist.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 pb-4 border-b border-zinc-100 items-start text-left"
                  >
                    <div className="relative w-20 h-24 bg-zinc-50 border rounded-xl overflow-hidden shrink-0 shadow-[0_2px_8px_rgba(0,0,0,0.03)]">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow">
                      <span className="text-[9px] text-zinc-400 font-mono tracking-widest uppercase block font-black">
                        {item.brand}
                      </span>
                      <h4 className="text-xs font-bold text-zinc-950 uppercase tracking-tight leading-tight mt-0.5 line-clamp-2">
                        {item.name}
                      </h4>
                      <strong className="text-xs font-black text-zinc-950 font-mono mt-1.5 block">
                        {item.price}
                      </strong>
                      
                      <div className="flex items-center gap-3 mt-3">
                        <button
                          onClick={() => handleMoveToBag(item)}
                          className="bg-[#6F4E37] hover:bg-[#5C3D2E] text-white text-[9px] font-black uppercase tracking-widest py-2.5 px-4 rounded-xl transition-all shadow-sm cursor-pointer active:scale-95"
                        >
                          Move To Bag
                        </button>
                        <button
                          onClick={() => toggleWishlist(item)}
                          className="text-zinc-400 hover:text-red-500 transition-colors text-[9px] font-bold uppercase tracking-wider bg-transparent border-none cursor-pointer p-1"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Auth Modal Removed in favor of dedicated auth pages */}

      {/* ─── REDESIGNED PREMIUM CUSTOM TOAST ─── */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-[130] bg-[#21130d] text-[#f5f0eb] px-5 py-4 rounded-2xl shadow-2xl border-2 border-[#6F4E37]/50 flex items-center gap-3 animate-slide-in-right text-xs font-mono font-bold uppercase tracking-wider min-w-[280px]">
          <div className="w-2.5 h-2.5 rounded-full bg-[#6F4E37] animate-ping shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ─── MOBILE LOCATION POPUP ─── */}
      <div 
        className={`fixed inset-0 z-[200] transition-opacity duration-300 md:hidden ${isLocationPopupOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}
      >
        {/* Overlay without blur */}
        <div 
          className="absolute inset-0 bg-black/40" 
          onClick={() => setIsLocationPopupOpen(false)}
        />
        {/* Popup Content sliding up */}
        <div 
          className={`absolute bottom-0 left-0 w-full bg-white dark:bg-zinc-950 rounded-t-2xl shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isLocationPopupOpen ? "translate-y-0" : "translate-y-full"}`}
        >
          <div className="flex items-center justify-between p-5 border-b border-zinc-100 dark:border-zinc-800">
            <h3 className="font-bold text-zinc-900 dark:text-white">Select Delivery Location</h3>
            <button 
              onClick={() => setIsLocationPopupOpen(false)}
              className="p-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <X className="w-5 h-5 text-zinc-500" />
            </button>
          </div>
          <div className="p-5 h-[40vh] overflow-y-auto">
            {!showAddressForm ? (
              <>
                <p className="text-sm text-zinc-500 mb-4">Select a location to see product availability and delivery options.</p>
                <div className="space-y-3">
                  <button 
                    onClick={() => {
                      setIsLocating(true);
                      if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(
                          (position) => {
                            setTimeout(() => {
                              setIsLocating(false);
                              setSelectedLocation("Current Location (Detected)");
                              showToast("Location updated successfully!");
                              setIsLocationPopupOpen(false);
                            }, 800);
                          },
                          (error) => {
                            setIsLocating(false);
                            showToast("Failed to detect location. Please try manually.");
                          }
                        );
                      } else {
                        setIsLocating(false);
                        showToast("Geolocation is not supported by your browser.");
                      }
                    }}
                    disabled={isLocating}
                    className="w-full text-left p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 flex items-center gap-3 hover:border-[#6F4E37] dark:hover:border-[#E6C280] transition-colors cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isLocating ? (
                      <Loader2 className="w-5 h-5 text-[#6F4E37] dark:text-[#E6C280] animate-spin shrink-0" />
                    ) : (
                      <MapPin className="w-5 h-5 text-[#6F4E37] dark:text-[#E6C280] shrink-0" />
                    )}
                    <div>
                      <p className="font-semibold text-zinc-900 dark:text-white text-sm">
                        {isLocating ? "Detecting..." : "Current Location"}
                      </p>
                      <p className="text-xs text-zinc-500">Using GPS</p>
                    </div>
                  </button>
                  <button 
                    onClick={() => setShowAddressForm(true)}
                    className="w-full text-left p-4 rounded-xl border border-dashed border-zinc-300 dark:border-zinc-700 flex items-center gap-3 hover:border-[#6F4E37] dark:hover:border-[#E6C280] transition-colors cursor-pointer bg-zinc-50/50 dark:bg-zinc-900/50"
                  >
                    <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shrink-0">
                      <Plus className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
                    </div>
                    <span className="font-semibold text-zinc-700 dark:text-zinc-300 text-sm">Add New Address</span>
                  </button>
                </div>
              </>
            ) : (
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  if (newAddress.trim()) {
                    setSelectedLocation(newAddress);
                    setNewAddress("");
                    setShowAddressForm(false);
                    setIsLocationPopupOpen(false);
                    showToast("Address added successfully!");
                  }
                }}
                className="space-y-4 animate-fade-in"
              >
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5 uppercase tracking-wider">Enter Address or Pincode</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. 10001 or New York"
                    value={newAddress}
                    onChange={(e) => setNewAddress(e.target.value)}
                    className="w-full h-11 px-4 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-transparent focus:border-[#6F4E37]/30 dark:focus:border-[#E6C280]/30 outline-none text-sm text-zinc-950 dark:text-white transition-all shadow-sm"
                  />
                </div>
                <div className="flex gap-3">
                  <button 
                    type="button"
                    onClick={() => setShowAddressForm(false)}
                    className="flex-1 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 text-xs font-bold uppercase tracking-wider hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                  >
                    Back
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 py-3 rounded-xl bg-[#6F4E37] dark:bg-[#E6C280] text-white dark:text-zinc-950 text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity"
                  >
                    Save
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
