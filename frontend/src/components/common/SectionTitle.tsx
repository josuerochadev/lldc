import SectionTitleReveal from '../motion/SectionTitleReveal';

type SectionTitleProps = {
  title: string;
};

/**
 * Composant React pour afficher un titre de section stylisé.
 *
 * Ce composant prend un titre en tant que prop, le découpe en mots,
 * puis applique un style différent à chaque mot en fonction de sa position (pair ou impair).
 * Les mots en position paire sont affichés avec une police fine (`font-thin`),
 * tandis que les mots en position impaire sont affichés en gras extrême (`font-extrabold`).
 *
 * @param {SectionTitleProps} props - Les propriétés du composant.
 * @param {string} props.title - Le titre à afficher, qui sera stylisé mot par mot.
 *
 * @returns {JSX.Element} Un élément JSX représentant le titre de section stylisé.
 */

const SectionTitle = ({ title }: SectionTitleProps) => {
  const words = title.split(' ').map((word, i) => ({ id: `${word}-${i}`, word }));

  return (
    <SectionTitleReveal as="h2" className="mb-title-gap">
      <span className="text-title-xl uppercase">
        {words.map(({ id, word }, index) => (
          <span key={id} className={index % 2 === 0 ? 'font-thin' : 'font-extrabold'}>
            {word}{' '}
          </span>
        ))}
      </span>
    </SectionTitleReveal>
  );
};

export default SectionTitle;
