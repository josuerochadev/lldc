// src/components/layout/HeroSubtitle.tsx

import { motion } from "framer-motion";
import { useMotionValueEvent } from "framer-motion";
import { useState } from "react";

import type { HeroAnimations } from "@/types/animations";

type Props = {
	animations: HeroAnimations;
	className?: string;
};

export default function HeroSubtitle({ animations, className = "" }: Props) {
	const [boldClass, setBoldClass] = useState("font-medium");

	useMotionValueEvent(animations.isSubtitleBold, "change", (v) => {
		setBoldClass(v ? "font-extrabold" : "font-medium");
	});

	return (
		<motion.p
			initial={{ opacity: 0, y: -10 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
			style={{
				x: animations.subtitleX,
				y: animations.subtitleY,
				color: animations.subtitleColor,
				opacity: animations.subtitleOpacity,
			}}
			className={`text-left text-xl sm:text-2xl md:text-3xl leading-tight ${boldClass} ${className}`}
		>
			NEUF
			<br />
			OCCASION
		</motion.p>
	);
}
