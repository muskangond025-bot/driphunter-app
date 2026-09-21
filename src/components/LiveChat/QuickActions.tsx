"use client";

import React from "react";
import { QuickActionType } from "@/services/chatService";
import { useLiveChat } from "@/context/LiveChatContext";
import { Package, HelpCircle, Truck, RefreshCw, CreditCard, User, LifeBuoy } from "lucide-react";

interface ActionConfig {
  type: QuickActionType;
  label: string;
  icon: React.ReactNode;
}

const ACTIONS: ActionConfig[] = [
  { type: "TRACK_ORDER", label: "Track My Order", icon: <Package className="w-3.5 h-3.5" /> },
  { type: "PRODUCT_HELP", label: "Product Help", icon: <HelpCircle className="w-3.5 h-3.5" /> },
  { type: "DELIVERY", label: "Delivery", icon: <Truck className="w-3.5 h-3.5" /> },
  { type: "RETURNS", label: "Returns & Refunds", icon: <RefreshCw className="w-3.5 h-3.5" /> },
  { type: "PAYMENT", label: "Payment Issue", icon: <CreditCard className="w-3.5 h-3.5" /> },
  { type: "ACCOUNT", label: "Account Help", icon: <User className="w-3.5 h-3.5" /> },
  { type: "SUPPORT_TICKET", label: "Create Support Ticket", icon: <LifeBuoy className="w-3.5 h-3.5" /> },
];

export default function QuickActions() {
  const { triggerQuickAction, isTyping } = useLiveChat();

  return (
    <div className="flex flex-wrap gap-2 mt-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
      {ACTIONS.map((action) => (
        <button
          key={action.type}
          onClick={() => triggerQuickAction(action.type, action.label)}
          disabled={isTyping}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white"
        >
          {action.icon}
          {action.label}
        </button>
      ))}
    </div>
  );
}
