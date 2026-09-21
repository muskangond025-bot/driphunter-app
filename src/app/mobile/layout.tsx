import React from "react";
import MobileAppShell from "@/components/app-shell/MobileAppShell";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "DripHunter Mobile",
  description: "DripHunter App Experience",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0, viewport-fit=cover",
};

export default function MobileLayout({ children }: { children: React.ReactNode }) {
  return <MobileAppShell>{children}</MobileAppShell>;
}
