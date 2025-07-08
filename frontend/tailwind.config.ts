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
		extend: {
			colors: {
				orange: withOpacity('--color-orange-rgb') as unknown as string,
				purple: withOpacity('--color-purple-rgb') as unknown as string,
				violet: withOpacity('--color-violet-rgb') as unknown as string,
				'dark-green': withOpacity('--color-dark-green-rgb') as unknown as string,
				'light-green': withOpacity('--color-light-green-rgb') as unknown as string,
			},
			fontFamily: {
				sans: ['"League Spartan"', 'sans-serif'],
				serif: ['"Imbue"', 'serif'],
			},
			fontSize: {
				'title-xl': ['clamp(3.5rem, 5vw, 15rem)', '0.9'],
				'title-lg': ['clamp(2rem, 5vw, 10rem)', '1.1'],
				'title-md': ['clamp(1.5rem, 2.5vw, 5rem)', '1.2'],
				'title-sm': ['clamp(1.25rem, 2vw, 3.5rem)', '1.3'],
				'text-cta': ['clamp(1.25rem, 1.5vw, 2.5rem)', '1.2'],
				'text-base': ['clamp(1.25rem, 2vw, 3rem)', '1.5'],
			},
			screens: {
				'3xl': '1920px',
				'4xl': '2560px',
				'5xl': '3840px',
			},
			maxWidth: {
 				'content': '120rem', // Maximum width for main content
				},
			spacing: {
				'section': 'clamp(6rem, 10vw, 10rem)', // General section spacing
				'section-sm': 'clamp(4rem, 8vw, 8rem)', // Smaller section spacing
				'section-gap': 'clamp(1rem, 5vw, 3rem)', // Gap between sections
				'btn-x': 'clamp(1.5rem, 2vw, 3rem)',
  				'btn-y': 'clamp(1.25rem, 1vw, 2.5rem)',
			},
			padding: {
				'container-x': 'clamp(1rem, 5vw, 3rem)',
				'container-y': 'clamp(2rem, 5vw, 4rem)',

			},
			borderRadius: {
				btn: '1.2rem',
				card: '0.8rem',
			},
			boxShadow: {
				card: '0 4px 8px rgba(0, 0, 0, 0.05)',
				soft: '0 2px 4px rgba(0, 0, 0, 0.03)',
			},
			zIndex: {
				base: '10',
				menu: '50',
				modal: '100',
				overlay: '200',
			},
			transitionDuration: {
				250: '250ms',
			},
		},
	},
};

export default config;
