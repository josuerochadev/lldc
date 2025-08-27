import type { ReactNode } from 'react';

type HighlightBoxProps = {
  title?: string;
  variant?: 'info' | 'warning' | 'important';
  children: ReactNode;
  className?: string;
};

/**
 * Composant de mise en évidence pour informations importantes
 *
 * Affiche du contenu dans un encadré coloré selon le variant :
 * - info : bleu (informations générales)
 * - warning : orange (avertissements)
 * - important : vert (points essentiels)
 *
 * @component
 * @param props - Les propriétés du composant
 * @returns Encadré de mise en évidence
 */
export default function HighlightBox({
  title,
  variant = 'info',
  children,
  className = '',
}: HighlightBoxProps) {
  const variants = {
    info: {
      container: 'border-l-2 border-dark-green',
      title: 'text-purple font-semibold',
      content: 'text-purple',
    },
    warning: {
      container: 'border-l-2 border-orange',
      title: 'text-purple font-semibold',
      content: 'text-purple',
    },
    important: {
      container: 'border-l-2 border-dark-green',
      title: 'text-purple font-bold',
      content: 'text-purple font-medium',
    },
  };

  const style = variants[variant];

  return (
    <div className={`${style.container} my-6 py-4 pl-6 ${className}`} role="note">
      {title && <h4 className={`mb-3 ${style.title}`}>{title}</h4>}
      <div className={`${style.content} space-y-2`}>{children}</div>
    </div>
  );
}
