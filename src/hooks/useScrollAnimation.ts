"use client";
import { useEffect, useRef, useState } from "react";

/**
 * Custom hook for scroll-triggered animations using IntersectionObserver.
 * Returns a ref to attach to the element and a boolean indicating visibility.
 */
export function useScrollAnimation(
  options: {
    threshold?: number;
    rootMargin?: string;
    triggerOnce?: boolean;
  } = {}
) {
  const { threshold = 0.15, rootMargin = "0px 0px -60px 0px", triggerOnce = true } = options;
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isVisible };
}
