"use client";

import React, { useState, useEffect } from "react";
import AppHeader from "@/components/app-shell/AppHeader";
import AppPageLayout from "@/components/app-shell/AppPageLayout";

const defaultPrefs = {
  // Orders & Delivery
  orderUpdates: true,
  deliveryUpdates: true,
  orderIssues: true, // critical

  // Shopping
  backInStock: false,
  priceDrops: true,
  wishlistUpdates: true,
  newArrivals: false,
  limitedDrops: true,

  // Offers & Promotions
  offersDiscounts: true,
  coupons: true,
  flashSales: true,
  personalizedRecs: false,

  // Account & Security
  accountActivity: true,
  securityAlerts: true, // critical
};

type PrefsKeys = keyof typeof defaultPrefs;

export default function MobileNotificationSettingsPage() {
  const [mounted, setMounted] = useState(false);
  const [prefs, setPrefs] = useState(defaultPrefs);

  useEffect(() => {
    const saved = localStorage.getItem("drip_notification_prefs");
    if (saved) {
      try {
        setPrefs({ ...defaultPrefs, ...JSON.parse(saved) });
      } catch (e) {
        console.error("Failed to parse notification prefs", e);
      }
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("drip_notification_prefs", JSON.stringify(prefs));
    }
  }, [prefs, mounted]);

  const togglePref = (key: PrefsKeys) => {
    // Prevent toggling critical notifications
    if (key === "securityAlerts") return;
    setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const marketingKeys: PrefsKeys[] = [
    "offersDiscounts",
    "coupons",
    "flashSales",
    "personalizedRecs",
    "newArrivals",
    "limitedDrops",
  ];

  const handleToggleMarketing = () => {
    const isAnyMarketingOff = marketingKeys.some((k) => !prefs[k]);
    const nextVal = isAnyMarketingOff;
    const nextPrefs = { ...prefs };
    marketingKeys.forEach((k) => {
      nextPrefs[k] = nextVal;
    });
    setPrefs(nextPrefs);
  };

  const handleEnableAll = () => {
    const nextPrefs = { ...prefs };
    (Object.keys(nextPrefs) as PrefsKeys[]).forEach((key) => {
      if (key !== "securityAlerts") {
        nextPrefs[key] = true;
      }
    });
    setPrefs(nextPrefs);
  };

  if (!mounted) return null;

  const renderToggle = (
    key: PrefsKeys,
    title: string,
    description: string,
    isCritical = false
  ) => {
    const checked = prefs[key];
    return (
      <div className="flex items-start justify-between gap-4 py-4 border-b border-zinc-100 dark:border-zinc-800/80 last:border-0">
        <div className="flex flex-col flex-1">
          <span className={`text-sm font-bold ${isCritical ? "text-zinc-500" : "text-zinc-900 dark:text-zinc-100"}`}>
            {title}
            {isCritical && <span className="ml-2 text-[10px] bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded font-mono uppercase tracking-widest text-zinc-500">Required</span>}
          </span>
          <span className="text-xs text-zinc-500 mt-1 leading-relaxed pr-4">
            {description}
          </span>
        </div>
        <button
          onClick={() => togglePref(key)}
          disabled={isCritical}
          className={`relative shrink-0 w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none ${
            checked ? (isCritical ? "bg-zinc-300 dark:bg-zinc-700" : "bg-[#6F4E37]") : "bg-zinc-200 dark:bg-zinc-800"
          } ${isCritical ? "opacity-60 cursor-not-allowed" : "active:scale-95 cursor-pointer"}`}
        >
          <span
            className={`absolute top-[2px] left-[2px] bg-white rounded-full h-5 w-5 transition-transform duration-300 shadow-sm ${
              checked ? "translate-x-6" : "translate-x-0"
            }`}
          />
        </button>
      </div>
    );
  };

  const isMarketingAllOn = marketingKeys.every((k) => prefs[k]);

  return (
    <AppPageLayout hasBottomNav={false}>
      <AppHeader variant="contextual" title="Notification Settings" fallbackUrl="/mobile/account" />
      
      <div className="flex flex-col w-full bg-zinc-50 dark:bg-zinc-950 min-h-screen pb-12 select-none">
        
        {/* Subtitle / Header Section */}
        <div className="px-5 pt-6 pb-2">
          <p className="text-sm text-zinc-500 leading-relaxed font-sans">
            Manage how DripHunter keeps you updated.
          </p>
        </div>

        {/* Global Controls */}
        <div className="px-4 py-4">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800/80 p-5 shadow-sm space-y-5">
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-widest font-mono text-[11px]">
                Global Control
              </span>
            </div>

            <div className="flex items-center justify-between gap-4 border-b border-zinc-100 dark:border-zinc-800/80 pb-4">
              <div className="flex flex-col flex-1">
                <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Enable All Notifications</span>
                <span className="text-xs text-zinc-500 mt-1 leading-relaxed pr-4">Instantly turn on all optional notification categories.</span>
              </div>
              <button
                onClick={handleEnableAll}
                className="shrink-0 px-4 py-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-[10px] font-bold font-mono uppercase tracking-widest rounded-lg active:scale-95 transition-transform shadow-sm"
              >
                Enable All
              </button>
            </div>

            <div className="flex items-center justify-between gap-4 pt-1">
              <div className="flex flex-col flex-1">
                <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Marketing Notifications</span>
                <span className="text-xs text-zinc-500 mt-1 leading-relaxed pr-4">Master control for promotional offers, sales, and recommendations.</span>
              </div>
              <button
                onClick={handleToggleMarketing}
                className={`relative shrink-0 w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none active:scale-95 cursor-pointer ${
                  isMarketingAllOn ? "bg-[#6F4E37]" : "bg-zinc-200 dark:bg-zinc-800"
                }`}
              >
                <span
                  className={`absolute top-[2px] left-[2px] bg-white rounded-full h-5 w-5 transition-transform duration-300 shadow-sm ${
                    isMarketingAllOn ? "translate-x-6" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

          </div>
        </div>

        {/* 1. Orders & Delivery */}
        <div className="px-4 py-3">
          <h3 className="text-[10px] font-mono font-bold tracking-widest text-[#6F4E37] dark:text-[#E6C280] uppercase px-1 mb-3">
            Orders & Delivery
          </h3>
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800/80 px-5 shadow-sm">
            {renderToggle("orderUpdates", "Order Updates", "Updates about your orders, packing and shipping.")}
            {renderToggle("deliveryUpdates", "Delivery Updates", "Get notified about delivery status and progress.")}
            {renderToggle("orderIssues", "Order Issues", "Important updates about cancellations, failed delivery and refunds.")}
          </div>
        </div>

        {/* 2. Shopping */}
        <div className="px-4 py-3">
          <h3 className="text-[10px] font-mono font-bold tracking-widest text-[#6F4E37] dark:text-[#E6C280] uppercase px-1 mb-3">
            Shopping
          </h3>
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800/80 px-5 shadow-sm">
            {renderToggle("backInStock", "Back in Stock", "Get notified when products you're interested in are available again.")}
            {renderToggle("priceDrops", "Price Drops", "Get notified when products you're interested in go on sale.")}
            {renderToggle("wishlistUpdates", "Wishlist Updates", "Updates about products saved to your wishlist.")}
            {renderToggle("newArrivals", "New Arrivals", "Discover newly added products and collections.")}
            {renderToggle("limitedDrops", "Limited Drops", "Get alerts about limited and time-sensitive drops.")}
          </div>
        </div>

        {/* 3. Offers & Promotions */}
        <div className="px-4 py-3">
          <h3 className="text-[10px] font-mono font-bold tracking-widest text-[#6F4E37] dark:text-[#E6C280] uppercase px-1 mb-3">
            Offers & Promotions
          </h3>
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800/80 px-5 shadow-sm">
            {renderToggle("offersDiscounts", "Offers & Discounts", "Receive notifications about special offers and discounts.")}
            {renderToggle("coupons", "Coupons", "Get notified about new and expiring coupons.")}
            {renderToggle("flashSales", "Flash Sales", "Receive alerts when flash sales go live.")}
            {renderToggle("personalizedRecs", "Personalized Recommendations", "Get product recommendations based on your activity.")}
          </div>
        </div>

        {/* 4. Account & Security */}
        <div className="px-4 py-3">
          <h3 className="text-[10px] font-mono font-bold tracking-widest text-[#6F4E37] dark:text-[#E6C280] uppercase px-1 mb-3">
            Account & Security
          </h3>
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800/80 px-5 shadow-sm">
            {renderToggle("accountActivity", "Account Activity", "Important activity related to your DripHunter account.")}
            {renderToggle("securityAlerts", "Security Alerts", "Important security and login notifications.", true)}
          </div>
        </div>

      </div>
    </AppPageLayout>
  );
}
