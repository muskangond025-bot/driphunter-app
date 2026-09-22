"use client";

import React from "react";
import AppHeader from "@/components/app-shell/AppHeader";
import AppPageLayout from "@/components/app-shell/AppPageLayout";
import { CreditCard } from "lucide-react";

export default function MobileUpiPage() {
  return (
    <AppPageLayout hasBottomNav={false} className="bg-zinc-50 dark:bg-zinc-950">
      <AppHeader showActions={true}
        variant="contextual"
        title="Saved UPI"
        fallbackUrl="/mobile/account"
      />
      <div className="flex flex-col items-center justify-center p-8 mt-12 text-center">
        <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-900 rounded-full flex items-center justify-center mb-4">
          <CreditCard className="w-8 h-8 text-zinc-400" />
        </div>
        <h2 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">No Saved UPI IDs</h2>
        <p className="text-sm text-zinc-500 mb-6">You haven't saved any UPI IDs yet. Add one during checkout for faster payments.</p>
      </div>
    </AppPageLayout>
  );
}
