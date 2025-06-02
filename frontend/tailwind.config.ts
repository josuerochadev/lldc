import plugin from "tailwindcss/plugin";
import type { Config } from "tailwindcss";

const withOpacity = (variableName: string) => {
	return ({ opacityValue }: { opacityValue?: string }) =>
		opacityValue !== undefined
			? `rgba(var(${variableName}), ${opacityValue})`
			: `rgb(var(${variableName}))`;
};

const config: Config = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: withOpacity("--color-primary-rgb") as unknown as string,
				orange: withOpacity("--color-orange-rgb") as unknown as string,
				purple: withOpacity("--color-purple-rgb") as unknown as string,
				beige: withOpacity("--color-beige-rgb") as unknown as string,
				yellow: withOpacity("--color-yellow-rgb") as unknown as string,
			},
			fontFamily: {
				sans: ['"League Spartan"', "sans-serif"],
				serif: ['"Imbue"', "serif"],
			},
			keyframes: {
				radialShift: {
					"0%": { backgroundPosition: "20% 30%" },
					"25%": { backgroundPosition: "40% 50%" },
					"50%": { backgroundPosition: "60% 40%" },
					"75%": { backgroundPosition: "50% 70%" },
					"100%": { backgroundPosition: "20% 30%" },
				},
			},
			animation: {
				radialShift: "radialShift 30s ease-in-out infinite",
			},
			screens: {
				"3xl": "1920px", // Full HD Desktop
				"4xl": "2560px", // WQHD 2K
				"5xl": "3840px", // 4K UHD
			},
		},
	},
	plugins: [
		plugin(({ addBase }) => {
			addBase({
				":root": {
					"--color-primary-rgb": "53, 47, 47",
					"--color-orange-rgb": "252, 135, 26",
					"--color-purple-rgb": "100, 81, 150",
					"--color-beige-rgb": "239, 216, 209",
					"--color-yellow-rgb": "234, 211, 0",
				},
			});
		}),
	],
};

export default config;
