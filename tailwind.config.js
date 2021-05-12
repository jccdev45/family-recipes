module.exports = {
	purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			backgroundImage: (theme) => ({
				"hero-cook": "url('http://loremflickr.com/1000/1000/cooking')",
				"hero-form": "url('/src/data/img/cooking.svg')",
				"hero-recipe": "url('/src/data/img/brunch.png')",
				"hero-family-sm":
					"url('/src/data/img/thanksgiving_panoramic_sm.png')",
				"hero-family": "url('/src/data/img/thanksgiving_panoramic.png')",
				"hero-family-lg":
					"url('/src/data/img/thanksgiving_panoramic_lg.jpeg')",
			}),
			saturate: {
				"110": "1.1",
				"125": "1.25",
			},
			spacing: {
				"1/4": "25%",
				"1/3": "33.3%",
				"1/2": "50%",
				"2/3": "66.6%",
				"3/4": "75%",
				"100": "100%",
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
