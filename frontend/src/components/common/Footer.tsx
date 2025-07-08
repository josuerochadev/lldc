// src/components/common/Footer.tsx

import type { ComponentPropsWithoutRef } from 'react';
import { clsx } from 'clsx';

import SectionContainer from './SectionContainer';

type FooterProps = ComponentPropsWithoutRef<'footer'> & {
  variant?: 'default' | 'menu';
};

export default function Footer({ className = '', variant = 'default', ...rest }: FooterProps) {
  const isMenu = variant === 'menu';
  const footerLinkBase =
    'font-semibold transition-colors duration-300 hover:text-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange';

  return (
    <footer
      {...rest}
      className={clsx(
        'relative z-10 w-full',
        isMenu ? 'bg-transparent py-2 text-center text-purple' : 'bg-purple text-violet',
        className,
      )}
    >
      <SectionContainer noSpacing={isMenu} className={isMenu ? '' : 'pt-8'}>
        <h2 className="mx-auto mb-3 text-center text-title-md font-extrabold tracking-wide">
          <span className="font-thin">LA</span>
          LUNETTERIE
          <span className="font-thin">DU</span>
          COIN
        </h2>

        <div
          className={clsx(
            'mx-auto w-fit max-w-5xl',
            isMenu
              ? 'flex flex-col items-center space-y-2'
              : 'grid sm:grid-cols-2 sm:gap-x-12 md:gap-x-16 3xl:gap-x-20 4xl:gap-x-24 5xl:gap-x-28',
          )}
        >
          {' '}
          <address
            aria-label="Adresse et horaires de la boutique"
            className="space-y-1 text-center text-text-base not-italic leading-relaxed sm:text-left"
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
          {!isMenu && (
            <nav
              aria-label="Navigation de bas de page"
              className="flex flex-col items-center space-y-4 text-text-base sm:items-start"
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

              <p className="text-center text-text-base">
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
          )}
        </div>
      </SectionContainer>
    </footer>
  );
}
