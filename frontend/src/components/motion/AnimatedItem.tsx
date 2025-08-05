import type React from 'react';
import { motion, type Variants } from 'framer-motion';

interface AnimatedItemProps {
  index?: number;
  children: React.ReactNode;
  variants?: Variants;
  duration?: number;
  delay?: number;
  className?: string;
}

export default function AnimatedItem({
  children,
  variants,
  duration = 0.5,
  delay = 0,
  className = '',
}: AnimatedItemProps) {
  const defaultVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration, delay, ease: 'easeOut' },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={variants || defaultVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
