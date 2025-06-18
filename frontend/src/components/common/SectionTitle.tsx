// src/components/common/SectionTitle.tsx

type SectionTitleProps = {
  title: string;
};

const SectionTitle = ({ title }: SectionTitleProps) => {
  const words = title.split(' ').map((word, i) => ({ id: `${word}-${i}`, word }));

  return (
    <h2 className="text-center text-3xl uppercase leading-tight sm:text-4xl md:text-5xl">
      {words.map(({ id, word }, index) => (
        <span key={id} className={index % 2 === 0 ? 'font-thin' : 'font-extrabold'}>
          {word}{' '}
        </span>
      ))}
    </h2>
  );
};

export default SectionTitle;
