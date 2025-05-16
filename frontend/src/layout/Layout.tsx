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
	const { pathname } = useLocation();
	const isHome = pathname === "/";

	return (
		<div className="relative flex min-h-screen flex-col bg-primary font-sans text-primary">
			<Background />

			{/* skip-link */}
			<a
				href="#main"
				className="sr-only focus:not-sr-only absolute top-2 left-2 z-50 rounded bg-yellow px-3 py-1 text-sm font-semibold text-primary"
			>
				Aller au contenu
			</a>

			<div className="relative z-10 flex flex-1 flex-col">
				{!isHome && <Header />}
				<main id="main" className="flex flex-1 flex-col">
					{children}
				</main>
				<Footer className={isHome ? "mt-auto" : ""} />
			</div>
		</div>
	);
}
