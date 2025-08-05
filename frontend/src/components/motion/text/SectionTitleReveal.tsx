import type { JSX } from 'react';

import RevealText from './RevealText';

type Props = {
  title: string;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
};

/**
 * Affiche un texte avec animation mot à mot et styles alternés (thin / bold).
 */
export default function SectionTitleReveal({ title, className = '', as: Tag = 'h2' }: Props) {
  return (
    <Tag className={className}>
      <RevealText
        text={title}
        splitBy="word"
        baseDelay={0.1}
        renderPart={(word, index = 0) => (
          <span className={index % 2 === 0 ? 'font-thin' : 'font-extrabold'}>{word}</span>
        )}
        preserveWordSpacing={false} // ✅ ou par défaut non passé
      />
    </Tag>
  );
}
