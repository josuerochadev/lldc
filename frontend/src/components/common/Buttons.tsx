// src/components/layout/FloatingButtons.tsx
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingButtons() {
	const [show] = useState(true);
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const hero = document.querySelector("section#hero");
		if (!hero) return;
		const observer = new IntersectionObserver(
			([entry]) => setVisible(!entry.isIntersecting),
			{ threshold: 0.1 },
		);
		observer.observe(hero);
		return () => observer.disconnect();
	}, []);

	return (
		<AnimatePresence>
			{visible && show && (
				<motion.div
					initial={{ opacity: 0, y: 40 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: 40 }}
					transition={{ duration: 0.4, ease: "easeOut" }}
					className="fixed bottom-12 right-6 z-40 flex flex-col items-end space-y-3"
				>
					<button type="button" className="button-primary">
						Contactez-nous
					</button>

					<button type="button" className="button-primary">
						Prendre RDV !
					</button>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
