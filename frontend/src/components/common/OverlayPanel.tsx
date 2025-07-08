// components/common/OverlayPanel.tsx
import { AnimatePresence, motion } from 'framer-motion';
import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

type OverlayPanelProps = {
  title: string;
  summary?: string;
  details?: string;
  expanded?: boolean;
  expandable?: boolean;
  buttonLabel?: string;
  className?: string;
  children?: ReactNode;
};

export default function OverlayPanel({
  title,
  summary,
  details,
  expanded = false,
  expandable = false,
  buttonLabel = 'En savoir plus',
  className = '',
  children,
}: OverlayPanelProps) {
  return (
    <motion.div
      className={cn(
        'absolute inset-4 z-10 flex flex-col justify-start rounded-card bg-purple/30 p-section-gap text-violet backdrop-blur-2xl transition-all duration-500',
        className,
      )}
      initial={false}
      animate={{ height: expandable ? (expanded ? '95%' : '45%') : 'auto' }}
      transition={{ type: 'spring', damping: 20, stiffness: 200 }}
    >
      <h3 className="mb-4 font-serif text-title-md text-left font-bold">{title}</h3>

      {children}

      {expandable && (
        <AnimatePresence mode="wait">
          <motion.div
            key={expanded ? 'details' : 'summary'}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
          >
            <p className="max-w-[90%] whitespace-pre-line text-left leading-snug">
              {expanded ? details : summary}
            </p>
          </motion.div>
        </AnimatePresence>
      )}

      {expandable && (
        <div className="mt-auto flex justify-center">
          <button type="button" className="font-bold underline">
            {expanded ? 'Réduire' : buttonLabel}
          </button>
        </div>
      )}
    </motion.div>
  );
}
