"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import {
  Star,
  Heart,
  Check,
  ChevronRight,
  ChevronLeft,
  Info,
  Sparkles,
  ShoppingBag,
  Plus,
  Minus,
  X,
  MessageSquare,
  Camera,
  Scan,
  Cpu,
  Layers,
  RotateCcw,
  Zap,
  ArrowRight,
  Share2,
  ShieldCheck,
  Truck,
  MapPin,
  Store,
  IndianRupee,
  Headset,
  Home,
  Pencil,
  Trash2,
  ArrowLeft,
  Tag,
  Upload
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SearchOverlay from "@/components/layout/SearchOverlay";
import ProductCard from "@/components/product/ProductCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useCart } from "@/context/CartContext";
import { useAddress } from "@/context/AddressContext";

import {
  productDetail,
  tryOnWardrobe,
  stylingItems,
  similarProducts,
  customerAlsoLiked,
  recentlyViewed,
  mockReviews
} from "@/data/productDetailsMock";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { addToCart, toggleWishlist, isInWishlist, clearCart } = useCart();
  const { addresses, activeAddressId, addAddress, updateAddress, deleteAddress, setActiveAddress } = useAddress();
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  // Reviews Scroll and Modal State
  const reviewsScrollRef = useRef<HTMLDivElement>(null);
  const [selectedReview, setSelectedReview] = useState<{ id: string; name: string; rating: number; title: string; date: string; comment: string; } | null>(null);

  const scrollReviews = (dir: 'left' | 'right') => {
    if (reviewsScrollRef.current) {
      const scrollAmount = 350;
      reviewsScrollRef.current.scrollBy({ left: dir === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  // Address Drawer State
  const [isAddressDrawerOpen, setIsAddressDrawerOpen] = useState(false);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<number | null>(null);

  const [addressForm, setAddressForm] = useState({
    name: "",
    phone: "",
    pincode: "",
    locality: "",
    address: "",
    city: "",
    state: "",
    type: "HOME" as "HOME" | "WORK" | "OTHER",
  });

  const handleOpenAddAddress = () => {
    setAddressForm({
      name: "", phone: "", pincode: "", locality: "", address: "", city: "", state: "", type: "HOME",
    });
    setEditingAddressId(null);
    setIsAddingAddress(true);
  };

  const handleOpenEditAddress = (addr: any) => {
    setAddressForm({
      name: addr.name, phone: addr.phone, pincode: addr.pincode, locality: addr.locality, address: addr.address, city: addr.city, state: addr.state, type: addr.type,
    });
    setEditingAddressId(addr.id);
    setIsAddingAddress(true);
  };

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingAddressId) {
      updateAddress(editingAddressId, addressForm);
    } else {
      addAddress(addressForm);
    }
    setIsAddingAddress(false);
    setEditingAddressId(null);
  };

  // Sellers Drawer State
  const [isSellersDrawerOpen, setIsSellersDrawerOpen] = useState(false);
  const [sellerFilter, setSellerFilter] = useState<'PRICE' | 'DELIVERY' | 'RATING'>('PRICE');
  const [selectedSellerId, setSelectedSellerId] = useState('s1');

  // Detailed Seller View State
  const [detailedSellerId, setDetailedSellerId] = useState<string | null>(null);
  const [detailedSellerTab, setDetailedSellerTab] = useState<'OFFERS' | 'DELIVERY' | 'COD' | 'RETURNS'>('OFFERS');

  const [showCartToast, setShowCartToast] = useState(false);

  const [isWritingReview, setIsWritingReview] = useState(false);
  const [reviewForm, setReviewForm] = useState({ rating: 0, title: '', content: '', name: '', email: '', file: null as File | null });
  const [reviewPreviewUrl, setReviewPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (reviewForm.file) {
      const url = URL.createObjectURL(reviewForm.file);
      setReviewPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setReviewPreviewUrl(null);
    }
  }, [reviewForm.file]);

  const OTHER_SELLERS = useMemo(() => [
    { id: 's1', name: `${productDetail.brand.toUpperCase()} OFFICIAL STORE`, rating: 4.8, reviews: '129,194', price: productDetail.price, originalPrice: productDetail.originalPrice, discount: '46% off', delivery: 'AVAILABLE', deliveryDays: 5, offers: true, cod: true },
    { id: 's2', name: 'SNEAKER_PLAZA', rating: 4.2, reviews: '24,300', price: productDetail.price + 201, originalPrice: productDetail.originalPrice, discount: '45% off', delivery: 'AVAILABLE', deliveryDays: 7, offers: true, cod: true },
    { id: 's3', name: 'FASHION_HUB', rating: 3.9, reviews: '5,100', price: productDetail.price - 149, originalPrice: productDetail.originalPrice, discount: '47% off', delivery: 'AVAILABLE', deliveryDays: 10, offers: false, cod: false },
    { id: 's4', name: 'STREETWEAR_KICKS', rating: 4.5, reviews: '41,000', price: productDetail.price + 101, originalPrice: productDetail.originalPrice, discount: '45% off', delivery: 'AVAILABLE', deliveryDays: 4, offers: true, cod: true },
  ], [productDetail.brand, productDetail.price, productDetail.originalPrice]);

  const sortedSellers = useMemo(() => {
    return [...OTHER_SELLERS].sort((a, b) => {
      if (sellerFilter === 'PRICE') return a.price - b.price;
      if (sellerFilter === 'DELIVERY') return a.deliveryDays - b.deliveryDays;
      if (sellerFilter === 'RATING') return b.rating - a.rating;
      return 0;
    });
  }, [OTHER_SELLERS, sellerFilter]);

  // Derive delivery address text
  const defaultAddress = addresses.find(a => a.id === activeAddressId) || addresses[0];
  const addressText = defaultAddress 
    ? `${defaultAddress.type.toUpperCase()} ${defaultAddress.address}, ${defaultAddress.city}, ${defaultAddress.state}...`
    : "Select Delivery Address";

  // Derive name from slug
  const slug = params?.id as string || "";
  const dynamicName = slug ? slug.split('-').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : productDetail.name;

  const isLiked = isInWishlist(productDetail.id);

  // Gallery states
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const currentColor = productDetail.colors[selectedColorIdx];

  // Config states
  const [selectedSize, setSelectedSize] = useState("L");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("story");
  const [pincode, setPincode] = useState("");
  const [pincodeStatus, setPincodeStatus] = useState<string | null>(null);

  // Virtual Try-On states & Webcam Integration
  const [selectedTryOnItem, setSelectedTryOnItem] = useState<number | null>(2);
  const [isLiveCameraActive, setIsLiveCameraActive] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [hasWebcamAccess, setHasWebcamAccess] = useState(false);
  const [isClothMorphing, setIsClothMorphing] = useState(false);
  const [clothScale, setClothScale] = useState(1.0);
  const [clothOffsetY, setClothOffsetY] = useState(0);
  const [showNeuralMesh, setShowNeuralMesh] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const activeStreamRef = useRef<MediaStream | null>(null);

  // Dedicated helper to completely stop and release camera hardware
  const stopLiveCamera = () => {
    if (activeStreamRef.current) {
      activeStreamRef.current.getTracks().forEach((track) => {
        try {
          track.stop();
        } catch {}
      });
      activeStreamRef.current = null;
    }
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      if (stream && stream.getTracks) {
        stream.getTracks().forEach((track) => {
          try {
            track.stop();
          } catch {}
        });
      }
      videoRef.current.srcObject = null;
    }
    setHasWebcamAccess(false);
    setIsLiveCameraActive(false);
  };

  // Clean up and release camera stream on unmount
  useEffect(() => {
    return () => {
      stopLiveCamera();
    };
  }, []);

  const toggleLiveCamera = async () => {
    if (!isLiveCameraActive) {
      setIsLiveCameraActive(true);
      if (typeof navigator !== "undefined" && navigator.mediaDevices?.getUserMedia) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 720 } },
          });
          activeStreamRef.current = stream;
          setHasWebcamAccess(true);
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play().catch(() => {});
          }
        } catch (err) {
          console.log("Webcam access denied or unavailable:", err);
          stopLiveCamera();
        }
      }
    } else {
      stopLiveCamera();
    }
  };

  const handleSelectWardrobeItem = (idx: number) => {
    setSelectedTryOnItem(idx);
    setIsClothMorphing(true);
    setTimeout(() => {
      setIsClothMorphing(false);
    }, 450);
  };

  const handleResetFit = () => {
    setIsResetting(true);
    setSelectedTryOnItem(null);
    setClothScale(1.0);
    setClothOffsetY(0);
    // Explicitly shut down and stop live camera hardware on Reset
    stopLiveCamera();
    setTimeout(() => {
      setIsResetting(false);
    }, 450);
  };

  // Mannequin states
  const [styledItems, setStyledItems] = useState<Record<string, boolean>>({
    cap: false,
    tee: false,
    pants: false,
    shoes: false,
  });

  // Calculate outfit pricing
  const totalOutfitPrice = useMemo(() => {
    let price = productDetail.price;
    stylingItems.forEach((item) => {
      if (styledItems[item.id]) {
        price += item.price;
      }
    });
    return price;
  }, [styledItems]);

  useEffect(() => {
    setSelectedImageIdx(0);
  }, [selectedColorIdx]);

  // Pincode validation check
  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(pincode)) {
      setPincodeStatus("Please enter a valid 6-digit Pincode.");
      return;
    }
    setPincodeStatus(`Available! Estimated delivery: 2-3 business days.`);
  };

  const toggleStyledItem = (id: string) => {
    setStyledItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAddOutfitToBag = () => {
    const activeCount = Object.values(styledItems).filter(Boolean).length;
    alert(`Look added to bag! Total Outfit: ${activeCount + 1} items (${dynamicName} + ${activeCount} accessories). Total Price: ₹${totalOutfitPrice.toLocaleString()}`);
  };

  const handleBuyNow = () => {
    clearCart();
    addToCart(
      {
        id: productDetail.id,
        name: dynamicName,
        price: productDetail.price,
        image: currentColor.images[0],
        brand: productDetail.brand,
        size: selectedSize,
        color: currentColor.name,
      },
      quantity
    );
    router.push("/checkout");
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: dynamicName,
          text: productDetail.description,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground overflow-x-hidden w-full max-w-[100vw]">
      <Navbar onSearchClick={() => setIsSearchOpen(true)} />
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* ─── BREADCRUMBS ─── */}
      <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-12 md:px-16 lg:px-20 py-3">
        <nav className="flex items-center gap-2 text-[10px] sm:text-[11px] font-mono tracking-widest text-zinc-400 uppercase select-none">
          <Link href="/" className="hover:text-zinc-800 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/shop" className="hover:text-zinc-800 transition-colors">
            Clothing
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#6F4E37] dark:text-[#E6C280] font-bold truncate">
            {dynamicName}
          </span>
        </nav>
      </div>

      {/* ─── MAIN PRODUCT GRID ─── */}
      <main className="pb-6 px-6 sm:px-12 md:px-16 lg:px-20 w-full max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* LEFT: Product Gallery */}
          <div className="lg:col-span-7 flex flex-col md:flex-row gap-5 lg:sticky lg:top-28">
            
            {/* Thumbnails list */}
            <div className="flex flex-row md:flex-col gap-3 order-2 md:order-1 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0 scrollbar-none shrink-0 justify-start md:justify-center">
              {currentColor.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIdx(idx)}
                  className={`relative w-14 h-14 md:w-16 md:h-16 bg-zinc-50 border rounded-2xl overflow-hidden shrink-0 transition-all duration-300 ${
                    idx === selectedImageIdx ? "border-[#6F4E37] ring-1 ring-[#6F4E37]" : "border-zinc-200 hover:border-zinc-400"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${dynamicName} thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Main Preview Container */}
            <div className="flex-grow aspect-square lg:aspect-auto lg:h-[580px] bg-zinc-50 border border-zinc-100 rounded-3xl overflow-hidden relative group order-1 md:order-2 shadow-sm">
              <img
                src={currentColor.images[selectedImageIdx]}
                alt={dynamicName}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Floating Action Buttons */}
              <div className="absolute top-4 right-4 flex flex-col gap-3 z-10">
                <button 
                  onClick={() => toggleWishlist({
                    id: productDetail.id,
                    name: dynamicName,
                    price: `₹${productDetail.price.toLocaleString()}`,
                    image: currentColor.images[0],
                    brand: productDetail.brand
                  })}
                  className={`h-10 w-10 border rounded-full transition-all duration-300 cursor-pointer flex items-center justify-center p-0 shadow-sm active:scale-95 backdrop-blur-md ${
                    isLiked
                      ? "border-rose-300 dark:border-rose-800 bg-rose-50/90 dark:bg-rose-950/90 text-rose-500"
                      : "border-zinc-200/50 dark:border-zinc-800/50 hover:bg-white/90 dark:hover:bg-zinc-900/90 bg-white/70 dark:bg-zinc-900/70 text-zinc-700 dark:text-zinc-300"
                  }`}
                  aria-label="Add to wishlist"
                >
                  <Heart
                    className={`w-4.5 h-4.5 transition-colors ${isLiked ? "text-rose-500" : "currentColor"}`}
                    fill={isLiked ? "currentColor" : "none"}
                  />
                </button>

                <button 
                  onClick={handleShare}
                  className="h-10 w-10 border rounded-full transition-all duration-300 cursor-pointer flex items-center justify-center p-0 shadow-sm active:scale-95 backdrop-blur-md border-zinc-200/50 dark:border-zinc-800/50 hover:bg-white/90 dark:hover:bg-zinc-900/90 bg-white/70 dark:bg-zinc-900/70 text-zinc-700 dark:text-zinc-300"
                  aria-label="Share product"
                >
                  <Share2 className="w-4.5 h-4.5" />
                </button>
              </div>

              <span className="absolute bottom-4 left-4 bg-zinc-950/80 backdrop-blur-md text-white text-[8px] font-mono tracking-widest px-3.5 py-1.5 rounded-full font-bold uppercase">
                {currentColor.name} Edition
              </span>
            </div>
          </div>

          {/* RIGHT: Info Card */}
          <div className="lg:col-span-5 flex flex-col gap-3.5 bg-zinc-50/30 border border-zinc-100/60 rounded-3xl p-8 sm:p-10 shadow-sm">
            
            {/* Category, Brand & Title */}
            <div className="text-left space-y-1">
              <span className="text-[9px] text-zinc-500 font-mono tracking-[0.25em] uppercase font-bold block">
                {productDetail.brand} Motorsport Collaboration
              </span>
              <div className="flex items-start justify-between gap-4">
                <h1 className="text-xl sm:text-2xl font-light tracking-tight text-zinc-950 font-playfair uppercase leading-snug flex-1">
                  {dynamicName.split(" ").slice(0, 3).join(" ")} <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280]">{dynamicName.split(" ").slice(3).join(" ")}</span>
                </h1>
              </div>

              {/* Rating header */}
              <div className="flex items-center gap-1.5 pt-1.5">
                <div className="flex text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-current" />
                  ))}
                </div>
                <span className="text-[10px] font-bold text-zinc-800 font-mono">
                  {productDetail.rating}
                </span>
                <span className="text-zinc-200">|</span>
                <span className="text-[10px] font-bold text-[#6F4E37] dark:text-[#E6C280] font-mono uppercase tracking-wider">
                  {productDetail.reviewsCount} verified reviews
                </span>
              </div>
            </div>

            {/* Pricing Section */}
            <div className="flex items-baseline gap-3.5 py-2.5 border-y border-zinc-100 text-left">
              <strong className="text-2xl sm:text-3xl font-bold text-zinc-950 font-mono">
                ₹{productDetail.price.toLocaleString()}
              </strong>
              <span className="text-xs sm:text-sm font-bold text-zinc-400 dark:text-zinc-500 line-through font-mono">
                ₹{productDetail.originalPrice.toLocaleString()}
              </span>
              <span className="text-[8px] font-black text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 border border-red-100 dark:border-red-900/30 rounded-md px-2 py-0.5 uppercase tracking-widest font-mono">
                46% OFF
              </span>
            </div>

            {/* Description */}
            <p className="text-xs font-medium leading-relaxed text-zinc-500 text-left">
              {productDetail.description}
            </p>

            {/* Colors Selectors */}
            <div className="text-left">
              <span className="text-[10px] font-bold font-mono tracking-widest text-zinc-800 dark:text-zinc-200 uppercase block mb-3">
                COLOR: <strong className="text-[#6F4E37] dark:text-[#E6C280] ml-1">{currentColor.name}</strong>
              </span>
              <div className="flex flex-wrap gap-3">
                {productDetail.colors.map((c, idx) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColorIdx(idx)}
                    className={`relative w-14 h-16 rounded-lg border-2 transition-all cursor-pointer flex items-center justify-center hover:scale-105 active:scale-95 shadow-sm overflow-hidden ${
                      idx === selectedColorIdx ? "border-[#6F4E37] dark:border-[#E6C280] ring-1 ring-[#6F4E37] dark:ring-[#E6C280] scale-105" : "border-zinc-200 dark:border-zinc-700 hover:border-zinc-400"
                    }`}
                    title={c.name}
                  >
                    <img src={c.images[0]} alt={c.name} className="w-full h-full object-cover" />
                    {idx === selectedColorIdx && (
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <Check className="w-6 h-6 text-white drop-shadow-md" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="text-left">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[9px] font-bold font-mono tracking-widest text-zinc-400 uppercase">
                  SIZE: <strong className="text-zinc-900 ml-1">{selectedSize}</strong>
                </span>
                <button 
                  onClick={() => setIsSizeGuideOpen(!isSizeGuideOpen)}
                  className="text-[9px] font-bold text-[#6F4E37] dark:text-[#E6C280] hover:opacity-80 transition-opacity uppercase tracking-wider cursor-pointer bg-transparent border-none p-0 font-mono flex items-center gap-1"
                >
                  {isSizeGuideOpen ? "Hide Size Guide" : "Size Guide"}
                  <span className="text-[10px]">{isSizeGuideOpen ? "▲" : "▼"}</span>
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {productDetail.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[38px] h-9 px-2.5 border rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer hover:border-zinc-800 ${
                      selectedSize === size
                        ? "border-[#6F4E37] bg-[#6F4E37] text-white"
                        : "border-zinc-200 bg-white text-zinc-800"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>

              {/* INLINE SIZE GUIDE (No Popup) */}
              {isSizeGuideOpen && (
                <div className="mt-3 p-3.5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm animate-fade-in text-left">
                  <div className="flex items-center justify-between pb-2 border-b border-zinc-100 dark:border-zinc-800">
                    <span className="text-[10px] font-mono font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
                      Measurements (Inches)
                    </span>
                    <span className="text-[8px] font-mono text-zinc-400 uppercase">
                      Regular Fit
                    </span>
                  </div>
                  <table className="w-full text-[10px] font-mono mt-2.5 border-collapse">
                    <thead>
                      <tr className="border-b border-zinc-100 dark:border-zinc-800 text-[8.5px] text-zinc-400 font-bold uppercase">
                        <th className="pb-1.5 text-left">Size</th>
                        <th className="pb-1.5 text-center">Chest</th>
                        <th className="pb-1.5 text-center">Sleeve</th>
                        <th className="pb-1.5 text-center">Length</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-50 dark:divide-zinc-800/60 text-zinc-700 dark:text-zinc-300 font-semibold">
                      {[
                        { s: "S", c: '38"', sl: '24.5"', l: '26.5"' },
                        { s: "M", c: '40"', sl: '25.0"', l: '27.5"' },
                        { s: "L", c: '42"', sl: '25.5"', l: '28.5"' },
                        { s: "XL", c: '44"', sl: '26.0"', l: '29.5"' },
                        { s: "XXL", c: '46"', sl: '26.5"', l: '30.5"' },
                      ].map((row) => (
                        <tr key={row.s} className={selectedSize === row.s ? "bg-[#FAF6F0] dark:bg-zinc-800 text-[#6F4E37] dark:text-[#E6C280] font-bold" : ""}>
                          <td className="py-1.5 px-1">{row.s}</td>
                          <td className="py-1.5 text-center">{row.c}</td>
                          <td className="py-1.5 text-center">{row.sl}</td>
                          <td className="py-1.5 text-center">{row.l}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Quantity Selector, Add to Bag & BUY NOW Buttons */}
            <div className="space-y-3 pt-2">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-3">
                {/* Quantity Selector */}
                <div className="text-left shrink-0">
                  <span className="text-[9px] font-bold font-mono tracking-widest text-[#6F4E37] dark:text-[#E6C280] uppercase block mb-1.5">
                    QUANTITY:
                  </span>
                  <div className="flex items-center border border-zinc-200 dark:border-zinc-700 rounded-2xl overflow-hidden h-12 bg-white dark:bg-zinc-800 w-full sm:w-28 justify-between shadow-xs">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-2.5 h-full hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors border-none bg-transparent cursor-pointer flex items-center justify-center text-zinc-600 dark:text-zinc-300"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-xs font-bold text-zinc-900 dark:text-white font-mono">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-2.5 h-full hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors border-none bg-transparent cursor-pointer flex items-center justify-center text-zinc-600 dark:text-zinc-300"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Add to Bag button */}
                <button 
                  onClick={() => {
                    addToCart({
                      id: productDetail.id,
                      name: productDetail.name,
                      price: productDetail.price,
                      image: currentColor.images[0],
                      brand: productDetail.brand,
                      size: selectedSize,
                      color: currentColor.name
                    }, quantity);
                    setShowCartToast(true);
                    setTimeout(() => setShowCartToast(false), 2500);
                  }}
                  className="flex-1 bg-white dark:bg-zinc-900 hover:bg-stone-50 dark:hover:bg-zinc-800 text-zinc-900 dark:text-white border-2 border-stone-300 dark:border-zinc-700 hover:border-[#6F4E37] dark:hover:border-[#E6C280] text-xs font-mono font-bold uppercase tracking-wider h-12 rounded-2xl transition-all duration-300 active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 shadow-xs"
                >
                  <ShoppingBag className="w-4 h-4 text-[#6F4E37] dark:text-[#E6C280]" />
                  <span>Add to Bag</span>
                </button>
              </div>

              {/* BUY NOW Button (Instant Direct Checkout) */}
              <button 
                onClick={handleBuyNow}
                className="w-full bg-[#6F4E37] hover:bg-[#583e2b] dark:bg-[#E6C280] dark:text-zinc-950 dark:hover:bg-[#d4b06c] text-white text-xs font-mono font-bold uppercase tracking-widest h-12.5 rounded-2xl transition-all duration-300 shadow-lg shadow-[#6F4E37]/15 dark:shadow-[0_10px_25px_rgba(230,194,128,0.2)] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 border-none"
              >
                <Zap className="w-4 h-4 fill-current" />
                <span>BUY NOW // EXPRESS CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Delivery Details Section */}
              <div className="mt-4 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 sm:p-5 flex flex-col gap-4 bg-white/50 dark:bg-zinc-900/50">
                <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-950 dark:text-zinc-50 mb-1">
                  Delivery Details
                </h4>

                {/* Location */}
                <div className="flex items-center justify-between gap-3 group cursor-pointer" onClick={() => setIsAddressDrawerOpen(true)}>
                  <div className="flex items-center gap-2.5">
                    <Home className="w-4 h-4 text-zinc-500" />
                    <span className="text-[11px] font-sans text-zinc-600 dark:text-zinc-400 font-medium truncate max-w-[220px]">
                      {addressText}
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-zinc-800 dark:group-hover:text-white transition-colors" />
                </div>

                <div className="h-px bg-zinc-100 dark:bg-zinc-800 w-full" />

                {/* Delivery Date & Seller */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2.5">
                    <Truck className="w-4 h-4 text-zinc-500" />
                    <span className="text-[11px] font-sans font-bold text-zinc-800 dark:text-zinc-200">
                      Delivery by {new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", { day: "numeric", month: "short", weekday: "short" })}
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Store className="w-4 h-4 text-zinc-500 shrink-0" />
                    <div className="flex flex-col">
                      <span className="text-[11px] font-sans text-zinc-600 dark:text-zinc-400">
                        Fulfilled by <span className="font-bold text-zinc-900 dark:text-white uppercase">{productDetail.brand} OFFICIAL STORE</span>
                      </span>
                      <span className="text-[10px] text-zinc-400 mt-0.5">
                        4.8★ • 2+ years on DripHunter • <span className="text-[#6F4E37] dark:text-[#E6C280] cursor-pointer hover:underline" onClick={() => setIsSellersDrawerOpen(true)}>See other sellers</span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="h-px bg-zinc-100 dark:bg-zinc-800 w-full" />

                {/* Features Row */}
                <div className="grid grid-cols-3 gap-2 py-1">
                  <div className="flex flex-col items-center justify-center text-center gap-1.5">
                    <RotateCcw className="w-5 h-5 text-zinc-600 dark:text-zinc-300" />
                    <span className="text-[9px] font-sans text-zinc-500">10-Day<br/>Return</span>
                  </div>
                  <div className="flex flex-col items-center justify-center text-center gap-1.5">
                    <IndianRupee className="w-5 h-5 text-zinc-600 dark:text-zinc-300" />
                    <span className="text-[9px] font-sans text-zinc-500">Cash on<br/>Delivery</span>
                  </div>
                  <div className="flex flex-col items-center justify-center text-center gap-1.5">
                    <Headset className="w-5 h-5 text-zinc-600 dark:text-zinc-300" />
                    <span className="text-[9px] font-sans text-zinc-500">24x7<br/>Support</span>
                  </div>
                </div>
              </div>

              {/* Delivery & Authentication Box */}
              <div className="mt-3 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 sm:p-5 flex flex-col gap-4 bg-white/50 dark:bg-zinc-900/50">
                <div className="flex gap-3 text-left">
                  <ShieldCheck className="w-5 h-5 text-[#6F4E37] dark:text-[#E6C280] shrink-0" />
                  <div>
                    <h5 className="text-[11px] font-mono font-bold uppercase text-zinc-900 dark:text-white tracking-widest mb-1">
                      Authentication
                    </h5>
                    <p className="text-[10px] text-zinc-500 font-sans leading-relaxed">
                      Every item is authenticated using the industry's leading verification system. Includes Authentication Certificate. 100% authentic or full money back.
                    </p>
                  </div>
                </div>
                
                <div className="h-px bg-zinc-100 dark:bg-zinc-800 w-full" />
                
                <div className="flex gap-3 text-left">
                  <Truck className="w-5 h-5 text-[#6F4E37] dark:text-[#E6C280] shrink-0" />
                  <div>
                    <h5 className="text-[11px] font-mono font-bold uppercase text-zinc-900 dark:text-white tracking-widest mb-1">
                      Delivery
                    </h5>
                    <p className="text-[10px] text-zinc-500 font-sans leading-relaxed">
                      Your item ships only after passing a 30-point AI and human inspection. Tracked delivery across India.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ─── DESCRIPTION TABS ─── */}
        <div className="mt-16 pt-10 border-t border-zinc-100">
          {/* Tab Switcher matching screenshot layout and shape */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 md:gap-12 mb-8 select-none">
            {["story", "reviews", "specs"].map((tab) => {
              const isActive = activeTab === tab;
              const label =
                tab === "story"
                  ? "Product Details"
                  : tab === "reviews"
                  ? "Product Reviews"
                  : "Technical Information";
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-8 py-3 rounded-lg text-sm font-semibold transition-all duration-300 border-none cursor-pointer font-sans shrink-0 ${
                    isActive
                      ? "bg-[#6F4E37] text-white shadow-md font-bold"
                      : "bg-transparent text-zinc-500 hover:text-zinc-900 font-medium"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* Premium Card Content */}
          <div className="bg-gradient-to-br from-zinc-50/50 via-white to-zinc-50/20 dark:from-zinc-900/50 dark:via-zinc-950 dark:to-zinc-900/20 border border-zinc-100/60 dark:border-zinc-800/60 rounded-3xl p-6 sm:p-8 shadow-[0_4px_25px_rgba(0,0,0,0.01)] text-left">
            {activeTab === "story" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                <div className="lg:col-span-7 space-y-4 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans font-medium">
                  <p className="text-zinc-800 dark:text-zinc-100 text-sm font-sans leading-relaxed">
                    <span className="text-3xl font-serif text-[#6F4E37] dark:text-[#E6C280] float-left mr-2.5 mt-1 font-bold">I</span>nspired by retro motorsport track culture, the Scuderia Ferrari Heritage Zip Sweatshirt perfectly blends high-octane racing aesthetics with urban street culture. Designed as a tribute to the legendary Italian racing division, this heavy-weight sweatshirt represents elite speed.
                  </p>
                  <p className="text-sm">
                    It features high-quality co-branded detailing, including a premium red Scuderia Ferrari shield on the right sleeve, and embroidered graphics on the front chest that read "PUMA" in an elegant collegiate font. A full zipper closure and high neck collar allow custom ventilation and a sharp fit.
                  </p>
                </div>
                
                <div className="lg:col-span-5 border-l border-zinc-100 dark:border-zinc-800/80 pl-0 lg:pl-8 space-y-4">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#6F4E37] dark:text-[#E6C280] font-mono">
                    Product Highlights
                  </h4>
                  <ul className="space-y-4 text-xs text-zinc-600 dark:text-zinc-400 font-sans list-none p-0 m-0">
                    <li className="flex items-start gap-2.5">
                      <Sparkles className="w-4 h-4 text-yellow-500 fill-yellow-500 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-zinc-900 dark:text-zinc-100 block font-bold">Motorsport Heritage</strong>
                        <span className="text-[11px] text-zinc-500 dark:text-zinc-400 block mt-0.5">Inspired by the legendary Italian Scuderia Ferrari racing division.</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Sparkles className="w-4 h-4 text-yellow-500 fill-yellow-500 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-zinc-900 dark:text-zinc-100 block font-bold">Premium Embroidery</strong>
                        <span className="text-[11px] text-zinc-500 dark:text-zinc-400 block mt-0.5">Features dense, high-quality co-branded embroidery details.</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Sparkles className="w-4 h-4 text-yellow-500 fill-yellow-500 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-zinc-900 dark:text-zinc-100 block font-bold">Custom Ventilation</strong>
                        <span className="text-[11px] text-zinc-500 dark:text-zinc-400 block mt-0.5">High neck collar with a heavy-duty YKK metal zip closure.</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
                  <span className="text-xs font-mono font-bold text-zinc-800 uppercase tracking-widest">
                    Verified Buyer Submissions ({mockReviews.length})
                  </span>
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#6F4E37] dark:text-[#E6C280]">
                    <MessageSquare className="w-4 h-4" />
                    <span>Average 4.8 / 5 stars</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {mockReviews.map((rev) => (
                    <div key={rev.id} className="bg-zinc-50/50 dark:bg-zinc-900/50 border border-zinc-100/60 dark:border-zinc-800/60 rounded-3xl p-6 space-y-4 hover:border-[#6F4E37]/15 hover:shadow-[0_12px_30px_rgba(111,78,55,0.04)] transition-all duration-300">
                      <div className="flex justify-between items-start">
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
                      <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed font-sans font-medium">
                        "{rev.comment}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "specs" && (
              <div className="space-y-8">
                {/* Specifications Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3 font-mono text-xs">
                  {productDetail.specifications.map((spec) => (
                    <div key={spec.label} className="flex justify-between py-2 border-b border-zinc-100">
                      <span className="text-zinc-400 font-bold uppercase tracking-wider">{spec.label}</span>
                      <span className="text-zinc-900 font-bold text-right">{spec.value}</span>
                    </div>
                  ))}
                </div>

                {/* Care Instructions */}
                <div className="border-t border-zinc-100 pt-6">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#6F4E37] dark:text-[#E6C280] font-mono mb-4">
                    Care & Handling Guidelines
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans text-zinc-650 dark:text-zinc-300 list-none p-0 m-0">
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                      <span>Wash and iron garment inside out to protect screen-printed artwork.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                      <span>Wash with similar colors to prevent dye migration.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                      <span>Use liquid detergent specifically formulated for colors.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                      <span>Do not tumble dry; dry flat in shade.</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

      </main>

      {/* ─── DESCRIPTION & DETAILS (BOTTLE CLUB INSPIRED) ─── */}
      <section className="w-full bg-[#F4F4F4] dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 py-16 lg:py-0 overflow-x-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left Text */}
          <div className="p-10 md:p-16 lg:p-24 flex flex-col justify-center text-left max-w-2xl mx-auto w-full">
            <h3 className="text-3xl md:text-4xl font-black font-sans uppercase tracking-tight text-zinc-950 dark:text-white mb-6">
              Description
            </h3>
            <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed mb-10">
              {productDetail.description}
            </p>
            
            <h3 className="text-xl md:text-2xl font-black font-sans uppercase tracking-tight text-zinc-950 dark:text-white mb-6">
              Product Details
            </h3>
            <ul className="space-y-4 m-0 p-0 list-none">
              {productDetail.specifications.map((spec) => (
                <li key={spec.label} className="text-sm font-sans flex flex-col sm:flex-row sm:gap-2">
                  <strong className="text-[#6F4E37] dark:text-[#E6C280]">{spec.label}:</strong>
                  <span className="text-zinc-700 dark:text-zinc-300">{spec.value}</span>
                </li>
              ))}
            </ul>
          </div>
          {/* Right Image */}
          <div className="relative h-[400px] lg:h-auto min-h-[500px] w-full">
            <img src={currentColor.images[1]} alt="Product Context" className="absolute inset-0 w-full h-full object-cover" />
          </div>
        </div>
      </section>

      <div className="pb-6 px-6 sm:px-12 md:px-16 lg:px-20 w-full max-w-[1600px] mx-auto overflow-hidden">
        {/* ─── 2ND SECTION: VIRTUAL TRY-ON STUDIO ─── */}
        <section className="mt-8 sm:mt-12 pt-6 sm:pt-10 border-t border-zinc-200 dark:border-zinc-800 select-none">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 mb-10">
            <div>
              <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-[#6F4E37] dark:text-[#E6C280] block mb-2">
                Interactive Experience
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight text-zinc-950 dark:text-zinc-50 font-playfair leading-tight text-left">
                Virtual <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280]">Fitting Room</span>
              </h2>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-sans font-light mt-2 text-left max-w-lg">
                See how the collection fits on you. Use your camera to try on pieces instantly, or view them on our studio models.
              </p>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4 self-start lg:self-end">
              <button
                onClick={handleResetFit}
                className="text-xs font-mono font-bold tracking-wider text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer flex items-center gap-2"
              >
                <RotateCcw className={`w-3.5 h-3.5 ${isResetting ? "animate-spin" : ""}`} />
                RESET
              </button>

              <button
                onClick={toggleLiveCamera}
                className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 cursor-pointer ${
                  isLiveCameraActive
                    ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                    : "bg-white text-zinc-900 border border-zinc-200 hover:border-zinc-400 dark:bg-zinc-900 dark:text-white dark:border-zinc-700"
                }`}
              >
                <Camera className="w-4 h-4" />
                <span>{`${isLiveCameraActive ? "Stop Camera" : "Live Try-On"}`}</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Visualizer */}
            <div className="lg:col-span-8 relative rounded-3xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 h-[500px] lg:h-[600px] border border-zinc-200/50 dark:border-zinc-800/50">
              {isLiveCameraActive && hasWebcamAccess ? (
                <div className="relative w-full h-full bg-black flex items-center justify-center overflow-hidden">
                  <video
                    ref={(el) => {
                      videoRef.current = el;
                      if (el && activeStreamRef.current && el.srcObject !== activeStreamRef.current) {
                        el.srcObject = activeStreamRef.current;
                        el.play().catch(() => {});
                      }
                    }}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover scale-x-[-1]"
                  />
                  
                  {selectedTryOnItem !== null && tryOnWardrobe[selectedTryOnItem] && (
                    <div 
                      className="absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-300 ease-out"
                      style={{ transform: `translateY(${clothOffsetY}px)` }}
                    >
                      <div 
                        className={`relative w-[300px] sm:w-[360px] md:w-[410px] aspect-[3/4] -mt-10 transition-all duration-500 ease-out ${
                          isClothMorphing ? "scale-95 opacity-40 blur-[3px]" : "scale-100 opacity-100"
                        }`}
                        style={{ transform: `scale(${clothScale})` }}
                      >
                        <Image
                          key={`ar-cloth-${selectedTryOnItem}`}
                          src={tryOnWardrobe[selectedTryOnItem]?.clothCutout || tryOnWardrobe[selectedTryOnItem]?.image}
                          alt="Fitted Garment"
                          fill
                          className="object-cover drop-shadow-2xl"
                        />
                      </div>
                    </div>
                  )}

                  {/* Camera Controls Overlay */}
                  {selectedTryOnItem !== null && (
                    <div className="absolute bottom-6 right-6 flex flex-col gap-2 bg-black/40 backdrop-blur-md p-3 rounded-2xl z-20">
                      <div className="flex gap-2">
                        <button onClick={() => setClothScale(s => s - 0.05)} className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center">-</button>
                        <button onClick={() => setClothScale(s => s + 0.05)} className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center">+</button>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => setClothOffsetY(y => y - 10)} className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center">▲</button>
                        <button onClick={() => setClothOffsetY(y => y + 10)} className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center">▼</button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="relative w-full h-full">
                  <Image
                    key={`model-tryon-${selectedTryOnItem ?? "clean"}`}
                    src={
                      selectedTryOnItem !== null && tryOnWardrobe[selectedTryOnItem]
                        ? tryOnWardrobe[selectedTryOnItem]?.modelImage
                        : "/images/awwwards_tryon_studio.jpg"
                    }
                    alt="Studio Model"
                    fill
                    className={`object-cover transition-all duration-700 ease-out ${
                      isClothMorphing ? "opacity-50 blur-sm" : "opacity-100"
                    }`}
                  />
                  {selectedTryOnItem !== null && (
                    <div className="absolute bottom-6 left-6 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md px-4 py-2 rounded-full text-xs font-mono font-bold text-zinc-900 dark:text-white shadow-sm border border-zinc-200/50 dark:border-zinc-800/50">
                      Viewing: {tryOnWardrobe[selectedTryOnItem]?.name}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Wardrobe Selection */}
            <div className="lg:col-span-4 flex flex-col justify-between gap-6">
              <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-3xl p-6 border border-zinc-100 dark:border-zinc-800/80 h-full flex flex-col">
                <h3 className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-4 font-bold">
                  The Wardrobe ({tryOnWardrobe.length})
                </h3>
                
                <div className="grid grid-cols-2 gap-3 overflow-y-auto pr-2 flex-grow scrollbar-thin max-h-[360px] lg:max-h-[440px]">
                  {tryOnWardrobe.map((item, idx) => {
                    const isSelected = selectedTryOnItem === idx;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleSelectWardrobeItem(idx)}
                        className={`text-left p-3 rounded-2xl transition-all duration-300 border ${
                          isSelected
                            ? "border-[#6F4E37] dark:border-[#E6C280] bg-white dark:bg-zinc-800 shadow-sm"
                            : "border-transparent bg-transparent hover:bg-white dark:hover:bg-zinc-800/50"
                        }`}
                      >
                        <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-950 mb-3">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover mix-blend-multiply dark:mix-blend-normal"
                          />
                        </div>
                        <span className="text-[9px] font-mono text-zinc-400 block mb-1">
                          {item.category}
                        </span>
                        <h4 className="text-xs font-semibold text-zinc-900 dark:text-white leading-tight">
                          {item.name}
                        </h4>
                      </button>
                    );
                  })}
                </div>

                <div className="pt-6 mt-4 border-t border-zinc-200 dark:border-zinc-800">
                  <button
                    onClick={() => {
                      const fittedItem = selectedTryOnItem !== null ? tryOnWardrobe[selectedTryOnItem] : null;
                      addToCart({
                        id: fittedItem?.id || productDetail.id,
                        name: fittedItem ? fittedItem.name : productDetail.name,
                        price: productDetail.price,
                        image: fittedItem?.image || currentColor.images[0],
                        brand: productDetail.brand,
                        size: selectedSize,
                        color: currentColor.name
                      }, 1);
                    }}
                    className="w-full py-4 rounded-full bg-zinc-900 hover:bg-[#6F4E37] text-white dark:bg-white dark:text-zinc-900 dark:hover:bg-[#E6C280] text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Add Current to Bag
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* ─── INTERACTIVE STYLE WITH US ─── */}
      <section className="w-full max-w-[1600px] mx-auto px-6 sm:px-12 md:px-16 lg:px-20 py-20 text-center">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 text-left">
          <div>
            <span className="text-[10px] font-mono tracking-[0.2em] text-[#6F4E37] dark:text-[#E6C280] font-bold uppercase block mb-3">
              Curated Lookbook
            </span>
            <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-zinc-950 dark:text-zinc-50 font-playfair uppercase leading-none">
              Style With <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280]">Us</span>
            </h2>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-sm leading-relaxed font-sans">
            Elevate your wardrobe with perfectly paired pieces. Select items to complete the look.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch bg-zinc-50/50 dark:bg-zinc-900/30 rounded-[32px] p-6 lg:p-10 border border-zinc-100 dark:border-zinc-800/60 shadow-sm">
          {/* Lookbook Mannequin */}
          <div className="lg:col-span-5 relative rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 h-[500px] lg:h-[600px] group order-2 lg:order-1">
            <img
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80"
              alt="Curated Look"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            
            {/* Elegant Hotspots */}
            {[
              { id: "cap", top: "12%", left: "48%" },
              { id: "tee", top: "32%", left: "45%" },
              { id: "pants", top: "60%", left: "52%" },
              { id: "shoes", top: "88%", left: "50%" },
            ].map((spot) => (
              <div
                key={spot.id}
                onClick={() => toggleStyledItem(spot.id)}
                className={`absolute w-4 h-4 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 -translate-x-1/2 -translate-y-1/2 before:content-[''] before:absolute before:inset-0 before:rounded-full before:border before:animate-ping ${
                  styledItems[spot.id]
                    ? "bg-[#6F4E37] before:border-[#6F4E37] shadow-[0_0_10px_rgba(111,78,55,0.5)]"
                    : "bg-white/80 before:border-white shadow-sm hover:bg-white"
                }`}
                style={{ top: spot.top, left: spot.left }}
              >
                {styledItems[spot.id] && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
              </div>
            ))}
          </div>

          {/* Wardrobe Selection */}
          <div className="lg:col-span-7 flex flex-col justify-between text-left order-1 lg:order-2">
            <div>
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-zinc-200 dark:border-zinc-800">
                <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-100 font-mono">
                  The Collection
                </h3>
                <span className="text-[10px] font-mono text-zinc-500 uppercase">
                  {Object.values(styledItems).filter(Boolean).length} Selected
                </span>
              </div>
              
              <div className="flex flex-col gap-3">
                {stylingItems.map((item) => {
                  const isActive = styledItems[item.id];
                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleStyledItem(item.id)}
                      className={`group flex items-center gap-5 p-3 rounded-2xl cursor-pointer transition-all duration-300 border ${
                        isActive
                          ? "bg-white dark:bg-zinc-800/80 border-zinc-300 dark:border-zinc-600 shadow-sm"
                          : "bg-transparent border-transparent hover:bg-zinc-100/50 dark:hover:bg-zinc-800/40"
                      }`}
                    >
                      <div className="relative w-20 h-24 rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal group-hover:scale-105 transition-transform duration-500" />
                      </div>
                      <div className="flex-grow">
                        <span className="text-[9px] font-mono tracking-widest text-zinc-400 uppercase font-bold block mb-1">
                          {item.color}
                        </span>
                        <h4 className={`text-sm font-semibold transition-colors duration-300 ${isActive ? "text-[#6F4E37] dark:text-[#E6C280]" : "text-zinc-900 dark:text-zinc-100"}`}>
                          {item.name}
                        </h4>
                        <div className="flex items-center gap-3 mt-2">
                          <strong className="text-xs font-mono text-zinc-900 dark:text-zinc-100">
                            ₹{item.price.toLocaleString()}
                          </strong>
                        </div>
                      </div>
                      <div className="pr-4 shrink-0">
                        <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-300 ${
                          isActive 
                            ? "bg-[#6F4E37] border-[#6F4E37] text-white" 
                            : "border-zinc-300 dark:border-zinc-700 text-transparent group-hover:border-zinc-400"
                        }`}>
                          {isActive && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Action Area */}
            <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">
                  Total Look Value
                </span>
                <strong className="text-2xl font-light font-playfair text-zinc-900 dark:text-zinc-100">
                  ₹{totalOutfitPrice.toLocaleString()}
                </strong>
              </div>
              <button
                onClick={handleAddOutfitToBag}
                className="w-full sm:w-auto px-8 py-3.5 bg-zinc-900 hover:bg-[#6F4E37] text-white dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-[#E6C280] rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                Add to Bag
              </button>
            </div>
          </div>
        </div>
      </section>


      <section className="w-full py-16 border-t border-zinc-100 text-left space-y-8 overflow-x-hidden">
        <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-12 md:px-16 lg:px-20 border-b border-zinc-100 pb-6 flex items-end justify-between gap-4">
          <div>
            <span className="text-[10px] font-mono tracking-[0.25em] text-[#6F4E37] dark:text-[#E6C280] uppercase block mb-3 font-bold">
              User Experiences
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-zinc-950 dark:text-zinc-50 font-playfair leading-[1.05] uppercase">
              Customer <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280] lowercase">Reviews</span>
            </h2>
          </div>
          <div className="flex items-center gap-1 text-xs font-mono font-bold text-zinc-500">
            <MessageSquare className="w-4 h-4 text-[#6F4E37] dark:text-[#E6C280]" />
            <span>{mockReviews.length} Verified Submissions</span>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-12 md:px-16 lg:px-20 py-2 mb-16 relative group">
          <button 
            onClick={() => scrollReviews('left')} 
            className="absolute left-2 sm:left-6 md:left-10 top-1/2 -translate-y-1/2 z-10 w-14 h-14 bg-white/90 backdrop-blur-sm border border-zinc-100 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-xl hover:scale-110 disabled:opacity-0 cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6 text-zinc-900" />
          </button>

          <div 
            ref={reviewsScrollRef} 
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8 pt-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] px-2"
          >
            {mockReviews.map((rev, idx) => (
              <div
                key={`${rev.id}-${idx}`}
                className="flex flex-col flex-none w-[85vw] sm:w-[380px] bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_15px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1.5 transition-all duration-300 snap-start border border-zinc-100/80 relative overflow-hidden group/card"
              >
                {/* Decorative subtle gradient top border */}
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-stone-200 to-stone-300 opacity-50 transition-opacity group-hover/card:opacity-100" />
                
                {/* Top Row: Stars and Date */}
                <div className="flex justify-between items-center mb-6">
                  <div className="flex text-yellow-500 gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < rev.rating ? 'fill-current' : 'fill-transparent text-zinc-200'}`} />
                    ))}
                  </div>
                  <span className="text-[11px] font-sans text-zinc-400 font-medium tracking-widest uppercase">{rev.date}</span>
                </div>

                {/* User Row: Avatar, Name and Verified Badge */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-stone-100 to-stone-200 border border-white shadow-sm flex items-center justify-center shrink-0">
                    <span className="text-sm font-bold font-serif text-stone-600">{rev.name.charAt(0)}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-sans font-bold text-zinc-900">{rev.name}</span>
                      <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    </div>
                    <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block mt-0.5">Verified Buyer</span>
                  </div>
                </div>

                {/* Title and Body */}
                <h4 className="text-lg font-bold font-sans text-zinc-900 mb-3 leading-snug">{rev.title}</h4>
                <p className="text-sm text-zinc-600 leading-relaxed font-sans flex-grow line-clamp-3">
                  {rev.comment}
                </p>

                {/* Bottom link */}
                <div className="mt-8 pt-6 border-t border-zinc-100">
                  <button onClick={() => setSelectedReview(rev)} className="group/btn flex items-center gap-1.5 text-xs font-sans font-bold text-zinc-900 cursor-pointer">
                    Read Full Review <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1.5 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button 
            onClick={() => scrollReviews('right')} 
            className="absolute right-2 sm:right-6 md:right-10 top-1/2 -translate-y-1/2 z-10 w-14 h-14 bg-white/90 backdrop-blur-sm border border-zinc-100 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-xl hover:scale-110 disabled:opacity-0 cursor-pointer"
          >
            <ChevronRight className="w-6 h-6 text-zinc-900" />
          </button>
        </div>

        {/* Reviews Breakdown */}
        <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-12 md:px-16 lg:px-20 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center bg-gradient-to-br from-stone-50 via-white to-stone-50 rounded-[2.5rem] p-8 md:p-14 lg:p-16 border border-zinc-100 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.04)] relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-stone-100 rounded-full mix-blend-multiply filter blur-3xl opacity-60" />
            <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-stone-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40" />

            <div className="md:col-span-5 text-center md:text-left border-b md:border-b-0 md:border-r border-zinc-200 pb-10 md:pb-0 relative z-10">
               <h3 className="text-3xl font-light font-playfair text-zinc-900 mb-3">Customer <span className="italic">Feedback</span></h3>
               <p className="text-sm font-sans text-zinc-500 mb-8 max-w-[280px] mx-auto md:mx-0">Hear what our verified buyers have to say about this piece.</p>
               
               <div className="flex flex-col md:flex-row items-center md:justify-start gap-6 mb-8">
                 <div className="text-7xl font-black font-sans text-zinc-900 tracking-tighter">4.8</div>
                 <div className="flex flex-col gap-2">
                   <div className="flex text-yellow-400 gap-1">
                     {[...Array(5)].map((_,i) => <Star key={i} className="w-6 h-6 fill-current" />)}
                   </div>
                   <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-400 text-center md:text-left">Based on {mockReviews.length} reviews</span>
                 </div>
               </div>

               <button onClick={() => setIsWritingReview(!isWritingReview)} className="inline-flex items-center justify-center bg-white border border-zinc-200 px-8 py-3.5 rounded-full text-[11px] font-bold font-mono uppercase tracking-widest text-zinc-950 hover:bg-zinc-50 hover:border-zinc-300 transition-all cursor-pointer shadow-sm group">
                 <MessageSquare className="w-4 h-4 mr-2 text-zinc-400 group-hover:text-zinc-900 transition-colors" /> {isWritingReview ? "Cancel" : "Write a Review"}
               </button>
            </div>
            
            <div className="md:col-span-7 flex flex-col gap-4 pl-0 md:pl-10 relative z-10">
               {[
                 { stars: 5, pct: 85 },
                 { stars: 4, pct: 10 },
                 { stars: 3, pct: 5 },
                 { stars: 2, pct: 0 },
                 { stars: 1, pct: 0 },
               ].map((bar) => (
                 <div key={bar.stars} className="flex items-center gap-5">
                   <div className="flex items-center gap-1.5 w-14 shrink-0 justify-end">
                     <span className="text-sm font-bold font-sans text-zinc-700">{bar.stars}</span>
                     <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                   </div>
                   <div className="flex-grow h-3 bg-zinc-100 rounded-full overflow-hidden shadow-inner">
                     <div className="h-full bg-gradient-to-r from-stone-300 to-stone-400 rounded-full" style={{ width: `${bar.pct}%` }} />
                   </div>
                   <span className="w-10 text-right text-xs font-sans font-medium text-zinc-500">{bar.pct}%</span>
                 </div>
               ))}
            </div>
          </div>
        </div>

        {/* Inline Review Form */}
        {isWritingReview && (
          <div className="w-full max-w-3xl mx-auto px-6 mb-16 animate-fade-in">
            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border border-zinc-100 relative overflow-hidden">
              {/* Subtle background decoration */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-stone-50 rounded-full mix-blend-multiply filter blur-3xl opacity-50 translate-x-1/2 -translate-y-1/2" />
              
              <h3 className="text-center text-3xl font-light font-playfair text-zinc-900 mb-2 relative z-10">Share Your <span className="italic">Experience</span></h3>
              <p className="text-center text-sm font-sans text-zinc-500 mb-10 relative z-10">Your feedback helps others make better choices.</p>
              
              <form onSubmit={(e) => {
                e.preventDefault();
                setIsWritingReview(false);
                setReviewForm({ rating: 0, title: '', content: '', name: '', email: '', file: null });
                alert("Thanks for your review! It is currently pending approval.");
              }} className="flex flex-col gap-8 relative z-10">
                
                {/* Rating Stars */}
                <div className="flex flex-col gap-3 items-center">
                  <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-400">Overall Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setReviewForm(prev => ({ ...prev, rating: star }))}
                        className="bg-transparent border-none p-1 cursor-pointer transition-all hover:scale-110 active:scale-95 group/star outline-none"
                      >
                        <Star 
                          className={`w-9 h-9 transition-colors ${reviewForm.rating >= star ? 'text-yellow-400 drop-shadow-sm' : 'text-zinc-200 group-hover/star:text-yellow-400/50'}`} 
                          fill={reviewForm.rating >= star ? "currentColor" : "none"}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-500 pl-4">Display Name</label>
                    <input required type="text" placeholder="John Smith" value={reviewForm.name} onChange={(e) => setReviewForm({...reviewForm, name: e.target.value})} className="w-full bg-zinc-50/50 border border-zinc-200 p-4 rounded-2xl outline-none focus:bg-white focus:border-zinc-400 focus:ring-4 focus:ring-zinc-100 text-sm font-sans transition-all placeholder:text-zinc-400" />
                  </div>

                  {/* Email Input */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-500 pl-4">Email Address</label>
                    <input required type="email" placeholder="john@example.com" value={reviewForm.email} onChange={(e) => setReviewForm({...reviewForm, email: e.target.value})} className="w-full bg-zinc-50/50 border border-zinc-200 p-4 rounded-2xl outline-none focus:bg-white focus:border-zinc-400 focus:ring-4 focus:ring-zinc-100 text-sm font-sans transition-all placeholder:text-zinc-400" />
                  </div>
                </div>

                {/* Title Input */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-500 pl-4">Review Title</label>
                  <input required type="text" placeholder="Sum up your experience in a few words" value={reviewForm.title} onChange={(e) => setReviewForm({...reviewForm, title: e.target.value})} className="w-full bg-zinc-50/50 border border-zinc-200 p-4 rounded-2xl outline-none focus:bg-white focus:border-zinc-400 focus:ring-4 focus:ring-zinc-100 text-sm font-sans transition-all placeholder:text-zinc-400" />
                </div>

                {/* Content Textarea */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-500 pl-4">Your Review</label>
                  <textarea required rows={5} placeholder="What did you love about it? How was the fit?" value={reviewForm.content} onChange={(e) => setReviewForm({...reviewForm, content: e.target.value})} className="w-full bg-zinc-50/50 border border-zinc-200 p-4 rounded-3xl outline-none focus:bg-white focus:border-zinc-400 focus:ring-4 focus:ring-zinc-100 text-sm font-sans resize-none transition-all placeholder:text-zinc-400" />
                </div>

                {/* Picture Upload */}
                <div className="flex flex-col gap-3 items-center mt-2">
                  <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-500">Add Photo (Optional)</label>
                  <label htmlFor="review-image-upload" className="w-28 h-28 border-2 border-dashed border-zinc-200 flex flex-col items-center justify-center cursor-pointer hover:border-zinc-400 hover:bg-zinc-50 transition-all rounded-3xl bg-white text-zinc-400 hover:text-zinc-600 group relative overflow-hidden shadow-sm">
                    {reviewPreviewUrl ? (
                      <img src={reviewPreviewUrl} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
                    ) : (
                      <>
                        <Upload className="w-6 h-6 mb-2 transition-transform group-hover:-translate-y-1" />
                        <span className="text-[9px] font-sans font-medium uppercase tracking-widest">Upload</span>
                      </>
                    )}
                  </label>
                  <input id="review-image-upload" type="file" accept="image/*" className="hidden" onChange={(e) => setReviewForm(prev => ({...prev, file: e.target.files ? e.target.files[0] : null}))} />
                </div>

                {/* Action Buttons */}
                <div className="flex justify-center gap-4 mt-4 pt-8 border-t border-zinc-100">
                  <button type="button" onClick={() => { setIsWritingReview(false); setReviewForm({ rating: 0, title: '', content: '', name: '', email: '', file: null }); }} className="px-8 py-4 rounded-full text-xs font-bold font-mono uppercase tracking-widest text-zinc-600 hover:bg-zinc-100 transition-colors cursor-pointer border-none bg-zinc-50">
                    Cancel
                  </button>
                  <button type="submit" className="bg-zinc-950 hover:bg-zinc-800 text-white px-10 py-4 rounded-full text-xs font-bold font-mono uppercase tracking-widest transition-all cursor-pointer border-none shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0">
                    Submit Review
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </section>

      {/* ─── COLLABORATION BANNER ─── */}
      <section className="w-full bg-gradient-to-br from-[#1b120c] via-[#2c1e16] to-[#0c0805] py-20 px-6 flex flex-col items-center justify-center text-center text-white relative border-y border-stone-800/40">
        {/* Subtle Luxury Watermark */}
        <div className="absolute inset-0 opacity-[0.03] flex flex-wrap gap-12 justify-center items-center pointer-events-none scale-105">
          {[...Array(24)].map((_, i) => (
            <span key={i} className="text-3xl font-serif italic tracking-[0.2em] uppercase">
              Puma Ferrari
            </span>
          ))}
        </div>
        
        <div className="relative z-10 space-y-3 max-w-xl">
          <span className="text-[9px] font-mono tracking-[0.4em] text-[#E6C280] font-bold uppercase block">
            Official Collaboration Portfolio
          </span>
          <h2 className="text-3xl sm:text-4xl font-light uppercase tracking-tight text-white font-playfair leading-tight">
            PUMA x <span className="font-serif italic font-normal text-[#E6C280]">Ferrari</span>
          </h2>
          <div className="w-12 h-[1px] bg-[#E6C280]/40 mx-auto my-3" />
          <p className="text-[11.5px] font-mono text-stone-300 leading-relaxed max-w-md mx-auto">
            Fast by definition. Engineered for the runway. Bringing motorsport heritage to high-end luxury streetwear.
          </p>
        </div>
      </section>
      {/* ─── BRAND SPOTLIGHT BANNER (BOTTLE CLUB INSPIRED) ─── */}
      <section className="w-full py-16 overflow-x-hidden">
        <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-12 md:px-16 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 bg-[#E5B53C] text-zinc-950 rounded-3xl overflow-hidden">
            {/* Left Content */}
            <div className="p-10 md:p-16 lg:p-24 flex flex-col justify-center text-left w-full h-full min-h-[400px]">
              <h2 className="text-5xl md:text-7xl font-black font-sans uppercase tracking-tight leading-none mb-6">
                {productDetail.brand.toUpperCase()}
              </h2>
              <p className="text-sm md:text-base font-sans leading-relaxed mb-10 max-w-md font-medium text-zinc-900/80">
                Discover the full range of authentic streetwear, exclusive releases, and limited edition drops directly from {productDetail.brand}.
              </p>
              <Link href={`/brands/${productDetail.brand.toLowerCase()}`} className="inline-flex items-center justify-center border-2 border-zinc-950 px-8 py-3.5 rounded-full text-xs font-bold font-mono uppercase tracking-widest hover:bg-zinc-950 hover:text-[#E5B53C] transition-colors w-max">
                Shop {productDetail.brand}
              </Link>
            </div>
            {/* Right Image */}
            <div className="relative h-[400px] lg:h-auto w-full">
              <img src={currentColor.images[2] || currentColor.images[0]} alt={`${productDetail.brand} Collection`} className="absolute inset-0 w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ─── MORE FROM BRAND ─── */}
      <section className="w-full py-16 border-t border-zinc-100 text-left space-y-8 overflow-x-hidden bg-white">
        <div className="max-w-[1600px] mx-auto">
          <div className="w-full px-6 sm:px-12 md:px-16 lg:px-20 border-b border-zinc-100 pb-6">
            <SectionHeading
              variant="playfair"
              className="uppercase text-zinc-950 dark:text-zinc-50"
              eyebrow={
                <span className="text-[10px] font-mono tracking-[0.25em] text-[#6F4E37] dark:text-[#E6C280] uppercase block mb-3 font-bold">
                  Brand Collection
                </span>
              }
              title={
                <>More from <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280] lowercase">{productDetail.brand}</span></>
              }
            />
          </div>
          <div className="w-full overflow-x-auto scrollbar-none py-6 gap-6 flex flex-nowrap px-6 sm:px-12 md:px-16 lg:px-20 scroll-smooth">
            {similarProducts.map((item) => (
              <div key={item.id} className="w-64 sm:w-72 shrink-0 flex flex-col justify-between">
                <ProductCard id={item.id} name={item.name} brand={item.brand} price={item.price} image={item.image} hoverImage={(item as any).hoverImage} badge={item.badge} />
              </div>
            ))}
            <div className="w-8 sm:w-16 shrink-0 pointer-events-none" />
          </div>
        </div>
      </section>

      {/* ─── SIMILAR PRODUCTS ─── */}
      <section className="w-full py-16 border-t border-zinc-100 text-left space-y-8 overflow-x-hidden bg-white">
        <div className="max-w-[1600px] mx-auto">
          <div className="w-full px-6 sm:px-12 md:px-16 lg:px-20 border-b border-zinc-100 pb-6">
            <SectionHeading
              variant="playfair"
              className="uppercase text-zinc-950 dark:text-zinc-50"
              eyebrow={
                <span className="text-[10px] font-mono tracking-[0.25em] text-[#6F4E37] dark:text-[#E6C280] uppercase block mb-3 font-bold">
                  Curated Alternatives
                </span>
              }
              title={
                <>Similar <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280] lowercase">Products</span></>
              }
            />
          </div>

          <div className="w-full overflow-x-auto scrollbar-none py-6 gap-6 flex flex-nowrap px-6 sm:px-12 md:px-16 lg:px-20 scroll-smooth">
            {similarProducts.map((item) => (
              <div key={item.id} className="w-64 sm:w-72 shrink-0 flex flex-col justify-between">
                <ProductCard
                  id={item.id}
                  name={item.name}
                  brand={item.brand}
                  price={item.price}
                  image={item.image}
                  hoverImage={(item as any).hoverImage}
                  badge={item.badge}
                />
              </div>
            ))}
            <div className="w-8 sm:w-16 shrink-0 pointer-events-none" />
          </div>
        </div>
      </section>

      {/* ─── RECENTLY VIEWED ─── */}
      <section className="w-full py-16 border-t border-zinc-100 text-left space-y-8 overflow-x-hidden bg-white">
        <div className="max-w-[1600px] mx-auto">
          <div className="w-full px-6 sm:px-12 md:px-16 lg:px-20 border-b border-zinc-100 pb-6">
            <SectionHeading
              variant="playfair"
              className="uppercase text-zinc-950 dark:text-zinc-50"
              eyebrow={
                <span className="text-[10px] font-mono tracking-[0.25em] text-[#6F4E37] dark:text-[#E6C280] uppercase block mb-3 font-bold">
                  Revisit History
                </span>
              }
              title={
                <>Recently <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280] lowercase">Viewed</span></>
              }
            />
          </div>

          <div className="w-full overflow-x-auto scrollbar-none py-6 gap-6 flex flex-nowrap px-6 sm:px-12 md:px-16 lg:px-20 scroll-smooth">
            {recentlyViewed.map((item) => (
              <div key={item.id} className="w-64 sm:w-72 shrink-0 flex flex-col justify-between">
                <ProductCard
                  id={item.id}
                  name={item.name}
                  brand={item.brand}
                  price={item.price}
                  image={item.image}
                  hoverImage={(item as any).hoverImage}
                  badge={item.badge}
                />
              </div>
            ))}
            <div className="w-8 sm:w-16 shrink-0 pointer-events-none" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

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
                    <div className="grid grid-cols-2 gap-3">
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
                          <input type="radio" name="addressType" value="HOME" checked={addressForm.type === "HOME"} onChange={(e) => setAddressForm({ ...addressForm, type: e.target.value as "HOME" | "WORK" | "OTHER" })} className="hidden" />
                          <span className="text-xs font-mono font-bold">HOME</span>
                        </label>
                        <label className="flex-1 flex items-center justify-center gap-2 border border-stone-200 dark:border-zinc-800 rounded-xl py-3 cursor-pointer hover:border-[#6F4E37] dark:hover:border-[#E6C280] transition-colors has-[:checked]:border-[#6F4E37] has-[:checked]:bg-[#6F4E37]/5 dark:has-[:checked]:border-[#E6C280] dark:has-[:checked]:bg-[#E6C280]/10">
                          <input type="radio" name="addressType" value="WORK" checked={addressForm.type === "WORK"} onChange={(e) => setAddressForm({ ...addressForm, type: e.target.value as "HOME" | "WORK" | "OTHER" })} className="hidden" />
                          <span className="text-xs font-mono font-bold">WORK</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 pt-4 border-t border-stone-200 dark:border-zinc-800">
                    <button type="button" onClick={() => setIsAddingAddress(false)} className="flex-1 py-3.5 rounded-xl border border-stone-200 dark:border-zinc-700 text-xs font-bold font-mono uppercase tracking-widest text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors cursor-pointer bg-transparent">
                      Cancel
                    </button>
                    <button type="submit" className="flex-1 py-3.5 rounded-xl bg-zinc-950 dark:bg-[#E6C280] text-white dark:text-zinc-950 hover:bg-[#6F4E37] dark:hover:bg-[#d4b06c] text-xs font-bold font-mono uppercase tracking-widest transition-colors shadow-md cursor-pointer border-none">
                      {editingAddressId ? "Update Address" : "Save & Use"}
                    </button>
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
                              onClick={(e) => { e.stopPropagation(); deleteAddress(addr.id); }}
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

      {/* Sellers Drawer */}
      {isSellersDrawerOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="absolute inset-0 bg-black/20 dark:bg-black/40 transition-opacity" onClick={() => setIsSellersDrawerOpen(false)} />
          <div className="relative w-full max-w-[450px] bg-white dark:bg-zinc-950 h-full shadow-2xl flex flex-col transform transition-transform duration-300 translate-x-0 border-l border-zinc-200 dark:border-zinc-800">
            {/* Inline Toast Notification */}
            {showCartToast && (
              <div className="absolute top-20 left-1/2 -translate-x-1/2 z-50 bg-[#6F4E37] dark:bg-[#E6C280] text-white dark:text-zinc-950 px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-fade-in font-mono tracking-wider text-xs font-bold uppercase w-max">
                <Check className="w-4 h-4" />
                Successfully added to cart
              </div>
            )}
            
            {detailedSellerId ? (
              // --- Detailed View ---
              <div className="flex flex-col h-full w-full bg-white dark:bg-zinc-950">
                {/* Detailed Header */}
                <div className="p-5 flex items-center gap-4 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 shrink-0 shadow-sm z-20">
                  <button onClick={() => setDetailedSellerId(null)} className="text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white bg-transparent border-none cursor-pointer">
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <h2 className="text-[13px] font-bold font-mono tracking-widest text-zinc-900 dark:text-white uppercase line-clamp-1">
                    {OTHER_SELLERS.find(s => s.id === detailedSellerId)?.name}
                  </h2>
                </div>
                
                {/* Detail Tabs with Icons */}
                <div className="flex border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shrink-0">
                  {[
                    { id: 'OFFERS', icon: Tag, label: 'OFFERS' },
                    { id: 'DELIVERY', icon: Truck, label: 'DELIVERY' },
                    { id: 'COD', icon: IndianRupee, label: 'COD' },
                    { id: 'RETURNS', icon: RotateCcw, label: 'RETURNS' }
                  ].map(tab => {
                    const isActive = detailedSellerTab === tab.id;
                    const Icon = tab.icon;
                    return (
                      <button 
                        key={tab.id}
                        onClick={() => setDetailedSellerTab(tab.id as any)}
                        className={`flex-1 flex flex-col items-center justify-center gap-1.5 py-4 border-b-[3px] bg-transparent cursor-pointer transition-colors ${isActive ? 'border-[#6F4E37] text-[#6F4E37] dark:border-[#E6C280] dark:text-[#E6C280]' : 'border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300'}`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="text-[9px] font-bold font-mono tracking-widest">{tab.label}</span>
                      </button>
                    )
                  })}
                </div>
                
                {/* Detail Content */}
                <div className="flex-grow overflow-y-auto p-5 space-y-4">
                  {detailedSellerTab === 'OFFERS' && (
                    <div className="space-y-6">
                      {[
                        { title: 'Bank Offer', desc: 'Flat ₹50 off on Flipkart Bajaj Finserv Insta EMI Card. Min Booking Amount: ₹2,500' },
                        { title: 'Bank Offer', desc: 'Flat ₹100 off on Flipkart Bajaj Finserv Insta EMI Card. Min Booking Amount: ₹7,500' },
                        { title: 'Bank Offer', desc: 'Flat ₹200 off on Flipkart Bajaj Finserv Insta EMI Card. Min Booking Amount: ₹20,000' },
                        { title: 'Special Offer', desc: 'Buy this & get Extra 10% off on Watches' },
                      ].map((offer, idx) => (
                        <div key={idx} className="flex flex-col gap-1 text-[13px] font-sans">
                          <strong className="text-zinc-900 dark:text-zinc-100">{offer.title}</strong>
                          <span className="text-zinc-700 dark:text-zinc-400 leading-relaxed">
                            {offer.desc} <span className="text-[#6F4E37] dark:text-[#E6C280] cursor-pointer font-medium hover:underline">T&C</span>
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {detailedSellerTab === 'DELIVERY' && (
                    <div className="flex justify-between items-start text-[13px] font-sans text-zinc-800 dark:text-zinc-300">
                      <span>Standard Delivery {new Date(Date.now() + (OTHER_SELLERS.find(s => s.id === detailedSellerId)?.deliveryDays || 5) * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", { day: "numeric", month: "short", weekday: "long" })}</span>
                      <span className="font-bold text-[#6F4E37] dark:text-[#E6C280]">Free</span>
                    </div>
                  )}

                  {detailedSellerTab === 'COD' && (
                    <div className="text-[13px] font-sans text-zinc-800 dark:text-zinc-300 leading-relaxed">
                      {OTHER_SELLERS.find(s => s.id === detailedSellerId)?.cod ? (
                        "Available. Select Cash on Delivery (CoD) payment option while placing the order and later, pay in cash at the time of actual delivery of product. No advance payment needed."
                      ) : (
                        "Not Available. Cash on Delivery is not supported by this seller for this item."
                      )}
                    </div>
                  )}

                  {detailedSellerTab === 'RETURNS' && (
                    <div className="flex flex-col gap-4 text-[12px] font-sans text-zinc-800 dark:text-zinc-300">
                      <table className="w-full border-collapse border border-zinc-200 dark:border-zinc-800 text-left">
                        <thead>
                          <tr className="bg-stone-50 dark:bg-zinc-900">
                            <th className="border border-zinc-200 dark:border-zinc-800 p-2.5 font-bold">Validity</th>
                            <th className="border border-zinc-200 dark:border-zinc-800 p-2.5 font-bold">Covers</th>
                            <th className="border border-zinc-200 dark:border-zinc-800 p-2.5 font-bold">Type Accepted</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border border-zinc-200 dark:border-zinc-800 p-2.5">10 days from delivery</td>
                            <td className="border border-zinc-200 dark:border-zinc-800 p-2.5">All Return Reasons</td>
                            <td className="border border-zinc-200 dark:border-zinc-800 p-2.5">Refund / Replacement</td>
                          </tr>
                        </tbody>
                      </table>
                      <p className="leading-relaxed mt-2">If there is any issues with your product, you can raise a refund or replacement request within 10 days of receiving the product.</p>
                      <p className="leading-relaxed font-bold mt-2 text-zinc-900 dark:text-zinc-100">Successful pick-up of the product is subject to the following conditions being met:</p>
                      <ul className="list-disc pl-5 space-y-2.5 text-zinc-600 dark:text-zinc-400 mt-1">
                        <li>Correct and complete product (with the original brand, article number, undetached MRP tag, product's original packaging, freebies and accessories)</li>
                        <li>The product should be in unused, undamaged and original condition without any stains, scratches, tears or holes</li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              // --- All Sellers List ---
              <div className="flex flex-col h-full w-full">
            {/* Header */}
            <div className="p-5 border-b border-zinc-200 dark:border-zinc-800 flex items-center gap-4 bg-white dark:bg-zinc-950">
              <button 
                onClick={() => setIsSellersDrawerOpen(false)} 
                className="text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white bg-transparent border-none cursor-pointer transition-colors flex items-center"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h2 className="text-[14px] font-bold font-mono tracking-widest uppercase text-zinc-900 dark:text-white">
                All Sellers
              </h2>
            </div>
            
            {/* Mini Product Details in Drawer */}
            <div className="p-5 border-b border-zinc-200 dark:border-zinc-800 flex items-start gap-4 bg-stone-50 dark:bg-zinc-900/50">
              <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 shadow-sm border border-stone-200 dark:border-zinc-700">
                <Image src={currentColor.images[0]} alt="Product" fill className="object-cover" />
              </div>
              <div className="flex flex-col">
                <span className="text-[13px] font-medium text-zinc-900 dark:text-zinc-100 line-clamp-1 font-sans">{productDetail.brand} {productDetail.name}</span>
                <div className="flex items-center gap-2 mt-1.5 text-[13px] font-sans">
                  <span className="font-bold text-zinc-900 dark:text-zinc-100">₹{productDetail.price}</span>
                  <span className="text-zinc-500 line-through">₹{productDetail.originalPrice}</span>
                  <span className="text-[#6F4E37] dark:text-[#E6C280] font-bold text-[12px]">46% off</span>
                </div>
                <div className="flex items-center gap-1.5 mt-1.5 text-[11px] text-zinc-600 dark:text-zinc-400">
                  <span className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-1.5 py-0.5 rounded flex items-center gap-1 text-[9px] font-bold"><Star className="w-2.5 h-2.5 fill-current" /> 4.8</span>
                  <span>129,194 ratings</span>
                </div>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex border-b border-zinc-200 dark:border-zinc-800 text-[10px] tracking-widest font-bold font-mono uppercase text-zinc-500 dark:text-zinc-400 bg-white dark:bg-zinc-950 shadow-sm z-10">
              {['PRICE', 'DELIVERY', 'RATING'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSellerFilter(filter as any)}
                  className={`flex-1 py-4 text-center border-b-[3px] transition-colors cursor-pointer bg-transparent ${sellerFilter === filter ? 'border-[#6F4E37] text-[#6F4E37] dark:border-[#E6C280] dark:text-[#E6C280]' : 'border-transparent hover:text-zinc-700 dark:hover:text-zinc-200'}`}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Top Sellers by X indicator */}
            <div className="py-3 bg-stone-100 dark:bg-zinc-900 text-center border-b border-stone-200 dark:border-zinc-800">
               <span className="text-[9px] font-bold font-mono uppercase text-zinc-500 dark:text-zinc-400 tracking-widest">Top Sellers by {sellerFilter}</span>
            </div>
            
            {/* Sellers List */}
            <div className="flex-grow overflow-y-auto space-y-0 pb-20 bg-stone-50 dark:bg-zinc-950">
              {sortedSellers.map((seller) => (
                <div key={seller.id} onClick={() => setSelectedSellerId(seller.id)} className={`p-5 bg-white dark:bg-zinc-950 border-b border-stone-200 dark:border-zinc-800 relative group cursor-pointer transition-colors ${selectedSellerId === seller.id ? 'bg-stone-50/80 dark:bg-zinc-900/40' : 'hover:bg-stone-50 dark:hover:bg-zinc-900/20'}`}>
                   <div className="flex justify-between items-start">
                     <div className="flex flex-col pr-8 w-full">
                       <div className="flex items-center gap-3">
                         <span className="font-bold text-[12px] font-mono tracking-wide text-zinc-900 dark:text-white uppercase">{seller.name}</span>
                         <span className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-[9px] px-1.5 py-0.5 rounded font-bold flex items-center gap-0.5"><Star className="w-2 h-2 fill-current" /> {seller.rating}</span>
                       </div>
                       <div className="flex items-center gap-2.5 mt-3 text-[14px] font-sans">
                         <span className="font-bold text-zinc-900 dark:text-white">₹{seller.price}</span>
                         <span className="text-zinc-400 line-through text-[12px]">₹{seller.originalPrice}</span>
                         <span className="text-[#6F4E37] dark:text-[#E6C280] font-bold text-[12px]">{seller.discount}</span>
                       </div>
                       <div className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 font-sans">
                         Or Pay ₹{Math.floor(seller.price/2)} + <span className="inline-flex items-center text-[#6F4E37] dark:text-[#E6C280] font-bold"><Zap className="w-3 h-3 fill-current mr-0.5"/> 23</span>
                       </div>
                       <div className="mt-3 text-[12px] font-sans text-zinc-600 dark:text-zinc-300">
                         Delivery <span className="text-[#6F4E37] dark:text-[#E6C280] font-bold">{seller.delivery}</span> by {new Date(Date.now() + seller.deliveryDays * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", { day: "numeric", month: "short", weekday: "short" })}
                       </div>
                       
                       {/* Features */}
                       <div className="flex items-center gap-5 mt-5">
                         {seller.offers && (
                           <div onClick={(e) => { e.stopPropagation(); setDetailedSellerId(seller.id); setDetailedSellerTab('OFFERS'); }} className="flex flex-col items-center gap-1.5 text-[9px] font-mono tracking-wider text-zinc-500 cursor-pointer group/icon">
                             <div className="w-9 h-9 rounded-full bg-stone-100 dark:bg-zinc-900 flex items-center justify-center text-zinc-500 dark:text-zinc-400 group-hover/icon:bg-[#6F4E37] dark:group-hover/icon:bg-[#E6C280] group-hover/icon:text-white dark:group-hover/icon:text-zinc-950 transition-colors">
                               <Tag className="w-4 h-4" />
                             </div>
                             OFFERS
                           </div>
                         )}
                         <div onClick={(e) => { e.stopPropagation(); setDetailedSellerId(seller.id); setDetailedSellerTab('DELIVERY'); }} className="flex flex-col items-center gap-1.5 text-[9px] font-mono tracking-wider text-zinc-500 cursor-pointer group/icon">
                           <div className="w-9 h-9 rounded-full bg-stone-100 dark:bg-zinc-900 flex items-center justify-center text-zinc-500 dark:text-zinc-400 group-hover/icon:bg-[#6F4E37] dark:group-hover/icon:bg-[#E6C280] group-hover/icon:text-white dark:group-hover/icon:text-zinc-950 transition-colors">
                             <Truck className="w-4 h-4" />
                           </div>
                           DELIVERY
                         </div>
                         <div onClick={(e) => { e.stopPropagation(); setDetailedSellerId(seller.id); setDetailedSellerTab('COD'); }} className="flex flex-col items-center gap-1.5 text-[9px] font-mono tracking-wider text-zinc-500 cursor-pointer group/icon">
                           <div className="w-9 h-9 rounded-full bg-stone-100 dark:bg-zinc-900 flex items-center justify-center text-zinc-500 dark:text-zinc-400 group-hover/icon:bg-[#6F4E37] dark:group-hover/icon:bg-[#E6C280] group-hover/icon:text-white dark:group-hover/icon:text-zinc-950 transition-colors">
                             <IndianRupee className="w-4 h-4" />
                           </div>
                           COD
                         </div>
                         <div onClick={(e) => { e.stopPropagation(); setDetailedSellerId(seller.id); setDetailedSellerTab('RETURNS'); }} className="flex flex-col items-center gap-1.5 text-[9px] font-mono tracking-wider text-zinc-500 cursor-pointer group/icon">
                           <div className="w-9 h-9 rounded-full bg-stone-100 dark:bg-zinc-900 flex items-center justify-center text-zinc-500 dark:text-zinc-400 group-hover/icon:bg-[#6F4E37] dark:group-hover/icon:bg-[#E6C280] group-hover/icon:text-white dark:group-hover/icon:text-zinc-950 transition-colors">
                             <RotateCcw className="w-4 h-4" />
                           </div>
                           RETURNS
                         </div>
                       </div>
                     </div>
                     {/* Radio selection */}
                     <div className="absolute right-5 top-5 border-none bg-transparent flex items-center justify-center">
                        <div className={`w-4 h-4 rounded-full border-[1.5px] flex items-center justify-center transition-colors ${selectedSellerId === seller.id ? 'border-[#6F4E37] dark:border-[#E6C280]' : 'border-zinc-400 dark:border-zinc-600'}`}>
                           {selectedSellerId === seller.id && <div className="w-2.5 h-2.5 rounded-full bg-[#6F4E37] dark:bg-[#E6C280]" />}
                        </div>
                     </div>
                   </div>

                   {/* Add to Cart / Buy Now (only for selected) */}
                   {selectedSellerId === seller.id && (
                     <div className="flex gap-3 mt-6 pt-5 border-t border-stone-100 dark:border-zinc-800 w-full animate-fade-in" onClick={(e) => e.stopPropagation()}>
                        <button 
                          onClick={() => {
                            addToCart({
                              id: productDetail.id,
                              name: productDetail.name,
                              price: seller.price,
                              image: currentColor.images[0],
                              brand: productDetail.brand,
                              size: selectedSize,
                              color: currentColor.name
                            }, quantity);
                            setShowCartToast(true);
                            setTimeout(() => setShowCartToast(false), 2500);
                          }}
                          className="flex-1 py-3.5 rounded-xl text-[10px] font-bold font-mono tracking-widest uppercase border-2 border-stone-300 dark:border-zinc-700 hover:border-[#6F4E37] dark:hover:border-[#E6C280] text-zinc-700 dark:text-zinc-200 cursor-pointer bg-white dark:bg-zinc-900 transition-colors"
                        >
                           Add to Bag
                        </button>
                        <button 
                          onClick={() => {
                            addToCart({
                              id: productDetail.id,
                              name: productDetail.name,
                              price: seller.price,
                              image: currentColor.images[0],
                              brand: productDetail.brand,
                              size: selectedSize,
                              color: currentColor.name
                            }, quantity);
                            router.push('/checkout');
                          }}
                          className="flex-1 py-3.5 rounded-xl text-[10px] font-bold font-mono tracking-widest uppercase border-2 border-transparent bg-[#6F4E37] hover:bg-[#583e2b] dark:bg-[#E6C280] dark:hover:bg-[#d4b06c] text-white dark:text-zinc-950 cursor-pointer transition-colors shadow-lg active:scale-95"
                        >
                           Buy Now
                        </button>
                     </div>
                   )}
                </div>
              ))}
            </div>
            </div>
            )}
          </div>
        </div>
      )}

      {/* Full Review Modal */}
      {selectedReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/60 p-4 animate-fade-in" onClick={() => setSelectedReview(null)}>
          <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-8 md:p-10 rounded-3xl w-full max-w-2xl shadow-2xl relative" onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelectedReview(null)} className="absolute top-6 right-6 text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
              <X className="w-6 h-6" />
            </button>
            <div className="flex justify-between items-start mb-6">
              <div className="flex text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-5 h-5 ${i < selectedReview.rating ? 'fill-current' : 'fill-transparent'}`} />
                ))}
              </div>
              <span className="text-xs font-sans text-zinc-500">{selectedReview.date}</span>
            </div>
            <h3 className="text-2xl font-bold font-sans text-zinc-900 dark:text-white mb-2">{selectedReview.title}</h3>
            <div className="flex items-center gap-2 mb-6 pb-6 border-b border-zinc-100 dark:border-zinc-800">
              <span className="text-sm font-sans font-medium text-zinc-900 dark:text-zinc-100">{selectedReview.name}</span>
              <span className="bg-zinc-950 dark:bg-white text-white dark:text-zinc-900 text-[10px] font-bold px-1.5 py-0.5 rounded-sm uppercase tracking-wider">Verified</span>
            </div>
            <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans">{selectedReview.comment}</p>
          </div>
        </div>
      )}
    </div>
  );
}
