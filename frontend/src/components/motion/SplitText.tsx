import { motion } from 'framer-motion';

type Props = {
  text: string;
  className?: string;
};

/**
 * Affiche un texte animé lettre par lettre (ou mot à mot) pour un effet de reveal, principalement utilisé pour les punchlines Hero.
 *
 * @component
 * @param {object} props
 * @param {string} props.text - Texte à afficher et à animer.
 * @param {string} [props.className] - Classes CSS additionnelles.
 * @returns {JSX.Element}
 */

export default function SplitText({ text, className = '' }: Props) {
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
        ease: 'easeOut' as const,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={container}
      className={className}
    >
      {words.map((word, index) => {
        const uniqueKey = `${word}-${index}-${Math.random().toString(36).substr(2, 9)}`;
        return (
          <motion.span key={uniqueKey} className="mr-word-gap inline-block" variants={child}>
            {word}
          </motion.span>
        );
      })}
    </motion.div>
  );
}
