import type React from 'react';
import { motion, type Variants } from 'framer-motion';

import { fadeInUp } from './variants/fade';

export type AnimatedItemProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  index?: number;
  variant?: Variants;
  viewport?: object;
};

const DEFAULT_EASE = [0.25, 0.46, 0.45, 0.94];
const DEFAULT_STAGGER = 0.12; // 120ms stagger
const DEFAULT_STIFFNESS = 60;
const DEFAULT_DAMPING = 20;

/**
 * Composant React pour animer un élément enfant avec Framer Motion.
 *
 * @param {object} props - Les propriétés du composant.
 * @param {React.ReactNode} props.children - Les éléments enfants à animer.
 * @param {string} [props.className] - Classe(s) CSS optionnelle(s) à appliquer au conteneur animé.
 * @param {number} [props.delay=0] - Délai initial (en secondes) avant le début de l'animation.
 * @param {number} [props.duration=0.6] - Durée de l'animation (en secondes).
 * @param {number} [props.index=0] - Index de l'élément, utilisé pour calculer le délai de décalage lors d'une animation en cascade.
 * @param {object} [props.variant=fadeInUp] - Objet variant Framer Motion définissant les états d'animation.
 * @param {object} [props.viewport={ once: true, amount: 0.4 }] - Options de déclenchement de l'animation selon la visibilité dans la fenêtre.
 *
 * @returns {JSX.Element} Élément <motion.div> animé contenant les enfants.
 *
 * @example
 * <AnimatedItem index={2} className="my-class">
 *   <p>Texte animé</p>
 * </AnimatedItem>
 */
export default function AnimatedItem({
  children,
  className,
  delay = 0,
  duration = 0.6,
  index = 0,
  variant = fadeInUp,
  viewport = { once: true, amount: 0.4 },
}: AnimatedItemProps) {
  const calculatedDelay = delay + index * DEFAULT_STAGGER;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={variant}
      transition={{
        type: 'spring',
        stiffness: DEFAULT_STIFFNESS,
        damping: DEFAULT_DAMPING,
        duration,
        delay: calculatedDelay,
        ease: DEFAULT_EASE,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
