import SectionContainer from '../components/common/SectionContainer';

export default function ConditionsDeVente() {
  return (
    <SectionContainer>
      <h1 className="mb-8 text-title-lg font-extrabold">Conditions Générales de Vente</h1>
      <article className="prose prose-lg">
        <h2>LaLunetterieDuCoin</h2>
        <p>
          Les lunettes sont manufacturées par nos spécialistes expérimentés et conçues à partir de
          matériaux nobles. Il est important de traiter vos lunettes avec délicatesse. Les
          ajustages, nettoyages ainsi que le remplacement des plaquettes et visseries sont gratuit
          pour nos client.es.
        </p>

        <h3>Politique de retour</h3>
        <p>
          Il n'existe aucun droit de rétractation pour l'achat de produits personnalisés en
          boutique.
          <br />
          Seuls les produits neufs et en parfait état d'origine, accompagnés des accessoires,
          pourront être retournés contre un échange ou un avoir dans un délai de trente (30) jours à
          compter de la date d'achat.
          <br />
          Les montures personnalisées, ajustées ne pourront êtres retournées. Cette politique de
          retour vient s'ajouter aux droits issus des garanties légales des produits défectueux et
          des vices cachés et peut être soumise à d'autres conditions.
        </p>

        <h3>Changement de puissance des verres</h3>
        <p>
          En cas de changements de puissances de verres, suivant les trente (30) jours de la
          livraison de l'équipement, une franchise de quatre vingt dix (90) euros pour les verres
          progressifs et quarante cinq (45) euros pour les verres unifocaux est appliquée pour
          l'ensemble de la commande.
        </p>

        <h3>Règlement par chèque et tiers payant</h3>
        <p>
          Les règlements par chèques sont acceptés sur présentation d'une pièce d'identité
          concordante. Nous nous réservons le droit d'annuler le règlement par tiers payant.
        </p>

        <h3>Offres commerciales</h3>
        <ul>
          <li>
            <b>L'offre de remise à la reprise</b> est limitée à une monture par transaction. Elle
            est valable uniquement à condition d'achat d'un équipement de classe B. L'offre de
            remise à la reprise est non compatible avec d'autres promotions exceptionnelles.
          </li>
          <li>
            <b>L'offre de seconde paire</b> est valable sur la monture la moins coûteuse pour
            l'achat d'un équipement de classe B et est cumulable avec l'offre de remise à la
            reprise. Non valable pour double équipement Komono et Myorelax. Monayant +40€ il est
            possible d'inclure à cette offre l'option polarisée sur les solaires ou double cozylens.
          </li>
        </ul>
      </article>
    </SectionContainer>
  );
}
