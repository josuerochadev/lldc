import clsx from "clsx";
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
			<span className="w-[2rem] pl-4 text-left text-xs leading-snug text-primary/60 sm:text-sm">
				{index + 1}.
			</span>

			<div className="group relative flex flex-1 flex-col items-center justify-center">
				{showTopLine && <div className="mb-1 h-1 w-40 bg-yellow" />}

				<Link
					to={path}
					aria-label={`Lien vers ${label}`}
					className={clsx(
						"test-line",
						`text-vision-${index + 1}`,
						`test-size-${index + 1}`,
						"link-interactive",
					)}
				>
					{label}
				</Link>

				{showBottomLine && <div className="mt-1 h-1 w-40 bg-yellow" />}
			</div>

			<span className="flex w-[5rem] flex-col pr-4 text-right text-xs leading-tight text-primary/60 sm:text-sm">
				<span>{feet[index]}</span>
				<span className="my-0.5 h-[1px] w-full bg-primary/50" />
				<span>{meters[index]}</span>
			</span>
		</li>
	);
}
