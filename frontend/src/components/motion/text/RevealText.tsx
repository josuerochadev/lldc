/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion';
import { useMemo } from 'react';
import type { JSX } from 'react';

type Props = {
  text: string;
  delay?: number;
  baseDelay?: number;
  className?: string;
  splitBy?: 'word' | 'letter';
  renderPart?: (part: string, index: number) => JSX.Element;
  preserveWordSpacing?: boolean;
};

const DEFAULT_EASE = [0.25, 0.46, 0.45, 0.94];

export default function RevealText({
  text,
  delay = 0,
  baseDelay = 0.05,
  splitBy = 'word',
  className = '',
  renderPart,
  preserveWordSpacing,
}: Props) {
  const parts = useMemo(() => {
    if (typeof text !== 'string') return [];
    return splitBy === 'letter' ? text.split('') : text.split(' ');
  }, [text, splitBy]);

  return (
    <span className={className}>
      {parts.map((part, i) => (
        <motion.span
          key={`${part}-${// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
i}`}
          initial={{ opacity: 0, y: 30 }}
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: delay + i * baseDelay,
            duration: 0.5,
            ease: DEFAULT_EASE,
          }}
          style={{ display: 'inline-block' }}
        >
          {renderPart ? renderPart(part, i) : part}
          {/* 🧠 Ajout seulement si splitBy="word" et que preserveWordSpacing est vrai */}
          {splitBy === 'word' && preserveWordSpacing && (
            <span className="inline-block">&nbsp;</span>
          )}
        </motion.span>
      ))}
    </span>
  );
}
