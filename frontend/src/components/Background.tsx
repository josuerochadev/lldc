// src/components/Background.tsx
const BLOBS = [
	{ size: 60, x: "-20%", y: "-10%", color: "bg-orange", anim: "blob1", op: 50 },
	{ size: 50, x: "50%", y: "20%", color: "bg-purple", anim: "blob2", op: 40 },
	{ size: 45, x: "30%", y: "90%", color: "bg-yellow", anim: "blob3", op: 30 },
	{ size: 60, x: "-15%", y: "120%", color: "bg-beige", anim: "blob4", op: 30 },
	{ size: 70, x: "-30%", y: "30%", color: "bg-orange", anim: "blob5", op: 25 },
	{ size: 55, x: "-25%", y: "70%", color: "bg-purple", anim: "blob6", op: 25 },
	{ size: 40, x: "10%", y: "10%", color: "bg-yellow", anim: "blob7", op: 20 },
] as const;

export default function Background() {
	return (
		<div className="pointer-events-none fixed inset-0 z-0">
			<div className="absolute inset-0 bg-primary" />

			{/* motion-safe : só anima se usuário NÃO pedir redução */}
			<div className="absolute inset-0 overflow-hidden transform-gpu will-change-transform motion-safe:animate-none">
				{BLOBS.map(({ size, x, y, color, anim, op }) => (
					<div
						key={anim}
						style={{
							width: `${size}vw`,
							height: `${size}vw`,
							left: x,
							top: y,
						}}
						className={`absolute rounded-full ${color} opacity-${op} mix-blend-multiply blur-3xl motion-safe:animate-${anim}`}
					/>
				))}
			</div>
		</div>
	);
}
