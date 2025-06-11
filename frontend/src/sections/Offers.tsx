// src/sections/Offres.tsx
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import SectionContainer from "@/components/common/SectionContainer";
import SectionTitle from "@/components/common/SectionTitle";

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
		<SectionContainer
			id="offres"
			className="min-h-screen py-16 sm:py-24 px-6 sm:px-12"
		>
			<SectionTitle text="Des offres pour faire du bien à vos yeux et à votre budget" />
			<div className="max-w-7xl mx-auto">
				<div className="grid gap-12 grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
					{offres.map((offre, index) => (
						<motion.div
							key={offre.title}
							initial={{ opacity: 0, y: 30 }}
							animate={visible ? { opacity: 1, y: 0 } : {}}
							transition={{ delay: index * 0.3, duration: 0.6 }}
							tabIndex={0}
							className="relative w-full focus:outline-none"
						>
							<div className="card-lens w-full flex flex-col justify-center items-start gap-4 group">
								<h3 className="text-4xl font-bold font-serif text-balance text-purple leading-tight">
									{offre.title}
								</h3>

								<p
									className={`
      text-base leading-relaxed text-primary/80 transition-opacity duration-300
      md:opacity-100
      opacity-0 group-hover:opacity-100 group-focus-within:opacity-100
      max-h-0 md:max-h-none overflow-hidden md:overflow-visible
    `}
								>
									{offre.description}
								</p>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</SectionContainer>
	);
}
