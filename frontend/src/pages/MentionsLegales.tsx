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

      <h3 id="editeur" className="font-serif text-title-md font-bold" tabIndex={-1}>
        Éditeur du site
      </h3>
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

      <h3 id="contact" className="font-serif text-title-md font-bold" tabIndex={-1}>
        Contact
      </h3>
      <HighlightBox title="Nous contacter" variant="info">
        <p>
          <strong>Email :</strong>{' '}
          <a href={`mailto:${COMPANY_EMAIL}`} className="text-purple hover:underline">
            {COMPANY_EMAIL}
          </a>
        </p>
        <p>
          <strong>Téléphone :</strong>{' '}
          <a href={`tel:${COMPANY_PHONE}`} className="text-purple hover:underline">
            {COMPANY_PHONE}
          </a>
        </p>
      </HighlightBox>

      <h3 id="hebergeur" className="font-serif text-title-md font-bold" tabIndex={-1}>
        Hébergeur
      </h3>
      <p className="text-text-base">
        <strong>{HOST_NAME}</strong>
        <br />
        {HOST_ADDRESS}
      </p>

      <h3 id="propriete-intellectuelle" className="font-serif text-title-md font-bold" tabIndex={-1}>
        Propriété intellectuelle
      </h3>
      <p className="text-text-base">
        Le site et l'ensemble de ses contenus (textes, images, logos, éléments graphiques)
        sont protégés par le droit d'auteur. Toute reproduction ou représentation, totale ou
        partielle, sans autorisation préalable, est interdite.
      </p>

      <h3 id="donnees-personnelles" className="font-serif text-title-md font-bold" tabIndex={-1}>
        Données personnelles & cookies
      </h3>
      <p className="text-text-base">
        Pour toute demande relative à la protection des données, contactez l'éditeur aux
        coordonnées ci-dessus. Si des traceurs/cookies tiers sont utilisés, une politique de
        confidentialité et une bannière cookies doivent être mises en place.
      </p>

      <h3 id="mediation" className="font-serif text-title-md font-bold" tabIndex={-1}>
        Médiation de la consommation
      </h3>
      <p className="text-text-base">
        Conformément à l'article L.612-1 du Code de la consommation, le client peut recourir
        à un médiateur de la consommation gratuitement.
      </p>
      <HighlightBox title="Médiateur compétent" variant="important">
        <p>
          <strong>{MEDIATOR_NAME}</strong>
        </p>
        <p>{MEDIATOR_ADDRESS}</p>
        <p>
          <a href={MEDIATOR_URL} target="_blank" rel="noopener noreferrer" className="text-purple hover:underline">
            Plus d'informations sur la médiation
          </a>
        </p>
      </HighlightBox>

      <PrintButton />
    </LegalPageLayout>
  );
}