// src/components/motion/SplitText.tsx
import type { JSX } from 'react';

import RevealText from './RevealText';

type Props = {
  text: string;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
};

/**
 * Composant React pour afficher un texte avec une animation de révélation mot par mot.
 *
 * @param text - Le texte à afficher et à animer.
 * @param className - (Optionnel) Classe(s) CSS supplémentaire(s) à appliquer au conteneur.
 *
 * Ce composant utilise `RevealText` pour animer chaque mot du texte séparément,
 * tout en préservant l'espacement entre les mots.
 * Chaque mot est encapsulé dans une balise `<span>` avec la classe `inline-block`.
 */
export default function SplitText({ text, className = '' }: Props) {
  return (
    <RevealText
      text={text}
      splitBy="word"
      className={className}
      baseDelay={0.1}
      preserveWordSpacing={true} // ✅ garantit l’espace entre les mots
      renderPart={(word) => <span className="inline-block">{word}</span>}
    />
  );
}
