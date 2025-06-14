import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import StaggerGroup from '@/components/motion/StaggerGroup';
import FadeInUp from '@/components/motion/FadeInUp';
import TiltCard from '@/components/motion/TiltCard';

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
    details: `59€ : monture + verres unifocaux
              89€ : verres progressifs
              Verres antireflet durci ou solaires UV cat.3
              Origine France Garantie — Ophtalmic Vision.`,
  },
];

export default function Offers() {
  const [openCard, setOpenCard] = useState<number | null>(null);

  return (
    <section id="offers" className="w-full px-4 py-24">
      <div className="mx-auto mb-16 max-w-7xl text-center">
        <h2 className="text-7xl font-extrabold">Offres du moment</h2>
      </div>

      <StaggerGroup>
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 md:grid-cols-2">
          {offers.map((offer, index) => (
            <FadeInUp key={offer.id} delay={index * 0.2}>
              <TiltCard>
                <div
                  className="relative h-[500px] cursor-pointer overflow-hidden border-4 border-primary bg-beige md:h-[650px]"
                  role="button"
                  tabIndex={0}
                  onClick={() => setOpenCard(openCard === offer.id ? null : offer.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setOpenCard(openCard === offer.id ? null : offer.id);
                    }
                  }}
                >
                  {/* Image Background */}
                  <img
                    src={offer.image}
                    alt={offer.title}
                    className="absolute inset-0 h-full w-full object-cover"
                  />

                  {/* Overlay box */}
                  <motion.div
                    className="absolute inset-4 flex flex-col justify-start bg-primary px-6 py-6 text-beige transition-all duration-500"
                    initial={false}
                    animate={{
                      height: openCard === offer.id ? '95%' : '45%',
                    }}
                    transition={{ type: 'spring', damping: 20, stiffness: 200 }}
                  >
                    <h3 className="mb-4 text-[clamp(1.75rem,5vw,2.5rem)] font-extrabold">
                      {offer.title}
                    </h3>

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={openCard === offer.id ? 'details' : 'summary'}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4 }}
                      >
                        <p className="mb-4 whitespace-pre-line font-serif text-[clamp(1.3rem,3vw,1.5rem)] leading-snug">
                          {openCard === offer.id ? offer.details : offer.summary}
                        </p>
                      </motion.div>
                    </AnimatePresence>

                    <button type="button" className="mt-auto self-start font-bold underline">
                      {openCard === offer.id ? 'Réduire' : 'En savoir plus'}
                    </button>
                  </motion.div>
                </div>
              </TiltCard>
            </FadeInUp>
          ))}
        </div>
      </StaggerGroup>
    </section>
  );
}
