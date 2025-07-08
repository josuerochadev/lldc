// src/components/motion/MenuButtonEntrance.tsx

import type React from 'react';
import { motion } from 'framer-motion';
import type { ReactNode, JSX } from 'react';

import { fadeInWithDelay } from './variants';

interface Props {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export default function MenuButtonEntrance({
  children,
  delay = 1.2,
  className = '',
  as = 'div',
}: Props) {
  const MotionTag = (motion as unknown as Record<string, React.ElementType>)[as];

  return (
    <MotionTag
      className={className}
      initial="hidden"
      animate="visible"
      variants={fadeInWithDelay(delay, 'down')}
    >
      {children}
    </MotionTag>
  );
}
