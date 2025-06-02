import clsx from "clsx";

type SectionTitleProps = {
	text: string;
	className?: string;
};

export default function SectionTitle({ text, className }: SectionTitleProps) {
	const words = text.split(" ").map((word, index) => {
		const mod = index % 3;
		const fontWeight = mod === 2 ? "font-thin" : "font-extrabold";
		const key = `${word}-${index}`;
		return { word, key, fontWeight };
	});

	return (
		<h2
			className={clsx(
				"text-5xl sm:text-6xl uppercase text-left",
				"tracking-tight leading-[0.82] max-w-3xl mx-auto",
				className,
			)}
		>
			{words.map(({ word, key, fontWeight }) => (
				<span key={key} className={clsx("inline-block px-[3px]", fontWeight)}>
					{word}
				</span>
			))}
		</h2>
	);
}
