// src/components/motion/variants.ts

export const fadeInUpVariant = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

export const fadeInDownVariant = {
  hidden: {
    opacity: 0,
    y: -30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

export const fadeInWithDelay = (delay = 0.3, from: 'up' | 'down' = 'down') => ({
  hidden: {
    opacity: 0,
    y: from === 'down' ? -30 : 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay,
      duration: 0.8,
      ease: 'easeOut',
    },
  },
});
