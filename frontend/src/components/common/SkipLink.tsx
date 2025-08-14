// src/components/common/SkipLink.tsx
export default function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-lg focus:px-3 focus:py-2 focus:ring focus:outline-none bg-white text-black"
    >
      Aller au contenu
    </a>
  );
}