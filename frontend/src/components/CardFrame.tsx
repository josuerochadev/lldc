import type React from 'react';

type CardFrameProps = {
  children: React.ReactNode;
  className?: string;
};

export default function CardFrame({ children, className = '' }: CardFrameProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-3xl bg-beige/35 p-6 px-4 shadow-md backdrop-blur-xl sm:p-8 ${className}`}
    >
      {/* Borders */}
      <div className="pointer-events-none absolute inset-4 rounded-2xl border-2 border-primary" />
      <div className="pointer-events-none absolute inset-2 rounded-2xl border-2 border-primary" />
      <div className="pointer-events-none absolute inset-0 rounded-3xl border-8 border-orange" />
      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
