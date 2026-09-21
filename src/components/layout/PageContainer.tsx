import React from "react";
import { cn } from "@/lib/utils";

export interface PageContainerProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  variant?: "default" | "reading" | "dashboard";
  as?: React.ElementType;
}

export default function PageContainer({
  children,
  variant = "default",
  as: Component = "main",
  className,
  ...props
}: PageContainerProps) {
  return (
    <Component
      className={cn(
        "w-full mx-auto px-6 sm:px-12 md:px-16 lg:px-20",
        {
          "max-w-[1600px]": variant === "default",
          "max-w-4xl": variant === "reading",
          "max-w-7xl": variant === "dashboard",
        },
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
