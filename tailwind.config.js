module.exports = {
	purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			backgroundImage: (theme) => ({
				"hero-cook": "url('http://loremflickr.com/1000/1000/cooking')",
				"hero-recipe": "url('http://loremflickr.com/1000/1000/recipe')",
			}),
      saturate: {
        "110": "1.1",
        "125": "1.25"
      }
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
