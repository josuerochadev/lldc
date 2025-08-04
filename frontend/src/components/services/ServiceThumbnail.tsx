// src/components/services/ServiceThumbnail.tsx
import clsx from 'clsx';

interface ServiceThumbnailProps {
  image: string;
  title: string;
  isActive: boolean;
  index: number;
  onClick: () => void;
}

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
