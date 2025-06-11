import { useState } from "react";
import clsx from "clsx";

import SectionContainer from "@/components/common/SectionContainer";
import SectionTitle from "@/components/common/SectionTitle";

const services = [
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

export default function Services() {
	const [activeIndex, setActiveIndex] = useState<number | null>(null);

	const handleClick = (index: number) => {
		setActiveIndex((prev) => (prev === index ? null : index));
	};

	return (
		<SectionContainer
			id="services"
			className="px-4 sm:px-8 py-24 flex flex-col items-center gap-16"
		>
			<SectionTitle text="Voici aussi ce que nous pouvons faire pour vous et pour votre vue." />

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl w-full">
				{services.map(({ title, description, shape }, index) => {
					const isActive = activeIndex === index;

					return (
						<button
							key={title}
							type="button"
							onClick={() => handleClick(index)}
							className={clsx(
								shape,
								"relative flex flex-col justify-center items-center text-center p-6 cursor-pointer group focus:outline-none transition-all duration-300 ease-in-out",
							)}
						>
							<h3
								className={clsx(
									"text-2xl font-bold font-serif text-purple transition-opacity duration-300",
									{
										"opacity-0": isActive,
										"opacity-100": !isActive,
									},
								)}
							>
								{title}
							</h3>

							<p
								className={clsx(
									"absolute inset-0 flex items-center justify-center text-lg text-center px-6 font-sans text-primary pointer-events-none transition-opacity duration-300",
									{
										"opacity-100 pointer-events-auto bg-black/30 backdrop-blur-sm rounded-[inherit]":
											isActive,
										"opacity-0": !isActive,
									},
								)}
							>
								{description}
							</p>
						</button>
					);
				})}
			</div>
		</SectionContainer>
	);
}
