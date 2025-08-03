// src/components/common/Footer.tsx

import type { ComponentPropsWithoutRef } from 'react';
import { clsx } from 'clsx';

import SectionContainer from '../components/common/SectionContainer';

type FooterProps = ComponentPropsWithoutRef<'footer'> & {
  variant?: 'default' | 'menu';
};

export default function Footer({ className = '', variant = 'default', ...rest }: FooterProps) {
  const isMenu = variant === 'menu';
  const footerLinkBase =
    'font-semibold transition-colors duration-300 hover:text-orange focus-visible:outline-none focus-visible:rounded-md focus-visible:ring-orange';

  return (
    <footer
      id="footer"
      {...rest}
      className={clsx(
        'relative z-10 w-full',
        isMenu ? 'bg-transparent py-2 text-center text-purple' : 'bg-purple text-violet',
        className,
      )}
    >
      <SectionContainer noSpacing={isMenu} className={isMenu ? '' : 'pt-8'}>
        <h2 className="mx-auto mb-3 text-center text-title-md font-extrabold">
          <span className="font-thin">LA</span>
          LUNETTERIE
          <span className="font-thin">DU</span>
          COIN
        </h2>

        <div
          className={clsx(
            'mx-auto w-fit',
            isMenu
              ? 'flex flex-col items-center space-y-2'
              : 'grid items-baseline gap-x-section-gap sm:grid-cols-2',
          )}
        >
          <address
            aria-label="Adresse et horaires de la boutique"
            className="space-y-1 text-center text-text-footer not-italic leading-relaxed sm:text-left"
          >
            <p>24&nbsp;Rue&nbsp;du&nbsp;Faubourg-de-Pierre&nbsp;67000&nbsp;STRASBOURG</p>
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
              className="flex flex-col items-center space-y-4 text-text-footer sm:items-start"
            >
              <a className={footerLinkBase} href="/mentions-legales">
                Mentions légales
              </a>
              <a className={footerLinkBase} href="/conditions-de-vente">
                Conditions de vente
              </a>

              <p className="pt-3 text-center text-text-footer">
                Développé&nbsp;par{' '}
                <a
                  href="https://josuerochadev.github.io/portfolio/"
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
