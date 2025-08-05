import { motion, type Variants } from 'framer-motion';
import type { JSX } from 'react';

type Props = {
  text: string;
  delay?: number;
  baseDelay?: number;
  className?: string;
  splitBy?: 'word' | 'letter';
  renderPart?: (part: string, index?: number) => JSX.Element;
};

const createTextVariants = (delay: number, y = 30): Variants => ({
  hidden: { opacity: 0, y },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: delay + i, duration: 0.5, ease: 'easeOut' },
  }),
});

export default function RevealText({
  text,
  delay = 0,
  baseDelay = 0.05,
  splitBy = 'word',
  className = '',
  renderPart,
}: Props) {
  if (typeof text !== 'string') {
    console.warn('RevealText: `text` doit être une string. Reçu :', typeof text);
    return null;
  }

  const parts = splitBy === 'letter' ? text.split('') : text.split(' ');

  return (
    <span className={className}>
      {parts.map((part, i) => (
        <motion.span
          key={`${part}-${i}`} // ✅ clé unique combinée
          variants={createTextVariants(delay, 30)}
          initial="hidden"
          animate="visible"
          custom={i * baseDelay}
          style={{ display: 'inline-block' }}
        >
          {renderPart ? renderPart(part, i) : <>{part}</>}
          {splitBy === 'word' && ' '}
        </motion.span>
      ))}
    </span>
  );
}
