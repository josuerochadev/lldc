import SectionContainer from '@/components/common/SectionContainer';

// src/sections/Photos.tsx
export default function Photos() {
  return (
    <SectionContainer id="photos">
      <div className="mx-auto mb-20 max-w-7xl text-center">
        <h2 className="text-4xl font-extrabold md:text-6xl">La Boutique</h2>
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="w-full border-4 border-primary bg-beige p-10">
          <img
            src="/public/photo.png" // adapte si besoin le chemin
            alt="Intérieur de la boutique"
            className="h-auto max-h-[600px] w-full object-cover"
          />
        </div>
      </div>
    </SectionContainer>
  );
}
