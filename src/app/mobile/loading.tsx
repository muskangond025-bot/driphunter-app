import React from "react";
import AppPageLayout from "@/components/app-shell/AppPageLayout";

export default function MobileLoading() {
  return (
    <AppPageLayout hasBottomNav={false}>
      <div className="flex flex-col items-center justify-center min-h-[100dvh] bg-zinc-50 dark:bg-zinc-950 px-6 text-center">
        <div className="w-10 h-10 rounded-full border-[3px] border-zinc-200 dark:border-zinc-800 border-t-[#6F4E37] dark:border-t-[#E6C280] animate-spin" />
      </div>
    </AppPageLayout>
  );
}
