// src/sections/Contact.tsx

import SectionContainer from '@/components/common/SectionContainer';
import SectionTitle from '@/components/common/SectionTitle';
import ContactForm from '@/components/contact/ContactForm';

/**
 * Composant principal pour la section "Nous contacter" de la page.
 *
 * Affiche un conteneur stylisé avec un titre de section et un formulaire de contact.
 *
 * @component
 * @returns {JSX.Element} La section de contact à afficher.
 */
export default function Contact() {
  return (
    <SectionContainer id="contact">
      <SectionTitle title="Nous contacter" />
      <div className="mx-auto mb-title-gap max-w-4xl rounded-btn border-2 border-primary/80 bg-accent/60 px-container-x py-container-y shadow-card backdrop-blur-xl lg:max-w-5xl">
        <ContactForm />
      </div>
    </SectionContainer>
  );
}
