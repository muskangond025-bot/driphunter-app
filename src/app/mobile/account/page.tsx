"use client";

import React from "react";
import AppHeader from "@/components/app-shell/AppHeader";
import AppPageLayout from "@/components/app-shell/AppPageLayout";

export default function MobileAccount() {
  return (
    <>
      <AppHeader variant="main" title="Account" />
      <AppPageLayout hasBottomNav className="p-4 space-y-4">
        <h2 className="text-2xl font-bold">Guest Account (Level 1)</h2>
        <p className="text-muted-foreground">Placeholder for guest account screen. Login can be handled later.</p>
      </AppPageLayout>
    </>
  );
}
