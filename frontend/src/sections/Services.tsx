// src/sections/Services.tsx

import SectionContainer from '@/components/common/SectionContainer';

const services = [
  {
    title: 'Examen de la vue',
    description: 'Un contrôle complet pour adapter votre correction.',
  },
  {
    title: 'Conseils personnalisés',
    description: 'Des recommandations sur-mesure selon vos besoins et votre style.',
  },
  {
    title: 'Réparations & ajustements',
    description: "Nous assurons l'entretien, les réglages et les petites réparations.",
  },
  {
    title: 'Garantie et suivi',
    description: "Votre confort est notre priorité avec un suivi après l'achat.",
  },
  {
    title: 'Montage sur-mesure',
    description: 'Un montage précis et artisanal de vos verres et montures.',
  },
  {
    title: 'Accompagnement mutuelle',
    description: 'Aide dans la gestion de vos remboursements et démarches administratives.',
  },
];

export default function Services() {
  return (
    <SectionContainer id="services">
      <div className="mx-auto mb-20 max-w-7xl text-center">
        <h2 className="text-4xl font-extrabold md:text-6xl">Nos Services</h2>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <div
            key={service.title}
            className="flex h-full flex-col border-4 border-primary bg-beige p-10 transition-all duration-300 hover:scale-[1.02]"
          >
            <h3 className="mb-6 font-serif text-2xl font-bold md:text-3xl">{service.title}</h3>
            <p className="text-lg leading-relaxed md:text-xl">{service.description}</p>
          </div>
        ))}
      </div>
    </SectionContainer>
  );
}
