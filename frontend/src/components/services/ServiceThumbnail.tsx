// src/components/services/ServiceThumbnail.tsx
import clsx from 'clsx';

interface ServiceThumbnailProps {
  image: string;
  title: string;
  isActive: boolean;
  index: number;
  onClick: () => void;
}

/**
 * Composant React pour afficher une miniature de service sous forme de bouton accessible.
 *
 * @param {object} props - Les propriétés du composant.
 * @param {string} props.image - L'URL de l'image à afficher comme miniature.
 * @param {string} props.title - Le titre du service, utilisé pour l'accessibilité.
 * @param {boolean} props.isActive - Indique si la miniature est active (sélectionnée).
 * @param {number} props.index - L'index de la miniature, utilisé pour les attributs ARIA.
 * @param {() => void} props.onClick - Fonction appelée lors du clic sur la miniature.
 *
 * @returns {JSX.Element} Un bouton stylisé contenant l'image du service.
 */

export default function ServiceThumbnail({
  image,
  title,
  isActive,
  index,
  onClick,
}: ServiceThumbnailProps) {
  return (
    <button
      type="button"
      role="tab"
      id={`tab-${index}`}
      aria-controls={`tabpanel-${index}`}
      aria-label={`Voir ${title}`}
      aria-selected={isActive}
      tabIndex={isActive ? 0 : -1}
      onClick={onClick}
      className={clsx(
        'focus-style transition-transform duration-250 hover:scale-105',
        isActive ? 'opacity-100' : 'opacity-60',
      )}
    >
      <img src={image} alt={title} className="h-24 w-24 object-contain" />
    </button>
  );
}
