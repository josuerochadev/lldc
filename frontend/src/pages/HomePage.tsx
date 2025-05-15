// frontend/src/pages/HomePage.tsx

import CardFrame from "@/components/CardFrame";
import Logo from "@/assets/logo/logo.svg?react";
import { ROUTES_CONFIG } from "@/config/constants";
import VisionLine from "@/components/VisionLine";

export default function HomePage() {
	return (
		<div className="flex flex-1 items-center justify-center min-h-[100dvh] px-2 mb-12">
			<CardFrame className="w-[90vw] max-w-[480px] flex flex-col items-center">
				<Logo className="w-[clamp(150px,20vw,200px)] h-auto text-primary mx-auto mb-4" />
				<ul className="w-full flex flex-col items-center text-center gap-[0.1rem] sm:gap-[0.15rem] md:gap-[0.2rem]">
					{ROUTES_CONFIG.map(({ navLabel, path }, index) => (
						<VisionLine key={path} index={index} label={navLabel} path={path} />
					))}
				</ul>
			</CardFrame>
		</div>
	);
}