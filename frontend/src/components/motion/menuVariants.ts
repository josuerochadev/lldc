// src/config/variants/menuVariants.ts

export const menuStaggerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

export const menuItemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};
