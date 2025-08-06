// src/components/common/Background.tsx

import { RippleAnimation } from './RippleAnimation';

import { useSmoothedScrollProgress } from '@/hooks/useSmoothedScrollProgress';

/**
 * Affiche le fond animé avec effets de halo et ondulations circulaires.
 * À positionner au plus bas niveau du layout pour éviter tout effet sur l'interaction.
 */
/**
 * Composant d'arrière-plan pour l'application.
 *
 * Ce composant affiche un halo doux en bas à droite de l'écran ainsi qu'une animation
 * d’ondulations concentriques synchronisée avec la progression du défilement.
 * Les éléments sont positionnés en arrière-plan et n'interfèrent pas avec les interactions utilisateur.
 *
 * @component
 *
 * @returns {JSX.Element} Élément JSX représentant l'arrière-plan animé.
 */
export default function Background() {
  const scrollProgress = useSmoothedScrollProgress();

  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      {/* Halo doux en bas à droite */}
      <div className="absolute bottom-[10%] right-[15%] z-base h-[400px] w-[400px] rounded-full bg-light-green opacity-10 blur-[100px]" />

      {/* Animation d’ondulations concentriques */}
      <RippleAnimation className="z-0" scrollProgress={scrollProgress} />
    </div>
  );
}