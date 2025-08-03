import { useState } from 'react';

import AnimatedItem from '@/components/motion/AnimatedItem';
import TiltCard from '@/components/motion/TiltCard';
import SectionTitle from '@/components/common/SectionTitle';
import { OFFERS } from '@/config/constants';
import OverlayPanel from '@/components/common/OverlayPanel';
import { isToggleKey } from '@/lib/keyboard';

export default function Offers() {
  const [openCards, setOpenCards] = useState<number[]>([]);

  const toggleCard = (id: number) => {
    setOpenCards((prev) =>
      prev.includes(id) ? prev.filter((cardId) => cardId !== id) : [...prev, id],
    );
  };

  return (
    <section id="offers" className="w-full px-container-x py-section">
      <SectionTitle title="Nos Offres" />

      <div className="mx-auto grid max-w-content grid-cols-1 gap-section-gap md:grid-cols-2">
        {OFFERS.map((offer, index) => {
          const isOpen = openCards.includes(offer.id);

          return (
            <AnimatedItem key={offer.id} index={index}>
              <TiltCard>
                <button
                  type="button"
                  className="relative h-card w-full cursor-pointer overflow-hidden rounded-card shadow-card focus-visible:rounded-md focus-visible:outline-none focus-visible:ring-orange"
                  aria-expanded={isOpen}
                  aria-controls={`offer-panel-${offer.id}`}
                  onClick={() => toggleCard(offer.id)}
                  onKeyDown={(e) => {
                    if (isToggleKey(e)) toggleCard(offer.id);
                  }}
                >
                  {/* Imagem de fundo sempre visível */}
                  <img
                    src={offer.image}
                    alt={offer.title}
                    className="absolute inset-0 -z-base h-full w-full object-cover"
                  />

                  {/* Overlay que cobre parcialmente e depois se expande */}
                  <OverlayPanel
                    title={offer.title}
                    id={`offer-panel-${offer.id}`}
                    titleId={`offer-title-${offer.id}`}
                    summary={offer.summary}
                    details={offer.details}
                    expanded={isOpen}
                    expandable
                  />
                </button>
              </TiltCard>
            </AnimatedItem>
          );
        })}
      </div>
    </section>
  );
}
