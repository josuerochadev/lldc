import { useState, forwardRef } from 'react';

import SplitText from '@/components/motion/SplitText';
import AnimatedItem from '@/components/motion/AnimatedItem';
import LogoEye from '@/assets/logo/logo-eye.svg?react';
import Button from '@/components/common/Button';
import { HERO_PHRASES } from '@/config/constants';
import { getRandomHeroPhrase } from '@/lib/hero';
import SectionContainer from '@/components/common/SectionContainer';

const Hero = forwardRef<HTMLElement>(() => {
  const [currentPhrase] = useState(() => getRandomHeroPhrase(HERO_PHRASES));

  return (
    <SectionContainer
      id="hero"
      className="flex min-h-[100dvh] items-center justify-center"
      aria-labelledby="hero-title"
    >
      {/* Logo */}
      <AnimatedItem index={0}>
        <div className="mb-section-gap aspect-[146/85] w-[clamp(5rem,10vw,20rem)]">
          <LogoEye aria-hidden="true" focusable="false" className="h-full w-full" />
        </div>
      </AnimatedItem>

      <div className="w-full space-y-section-gap">
        {/* Punchline */}
        <AnimatedItem index={1}>
          <SplitText
            text={currentPhrase}
            className="text-title-xl font-black uppercase tracking-wide"
          />
        </AnimatedItem>

        {/* Titre */}
        <AnimatedItem index={2}>
          <header>
            <h1 id="hero-title" className="text-title-md" aria-label="La Lunetterie du Coin">
              <span className="font-thin">－</span>
              <span className="font-thin">LA</span>
              <span className="font-black">LUNETTERIE</span>
              <span className="font-thin">DU</span>
              <span className="font-black">COIN</span>
            </h1>
          </header>
        </AnimatedItem>

        {/* CTA */}
        <AnimatedItem index={3}>
          <Button id="hero-cta" className="text-text-cta" aria-label="Prendre rendez-vous">
            Prendre rendez-vous
          </Button>
        </AnimatedItem>
      </div>
    </SectionContainer>
  );
});

export default Hero;
