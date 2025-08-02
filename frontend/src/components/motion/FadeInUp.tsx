// src/components/motion/FadeInUp.tsx

import type React from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';

/**
 * Anime le contenu en fade-in avec un léger déplacement vers le haut lors de l'entrée dans le viewport.
 *
 * @component
 * @param {object} props
 * @param {React.ReactNode} props.children - Les éléments enfants à animer.
 * @param {number} [props.delay=0.2] - Le délai d’apparition de l’animation (en secondes).
 * @param {string} [props.className] - Classes CSS additionnelles.
 * @returns {JSX.Element}
 */

type FadeInUpProps = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
};

export default function FadeInUp({ children, delay = 0.2, className = '' }: FadeInUpProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [inView, controls]);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay } },
      }}
    >
      {children}
    </motion.div>
  );
}
