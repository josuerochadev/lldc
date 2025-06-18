import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import StaggerGroup from '@/components/motion/StaggerGroup';
import FadeInUp from '@/components/motion/FadeInUp';
import TiltCard from '@/components/motion/TiltCard';
import SectionTitle from '@/components/common/SectionTitle';

const offers = [
  {
    id: 1,
    title: 'Recyclage',
    image: '/photo.png',
    summary: 'Jusqu’à 70€ de remise en rapportant vos anciennes montures.',
    details:
      'Cette démarche vise à encourager le recyclage, donner une seconde vie à vos lunettes tout en réduisant les déchets.',
  },
  {
    id: 2,
    title: 'Deuxième paire',
    image: '/photo.png',
    summary: 'Obtenez une deuxième paire à partir de 59€ selon vos besoins.',
    details:
      '59€ : monture + verres unifocaux\n89€ : verres progressifs\nVerres antireflet durci ou solaires UV cat.3\nOrigine France Garantie — Ophtalmic Vision.',
  },
];

export default function Offers() {
  const [openCards, setOpenCards] = useState<number[]>([]);

  const toggleCard = (id: number) => {
    setOpenCards((prev) =>
      prev.includes(id) ? prev.filter((cardId) => cardId !== id) : [...prev, id],
    );
  };

  return (
    <section id="offers" className="w-full px-4 py-24">
      <div className="mx-auto mb-16 max-w-7xl">
        <SectionTitle title="Nos Offres" />
      </div>

      <StaggerGroup>
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 md:grid-cols-2">
          {offers.map((offer, index) => {
            const isOpen = openCards.includes(offer.id);

            return (
              <FadeInUp key={offer.id} delay={index * 0.2}>
                <TiltCard>
                  <button
                    type="button"
                    className="relative h-[500px] w-full cursor-pointer overflow-hidden rounded-md border-2 border-primary bg-beige md:h-[650px]"
                    onClick={() => toggleCard(offer.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        toggleCard(offer.id);
                      }
                    }}
                  >
                    <img
                      src={offer.image}
                      alt={offer.title}
                      className="absolute inset-0 h-full w-full object-cover"
                    />

                    <motion.div
                      className="absolute inset-4 flex flex-col justify-start bg-primary px-6 py-8 text-beige rounded-md transition-all duration-500"
                      initial={false}
                      animate={{ height: isOpen ? '95%' : '45%' }}
                      transition={{ type: 'spring', damping: 20, stiffness: 200 }}
                    >
                      <h3 className="mb-4 self-start font-serif text-[clamp(1.75rem,5vw,2.5rem)] font-bold">
                        {offer.title}
                      </h3>

                      <AnimatePresence mode="wait">
                        <motion.div
                          key={isOpen ? 'details' : 'summary'}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.4 }}
                        >
                          <p className="max-w-[90%] whitespace-pre-line text-left text-[clamp(1.3rem,3vw,1.5rem)] leading-snug">
                            {isOpen ? offer.details : offer.summary}
                          </p>
                        </motion.div>
                      </AnimatePresence>

                      <div className="mt-auto flex justify-center">
                        <button type="button" className="font-bold underline">
                          {isOpen ? 'Réduire' : 'En savoir plus'}
                        </button>
                      </div>
                    </motion.div>
                  </button>
                </TiltCard>
              </FadeInUp>
            );
          })}
        </div>
      </StaggerGroup>
    </section>
  );
}
