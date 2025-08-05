// SectionTitle.tsx

import SectionTitleReveal from '../motion/text/SectionTitleReveal';

type SectionTitleProps = {
  title: string;
};

/**
 * Affiche un titre stylisé avec une animation word-by-word.
 */
const SectionTitle = ({ title }: SectionTitleProps) => {
  return (
    <SectionTitleReveal as="h2" className="mb-title-gap text-title-xl uppercase" title={title} />
  );
};

export default SectionTitle;
