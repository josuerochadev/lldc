import { motion } from 'framer-motion';
import { useMemo } from 'react';
import type { JSX } from 'react';

type Props = {
  text: string;
  delay?: number;
  baseDelay?: number;
  className?: string;
  splitBy?: 'word' | 'letter';
  preserveWordSpacing?: boolean;
  // eslint-disable-next-line no-unused-vars
  renderPart?: (part: string, index: number) => JSX.Element;
};

export default function RevealText({
  text,
  delay = 0,
  baseDelay = 0.06,
  className = '',
  splitBy = 'word',
  preserveWordSpacing = true,
  renderPart,
}: Props) {
  const parts = useMemo(() => {
    if (typeof text !== 'string') return [];
    return splitBy === 'letter' ? text.split('') : text.split(' ');
  }, [text, splitBy]);

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: baseDelay,
        delayChildren: delay,
      },
    },
  };

  const child = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      variants={container}
      className={className}
    >
      {parts.map((part, i) => {
        // Generate a unique key using the part and its position in the string
        const key =
          splitBy === 'letter'
            ? `${part}-${text.indexOf(part, i)}`
            : `${part}-${
                text
                  .split(' ')
                  .slice(0, i + 1)
                  .join(' ').length
              }`;
        return (
          <motion.span
            key={key}
            variants={child}
            className={
              splitBy === 'word' && preserveWordSpacing ? 'mr-[0.4em] inline-block' : 'inline-block'
            }
          >
            {renderPart ? renderPart(part, i) : part}
          </motion.span>
        );
      })}
    </motion.div>
  );
}
