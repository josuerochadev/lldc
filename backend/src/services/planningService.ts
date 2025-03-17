import prisma from "../prisma";
import { AppError } from "../middlewares/errorHandler";
import logger from "../middlewares/logger";

/**
 * 🔹 Vérifie si un créneau est valide avant de le bloquer
 */
export const validateBlockedSlot = async (
	start_date: string,
	end_date: string,
) => {
	const startDate = new Date(start_date);
	const endDate = new Date(end_date);

	if (startDate >= endDate) {
		throw new AppError("La date de fin doit être après la date de début.", 400);
	}

	if (startDate < new Date()) {
		throw new AppError("Impossible de bloquer un créneau dans le passé.", 400);
	}

	// Vérification de conflit avec d'autres créneaux bloqués
	const overlappingBlockedSlots = await prisma.blockedSlot.findMany({
		where: {
			OR: [{ start_date: { lte: endDate }, end_date: { gte: startDate } }],
		},
	});

	if (overlappingBlockedSlots.length > 0) {
		throw new AppError("Un autre créneau bloqué chevauche cette période.", 400);
	}

	return { startDate, endDate };
};

/**
 * 🔹 Création d'un créneau bloqué
 */
export const createBlockedSlot = async (
	start_date: string,
	end_date: string,
) => {
	logger.info(
		`🛑 Tentative de blocage d'un créneau : ${start_date} → ${end_date}`,
	);

	const { startDate, endDate } = await validateBlockedSlot(
		start_date,
		end_date,
	);

	const blockedSlot = await prisma.blockedSlot.create({
		data: {
			start_date: startDate,
			end_date: endDate,
		},
	});

	logger.info(
		`✅ Créneau bloqué du ${startDate} au ${endDate}, ID: ${blockedSlot.id}`,
	);
	return blockedSlot;
};

/**
 * 🔹 Récupération de tous les créneaux bloqués
 */
export const getBlockedSlots = async () => {
	logger.info("📅 Récupération des créneaux bloqués...");
	return await prisma.blockedSlot.findMany({
		orderBy: { start_date: "asc" },
	});
};
