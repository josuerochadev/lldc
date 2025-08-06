// src/components/common/RippleAnimation.tsx

import React, { type ComponentPropsWithoutRef } from 'react';

import { cn } from '@/lib/cn';

interface RippleAnimationProps extends ComponentPropsWithoutRef<'div'> {
  scrollProgress: number;
  circleCount?: number;
  baseSize?: number;
  baseOpacity?: number;
}

const DEFAULTS = {
  circleCount: 25,
  baseSize: 300,
  baseOpacity: 0.3,
};

export const RippleAnimation = React.memo(function RippleAnimation({
  scrollProgress,
  circleCount = DEFAULTS.circleCount,
  baseSize = DEFAULTS.baseSize,
  baseOpacity = DEFAULTS.baseOpacity,
  className,
  ...props
}: RippleAnimationProps) {
  const top = 65 - scrollProgress * 55;
  const left = 75;

  const computeStyle = (i: number): React.CSSProperties => {
    const size = baseSize + i * 90;
    const opacity = Math.max(baseOpacity - i * 0.015, 0.03);
    const blur = (i / circleCount) * 15;
    const animationDelay = `${i * 0.5}s`;

    return {
      width: `${size}px`,
      height: `${size}px`,
      opacity,
      filter: `blur(${blur}px)`,
      animation: `ripple 8s ease-in-out ${animationDelay} infinite`,
      borderStyle: 'solid',
      borderWidth: '0.5px',
      borderColor: 'var(--purple)',
      top: `${top}%`,
      left: `${left}%`,
      transform: 'translate(-50%, -50%) scale(1)',
      // Allow custom CSS variable
      ['--i' as string]: i,
    };
  };

  return (
    <div className={cn('pointer-events-none absolute inset-0', className)} {...props}>
      {Array.from({ length: circleCount }).map((_, i) => (
        <div
          key={`ripple-${// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
i}`}
          className="absolute rounded-full border bg-orange/15 shadow-xl"
          style={computeStyle(i)}
        />
      ))}
    </div>
  );
});