import { useScroll, useTransform, useSpring, easeInOut } from "framer-motion";
import type { RefObject } from "react";

export function useHeroAnimations(ref: RefObject<HTMLElement>) {
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start start", "end start"],
	});

	// Configuração do spring para suavidade
	const springConfig = {
		damping: 20,
		stiffness: 100,
		mass: 0.3,
		restDelta: 0.01, // menor sensibilidade à parada
		restSpeed: 0.01, // suaviza a "chegada"
	};
	// Opacidade geral
	const mainTitleOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
	const sectionOpacity = useTransform(scrollYProgress, [0.6, 0.7], [1, 0]);
	const laterOpacity = useTransform(scrollYProgress, [0.15, 0.3], [0, 1]);

	// Logo
	const logoX = useTransform(scrollYProgress, [0.05, 0.4], [0, 15], {
		ease: easeInOut,
	});
	const logoY = useTransform(
		scrollYProgress,
		[0.1, 0.25, 0.35, 0.6],
		[0, 350, 350, 725],
	);
	const logoRotate = useTransform(scrollYProgress, [0.2, 0.8], [0, 10]);
	const logoScale = useTransform(scrollYProgress, [0.2, 0.8], [1, 1.8], {
		ease: easeInOut,
	});
	const logoColor = useTransform(
		scrollYProgress,
		[0.05, 0.15],
		["#352f2f", "#fc871a"],
	);

	const smoothLogoY = useSpring(logoY, springConfig);
	const smoothLogoRotate = useSpring(logoRotate, springConfig);

	// Subtitle
	const subtitleY = useTransform(
		scrollYProgress,
		[0.1, 0.25, 0.3, 0.6],
		[0, 250, 250, 650],
	);
	const subtitleX = useTransform(scrollYProgress, [0.1, 0.15], [0, -90], {
		ease: easeInOut,
	});
	const subtitleColor = useTransform(
		scrollYProgress,
		[0, 0.15],
		["#352f2f", "#fc871a"],
	);
	const isSubtitleBold = useTransform(scrollYProgress, (v) => v > 0.15);
	const subtitleOpacity = useTransform(scrollYProgress, [0.6, 0.98], [1, 0]);
	const smoothSubtitleY = useSpring(subtitleY, springConfig);
	const smoothSubtitleX = useSpring(subtitleX, springConfig);

	// Photo
	const photoY = useTransform(scrollYProgress, [0.1, 0.35], [-80, 0]);
	const photoOpacity = useTransform(scrollYProgress, [0.15, 0.4], [0, 1]);
	const smoothPhotoY = useSpring(photoY, springConfig);

	// Clones
	const cloneOpacities = [
		useTransform(scrollYProgress, [0.05, 0.25, 0.45], [0, 1, 0.6]),
		useTransform(scrollYProgress, [0.08, 0.28, 0.48], [0, 1, 0.5]),
		useTransform(scrollYProgress, [0.11, 0.31, 0.51], [0, 1, 0.4]),
		useTransform(scrollYProgress, [0.14, 0.34, 0.54], [0, 1, 0.3]),
		useTransform(scrollYProgress, [0.17, 0.37, 0.57], [0, 1, 0]),
	];

	const blurLevels = [
		useTransform(scrollYProgress, [0.05, 0.25], [12, 0]),
		useTransform(scrollYProgress, [0.08, 0.28], [12, 0]),
		useTransform(scrollYProgress, [0.11, 0.31], [12, 0]),
		useTransform(scrollYProgress, [0.14, 0.34], [12, 0]),
		useTransform(scrollYProgress, [0.17, 0.37], [12, 0]),
	];

	return {
		scrollYProgress,
		mainTitleOpacity,
		sectionOpacity,
		laterOpacity,
		logoX,
		logoY: smoothLogoY,
		logoRotate: smoothLogoRotate,
		logoScale,
		logoColor,
		subtitleY: smoothSubtitleY,
		subtitleX: smoothSubtitleX,
		subtitleOpacity,
		subtitleColor,
		isSubtitleBold,
		photoY: smoothPhotoY,
		photoOpacity,
		cloneOpacities,
		blurLevels,
	};
}
