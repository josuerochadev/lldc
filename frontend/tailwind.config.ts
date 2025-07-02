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
			screens: {
				'3xl': '1920px',
				'4xl': '2560px',
				'5xl': '3840px',
			},
			spacing: {
				section: '6rem',     // paddings verticais para seções
				gutter: '3rem', 
			},
			borderRadius: {
				lg: '12px',
				xl: '16px',
				'2xl': '24px',
			},
			boxShadow: {
				card: '0 4px 10px rgba(0, 0, 0, 0.05)',
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
