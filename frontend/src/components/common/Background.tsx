// src/components/common/Background.tsx

import { RippleAnimation } from './RippleAnimation';

import { useSmoothedScrollProgress } from '@/hooks/useSmoothedScrollProgress';

/**
 * Affiche le fond animé avec effets de halo et ondulations circulaires.
 * À positionner au plus bas niveau du layout pour éviter tout effet sur l'interaction.
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