import { motion, useMotionTemplate } from "framer-motion";

import LogoEye from "@/assets/logo/logo-eye.svg?react";
import type { HeroAnimations } from "@/types/animations";

type Props = {
	animations: HeroAnimations;
};

export default function HeroLogo({ animations }: Props) {
	return (
		<motion.div
			initial={{ opacity: 0, y: -20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
			style={{
				x: useMotionTemplate`${animations.logoX}vw`,
				y: animations.logoY,
				rotate: animations.logoRotate,
				scale: animations.logoScale,
				color: animations.logoColor,
			}}
			className="absolute top-[20%] left-[12%] z-20"
		>
			<LogoEye className="h-20 sm:h-24 md:h-28 w-auto" />
		</motion.div>
	);
}
