import { AnimatePresence, motion } from 'framer-motion';

import TiltCard from '@/components/motion/interactive/TiltCard';
import AnimatedItem from '@/components/motion/AnimatedItem';
import { isToggleKey } from '@/lib/keyboard';
import { cn } from '@/lib/cn';

type Offer = {
  id: number;
  image: string;
  title: string;
  summary: string;
  details: string;
};

type OfferCardProps = {
  offer: Offer;
  isOpen: boolean;
  // eslint-disable-next-line no-unused-vars
  onToggle: (id: number) => void;
  index: number;
};

/**
 * Composant `OfferCard`
 *
 * Affiche une carte interactive représentant une offre, avec une animation de tilt et des transitions animées.
 * Permet d'afficher un résumé ou les détails complets de l'offre selon l'état d'ouverture.
 *
 * @param offer - L'objet représentant l'offre à afficher (doit contenir au moins `id`, `image`, `title`, `summary`, `details`).
 * @param isOpen - Indique si la carte est ouverte (affichage des détails) ou fermée (affichage du résumé).
 * @param onToggle - Fonction appelée lors du clic ou de l'activation clavier pour ouvrir/fermer la carte (reçoit l'identifiant de l'offre).
 * @param index - Index de la carte dans la liste, utilisé pour l'animation.
 *
 * @returns Un composant React affichant la carte de l'offre avec animations et accessibilité.
 */

/**
 * Composant `OfferCard` qui affiche une carte interactive pour une offre.
 *
 * Cette carte présente un résumé ou les détails d'une offre selon son état (ouverte ou fermée).
 * Elle utilise des animations pour la transition entre les états et gère l'accessibilité via les attributs ARIA.
 *
 * @param offer - L'objet représentant l'offre à afficher, contenant notamment l'image, le titre, le résumé et les détails.
 * @param isOpen - Booléen indiquant si la carte est ouverte (affiche les détails) ou fermée (affiche le résumé).
 * @param onToggle - Fonction appelée lors du clic ou de l'activation clavier pour ouvrir ou fermer la carte.
 * @param index - Index de la carte dans la liste, utilisé pour l'animation.
 *
 * @returns Un composant React affichant une carte d'offre animée et accessible.
 */
export default function OfferCard({ offer, isOpen, onToggle, index }: OfferCardProps) {
  return (
    <AnimatedItem index={index}>
      <TiltCard>
        <button
          type="button"
          className="focus-style relative h-card w-full cursor-pointer overflow-hidden rounded-card shadow-card"
          aria-expanded={isOpen}
          aria-controls={`offer-panel-${offer.id}`}
          onClick={() => onToggle(offer.id)}
          onKeyDown={(e) => {
            if (isToggleKey(e)) onToggle(offer.id);
          }}
        >
          <img
            src={offer.image}
            alt={offer.title}
            className="absolute inset-0 -z-base h-full w-full object-cover"
          />

          <motion.section
            id={`offer-panel-${offer.id}`}
            aria-labelledby={`offer-title-${offer.id}`}
            className={cn(
              'absolute inset-4 z-10 flex w-auto flex-col justify-start rounded-card bg-purple/30 p-section-gap text-violet shadow-card backdrop-blur-2xl transition-all duration-500',
            )}
            initial={false}
            animate={{
              height: isOpen ? '95%' : '50%',
            }}
            transition={{ type: 'spring', damping: 20, stiffness: 200 }}
          >
            <h3
              id={`offer-title-${offer.id}`}
              className="mb-4 text-left font-serif text-title-lg font-bold"
            >
              {offer.title}
            </h3>
            <AnimatePresence mode="wait">
              <motion.div
                key={isOpen ? 'details' : 'summary'}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
                className="overflow-hidden"
              >
                <p className="max-w-[90%] whitespace-pre-line text-left text-text-base leading-snug">
                  {isOpen ? offer.details : offer.summary}
                </p>
              </motion.div>
            </AnimatePresence>
            <div className="mt-auto flex justify-center">
              <span className="cursor-pointer text-text-footer font-bold underline">
                {isOpen ? 'Réduire' : 'En savoir plus'}
              </span>
            </div>
          </motion.section>
        </button>
      </TiltCard>
    </AnimatedItem>
  );
}
