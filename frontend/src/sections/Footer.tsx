import type { ComponentPropsWithoutRef } from 'react';
import { clsx } from 'clsx';
import { Facebook, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

import SectionContainer from '../components/common/SectionContainer';

import { FOOTER_LINKS, FOOTER_SOCIALS } from '@/config/constants';

type FooterProps = ComponentPropsWithoutRef<'footer'> & {
  variant?: 'default' | 'menu';
};

/**
 * Composant Footer pour l'affichage du pied de page du site.
 *
 * Affiche l'adresse, les horaires, les liens sociaux, les liens légaux et une signature de développement.
 * Le rendu varie selon la variante passée en props :
 * - `variant="menu"` : version compacte pour affichage dans un menu.
 * - `variant="default"` (par défaut) : version complète avec navigation et réseaux sociaux.
 *
 * @component
 * @param {FooterProps} props - Propriétés du composant Footer.
 * @param {string} [props.className] - Classes CSS additionnelles à appliquer au footer.
 * @param {'default' | 'menu'} [props.variant] - Variante d'affichage du footer.
 * @param {object} [props.rest] - Autres propriétés passées au composant.
 *
 * @example
 * ```tsx
 * <Footer />
 * <Footer variant="menu" className="my-custom-class" />
 * ```
 */
export default function Footer({ className = '', variant = 'default', ...rest }: FooterProps) {
  const isMenu = variant === 'menu';
  const footerLinkBase =
    'font-semibold transition-colors duration-300 hover:text-orange focus-style';

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
          {/* Adresse et horaires */}
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
              {/* Réseaux sociaux en premier */}
              <div className="flex space-x-4 pt-2" aria-label="Réseaux sociaux">
                {FOOTER_SOCIALS.map((social) => (
                  <a
                    key={social.href}
                    href={social.href}
                    className={footerLinkBase}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                  >
                    {social.icon === 'facebook' && <Facebook size={18} className="mr-1 inline" />}
                    {social.icon === 'instagram' && <Instagram size={18} className="mr-1 inline" />}
                    <span className="sr-only">{social.label}</span>
                  </a>
                ))}
              </div>

              {/* Liens légaux ensuite */}
              {FOOTER_LINKS.map((link) => (
                <Link key={link.href} className={footerLinkBase} to={link.href}>
                  {link.label}
                </Link>
              ))}

              {/* Signature */}
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
