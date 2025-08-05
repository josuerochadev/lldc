// src/components/motion/SplitText.tsx

import type { JSX } from 'react';

import RevealText from './RevealText';

type Props = {
  text: string;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
};

/**
 * Affiche un texte animé lettre par lettre ou mot à mot pour un effet de reveal.
 *
 * @param {object} props
 * @param {string} props.text - Le texte à afficher.
 * @param {string} [props.className] - Classes CSS additionnelles.
 */
export default function SplitText({ text, className = '' }: Props) {
  return <RevealText text={text} splitBy="letter" className={className} />;
}
