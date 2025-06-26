import FadeInUpDown from '../motion/FadeInUpDown';

// src/components/common/SectionTitle.tsx
type SectionTitleProps = {
  title: string;
};

const SectionTitle = ({ title }: SectionTitleProps) => {
  const words = title.split(' ').map((word, i) => ({ id: `${word}-${i}`, word }));

  return (
    <FadeInUpDown>
      <h2 className="text-left text-[clamp(4rem,5vw,6rem)] uppercase leading-none">
        {words.map(({ id, word }, index) => (
          <span key={id} className={index % 2 === 0 ? 'font-thin' : 'font-extrabold'}>
            {word}{' '}
          </span>
        ))}
      </h2>
    </FadeInUpDown>
  );
};

export default SectionTitle;
