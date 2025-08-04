// src/sections/Contact.tsx

import SectionContainer from '@/components/common/SectionContainer';
import SectionTitle from '@/components/common/SectionTitle';
import ContactForm from '@/components/contact/ContactForm';

export default function Contact() {
  return (
    <SectionContainer id="contact">
      <SectionTitle title="Nous contacter" />
      <div className="mx-auto mb-title-gap max-w-2xl rounded-btn border-2 border-purple bg-violet/45 px-container-x py-container-y shadow-card backdrop-blur-xl">
        <ContactForm />
      </div>
    </SectionContainer>
  );
}