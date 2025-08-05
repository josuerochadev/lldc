// src/components/motion/variants/fade.ts

/**
 * Options for the fade-in animation factory.
 */
export type FadeInOptions = {
  y?: number;
  x?: number;
  opacity?: number;
  stiffness?: number;
  damping?: number;
  scale?: number;
  duration?: number;
  delay?: number;
};

/**
 * Typing for a single variant state (hidden or visible).
 */
export type FadeVariant = {
  opacity: number;
  y: number;
  x: number;
  scale?: number;
};

/**
 * Typing for the transition state.
 */
export type FadeTransition = {
  type: string;
  stiffness: number;
  damping: number;
  duration?: number;
  delay?: number;
};

/**
 * Factory to generate flexible fade-in motion variants.
 * @param options - Animation configuration options.
 * @returns Fade-in variant object compatible with Framer Motion.
 */
export function makeFadeIn({
  y = 30,
  x = 0,
  opacity = 0,
  stiffness = 60,
  damping = 20,
  scale,
  duration,
  delay,
}: FadeInOptions = {}): { hidden: FadeVariant; visible: FadeVariant & { transition: FadeTransition } } {
  const hidden: FadeVariant = { opacity, y, x };
  if (scale !== undefined) hidden.scale = scale;

  const visible: FadeVariant & { transition: FadeTransition } = {
    opacity: 1,
    y: 0,
    x: 0,
    transition: {
      type: "spring",
      stiffness,
      damping,
      ...(duration !== undefined ? { duration } : {}),
      ...(delay !== undefined ? { delay } : {}),
    },
  };
  if (scale !== undefined) visible.scale = 1;

  return { hidden, visible };
}

// Ready-to-use presets
export const fadeInUp = makeFadeIn({ y: 30, stiffness: 60, damping: 20 });
export const menuFade = makeFadeIn({ y: 40, stiffness: 80, damping: 18 });
export const fadeInDown = makeFadeIn({ y: -30, stiffness: 60, damping: 20 });
export const fadeInLeft = makeFadeIn({ x: -30, stiffness: 60, damping: 20 });
export const fadeInRight = makeFadeIn({ x: 30, stiffness: 60, damping: 20 });