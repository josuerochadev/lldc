// src/pages/ConditionsDeVente.tsx
import Background from '@/components/common/Background';
import Layout from '@/components/common/Layout';
import SectionContainer from '@/components/common/SectionContainer';
import PageHeader from '@/components/common/PageHeader';
import { Seo } from '@/seo/Seo';

export default function ConditionsDeVente() {
  return (
    <>
      <Seo
        title="Page introuvable"
        description="La page demandée n'existe pas."
        canonicalPath="/404"
        noIndex
      />
      <Background />
      <div className="relative z-base">
        <Layout>
          <SectionContainer className="pb-section pt-section-md">
            <PageHeader title="Conditions Générales de Vente" />

            <article className="max-w-content space-y-section-gap">
              <h2 className="text-title-lg font-extrabold">
                <span className="font-thin">LA</span>
                LUNETTERIE
                <span className="font-thin">DU</span>
                COIN
              </h2>
              <p className="text-text-base">
                Les lunettes sont manufacturées par nos spécialistes expérimentés et conçues à
                partir de matériaux nobles. Il est important de traiter vos lunettes avec
                délicatesse. Les ajustages, nettoyages ainsi que le remplacement des plaquettes et
                visseries sont gratuits pour nos client·es.
              </p>

              <h3 className="text-title-md font-bold">Politique de retour</h3>
              <p className="text-text-base">
                Il n&apos;existe aucun droit de rétractation pour l&apos;achat de produits
                personnalisés en boutique.
                <br />
                Seuls les produits neufs et en parfait état d&apos;origine, accompagnés des
                accessoires, pourront être retournés contre un échange ou un avoir dans un délai de
                trente (30) jours à compter de la date d&apos;achat.
                <br />
                Les montures personnalisées et ajustées ne pourront pas être retournées. Cette
                politique s’ajoute aux garanties légales (conformité et vices cachés) et peut être
                soumise à d&apos;autres conditions.
              </p>

              <h3 className="text-title-md font-bold">Changement de puissance des verres</h3>
              <p className="text-text-base">
                En cas de changement de puissance des verres dans les trente (30) jours suivant la
                livraison, une franchise de 90&nbsp;€ pour les verres progressifs et 45&nbsp;€ pour
                les verres unifocaux est appliquée pour l&apos;ensemble de la commande.
              </p>

              <h3 className="text-title-md font-bold">Règlement par chèque et tiers payant</h3>
              <p className="text-text-base">
                Les règlements par chèque sont acceptés sur présentation d&apos;une pièce
                d&apos;identité concordante. Nous nous réservons le droit d&apos;annuler le
                règlement par tiers payant.
              </p>

              <h3 className="text-title-md font-bold">Offres commerciales</h3>
              <ul className="list-disc space-y-2 pl-6">
                <li className="text-text-base">
                  <strong>Remise à la reprise&nbsp;</strong>: limitée à une monture par transaction.
                  Valable uniquement avec l’achat d’un équipement de classe B. Non cumulable avec
                  d&apos;autres promotions exceptionnelles.
                </li>
                <li className="text-text-base">
                  <strong>Seconde paire&nbsp;</strong>: valable sur la monture la moins coûteuse
                  pour l&apos;achat d&apos;un équipement de classe B, cumulable avec la remise à la
                  reprise. Non valable pour double équipement Komono et Myorelax. Moyennant
                  +40&nbsp;€, option polarisée sur solaires ou double CozyLens possible.
                </li>
              </ul>
            </article>
          </SectionContainer>
        </Layout>
      </div>
    </>
  );
}
