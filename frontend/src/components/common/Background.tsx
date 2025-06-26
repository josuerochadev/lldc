import React, { type ComponentPropsWithoutRef, type CSSProperties } from 'react';

import { cn } from '@/lib/cn';
import { useSmoothedScrollProgress } from '@/hooks/useSmoothedScrollProgress';

interface RippleProps extends ComponentPropsWithoutRef<'div'> {
  mainCircleSize?: number;
  mainCircleOpacity?: number;
  numCircles?: number;
  scrollProgress: number;
}

const Ripple = React.memo(function Ripple({
  mainCircleSize = 300, // 👈 maior que antes
  mainCircleOpacity = 0.3, // 👈 mais opaco
  numCircles = 25, // 👈 mais círculos
  className,
  scrollProgress,
  ...props
}: RippleProps) {
  const left = 75;
  const top = 65 - scrollProgress * 55; // começa em 75%, sobe até 20%

  return (
    <div className={cn('pointer-events-none absolute inset-0', className)} {...props}>
      {Array.from({ length: numCircles }, (_, i) => {
        const size = mainCircleSize + i * 90; // 👈 espaçamento menor
        const opacity = Math.max(mainCircleOpacity - i * 0.015, 0.03); // 👈 opacidade mais gradual
        const blur = (i / numCircles) * 15; // de 0 a 20px conforme o círculo se afasta
        const animationDelay = `${i * 0.5}s`;
        const animation = `ripple 8s ease-in-out ${animationDelay} infinite`;

        return (
          <div
            key={`ripple-${
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              i
            }`}
            className="absolute rounded-full border bg-orange/15 shadow-xl"
            style={
              {
                '--i': i,
                width: `${size}px`,
                height: `${size}px`,
                opacity,
                filter: `blur(${blur}px)`,
                animation,
                borderStyle: 'solid',
                borderWidth: '0.5px',
                borderColor: 'var(--primary)',
                top: `${top}%`,
                left: `${left}%`,
                transform: 'translate(-50%, -50%) scale(1)',
              } as CSSProperties
            }
          />
        );
      })}
    </div>
  );
});

export default function Background() {
  const scrollProgress = useSmoothedScrollProgress();

  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      {/* Halo focal no canto inferior direito */}
      <div className="absolute bottom-[10%] right-[15%] z-10 h-[400px] w-[400px] rounded-full bg-beige opacity-10 blur-[100px]" />

      {/* Cercle + anneaux concêntricos */}
      <Ripple className="z-0" scrollProgress={scrollProgress} />
    </div>
  );
}
