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

      <SplitText
        text={CONCEPT}
        as="p"
        className="font-serif text-title-md font-bold tracking-wider"
      />

      {/* Wrapper ratio pour éviter tout CLS */}
      <div className="relative py-container-y aspect-[3/2] overflow-hidden rounded-card">
        <Picture
          srcBase="/photos/photo"
          fallbackSrc="/photos/photo.png"
          disableSources={true} // ← TEMPORAIRE : on remettra false après génération AVIF/WebP
          alt="Intérieur de la boutique : présentoirs élégants, montures mises en valeur, ambiance lumineuse et chaleureuse."
          priority={false}
          className="h-full w-full object-cover"
        />
      </div>
    </SectionContainer>
  );
}
