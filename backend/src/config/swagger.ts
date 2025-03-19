import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import type { Express } from "express";
import logger from "../middlewares/logger";

const swaggerOptions = {
	swaggerDefinition: {
		openapi: "3.0.0",
		info: {
			title: "LLDC API",
			description: "Documentation de l'API LLDC",
			version: "1.0.0",
		},
		servers: [
			{
				url: "http://localhost:4000",
				description: "Serveur de développement",
			},
		],
		components: {
			securitySchemes: {
				bearerAuth: {
					type: "http",
					scheme: "bearer",
					bearerFormat: "JWT",
				},
			},
		},
		security: [
			{
				bearerAuth: [],
			},
		],
	},
	apis: ["./src/routes/*.ts"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export const setupSwagger = (app: Express) => {
	app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
	logger.info("📄 Swagger disponible sur http://localhost:4000/api-docs");
};
