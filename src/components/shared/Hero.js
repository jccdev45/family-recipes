import { Link } from "react-router-dom";

export function Hero({ name, quote, author, img }) {
	return (
		<div
			className={`${
				img ? "bg-hero-cook" : "bg-hero-recipe"
			} w-screen bg-fixed bg-red-300 flex justify-between h-60 lg:h-96 bg-no-repeat px-8 py-16 m-auto bg-cover`}
		>
			<div className="w-2/3 p-8 m-auto font-bold text-center text-white bg-gray-500 rounded bg-opacity-60 lg:w-1/3">
				<h1 className="text-4xl">{name}</h1>
				<Link to="/" className="text-xl">
					by: <span className="text-blue-300 hover:underline">{author}</span>
				</Link>
			</div>
			{img ? (
				""
			) : (
				<h2 className="text-xl text-right">
					"{quote}"
					<Link to="" className="block text-blue-400 hover:underline">
						- {author}
					</Link>
				</h2>
			)}
		</div>
	);
}
