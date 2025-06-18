import { motion } from 'framer-motion';

import SectionContainer from '@/components/common/SectionContainer';
import SectionTitle from '@/components/common/SectionTitle';
import EyeglassesIcon from '@/assets/ui/eyeglasses.svg?react';
import OphthalmologyIcon from '@/assets/ui/ophthalmology.svg?react';
import ShoppingCartIcon from '@/assets/ui/shopping_cart.svg?react';
import SymptomsIcon from '@/assets/ui/symptoms.svg?react';
import TiltCard from '@/components/motion/TiltCard';
import FadeInUp from '@/components/motion/FadeInUp';
import StaggerGroup from '@/components/motion/StaggerGroup';


const services = [
  {
    title: 'Lunettes neuves et d’occasion',
    description: 'Large choix de montures neuves et de seconde main, soigneusement sélectionnées.',
    icon: EyeglassesIcon,
  },
  {
    title: 'Lentilles de contact',
    description: 'Conseils personnalisés et adaptation pour tous types de lentilles.',
    icon: SymptomsIcon,
  },
  {
    title: 'Examens de vue',
    description: 'Contrôle visuel complet réalisé par un opticien diplômé.',
    icon: OphthalmologyIcon,
  },
  {
    title: 'Boutique en ligne (Vinted)',
    description: 'Retrouvez notre sélection de modèles sur Vinted.',
    icon: ShoppingCartIcon,
  },
];

export default function Services() {
  return (
    <SectionContainer id="services">
      <div className="mx-auto mb-16 max-w-7xl">
        <SectionTitle title="Nos Services" />
      </div>

      <StaggerGroup>
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 sm:grid-cols-2">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <FadeInUp key={service.title} delay={index * 0.2}>
                <TiltCard>
                  <div className="flex h-full flex-col items-start rounded-md border-2 border-primary bg-beige p-10 transition-all duration-300 hover:scale-[1.02]">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: -3 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                      className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10"
                    >
                      <Icon className="h-10 w-10 text-purple" />
                    </motion.div>

                    <h3 className="mb-2 font-serif text-[clamp(1.75rem,5vw,2.5rem)] font-bold leading-tight">
                      {service.title}
                    </h3>
                    <p className="mx-auto max-w-xs text-[clamp(1.2rem,3vw,1.4rem)] leading-snug text-primary/90">
                      {service.description}
                    </p>
                  </div>
                </TiltCard>
              </FadeInUp>
            );
          })}
        </div>
      </StaggerGroup>
    </SectionContainer>
  );
}