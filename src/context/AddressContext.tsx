"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type AddressType = "HOME" | "WORK" | "OTHER";

export interface Address {
  id: number;
  type: AddressType;
  name: string;
  phone: string;
  pincode: string;
  locality: string;
  address: string;
  city: string;
  state: string;
  landmark?: string;
  alternatePhone?: string;
}

interface AddressContextType {
  addresses: Address[];
  activeAddressId: number | null;
  addAddress: (address: Omit<Address, "id">) => number;
  updateAddress: (id: number, address: Partial<Address>) => void;
  deleteAddress: (id: number) => void;
  setActiveAddress: (id: number) => void;
}

const defaultAddresses: Address[] = [
  {
    id: 1,
    type: "HOME",
    name: "Rahul Verma",
    phone: "9988776655",
    pincode: "122002",
    locality: "Cyber City",
    address: "456 Elite Residences, Cyber City",
    city: "Gurugram",
    state: "Haryana",
  },
  {
    id: 2,
    type: "WORK",
    name: "Priya Singh",
    phone: "9876543210",
    pincode: "400050",
    locality: "Bandra West",
    address: "789 Luxury Towers, Bandra West",
    city: "Mumbai",
    state: "Maharashtra",
  }
];

const AddressContext = createContext<AddressContextType | undefined>(undefined);

export const AddressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [addresses, setAddresses] = useState<Address[]>(defaultAddresses);
  const [activeAddressId, setActiveAddressId] = useState<number | null>(null);

  // Load from local storage
  useEffect(() => {
    try {
      const storedAddresses = localStorage.getItem("drip_addresses_v2");
      const storedActiveId = localStorage.getItem("drip_active_address_v2");
      
      if (storedAddresses) {
        setAddresses(JSON.parse(storedAddresses));
      }
      
      if (storedActiveId && storedActiveId !== "null") {
        setActiveAddressId(Number(storedActiveId));
      } 
      // Do not auto-select the first address to allow 'Select Delivery Location' to display
    } catch (e) {
      console.error("Failed to load addresses from local storage", e);
    }
  }, []);

  // Save to local storage
  useEffect(() => {
    try {
      localStorage.setItem("drip_addresses_v2", JSON.stringify(addresses));
      if (activeAddressId !== null) {
        localStorage.setItem("drip_active_address_v2", activeAddressId.toString());
      } else {
        localStorage.removeItem("drip_active_address_v2");
      }
    } catch (e) {
      console.error("Failed to save addresses to local storage", e);
    }
  }, [addresses, activeAddressId]);

  const addAddress = (address: Omit<Address, "id">): number => {
    const newAddress = { ...address, id: Date.now() };
    setAddresses((prev) => [...prev, newAddress]);
    setActiveAddressId(newAddress.id);
    return newAddress.id;
  };

  const updateAddress = (id: number, updatedAddress: Partial<Address>) => {
    setAddresses((prev) =>
      prev.map((addr) => (addr.id === id ? { ...addr, ...updatedAddress } : addr))
    );
  };

  const deleteAddress = (id: number) => {
    setAddresses((prev) => prev.filter((addr) => addr.id !== id));
    if (activeAddressId === id) {
      setActiveAddressId(null);
    }
  };

  const setActiveAddress = (id: number) => {
    setActiveAddressId(id);
  };

  return (
    <AddressContext.Provider
      value={{
        addresses,
        activeAddressId,
        addAddress,
        updateAddress,
        deleteAddress,
        setActiveAddress,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
};

export const useAddress = () => {
  const context = useContext(AddressContext);
  if (context === undefined) {
    throw new Error("useAddress must be used within an AddressProvider");
  }
  return context;
};
