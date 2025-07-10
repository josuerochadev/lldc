// src/sections/Services.tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import SectionContainer from '@/components/common/SectionContainer';
import SectionTitle from '@/components/common/SectionTitle';
import TiltCard from '@/components/motion/TiltCard';
import { SERVICES } from '@/config/constants';

export default function Services() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = SERVICES[selectedIndex];

  return (
    <SectionContainer
      id="services"
      backgroundImage="/backgrounds/forest-background.png"
      className="bg-cover bg-center bg-no-repeat text-violet shadow-xl"
      overlayClassName="bg-purple backdrop-blur-sm"
    >
      <SectionTitle title="Nos Services" />

      <div className="mx-auto flex flex-col md:flex-row md:items-center md:justify-center">
        {/* Coluna esquerda: imagem principal + miniatures */}
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

          <div className="mt-3 flex w-full justify-center">
            {SERVICES.map((service, index) => (
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
              className="w-full max-w-content self-center rounded-card bg-purple/30 px-6 py-8 shadow-lg backdrop-blur-2xl"
            >
              <h3 className="mb-4 font-serif text-title-lg font-black">
                {selected.title}
              </h3>
              <p className="text-text-base leading-snug tracking-wide">
                {selected.description}
              </p>
            </motion.div>
          </TiltCard>
        </AnimatePresence>
      </div>
    </SectionContainer>
  );
}
