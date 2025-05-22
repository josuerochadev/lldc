// src/App.tsx

import Hero from "@/sections/Hero";
import Offers from "@/sections/Offers";
import Concept from "@/sections/Concept";
import Services from "@/sections/Services";
import Contact from "@/sections/Contact";
import Appointment from "@/sections/Appointment";
import Footer from "@/sections/Footer";
import Background from "@/components/common/Background";

export default function App() {
	return (
		<div className="relative min-h-screen font-sans text-primary bg-beige">
			<Background />
			<main className="space-y-24 sm:space-y-32">
				<Hero />
				<Offers />
				<Services />
				<Concept />
				<Contact />
				<Appointment />
				<Footer />
			</main>
		</div>
	);
}
