// src/components/motion/AnimatedItem.tsx

import type React from "react";
import { motion, type Variants } from "framer-motion";

import { fadeInUp } from "./variants/fade";

export type AnimatedItemProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  index?: number; // Pour le stagger/cascade
  variant?: Variants; // Custom variant si besoin (ex: fadeInDown, etc.)
  viewport?: object; // Pour customiser la détection de visibilité
};

const DEFAULT_EASE = [0.25, 0.46, 0.45, 0.94];

export default function AnimatedItem({
  children,
  className,
  delay = 0,
  duration = 0.6,
  index = 0,
  variant = fadeInUp,
  viewport = { once: true, amount: 0.3 },
}: AnimatedItemProps) {
  const calculatedDelay = delay + (index ? index * 0.08 : 0);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={variant}
      transition={{
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