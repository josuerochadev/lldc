// src/components/common/SectionContainer.tsx

import type { ReactNode, CSSProperties, JSX } from 'react';

import { cn } from '@/lib/cn';

type SectionContainerProps = {
  id?: string;
  className?: string;
  children: ReactNode;
  backgroundImage?: string; // Ex: "/backgrounds/services-background.png"
  overlayClassName?: string; // Ex: "bg-white/40 backdrop-blur"
  noSpacing?: boolean;
  as?: keyof JSX.IntrinsicElements; // Allows using different HTML elements like 'div', 'section', etc.
};

export default function SectionContainer({
  id,
  className = '',
  children,
  backgroundImage,
  overlayClassName = 'bg-white/40 backdrop-blur-sm',
  noSpacing,
  as: Element = 'section',
}: SectionContainerProps) {
  const backgroundStyle: CSSProperties = backgroundImage
    ? {
        backgroundImage: `url('${backgroundImage}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }
    : {};

  return (
    <Element
      id={id}
      style={backgroundStyle}
      className={cn(
        'relative w-full',
        !noSpacing && 'px-container-x py-section',
        backgroundImage && 'bg-cover bg-center',
        className,
      )}
      role={id === 'hero' ? 'banner' : undefined}
    >
      {backgroundImage && (
        <div aria-hidden="true" className={cn('absolute inset-0 -z-base', overlayClassName)} />
      )}

      <div className="relative mx-auto w-full">{children}</div>
    </Element>
  );
}
