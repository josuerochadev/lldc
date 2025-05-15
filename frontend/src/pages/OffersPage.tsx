// src/pages/OffersPage.tsx
import CardFrame from '@/components/CardFrame';
import { OFFERS } from '@/config/constants';

export default function OffersPage() {
  return (
    <div className="flex min-h-[100dvh] w-full flex-col items-center px-4 py-10">
      <div className="relative z-10 mt-10 flex w-full max-w-xl flex-col gap-10">
        {OFFERS.map((offer) => (
          <CardFrame key={offer.title}>
            <h2 className="mb-2 text-lg font-extrabold uppercase sm:text-xl md:text-2xl">
              {offer.title}
            </h2>

            {offer.description.length > 1 ? (
              <ul className="list-inside list-disc space-y-2 font-serif text-sm sm:text-base">
                {offer.description.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            ) : (
              <p className="font-serif text-sm leading-relaxed sm:text-base">
                {offer.description[0]}
              </p>
            )}
          </CardFrame>
        ))}
      </div>
    </div>
  );
}
