"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import {
  Star,
  Heart,
  Check,
  ChevronRight,
  Info,
  ShoppingBag,
  Zap,
  Camera,
  RotateCcw,
  Truck,
  ShieldCheck,
  MapPin,
  Store,
  Headset,
  IndianRupee,
  Share2,
  ChevronLeft
} from "lucide-react";

import { useCart } from "@/context/CartContext";
import { useAddress } from "@/context/AddressContext";
import AppPageLayout from "@/components/app-shell/AppPageLayout";
import AppHeader from "@/components/app-shell/AppHeader";
import ProductCard from "@/components/product/ProductCard";

import {
  productDetail,
  tryOnWardrobe,
  stylingItems,
  similarProducts,
  customerAlsoLiked,
  recentlyViewed,
  mockReviews
} from "@/data/productDetailsMock";

export default function MobileProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  
  // Contexts
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const { addresses, activeAddressId } = useAddress();

  // Derived state
  const slug = params?.id as string || "";
  const dynamicName = slug ? slug.split('-').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : productDetail.name;
  const isLiked = isInWishlist(productDetail.id);
  const defaultAddress = addresses.find(a => a.id === activeAddressId) || addresses[0];
  const addressText = defaultAddress 
    ? `${defaultAddress.type.toUpperCase()} ${defaultAddress.address}, ${defaultAddress.city}, ${defaultAddress.state}...`
    : "Select Delivery Address";

  // Gallery state
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const currentColor = productDetail.colors[selectedColorIdx];
  const galleryRef = useRef<HTMLDivElement>(null);
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  // Configuration state
  const [selectedSize, setSelectedSize] = useState("L");
  const [quantity, setQuantity] = useState(1);

  // Virtual Try-On state
  const [selectedTryOnItem, setSelectedTryOnItem] = useState<number | null>(2);
  const [isLiveCameraActive, setIsLiveCameraActive] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [hasWebcamAccess, setHasWebcamAccess] = useState(false);
  const [isClothMorphing, setIsClothMorphing] = useState(false);
  const [clothScale, setClothScale] = useState(1.0);
  const [clothOffsetY, setClothOffsetY] = useState(0);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const activeStreamRef = useRef<MediaStream | null>(null);

  // Update active image index based on scroll position
  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;

    const handleScroll = () => {
      const scrollPosition = gallery.scrollLeft;
      const width = gallery.clientWidth;
      const newIdx = Math.round(scrollPosition / width);
      setActiveImageIdx(newIdx);
    };

    gallery.addEventListener('scroll', handleScroll, { passive: true });
    return () => gallery.removeEventListener('scroll', handleScroll);
  }, [currentColor]);

  // Reset active image when color changes
  useEffect(() => {
    setActiveImageIdx(0);
    if (galleryRef.current) {
      galleryRef.current.scrollTo({ left: 0, behavior: 'auto' });
    }
  }, [selectedColorIdx]);

  // Try-on methods
  const stopLiveCamera = () => {
    if (activeStreamRef.current) {
      activeStreamRef.current.getTracks().forEach((track) => track.stop());
      activeStreamRef.current = null;
    }
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setHasWebcamAccess(false);
    setIsLiveCameraActive(false);
    setCameraError(null);
  };

  useEffect(() => {
    return () => {
      stopLiveCamera();
    };
  }, []);

  const toggleLiveCamera = async () => {
    if (isLiveCameraActive) {
      stopLiveCamera();
    } else {
      setIsLiveCameraActive(true);
      setCameraError(null);
      if (typeof navigator !== "undefined" && navigator.mediaDevices?.getUserMedia) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: "user" },
          });
          activeStreamRef.current = stream;
          setHasWebcamAccess(true);
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play().catch(() => {});
          }
        } catch (err) {
          console.error("Webcam access denied or unavailable:", err);
          stopLiveCamera();
          setCameraError("Camera access denied or unavailable.");
        }
      } else {
        stopLiveCamera();
        setCameraError("Your browser does not support camera access.");
      }
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
    stopLiveCamera();
    setTimeout(() => {
      setIsResetting(false);
    }, 450);
  };

  // Actions
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

  const handleAddToCart = () => {
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
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push("/checkout"); // Match desktop logic behavior
  };

  const wishlistAction = (
    <button 
      onClick={() => toggleWishlist({
        id: productDetail.id,
        name: dynamicName,
        price: `₹${productDetail.price.toLocaleString()}`,
        image: currentColor.images[0],
        brand: productDetail.brand
      })}
      className="p-2 transition-transform active:scale-95"
      aria-label="Add to wishlist"
    >
      <Heart
        className={`w-5 h-5 transition-colors ${isLiked ? "text-rose-500 fill-rose-500" : "text-zinc-600 dark:text-zinc-300"}`}
      />
    </button>
  );

  const shareAction = (
    <button onClick={handleShare} className="p-2 mr-1 transition-transform active:scale-95">
      <Share2 className="w-5 h-5 text-zinc-600 dark:text-zinc-300" />
    </button>
  );

  return (
    <AppPageLayout hasBottomNav={false}>
      <AppHeader 
        variant="contextual" 
        title="" 
        fallbackUrl="/mobile"
        rightAction={<div className="flex items-center">{shareAction}{wishlistAction}</div>}
      />
      
      {/* ─── MAIN CONTENT SCROLL CONTAINER ─── */}
      <div className="flex flex-col pb-[140px]"> {/* Bottom padding for sticky CTA */}
        
        {/* 1. GALLERY (Swipeable) */}
        <div className="relative w-full aspect-[4/5] bg-zinc-100 dark:bg-zinc-900">
          <div 
            ref={galleryRef}
            className="flex w-full h-full overflow-x-auto snap-x snap-mandatory scrollbar-none"
          >
            {currentColor.images.map((img, idx) => (
              <div key={idx} className="w-full h-full flex-shrink-0 snap-center relative">
                <img
                  src={img}
                  alt={`${dynamicName} image ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          
          {/* Pagination Dots */}
          <div className="absolute bottom-4 left-0 w-full flex justify-center gap-2 z-10 pointer-events-none">
            {currentColor.images.map((_, idx) => (
              <div 
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === activeImageIdx 
                    ? "w-4 bg-zinc-900 dark:bg-white" 
                    : "w-1.5 bg-zinc-400 dark:bg-zinc-600"
                }`}
              />
            ))}
          </div>
          
          <span className="absolute bottom-4 left-4 bg-zinc-950/80 backdrop-blur-md text-white text-[9px] font-mono tracking-widest px-3 py-1 rounded-full font-bold uppercase z-10">
            {currentColor.name}
          </span>
        </div>

        {/* 2. PRODUCT IDENTITY & PRICE */}
        <div className="px-5 pt-6 pb-4">
          <span className="text-[10px] text-zinc-500 font-mono tracking-[0.2em] uppercase font-bold block mb-1">
            {productDetail.brand} Motorsport
          </span>
          <h1 className="text-xl sm:text-2xl font-light tracking-tight text-zinc-950 dark:text-zinc-50 font-playfair uppercase leading-snug">
            {dynamicName.split(" ").slice(0, 3).join(" ")} <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280]">{dynamicName.split(" ").slice(3).join(" ")}</span>
          </h1>
          
          <div className="flex items-center gap-1.5 mt-2">
            <div className="flex text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 font-mono">
              {productDetail.rating}
            </span>
            <span className="text-zinc-300 dark:text-zinc-700">|</span>
            <span className="text-[10px] font-bold text-[#6F4E37] dark:text-[#E6C280] font-mono uppercase tracking-wider">
              {productDetail.reviewsCount} reviews
            </span>
          </div>

          <div className="flex items-baseline gap-3 mt-4">
            <strong className="text-2xl font-bold text-zinc-950 dark:text-zinc-50 font-mono">
              ₹{productDetail.price.toLocaleString()}
            </strong>
            <span className="text-sm font-bold text-zinc-400 dark:text-zinc-500 line-through font-mono">
              ₹{productDetail.originalPrice.toLocaleString()}
            </span>
            <span className="text-[9px] font-black text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 border border-red-100 dark:border-red-900/30 rounded-md px-2 py-0.5 uppercase tracking-widest font-mono">
              46% OFF
            </span>
          </div>
        </div>

        <div className="h-2 w-full bg-zinc-50 dark:bg-zinc-900" />

        {/* 3. COLOR & SIZE SELECTION */}
        <div className="px-5 py-6">
          <div className="mb-6">
            <span className="text-[11px] font-bold font-mono tracking-widest text-zinc-800 dark:text-zinc-200 uppercase block mb-3">
              Color: <strong className="text-[#6F4E37] dark:text-[#E6C280] ml-1">{currentColor.name}</strong>
            </span>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
              {productDetail.colors.map((c, idx) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedColorIdx(idx)}
                  className={`relative w-[60px] h-[72px] shrink-0 rounded-xl border-2 transition-all overflow-hidden ${
                    idx === selectedColorIdx 
                      ? "border-[#6F4E37] dark:border-[#E6C280] scale-105" 
                      : "border-zinc-200 dark:border-zinc-700"
                  }`}
                >
                  <img src={c.images[0]} alt={c.name} className="w-full h-full object-cover" />
                  {idx === selectedColorIdx && (
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <Check className="w-5 h-5 text-white drop-shadow-md" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold font-mono tracking-widest text-zinc-800 dark:text-zinc-200 uppercase">
                Size: <strong className="text-[#6F4E37] dark:text-[#E6C280] ml-1">{selectedSize}</strong>
              </span>
              <button className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white uppercase tracking-wider font-mono flex items-center gap-1">
                Size Guide
              </button>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {productDetail.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`h-11 rounded-xl text-xs font-bold transition-all border ${
                    selectedSize === size
                      ? "border-[#6F4E37] bg-[#6F4E37] text-white"
                      : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="h-2 w-full bg-zinc-50 dark:bg-zinc-900" />

        {/* 5. DELIVERY & TRUST */}
        <div className="px-5 py-6 space-y-4">
          {/* Location */}
          <div className="flex items-center justify-between gap-3 p-4 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-100 dark:border-zinc-800/80">
            <div className="flex flex-col gap-1 w-full overflow-hidden">
              <span className="text-[10px] font-mono tracking-widest text-zinc-500 dark:text-zinc-400 uppercase font-bold">
                Deliver to
              </span>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#6F4E37] dark:text-[#E6C280] shrink-0" />
                <span className="text-xs font-sans text-zinc-800 dark:text-zinc-200 font-medium truncate">
                  {addressText}
                </span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-zinc-400 shrink-0" />
          </div>

          <div className="flex gap-4 p-4 bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-100 dark:border-zinc-800/80">
            <Truck className="w-5 h-5 text-[#6F4E37] dark:text-[#E6C280] shrink-0 mt-0.5" />
            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                Delivery by {new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", { day: "numeric", month: "short", weekday: "short" })}
              </span>
              <span className="text-[11px] text-zinc-500">
                Tracked delivery across India. Cash on delivery available.
              </span>
            </div>
          </div>

          <div className="flex gap-4 p-4 bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-100 dark:border-zinc-800/80">
            <ShieldCheck className="w-5 h-5 text-[#6F4E37] dark:text-[#E6C280] shrink-0 mt-0.5" />
            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase font-mono tracking-widest">
                100% Authentic
              </span>
              <span className="text-[11px] text-zinc-500">
                Every item passes a 30-point AI and human inspection.
              </span>
            </div>
          </div>
        </div>

        <div className="h-2 w-full bg-zinc-50 dark:bg-zinc-900" />

        {/* 6. DESCRIPTION & DETAILS */}
        <div className="px-5 py-8">
          <h3 className="text-sm font-black font-sans uppercase tracking-widest text-zinc-950 dark:text-white mb-4">
            Product Details
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed mb-6">
            <span className="text-2xl font-serif text-[#6F4E37] dark:text-[#E6C280] float-left mr-2 mt-1 font-bold leading-none">I</span>
            {productDetail.description}
          </p>
          
          <div className="space-y-3 pt-4 border-t border-zinc-100 dark:border-zinc-800/80">
            {productDetail.specifications.map((spec) => (
              <div key={spec.label} className="flex flex-col text-xs font-sans">
                <span className="text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-wider mb-0.5">{spec.label}</span>
                <span className="text-zinc-800 dark:text-zinc-200">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="h-2 w-full bg-zinc-50 dark:bg-zinc-900" />

        {/* 7. VIRTUAL TRY-ON (MOBILE) */}
        <div className="px-5 py-8">
          <div className="mb-6">
            <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-[#6F4E37] dark:text-[#E6C280] block mb-1">
              Interactive Experience
            </span>
            <h3 className="text-xl font-light tracking-tight text-zinc-950 dark:text-zinc-50 font-playfair leading-tight">
              Virtual <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280]">Fitting Room</span>
            </h3>
          </div>

          {/* VTO Screen */}
          <div className="relative w-full aspect-[3/4] bg-zinc-100 dark:bg-zinc-900 rounded-3xl overflow-hidden mb-4 border border-zinc-200 dark:border-zinc-800">
            {isLiveCameraActive && hasWebcamAccess ? (
              <div className="relative w-full h-full bg-black flex items-center justify-center overflow-hidden">
                <video
                  ref={videoRef}
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
                      className={`relative w-[280px] aspect-[3/4] -mt-6 transition-all duration-500 ease-out ${
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
                
                {/* Mobile Camera Controls (Subtle) */}
                {selectedTryOnItem !== null && (
                  <div className="absolute bottom-4 right-4 flex flex-col gap-2 bg-black/40 backdrop-blur-md p-2 rounded-xl z-20 pointer-events-auto">
                    <div className="flex gap-2">
                      <button onClick={() => setClothScale(s => s - 0.05)} className="w-7 h-7 rounded-full bg-white/20 active:bg-white/40 text-white flex items-center justify-center text-xs">-</button>
                      <button onClick={() => setClothScale(s => s + 0.05)} className="w-7 h-7 rounded-full bg-white/20 active:bg-white/40 text-white flex items-center justify-center text-xs">+</button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="relative w-full h-full">
                {cameraError && (
                  <div className="absolute top-4 inset-x-4 bg-red-500/90 text-white text-xs p-3 rounded-xl backdrop-blur-md z-30 text-center shadow-lg animate-in slide-in-from-top-2">
                    {cameraError}
                  </div>
                )}
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
                    isClothMorphing ? "opacity-50 blur-sm scale-105" : "opacity-100 scale-100"
                  }`}
                />
              </div>
            )}
            
            {/* Try-on Status Overlay */}
            {selectedTryOnItem !== null && (
              <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold text-zinc-900 dark:text-white shadow-sm border border-zinc-200/50 dark:border-zinc-800/50 max-w-[200px] truncate">
                {tryOnWardrobe[selectedTryOnItem]?.name}
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 w-full">
            <button
              onClick={toggleLiveCamera}
              className={`flex-1 flex items-center justify-center gap-2 h-11 rounded-xl text-xs font-bold tracking-widest uppercase transition-all duration-300 ${
                isLiveCameraActive
                  ? "bg-red-500 text-white"
                  : "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
              }`}
            >
              <Camera className="w-4 h-4" />
              <span>{isLiveCameraActive ? "Stop Camera" : "Live Try-On"}</span>
            </button>
            <button
              onClick={handleResetFit}
              className="w-11 h-11 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-400 active:scale-95 transition-transform"
            >
              <RotateCcw className={`w-4 h-4 ${isResetting ? "animate-spin" : ""}`} />
            </button>
          </div>

          {/* Wardrobe Items Ribbon */}
          <div className="mt-5 flex gap-3 overflow-x-auto pb-2 scrollbar-none">
            {tryOnWardrobe.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => handleSelectWardrobeItem(idx)}
                className={`w-[60px] h-[80px] shrink-0 rounded-xl overflow-hidden relative border-2 transition-all active:scale-95 ${
                  idx === selectedTryOnItem ? "border-[#6F4E37] dark:border-[#E6C280] scale-105" : "border-transparent"
                }`}
              >
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </button>
            ))}
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
          
          <div className="space-y-4">
            {mockReviews.slice(0, 3).map((rev) => (
              <div key={rev.id} className="bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl p-4 border border-zinc-100 dark:border-zinc-800/80">
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

        <div className="h-2 w-full bg-zinc-50 dark:bg-zinc-900" />

        {/* 12. SIMILAR PRODUCTS */}
        <div className="px-5 py-8">
          <h3 className="text-sm font-black font-sans uppercase tracking-widest text-zinc-950 dark:text-white mb-6">
            Similar Products
          </h3>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-none snap-x">
            {similarProducts.map((p) => (
              <div key={p.id} className="w-[160px] shrink-0 snap-start">
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
      </div>

      {/* ─── STICKY PURCHASE BAR ─── */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md z-40 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md border-t border-zinc-200 dark:border-zinc-800 px-5 pt-3 pb-[calc(12px+env(safe-area-inset-bottom))] shadow-[0_-10px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_-10px_20px_rgba(0,0,0,0.2)]">
        <div className="flex flex-col gap-3">
          {/* Quantity (Compact) */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-zinc-900 dark:text-white font-mono">
              ₹{(productDetail.price * quantity).toLocaleString()}
            </span>
            <div className="flex items-center gap-4 bg-zinc-100 dark:bg-zinc-800 rounded-full px-1 py-1">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-6 h-6 rounded-full bg-white dark:bg-zinc-700 flex items-center justify-center shadow-sm text-zinc-600 dark:text-zinc-300 active:scale-95"
              >
                -
              </button>
              <span className="text-xs font-bold font-mono text-zinc-900 dark:text-white w-2 text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-6 h-6 rounded-full bg-white dark:bg-zinc-700 flex items-center justify-center shadow-sm text-zinc-600 dark:text-zinc-300 active:scale-95"
              >
                +
              </button>
            </div>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={handleAddToCart}
              className="flex-1 h-12 rounded-xl border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 active:bg-zinc-50 dark:active:bg-zinc-800 transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="flex-1 h-12 rounded-xl bg-[#6F4E37] text-white font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 active:bg-[#5a3f2d] transition-colors shadow-lg shadow-[#6F4E37]/20"
            >
              <Zap className="w-4 h-4" />
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </AppPageLayout>
  );
}
