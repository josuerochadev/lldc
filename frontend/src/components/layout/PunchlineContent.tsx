import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

import SectionTitle from "../common/SectionTitle";

const punchlines = [
	"Des lunettes qui ont du style, une démarche qui a du sens",
	"Des lunettes à la mode et pas de déchet en vue !",
	"Payez vos lunettes moins cher en recyclant vos anciennes paires",
	"Revoir le monde à travers des verres responsables",
];

const transitionDelay = 8000;

export default function PunchlineContent() {
	const [currentIndex, setCurrentIndex] = useState(0);
	const containerRef = useRef(null);
	const isInView = useInView(containerRef, { amount: 0.6, once: true });

	const currentLine = punchlines[currentIndex];

	const words = useMemo(() => {
		return currentLine.split(" ").map((word, index) => ({
			text: word,
			key: `word-${index}-${word}`,
		}));
	}, [currentLine]);

	useEffect(() => {
		if (!isInView) return;
		const interval = setInterval(() => {
			setCurrentIndex((prev) => (prev + 1) % punchlines.length);
		}, transitionDelay);
		return () => clearInterval(interval);
	}, [isInView]);

	return (
		// <div
		// 	ref={containerRef}
		// 	className="w-full min-h-[30vh] flex items-center justify-center bg-orange px-6 sm:px-10"
		// >
		// 	<AnimatePresence mode="wait">
		// 		{isInView && (
		// 			<motion.div
		// 				key={currentLine}
		// 				layout
		// 				className="flex flex-wrap justify-start text-left max-w-6xl text-4xl sm:text-5xl md:text-6xl font-bold uppercase gap-x-3 tracking-tight leading-[0.82]"
		// 				initial={{ opacity: 0, y: 40 }}
		// 				animate={{ opacity: 1, y: 0 }}
		// 				exit={{ opacity: 0, y: -30 }}
		// 				transition={{ duration: 0.6, ease: "easeInOut" }}
		// 			>
		// 				{words.map(({ text, key }, index) => (
		// 					<motion.span
		// 						key={key}
		// 						className="inline-block"
		// 						initial={{ y: 40, rotateZ: -5, opacity: 0 }}
		// 						animate={{ y: 0, rotateZ: 0, opacity: 1 }}
		// 						exit={{ y: -20, rotateZ: 3, opacity: 0 }}
		// 						transition={{
		// 							duration: 0.5,
		// 							delay: index * 0.07,
		// 							ease: "easeOut",
		// 						}}
		// 					>
		// 						{text}
		// 					</motion.span>
		// 				))}
		// 			</motion.div>
		// 		)}
		// 	</AnimatePresence>
		// </div>

		<div
			ref={containerRef}
			className="w-full min-h-[30vh] flex items-center justify-center bg-orange px-6 sm:px-10"
		>
			<div className="w-full max-w-6xl text-left">
				<SectionTitle
					text={currentLine}
					className="text-4xl sm:text-5xl md:text-6xl text-primary"
				/>
			</div>
		</div>
	);
}
