import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config(); 

const prisma = new PrismaClient();

async function main() {
	console.log("🚀 Démarrage du seeding...");

  const password = process.env.SEED_PASSWORD;
  if (!password) {
    console.error("❌ ERREUR : SEED_PASSWORD est manquant dans .env !");
    process.exit(1);
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  await prisma.optician.upsert({
    where: { email: "opticien@lldc.com" },
    update: {},
    create: {
      email: "opticien@lldc.com",
      password: hashedPassword,
    },
  });
  console.log("✅ Opticien par défaut ajouté !");

	// 📌 Création des clients avec upsert pour éviter les doublons
	const alice = await prisma.client.upsert({
		where: { email: "alice.dupont@example.com" },
		update: {},
		create: {
			first_name: "Alice",
			last_name: "Dupont",
			email: "alice.dupont@example.com",
			phone: "0123456789",
		},
	});

	const bob = await prisma.client.upsert({
		where: { email: "bob.martin@example.com" },
		update: {},
		create: {
			first_name: "Bob",
			last_name: "Martin",
			email: "bob.martin@example.com",
			phone: "0987654321",
		},
	});

	console.log("✅ Clients insérés avec succès.");

	// 📅 Création des rendez-vous avec upsert
	const aliceAppointment = await prisma.appointment.upsert({
		where: { id: 1 },
		update: {},
		create: {
			client_id: alice.id,
			appointment_date: new Date("2025-03-18T08:00:00.000Z"),
			status: "confirmed",
			preferred_notification: "both",
		},
	});

	const bobAppointment = await prisma.appointment.upsert({
		where: { id: 2 },
		update: {},
		create: {
			client_id: bob.id,
			appointment_date: new Date("2025-03-19T09:28:00.000Z"),
			status: "confirmed",
			preferred_notification: "email",
		},
	});

	console.log("✅ Rendez-vous insérés avec succès.");

	// 🔔 Création des notifications associées aux rendez-vous
	await prisma.notification.upsert({
		where: { id: 1 },
		update: {},
		create: {
			appointment_id: aliceAppointment.id,
			sent_at: new Date(),
			type: "reminder_24h",
		},
	});

	await prisma.notification.upsert({
		where: { id: 2 },
		update: {},
		create: {
			appointment_id: bobAppointment.id,
			sent_at: new Date(),
			type: "appointment_created_by_client",
		},
	});

	await prisma.notification.upsert({
		where: { id: 3 },
		update: {},
		create: {
			appointment_id: aliceAppointment.id,
			sent_at: new Date(),
			type: "appointment_accepted",
		},
	});

	await prisma.notification.upsert({
		where: { id: 4 },
		update: {},
		create: {
			appointment_id: bobAppointment.id,
			sent_at: new Date(),
			type: "reminder_2h",
		},
	});

	console.log("✅ Notifications insérées avec succès.");
}

main()
	.catch((e) => {
		console.error("❌ Erreur lors du seeding :", e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
