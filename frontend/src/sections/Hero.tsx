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
    <SectionContainer id="hero" className="flex min-h-[100dvh] items-center justify-center">
      {/* Logo */}
      <FadeInUp delay={0.1}>
        <div className="mb-section-gap aspect-[146/85] w-[clamp(5rem,10vw,20rem)]">
          <LogoEye aria-hidden="true" focusable="false" className="h-full w-full" />
        </div>
      </FadeInUp>

      <div className="w-full space-y-section-gap">
        {/* Punchline */}
        <FadeInUp delay={0.3}>
          <SplitText
            text={currentPhrase}
            className="text-title-xl font-black uppercase tracking-wide"
          />
        </FadeInUp>

        {/* Titre */}
        <FadeInUp delay={0.6}>
          <header>
            <h1 className="text-title-md" aria-label="La Lunetterie du Coin">
              <span className="font-thin">－</span>
              <span className="font-thin">LA</span>
              <span className="font-black">LUNETTERIE</span>
              <span className="font-thin">DU</span>
              <span className="font-black">COIN</span>
            </h1>
          </header>
        </FadeInUp>

        {/* CTA */}
        <FadeInUp delay={0.8}>
          <Button id="hero-cta" className="text-text-cta" aria-label="Prendre rendez-vous">
            Prendre rendez-vous
          </Button>
        </FadeInUp>
      </div>
    </SectionContainer>
  );
});

export default Hero;
