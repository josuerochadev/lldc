// src/components/motion/FadeInUpDown.tsx

import type React from 'react';
import { motion } from 'framer-motion';
import type { JSX, ReactNode } from 'react';

type FadeInUpDownProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down';
  as?: keyof JSX.IntrinsicElements;
};

export default function FadeInUpDown({
  children,
  className = '',
  delay = 0,
  direction = 'down',
  as = 'div',
}: FadeInUpDownProps) {
  const MotionTag = (motion as unknown as Record<string, React.ElementType>)[as];
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: direction === 'down' ? -50 : 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </MotionTag>
  );
}
