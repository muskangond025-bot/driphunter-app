"use client";

import React from "react";
import AppHeader from "@/components/app-shell/AppHeader";
import AppPageLayout from "@/components/app-shell/AppPageLayout";
import { IdCard } from "lucide-react";

export default function MobilePanPage() {
  return (
    <AppPageLayout hasBottomNav={false} className="bg-zinc-50 dark:bg-zinc-950">
      <AppHeader showActions={true}
        variant="contextual"
        title="PAN Card Information"
        fallbackUrl="/mobile/account"
      />
      <div className="flex flex-col items-center justify-center p-8 mt-12 text-center">
        <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-900 rounded-full flex items-center justify-center mb-4">
          <IdCard className="w-8 h-8 text-zinc-400" />
        </div>
        <h2 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">No PAN Added</h2>
        <p className="text-sm text-zinc-500 mb-6">Add your PAN details to unlock higher wallet limits and seamless refunds.</p>
        <button className="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-6 py-3 rounded-xl text-sm font-bold active:scale-95 transition-transform">
          Add PAN Card
        </button>
      </div>
    </AppPageLayout>
  );
}
