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
      className="flex items-baseline uppercase transition hover:scale-110"
      whileHover={{ scale: 1.1 }}
    >
      <span className="mr-4 text-title-sm font-thin">{index + 1}.</span>
      <span className="flex flex-wrap gap-x-1 text-title-lg">
        <span className="font-thin">{first}</span>
        <span className="font-extrabold">{last}</span>
      </span>
    </motion.a>
  );
}
