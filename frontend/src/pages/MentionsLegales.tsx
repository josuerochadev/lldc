import Background from '@/components/common/Background';
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

export default function MentionsLegales() {
  return (
    <>
      <Background />
      <div className="relative z-base">
        <Layout>
          <SectionContainer className="pb-section pt-section-sm">
            <PageHeader title="Mentions légales" />
            <article className="max-w-content space-y-section-gap">
              <h2 className="text-title-md font-extrabold">Éditeur du site</h2>
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

              <h2 className="text-title-md font-extrabold">Contact</h2>
              <p className="text-text-base">
                Email&nbsp;: {COMPANY_EMAIL || '—'}
                <br />
                Téléphone&nbsp;: {COMPANY_PHONE || '—'}
              </p>

              <h2 className="text-title-md font-extrabold">Hébergeur</h2>
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

              <h2 className="text-title-md font-extrabold">Propriété intellectuelle</h2>
              <p className="text-text-base">
                Le site et l’ensemble de ses contenus (textes, images, logos, éléments graphiques)
                sont protégés par le droit d’auteur. Toute reproduction ou représentation, totale ou
                partielle, sans autorisation préalable, est interdite.
              </p>

              <h2 className="text-title-md font-extrabold">Données personnelles & cookies</h2>
              <p className="text-text-base">
                Pour toute demande relative à la protection des données, contactez l’éditeur aux
                coordonnées ci-dessus. Si des traceurs/cookies tiers sont utilisés, une politique de
                confidentialité et une bannière cookies doivent être mises en place.
              </p>
              <h2 className="text-title-md font-extrabold">Médiation de la consommation</h2>
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
