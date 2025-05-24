import { motion, useMotionTemplate } from "framer-motion";

import HeroTitle from "./HeroTitle";

import type { HeroAnimations } from "@/types/animations";

type Props = {
  animations: HeroAnimations;
};

export default function HeroClones({ animations }: Props) {
	return (
		<motion.div className="absolute top-[calc(45svh+4rem)] left-1/2 -translate-x-1/2 flex flex-col items-center w-full px-4 sm:px-6 isolate">
			{animations.cloneOpacities.map((opacity, i) => {
				const blurLevel = animations.blurLevels[i];
				const key = `${opacity}-${blurLevel}-${i}`;
				return (
					<motion.div
						key={key}
						style={{
							opacity,
							y: `${(i + 1) * 0.25}rem`,
							filter: useMotionTemplate`blur(${blurLevel}px)`,
						}}
						className="w-full flex justify-center"
					>
						<HeroTitle />
					</motion.div>
				);
			})}
		</motion.div>
	);
}
