// src/hooks/useIntersectionObserver.ts

import { useState, useEffect, useRef } from 'react';

export function useIntersectionObserver(threshold = 0.1) {
  const [isIntersecting, setIsIntersecting] = useState(true);
  const targetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const currentTarget = targetRef.current;
    if (!currentTarget) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsIntersecting(entry.isIntersecting),
      { threshold },
    );

    observer.observe(currentTarget);

    return () => {
      observer.unobserve(currentTarget);
    };
  }, [threshold]);

  return { targetRef, isIntersecting };
}
