import type { ReactNode } from 'react';

import FadeInUp from './FadeInUp';

interface AnimatedItemProps {
  children: ReactNode;
  index?: number; // Optionnel : position dans la séquence
  baseDelay?: number; // Valeur par défaut 0.2s si non précisé
  delay?: number; // Pour override manuel si besoin
  // ...autres props personnalisées à venir (direction, etc.)
}

const AnimatedItem = ({
  children,
  index = 0,
  baseDelay = 0.2,
  delay,
  ...rest
}: AnimatedItemProps) => (
  <FadeInUp delay={delay ?? baseDelay * index} {...rest}>
    {children}
  </FadeInUp>
);

export default AnimatedItem;
