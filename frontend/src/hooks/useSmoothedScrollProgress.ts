import { useEffect, useRef, useState } from 'react';

import { useScrollProgress } from './useScrollProgress';

export function useSmoothedScrollProgress(smoothing = 0.05) {
  const target = useScrollProgress();
  const [smoothProgress, setSmoothProgress] = useState(target);
  const animationFrame = useRef<number | undefined>(undefined);

  useEffect(() => {
    const animate = () => {
      setSmoothProgress((prev) => {
        const diff = target - prev;
        if (Math.abs(diff) < 0.001) return target; // stop condition
        return prev + diff * smoothing;
      });
      animationFrame.current = requestAnimationFrame(animate);
    };

    animationFrame.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrame.current !== undefined) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [target, smoothing]);

  return smoothProgress;
}
