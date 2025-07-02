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
      className={cn(
        'relative w-full bg-cover bg-center bg-no-repeat py-section sm:px-gutter',
        className,
      )}
      style={
        backgroundImage
          ? ({ backgroundImage: `url('${backgroundImage}')` } as CSSProperties)
          : undefined
      }
    >
      {backgroundImage && (
        <div aria-hidden="true" className={cn('absolute inset-0 -z-10', overlayClassName)} />
      )}

      <div className="relative z-10 mx-auto w-full max-w-[95vw] sm:max-w-[90vw] lg:max-w-screen-xl 3xl:max-w-[1800px] 4xl:max-w-[2400px] 5xl:max-w-[3600px]">
        {children}
      </div>
    </section>
  );
}
