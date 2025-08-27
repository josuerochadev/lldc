import { useState, useEffect } from 'react';

/**
 * Hook pour détecter la section actuellement visible dans le viewport.
 * Utilise l'Intersection Observer API pour surveiller les sections de la page.
 *
 * Ce hook est optimisé pour la navigation : il considère qu'une section est active
 * quand elle est visible dans le tiers supérieur de l'écran (rootMargin: '-20% 0px -70% 0px').
 *
 * @param sectionIds - Array des IDs des sections à surveiller (ex: ['hero', 'about', 'contact'])
 * @param options - Options pour l'Intersection Observer (optionnel)
 * @returns L'ID de la section actuellement active ou null si aucune section n'est visible
 *
 * @example
 * ```tsx
 * const activeSection = useActiveSection(['hero', 'about', 'contact']);
 * const isHeroActive = activeSection === 'hero';
 * ```
 */
export function useActiveSection(
  sectionIds: string[],
  options: IntersectionObserverInit = {},
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
      // Trouve la section la plus visible
      const mostVisible = entries
        .filter((entry) => entry.isIntersecting)
        .reduce(
          (max, entry) => (entry.intersectionRatio > (max?.intersectionRatio || 0) ? entry : max),
          null,
        );

      if (mostVisible) {
        setActiveSection(mostVisible.target.id);
      }
    }, defaultOptions);

    // Observe toutes les sections
    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sectionIds, options]);

  return activeSection;
}
