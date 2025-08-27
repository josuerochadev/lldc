import { useState, useEffect } from 'react';

/**
 * Hook pour détecter la section actuellement visible dans le viewport.
 * Utilise l'Intersection Observer API pour surveiller les sections de la page.
 * 
 * @param sectionIds - Array des IDs des sections à surveiller
 * @param options - Options pour l'Intersection Observer (optionnel)
 * @returns L'ID de la section actuellement active
 */
export function useActiveSection(
  sectionIds: string[],
  options: IntersectionObserverInit = {}
): string | null {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    if (!sectionIds.length) return;

    const defaultOptions: IntersectionObserverInit = {
      rootMargin: '-20% 0px -70% 0px', // Section considérée active quand elle est dans le tiers supérieur
      threshold: 0,
      ...options,
    };

    const observer = new IntersectionObserver((entries) => {
      // Trouve la section la plus visible (plus grande intersection)
      const visibleSections = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

      if (visibleSections.length > 0) {
        const mostVisible = visibleSections[0];
        setActiveSection(mostVisible.target.id);
      }
    }, defaultOptions);

    // Observe toutes les sections
    sectionIds.forEach(id => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sectionIds, options]);

  return activeSection;
}