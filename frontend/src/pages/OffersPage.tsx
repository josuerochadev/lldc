// src/pages/OffersPage.tsx
import CardFrame from "@/components/CardFrame";
import { OFFERS } from "@/config/constants";

export default function OffersPage() {

	return (
		<div className="min-h-[100dvh] w-full px-4 py-10 flex flex-col items-center">
			<div className="flex flex-col gap-10 max-w-xl w-full relative z-10 mt-10">
				{OFFERS.map((offer) => (
					<CardFrame key={offer.title}>
						<h2 className="text-lg sm:text-xl md:text-2xl font-extrabold mb-2 uppercase">
							{offer.title}
						</h2>

						{offer.description.length > 1 ? (
							<ul className="text-sm sm:text-base font-serif list-disc list-inside space-y-2">
								{offer.description.map((line) => (
									<li key={line}>{line}</li>
								))}
							</ul>
						) : (
							<p className="text-sm sm:text-base font-serif leading-relaxed">
								{offer.description[0]}
							</p>
						)}
					</CardFrame>
				))}
			</div>
		</div>
	);
}
