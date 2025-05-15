type CardFrameProps = {
	children: React.ReactNode;
	className?: string;
};

export default function CardFrame({
	children,
	className = "",
}: CardFrameProps) {
	return (
		<div
			className={`relative rounded-3xl p-6 sm:p-8 px-4 shadow-md bg-beige/35 backdrop-blur-xl overflow-hidden ${className}`}
		>
			{/* Borders */}
			<div className="absolute inset-4 rounded-2xl border-2 border-primary pointer-events-none" />
			<div className="absolute inset-2 rounded-2xl border-2 border-primary pointer-events-none" />
			<div className="absolute inset-0 rounded-3xl border-8 border-orange pointer-events-none" />
			{/* Content */}
			<div className="relative z-10">{children}</div>
		</div>
	);
}
