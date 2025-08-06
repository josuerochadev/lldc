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
