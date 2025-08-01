// src/sections/Contact.tsx

import type React from 'react';
import { useState } from 'react';

import SectionContainer from '@/components/common/SectionContainer';
import SectionTitle from '@/components/common/SectionTitle';
import Button from '@/components/common/Button';

export default function Contact() {
  const [success, setSuccess] = useState(false);
  const [sending, setSending] = useState(false);

  // endpoint for Formspree
  const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xjkoodpw';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);

    const form = e.target as HTMLFormElement;
    const data = new FormData(form);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });

      if (response.ok) {
        setSuccess(true);
        form.reset();
      } else {
        alert("Erreur lors de l'envoi, essayez plus tard.");
      }
    } catch {
      alert('Erreur de connexion.');
    } finally {
      setSending(false);
    }
  };

  return (
    <SectionContainer id="contact">
      <SectionTitle title="Nous contacter" />

      <div className="mx-auto max-w-2xl mb-title-gap rounded-btn border-2 border-purple bg-violet/45 py-container-y px-container-x shadow-card backdrop-blur-xl">
        {success ? (
          <div className="font-semibold text-green-700">Votre message a bien été envoyé !</div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-word-gap">
            <div className="flex flex-col">
              <label htmlFor="name" className="mb-2 font-bold">
                Nom
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className="rounded-btn border-2 border-purple p-4"
                required
                placeholder="Votre nom"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="email" className="mb-2 font-bold">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="rounded-btn border-2 border-purple p-4"
                required
                placeholder="Votre email"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="message" className="mb-2 font-bold">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                className="rounded-btn border-2 border-purple p-4"
                rows={5}
                required
                placeholder="Votre message..."
              />
            </div>

            <Button type="submit" disabled={sending} className="self-start">
              {sending ? 'Envoi en cours...' : 'Envoyer'}
            </Button>
          </form>
        )}
      </div>
    </SectionContainer>
  );
}
