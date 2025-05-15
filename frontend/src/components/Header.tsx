import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ROUTES_CONFIG } from "@/config/constants";
import Logo from "@/assets/logo/logo-eye.svg?react";

export default function Header() {
	const [menuOpen, setMenuOpen] = useState(false);
	const location = useLocation();
	const currentRoute = ROUTES_CONFIG.find((r) => r.path === location.pathname);

	return (
		/* `relative` para ancorar o overlay */
		<header className="relative isolate z-30 flex w-full items-center justify-center gap-8 px-6 py-4 mt-8">
			{/* --- EFEITO DE FUNDO --- */}
			{/* O elemento `span` com `aria-hidden` é usado para criar um efeito de fundo animado */}
			<span
				aria-hidden
				className="pointer-events-none absolute -top-32 -translate-x-1/2 w-[160vw] md:w-[140vw] h-56 md:h-64 rounded-b-full -z-10 animate-halo blur-lg bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow/60 via-orange/45 to-transparent"
			/>

			{/* --- CONTEÚDO DO HEADER --- */}
			<Link to="/" aria-label="Retour à l'accueil">
				<Logo className="w-[clamp(30px,6vw,40px)] h-auto text-primary" />
			</Link>

			{currentRoute?.title && (
				<h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-primary text-center">
					{currentRoute.title.normal && (
						<span className="font-normal mr-1">
							{currentRoute.title.normal}
						</span>
					)}
					<span className="font-extrabold">{currentRoute.title.bold}</span>
				</h1>
			)}

			{/* --- MENU BURGER --- */}
			<div className="relative">
				<button
					type="button"
					className="text-5xl text-primary"
					onClick={() => setMenuOpen((prev) => !prev)}
					aria-label="Toggle menu"
				>
					☰
				</button>

				{menuOpen && (
					<nav className="absolute right-0 mt-2 bg-white shadow-lg rounded p-4">
						<ul className="space-y-2">
							{ROUTES_CONFIG.map(({ path, navLabel }) => (
								<li key={path}>
									<Link
										to={path}
										onClick={() => setMenuOpen(false)}
										className="text-primary hover:text-orange transition-colors"
									>
										{navLabel}
									</Link>
								</li>
							))}
						</ul>
					</nav>
				)}
			</div>
		</header>
	);
}
