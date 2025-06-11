// src/components/layout/HeroTitle.tsx

import type { FC } from "react";

type Props = {
	className?: string;
};

const HeroTitle: FC<Props> = ({ className = "" }) => (
	<h1
		className={`font-thin uppercase tracking-tighter leading-none text-[clamp(3rem,8vw,9rem)] whitespace-nowrap ${className}`}
		aria-label="La Lunetterie du Coin"
	>
		LA<span className="font-extrabold">LUNETTERIE</span>
		<span className="block sm:inline">
			DU<span className="font-extrabold">COIN</span>
		</span>
	</h1>
);

export default HeroTitle;
