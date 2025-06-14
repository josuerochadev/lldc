import type { ReactNode } from 'react';

import { use3DTilt } from '@/hooks/use3DTilt';

export default function TiltCard({ children }: { children: ReactNode }) {
  const ref = use3DTilt();

  return (
    <div
      ref={ref}
      className="relative"
      style={{
        perspective: 1000,
        transformStyle: 'preserve-3d',
      }}
    >
      {children}
    </div>
  );
}
