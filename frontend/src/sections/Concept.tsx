// sections/Concept.tsx
import { useReducedMotion } from 'framer-motion';

import SectionContainer from '@/components/common/SectionContainer';
import SectionTitle from '@/components/common/SectionTitle';
import SplitText from '@/components/motion/text/SplitText';
import { CONCEPT } from '@/config/constants';
import Picture from '@/components/common/Picture';
import AnimatedItem from '@/components/motion/AnimatedItem';
import { fadeInUp } from '@/components/motion/variants/fade';
import TiltCard from '@/components/motion/interactive/TiltCard';

export default function Concept() {
  const reduce = useReducedMotion();

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
      <div className="mx-auto grid max-w-content grid-cols-1 gap-section-gap py-container-y md:grid-cols-2">
        {/* Photo 1 */}
        <AnimatedItem
          index={0} // stagger auto (DEFAULT_STAGGER = 0.12s)
          variant={fadeInUp}
          className="relative aspect-[2/3] overflow-hidden rounded-card will-change-transform"
          viewport={{ once: true, amount: 0.35 }}
          duration={0.6}
        >
          {reduce ? (
            <Picture
              srcBase="/photos/glasses"
              fallbackSrc="/photos/glasses.jpg"
              alt="Sélection de montures exposées, éclairage doux et matériaux premium."
              className="h-full w-full object-cover"
            />
          ) : (
            <TiltCard>
              <Picture
                srcBase="/photos/glasses"
                fallbackSrc="/photos/glasses.jpg"
                alt="Sélection de montures exposées, éclairage doux et matériaux premium."
                className="h-full w-full object-cover"
              />
            </TiltCard>
          )}
        </AnimatedItem>

        {/* Photo 2 */}
        <AnimatedItem
          index={1} // +120ms vs la première
          variant={fadeInUp}
          className="relative aspect-[2/3] overflow-hidden rounded-card will-change-transform"
          viewport={{ once: true, amount: 0.35 }}
          duration={0.6}
        >
          {reduce ? (
            <Picture
              srcBase="/photos/romain"
              fallbackSrc="/photos/romain.jpg"
              alt="Romain en conseil client à la boutique, essayage de montures."
              className="h-full w-full object-cover"
            />
          ) : (
            <TiltCard>
              <Picture
                srcBase="/photos/romain"
                fallbackSrc="/photos/romain.jpg"
                alt="Romain en conseil client à la boutique, essayage de montures."
                className="h-full w-full object-cover"
              />
            </TiltCard>
          )}
        </AnimatedItem>
      </div>
    </SectionContainer>
  );
}
