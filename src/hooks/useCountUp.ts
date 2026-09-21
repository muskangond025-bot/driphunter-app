"use client";
import { useEffect, useState, useRef } from "react";

/**
 * Animated counter that counts up from 0 to the target value
 * when the element becomes visible in the viewport.
 */
export function useCountUp(
  target: number,
  options: {
    duration?: number;
    decimals?: number;
  } = {}
) {
  const { duration = 2000, decimals = 0 } = options;
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          observer.unobserve(element);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    const startTime = performance.now();
    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * target;

      setCount(Number(current.toFixed(decimals)));

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [hasStarted, target, duration, decimals]);

  return { count, ref };
}
