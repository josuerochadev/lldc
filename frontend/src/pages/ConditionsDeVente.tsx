// src/pages/ConditionsDeVente.tsx
import LegalPageLayout from '@/components/legal/LegalPageLayout';
import TableOfContents from '@/components/legal/TableOfContents';
import HighlightBox from '@/components/legal/HighlightBox';
import PrintButton from '@/components/legal/PrintButton';

const sections = [
  { id: 'introduction', title: 'Introduction' },
  { id: 'politique-retour', title: 'Politique de retour' },
  { id: 'changement-puissance', title: 'Changement de puissance des verres' },
  { id: 'reglement', title: 'Règlement par chèque et tiers payant' },
  { id: 'offres-commerciales', title: 'Offres commerciales' },
];

export default function ConditionsDeVente() {
  return (
    <LegalPageLayout
      title="Conditions Générales de Vente"
      seoDescription="Conditions de vente, politique de retour et garanties de La Lunetterie Du Coin Neuf & Occasion."
      canonicalPath="/conditions-de-vente"
      lastUpdated="Décembre 2024"
    >
      <TableOfContents sections={sections} />

      <h3 id="introduction" className="font-serif text-title-md font-bold" tabIndex={-1}>
        Fabrication et qualité
      </h3>
      <p className="text-text-base">
        Les lunettes sont manufacturées par nos spécialistes expérimentés et conçues à
        partir de matériaux nobles. Il est important de traiter vos lunettes avec
        délicatesse. Les ajustages, nettoyages ainsi que le remplacement des plaquettes et
        visseries sont gratuits pour nos client·es.
      </p>

      <h3 id="politique-retour" className="font-serif text-title-md font-bold" tabIndex={-1}>
        Politique de retour
      </h3>
      
      <HighlightBox title="Points importants à retenir" variant="warning">
        <ul className="space-y-2">
          <li>• <strong>Pas de droit de rétractation</strong> pour les produits personnalisés</li>
          <li>• <strong>30 jours</strong> pour retourner les produits neufs en parfait état</li>
          <li>• <strong>Montures personnalisées non retournables</strong></li>
        </ul>
      </HighlightBox>

      <p className="text-text-base">
        Il n&apos;existe aucun droit de rétractation pour l&apos;achat de produits
        personnalisés en boutique.
        <br />
        Seuls les produits neufs et en parfait état d&apos;origine, accompagnés des
        accessoires, pourront être retournés contre un échange ou un avoir dans un délai de
        trente (30) jours à compter de la date d&apos;achat.
        <br />
        Les montures personnalisées et ajustées ne pourront pas être retournées. Cette
        politique s'ajoute aux garanties légales (conformité et vices cachés) et peut être
        soumise à d&apos;autres conditions.
      </p>

      <h3 id="changement-puissance" className="font-serif text-title-md font-bold" tabIndex={-1}>
        Changement de puissance des verres
      </h3>

      <HighlightBox title="Tarifs franchise" variant="info">
        <ul className="space-y-1">
          <li>• <strong>Verres progressifs :</strong> 90€ de franchise</li>
          <li>• <strong>Verres unifocaux :</strong> 45€ de franchise</li>
          <li>• <strong>Délai :</strong> 30 jours après livraison</li>
        </ul>
      </HighlightBox>

      <p className="text-text-base">
        En cas de changement de puissance des verres dans les trente (30) jours suivant la
        livraison, une franchise de 90&nbsp;€ pour les verres progressifs et 45&nbsp;€ pour
        les verres unifocaux est appliquée pour l&apos;ensemble de la commande.
      </p>

      <h3 id="reglement" className="font-serif text-title-md font-bold" tabIndex={-1}>
        Règlement par chèque et tiers payant
      </h3>
      <p className="text-text-base">
        Les règlements par chèque sont acceptés sur présentation d&apos;une pièce
        d&apos;identité concordante. Nous nous réservons le droit d&apos;annuler le
        règlement par tiers payant.
      </p>

      <h3 id="offres-commerciales" className="font-serif text-title-md font-bold" tabIndex={-1}>
        Offres commerciales
      </h3>
      
      <HighlightBox title="Conditions importantes" variant="important">
        <p>Ces offres ne sont pas cumulables avec d'autres promotions exceptionnelles et sont soumises aux conditions détaillées ci-dessous.</p>
      </HighlightBox>

      <ul className="list-disc space-y-4 pl-6">
        <li className="text-text-base">
          <strong>Remise à la reprise&nbsp;</strong>: limitée à une monture par transaction.
          Valable uniquement avec l'achat d'un équipement de classe B. Non cumulable avec
          d&apos;autres promotions exceptionnelles.
        </li>
        <li className="text-text-base">
          <strong>Seconde paire&nbsp;</strong>: valable sur la monture la moins coûteuse
          pour l&apos;achat d&apos;un équipement de classe B, cumulable avec la remise à la
          reprise. Non valable pour double équipement Komono et Myorelax. Moyennant
          +40&nbsp;€, option polarisée sur solaires ou double CozyLens possible.
        </li>
      </ul>

      <PrintButton />
    </LegalPageLayout>
  );
}