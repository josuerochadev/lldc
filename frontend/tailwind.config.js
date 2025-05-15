/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "#302a2a",
				orange: "#ff7a00",
				purple: "#7d50f7",
				beige: "#ebdcd7",
				yellow: "#ffe922",
			},
			fontFamily: {
				sans: ['"League Spartan"', "sans-serif"],
				serif: ['"Instrument Serif"', "serif"],
			},
			keyframes: {
				blob1: {
					"0%, 100%": { transform: "translate(0, 0) scale(1)" },
					"50%": { transform: "translate(100px, -60px) scale(1.15)" },
				},
				blob2: {
					"0%, 100%": { transform: "translate(0, 0) scale(1)" },
					"50%": { transform: "translate(-80px, 40px) scale(1.1)" },
				},
				blob3: {
					"0%, 100%": { transform: "translate(0, 0) scale(1)" },
					"50%": { transform: "translate(60px, 30px) scale(1.2)" },
				},
				blob4: {
					"0%, 100%": { transform: "translate(0, 0) scale(1)" },
					"50%": { transform: "translate(-40px, -60px) scale(1.05)" },
				},
				blob5: {
					"0%, 100%": { transform: "translate(0, 0) scale(1)" },
					"50%": { transform: "translate(90px, -40px) scale(1.2)" },
				},
				blob6: {
					"0%, 100%": { transform: "translate(0, 0) scale(1)" },
					"50%": { transform: "translate(-100px, 50px) scale(1.15)" },
				},
				blob7: {
					"0%, 100%": { transform: "translate(0, 0) scale(1)" },
					"50%": { transform: "translate(60px, 80px) scale(1.1)" },
				},
				jitter: {
					"0%, 100%": { transform: "translate(0, 0)", filter: "blur(0px)" },
					"25%": { transform: "translate(1px, -1px)", filter: "blur(8px)" },
					"50%": { transform: "translate(-1px, 1px)", filter: "blur(6px)" },
					"75%": { transform: "translate(1px, 1px)", filter: "blur(4px)" },
				},
				halo: {
					'0%,100%': { opacity: '0.45', transform: 'translateY(0) scale(1)' },
					'50%':     { opacity: '0.75', transform: 'translateY(4px) scale(1.06)' },
				  },
			},
			animation: {
				blob1: "blob1 24s ease-in-out infinite",
				blob2: "blob2 30s ease-in-out infinite",
				blob3: "blob3 36s ease-in-out infinite",
				blob4: "blob4 40s ease-in-out infinite",
				blob5: "blob5 32s ease-in-out infinite",
				blob6: "blob6 28s ease-in-out infinite",
				blob7: "blob7 34s ease-in-out infinite",
				jitter: "jitter 0.2s ease-in-out",
				halo: 'halo 9s ease-in-out infinite',
			},
		},
	},
	plugins: [],
};
