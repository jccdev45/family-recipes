module.exports = {
	purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			backgroundImage: (theme) => ({
				"hero-cook": "url('http://loremflickr.com/1000/1000/cooking')",
				"hero-form": "url('/src/assets/img/cooking.svg')",
				"hero-recipe": "url('/src/assets/img/brunch.png')",
				"hero-family-sm":
					"url('/src/assets/img/thanksgiving_panoramic_sm.png')",
				"hero-family": "url('/src/assets/img/thanksgiving_panoramic.png')",
				"hero-family-lg":
					"url('/src/assets/img/thanksgiving_panoramic_lg.jpeg')",
			}),
			saturate: {
				"110": "1.1",
				"125": "1.25",
			},
		},
	},
	variants: {
		extend: {
			textDecoration: ["checked"],
			saturate: ["hover"],
		},
	},
	plugins: [],
};
