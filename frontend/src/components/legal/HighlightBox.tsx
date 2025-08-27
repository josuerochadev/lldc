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
  className = '' 
}: HighlightBoxProps) {
  const variants = {
    info: {
      container: 'bg-blue-50 border-l-4 border-blue-400',
      title: 'text-blue-800',
      content: 'text-blue-700'
    },
    warning: {
      container: 'bg-orange-50 border-l-4 border-orange-400',
      title: 'text-orange-800', 
      content: 'text-orange-700'
    },
    important: {
      container: 'bg-green-50 border-l-4 border-green-400',
      title: 'text-green-800',
      content: 'text-green-700'
    }
  };

  const style = variants[variant];

  return (
    <div className={`${style.container} p-4 my-6 rounded-r-md ${className}`} role="note">
      {title && (
        <h4 className={`font-bold mb-2 ${style.title}`}>
          {title}
        </h4>
      )}
      <div className={`${style.content} space-y-2`}>
        {children}
      </div>
    </div>
  );
}