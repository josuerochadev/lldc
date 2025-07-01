import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

export function useSmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1,
      easing: (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2),
      wheelMultiplier: 1.15,
      touchMultiplier: 1.2,
      smoothWheel: true,
      gestureOrientation: 'vertical',
      infinite: false,
    });

    let animationFrame = requestAnimationFrame(function raf(time) {
      lenis.raf(time);
      animationFrame = requestAnimationFrame(raf);
    });

    return () => {
      cancelAnimationFrame(animationFrame);
      lenis.destroy();
    };
  }, []);
}
