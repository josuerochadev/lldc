// src/components/layout/FloatingButtons.tsx
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingButtons() {
	const [show, setShow] = useState(true);
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
					className="fixed bottom-44 right-6 z-40 flex flex-col items-end space-y-4"
				>
					<button
						onClick={() => setShow(false)}
						className="w-8 h-8 rounded-full border-2 border-primary text-primary font-extrabold text-sm bg-beige hover:bg-orange hover:text-white shadow-md hover:shadow-xl transition-all duration-300"
						aria-label="Fermer les boutons"
					>
						×
					</button>

					<button className="flex items-center justify-center px-6 py-3 rounded-full border-2 border-purple bg-beige text-primary font-sans uppercase tracking-wide text-xl shadow-md hover:bg-orange hover:text-white hover:font-extrabold hover:shadow-xl transition-all duration-300">
						Contactez-nous
					</button>

					<button className="flex items-center justify-center px-6 py-3 rounded-full border-2 border-purple bg-beige text-primary font-sans uppercase tracking-wide text-xl shadow-md hover:bg-orange hover:text-white hover:font-extrabold hover:shadow-xl transition-all duration-300">
						Prendre RDV !
					</button>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
