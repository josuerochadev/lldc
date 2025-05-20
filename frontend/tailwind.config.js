/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "#302a2a",
				orange: "#ff7a00",
				purple: "#7d50f7",
				beige: "#d4c5ba",
				yellow: "#ffe922",
			},
			fontFamily: {
				sans: ['"League Spartan"', "sans-serif"],
				serif: ['"Instrument Serif"', "serif"],
			},
			keyframes: {
				radialShift: {
					"0%": { backgroundPosition: "20% 30%" },
					"25%": { backgroundPosition: "40% 50%" },
					"50%": { backgroundPosition: "60% 40%" },
					"75%": { backgroundPosition: "50% 70%" },
					"100%": { backgroundPosition: "20% 30%" },
				},
				jitter: {
					"0%, 100%": { transform: "translate(0, 0)", filter: "blur(0px)" },
					"25%": { transform: "translate(1px, -1px)", filter: "blur(8px)" },
					"50%": { transform: "translate(-1px, 1px)", filter: "blur(6px)" },
					"75%": { transform: "translate(1px, 1px)", filter: "blur(4px)" },
				},
			},
			animation: {
				radialShift: "radialShift 30s ease-in-out infinite",
				jitter: "jitter 0.2s ease-in-out",
			},
		},
	},
	plugins: [],
};
