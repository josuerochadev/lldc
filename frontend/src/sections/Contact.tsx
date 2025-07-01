// src/sections/Contact.tsx

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import SectionContainer from '@/components/common/SectionContainer';
import SectionTitle from '@/components/common/SectionTitle';
import Button from '@/components/common/Button';

type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>();

  const [success, setSuccess] = useState(false);

  const onSubmit = async (data: ContactFormData) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'envoi du message.");
      }

      setSuccess(true);
      reset();
    } catch (err) {
      console.error(err);
      alert('Une erreur est survenue. Veuillez réessayer plus tard.');
    }
  };

  return (
    <SectionContainer id="contact">
      <div className="mx-auto mb-8 max-w-7xl">
        <SectionTitle title="Nous contacter" />
      </div>

      <div className="mx-auto max-w-2xl rounded-md border-2 border-purple bg-violet/50 p-8 shadow-lg backdrop-blur-xl">
        {success && (
          <div className="mb-6 font-semibold text-green-700">Votre message a bien été envoyé !</div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
          <div className="flex flex-col">
            <label htmlFor="name" className="mb-2 font-bold">
              Nom
            </label>
            <input
              id="name"
              type="text"
              className="rounded-md border-2 border-purple p-4"
              {...register('name', { required: 'Le nom est requis' })}
            />
            {errors.name && <span className="mt-1 text-red-600">{errors.name.message}</span>}
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="mb-2 font-bold">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="rounded-md border-2 border-purple p-4"
              {...register('email', {
                required: "L'email est requis",
                pattern: { value: /^\S+@\S+$/i, message: 'Email invalide' },
              })}
            />
            {errors.email && <span className="mt-1 text-red-600">{errors.email.message}</span>}
          </div>

          <div className="flex flex-col">
            <label htmlFor="message" className="mb-2 font-bold">
              Message
            </label>
            <textarea
              id="message"
              className="rounded-md border-2 border-purple p-4"
              rows={5}
              {...register('message', { required: 'Le message est requis' })}
            />
            {errors.message && <span className="mt-1 text-red-600">{errors.message.message}</span>}
          </div>

          <Button
            type="submit"
            className="self-start transition-all duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange focus:ring-offset-2 active:scale-95"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Envoi en cours...' : 'Envoyer'}
          </Button>
        </form>
      </div>
    </SectionContainer>
  );
}
