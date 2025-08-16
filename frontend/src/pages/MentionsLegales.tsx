import Layout from '@/components/common/Layout';
import SectionContainer from '@/components/common/SectionContainer';
import PageHeader from '@/components/common/PageHeader';
import {
  COMPANY_NAME,
  COMPANY_LEGAL_FORM,
  COMPANY_ADDRESS,
  COMPANY_SIRET,
  COMPANY_RCS,
  PUBLICATION_DIRECTOR,
  COMPANY_EMAIL,
  COMPANY_PHONE,
  COMPANY_SHARE_CAPITAL,
  COMPANY_VAT,
  HOST_NAME,
  HOST_ADDRESS,
  HOST_PHONE,
} from '@/config/constants';
import { Seo } from '@/seo/Seo';

export default function MentionsLegales() {
  return (
    <>
      <Seo
        title="Mentions légales"
        description="Informations légales de La Lunetterie Du Coin Neuf & Occasion."
        canonicalPath="/mentions-legales"
      />
      <div className="relative z-base">
        <Layout>
          <SectionContainer className="pt-section-md pb-section">
            <PageHeader title="Mentions légales" />
            <article className="max-w-content space-y-section-gap">
              <h3 className="font-serif text-title-md font-bold">Éditeur du site</h3>
              <p className="text-text-base">
                <strong>Nom&nbsp;:</strong> {COMPANY_NAME}
                <br />
                <strong>Forme juridique&nbsp;:</strong> {COMPANY_LEGAL_FORM}{' '}
                {COMPANY_SHARE_CAPITAL ? `(capital social : ${COMPANY_SHARE_CAPITAL})` : null}
                <br />
                <strong>Siège social&nbsp;:</strong> {COMPANY_ADDRESS}
                <br />
                <strong>SIRET&nbsp;:</strong> {COMPANY_SIRET}
                <br />
                <strong>RCS&nbsp;:</strong> {COMPANY_RCS}
                <br />
                <strong>TVA intracommunautaire&nbsp;:</strong> {COMPANY_VAT || 'N/A'}
                <br />
                <strong>Directeur de la publication&nbsp;:</strong> {PUBLICATION_DIRECTOR}
              </p>

              <h3 className="font-serif text-title-md font-bold">Contact</h3>
              <p className="text-text-base">
                Email&nbsp;: {COMPANY_EMAIL || '—'}
                <br />
                Téléphone&nbsp;: {COMPANY_PHONE || '—'}
              </p>

              <h3 className="font-serif text-title-md font-bold">Hébergeur</h3>
              <p className="text-text-base">
                {HOST_NAME ? (
                  <>
                    {HOST_NAME}
                    <br />
                    {HOST_ADDRESS}
                    <br />
                    {HOST_PHONE ? <>Tél.&nbsp;: {HOST_PHONE}</> : null}
                  </>
                ) : (
                  <>À compléter : nom de l’hébergeur, adresse postale, téléphone.</>
                )}
              </p>

              <h3 className="font-serif text-title-md font-bold">Propriété intellectuelle</h3>
              <p className="text-text-base">
                Le site et l’ensemble de ses contenus (textes, images, logos, éléments graphiques)
                sont protégés par le droit d’auteur. Toute reproduction ou représentation, totale ou
                partielle, sans autorisation préalable, est interdite.
              </p>

              <h3 className="font-serif text-title-md font-bold">Données personnelles & cookies</h3>
              <p className="text-text-base">
                Pour toute demande relative à la protection des données, contactez l’éditeur aux
                coordonnées ci-dessus. Si des traceurs/cookies tiers sont utilisés, une politique de
                confidentialité et une bannière cookies doivent être mises en place.
              </p>
              <h3 className="font-serif text-title-md font-bold">Médiation de la consommation</h3>
              <p className="text-text-base">
                Conformément à l’article L.612-1 du Code de la consommation, le client peut recourir
                à un médiateur de la consommation gratuitement. À compléter&nbsp;: organisme de
                médiation choisi et modalités de saisine.
              </p>
            </article>
          </SectionContainer>
        </Layout>
      </div>
    </>
  );
}
