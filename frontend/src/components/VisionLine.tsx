import { Link } from "react-router-dom";

type VisionLineProps = {
	index: number;
	label: string;
	path: string;
};

const feet = ["20 ft", "15 ft", "12 ft", "10 ft", "8 ft", "6 ft"];
const meters = ["6.1 m", "4.5 m", "3.7 m", "3.0 m", "2.4 m", "1.8 m"];

export default function VisionLine({ index, label, path }: VisionLineProps) {
	const showTopLine = label === "CONCEPT";
	const showBottomLine = label === "SUIVEZ-NOUS";

	return (
		<li className="flex w-full items-center justify-between">
			<span className="text-xs sm:text-sm text-primary/60 w-[2rem] pl-4 text-left leading-snug">
				{index + 1}.
			</span>

			<div className="group flex-1 flex flex-col items-center justify-center relative">
				{showTopLine && <div className="w-40 h-1 bg-yellow mb-1" />}

				<Link
					to={path}
					title={`Aller vers ${label}`}
					aria-label={`Lien vers ${label}`}
					className={`test-line test-size-${index + 1} text-primary transition-all duration-500 ease-out group-hover:text-purple group-hover:font-extrabold group-hover:animate-jitter focus-visible:animate-jitter`}
				>
					{label}
				</Link>

				{showBottomLine && <div className="w-40 h-1 bg-yellow mt-1" />}
			</div>

			<span className="text-xs sm:text-sm text-primary/60 w-[5rem] pr-4 text-right flex flex-col leading-tight">
				<span>{feet[index]}</span>
				<span className="h-[1px] bg-primary/50 w-full my-0.5" />
				<span>{meters[index]}</span>
			</span>
		</li>
	);
}
