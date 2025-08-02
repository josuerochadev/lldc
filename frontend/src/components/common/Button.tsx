import type React from 'react';

import { cn } from '@/lib/cn';

/**
 * Bouton personnalisable compatible avec le design system du projet.
 *
 * @component
 * @param {object} props
 * @param {React.ButtonHTMLAttributes<HTMLButtonElement>} props - Toutes les props natives du bouton HTML, plus les classes custom du design system.
 * @returns {JSX.Element}
 */

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ className, ...props }: ButtonProps) {
  return (
    <button
      type={props.type}
      className={cn('button-primary font-semibold', className)}
      {...props}
    />
  );
}
