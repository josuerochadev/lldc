import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import clsx from 'clsx';

import SectionContainer from '@/components/common/SectionContainer';
import SectionTitle from '@/components/common/SectionTitle';
import { SERVICES } from '@/config/constants';
import ServiceCard from '@/components/services/ServiceCard';

export default function Services() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = SERVICES[selectedIndex];

  return (
    <SectionContainer
      id="services"
      backgroundImage="/backgrounds/forest-background.png"
      className="relative bg-cover bg-center bg-no-repeat text-violet shadow-xl"
      overlayClassName="bg-transparent"
    >
      <SectionTitle title="Nos Services" />

      <div className="mx-auto flex flex-col md:flex-row md:items-center md:justify-center">
        {/* Colonne gauche : image + miniatures */}
        <div className="flex flex-col items-center px-container-x py-container-y">
          <AnimatePresence mode="wait">
            <motion.img
              key={selected.image}
              src={selected.image}
              alt={selected.title}
              className="h-auto w-service-img max-w-full object-contain"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.01 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            />
          </AnimatePresence>

          <div
            role="tablist"
            aria-label="Liste des services"
            className="mt-3 flex w-full justify-center gap-word-gap"
          >
            {SERVICES.map((service, index) => (
              <button
                key={service.title}
                type="button"
                role="tab"
                onClick={() => setSelectedIndex(index)}
                aria-label={`Voir ${service.title}`}
                aria-controls={`tabpanel-${index}`}
                aria-selected={selectedIndex === index}
                tabIndex={selectedIndex === index ? 0 : -1}
                id={`tab-${index}`}
                className={clsx(
                  'focus-style transition-transform duration-250 hover:scale-105',
                  selectedIndex === index ? 'opacity-100' : 'opacity-60',
                )}
              >
                <img src={service.image} alt={service.title} className="h-24 w-24 object-contain" />
              </button>
            ))}
          </div>
        </div>

        {/* Colonne droite : carte de service */}
        <AnimatePresence mode="wait">
          <ServiceCard
            key={selected.title}
            service={selected}
            className="relative w-[clamp(18rem,42vw,120rem)] self-center"
          />
        </AnimatePresence>
      </div>
    </SectionContainer>
  );
}
