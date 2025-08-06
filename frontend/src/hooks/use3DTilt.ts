import { useRef, useEffect } from 'react';

/**
 * Hook React pour appliquer un effet de tilt 3D à un élément div.
 *
 * Ce hook retourne une référence (`ref`) à attacher à un élément HTMLDivElement.
 * Lorsque la souris se déplace sur l'élément, celui-ci s'incline en fonction de la position du curseur,
 * créant un effet de perspective 3D interactif. L'inclinaison maximale et la transition peuvent être personnalisées.
 *
 * @param maxTilt - Inclinaison maximale en degrés (par défaut : 7).
 * @param transition - Propriété CSS de transition appliquée à la transformation (par défaut : 'transform 0.25s ease-out').
 * @returns Une référence React à attacher à l'élément cible.
 *
 * @example
 * const tiltRef = use3DTilt(10, 'transform 0.3s cubic-bezier(.03,.98,.52,.99)');
 * return <div ref={tiltRef}>Carte avec effet 3D</div>;
 */
export function use3DTilt(maxTilt = 7, transition = 'transform 0.25s ease-out') {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = ref.current;
    if (!card) return;

    card.style.transition = transition;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const percentX = (x - centerX) / centerX;
      const percentY = -((y - centerY) / centerY);

      card.style.transform = `perspective(1000px) rotateY(${percentX * maxTilt}deg) rotateX(${percentY * maxTilt}deg)`;
    };

    const handleMouseLeave = () => {
      card.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [maxTilt, transition]);

  return ref;
}
