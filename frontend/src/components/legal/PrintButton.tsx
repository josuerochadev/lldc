import Printer from 'lucide-react/dist/esm/icons/printer';

import Button from '@/components/common/Button';

type PrintButtonProps = {
  className?: string;
};

/**
 * Bouton d'impression pour les pages légales
 * 
 * Déclenche l'impression de la page courante avec l'API native du navigateur.
 * Le bouton est masqué lors de l'impression via CSS print media query.
 * 
 * @component
 * @param props - Les propriétés du composant
 * @returns Bouton d'impression stylisé
 */
export default function PrintButton({ className = '' }: PrintButtonProps) {
  const handlePrint = () => {
    // Focus sur le document avant impression pour assurer l'accessibilité
    document.body.focus();
    window.print();
  };

  return (
    <Button
      type="button"
      onClick={handlePrint}
      className={`group mt-8 print:hidden ${className}`}
      aria-label="Imprimer cette page"
    >
      <span className="flex items-center gap-2">
        <Printer className="button-icon group-hover:scale-110 transition-transform" aria-hidden="true" />
        Imprimer cette page
      </span>
    </Button>
  );
}