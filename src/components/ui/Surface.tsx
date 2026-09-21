import * as React from "react"
import { cn } from "@/lib/utils"

export interface SurfaceProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "subtle"
}

export const Surface = React.forwardRef<HTMLDivElement, SurfaceProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "border rounded-[32px] shadow-sm", // Baseline defaults
          variant === "default" && "bg-white dark:bg-zinc-900 border-stone-200/90 dark:border-zinc-800",
          variant === "subtle" && "bg-zinc-50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800",
          className
        )}
        {...props}
      />
    )
  }
)
Surface.displayName = "Surface"
