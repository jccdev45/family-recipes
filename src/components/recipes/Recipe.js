import { Link } from "react-router-dom";

export function Recipe({ recipe }) {
	if (!recipe) return;
	const { recipeName, path, author, quote, tags, img, userId } = recipe;

	function renderTags() {
		return tags.map((tag, index) => (
			<li
				key={index}
				className="px-2 m-1 text-lg text-black bg-gray-300 lg:px-4 rounded-xl"
			>
				{tag}
			</li>
		));
	}

	return (
		<article
			className="grid w-full grid-rows-1 mx-auto my-4 overflow-hidden transition-colors duration-200 ease-in-out bg-center bg-no-repeat bg-cover rounded-lg shadow-lg recipe-card place-items-end lg:grid-cols-1 md:w-3/4 lg:w-11/12 h-96"
			style={{
				backgroundImage: `url('${img}')`,
			}}
		>
			<div className="flex flex-col w-full p-2 mt-auto text-center transition-all duration-300 ease-in-out transform bg-gray-800 recipe-info h-2/5 lg:h-1/3 bg-opacity-70 hover:bg-opacity-90 lg:w-full justify-evenly">
				<span className="w-full">
					<Link
						to={`/recipes/${path}`}
						className="w-1/3 mx-auto text-lg text-center text-blue-400 md:w-2/3 lg:text-2xl hover:underline"
					>
						{recipeName}
					</Link>
				</span>
				<div className="flex flex-col text-white">
					<div className="flex flex-col flex-wrap items-center justify-center lg:justify-end lg:flex-nowrap lg:flex-row">
						<span className="font-serif">"{quote}"</span>
						<span className="lg:mx-2">
							<span>-</span>
							<Link
								className="text-right text-blue-400 lg:text-lg hover:underline"
								to={`/user/${userId}`}
							>
								{author}
							</Link>
						</span>
					</div>
					<ul className="flex flex-wrap items-center justify-center mx-auto">
						{renderTags()}
					</ul>
				</div>
			</div>
		</article>
	);
}
