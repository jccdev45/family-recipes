import { Link } from "react-router-dom";

export function Hero({ name, quote, author, img, page }) {
	return (
		// <div
		// 	className={`${img} ${
		// 		page === "home"
		// 			? "h-36 bg-top bg-contain md:bg-hero-family lg:h-72 lg:bg-hero-family-lg"
		// 			: "h-80 md:h-52 lg:h-80 bg-top bg-cover md:bg-top md:bg-contain"
		// 	} lg:bg-top lg:bg-contain w-screen bg-fixed bg-purple-100 flex justify-between bg-repeat px-8 m-auto`}
		// >
		<div
			className={`${img} ${
				page === "home"
					? "h-36 bg-center bg-contain md:h-56 lg:h-72 bg-repeat lg:bg-repeat-round md:bg-hero-family-lg"
					: "h-80 md:h-52 lg:h-80 bg-top bg-cover bg-fixed md:bg-top md:bg-contain bg-no-repeat"
			} lg:bg-top lg:bg-contain w-screen bg-purple-100 flex justify-between px-8 m-auto`}
		>
			<div className="w-2/3 p-8 m-auto font-bold text-center text-white bg-gray-800 rounded bg-opacity-70 lg:w-1/3">
				<h1 className="text-xl text-red-100 md:text-4xl">
					{page === "Edit" ? (
						<>
							<span className="font-normal text-white">Edit: </span> {name}
						</>
					) : (
						name
					)}
				</h1>
				{author && (
					<Link to="/" className="text-xl">
						by: <span className="text-blue-300 hover:underline">{author}</span>
					</Link>
				)}
			</div>
			{quote ? (
				<h2 className="text-xl text-right">
					"{quote}"
					<Link to="" className="block text-blue-400 hover:underline">
						- {author}
					</Link>
				</h2>
			) : (
				""
			)}
		</div>
	);
}
