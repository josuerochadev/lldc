import { motion } from 'framer-motion';
import type { ComponentPropsWithoutRef, ElementType, JSX } from 'react';

type SplitTextProps<T extends ElementType = 'p'> = {
  text: string;
  className?: string;
  as?: T;
} & ComponentPropsWithoutRef<T>;

/**
 * Composant React animé pour révéler un texte mot par mot avec Framer Motion.
 * Possibilité de personnaliser la balise HTML (`as`) pour assurer la sémantique (p, span, h1…).
 *
 * @template T - Type de l’élément HTML utilisé (par défaut, <p>).
 * @param {string} text - Texte à afficher et animer.
 * @param {string} [className] - Classes Tailwind CSS optionnelles.
 * @param {T} [as] - Balise HTML utilisée (p, h2, span, etc.)
 *
 * @returns {JSX.Element} Composant animé et sémantiquement correct.
 */

export default function SplitText<T extends ElementType = 'p'>({
  text,
  className = '',
  as,
}: SplitTextProps<T>): JSX.Element {
  const Element = as || 'p';
  const words = text.split(' ');

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const child = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut' as const,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={container}
      className={className}
      aria-label={text} // pour les screenreaders
    >
      <Element className="sr-only">{text}</Element>

      {words.map((word, index) => {
        const key = `${word}-${index}-${Math.random().toString(36).substring(2, 6)}`;
        return (
          <motion.span
            key={key}
            className="mr-word-gap inline-block"
            variants={child}
            aria-hidden="true"
          >
            {word}
          </motion.span>
        );
      })}
    </motion.div>
  );
}