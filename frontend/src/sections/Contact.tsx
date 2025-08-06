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
      <div className="mx-auto mb-title-gap max-w-2xl rounded-btn border-2 border-purple bg-violet/45 px-container-x pb-container-y pt-5 shadow-card backdrop-blur-xl">
        <ContactForm />
      </div>
    </SectionContainer>
  );
}
