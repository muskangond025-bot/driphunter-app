"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface SavedCard {
  id: string;
  type: string;
  last4: string;
  expiry: string;
  cardName: string;
  isDefault: boolean;
}

interface PaymentContextType {
  savedUpis: string[];
  savedCards: SavedCard[];
  addUpi: (upi: string) => void;
  removeUpi: (upi: string) => void;
  addCard: (card: Omit<SavedCard, "id">) => void;
  removeCard: (id: string) => void;
  setDefaultCard: (id: string) => void;
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

export function PaymentProvider({ children }: { children: React.ReactNode }) {
  const [savedUpis, setSavedUpis] = useState<string[]>([]);
  const [savedCards, setSavedCards] = useState<SavedCard[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const upisStr = localStorage.getItem("drip_saved_upis");
      if (upisStr) {
        setSavedUpis(JSON.parse(upisStr));
      }
      const cardsStr = localStorage.getItem("drip_saved_cards");
      if (cardsStr) {
        setSavedCards(JSON.parse(cardsStr));
      }
    } catch (e) {
      console.error("Error loading payment data", e);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("drip_saved_upis", JSON.stringify(savedUpis));
      localStorage.setItem("drip_saved_cards", JSON.stringify(savedCards));
    }
  }, [savedUpis, savedCards, isLoaded]);

  const addUpi = (upi: string) => {
    setSavedUpis((prev) => {
      if (prev.includes(upi)) return prev;
      return [...prev, upi];
    });
  };

  const removeUpi = (upi: string) => {
    setSavedUpis((prev) => prev.filter((u) => u !== upi));
  };

  const addCard = (card: Omit<SavedCard, "id">) => {
    setSavedCards((prev) => {
      const isDuplicate = prev.some(
        (c) => c.last4 === card.last4 && c.expiry === card.expiry
      );
      if (isDuplicate) return prev;
      
      const newCard: SavedCard = {
        ...card,
        id: Date.now().toString(),
      };
      
      if (prev.length === 0) {
        newCard.isDefault = true;
      }
      
      return [...prev, newCard];
    });
  };

  const removeCard = (id: string) => {
    setSavedCards((prev) => prev.filter((c) => c.id !== id));
  };

  const setDefaultCard = (id: string) => {
    setSavedCards((prev) =>
      prev.map((c) => ({
        ...c,
        isDefault: c.id === id,
      }))
    );
  };

  return (
    <PaymentContext.Provider
      value={{
        savedUpis,
        savedCards,
        addUpi,
        removeUpi,
        addCard,
        removeCard,
        setDefaultCard,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
}

export function usePayment() {
  const context = useContext(PaymentContext);
  if (context === undefined) {
    throw new Error("usePayment must be used within a PaymentProvider");
  }
  return context;
}
