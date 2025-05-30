import type React from "react";
import { useRef } from "react";
import { motion } from "framer-motion";

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
		<section
			id="hero"
			aria-label="Hero Section"
			ref={sectionRef}
			className="relative z-10 isolate block min-h-[145svh] overflow-hidden px-4 sm:px-6"
		>
			<motion.div
				style={{ opacity: animations.sectionOpacity }}
				className="sticky top-0 h-[100svh] flex items-center justify-center"
			>
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.3, duration: 0.45, ease: "easeOut" }}
					style={{ opacity: animations.mainTitleOpacity }}
				>
					<HeroTitle />
				</motion.div>
			</motion.div>

			<HeroLogo animations={animations} />
			<HeroSubtitle animations={animations} />
			<HeroClones animations={animations} />
			<HeroPhoto animations={animations} />

		</section>
	);
}
