import type { ReactNode } from 'react';

import FadeInUp from './FadeInUp';

/**
 * Wrapper utilitaire pour appliquer une animation FadeInUp séquencée, généralement utilisée pour animer des listes ou des éléments de section.
 *
 * @component
 * @param {object} props
 * @param {React.ReactNode} props.children - Les éléments enfants à animer.
 * @param {number} [props.index=0] - L’index de l’élément pour incrémenter le délai automatiquement.
 * @param {number} [props.baseDelay=0.2] - Le délai de base appliqué par index.
 * @param {number} [props.delay] - Délai custom, surcharge le calcul automatique.
 * @returns {JSX.Element}
 */

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
