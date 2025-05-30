// PunchlineContent.tsx
import { useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const punchlines = [
  "Des lunettes qui ont du style, une démarche qui a du sens",
  "Des lunettes à la mode et pas de déchet en vue !",
  "Payez vos lunettes moins cher en recyclant vos anciennes paires",
  "Revoir le monde à travers des verres responsables",
];

export default function PunchlineContent() {
  const randomLine = useMemo(() => {
    const index = Math.floor(Math.random() * punchlines.length);
    return punchlines[index];
  }, []);

  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [0, 1]);
  const y = useTransform(scrollY, [0, 300], [40, 0]);

  return (
    <div className="w-full flex-1 flex items-center justify-center bg-orange relative z-10 px-4 sm:px-6 py-32">
      <motion.p
        style={{ opacity, y }}
        className="text-left uppercase text-primary font-bold tracking-tight text-8xl max-w-6xl leading-[0.8]"
      >
        {randomLine}
      </motion.p>
    </div>
  );
}