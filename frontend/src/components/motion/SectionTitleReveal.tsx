// src/components/motion/SectionTitleReveal.tsx

import type React from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import type { JSX, ReactNode } from 'react';
import { useEffect, useRef } from 'react';

import { fadeInDownVariant } from './variants';

interface Props {
  children: ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export default function SectionTitleReveal({ children, className = '', as = 'div' }: Props) {
  const MotionTag = (motion as unknown as Record<string, React.ElementType>)[as];
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) controls.start('visible');
  }, [inView, controls]);

  return (
    <MotionTag
      ref={ref}
      className={className}
      initial="hidden"
      animate={controls}
      variants={fadeInDownVariant}
    >
      {children}
    </MotionTag>
  );
}
