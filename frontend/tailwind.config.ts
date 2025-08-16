import type { Config } from 'tailwindcss';

const withOpacity = (variableName: string) => {
  return ({ opacityValue }: { opacityValue?: string }) =>
    opacityValue !== undefined
      ? `rgba(var(${variableName}), ${opacityValue})`
      : `rgb(var(${variableName}))`;
};

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
      // padding interne par défaut (fallback si on n'utilise pas .container-padding)
      padding: '1rem',
      screens: { '2xl': '1280px' },
    },
    extend: {
      /* ====== COLORS ====== */
      colors: {
        orange: withOpacity('--color-orange-rgb') as unknown as string,
        purple: withOpacity('--color-purple-rgb') as unknown as string,
        violet: withOpacity('--color-violet-rgb') as unknown as string,
        'dark-green': withOpacity('--color-dark-green-rgb') as unknown as string,
        'light-green': withOpacity('--color-light-green-rgb') as unknown as string,

        /* Aliases sémantiques (migration progressive) */
        brand: withOpacity('--color-purple-rgb') as unknown as string,
        accent: withOpacity('--color-orange-rgb') as unknown as string,
        success: withOpacity('--color-light-green-rgb') as unknown as string,
        surface: withOpacity('--color-violet-rgb') as unknown as string,
        ink: withOpacity('--color-dark-green-rgb') as unknown as string,
      },

      /* ====== TYPO ====== */
      fontFamily: {
        sans: ['"League Spartan"', 'sans-serif'],
        serif: ['"Imbue"', 'serif'],
      },
      fontSize: {
        'title-xl': ['clamp(3.5rem, 5vw, 15rem)', '0.95'],
        'title-lg': ['clamp(2rem, 3vw, 10rem)', '1.1'],
        'title-md': ['clamp(1.5rem, 2.5vw, 5rem)', '1.2'],
        'title-sm': ['clamp(1.25rem, 2vw, 3.5rem)', '1.3'],
        'text-cta': ['clamp(1.25rem, 1.5vw, 2.5rem)', '1.2'],

        // existant
        'text-base': ['clamp(1rem, 1.5vw, 3.5rem)', '1.4'],
        'text-footer': ['clamp(0.9rem, 1.1vw, 2.5rem)', '1.1'],

        // alias sémantiques (préférés à terme)
        'text-body': ['clamp(1rem, 1.5vw, 3.5rem)', '1.5'],
        'text-meta': ['clamp(0.9rem, 1.1vw, 2.5rem)', '1.2'],
      },

      /* ====== LAYOUT ====== */
      screens: {
        '3xl': '1920px',
        '4xl': '2560px',
        '5xl': '3840px',
      },
      maxWidth: {
        content: '100%', // existant (ex: pages full-bleed)
        'content-readable': '72ch', // pour les articles/CGV/mentions
      },
      width: {
        'service-img': 'clamp(20rem, 25vw, 42rem)',
      },
      height: {
        card: 'clamp(32rem, 70vh, 90rem)',
      },

      /* ====== SPACING ====== */
      spacing: {
        // existants
        section: 'clamp(6rem, 10vw, 10rem)',
        'section-sm': 'clamp(4rem, 8vw, 8rem)',
        'section-gap': 'clamp(1rem, 5vw, 3rem)',
        'title-gap': 'clamp(2rem, 2.5vw, 4rem)',
        'btn-x': 'clamp(1.5rem, 2vw, 3rem)',
        'btn-y': 'clamp(1.25rem, 1vw, 2.5rem)',
        'word-gap': 'clamp(1rem, 1.5vw, 2rem)',

        // alias sémantiques
        'container-x': 'clamp(1rem, 5vw, 3rem)',
        'container-y': 'clamp(2rem, 5vw, 4rem)',
        'flow': 'clamp(0.75rem, 2vw, 1.5rem)', // gap par défaut entre blocs
      },

      /* ====== RADII / SHADOWS / Z ====== */
      borderRadius: {
        btn: '0.8rem',
        card: '1.5rem',
        // alias
        sm: '0.5rem',
        lg: '1rem',
      },
      boxShadow: {
        card: '0 4px 8px rgba(0, 0, 0, 0.05)',
        soft: '0 2px 4px rgba(0, 0, 0, 0.03)',
        // alias
        focus: '0 0 0 3px rgba(204, 252, 211, 0.6)',
      },
      zIndex: {
        base: '10',
        menu: '50',
        modal: '100',
        overlay: '200',
      },

      /* ====== MOTION ====== */
      transitionDuration: {
        250: '250ms',
      },
    },
  },
  // Variants utilitaires utiles pour motion-safe/reduce déjà fournis par Tailwind
  // rien à ajouter ici
};

export default config;