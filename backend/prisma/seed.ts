// backend/prisma/seed.ts

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  // Création de plusieurs clients
  const alice = await prisma.client.create({
    data: {
      first_name: 'Alice',
      last_name: 'Dupont',
      email: 'alice.dupont@example.com',
      phone: '0123456789',
    },
  })

  const bob = await prisma.client.create({
    data: {
      first_name: 'Bob',
      last_name: 'Martin',
      email: 'bob.martin@example.com',
      phone: '0987654321',
    },
  })

  const claire = await prisma.client.create({
    data: {
      first_name: 'Claire',
      last_name: 'Durand',
      email: 'claire.durand@example.com',
      phone: '0555123456',
    },
  })

  // Création de rendez-vous pour chaque client avec diverses valeurs d'enums
  // Pour Alice : deux rendez-vous (un en attente et un confirmé)
  const aliceAppointment1 = await prisma.appointment.create({
    data: {
      clientId: alice.id,
      appointment_date: new Date('2025-03-15T10:00:00.000Z'),
      status: 'pending', // Valeurs possibles : pending, confirmed, cancelled
      preferred_notification: 'email', // Valeurs possibles : email, sms, both
      optician_notes: 'Premier rendez-vous, en attente de confirmation.',
    },
  })

  const aliceAppointment2 = await prisma.appointment.create({
    data: {
      clientId: alice.id,
      appointment_date: new Date('2025-03-20T14:00:00.000Z'),
      status: 'confirmed',
      preferred_notification: 'sms',
      optician_notes: null,
    },
  })

  // Pour Bob : un rendez-vous annulé
  const bobAppointment = await prisma.appointment.create({
    data: {
      clientId: bob.id,
      appointment_date: new Date('2025-04-01T09:30:00.000Z'),
      status: 'cancelled',
      preferred_notification: 'both',
      optician_notes: 'Rendez-vous annulé par le client.',
    },
  })

  // Pour Claire : un rendez-vous confirmé
  const claireAppointment = await prisma.appointment.create({
    data: {
      clientId: claire.id,
      appointment_date: new Date('2025-04-10T16:00:00.000Z'),
      status: 'confirmed',
      preferred_notification: 'email',
      optician_notes: 'Rendez-vous confirmé pour contrôle annuel.',
    },
  })

  // Création de notifications pour les rendez-vous
  // Pour le premier rendez-vous d'Alice : deux notifications (rappel et confirmation)
  await prisma.notification.createMany({
    data: [
      {
        appointmentId: aliceAppointment1.id,
        notification_date: new Date('2025-03-14T10:00:00.000Z'),
        type: 'rappel', // Valeurs possibles : rappel, confirmation, modification
      },
      {
        appointmentId: aliceAppointment1.id,
        notification_date: new Date('2025-03-15T08:00:00.000Z'),
        type: 'confirmation',
      },
    ],
  })

  // Pour le rendez-vous de Bob : une notification de type modification
  await prisma.notification.create({
    data: {
      appointmentId: bobAppointment.id,
      notification_date: new Date('2025-03-31T12:00:00.000Z'),
      type: 'modification',
    },
  })

  // Pour le rendez-vous de Claire : une notification de type confirmation
  await prisma.notification.create({
    data: {
      appointmentId: claireAppointment.id,
      notification_date: new Date('2025-04-09T16:00:00.000Z'),
      type: 'confirmation',
    },
  })

  // Création de créneaux bloqués
  await prisma.blockedSlot.createMany({
    data: [
      {
        start_date: new Date('2025-03-25T00:00:00.000Z'),
        end_date: new Date('2025-03-25T23:59:59.000Z'),
      },
      {
        start_date: new Date('2025-04-05T00:00:00.000Z'),
        end_date: new Date('2025-04-05T23:59:59.000Z'),
      },
    ],
  })

  // Création de messages de contact
  await prisma.contactMessage.createMany({
    data: [
      {
        full_name: 'Éric Petit',
        email: 'eric.petit@example.com',
        phone: '0147852369',
        message_content: 'Bonjour, j\'aimerais avoir plus d\'informations sur vos services.',
        sent_at: new Date('2025-03-10T12:00:00.000Z'),
      },
      {
        full_name: 'Sophie Lambert',
        email: 'sophie.lambert@example.com',
        phone: null,
        message_content: 'Je souhaite prendre rendez-vous pour un contrôle.',
        sent_at: new Date('2025-03-11T15:30:00.000Z'),
      },
    ],
  })

  console.log('Seeding terminé.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })