// src/sections/Appointment.tsx

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';

import SectionContainer from '@/components/common/SectionContainer';
import SectionTitle from '@/components/common/SectionTitle';

type AppointmentFormData = {
  name: string;
  email: string;
  phone: string;
  preferredNotification: 'email' | 'sms' | 'both';
  startsAt: string;
};

type Slot = {
  startsAt: string;
  endsAt: string;
};

export default function Appointment() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AppointmentFormData>();

  const [success, setSuccess] = useState(false);

  const {
    data: slots,
    isLoading,
    isError,
  } = useQuery<Slot[]>({
    queryKey: ['planning'],
    queryFn: async () => {
      const res = await fetch('/api/planning');
      if (!res.ok) throw new Error('Erreur lors du chargement des créneaux.');
      return res.json();
    },
  });

  const onSubmit = async (data: AppointmentFormData) => {
    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la création du rendez-vous.');
      }

      setSuccess(true);
      reset();
    } catch (err) {
      console.error(err);
      alert('Une erreur est survenue. Veuillez réessayer plus tard.');
    }
  };

  return (
    <SectionContainer id="appointment">
      <div className="mx-auto mb-8 max-w-7xl">
        <SectionTitle title="Prendre Rendez-vous" />
      </div>

      <div className="mx-auto max-w-4xl border-4 border-primary bg-beige p-10">
        {success && (
          <div className="mb-6 font-semibold text-green-700">
            Votre demande de rendez-vous a bien été enregistrée !
          </div>
        )}

        {isLoading ? (
          <p>Chargement des créneaux disponibles...</p>
        ) : isError ? (
          <p className="text-red-600">Erreur lors du chargement des créneaux.</p>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
            {/* Sélection de créneau */}
            <div className="flex flex-col">
              <label htmlFor="startsAt" className="mb-2 font-bold">
                Choisir un créneau
              </label>
              <select
                id="startsAt"
                className="border-2 border-primary p-4"
                {...register('startsAt', { required: 'Sélectionnez un créneau' })}
              >
                <option value="">-- Sélectionnez --</option>
                {slots?.map((slot) => (
                  <option key={slot.startsAt} value={slot.startsAt}>
                    {new Date(slot.startsAt).toLocaleString('fr-FR', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </option>
                ))}
              </select>
              {errors.startsAt && (
                <span className="mt-1 text-red-600">{errors.startsAt.message}</span>
              )}
            </div>

            {/* Nom */}
            <div className="flex flex-col">
              <label htmlFor="name" className="mb-2 font-bold">
                Nom
              </label>
              <input
                id="name"
                type="text"
                className="border-2 border-primary p-4"
                {...register('name', { required: 'Le nom est requis' })}
              />
              {errors.name && <span className="mt-1 text-red-600">{errors.name.message}</span>}
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label htmlFor="email" className="mb-2 font-bold">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="border-2 border-primary p-4"
                {...register('email', {
                  required: "L'email est requis",
                  pattern: { value: /^\S+@\S+$/i, message: 'Email invalide' },
                })}
              />
              {errors.email && <span className="mt-1 text-red-600">{errors.email.message}</span>}
            </div>

            {/* Téléphone */}
            <div className="flex flex-col">
              <label htmlFor="phone" className="mb-2 font-bold">
                Téléphone
              </label>
              <input
                id="phone"
                type="tel"
                className="border-2 border-primary p-4"
                {...register('phone', { required: 'Le téléphone est requis' })}
              />
              {errors.phone && <span className="mt-1 text-red-600">{errors.phone.message}</span>}
            </div>

            {/* Notification */}
            <div className="flex flex-col">
              <label htmlFor="preferredNotification" className="mb-2 font-bold">
                Préférence de notification
              </label>
              <select
                id="preferredNotification"
                className="border-2 border-primary p-4"
                {...register('preferredNotification', {
                  required: 'Choisissez un mode de notification',
                })}
              >
                <option value="">-- Sélectionnez --</option>
                <option value="email">Email</option>
                <option value="sms">SMS</option>
                <option value="both">Email & SMS</option>
              </select>
              {errors.preferredNotification && (
                <span className="mt-1 text-red-600">{errors.preferredNotification.message}</span>
              )}
            </div>

            <button
              type="submit"
              className="button-primary self-start transition-all duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange focus:ring-offset-2 active:scale-95"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Envoi en cours...' : 'Prendre rendez-vous'}
            </button>
          </form>
        )}
      </div>
    </SectionContainer>
  );
}
