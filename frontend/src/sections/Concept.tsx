// sections/Concept.tsx
import SectionContainer from '@/components/common/SectionContainer';
import SectionTitle from '@/components/common/SectionTitle';
import SplitText from '@/components/motion/text/SplitText';
import { CONCEPT } from '@/config/constants';
import Picture from '@/components/common/Picture';
import AnimatedItem from '@/components/motion/AnimatedItem';

export default function Concept() {
  return (
    <SectionContainer id="concept">
      <SectionTitle title="Le Concept" />

      <SplitText
        text={CONCEPT}
        as="p"
        className="mt-4 font-serif text-title-md font-bold tracking-wider"
      />

      <div className="mx-auto grid max-w-content grid-cols-1 gap-section-gap py-container-y md:grid-cols-2">
        <AnimatedItem
          index={0}
          className="relative aspect-[2/3] overflow-hidden rounded-card"
          viewport={{ once: true, amount: 0.35 }}
          duration={0.6}
        >
          <Picture
            srcBase="/photos/glasses"
            fallbackSrc="/photos/glasses.jpg"
            alt="Sélection de montures exposées, éclairage doux et matériaux premium."
            className="h-full w-full object-cover"
          />
        </AnimatedItem>

        <AnimatedItem
          index={1}
          className="relative aspect-[2/3] overflow-hidden rounded-card"
          viewport={{ once: true, amount: 0.35 }}
          duration={0.6}
        >
          <Picture
            srcBase="/photos/romain"
            fallbackSrc="/photos/romain.jpg"
            alt="Romain en conseil client à la boutique, essayage de montures."
            className="h-full w-full object-cover"
          />
        </AnimatedItem>
      </div>
    </SectionContainer>
  );
}
