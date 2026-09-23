"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingBag,
  Heart,
  Trash2,
  RotateCcw,
  Tag,
  ArrowRight,
  Plus,
  Minus,
  ShieldCheck,
  Truck,
  Clock,
  Check,
  ArrowUpRight,
  Zap
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SearchOverlay from "@/components/layout/SearchOverlay";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useAddress, Address, AddressType } from "@/context/AddressContext";
import { Pencil } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import { Surface } from "@/components/ui/Surface";
import { Button } from "@/components/ui/button";

export interface TrendingProduct {
  id: string;
  name: string;
  brand: string;
  price: string;
  originalPrice?: string;
  image: string;
  hoverImage?: string;
  badge: string;
  rating: number;
}

const TRENDING_PICKS: TrendingProduct[] = [
  {
    id: "p15",
    name: "Owners Club Heavyweight Zip Hoodie",
    brand: "REPRESENT",
    price: "₹3,899",
    originalPrice: "₹5,499",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=600&q=85",
    hoverImage: "https://images.unsplash.com/photo-1620799139507-2a76f79a2f4d?auto=format&fit=crop&w=600&q=85",
    badge: "Hot Seller",
    rating: 5.0
  },
  {
    id: "p13",
    name: "3XL Distressed Runner Sneakers",
    brand: "BALENCIAGA",
    price: "₹12,999",
    originalPrice: "₹16,500",
    image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=600&q=85",
    hoverImage: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=85",
    badge: "Grail Archive",
    rating: 4.9
  },
  {
    id: "p17",
    name: "8-Ball Brushed Mohair Cardigan",
    brand: "STÜSSY",
    price: "₹6,499",
    originalPrice: "₹8,999",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=85",
    hoverImage: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=85",
    badge: "Trending",
    rating: 4.8
  },
  {
    id: "p21",
    name: "Box Logo Embroidered Crewneck",
    brand: "SUPREME",
    price: "₹5,999",
    originalPrice: "₹7,800",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=85",
    hoverImage: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=600&q=85",
    badge: "Limited Drop",
    rating: 5.0
  }
];

