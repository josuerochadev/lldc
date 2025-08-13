// src/components/routing/ScrollToTop.tsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    // Si navigation vers une ancre (#...), ne pas forcer le scroll top
    if (hash) return;

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });

    const main = document.querySelector('main') as HTMLElement | null;
    main?.focus?.();
  }, [hash, pathname]);

  return null;
}