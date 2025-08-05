import type React from 'react';
import { useRef, useState } from 'react';

import Button from '@/components/common/Button';

type Status = 'idle' | 'sending' | 'success' | 'error';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xjkoodpw';

/**
 * Formulaire de contact permettant aux utilisateurs d'envoyer un message via un endpoint Formspree.
 *
 * Ce composant gère l'état du formulaire (envoi, succès, erreur), affiche des messages d'état accessibles,
 * et propose une validation personnalisée pour les champs nom, email et message.
 *
 * Fonctionnalités principales :
 * - Affichage de messages de succès ou d'erreur après soumission.
 * - Validation côté client avec messages personnalisés en français.
 * - Accessibilité améliorée grâce à l'utilisation de `aria-live` et du focus automatique sur les messages.
 * - Désactivation du bouton d'envoi pendant la soumission.
 *
 * @component
 * @example
 * <ContactForm />
 */

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');
  const messageRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    setError('');

    const form = e.target as HTMLFormElement;
    const data = new FormData(form);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });

      if (response.ok) {
        setStatus('success');
        form.reset();
        setTimeout(() => {
          messageRef.current?.focus();
        }, 100);
      } else {
        setStatus('error');
        setError('Une erreur est survenue. Vérifiez votre connexion ou réessayez plus tard.');
        setTimeout(() => {
          messageRef.current?.focus();
        }, 100);
      }
    } catch {
      setStatus('error');
      setError('Impossible de contacter le serveur. Veuillez réessayer plus tard.');
      setTimeout(() => {
        messageRef.current?.focus();
      }, 100);
    } finally {
      setStatus('idle');
    }
  };

  return (
    <>
      <div
        ref={messageRef}
        tabIndex={-1}
        // biome-ignore lint/a11y/useSemanticElements: <explanation>
        role="status"
        aria-live="polite"
        className="mb-4 outline-none"
      >
        {status === 'success' && (
          <div className="font-semibold text-green-700">✅ Votre message a bien été envoyé !</div>
        )}
        {status === 'error' && <div className="font-semibold text-red-700">{error}</div>}
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-word-gap">
        {/* Champ Nom */}
        <div className="flex flex-col">
          <label htmlFor="name" className="mb-2 font-bold">
            Nom
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            minLength={2}
            maxLength={50}
            className="rounded-btn border-2 border-purple p-4"
            placeholder="Votre nom"
            onInvalid={(e) =>
              (e.currentTarget as HTMLInputElement).setCustomValidity(
                'Veuillez entrer votre nom (2 caractères minimum).',
              )
            }
            onInput={(e) => (e.currentTarget as HTMLInputElement).setCustomValidity('')}
          />
        </div>

        {/* Champ Email */}
        <div className="flex flex-col">
          <label htmlFor="email" className="mb-2 font-bold">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            maxLength={64}
            className="rounded-btn border-2 border-purple p-4"
            placeholder="Votre email"
            onInvalid={(e) =>
              (e.currentTarget as HTMLInputElement).setCustomValidity(
                'Veuillez entrer une adresse email valide.',
              )
            }
            onInput={(e) => (e.currentTarget as HTMLInputElement).setCustomValidity('')}
          />
        </div>

        {/* Champ Message */}
        <div className="flex flex-col">
          <label htmlFor="message" className="mb-2 font-bold">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            minLength={10}
            maxLength={1000}
            className="rounded-btn border-2 border-purple p-4"
            placeholder="Votre message..."
            onInvalid={(e) =>
              (e.currentTarget as HTMLTextAreaElement).setCustomValidity(
                'Votre message doit contenir au moins 10 caractères.',
              )
            }
            onInput={(e) => (e.currentTarget as HTMLTextAreaElement).setCustomValidity('')}
          />
        </div>

        {/* Bouton */}
        <Button type="submit" disabled={status === 'sending'} className="self-start">
          {status === 'sending' ? 'Envoi en cours...' : 'Envoyer'}
        </Button>
      </form>
    </>
  );
}
