// src/components/common/SectionContainer.tsx

import type { ReactNode, CSSProperties } from 'react';

import { cn } from '@/lib/cn';

type SectionContainerProps = {
  id?: string;
  className?: string;
  children: ReactNode;
  backgroundImage?: string; // Ex: "/backgrounds/services-background.png"
  overlayClassName?: string; // Ex: "bg-white/40 backdrop-blur"
};

export default function SectionContainer({
  id,
  className = '',
  children,
  backgroundImage,
  overlayClassName = 'bg-white/40 backdrop-blur-sm',
}: SectionContainerProps) {
  return (
    <section
      id={id}
      className={cn('relative w-full px-4 py-32', className)}
      style={
        backgroundImage
          ? ({ backgroundImage: `url('${backgroundImage}')` } as CSSProperties)
          : undefined
      }
    >
      {backgroundImage && (
        <div
          aria-hidden="true"
          className={cn(
            'absolute inset-0 -z-10',
            overlayClassName
          )}
        />
      )}

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        {children}
      </div>
    </section>
  );
}