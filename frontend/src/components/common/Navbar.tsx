import { useEffect, useState } from "react";

function scrollToId(id: string) {
	const element = document.getElementById(id);
	if (element) {
		element.scrollIntoView({ behavior: "smooth" });
	}
}

export default function Navbar() {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => setIsVisible(!entry.isIntersecting),
			{ threshold: 0.1 },
		);
		const hero = document.querySelector("section#hero");
		if (hero) observer.observe(hero);
		return () => {
			if (hero) observer.unobserve(hero);
		};
	}, []);

	return (
		<nav
			className={`fixed top-0 left-0 w-full px-6 py-4 z-30 transition-opacity duration-500 ${
				isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
			}`}
		>
			<ul className="flex justify-center space-x-8">
				<li>
					<button
						type="button"
						className="button-primary"
						onClick={() => scrollToId("offres")}
					>
						Offres
					</button>
				</li>
				<li>
					<button
						type="button"
						className="button-primary"
						onClick={() => scrollToId("offres")}
					>
						Services
					</button>
				</li>
				<li>
					<button
						type="button"
						className="button-primary"
						onClick={() => scrollToId("concept")}
					>
						Concept
					</button>
				</li>
			</ul>
		</nav>
	);
}
