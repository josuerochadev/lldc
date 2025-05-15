// frontend/src/layout/Layout.tsx

import { useLocation } from "react-router-dom";
import type { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Background from "@/components/Background";

type LayoutProps = {
	children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
	const location = useLocation();
	const isHome = location.pathname === "/";

	return (
		<div className="relative min-h-screen flex flex-col font-sans text-primary bg-primary overflow-x-hidden">
			<Background />

			<div className="relative z-10 flex flex-col flex-1">
				{!isHome && <Header />}
				<main className="flex-1 flex flex-col">{children}</main>
				{/* Footer escondido inicialmente na homepage */}
				{!isHome && <Footer />}
			</div>

			{/* Footer visível somente com scroll na homepage */}
			{isHome && (
				<div className="mt-auto">
					<Footer />
				</div>
			)}
		</div>
	);
}