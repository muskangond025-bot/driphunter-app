import React from "react";
import { cn } from "@/lib/utils";

interface AppPageLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hasBottomNav?: boolean;
}

export default function AppPageLayout({ 
  children, 
  hasBottomNav = false,
  className,
  ...props
}: AppPageLayoutProps) {
  return (
    <div 
      className={cn(
        "flex flex-col flex-1 w-full",
        // The AppHeader is sticky and has its own height.
        // We only need to pad the bottom if the BottomNav is present.
        // BottomNav is h-16 (4rem) + safe area.
        hasBottomNav ? "pb-[calc(4rem+env(safe-area-inset-bottom))]" : "pb-[env(safe-area-inset-bottom)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
