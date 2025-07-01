import plugin from 'tailwindcss/plugin';
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
				primary: withOpacity('--color-primary-rgb') as unknown as string,
				orange: withOpacity('--color-orange-rgb') as unknown as string,
				purple: withOpacity('--color-purple-rgb') as unknown as string,
				beige: withOpacity('--color-beige-rgb') as unknown as string,
				yellow: withOpacity('--color-yellow-rgb') as unknown as string,
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
		},
	},
	plugins: [
		plugin(({ addBase }) => {
			addBase({
				':root': {
					'--color-primary-rgb': '46, 51, 9',
					'--color-orange-rgb': '252, 135, 26',
					'--color-purple-rgb': '55, 39, 77',
					'--color-beige-rgb': '235, 228, 242',
				},
			});
		}),
	],
};

export default config;
