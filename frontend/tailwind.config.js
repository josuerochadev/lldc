/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "#352f2f",
				orange: "#fc871a",
				purple: "#645196",
				beige: "#efd8d1",
				yellow: "#ead300",
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
		},
	},
	plugins: [],
};
