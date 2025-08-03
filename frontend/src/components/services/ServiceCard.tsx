import { motion } from 'framer-motion';

import TiltCard from '@/components/motion/TiltCard';
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

export default function ServiceCard({ service, className }: ServiceCardProps) {
  return (
    <TiltCard>
      <motion.section
        className={cn(
          'relative w-[clamp(18rem,42vw,120rem)] self-center flex flex-col rounded-card bg-purple/30 p-section-gap text-violet shadow-card backdrop-blur-2xl',
          className
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