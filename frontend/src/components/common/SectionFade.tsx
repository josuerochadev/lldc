type SectionFadeProps = {
	direction: "top" | "bottom";
	color?: string;
};

export default function SectionFade({
	direction,
	color = "var(--color-orange-rgb)",
}: SectionFadeProps) {
	const gradient =
		direction === "top"
			? `linear-gradient(to bottom,
          rgba(${color}, 0) 0%,
          rgba(${color}, 0.05) 25%,
          rgba(${color}, 0.1) 50%,
          rgba(${color}, 0.4) 75%,
          rgba(${color}, 1) 100%)`
			: `linear-gradient(to top,
          rgba(${color}, 0) 0%,
          rgba(${color}, 0.05) 25%,
          rgba(${color}, 0.1) 50%,
          rgba(${color}, 0.4) 75%,
          rgba(${color}, 1) 100%)`;

	return (
		<div
			className={`pointer-events-none absolute inset-x-0 h-[60vh] ${
				direction === "top" ? "-top-[60vh]" : "-bottom-[60vh]"
			}`}
			style={{ background: gradient, zIndex: 0 }}
		/>
	);
}
