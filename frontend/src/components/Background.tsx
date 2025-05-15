export default function Background() {
	return (
		<div className="fixed inset-0 z-0 pointer-events-none">
			<div className="absolute inset-0 bg-primary" />
			{/* cor neutra de base */}
			<div className="absolute inset-0 overflow-hidden will-change-transform transform-gpu">
				{/* Blobs animados */}
				<div className="absolute w-[60vw] h-[60vw] top-[-10%] left-[-20%] bg-orange rounded-full blur-3xl opacity-50 animate-blob1 mix-blend-multiply" />
				<div className="absolute w-[50vw] h-[50vw] top-[20%] left-[50%] bg-purple rounded-full blur-3xl opacity-40 animate-blob2 mix-blend-multiply" />
				<div className="absolute w-[45vw] h-[45vw] bottom-[10%] left-[30%] bg-yellow rounded-full blur-3xl opacity-30 animate-blob3 mix-blend-multiply" />
				<div className="absolute w-[60vw] h-[60vw] bottom-[-20%] right-[-15%] bg-beige rounded-full blur-3xl opacity-30 animate-blob4 mix-blend-multiply" />
				<div className="absolute w-[70vw] h-[70vw] top-[30%] left-[-30%] bg-orange rounded-full blur-3xl opacity-25 animate-blob5 mix-blend-multiply" />
				<div className="absolute w-[55vw] h-[55vw] bottom-[30%] right-[-25%] bg-purple rounded-full blur-3xl opacity-25 animate-blob6 mix-blend-multiply" />
				<div className="absolute w-[40vw] h-[40vw] top-[10%] right-[10%] bg-yellow rounded-full blur-3xl opacity-20 animate-blob7 mix-blend-multiply" />
			</div>
		</div>
	);
}
