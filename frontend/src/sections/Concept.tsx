// src/sections/LeConcept.tsx

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import SectionContainer from '@/components/common/SectionContainer';
import SectionTitle from '@/components/common/SectionTitle';

const keywords = [
  'Écoresponsable',
  'Indépendant',
  'Seconde main',
  'Recyclage',
  'Durable',
  'Économie circulaire',
  'Stylé',
  'Accessible',
  'Local',
];

export default function LeConcept() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % keywords.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <SectionContainer id="concept">
      <div className="mx-auto mb-16 max-w-7xl">
        <SectionTitle title="Le Concept" />
      </div>

      <div className="mx-auto flex max-w-5xl flex-col items-center justify-center gap-12 sm:flex-row">
        <div className="w-full sm:w-1/2 aspect-[9/16] overflow-hidden rounded-lg border-2 border-primary bg-black">
          <video
            src="/placeholder-video.mp4"
            poster="/poster-image.jpg"
            className="h-full w-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          />
        </div>

        <div className="w-full sm:w-1/2 text-center sm:text-left">
          <AnimatePresence mode="wait">
            <motion.h3
              key={keywords[index]}
              className="text-[clamp(2rem,4vw,3rem)] font-serif font-bold lowercase"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {keywords[index]}
            </motion.h3>
          </AnimatePresence>
        </div>
      </div>
    </SectionContainer>
  );
}
