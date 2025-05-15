// src/config/constants.ts

export const COLORS = {
	primary: "#302a2a",
	orange: "#ff7a00",
	purple: "#7d50f7",
	beige: "#ebdcd7",
	yellow: "#ffe922",
};

export const ROUTES_CONFIG = [
	{
		path: "/offres",
		title: { normal: "Nos", bold: "offres" },
		navLabel: "OFFRES",
	},
	{
		path: "/contact",
		title: { normal: "Nous", bold: "contacter" },
		navLabel: "CONTACT",
	},
	{
		path: "/concept",
		title: { normal: "Notre", bold: "concept" },
		navLabel: "CONCEPT",
	},
	{
		path: "/services",
		title: { normal: "Nos", bold: "services" },
		navLabel: "SERVICES",
	},
	{
		path: "/suivez-nous",
		title: { normal: "", bold: "Suivez-nous" },
		navLabel: "SUIVEZ-NOUS",
	},
	{
		path: "/rendez-vous",
		title: { normal: "Prendre", bold: "rendez-vous" },
		navLabel: "PRENDRE RDV !",
	},
];

export const OFFERS = [
	{
		title: "RECYCLAGE DE VOS ANCIENNES PAIRES",
		description: [
			"En rapportant vos anciennes montures, vous pouvez bénéficier d'une remise allant jusqu'à 70€ sur l'achat d'une nouvelle paire.",
		],
	},
	{
		title: "DEUXIÈME PAIRE DE LUNETTES",
		description: [
			"Pour 59€, une deuxième paire avec monture et verres unifocaux.",
			"Pour 89€, une deuxième paire avec verres progressifs.",
		],
	},
];
