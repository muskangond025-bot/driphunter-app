"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { User, LogOut, ChevronRight, Folder, CreditCard, Box, Heart, Bell, MessageSquare, Star, Plus, MoreVertical, Crosshair, Search, ChevronDown, X, Trash2, Sparkles, AlertCircle } from "lucide-react";

function ProfileTabHandler({ onTabChange, onMobileViewChange }: { onTabChange: (tab: string) => void, onMobileViewChange: (v: boolean) => void }) {
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab');
  
  useEffect(() => {
    if (tab) {
      onTabChange(tab);
      onMobileViewChange(true);
    }
  }, [tab, onTabChange, onMobileViewChange]);

  return null;
}
import { useAddress, Address, AddressType } from "@/context/AddressContext";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [isMobileDetailView, setIsMobileDetailView] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const router = useRouter();

  // Addresses state
  const [isAddingNewAddress, setIsAddingNewAddress] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<number | null>(null);
  const [activeDropdownId, setActiveDropdownId] = useState<number | null>(null);
  const [isLocating, setIsLocating] = useState(false);

  const { addresses, addAddress, updateAddress, deleteAddress } = useAddress();

  const [addressForm, setAddressForm] = useState({
    name: "",
    phone: "",
    pincode: "",
    locality: "",
    address: "",
    city: "",
    state: "",
    type: "HOME" as AddressType
  });

  // Form states
  const [firstName, setFirstName] = useState("Alex");
  const [lastName, setLastName] = useState("Carter");
  const [email, setEmail] = useState("alex@driphunter.com");
  const [mobileNumber, setMobileNumber] = useState("+91 9876543210");
  const [gender, setGender] = useState("Male");
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [isEditingMobile, setIsEditingMobile] = useState(false);

  // Gift Card State
  const [activeModal, setActiveModal] = useState<'add' | 'check' | 'deactivate' | 'delete' | null>(null);
  const [giftCardTab, setGiftCardTab] = useState<'personal' | 'corporate'>('personal');
  
  // FAQ Expansion States
  const [showAllUpiFaqs, setShowAllUpiFaqs] = useState(false);
  const [showAllCardsFaqs, setShowAllCardsFaqs] = useState(false);
  
  // Coupons State
  const [visibleCoupons, setVisibleCoupons] = useState(3);
  const [tcModalOpen, setTcModalOpen] = useState(false);

  // Reviews State
  const [reviews, setReviews] = useState([
    {
      id: 1,
      title: "Nike Air Max 2024 - Men's Running Shoes",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=200&q=80",
      rating: 4,
      headline: "Very Comfortable!",
      text: "Bought these for my daily runs and they are amazing. The cushioning is perfect and they are very lightweight. Fits true to size. Highly recommended if you are looking for long-distance running shoes.",
      date: "15 Aug, 2026"
    },
    {
      id: 2,
      title: "Roadster Men Solid Cotton Blend T-Shirt",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=200&q=80",
      rating: 5,
      headline: "Excellent quality for the price",
      text: "The fabric is very soft and breathable. Color hasn't faded even after multiple washes. Good fit overall. Will definitely buy more colors of the same brand.",
      date: "02 Sep, 2026"
    }
  ]);
  const [editReviewModal, setEditReviewModal] = useState<any>(null);

  // Notifications State
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Order Delivered!",
      message: "Your order for 'Nike Air Max 2024' has been delivered. Rate your purchase now!",
      time: "2 hours ago",
      read: false,
      type: "order"
    },
    {
      id: 2,
      title: "Price Drop Alert \uD83D\uDCC9",
      message: "An item in your wishlist 'Roadster Men Solid Cotton Blend T-Shirt' has dropped in price by \u20B9200.",
      time: "1 day ago",
      read: true,
      type: "offer"
    },
    {
      id: 3,
      title: "Review Approved",
      message: "Your review for 'Roadster Men Solid Cotton Blend T-Shirt' has been approved and is now live.",
      time: "3 days ago",
      read: true,
      type: "system"
    }
  ]);

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const mockCoupons = [
    { id: 1, code: "SD_FNV_199_55", desc: "SD_FNV_199_55 (Valid till: 11:59 PM, 30 Sep)", validDate: "30 Sep, 2026" },
    { id: 2, code: "SD_FNV_199_75", desc: "SD_FNV_199_75 (Valid till: 11:59 PM, 30 Sep)", validDate: "30 Sep, 2026" },
    { id: 3, code: "Extra 14% OFF on Selfcare Devi", desc: "Extra 14% OFF on Selfcare Devices (Valid till: 11:59 PM, 30 Sep)", validDate: "30 Sep, 2026" },
    { id: 4, code: "Extra 8% OFF on Selfcare Devic", desc: "Extra 8% OFF on Selfcare Devices (Valid till: 11:59 PM, 30 Sep)", validDate: "30 Sep, 2026" },
    { id: 5, code: "Extra 500 OFF on 2 or More Device", desc: "Extra 500 OFF on 2 or More Devices (Valid till: 11:59 PM, 30 Sep)", validDate: "30 Sep, 2026" }
  ];

  const [giftCardForms, setGiftCardForms] = useState([
    { id: Date.now(), value: "", count: 1, email: "", name: "", gifter: "", msg: "" }
  ]);

  const addGiftCardForm = () => {
    setGiftCardForms([...giftCardForms, { id: Date.now(), value: "", count: 1, email: "", name: "", gifter: "", msg: "" }]);
  };

  const removeGiftCardForm = (id: number) => {
    if (giftCardForms.length > 1) {
      setGiftCardForms(giftCardForms.filter(form => form.id !== id));
    }
  };

  const updateGiftCardForm = (id: number, field: string, value: any) => {
    setGiftCardForms(giftCardForms.map(form => form.id === id ? { ...form, [field]: value } : form));
  };

  // PAN Card State
  const [panNumber, setPanNumber] = useState("");
  const [panName, setPanName] = useState("");
  const [panFile, setPanFile] = useState<File | null>(null);
  const [isPanDeclared, setIsPanDeclared] = useState(false);

  const handlePanUpload = () => {
    if (!panNumber || !panName || !panFile) {
      alert("Please fill in all details and select a PAN Card image.");
      return;
    }
    if (!isPanDeclared) {
      alert("Please accept the declaration checkbox to proceed.");
      return;
    }
    alert(`PAN Card Information submitted successfully!\nPAN: ${panNumber}\nName: ${panName}`);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("drip_user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      const names = userData.name.split(" ");
      setFirstName(names[0] || "Alex");
      setLastName(names.slice(1).join(" ") || "Carter");
      setEmail(userData.email || "alex@driphunter.com");
    }
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest('.dropdown-container')) {
        setActiveDropdownId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [activeDropdownId]);

  const handleUseLocation = () => {
    setIsLocating(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setTimeout(() => {
            setAddressForm(prev => ({
              ...prev,
              pincode: "400050",
              locality: "Bandra West",
              city: "Mumbai",
              state: "Maharashtra",
              address: "142 Streetwear Lane, Near DripHunter Store"
            }));
            setIsLocating(false);
          }, 800);
        },
        (error) => {
          alert("Unable to retrieve your location. Please enter manually.");
          setIsLocating(false);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
      setIsLocating(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("drip_user");
    router.push("/login");
  };

  const renderInput = (label: string, value: string, setValue: any, type="text", editable=true) => (
    <div className="w-full">
      <label className="text-[10px] font-mono uppercase tracking-wider text-zinc-700 dark:text-zinc-300 block mb-2">{label}</label>
      <input 
        type={type} 
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!editable}
        className={`w-full border ${editable ? 'border-zinc-200 dark:border-zinc-800 focus:border-[#6F4E37] dark:focus:border-[#E6C280]' : 'border-transparent bg-zinc-50 dark:bg-zinc-800/50 text-zinc-700 dark:text-zinc-300'} px-4 py-3.5 rounded-xl text-sm outline-none transition-all duration-300 font-sans`}
      />
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-[#FCFAF7] dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 select-none antialiased font-sans transition-colors duration-300">
      <Suspense fallback={null}>
        <ProfileTabHandler onTabChange={setActiveTab} onMobileViewChange={setIsMobileDetailView} />
      </Suspense>
      <Navbar onSearchClick={() => {}} />

      <main className="flex-grow w-full max-w-[1400px] mx-auto px-6 sm:px-12 py-12 flex flex-col md:flex-row gap-8 lg:gap-12">
        {/* SIDEBAR */}
        <div className={`w-full md:w-[280px] lg:w-[320px] flex-shrink-0 space-y-6 animate-fade-in ${isMobileDetailView ? 'max-md:hidden' : 'max-md:block'}`}>
          
          {/* User Info Block */}
          <div className="bg-white dark:bg-zinc-900/60 rounded-[32px] p-6 flex items-center gap-5 border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm">
            <div className="w-14 h-14 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center overflow-hidden border border-zinc-200 dark:border-zinc-700">
              <User className="w-6 h-6 text-zinc-800 dark:text-zinc-200 dark:text-zinc-300" />
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-[10px] font-mono tracking-wider uppercase text-zinc-700 dark:text-zinc-300 mb-1">Welcome back</span>
              <span className="text-lg font-playfair font-medium text-zinc-900 dark:text-zinc-100 truncate w-40">
                {firstName} {lastName}
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-white dark:bg-zinc-900/60 rounded-[24px] border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm flex divide-x divide-zinc-100 dark:divide-zinc-800 overflow-hidden">
            <div 
              className="flex-1 py-4 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors group"
              onClick={() => router.push('/orders')}
            >
              <Box className="w-5 h-5 text-zinc-800 dark:text-zinc-200 group-hover:text-[#6F4E37] dark:group-hover:text-[#E6C280] transition-colors" />
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-800 dark:text-zinc-200 dark:text-zinc-400">Orders</span>
            </div>
            <div 
              className="flex-1 py-4 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors group"
              onClick={() => router.push('/helpcenter')}
            >
              <MessageSquare className="w-5 h-5 text-zinc-800 dark:text-zinc-200 group-hover:text-[#6F4E37] dark:group-hover:text-[#E6C280] transition-colors" />
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-800 dark:text-zinc-200 dark:text-zinc-400">Help</span>
            </div>
          </div>

          {/* Sidebar Menu */}
          <div className="bg-white dark:bg-zinc-900/60 rounded-[32px] border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm overflow-hidden py-4">
            
            {/* Account Settings */}
            <div className="mb-2">
              <div className="flex items-center gap-3 px-6 py-3">
                <User className="w-4 h-4 text-zinc-800 dark:text-zinc-200" />
                <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-zinc-700 dark:text-zinc-300">Account</span>
              </div>
              <div className="flex flex-col">
                <div 
                  className={`px-12 py-3 text-sm cursor-pointer transition-colors ${activeTab === 'profile' ? 'text-[#6F4E37] dark:text-[#E6C280] bg-[#FCFAF7] dark:bg-zinc-800/50 font-medium border-r-2 border-[#6F4E37] dark:border-[#E6C280]' : 'text-zinc-800 dark:text-zinc-200 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'}`}
                  onClick={() => { setActiveTab('profile'); setIsMobileDetailView(true); }}
                >
                  Profile Information
                </div>
                <div 
                  className={`px-12 py-3 text-sm cursor-pointer transition-colors ${activeTab === 'addresses' ? 'text-[#6F4E37] dark:text-[#E6C280] bg-[#FCFAF7] dark:bg-zinc-800/50 font-medium border-r-2 border-[#6F4E37] dark:border-[#E6C280]' : 'text-zinc-800 dark:text-zinc-200 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'}`}
                  onClick={() => { setActiveTab('addresses'); setIsMobileDetailView(true); }}
                >
                  Manage Addresses
                </div>
                <div 
                  className={`px-12 py-3 text-sm cursor-pointer transition-colors ${activeTab === 'pan' ? 'text-[#6F4E37] dark:text-[#E6C280] bg-[#FCFAF7] dark:bg-zinc-800/50 font-medium border-r-2 border-[#6F4E37] dark:border-[#E6C280]' : 'text-zinc-800 dark:text-zinc-200 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'}`}
                  onClick={() => { setActiveTab('pan'); setIsMobileDetailView(true); }}
                >
                  PAN Card Information
                </div>
              </div>
            </div>

            <div className="w-full h-px bg-zinc-100 dark:bg-zinc-800 my-2"></div>

            {/* Payments */}
            <div className="mb-2">
              <div className="flex items-center gap-3 px-6 py-3">
                <CreditCard className="w-4 h-4 text-zinc-800 dark:text-zinc-200" />
                <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-zinc-700 dark:text-zinc-300">Payments</span>
              </div>
              <div className="flex flex-col">
                <div 
                  className={`px-12 py-3 text-sm cursor-pointer transition-colors ${activeTab === 'gift_cards' ? 'text-[#6F4E37] dark:text-[#E6C280] bg-[#FCFAF7] dark:bg-zinc-800/50 font-medium border-r-2 border-[#6F4E37] dark:border-[#E6C280]' : 'text-zinc-800 dark:text-zinc-200 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'}`}
                  onClick={() => { setActiveTab('gift_cards'); setIsMobileDetailView(true); }}
                >
                  Gift Cards
                </div>
                <div 
                  className={`px-12 py-3 text-sm cursor-pointer transition-colors ${activeTab === 'saved_upi' ? 'text-[#6F4E37] dark:text-[#E6C280] bg-[#FCFAF7] dark:bg-zinc-800/50 font-medium border-r-2 border-[#6F4E37] dark:border-[#E6C280]' : 'text-zinc-800 dark:text-zinc-200 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'}`}
                  onClick={() => { setActiveTab('saved_upi'); setIsMobileDetailView(true); }}
                >
                  Saved UPI
                </div>
                <div 
                  className={`px-12 py-3 text-sm cursor-pointer transition-colors ${activeTab === 'saved_cards' ? 'text-[#6F4E37] dark:text-[#E6C280] bg-[#FCFAF7] dark:bg-zinc-800/50 font-medium border-r-2 border-[#6F4E37] dark:border-[#E6C280]' : 'text-zinc-800 dark:text-zinc-200 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'}`}
                  onClick={() => { setActiveTab('saved_cards'); setIsMobileDetailView(true); }}
                >
                  Saved Cards
                </div>
              </div>
            </div>

            <div className="w-full h-px bg-zinc-100 dark:bg-zinc-800 my-2"></div>

            {/* My Stuff */}
            <div className="mb-2">
              <div className="flex items-center gap-3 px-6 py-3">
                <Folder className="w-4 h-4 text-zinc-800 dark:text-zinc-200" />
                <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-zinc-700 dark:text-zinc-300">My Archive</span>
              </div>
              <div className="flex flex-col">
                <div 
                  className={`px-12 py-3 text-sm cursor-pointer transition-colors ${activeTab === 'coupons' ? 'text-[#6F4E37] dark:text-[#E6C280] bg-[#FCFAF7] dark:bg-zinc-800/50 font-medium border-r-2 border-[#6F4E37] dark:border-[#E6C280]' : 'text-zinc-800 dark:text-zinc-200 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'}`}
                  onClick={() => { setActiveTab('coupons'); setIsMobileDetailView(true); }}
                >
                  My Coupons
                </div>
                <div 
                  className={`px-12 py-3 text-sm cursor-pointer transition-colors ${activeTab === 'reviews' ? 'text-[#6F4E37] dark:text-[#E6C280] bg-[#FCFAF7] dark:bg-zinc-800/50 font-medium border-r-2 border-[#6F4E37] dark:border-[#E6C280]' : 'text-zinc-800 dark:text-zinc-200 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'}`}
                  onClick={() => { setActiveTab('reviews'); setIsMobileDetailView(true); }}
                >
                  Reviews & Ratings
                </div>
                <div 
                  className={`px-12 py-3 text-sm cursor-pointer transition-colors ${activeTab === 'notifications' ? 'text-[#6F4E37] dark:text-[#E6C280] bg-[#FCFAF7] dark:bg-zinc-800/50 font-medium border-r-2 border-[#6F4E37] dark:border-[#E6C280]' : 'text-zinc-800 dark:text-zinc-200 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'}`}
                  onClick={() => { setActiveTab('notifications'); setIsMobileDetailView(true); }}
                >
                  All Notifications
                </div>
                <div 
                  className="px-12 py-3 text-sm text-zinc-800 dark:text-zinc-200 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 cursor-pointer transition-colors"
                  onClick={() => router.push('/wishlist')}
                >
                  My Wishlist
                </div>
              </div>
            </div>

            <div className="w-full h-px bg-zinc-100 dark:bg-zinc-800 my-2"></div>

            {/* Logout */}
            <div 
              className="flex items-center gap-3 px-6 py-4 cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors group"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 text-zinc-800 dark:text-zinc-200 group-hover:text-rose-500 transition-colors" />
              <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-zinc-700 dark:text-zinc-300 group-hover:text-rose-500 transition-colors">Logout</span>
            </div>

          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className={`flex-1 bg-white dark:bg-zinc-900/60 rounded-[32px] border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm p-8 sm:p-12 relative flex flex-col justify-between min-h-[600px] animate-fade-in ${isMobileDetailView ? 'max-md:block' : 'max-md:hidden'}`}>
          
          {/* Mobile Back Button */}
          <button 
            className="md:hidden flex items-center gap-2 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300 transition-colors mb-6 bg-zinc-100 dark:bg-zinc-800/50 hover:bg-zinc-200 dark:hover:bg-zinc-800 w-fit px-4 py-2 rounded-xl"
            onClick={() => setIsMobileDetailView(false)}
          >
            <ChevronRight className="w-4 h-4 rotate-180" />
            <span className="text-[10px] font-mono uppercase tracking-wider font-bold">Back to Menu</span>
          </button>

          {activeTab === 'profile' && (
            <div className="relative z-10 flex-grow animate-fade-in">
              <div className="mb-10">
                <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-mono font-bold tracking-[0.28em] text-[#6F4E37] dark:text-[#E6C280] uppercase mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Personal Details</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-light tracking-tight text-zinc-950 dark:text-zinc-50 font-playfair mb-8">
                  Profile <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280]">Information</span>
                </h1>

                {/* Form Fields */}
                <div className="max-w-2xl space-y-10">
                  
                  {/* Name Section */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-2">
                      <h3 className="text-sm font-semibold font-sans">Personal Details</h3>
                      <button 
                        className="text-[10px] font-mono uppercase tracking-wider text-[#6F4E37] dark:text-[#E6C280] hover:opacity-80 transition-opacity"
                        onClick={() => setIsEditingPersonal(!isEditingPersonal)}
                      >
                        {isEditingPersonal ? 'Cancel' : 'Edit'}
                      </button>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                      {renderInput("First Name", firstName, setFirstName, "text", isEditingPersonal)}
                      {renderInput("Last Name", lastName, setLastName, "text", isEditingPersonal)}
                    </div>
                    {isEditingPersonal && (
                      <div className="mt-4">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-700 dark:text-zinc-300 block mb-3">Your Gender</span>
                        <div className="flex gap-6 items-center">
                          <label className="flex items-center gap-2 cursor-pointer group">
                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${gender === 'Male' ? 'border-[#6F4E37] dark:border-[#E6C280]' : 'border-zinc-300 dark:border-zinc-600'}`}>
                              {gender === 'Male' && <div className="w-2 h-2 rounded-full bg-[#6F4E37] dark:bg-[#E6C280]"></div>}
                            </div>
                            <span className="text-sm text-zinc-800 dark:text-zinc-200 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors">Male</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer group">
                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${gender === 'Female' ? 'border-[#6F4E37] dark:border-[#E6C280]' : 'border-zinc-300 dark:border-zinc-600'}`}>
                              {gender === 'Female' && <div className="w-2 h-2 rounded-full bg-[#6F4E37] dark:bg-[#E6C280]"></div>}
                            </div>
                            <span className="text-sm text-zinc-800 dark:text-zinc-200 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors">Female</span>
                          </label>
                        </div>
                      </div>
                    )}
                    {isEditingPersonal && (
                      <button 
                        className="mt-6 bg-zinc-950 dark:bg-[#E6C280] text-white dark:text-zinc-950 px-8 py-3 rounded-xl text-xs font-mono font-bold uppercase tracking-widest shadow-md hover:opacity-90 transition-all active:scale-95"
                        onClick={() => setIsEditingPersonal(false)}
                      >
                        Save Changes
                      </button>
                    )}
                  </div>

                  {/* Email Section */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-2">
                      <h3 className="text-sm font-semibold font-sans">Email Address</h3>
                      <button 
                        className="text-[10px] font-mono uppercase tracking-wider text-[#6F4E37] dark:text-[#E6C280] hover:opacity-80 transition-opacity"
                        onClick={() => setIsEditingEmail(!isEditingEmail)}
                      >
                        {isEditingEmail ? 'Cancel' : 'Edit'}
                      </button>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                      {renderInput("Email Address", email, setEmail, "email", isEditingEmail)}
                    </div>
                    {isEditingEmail && (
                      <button 
                        className="mt-6 bg-zinc-950 dark:bg-[#E6C280] text-white dark:text-zinc-950 px-8 py-3 rounded-xl text-xs font-mono font-bold uppercase tracking-widest shadow-md hover:opacity-90 transition-all active:scale-95"
                        onClick={() => setIsEditingEmail(false)}
                      >
                        Save Email
                      </button>
                    )}
                  </div>

                  {/* Mobile Section */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-2">
                      <h3 className="text-sm font-semibold font-sans">Mobile Number</h3>
                      <button 
                        className="text-[10px] font-mono uppercase tracking-wider text-[#6F4E37] dark:text-[#E6C280] hover:opacity-80 transition-opacity"
                        onClick={() => setIsEditingMobile(!isEditingMobile)}
                      >
                        {isEditingMobile ? 'Cancel' : 'Edit'}
                      </button>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                      {renderInput("Mobile Number", mobileNumber, setMobileNumber, "tel", isEditingMobile)}
                    </div>
                    {isEditingMobile && (
                      <button 
                        className="mt-6 bg-zinc-950 dark:bg-[#E6C280] text-white dark:text-zinc-950 px-8 py-3 rounded-xl text-xs font-mono font-bold uppercase tracking-widest shadow-md hover:opacity-90 transition-all active:scale-95"
                        onClick={() => setIsEditingMobile(false)}
                      >
                        Save Number
                      </button>
                    )}
                  </div>
                </div>

                {/* Danger Zone */}
                <div className="mt-16 pt-8 border-t border-rose-100 dark:border-rose-900/30">
                   <h3 className="text-sm font-semibold text-rose-500 mb-4">Danger Zone</h3>
                   <div className="flex gap-4">
                     <button 
                       className="px-6 py-2.5 rounded-xl border border-rose-200 dark:border-rose-900/50 text-rose-500 text-xs font-mono font-bold uppercase tracking-wider hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors"
                       onClick={() => setActiveModal('deactivate')}
                     >
                       Deactivate
                     </button>
                     <button 
                       className="px-6 py-2.5 rounded-xl bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 text-xs font-mono font-bold uppercase tracking-wider hover:bg-rose-100 dark:hover:bg-rose-900/40 transition-colors"
                       onClick={() => setActiveModal('delete')}
                     >
                       Delete Account
                     </button>
                   </div>
                </div>

              </div>
            </div>
          )}

          {activeTab === 'addresses' && (
            <div className="relative z-10 flex-grow animate-fade-in">
              <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-mono font-bold tracking-[0.28em] text-[#6F4E37] dark:text-[#E6C280] uppercase mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Shipping Details</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-light tracking-tight text-zinc-950 dark:text-zinc-50 font-playfair mb-8">
                Manage <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280]">Addresses</span>
              </h1>
              
              {isAddingNewAddress || editingAddressId !== null ? (
                <div className="bg-zinc-50 dark:bg-zinc-900 p-8 rounded-3xl mb-8 border border-zinc-200 dark:border-zinc-800">
                  <div className="text-xs font-mono font-bold tracking-widest text-[#6F4E37] dark:text-[#E6C280] uppercase mb-6 flex items-center gap-2">
                    {editingAddressId !== null ? "Edit Address" : "Add New Address"}
                  </div>
                  
                  <button 
                    className="bg-zinc-950 dark:bg-[#E6C280] text-white dark:text-zinc-950 text-xs font-mono font-bold tracking-widest uppercase px-6 py-3.5 rounded-xl shadow-sm flex items-center gap-2 mb-8 hover:opacity-90 transition-all cursor-pointer border-none active:scale-95"
                    onClick={handleUseLocation}
                  >
                    <Crosshair className="w-4 h-4" />
                    {isLocating ? "Locating..." : "Use my current location"}
                  </button>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {renderInput("Name", addressForm.name, (v:any) => setAddressForm({...addressForm, name: v}))}
                    {renderInput("10-digit mobile number", addressForm.phone, (v:any) => setAddressForm({...addressForm, phone: v}), "tel")}
                    {renderInput("Pincode", addressForm.pincode, (v:any) => setAddressForm({...addressForm, pincode: v}))}
                    {renderInput("Locality", addressForm.locality, (v:any) => setAddressForm({...addressForm, locality: v}))}
                    <div className="md:col-span-2">
                      <label className="text-[10px] font-mono uppercase tracking-wider text-zinc-700 dark:text-zinc-300 block mb-2">Address (Area and Street)</label>
                      <textarea 
                        value={addressForm.address}
                        onChange={(e) => setAddressForm({...addressForm, address: e.target.value})}
                        className="w-full border border-zinc-200 dark:border-zinc-800 focus:border-[#6F4E37] dark:focus:border-[#E6C280] px-4 py-3.5 rounded-xl text-sm outline-none transition-all duration-300 font-sans resize-none h-24 bg-transparent"
                      />
                    </div>
                    {renderInput("City/District/Town", addressForm.city, (v:any) => setAddressForm({...addressForm, city: v}))}
                    {renderInput("State", addressForm.state, (v:any) => setAddressForm({...addressForm, state: v}))}

                    <div className="md:col-span-2 pt-2">
                      <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-700 dark:text-zinc-300 block mb-2">Address Type</p>
                      <div className="flex gap-3 max-w-md">
                        <label className="flex-1 flex items-center justify-center gap-2 border border-stone-200 dark:border-zinc-800 rounded-xl py-3 cursor-pointer hover:border-[#6F4E37] dark:hover:border-[#E6C280] transition-colors has-[:checked]:border-[#6F4E37] has-[:checked]:bg-[#6F4E37]/5 dark:has-[:checked]:border-[#E6C280] dark:has-[:checked]:bg-[#E6C280]/10">
                          <input type="radio" name="addressType" value="HOME" checked={addressForm.type === "HOME"} onChange={(e) => setAddressForm({ ...addressForm, type: e.target.value as AddressType })} className="hidden" />
                          <span className="text-xs font-mono font-bold">HOME</span>
                        </label>
                        <label className="flex-1 flex items-center justify-center gap-2 border border-stone-200 dark:border-zinc-800 rounded-xl py-3 cursor-pointer hover:border-[#6F4E37] dark:hover:border-[#E6C280] transition-colors has-[:checked]:border-[#6F4E37] has-[:checked]:bg-[#6F4E37]/5 dark:has-[:checked]:border-[#E6C280] dark:has-[:checked]:bg-[#E6C280]/10">
                          <input type="radio" name="addressType" value="WORK" checked={addressForm.type === "WORK"} onChange={(e) => setAddressForm({ ...addressForm, type: e.target.value as AddressType })} className="hidden" />
                          <span className="text-xs font-mono font-bold">WORK</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex gap-4">
                    <button 
                      className="bg-zinc-950 dark:bg-[#E6C280] text-white dark:text-zinc-950 px-8 py-3.5 rounded-xl text-xs font-mono font-bold uppercase tracking-widest shadow-md hover:opacity-90 transition-all active:scale-95 border-none cursor-pointer"
                      onClick={() => {
                        if (editingAddressId) {
                          updateAddress(editingAddressId, addressForm);
                        } else {
                          addAddress(addressForm);
                        }
                        setIsAddingNewAddress(false);
                        setEditingAddressId(null);
                      }}
                    >
                      Save
                    </button>
                    <button 
                      className="text-zinc-800 dark:text-zinc-200 dark:text-zinc-400 text-xs font-mono font-bold uppercase tracking-widest hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors bg-transparent border-none px-4 cursor-pointer"
                      onClick={() => {
                        setIsAddingNewAddress(false);
                        setEditingAddressId(null);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div 
                  className="border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 flex items-center gap-3 text-[#6F4E37] dark:text-[#E6C280] cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors mb-6"
                  onClick={() => setIsAddingNewAddress(true)}
                >
                  <Plus className="w-5 h-5" />
                  <span className="text-sm font-semibold">ADD A NEW ADDRESS</span>
                </div>
              )}

              <div className="space-y-4">
                {addresses.map((addr) => (
                  <div key={addr.id} className="border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 relative group hover:shadow-sm transition-all bg-white dark:bg-zinc-900/40">
                    <div className="flex justify-between items-start mb-3">
                      <span className="bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-zinc-200 dark:border-zinc-700 shadow-sm">
                        {addr.type}
                      </span>
                      
                      <div className="relative dropdown-container">
                        <button 
                          className="text-zinc-800 dark:text-zinc-200 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors bg-transparent border-none cursor-pointer"
                          onClick={() => setActiveDropdownId(activeDropdownId === addr.id ? null : addr.id)}
                        >
                          <MoreVertical className="w-5 h-5" />
                        </button>
                        
                        {activeDropdownId === addr.id && (
                          <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xl z-20 py-2 overflow-hidden animate-fade-in">
                            <div 
                              className="px-4 py-2 text-sm text-zinc-800 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800 cursor-pointer transition-colors"
                              onClick={() => {
                                setEditingAddressId(addr.id);
                                setAddressForm({
                                  name: addr.name,
                                  phone: addr.phone,
                                  pincode: addr.pincode,
                                  locality: addr.locality,
                                  address: addr.address,
                                  city: addr.city,
                                  state: addr.state,
                                  type: addr.type,
                                });
                                setIsAddingNewAddress(true);
                                setActiveDropdownId(null);
                              }}
                            >
                              Edit
                            </div>
                            <div 
                              className="px-4 py-2 text-sm text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 cursor-pointer transition-colors"
                              onClick={() => {
                                deleteAddress(addr.id);
                                setActiveDropdownId(null);
                              }}
                            >
                              Delete
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mb-2">
                      <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 uppercase">{addr.name}</span>
                      <span className="text-sm text-zinc-900 dark:text-zinc-100 font-medium font-mono">{addr.phone}</span>
                    </div>
                    <p className="text-sm text-zinc-800 dark:text-zinc-200 dark:text-zinc-400 leading-relaxed pr-8">
                      {addr.address}, {addr.locality}, {addr.city}, {addr.state} - {addr.pincode}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'pan' && (
            <div className="relative z-10 flex-grow animate-fade-in">
              <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-mono font-bold tracking-[0.28em] text-[#6F4E37] dark:text-[#E6C280] uppercase mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Verification</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-light tracking-tight text-zinc-950 dark:text-zinc-50 font-playfair mb-8">
                PAN Card <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280]">Information</span>
              </h1>
              
              <div className="max-w-xl space-y-6">
                {renderInput("PAN Card Number", panNumber, setPanNumber)}
                {renderInput("Full Name (As on PAN Card)", panName, setPanName)}
                
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wider text-zinc-700 dark:text-zinc-300 block mb-2">Upload PAN Card (JPEG/PNG)</label>
                  <div className="border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                    <input 
                      type="file" 
                      accept="image/jpeg, image/png"
                      className="hidden"
                      id="pan-upload"
                      onChange={(e) => setPanFile(e.target.files?.[0] || null)}
                    />
                    <label htmlFor="pan-upload" className="cursor-pointer flex flex-col items-center gap-3">
                      <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center text-zinc-800 dark:text-zinc-200">
                        <Plus className="w-6 h-6" />
                      </div>
                      <span className="text-sm text-[#6F4E37] dark:text-[#E6C280] font-medium">Click to upload image</span>
                      <span className="text-xs text-zinc-700 dark:text-zinc-300">{panFile ? panFile.name : "Maximum file size 5MB"}</span>
                    </label>
                  </div>
                </div>

                <div className="flex items-start gap-3 mt-6">
                  <input 
                    type="checkbox" 
                    id="pan-declare" 
                    className="mt-1 accent-[#6F4E37] dark:accent-[#E6C280]"
                    checked={isPanDeclared}
                    onChange={(e) => setIsPanDeclared(e.target.checked)}
                  />
                  <label htmlFor="pan-declare" className="text-xs text-zinc-800 dark:text-zinc-200 dark:text-zinc-400 leading-relaxed cursor-pointer select-none">
                    I do hereby declare that PAN furnished/stated above is correct and belongs to me, registered as an account holder with Drip Hunter.
                  </label>
                </div>

                <button 
                  className="bg-zinc-950 dark:bg-[#E6C280] text-white dark:text-zinc-950 px-8 py-3.5 rounded-xl text-xs font-mono font-bold uppercase tracking-widest shadow-md hover:opacity-90 transition-all active:scale-95 w-full mt-6"
                  onClick={handlePanUpload}
                >
                  Upload & Verify
                </button>
              </div>
            </div>
          )}

          {activeTab === 'gift_cards' && (
            <div className="relative z-10 flex-grow animate-fade-in">
              <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-mono font-bold tracking-[0.28em] text-[#6F4E37] dark:text-[#E6C280] uppercase mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Store Credit</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-light tracking-tight text-zinc-950 dark:text-zinc-50 font-playfair mb-8">
                Gift <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280]">Cards</span>
              </h1>
              
              <div className="flex flex-col md:flex-row gap-6 mb-12">
                <div className="flex-1 bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl">
                  <div className="relative z-10">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-800 dark:text-zinc-200 mb-2 block">Drip Hunter Balance</span>
                    <div className="text-4xl font-playfair mb-6 tracking-tight">₹0</div>
                    <button 
                      className="bg-white text-zinc-950 text-xs font-mono font-bold uppercase tracking-widest px-6 py-3 rounded-xl hover:bg-zinc-100 transition-colors border-none cursor-pointer"
                      onClick={() => setActiveModal('add')}
                    >
                      Add Gift Card
                    </button>
                  </div>
                  <Sparkles className="absolute right-[-20px] bottom-[-20px] w-32 h-32 text-white/5 opacity-50" />
                </div>
                
                <div className="flex-1 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 flex flex-col justify-center items-start">
                  <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-2">Have a physical card?</h3>
                  <p className="text-sm text-zinc-700 dark:text-zinc-300 mb-6">Check your available balance and expiry details quickly.</p>
                  <button 
                    className="border border-zinc-200 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-100 text-xs font-mono font-bold uppercase tracking-widest px-6 py-3 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors cursor-pointer"
                    onClick={() => setActiveModal('check')}
                  >
                    Check Balance
                  </button>
                </div>
              </div>

              <h2 className="text-xl font-playfair text-zinc-900 dark:text-zinc-100 mb-6">Purchase Gift Cards</h2>
              <div className="border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8">
                <div className="flex gap-8 border-b border-zinc-200 dark:border-zinc-800 mb-8">
                  <span 
                    className={`pb-4 text-sm font-semibold cursor-pointer transition-colors relative ${giftCardTab === 'personal' ? 'text-[#6F4E37] dark:text-[#E6C280]' : 'text-zinc-700 dark:text-zinc-300 hover:text-zinc-800 dark:hover:text-zinc-200'}`}
                    onClick={() => setGiftCardTab('personal')}
                  >
                    For Personal
                    {giftCardTab === 'personal' && <div className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-[#6F4E37] dark:bg-[#E6C280] rounded-t-sm" />}
                  </span>
                  <span 
                    className={`pb-4 text-sm font-semibold cursor-pointer transition-colors relative ${giftCardTab === 'corporate' ? 'text-[#6F4E37] dark:text-[#E6C280]' : 'text-zinc-700 dark:text-zinc-300 hover:text-zinc-800 dark:hover:text-zinc-200'}`}
                    onClick={() => setGiftCardTab('corporate')}
                  >
                    For Corporate
                    {giftCardTab === 'corporate' && <div className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-[#6F4E37] dark:bg-[#E6C280] rounded-t-sm" />}
                  </span>
                </div>

                {giftCardTab === 'personal' ? (
                  <div className="space-y-6">
                    {giftCardForms.map((form, index) => (
                      <div key={form.id} className="relative bg-zinc-50 dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800">
                        {giftCardForms.length > 1 && (
                          <button 
                            className="absolute right-4 top-4 text-zinc-800 dark:text-zinc-200 hover:text-rose-500 transition-colors"
                            onClick={() => removeGiftCardForm(form.id)}
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                        <h4 className="text-xs font-mono font-bold tracking-widest text-zinc-700 dark:text-zinc-300 uppercase mb-4">Gift Card {index + 1}</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {renderInput("Receiver's Email", form.email, (v:any) => updateGiftCardForm(form.id, 'email', v), "email")}
                          {renderInput("Receiver's Name", form.name, (v:any) => updateGiftCardForm(form.id, 'name', v))}
                          {renderInput("Sender's Name", form.gifter, (v:any) => updateGiftCardForm(form.id, 'gifter', v))}
                          <div className="flex gap-4">
                            <div className="flex-1 relative">
                              <label className="text-[10px] font-mono uppercase tracking-wider text-zinc-700 dark:text-zinc-300 block mb-2">Card Value (₹)</label>
                              <select 
                                value={form.value}
                                onChange={(e) => updateGiftCardForm(form.id, 'value', e.target.value)}
                                className="w-full border border-zinc-200 dark:border-zinc-800 bg-transparent px-4 py-3.5 rounded-xl text-sm outline-none focus:border-[#6F4E37] dark:focus:border-[#E6C280] appearance-none cursor-pointer transition-colors duration-300 font-sans"
                              >
                                <option value="" className="bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300">Select Value</option>
                                {[100, 200, 300, 400, 500, 600, 700, 800, 900, 1000].map(val => (
                                  <option key={val} value={val} className="bg-white dark:bg-zinc-900">₹{val}</option>
                                ))}
                              </select>
                              <ChevronDown className="absolute right-4 top-[38px] w-4 h-4 text-zinc-800 dark:text-zinc-200 pointer-events-none" />
                            </div>
                            <div className="w-24">
                              <label className="text-[10px] font-mono uppercase tracking-wider text-zinc-700 dark:text-zinc-300 block mb-2">Qty</label>
                              <select 
                                value={form.count} 
                                onChange={(e) => updateGiftCardForm(form.id, 'count', parseInt(e.target.value))}
                                className="w-full border border-zinc-200 dark:border-zinc-800 bg-transparent px-4 py-3.5 rounded-xl text-sm outline-none focus:border-[#6F4E37] dark:focus:border-[#E6C280]"
                              >
                                {[1,2,3,4,5].map(n => <option key={n} value={n} className="bg-white dark:bg-zinc-900">{n}</option>)}
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    <button 
                      className="text-[#6F4E37] dark:text-[#E6C280] text-sm font-semibold flex items-center gap-2 hover:opacity-80 transition-opacity"
                      onClick={addGiftCardForm}
                    >
                      <Plus className="w-4 h-4" /> Add another Gift Card
                    </button>

                    <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800">
                      <button className="bg-zinc-950 dark:bg-[#E6C280] text-white dark:text-zinc-950 px-8 py-3.5 rounded-xl text-xs font-mono font-bold uppercase tracking-widest shadow-md hover:opacity-90 transition-all active:scale-95 w-full md:w-auto">
                        Proceed to Checkout
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="bg-zinc-50 dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800">
                      <h4 className="text-xs font-mono font-bold tracking-widest text-zinc-700 dark:text-zinc-300 uppercase mb-4">Corporate Requirement Details</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {renderInput("First Name", "", () => {})}
                        {renderInput("Last Name", "", () => {})}
                        {renderInput("Email ID", "", () => {}, "email")}
                        {renderInput("Mobile Number", "", () => {}, "tel")}
                        {renderInput("Company Name", "", () => {})}
                        <div className="relative w-full">
                          <label className="text-[10px] font-mono uppercase tracking-wider text-zinc-700 dark:text-zinc-300 block mb-2">Expected Order Value</label>
                          <select className="w-full border border-zinc-200 dark:border-zinc-800 bg-transparent px-4 py-3.5 rounded-xl text-sm outline-none focus:border-[#6F4E37] dark:focus:border-[#E6C280] appearance-none cursor-pointer transition-colors duration-300 font-sans">
                            <option value="" className="bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300">Select Value</option>
                            <option value="100-500" className="bg-white dark:bg-zinc-900">₹100 - ₹500</option>
                            <option value="500-1000" className="bg-white dark:bg-zinc-900">₹500 - ₹1000</option>
                            <option value="1000-5000" className="bg-white dark:bg-zinc-900">₹1000 - ₹5000</option>
                            <option value="5000+" className="bg-white dark:bg-zinc-900">₹5000+</option>
                          </select>
                          <ChevronDown className="absolute right-4 top-[38px] w-4 h-4 text-zinc-800 dark:text-zinc-200 pointer-events-none" />
                        </div>
                        <div className="relative w-full">
                          <label className="text-[10px] font-mono uppercase tracking-wider text-zinc-700 dark:text-zinc-300 block mb-2">Location</label>
                          <select className="w-full border border-zinc-200 dark:border-zinc-800 bg-transparent px-4 py-3.5 rounded-xl text-sm outline-none focus:border-[#6F4E37] dark:focus:border-[#E6C280] appearance-none cursor-pointer transition-colors duration-300 font-sans">
                            <option value="" className="bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300">Select Location</option>
                            <option value="mumbai" className="bg-white dark:bg-zinc-900">Mumbai</option>
                            <option value="delhi" className="bg-white dark:bg-zinc-900">Delhi</option>
                            <option value="bangalore" className="bg-white dark:bg-zinc-900">Bangalore</option>
                            <option value="hyderabad" className="bg-white dark:bg-zinc-900">Hyderabad</option>
                            <option value="chennai" className="bg-white dark:bg-zinc-900">Chennai</option>
                          </select>
                          <ChevronDown className="absolute right-4 top-[38px] w-4 h-4 text-zinc-800 dark:text-zinc-200 pointer-events-none" />
                        </div>
                      </div>
                    </div>
                    <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800">
                      <button className="bg-zinc-950 dark:bg-[#E6C280] text-white dark:text-zinc-950 px-8 py-3.5 rounded-xl text-xs font-mono font-bold uppercase tracking-widest shadow-md hover:opacity-90 transition-all active:scale-95 w-full md:w-auto">
                        Submit Requirement
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'saved_upi' && (
            <div className="relative z-10 flex-grow animate-fade-in">
              <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-mono font-bold tracking-[0.28em] text-[#6F4E37] dark:text-[#E6C280] uppercase mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Payments</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-light tracking-tight text-zinc-950 dark:text-zinc-50 font-playfair mb-8">
                Saved <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280]">UPI</span>
              </h1>


              <div className="mt-8 border-t border-zinc-200 dark:border-zinc-800 pt-8">
                <h3 className="text-lg font-playfair font-semibold text-zinc-900 dark:text-zinc-100 mb-6">FAQs</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2 text-sm">Why is my UPI being saved?</h4>
                    <p className="text-sm text-zinc-800 dark:text-zinc-200 dark:text-zinc-400 leading-relaxed">
                      It's quicker. You can save the hassle of typing in the complete UPI details every time you shop at Drip Hunter by saving your UPI details. You can make your payment by scheduling a mandate or just by entering your UPI PIN.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2 text-sm">Is it safe to save my UPI on Drip Hunter?</h4>
                    <p className="text-sm text-zinc-800 dark:text-zinc-200 dark:text-zinc-400 leading-relaxed">
                      Absolutely. Your UPI ID information is stored with our secure payment gateway securely.
                    </p>
                  </div>
                  {showAllUpiFaqs ? (
                    <div>
                      <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2 text-sm">What happens if my UPI ID expires?</h4>
                      <p className="text-sm text-zinc-800 dark:text-zinc-200 dark:text-zinc-400 leading-relaxed">
                        If your linked bank account is closed or UPI ID expires, transactions will fail. You can delete the old UPI ID and add a new one during your next checkout.
                      </p>
                    </div>
                  ) : (
                    <button 
                      className="text-xs font-mono font-bold tracking-widest uppercase text-[#6F4E37] dark:text-[#E6C280] hover:opacity-80 transition-opacity bg-transparent border-none cursor-pointer"
                      onClick={() => setShowAllUpiFaqs(true)}
                    >
                      Show More FAQs
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'saved_cards' && (
            <div className="relative z-10 flex-grow animate-fade-in">
              <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-mono font-bold tracking-[0.28em] text-[#6F4E37] dark:text-[#E6C280] uppercase mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Payments</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-light tracking-tight text-zinc-950 dark:text-zinc-50 font-playfair mb-8">
                Saved <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280]">Cards</span>
              </h1>


              <div className="mt-8 border-t border-zinc-200 dark:border-zinc-800 pt-8">
                <h3 className="text-lg font-playfair font-semibold text-zinc-900 dark:text-zinc-100 mb-6">FAQs</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2 text-sm">Is it safe to save my card on Drip Hunter?</h4>
                    <p className="text-sm text-zinc-800 dark:text-zinc-200 dark:text-zinc-400 leading-relaxed">
                      Absolutely. Your card information is stored with our secure, PCI-compliant payment gateway. We do not store your CVV number.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2 text-sm">Why is my card being saved?</h4>
                    <p className="text-sm text-zinc-800 dark:text-zinc-200 dark:text-zinc-400 leading-relaxed">
                      It's quicker. You can save the hassle of typing in the complete card details every time you shop at Drip Hunter by saving your card details.
                    </p>
                  </div>
                  {showAllCardsFaqs ? (
                    <div>
                      <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2 text-sm">What is a CVV number?</h4>
                      <p className="text-sm text-zinc-800 dark:text-zinc-200 dark:text-zinc-400 leading-relaxed">
                        The CVV number is a 3-digit security code printed on the back of your card. It helps verify that you are in physical possession of the card during checkout.
                      </p>
                    </div>
                  ) : (
                    <button 
                      className="text-xs font-mono font-bold tracking-widest uppercase text-[#6F4E37] dark:text-[#E6C280] hover:opacity-80 transition-opacity bg-transparent border-none cursor-pointer"
                      onClick={() => setShowAllCardsFaqs(true)}
                    >
                      Show More FAQs
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'coupons' && (
            <div className="relative z-10 flex-grow animate-fade-in">
              <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-mono font-bold tracking-[0.28em] text-[#6F4E37] dark:text-[#E6C280] uppercase mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Discounts</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-light tracking-tight text-zinc-950 dark:text-zinc-50 font-playfair mb-8">
                My <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280]">Coupons</span>
              </h1>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockCoupons.slice(0, visibleCoupons).map((coupon) => (
                  <div 
                    key={coupon.id} 
                    className="border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 relative bg-white dark:bg-zinc-900 hover:shadow-md transition-shadow group overflow-hidden cursor-pointer"
                    onClick={() => router.push(`/coupon-offers?code=${encodeURIComponent(coupon.code)}`)}
                  >
                    <div className="absolute top-0 right-0 w-16 h-16 bg-[#FCFAF7] dark:bg-zinc-800/50 rounded-bl-full -mr-4 -mt-4 border-l border-b border-zinc-200 dark:border-zinc-700"></div>
                    <div className="flex justify-between items-start mb-4 relative z-10">
                      <div>
                        <div className="text-lg font-playfair text-[#6F4E37] dark:text-[#E6C280] mb-1 transition-colors">
                          {coupon.code}
                        </div>
                        <p className="text-sm text-zinc-800 dark:text-zinc-200 dark:text-zinc-400">{coupon.desc}</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center pt-4 border-t border-zinc-100 dark:border-zinc-800 relative z-10">
                      <span className="text-xs text-zinc-700 dark:text-zinc-300">Valid till {coupon.validDate}</span>
                      <span 
                        className="text-[10px] font-mono font-bold tracking-widest text-[#6F4E37] dark:text-[#E6C280] uppercase hover:underline cursor-pointer"
                        onClick={() => setTcModalOpen(true)}
                      >
                        T&C Apply
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              {visibleCoupons < mockCoupons.length && (
                <div className="mt-8 flex justify-center">
                  <button 
                    className="border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 px-6 py-3 rounded-xl text-xs font-mono font-bold uppercase tracking-widest hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                    onClick={() => setVisibleCoupons(mockCoupons.length)}
                  >
                    View All Coupons
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="relative z-10 flex-grow animate-fade-in">
              <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-mono font-bold tracking-[0.28em] text-[#6F4E37] dark:text-[#E6C280] uppercase mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Contributions</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-light tracking-tight text-zinc-950 dark:text-zinc-50 font-playfair mb-8">
                Reviews & <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280]">Ratings</span>
              </h1>
              
              <div className="space-y-6">
                {reviews.length === 0 ? (
                  <div className="text-center py-16 bg-zinc-50 dark:bg-zinc-900/60 rounded-3xl border border-zinc-200 dark:border-zinc-800">
                    <Star className="w-12 h-12 text-zinc-300 dark:text-zinc-700 mx-auto mb-4" />
                    <p className="text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-2">You haven't rated anything yet</p>
                    <p className="text-sm text-zinc-700 dark:text-zinc-300 max-w-sm mx-auto">Go to your orders to review your recent purchases and help the community.</p>
                  </div>
                ) : (
                  reviews.map((review) => (
                    <div key={review.id} className="border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 flex flex-col md:flex-row gap-6 hover:shadow-sm transition-shadow bg-white dark:bg-zinc-900">
                      <div className="w-24 h-24 flex-shrink-0 bg-zinc-100 dark:bg-zinc-800 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-700">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={review.image} alt={review.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-base font-medium text-zinc-900 dark:text-zinc-100 hover:text-[#6F4E37] dark:hover:text-[#E6C280] cursor-pointer mb-2 transition-colors">{review.title}</h3>
                        <div className="flex items-center gap-3 mb-3">
                          <div className="bg-[#6F4E37] dark:bg-[#E6C280] text-white dark:text-zinc-950 text-xs font-mono font-bold px-2 py-1 rounded-lg flex items-center gap-1">
                            {review.rating} <Star className="w-3 h-3 fill-current" />
                          </div>
                          <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{review.headline}</span>
                        </div>
                        <p className="text-sm text-zinc-800 dark:text-zinc-200 dark:text-zinc-400 leading-relaxed mb-4">
                          {review.text}
                        </p>
                        <div className="flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800 pt-4">
                          <span className="text-xs text-zinc-700 dark:text-zinc-300 font-mono tracking-wider uppercase">Reviewed {review.date}</span>
                          <div className="flex gap-4">
                            <span 
                              className="text-[11px] font-mono font-bold tracking-widest uppercase text-[#6F4E37] dark:text-[#E6C280] cursor-pointer hover:opacity-80 transition-opacity"
                              onClick={() => setEditReviewModal(review)}
                            >
                              Edit
                            </span>
                            <span 
                              className="text-[11px] font-mono font-bold tracking-widest uppercase text-rose-500 cursor-pointer hover:opacity-80 transition-opacity"
                              onClick={() => setReviews(reviews.filter(r => r.id !== review.id))}
                            >
                              Delete
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="relative z-10 flex-grow animate-fade-in">
              <div className="flex items-end justify-between mb-8">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-mono font-bold tracking-[0.28em] text-[#6F4E37] dark:text-[#E6C280] uppercase mb-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Updates</span>
                  </div>
                  <h1 className="text-3xl md:text-4xl font-light tracking-tight text-zinc-950 dark:text-zinc-50 font-playfair">
                    All <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280]">Notifications</span>
                  </h1>
                </div>
                {notifications.some(n => !n.read) && (
                  <button 
                    className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#6F4E37] dark:text-[#E6C280] bg-transparent border border-[#6F4E37]/20 dark:border-[#E6C280]/20 px-4 py-2 rounded-lg hover:bg-[#FCFAF7] dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                    onClick={markAllAsRead}
                  >
                    Mark read
                  </button>
                )}
              </div>
              
              <div className="space-y-4">
                {notifications.length === 0 ? (
                  <div className="text-center py-16 bg-zinc-50 dark:bg-zinc-900/60 rounded-3xl border border-zinc-200 dark:border-zinc-800">
                    <Bell className="w-12 h-12 text-zinc-300 dark:text-zinc-700 mx-auto mb-4" />
                    <p className="text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-2">No new notifications</p>
                    <p className="text-sm text-zinc-700 dark:text-zinc-300">You're completely caught up.</p>
                  </div>
                ) : (
                  notifications.map((notif) => (
                    <div 
                      key={notif.id} 
                      className={`p-6 border border-zinc-200 dark:border-zinc-800 rounded-3xl flex flex-col relative group transition-colors ${!notif.read ? 'bg-[#FCFAF7] dark:bg-zinc-800/40 shadow-sm' : 'bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800/20'}`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${!notif.read ? 'bg-[#6F4E37] dark:bg-[#E6C280]' : 'bg-transparent'}`}></div>
                          <h3 className={`text-base ${!notif.read ? 'font-semibold text-zinc-900 dark:text-zinc-100' : 'font-medium text-zinc-700 dark:text-zinc-300'}`}>{notif.title}</h3>
                        </div>
                        <span className="text-xs text-zinc-700 dark:text-zinc-300 font-mono">{notif.time}</span>
                      </div>
                      <p className={`text-sm ${!notif.read ? 'text-zinc-800 dark:text-zinc-200' : 'text-zinc-700 dark:text-zinc-300'} leading-relaxed pl-5`}>
                        {notif.message}
                      </p>
                      
                      <button 
                        className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 p-2 rounded-full cursor-pointer text-zinc-800 dark:text-zinc-200 hover:text-rose-500 shadow-sm"
                        onClick={() => deleteNotification(notif.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Modals Overlay */}
          {(activeModal || tcModalOpen || editReviewModal) && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Soft blurred backdrop */}
              <div 
                className="absolute inset-0 bg-zinc-950/40 dark:bg-zinc-950/60 backdrop-blur-sm transition-opacity" 
                onClick={() => {
                  setActiveModal(null);
                  setTcModalOpen(false);
                  setEditReviewModal(null);
                }} 
              />
              
              {activeModal && (
                <div className="bg-white dark:bg-zinc-900 rounded-[32px] w-full max-w-[500px] relative z-10 shadow-2xl border border-zinc-200/50 dark:border-zinc-700/50 animate-slide-up overflow-hidden">
                  <div className="p-8 sm:p-10">
                    <button 
                      className="absolute top-6 right-6 text-zinc-800 dark:text-zinc-200 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors bg-zinc-100 dark:bg-zinc-800 p-2 rounded-full cursor-pointer border-none"
                      onClick={() => setActiveModal(null)}
                    >
                      <X className="w-4 h-4" />
                    </button>

                    <h2 className="text-2xl font-playfair text-zinc-900 dark:text-zinc-100 mb-2">
                      {activeModal === 'add' ? 'Add Gift Card' : 
                       activeModal === 'check' ? 'Check Balance' : 
                       activeModal === 'deactivate' ? 'Deactivate Account' : 'Delete Account'}
                    </h2>
                    
                    {activeModal === 'add' && (
                      <p className="text-sm text-zinc-700 dark:text-zinc-300 mb-8">
                        Gift Card number & PIN will be verified instantly.
                      </p>
                    )}
                    {activeModal === 'check' && (
                      <p className="text-sm text-zinc-700 dark:text-zinc-300 mb-8">
                        Enter details to view remaining balance.
                      </p>
                    )}

                    {(activeModal === 'add' || activeModal === 'check') && (
                      <div className="space-y-5">
                        <input 
                          type="text" 
                          placeholder="Gift Card Number" 
                          className="w-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 text-zinc-900 dark:text-zinc-100 text-sm px-4 py-3.5 rounded-xl outline-none focus:border-[#6F4E37] dark:focus:border-[#E6C280] transition-colors font-mono"
                        />
                        <input 
                          type="password" 
                          placeholder="PIN" 
                          className="w-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 text-zinc-900 dark:text-zinc-100 text-sm px-4 py-3.5 rounded-xl outline-none focus:border-[#6F4E37] dark:focus:border-[#E6C280] transition-colors font-mono"
                        />
                        
                        <button 
                          className="w-full bg-zinc-950 dark:bg-[#E6C280] text-white dark:text-zinc-950 text-xs font-mono font-bold py-4 rounded-xl shadow-md hover:opacity-90 transition-all border-none cursor-pointer uppercase tracking-widest mt-4"
                          onClick={() => {
                            alert(activeModal === 'add' ? "Gift Card Added!" : "Invalid Gift Card Number or PIN");
                            setActiveModal(null);
                          }}
                        >
                          {activeModal === 'add' ? 'Add To Account' : 'Check Balance'}
                        </button>
                      </div>
                    )}

                    {activeModal === 'deactivate' && (
                      <div className="mt-6">
                        <div className="bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-400 p-4 rounded-xl text-sm flex items-start gap-3 mb-8">
                           <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                           <p>Your account will be temporarily disabled. You can reactivate it anytime by logging back in.</p>
                        </div>
                        <div className="flex gap-4">
                          <button 
                            className="flex-1 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 py-3.5 rounded-xl font-mono font-bold uppercase text-xs tracking-widest hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                            onClick={() => setActiveModal(null)}
                          >
                            Cancel
                          </button>
                          <button 
                            className="flex-1 bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-950 py-3.5 rounded-xl font-mono font-bold uppercase text-xs tracking-widest hover:opacity-90 transition-all"
                            onClick={handleLogout}
                          >
                            Deactivate
                          </button>
                        </div>
                      </div>
                    )}

                    {activeModal === 'delete' && (
                      <div className="mt-6">
                        <div className="bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 p-4 rounded-xl text-sm flex items-start gap-3 mb-8">
                           <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                           <p>This action cannot be undone. All your order history, reviews, and saved addresses will be lost permanently.</p>
                        </div>
                        <div className="flex gap-4">
                          <button 
                            className="flex-1 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 py-3.5 rounded-xl font-mono font-bold uppercase text-xs tracking-widest hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                            onClick={() => setActiveModal(null)}
                          >
                            Cancel
                          </button>
                          <button 
                            className="flex-1 bg-rose-500 text-white py-3.5 rounded-xl font-mono font-bold uppercase text-xs tracking-widest hover:bg-rose-600 transition-colors shadow-md shadow-rose-500/20"
                            onClick={handleLogout}
                          >
                            Delete Forever
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {tcModalOpen && (
                <div className="bg-white dark:bg-zinc-900 rounded-[32px] w-full max-w-[500px] relative z-10 shadow-2xl border border-zinc-200/50 dark:border-zinc-700/50 animate-slide-up overflow-hidden">
                  <div className="px-8 py-6 border-b border-zinc-100 dark:border-zinc-800 flex justify-between items-center bg-[#FCFAF7] dark:bg-zinc-900">
                    <h3 className="text-lg font-playfair font-semibold text-zinc-900 dark:text-zinc-100">Terms & Conditions</h3>
                    <button onClick={() => setTcModalOpen(false)} className="bg-zinc-200 dark:bg-zinc-800 p-1.5 rounded-full text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors border-none cursor-pointer">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="p-8 max-h-[60vh] overflow-y-auto space-y-4 text-sm text-zinc-800 dark:text-zinc-200 dark:text-zinc-400">
                    <p>1. The coupon is valid for single use per customer.</p>
                    <p>2. Applicable only on select merchandise.</p>
                    <p>3. Cannot be combined with other ongoing offers.</p>
                    <p>4. Drip Hunter reserves the right to cancel or modify the offer at any time.</p>
                    <p>5. In case of returns, the refund will be proportional to the discounted price.</p>
                  </div>
                </div>
              )}

              {editReviewModal && (
                <div className="bg-white dark:bg-zinc-900 rounded-[32px] w-full max-w-[500px] relative z-10 shadow-2xl border border-zinc-200/50 dark:border-zinc-700/50 animate-slide-up overflow-hidden">
                  <div className="px-8 py-6 border-b border-zinc-100 dark:border-zinc-800 flex justify-between items-center bg-[#FCFAF7] dark:bg-zinc-900">
                    <h3 className="text-lg font-playfair font-semibold text-zinc-900 dark:text-zinc-100">Edit Review</h3>
                    <button onClick={() => setEditReviewModal(null)} className="bg-zinc-200 dark:bg-zinc-800 p-1.5 rounded-full text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors border-none cursor-pointer">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="p-8 space-y-6">
                    <div>
                      <label className="text-[10px] font-mono uppercase tracking-wider text-zinc-700 dark:text-zinc-300 block mb-3">Rating</label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map(star => (
                          <div 
                            key={star}
                            onClick={() => setEditReviewModal({...editReviewModal, rating: star})}
                            className={`w-12 h-12 flex items-center justify-center rounded-xl cursor-pointer transition-all ${editReviewModal.rating >= star ? 'bg-[#6F4E37] dark:bg-[#E6C280] text-white dark:text-zinc-950 shadow-md' : 'bg-zinc-50 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-700'}`}
                          >
                            <Star className={`w-5 h-5 ${editReviewModal.rating >= star ? 'fill-current' : ''}`} />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] font-mono uppercase tracking-wider text-zinc-700 dark:text-zinc-300 block mb-2">Headline</label>
                      <input 
                        type="text" 
                        value={editReviewModal.headline}
                        onChange={(e) => setEditReviewModal({...editReviewModal, headline: e.target.value})}
                        className="w-full border border-zinc-200 dark:border-zinc-800 bg-transparent px-4 py-3.5 rounded-xl text-sm outline-none focus:border-[#6F4E37] dark:focus:border-[#E6C280] transition-colors" 
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono uppercase tracking-wider text-zinc-700 dark:text-zinc-300 block mb-2">Review Description</label>
                      <textarea 
                        value={editReviewModal.text}
                        onChange={(e) => setEditReviewModal({...editReviewModal, text: e.target.value})}
                        className="w-full border border-zinc-200 dark:border-zinc-800 bg-transparent px-4 py-3.5 rounded-xl text-sm outline-none focus:border-[#6F4E37] dark:focus:border-[#E6C280] transition-colors h-28 resize-none" 
                      />
                    </div>
                    <button 
                      className="w-full bg-zinc-950 dark:bg-[#E6C280] text-white dark:text-zinc-950 text-xs font-mono font-bold uppercase tracking-widest px-6 py-4 rounded-xl shadow-md hover:opacity-90 transition-all active:scale-95 border-none cursor-pointer mt-4"
                      onClick={() => {
                        setReviews(reviews.map(r => r.id === editReviewModal.id ? editReviewModal : r));
                        setEditReviewModal(null);
                      }}
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