const PRODUCT_COLORS: Record<string, { name: string; hex: string; image?: string; hoverImage?: string }[]> = {
  p15: [
    { name: "Vintage Black", hex: "#1A1A1A", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=600&q=85", hoverImage: "https://images.unsplash.com/photo-1620799139507-2a76f79a2f4d?auto=format&fit=crop&w=600&q=85" },
    { name: "Cream Sand", hex: "#D4C5B9", image: "https://images.unsplash.com/photo-1574169208507-84376144848b?auto=format&fit=crop&w=600&q=85", hoverImage: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=85" }
  ],
  p13: [
    { name: "Distressed Silver", hex: "#9CA3AF", image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=600&q=85", hoverImage: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=85" },
    { name: "Black Neon", hex: "#111827", image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=600&q=85", hoverImage: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=600&q=85" }
  ],
  p17: [
    { name: "Mohair Green", hex: "#3F4F38", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=85", hoverImage: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=85" },
    { name: "Charcoal Black", hex: "#27272A", image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=85", hoverImage: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=85" }
  ],
  p21: [
    { name: "Ash Grey", hex: "#D1D5DB", image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=85", hoverImage: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=600&q=85" },
    { name: "Supreme Red", hex: "#DC2626", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=85", hoverImage: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=85" }
  ]
};

const SIZES = ["XS", "S", "M", "L", "XL"];

export default function CartPage() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>("DRIP10");
  const [couponError, setCouponError] = useState("");
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [isAddressDrawerOpen, setIsAddressDrawerOpen] = useState(false);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<number | null>(null);
  const router = useRouter();

  // Address Context
  const { addresses, activeAddressId, addAddress, updateAddress, deleteAddress, setActiveAddress } = useAddress();

  const [addressForm, setAddressForm] = useState({
    name: "",
    phone: "",
    pincode: "",
    locality: "",
    address: "",
    city: "",
    state: "",
    type: "HOME" as AddressType,
  });

  const handleOpenAddAddress = () => {
    setAddressForm({
      name: "",
      phone: "",
      pincode: "",
      locality: "",
      address: "",
      city: "",
      state: "",
      type: "HOME",
    });
    setEditingAddressId(null);
    setIsAddingAddress(true);
  };

  const handleOpenEditAddress = (addr: Address) => {
    setAddressForm({
      name: addr.name,
      phone: addr.phone,
      pincode: addr.pincode,
      locality: addr.locality,
      address: addr.address,
      city: addr.city,
      state: addr.state,
      type: addr.type,
    });
    setEditingAddressId(addr.id);
    setIsAddingAddress(true);
  };

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingAddressId) {
      updateAddress(editingAddressId, addressForm);
      triggerToast("Address updated successfully.");
    } else {
      addAddress(addressForm);
      triggerToast("Address saved successfully.");
    }
    setIsAddingAddress(false);
    setEditingAddressId(null);
  };

  // Trending picks state
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});
  const [selectedColors, setSelectedColors] = useState<Record<string, string>>({});
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  const {
    cart,
    wishlist,
    removeFromCart,
    updateQuantity,
    toggleWishlist,
    addToCart,
    isInWishlist
  } = useCart();

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  
  // Free Shipping Threshold (₹1,999)
  const freeShippingThreshold = 1999;
  const freeShippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  // Coupon discount computation
  const couponDiscount = useMemo(() => {
    if (!appliedCoupon) return 0;
    if (appliedCoupon === "DRIP10") return Math.round(subtotal * 0.10);
    if (appliedCoupon === "VIP15") return Math.round(subtotal * 0.15);
    return 0;
  }, [appliedCoupon, subtotal]);

  const totalAmount = Math.max(0, subtotal - couponDiscount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (code === "DRIP10" || code === "VIP15") {
      setAppliedCoupon(code);
      setCouponError("");
      triggerToast(`Coupon code ${code} applied successfully!`);
    } else {
      setCouponError("Invalid Coupon. Try using DRIP10 or VIP15.");
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
    triggerToast("Coupon code removed.");
  };

  const handleMoveToWishlist = (item: any) => {
    toggleWishlist({
      id: item.id,
      name: item.name,
      price: `₹${item.price.toLocaleString()}`,
      brand: item.brand,
      image: item.image,
    });
    removeFromCart(item.id, item.size, item.color);
    triggerToast(`Moved ${item.name} to your Wishlist.`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5] dark:bg-[#0C0B0A] text-zinc-900 dark:text-white font-sans antialiased select-none transition-colors duration-300 w-full">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 px-5 py-3.5 rounded-2xl font-mono text-xs font-bold shadow-2xl flex items-center gap-2.5 border border-white/10 animate-fade-in">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Navigation Header */}
      <Navbar onSearchClick={() => setIsSearchOpen(true)} />
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Main Content (FULL WIDTH, NO UNWANTED SIDE GUTTERS) */}
      <main className="flex-grow py-6 sm:py-10 select-none w-full">
        <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-12 md:px-16 lg:px-20 space-y-10 sm:space-y-14">
          
          {cart.length === 0 ? (
            /* ─── EMPTY CART STATE (PRESERVED HEADINGS & BEAUTIFIED) ─── */
            <div className="text-center py-16 max-w-2xl mx-auto space-y-10 animate-fade-in">
              <div className="space-y-4">
                <div className="w-24 h-24 bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 rounded-3xl flex items-center justify-center mx-auto shadow-md">
                  <ShoppingBag className="w-10 h-10 text-[#6F4E37] dark:text-[#E6C280]" />
                </div>
                <div className="space-y-2">
                  <span className="text-[9.5px] font-mono font-bold tracking-[0.25em] text-[#6F4E37] dark:text-[#E6C280] uppercase">
                    YOUR CLOSET
                  </span>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-zinc-950 dark:text-zinc-50 font-playfair leading-[1.05] uppercase">
                    Shopping Bag is <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280]">Empty</span>
                  </h1>
                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-sans max-w-sm mx-auto leading-relaxed">
                    Add limited edition apparel, authenticated grails, or sneaker silhouettes to your curated closet.
                  </p>
                </div>
              </div>

              <Button
                asChild
                variant="drip"
                className="text-xs py-4 px-9 rounded-2xl shadow-xl gap-2"
              >
                <Link href="/shop">
                  <span>Explore Catalog Drops</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>

              {/* EMPTY STATE WISHLIST PREVIEW */}
              {wishlist.length > 0 && (
                <div className="w-full border-t border-stone-200/90 dark:border-zinc-800 pt-12 text-left space-y-6">
                  <div>
                    <span className="text-[9px] font-mono font-bold tracking-[0.25em] text-[#6F4E37] dark:text-[#E6C280] uppercase">
                      YOUR CURATION
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-light tracking-tight text-zinc-900 dark:text-white font-playfair uppercase mt-1">
                      From Your <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280]">Wishlist</span>
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {wishlist.slice(0, 4).map((item) => {
                      const priceFormatted = typeof item.price === "string" && item.price.includes("₹")
                        ? item.price
                        : `₹${parseInt(String(item.price).replace(/[^\d]/g, "") || "2999").toLocaleString()}`;
                      
                      return (
                        <div key={item.id} className="w-full shrink-0 flex flex-col justify-between">
                          <ProductCard
                            id={item.id}
                            name={item.name}
                            brand={item.brand || "DripHunter Archive"}
                            price={priceFormatted}
                            image={item.image}
                            buttonLabel="Move to Bag"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* ─── ACTIVE CART FLOW (FULL BLEED EXPANSIVE LUXURY UX) ─── */
            <div className="space-y-8 sm:space-y-10 animate-fade-in text-left w-full">
              
              {/* Editorial Header */}
              <div className="border-b border-stone-200/90 dark:border-zinc-800 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <span className="text-[9.5px] font-mono font-bold tracking-[0.3em] text-[#6F4E37] dark:text-[#E6C280] uppercase block mb-1">
                    YOUR CLOSET
                  </span>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-zinc-950 dark:text-zinc-50 font-playfair leading-[1.05]">
                    Shopping <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280]">Bag</span>
                  </h1>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold tracking-wider text-zinc-600 dark:text-zinc-400 uppercase bg-white dark:bg-zinc-900 px-4 py-2 rounded-full border border-stone-200 dark:border-zinc-800 shadow-xs">
                    {cartCount} {cartCount === 1 ? "Item" : "Items"} Cataloged
                  </span>
                </div>
              </div>

              {/* Deliver to Section */}
              {(() => {
                const activeAddr = addresses.length > 0 && activeAddressId 
                  ? addresses.find((a) => a.id === activeAddressId) 
                  : undefined;
                  
                if (activeAddr) {
                  return (
                    <Surface className="rounded-[28px] max-md:rounded-none max-md:border-x-0 p-4 sm:p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div className="space-y-1 overflow-hidden w-full">
                        <div className="flex flex-wrap items-center gap-2 text-xs font-sans font-bold">
                          <span className="text-zinc-500">Deliver to:</span>
                          <strong className="text-zinc-900 dark:text-white">{activeAddr.name}, {activeAddr.pincode}</strong>
                          <span className="bg-stone-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 text-[9px] px-2 py-0.5 rounded-sm uppercase tracking-widest">{activeAddr.type}</span>
                        </div>
                        <p className="text-[11px] font-sans text-zinc-600 dark:text-zinc-400 truncate w-full pr-4">
                          {activeAddr.address}, {activeAddr.locality}, {activeAddr.city}
                        </p>
                      </div>
                      <button 
                        onClick={() => setIsAddressDrawerOpen(true)}
                        className="text-[11px] font-sans font-bold text-[#2874F0] dark:text-[#3B82F6] bg-white dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 sm:border-none sm:bg-transparent px-4 py-2 sm:px-0 sm:py-0 rounded shadow-sm sm:shadow-none cursor-pointer shrink-0 self-start sm:self-auto">
                        Change
                      </button>
                    </Surface>
                  );
                }
                
                return (
                  <Surface className="rounded-[28px] p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="space-y-1 text-sm text-zinc-600 dark:text-zinc-400 font-sans">
                      No delivery address selected.
                    </div>
                    <Button 
                      variant="drip"
                      onClick={() => { setIsAddressDrawerOpen(true); handleOpenAddAddress(); }}
                      className="text-[10px] px-5 py-2.5 rounded-xl shadow-xs shrink-0"
                    >
                      Add Address
                    </Button>
                  </Surface>
                );
              })()}



              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start w-full">
                
                {/* Left Column: Items catalog details (8 cols on large screens) */}
                <div className="lg:col-span-8 space-y-4 w-full overflow-x-auto">
                  {cart.map((item, index) => {
                    const isLiked = isInWishlist(item.id);
                    // For demonstration, let's make the second item out of stock, or if cart has 1 item, randomly based on some id.
                    // We'll use a specific condition based on id containing 'p13' or index === 1 to show out of stock logic.
                    const isOutOfStock = item.id.includes("p13") || index === 1;

                    return (
                      <div
                        key={`${item.id}-${item.size}-${item.color}`}
                        className="bg-white dark:bg-zinc-900/90 border border-stone-200/90 dark:border-zinc-800/90 rounded-[32px] max-md:rounded-none max-md:border-x-0 p-4 sm:p-7 flex flex-col sm:flex-row gap-3 sm:gap-6 items-start sm:items-center text-left shadow-xs hover:shadow-xl transition-all duration-500 hover:border-[#6F4E37]/35 dark:hover:border-[#E6C280]/40 group relative w-full"
                      >
                        {/* Mobile Top Row: Image + Details */}
                        <div className="flex flex-row gap-4 w-full sm:w-auto sm:flex-grow">
                          {/* Image */}
                          <div className="relative w-24 h-32 sm:w-32 sm:h-40 bg-stone-100 dark:bg-zinc-800 border border-stone-200/70 dark:border-zinc-700 rounded-xl sm:rounded-2xl overflow-hidden shrink-0 shadow-inner">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                            <div className="absolute top-1 left-1 sm:top-2 sm:left-2 bg-black/70 backdrop-blur-xs text-white text-[6px] sm:text-[7.5px] font-mono font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
                              AUTHENTIC
                            </div>
                          </div>

                          {/* Details */}
                          <div className="flex-grow space-y-1.5 sm:space-y-3 w-full">
                            <div>
                              <span className="text-[9px] text-[#6F4E37] dark:text-[#E6C280] font-mono tracking-widest uppercase block font-bold">
                                {item.brand}
                              </span>
                              <h3 className="text-[13px] sm:text-xl font-light text-zinc-900 dark:text-white uppercase tracking-tight leading-snug mt-0.5 font-playfair group-hover:text-[#6F4E37] dark:group-hover:text-[#E6C280] transition-colors duration-300 break-words line-clamp-2">
                                {item.name}
                              </h3>
                            </div>

                            {/* Configs (Size & Color) */}
                            <div className="flex flex-wrap items-center gap-2 text-[9px] sm:text-[9.5px] font-sans sm:font-mono font-bold text-zinc-600 dark:text-zinc-400 sm:uppercase">
                              <span className="bg-stone-50 dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 px-1.5 py-0.5 sm:px-3 sm:py-1 rounded sm:rounded-lg">Size: {item.size}</span>
                              <span className="bg-stone-50 dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 px-1.5 py-0.5 sm:px-3 sm:py-1 rounded sm:rounded-lg">Color: {item.color}</span>
                              {isOutOfStock && <span className="hidden sm:flex text-red-500 items-center gap-1.5 font-mono text-[9px]"><span className="w-1.5 h-1.5 rounded-full bg-red-500" />OUT OF STOCK</span>}
                              {!isOutOfStock && <span className="hidden sm:flex text-emerald-600 dark:text-emerald-400 items-center gap-1.5 font-mono text-[9px]"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />IN STOCK</span>}
                            </div>

                            {/* Mobile Pricing */}
                            <div className="flex items-center gap-2 pt-1 sm:hidden">
                              <span className="text-xs font-sans text-zinc-400 line-through">₹{(item.price * item.quantity + 500).toLocaleString()}</span>
                              <strong className="text-lg font-bold text-zinc-900 dark:text-white font-sans">
                                ₹{(item.price * item.quantity).toLocaleString()}
                              </strong>
                              <span className="text-[10px] text-green-600 font-bold font-sans">12% Off</span>
                            </div>

                            {/* Desktop only: Quantity & Policies */}
                            <div className="hidden sm:flex flex-wrap items-center gap-5 pt-1">
                              <div className="flex items-center border border-stone-200 dark:border-zinc-700 rounded-xl overflow-hidden h-9 bg-stone-50 dark:bg-zinc-800">
                                <button
                                  onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)}
                                  disabled={isOutOfStock}
                                  className="px-3 h-full hover:bg-stone-200 dark:hover:bg-zinc-700 transition-colors border-none bg-transparent cursor-pointer flex items-center justify-center text-zinc-600 dark:text-zinc-300 disabled:opacity-50"
                                >
                                  <Minus className="w-3.5 h-3.5" />
                                </button>
                                <span className="px-3.5 text-xs font-bold text-zinc-900 dark:text-white font-mono">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}
                                  disabled={isOutOfStock}
                                  className="px-3 h-full hover:bg-stone-200 dark:hover:bg-zinc-700 transition-colors border-none bg-transparent cursor-pointer flex items-center justify-center text-zinc-600 dark:text-zinc-300 disabled:opacity-50"
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                </button>
                              </div>
                              <div className="flex items-center gap-1.5 text-[9.5px] font-bold text-zinc-400 dark:text-zinc-500 font-mono uppercase tracking-wider">
                                <RotateCcw className="w-3.5 h-3.5 text-[#6F4E37] dark:text-[#E6C280]" />
                                <span>14 Days Return Available</span>
                              </div>
                            </div>

                            {/* Action links (Desktop) */}
                            <div className="hidden sm:flex items-center gap-5 pt-2.5 border-t border-stone-100 dark:border-zinc-800 mt-1">
                              {!isOutOfStock && (
                                <button
                                  onClick={() => handleMoveToWishlist(item)}
                                  className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 hover:text-[#6F4E37] dark:hover:text-[#E6C280] transition-colors bg-transparent border-none cursor-pointer"
                                >
                                  <Heart className={`w-3.5 h-3.5 ${isLiked ? "text-red-500" : ""}`} fill={isLiked ? "#ef4444" : "none"} />
                                  Move to Wishlist
                                </button>
                              )}
                              <button
                                onClick={() => { removeFromCart(item.id, item.size, item.color); triggerToast(`Removed ${item.name} from Bag.`); }}
                                className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 hover:text-red-500 transition-colors bg-transparent border-none cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                Remove
                              </button>
                              {!isOutOfStock && (
                                <button
                                  onClick={() => router.push('/checkout')}
                                  className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-900 dark:text-white hover:text-[#6F4E37] dark:hover:text-[#E6C280] transition-colors bg-transparent border-none cursor-pointer ml-4"
                                >
                                  <Zap className="w-3.5 h-3.5" />
                                  Buy this now
                                </button>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Mobile Actions & Quantity (Hidden on desktop) */}
                        <div className="flex sm:hidden flex-col w-full space-y-3 pt-3">
                           <div className="flex items-center justify-between">
                             <div className="flex items-center gap-2">
                                <span className="text-[11px] font-sans text-zinc-600">Qty:</span>
                                <div className="flex items-center border border-stone-300 dark:border-zinc-600 rounded overflow-hidden h-7 bg-white dark:bg-zinc-800 shadow-sm">
                                  <button onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)} disabled={isOutOfStock} className="px-2 h-full flex items-center justify-center text-zinc-600 bg-stone-50 dark:bg-zinc-700 disabled:opacity-50 border-r border-stone-300 dark:border-zinc-600"><Minus className="w-3 h-3" /></button>
                                  <span className="px-3 text-xs font-bold font-sans text-zinc-900 dark:text-white">{item.quantity}</span>
                                  <button onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)} disabled={isOutOfStock} className="px-2 h-full flex items-center justify-center text-zinc-600 bg-stone-50 dark:bg-zinc-700 disabled:opacity-50 border-l border-stone-300 dark:border-zinc-600"><Plus className="w-3 h-3" /></button>
                                </div>
                             </div>
                             {isOutOfStock ? (
                               <span className="text-red-500 font-sans text-[10px] font-bold">Out of stock</span>
                             ) : (
                               <span className="text-zinc-600 dark:text-zinc-400 font-sans text-[10px]">Delivery by Sep 18</span>
                             )}
                           </div>
                           
                           {/* Flipkart style action buttons */}
                           <div className="flex items-center justify-around border-t border-stone-200 dark:border-zinc-700 pt-3 mt-1">
                             <button onClick={() => handleMoveToWishlist(item)} className="flex items-center gap-1.5 text-[11px] font-sans font-bold text-zinc-600 dark:text-zinc-300 bg-transparent border-none"><Heart className="w-3.5 h-3.5" /> Save for later</button>
                             <div className="w-px h-4 bg-stone-300 dark:bg-zinc-600" />
                             <button onClick={() => removeFromCart(item.id, item.size, item.color)} className="flex items-center gap-1.5 text-[11px] font-sans font-bold text-zinc-600 dark:text-zinc-300 bg-transparent border-none"><Trash2 className="w-3.5 h-3.5" /> Remove</button>
                             <div className="w-px h-4 bg-stone-300 dark:bg-zinc-600" />
                             <button onClick={() => router.push('/checkout')} className="flex items-center gap-1.5 text-[11px] font-sans font-bold text-zinc-600 dark:text-zinc-300 bg-transparent border-none"><Zap className="w-3.5 h-3.5" /> Buy this now</button>
                           </div>
                        </div>

                        {/* Pricing details (Desktop only) */}
                        <div className="hidden sm:flex sm:text-right shrink-0 self-stretch sm:self-center sm:flex-col items-baseline sm:items-end justify-between sm:justify-center w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-none border-stone-100 dark:border-zinc-800">
                          <strong className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white font-mono">
                            ₹{(item.price * item.quantity).toLocaleString()}
                          </strong>
                          <span className="text-[9.5px] font-mono text-zinc-400 block mt-0.5">
                            ₹{item.price.toLocaleString()} each
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Right Column: Pricing Summary (4 cols on large screens) */}
                <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24 text-left">
                  
                  {/* Coupon section */}
                  <Surface className="dark:bg-zinc-900/90 dark:border-zinc-800/90 shadow-xs p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-900 dark:text-white flex items-center gap-2">
                        <Tag className="w-4 h-4 text-[#6F4E37] dark:text-[#E6C280]" />
                        Apply Coupon
                      </h3>
                      <span className="text-[8.5px] font-mono text-zinc-400">Available: DRIP10, VIP15</span>
                    </div>
                    
                    {appliedCoupon ? (
                      <div className="flex items-center justify-between bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 rounded-2xl p-3.5 text-xs font-mono">
                        <div className="flex items-center gap-2">
                          <span className="bg-emerald-600 text-white text-[8.5px] font-bold tracking-widest px-2 py-0.5 rounded-md">{appliedCoupon}</span>
                          <span>{appliedCoupon === "VIP15" ? "15% VIP Coupon" : "10% Coupon"} Applied</span>
                        </div>
                        <button
                          onClick={handleRemoveCoupon}
                          className="text-emerald-700 dark:text-emerald-300 hover:text-red-500 transition-colors border-none bg-transparent cursor-pointer font-bold text-xs"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleApplyCoupon} className="flex gap-2">
                        <input
                          type="text"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          placeholder="Enter Promo Code (e.g. DRIP10)"
                          className="flex-grow bg-stone-50 dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 focus:border-[#6F4E37] dark:focus:border-[#E6C280] rounded-xl px-4 py-3 text-xs font-mono text-zinc-900 dark:text-white outline-none transition-colors uppercase placeholder-zinc-400"
                        />
                        <Button
                          variant="drip"
                          type="submit"
                          className="text-[10px] py-3 px-5 rounded-xl shadow-xs"
                        >
                          Apply
                        </Button>
                      </form>
                    )}
                    {couponError && (
                      <span className="text-[10px] font-mono text-red-500 dark:text-red-400 block">
                        {couponError}
                      </span>
                    )}
                    
                    <div className="pt-1">
                      <Link href="/coupons" className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-widest text-[#6F4E37] dark:text-[#E6C280] hover:text-zinc-950 dark:hover:text-white transition-colors group">
                        View All Coupons <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </Surface>

                  {/* Summary recap details */}
                  <Surface className="dark:bg-zinc-900/90 dark:border-zinc-800/90 p-5 sm:p-6 lg:p-8 shadow-md space-y-5 sm:space-y-6 max-md:rounded-none max-md:border-x-0 mt-3 sm:mt-0">
                    <div className="flex items-center justify-between border-b border-stone-200 dark:border-zinc-800 pb-3">
                      <h3 className="text-sm font-sans font-bold text-zinc-900 dark:text-white sm:text-xs sm:font-mono sm:uppercase sm:tracking-wider sm:text-[#6F4E37] sm:dark:text-[#E6C280]">
                        Price Details
                      </h3>
                      <span className="text-[11px] sm:text-[9.5px] font-sans sm:font-mono text-zinc-400 uppercase hidden sm:block">
                        {cartCount} Items
                      </span>
                    </div>

                    {/* Breakdown columns */}
                    <div className="space-y-4 text-[13px] sm:text-xs font-sans sm:font-mono text-zinc-600 dark:text-zinc-400">
                      <div className="flex justify-between">
                        <span className="max-md:font-medium">MRP (incl. of all taxes)</span>
                        <span className="text-zinc-900 dark:text-white font-bold">₹{(subtotal + 500).toLocaleString()}</span>
                      </div>
                      
                      <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-bold">
                        <span>Discounts {appliedCoupon ? `(${appliedCoupon})` : ""}</span>
                        <span>-₹{(couponDiscount + 500).toLocaleString()}</span>
                      </div>

                      <div className="flex justify-between">
                        <span className="max-md:font-medium">Fees</span>
                        <span className="text-zinc-900 dark:text-white font-bold">₹10</span>
                      </div>

                      <div className="pt-4 border-t border-dashed border-stone-300 dark:border-zinc-700 flex items-center justify-between text-sm sm:text-2xl">
                        <div>
                          <strong className="text-base font-sans font-bold text-zinc-900 dark:text-white block sm:text-xs sm:font-mono sm:uppercase">Total Amount</strong>
                          <span className="hidden sm:block text-[8.5px] font-mono text-zinc-400 uppercase">Includes all GST &amp; taxes</span>
                        </div>
                        <strong className="text-base sm:text-3xl font-bold text-zinc-900 dark:text-white font-sans sm:font-mono sm:font-black">
                          ₹{(totalAmount + 10).toLocaleString()}
                        </strong>
                      </div>
                      
                      <div className="pt-3 max-md:border-t max-md:border-stone-200">
                         <div className="bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 font-bold text-xs p-2.5 rounded flex items-center gap-2">
                           <ShieldCheck className="w-4 h-4 text-emerald-500" /> You'll save ₹{(500 + couponDiscount).toLocaleString()} on this order!
                         </div>
                      </div>
                    </div>

                    {/* Proceed Link CTA (Desktop Only) */}
                    <div className="hidden sm:block">
                      <Button
                        asChild
                        variant="drip"
                        className="w-full text-xs py-4 rounded-2xl shadow-xl gap-2"
                      >
                        <Link href="/checkout">
                          <span>Proceed to Checkout</span>
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </Button>
                    </div>

                    {/* Security stamp & Accepted Payments */}
                    <div className="space-y-3 pt-2 border-t border-stone-100 dark:border-zinc-800 text-center">
                      <div className="flex items-center justify-center gap-2 text-[9.5px] font-mono text-zinc-500 uppercase tracking-widest">
                        <ShieldCheck className="w-4 h-4 text-emerald-500" />
                        <span>100% Physical Legit-Check Guaranteed</span>
                      </div>

                      <p className="text-[9px] font-mono text-zinc-400 uppercase tracking-wider">
                        UPI • Credit / Debit Cards • NetBanking • EMI
                      </p>
                    </div>
                  </Surface>

                </div>

              </div>

              {/* ─── TRENDING PICKS SECTION (EXACT 4 PROMINENT CARDS IN RESPONSIVE GRID - NO SCROLL) ─── */}
              <div className="w-full border-t border-stone-200/90 dark:border-zinc-800 pt-14 text-left space-y-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-stone-200/70 dark:border-zinc-800/80 pb-6 text-left">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#6F4E37] dark:bg-[#E6C280] animate-pulse" />
                      <span className="text-[9.5px] sm:text-[10px] font-bold tracking-[0.25em] text-[#6F4E37] dark:text-[#E6C280] uppercase font-mono">
                        CURATED FOR YOU
                      </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-zinc-950 dark:text-zinc-50 font-playfair leading-[1.05]">
                      Trending <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280]">Picks</span>
                    </h2>
                  </div>
                  
                  <div className="flex flex-col md:items-end justify-end md:max-w-md w-full md:w-auto gap-2 text-left md:text-right">
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 font-sans font-light leading-relaxed">
                      Complete your styling rotation with 100% authenticated luxury streetwear grails.
                    </p>
                    <Link
                      href="/shop"
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-bold tracking-wider text-zinc-900 dark:text-zinc-100 hover:text-[#6F4E37] dark:hover:text-[#E6C280] transition-colors group"
                    >
                      <span>VIEW ALL PIECES</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>

                {/* 4 Balanced Cards in Responsive Grid (No Scroll) */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-7 w-full">
                  {TRENDING_PICKS.map((p) => {
                    return (
                      <div key={p.id} className="w-full shrink-0 flex flex-col justify-between">
                        <ProductCard
                          id={p.id}
                          name={p.name}
                          brand={p.brand}
                          price={p.price}
                          originalPrice={p.originalPrice}
                          image={p.image}
                          hoverImage={p.hoverImage}
                          badge={p.badge}
                          rating={p.rating}
                          colors={PRODUCT_COLORS[p.id]}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          )}

        </div>
      </main>

      {/* Mobile Sticky Footer Checkout */}
      {cart.length > 0 && (
        <div className="sm:hidden fixed bottom-0 left-0 right-0 z-[60] bg-white dark:bg-zinc-900 border-t border-stone-200 dark:border-zinc-800 p-2.5 px-4 flex items-center justify-between shadow-[0_-10px_20px_rgba(0,0,0,0.08)]">
          <div className="flex flex-col gap-0.5">
            <span className="text-[12px] font-sans font-medium text-zinc-500 line-through tracking-wide">₹{(subtotal + 500).toLocaleString()}</span>
            <strong className="text-xl font-bold text-zinc-900 dark:text-white font-sans tracking-tight">₹{(totalAmount + 10).toLocaleString()}</strong>
          </div>
          <Button
            asChild
            className="bg-[#6F4E37] hover:bg-[#5a3e2b] text-white text-sm font-sans font-bold px-9 py-5 rounded-sm shadow-none border-none"
          >
            <Link href="/checkout">
              Place Order
            </Link>
          </Button>
        </div>
      )}

      {/* Footer */}
      <div className="max-md:pb-[72px]">
        <Footer />
      </div>
      {/* Address Drawer */}
      {isAddressDrawerOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="absolute inset-0 bg-black/40 transition-opacity" onClick={() => setIsAddressDrawerOpen(false)} />
          <div className="relative w-full max-w-md bg-white dark:bg-zinc-950 h-full shadow-2xl flex flex-col transform transition-transform duration-300 translate-x-0">
            <div className="p-6 border-b border-stone-200 dark:border-zinc-800 flex items-center justify-between">
              <h2 className="text-xl font-bold font-playfair uppercase text-zinc-900 dark:text-white">
                {isAddingAddress ? (editingAddressId ? "Edit Address" : "Add New Address") : "Change Delivery Address"}
              </h2>
              <button 
                onClick={() => {
                  if (isAddingAddress) setIsAddingAddress(false);
                  else setIsAddressDrawerOpen(false);
                }} 
                className="text-zinc-500 hover:text-black dark:hover:text-white bg-transparent border-none cursor-pointer transition-colors p-2"
              >
                <Plus className="w-6 h-6 rotate-45" />
              </button>
            </div>
            
            <div className="p-6 flex-grow overflow-y-auto space-y-4">
              {isAddingAddress ? (
                <form className="space-y-4" onSubmit={handleSaveAddress}>
                  <div className="space-y-3">
                    <input type="text" placeholder="Full Name" required value={addressForm.name} onChange={(e) => setAddressForm({ ...addressForm, name: e.target.value })} className="w-full bg-stone-50 dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 focus:border-[#6F4E37] dark:focus:border-[#E6C280] rounded-xl px-4 py-3 text-sm font-sans outline-none transition-colors" />
                    <input type="tel" placeholder="Mobile Number" required value={addressForm.phone} onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })} className="w-full bg-stone-50 dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 focus:border-[#6F4E37] dark:focus:border-[#E6C280] rounded-xl px-4 py-3 text-sm font-sans outline-none transition-colors" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input type="text" placeholder="Pincode" required value={addressForm.pincode} onChange={(e) => setAddressForm({ ...addressForm, pincode: e.target.value })} className="w-full bg-stone-50 dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 focus:border-[#6F4E37] dark:focus:border-[#E6C280] rounded-xl px-4 py-3 text-sm font-sans outline-none transition-colors" />
                      <input type="text" placeholder="State" required value={addressForm.state} onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })} className="w-full bg-stone-50 dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 focus:border-[#6F4E37] dark:focus:border-[#E6C280] rounded-xl px-4 py-3 text-sm font-sans outline-none transition-colors" />
                    </div>
                    <textarea placeholder="Address (House No, Building, Street, Area)" required rows={3} value={addressForm.address} onChange={(e) => setAddressForm({ ...addressForm, address: e.target.value })} className="w-full bg-stone-50 dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 focus:border-[#6F4E37] dark:focus:border-[#E6C280] rounded-xl px-4 py-3 text-sm font-sans outline-none transition-colors resize-none" />
                    <input type="text" placeholder="Locality / Area" required value={addressForm.locality} onChange={(e) => setAddressForm({ ...addressForm, locality: e.target.value })} className="w-full bg-stone-50 dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 focus:border-[#6F4E37] dark:focus:border-[#E6C280] rounded-xl px-4 py-3 text-sm font-sans outline-none transition-colors" />
                    <input type="text" placeholder="City / District" required value={addressForm.city} onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })} className="w-full bg-stone-50 dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 focus:border-[#6F4E37] dark:focus:border-[#E6C280] rounded-xl px-4 py-3 text-sm font-sans outline-none transition-colors" />
                    
                    <div className="pt-2">
                      <p className="text-xs font-bold text-zinc-500 mb-2 uppercase tracking-wider font-mono">Address Type</p>
                      <div className="flex gap-3">
                        <label className="flex-1 flex items-center justify-center gap-2 border border-stone-200 dark:border-zinc-800 rounded-xl py-3 cursor-pointer hover:border-[#6F4E37] dark:hover:border-[#E6C280] transition-colors has-[:checked]:border-[#6F4E37] has-[:checked]:bg-[#6F4E37]/5 dark:has-[:checked]:border-[#E6C280] dark:has-[:checked]:bg-[#E6C280]/10">
                          <input type="radio" name="addressType" value="HOME" checked={addressForm.type === "HOME"} onChange={(e) => setAddressForm({ ...addressForm, type: e.target.value as AddressType })} className="hidden" />
                          <span className="text-xs font-mono font-bold">HOME</span>
                        </label>
                        <label className="flex-1 flex items-center justify-center gap-2 border border-stone-200 dark:border-zinc-800 rounded-xl py-3 cursor-pointer hover:border-[#6F4E37] dark:hover:border-[#E6C280] transition-colors has-[:checked]:border-[#6F4E37] has-[:checked]:bg-[#6F4E37]/5 dark:has-[:checked]:border-[#E6C280] dark:has-[:checked]:bg-[#E6C280]/10">
                          <input type="radio" name="addressType" value="WORK" checked={addressForm.type === "WORK"} onChange={(e) => setAddressForm({ ...addressForm, type: e.target.value as AddressType })} className="hidden" />
                          <span className="text-xs font-mono font-bold">WORK</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 pt-4 border-t border-stone-200 dark:border-zinc-800">
                    <button type="button" onClick={() => setIsAddingAddress(false)} className="flex-1 py-3.5 rounded-xl border border-stone-200 dark:border-zinc-700 text-xs font-bold font-mono uppercase tracking-widest text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors cursor-pointer bg-transparent">
                      Cancel
                    </button>
                    <Button type="submit" variant="drip" className="flex-1 py-3.5 rounded-xl text-xs shadow-md">
                      {editingAddressId ? "Save Changes" : "Save Address"}
                    </Button>
                  </div>
                </form>
              ) : (
                <>
                  {addresses.map((addr) => {
                    const isActive = activeAddressId === addr.id;
                    return (
                      <div 
                        key={addr.id}
                        onClick={() => !isActive && setActiveAddress(addr.id)}
                        className={`border rounded-2xl p-5 relative overflow-hidden group transition-all cursor-pointer ${
                          isActive 
                            ? "border-[#6F4E37] dark:border-[#E6C280] bg-stone-50 dark:bg-zinc-900/50" 
                            : "border-stone-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-400 dark:hover:border-zinc-600"
                        }`}
                      >
                        {isActive && <div className="absolute top-0 left-0 w-1.5 h-full bg-[#6F4E37] dark:bg-[#E6C280]" />}
                        <div className="flex justify-between items-start pl-2">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <strong className={`text-sm uppercase font-bold transition-colors ${isActive ? "text-zinc-900 dark:text-white" : "text-zinc-900 dark:text-white group-hover:text-[#6F4E37] dark:group-hover:text-[#E6C280]"}`}>
                                {addr.name}
                              </strong>
                              <span className={`text-[9px] px-2 py-0.5 rounded uppercase font-bold border shadow-sm ${isActive ? "bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border-stone-200 dark:border-zinc-700" : "bg-stone-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 border-stone-200 dark:border-zinc-700"}`}>
                                {addr.type}
                              </span>
                            </div>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-sans leading-relaxed mt-1 pr-12">
                              {addr.address}, {addr.locality}, {addr.city}, {addr.state}, {addr.pincode}
                            </p>
                            <p className={`text-xs mt-2.5 font-mono w-fit px-3 py-1 rounded-md border shadow-sm ${isActive ? "text-zinc-500 dark:text-zinc-400 bg-white dark:bg-zinc-800 border-stone-200 dark:border-zinc-700" : "text-zinc-500 dark:text-zinc-400 bg-stone-50 dark:bg-zinc-800 border-stone-200 dark:border-zinc-700"}`}>
                              Mobile: +91 {addr.phone}
                            </p>
                          </div>
                          {isActive && <Check className="w-5 h-5 text-[#6F4E37] dark:text-[#E6C280] shrink-0 absolute top-5 right-5" />}
                          
                          {/* Actions (Edit / Delete) */}
                          <div className={`absolute bottom-5 right-5 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity ${isActive ? "hidden" : "flex"}`}>
                            <button 
                              onClick={(e) => { e.stopPropagation(); handleOpenEditAddress(addr); }}
                              className="w-8 h-8 rounded-full bg-stone-100 dark:bg-zinc-800 hover:bg-[#6F4E37] hover:text-white dark:hover:bg-[#E6C280] dark:hover:text-zinc-900 flex items-center justify-center text-zinc-500 transition-colors cursor-pointer border-none"
                            >
                              <Pencil className="w-3.5 h-3.5" />
                            </button>
                            <button 
                              onClick={(e) => { e.stopPropagation(); deleteAddress(addr.id); triggerToast("Address deleted."); }}
                              className="w-8 h-8 rounded-full bg-rose-50 dark:bg-rose-950/30 hover:bg-rose-500 hover:text-white flex items-center justify-center text-rose-500 transition-colors cursor-pointer border-none"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {isActive && (
                          <div className="mt-5 pl-2 flex items-center gap-3">
                            <button 
                              onClick={() => setIsAddressDrawerOpen(false)}
                              className="flex-1 bg-[#6F4E37] dark:bg-[#E6C280] hover:bg-zinc-950 dark:hover:bg-white text-white dark:text-zinc-950 text-[10px] font-mono font-bold py-3 rounded-xl uppercase tracking-widest transition-all shadow-md active:scale-95 border-none cursor-pointer">
                              Deliver Here
                            </button>
                            <button 
                              onClick={(e) => { e.stopPropagation(); handleOpenEditAddress(addr); }}
                              className="w-12 h-10 flex items-center justify-center border border-stone-200 dark:border-zinc-700 rounded-xl text-zinc-500 hover:text-[#6F4E37] dark:hover:text-[#E6C280] hover:border-[#6F4E37] dark:hover:border-[#E6C280] transition-colors cursor-pointer bg-transparent"
                            >
                              <Pencil className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {/* Add New Button */}
                  <button 
                    onClick={handleOpenAddAddress}
                    className="w-full mt-2 border-2 border-dashed border-stone-300 dark:border-zinc-700 rounded-2xl p-5 flex flex-col items-center justify-center gap-2 hover:border-[#6F4E37] dark:hover:border-[#E6C280] hover:bg-stone-50 dark:hover:bg-zinc-900/50 transition-all cursor-pointer group bg-transparent">
                    <Plus className="w-6 h-6 text-zinc-400 group-hover:text-[#6F4E37] dark:group-hover:text-[#E6C280] transition-colors" />
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-300 group-hover:text-[#6F4E37] dark:group-hover:text-[#E6C280] transition-colors">Add New Address</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
