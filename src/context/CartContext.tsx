"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  brand: string;
  size: string;
  color: string;
  quantity: number;
}

export interface WishlistItem {
  id: string;
  name: string;
  price: string;
  image: string;
  brand: string;
}

interface CartContextType {
  cart: CartItem[];
  wishlist: WishlistItem[];
  addToCart: (item: Omit<CartItem, "quantity">, qty?: number) => void;
  removeFromCart: (id: string, size: string, color: string) => void;
  updateQuantity: (id: string, size: string, color: string, quantity: number) => void;
  toggleWishlist: (item: WishlistItem) => void;
  isInWishlist: (id: string) => boolean;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  isLoaded: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleSetIsCartOpen = (open: boolean) => {
    if (open) {
      setIsWishlistOpen(false);
    }
    setIsCartOpen(open);
  };

  const handleSetIsWishlistOpen = (open: boolean) => {
    if (open) {
      setIsCartOpen(false);
    }
    setIsWishlistOpen(open);
  };

  // Load cart and wishlist from LocalStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("driphunter_cart");
    const savedWishlist = localStorage.getItem("driphunter_wishlist");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart", e);
      }
    }
    if (savedWishlist) {
      try {
        setWishlist(JSON.parse(savedWishlist));
      } catch (e) {
        console.error("Failed to parse wishlist", e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save cart to LocalStorage when changed, but ONLY after initial load
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("driphunter_cart", JSON.stringify(cart));
    }
  }, [cart, isLoaded]);

  // Save wishlist to LocalStorage when changed, but ONLY after initial load
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("driphunter_wishlist", JSON.stringify(wishlist));
    }
  }, [wishlist, isLoaded]);

  const addToCart = (newItem: Omit<CartItem, "quantity">, qty: number = 1) => {
    setCart((prevCart) => {
      const existingIdx = prevCart.findIndex(
        (item) =>
          item.id === newItem.id &&
          item.size === newItem.size &&
          item.color === newItem.color
      );

      if (existingIdx > -1) {
        const updated = [...prevCart];
        updated[existingIdx].quantity += qty;
        return updated;
      } else {
        return [...prevCart, { ...newItem, quantity: qty }];
      }
    });
    // setIsCartOpen(true); // Auto-open bag drawer for active feedback
  };

  const removeFromCart = (id: string, size: string, color: string) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) => !(item.id === id && item.size === size && item.color === color)
      )
    );
  };

  const updateQuantity = (
    id: string,
    size: string,
    color: string,
    quantity: number
  ) => {
    if (quantity <= 0) {
      removeFromCart(id, size, color);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id && item.size === size && item.color === color
          ? { ...item, quantity }
          : item
      )
    );
  };

  const toggleWishlist = (newItem: WishlistItem) => {
    setWishlist((prevWishlist) => {
      const exists = prevWishlist.some((item) => item.id === newItem.id);
      if (exists) {
        return prevWishlist.filter((item) => item.id !== newItem.id);
      } else {
        return [...prevWishlist, newItem];
      }
    });
  };

  const isInWishlist = (id: string) => {
    return wishlist.some((item) => item.id === id);
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleWishlist,
        isInWishlist,
        clearCart,
        isCartOpen,
        setIsCartOpen: handleSetIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen: handleSetIsWishlistOpen,
        isLoaded,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
