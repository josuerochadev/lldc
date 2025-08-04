import SectionContainer from '@/components/common/SectionContainer';
import SectionTitle from '@/components/common/SectionTitle';
import SplitText from '@/components/motion/SplitText';
import { CONCEPT } from '@/config/constants';

/**
 * composant React qui affiche la section "Le Concept" de la page.
 *
 * Ce composant utilise `SectionContainer` pour structurer la section,
 * `SectionTitle` pour afficher le titre, et `SplitText` pour présenter
 * le texte du concept avec un style spécifique.
 *
 * @component
 * @returns {JSX.Element} Élément JSX représentant la section concept.
 */
export default function Concept() {
  return (
    <SectionContainer id="concept">
      <SectionTitle title="Le Concept" />

      <SplitText
        text={CONCEPT}
        as="p"
        className="font-serif text-title-md font-bold tracking-wider"
      />
    </SectionContainer>
  );
}
