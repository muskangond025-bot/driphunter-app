"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Package, 
  Heart, 
  Bell, 
  MapPin, 
  ChevronRight,
  HelpCircle,
  Ticket,
  User,
  Globe,
  CreditCard,
  ShieldCheck,
  TrendingUp,
  Store,
  FileText,
  CreditCard as IdCard,
  Star,
  Moon
} from "lucide-react";
import AppHeader from "@/components/app-shell/AppHeader";
import AppPageLayout from "@/components/app-shell/AppPageLayout";
import { useTheme } from "next-themes";

const translations = {
  en: {
    welcome: "Welcome to",
    signInDesc: "Sign in to manage your account, orders and preferences.",
    signInBtn: "Sign In",
    createAccBtn: "Create Account",
    orders: "Orders",
    wishlist: "Wishlist",
    alerts: "Alerts",
    address: "Address",
    exploreDeals: "Explore and grab the best deals",
    profileSettings: "Profile Settings",
    editProfile: "Edit profile",
    panCard: "PAN Card Information",
    savedAddresses: "Saved addresses",
    changeLang: "Change language",
    notifSettings: "Notification settings",
    paymentsWallets: "Payments & Wallets",
    giftCard: "Gift card",
    addGiftCard: "Add gift card",
    savedPayments: "Saved payment methods",
    savedUpi: "Saved UPI",
    myReviews: "My Reviews",
    earnWith: "Earn with DripHunter",
    affiliateProg: "Affiliate program",
    sellOnDrip: "Sell on DripHunter",
    faqTerms: "FAQ & Terms",
    faqs: "FAQs",
    termsPolicies: "Terms, Policies & Licences",
    privacyCenter: "Privacy center",
    followUs: "Follow Us On",
    logOut: "Log Out"
  },
  hi: {
    welcome: "स्वागत है",
    signInDesc: "अपना अकाउंट, ऑर्डर्स और सेटिंग्स मैनेज करने के लिए साइन इन करें।",
    signInBtn: "साइन इन (Sign In)",
    createAccBtn: "नया अकाउंट बनाएँ",
    orders: "ऑर्डर्स",
    wishlist: "विशलिस्ट",
    alerts: "अलर्ट्स",
    address: "पता (Address)",
    exploreDeals: "बेहतरीन डील्स खोजें",
    profileSettings: "प्रोफाइल सेटिंग्स",
    editProfile: "प्रोफाइल बदलें",
    panCard: "पैन कार्ड (PAN Card)",
    savedAddresses: "सेव किए गए पते",
    changeLang: "भाषा बदलें",
    notifSettings: "नोटिफिकेशन सेटिंग्स",
    paymentsWallets: "पेमेंट्स और वॉलेट्स",
    giftCard: "गिफ्ट कार्ड",
    addGiftCard: "गिफ्ट कार्ड ऐड करें",
    savedPayments: "सेव किए गए पेमेंट्स",
    savedUpi: "सेव किए गए UPI",
    myReviews: "मेरे रिव्यु (My Reviews)",
    earnWith: "ड्रिपहंटर के साथ कमाएँ",
    affiliateProg: "एफिलिएट प्रोग्राम",
    sellOnDrip: "ड्रिपहंटर पर बेचें",
    faqTerms: "सवाल और नियम",
    faqs: "अक्सर पूछे जाने वाले सवाल (FAQs)",
    termsPolicies: "नियम और नीतियाँ (Policies)",
    privacyCenter: "प्राइवेसी सेंटर",
    followUs: "हमें फॉलो करें",
    logOut: "लॉग आउट (Log Out)"
  }
};

