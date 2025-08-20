import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import SectionContainer from '@/components/common/SectionContainer';
import SectionTitle from '@/components/common/SectionTitle';
import { SERVICES } from '@/config/constants';
import ServiceCard from '@/components/services/ServiceCard';
import ServiceThumbnail from '@/components/services/ServiceThumbnail';
import Picture from '@/components/common/Picture';

/**
 * Composant principal pour la section "Nos Services".
 *
 * Affiche une liste de services avec une image principale animée, des miniatures pour la sélection,
 * et une carte détaillée du service sélectionné. Permet à l'utilisateur de naviguer entre les différents
 * services proposés via des miniatures interactives.
 *
 * @component
 * @returns {JSX.Element} La section des services avec navigation et animation.
 *
 * @example
 * <Services />
 */

export default function Services() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = SERVICES[selectedIndex];

  return (
<SectionContainer
  id="services"
  className="relative bg-forest text-violet shadow-xl"
  overlayClassName="bg-transparent"
>
      <SectionTitle title="Nos Services" />

      <div className="mx-auto flex flex-col md:flex-row md:items-center md:justify-center">
        {/* Colonne gauche : image + miniatures */}
        <div className="flex flex-col items-center px-container-x py-container-y">
          <AnimatePresence mode="wait">
            <motion.div
              key={selected.imageBase}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.01 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="h-auto w-service-img max-w-full"
            >
              <Picture
                srcBase={selected.imageBase}
                alt={selected.title}
                /* Si tu connais la dimension native de l’illustration, dé-commente :
                 width={1200}
                 height={900}
                 */
                sizes="(min-width: 1024px) 42vw, (min-width: 768px) 60vw, 90vw"
                className="h-auto w-full object-contain"
              />
            </motion.div>
          </AnimatePresence>

          <div
            role="tablist"
            aria-label="Liste des services"
            className="mt-3 flex w-full justify-center gap-word-gap"
          >
            {SERVICES.map((service, index) => (
              <ServiceThumbnail
                key={service.title}
                imageBase={service.imageBase}
                title={service.title}
                isActive={selectedIndex === index}
                index={index}
                onClick={() => setSelectedIndex(index)}
              />
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
