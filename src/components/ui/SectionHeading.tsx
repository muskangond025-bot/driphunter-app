"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export interface SectionHeadingProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  eyebrow?: React.ReactNode;
  action?: React.ReactNode;
  variant?: "chaney" | "playfair" | "playfair-sm" | "sans";
  align?: "left" | "center" | "right";
  as?: React.ElementType;
}

export function SectionHeading({
  title,
  subtitle,
  eyebrow,
  action,
  variant = "chaney",
  align = "left",
  as: Component = "h2",
  className,
  ...props
}: SectionHeadingProps) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col",
        {
          "items-start text-left": align === "left",
          "items-center text-center": align === "center",
          "items-end text-right": align === "right",
        },
        className
      )}
      {...props}
    >
      {eyebrow && (
        <div className="overflow-hidden pb-1">
          <div className={`transition-transform duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}>
            {eyebrow}
          </div>
        </div>
      )}
      
      <div className={cn(
        "flex flex-col sm:flex-row justify-between w-full",
        {
          "gap-4": true,
          "sm:items-end": align === "left",
          "items-center text-center": align === "center",
          "sm:flex-row-reverse sm:items-end": align === "right",
        }
      )}>
        <div className={cn("flex flex-col w-full", {
          "items-start text-left": align === "left",
          "items-center text-center": align === "center",
          "items-end text-right": align === "right",
        })}>
          <div className="overflow-hidden pb-2 -mb-2">
            <Component
              className={cn(
                `transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] delay-75 inline-block origin-bottom-left ${isVisible ? "translate-y-0 opacity-100 rotate-0" : "translate-y-[110%] opacity-0 rotate-1"}`,
                {
                  // Variant: chaney
                  "text-3xl sm:text-5xl font-chaney-title uppercase tracking-tight":
                    variant === "chaney",
                  
                  // Variant: playfair
                  "text-4xl md:text-5xl lg:text-6xl font-light tracking-tight font-playfair leading-[1.05]":
                    variant === "playfair",
                  
                  // Variant: playfair-sm
                  "text-3xl md:text-4xl lg:text-5xl font-light tracking-tight font-playfair leading-none":
                    variant === "playfair-sm",
                  
                  // Variant: sans
                  "text-3xl sm:text-4xl font-extrabold tracking-tight":
                    variant === "sans",
                }
              )}
            >
              {title}
            </Component>
          </div>
          
          {subtitle && (
            <div className="w-full overflow-hidden pt-2 mt-2">
               <div className={`transition-transform duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] delay-200 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}>
                 {subtitle}
               </div>
            </div>
          )}
        </div>
        
        {action && (
          <div className={cn("shrink-0 transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] delay-300", 
            { "mt-4 sm:mt-0": align === "left" || align === "right" },
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          )}>
            {action}
          </div>
        )}
      </div>
    </div>
  );
}
