"use client";

import React from "react";
import AppHeader from "@/components/app-shell/AppHeader";
import AppPageLayout from "@/components/app-shell/AppPageLayout";
import { Star } from "lucide-react";

export default function MobileReviewsPage() {
  return (
    <AppPageLayout hasBottomNav={false} className="bg-zinc-50 dark:bg-zinc-950">
      <AppHeader showActions={true}
        variant="contextual"
        title="My Reviews"
        fallbackUrl="/mobile/account"
      />
      <div className="flex flex-col items-center justify-center p-8 mt-12 text-center">
        <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-900 rounded-full flex items-center justify-center mb-4">
          <Star className="w-8 h-8 text-zinc-400" />
        </div>
        <h2 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">No Reviews Yet</h2>
        <p className="text-sm text-zinc-500 mb-6">You haven't reviewed any products yet. Share your experience with others!</p>
      </div>
    </AppPageLayout>
  );
}
