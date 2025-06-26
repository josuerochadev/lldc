import { useState, forwardRef } from 'react';

import SplitText from '@/components/motion/SplitText';
import FadeInUp from '@/components/motion/FadeInUp';
import LogoEye from '@/assets/logo/logo-eye.svg?react';

const phrases = [
  'Des lunettes qui ont du style, une démarche qui a du sens',
  'Des lunettes à la mode et pas de déchet en vue !',
  'Payez vos lunettes moins cher en recyclant vos anciennes paires',
];

const Hero = forwardRef<HTMLElement>((_props, ref) => {
  const [currentPhrase] = useState(() => {
    const randomIndex = Math.floor(Math.random() * phrases.length);
    return phrases[randomIndex];
  });

  return (
    <section ref={ref} className="relative min-h-screen w-full overflow-hidden">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col items-start justify-center space-y-4 px-4 sm:space-y-6 md:space-y-8">
        {/* Logo */}
        <FadeInUp delay={0.1}>
          <div className="aspect-[146/85] w-[90px] sm:w-[110px] md:w-[130px] lg:w-[160px]">
            <LogoEye className="h-full w-full" />
          </div>
        </FadeInUp>

        {/* Punchline */}
        <div className="w-full max-w-[90%] space-y-4 sm:max-w-[85%] sm:space-y-6 md:max-w-4xl md:space-y-8">
          <FadeInUp delay={0.3}>
            <SplitText
              text={currentPhrase}
              className="mb-8 text-5xl font-extrabold uppercase leading-tight md:text-7xl"
            />
          </FadeInUp>

          {/* Titre */}
          <FadeInUp delay={0.6}>
            <header>
              <h1 className="text-2xl leading-tight tracking-wide sm:text-3xl md:text-4xl md:tracking-normal">
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
            <button
              type="button"
              aria-label="Prendre rendez-vous"
              onClick={() => {
                window.location.href = '#appointment';
              }}
              className="button-primary transition-all duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange focus:ring-offset-2 active:scale-95"
            >
              Prendre rendez-vous
            </button>
          </FadeInUp>
        </div>
      </div>
    </section>
  );
});

export default Hero;
