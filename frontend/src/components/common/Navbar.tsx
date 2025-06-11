import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";

function scrollToId(id: string) {
	const element = document.getElementById(id);
	if (element) {
		element.scrollIntoView({ behavior: "smooth" });
	}
}

export default function Navbar() {
	const [isOpen, setIsOpen] = useState(false);

	const handleClick = (id: string) => {
		scrollToId(id);
		setIsOpen(false);
	};

	return (
		<motion.div
			className="fixed top-4 right-4 z-50 flex flex-col items-end space-y-3"
			initial={{ opacity: 0, y: -20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
		>
			{/* Botão principal */}
			<button
				type="button"
				onClick={() => setIsOpen(!isOpen)}
				className="button-primary flex items-center gap-2"
				aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
			>
				{isOpen ? (
					<>
						<HiOutlineX size={20} /> Fermer
					</>
				) : (
					<>
						<HiOutlineMenu size={20} /> Menu
					</>
				)}
			</button>

			{/* Dropdown */}
			<AnimatePresence>
				{isOpen && (
					<motion.ul
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						transition={{ duration: 0.3 }}
						className="flex flex-col items-end space-y-3"
					>
						{[
							{ id: "offres", label: "Offres" },
							{ id: "services", label: "Services" },
							{ id: "concept", label: "Concept" },
							{ id: "contact", label: "Contactez-nous" },
							{ id: "rdv", label: "Prendre RDV !" },
						].map(({ id, label }) => (
							<li key={id}>
								<button
									type="button"
									onClick={() => handleClick(id)}
									className="button-primary text-center"
								>
									{label}
								</button>
							</li>
						))}
					</motion.ul>
				)}
			</AnimatePresence>
		</motion.div>
	);
}
