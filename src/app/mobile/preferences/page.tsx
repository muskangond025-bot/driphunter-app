"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Moon, Sun, Monitor, Bell, MapPin, Check, ArrowRight, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export default function MobilePreferencesPage() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  const [step, setStep] = useState(1);
  const [notifStatus, setNotifStatus] = useState<string>("pending");
  const [locStatus, setLocStatus] = useState<string>("pending");

  useEffect(() => {
    setMounted(true);
    
    // Read REAL browser permission
    if (typeof window !== "undefined" && "Notification" in window) {
      const currentPerm = Notification.permission;
      setNotifStatus(currentPerm);
      localStorage.setItem("drip_notification_permission_status", currentPerm);
    } else {
      setNotifStatus("unsupported");
      localStorage.setItem("drip_notification_permission_status", "unsupported");
    }
    
    const savedLoc = localStorage.getItem("drip_location_permission_status");
    if (savedLoc) setLocStatus(savedLoc);
  }, []);

  // Update notif status when step changes to 2 (in case they changed it in OS)
  useEffect(() => {
    if (step === 2 && mounted && typeof window !== "undefined" && "Notification" in window) {
      const currentPerm = Notification.permission;
      if (notifStatus !== currentPerm) {
        setNotifStatus(currentPerm);
        localStorage.setItem("drip_notification_permission_status", currentPerm);
      }
    }
  }, [step, mounted, notifStatus]);

  const handleEnableNotifications = async () => {
    try {
      if (typeof window === "undefined" || !("Notification" in window)) {
        setNotifStatus("unsupported");
        localStorage.setItem("drip_notification_permission_status", "unsupported");
        setStep(3);
        return;
      }

      const permission = await Notification.requestPermission();
      setNotifStatus(permission);
      localStorage.setItem("drip_notification_permission_status", permission);
      
      // If granted or denied, don't auto advance so they see the state,
      // but if we want to mimic standard UX, we can let them click 'Continue' explicitly.
    } catch (e) {
      console.error(e);
      setNotifStatus("denied"); // Default to denied on error
      localStorage.setItem("drip_notification_permission_status", "denied");
    }
  };

  const handleSkipNotifications = () => {
    // DO NOT call requestPermission. Just continue.
    // If it was default, it stays default.
    setStep(3);
  };

  const handleEnableLocation = () => {
    if (!("geolocation" in navigator)) {
      setLocStatus("unsupported");
      localStorage.setItem("drip_location_permission_status", "unsupported");
      finishSetup();
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocStatus("granted");
        localStorage.setItem("drip_location_permission_status", "granted");
        finishSetup();
      },
      (error) => {
        setLocStatus("denied");
        localStorage.setItem("drip_location_permission_status", "denied");
        finishSetup();
      }
    );
  };

  const handleSkipLocation = () => {
    setLocStatus("skipped");
    localStorage.setItem("drip_location_permission_status", "skipped");
    finishSetup();
  };

  const finishSetup = () => {
    localStorage.setItem("drip_onboarding_completed", "true");
    router.replace("/mobile");
  };

  if (!mounted) return null;

  return (
    <div className="flex flex-col min-h-[100dvh] w-full bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300">
      {/* Header */}
      <div className="pt-[env(safe-area-inset-top)] pb-4 px-6 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 sticky top-0 z-10 flex items-center gap-4">
        {step > 1 && (
          <button onClick={() => setStep(step - 1)} className="p-2 -ml-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
            <ArrowLeft className="w-5 h-5" />
          </button>
        )}
        <h1 className="font-playfair text-xl font-bold tracking-tight text-zinc-900 dark:text-white mt-1 flex-1">
          MAKE DRIPHUNTER <span className="italic font-normal text-[#6F4E37] dark:text-[#E6C280]">YOURS</span>
        </h1>
        <div className="flex gap-1">
          {[1, 2, 3].map(i => (
            <div key={i} className={cn("h-1.5 rounded-full transition-all duration-300", step === i ? "w-4 bg-[#6F4E37] dark:bg-[#E6C280]" : "w-1.5 bg-zinc-200 dark:bg-zinc-800")} />
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-8 flex flex-col justify-center gap-10 pb-32">
        
        {/* APPEARANCE */}
        {step === 1 && (
          <section className="flex flex-col gap-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <div>
              <h2 className="text-sm font-bold font-mono uppercase tracking-widest text-zinc-900 dark:text-zinc-100 mb-2">Choose your look</h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 font-sans leading-relaxed">Select your preferred app appearance. You can change this later in settings.</p>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {[
                { id: "light", icon: Sun, label: "Light Mode", desc: "Clean and bright" },
                { id: "dark", icon: Moon, label: "Dark Mode", desc: "Easy on the eyes" },
                { id: "system", icon: Monitor, label: "System Default", desc: "Matches your device" }
              ].map(t => {
                const isSelected = theme === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setTheme(t.id)}
                    className={cn(
                      "flex items-center gap-4 p-5 rounded-2xl border transition-all duration-200 text-left",
                      isSelected 
                        ? "border-[#6F4E37] dark:border-[#E6C280] bg-[#6F4E37]/5 dark:bg-[#E6C280]/10" 
                        : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700"
                    )}
                  >
                    <div className={cn("p-3 rounded-full", isSelected ? "bg-[#6F4E37]/10 dark:bg-[#E6C280]/10 text-[#6F4E37] dark:text-[#E6C280]" : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400")}>
                      <t.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className={cn("text-sm font-bold uppercase tracking-wider mb-0.5", isSelected ? "text-[#6F4E37] dark:text-[#E6C280]" : "text-zinc-900 dark:text-zinc-100")}>{t.label}</div>
                      <div className="text-xs text-zinc-500 dark:text-zinc-400">{t.desc}</div>
                    </div>
                    {isSelected && <Check className="w-5 h-5 text-[#6F4E37] dark:text-[#E6C280]" />}
                  </button>
                )
              })}
            </div>
            <button 
              onClick={() => setStep(2)}
              className="mt-6 w-full flex items-center justify-center gap-2 bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-950 py-4 rounded-full font-mono text-xs font-bold uppercase tracking-[0.2em] shadow-xl active:scale-95 transition-all"
            >
              <span>Next</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </section>
        )}

        {/* NOTIFICATIONS */}
        {step === 2 && (
          <section className="flex flex-col gap-8 animate-in fade-in slide-in-from-right-4 duration-500 text-center items-center">
            <div className="w-24 h-24 rounded-full bg-[#6F4E37]/10 dark:bg-[#E6C280]/10 flex items-center justify-center mb-2">
              <Bell className="w-10 h-10 text-[#6F4E37] dark:text-[#E6C280]" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-mono uppercase tracking-widest text-zinc-900 dark:text-zinc-100 mb-3">STAY IN THE LOOP</h2>
              
              {notifStatus === "granted" ? (
                <p className="text-sm text-emerald-600 dark:text-emerald-400 font-sans leading-relaxed font-bold max-w-[280px] mx-auto">
                  Notifications are enabled.
                </p>
              ) : notifStatus === "denied" ? (
                <p className="text-sm text-red-600 dark:text-red-400 font-sans leading-relaxed font-bold max-w-[280px] mx-auto">
                  Notifications are blocked in your browser settings.
                </p>
              ) : (
                <p className="text-sm text-zinc-500 dark:text-zinc-400 font-sans leading-relaxed max-w-[280px] mx-auto">
                  Get important updates about your orders, drops, and offers.
                </p>
              )}
            </div>
            
            <div className="flex flex-col gap-3 w-full mt-4">
              {notifStatus === "default" || notifStatus === "pending" ? (
                <>
                  <button 
                    onClick={handleEnableNotifications}
                    className="w-full bg-[#6F4E37] dark:bg-[#E6C280] text-white dark:text-zinc-950 py-4 rounded-full font-mono text-xs font-bold uppercase tracking-[0.2em] shadow-xl shadow-[#6F4E37]/20 active:scale-95 transition-transform"
                  >
                    ENABLE NOTIFICATIONS
                  </button>
                  <button 
                    onClick={handleSkipNotifications}
                    className="w-full py-4 rounded-full font-sans text-sm font-medium text-zinc-500 active:text-zinc-900 dark:active:text-zinc-100 transition-colors uppercase tracking-[0.1em]"
                  >
                    NOT NOW
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => setStep(3)}
                  className="w-full bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-950 py-4 rounded-full font-mono text-xs font-bold uppercase tracking-[0.2em] shadow-xl active:scale-95 transition-transform flex items-center justify-center gap-2"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </section>
        )}

        {/* LOCATION */}
        {step === 3 && (
          <section className="flex flex-col gap-8 animate-in fade-in slide-in-from-right-4 duration-500 text-center items-center">
            <div className="w-24 h-24 rounded-full bg-[#6F4E37]/10 dark:bg-[#E6C280]/10 flex items-center justify-center mb-2">
              <MapPin className="w-10 h-10 text-[#6F4E37] dark:text-[#E6C280]" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-mono uppercase tracking-widest text-zinc-900 dark:text-zinc-100 mb-3">FASTER DELIVERY</h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 font-sans leading-relaxed max-w-[280px] mx-auto">
                Use your location for a faster checkout experience and accurate delivery estimates.
              </p>
            </div>
            
            <div className="flex flex-col gap-3 w-full mt-4">
              <button 
                onClick={handleEnableLocation}
                className="w-full bg-[#6F4E37] dark:bg-[#E6C280] text-white dark:text-zinc-950 py-4 rounded-full font-mono text-xs font-bold uppercase tracking-[0.2em] shadow-xl shadow-[#6F4E37]/20 active:scale-95 transition-transform"
              >
                USE MY LOCATION
              </button>
              <button 
                onClick={handleSkipLocation}
                className="w-full py-4 rounded-full font-sans text-sm font-medium text-zinc-500 active:text-zinc-900 dark:active:text-zinc-100 transition-colors"
              >
                Not now
              </button>
            </div>
          </section>
        )}

      </div>
    </div>
  );
}
