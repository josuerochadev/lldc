import type React from 'react';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import SplitText from '@/components/motion/SplitText';
import FadeInUp from '@/components/motion/FadeInUp';

const phrases = [
  'Des lunettes qui ont du style, une démarche qui a du sens',
  'Des lunettes à la mode et pas de déchet en vue !',
  'Payez vos lunettes moins cher en recyclant vos anciennes paires',
];

const Hero: React.FC = () => {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="grid min-h-screen w-full grid-rows-[auto_1fr_auto] bg-beige px-4">
      <div className="mx-auto flex w-full max-w-7xl justify-center pt-16 md:pt-32">
        <FadeInUp delay={0.1}>
          <img
            src="/src/assets/logo/logo.svg"
            alt="La Lunetterie du Coin"
            className="w-40 md:w-56"
          />
        </FadeInUp>
      </div>

      <div />

      <div className="mx-auto w-full max-w-7xl pb-16 md:pb-32">
        <div className="mx-auto max-w-5xl text-left">
          <AnimatePresence mode="wait">
            <motion.div
              key={phrases[currentPhraseIndex]}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
            >
              <SplitText text={phrases[currentPhraseIndex]} />
            </motion.div>
          </AnimatePresence>

          <FadeInUp delay={0.6}>
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
};

export default Hero;
