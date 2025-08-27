import type { MouseEvent } from 'react';

type TableOfContentsProps = {
  sections: Array<{
    id: string;
    title: string;
  }>;
  className?: string;
};

/**
 * Table des matières interactive pour les pages légales
 * 
 * Génère une navigation interne avec ancres vers les sections
 * du document pour améliorer l'accessibilité et l'expérience utilisateur.
 * 
 * @component
 * @param {TableOfContentsProps} props - Les propriétés du composant
 * @returns {JSX.Element} Navigation sous forme de table des matières
 */
export default function TableOfContents({ sections, className = '' }: TableOfContentsProps) {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      // Focus management for accessibility
      element.focus({ preventScroll: true });
    }
  };

  return (
    <nav 
      aria-label="Table des matières"
      className={`mb-8 rounded-btn border-2 border-purple/20 bg-violet/10 p-6 ${className}`}
    >
      <h2 className="mb-4 font-serif text-title-sm font-bold text-purple">
        Sommaire
      </h2>
      <ul className="space-y-3">
        {sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              onClick={(e) => handleClick(e, section.id)}
              className="group inline-flex items-start gap-2 text-text-base transition-colors hover:text-purple focus:text-purple focus:outline-none focus:ring-2 focus:ring-purple/50 focus:ring-offset-2 rounded-sm"
            >
              <span className="mt-1 text-purple opacity-60 group-hover:opacity-100 group-focus:opacity-100 transition-opacity">
                →
              </span>
              <span className="group-hover:underline underline-offset-2">
                {section.title}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}