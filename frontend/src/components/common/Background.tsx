// src/components/Background.tsx

export default function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <div
        className="animate-radialShift absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(
            circle at var(--radial-x, 50%) var(--radial-y, 50%),
            rgba(239, 216, 209, 1),
            rgba(252, 135, 26, 0.25)
          )`,
          backgroundSize: '150% 150%',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: '20% 30%',
        }}
      />
    </div>
  );
}
