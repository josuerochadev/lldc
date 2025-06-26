import { motion, useAnimation, useInView } from 'framer-motion';
import type { ReactNode } from 'react';
import { useEffect, useRef } from 'react';

type FadeInUpDownProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down';
  as?: 'div' | 'section' | 'article' | 'span' | 'h1' | 'h2' | 'h3' | 'p';
};

export default function FadeInUpDown({
  children,
  className = '',
  delay = 0,
  direction = 'down',
  as = 'div',
}: FadeInUpDownProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [inView, controls]);

  const MotionTag = motion[as] as typeof motion.div;

  return (
    <MotionTag
      ref={ref}
      className={className}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: direction === 'down' ? -50 : 50 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, delay },
        },
      }}
    >
      {children}
    </MotionTag>
  );
}