export default function MobileAccountPage() {
  const [currentLanguage, setCurrentLanguage] = useState("English");
  const [langCode, setLangCode] = useState<"en" | "hi">("en");
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // Auth Mock State
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [userName, setUserName] = useState("Guest");
  const [userEmail, setUserEmail] = useState("");
  const [unreadNotifCount, setUnreadNotifCount] = useState(0);

  useEffect(() => {
    setMounted(true);
    const savedCode = localStorage.getItem("driphunter_language");
    const langMap: Record<string, string> = {
      en: "English",
      hi: "Hindi",
      es: "Spanish",
      fr: "French",
      de: "German",
      ja: "Japanese"
    };
    if (savedCode && langMap[savedCode]) {
      setCurrentLanguage(langMap[savedCode]);
      if (savedCode === "hi") {
        setLangCode("hi");
      } else {
        setLangCode("en");
      }
    }

    // Check auth
    const savedUser = localStorage.getItem("drip_user");
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        setUserName(parsed.name || "User");
        setUserEmail(parsed.email || "");
        setIsSignedIn(true);
      } catch (e) {
        // ignore
      }
    }

    // Check notifications
    const savedNotifs = localStorage.getItem("drip_notifications_data");
    if (savedNotifs) {
      try {
        const parsed = JSON.parse(savedNotifs);
        const unreadCount = parsed.filter((n: any) => !n.read).length;
        setUnreadNotifCount(unreadCount);
      } catch (e) {
        // ignore
      }
    } else {
      // Default initial unread count (if not initialized yet in notifications page)
      setUnreadNotifCount(1);
    }
  }, []);

  const t = (key: keyof typeof translations.en) => {
    return translations[langCode][key] || translations.en[key];
  };

  return (
    <AppPageLayout hasBottomNav={true}>
      <AppHeader variant="main" title="Account" />

      <div className="flex flex-col w-full bg-zinc-50 dark:bg-zinc-950 min-h-full pb-24">
        
        {/* SECTION 1 - ACCOUNT HEADER */}
        <div className="bg-white dark:bg-zinc-900 px-6 py-8 border-b border-zinc-200 dark:border-zinc-800">
          {isSignedIn ? (
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-[#6F4E37] text-white rounded-full flex items-center justify-center text-2xl font-serif shadow-inner">
                {userName.charAt(0)}
              </div>
              <div className="flex flex-col">
                <h1 className="text-xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 font-sans">
                  {userName}
                </h1>
                <p className="text-sm text-zinc-500 font-sans">
                  {userEmail}
                </p>
              </div>
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-light tracking-tight text-zinc-950 dark:text-zinc-50 font-playfair mb-2">
                {t("welcome")} <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280]">DripHunter</span>
              </h1>
              <p className="text-xs text-zinc-500 font-sans mb-6">
                {t("signInDesc")}
              </p>
              <div className="flex flex-col gap-3">
                <Link 
                  href="/mobile/login"
                  className="w-full bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 py-3.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider text-center active:scale-95 transition-transform"
                >
                  {t("signInBtn")}
                </Link>
                <Link 
                  href="/mobile/signup"
                  className="w-full bg-white dark:bg-zinc-900 text-zinc-950 dark:text-zinc-50 border border-zinc-200 dark:border-zinc-800 py-3.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider text-center active:scale-95 transition-transform"
                >
                  {t("createAccBtn")}
                </Link>
              </div>
            </>
          )}
        </div>

        {/* SECTION 2 - QUICK ACCOUNT ACTIONS */}
        <div className="grid grid-cols-4 gap-4 p-4 bg-white dark:bg-zinc-900 mt-2 border-y border-zinc-200 dark:border-zinc-800">
          <Link href="/mobile/orders" className="flex flex-col items-center gap-2 group">
            <div className="w-12 h-12 bg-zinc-50 dark:bg-zinc-800 rounded-full flex items-center justify-center group-active:scale-95 transition-transform border border-zinc-100 dark:border-zinc-700">
              <Package className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
            </div>
            <span className="text-[10px] font-sans font-medium text-zinc-600 dark:text-zinc-400">{t("orders")}</span>
          </Link>
          
          <Link href="/mobile/wishlist" className="flex flex-col items-center gap-2 group">
            <div className="w-12 h-12 bg-zinc-50 dark:bg-zinc-800 rounded-full flex items-center justify-center group-active:scale-95 transition-transform border border-zinc-100 dark:border-zinc-700">
              <Heart className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
            </div>
            <span className="text-[10px] font-sans font-medium text-zinc-600 dark:text-zinc-400">{t("wishlist")}</span>
          </Link>
          
          <Link href="/mobile/notifications" className="flex flex-col items-center gap-2 group">
            <div className="relative w-12 h-12 bg-zinc-50 dark:bg-zinc-800 rounded-full flex items-center justify-center group-active:scale-95 transition-transform border border-zinc-100 dark:border-zinc-700">
              <Bell className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
              {/* Unread Badge */}
              {unreadNotifCount > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-rose-500 text-white text-[9px] font-bold border-2 border-white dark:border-zinc-900 animate-in zoom-in">
                  {unreadNotifCount}
                </span>
              )}
            </div>
            <span className="text-[10px] font-sans font-medium text-zinc-600 dark:text-zinc-400">{t("alerts")}</span>
          </Link>
          
          <Link href="/mobile/addresses" className="flex flex-col items-center gap-2 group">
            <div className="w-12 h-12 bg-zinc-50 dark:bg-zinc-800 rounded-full flex items-center justify-center group-active:scale-95 transition-transform border border-zinc-100 dark:border-zinc-700">
              <MapPin className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
            </div>
            <span className="text-[10px] font-sans font-medium text-zinc-600 dark:text-zinc-400">{t("address")}</span>
          </Link>
        </div>

        {/* MY REVIEWS */}
        <div className="bg-white dark:bg-zinc-900 mt-2 border-y border-zinc-200 dark:border-zinc-800 flex flex-col p-4">
          <Link href="/mobile/reviews" className="flex items-center justify-between p-4 bg-orange-50 dark:bg-orange-950/30 rounded-xl active:scale-[0.98] transition-transform">
            <div className="flex items-center gap-3 text-orange-700 dark:text-orange-400">
              <Star className="w-5 h-5" />
              <span className="text-sm font-sans font-bold">{t("myReviews")}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-orange-700 dark:text-orange-400" />
          </Link>
        </div>

        {/* OFFERS & REWARDS */}
        <div className="bg-white dark:bg-zinc-900 mt-2 border-y border-zinc-200 dark:border-zinc-800 flex flex-col p-4">
          <Link href="/mobile/coupons" className="flex items-center justify-between p-4 bg-indigo-50 dark:bg-indigo-950/30 rounded-xl active:scale-[0.98] transition-transform">
            <div className="flex items-center gap-3 text-indigo-700 dark:text-indigo-400">
              <Ticket className="w-5 h-5" />
              <span className="text-sm font-sans font-bold">{t("exploreDeals")}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-indigo-700 dark:text-indigo-400" />
          </Link>
        </div>

        {/* PROFILE SETTINGS */}
        <div className="bg-white dark:bg-zinc-900 mt-2 border-y border-zinc-200 dark:border-zinc-800 flex flex-col">
          <div className="px-4 py-4 text-sm font-bold text-zinc-900 dark:text-white">{t("profileSettings")}</div>
          
          <Link href="/mobile/profile" className="flex items-center justify-between px-4 py-3 border-b border-zinc-100 dark:border-zinc-800 active:bg-zinc-50 dark:active:bg-zinc-800 transition-colors">
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-zinc-400" />
              <span className="text-sm font-sans font-medium text-zinc-800 dark:text-zinc-200">{t("editProfile")}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-zinc-400" />
          </Link>
          <Link href="/mobile/pan" className="flex items-center justify-between px-4 py-3 border-b border-zinc-100 dark:border-zinc-800 active:bg-zinc-50 dark:active:bg-zinc-800 transition-colors">
            <div className="flex items-center gap-3">
              <IdCard className="w-5 h-5 text-zinc-400" />
              <span className="text-sm font-sans font-medium text-zinc-800 dark:text-zinc-200">{t("panCard")}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-zinc-400" />
          </Link>
          <Link href="/mobile/addresses" className="flex items-center justify-between px-4 py-3 border-b border-zinc-100 dark:border-zinc-800 active:bg-zinc-50 dark:active:bg-zinc-800 transition-colors">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-zinc-400" />
              <span className="text-sm font-sans font-medium text-zinc-800 dark:text-zinc-200">{t("savedAddresses")}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-zinc-400" />
          </Link>
          <Link href="/mobile/language" className="flex items-center justify-between px-4 py-3 border-b border-zinc-100 dark:border-zinc-800 active:bg-zinc-50 dark:active:bg-zinc-800 transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-zinc-400" />
              <span className="text-sm font-sans font-medium text-zinc-800 dark:text-zinc-200">{t("changeLang")}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-zinc-500 bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded">{currentLanguage}</span>
              <ChevronRight className="w-4 h-4 text-zinc-400" />
            </div>
          </Link>
          <Link href="/mobile/notification-settings" className="flex items-center justify-between px-4 py-3 border-b border-zinc-100 dark:border-zinc-800 active:bg-zinc-50 dark:active:bg-zinc-800 transition-colors">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-zinc-400" />
              <span className="text-sm font-sans font-medium text-zinc-800 dark:text-zinc-200">{t("notifSettings")}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-zinc-400" />
          </Link>
          
          {/* Dark Mode Toggle */}
          {mounted && (
            <div className="flex items-center justify-between px-4 py-3 active:bg-zinc-50 dark:active:bg-zinc-800 transition-colors">
              <div className="flex items-center gap-3">
                <Moon className="w-5 h-5 text-zinc-400" />
                <span className="text-sm font-sans font-medium text-zinc-800 dark:text-zinc-200">Dark Mode</span>
              </div>
              <button 
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${theme === "dark" ? "bg-[#6F4E37] dark:bg-[#E6C280]" : "bg-zinc-200 dark:bg-zinc-700"}`}
              >
                <span className="sr-only">Toggle Dark Mode</span>
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${theme === "dark" ? "translate-x-6" : "translate-x-1"}`}
                />
              </button>
            </div>
          )}
        </div>

        {/* PAYMENTS & WALLETS */}
        <div className="bg-white dark:bg-zinc-900 mt-2 border-y border-zinc-200 dark:border-zinc-800 flex flex-col">
          <div className="px-4 py-4 text-sm font-bold text-zinc-900 dark:text-white">{t("paymentsWallets")}</div>
          
          <Link href="/mobile/gift-cards" className="flex items-center justify-between px-4 py-3 border-b border-zinc-100 dark:border-zinc-800 active:bg-zinc-50 dark:active:bg-zinc-800 transition-colors">
            <div className="flex items-center gap-3">
              <CreditCard className="w-5 h-5 text-zinc-400" />
              <span className="text-sm font-sans font-medium text-zinc-800 dark:text-zinc-200">{t("giftCard")}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-zinc-500 bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded">{t("addGiftCard")}</span>
              <ChevronRight className="w-4 h-4 text-zinc-400" />
            </div>
          </Link>
          <Link href="/mobile/upi" className="flex items-center justify-between px-4 py-3 border-b border-zinc-100 dark:border-zinc-800 active:bg-zinc-50 dark:active:bg-zinc-800 transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <CreditCard className="w-5 h-5 text-zinc-400" />
              <span className="text-sm font-sans font-medium text-zinc-800 dark:text-zinc-200">{t("savedUpi")}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-zinc-400" />
          </Link>
          <Link href="/mobile/payments" className="flex items-center justify-between px-4 py-3 active:bg-zinc-50 dark:active:bg-zinc-800 transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-zinc-400" />
              <span className="text-sm font-sans font-medium text-zinc-800 dark:text-zinc-200">{t("savedPayments")}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-zinc-400" />
          </Link>
        </div>

        {/* EARN WITH DRIPHUNTER */}
        <div className="bg-white dark:bg-zinc-900 mt-2 border-y border-zinc-200 dark:border-zinc-800 flex flex-col">
          <div className="px-4 py-4 text-sm font-bold text-zinc-900 dark:text-white">{t("earnWith")}</div>
          
          <Link href="/affiliate" className="flex items-center justify-between px-4 py-3 border-b border-zinc-100 dark:border-zinc-800 active:bg-zinc-50 dark:active:bg-zinc-800 transition-colors">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-5 h-5 text-zinc-400" />
              <span className="text-sm font-sans font-medium text-zinc-800 dark:text-zinc-200">{t("affiliateProg")}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-zinc-400" />
          </Link>
          <Link href="/become-seller" className="flex items-center justify-between px-4 py-3 active:bg-zinc-50 dark:active:bg-zinc-800 transition-colors">
            <div className="flex items-center gap-3">
              <Store className="w-5 h-5 text-zinc-400" />
              <span className="text-sm font-sans font-medium text-zinc-800 dark:text-zinc-200">{t("sellOnDrip")}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-zinc-400" />
          </Link>
        </div>

        {/* FAQ & TERMS */}
        <div className="bg-white dark:bg-zinc-900 mt-2 border-y border-zinc-200 dark:border-zinc-800 flex flex-col">
          <div className="px-4 py-4 text-sm font-bold text-zinc-900 dark:text-white">{t("faqTerms")}</div>
          
          <Link href="/faqs" className="flex items-center justify-between px-4 py-3 border-b border-zinc-100 dark:border-zinc-800 active:bg-zinc-50 dark:active:bg-zinc-800 transition-colors">
            <div className="flex items-center gap-3">
              <HelpCircle className="w-5 h-5 text-zinc-400" />
              <span className="text-sm font-sans font-medium text-zinc-800 dark:text-zinc-200">{t("faqs")}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-zinc-400" />
          </Link>
          <Link href="/terms" className="flex items-center justify-between px-4 py-3 border-b border-zinc-100 dark:border-zinc-800 active:bg-zinc-50 dark:active:bg-zinc-800 transition-colors">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-zinc-400" />
              <span className="text-sm font-sans font-medium text-zinc-800 dark:text-zinc-200">{t("termsPolicies")}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-zinc-400" />
          </Link>
          <Link href="/privacy" className="flex items-center justify-between px-4 py-3 border-b border-zinc-100 dark:border-zinc-800 active:bg-zinc-50 dark:active:bg-zinc-800 transition-colors">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-zinc-400" />
              <span className="text-sm font-sans font-medium text-zinc-800 dark:text-zinc-200">{t("privacyCenter")}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-zinc-400" />
          </Link>
        </div>

        {/* FOLLOW US ON */}
        <div className="bg-white dark:bg-zinc-900 mt-2 border-y border-zinc-200 dark:border-zinc-800 flex flex-col p-4">
          <div className="text-sm font-bold text-zinc-900 dark:text-white mb-4">{t("followUs")}</div>
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
            <a href="#" className="flex items-center gap-2 bg-zinc-50 dark:bg-zinc-800 px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 whitespace-nowrap active:scale-95 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-700 dark:text-zinc-300">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
              <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">Instagram</span>
            </a>
            <a href="#" className="flex items-center gap-2 bg-zinc-50 dark:bg-zinc-800 px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 whitespace-nowrap active:scale-95 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-700 dark:text-zinc-300">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
              </svg>
              <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">Twitter</span>
            </a>
            <a href="#" className="flex items-center gap-2 bg-zinc-50 dark:bg-zinc-800 px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 whitespace-nowrap active:scale-95 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-700 dark:text-zinc-300">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
              <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">Facebook</span>
            </a>
          </div>
        </div>

        {/* LOG OUT BUTTON */}
        {isSignedIn && (
          <div className="px-6 py-6 mt-2 flex justify-center">
            <button 
              onClick={() => setShowLogoutPopup(true)}
              className="text-rose-500 font-bold text-sm bg-rose-50 dark:bg-rose-950/40 px-8 py-3.5 rounded-xl w-full active:scale-95 transition-transform"
            >
              {t("logOut")}
            </button>
          </div>
        )}

        <div className="text-center py-4">
          <span className="text-[10px] text-zinc-400 font-mono tracking-widest uppercase">
            DripHunter App v1.0.0
          </span>
        </div>

      </div>

      {/* LOGOUT CONFIRMATION POPUP */}
      {showLogoutPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="bg-white dark:bg-zinc-900 w-full max-w-sm rounded-3xl p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">Log out of your account?</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
              You will need to enter your credentials again to access your orders and saved items.
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowLogoutPopup(false)}
                className="flex-1 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white font-bold text-sm transition-colors hover:bg-zinc-200 dark:hover:bg-zinc-700"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  localStorage.removeItem("drip_user");
                  setIsSignedIn(false);
                  setShowLogoutPopup(false);
                }}
                className="flex-1 py-3 rounded-xl bg-rose-500 text-white font-bold text-sm transition-colors hover:bg-rose-600 shadow-md shadow-rose-500/20"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </AppPageLayout>
  );
}
