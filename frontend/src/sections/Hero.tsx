// src/sections/Hero.tsx

import type React from "react";
import { useRef } from "react";
import { motion } from "framer-motion";

import SectionContainer from "@/components/common/SectionContainer";
import { useHeroAnimations } from "@/components/animations/useHeroAnimations";
import HeroTitle from "@/components/layout/HeroTitle";
import HeroLogo from "@/components/layout/HeroLogo";
import HeroSubtitle from "@/components/layout/HeroSubtitle";
import HeroClones from "@/components/layout/HeroClones";
import HeroPhoto from "@/components/layout/HeroPhoto";

export default function Hero() {
	const sectionRef = useRef<HTMLElement>(null) as React.RefObject<HTMLElement>;
	const animations = useHeroAnimations(sectionRef);

	return (
		<SectionContainer
			id="hero"
			aria-label="Hero Section"
			ref={sectionRef}
			className="relative z-10 isolate min-h-[145svh] overflow-hidden px-4 sm:px-6"
		>
			<div className="sticky top-0 h-[100svh] flex flex-col justify-center">
				<div className="grid grid-rows-3 w-full max-w-[90rem] mx-auto h-fit">
					{/* Linha 1: Logo à esquerda */}
					<div className="flex justify-end items-end">
						<HeroLogo animations={animations} />
					</div>

					{/* Linha 2: Título centralizado */}
					<div className="flex justify-center items-center">
						<motion.div
							initial={{ opacity: 0, y: -20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.3, duration: 0.45, ease: "easeOut" }}
							style={{ opacity: animations.mainTitleOpacity }}
						>
							<HeroTitle />
						</motion.div>
					</div>

					{/* Linha 3: Subtítulo à direita */}
					<div className="flex justify-end items-start">
						<HeroSubtitle animations={animations} />
					</div>
				</div>
			</div>

			{/* Outros elementos */}
			<HeroClones animations={animations} />
			<HeroPhoto animations={animations} />
		</SectionContainer>
	);
}
