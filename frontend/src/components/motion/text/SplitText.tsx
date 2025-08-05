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
      splitBy="letter" // ou "word" si besoin
      baseDelay={0.03}
      className={className}
      preserveWordSpacing={true}
    />
  );
}
