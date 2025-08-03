import { AnimatePresence, motion } from 'framer-motion';

import TiltCard from '@/components/motion/TiltCard';
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

export default function OfferCard({ offer, isOpen, onToggle, index }: OfferCardProps) {

  return (
    <AnimatedItem index={index}>
      <TiltCard>
        <button
          type="button"
          className="relative h-card w-full cursor-pointer overflow-hidden rounded-card shadow-card focus-visible:rounded-md focus-visible:outline-none focus-visible:ring-orange"
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
              'absolute inset-4 z-10 flex w-auto flex-col justify-start rounded-card bg-purple/30 p-section-gap text-violet shadow-card backdrop-blur-2xl transition-all duration-500'
            )}
            initial={false}
            animate={{
              height: isOpen ? '95%' : '50%',
            }}
            transition={{ type: 'spring', damping: 20, stiffness: 200 }}
          >
            <h3 id={`offer-title-${offer.id}`} className="mb-4 text-left font-serif text-title-lg font-bold">
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
              <span className="text-text-footer font-bold underline cursor-pointer">
                {isOpen ? 'Réduire' : 'En savoir plus'}
              </span>
            </div>
          </motion.section>
        </button>
      </TiltCard>
    </AnimatedItem>
  );
}