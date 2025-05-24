import { motion } from "framer-motion";
import { useMotionValueEvent } from "framer-motion";
import { useState } from "react";

import type { HeroAnimations } from "@/types/animations";

type Props = {
	animations: HeroAnimations;
};

export default function HeroSubtitle({ animations }: Props) {
	const [boldClass, setBoldClass] = useState("font-medium");

	// Opcional: hook para classe dinâmica com threshold
	useMotionValueEvent(animations.isSubtitleBold, "change", (v) => {
		setBoldClass(v ? "font-extrabold" : "font-medium");
	});

	return (
		<motion.p
			initial={{ opacity: 0, y: -10 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.7, duration: 0.6, ease: "easeOut" }}
			style={{
				x: animations.subtitleX,
				y: animations.subtitleY,
				opacity: animations.subtitleOpacity,
				color: animations.subtitleColor,
			}}
			className={`absolute top-[38%] right-[12%] z-20 text-left text-[clamp(1.25rem,3.5vw,2.5rem)] leading-[0.9] uppercase ${boldClass}`}
		>
			NEUF
			<br />
			OCCASION
		</motion.p>
	);
}
