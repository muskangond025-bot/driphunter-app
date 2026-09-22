"use client";

import React, { useState, useEffect } from "react";
import AppHeader from "@/components/app-shell/AppHeader";
import AppPageLayout from "@/components/app-shell/AppPageLayout";
import { Check, CheckCircle2 } from "lucide-react";

export default function MobileLanguagePage() {
  const [selectedLang, setSelectedLang] = useState("en");
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("driphunter_language");
    if (saved) {
      setSelectedLang(saved);
    }
  }, []);

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const languages = [
    { code: "en", name: "English (US)", native: "English" },
    { code: "hi", name: "Hindi", native: "हिन्दी" },
    { code: "es", name: "Spanish", native: "Español" },
    { code: "fr", name: "French", native: "Français" },
    { code: "de", name: "German", native: "Deutsch" },
    { code: "ja", name: "Japanese", native: "日本語" },
  ];

  const handleSelect = (code: string) => {
    setSelectedLang(code);
    localStorage.setItem("driphunter_language", code);
    triggerToast("Language updated successfully");
  };

  return (
    <AppPageLayout hasBottomNav={false} className="bg-zinc-50 dark:bg-zinc-950">
      <AppHeader showActions={true}
        variant="contextual"
        title="Language"
        fallbackUrl="/mobile/account"
      />

      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-[100] bg-zinc-900 text-white px-4 py-2.5 rounded-full font-mono text-xs font-bold shadow-2xl flex items-center gap-2 animate-in slide-in-from-top-2 w-[90%] max-w-sm justify-center">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span className="truncate">{toastMsg}</span>
        </div>
      )}

      <div className="p-4 pb-24">
        <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4">Select Language</h3>
        
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden flex flex-col">
          {languages.map((lang, idx) => (
            <button
              key={lang.code}
              onClick={() => handleSelect(lang.code)}
              className={`flex items-center justify-between p-4 active:bg-zinc-50 dark:active:bg-zinc-800 transition-colors ${
                idx !== languages.length - 1 ? 'border-b border-zinc-100 dark:border-zinc-800' : ''
              }`}
            >
              <div className="flex flex-col items-start">
                <span className="text-sm font-bold text-zinc-900 dark:text-white">
                  {lang.name}
                </span>
                <span className="text-xs text-zinc-500 font-medium mt-0.5">
                  {lang.native}
                </span>
              </div>
              
              <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                selectedLang === lang.code 
                  ? 'bg-zinc-900 border-zinc-900 text-white dark:bg-zinc-100 dark:border-zinc-100 dark:text-zinc-900' 
                  : 'border-zinc-300 dark:border-zinc-700 bg-transparent'
              }`}>
                {selectedLang === lang.code && <Check className="w-3.5 h-3.5" />}
              </div>
            </button>
          ))}
        </div>
        
        <p className="text-xs text-zinc-500 mt-6 text-center">
          Changes will be applied across the app on your next visit.
        </p>
      </div>
    </AppPageLayout>
  );
}
