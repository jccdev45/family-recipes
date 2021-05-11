import React from "react";
import { Link } from "react-router-dom";

export function Recipe({ recipe }) {
	if (!recipe) return;
	const { recipeName, path, author, quote, tags, img } = recipe;

	function renderTags() {
		// const tagCopy = [tags[0], tags[1]];

		return tags.map((tag, index) => (
			<li key={index} className="px-4 m-1 text-lg bg-gray-300 rounded-xl">
				{tag}
			</li>
		));
	}

	return (
		<article className="flex flex-col items-center justify-between w-full mx-auto my-4 overflow-hidden transition-colors duration-200 ease-in-out rounded shadow-lg md:flex-row lg:w-5/6 hover:bg-red-50">
			<img
				src={img}
				className="w-full transition-all duration-500 ease-in-out transform scale-105 bg-gray-300 md:w-1/3 lg:w-1/2 hover:scale-100 filter saturate-100 hover:saturate-125"
				loading="eager"
				alt={recipeName}
			/>
			<div className="flex flex-col w-full p-5 md:w-2/3 lg:w-1/2 justify-evenly h-5/6">
				<span className="w-full">
					<Link
						to={`/recipes/${path}`}
						className="text-lg text-center text-blue-400 lg:text-left lg:text-2xl hover:underline"
					>
						{recipeName}
					</Link>
				</span>
				<div className="flex flex-col">
					<h2 className="font-serif text-right">"{quote}"</h2>
					<span className="w-full text-right">
						-{" "}
						<Link className="text-lg text-blue-400 hover:underline" to="/">
							{author}
						</Link>
					</span>
					<ul className="flex flex-wrap items-center justify-around mx-auto">{renderTags()}</ul>
				</div>
			</div>
		</article>
	);
}
