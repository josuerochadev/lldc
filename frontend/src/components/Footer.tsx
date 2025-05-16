// src/components/Footer.tsx
import type { ComponentPropsWithoutRef } from "react";

type FooterProps = ComponentPropsWithoutRef<"footer">;

export default function Footer({ className = "", ...rest }: FooterProps) {
	return (
		<footer
			{...rest}
			className={`relative z-20 w-full bg-primary px-6 py-10 text-beige ${className}`}
		>
			{/* ---------- Nome da loja ---------- */}
			<h2 className="mx-auto mb-6 max-w-xs text-center text-2xl font-extrabold tracking-wide">
				<span className="font-thin">LA</span>
				LUNETTERIE
				<span className="font-thin">DU</span>
				COIN
			</h2>

			{/* ---------- Conteúdo em 2 colunas ---------- */}
			<div className="mx-auto grid max-w-5xl gap-y-8 gap-x-12 sm:grid-cols-2">
				{/* Coluna 1 : informações práticas */}
				<address className="space-y-1 leading-relaxed not-italic text-center sm:text-left">
					<p>
						24&nbsp;Rue&nbsp;du&nbsp;Faubourg-de-Pierre,
						<br />
						67000&nbsp;Strasbourg
					</p>
					<p>
						<a
							href="tel:+33388512440"
							className="font-semibold hover:text-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange"
						>
							03&nbsp;88&nbsp;51&nbsp;24&nbsp;40
						</a>
					</p>
					<p>
						Du lundi au samedi&nbsp;: 10&nbsp;h-14&nbsp;h / 15&nbsp;h-19&nbsp;h
					</p>
					<p>Dimanche&nbsp;: fermé</p>
				</address>

				{/* Coluna 2 : navigation + crédits */}
				<nav
					aria-label="Navigation de bas de page"
					className="flex flex-col items-center space-y-3 sm:items-start"
				>
					<a
						className="font-semibold hover:text-orange"
						href="/mentions-legales"
					>
						Mentions légales
					</a>
					<a
						className="font-semibold hover:text-orange"
						href="/conditions-de-vente"
					>
						Conditions de vente
					</a>
					<a
						className="font-semibold hover:text-orange"
						href="/gestion-rendez-vous"
					>
						Gestion des rendez-vous
					</a>

					<p className="pt-4 text-xs">
						Développé&nbsp;par{" "}
						<a
							href="https://josuexrocha.github.io/portfolio/"
							target="_blank"
							rel="noopener noreferrer"
							className="font-semibold hover:text-orange"
						>
							Josué&nbsp;Rocha
						</a>
					</p>
				</nav>
			</div>
		</footer>
	);
}
