import SectionTitleReveal from '../motion/SectionTitleReveal';

type SectionTitleProps = {
  title: string;
};

const SectionTitle = ({ title }: SectionTitleProps) => {
  const words = title.split(' ').map((word, i) => ({ id: `${word}-${i}`, word }));

  return (
    <SectionTitleReveal as="h2" className="mb-section-gap">
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
