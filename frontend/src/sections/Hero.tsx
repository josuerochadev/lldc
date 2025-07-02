import { useState, forwardRef } from 'react';

import SplitText from '@/components/motion/SplitText';
import FadeInUp from '@/components/motion/FadeInUp';
import LogoEye from '@/assets/logo/logo-eye.svg?react';
import Button from '@/components/common/Button';
import { HERO_PHRASES } from '@/config/constants';
import SectionContainer from '@/components/common/SectionContainer';

const Hero = forwardRef<HTMLElement>(() => {
  const [currentPhrase] = useState(() => {
    const randomIndex = Math.floor(Math.random() * HERO_PHRASES.length);
    return HERO_PHRASES[randomIndex];
  });

  return (
    <SectionContainer id="hero" className="flex min-h-screen items-center overflow-hidden">
      {/* Logo */}
      <FadeInUp delay={0.1}>
        <div className="aspect-[146/85] mb-8 w-[90px] sm:w-[110px] md:w-[130px] lg:w-[160px] 3xl:w-[180px] 4xl:w-[240px] 5xl:w-[340px]">
          <LogoEye className="h-full w-full" />
        </div>
      </FadeInUp>

      {/* Punchline */}
      <div className="w-full space-y-4 sm:space-y-6 md:space-y-8 3xl:space-y-10 4xl:space-y-12">
        <FadeInUp delay={0.3}>
          <SplitText
            text={currentPhrase}
            className="mb-8 text-5xl font-extrabold uppercase leading-tight sm:text-6xl md:text-7xl lg:text-8xl 3xl:text-9xl 4xl:text-[10rem] 5xl:text-[15rem]"
          />
        </FadeInUp>

        {/* Titre */}
        <FadeInUp delay={0.6}>
          <header>
            <h1 className="text-2xl leading-tight tracking-wide sm:text-3xl md:text-4xl md:tracking-normal lg:text-5xl 3xl:text-7xl 4xl:text-7xl 5xl:text-9xl">
              <span className="font-thin">－</span>
              <span className="font-thin">LA</span>
              <span className="font-extrabold">LUNETTERIE</span>
              <span className="font-thin">DU</span>
              <span className="font-extrabold">COIN</span>
            </h1>
          </header>
        </FadeInUp>

        {/* CTA */}
        <FadeInUp delay={0.8}>
          <Button className="px-6 py-3 text-sm sm:px-7 sm:py-4 sm:text-base md:px-8 md:py-5 md:text-lg 3xl:text-xl 4xl:text-2xl 5xl:text-3xl">
            Prendre rendez-vous
          </Button>
        </FadeInUp>
      </div>
    </SectionContainer>
  );
});

export default Hero;
