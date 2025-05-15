export default function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <div className="absolute inset-0 bg-primary" />
      {/* cor neutra de base */}
      <div className="absolute inset-0 transform-gpu overflow-hidden will-change-transform">
        {/* Blobs animados */}
        <div className="absolute left-[-20%] top-[-10%] h-[60vw] w-[60vw] animate-blob1 rounded-full bg-orange opacity-50 mix-blend-multiply blur-3xl" />
        <div className="absolute left-[50%] top-[20%] h-[50vw] w-[50vw] animate-blob2 rounded-full bg-purple opacity-40 mix-blend-multiply blur-3xl" />
        <div className="absolute bottom-[10%] left-[30%] h-[45vw] w-[45vw] animate-blob3 rounded-full bg-yellow opacity-30 mix-blend-multiply blur-3xl" />
        <div className="absolute bottom-[-20%] right-[-15%] h-[60vw] w-[60vw] animate-blob4 rounded-full bg-beige opacity-30 mix-blend-multiply blur-3xl" />
        <div className="absolute left-[-30%] top-[30%] h-[70vw] w-[70vw] animate-blob5 rounded-full bg-orange opacity-25 mix-blend-multiply blur-3xl" />
        <div className="absolute bottom-[30%] right-[-25%] h-[55vw] w-[55vw] animate-blob6 rounded-full bg-purple opacity-25 mix-blend-multiply blur-3xl" />
        <div className="absolute right-[10%] top-[10%] h-[40vw] w-[40vw] animate-blob7 rounded-full bg-yellow opacity-20 mix-blend-multiply blur-3xl" />
      </div>
    </div>
  );
}
