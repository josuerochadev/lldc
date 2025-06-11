// src/components/layout/HeroLogo.tsx

import { motion, useMotionTemplate } from "framer-motion";

import LogoEye from "@/assets/logo/logo-eye.svg?react";
import type { HeroAnimations } from "@/types/animations";

type Props = {
	animations: HeroAnimations;
	className?: string;
};

export default function HeroLogo({ animations, className = "" }: Props) {
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
			className={`z-20 ${className}`}
		>
			<LogoEye
				className="h-20 sm:h-24 md:h-28 w-auto"
				role="img"
				aria-label="Logo La Lunetterie du Coin"
			/>
		</motion.div>
	);
}
