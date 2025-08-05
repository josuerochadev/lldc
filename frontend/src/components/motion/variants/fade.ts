// src/components/motion/variants/fade.ts

type FadeInOptions = {
  y?: number;
  x?: number;
  opacity?: number;
  scale?: number;
};

export function makeFadeIn({ y = 30, x = 0, opacity = 0, scale }: FadeInOptions = {}) {
  const hidden: {
    opacity: number;
    y: number;
    x: number;
    scale?: number;
  } = { opacity, y, x };
  if (scale !== undefined) hidden.scale = scale;

  const visible: {
    opacity: number;
    y: number;
    x: number;
    scale?: number;
  } = {
    opacity: 1,
    y: 0,
    x: 0,
  };
  if (scale !== undefined) visible.scale = 1;

  return { hidden, visible };
}

// Prêts à l’emploi pour usages courants
export const fadeInUp = makeFadeIn({ y: 30 });
export const menuFade = makeFadeIn({ y: 40 });
export const fadeInDown = makeFadeIn({ y: -30 });
export const fadeInLeft = makeFadeIn({ x: -30 });
export const fadeInRight = makeFadeIn({ x: 30 });
