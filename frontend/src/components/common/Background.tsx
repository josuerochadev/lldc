// src/components/Background.tsx

export default function Background() {
	return (
		<div className="pointer-events-none fixed inset-0 z-0">
			<div
				className="absolute inset-0 animate-radialShift"
				style={{
					backgroundImage: `radial-gradient(
						circle at var(--radial-x, 50%) var(--radial-y, 50%),
						var(--color-beige, #d4c5ba),
						var(--color-orange-translucent, #ff7a0080) /* 50% opacidade */
					)`,
					backgroundSize: "150% 150%", // leve otimização de performance
					backgroundRepeat: "no-repeat",
					backgroundPosition: "20% 30%",
				}}
			/>
		</div>
	);
}