// src/sections/Services.tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import SectionContainer from '@/components/common/SectionContainer';
import SectionTitle from '@/components/common/SectionTitle';
import TiltCard from '@/components/motion/TiltCard';

const services = [
  {
    title: 'Lunettes neuves et d’occasion',
    description: 'Large choix de montures neuves et de seconde main, soigneusement sélectionnées.',
    image: '/illustrations/eyeframe.png',
  },
  {
    title: 'Lentilles de contact',
    description: 'Conseils personnalisés et adaptation pour tous types de lentilles.',
    image: '/illustrations/contact-lenses.png',
  },
  {
    title: 'Examens de vue',
    description: 'Contrôle visuel complet réalisé par un opticien diplômé.',
    image: '/illustrations/test-vision.png',
  },
];

export default function Services() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = services[selectedIndex];

  return (
    <SectionContainer
      id="services"
      backgroundImage="/backgrounds/forest-background.png"
      className="bg-cover bg-center bg-no-repeat py-16 shadow-xl"
      overlayClassName="bg-purple backdrop-blur-sm"
    >
      <div className="mx-auto mb-6 max-w-7xl text-left text-violet">
        <SectionTitle title="Nos Services" />
      </div>

      <div className="mx-auto flex max-w-7xl flex-col gap-x-12 gap-y-6 md:flex-row md:items-center md:justify-center">
        {/* Coluna esquerda: imagem principal + miniaturas */}
        <div className="flex flex-col items-center">
          <motion.img
            key={selected.image}
            src={selected.image}
            alt={selected.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="h-auto w-[320px] sm:w-[360px] md:w-[440px] lg:w-[500px]"
          />

          <div className="mt-3 flex w-full justify-center gap-2">
            {services.map((service, index) => (
              <button
                key={service.title}
                type="button"
                onClick={() => setSelectedIndex(index)}
                className={`transition-transform duration-300 hover:scale-105 focus:outline-none ${
                  selectedIndex === index ? 'opacity-100' : 'opacity-60'
                }`}
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="h-16 w-auto object-contain"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Coluna direita: texto */}
        <AnimatePresence mode="wait">
          <TiltCard>
            <motion.div
              key={selected.title}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-xl self-center rounded-md bg-purple/30 px-6 py-8 shadow-lg backdrop-blur-2xl"
            >
              <h3 className="mb-4 font-serif text-[clamp(2rem,4vw,2.6rem)] font-black text-violet/90">
                {selected.title}
              </h3>
              <p className="text-[clamp(1.1rem,2.5vw,1.4rem)] leading-snug tracking-wide text-violet/80">
                {selected.description}
              </p>
            </motion.div>
          </TiltCard>
        </AnimatePresence>
      </div>
    </SectionContainer>
  );
}
