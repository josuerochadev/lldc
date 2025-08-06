// src/components/motion/SplitText.tsx
import type { JSX } from 'react';

import RevealText from './RevealText';

type Props = {
  text: string;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
};

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
