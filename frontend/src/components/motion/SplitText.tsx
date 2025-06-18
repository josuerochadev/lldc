import { motion } from 'framer-motion';

type Props = {
  text: string;
  className?: string;
};

export default function SplitText({ text }: Props) {
  const words = text.split(' ');

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const child = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut' as const, // 👈 ESTA LINHA
      },
    },
  };

  return (
    <motion.h1
      className="mb-8 text-5xl font-extrabold uppercase leading-tight md:text-7xl"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={container}
    >
      {words.map((word, index) => {
        const uniqueKey = `${word}-${index}-${Math.random().toString(36).substr(2, 9)}`;
        return (
          <motion.span key={uniqueKey} className="mr-2 inline-block" variants={child}>
            {word}
          </motion.span>
        );
      })}
    </motion.h1>
  );
}
