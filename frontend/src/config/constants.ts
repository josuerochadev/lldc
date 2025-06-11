// src/config/constants.ts

export const services = [
	{
		title: "Lunettes de vue & solaires",
		description: "Neuves ou d’occasion, avec ou sans correction.",
		shape: "card-lens-oval",
	},
	{
		title: "Lentilles de contact",
		description: "Adaptation, conseils et commande de vos lentilles.",
		shape: "card-lens-rect",
	},
	{
		title: "Examens de la vue",
		description: "Bilan visuel réalisé sur place par notre opticien.",
		shape: "card-lens-slim",
	},
	{
		title: "Boutique en ligne (Vinted)",
		description: "Nos meilleures pièces disponibles sur notre vitrine Vinted.",
		shape: "card-lens-bold",
	},
];

export const ROUTES_CONFIG = [
  {
    path: '/offres',
    title: { normal: 'Nos', bold: 'offres' },
    navLabel: 'OFFRES',
  },
  {
    path: '/contact',
    title: { normal: 'Nous', bold: 'contacter' },
    navLabel: 'CONTACT',
  },
  {
    path: '/concept',
    title: { normal: 'Notre', bold: 'concept' },
    navLabel: 'CONCEPT',
  },
  {
    path: '/services',
    title: { normal: 'Nos', bold: 'services' },
    navLabel: 'SERVICES',
  },
  {
    path: '/suivez-nous',
    title: { normal: '', bold: 'Suivez-nous' },
    navLabel: 'SUIVEZ-NOUS',
  },
  {
    path: '/rendez-vous',
    title: { normal: 'Prendre', bold: 'rendez-vous' },
    navLabel: 'PRENDRE RDV !',
  },
];

