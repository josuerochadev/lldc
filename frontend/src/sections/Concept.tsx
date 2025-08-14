// sections/Concept.tsx
import SectionContainer from '@/components/common/SectionContainer';
import SectionTitle from '@/components/common/SectionTitle';
import SplitText from '@/components/motion/text/SplitText';
import { CONCEPT } from '@/config/constants';
import Picture from '@/components/common/Picture';

/**
 * composant React qui affiche la section "Le Concept" de la page.
 */
export default function Concept() {
  return (
    <SectionContainer id="concept">
      <SectionTitle title="Le Concept" />

      {/* Texte du concept */}
      <SplitText
        text={CONCEPT}
        as="p"
        className="mt-4 font-serif text-title-md font-bold tracking-wider"
      />

      {/* Galerie 2 images (verticales) : 1 col -> 2 cols */}
      <div className="mx-auto py-container-y grid max-w-content grid-cols-1 gap-section-gap md:grid-cols-2">
        {/* Photo 1 */}
        <div className="relative overflow-hidden rounded-card aspect-[2/3]">
          <Picture
            srcBase="/photos/glasses"
            fallbackSrc="/photos/glasses.jpg"
            alt="Sélection de montures exposées, éclairage doux et matériaux premium."
            // Sous le fold → lazy par défaut (priority=false)
            className="w-full h-full object-cover"
          />
        </div>

        {/* Photo 2 */}
        <div className="relative overflow-hidden rounded-2xl aspect-[2/3]">
          <Picture
            srcBase="/photos/romain"
            fallbackSrc="/photos/romain.jpg"
            alt="Romain en conseil client à la boutique, essayage de montures."
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </SectionContainer>
  );
}