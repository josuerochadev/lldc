import rateLimit from "express-rate-limit";

// 📌 Limite de requêtes pour l'API publique
export const apiLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Max 100 requêtes par IP
	message: "Trop de requêtes, veuillez réessayer plus tard.",
	standardHeaders: true,
	legacyHeaders: false,
});

// 📌 Limite stricte pour le formulaire de contact
export const contactLimiter = rateLimit({
	windowMs: 60 * 1000, // 1 minute
	max: 1, // Une requête max par minute
	message: "Trop de requêtes, veuillez réessayer plus tard.",
	standardHeaders: true,
	legacyHeaders: false,
});