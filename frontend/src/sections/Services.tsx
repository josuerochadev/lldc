// src/sections/Services.tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { cn } from '@/lib/cn';
import SectionContainer from '@/components/common/SectionContainer';
import SectionTitle from '@/components/common/SectionTitle';
import TiltCard from '@/components/motion/TiltCard';
import OverlayPanel from '@/components/common/OverlayPanel';
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
        {/* Coluna esquerda: imagem + miniaturas */}
        <div className="flex flex-col items-center py-container-y px-container-x">
          <AnimatePresence mode="wait">
            <motion.img
              key={selected.image}
              src={selected.image}
              alt={selected.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="max-w-full h-auto w-service-img"
            />
          </AnimatePresence>

          <div className="mt-3 flex w-full justify-center gap-word-gap">
            {SERVICES.map((service, index) => (
              <button
                key={service.title}
                type="button"
                onClick={() => setSelectedIndex(index)}
                aria-label={`Voir ${service.title}`}
                className={cn(
                  'transition-transform duration-250 hover:scale-105 focus:outline-none',
                  selectedIndex === index ? 'opacity-100' : 'opacity-60',
                )}
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="h-24 w-24 object-contain"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Coluna direita: conteúdo textual via OverlayPanel */}
        <TiltCard>
          <OverlayPanel
            title={selected.title}
            className="relative w-[clamp(18rem,42vw,120rem)] self-center"
          >
            <p className="text-text-base leading-snug tracking-wide">{selected.description}</p>
          </OverlayPanel>
        </TiltCard>
      </div>
    </SectionContainer>
  );
}