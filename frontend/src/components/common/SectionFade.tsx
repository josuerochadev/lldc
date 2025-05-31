type SectionFadeProps = {
	direction: "top" | "bottom";
	color?: string;
	absolute?: boolean;
};

export default function SectionFade({
	direction,
	color = "var(--color-orange-rgb)",
	absolute = false,
}: SectionFadeProps) {
	const gradient =
		direction === "top"
			? `linear-gradient(to bottom,
				rgba(${color}, 0) 0%,
				rgba(${color}, 0.02) 20%,
				rgba(${color}, 0.08) 40%,
				rgba(${color}, 0.18) 60%,
				rgba(${color}, 0.4) 80%,
				rgba(${color}, 1) 100%)`
			: `linear-gradient(to top,
				rgba(${color}, 0) 0%,
				rgba(${color}, 0.02) 20%,
				rgba(${color}, 0.08) 40%,
				rgba(${color}, 0.18) 60%,
				rgba(${color}, 0.4) 80%,
				rgba(${color}, 1) 100%)`;

	return (
		<div
			className={`w-full h-[80vh] pointer-events-none z-10 ${
				absolute
					? direction === "top"
						? "absolute -top-[80vh] left-0"
						: "absolute -bottom-[80vh] left-0"
					: ""
			}`}
			style={{
				background: gradient,
			}}
		/>
	);
}
