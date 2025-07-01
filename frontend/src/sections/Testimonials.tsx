// src/sections/Testimonials.tsx

import SectionContainer from '@/components/common/SectionContainer';
import SectionTitle from '@/components/common/SectionTitle';

const testimonials = [
  {
    name: 'Sophie M.',
    feedback:
      'Accueil chaleureux, conseils professionnels et un large choix de montures. Je recommande vivement La Lunetterie du Coin !',
  },
  {
    name: 'Jean-Luc D.',
    feedback:
      "Une équipe très compétente qui a su m'accompagner dans le choix de mes nouvelles lunettes. Service impeccable.",
  },
  {
    name: 'Camille R.',
    feedback:
      'Montage rapide et ajustements parfaits. Le service après-vente est au top, toujours disponible et très réactif.',
  },
];

export default function Testimonials() {
  return (
    <SectionContainer id="testimonials">
      <div className="mx-auto mb-8 max-w-7xl">
        <SectionTitle title="Ils nous font confiance" />
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 md:grid-cols-2">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.name}
            className="flex h-full flex-col border-4 border-purple bg-violet p-10 transition-all duration-300 hover:scale-[1.02]"
          >
            <p className="mb-10 text-lg italic leading-relaxed md:text-xl">
              &ldquo;{testimonial.feedback}&rdquo;
            </p>
            <p className="text-right font-serif text-xl font-bold md:text-2xl">
              - {testimonial.name}
            </p>
          </div>
        ))}
      </div>
    </SectionContainer>
  );
}
