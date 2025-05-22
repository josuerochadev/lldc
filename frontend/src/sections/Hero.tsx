import {
	motion,
	useScroll,
	useTransform,
	useMotionTemplate,
} from "framer-motion";
import { useRef } from "react";

import LogoEye from "@/assets/logo/logo-eye.svg?react";

// Helpers d'animation
const fadeSlide = (delay: number) => ({
	initial: { opacity: 0, y: -20 },
	animate: { opacity: 1, y: 0 },
	transition: { delay, duration: 0.45, ease: "easeOut" },
});

// Titre principal
const HeroTitle = ({ className = "" }) => (
	<h1
		className={`font-thin uppercase tracking-tight leading-[0.82] text-[clamp(3rem,8.5vw,9.5rem)] whitespace-nowrap ${className}`}
	>
		LA<span className="font-extrabold">LUNETTERIE</span>
		<span className="block sm:inline">
			DU<span className="font-extrabold">COIN</span>
		</span>
	</h1>
);

export default function Hero() {
	const sectionRef = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start start", "end start"],
	});

	const mainTitleOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
	const sectionOpacity = useTransform(scrollYProgress, [0.6, 0.7], [1, 0]);
	const laterOpacity = useTransform(scrollYProgress, [0.15, 0.3], [0, 1]);

	// Logo animations
	const logoX = useTransform(scrollYProgress, [0.05, 0.25], [0, 20]);
	const logoY = useTransform(scrollYProgress, [0.05, 0.3], [0, 650]);
	const logoRotate = useTransform(scrollYProgress, [0.05, 0.3], [0, 10]);
	const logoScale = useTransform(scrollYProgress, [0.05, 0.35], [1, 1.8]);
	const logoColor = useTransform(
		scrollYProgress,
		[0.05, 0.15],
		["#352f2f", "#fc871a"],
	);

	const subtitleY = useTransform(scrollYProgress, [0, 0.2], [0, 60]);
	const subtitleScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);
	const subtitleOpacity = useTransform(scrollYProgress, [0.15, 0.25], [1, 0]);

	const photoY = useTransform(scrollYProgress, [0.15, 0.35], [80, 0]);
	const photoOpacity = useTransform(scrollYProgress, [0.15, 0.35], [0, 1]);

	const cloneOpacities = [0.03, 0.06, 0.09, 0.12, 0.15].map((start, idx) =>
		useTransform(
			scrollYProgress,
			[start, start + 0.1, start + 0.22],
			[0, 1, idx === 4 ? 0 : 0.6 - idx * 0.1],
		),
	);

	const blurLevels = [0.03, 0.06, 0.09, 0.12, 0.15].map((start) =>
		useTransform(scrollYProgress, [start, start + 0.1], [12, 0]),
	);

	return (
		<section
			ref={sectionRef}
			className="relative isolate block min-h-[250svh] overflow-hidden px-4 sm:px-6"
		>
			<motion.div
				style={{ opacity: sectionOpacity }}
				className="sticky top-0 h-[100svh] flex items-center justify-center"
			>
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.3, duration: 0.45, ease: "easeOut" }}
					style={{ opacity: mainTitleOpacity }}
				>
					<HeroTitle />
				</motion.div>
			</motion.div>

			{/* Logo */}
			<motion.div
				{...fadeSlide(0.15)}
				style={{
					x: useMotionTemplate`${logoX}vw`,
					y: logoY,
					rotate: logoRotate,
					scale: logoScale,
					color: logoColor,
				}}
				className="absolute top-[12%] left-[12%] z-50 drop-shadow-md"
			>
				<LogoEye className="h-20 sm:h-24 md:h-28 w-auto" />
			</motion.div>

			{/* Subtitle */}
			<motion.p
				{...fadeSlide(0.45)}
				style={{ y: subtitleY, scale: subtitleScale, opacity: subtitleOpacity }}
				className="absolute top-[24%] right-[12%] z-50 text-left text-[clamp(1.25rem,3.5vw,2.5rem)] uppercase leading-[0.9]"
			>
				NEUF
				<br />
				OCCASION
			</motion.p>

			{/* Clones */}
			<motion.div className="absolute top-[calc(50svh+4rem)] left-1/2 -translate-x-1/2 flex flex-col w-full isolate z-10">
				{cloneOpacities.map((opacity, i) => (
					<motion.div
						key={i}
						style={{
							opacity,
							filter: useMotionTemplate`blur(${blurLevels[i]}px)`,
						}}
						className="flex justify-center"
					>
						<HeroTitle />
					</motion.div>
				))}
			</motion.div>

			{/* Photo */}
			<motion.figure
				style={{ opacity: photoOpacity, y: photoY }}
				className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(90vw,480px)] z-10 hidden md:block"
			>
				<img
					src="/frontend/public/hero-photo.JPG"
					alt="Chien avec lunettes"
					className="rounded-xl shadow-2xl"
				/>
			</motion.figure>
		</section>
	);
}
