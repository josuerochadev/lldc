import { useEffect, useState } from "react";

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(!entry.isIntersecting),
      { threshold: 0.1 }
    );
    const hero = document.querySelector("section#hero");
    if (hero) observer.observe(hero);
    return () => {
      if (hero) observer.unobserve(hero);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full px-6 py-4 z-30 transition-opacity duration-500 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <ul className="flex justify-center space-x-8 text-primary lowercase text-xl">
        <li>
          <a href="#offres" className="hover:text-purple transition-all duration-300">
            Offres
          </a>
        </li>
        <li>
          <a href="#services" className="hover:text-purple transition-all duration-300">
            Services
          </a>
        </li>
        <li>
          <a href="#concept" className="hover:text-purple transition-all duration-300">
            Concept
          </a>
        </li>
      </ul>
    </nav>
  );
}
