// src/sections/Offres.tsx
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const offres = [
	{
		title: "Recyclez vos anciennes lunettes jusqu'à 70€ offerts",
		description:
			"Ramenez vos anciennes montures et bénéficiez d’une remise immédiate sur une nouvelle paire. Une démarche écoresponsable pour donner une seconde vie à vos lunettes.",
	},
	{
		title: "Votre deuxième paire à partir de 59€",
		description:
			"Obtenez une deuxième paire à tarif préférentiel : 59€ pour des verres unifocaux, 89€ pour des progressifs. Verres transparents ou solaires 100% UV, fabriqués en France par Ophtalmic Vision.",
	},
];

export default function Offres() {
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const timeout = setTimeout(() => setVisible(true), 400);
		return () => clearTimeout(timeout);
	}, []);

	return (
		<section
			id="offres"
			className="relative w-full min-h-screen py-24 px-6 sm:px-12"
		>
			<div className="max-w-7xl mx-auto">
				<div className="grid gap-12 sm:grid-cols-2">
					{offres.map((offre, index) => (
						<motion.div
							key={offre.title}
							initial={{ opacity: 0, y: 30 }}
							animate={visible ? { opacity: 1, y: 0 } : {}}
							transition={{ delay: index * 0.3, duration: 0.6 }}
							className="relative w-full"
						>
							<div className="card-lens w-full">
								<h3 className="text-5xl text-balance text-purple font-bold font-serif my-3 leading-[0.9]">
									{offre.title}
								</h3>
								<p className="text-base leading-relaxed text-primary/80">
									{offre.description}
								</p>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
