// frontend/src/pages/HomePage.tsx

import CardFrame from '@/components/CardFrame';
import Logo from '@/assets/logo/logo.svg?react';
import { ROUTES_CONFIG } from '@/config/constants';
import VisionLine from '@/components/VisionLine';

export default function HomePage() {
  return (
    <div className="mb-12 flex min-h-[100dvh] flex-1 items-center justify-center px-2">
      <CardFrame className="flex w-[90vw] max-w-[480px] flex-col items-center">
        <Logo className="mx-auto mb-4 h-auto w-[clamp(150px,20vw,200px)] text-primary" />
        <ul className="flex w-full flex-col items-center gap-[0.1rem] text-center sm:gap-[0.15rem] md:gap-[0.2rem]">
          {ROUTES_CONFIG.map(({ navLabel, path }, index) => (
            <VisionLine key={path} index={index} label={navLabel} path={path} />
          ))}
        </ul>
      </CardFrame>
    </div>
  );
}
