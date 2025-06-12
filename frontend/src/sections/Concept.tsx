// src/sections/Concept.tsx

import SectionContainer from '@/components/common/SectionContainer';

export default function Concept() {
  return (
    <SectionContainer id="concept">
      <div className="mx-auto mb-20 max-w-7xl text-center">
        <h2 className="text-4xl font-extrabold md:text-6xl">Notre Concept</h2>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 border-4 border-primary bg-beige p-10 md:grid-cols-2">
        {/* Texte */}
        <div className="flex flex-col gap-8 text-left">
          <p className="text-lg leading-relaxed md:text-xl">
            Chez La Lunetterie du Coin, nous croyons qu’une paire de lunettes va bien au-delà de la
            simple correction visuelle.
          </p>
          <p className="text-lg leading-relaxed md:text-xl">
            Nous vous proposons une approche personnalisée, alliant expertise, authenticité et
            respect de l’environnement.
          </p>
          <p className="text-lg leading-relaxed md:text-xl">
            Notre objectif : vous offrir un accompagnement sur-mesure et une sélection pointue de
            montures de qualité, dans un cadre chaleureux.
          </p>
        </div>

        {/* Image illustrative */}
        <div className="flex justify-center">
          <img
            src="/src/assets/images/concept.jpg"
            alt="Notre boutique"
            className="h-auto max-h-[400px] w-full object-cover"
          />
        </div>
      </div>
    </SectionContainer>
  );
}
