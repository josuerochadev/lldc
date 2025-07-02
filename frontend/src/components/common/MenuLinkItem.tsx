import { motion } from 'framer-motion';

type MenuLinkItemProps = {
  label: string;
  href: string;
  index: number;
  onClick: () => void;
};

export default function MenuLinkItem({ label, href, index, onClick }: MenuLinkItemProps) {
  const [first, ...rest] = label.split(' ');
  const last = rest.join(' ');

  return (
    <motion.a
      href={href}
      onClick={onClick}
      className="flex items-baseline py-1 text-left uppercase transition hover:scale-110 sm:py-0"
      whileHover={{ scale: 1.1 }}
    >
      <span className="mr-4 text-base font-thin sm:text-2xl md:text-3xl 3xl:text-4xl">
        {index + 1}.
      </span>
      <span className="text-2xl font-thin sm:text-4xl md:text-5xl 3xl:text-6xl">{first}</span>
      <span className="text-2xl font-extrabold sm:text-4xl md:text-5xl 3xl:text-6xl">{last}</span>
    </motion.a>
  );
}
