// src/App.tsx
import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

import Buttons from "./components/common/Buttons";

import Hero from "@/sections/Hero";
import Punchlines from "@/sections/Punchlines";
import Offers from "@/sections/Offers";
import Photos from "@/sections/Photos";
import Concept from "@/sections/Concept";
import Services from "@/sections/Services";
import Testimonials from "@/sections/Testimonials";
import Social from "@/sections/Social";
import Footer from "@/sections/Footer";
import Background from "@/components/common/Background";
import Navbar from "@/components/common/Navbar";

export default function App() {
	useEffect(() => {
		const lenis = new Lenis({
			duration: 1, // ligeiramente mais rápido, mantendo fluidez
			easing: (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2), // EaseInOutCubic
			wheelMultiplier: 1.15, // um pouco mais ágil em desktop
			touchMultiplier: 1.2, // resposta mais rápida em mobile
			smoothWheel: true,
			gestureOrientation: "vertical",
			infinite: false,
		});

		let animationFrame: number;

		const raf = (time: number) => {
			lenis.raf(time);
			animationFrame = requestAnimationFrame(raf);
		};

		animationFrame = requestAnimationFrame(raf);

		return () => {
			cancelAnimationFrame(animationFrame);
			lenis.destroy();
		};
	}, []);

	return (
		<div className="relative min-h-screen font-sans text-primary">
			<Background />
			<Navbar />
			<Buttons />
			<main>
				<Hero />
				<Punchlines />
				<Offers />
				<Services />
				<Testimonials />
				<Photos />
				<Concept />
				<Social />
				<Footer />
			</main>
		</div>
	);
}
