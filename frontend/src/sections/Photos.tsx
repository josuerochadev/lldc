import SectionContainer from '@/components/common/SectionContainer';
import SectionTitle from '@/components/common/SectionTitle';

// src/sections/Photos.tsx
export default function Photos() {
  return (
    <SectionContainer id="photos">
      <div className="mx-auto mb-16 max-w-7xl">
        <SectionTitle title="La Boutique" />
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
