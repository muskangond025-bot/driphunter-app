"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { translations, LanguageCode, TranslationKey } from "@/i18n/translations";

type LanguageContextType = {
  langCode: LanguageCode;
  setLangCode: (code: LanguageCode) => void;
  t: (key: TranslationKey) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [langCode, setLangCode] = useState<LanguageCode>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedCode = localStorage.getItem("driphunter_language") as LanguageCode;
    if (savedCode && Object.keys(translations).includes(savedCode)) {
      setLangCode(savedCode);
    }
  }, []);

  const changeLanguage = (code: LanguageCode) => {
    setLangCode(code);
    localStorage.setItem("driphunter_language", code);
  };

  const t = (key: TranslationKey): string => {
    // If not mounted yet to avoid hydration mismatch, return English or the key.
    // However, we need to return something. Usually, returning English is safer for SSR.
    if (!mounted) return translations.en[key];
    return translations[langCode][key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ langCode, setLangCode: changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
