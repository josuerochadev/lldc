export default function Footer() {
	return (
		<footer className="relative z-20 bg-primary text-beige text-sm px-6 py-10 w-full">
			<div className="w-full flex flex-col items-center">
				<p>
					<strong>La Lunetterie du Coin</strong>
				</p>
				<p>24 Rue du Faubourg-de-Pierre, 67000 Strasbourg</p>
				<p>03 88 51 24 40</p>
				<p>Du lundi à samedi : 10:00–14:00, 15:00–19:00</p>
				<p>Dimanche : fermé</p>
				<div className="flex flex-wrap gap-4 mt-4 underline justify-center">
					<a href="/mentions-legales">Mentions légales</a>
					<a href="/conditions-de-vente">Conditions de vente</a>
					<a href="/gestion-rendez-vous">Gestion des rendez-vous</a>
				</div>
			</div>
		</footer>
	);
}
