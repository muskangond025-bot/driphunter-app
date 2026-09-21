import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const inputVariants = cva(
  "w-full min-w-0 transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
  {
    variants: {
      variant: {
        default:
          "h-8 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:bg-input/50 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80",
        drip:
          "bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:border-[#6F4E37] dark:focus:border-[#E6C280] focus-visible:border-[#6F4E37] dark:focus-visible:border-[#E6C280] rounded-xl px-4 py-3 text-sm focus:ring-0 focus-visible:ring-0",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Input({
  className,
  type,
  variant,
  ...props
}: React.ComponentProps<"input"> & VariantProps<typeof inputVariants>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(inputVariants({ variant, className }))}
      {...props}
    />
  )
}

export { Input, inputVariants }
