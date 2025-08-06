import type React from 'react';
import { useEffect } from 'react';

/**
 * Hook React permettant de détecter un clic en dehors d'un élément référencé.
 *
 * @param ref - Référence vers l'élément HTML à surveiller.
 * @param handler - Fonction appelée lorsqu'un clic est détecté en dehors de l'élément.
 * @param active - Booléen pour activer ou désactiver l'écoute des clics.
 *
 * @example
 * const ref = useRef(null);
 * useClickOutside(ref, () => setOpen(false), open);
 *
 * @remarks
 * Ce hook ajoute un écouteur d'événement 'mousedown' sur le document lorsque `active` est vrai.
 * Lorsque l'utilisateur clique en dehors de l'élément référencé, la fonction `handler` est appelée.
 * L'écouteur est automatiquement retiré lors du démontage du composant ou lorsque `active` devient faux.
 */
export function useClickOutside(
  ref: React.RefObject<HTMLElement | null>,
  handler: () => void,
  active: boolean,
) {
  useEffect(() => {
    if (!active) return;
    function handleClick(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [ref, handler, active]);
}
