// src/pages/ConditionsDeVente.tsx
import { Link } from 'react-router-dom';

import Background from '@/components/common/Background';
import Layout from '@/components/common/Layout';
import SectionContainer from '@/components/common/SectionContainer';
import SectionTitle from '@/components/common/SectionTitle';

export default function ConditionsDeVente() {
  return (
    <>
      <Background />
      <div className="relative z-10">
        <Layout>
          <SectionContainer className="py-section">
            <header className="mb-8">
              <SectionTitle title="Conditions Générales de Vente" />
              <nav aria-label="Fil d’Ariane" className="mt-4">
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 underline underline-offset-4 hover:no-underline focus:outline-none focus-visible:ring"
                  aria-label="Revenir à la page d’accueil"
                >
                  ← Retour à l’accueil
                </Link>
              </nav>
            </header>

            <article className="prose prose-lg max-w-none">
              <h2>La Lunetterie du Coin</h2>
              <p>
                Les lunettes sont manufacturées par nos spécialistes expérimentés et conçues à
                partir de matériaux nobles. Il est important de traiter vos lunettes avec
                délicatesse. Les ajustages, nettoyages ainsi que le remplacement des plaquettes et
                visseries sont gratuits pour nos client·es.
              </p>

              <h3>Politique de retour</h3>
              <p>
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

              <h3>Changement de puissance des verres</h3>
              <p>
                En cas de changement de puissance des verres dans les trente (30) jours suivant la
                livraison, une franchise de 90&nbsp;€ pour les verres progressifs et 45&nbsp;€ pour
                les verres unifocaux est appliquée pour l&apos;ensemble de la commande.
              </p>

              <h3>Règlement par chèque et tiers payant</h3>
              <p>
                Les règlements par chèque sont acceptés sur présentation d&apos;une pièce
                d&apos;identité concordante. Nous nous réservons le droit d&apos;annuler le
                règlement par tiers payant.
              </p>

              <h3>Offres commerciales</h3>
              <ul>
                <li>
                  <strong>Remise à la reprise&nbsp;</strong>: limitée à une monture par transaction.
                  Valable uniquement avec l’achat d’un équipement de classe B. Non cumulable avec
                  d&apos;autres promotions exceptionnelles.
                </li>
                <li>
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
