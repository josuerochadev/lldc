// src/components/Footer.tsx

import type { ComponentPropsWithoutRef } from 'react';
import { clsx } from 'clsx';

type FooterProps = ComponentPropsWithoutRef<'footer'>;

export default function Footer({ className = '', ...rest }: FooterProps) {
  const footerLinkBase =
    'font-semibold transition-colors duration-300 hover:text-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange';

  return (
    <footer
      {...rest}
      className={clsx('relative z-10 w-full bg-purple px-6 py-20 text-violet', className)}
    >
      {/* ---------- Nom de la boutique ---------- */}
      <h2 className="mx-auto mb-12 max-w-xs text-center text-2xl font-extrabold tracking-wide">
        <span className="font-thin">LA</span>
        LUNETTERIE
        <span className="font-thin">DU</span>
        COIN
      </h2>

      {/* ---------- Contenu en 2 colonnes ---------- */}
      <div className="mx-auto grid max-w-5xl gap-x-16 gap-y-12 sm:grid-cols-2">
        {/* Colonne 1 : infos pratiques */}
        <address className="space-y-3 text-center not-italic leading-relaxed sm:text-left">
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

        {/* Colonne 2 : navigation + crédits */}
        <nav
          aria-label="Navigation de bas de page"
          className="flex flex-col items-center space-y-4 sm:items-start"
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

          <p className="pt-6 text-center text-xs sm:text-left">
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
    </footer>
  );
}
