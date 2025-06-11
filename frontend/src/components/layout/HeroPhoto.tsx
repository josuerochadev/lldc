// src/components/layout/HeroPhoto.tsx

import { motion } from "framer-motion";

import type { HeroAnimations } from "@/types/animations";

type Props = {
	animations: HeroAnimations;
};

export default function HeroPhoto({ animations }: Props) {
	return (
		<motion.figure
			style={{
				opacity: animations.photoOpacity,
				y: animations.photoY,
				rotate: "-2.5deg",
			}}
			className="absolute top-[40%] sm:top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] sm:w-[min(90vw,480px)] z-10"
		>
			<div className="bg-white p-4 pb-16 rounded-sm shadow-lg">
				<img
					src="/hero-photo.JPG"
					alt="Chien avec lunettes"
					className="rounded-sm object-cover"
				/>
			</div>
		</motion.figure>
	);
}