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
  IndianRupee,
  Share2,
  X,
  Search,
  ChevronLeft
} from "lucide-react";

import { useCart } from "@/context/CartContext";
import { useAddress } from "@/context/AddressContext";
import AppPageLayout from "@/components/app-shell/AppPageLayout";
import AppHeader from "@/components/app-shell/AppHeader";
import ProductCard from "@/components/product/ProductCard";
import DeliveryLocationSheet from "@/components/mobile/DeliveryLocationSheet";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";

import {
  productDetail,
  tryOnWardrobe,
  stylingItems,
  similarProducts,
  recentlyViewed,
  mockReviews
} from "@/data/productDetailsMock";
import { MOCK_PRODUCTS, LIMITED_DROPS, DEAL_OF_THE_DAY } from "@/data/mockData";

export default function MobileProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  
  // Contexts
  const { cart, addToCart, toggleWishlist, isInWishlist } = useCart();
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const { addresses, activeAddressId } = useAddress();

  // Derived state
  const slug = params?.id as string || "";

  const foundProduct = useMemo(() => {
    if (!slug) return null;
    return MOCK_PRODUCTS.find(p => p.id === slug) || 
           LIMITED_DROPS.find(p => p.id === slug) || 
           (DEAL_OF_THE_DAY.product.id === slug ? DEAL_OF_THE_DAY.product : null);
  }, [slug]);

  if (!foundProduct) {
    return (
      <AppPageLayout hasBottomNav={false}>
        <AppHeader 
          variant="contextual" 
          title="Not Found"
          fallbackUrl="/mobile/explore"
        />
        <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center">
          <div className="w-20 h-20 bg-zinc-50 dark:bg-zinc-900/50 rounded-full flex items-center justify-center mb-6 border border-zinc-100 dark:border-zinc-800">
            <ShoppingBag className="w-8 h-8 text-zinc-300 dark:text-zinc-600" />
          </div>
          <h1 className="text-2xl font-black font-sans uppercase tracking-tight text-zinc-900 dark:text-white mb-3">
            Product Not Found
          </h1>
          <p className="text-sm font-sans text-zinc-500 dark:text-zinc-400 mb-8 max-w-[280px]">
            The product you are looking for might have been removed, sold out, or the link is invalid.
          </p>
          <button
            onClick={() => router.push("/mobile/explore")}
            className="w-full max-w-[240px] bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 h-14 rounded-2xl font-bold font-mono uppercase tracking-widest text-xs active:scale-95 transition-transform"
          >
            Continue Shopping
          </button>
        </div>
      </AppPageLayout>
    );
  }

  const dynamicName = (foundProduct as any).title || (foundProduct as any).name || productDetail.name;
  const productPrice = foundProduct.price || productDetail.price;
  
  const isLiked = isInWishlist(slug);
  const defaultAddress = addresses.find(a => a.id === activeAddressId);
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

  // Cart/Share Sheet State
  const [isSizeSheetOpen, setIsSizeSheetOpen] = useState(false);
  const [isShareSheetOpen, setIsShareSheetOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

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
    const shareUrl = window.location.origin + `/mobile/product/${slug}`;
    const shareData = {
      title: dynamicName,
      text: "Check out this product on DripHunter.",
      url: shareUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          setToastMsg("Unable to share. Please try again.");
          setTimeout(() => setToastMsg(null), 3000);
        }
      }
    } else {
      setIsShareSheetOpen(true);
    }
  };

  const handleCopyLink = async () => {
    const shareUrl = window.location.origin + `/mobile/product/${slug}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setIsShareSheetOpen(false);
      setToastMsg("Product link copied");
      setTimeout(() => setToastMsg(null), 3000);
    } catch (err) {
      setToastMsg("Failed to copy link");
      setTimeout(() => setToastMsg(null), 3000);
    }
  };

  const handleAddToCart = () => {
    setIsSizeSheetOpen(true);
  };

  const confirmAddToCart = (size: string) => {
    setSelectedSize(size);
    addToCart(
      {
        id: slug,
        name: dynamicName,
        price: productPrice,
        image: currentColor.images[0],
        brand: (foundProduct as any).brand || productDetail.brand,
        size: size,
        color: currentColor.name,
      },
      quantity
    );
    setIsSizeSheetOpen(false);
    setToastMsg("Saved in Cart");
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleBuyNow = () => {
    addToCart(
      {
        id: slug,
        name: dynamicName,
        price: productPrice,
        image: currentColor.images[0],
        brand: (foundProduct as any).brand || productDetail.brand,
        size: selectedSize,
        color: currentColor.name,
      },
      quantity
    );
    router.push("/mobile/checkout");
  };

  const wishlistAction = (
    <button 
      onClick={() => toggleWishlist({
        id: slug,
        name: dynamicName,
        price: `₹${productPrice.toLocaleString()}`,
        image: currentColor.images[0],
        brand: (foundProduct as any).brand || productDetail.brand
      })}
      className="p-2.5 transition-transform active:scale-95 flex items-center justify-center"
      aria-label="Add to wishlist"
    >
      <Heart
        fill={isLiked ? "currentColor" : "none"}
        className={`w-5 h-5 transition-colors ${isLiked ? "text-rose-500" : "text-zinc-700 dark:text-zinc-200"}`}
      />
    </button>
  );

  const shareAction = (
    <button onClick={handleShare} className="p-2.5 transition-transform active:scale-95 flex items-center justify-center">
      <Share2 className="w-5 h-5 text-zinc-700 dark:text-zinc-200" />
    </button>
  );

  return (
    <AppPageLayout hasBottomNav={false}>
      <AppHeader 
        variant="contextual" 
        title={
          <div className="flex-1 flex items-center bg-zinc-100 dark:bg-zinc-800/60 rounded-full h-10 px-4 w-full mr-1" onClick={() => router.push('/mobile/search')}>
            <Search className="w-4 h-4 text-zinc-500 mr-2 shrink-0" />
            <span className="text-xs text-zinc-500">Search for products...</span>
          </div>
        }
        fallbackUrl="/mobile/explore"
        rightAction={
          <button onClick={() => router.push('/mobile/cart')} className="p-2 transition-transform active:scale-95 text-zinc-700 dark:text-zinc-200 relative">
            <ShoppingBag className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full pointer-events-none">
                {cartCount}
              </span>
            )}
          </button>
        }
      />
      
      {/* ─── MAIN CONTENT SCROLL CONTAINER ─── */}
      <div className="flex flex-col pb-[140px]"> {/* Bottom padding for sticky CTA */}
        
        {/* 1. GALLERY (Swipeable) */}
        <div className="relative w-full aspect-[4/5] bg-zinc-100 dark:bg-zinc-900">
          <div className="absolute top-4 right-4 z-10 flex flex-col gap-3">
            <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md rounded-full shadow-md border border-white/20 dark:border-zinc-800/50">
              {shareAction}
            </div>
            <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md rounded-full shadow-md border border-white/20 dark:border-zinc-800/50">
              {wishlistAction}
            </div>
          </div>
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
            {(foundProduct as any).brand || productDetail.brand} Motorsport
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
              {(foundProduct as any).rating || productDetail.rating}
            </span>
            <span className="text-zinc-300 dark:text-zinc-700">|</span>
            <span className="text-[10px] font-bold text-[#6F4E37] dark:text-[#E6C280] font-mono uppercase tracking-wider">
              {(foundProduct as any).reviewsCount || productDetail.reviewsCount} reviews
            </span>
          </div>

          <div className="flex items-baseline gap-3 mt-4">
            <strong className="text-2xl font-bold text-zinc-950 dark:text-zinc-50 font-mono">
              ₹{productPrice.toLocaleString()}
            </strong>
            <span className="text-sm font-bold text-zinc-400 dark:text-zinc-500 line-through font-mono">
              ₹{((foundProduct as any).originalPrice || productDetail.originalPrice).toLocaleString()}
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
          <DeliveryLocationSheet>
            <button className="flex items-center justify-between gap-3 p-4 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-100 dark:border-zinc-800/80 w-full text-left">
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
            </button>
          </DeliveryLocationSheet>

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
          
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-none snap-x">
            {mockReviews.slice(0, 3).map((rev) => (
              <div key={rev.id} className="w-[280px] shrink-0 snap-center bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl p-4 border border-zinc-100 dark:border-zinc-800/80">
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

          <button 
             onClick={() => router.push(`/mobile/reviews/write?orderId=${slug}`)}
             className="w-full mt-4 py-3.5 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs font-bold font-mono uppercase tracking-widest text-zinc-950 dark:text-white bg-white dark:bg-zinc-950 active:scale-95 transition-transform shadow-sm"
          >
             Write a Review
          </button>
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

      {/* ─── TOAST NOTIFICATION ─── */}
      {toastMsg && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[150] bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 px-4 py-2.5 rounded-full font-mono text-xs font-bold shadow-2xl flex items-center gap-2 animate-in slide-in-from-top-2 w-[90%] max-w-sm">
          <Check className="w-4 h-4 text-emerald-400" />
          <span className="truncate">{toastMsg}</span>
        </div>
      )}

      {/* ─── SIZE SELECTION SHEET ─── */}
      <Sheet open={isSizeSheetOpen} onOpenChange={setIsSizeSheetOpen}>
        <SheetContent side="bottom" className="rounded-t-3xl px-0 pb-6 max-h-[85vh] overflow-y-auto">
          <SheetHeader className="px-5 mb-4 text-left flex flex-row items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-4">
            <SheetTitle className="font-sans font-bold text-lg text-zinc-900 dark:text-white">
              Select Size
            </SheetTitle>
            <SheetClose className="p-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors focus:outline-none">
              <X className="w-5 h-5 text-zinc-500" />
            </SheetClose>
          </SheetHeader>
          <div className="px-5">
            <div className="flex items-center gap-4 mb-6">
              <div className="relative w-16 h-16 bg-zinc-100 dark:bg-zinc-900 rounded-xl overflow-hidden shrink-0">
                <Image src={currentColor.images[0]} alt={dynamicName} fill className="object-cover" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-zinc-900 dark:text-white line-clamp-1">{dynamicName}</span>
                <span className="text-xs text-zinc-500 mt-0.5">₹{productPrice.toLocaleString()}</span>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-3 mb-4">
              {productDetail.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => confirmAddToCart(size)}
                  className={`h-12 rounded-xl text-sm font-bold transition-all border shadow-sm active:scale-95 ${
                    selectedSize === size
                      ? "border-[#6F4E37] bg-[#6F4E37] text-white"
                      : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 hover:border-[#6F4E37] hover:text-[#6F4E37]"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* ─── SHARE FALLBACK SHEET ─── */}
      <Sheet open={isShareSheetOpen} onOpenChange={setIsShareSheetOpen}>
        <SheetContent side="bottom" className="rounded-t-3xl px-0 pb-8 max-h-[85vh] overflow-y-auto">
          <SheetHeader className="px-5 mb-4 text-left flex flex-row items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-4">
            <SheetTitle className="font-sans font-bold text-lg text-zinc-900 dark:text-white uppercase tracking-widest text-xs">
              Share This Product
            </SheetTitle>
            <SheetClose className="p-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors focus:outline-none">
              <X className="w-5 h-5 text-zinc-500" />
            </SheetClose>
          </SheetHeader>
          <div className="px-5 space-y-3">
            <button
              onClick={handleCopyLink}
              className="w-full flex items-center justify-center h-14 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-2xl font-bold font-mono uppercase tracking-widest text-xs active:scale-95 transition-transform"
            >
              Copy Link
            </button>
            <button
              onClick={() => setIsShareSheetOpen(false)}
              className="w-full flex items-center justify-center h-14 bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white rounded-2xl font-bold font-mono uppercase tracking-widest text-xs active:scale-95 transition-transform border border-zinc-200 dark:border-zinc-800"
            >
              Cancel
            </button>
          </div>
        </SheetContent>
      </Sheet>

      {/* ─── STICKY PURCHASE BAR ─── */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md z-40 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md border-t border-zinc-200 dark:border-zinc-800 px-5 pt-3 pb-[calc(12px+env(safe-area-inset-bottom))] shadow-[0_-10px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_-10px_20px_rgba(0,0,0,0.2)]">
        <div className="flex flex-col gap-3">
          {/* Quantity (Compact) */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-zinc-900 dark:text-white font-mono">
              ₹{(productPrice * quantity).toLocaleString()}
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
