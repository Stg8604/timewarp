/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		colors: {
			paleYellow: "#FEFECB",
			paleBrown: "#A2724A",
			lightGrey: "#6B685F",
			grey: "#2E2A25",
			lightBlue: "#94B0C2",
			blue: "#323C56",
			lightPurple: "#FECBFC",
			purple: "#A04AA2",
			tutorialUiBlue: "#2BA097",
			tutorialPortalGreen: "#0EB803",
			white: "#FFFFFF",
			red: "#FF0000",
			black: "#000000",
			computerhintbox: "#BFCFE7",
			close: "#332941",
			green: "#008000",
		},
		fontFamily: {
			pressStart2P: ["PressStart2P", "sans-serif"],
			pixelifySans: ["PixelifySans", "sans-serif"],
		},
		fontSize: {
			xs: "10px",
			sm: "16px",
			md: "20px",
			lg: "26px",
			xl: "32px",
		},
		screens: {
			se: "380px",
			sm: "640px",
			md: "836px",
			lg: "1128px",
			xl: "1280px",
		},
		extend: {
			keyframes: {
				fadeIn: {
					"0%": { opacity: "0" },
					"100%": { opacity: "1" },
				},
			},
			animation: {
				fadeIn: "fadeIn 0.2s ease-in-out",
			},
		},
	},
	plugins: [],
};
