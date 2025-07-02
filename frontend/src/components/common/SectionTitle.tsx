import FadeInUpDown from '../motion/FadeInUpDown';

type SectionTitleProps = {
  title: string;
};

const SectionTitle = ({ title }: SectionTitleProps) => {
  const words = title.split(' ').map((word, i) => ({ id: `${word}-${i}`, word }));

  return (
    <FadeInUpDown>
      <h2 className="section-title">
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
