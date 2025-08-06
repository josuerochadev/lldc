import { motion } from 'framer-motion';

type MenuLinkItemProps = {
  label: string;
  href: string;
  index: number;
  onClick: () => void;
};

/**
 * Composant React représentant un lien de menu stylisé.
 *
 * Affiche un lien avec un index, où le premier mot du label est en police fine
 * et le reste en police extra-gras. Ajoute une animation de mise à l'échelle au survol.
 *
 * @param label - Le texte à afficher pour le lien de menu.
 * @param href - L'URL vers laquelle le lien pointe.
 * @param index - L'index du lien dans la liste, utilisé pour l'affichage de l'ordre.
 * @param onClick - Fonction appelée lors du clic sur le lien.
 *
 * @returns Un élément de lien animé pour le menu de navigation.
 */
export default function MenuLinkItem({ label, href, index, onClick }: MenuLinkItemProps) {
  const [first, ...rest] = label.split(' ');
  const last = rest.join(' ');

  return (
    <motion.a
      href={href}
      onClick={onClick}
      className="flex items-baseline uppercase transition hover:scale-110"
      whileHover={{ scale: 1.1 }}
    >
      <span className="mr-4 text-title-sm font-thin">{index + 1}.</span>
      <span className="flex flex-wrap gap-x-1 text-title-lg">
        <span className="font-thin">{first}</span>
        {last && <span className="font-extrabold">{last}</span>}
      </span>
    </motion.a>
  );
}
