import LegalPageLayout from '@/components/legal/LegalPageLayout';
import TableOfContents from '@/components/legal/TableOfContents';
import HighlightBox from '@/components/legal/HighlightBox';
import PrintButton from '@/components/legal/PrintButton';
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
  MEDIATOR_NAME,
  MEDIATOR_URL,
  MEDIATOR_ADDRESS,
} from '@/config/constants';

const sections = [
  { id: 'editeur', title: 'Éditeur du site' },
  { id: 'contact', title: 'Contact' },
  { id: 'hebergeur', title: 'Hébergeur' },
  { id: 'propriete-intellectuelle', title: 'Propriété intellectuelle' },
  { id: 'donnees-personnelles', title: 'Données personnelles & cookies' },
  { id: 'mediation', title: 'Médiation de la consommation' },
];

export default function MentionsLegales() {
  return (
    <LegalPageLayout
      title="Mentions légales"
      seoDescription="Informations légales de La Lunetterie Du Coin Neuf & Occasion."
      canonicalPath="/mentions-legales"
      lastUpdated="Décembre 2024"
    >
      <TableOfContents sections={sections} />

      <section className="space-y-8">
        <h2 id="editeur" className="font-serif text-title-lg font-bold text-purple" tabIndex={-1}>
          Éditeur du site
        </h2>

        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <p className="text-text-base leading-relaxed">
                <strong className="font-semibold text-purple">Nom :</strong>
                <br />
                {COMPANY_NAME}
              </p>
            </div>
            <div>
              <p className="text-text-base leading-relaxed">
                <strong className="font-semibold text-purple">Forme juridique :</strong>
                <br />
                {COMPANY_LEGAL_FORM}{' '}
                {COMPANY_SHARE_CAPITAL ? `(capital social : ${COMPANY_SHARE_CAPITAL})` : ''}
              </p>
            </div>
          </div>

          <div className="space-y-3 pt-4">
            <p className="text-text-base leading-relaxed">
              <strong className="font-semibold text-purple">Siège social :</strong>
              <br />
              {COMPANY_ADDRESS}
            </p>
            <p className="text-text-base leading-relaxed">
              <strong className="font-semibold text-purple">SIRET :</strong> {COMPANY_SIRET}
              <span className="mx-4">•</span>
              <strong className="font-semibold text-purple">RCS :</strong> {COMPANY_RCS}
            </p>
            <p className="text-text-base leading-relaxed">
              <strong className="font-semibold text-purple">TVA intracommunautaire :</strong>{' '}
              {COMPANY_VAT || 'N/A'}
            </p>
            <p className="text-text-base leading-relaxed">
              <strong className="font-semibold text-purple">Directeur de la publication :</strong>{' '}
              {PUBLICATION_DIRECTOR}
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <h2 id="contact" className="font-serif text-title-lg font-bold text-purple" tabIndex={-1}>
          Contact
        </h2>

        <HighlightBox title="Nous contacter" variant="info">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <p className="text-purple">
              <strong>Email :</strong>
              <br />
              <a
                href={`mailto:${COMPANY_EMAIL}`}
                className="text-purple underline underline-offset-2 font-normal hover:font-semibold transition-all"
              >
                {COMPANY_EMAIL}
              </a>
            </p>
            <p className="text-purple">
              <strong>Téléphone :</strong>
              <br />
              <a
                href={`tel:${COMPANY_PHONE}`}
                className="text-purple underline underline-offset-2 font-normal hover:font-semibold transition-all"
              >
                {COMPANY_PHONE}
              </a>
            </p>
          </div>
        </HighlightBox>
      </section>

      <section className="space-y-8">
        <h2 id="hebergeur" className="font-serif text-title-lg font-bold text-purple" tabIndex={-1}>
          Hébergeur
        </h2>

        <div className="space-y-3">
          <p className="text-text-base leading-relaxed">
            <strong className="font-semibold text-purple">{HOST_NAME}</strong>
          </p>
          <p className="text-text-base leading-relaxed text-purple/80">{HOST_ADDRESS}</p>
        </div>
      </section>

      <section className="space-y-8">
        <h2
          id="propriete-intellectuelle"
          className="font-serif text-title-lg font-bold text-purple"
          tabIndex={-1}
        >
          Propriété intellectuelle
        </h2>

        <p className="text-text-base leading-relaxed">
          Le site et l'ensemble de ses contenus (textes, images, logos, éléments graphiques) sont
          protégés par le droit d'auteur. Toute reproduction ou représentation, totale ou partielle,
          sans autorisation préalable, est interdite.
        </p>
      </section>

      <section className="space-y-8">
        <h2
          id="donnees-personnelles"
          className="font-serif text-title-lg font-bold text-purple"
          tabIndex={-1}
        >
          Données personnelles & cookies
        </h2>

        <p className="text-text-base leading-relaxed">
          Pour toute demande relative à la protection des données, contactez l'éditeur aux
          coordonnées ci-dessus. Si des traceurs/cookies tiers sont utilisés, une politique de
          confidentialité et une bannière cookies doivent être mises en place.
        </p>
      </section>

      <section className="space-y-8">
        <h2 id="mediation" className="font-serif text-title-lg font-bold text-purple" tabIndex={-1}>
          Médiation de la consommation
        </h2>

        <p className="mb-6 text-text-base leading-relaxed">
          Conformément à l'article L.612-1 du Code de la consommation, le client peut recourir à un
          médiateur de la consommation gratuitement.
        </p>

        <HighlightBox title="Médiateur compétent" variant="important">
          <div className="space-y-3">
            <p className="font-medium text-purple">
              <strong>{MEDIATOR_NAME}</strong>
            </p>
            <p className="leading-relaxed text-purple/80">{MEDIATOR_ADDRESS}</p>
            <p>
              <a
                href={MEDIATOR_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-purple underline underline-offset-2 hover:font-semibold transition-all"
              >
                Plus d'informations sur la médiation →
              </a>
            </p>
          </div>
        </HighlightBox>
      </section>

      <PrintButton />
    </LegalPageLayout>
  );
}
