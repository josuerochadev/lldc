import { useState } from 'react';

import FadeInUp from '@/components/motion/FadeInUp';
import TiltCard from '@/components/motion/TiltCard';
import SectionTitle from '@/components/common/SectionTitle';
import { OFFERS } from '@/config/constants';
import OverlayPanel from '@/components/common/OverlayPanel';

export default function Offers() {
  const [openCards, setOpenCards] = useState<number[]>([]);

  const toggleCard = (id: number) => {
    setOpenCards((prev) =>
      prev.includes(id) ? prev.filter((cardId) => cardId !== id) : [...prev, id],
    );
  };

  return (
    <section id="offers" className="w-full px-4 py-24">
      <SectionTitle title="Nos Offres" />

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 md:grid-cols-2">
        {OFFERS.map((offer, index) => {
          const isOpen = openCards.includes(offer.id);

          return (
            <FadeInUp key={offer.id} delay={index * 0.2}>
              <TiltCard>
                <button
                  type="button"
                  className="relative h-[500px] w-full cursor-pointer overflow-hidden rounded-card shadow-card md:h-[650px]"
                  onClick={() => toggleCard(offer.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') toggleCard(offer.id);
                  }}
                >
                  <img
                    src={offer.image}
                    alt={offer.title}
                    className="absolute inset-0 -z-base h-full w-full object-cover"
                  />
                  <OverlayPanel
                    title={offer.title}
                    summary={offer.summary}
                    details={offer.details}
                    expanded={isOpen}
                    expandable
                  />
                </button>
              </TiltCard>
            </FadeInUp>
          );
        })}
      </div>
    </section>
  );
}
