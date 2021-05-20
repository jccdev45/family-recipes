module.exports = {
	purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			backgroundImage: (theme) => ({
				"hero-user":
					"url('https://images.unsplash.com/photo-1615324054799-ed5aa6c835e6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3088&q=80')",
				"hero-cook": "url('http://loremflickr.com/1000/1000/cooking')",
				"hero-form":
					"url('https://firebasestorage.googleapis.com/v0/b/family-recipes-prod-aa82d.appspot.com/o/louies-dish.jpeg?alt=media&token=238f63fd-5a99-4cbb-8d9a-d99a97f2ee86')",
				"hero-thanksgiving-sm":
					"url('https://firebasestorage.googleapis.com/v0/b/family-recipes-prod-aa82d.appspot.com/o/thanksgiving_panoramic_sm.png?alt=media&token=65599153-30a4-482f-91b0-f396b59ccf58')",
				"hero-thanksgiving-lg":
					"url('https://firebasestorage.googleapis.com/v0/b/family-recipes-prod-aa82d.appspot.com/o/thanksgiving_panoramic.png?alt=media&token=43510b39-706c-42b5-920b-50ea4f7b0c60')",
				"hero-recipe":
					"url('https://firebasestorage.googleapis.com/v0/b/family-recipes-prod-aa82d.appspot.com/o/brunch.png?alt=media&token=48fd60de-55f3-42d5-82aa-d740e5ea61a2')",
				"hero-family-sm":
					"url('https://firebasestorage.googleapis.com/v0/b/family-recipes-prod-aa82d.appspot.com/o/banner-left.jpeg?alt=media&token=c53e9250-d851-4b4e-9e07-41648937015e')",
				"hero-family-lg":
					"url('https://firebasestorage.googleapis.com/v0/b/family-recipes-prod-aa82d.appspot.com/o/banner-full.jpeg?alt=media&token=b3b8f801-3aea-4027-9df6-438fa8cda857')",
				// "hero-family-sm": "url('/src/data/img/thanksgiving_panoramic_sm.png')",
				// "hero-family": "url('/src/data/img/thanksgiving_panoramic.png')",
				// "hero-family-lg": "url('/src/data/img/thanksgiving_panoramic_lg.jpeg')",
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
			animation: ["hover"],
		},
	},
	plugins: [],
};
