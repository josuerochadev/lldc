import { motion } from 'framer-motion';

import TiltCard from '@/components/motion/interactive/TiltCard';
import { cn } from '@/lib/cn';

type Service = {
  image: string;
  title: string;
  description: string;
};

type ServiceCardProps = {
  service: Service;
  className?: string;
};

/**
 * Composant React pour afficher une carte de service avec un effet de tilt et une animation.
 *
 * @param {ServiceCardProps} props - Les propriétés du composant.
 * @param {object} props.service - L'objet représentant le service à afficher.
 * @param {string} props.service.title - Le titre du service.
 * @param {string} props.service.description - La description du service.
 * @param {string} [props.className] - Classe(s) CSS supplémentaire(s) à appliquer à la carte.
 *
 * @returns {JSX.Element} Une carte stylisée présentant le service, avec animation et accessibilité.
 */

export default function ServiceCard({ service, className }: ServiceCardProps) {
  return (
    <TiltCard>
      <motion.section
        role="tabpanel"
        id={`tabpanel-${service.title.replace(/\s+/g, '-').toLowerCase()}`}
        className={cn(
          'relative flex w-[clamp(18rem,42vw,120rem)] flex-col self-center rounded-card bg-purple/30 p-section-gap text-violet shadow-card backdrop-blur-2xl',
          className,
        )}
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -30 }}
        transition={{ duration: 0.5 }}
        aria-labelledby={`service-title-${service.title.replace(/\s+/g, '-').toLowerCase()}`}
      >
        <h3
          id={`service-title-${service.title.replace(/\s+/g, '-').toLowerCase()}`}
          className="mb-4 text-left font-serif text-title-lg font-bold"
        >
          {service.title}
        </h3>
        <p className="text-text-base leading-snug tracking-wide">{service.description}</p>
      </motion.section>
    </TiltCard>
  );
}
