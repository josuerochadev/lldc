// src/components/motion/StaggerGroup.tsx

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

export default function StaggerGroup({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ staggerChildren: 0.2 }}
      variants={{
        hidden: {},
        visible: {},
      }}
    >
      {children}
    </motion.div>
  );
}
