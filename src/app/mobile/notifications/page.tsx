"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Bell, Package, Tag, Info, Trash2, Check, CheckCircle2 } from "lucide-react";
import AppPageLayout from "@/components/app-shell/AppPageLayout";
import AppHeader from "@/components/app-shell/AppHeader";

const DEFAULT_NOTIFICATIONS = [
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
];

export default function MobileNotificationsPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [notifications, setNotifications] = useState(DEFAULT_NOTIFICATIONS);

  useEffect(() => {
    const saved = localStorage.getItem("drip_notifications_data");
    if (saved) {
      try {
        setNotifications(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse notifications", e);
      }
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("drip_notifications_data", JSON.stringify(notifications));
    }
  }, [notifications, mounted]);

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const getIcon = (type: string) => {
    switch (type) {
      case 'order': return <Package className="w-5 h-5 text-emerald-500" />;
      case 'offer': return <Tag className="w-5 h-5 text-amber-500" />;
      case 'system': return <Info className="w-5 h-5 text-blue-500" />;
      default: return <Bell className="w-5 h-5 text-zinc-500" />;
    }
  };

  return (
    <AppPageLayout hasBottomNav={false} className="bg-zinc-50 dark:bg-zinc-950">
      <AppHeader showActions={true}
        variant="contextual"
        title="Alerts"
        fallbackUrl="/mobile/account"
        rightAction={
          unreadCount > 0 ? (
            <button onClick={markAllAsRead} aria-label="Mark all as read" className="p-2 -mr-2 text-zinc-950 dark:text-zinc-50">
              <Check className="w-5 h-5" />
            </button>
          ) : undefined
        }
      />

      <div className="flex-1 overflow-y-auto pb-24 pt-4">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center px-4">
            <div className="w-16 h-16 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center mb-6">
              <Bell className="w-6 h-6 text-zinc-400" />
            </div>
            <h3 className="text-xl font-light text-zinc-900 dark:text-zinc-100 font-playfair tracking-tight mb-3">
              No new alerts
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 font-sans">
              You're all caught up! We'll notify you when something important happens.
            </p>
          </div>
        ) : (
          <div className="flex flex-col">
            {notifications.map((notif) => (
              <div 
                key={notif.id} 
                onClick={() => { if (!notif.read) markAsRead(notif.id); }}
                className={`p-5 border-b border-zinc-200 dark:border-zinc-800 flex gap-4 transition-colors ${!notif.read ? 'cursor-pointer active:bg-black/5 dark:active:bg-white/5' : ''} ${notif.read ? 'bg-white dark:bg-zinc-950' : 'bg-[#FCFAF7] dark:bg-[#E6C280]/5'}`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${notif.read ? 'bg-zinc-100 dark:bg-zinc-900' : 'bg-white dark:bg-zinc-800 shadow-sm'}`}>
                  {getIcon(notif.type)}
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className={`text-sm ${notif.read ? 'font-medium text-zinc-700 dark:text-zinc-300' : 'font-bold text-zinc-900 dark:text-zinc-100'}`}>
                      {notif.title}
                    </h4>
                    <span className="text-[10px] font-mono text-zinc-400 whitespace-nowrap ml-2">
                      {notif.time}
                    </span>
                  </div>
                  <p className={`text-xs leading-relaxed ${notif.read ? 'text-zinc-500' : 'text-zinc-700 dark:text-zinc-300'}`}>
                    {notif.message}
                  </p>
                  
                  <div className="mt-3 flex justify-end gap-3 items-center">
                    {notif.read ? (
                      <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-500 flex items-center gap-1 p-1">
                        <CheckCircle2 className="w-3 h-3" /> Read
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 flex items-center gap-1 p-1">
                        <CheckCircle2 className="w-3 h-3" /> Unread
                      </span>
                    )}
                    <button 
                      onClick={(e) => { e.stopPropagation(); deleteNotification(notif.id); }}
                      className="text-[10px] font-mono uppercase tracking-wider text-rose-500 flex items-center gap-1 opacity-70 hover:opacity-100 p-1"
                    >
                      <Trash2 className="w-3 h-3" /> Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppPageLayout>
  );
}
