import React from "react";
import MobileAppShell from "@/components/app-shell/MobileAppShell";
import { Metadata } from "next";
import OfflineWrapper from "@/components/mobile/OfflineWrapper";

export const metadata: Metadata = {
  title: "DripHunter Mobile",
  description: "DripHunter App Experience",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function MobileLayout({ children }: { children: React.ReactNode }) {
  return (
    <OfflineWrapper>
      <MobileAppShell>{children}</MobileAppShell>
    </OfflineWrapper>
  );
}
