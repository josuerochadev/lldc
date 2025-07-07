// src/components/common/Footer.tsx

import type { ComponentPropsWithoutRef } from 'react';
import { clsx } from 'clsx';

import SectionContainer from './SectionContainer';

type FooterProps = ComponentPropsWithoutRef<'footer'>;

export default function Footer({ className = '', ...rest }: FooterProps) {
  const footerLinkBase =
    'font-semibold transition-colors duration-300 hover:text-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange';

  return (
    <footer {...rest} className={clsx('relative z-10 w-full bg-purple text-violet', className)}>
      <SectionContainer className="pt-10">
        <h2 className="mx-auto mb-8 text-center text-title-md font-extrabold tracking-wide">
          <span className="font-thin">LA</span>
          LUNETTERIE
          <span className="font-thin">DU</span>
          COIN
        </h2>

        <div className="mx-auto grid w-fit max-w-5xl gap-y-12 sm:grid-cols-2 sm:gap-x-12 md:gap-x-16 3xl:gap-x-20 4xl:gap-x-24 5xl:gap-x-28">
          <address
            aria-label="Adresse et horaires de la boutique"
            className="space-y-3 text-center text-sm not-italic leading-relaxed sm:text-left sm:text-base md:text-lg 3xl:text-xl 4xl:text-2xl 5xl:text-4xl"
          >
            <p>
              24&nbsp;Rue&nbsp;du&nbsp;Faubourg-de-Pierre,
              <br />
              67000&nbsp;Strasbourg
            </p>
            <p>
              <a href="tel:+33388512440" className={footerLinkBase}>
                03&nbsp;88&nbsp;51&nbsp;24&nbsp;40
              </a>
            </p>
            <p>Du lundi au samedi&nbsp;: 10&nbsp;h–14&nbsp;h / 15&nbsp;h–19&nbsp;h</p>
            <p>Dimanche&nbsp;: fermé</p>
          </address>

          <nav
            aria-label="Navigation de bas de page"
            className="flex flex-col items-center space-y-4 text-sm sm:items-start sm:text-base md:text-lg 3xl:text-xl 4xl:text-2xl 5xl:text-3xl"
          >
            <a className={footerLinkBase} href="/mentions-legales">
              Mentions légales
            </a>
            <a className={footerLinkBase} href="/conditions-de-vente">
              Conditions de vente
            </a>
            <a className={footerLinkBase} href="/gestion-rendez-vous">
              Gestion des rendez-vous
            </a>

            <p className="pt-6 text-center text-xs sm:text-left 3xl:text-sm 4xl:text-base 5xl:text-lg">
              Développé&nbsp;par{' '}
              <a
                href="https://josuexrocha.github.io/portfolio/"
                target="_blank"
                rel="noopener noreferrer"
                className={footerLinkBase}
              >
                Josué&nbsp;Rocha
              </a>
            </p>
          </nav>
        </div>
      </SectionContainer>
    </footer>
  );
}
