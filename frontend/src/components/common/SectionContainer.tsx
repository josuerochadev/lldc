// src/components/common/SectionContainer.tsx

import type { ReactNode } from 'react';

type SectionContainerProps = {
  children: ReactNode;
  id?: string;
  className?: string;
};

export default function SectionContainer({ children, id, className = '' }: SectionContainerProps) {
  return (
    <section id={id} className={`w-full px-4 py-32 ${className}`}>
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
}
